// DARK MODE
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  themeBtn.textContent = document.body.classList.contains("dark-mode")
    ? "Light Mode"
    : "Dark Mode";
});

// SORT TABLE
let ascending = true;
const sortBtn = document.getElementById("sortBtn");

sortBtn.addEventListener("click", function () {
  const table = document.getElementById("eduTable");
  const rows = Array.from(table.querySelectorAll("tr")).slice(1);

  rows.sort(function (a, b) {
    const yearA = parseInt(a.cells[2].innerText, 10) || 0;
    const yearB = parseInt(b.cells[2].innerText, 10) || 0;
    return ascending ? yearA - yearB : yearB - yearA;
  });

  rows.forEach((row) => table.appendChild(row));
  ascending = !ascending;
  sortBtn.textContent = ascending ? "Sort Year ↓" : "Sort Year ↑";
});

// SKILL TOGGLE
const skillItems = document.querySelectorAll(".skill-item");

skillItems.forEach(function (item) {
  item.addEventListener("click", function () {
    item.classList.toggle("open");
  });

  item.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      item.classList.toggle("open");
    }
  });
});

// LIGHTBOX
const lightboxImages = document.querySelectorAll(".lightbox-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");

function closeLightbox() {
  lightbox.classList.remove("visible");
}

lightboxImages.forEach(function (img) {
  img.addEventListener("click", function () {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "Preview image";
    lightbox.classList.add("visible");
  });
});

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && lightbox.classList.contains("visible")) {
    closeLightbox();
  }
});

// SCROLL TO TOP BUTTON
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
  topBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

topBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// HOBBY READ MORE READ LESS
const buttons=
document.querySelectorAll(".read-more-btn");

buttons.forEach(function(button){

  button.addEventListener("click",function(){
const hobbyText=
  button.previousElementSibling;

hobbyText.classList.toggle("collapsed");
if
(hobbyText.classList.contains("collapsed")) {
  button.textContent="Read More";
}else {
  button.textContent="Read Less";
}
});
});

