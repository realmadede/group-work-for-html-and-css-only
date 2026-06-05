// THEME TOGGLE FUNCTION, LOGIC
function applyTheme(mode) {
    const isLight = mode === 'light';
    document.body.classList.toggle('light-mode', isLight);
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.querySelector('.toggle-icon').textContent = isLight ? '☾' : '☀';
        btn.querySelector('.toggle-label').textContent = isLight ? 'Dark' : 'Light';
    }
}
// THE EXE
function toggleTheme() {
    const isLight = document.body.classList.contains('light-mode');
    const next = isLight ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    applyTheme(next);
}

// Apply saved theme immediately
(function () { applyTheme(localStorage.getItem('theme') || 'dark'); })();

// CLOCK FUNCTIONS
let is24Hour = false;
let clockIntervalId;

function updateClockL() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    document.getElementById("clockv").textContent = `${h}:${m}:${s}`;
}

function updateClockM() {
    const now = new Date();
    let hours = now.getHours();
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const h = hours.toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    document.getElementById("clockv").textContent = `${h}:${m}:${s} ${meridiem}`;
}

function startClock() {
    clearInterval(clockIntervalId);
    if (is24Hour) {
        updateClockL();
        clockIntervalId = setInterval(updateClockL, 1000);
    } else {
        updateClockM();
        clockIntervalId = setInterval(updateClockM, 1000);
    }
}
// Toggling thing btn 12hr and 24hr
document.getElementById("clock").onclick = function() {
    is24Hour = !is24Hour;
    startClock();         
};

startClock();

// WELCOME TYPEWRITER
const fullText = document.getElementById("welctxt").textContent;
let charIndex = 0;
let isDeleting = false;

// TYPEWRITING
function playTypewriter() {
  const textContainer = document.getElementById("typewriter-text");

  if (isDeleting) {
    textContainer.textContent = fullText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textContainer.textContent = fullText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 50 : 150;

  if (!isDeleting && charIndex === fullText.length) {
    typingSpeed = 3000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typingSpeed = 500;
  }

  setTimeout(playTypewriter, typingSpeed);
}

document.addEventListener("DOMContentLoaded", playTypewriter);
