let substances = [];
let filtered = [];

const riskFields = [
  ["addiction_risk", "Abhängigkeit"],
  ["acute_harm", "Akut körperlich"],
  ["chronic_harm", "Chronisch körperlich"],
  ["psychological_risk", "Psychisch"],
  ["overdose_risk", "Überdosierung"],
  ["social_risk", "Sozial"]
];

const effectDimensionFields = [
  ["effect_stimulation", "Stimulation"],
  ["effect_euphoria_empathy", "Euphorie/Empathie"],
  ["effect_perception", "Wahrnehmungsveränderung"],
  ["effect_sedation", "Sedierung"],
  ["effect_dissociation", "Dissoziation"],
  ["effect_analgesia", "Analgesie"]
];

const barMetricGroups = [
  {
    label: "Gefährlichkeitsdimensionen",
    metrics: [
      ["risk_index", "Gefährlichkeit Gesamtindex", d => sumFields(d, riskFields)],
      ["addiction_risk", "Abhängigkeit", d => d.addiction_risk],
      ["acute_harm", "Akuter körperlicher Schaden", d => d.acute_harm],
      ["chronic_harm", "Chronischer körperlicher Schaden", d => d.chronic_harm],
      ["psychological_risk", "Psychisches Risiko", d => d.psychological_risk],
      ["overdose_risk", "Überdosierungsrisiko", d => d.overdose_risk],
      ["social_risk", "Soziales Risiko", d => d.social_risk]
    ]
  },
  {
    label: "Wirkprofil-Dimensionen",
    metrics: [
      ["effect_stimulation", "Stimulation", d => d.effect_stimulation],
      ["effect_sedation", "Sedierung", d => d.effect_sedation],
      ["effect_perception", "Wahrnehmungsveränderung", d => d.effect_perception],
      ["effect_euphoria_empathy", "Euphorie/Empathie", d => d.effect_euphoria_empathy],
      ["effect_dissociation", "Dissoziation", d => d.effect_dissociation],
      ["effect_analgesia", "Analgesie", d => d.effect_analgesia]
    ]
  }
];

const barMetrics = barMetricGroups.flatMap(group => group.metrics);
const compareColors = ["#9fb7ff", "#a0e7e5", "#f5b7d3", "#f4d58d"];
const effectPalette = {
  "Stimulans": "#9fb7ff",
  "Depressivum": "#b9bed7",
  "Cannabinoid": "#b7d8c2",
  "Empathogen": "#d8b7c9",
  "Psychedelikum": "#d8c7a8",
  "Dissoziativum": "#a9d7d5",
  "Opioid": "#d7aaa9",
  "Sedativum": "#c9cbd5"
};

async function init() {
  const response = await fetch("data/substances.json");
  substances = await response.json();
  filtered = [...substances];
  buildFilters();
  bindEvents();
  updateDashboard();
  window.addEventListener("resize", debounce(updateDashboard, 120));
}

function uniqueValues(field) {
  return [...new Set(substances.map(d => d[field]).filter(Boolean))].sort();
}

function fillSelect(id, values, allLabel = "alle") {
  const select = document.getElementById(id);
  select.innerHTML = `<option value="">${allLabel}</option>` + values.map(v => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("");
}

function buildFilters() {
  fillSelect("effectFilter", uniqueValues("primary_effect"));
  fillSelect("originFilter", uniqueValues("origin_type"));

  const aliasSelect = document.getElementById("aliasSelect");
  aliasSelect.innerHTML = substances.map(d => `<option value="${d.substance_id}">${escapeHtml(d.name)}</option>`).join("");

  const metricSelect = document.getElementById("barMetricSelect");
  metricSelect.innerHTML = barMetricGroups.map(group => `
    <optgroup label="${escapeHtml(group.label)}">
      ${group.metrics.map(([key, label]) => `<option value="${key}">${escapeHtml(label)}</option>`).join("")}
    </optgroup>
  `).join("");

  const compareOptions = document.getElementById("compareOptions");
  compareOptions.innerHTML = substances.map((d, i) => `
    <label class="compare-option">
      <input type="checkbox" class="compare-check" value="${escapeHtml(d.substance_id)}" ${i < 2 ? "checked" : ""}>
      <span>${escapeHtml(d.name)}</span>
    </label>
  `).join("");

  const substanceFilterOptions = document.getElementById("substanceFilterOptions");
  substanceFilterOptions.innerHTML = substances.map(d => `
    <label class="compare-option">
      <input type="checkbox" class="substance-filter-check" value="${escapeHtml(d.substance_id)}" checked>
      <span>${escapeHtml(d.name)}</span>
    </label>
  `).join("");

  updateCompareSummary();
  updateSubstanceFilterSummary();
}

function bindEvents() {
  ["searchInput", "effectFilter", "originFilter"].forEach(id => {
    document.getElementById(id).addEventListener("input", applyFilters);
  });
  document.querySelectorAll(".tab-button").forEach(button => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });
  document.getElementById("aliasSelect").addEventListener("change", drawAliasNetwork);
  document.getElementById("barMetricSelect").addEventListener("change", drawBarChart);
  document.getElementById("compareOptions").addEventListener("change", onCompareChange);
  document.getElementById("substanceFilterOptions").addEventListener("change", onSubstanceFilterChange);
  document.getElementById("selectAllSubstances").addEventListener("click", () => setAllSubstancesChecked(true));
  document.getElementById("clearAllSubstances").addEventListener("click", () => setAllSubstancesChecked(false));
}

function onCompareChange(event) {
  const checks = [...document.querySelectorAll(".compare-check:checked")];
  if (checks.length > 4 && event.target?.checked) event.target.checked = false;
  if (![...document.querySelectorAll(".compare-check:checked")].length) {
    const first = document.querySelector(".compare-check");
    if (first) first.checked = true;
  }
  updateCompareSummary();
  drawRiskRadar();
  drawEffectRadar();
}

function getSelectedCompareIds() {
  const ids = [...document.querySelectorAll(".compare-check:checked")].map(el => el.value);
  return ids.length ? ids : [substances[0]?.substance_id].filter(Boolean);
}

function updateCompareSummary() {
  const ids = getSelectedCompareIds();
  const names = ids.map(id => substances.find(d => d.substance_id === id)?.name).filter(Boolean);
  const summaryEl = document.getElementById("compareSummary");
  if (summaryEl) summaryEl.textContent = names.join(", ");
}

function getSelectedSubstanceIds() {
  const ids = [...document.querySelectorAll(".substance-filter-check:checked")].map(el => el.value);
  return ids.length ? ids : [];
}

function updateSubstanceFilterSummary() {
  const ids = getSelectedSubstanceIds();
  const summaryEl = document.getElementById("substanceFilterSummary");
  if (!summaryEl) return;
  if (!ids.length) {
    summaryEl.textContent = "Keine Substanz ausgewählt.";
    return;
  }
  if (ids.length === substances.length) {
    summaryEl.textContent = `Alle ${substances.length} Substanzen ausgewählt.`;
    return;
  }
  const names = ids.map(id => substances.find(d => d.substance_id === id)?.name).filter(Boolean);
  summaryEl.textContent = `${ids.length} ausgewählt: ${names.join(", ")}`;
}

function setAllSubstancesChecked(flag) {
  document.querySelectorAll(".substance-filter-check").forEach(el => { el.checked = flag; });
  if (!flag) {
    const first = document.querySelector(".substance-filter-check");
    if (first) first.checked = true;
  }
  updateSubstanceFilterSummary();
  applyFilters();
}

function onSubstanceFilterChange() {
  if (![...document.querySelectorAll(".substance-filter-check:checked")].length) {
    const first = document.querySelector(".substance-filter-check");
    if (first) first.checked = true;
  }
  updateSubstanceFilterSummary();
  applyFilters();
}

function applyFilters() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const effect = document.getElementById("effectFilter").value;
  const origin = document.getElementById("originFilter").value;
  const selectedIds = new Set(getSelectedSubstanceIds());

  filtered = substances.filter(d => {
    const searchable = [
      d.name, d.primary_effect, d.origin_type, d.geographic_origin, d.source_organism_common,
      ...(d.common_names || []), ...(d.effect_tags || []), ...(d.chemical_tags || [])
    ].join(" ").toLowerCase();

    return selectedIds.has(d.substance_id) &&
      (!q || searchable.includes(q)) &&
      (!effect || d.primary_effect === effect) &&
      (!origin || d.origin_type === origin);
  });

  syncCompareSelectionToFiltered();
  updateDashboard();
}

function syncCompareSelectionToFiltered() {
  const filteredIds = new Set(filtered.map(d => d.substance_id));
  document.querySelectorAll('.compare-check').forEach(el => {
    const inFiltered = filteredIds.has(el.value);
    el.disabled = !inFiltered;
    if (!inFiltered) el.checked = false;
  });
  if (![...document.querySelectorAll('.compare-check:checked')].length) {
    const firstEnabled = document.querySelector('.compare-check:not(:disabled)');
    if (firstEnabled) firstEnabled.checked = true;
  }
  updateCompareSummary();
}

function updateDashboard() {
  updateResultInfo();
  drawEffectMap();
  drawScatter();
  drawBarChart();
  drawHeatmap();
  drawRiskRadar();
  drawEffectRadar();
  drawAliasNetwork();
  renderCards();
}

function updateResultInfo() {
  const resultInfo = document.getElementById("resultInfo");
  if (resultInfo) resultInfo.textContent = `${filtered.length} von ${substances.length} angezeigt`;
}

function switchTab(tabId) {
  document.querySelectorAll(".tab-button").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === tabId);
  });
  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === tabId);
  });
  if (tabId === "chartsTab") setTimeout(updateDashboard, 50);
}

function chartLayout(title = "") {
  return {
    title,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: { color: "#f3f5fb" },
    margin: { l: 48, r: 20, t: 20, b: 44 },
    xaxis: { gridcolor: "rgba(255,255,255,.12)", zerolinecolor: "rgba(255,255,255,.16)" },
    yaxis: { gridcolor: "rgba(255,255,255,.12)", zerolinecolor: "rgba(255,255,255,.16)" },
    showlegend: false
  };
}

function drawEffectMap() {
  const el = document.getElementById("categoryNetwork");
  if (!el) return;
  if (!filtered.length) { el.innerHTML = ""; return; }

  const width = Math.max(el.clientWidth || 980, 520);
  const height = Math.max(el.clientHeight || 620, 420);
  const padLeft = isMobileView() ? 86 : 92;
  const padRight = isMobileView() ? 86 : 92;
  const padTop = 88;
  const padBottom = isMobileView() ? 132 : 108;
  const plotX = padLeft;
  const plotY = padTop;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const midX = plotX + plotW / 2;
  const midY = plotY + plotH / 2;

  let svg = `
    <rect class="map-zone" x="${plotX}" y="${plotY}" width="${plotW}" height="${plotH}" rx="28" />
    <line class="axis-line" x1="${plotX}" y1="${midY}" x2="${plotX + plotW}" y2="${midY}" />
    <line class="axis-line" x1="${midX}" y1="${plotY}" x2="${midX}" y2="${plotY + plotH}" />
    <text class="axis-label end" x="${plotX - 24}" y="${midY}" transform="rotate(-90 ${plotX - 24} ${midY})">sedierend</text>
    <text class="axis-label start" x="${plotX + plotW + 24}" y="${midY}" transform="rotate(90 ${plotX + plotW + 24} ${midY})">aktivierend</text>
    <text class="axis-label center" x="${midX}" y="${plotY - 18}">wahrnehmungs- / selbstverändernd</text>
    <text class="axis-label center" x="${midX}" y="${plotY + plotH + 26}">körpernah / dämpfend</text>
  `;

  const points = filtered.map((d, i) => {
    const stimulation = Number(d.effect_stimulation || 0);
    const sedation = Number(d.effect_sedation || 0);
    const euphoria = Number(d.effect_euphoria_empathy || 0);
    const perception = Number(d.effect_perception || 0);
    const dissociation = Number(d.effect_dissociation || 0);
    const analgesia = Number(d.effect_analgesia || 0);
    const rawX = clamp(((stimulation - sedation) + euphoria * 0.35) / 5, -1, 1);
    const rawY = clamp(((perception * 0.75 + dissociation * 0.65) - (sedation * 0.25 + analgesia * 0.25)) / 5, -1, 1);
    const jitterA = i * 2.399963;
    const jitter = 7 + (i % 3) * 3;
    return {
      d,
      x: plotX + plotW * (0.5 + rawX * 0.42) + Math.cos(jitterA) * jitter,
      y: plotY + plotH * (0.5 - rawY * 0.42) + Math.sin(jitterA) * jitter,
      total: stimulation + sedation + euphoria + perception + dissociation + analgesia
    };
  });

  svg += points.map(p => {
    const color = effectPalette[p.d.primary_effect] || "#9fb7ff";
    const tooltip = [
      p.d.name,
      `Wirkungsklasse: ${p.d.primary_effect}`,
      `Stimulation: ${p.d.effect_stimulation}/5`,
      `Euphorie/Empathie: ${p.d.effect_euphoria_empathy}/5`,
      `Wahrnehmungsveränderung: ${p.d.effect_perception}/5`,
      `Sedierung: ${p.d.effect_sedation}/5`,
      `Dissoziation: ${p.d.effect_dissociation}/5`,
      `Analgesie: ${p.d.effect_analgesia}/5`
    ].join("\n");
    return `
      <g class="effect-glyph">
        <title>${escapeSvg(tooltip)}</title>
        <circle class="effect-core" cx="${p.x}" cy="${p.y}" r="${16 + Math.min(10, p.total * 0.35)}" fill="${hexToRgba(color, .88)}" />
        <text class="map-label" x="${p.x}" y="${p.y + 29}">${escapeSvg(shorten(p.d.name, 14))}</text>
      </g>
    `;
  }).join("");

  const classLegendLabels = ["Stimulans", "Depressivum", "Cannabinoid", "Empathogen", "Psychedelikum", "Dissoziativum", "Opioid"];
  const classLegendRows = isMobileView() ? 4 : 2;
  const classLegendCols = isMobileView() ? 2 : 4;
  const lx0 = plotX;
  const ly0 = plotY + plotH + 54;
  const lcellW = plotW / classLegendCols;
  svg += `<g class="effect-class-legend">${classLegendLabels.map((label, i) => {
    const col = i % classLegendCols;
    const row = Math.floor(i / classLegendCols);
    const x = lx0 + col * lcellW;
    const y = ly0 + row * 24;
    const color = effectPalette[label] || '#9fb7ff';
    return `<circle cx="${x + 8}" cy="${y - 5}" r="6" fill="${color}" stroke="rgba(255,255,255,.35)" />
            <text x="${x + 22}" y="${y - 5}" class="legend-label">${escapeSvg(label)}</text>`;
  }).join('')}</g>`;

  el.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Wirkprofil-Map der Substanzen">
      ${svg}
    </svg>`;
}

function drawScatter() {
  const tracesByEffect = {};
  const pointRows = [];

  filtered.forEach(d => {
    const key = d.primary_effect || "Sonstige";
    if (!tracesByEffect[key]) {
      tracesByEffect[key] = {
        x: [], y: [], hovertext: [], size: [], name: key, mode: "markers", type: "scatter",
        marker: { color: effectPalette[key] || "#ffffff", opacity: .82, line: { color: "rgba(255,255,255,.35)", width: 1 } }
      };
    }
    tracesByEffect[key].x.push(d.acute_harm);
    tracesByEffect[key].y.push(d.psychological_risk);
    tracesByEffect[key].hovertext.push(`${d.name}<br>Abhängigkeit: ${d.addiction_risk}/5<br>${d.primary_effect}`);
    tracesByEffect[key].size.push(12 + d.addiction_risk * 6);
    pointRows.push(d);
  });

  const traces = Object.values(tracesByEffect).map(t => ({
    ...t,
    hovertemplate: '%{hovertext}<extra></extra>',
    marker: { ...t.marker, size: t.size }
  }));

  const annotations = buildScatterAnnotations(pointRows);
  const layout = chartLayout();
  layout.xaxis.title = "Akuter körperlicher Schaden";
  layout.yaxis.title = "Psychisches Risiko";
  layout.xaxis.range = [0.5, 5.5];
  layout.yaxis.range = [0.5, 5.5];
  layout.showlegend = false;
  layout.annotations = annotations;
  Plotly.react("scatterChart", traces, layout, { responsive: true, displayModeBar: false });
}

function buildScatterAnnotations(rows) {
  const used = new Map();
  const offsets = [
    [0, -24], [30, -16], [-30, -16], [34, 10], [-34, 10],
    [0, 28], [48, -4], [-48, -4], [50, 24], [-50, 24],
    [18, -42], [-18, -42], [18, 44], [-18, 44]
  ];
  return rows.map((d, i) => {
    const key = `${d.acute_harm}|${d.psychological_risk}`;
    const count = used.get(key) || 0;
    used.set(key, count + 1);
    const [ax, ay] = offsets[(count + i) % offsets.length];
    return {
      x: d.acute_harm,
      y: d.psychological_risk,
      text: shorten(d.name, isMobileView() ? 10 : 14),
      showarrow: true,
      arrowhead: 0,
      arrowsize: 0.6,
      arrowwidth: 1,
      arrowcolor: "rgba(255,255,255,.35)",
      ax,
      ay,
      font: { size: isMobileView() ? 9 : 11, color: "#f3f5fb" },
      bgcolor: "rgba(15,18,32,.62)",
      bordercolor: "rgba(255,255,255,.10)",
      borderpad: 2
    };
  });
}

function drawBarChart() {
  const selectedMetric = document.getElementById("barMetricSelect").value || barMetrics[0][0];
  const metric = barMetrics.find(([key]) => key === selectedMetric) || barMetrics[0];
  const [, label, getValue] = metric;
  const rows = filtered.map(d => ({ name: d.name, value: Number(getValue(d) || 0) })).sort((a, b) => b.value - a.value);
  const trace = {
    type: "bar", orientation: "h",
    y: rows.map(d => d.name).reverse(),
    x: rows.map(d => d.value).reverse(),
    text: rows.map(d => `${d.value}`).reverse(), textposition: "auto",
    marker: { color: "rgba(159,183,255,.82)", opacity: .9 },
    hovertemplate: "%{y}<br>" + label + ": %{x}<extra></extra>"
  };
  const layout = chartLayout();
  layout.margin = { l: 140, r: 24, t: 12, b: 42 };
  layout.xaxis.title = label;
  layout.yaxis.automargin = true;
  Plotly.react("barChart", [trace], layout, { responsive: true, displayModeBar: false });
}

function drawRiskRadar() { drawRadar("riskRadarChart", riskFields); }
function drawEffectRadar() { drawRadar("effectRadarChart", effectDimensionFields); }

function drawRadar(elementId, fields) {
  const selectedIds = getSelectedCompareIds();
  const traces = selectedIds.map((id, idx) => {
    const d = substances.find(x => x.substance_id === id);
    if (!d) return null;
    const labels = fields.map(x => radarLabel(x[1]));
    const values = fields.map(x => Number(d[x[0]] || 0));
    const color = compareColors[idx % compareColors.length];
    return {
      type: "scatterpolar",
      r: [...values, values[0]], theta: [...labels, labels[0]],
      fill: "toself", name: d.name,
      line: { color, width: 2.2 }, fillcolor: hexToRgba(color, 0.15), marker: { color }
    };
  }).filter(Boolean);
  const mobile = isMobileView();
  const layout = {
    paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)", font: { color: "#f3f5fb" },
    margin: mobile ? { l: 88, r: 88, t: 24, b: 64 } : { l: 42, r: 42, t: 20, b: 46 },
    polar: {
      bgcolor: "rgba(0,0,0,0)",
      radialaxis: { visible: true, range: [0, 5], gridcolor: "rgba(255,255,255,.16)", tickfont: { size: mobile ? 10 : 12 } },
      angularaxis: { gridcolor: "rgba(255,255,255,.12)", tickfont: { size: mobile ? 10 : 12 } }
    },
    showlegend: true,
    legend: { orientation: "h", y: -0.14, x: 0, font: { size: mobile ? 10 : 12 } }
  };
  Plotly.react(elementId, traces, layout, { responsive: true, displayModeBar: false });
}

function drawHeatmap() {
  const names = filtered.map(d => d.name);
  const z = riskFields.map(([field]) => filtered.map(d => d[field]));
  const y = riskFields.map(([, label]) => heatmapYAxisLabel(label));
  const trace = {
    type: "heatmap",
    x: names,
    y,
    z,
    colorscale: [[0, "#2ca25f"], [0.5, "#fff7bc"], [1, "#de2d26"]],
    zmin: 1,
    zmax: 5,
    hoverongaps: false,
    colorbar: {
      orientation: 'h',
      x: 0.5,
      xanchor: 'center',
      y: isMobileView() ? 1.20 : 1.14,
      len: isMobileView() ? 0.7 : 0.5,
      thickness: 12,
      tickfont: { size: isMobileView() ? 10 : 11 }
    }
  };
  const layout = chartLayout();
  layout.margin = isMobileView() ? { l: 92, r: 16, t: 72, b: 128 } : { l: 106, r: 16, t: 54, b: 118 };
  layout.xaxis.tickangle = -45;
  layout.xaxis.tickmode = 'array';
  layout.xaxis.tickvals = names;
  layout.xaxis.ticktext = names;
  layout.xaxis.tickfont = { size: isMobileView() ? 8 : 10 };
  layout.xaxis.automargin = true;
  layout.yaxis.tickangle = 0;
  layout.yaxis.tickfont = { size: isMobileView() ? 9 : 11 };
  layout.yaxis.automargin = true;
  Plotly.react("heatmapChart", [trace], layout, { responsive: true, displayModeBar: false });
}

function drawAliasNetwork() {
  const selectedId = document.getElementById("aliasSelect").value || filtered[0]?.substance_id || substances[0]?.substance_id;
  const d = substances.find(x => x.substance_id === selectedId) || filtered[0];
  const el = document.getElementById("aliasNetwork");
  if (!d) { el.innerHTML = ""; return; }
  const aliases = [...new Set(d.common_names || [])].slice(0, 14);
  const width = Math.max(el.clientWidth || 420, 320);
  const height = Math.max(el.clientHeight || 360, 300);
  const cx = width / 2; const cy = height / 2; const radius = Math.min(width, height) * 0.34;
  const nodes = aliases.map((name, i) => {
    const angle = (Math.PI * 2 * i / Math.max(aliases.length, 1)) - Math.PI / 2;
    return { name, x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
  });
  const lines = nodes.map(n => `<line class="net-line" x1="${cx}" y1="${cy}" x2="${n.x}" y2="${n.y}" />`).join("");
  const satellites = nodes.map(n => `<circle class="net-node" cx="${n.x}" cy="${n.y}" r="${nodeRadius(n.name)}"></circle><text class="net-label small" x="${n.x}" y="${n.y}">${escapeSvg(shorten(n.name, 18))}</text>`).join("");
  el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Alias-Netz für ${escapeHtml(d.name)}">${lines}${satellites}<circle class="net-center" cx="${cx}" cy="${cy}" r="54"></circle><text class="net-label" x="${cx}" y="${cy - 8}">${escapeSvg(shorten(d.name, 16))}</text><text class="net-label small" x="${cx}" y="${cy + 12}">${aliases.length} Aliasnamen</text></svg>`;
}

function renderCards() {
  const container = document.getElementById("cards");
  container.innerHTML = filtered.map(d => {
    const detailEffect = [d.primary_effect, ...(d.effect_tags || []).filter(tag => tag !== d.primary_effect)].slice(0, 4).join(" · ");
    const chemistry = (d.chemical_tags || []).slice(0, 3).join(", ") || "n/a";
    return `
      <article class="card">
        <h3>${escapeHtml(d.name)}</h3>
        <div class="meta">
          <strong>Wirkung:</strong> ${escapeHtml(detailEffect)}<br>
          <strong>Chemische Klasse:</strong> ${escapeHtml(chemistry)}<br>
          <strong>Ursprung:</strong> ${escapeHtml(d.origin_type)} · ${escapeHtml(d.geographic_origin || "n/a")}<br>
          <strong>Quelle:</strong> ${escapeHtml(d.source_organism_common || "n/a")}<br>
          <strong>Rechtsstatus AT:</strong> ${escapeHtml(d.legal_status_at || "n/a")}
        </div>
        <div class="tags">
          ${(d.effect_tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
          ${(d.chemical_tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
        </div>
        ${riskFields.slice(0, 4).map(([field, label]) => riskBar(label, d[field])).join("")}
        <div class="aliases">Alias: ${escapeHtml((d.common_names || []).slice(0, 8).join(", ") || "n/a")}</div>
        <p class="note">${escapeHtml(d.notes || "")}</p>
      </article>
    `;
  }).join("");
}

function riskBar(label, value) {
  const pct = Math.max(0, Math.min(100, Number(value || 0) * 20));
  return `<div class="risk-row"><span>${label}</span><strong>${value}/5</strong></div><div class="bar"><span style="width:${pct}%"></span></div>`;
}

function sumFields(d, fields) { return fields.reduce((sum, [field]) => sum + Number(d[field] || 0), 0); }
function nodeRadius(name) { return Math.min(44, Math.max(28, 18 + String(name).length * 0.65)); }
function shorten(value, max) { const str = String(value ?? ""); return str.length > max ? str.slice(0, max - 1) + "…" : str; }
function heatmapYAxisLabel(label) {
  const map = { "Abhängigkeit": "Abhäng.", "Akut körperlich": "Akut körp.", "Chronisch körperlich": "Chron. körp.", "Psychisch": "Psych.", "Überdosierung": "Überdos.", "Sozial": "Sozial" };
  return map[label] || label;
}
function radarLabel(label) {
  if (!isMobileView()) return label;
  const map = {
    "Abhängigkeit": "Abhäng.", "Akut körperlich": "Akut körp.", "Chronisch körperlich": "Chron. körp.", "Psychisch": "Psych.", "Überdosierung": "Überdos.", "Sozial": "Sozial",
    "Stimulation": "Stimulat.", "Euphorie/Empathie": "Euphorie", "Wahrnehmungsveränderung": "Wahrnehm.", "Sedierung": "Sedierung", "Dissoziation": "Dissoziat.", "Analgesie": "Analgesie"
  };
  return map[label] || label;
}
function isMobileView() { return window.innerWidth <= 700; }
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function escapeHtml(value) { return String(value ?? "").replace(/[&<>'"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c])); }
function escapeSvg(value) { return escapeHtml(value); }
function hexToRgba(hex, alpha = 1) {
  const h = String(hex).replace("#", "");
  const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const bigint = parseInt(full, 16);
  return `rgba(${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}, ${alpha})`;
}
function debounce(fn, wait) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); }; }

init();
