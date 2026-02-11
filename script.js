/* ========================================
   TYPING EFFECT
======================================== */

function initTypingEffect() {
    const text = "WELCOME TO APJKTU";
    const el = document.getElementById("typingText");
    let index = 0;

    function type() {
        if (index < text.length) {
            el.textContent += text.charAt(index);
            index++;
            setTimeout(type, 80);
        } else {
            setTimeout(() => {
                el.classList.add("typing-complete");
            }, 400);
        }
    }

    setTimeout(type, 500);
}

/* ========================================
   SCROLL CURTAIN
======================================== */

function initScrollCurtain() {
    const section = document.getElementById("scrollCurtain");
    const left = document.querySelector(".scroll-curtain-left");
    const right = document.querySelector(".scroll-curtain-right");
    const content = document.querySelector(".scroll-content-wrapper");

    let activated = false;

    function handle() {
        if (!section) return;

        const top = section.getBoundingClientRect().top;
        const trigger = window.innerHeight * 0.6;

        if (top <= trigger && !activated) {
            left.classList.add("active");
            right.classList.add("active");

            setTimeout(() => {
                left.classList.remove("active");
                right.classList.remove("active");
                content.classList.add("visible");
                activated = true;
            }, 800);
        }
    }

    window.addEventListener("scroll", handle);
    handle();
}

/* ========================================
   PARTICLE SYSTEM (OPTIMIZED)
======================================== */

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById("particles");
        this.ctx = this.canvas.getContext("2d");
        this.particles = [];
        this.count = window.innerWidth < 768 ? 40 : 70;
        this.mouse = { x: null, y: null, radius: 120 };
        this.init();
    }

    init() {
        this.resize();
        this.create();
        this.animate();

        window.addEventListener("resize", () => this.resize());

        window.addEventListener("mousemove", e => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener("mouseout", () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight; // OPTIMIZED
    }

    create() {
        this.particles = [];
        for (let i = 0; i < this.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;

            if (this.mouse.x) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.mouse.radius) {
                    p.x -= dx / 20;
                    p.y -= dy / 20;
                }
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = "rgba(11,45,91,0.4)";
            this.ctx.fill();

            // lighter linking
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = p.x - this.particles[j].x;
                const dy = p.y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    this.ctx.strokeStyle = `rgba(11,45,91,${0.15 *
                        (1 - dist / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(
                        this.particles[j].x,
                        this.particles[j].y
                    );
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

/* ========================================
   FADE IN ANIMATIONS
======================================== */

class ScrollAnimations {
    constructor() {
        const elements = document.querySelectorAll(".fade-in-up");

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        elements.forEach(el => observer.observe(el));
    }
}

/* ========================================
   LOGIN FORM HANDLING
======================================== */

function initLoginForm() {
    const form = document.getElementById("scrollSigninForm");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const username = document.getElementById("scrollUsername").value;
        const password = document.getElementById("scrollPassword").value;

        if (!username || !password) {
            showNotification("Please fill all fields", "error");
            return;
        }

        const btn = form.querySelector(".scroll-signin-btn");
        const original = btn.innerHTML;

        btn.innerHTML = "Signing in...";
        btn.disabled = true;

        setTimeout(() => {
            showNotification("Authentication successful!", "success");
            btn.innerHTML = original;
            btn.disabled = false;
        }, 1200);
    });
}

/* ========================================
   NOTIFICATIONS (FIXED)
======================================== */

function showNotification(message, type = "info") {
    const note = document.createElement("div");
    note.className = "notification";
    note.textContent = message;

    note.style.background =
        type === "error"
            ? "linear-gradient(135deg,#c0392b,#e74c3c)"
            : "linear-gradient(135deg,#0b2d5b,#123d7a)";

    document.body.appendChild(note);

    setTimeout(() => {
        note.classList.add("show");
    }, 10);

    setTimeout(() => {
        note.classList.remove("show");
        setTimeout(() => note.remove(), 300);
    }, 2500);
}

/* Add notification styles */
const style = document.createElement("style");
style.textContent = `
.notification{
    position:fixed;
    top:20px;
    right:20px;
    padding:1rem 1.5rem;
    color:white;
    border-radius:8px;
    box-shadow:0 8px 32px rgba(0,0,0,0.3);
    transform:translateX(120%);
    transition:transform 0.3s ease;
    z-index:10000;
}
.notification.show{
    transform:translateX(0);
}`;
document.head.appendChild(style);

/* ========================================
   PARALLAX (OPTIMIZED)
======================================== */

function initParallax() {
    const hero = document.querySelector(".curtain-raiser-section");
    if (!hero) return;

    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                hero.style.transform =
                    `translateY(${scrolled * 0.3}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ========================================
   NAVBAR ACTIVE STATE
======================================== */

function initNavbar() {
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            document.querySelectorAll(".nav-link")
                .forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });
}

/* ========================================
   INIT
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    new ParticleSystem();
    new ScrollAnimations();
    initTypingEffect();
    initScrollCurtain();
    initLoginForm();
    initParallax();
    initNavbar();

    console.log("🎓 Optimized KTU Portal Loaded");
});
