document.addEventListener('DOMContentLoaded', () => {

  /* ---------- A. Skills: click to expand/collapse details ---------- */
  const skillItems = document.querySelectorAll('.skills-list li');
  skillItems.forEach(li => {
    const details = li.querySelector('.skill-details');
    if (!details) return;

    // Start collapsed
    details.style.display = 'none';
    li.style.cursor = 'pointer';

    li.addEventListener('click', (e) => {
      // ignore clicks that originated inside the details paragraph itself
      if (e.target === details) return;
      li.classList.toggle('open');
      details.style.display = li.classList.contains('open') ? 'block' : 'none';
    });
  });

  /* ---------- B. Education table — sort by Year ---------- */
  const sortBtn = document.getElementById('sortBtn');
  const table = document.getElementById('educationTable');
  if (sortBtn && table) {
    let ascending = true;

    const getStartYear = (text) => {
      const match = String(text).match(/\d{4}/);
      return match ? parseInt(match[0], 10) : 0;
    };

    sortBtn.addEventListener('click', () => {
      const rows = Array.from(table.querySelectorAll('tr'));
      const header = rows.shift(); // keep header row
      const dataRows = rows.filter(r => r.querySelectorAll('td').length > 0);

      dataRows.sort((a, b) => {
        const yearA = getStartYear(a.cells[2].textContent);
        const yearB = getStartYear(b.cells[2].textContent);
        return ascending ? yearA - yearB : yearB - yearA;
      });

      // Re-append in new order
      table.innerHTML = '';
      table.appendChild(header);
      dataRows.forEach(r => table.appendChild(r));

      sortBtn.textContent = ascending
        ? 'Sort by Year (Descending)'
        : 'Sort by Year (Ascending)';
      ascending = !ascending;
    });
  }

  /* ---------- C. Hobbies: Read More / Read Less ---------- */
  const readMoreBtns = document.querySelectorAll('.read-more-btn');
  readMoreBtns.forEach(btn => {
    const hobbyText = btn.parentElement.querySelector('.hobby-text');
    if (!hobbyText) return;

    const fullText = hobbyText.textContent.trim();
    const shortText = fullText.slice(0, 100) + (fullText.length > 100 ? '...' : '');
    let expanded = false;

    hobbyText.textContent = shortText;

    btn.addEventListener('click', () => {
      expanded = !expanded;
      hobbyText.textContent = expanded ? fullText : shortText;
      btn.textContent = expanded ? 'Read Less' : 'Read More';
      hobbyText.classList.toggle('expanded', expanded);
    });
  });

  /* ---------- D. Image Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeLightbox = document.getElementById('closeLightbox');
  const galleryImgs = document.querySelectorAll('.gallery-img');

  if (lightbox && lightboxImg) {
    // Style the lightbox via inline styles (CSS is final)
    Object.assign(lightbox.style, {
      display: 'none',
      position: 'fixed',
      inset: '0',
      background: 'rgba(0,0,0,0.85)',
      zIndex: '9999',
      justifyContent: 'center',
      alignItems: 'center'
    });
    Object.assign(lightboxImg.style, {
      maxWidth: '90%',
      maxHeight: '90%',
      borderRadius: '8px',
      boxShadow: '0 0 30px rgba(0,0,0,0.7)'
    });
    if (closeLightbox) {
      Object.assign(closeLightbox.style, {
        position: 'absolute',
        top: '20px',
        right: '30px',
        fontSize: '40px',
        color: '#fff',
        cursor: 'pointer',
        userSelect: 'none'
      });
    }

    const openLightbox = (src, alt) => {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.style.display = 'flex';
    };
    
    const hideLightbox = () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    };

    galleryImgs.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });

    if (closeLightbox) closeLightbox.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) hideLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideLightbox();
    });
  }

  /* ---------- E. Scroll To Top Button ---------- */
  const topBtn = document.getElementById('topBtn');
  if (topBtn) {
    Object.assign(topBtn.style, {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      border: 'none',
      background: '#00abf0',
      color: '#fff',
      fontSize: '20px',
      cursor: 'pointer',
      display: 'none',
      zIndex: '999',
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
    });

    window.addEventListener('scroll', () => {
      topBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });

    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- F. Dark / Light Mode Toggle ---------- */
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    // Inject minimal light-mode styles (CSS file is final, so use a <style> tag)
    const style = document.createElement('style');
    style.textContent = `
      body.light-mode { background:#f5f5f5; color:#1a1a1a; }
      body.light-mode .header { background:#00abf0; }
      body.light-mode .name,
      body.light-mode .navbar a { color:#fff; }
      body.light-mode .scrollable h4,
      body.light-mode .scrollable .active h3,
      body.light-mode .contents + h3,
      body.light-mode > h3 { color:#0077a8; }
      body.light-mode .scrollable table th,
      body.light-mode .scrollable table td { border-color:#333; }
    `;
    document.head.appendChild(style);

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      themeBtn.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    });
  }

});