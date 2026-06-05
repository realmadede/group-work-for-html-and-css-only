// Runs all initialization functions once the HTML content is completely loaded
document.addEventListener('DOMContentLoaded', () => {
    initSkillsToggle();
    initEducationSort();
    initHobbiesToggle();
    initImageLightbox();
    initScrollToTop();
    initDarkModeToggle();
});

// Sets up clickable skill items that toggle the visibility of their nested lists
function initSkillsToggle() {
    const skills = document.querySelectorAll('.scrollable > ul > li');

    skills.forEach(skill => {
        const subList = skill.querySelector('ul');

        if (subList) {
            subList.style.display = 'none';
            skill.style.cursor = 'pointer';

            skill.addEventListener('click', (e) => {
                if (e.target === skill || skill.firstChild.contains(e.target)) {
                    subList.style.display =
                        subList.style.display === 'none'
                            ? 'block'
                            : 'none';
                }
            });
        }
    });
}

// Adds a button to the education table header to sort rows by academic year
function initEducationSort() {
    const table = document.querySelector('.scrollable table');

    if (!table) return;

    const headerRow = table.querySelector('tr');

    const sortBtn = document.createElement('button');
    sortBtn.textContent = '↕ Sort Year';

    Object.assign(sortBtn.style, {
        marginLeft: '10px',
        padding: '2px 5px',
        cursor: 'pointer'
    });

    headerRow.cells[2].appendChild(sortBtn);

    let ascending = true;

    sortBtn.addEventListener('click', () => {
        const rows = Array.from(table.querySelectorAll('tr')).slice(1);

        rows.sort((a, b) => {
            const yearA = a.cells[2].textContent.trim();
            const yearB = b.cells[2].textContent.trim();

            return ascending
                ? yearA.localeCompare(yearB)
                : yearB.localeCompare(yearA);
        });

        ascending = !ascending;

        rows.forEach(row => table.appendChild(row));
    });
}

// Limits long hobby text to two lines and provides a clickable read more toggle
function initHobbiesToggle() {
    const hobbyItems = document.querySelectorAll('.scrollable h4 + ul > li');

    hobbyItems.forEach(item => {
        const textNode = Array.from(item.childNodes).find(
            node =>
                node.nodeType === Node.TEXT_NODE &&
                node.textContent.trim().length > 0
        );

        if (!textNode) return;

        const wrapper = document.createElement('div');

        Object.assign(wrapper.style, {
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
        });

        item.insertBefore(wrapper, textNode);
        wrapper.appendChild(textNode);

        const toggleBtn = document.createElement('span');
        toggleBtn.textContent = 'Read More';

        Object.assign(toggleBtn.style, {
            color: '#00abf0',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            display: 'block',
            marginTop: '4px'
        });

        item.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            if (wrapper.style.display === '-webkit-box') {
                wrapper.style.display = 'block';
                toggleBtn.textContent = 'Read Less';
            } else {
                wrapper.style.display = '-webkit-box';
                toggleBtn.textContent = 'Read More';
            }
        });
    });
}

// Intercepts image clicks to display them inside a centered full screen overlay
function initImageLightbox() {
    const targets = document.querySelectorAll('.image img, .gallery img');

    if (!targets.length) return;

    const box = document.createElement('div');

    Object.assign(box.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'none',
        zIndex: '2000',
        justifyContent: 'center',
        alignItems: 'center'
    });

    const view = document.createElement('img');

    Object.assign(view.style, {
        maxWidth: '85%',
        maxHeight: '85%',
        borderRadius: '6px'
    });

    const close = document.createElement('button');
    close.textContent = '✕';

    Object.assign(close.style, {
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '30px',
        cursor: 'pointer'
    });

    box.appendChild(view);
    box.appendChild(close);
    document.body.appendChild(box);

    targets.forEach(img => {
        img.style.cursor = 'zoom-in';

        img.addEventListener('click', () => {
            view.src = img.src;
            box.style.display = 'flex';
        });
    });

    close.addEventListener('click', () => {
        box.style.display = 'none';
    });

    box.addEventListener('click', (e) => {
        if (e.target !== view) {
            box.style.display = 'none';
        }
    });
}

// Monitors window scrolling to reveal or hide the smooth scroll to top action button
function initScrollToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '▲';

    Object.assign(btn.style, {
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        display: 'none',
        zIndex: '1500',
        padding: '12px 15px',
        backgroundColor: '#264653',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer'
    });

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Creates a Dark/Light Mode toggle button
function initDarkModeToggle() {
    const targetNav = document.querySelector('.header .navbar');

    if (!targetNav) return;

    // Theme styles
    const style = document.createElement('style');

    style.textContent = `
        body{
            background:#0d1b2a;
            color:#ffffff;
            transition:all .3s ease;
        }

        body.light-mode{
            background:#f8f9fa;
            color:#1b263b;
        }

        body.light-mode .header{
            background:#f4a261;
        }

        body.light-mode .navbar a,
        body.light-mode .name,
        body.light-mode h1,
        body.light-mode h2,
        body.light-mode h3,
        body.light-mode h4,
        body.light-mode p,
        body.light-mode li{
            color:#1b263b;
        }

        body.light-mode .scrollable{
            background:#ffffff;
        }

        body.light-mode table,
        body.light-mode table th,
        body.light-mode table td{
            border-color:#1b263b;
        }

        body.light-mode .scrollToTop{
            background:#f4a261;
            color:#1b263b;
        }
    `;

    document.head.appendChild(style);

    // Create toggle button
    const toggle = document.createElement('button');

    toggle.id = 'themeBtn';
    toggle.textContent = '☀️ Light Mode';

    Object.assign(toggle.style, {
        padding: '6px 12px',
        marginLeft: '10px',
        cursor: 'pointer',
        background: '#264653',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        fontWeight: '600'
    });

    targetNav.appendChild(toggle);

    // Load saved preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        toggle.textContent = '🌙 Dark Mode';
        toggle.style.background = '#f4a261';
        toggle.style.color = '#1b263b';
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        const isLight =
            document.body.classList.contains('light-mode');

        if (isLight) {
            toggle.textContent = '🌙 Dark Mode';
            toggle.style.background = '#f4a261';
            toggle.style.color = '#1b263b';
            localStorage.setItem('theme', 'light');
        } else {
            toggle.textContent = '☀️ Light Mode';
            toggle.style.background = '#264653';
            toggle.style.color = '#ffffff';
            localStorage.setItem('theme', 'dark');
        }
    });
}