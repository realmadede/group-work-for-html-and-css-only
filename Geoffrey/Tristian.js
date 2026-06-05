document.addEventListener('DOMContentLoaded', function() {

    // SKILLS TOGGLE (Expand/Collapse)
    function initSkillsToggle() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(function(item) {
            item.addEventListener('click', function(e) {
                // Stop click from bubbling up to parent elements
                e.stopPropagation();
                // Find the skill-details paragraph inside this skill item
                const details = this.querySelector('.skill-details');
                if (details) {
                    details.classList.toggle('hidden');
                }
            });
        });
    }

    // EDUCATION TABLE SORT 
    let sortDirection = 'asc'; 

    function initTableSort() {
        const sortBtn = document.getElementById('sortBtn');
        if (!sortBtn) return;

        sortBtn.addEventListener('click', function() {
            const table = document.getElementById('educationTable');
            const tbody = table.querySelector('tbody');
            // Get all rows inside tbody as an array
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            // Extract year number from the Year column
            const getYearValue = (row) => {
                const yearCell = row.cells[2];
                const yearText = yearCell.textContent.trim();
                // Extract first 4-digit number (start year)
                const match = yearText.match(/\d{4}/);
                if (match) {
                    return parseInt(match[0], 10);
                }
                return 0;
            };

            // Sort rows based on year value
            rows.sort(function(a, b) {
                const yearA = getYearValue(a);
                const yearB = getYearValue(b);
                if (sortDirection === 'asc') {
                    return yearA - yearB;
                } else {
                    return yearB - yearA;
                }
            });

            // Re-append sorted rows to tbody
            rows.forEach(function(row) {
                tbody.appendChild(row);
            });

            // Toggle direction for next click
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            sortBtn.textContent = sortDirection === 'asc' ? 'Sort by Year (Ascending)' : 'Sort by Year (Descending)';
        });
    }

    //3. HOBBIES READ MORE / READ LESS 
    function initHobbiesReadMore() {
        const hobbyDescriptions = document.querySelectorAll('.hobby-desc');
        
        hobbyDescriptions.forEach(function(desc) {
            // Create the button
            const btn = document.createElement('button');
            btn.textContent = 'Read More';
            btn.className = 'readMoreBtn';
            
            // Insert button after the description paragraph
            desc.insertAdjacentElement('afterend', btn);
            
            // Add click event to toggle expanded state
            btn.addEventListener('click', function() {
                const isExpanded = desc.classList.contains('expanded');
                if (isExpanded) {
                    desc.classList.remove('expanded');
                    btn.textContent = 'Read More';
                } else {
                    desc.classList.add('expanded');
                    btn.textContent = 'Read Less';
                }
            });
        });
    }

    // 4. IMAGE LIGHTBOX 
    let lightbox = null;

    function initLightbox() {
        // Create lightbox container and append to body
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <span class="close-lightbox">&times;</span>
            <img src="" alt="Enlarged view">
        `;
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.close-lightbox');
        
        // Close lightbox when clicking on background or close button
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target === closeBtn) {
                lightbox.style.display = 'none';
                lightboxImg.src = '';
            }
        });
        
        // Add click listeners to all images that should open in lightbox
        // Profile image (main avatar)
        const profileImg = document.querySelector('.image img');
        if (profileImg) {
            profileImg.addEventListener('click', function() {
                lightboxImg.src = this.src;
                lightbox.style.display = 'flex';
            });
        }
        
        // Gallery images
        const galleryImgs = document.querySelectorAll('.gallery img');
        galleryImgs.forEach(function(img) {
            img.addEventListener('click', function() {
                lightboxImg.src = this.src;
                lightbox.style.display = 'flex';
            });
        });
    }

    // 5. SCROLL-TO-TOP BUTTON
    function initScrollToTop() {
        // Create button
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollTopBtn';
        scrollBtn.textContent = '↑ Top';
        document.body.appendChild(scrollBtn);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
        
        // Smooth scroll to top on click
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 6. DARK MODE TOGGLE
        function initDarkModeToggle() {
        const themeBtn = document.getElementById('themeBtn');
        if (!themeBtn) return;
        
        // Check localStorage for saved preference (optional but user-friendly)
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'enabled') {
            document.body.classList.add('dark-mode');
            themeBtn.textContent = ' Light Mode';
        }
        
        themeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            if (isDark) {
                themeBtn.textContent = ' Light Mode';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                themeBtn.textContent = ' Dark Mode';
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // INITIALISE ALL FEATURES
    // Call each initialisation function
    initSkillsToggle();
    initTableSort();
    initHobbiesReadMore();
    initLightbox();
    initScrollToTop();
    initDarkModeToggle();

});