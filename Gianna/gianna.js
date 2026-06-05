//SKILLS expand and collapse
function initSkillToggles() {
  const allLi = document.querySelectorAll(".skill-item");

  allLi.forEach(li => {
    const detail = li.querySelector(".skill-detail");
    if (!detail) return;

    li.setAttribute("role", "button");
    li.setAttribute("tabindex", "3");
    li.setAttribute("aria-expanded", "false");

    // Toggle on click
    li.addEventListener("click", () => toggleSkill(li, detail));

    // Also allow keyboard activation
    li.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") toggleSkill(li, detail);
    });
  });
}

// Shows or hides a skill's detail paragraph
function toggleSkill(li, detail) {
  const isOpen = detail.classList.toggle("hidden");
  li.setAttribute("aria-expanded", String(!isOpen));
  li.classList.toggle("skill-open", !isOpen);
}

/* EDUCATION TABLE, Sorting by year */

// Adds sort by year button
function initTableSort() {
  const table = document.querySelector(".scrollable table");
  if (!table) return;

  let ascending = true; // current sort direction

  // Build the button
  const btn = document.createElement("button");
  btn.className = "sort-btn";
  btn.textContent = "Sort by Year ↑";
  table.parentNode.insertBefore(btn, table);

  btn.addEventListener("click", () => sortTableByYear(table, btn, ascending = !ascending));
}

// Reorders table body rows by the Year column value
function sortTableByYear(table, btn, asc) {
  const tbody  = table.tBodies[0];
  const rows   = Array.from(tbody.rows);
  const YEAR_COL = 2; 

  rows.sort((a, b) => {
    const aYear = parseInt(a.cells[YEAR_COL].textContent, 10);
    const bYear = parseInt(b.cells[YEAR_COL].textContent, 10);
    return asc ? aYear - bYear : bYear - aYear;
  });

  rows.forEach(row => tbody.appendChild(row));
  btn.textContent = asc ? "Sort by Year ↑" : "Sort by Year ↓";
}

/*  HOBBIES — Read More / Read Less toggle  */

// Collapses hobby descriptions to two lines and adds expand/collapse controls
function initReadMoreToggles() {
  const hobbies = document.querySelectorAll(".scrollable ul li b");

  hobbies.forEach(bold => {
    const li = bold.closest("li");
    if (!li) return;

    const descNode = Array.from(li.childNodes).find(
      n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0
    );
    if (!descNode) return;

    // Wrap the description text in a span for clamping
    const span = document.createElement("span");
    span.className = "hobby-text clamped";
    span.textContent = descNode.textContent;
    descNode.replaceWith(span);

    // Create the toggle button
    const btn = document.createElement("button");
    btn.className = "read-more-btn";
    btn.textContent = "Read more";
    li.appendChild(btn);

    btn.addEventListener("click", () => toggleReadMore(span, btn));
  });
}

// Expands or collapses a hobby description
function toggleReadMore(span, btn) {
  const clamped = span.classList.toggle("clamped");
  btn.textContent = clamped ? "Read more" : "Read less";
}

/* LIGHTBOX */
function initLightbox() {
  const overlay = document.createElement("div");
  overlay.id = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Image lightbox");

  const img = document.createElement("img");
  img.id = "lightbox-img";
  img.alt = "Enlarged view";

  const closeBtn = document.createElement("button");
  closeBtn.id = "lightbox-close";
  closeBtn.textContent = "✕";
  closeBtn.setAttribute("aria-label", "Close lightbox");

  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  // Wire close actions
  closeBtn.addEventListener("click", closeLightbox);
  overlay.addEventListener("click", e => { if (e.target === overlay) closeLightbox(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

  // Attach click handler to every image on the page
  document.querySelectorAll("img").forEach(image => {
    // Skip icon-sized images (social links)
    if (image.width <= 30 || image.height <= 30) return;

    image.classList.add("lightbox-trigger");
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");

    image.addEventListener("click",   () => openLightbox(image.src, overlay, img));
    image.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") openLightbox(image.src, overlay, img);
    });
  });
}

// Opens the lightbox with the given image source
function openLightbox(src, overlay, img) {
  img.src = src;
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Closes and resets the lightbox
function closeLightbox() {
  const overlay = document.getElementById("lightbox");
  if (!overlay) return;
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

/* SCROLL-TO-TOP button */
function initScrollToTop() {
  const btn = document.createElement("button");
  btn.id = "scroll-top-btn";
  btn.textContent = "↑";
  btn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(btn);

  // Show/hide based on scroll position
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 200);
  });
  // Smoothly return to the top
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// THEME TOGGLE FUNCTION
function initDarkLightToggle() {
  const header = document.querySelector(".header");
  if (!header) return;

  const btn = document.createElement("button");
  btn.id = "theme-toggle";
  btn.setAttribute("aria-label", "Toggle dark/light mode");
  btn.textContent = "☀ Light";

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    btn.textContent = "☾ Dark";
  }

  btn.addEventListener("click", () => toggleTheme(btn));
  header.appendChild(btn);
}

// The exe
function toggleTheme(btn) {
  const isLight = document.body.classList.toggle("light-mode");
  btn.textContent = isLight ? "☾ Dark" : "☀ Light";
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// Bootstrap when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initSkillToggles();
  initTableSort();
  initReadMoreToggles();
  initLightbox();
  initScrollToTop();
  initDarkLightToggle();
});