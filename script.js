document.addEventListener("DOMContentLoaded", () => {
    initHeaderScroll();
    initMobileMenu();
    setActiveNav();
    initScrollReveal();
    initStatsCounter();
    initParallax();
    initCursorGlow();
    initFAQ();
    initNotices();
    initBackToTop();
    initSmoothScroll();
    initImageModal();
    initNewsSystem();
    initSlider();
});

function initHeaderScroll() {
    const header = document.querySelector("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 40);
    });
}

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
    menuBtn.addEventListener("click", () => {
        menu.classList.contains("active") ? closeMenu() : openMenu();
    });
    overlay.addEventListener("click", closeMenu);
}

function setActiveNav() {
    const links = document.querySelectorAll(".nav-link");
    const current = window.location.pathname.split("/").pop() || "index.html";
    links.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === current);
    });
}

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

function initStatsCounter() {
    const stats = document.querySelectorAll(".stat-number");
    if (!stats.length) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const stat = entry.target;
            const target = parseInt(stat.dataset.target);
            const duration = 1500;
            const startTime = performance.now();
            function animate(time) {
                const progress = Math.min((time - startTime) / duration, 1);
                const value = Math.floor(progress * target);
                stat.textContent = value;
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    stat.textContent = target + "+";
                }
            }
            requestAnimationFrame(animate);
            observer.unobserve(stat);
        });
    }, { threshold: 0.6 });
    stats.forEach(stat => observer.observe(stat));
}

function initParallax() {
    if (window.innerWidth < 992) return;
    const shape1 = document.querySelector(".shape1");
    const shape2 = document.querySelector(".shape2");
    if (!shape1 && !shape2) return;
    window.addEventListener("scroll", () => {
        const scroll = window.scrollY;
        if (shape1) shape1.style.transform = `translateY(${scroll * 0.04}px)`;
        if (shape2) shape2.style.transform = `translateY(${scroll * -0.03}px)`;
    });
}

function initCursorGlow() {
    const glow = document.querySelector(".cursor-glow");
    if (!glow) return;
    window.addEventListener("mousemove", e => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
}

function initImageModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    if (!modal || !modalImg) return;
    document.querySelectorAll(".slide").forEach(img => {
        img.addEventListener("click", () => {
            modal.classList.add("active");
            modalImg.src = img.src;
        });
    });
    modal.addEventListener("click", () => {
        modal.classList.remove("active");
    });
}

function initFAQ() {
    const items = document.querySelectorAll(".faq-item");
    items.forEach((item, index) => {
        const button = item.querySelector(".faq-question");
        button.addEventListener("click", () => {
            items.forEach(i => {
                if (i !== item) i.classList.remove("active");
            });
            item.classList.toggle("active");
        });
        if (index === 0) {
            item.classList.add("active");
        }
    });
}

function initBackToTop() {
    const btn = document.querySelector(".scroll-top");
    if (!btn) return;
    window.addEventListener("scroll", () => {
        btn.style.display = window.scrollY > 400 ? "flex" : "none";
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });
        });
    });
}
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => preloader.style.display = "none", 600);
    }

    const page = document.querySelector(".page-content");
    if (page) page.classList.add("loaded");
});

function initNewsSystem() {
    const container = document.querySelector(".latest-news-container");
    const list = document.querySelector(".latest-news-list");
    if (!container || !list) return;
    fetch("data/news.json")
        .then(res => res.json())
        .then(data => {
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            renderNews(data, list);
            list.innerHTML += list.innerHTML;
            startAutoScroll(container);
        })
        .catch(err => console.error("News loading failed:", err));
}

function renderNews(data, list) {
    list.innerHTML = "";
    data.forEach(item => {
        const li = document.createElement("li");
        const date = new Date(item.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        li.innerHTML = `
            <a href="${item.link || '#'}" class="news-link">
                <span class="news-title">${item.title}</span>
                <span class="news-date">${date}</span>
            </a>
        `;
        if (item.isNew) {
            li.setAttribute("data-new", "true");
        }
        list.appendChild(li);
    });
}

function startAutoScroll(container) {
    let speed = 0.5;
    let pause = false;
    let userInteracting = false;
    function animate() {
        if (!pause && !userInteracting && container.scrollHeight > container.clientHeight) {
            container.scrollTop += speed;
            if (container.scrollTop >= container.scrollHeight / 2) {
                container.scrollTop = 0;
            }
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    container.addEventListener("mouseenter", () => pause = true);
    container.addEventListener("mouseleave", () => pause = false);
    container.addEventListener("wheel", () => {
        userInteracting = true;
        resetInteraction();
    });
    container.addEventListener("touchstart", () => {
        userInteracting = true;
    });
    container.addEventListener("touchend", () => {
        resetInteraction();
    });
   
    function resetInteraction() {
        setTimeout(() => {
            userInteracting = false;
        }, 1500);
    }
}

function initNotices() {
    const container = document.getElementById("noticeContainer");
    if (!container) return;
    fetch("data/notices.json")
        .then(res => res.json())
        .then(data => {
            data.sort((a,b)=> new Date(b.date) - new Date(a.date));
            data.forEach(notice => {
                const card = document.createElement("div");
                card.className = "notice-embed reveal";
                const date = new Date(notice.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                });
                card.innerHTML = `
                    ${notice.isNew ? `<div class="notice-new">NEW</div>` : ""}
                    <div class="notice-top">
                        <img src="${notice.author.icon}" alt="">
                        <div class="notice-author">${notice.author.name}</div>
                        <div class="notice-category">${notice.category}</div>
                    </div>
                    <div class="notice-title">${notice.title}</div>
<div class="notice-description">
    ${notice.description}
</div>
<div class="notice-date">${date}</div>
                    ${
                        notice.images && notice.images.length
                        ? `<div class="notice-image">
                            <img src="${notice.images[0]}" alt="">
                           </div>`
                        : ""
                    }
                    ${
                        notice.buttons && notice.buttons.length
                        ? `<div class="notice-buttons">
                            ${notice.buttons.map(btn =>
                                `<a href="${btn.link}" class="notice-btn" target="_blank">
                                    ${btn.text}
                                </a>`
                            ).join("")}
                           </div>`
                        : ""
                    }
                `;
                container.appendChild(card);
            });
        })
        .catch(err => console.error("Notice loading failed:", err));
}

function initSlider() {
    const slider = document.querySelector(".slider");
    if (!slider) return;
    const slides = slider.querySelectorAll(".slide");
    const nextBtn = slider.querySelector(".next");
    const prevBtn = slider.querySelector(".prev");
    if (!slides.length || !nextBtn || !prevBtn) return;
    let current = 0;
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }
    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }
    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    }
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
    setInterval(nextSlide, 4000);
    let startX = 0;
    slider.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });
    slider.addEventListener("touchend", e => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextSlide();
        if (endX - startX > 50) prevSlide();
    });
}

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const button = form.querySelector("button");
        const text = button.querySelector(".btn-text");
        const spinner = button.querySelector(".spinner");

        text.style.display = "none";
        spinner.style.display = "inline-block";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            spinner.style.display = "none";
            text.style.display = "inline";

            if (response.ok) {
                alert("Message sent successfully!");
                form.reset();
            } else {
                alert("Something went wrong!");
            }

        } catch (error) {
            spinner.style.display = "none";
            text.style.display = "inline";
            alert("Error sending message!");
        }
    });
}
