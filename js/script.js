// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggleText(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleText(newTheme);
    });
}

function updateThemeToggleText(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
}

// Navigation Functionality
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Single Page Application Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            showSection(targetSection);
        });
    });
}

// Section Management
function showSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        if (section.id === sectionName) {
            section.classList.remove('hidden');
            section.classList.add('active');
            // Trigger animation
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        } else {
            section.classList.add('hidden');
            section.classList.remove('active');
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        const linkSection = link.getAttribute('data-section');
        if (linkSection === sectionName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Skill Hover Effects
function initSkillHoverEffects() {
    const skillItems = document.querySelectorAll('.skill-list li');
    
    skillItems.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, var(--accent-color), #764ba2)';
            this.style.color = 'white';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.background = 'var(--bg-primary)';
            this.style.color = 'var(--text-secondary)';
        });
    });
}

// Smooth Scrolling (for any remaining anchor links)
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Animation on Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections except the first one (home)
    const sections = document.querySelectorAll('.section:not(#home)');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form. In a real implementation, this would send your message.');
            this.reset();
        });
    }
}

// Project Card Animations
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initNavigation();
    initSkillHoverEffects();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initProjectAnimations();
    
    // Show home section by default
    showSection('home');
    
    // Set home as active nav link
    const homeNavLink = document.querySelector('.nav-link[data-section="home"]');
    if (homeNavLink) {
        homeNavLink.classList.add('active');
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Page is visible - no special actions needed
    }
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
}, 250));
