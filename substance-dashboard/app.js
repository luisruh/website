let substances = [];
let filtered = [];
let visiblePickerRows = [];
let selectedSubstanceIds = new Set();
let selectedCompareIds = [];

const riskFields = [
  ["addiction_risk", "Abhängigkeit"],
  ["acute_harm", "Akut körperlich"],
  ["chronic_harm", "Chronisch körperlich"],
  ["psychological_risk", "Psychisch"],
  ["overdose_risk", "Überdosierung"],
  ["social_risk", "Sozial"]
];

const effectProfileFields = [
  ["effect_stimulation", "Stimulation"],
  ["effect_euphoria_empathy", "Euphorie/Empathie"],
  ["effect_perception", "Wahrnehmung"],
  ["effect_sedation", "Sedierung"],
  ["effect_dissociation", "Dissoziation"],
  ["effect_analgesia", "Analgesie"]
];

const effectPalette = {
  "Stimulans": "#5B8CFF",
  "Depressivum": "#8D99AE",
  "Sedativum": "#B8A1FF",
  "Empathogen": "#FF6FAE",
  "Psychedelikum": "#F6C445",
  "Dissoziativum": "#31C7C9",
  "Opioid": "#FF8A65",
  "Cannabinoid": "#57C26E",
  "Analgetikum": "#FFB86B",
  "Benzodiazepin": "#C792EA",
  "Vasodilatator": "#FF9F43",
  "Entheogen": "#9CCC65",
  "Anxiolytikum": "#7E9CFF",
  "Anästhetikum": "#4DD0E1"
};

const categoryOrder = [
  "Stimulans", "Depressivum", "Sedativum", "Empathogen", "Psychedelikum", "Dissoziativum",
  "Opioid", "Cannabinoid", "Benzodiazepin", "Analgetikum", "Vasodilatator", "Anxiolytikum", "Anästhetikum", "Entheogen"
];

const categoryMap = {
  "Sedativ": "Sedativum",
  "Sedativum": "Sedativum",
  "Depressivum": "Depressivum",
  "Benzos": "Benzodiazepin",
  "Psychoaktiv": null,
  "Analgetikum": "Analgetikum"
};

const barMetricGroups = [
  {
    label: "Risiken",
    metrics: [
      ["risk_index", "Gesamtrisiko", d => sumFields(d, riskFields)],
      ...riskFields.map(([field, label]) => [field, label, d => Number(d[field] || 0)])
    ]
  },
  {
    label: "Wirkungsprofil",
    metrics: effectProfileFields.map(([field, label]) => [field, label, d => Number(d[field] || 0)])
  }
];
const barMetrics = barMetricGroups.flatMap(g => g.metrics);
const compareColors = ["#9fb7ff", "#a0e7e5", "#f5b7d3", "#f4d58d"];
const plotConfig = { responsive: true, displayModeBar: false, scrollZoom: false, doubleClick: false };

async function init() {
  const response = await fetch("data/substances.json");
  substances = await response.json();
  prepareData();
  selectedSubstanceIds = new Set(substances.map(d => d.substance_id));
  visiblePickerRows = [...substances];
  filtered = [...substances];
  selectedCompareIds = substances.slice(0, 2).map(d => d.substance_id);
  buildUi();
  bindEvents();
  applyFilters();
  window.addEventListener("resize", debounce(() => updateDashboard(), 120));
}

function prepareData() {
  substances.forEach(d => {
    d.displayGroups = getDisplayGroups(d);
    d.origin_group = d.origin_group || inferOriginGroup(d.origin_type);
  });
}

function inferOriginGroup(originType) {
  const t = String(originType || "").toLowerCase();
  return t.includes("nat") ? "natürlich" : "synthetisch";
}

function normalizeCategory(value) {
  if (!value) return null;
  return Object.prototype.hasOwnProperty.call(categoryMap, value) ? categoryMap[value] : value;
}

function getDisplayGroups(d) {
  const values = [d.primary_effect, ...(d.effect_tags || [])].map(normalizeCategory).filter(Boolean);
  return [...new Set(values)].sort((a, b) => categoryRank(a) - categoryRank(b));
}

function categoryRank(v) {
  const idx = categoryOrder.indexOf(v);
  return idx === -1 ? 999 : idx;
}

function buildUi() {
  fillEffectFilter();
  fillSubstancePicker();
  fillCompareOptions();
  fillSelectFromRows("aliasSelect", substances);
  fillSelectFromRows("interactionSelect", substances);
  fillBarMetricSelect();
}

function fillEffectFilter() {
  const options = unique(substances.flatMap(d => d.displayGroups)).sort((a,b) => categoryRank(a)-categoryRank(b));
  document.getElementById("effectFilter").innerHTML = `<option value="">alle Wirkungsgruppen</option>` + options.map(v => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("");
}

function fillSelectFromRows(id, rows) {
  const el = document.getElementById(id);
  el.innerHTML = rows.map(d => `<option value="${escapeHtml(d.substance_id)}">${escapeHtml(d.name)}</option>`).join("");
}

function fillBarMetricSelect() {
  document.getElementById("barMetricSelect").innerHTML = barMetricGroups.map(group => `
    <optgroup label="${escapeHtml(group.label)}">
      ${group.metrics.map(([key, label]) => `<option value="${escapeHtml(key)}">${escapeHtml(label)}</option>`).join("")}
    </optgroup>`).join("");
}

function fillCompareOptions() {
  document.getElementById("compareOptions").innerHTML = substances.map(d => `
    <label class="compare-option">
      <input type="checkbox" class="compare-check" value="${escapeHtml(d.substance_id)}" ${selectedCompareIds.includes(d.substance_id) ? "checked" : ""}>
      <span>${escapeHtml(d.name)}</span>
    </label>`).join("");
  updateCompareSummary();
}

function fillSubstancePicker() {
  const html = visiblePickerRows.map(d => `
    <button type="button" class="substance-chip ${selectedSubstanceIds.has(d.substance_id) ? "active" : ""}" data-id="${escapeHtml(d.substance_id)}">${escapeHtml(d.name)}</button>`).join("");
  document.getElementById("substanceFilterOptions").innerHTML = html;
  updateSubstanceSummary();
}

function bindEvents() {
  document.getElementById("effectFilter").addEventListener("change", onEffectFilterChange);
  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("barMetricSelect").addEventListener("change", drawBarChart);
  document.getElementById("compareOptions").addEventListener("change", onCompareChange);
  document.getElementById("substanceFilterOptions").addEventListener("click", onSubstanceChipClick);
  document.getElementById("aliasSelect").addEventListener("change", drawAliasNetwork);
  document.getElementById("interactionSelect").addEventListener("change", drawInteractions);
  document.getElementById("selectAllSubstances").addEventListener("click", () => setPickerSelection("all"));
  document.getElementById("selectNaturalSubstances").addEventListener("click", () => setPickerSelection("natürlich"));
  document.getElementById("selectSyntheticSubstances").addEventListener("click", () => setPickerSelection("synthetisch"));
  document.getElementById("clearAllSubstances").addEventListener("click", () => setPickerSelection("none"));
  document.querySelectorAll(".tab-button").forEach(btn => btn.addEventListener("click", () => switchTab(btn.dataset.tab)));
}

function onEffectFilterChange() {
  const effect = document.getElementById("effectFilter").value;
  visiblePickerRows = effect ? substances.filter(d => d.displayGroups.includes(effect)) : [...substances];
  const allowed = new Set(visiblePickerRows.map(d => d.substance_id));
  selectedSubstanceIds = new Set([...selectedSubstanceIds].filter(id => allowed.has(id)));
  if (selectedSubstanceIds.size === 0 && visiblePickerRows[0]) {
    visiblePickerRows.forEach(d => selectedSubstanceIds.add(d.substance_id));
  }
  fillSubstancePicker();
  applyFilters();
}

function onSubstanceChipClick(e) {
  const btn = e.target.closest(".substance-chip");
  if (!btn) return;
  const id = btn.dataset.id;
  if (selectedSubstanceIds.has(id)) selectedSubstanceIds.delete(id); else selectedSubstanceIds.add(id);
  if (selectedSubstanceIds.size === 0) selectedSubstanceIds.add(id);
  fillSubstancePicker();
  applyFilters();
}

function setPickerSelection(mode) {
  const pool = visiblePickerRows;
  if (mode === "all") selectedSubstanceIds = new Set(pool.map(d => d.substance_id));
  else if (mode === "none") selectedSubstanceIds = new Set(pool[0] ? [pool[0].substance_id] : []);
  else selectedSubstanceIds = new Set(pool.filter(d => d.origin_group === mode).map(d => d.substance_id));
  if (selectedSubstanceIds.size === 0 && pool[0]) selectedSubstanceIds.add(pool[0].substance_id);
  fillSubstancePicker();
  applyFilters();
}

function updateSubstanceSummary() {
  const names = visiblePickerRows.filter(d => selectedSubstanceIds.has(d.substance_id)).map(d => d.name);
  const el = document.getElementById("substanceFilterSummary");
  el.textContent = names.length === visiblePickerRows.length ? `Alle ${names.length} sichtbaren Substanzen ausgewählt.` : `${names.length} ausgewählt: ${names.join(", ")}`;
}

function onCompareChange(e) {
  const checks = [...document.querySelectorAll(".compare-check")];
  const checked = checks.filter(c => c.checked && !c.disabled);
  if (checked.length > 4 && e.target.checked) e.target.checked = false;
  selectedCompareIds = checks.filter(c => c.checked && !c.disabled).map(c => c.value);
  if (selectedCompareIds.length === 0) {
    const firstEnabled = checks.find(c => !c.disabled);
    if (firstEnabled) {
      firstEnabled.checked = true;
      selectedCompareIds = [firstEnabled.value];
    }
  }
  updateCompareSummary();
  drawRiskRadar();
  drawEffectRadar();
}

function syncCompareOptions() {
  const allowed = new Set(filtered.map(d => d.substance_id));
  document.querySelectorAll(".compare-check").forEach(el => {
    el.disabled = !allowed.has(el.value);
    if (el.disabled) el.checked = false;
  });
  selectedCompareIds = [...document.querySelectorAll(".compare-check:checked")].map(el => el.value);
  if (selectedCompareIds.length === 0) {
    const firstEnabled = [...document.querySelectorAll(".compare-check")].find(el => !el.disabled);
    if (firstEnabled) {
      firstEnabled.checked = true;
      selectedCompareIds = [firstEnabled.value];
    }
  }
  updateCompareSummary();
}

function updateCompareSummary() {
  const names = selectedCompareIds.map(id => substances.find(d => d.substance_id === id)?.name).filter(Boolean);
  document.getElementById("compareSummary").textContent = names.join(", ");
}

function applyFilters() {
  const effect = document.getElementById("effectFilter").value;
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const selected = new Set(selectedSubstanceIds);

  filtered = substances.filter(d => {
    const searchBlob = [d.name, d.primary_effect, d.source_organism_common, d.geographic_origin, d.legal_status_at, d.legal_status_de, ...(d.common_names||[]), ...(d.displayGroups||[]), ...(d.chemical_tags||[])].join(" ").toLowerCase();
    return (!effect || d.displayGroups.includes(effect)) &&
      selected.has(d.substance_id) &&
      (!query || searchBlob.includes(query));
  });

  filtered.sort((a,b) => a.name.localeCompare(b.name, 'de'));
  syncCompareOptions();
  syncSingleSelect("aliasSelect");
  syncSingleSelect("interactionSelect");
  updateDashboard();
}

function syncSingleSelect(id) {
  const select = document.getElementById(id);
  const current = select.value;
  const allowed = filtered.length ? filtered : substances;
  select.innerHTML = allowed.map(d => `<option value="${escapeHtml(d.substance_id)}">${escapeHtml(d.name)}</option>`).join("");
  if (allowed.some(d => d.substance_id === current)) select.value = current;
}

function updateDashboard() {
  document.getElementById("resultInfo").textContent = `${filtered.length} von ${substances.length} angezeigt`;
  renderCards();
  drawAliasNetwork();
  drawBarChart();
  drawRiskRadar();
  drawEffectRadar();
  drawEffectMap();
  drawRiskHeatmap();
  drawEffectHeatmap();
  drawInteractions();
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.toggle('active', panel.id === tabId));
  if (tabId === 'chartsTab') setTimeout(updateDashboard, 50);
}

function baseLayout() {
  return {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#f3f5fb' },
    margin: { l: 56, r: 18, t: 12, b: 44 },
    xaxis: { gridcolor: 'rgba(255,255,255,.12)', zerolinecolor: 'rgba(255,255,255,.16)', fixedrange: true },
    yaxis: { gridcolor: 'rgba(255,255,255,.12)', zerolinecolor: 'rgba(255,255,255,.16)', fixedrange: true },
    showlegend: false,
    dragmode: false
  };
}

function drawBarChart() {
  const metricKey = document.getElementById('barMetricSelect').value || barMetrics[0][0];
  const metric = barMetrics.find(([key]) => key === metricKey) || barMetrics[0];
  const [, label, getter] = metric;

  const rows = filtered
    .map(d => ({ name: d.name, value: Number(getter(d) || 0) }))
    .sort((a, b) => b.value - a.value);

  const chartEl = document.getElementById('barChart');

  // Mehr Höhe bei vielen Substanzen
  chartEl.style.height = `${Math.max(360, 120 + rows.length * 20)}px`;

  const yValues = rows.map(r => r.name).reverse();

  // Sichtbarer Abstand zwischen Label und Balken
  const labelGap = '\u00A0\u00A0\u00A0\u00A0';

  const trace = {
    type: 'bar',
    orientation: 'h',
    y: yValues,
    x: rows.map(r => r.value).reverse(),
    text: rows.map(r => r.value).reverse(),
    textposition: 'auto',
    cliponaxis: false,
    marker: { color: 'rgba(159,183,255,.82)' },
    hovertemplate: '%{y}<br>' + label + ': %{x}<extra></extra>'
  };

  const layout = baseLayout();

  layout.margin = {
    l: isMobile() ? 150 : 180,
    r: 24,
    t: 6,
    b: 42
  };

  layout.xaxis.title = label;

  // Wichtig: keine xaxis.domain-Verschiebung mehr
  delete layout.xaxis.domain;

  layout.yaxis.automargin = false;
  layout.yaxis.tickmode = 'array';
  layout.yaxis.tickvals = yValues;
  layout.yaxis.ticktext = yValues.map(name => name + labelGap);
  layout.yaxis.tickfont = {
    size: isMobile() ? 13 : 15
  };

  Plotly.react('barChart', [trace], layout, plotConfig);
}

function drawRadar(targetId, fields) {
  const traces = selectedCompareIds.map((id, idx) => {
    const d = substances.find(row => row.substance_id === id);
    if (!d) return null;
    const theta = fields.map(([,label]) => label);
    const r = fields.map(([field]) => Number(d[field] || 0));
    const color = compareColors[idx % compareColors.length];
    return {
      type: 'scatterpolar',
      r: [...r, r[0]], theta: [...theta, theta[0]],
      fill: 'toself', name: d.name,
      line: { color, width: 2 },
      fillcolor: hexToRgba(color, .16),
      marker: { color }
    };
  }).filter(Boolean);
  const layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#f3f5fb' },
    margin: { l: 22, r: 22, t: 8, b: 12 },
    polar: {
      bgcolor: 'rgba(0,0,0,0)',
      radialaxis: { visible: true, range: [0,5], gridcolor: 'rgba(255,255,255,.16)', tickfont: { size: isMobile() ? 10 : 11 } },
      angularaxis: { gridcolor: 'rgba(255,255,255,.12)', tickfont: { size: isMobile() ? 10 : 12 } }
    },
    showlegend: true,
    legend: { orientation: 'h', y: -0.02, x: 0.5, xanchor: 'center', font: { size: isMobile() ? 10 : 11 } },
    dragmode: false
  };
  Plotly.react(targetId, traces, layout, plotConfig);
}
function drawRiskRadar() { drawRadar('riskRadarChart', riskFields); }
function drawEffectRadar() { drawRadar('effectRadarChart', effectProfileFields); }

function drawRiskHeatmap() { drawHeatmap('riskHeatmap', riskFields, [[0,'#9dd9a6'],[0.5,'#ffe08a'],[1,'#d84b4b']]); }
function drawEffectHeatmap() { drawHeatmap('effectHeatmap', effectProfileFields, [[0,'#9dd9a6'],[0.5,'#ffe08a'],[1,'#d84b4b']]); }

function drawHeatmap(id, fields, colorscale) {
  const y = filtered.map(d => d.name);
  const x = fields.map(([, label]) => label);
  const z = filtered.map(d => fields.map(([field]) => Number(d[field] || 0)));

  const trace = {
    type: 'heatmap',
    x,
    y,
    z,
    zmin: 1,
    zmax: 5,
    colorscale,
    hoverongaps: false,
    colorbar: {
      orientation: 'h',
      x: 0.5,
      xanchor: 'center',
      y: 1.24,
      len: 0.45,
      thickness: 12,
      tickmode: 'array',
      tickvals: [1, 2, 3, 4, 5],
      ticktext: ['1', '2', '3', '4', '5']
    }
  };

  const layout = baseLayout();

  layout.margin = {
    l: isMobile() ? 92 : 110,
    r: 14,
    t: isMobile() ? 118 : 108,
    b: isMobile() ? 92 : 78
  };

  // Untere X-Achse: alle Spaltenlabels erzwingen
  layout.xaxis.side = 'bottom';
  layout.xaxis.type = 'category';
  layout.xaxis.categoryorder = 'array';
  layout.xaxis.categoryarray = x;
  layout.xaxis.tickmode = 'array';
  layout.xaxis.tickvals = x;
  layout.xaxis.ticktext = x;
  layout.xaxis.tickangle = isMobile() ? -25 : -18;
  layout.xaxis.tickfont = { size: isMobile() ? 10 : 12 };
  layout.xaxis.automargin = true;

  // // Obere Labels als Annotationen: zuverlässiger als xaxis2 bei Heatmaps
  // layout.annotations = x.map(label => ({
  //   x: label,
  //   y: 1.045,
  //   xref: 'x',
  //   yref: 'paper',
  //   text: label,
  //   showarrow: false,
  //   textangle: isMobile() ? -25 : -18,
  //   xanchor: 'center',
  //   yanchor: 'bottom',
  //   font: {
  //     color: '#f3f5fb',
  //     size: isMobile() ? 10 : 12
  //   }
  // }));

  layout.yaxis.type = 'category';
  layout.yaxis.categoryorder = 'array';
  layout.yaxis.categoryarray = y;
  layout.yaxis.tickmode = 'array';
  layout.yaxis.tickvals = y;
  layout.yaxis.ticktext = y;
  layout.yaxis.automargin = true;

  Plotly.react(id, [trace], layout, plotConfig);
}

function drawAliasNetwork() {
  const id = document.getElementById('aliasSelect').value || filtered[0]?.substance_id;
  const d = substances.find(row => row.substance_id === id);
  const el = document.getElementById('aliasNetwork');
  if (!d) { el.innerHTML = ''; return; }
  const aliases = [...new Set(d.common_names || [])].slice(0, 14);
  const width = Math.max(el.clientWidth || 500, 320);
  const height = Math.max(el.clientHeight || 300, 260);
  const cx = width/2, cy = height/2, radius = Math.min(width,height) * 0.33;
  const nodes = aliases.map((name,i) => {
    const a = (Math.PI * 2 * i / Math.max(aliases.length,1)) - Math.PI/2;
    return { name, x: cx + Math.cos(a) * radius, y: cy + Math.sin(a) * radius };
  });
  const lines = nodes.map(n => `<line class="net-line" x1="${cx}" y1="${cy}" x2="${n.x}" y2="${n.y}"/>`).join('');
  const satellites = nodes.map(n => `<text class="net-label small" x="${n.x}" y="${n.y}">${escapeSvg(shorten(n.name,18))}</text>`).join('');
  el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" aria-label="Aliasnetz"><g>${lines}${satellites}<text class="net-label" x="${cx}" y="${cy-8}">${escapeSvg(shorten(d.name,18))}</text><text class="net-label small" x="${cx}" y="${cy+12}">${aliases.length} Alias</text></g></svg>`;
}

function drawEffectMap() {
  const el = document.getElementById('effectMap');
  if (!filtered.length) { el.innerHTML = ''; return; }
  const width = Math.max(el.clientWidth || 980, 320);
  const height = Math.max(el.clientHeight || 440, 320);
  const pad = { left: 54, right: 54, top: 38, bottom: 78 };
  const plotX = pad.left, plotY = pad.top, plotW = width - pad.left - pad.right, plotH = height - pad.top - pad.bottom;
  const midX = plotX + plotW/2, midY = plotY + plotH/2;
  let svg = `
    <rect class="map-zone" x="${plotX}" y="${plotY}" width="${plotW}" height="${plotH}" rx="24"></rect>
    <line class="axis-line" x1="${plotX}" y1="${midY}" x2="${plotX+plotW}" y2="${midY}"></line>
    <line class="axis-line" x1="${midX}" y1="${plotY}" x2="${midX}" y2="${plotY+plotH}"></line>
    <text class="axis-label end" x="${plotX-18}" y="${midY}" transform="rotate(-90 ${plotX-18} ${midY})">sedierend</text>
    <text class="axis-label start" x="${plotX+plotW+18}" y="${midY}" transform="rotate(90 ${plotX+plotW+18} ${midY})">aktivierend</text>
    <text class="axis-label center" x="${midX}" y="${plotY-12}">wahrnehmungsverändernd</text>
    <text class="axis-label center" x="${midX}" y="${plotY+plotH+24}">körpernah / dämpfend</text>`;
  const points = filtered.map((d,i) => {
    const stim = +d.effect_stimulation || 0, sed = +d.effect_sedation || 0, eup = +d.effect_euphoria_empathy || 0, per = +d.effect_perception || 0, diss = +d.effect_dissociation || 0, anal = +d.effect_analgesia || 0;
    const rawX = clamp(((stim - sed) + eup * .35) / 5, -1, 1);
    const rawY = clamp(((per * .75 + diss * .65) - (sed * .25 + anal * .25)) / 5, -1, 1);
    const jitter = 6 + (i % 3) * 3;
    const a = i * 2.27;
    return {
      d,
      x: plotX + plotW * (0.5 + rawX * 0.42) + Math.cos(a) * jitter,
      y: plotY + plotH * (0.5 - rawY * 0.42) + Math.sin(a) * jitter,
      r: 12 + (stim + sed + eup + per + diss + anal) * 0.35
    };
  });
  const activeEffectFilter = document.getElementById('effectFilter').value;
  svg += points.map(p => {
    const colorGroup = getMapColorGroup(p.d, activeEffectFilter);
    const fillColor = hexToRgba(effectPalette[colorGroup] || '#9fb7ff', .88);
    return `
    <g>
      <circle cx="${p.x}" cy="${p.y}" r="${p.r}" fill="${fillColor}" stroke="rgba(255,255,255,.35)"></circle>
      <text class="map-label" x="${p.x}" y="${p.y + p.r + 14}">${escapeSvg(shorten(p.d.name, 14))}</text>
    </g>`;
  }).join('');
  const legendGroups = (activeEffectFilter ? [activeEffectFilter] : unique(filtered.flatMap(d => d.displayGroups)).sort((a,b) => categoryRank(a)-categoryRank(b)).slice(0,8));
  svg += legendGroups.map((label,i) => {
    const col = i % (isMobile() ? 2 : 4); const row = Math.floor(i / (isMobile() ? 2 : 4));
    const x = plotX + col * (plotW / (isMobile() ? 2 : 4));
    const y = plotY + plotH + 48 + row * 22;
    const color = effectPalette[label] || '#9fb7ff';
    return `<circle cx="${x+8}" cy="${y}" r="6" fill="${color}" stroke="rgba(255,255,255,.35)"></circle><text class="legend-label" x="${x+20}" y="${y+4}">${escapeSvg(label)}</text>`;
  }).join('');
  el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" aria-label="Wirkungsprofil Map">${svg}</svg>`;
}

function renderCards() {
  const container = document.getElementById('cards');
  container.innerHTML = filtered.map(d => `
    <article class="card">
      <div class="card-title">
        <h3>${escapeHtml(d.name)}</h3>
        <p class="alias-inline">Alias: ${escapeHtml((d.common_names || []).join(', ') || '—')}</p>
      </div>

      <div class="detail-list">
        <p><strong>Ursprung:</strong> ${escapeHtml(d.origin_type || '—')}</p>
        <p><strong>Herkunft:</strong> ${escapeHtml(d.geographic_origin || '—')}</p>
        <p><strong>Quelle / Pflanze:</strong> ${escapeHtml(d.source_organism_common || '—')}</p>
        <p><strong>Dauer:</strong> ${escapeHtml(formatDuration(d))}</p>
        <p><strong>Wirkungsgruppen:</strong> ${escapeHtml((d.displayGroups || []).join(', ') || '—')}</p>
        <p><strong>Chemische Einordnung:</strong> ${escapeHtml((d.chemical_tags || []).join(', ') || '—')}</p>
      </div>

      <section class="metric-section">
        <h4>Risiken</h4>
        <div class="metric-stack">
          ${riskFields.map(([field,label]) => metricLine(label, d[field])).join('')}
        </div>
      </section>

      <section class="metric-section">
        <h4>Wirkungen</h4>
        <div class="metric-stack">
          ${effectProfileFields.map(([field,label]) => metricLine(label, d[field])).join('')}
        </div>
      </section>
    </article>`).join('');
}

function metricLine(label, value) {
  const shortLabels = {
    'Chronisch körperlich': 'Chron. körperlich',
    'Euphorie/Empathie': 'Euphorie'
  };
  const displayLabel = shortLabels[label] || label;
  const pct = Math.max(0, Math.min(100, Number(value || 0) * 20));
  return `<div class="metric-line"><div class="metric-label">${escapeHtml(displayLabel)}</div><div class="mini-bar"><span style="width:${pct}%"></span></div><div class="metric-value">${escapeHtml(value || 0)}/5</div></div>`;
}

function drawInteractions() {
  const id = document.getElementById('interactionSelect').value || filtered[0]?.substance_id;
  const selected = substances.find(d => d.substance_id === id) || filtered[0];
  const el = document.getElementById('interactionGrid');
  if (!selected) { el.innerHTML = ''; return; }
  const others = filtered.filter(d => d.substance_id !== selected.substance_id);
  el.innerHTML = others.map(other => {
    const r = interactionAnalysis(selected, other);
    return `<article class="interaction-card">
      <div class="interaction-top">
        <h3>${escapeHtml(other.name)}</h3>
        <div class="badge-wrap">
          <span class="badge effect">${escapeHtml(r.effectLabel)}</span>
          <span class="badge ${escapeHtml(r.riskClass)}">${escapeHtml(r.riskLabel)}</span>
        </div>
      </div>
      <p>${escapeHtml(r.text)}</p>
    </article>`;
  }).join('');
}

function interactionAnalysis(a, b) {
  const A = new Set(a.displayGroups), B = new Set(b.displayGroups);
  const hasAny = (set, arr) => arr.some(v => set.has(v));
  const opioidA = hasAny(A, ['Opioid']), opioidB = hasAny(B, ['Opioid']);
  const sedA = hasAny(A, ['Sedativum', 'Depressivum', 'Benzodiazepin']);
  const sedB = hasAny(B, ['Sedativum', 'Depressivum', 'Benzodiazepin']);
  const stimA = hasAny(A, ['Stimulans', 'Empathogen']);
  const stimB = hasAny(B, ['Stimulans', 'Empathogen']);
  const psychA = hasAny(A, ['Psychedelikum', 'Dissoziativum', 'Cannabinoid', 'Entheogen']);
  const psychB = hasAny(B, ['Psychedelikum', 'Dissoziativum', 'Cannabinoid', 'Entheogen']);
  const vasoA = hasAny(A, ['Vasodilatator']), vasoB = hasAny(B, ['Vasodilatator']);
  if ((opioidA && sedB) || (opioidB && sedA)) return result('stark verstärkend', 'hohes Risiko', 'high', 'Dämpfende Effekte können sich stark addieren. Vor allem Sedierung und Atemdepression können deutlich zunehmen.');
  if (sedA && sedB) return result('verstärkend dämpfend', 'erhöhtes Risiko', 'high', 'Beide Substanzen wirken dämpfend. Müdigkeit, Koordinationsprobleme und allgemeine Beeinträchtigung können sich verstärken.');
  if (stimA && stimB) return result('verstärkend stimulierend', 'erhöhtes Risiko', 'high', 'Beide wirken aktivierend. Kreislaufbelastung, Unruhe, Schlaflosigkeit oder Überhitzung können zunehmen.');
  if ((stimA && sedB) || (stimB && sedA)) return result('gegenläufig / maskierend', 'mittleres Risiko', 'medium', 'Die Effekte können sich subjektiv teilweise aufheben. Dadurch wird die tatsächliche Belastung oft schlechter eingeschätzt.');
  if ((psychA && stimB) || (psychB && stimA)) return result('verstärkend / unruhiger', 'mittleres Risiko', 'medium', 'Die aktivierende Komponente kann psychische Belastung, Überforderung und unangenehme mentale Effekte verstärken.');
  if (psychA && psychB) return result('verstärkend / unberechenbar', 'mittleres Risiko', 'medium', 'Wahrnehmungs- und Selbstveränderungen können sich addieren. Die Kombination wirkt oft deutlich unberechenbarer als die Einzelsubstanzen.');
  if ((vasoA && stimB) || (vasoB && stimA)) return result('kreislaufbelastend', 'mittleres Risiko', 'medium', 'Kreislauf- und Blutdruckeffekte können schwerer vorhersehbar werden. Die Kombination kann intensiver wirken als erwartet.');
  return result('eher additiv / unklar', 'niedriger bis mittlerer Eindruck', 'low', 'Keine klare Standardrichtung ableitbar. Effekte können sich addieren oder kontextabhängig verschieben.');
}
function result(effectLabel, riskLabel, riskClass, text) { return { effectLabel, riskLabel, riskClass, text }; }

function getMapColorGroup(d, activeEffectFilter = '') {
  if (activeEffectFilter && d.displayGroups.includes(activeEffectFilter)) return activeEffectFilter;
  return normalizeCategory(d.primary_effect) || d.displayGroups[0] || 'Stimulans';
}

function formatDuration(d) {
  const overrides = {
    'Koffein': '3–6 Stunden',
    'Nikotin': '0,5–2 Stunden',
    'Alkohol': '2–8+ Stunden',
    'THC': '2–6 Stunden',
    'Kokain': '0,5–1,5 Stunden',
    'Amphetamin': '4–8 Stunden',
    'MDMA': '4–6 Stunden',
    '2C-B': '4–6 Stunden',
    'Meskalin': '8–12 Stunden',
    'Psilocybin': '4–6 Stunden',
    'Ketamin': '0,5–2 Stunden',
    'Diazepam': '4–8+ Stunden',
    'Xanax': '4–6 Stunden',
    'Morphin': '3–5 Stunden',
    'Tilidin': '3–5 Stunden',
    'Oxycodon': '4–6 Stunden',
    'Heroin': '3–5 Stunden',
    'Krokodil': '1–3 Stunden',
    'Lachgas': '5–20 Minuten',
    'Poppers': '1–5 Minuten',
    'Crack': '5–15 Minuten',
    'Ritalin': '3–4 Stunden'
  };
  if (overrides[d.name]) return overrides[d.name];
  const mapping = {
    'sehr kurz': '5–30 Minuten',
    'kurz': '1–2 Stunden',
    'mittel': '2–6 Stunden',
    'lang': '6–12 Stunden'
  };
  return mapping[String(d.duration_category || '').toLowerCase()] || d.duration_category || '—';
}

function sumFields(d, fields) { return fields.reduce((sum, [field]) => sum + Number(d[field] || 0), 0); }
function unique(arr) { return [...new Set(arr.filter(Boolean))]; }
function shorten(str, max) { str = String(str || ''); return str.length > max ? str.slice(0, max - 1) + '…' : str; }
function nodeRadius(name) { return Math.min(42, Math.max(28, 18 + String(name).length * 0.65)); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }
function escapeSvg(v) { return escapeHtml(v); }
function hexToRgba(hex, alpha) {
  const h = String(hex).replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `rgba(${(n>>16)&255}, ${(n>>8)&255}, ${n&255}, ${alpha})`;
}
function debounce(fn, wait) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); }; }
function isMobile() { return window.innerWidth <= 700; }

init();
