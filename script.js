/* ======================================================================
   MASTER SCRIPT FILE
   Government Polytechnic College
   Complete Animations + Automations System
====================================================================== */


/* ========================= DOM READY ========================== */

document.addEventListener("DOMContentLoaded", () => {

    initHeaderScroll();
    initMobileMenu();
    setActiveNav();
    initScrollReveal();
    initCounters();
    initSlideshow();
    loadNews();
    loadNotices();
    initFAQ();
    initContactForm();
    initBackToTop();
    initSmoothScroll();

});


/* ========================= HEADER SCROLL ========================== */

function initHeaderScroll() {
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });
}


/* ========================= MOBILE MENU ========================== */

function initMobileMenu() {

    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector("#menu");
    const overlay = document.querySelector(".menu-overlay");

    if (!menuBtn || !menu) return;

    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
        menuBtn.classList.toggle("active");

        if (overlay) {
            overlay.classList.toggle("active");
        }
    });

    // Close when clicking a link
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            menuBtn.classList.remove("active");

            if (overlay) {
                overlay.classList.remove("active");
            }
        });
    });

    // Close when clicking overlay
    if (overlay) {
        overlay.addEventListener("click", () => {
            menu.classList.remove("active");
            menuBtn.classList.remove("active");
            overlay.classList.remove("active");
        });
    }
}

/* ========================= ACTIVE NAV AUTO DETECT ========================== */

function setActiveNav() {
    const links = document.querySelectorAll(".nav-link");
    const current = location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === current) {
            link.classList.add("active");
        }
    });
}


/* ========================= SCROLL REVEAL ========================== */

function initScrollReveal() {
    const elements = document.querySelectorAll(".container-large, .card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
}


/* ========================= COUNTER ANIMATION ========================== */

function initCounters() {
    const counters = document.querySelectorAll(".counter");

    const animate = (counter) => {
        const target = +counter.dataset.target;
        let count = 0;
        const increment = target / 100;

        const update = () => {
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };

        update();
    };

    counters.forEach(counter => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animate(counter);
                observer.disconnect();
            }
        });
        observer.observe(counter);
    });
}


/* ========================= SLIDESHOW ========================== */

function initSlideshow() {
    const slides = document.querySelectorAll(".slide");
    if (!slides.length) return;

    let index = 0;

    function showSlide(i) {
        slides.forEach(s => s.style.display = "none");
        slides[i].style.display = "block";
    }

    showSlide(index);

    setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 4000);
}


/* ========================= LOAD NEWS ========================== */

async function loadNews() {
    const newsList = document.getElementById("newsList");
    if (!newsList) return;

    try {
        const res = await fetch("data/news.json");
        const news = await res.json();

        news.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.title}
                ${item.isNew ? '<span class="news-badge">NEW</span>' : ''}
                <small style="display:block;color:#888;">${item.date}</small>
            `;
            newsList.appendChild(li);
        });

        startInfiniteNewsScroll(newsList);

    } catch (err) {
        console.error("News load error:", err);
    }
}


/* ========================= INFINITE NEWS LOOP ========================== */

function startInfiniteNewsScroll(container) {
    let scrollSpeed = 1;

    function scroll() {
        container.scrollTop += scrollSpeed;

        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
            container.scrollTop = 0;
        }

        requestAnimationFrame(scroll);
    }

    scroll();
}


/* ========================= LOAD NOTICES ========================== */

async function loadNotices() {
    const noticeContainer = document.getElementById("noticeContainer");
    if (!noticeContainer) return;

    try {
        const res = await fetch("data/notices.json");
        const notices = await res.json();

        notices.forEach(n => {
            const card = document.createElement("div");
            card.className = "notice-card";

            card.innerHTML = `
                <div class="notice-header">
                    <img src="${n.author.icon}" alt="">
                    <div>
                        <strong>${n.title}</strong><br>
                        <small>${n.date} • ${n.category}</small>
                    </div>
                </div>
                <p>${n.description}</p>
                ${n.images.map(img => `<img class="notice-image" src="${img}">`).join("")}
                <div class="notice-buttons">
                    ${n.buttons.map(btn => `<a href="${btn.link}" class="btn btn-primary">${btn.text}</a>`).join("")}
                </div>
            `;

            noticeContainer.appendChild(card);
        });

    } catch (err) {
        console.error("Notices load error:", err);
    }
}


/* ========================= FAQ ACCORDION ========================== */

function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });
}


/* ========================= CONTACT FORM VALIDATION ========================== */

function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const inputs = form.querySelectorAll("input, textarea");
        let valid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = "red";
            } else {
                input.style.borderColor = "#ccc";
            }
        });

        if (valid) {
            alert("Message Sent Successfully!");
            form.reset();
        }
    });
}


/* ========================= BACK TO TOP ========================== */

function initBackToTop() {
    const btn = document.createElement("button");
    btn.innerText = "↑";
    btn.className = "back-to-top";
    document.body.appendChild(btn);

    btn.style.position = "fixed";
    btn.style.right = "20px";
    btn.style.bottom = "20px";
    btn.style.padding = "10px 15px";
    btn.style.borderRadius = "50%";
    btn.style.background = "#7b4b1f";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.display = "none";

    window.addEventListener("scroll", () => {
        btn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


/* ========================= SMOOTH SCROLL ========================== */

function initSmoothScroll() {
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}
