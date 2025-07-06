// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navigation
    let lastScrollTop = 0;
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background blur effect when scrolling
        if (scrollTop > 100) {
            nav.style.background = 'rgba(13, 17, 23, 0.98)';
        } else {
            nav.style.background = 'rgba(13, 17, 23, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animate demo preview on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and demo elements
    const animatedElements = document.querySelectorAll('.feature-card, .demo-preview');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Demo interaction
    const demoToggle = document.querySelector('.demo-toggle');
    const demoName = document.querySelector('.demo-name');
    const demoUsername = document.querySelector('.demo-username');
    
    if (demoToggle && demoName && demoUsername) {
        let isRevealed = false;
        
        demoToggle.addEventListener('click', function() {
            isRevealed = !isRevealed;
            
            if (isRevealed) {
                demoName.textContent = 'John Developer';
                demoUsername.textContent = '@johndoe';
                demoToggle.innerHTML = '🙈 Conceal';
            } else {
                demoName.textContent = '*********';
                demoUsername.textContent = '*******';
                demoToggle.innerHTML = '👁️ Reveal';
            }
        });
    }

    // Add sparkle animation variety
    const sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach((sparkle, index) => {
        // Random additional delay for more natural effect
        const randomDelay = Math.random() * 3;
        sparkle.style.animationDelay = `${randomDelay}s, ${randomDelay + 1.5}s`;
        
        // Random scale for variety
        const randomScale = 0.8 + Math.random() * 0.4;
        sparkle.style.transform = `scale(${randomScale})`;
    });

    // Typing effect for hero tagline
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                tagline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add mobile menu toggle (if needed)
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && !document.querySelector('.mobile-menu-toggle')) {
                const toggle = document.createElement('button');
                toggle.className = 'mobile-menu-toggle';
                toggle.innerHTML = '☰';
                toggle.style.cssText = `
                    background: none;
                    border: none;
                    color: #f0f6fc;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: block;
                `;
                
                const navContainer = document.querySelector('.nav-container');
                navContainer.appendChild(toggle);
                
                toggle.addEventListener('click', () => {
                    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.background = '#0d1117';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.padding = '1rem';
                    navLinks.style.borderTop = '1px solid #30363d';
                });
            }
        }
    };

    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
});

// Add some interactive particles on mouse move
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.97) { // Only create particles occasionally
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            pointer-events: none;
            width: 4px;
            height: 4px;
            background: #58a6ff;
            border-radius: 50%;
            z-index: 1000;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.8;
            animation: particle-fade 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
});

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-fade {
        0% {
            opacity: 0.8;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
