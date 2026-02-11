// ========================================
// Curtain Raiser Animation
// ========================================

function initCurtainRaiser() {
    // Curtain automatically starts animating on page load
    // The CSS animation is triggered via animation property with delay
    
    // Handle curtain form submission
    const curtainForm = document.getElementById('curtainSigninForm');
    if (curtainForm) {
        curtainForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('curtainUsername').value;
            const password = document.getElementById('curtainPassword').value;

            if (!username || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            const btn = curtainForm.querySelector('.curtain-signin-btn');
            const original = btn.innerHTML;
            btn.innerHTML = 'Signing in...';
            btn.disabled = true;

            setTimeout(() => {
                showNotification('Authentication successful!', 'success');
                btn.innerHTML = original;
                btn.disabled = false;
            }, 1500);
        });

        // Add focus effects to curtain form inputs
        curtainForm.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.borderBottomColor = 'var(--navy-blue)';
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.style.borderBottomColor = '#e0e0e0';
                }
            });

            input.addEventListener('input', function() {
                if (this.value) {
                    this.parentElement.style.borderBottomColor = 'var(--navy-blue)';
                }
            });
        });
    }
}

// ========================================
// Particle Animation Background
// ========================================

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = { x: null, y: null, radius: 150 };

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.documentElement.scrollHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(11, 45, 91, 0.45)',   // navy
            'rgba(18, 61, 122, 0.35)', // soft navy
            'rgba(253, 181, 21, 0.45)' // gold
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
            }

            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particle.x -= Math.cos(angle) * force * 2;
                    particle.y -= Math.sin(angle) * force * 2;
                }
            }

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            this.particles.slice(index + 1).forEach(other => {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(11,45,91,${0.18 * (1 - dist / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// Scroll Animations
// ========================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in-up');
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, this.options);

        this.elements.forEach(el => observer.observe(el));
    }
}

// ========================================
// Smooth Scroll
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========================================
// Category Cards Interaction
// ========================================

function initCategoryCards() {
    const cards = document.querySelectorAll('.category-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 10;
            const rotateY = (rect.width / 2 - x) / 10;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)
                 scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        card.addEventListener('click', () => {
            document.getElementById('signin')
                .scrollIntoView({ behavior: 'smooth' });

            card.style.animation = 'pulse 0.3s ease';
            setTimeout(() => card.style.animation = '', 300);
        });

        card.addEventListener('mousedown', (e) => {
            const ripple = document.createElement('span');
            const rect = card.getBoundingClientRect();

            ripple.style.cssText = `
                position:absolute;
                left:${e.clientX - rect.left}px;
                top:${e.clientY - rect.top}px;
                width:20px;
                height:20px;
                background:rgba(253,181,21,0.35);
                border-radius:50%;
                transform:translate(-50%,-50%) scale(0);
                animation:ripple 0.6s ease-out;
                pointer-events:none;
            `;

            card.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ========================================
// Ripple + Pulse Styles
// ========================================

const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(20);
        opacity: 0;
    }
}
@keyframes pulse {
    0%,100% { transform: scale(1); }
    50% { transform: scale(0.98); }
}`;
document.head.appendChild(style);

// ========================================
// Form Handling
// ========================================

function initFormHandling() {
    const form = document.getElementById('signinForm');
    const inputs = form.querySelectorAll('.form-input');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.toggle('has-value', input.value.length > 0);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        const btn = form.querySelector('.signin-btn');
        const original = btn.innerHTML;
        btn.innerHTML = 'Signing in...';
        btn.disabled = true;

        setTimeout(() => {
            showNotification('Authentication successful!', 'success');
            btn.innerHTML = original;
            btn.disabled = false;
        }, 1500);
    });
}

// ========================================
// Notification System
// ========================================

function showNotification(message, type = 'info') {
    const note = document.createElement('div');
    note.textContent = message;

    note.style.cssText = `
        position:fixed;
        top:20px;
        right:20px;
        padding:1rem 1.5rem;
        background:${type === 'error'
            ? 'linear-gradient(135deg,#c0392b,#e74c3c)'
            : 'linear-gradient(135deg,#0b2d5b,#123d7a)'};
        color:white;
        border-radius:8px;
        box-shadow:0 8px 32px rgba(0,0,0,0.3);
        animation:slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
        z-index:10000;
    `;

    document.body.appendChild(note);
    setTimeout(() => note.remove(), 3000);
}

// ========================================
// Parallax Effect
// ========================================

function initParallax() {
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - scrolled / 800;
        }
    });
}

// ========================================
// Canvas Resize on Scroll
// ========================================

function initCanvasResize() {
    let timer;
    window.addEventListener('scroll', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            document.getElementById('particles').height =
                document.documentElement.scrollHeight;
        }, 100);
    });
}

// ========================================
// Navbar Active State
// ========================================

function initNavbar() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.nav-link')
                .forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// ========================================
// Initialize Everything
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new ScrollAnimations();
    initSmoothScroll();
    initCategoryCards();
    initNavbar();
    initFormHandling();
    initCurtainRaiser();
    initParallax();
    initCanvasResize();
    console.log('🎓 KTU Portal initialized successfully!');
});

// ========================================
// Performance Optimization
// ========================================

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

window.addEventListener('scroll', debounce(() => {}, 50));
