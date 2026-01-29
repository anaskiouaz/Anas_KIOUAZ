// ============================================
// DIGITAL HIGH-END PORTFOLIO
// Premium Interactions & Animations
// ============================================

class PortfolioExperience {
    constructor() {
        this.init();
    }

    init() {
        this.setupCustomCursor();
        this.setupScrollProgress();
        this.setupScrollReveal();
        this.setupSmoothScroll();
        this.setupNavigation();
        this.setupProjectHovers();
        this.initAnimations();
    }

    // === CUSTOM CURSOR ===
    setupCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.custom-cursor-follower');
        
        if (!cursor || !follower) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animation loop pour smooth cursor
        const animateCursor = () => {
            // Cursor principal (rapide)
            cursorX += (mouseX - cursorX) * 0.9;
            cursorY += (mouseY - cursorY) * 0.9;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            // Follower (lent, effet de traînée)
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .project-tile');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                follower.style.transform = 'translate(-50%, -50%) scale(1.8)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

        // Hide on mobile
        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
            follower.style.display = 'none';
        }
    }

    // === SCROLL PROGRESS ===
    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // === SCROLL REVEAL ANIMATIONS ===
    setupScrollReveal() {
        const revealElements = document.querySelectorAll('[data-scroll-reveal]');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 100); // Stagger effect
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // === SMOOTH SCROLL ===
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                // Ne gérer que les ancres internes (#...)
                if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    // Update active nav
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
    }

    // === NAVIGATION ===
    setupNavigation() {
        const nav = document.getElementById('mainNav');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add scrolled class
            if (currentScroll > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Hide/show on scroll direction
            if (currentScroll > lastScroll && currentScroll > 500) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });

        // Active section highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // === PROJECT HOVERS ===
    setupProjectHovers() {
        const projectTiles = document.querySelectorAll('.project-tile');

        projectTiles.forEach(tile => {
            const img = tile.querySelector('.project-img');
            
            tile.addEventListener('mouseenter', (e) => {
                this.createRipple(e, tile);
            });

            tile.addEventListener('mousemove', (e) => {
                this.tiltProject(e, tile);
            });

            tile.addEventListener('mouseleave', () => {
                tile.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    }

    createRipple(e, element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(107, 70, 255, 0.3), transparent);
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    tiltProject(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        element.style.transform = `
            translateY(-8px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            scale(1.02)
        `;
    }

    // === HERO ANIMATIONS ===
    initAnimations() {
        // Animate hero title letters
        this.animateHeroTitle();
        
        // Parallax effect for blobs
        this.setupParallax();
        
        // Stats counter animation
        this.animateStats();
    }

    animateHeroTitle() {
        const titleLines = document.querySelectorAll('.title-line');
        
        titleLines.forEach((line, index) => {
            const text = line.textContent;
            line.innerHTML = '';
            
            text.split('').forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(50px)';
                span.style.animation = `fadeInUp 0.6s ease-out ${(index * 200) + (charIndex * 50)}ms forwards`;
                line.appendChild(span);
            });
        });
    }

    setupParallax() {
        const blobs = document.querySelectorAll('.visual-blob');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 0.3;
                const yPos = -(scrolled * speed);
                blob.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Mouse parallax
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 20;
                const x = mouseX * speed;
                const y = mouseY * speed;
                blob.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element) => {
            const target = element.textContent.replace('+', '');
            const isNumber = !isNaN(target);
            
            if (!isNumber) return;
            
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
                }
            }, duration / steps);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // === MAGNETIC BUTTONS ===
    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    // === SKILL TAGS ANIMATION ===
    animateSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.05}s`;
            tag.classList.add('fade-in-tag');
        });
    }
}

// === CSS ANIMATIONS (injected) ===
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes ripple {
        to {
            width: 500px;
            height: 500px;
            opacity: 0;
        }
    }

    @keyframes fade-in-tag {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in-tag {
        animation: fade-in-tag 0.6s ease-out forwards;
    }

    /* Smooth transitions */
    .nav-glass {
        transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    /* Project tile 3D effect */
    .project-tile {
        transform-style: preserve-3d;
        transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    /* Glow effect on hover */
    .btn-primary:hover::before {
        content: '';
        position: absolute;
        inset: -2px;
        background: linear-gradient(135deg, var(--primary), var(--accent));
        filter: blur(10px);
        opacity: 0.5;
        z-index: -1;
        animation: glow-pulse 2s ease-in-out infinite;
    }

    @keyframes glow-pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0.8; }
    }

    /* Scroll indicator */
    .scroll-indicator {
        animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(10px); }
    }

    /* Refined hover states */
    .project-link-icon {
        overflow: hidden;
    }

    .project-link-icon::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, var(--primary), transparent);
        transform: scale(0);
        transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    .project-link-icon:hover::before {
        transform: scale(1);
    }

    /* Timeline marker pulse */
    .timeline-marker::after {
        content: '';
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        border: 2px solid var(--primary);
        animation: pulse-ring 2s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
    }

    @keyframes pulse-ring {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }

    /* Interest badge morphing */
    .interest-badge {
        position: relative;
        overflow: hidden;
    }

    .interest-badge::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, var(--accent), var(--primary));
        opacity: 0;
        transition: opacity 0.4s;
    }

    .interest-badge:hover::before {
        opacity: 0.1;
    }
`;

document.head.appendChild(styleSheet);

// === INITIALIZE ===
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new PortfolioExperience();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-out';
        document.body.style.opacity = '1';
    }, 100);

    // Performance optimization
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                ticking = false;
            });
            ticking = true;
        }
    });
});

// === LAZY LOADING IMAGES ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.project-img').forEach(img => {
        imageObserver.observe(img);
    });
}

// === EASTER EGG: Konami Code ===
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
    }
});

// === PERFORMANCE MONITOR ===
if (window.performance && window.console) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⚡ Portfolio loaded in ${pageLoadTime}ms`, 'color: #6B46FF; font-size: 14px; font-weight: bold;');
    });
}
// ============================================
// ENHANCED SKILLS ANIMATIONS
// ============================================

class EnhancedSkillsAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateSkillBars();
        this.animateLanguageBars();
        this.setupInterestCardEffects();
    }

    animateSkillBars() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const bar = card.querySelector('.skill-bar');
                    const level = bar.getAttribute('data-level');
                    
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 200);
                    
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.3 });

        skillCards.forEach(card => observer.observe(card));
    }

    animateLanguageBars() {
        const langCards = document.querySelectorAll('.language-card-new');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const fill = card.querySelector('.lang-level-fill');
                    const level = fill.getAttribute('data-level');
                    
                    setTimeout(() => {
                        fill.style.width = level + '%';
                        card.classList.add('revealed');
                    }, index * 100);
                    
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.5 });

        langCards.forEach(card => observer.observe(card));
    }

    setupInterestCardEffects() {
        const interestCards = document.querySelectorAll('.interest-card-new');
        
        interestCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createFloatingParticles(card);
            });

            card.addEventListener('click', () => {
                this.createRippleEffect(card);
            });
        });
    }

    createFloatingParticles(card) {
        const particleContainer = card.querySelector('.interest-particles');
        if (!particleContainer) return;

        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 0.5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: var(--accent);
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                opacity: 0;
                animation: float-up 1.5s ease-out ${delay}s;
                pointer-events: none;
            `;
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2000);
        }
    }

    createRippleEffect(card) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(107, 70, 255, 0.4), transparent);
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: ripple-expand 0.8s ease-out;
        `;
        
        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }
}

// Ajouter les animations CSS via JavaScript
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes float-up {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }

    @keyframes ripple-expand {
        0% {
            width: 0;
            height: 0;
            opacity: 0.6;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }

    /* Glow effect pour les cartes au scroll */
    .skill-card.revealed {
        animation: card-glow 0.8s ease-out;
    }

    @keyframes card-glow {
        0% {
            box-shadow: 0 0 0 rgba(107, 70, 255, 0);
        }
        50% {
            box-shadow: 0 0 30px rgba(107, 70, 255, 0.5);
        }
        100% {
            box-shadow: 0 0 0 rgba(107, 70, 255, 0);
        }
    }

    /* Animation d'apparition progressive */
    .interest-card-new {
        animation: fade-in-up-interest 0.6s ease-out backwards;
    }

    .interest-card-new:nth-child(1) { animation-delay: 0.1s; }
    .interest-card-new:nth-child(2) { animation-delay: 0.2s; }
    .interest-card-new:nth-child(3) { animation-delay: 0.3s; }
    .interest-card-new:nth-child(4) { animation-delay: 0.4s; }
    .interest-card-new:nth-child(5) { animation-delay: 0.5s; }
    .interest-card-new:nth-child(6) { animation-delay: 0.6s; }

    @keyframes fade-in-up-interest {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Rotation de l'icône au hover */
    .skill-card:hover .skill-icon svg {
        animation: icon-pulse 0.6s ease-in-out;
    }

    @keyframes icon-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }

    /* Effet de lueur sur les emojis */
    .interest-emoji::after {
        content: attr(data-emoji);
        position: absolute;
        inset: 0;
        filter: blur(20px);
        opacity: 0;
        transition: opacity 0.4s;
    }

    .interest-card-new:hover .interest-emoji::after {
        opacity: 0.5;
    }
`;

document.head.appendChild(enhancedStyles);

// Initialiser les animations au chargement
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedSkillsAnimations();
});