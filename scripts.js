
// option z für line break
const translations = {
    de: {
        home: ["Home"],
        main_intro_sentence: [
            "Wer <a href='ja_i.html' class='link-style-1'>ich</a> bin, meine<a href='jb_cv.html' class='link-style-1'> beruflichen Erfahrungen </a> und ein paar Gedanken zur<a href='jc_politics.html' class='link-style-1'> Politik</a>",
        ],
        i_header: "Wer <span class='color_highlight'>ich</span> bin",
        i_content: [
                "Luis, geboren 1999 in Hannover, aktuell wohnhaft in Wien.",
                "Ich finde ich bin ein sehr hilfsbereiter, offener und freundlicher Mensch - auch wenn mir die Freundlichkeit nicht immer ins Gesicht geschrieben ist.",
                "Ich bin sehr begeisterungsfähig und neugierig, lerne gerne neue Sachen und brauche immer ein paar Herausforderungen in meinem Leben. Wenn diese auf der Arbeit oder in der Uni fehlen, such ich mir eigene - wie zum Beispiel diese Website bauen. Ich weiß wirklich noch nicht, wofür diese Website mal gut sein wird, aber ich wollte schon immer mal eine bauen – außerdem machts Spaß meine Kreativität ein bisschen herauszufordern.",
                "Neben dem beruflichen und akademischen Zeugs das ich so vollbracht hab (mehr dazu <a class='link-style-1' href=\"jb_cv.html\">hier</a>), übe ich mich in verschiedenen Sportarten. Mit großem Abstand die Nummer Eins ist Fußball, darüber hinaus spiel ich aber auch gern Basketball, gehe joggen oder schwimmen. Ich lese auch gern, möglichst wenig Spannung, sowas wie historische Romane find ich super. Und ich koche viel und gern. Und ich … glaub das reicht erstmal, nicht dass meine Website noch langweilig wird.",
                "<span class='right-align'>~ 10/2024"  
            ],
        cv_header: "Meine <span class='color_highlight'>beruflichen Erfahrungen</span>",
        cv_content: [
            "Bisher habe ich meine gesamte berufliche Karriere bei Continental verbracht – abgesehen von ein paar Schuljobs! Begonnen habe ich mit meinem Dualen Studium, das zwischen drei Monaten Fachhochschule und drei Monaten praktischen Phasen wechselte, wobei ich in verschiedenen Abteilungen praktische Erfahrungen sammelte. Am Ende meines Studiums wechselte ich in meinen ersten Job als <em>Financial Analyst Data Warehouse</em>, wo ich für Teile des Finanzreportings, Automatisierungen von Finance & Controlling Prozessen und den Aufbau von Dashboards für viele Abteilungen verantwortlich war!",
            "Nach zweieinhalb Jahren auf dieser Stelle bin ich nach Wien gezogen, um Teilzeit als <em>Controlling Analyst</em> bei ContiTrade Austria zu arbeiten. Hier kann ich meine Expertise aus meinem vorherigen Job anwenden und gleichzeitig das lokale Controlling kennenlernen. Im Fokus steht bei mir aber aktuell mein Master-Studium Digital Economy an der WU. Unten hab' ich ein paar details festgehalten zu meinen Fachgebieten und akademischen Leistungen. Darüber hinaus habe ich hier <a class='link-style-1' onclick=\"window.location.href='01_files/cv_private.pdf'\" download>meinen Lebenslauf hinterlegt</a>."
        ],
        cv_projects: `
        <ul class='styled-list'>
            <li onclick="toggleContent(this)">Mein Bachelor in BWL<span class="hidden-content"> 
                Ich habe meinen BWL-Bachelor an der Leibniz Fachhochschule absolviert. Durch die Kooperation mit den den Ausbildungsbetrieben wurde ein großer Wert auf einen praktischen, hands-on Ansatz in kleinen Gruppen gelegt. Inhaltlich ging es um Fähigkeiten in Fächern wie Management, Finanzen und Marketing – also ein 08/15 BWL Studium. Was es dann aber doch anders gemacht hat, waren die praktischen Phasen im Betrieb. So konnte ich in sechs verschiedenen Abteilungen Erfahrungen sammeln und herausfinden, wo ich am besten hin passe. Während meiner letzten praktischen Phase im Finance & Controlling bei Continentals Europaweiten Vertriebsgesellschaft und späteren Rolle als Financial Analyst hab ich meine Bachelorarbeit zur Implementierung von Self-Service Business Intelligence geschrieben. Das hat mir einen guten Übergang in meinen ersten richtigen Job gewährt, da ebendiese Implementierung von Self-Service BI eines der Hauptziele in meiner späteren Rolle war.
            </span></li>
            <li onclick="toggleContent(this)">Mein Master in Digital Economy<span class="hidden-content">
                Aktuell absolviere ich einen Master in Digital Economy an der Wirtschaftsuniversität Wien, wo ich mich mit Themen beschäftige, die IT und Wirtschaft verbinden. Von Business Process Management über Data Management bis hin zu Analytics sind die Kurse darauf ausgelegt, Leuten zu helfen wie mir, die sich zwischen Business und IT wohl fühlen. Das Studium an einer großen Universität bietet mir eine spannende aber auch theoretischere Perspektive im Vergleich zu meiner Zeit an einer kleinen FH. Das Programm hab ich <a class='link-style-1' href='https://www.wu.ac.at/en/programs/masters-programs/digital-economy' target='_blank'>hier verlinkt</a>.
            </span></li>
            <li onclick="toggleContent(this)">Power BI Expertise<span class="hidden-content">
                Power BI ist eines meiner Hauptfelder. In den letzten drei Jahren habe ich mehr als 20 komplexe Dashboards entwickelt, die pro Monat bis zu 500 Unique Views hatten. Viele dieser Berichte waren für Finance & Controlling, wie z.B. Verkaufsreports mit Forecasting, G&V-Berichte sowie Lager- und Abwertungsreports. Aber auch für andere Abteilungen wie Operations (Verkaufssimulationen, Telefonanalysen), Vertrieb (Außendienstreports), Revision (Frühwarnberichte) und abteilungsübergreifende Projekte habe ich Dashboards gebaut. Durch die Arbeit mit Power BI habe ich dadurch auch ein tiefes Verständnis für Datenmodelle und aber auch die inhaltlichen Bedürfnisse von verschiedensten Abteilungen und Stakeholdern im Unternehmen entwickelt.
            </span></li>
            <li onclick="toggleContent(this)">Power Automate & Power Apps Expertise<span class="hidden-content">
                Neben Power BI habe ich auch Erfahrungen mit weiteren MS Power Platform-Produkten gesammelt. Mit Power Automate baue ich seit den Praxisphasen meines Bachelors automatisierte Workflows – von kleineren Aufgaben in meinem Arbeitsalltag bis hin zu komplexeren Berechtigungsflows, Flows zur automatisierter Berichtserstellung und Flows für Abteilungsinternes Ressourcenmanagement. In den Flows werden Tool integriert wie SP Lists, Forms, SharePoints, Excel, Outlook und weitere. Auch mit Power Apps bin ich vertraut und habe einfache Websites erstellt, um die Plattform besser kennenzulernen.
            </span></li>
            <li onclick="toggleContent(this)">Projektmanagement<span class="hidden-content">
                Ich habe in verschiedenen Projekten an der Uni und im Job mitgearbeitet und dabei praktische Erfahrungen gesammelt. Aktuell leite ich ein Projekt mit einem crossfunktionalen und internationalen Team, was interessante Herausforderungen mit sich bringt und den Fokus auf gute Zusammenarbeit legt. Neben zahlreichen Projektmanagement Kursen im akademischen und beruflichen Umfeld bin ich auch zertifizierter Projektmanager (IHK).
            </span></li>
            <li onclick="toggleContent(this)">Coding<span class="hidden-content">
                Während meines Bachelors hatte ich wenig Kontakt mit Programmierung. Aber als Financial Analyst DWH habe ich mir SQL 'on the job' beigebracht und es dann auch täglich genutzt. In meinem Masterstudium habe ich dann R und Python erlernt und vor allem für Daten Analysen genutzt. Die Website, die Du gerade offen hast, ist mein erstes Projekt mit HTML, CSS und JavaScript.
            </span></li>
            <li onclick="toggleContent(this)">Und andere interessante Arbeiten<span class="hidden-content">
                Mehr ist immer in Arbeit 😏 🚧
            </span></li>
        </ul>`,        
        politics_header: "Gedanken zur <span class='color_highlight'>Politik</span>",
        politics_intro: [
            "Ich bin ein politisch interessierter Mensch. Ich lese viel und höre mir super viele Podcasts an. Aber mit den ganzen infos mach ich bisher nichts, außer eine enorm fundierte Wahlentscheidung zu treffen alle vier Jahre.",
            "Ich bilde mir ein, komplexe Themengebiete ganz gut zusammenfassen zu können. Meine beruflichen Positionen zwischen IT/Daten und Business Usern haben mich auf die Idee gebracht, politische Zahlen und Daten besser aufzubereiten – so, dass dabei vielleicht neue Blickwinkel entstehen. Aber als ich damit angefangen hab, ist mir aufgefallen, dass es solche datengetriebenen Websites inklusiver Dashboards und Grafiken bereits gibt. Daher möchte ich auf diesen Websites aufbauen und einfach meine Erkenntnisse hinzufügen.",    
        ],
        politics_content: `
            <ul class='styled-list'>
            <li onclick="toggleContent(this)">In
                <span class="hidden-content"> Ich will mir die folgenden Links anschauen: 
                <a class='link-style-1' href='https://www.dashboard-deutschland.de/wertpapiere_finanzen/oeffentliche_finanzen
                ' target='_blank'>Dashboard Deutschland</a>, 
                <a class='link-style-1' href='https://service.destatis.de/DE/vgr-monitor-deutschland/staat.html
                ' target='_blank'>Volkswirtschaftlichen Gesamtrechnungen Monitor</a>, 
                <a class='link-style-1' href='https://www.bundeshaushalt.de/DE/Bundeshaushalt-digital/bundeshaushalt-digital.html
                ' target='_blank'>Bundeshaushalt Digital als Dashboard</a>.
                Aber dazu bin ich noch nicht gekommen. </span>
            </li>
            <li onclick="toggleContent(this)">Bearbeitung
                <span class="hidden-content"> Noch nicht zu gekommen hab ich gesagt 🙄🙄🙄 </span>
            </li>
        </ul>`,        
        disclaimer: "Ich übe nur ein bisschen Website bauen :) ",
        back_button: `<span class="rotated-text">Geh' <button onclick="goBack()">Zurück</button></div></span>`,
        image_captions: {
            img1: "Ich in professionell",
            img2: "Ich mit meinem biggest achievement",
            img3: "Ich in nachdenklich",
            img4: "Ich müde vom Nachdenken",
        },
    },
    en: {
        home: ["Start"],
        main_intro_sentence: [
            "Who <a href='ja_i.html' class='link-style-1'>I</a> am, my<a href='jb_cv.html' class='link-style-1'> professional experiences</a>, and some thoughts on<a href='jc_politics.html' class='link-style-1'> politics</a>"
        ],
        i_header: "Who <span class='color_highlight'>I</span> am",
        i_content: [
                "Luis, born in 1999 in Hannover, currently living in Vienna.",
                "I like to think of myself as a very helpful, open, and friendly person – though I may not always wear that friendliness on my face.",
                "I'm enthusiastic and curious, always eager to learn new things, and it seems like I always need a few challenges in my life. If there aren’t enough at work or university, I find my own – like building this website. Honestly, I’m not quite sure yet what purpose it will serve, but I’ve always wanted to make one. It is also nice to give my creativity a small workout.",
                "Apart from all the professional and academic stuff I’ve done (more about that <a class='link-style-1' href=\"jb_cv.html\">here</a>), I enjoy various sports. Football is by far my number one, but I also like playing basketball, going for a run, or swimming. I enjoy reading too, ideally without too much suspense – historical novels are my thing. I also cook a lot and really enjoy it. And I… well, I think that’s enough for now – wouldn’t want my website to get too boring!",
                "<span class='right-align'>~ 10/2024"  
            ],
        cv_header: "My <span class='color_highlight'>professional experiences</span>",
        cv_content: [
            "I have spent my entire professional career at Continental—aside from juggling a couple of school jobs before, of course! Starting with my integrated bachelor’s program, which alternated between three months of university and three months of practical phases, I got my hands dirty in various departments. I transitioned into my first job as a Financial Analyst in the Data Warehouse at the end of my studies, where I handled financial reporting, automated processes in general, and built dashboards for many departments—making reporting tools less of a headache! Now, I've moved to Vienna to work part-time as a Controlling Analyst at ContiTrade Austria, applying the expertise I've mastered previously while studying Digital Economy at WU. Below, you'll find a detailed overview of my areas of expertise and academic achievements. Also, feel free to <a class='link-style-1' onclick=\"window.location.href='01_files/cv_private.pdf'\" download>download my CV</a>."
        ],
        cv_projects: `
        <ul class='styled-list'>
            <li onclick="toggleContent(this)">My Bachelor in Business Administration<span class="hidden-content"> 
                During my Bachelor of Arts in Business Administration at Leibniz Fachhochschule, I developed a solid foundation in business principles, enhanced by a practical, hands-on approach in small group settings. The program emphasized skills in management, finance, and marketing—basically, your classic business administration recipe. What set it apart was the alternating practical phases and semesters, allowing me to explore six different departments and figure out where I fit best in the business world. While juggling my last practical phase and my later role as a Financial Analyst, I managed to write my bachelor’s thesis on the implementation of Self-Service Business Intelligence. This not only ensured a seamless transition from academia to professional life but also laid the groundwork for my subsequent work in finance and data analysis.
            </span></li>
            <li onclick="toggleContent(this)">My Master's in Digital Economy<span class="hidden-content">
                I'm currently pursuing a Master’s in Digital Economy at Wirtschaftsuniversität Wien, where I’m diving into a range of subjects that bridge IT and business. From Business Process Management to Data Management and Analytics, the courses are geared toward helping professionals like me who somewhere between Business and IT. Studying at a large university gives me a different perspective compared to my time at a small business school. If you are interested you will find the programm with this <a class='link-style-1' href='https://www.wu.ac.at/en/programs/masters-programs/digital-economy' target='_blank'>link</a>.
            </span></li>
            <li onclick="toggleContent(this)">Power BI Expertise<span class="hidden-content">
                Power BI is one of my main areas of expertise. Over the past three years, I've developed more than 20 complex dashboards, with up to 500 unique views per month. Many of these reports were for Finance & Controlling, including sales reports with forecasting, P&L reports, and stock and devaluation reports. I’ve also built dashboards for other departments like Operations (sales simulations, call analyses), Sales (field sales reports), Audit (early-warning reports), and for cross-departmental projects. Working with Power BI has also given me a deep understanding of data models, as well as the diverse needs of various departments and stakeholders within the company.
            </span></li>
            <li onclick="toggleContent(this)">Power Automate & Power Apps Expertise<span class="hidden-content">
                In addition to Power BI, I’ve gained experience with other MS Power Platform products. I’ve been building automated workflows with Power Automate since my Bachelor's practical phases. These range from smaller tasks in my daily work to more complex flows, like automated report distribution, authorization flows or resource management combining tools like SP Lists, Forms, SharePoints, Excel, Outlook and more. I’m also familiar with Power Apps and have built simple websites to learn the platform.
            </span></li>
            <li onclick="toggleContent(this)">Project Management<span class="hidden-content">
                I’ve worked on numerous projects, both at university and at work, gaining valuable experience along the way. I'm also a certified project manager (IHK). Currently, I’m leading a project with a cross-functional and international team, which presents exciting challenges.
            </span></li>
            <li onclick="toggleContent(this)">Coding<span class="hidden-content">
                I didn’t get much exposure to coding during my Bachelor's, but I taught myself SQL on the job, where I ended up using it daily. This hands-on experience helped me develop a solid understanding of working with databases. In my Master’s, I’ve picked up R and Python for analytics. Coding has become something I’m genuinely interested in, and I this website you are currently looking at is my first project with with HTML, CSS, and JavaScript.
            </span></li>
            <li onclick="toggleContent(this)">And Other Interesting Work<span class="hidden-content">
                More is always under Construction 😏 🚧
            </span></li>
        </ul>`,        
        politics_header: "Thoughts on <span class='color_highlight'>politics</span>",
        politics_intro: [
            "I'm very interested in politics. I read a lot and listen to tons of podcasts. But so far, I don't really do much with all this information, except make a well-informed voting decision every four years.",
            "I like to think I'm pretty good at summarizing complex topics. My roles bridging IT/data and business users gave me the idea of presenting political numbers and data in a way that brings fresh perspectives. But as I got into it, I realized there are already some really exciting websites out there, complete with dashboards and graphics. So, I’d rather build on what these sites offer and just share my own insights.",    
            "For now, I won’t be translating my findings, as most of them are specific to Germany.",    
        ],
        politics_content: ``,
        disclaimer: "I am just practicing building websites :)",
        back_button: `<span class="rotated-text">Go <button onclick="goBack()">Back</button></div></span>`,
        image_captions: {
            img1: "Me in professional",
            img2: "Me with my greatest achievement",
            img3: "Me thinking hard(ly)",
            img4: "Me tired from thinking",            
        },
    },
};

function setLanguage(lang) {
    const elementsToUpdate = [
        { id: 'home', content: translations[lang].home },
        { id: 'main_intro_sentence', content: translations[lang].main_intro_sentence.join('<br>') },
        { id: 'disclaimer', content: translations[lang].disclaimer },
        { id: 'back_button', content: translations[lang].back_button },

        { id: 'i_header', content: translations[lang].i_header },
        { id: 'i_content', content: translations[lang].i_content.join('<br><br>') },

        { id: 'cv_header', content: translations[lang].cv_header },
        { id: 'cv_content', content: translations[lang].cv_content.join('<br><br>')  },
        { id: 'cv_projects', content: translations[lang].cv_projects },

        { id: 'politics_header', content: translations[lang].politics_header },
        { id: 'politics_intro', content: translations[lang].politics_intro.join('<br><br>') },
        { id: 'politics_content', content: translations[lang].politics_content },

        { id: 'image_caption_1', content: translations[lang].image_captions.img1 },
        { id: 'image_caption_2', content: translations[lang].image_captions.img2 },
        { id: 'image_caption_3', content: translations[lang].image_captions.img3 },
        { id: 'image_caption_4', content: translations[lang].image_captions.img4 },

    ];

    // Loop over elements and update their content if they exist
    elementsToUpdate.forEach(element => {
        const el = document.getElementById(element.id);
        if (el) {
            el.innerHTML = element.content;
        }
    });

    // Update button styles after setting the language
    updateButtonStyles(lang);

    // Save the selected language in local storage
    localStorage.setItem('selectedLanguage', lang);

    // Update the gallery with the selected language
    updateImage(); // Add this line to ensure gallery caption updates with language

}

function updateCopyrightText() {
    const copyrightElement = document.querySelector('.bottom-left span');
    
    if (!copyrightElement) {
        // Retry the function after a short delay if the element is not yet available
        setTimeout(updateCopyrightText, 100); // Retry in 100ms
        return;
    }
    
    const isSmallScreen = window.innerWidth <= 38 * 16; // Adjust if needed
    if (isSmallScreen) {
        copyrightElement.innerHTML = '© 2024'; // Short version for small screens
    } else {
        copyrightElement.innerHTML = '© Luis Ruhländer 2024'; // Full version for larger screens
    }
}

// Call updateCopyrightText on resize and after DOM is loaded
window.addEventListener('resize', updateCopyrightText);
document.addEventListener('DOMContentLoaded', () => {
    updateCopyrightText(); // Ensure it runs on load
});


function toggleContent(listItem) {
    const hiddenContent = listItem.querySelector('.hidden-content');
    if (hiddenContent) {
        // Toggle between showing and hiding the content
        if (hiddenContent.style.display === 'none' || !hiddenContent.style.display) {
            hiddenContent.style.display = 'block'; // Show the content
        } else {
            hiddenContent.style.display = 'none'; // Hide the content
        }
    }
}


function updateButtonStyles(lang) {
    const buttons = document.querySelectorAll('.language-button');
    buttons.forEach(button => {
        button.classList.toggle('active', button.id === `lang-${lang}`);
    });
}

// Load the language and update the copyright text on initial load
function loadLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'de'; // Default to German if not saved
    setLanguage(savedLanguage); // Set the saved or default language
    updateCopyrightText(); // Update copyright text based on screen size
}

window.addEventListener('resize', updateCopyrightText);


function loadContent(file, elementId) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            loadLanguage(); // Load language after content is loaded
        })
        .catch(error => console.error('Error loading content:', error));
}

// Load corner buttons on the page
loadContent('k_corners.html', 'common-boxes');

function goBack() {
    window.history.back();
}

function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log(`Viewport height: ${vh * 100}px`);
    // document.getElementById('viewport-height-display').innerHTML = `${vh * 100}px`;
}

// Set vh when the page loads
setVh();
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);

// Prevent scrolling if content is overflowing
window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';
});

// Gallery script
const images = [
    "01_files/i/1.jpg",
    "01_files/i/2.jpg",
    "01_files/i/3.jpeg",
    "01_files/i/4.jpeg"
];

// Map to the image caption keys in translations directly
const captions = [
    'img1',  // First image
    'img2',  // Second image
    'img3',  // Third image
    'img4'   // Fourth image
];


let currentIndex = 0;

const currentImage = document.getElementById('current-image');
const currentCaption = document.getElementById('current-caption');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function updateImage() {
    currentImage.src = images[currentIndex];

    // Get the currently selected language dynamically from the global state
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'de';  // Default to German if not saved
    
    // Update the caption based on the current image and selected language
    const captionKey = captions[currentIndex]; // Get the correct key (e.g., 'img1')
    currentCaption.innerHTML = translations[savedLanguage].image_captions[captionKey]; // Fetch the caption
}



// Event listeners for gallery controls
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop to last image
    updateImage();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length; // Loop to first image
    updateImage();
});

// Call updateImage initially to set the first image and caption
updateImage();
