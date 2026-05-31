'use strict';

// === Mobile Nav ===
const hamburger = document.querySelector('.nav__hamburger');
const nav = document.querySelector('.nav');

hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('nav--mobile-open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav--mobile-open');
    });
});

// === Scroll Effects ===
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
        nav.classList.add('nav--scrolled');
    } else {
        nav.classList.remove('nav--scrolled');
    }
    lastScroll = currentScroll;
});

// === Fade-in Reveal ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.kit__card, .problem__content, .faq__item, .waitlist__card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// === Smooth scroll for anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// === Waitlist form handling (email validation) ===
const form = document.getElementById('waitlist-form');
form?.addEventListener('submit', function(e) {
    const email = this.querySelector('input[type="email"]');
    if (!email.value || !email.value.includes('@')) {
        e.preventDefault();
        email.style.borderColor = '#e74c3c';
        email.focus();
    }
});

console.log('Protocol Ritual — site initialized.');
