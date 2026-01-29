// Language translations
const translations = {
    en: {
        'title': 'KDW | Writeups',
        'site-title': 'KDW_LABS',
        'intro-title': 'System.root.welcome()',
        'intro-text': 'Documenting my progress in HTB and other platforms. These writeups are summaries made with LLMs from notes I\'ve been taking while doing the machines.',
        'disclaimer': 'All documented processes have been performed in authorized environments.',
        'browse-title': 'ls ./writeups',
        'platform-label': 'PLATFORM',
        'all-platforms': 'All',
        'htb': 'HTB',
        'other': 'Other',
        'difficulty-label': 'DIFFICULTY',
        'all-difficulties': 'All',
        'easy': 'Easy',
        'medium': 'Medium',
        'hard': 'Hard',
        'insane': 'Insane',
        'technique-label': 'SEARCH',
        'technique-placeholder': 'Search machines or techniques',
        'placeholder-text': 'Initializing writeups... 🚀',
        'placeholder-note': '',
        'no-results': 'No matches found.',
        'view-writeup': 'view_report',
        'summary-title': 'Exploitation Summary',
        'active-tag': 'ACTIVE',
        'restricted-title': 'RESTRICTED CONTENT',
        'restricted-text': 'This machine is currently active on Hack The Box. To follow the rules and maintain the challenge integrity, the full writeup is not available yet.'
    },
    es: {
        'title': 'KDW | Writeups',
        'site-title': 'KDW_LABS',
        'intro-title': 'System.root.welcome()',
        'intro-text': 'Documentando mi progreso en HTB y otras plataformas. Estos writeups son resúmenes hechos con LLMs a partir de apuntes que he ido tomando mientras hacía las máquinas.',
        'disclaimer': 'Todos los procesos documentados se han realizado en entornos autorizados.',
        'browse-title': 'ls ./writeups',
        'platform-label': 'PLATAFORMA',
        'all-platforms': 'Todas',
        'htb': 'HTB',
        'other': 'Otras',
        'difficulty-label': 'DIFICULTAD',
        'all-difficulties': 'Todas',
        'easy': 'Fácil',
        'medium': 'Medio',
        'hard': 'Difícil',
        'insane': 'Insane',
        'technique-label': 'BUSCAR',
        'technique-placeholder': 'Busca máquinas o técnicas',
        'placeholder-text': 'Inicializando writeups... 🚀',
        'placeholder-note': '',
        'no-results': 'No hay coincidencias.',
        'view-writeup': 'ver_reporte',
        'summary-title': 'Resumen de Explotación',
        'active-tag': 'ACTIVO',
        'restricted-title': 'CONTENIDO RESTRINGIDO',
        'restricted-text': 'Esta máquina está activa actualmente en Hack The Box. Para cumplir con las reglas y mantener la integridad del desafío, el writeup completo aún no está disponible.'
    }
};

// Current language and theme state
let currentLang = localStorage.getItem('language') || 'es';
let currentTheme = localStorage.getItem('theme') || 'light';

// Machines data
let machinesData = [];

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    initializeLanguage();
    loadMachines();
    setupFilters();
    setupThemeToggle();
    setupLanguageToggle();
    initializeSyntaxHighlighting();
});

// Syntax Highlighting
function initializeSyntaxHighlighting() {
    if (document.querySelector('pre code')) {
        // Load Highlight.js dynamically if not present
        if (typeof hljs === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
            script.onload = () => {
                applyHighlighting();
            };
            document.head.appendChild(script);
        } else {
            applyHighlighting();
        }
    }
}

function applyHighlighting() {
    document.querySelectorAll('pre code').forEach((block) => {
        // Highlight the block
        hljs.highlightElement(block);

        // Identify language and set data-lang on parent pre
        const pre = block.parentElement;
        if (pre && !pre.getAttribute('data-lang')) {
            // Try to get language from class
            let lang = '';
            block.classList.forEach(cls => {
                if (cls.startsWith('language-')) {
                    lang = cls.replace('language-', '');
                }
            });

            // If no class, Highlight.js often identifies it
            if (!lang && block.result) {
                lang = block.result.language;
            }

            // Fallback to simple detection for common patterns if still empty
            if (!lang) {
                const text = block.textContent;
                if (text.includes('Nmap scan report')) lang = 'nmap';
                else if (text.startsWith('#!') || text.includes('sudo ') || text.includes('grep ')) lang = 'bash';
                else if (text.includes('import ') || text.includes('def ')) lang = 'python';
                else if (text.includes('{') && text.includes('}')) lang = 'json';
            }

            if (lang) {
                pre.setAttribute('data-lang', lang);
            }
        }
    });
}

// Theme management
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function () {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon();
    });
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }
}

// Language management
function initializeLanguage() {
    document.documentElement.lang = currentLang;
    updateTranslations();
    updateLanguageButton();
}

function setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function () {
            currentLang = currentLang === 'en' ? 'es' : 'en';
            localStorage.setItem('language', currentLang);
            document.documentElement.lang = currentLang;
            updateTranslations();
            updateLanguageButton();
            updateMachineLanguage();
        });
    }
}

function updateLanguageButton() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.querySelector('span').textContent = currentLang === 'en' ? 'ES' : 'EN';
    }
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });

    // Handle placeholder attributes
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.placeholder = translations[currentLang][key];
        }
    });
}

// Load machines data
function loadMachines() {
    // Use the globally available MACHINES_DATA from machines.js
    // This avoids CORS issues when opening the page as a local file
    if (typeof MACHINES_DATA !== 'undefined') {
        machinesData = MACHINES_DATA;
        displayMachines(machinesData);
    } else {
        console.log('MACHINES_DATA not available');
    }
}
// Display machines
function displayMachines(machines) {
    const container = document.getElementById('writeups-container');
    if (!container) return;

    if (machines.length === 0) {
        container.innerHTML = `<p class="placeholder">${translations[currentLang]['no-results']}</p>`;
        return;
    }

    const platformDisplay = {
        'htb': translations[currentLang]['htb'],
        'other': translations[currentLang]['other']
    };

    const difficultyDisplay = {
        'easy': translations[currentLang]['easy'],
        'medium': translations[currentLang]['medium'],
        'hard': translations[currentLang]['hard'],
        'insane': translations[currentLang]['insane'],
        'unknown': 'Unknown'
    };

    container.innerHTML = machines.map(machine => {
        const difficultyClass = `badge-difficulty-${machine.difficulty}`;
        const platform = platformDisplay[machine.platform] || machine.platform;
        const difficulty = difficultyDisplay[machine.difficulty] || machine.difficulty;

        const techniqueBadges = machine.techniques.map(tech =>
            `<span class="badge badge-technique">${escapeHtml(tech)}</span>`
        ).join('');

        return `
            <div class="writeup-card" onclick="window.location.href='machines/${machine.folder}/index.html'">
                <h3><a href="machines/${machine.folder}/index.html">${escapeHtml(machine.name)}</a></h3>
                <div class="meta">
                    <span class="badge badge-platform">${escapeHtml(platform)}</span>
                    <span class="badge ${difficultyClass}">${escapeHtml(difficulty)}</span>
                    ${machine.status === 'active' ? `<span class="badge badge-active">${translations[currentLang]['active-tag']}</span>` : ''}
                </div>
                <div class="meta" style="margin-bottom: 0.5rem;">
                    ${techniqueBadges}
                </div>
                <a href="machines/${machine.folder}/index.html" class="view-link">
                    ${translations[currentLang]['view-writeup']}()
                </a>
            </div>
        `;
    }).join('');
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Filter setup
function setupFilters() {
    const platformFilter = document.getElementById('platform-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const techniqueFilter = document.getElementById('technique-filter');

    const applyFilters = () => {
        const platform = platformFilter.value;
        const difficulty = difficultyFilter.value;
        const technique = techniqueFilter.value.toLowerCase().trim();

        let filtered = machinesData.filter(machine => {
            // Platform filter
            if (platform !== 'all' && machine.platform !== platform) {
                return false;
            }

            // Difficulty filter
            if (difficulty !== 'all' && machine.difficulty !== difficulty) {
                return false;
            }

            // Search filter (name and techniques)
            if (technique) {
                const nameMatch = machine.name.toLowerCase().includes(technique);
                const techniques = machine.techniques.map(t => t.toLowerCase());
                const techniqueMatch = techniques.some(t => t.includes(technique));

                if (!nameMatch && !techniqueMatch) {
                    return false;
                }
            }

            return true;
        });

        displayMachines(filtered);
    };

    if (platformFilter) {
        platformFilter.addEventListener('change', applyFilters);
    }
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', applyFilters);
    }
    if (techniqueFilter) {
        techniqueFilter.addEventListener('input', applyFilters);
    }
}

function updateMachineLanguage() {
    const enContent = document.getElementById('content-en');
    const esContent = document.getElementById('content-es');

    if (enContent && esContent) {
        if (currentLang === 'es') {
            enContent.style.display = 'none';
            esContent.style.display = 'block';
        } else {
            enContent.style.display = 'block';
            esContent.style.display = 'none';
        }
    }
}

// Also call it once on DOMContentLoaded
document.addEventListener('DOMContentLoaded', updateMachineLanguage);