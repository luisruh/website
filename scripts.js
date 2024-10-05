
const translations = {
    de: {
        main_intro_sentence: [
            "Wer <a href='ja_i.html' class='link-style-1'>ich</a> bin, meine<a href='jb_cv.html' class='link-style-1'> beruflichen Erfahrungen </a> und Gedanken zur<a href='jc_politics.html' class='link-style-1'> Politik</a>",
        ],
        i_header: "Wer <span class='color_highlight'>ich</span> bin",
        i_content: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
                "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.",
            ],
        cv_header: "Meine <span class='color_highlight'>beruflichen Erfahrungen</span>",
        cv_content: [
            "Ich habe meine gesamte berufliche Karriere bei Continental verbracht – abgesehen davon, dass ich natürlich ein paar Schuljobs gemacht habe! Begonnen habe ich mit meinem integrierten Bachelor-Programm, das zwischen drei Monaten Universität und drei Monaten praktischen Phasen wechselte, wobei ich in verschiedenen Abteilungen praktische Erfahrungen sammelte. Am Ende meines Studiums wechselte ich in meinen ersten Job als Financial Analyst im Data Warehouse, wo ich für das Finanzreporting, die Automatisierung von Prozessen im Allgemeinen und den Aufbau von Dashboards für viele Abteilungen verantwortlich war – das Reporting weniger zu einer Herausforderung machte! Jetzt bin ich nach Wien gezogen, um Teilzeit als Controlling Analyst bei ContiTrade Austria zu arbeiten und das Wissen anzuwenden, das ich zuvor während meines Studiums der Digital Economy an der WU erworben habe. Unten finden Sie eine detaillierte Übersicht über meine Fachgebiete und akademischen Leistungen. Fühlen Sie sich auch frei, <a class='link-style-1' onclick=\"window.location.href='01_files/cv_private.pdf'\" download>meinen Lebenslauf herunterzuladen</a>."
        ],
        cv_projects: `
        <ul class='styled-list'>
            <li onclick="toggleContent(this)">Mein Bachelor<span class="hidden-content"> 
                Während meines Bachelor of Arts in Betriebswirtschaftslehre an der Leibniz Fachhochschule habe ich eine solide Grundlage in betriebswirtschaftlichen Prinzipien entwickelt, die durch einen praktischen, hands-on Ansatz in kleinen Gruppen ergänzt wurde. Das Programm legte Wert auf Fähigkeiten in Management, Finanzen und Marketing – im Grunde genommen Ihr klassisches Rezept für Betriebswirtschaft. Was es auszeichnete, waren die wechselnden praktischen Phasen und Semester, die es mir ermöglichten, sechs verschiedene Abteilungen zu erkunden und herauszufinden, wo ich am besten in der Geschäftswelt passe. Während ich meine letzte praktische Phase und meine spätere Rolle als Financial Analyst jonglierte, gelang es mir, meine Bachelorarbeit zur Implementierung von Self-Service Business Intelligence zu schreiben. Dies gewährte nicht nur einen nahtlosen Übergang von der Wissenschaft in das Berufsleben, sondern legte auch den Grundstein für meine anschließende Arbeit im Finanz- und Datenanalysebereich.
            </span></li>
            <li onclick="toggleContent(this)">Was mein Master in Digital Economy umfasst<span class="hidden-content">
                Ich absolviere derzeit einen Master in Digital Economy an der Wirtschaftsuniversität Wien, wo ich mich mit einer Vielzahl von Themen beschäftige, die IT und Wirtschaft verbinden. Von Business Process Management über Data Management bis hin zu Analytics sind die Kurse darauf ausgelegt, Fachleuten wie mir – die im Projektmanagement und in der Beratung arbeiten – praktische Fähigkeiten für den heutigen Arbeitsmarkt zu vermitteln. Das Studium an einer großen Universität bietet mir eine andere Perspektive im Vergleich zu meiner Zeit an einer kleinen Wirtschaftsschule. Wenn Sie interessiert sind, finden Sie das Programm über diesen <a class='link-style-1' href='https://www.wu.ac.at/en/programs/masters-programs/digital-economy' target='_blank'>Link</a>.
            </span></li>
            <li onclick="toggleContent(this)">Masterarbeit<span class="hidden-content">
                Wird geschrieben.
            </span></li>
            <li onclick="toggleContent(this)">Power BI Expertise<span class="hidden-content">
                Zusätzliche Informationen zu meiner Power BI-Expertise.
            </span></li>
            <li onclick="toggleContent(this)">Projektmanagement<span class="hidden-content">
                Zusätzliche Informationen zu anderen Projekten.
            </span></li>
            <li onclick="toggleContent(this)">IT & Codierung<span class="hidden-content">
                Zusätzliche Informationen zu IT & Codierung.
            </span></li>
            <li onclick="toggleContent(this)">Und andere interessante Arbeiten<span class="hidden-content">
                Zusätzliche Informationen zu anderen Projekten.
            </span></li>
        </ul>`,        
        politics_header: "Gedanken zur <span class='color_highlight'>Politik</span>",
        politics_content: `
            <ul class='styled-list'>
            <li onclick="toggleContent(this)">In
                <span class="hidden-content"> - das heitß noch nichts fertig</span>
            </li>
            <li onclick="toggleContent(this)">Bearbeitung
                <span class="hidden-content"> - 🙄🙄🙄 </span>

        </ul>`,        
        disclaimer: "Ich übe nur ein bisschen Website bauen :) ",
        back_button: `<span class="rotated-text">Geh' <button onclick="goBack()">Zurück</button></div></span>`
    },
    en: {
        main_intro_sentence: [
            "Who <a href='ja_i.html' class='link-style-1'>I</a> am, my<a href='jb_cv.html' class='link-style-1'> professional experiences</a>, and thoughts on<a href='jc_politics.html' class='link-style-1'> politics</a>"
        ],
        i_header: "Who <span class='color_highlight'>I</span> am",
        i_content: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
                "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. ",    
            ],
        cv_header: "My <span class='color_highlight'>professional experiences</span>",
        cv_content: [
            "I have spent my entire professional career at Continental—aside from juggling a couple of school jobs before, of course! Starting with my integrated bachelor’s program, which alternated between three months of university and three months of practical phases, I got my hands dirty in various departments. I transitioned into my first job as a Financial Analyst in the Data Warehouse at the end of my studies, where I handled financial reporting, automated processes in general, and built dashboards for many departments—making reporting tools less of a headache! Now, I've moved to Vienna to work half-time as a Controlling Analyst at ContiTrade Austria, applying the expertise I've mastered previously while studying Digital Economy at WU. Below, you'll find a detailed overview of my areas of expertise and academic achievements. Also, feel free to <a class='link-style-1' onclick=\"window.location.href='01_files/cv_private.pdf'\" download>download my CV</a>."
        ],
        cv_projects: `
        <ul class='styled-list'>
            <li onclick="toggleContent(this)">My Bachelor<span class="hidden-content"> 
                During my Bachelor of Arts in Business Administration at Leibniz Fachhochschule, I developed a solid foundation in business principles, enhanced by a practical, hands-on approach in small group settings. The program emphasized skills in management, finance, and marketing—basically, your classic business administration recipe. What set it apart was the alternating practical phases and semesters, allowing me to explore six different departments and figure out where I fit best in the business world. While juggling my last practical phase and my later role as a Financial Analyst, I managed to write my bachelor’s thesis on the implementation of Self-Service Business Intelligence. This not only ensured a seamless transition from academia to professional life but also laid the groundwork for my subsequent work in finance and data analysis.
            </span></li>
            <li onclick="toggleContent(this)">What My Master's in Digital Economy Entails<span class="hidden-content">
                I'm currently pursuing a Master’s in Digital Economy at Wirtschaftsuniversität Wien, where I’m diving into a range of subjects that bridge IT and business. From Business Process Management to Data Management and Analytics, the courses are geared toward helping professionals like me—who work in project management and consulting—gain practical skills for today’s job market. Studying at a large university gives me a different perspective compared to my time at a small business school. If you are interested you will find the programm with this <a class='link-style-1' href='https://www.wu.ac.at/en/programs/masters-programs/digital-economy' target='_blank'>link</a>.
            </span></li>
            <li onclick="toggleContent(this)">Master's Thesis<span class="hidden-content">
                To be written.
            </span></li>
            <li onclick="toggleContent(this)">Power BI Expertise<span class="hidden-content">
                Additional information about my Power BI expertise.
            </span></li>
            <li onclick="toggleContent(this)">Project Management<span class="hidden-content">
                Additional information about other projects.
            </span></li>
            <li onclick="toggleContent(this)">IT & Coding<span class="hidden-content">
                Additional information about IT & Coding.
            </span></li>
            <li onclick="toggleContent(this)">And Other Interesting Work<span class="hidden-content">
                Additional information about other projects.
            </span></li>
        </ul>`,        
        politics_header: "Thoughts on <span class='color_highlight'>politics</span>",
        politics_into: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
            "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. ",    
        ],
        politics_content: `
            <ul class='styled-list'>
            <li onclick="toggleContent(this)">In
                <span class="hidden-content">Told you duh</span>
            </li>
            <li onclick="toggleContent(this)">Progress
                <span class="hidden-content">🙄🙄🙄</span>

        </ul>`,
        disclaimer: "I am just practicing building websites :)",
        back_button: `<span class="rotated-text">Go <button onclick="goBack()">Back</button></div></span>`
    },
};

function setLanguage(lang) {
    const elementsToUpdate = [
        { id: 'main_intro_sentence', content: translations[lang].main_intro_sentence.join('<br>') },
        { id: 'disclaimer', content: translations[lang].disclaimer },
        { id: 'back_button', content: translations[lang].back_button },

        { id: 'i_header', content: translations[lang].i_header },
        { id: 'i_content', content: translations[lang].i_content.join('<br><br>') },

        { id: 'cv_header', content: translations[lang].cv_header },
        { id: 'cv_content', content: translations[lang].cv_content.join('<br><br>')  },
        { id: 'cv_projects', content: translations[lang].cv_projects },

        { id: 'politics_header', content: translations[lang].politics_header },
        { id: 'politics_intro', content: translations[lang].politics_intro },
        { id: 'politics_content', content: translations[lang].politics_content }
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
}

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

function loadLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'de'; // Default to German if not saved
    setLanguage(savedLanguage); // Set the saved or default language
}

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
