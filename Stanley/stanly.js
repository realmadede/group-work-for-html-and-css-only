// DARK MODE

const themeBtn = document.getElementById("themeBtn");

function updateThemeButton() {
  if (document.body.classList.contains("dark-mode")) {
    themeBtn.textContent = "⬜ Light Mode";
  } else {
    themeBtn.textContent = "⬛ Dark Mode";
  }
}

function saveThemePreference() {
  localStorage.setItem(
    "preferredTheme",
    document.body.classList.contains("dark-mode") ? "dark" : "light",
  );
}

function loadThemePreference() {
  const savedTheme = localStorage.getItem("preferredTheme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  updateThemeButton();
}

loadThemePreference();

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  updateThemeButton();
  saveThemePreference();
});

// SORT TABLE

let ascending = true;

document.getElementById("sortBtn").addEventListener("click", function () {
  const table = document.getElementById("eduTable");

  const rows = Array.from(table.rows).slice(1);

  rows.sort(function (a, b) {
    const yearA = parseInt(a.cells[2].innerText);

    const yearB = parseInt(b.cells[2].innerText);

    return ascending ? yearA - yearB : yearB - yearA;
  });

  rows.forEach((row) => table.appendChild(row));

  ascending = !ascending;
});

// LIGHTBOX

const lightboxImages = document.querySelectorAll(".lightbox-img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightboxImg");

const closeLightbox = function () {
  lightbox.style.display = "none";
};

lightboxImages.forEach(function (img) {
  img.addEventListener("click", function () {
    lightbox.style.display = "flex";

    lightboxImg.src = this.src;
  });
});

document.getElementById("closeBtn").addEventListener("click", closeLightbox);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && lightbox.style.display === "flex") {
    closeLightbox();
  }
});

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// SCROLL BUTTON

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
  if (window.scrollY > 200) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// SKILLS TOGGLE

const skillItems = document.querySelectorAll(".skill-item");

skillItems.forEach(function (item) {
  item.addEventListener("click", function () {
    item.classList.toggle("open");
  });

  item.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      item.classList.toggle("open");
    }
  });
});

// HOBBIES READ MORE OR READ LESS

const readMoreButtons = document.querySelectorAll(".read-more-btn");

readMoreButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const item = button.closest(".hobby-item");

    item.classList.toggle("expanded");

    button.textContent = item.classList.contains("expanded")
      ? "Read Less"
      : "Read More";
  });
});
