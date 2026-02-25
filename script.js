/* ======================================================================
   MASTER SCRIPT FILE: Government Polytechnic College
   Complete Animations + Automations System
====================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Core UI
    initHeaderScroll();
    initMobileMenu();
    setActiveNav();
    
    // Animations
    initScrollReveal();
    initCounters();
    initSlideshow();
    
    // Data Loading
    loadNews();
    loadNotices();
    
    // Components
    initFAQ();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
});

/* ========================= HEADER SCROLL ========================== */
function initHeaderScroll() {
    const header = document.querySelector("header");
    if (!header) return;
    
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });
}

/* ========================= MOBILE MENU ========================== */
function initMobileMenu() {
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector("#menu");
    const overlay = document.querySelector(".menu-overlay");

    if (!menuBtn || !menu || !overlay) return;

    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
        menuBtn.classList.toggle("active");
        overlay.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    });

    overlay.addEventListener("click", () => {
        closeMenu();
    });

    function closeMenu() {
        menu.classList.remove("active");
        menuBtn.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
    }

    // ONLY close menu on link click — DO NOT prevent default
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
            // DO NOT preventDefault()
        });
    });
}

/* ========================= ACTIVE NAV DETECTION ========================== */
function setActiveNav() {
    const links = document.querySelectorAll(".nav-link");
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/* ========================= SCROLL REVEAL ========================== */
function initScrollReveal() {
    const elements = document.querySelectorAll(".container-large, .card, .notice-card");
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });
}

/* ========================= COUNTER ANIMATION ========================== */
function initCounters() {
    const counters = document.querySelectorAll(".counter");
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16);
                
                let current = 0;
                const update = () => {
                    current += step;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = target;
                    }
                };
                update();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 1 });

    counters.forEach(c => observer.observe(c));
}

/* ========================= NEWS AUTOMATION ========================== */
async function loadNews() {
    const newsList = document.getElementById("newsList");
    if (!newsList) return;

    try {
        // NOTE: Replace 'data/news.json' with your actual path or API
        const res = await fetch("data/news.json");
        if (!res.ok) throw new Error("File not found");
        const news = await res.json();

        newsList.innerHTML = ""; // Clear loader
        news.forEach(item => {
            const li = document.createElement("li");
            li.style.padding = "15px 0";
            li.style.borderBottom = "1px solid #eee";
            li.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>${item.title} ${item.isNew ? '<span class="news-badge">NEW</span>' : ''}</span>
                    <small style="color:#888;">${item.date}</small>
                </div>
            `;
            newsList.appendChild(li);
        });
    } catch (err) {
        // Fallback if JSON fails
        console.warn("News JSON not found, using static placeholders.");
    }
}

/* ========================= FAQ ACCORDION ========================== */
function initFAQ() {
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", () => {
            const item = button.parentElement;
            const isActive = item.classList.contains("active");
            
            // Close other items (Optional: remove this loop if you want multiple open)
            document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
            
            if (!isActive) item.classList.add("active");
        });
    });
}

/* ========================= CONTACT FORM ========================== */
function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        const btn = form.querySelector("button");
        const originalText = btn.innerText;
        
        btn.innerText = "Sending...";
        btn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert("Thank you! Your message has been sent to GPC Bathinda.");
            form.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

/* ========================= BACK TO TOP ========================== */
function initBackToTop() {
    const btn = document.createElement("button");
    btn.innerHTML = "↑";
    btn.className = "back-to-top";
    // Apply styles via JS to ensure they exist without separate CSS entries
    Object.assign(btn.style, {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "var(--accent)",
        color: "white",
        border: "none",
        cursor: "pointer",
        display: "none",
        zIndex: "999",
        fontSize: "20px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
    });
    
    document.body.appendChild(btn);

    window.addEventListener("scroll", () => {
        btn.style.display = window.scrollY > 400 ? "flex" : "none";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ========================= SMOOTH SCROLL ========================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            // Ignore pure "#"
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });
}
