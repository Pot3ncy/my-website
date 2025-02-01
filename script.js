// script.js
// Add touch detection
const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

// Modify hover effect for touch devices
if (isTouchDevice) {
    document.querySelectorAll('.grid-item').forEach(item => {
        item.style.transition = 'none';
        item.style.transform = 'none';
    });
}
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
    
    // Trigger load event for cached images
    if (img.complete) img.classList.add('loaded');
});

// Mobile scroll reveal
function handleScrollReveal() {
    if (window.matchMedia('(max-width: 600px)').matches) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const paragraph = entry.target.querySelector('p');
                if (entry.intersectionRatio >= 0.25) {
                    paragraph.classList.add('visible');
                } else {
                    paragraph.classList.remove('visible');
                }
            });
        }, {
            threshold: [0, 0.25, 1]
        });

        document.querySelectorAll('.grid-item').forEach(item => {
            observer.observe(item);
        });
    }
}

// Initialize on load and resize
window.addEventListener('load', handleScrollReveal);
window.addEventListener('resize', handleScrollReveal);

// Optional: Disable hover effects on mobile
document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
    }, { passive: true });
});

// Mobile scroll effects
function setupMobileHover() {
    if (window.matchMedia('(max-width: 600px)').matches) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const container = entry.target;
                if (entry.isIntersecting) {
                    container.classList.add('active');
                } else {
                    container.classList.remove('active');
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of container is visible
        });

        document.querySelectorAll('.grid-item').forEach(item => {
            observer.observe(item);
        });
    }
}

// Initialize on load and resize
window.addEventListener('load', setupMobileHover);
window.addEventListener('resize', setupMobileHover);

// Cleanup observer on desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 600) {
        document.querySelectorAll('.grid-item').forEach(item => {
            item.classList.remove('active');
        });
    }
});

function setupMobileHover() {
    if (window.matchMedia('(max-width: 600px)').matches) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const container = entry.target;
                if (entry.isIntersecting) {
                    // Add slight delay before activating
                    setTimeout(() => {
                        container.classList.add('active');
                    }, 50); // Small buffer for smoother transition
                } else {
                    container.classList.remove('active');
                }
            });
        }, {
            threshold: 0.5
        });

        document.querySelectorAll('.grid-item').forEach(item => {
            observer.observe(item);
        });
    }
}