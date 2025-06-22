// Enhanced Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // Navigation Functionality
    // ===========================================
    
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const backToTop = document.getElementById('backToTop');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.style.display = 'flex';
        } else {
            navbar.classList.remove('scrolled');
            backToTop.style.display = 'none';
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Active navigation link highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Back to top functionality
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===========================================
    // Hero Section Animations
    // ===========================================
    
    // Animate hero elements on load
    function animateHero() {
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-buttons, .hero-image');
        
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Parallax effect for hero shapes
    function parallaxHero() {
        const shapes = document.querySelectorAll('.hero-shapes .shape');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.2;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    }
    
    window.addEventListener('scroll', parallaxHero);
    
    // Floating cards animation
    function animateFloatingCards() {
        const cards = document.querySelectorAll('.floating-card');
        
        cards.forEach((card, index) => {
            const delay = index * 0.5;
            card.style.animationDelay = `${delay}s`;
            card.classList.add('animate-float');
        });
    }
    
    // ===========================================
    // Skills Animation
    // ===========================================
    
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillsSection = document.querySelector('.skills-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach((bar, index) => {
                        setTimeout(() => {
                            const width = bar.getAttribute('data-width');
                            bar.style.width = width;
                            bar.classList.add('animate-skill');
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }
    
    // ===========================================
    // Work Portfolio Filtering
    // ===========================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter work items
            workItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Work item hover effects
    workItems.forEach(item => {
        const overlay = item.querySelector('.work-overlay');
        const image = item.querySelector('.work-image img');
        
        item.addEventListener('mouseenter', function() {
            overlay.style.opacity = '1';
            image.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            overlay.style.opacity = '0';
            image.style.transform = 'scale(1)';
        });
    });
    
    // ===========================================
    // Timeline Animation
    // ===========================================
    
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-timeline');
                }
            });
        }, { threshold: 0.3 });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // ===========================================
    // Contact Form Handling
    // ===========================================
    
    const contactForm = document.getElementById('contactForm');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        formInputs.forEach(input => {
            const value = input.value.trim();
            const errorMsg = input.parentNode.querySelector('.error-message');
            
            // Remove existing error messages
            if (errorMsg) {
                errorMsg.remove();
            }
            
            input.classList.remove('error');
            
            // Check if required field is empty
            if (input.required && !value) {
                showInputError(input, 'This field is required');
                isValid = false;
            }
            
            // Validate email
            if (input.type === 'email' && value && !emailRegex.test(value)) {
                showInputError(input, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message length
            if (input.name === 'message' && value && value.length < 10) {
                showInputError(input, 'Message must be at least 10 characters long');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function showInputError(input, message) {
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
    
    // Input focus effects
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });
    });
    
    // ===========================================
    // Notification System
    // ===========================================
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">×</button>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            hideNotification(notification);
        });
    }
    
    function hideNotification(notification) {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // ===========================================
    // Scroll Animations
    // ===========================================
    
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.section-header, .about-intro, .work-item, .contact-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // ===========================================
    // Typing Animation
    // ===========================================
    
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // ===========================================
    // Counter Animation
    // ===========================================
    
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent);
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current) + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + '+';
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // ===========================================
    // Cursor Effect (Optional)
    // ===========================================
    
    function initCursorEffect() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        document.body.appendChild(cursorFollower);
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        
        animateFollower();
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .work-item, .filter-btn');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }
    
    // ===========================================
    // Theme Switcher (Optional)
    // ===========================================
    
    function initThemeSwitcher() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        
        document.body.appendChild(themeToggle);
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }
    
    // ===========================================
    // Performance Optimization
    // ===========================================
    
    // Debounce function for scroll events
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
    
    // Throttle function for high-frequency events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(parallaxHero, 16));
    window.addEventListener('scroll', debounce(updateActiveNav, 100));
    
    // ===========================================
    // Page Load Animations
    // ===========================================
    
    function initPageLoad() {
        // Add page loaded class
        document.body.classList.add('loaded');
        
        // Initialize all animations
        setTimeout(() => {
            animateHero();
            animateFloatingCards();
            animateSkills();
            animateTimeline();
            initScrollAnimations();
            animateCounters();
        }, 100);
        
        // Optional features
        if (window.innerWidth > 768) {
            initCursorEffect();
        }
        
        // Initialize theme switcher
        initThemeSwitcher();
    }
    
    // ===========================================
    // Error Handling
    // ===========================================
    
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // Could add user-friendly error notification here
    });
    
    // ===========================================
    // Initialize Everything
    // ===========================================
    
    // Start page load sequence
    initPageLoad();
    
    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 200);
            }
        });
    });
    
    console.log('🚀 Portfolio JavaScript loaded successfully!');
});

// ===========================================
// CSS Animations (to be added to your CSS)
// ===========================================

const additionalCSS = `
/* Add these styles to your CSS file */

.loaded {
    overflow-x: hidden;
}

.hero-badge,
.hero-title,
.hero-description,
.hero-stats,
.hero-buttons,
.hero-image {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.skill-progress {
    width: 0;
    transition: width 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-skill::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    background: #fff;
    animation: pulse 0.5s;
}

.animate-timeline {
    opacity: 1;
    transform: translateX(0);
}

.timeline-item {
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.6s ease;
}

.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.section-header,
.about-intro,
.work-item,
.contact-card {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.custom-cursor {
    position: fixed;
    width: 8px;
    height: 8px;
    background: var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s;
}

.cursor-follower {
    position: fixed;
    width: 30px;
    height: 30px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    opacity: 0.5;
}

.custom-cursor.hover,
.cursor-follower.hover {
    transform: scale(1.5);
}

.theme-toggle {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--bg-color);
    border: 2px solid var(--border-color);
    color: var(--text-color);
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
}

.theme-toggle:hover {
    background: var(--primary-color);
    color: white;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    color: #333;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
}

.notification.show {
    transform: translateX(0);
}

.notification.hide {
    transform: translateX(400px);
}

.notification-success {
    border-left: 4px solid #10b981;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.notification-close {
    position: absolute;
    top: 5px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #666;
}

.error-message {
    color: #ef4444;
    font-size: 12px;
    margin-top: 5px;
}

.form-group.focused label {
    color: var(--primary-color);
}

.contact-form input.error,
.contact-form textarea.error {
    border-color: #ef4444;
}

button.clicked {
    transform: scale(0.95);
}

.navbar.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
    .custom-cursor,
    .cursor-follower,
    .theme-toggle {
        display: none;
    }
}
`;

// Inject additional CSS if needed
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);