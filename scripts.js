const translations = {
    de: {
        main_intro_sentence: [
            "Wer <a href='b_about.html' class='link-style-1'>ich bin</a>,",
            "<a href='b_work.html' class='link-style-1'>meine Arbeit</a> und meine",
            "Ideen über <a href='b_politics.html' class='link-style-1'>Politik</a>",
        ],
        about_header: "Wer ich bin",
        about_content: "Ich bin Luis.",
        work_header: "Meine Arbeit",
        work_content: "<ul class='styled-list'><li>Bachelorarbeit</li><li>Masterarbeit</li><li>Power BI Expertise</li><li>und keine Ahnung was noch</li></ul>",
        politics_header: "Ideen über Politik",
        politics_content:  "<ul class='styled-list'><li>In</li><li>Bearbeitung</li></ul>", // Schwarze Null, Sozialleistungen, Umweltschutz
        disclaimer: "Falls du dich hierher verirrt hast, ich übe nur ein bisschen website bauen."
    },
    en: {
        main_intro_sentence: [
            "Who <a href='b_about.html' class='link-style-1'>I Am</a>,",
            "<a href='b_work.html' class='link-style-1'>my work</a> and my",
            "ideas about <a href='b_politics.html' class='link-style-1'>politics</a>",
        ],
        about_header: "Who I am",
        about_content: "I am Luis.",
        work_header: "My Work",
        work_content: "<ul class='styled-list'><li>Bachelor Thesis</li><li>Master Thesis</li><li>Power BI Expertise</li><li>and no idea what else</li></ul>",
        politics_header: "Ideas about Politics",
        politics_content: "<ul class='styled-list'><li>Work</li><li>In</li><li>Progress</li></ul>",
        disclaimer: "If you ended up here by mistake, I am just practicing building websites."
    },
};

function setLanguage(lang) {
    const mainIntroElement = document.getElementById('main_intro_sentence');
    const aboutHeaderElement = document.getElementById('about_header');
    const aboutContentElement = document.getElementById('about_content');
    const workHeaderElement = document.getElementById('work_header');
    const workContentElement = document.getElementById('work_content');
    const politicsHeaderElement = document.getElementById('politics_header');
    const politicsContentElement = document.getElementById('politics_content');
    const disclaimerElement = document.getElementById('disclaimer'); // For the star disclaimer


    // Check if mainIntroElement exists and update
    if (mainIntroElement) {
        mainIntroElement.innerHTML = translations[lang].main_intro_sentence.join('<br>');
    }

    // Check if aboutHeaderElement exists and update
    if (aboutHeaderElement) {
        aboutHeaderElement.innerHTML = translations[lang].about_header;
    }

    // Check if aboutContentElement exists and update
    if (aboutContentElement) {
        aboutContentElement.innerHTML = translations[lang].about_content;
    }

    // Check if workHeaderElement exists and update
    if (workHeaderElement) {
        workHeaderElement.innerHTML = translations[lang].work_header;
    }

    // Check if workContentElement exists and update
    if (workContentElement) {
        workContentElement.innerHTML = translations[lang].work_content;
    }

    // Check if politicsHeaderElement exists and update
    if (politicsHeaderElement) {
        politicsHeaderElement.innerHTML = translations[lang].politics_header;
    }

    // Check if politicsContentElement exists and update
    if (politicsContentElement) {
        politicsContentElement.innerHTML = translations[lang].politics_content;
    }

    // Update the star disclaimer if it exists
    if (disclaimerElement) {
        disclaimerElement.innerHTML = translations[lang].disclaimer;
    }

    // Update button styles after setting the language
    updateButtonStyles(lang);

    // Save the selected language in local storage
    localStorage.setItem('selectedLanguage', lang);
}


function updateButtonStyles(lang) {
    const buttons = document.querySelectorAll('.language-button');
    buttons.forEach(button => {
        if (button.id === `lang-${lang}`) {
            button.classList.add('active'); // Highlight active button
        } else {
            button.classList.remove('active'); // Remove highlight from inactive button
        }
    });
}

function loadLanguage() {
    // Check if a language is saved in local storage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const defaultLanguage = 'de'; // Default to German if no language is saved
  
    // If there's a saved language, use it; otherwise, use the default language
    const languageToSet = savedLanguage || defaultLanguage;
    setLanguage(languageToSet); // Pass the retrieved language
  
    // Update button styles after setting the language
    updateButtonStyles(languageToSet); // Pass the retrieved language
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
            loadLanguage(); // Load the language after content has been loaded
        })
        .catch(error => console.error('Error loading content:', error));
}

// Call the loadContent function to load the corner buttons
loadContent('c_corners.html', 'common-boxes');

function goBack() {
    window.history.back(); // Goes back to the previous page
}
