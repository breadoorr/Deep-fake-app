// Toggle visibility of the header when the menu button is clicked
function toggleMenu() {
    const header = document.getElementById("header");
    if (header.style.display === "block") {
        header.style.display = "none";
    } else {
        header.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.querySelector('.primary-btn');
    const continueButton = document.querySelector('.secondary-btn');

    startGameButton.addEventListener('click', () => {
        continueButton.disabled = false; // Enable Continue after starting
        alert("Game Started!");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("bar");
    const navbar = document.getElementById("navbar");

    menuButton.addEventListener("click", () => {
        navbar.classList.toggle("active"); // Toggle the 'active' class to show/hide the menu
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const loginLink = document.getElementById("login-link");
    const closeBtn = document.getElementById("close-btn");
    const signupLink = document.getElementById("signup-link");
    const loginBackLink = document.getElementById("login-back-link");

    const loginForm = document.getElementById("login-form");
    const registrationForm = document.getElementById("registration-form");
    const modalTitle = document.getElementById("modal-title");

    // Open modal on clicking "Sign Up/Login"
    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "flex";
        showLoginForm();
    });

    // Close modal when clicking on the close button
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener("click", (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

    // Show registration form when clicking "Sign up here"
    signupLink.addEventListener("click", (e) => {
        e.preventDefault();
        showRegistrationForm();
    });

    // Show login form when clicking "Log in here"
    loginBackLink.addEventListener("click", (e) => {
        e.preventDefault();
        showLoginForm();
    });

    function showLoginForm() {
        modalTitle.innerText = "Login";
        loginForm.style.display = "block";
        registrationForm.style.display = "none";
    }

    function showRegistrationForm() {
        modalTitle.innerText = "Sign Up";
        loginForm.style.display = "none";
        registrationForm.style.display = "block";
    }
});

// Disable body scrolling when modal is open
function toggleBodyScroll(disable) {
    if (disable) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

