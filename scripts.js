
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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
            "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. ",    
            "Hier kannste gern meinen <button onclick=\"window.location.href='01_files/cv_private.pdf'\" download>Lebenslauf herunterzuladen</button>.<br>"
        ],
        cv_projects: `
            <ul class='styled-list'>
                <li onclick="toggleContent(this)">
                    Bachelor Thesis
                    <span class="hidden-content">Additional information about the Bachelor Thesis.</span>
                </li>
                <li onclick="toggleContent(this)">
                    Master Thesis
                    <span class="hidden-content">Additional information about the Master Thesis.</span>
                </li>
                <li onclick="toggleContent(this)">
                    Power BI Expertise
                    <span class="hidden-content">Additional information about Power BI Expertise.</span>
                </li>
                <li onclick="toggleContent(this)">
                    and no idea what else
                    <span class="hidden-content">Additional information about other work.</span>
                </li>
            </ul>
            `,
        politics_header: "Gedanken zur <span class='color_highlight'>Politik</span>",
        politics_content: `
            <ul class='styled-list'>
            <li onclick="toggleContent(this)">In
                <span class="hidden-content"> - das heitß noch nichts fertig</span>
            </li>
            <li onclick="toggleContent(this)">Bearbeitung
                <span class="hidden-content"> - 🙄🙄🙄 </span>

        </ul>`,        
        disclaimer: "Ich übe nur ein bisschen Website bauen :) "
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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
            "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. ",    
            "Feel free to <button onclick=\"window.location.href='01_files/cv_private.pdf'\" download>download my CV</button>."
        ],
        cv_projects: `
        <ul class='styled-list'>
            <li onclick="toggleContent(this)">Bachelorarbeit
                <span class="hidden-content"> - Zusätzliche Informationen über die Bachelorarbeit.</span>
            </li>
            <li onclick="toggleContent(this)">Masterarbeit
                <span class="hidden-content"> - Zusätzliche Informationen über die Masterarbeit.</span>
            </li>
            <li onclick="toggleContent(this)">Power BI Expertise
                <span class="hidden-content"> - Zusätzliche Informationen über die Power BI Expertise.</span>
            </li>
            <li onclick="toggleContent(this)">und keine Ahnung was sonst
                <span class="hidden-content"> - Zusätzliche Informationen über andere Arbeiten.</span>
            </li>
        </ul>`,
        politics_header: "Thoughts on <span class='color_highlight'>politics</span>",
        politics_into: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
            "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. ",    
        ],
        politics_content: `
            <ul class='styled-list'>
            <li onclick="toggleContent(this)">In
                <span class="hidden-content"> - Told you dah</span>
            </li>
            <li onclick="toggleContent(this)">Progress
                <span class="hidden-content"> - 🙄🙄🙄 </span>

        </ul>`,
        disclaimer: "I am just practicing building websites :)"
    },
};

function setLanguage(lang) {
    const elementsToUpdate = [
        { id: 'main_intro_sentence', content: translations[lang].main_intro_sentence.join('<br>') },
        { id: 'disclaimer', content: translations[lang].disclaimer },

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
    document.getElementById('viewport-height-display').innerHTML = `${vh * 100}px`;
}

// Set vh when the page loads
setVh();
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);

// Prevent scrolling if content is overflowing
window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';
});