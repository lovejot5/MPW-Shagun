/* ======================================================================
   MASTER SCRIPT FILE: Government Polytechnic College
   Premium Modern Interactive System
====================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Core */
    initHeaderScroll();
    initMobileMenu();
    setActiveNav();

    /* Animations */
    initScrollReveal();
    initCounters();
    initStatsCounter();
    initParallax();
    initMagneticButtons();
    initCursorGlow();

    /* Components */
    initFAQ();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initImageModal();
    initNewsSystem();
});

/* ================= HEADER SCROLL + BLUR ================= */
function initHeaderScroll() {
    const header = document.querySelector("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 40);
    });
}

/* ================= MOBILE MENU ================= */
function initMobileMenu() {
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector("#menu");
    const overlay = document.querySelector(".menu-overlay");

    if (!menuBtn || !menu || !overlay) return;

    function openMenu() {
        menu.classList.add("active");
        menuBtn.classList.add("active");
        overlay.classList.add("active");
        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        menu.classList.remove("active");
        menuBtn.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
    }

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.contains("active") ? closeMenu() : openMenu();
    });

    document.addEventListener("click", (e) => {
        if (
            menu.classList.contains("active") &&
            !menu.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) closeMenu();
    });
}

/* ================= ACTIVE NAV ================= */
function setActiveNav() {
    const links = document.querySelectorAll(".nav-link");
    const current = window.location.pathname.split("/").pop() || "index.html";

    links.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === current);
    });
}

/* ================= SCROLL REVEAL ================= */
function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

/* ================= GENERAL COUNTERS ================= */
function initCounters() {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;

        const update = () => {
            const increment = target / 100;
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                update();
                observer.disconnect();
            }
        });

        observer.observe(counter);
    });
}

/* ================= STATS STRIP COUNTER ================= */
function initStatsCounter() {
    const stats = document.querySelectorAll(".stat-number");

    stats.forEach(stat => {
        const target = +stat.dataset.target;
        let count = 0;

        const animate = () => {
            const increment = target / 80;
            if (count < target) {
                count += increment;
                stat.innerText = Math.ceil(count);
                requestAnimationFrame(animate);
            } else {
                stat.innerText = target + "+";
            }
        };

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animate();
                observer.disconnect();
            }
        });

        observer.observe(stat);
    });
}

/* ================= PARALLAX SHAPES ================= */
function initParallax() {
    // Disable on mobile devices
    if (window.innerWidth < 992) return;

    const shape1 = document.querySelector(".shape1");
    const shape2 = document.querySelector(".shape2");

    if (!shape1 && !shape2) return;

    let ticking = false;

    function update() {
        const scroll = window.scrollY;

        if (shape1) {
            shape1.style.transform = `translate3d(0, ${scroll * 0.04}px, 0)`;
        }

        if (shape2) {
            shape2.style.transform = `translate3d(0, ${scroll * -0.03}px, 0)`;
        }

        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    });
}

/* ================= CURSOR GLOW ================= */
function initCursorGlow() {
    const glow = document.querySelector(".cursor-glow");
    if (!glow) return;

    window.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
}

/* ================= MAGNETIC BUTTONS ================= */
function initMagneticButtons() {
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate(0,0)";
        });
    });
}

/* ================= IMAGE MODAL ================= */
function initImageModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");

    if (!modal || !modalImg) return;

    document.querySelectorAll(".gallery-track img").forEach(img => {
        img.addEventListener("click", () => {
            modal.classList.add("active");
            modalImg.src = img.src;
        });
    });

    modal.addEventListener("click", () => {
        modal.classList.remove("active");
    });
}

/* ================= FAQ ================= */
function initFAQ() {
    document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.parentElement;
            document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
            item.classList.toggle("active");
        });
    });
}

/* ================= CONTACT FORM ================= */
function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        alert("Message sent successfully.");
        form.reset();
    });
}

/* ================= BACK TO TOP ================= */
function initBackToTop() {
    const btn = document.createElement("button");
    btn.innerHTML = "↑";
    btn.className = "back-to-top";

    Object.assign(btn.style, {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "#7b4b1f",
        color: "white",
        border: "none",
        cursor: "pointer",
        display: "none",
        zIndex: "999"
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

/* ================= SMOOTH ANCHOR SCROLL ================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const offset = target.offsetTop - 80;
            window.scrollTo({ top: offset, behavior: "smooth" });
        });
    });
}

/* ================= PAGE PRELOADER ================= */
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (!preloader) return;

    preloader.style.opacity = "0";
    setTimeout(() => preloader.style.display = "none", 600);

    const page = document.querySelector(".page-content");
    if (page) page.classList.add("loaded");
});

/* ================= DYNAMIC NEWS SYSTEM ================= */

function initNewsSystem() {

    const container = document.querySelector(".latest-news-container");
    const list = document.querySelector(".latest-news-list");

    if (!container || !list) return;

    fetch("data/news.json")
        .then(res => res.json())
        .then(data => {

            // Sort newest first
            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Render items
            data.forEach(item => {
                const li = document.createElement("li");

                const date = new Date(item.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                });

                li.innerHTML = `
                    <span class="news-title">${item.title}</span>
                    <span class="news-date">${date}</span>
                `;

                if (item.isNew) {
                    li.setAttribute("data-new", "true");
                }

                list.appendChild(li);
            });

            // Duplicate for infinite loop
            list.innerHTML += list.innerHTML;

            startAutoScroll(container);
        })
        .catch(err => {
            console.error("News loading failed:", err);
        });
}


/* ================= SMOOTH INFINITE AUTO SCROLL ================= */

function startAutoScroll(container) {

    let scrollSpeed = 0.5;  // smooth
    let isPaused = false;

    function step() {
        if (!isPaused) {
            container.scrollTop += scrollSpeed;

            if (container.scrollTop >= container.scrollHeight / 2) {
                container.scrollTop = 0;
            }
        }

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);

    /* Pause on hover */
    container.addEventListener("mouseenter", () => isPaused = true);
    container.addEventListener("mouseleave", () => isPaused = false);

    /* Pause while manual scrolling */
    let scrollTimeout;

    container.addEventListener("scroll", () => {
        isPaused = true;
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            isPaused = false;
        }, 1500);
    });

    /* Touch support */
    container.addEventListener("touchstart", () => isPaused = true);
    container.addEventListener("touchend", () => {
        setTimeout(() => isPaused = false, 1200);
    });
}
