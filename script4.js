// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const sections = Array.from(document.querySelectorAll('.section-container'));
let currentSectionIndex = 0;
let isScrolling = false;

// Mobile menu handling
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Section navigation
const scrollToSection = (index) => {
    if (isScrolling || index < 0 || index >= sections.length) return;

    isScrolling = true;
    currentSectionIndex = index;

    sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    setTimeout(() => {
        isScrolling = false;
    }, 200);
};

// Arrow navigation
document.querySelector('.arrow-prev').addEventListener('click', () => {
    scrollToSection(currentSectionIndex - 1);
});

document.querySelector('.arrow-next').addEventListener('click', () => {
    scrollToSection(currentSectionIndex + 1);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (isScrolling) return;

    if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToSection(currentSectionIndex - 1);
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToSection(currentSectionIndex + 1);
    }
});

// Scroll tracking
window.addEventListener('scroll', () => {
    if (isScrolling) return;

    const scrollPosition = window.scrollY + window.innerHeight / 2;
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionIndex = index;
        }
    });
});