// THEME FUNCTIONS
function applyTheme(mode) {
    const isLight = mode === 'light';
    document.body.classList.toggle('light-mode', isLight);
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.querySelector('.toggle-icon').textContent = isLight ? '☾' : '☀';
        btn.querySelector('.toggle-label').textContent = isLight ? 'Dark' : 'Light';
    }
}

function toggleTheme() {
    const isLight = document.body.classList.contains('light-mode');
    const next = isLight ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    applyTheme(next);
}

(function () { applyTheme(localStorage.getItem('theme') || 'dark'); })();

//Form elements
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const messag = document.getElementById("messag");

// ── Helpers: text inputs / textarea 
const setError = (element, message) => {
    const ctrl = element.parentElement;
    const errEl = ctrl.querySelector('.error');
    if (errEl) errEl.innerText = message;
    ctrl.classList.add('error');
    ctrl.classList.remove('success');
};

const setSuccess = element => {
    const ctrl = element.parentElement;
    const errEl = ctrl.querySelector('.error');
    if (errEl) errEl.innerText = '';
    ctrl.classList.add('success');
    ctrl.classList.remove('error');
};

// ── Helpers: radio / checkbox groups 
const setGroupError = (groupEl) => {
    groupEl.classList.remove('group-success');
    groupEl.classList.add('group-error');
    groupEl.classList.remove('pulse');
    void groupEl.offsetWidth;
    groupEl.classList.add('pulse');
};

const setGroupSuccess = (groupEl) => {
    groupEl.classList.remove('group-error', 'pulse');
    groupEl.classList.add('group-success');
};

// ── Email regex
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// ── Validate all fields 
const validateInputs = () => {
    const usernamev = username.value.trim();
    const emailv = email.value.trim();
    const messagv = messag.value.trim();

    const genderGroup = document.getElementById('gender-group');
    const inquiryGroup = document.getElementById('inquiry-group');
    const interestGroup = document.getElementById('interest-group');

    const genderChecked = document.querySelector('input[name="gender"]:checked');
    const inquiryChecked = document.querySelector('input[name="inquiry"]:checked');
    const interestChecked = document.querySelector('input[name="interests"]:checked');

    let firstErrorEl = null;
    const markFirst = (el) => { if (!firstErrorEl) firstErrorEl = el; };

    // Full name
    if (usernamev === '') {
        setError(username, 'Full name is required');
        markFirst(username.parentElement);
    } else { setSuccess(username); }

    // Email
    if (emailv === '') {
        setError(email, 'Email is required');
        markFirst(email.parentElement);
    } else if (!isValidEmail(emailv)) {
        setError(email, 'Provide a valid email address');
        markFirst(email.parentElement);
    } else { setSuccess(email); }

    // Gender
    if (!genderChecked) {
        setGroupError(genderGroup);
        markFirst(genderGroup);
    } else { setGroupSuccess(genderGroup); }

    // Message
    if (messagv === '') {
        setError(messag, 'Please write your message');
        markFirst(messag.parentElement);
    } else { setSuccess(messag); }

    // Inquiry type
    if (!inquiryChecked) {
        setGroupError(inquiryGroup);
        markFirst(inquiryGroup);
    } else { setGroupSuccess(inquiryGroup); }

    // Interests (at least one)
    if (!interestChecked) {
        setGroupError(interestGroup);
        markFirst(interestGroup);
    } else { setGroupSuccess(interestGroup); }

    // Scroll to first error
    if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const focusable = firstErrorEl.querySelector('input, textarea');
        if (focusable) focusable.focus({ preventScroll: true });
        return false;
    }

    return true;
};

form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateInputs()) 
        form.submit();
});
