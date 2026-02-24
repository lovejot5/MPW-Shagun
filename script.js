/* ================= MOBILE MENU ================= */

function toggleMenu(btn) {
    const menu = document.getElementById("menu");
    if (!menu) return;

    menu.classList.toggle("show");
    btn.classList.toggle("active");

    document.body.style.overflow =
        menu.classList.contains("show") ? "hidden" : "auto";
}

document.addEventListener("click", (e) => {
    const menu = document.getElementById("menu");
    const btn = document.querySelector(".menu-btn");

    if (!menu || !btn) return;

    if (
        menu.classList.contains("show") &&
        !menu.contains(e.target) &&
        !btn.contains(e.target)
    ) {
        menu.classList.remove("show");
        btn.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

/* ================= INFINITE NEWS SCROLL ================= */

document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("newsList");
    const container = document.querySelector(".latest-news-container");

    if (!list || !container) return;

    fetch("data/news.json")
        .then(res => res.json())
        .then(data => {

            list.innerHTML = "";

            data.forEach(item => {
                const li = document.createElement("li");

                li.innerHTML = `
                    <div>
                        <strong>${item.title}</strong>
                        ${item.isNew ? '<span class="badge-new">NEW</span>' : ''}
                    </div>
                    <div class="news-meta">
                        ${new Date(item.date).toDateString()}
                    </div>
                `;

                list.appendChild(li);
            });

            /* Duplicate list for infinite loop */
            const clone = list.cloneNode(true);
            list.parentNode.appendChild(clone);

            startInfiniteScroll(container);
        })
        .catch(err => console.error("News load error:", err));
});

/* Smooth infinite scroll */
function startInfiniteScroll(container) {

    let speed = 0.5; // smooth speed
    let paused = false;

    function step() {
        if (!paused) {
            container.scrollTop += speed;

            if (container.scrollTop >= container.scrollHeight / 2) {
                container.scrollTop = 0;
            }
        }
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);

    /* Manual interaction pause */
    container.addEventListener("mouseenter", () => paused = true);
    container.addEventListener("mouseleave", () => paused = false);

    container.addEventListener("touchstart", () => paused = true);
    container.addEventListener("touchend", () => paused = false);
}

/* ================= NOTICES RENDER ================= */

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("noticeContainer");
    if (!container) return;

    fetch("data/notices.json")
        .then(res => res.json())
        .then(data => {

            data.forEach(notice => {

                const div = document.createElement("div");
                div.className = "principal-card";
                div.style.marginBottom = "40px";

                div.innerHTML = `
                    <div class="principal-header">
                        <img src="${notice.author.icon}" alt="Author">
                        <div>
                            <h3>${notice.title}</h3>
                            <span>${notice.author.name}</span>
                            <small style="display:block;color:#777">
                                ${new Date(notice.date).toDateString()}
                            </small>
                        </div>
                    </div>

                    <p style="margin:20px 0;">
                        ${notice.description}
                    </p>

                    ${
                        notice.images && notice.images.length > 0
                        ? `
                        <div style="margin-bottom:20px;">
                            ${notice.images.map(img =>
                                `<img src="${img}" style="width:100%;border-radius:16px;margin-bottom:10px;">`
                            ).join("")}
                        </div>
                        `
                        : ""
                    }

                    ${
                        notice.buttons && notice.buttons.length > 0
                        ? `
                        <div style="display:flex;gap:10px;flex-wrap:wrap;">
                            ${notice.buttons.map(btn =>
                                `<a href="${btn.link}" target="_blank"
                                    style="
                                        padding:10px 16px;
                                        border-radius:12px;
                                        background:var(--accent-soft);
                                        color:var(--accent);
                                        font-weight:600;
                                        box-shadow:0 4px 12px rgba(0,0,0,.1);
                                        transition:.3s;">
                                    ${btn.text}
                                </a>`
                            ).join("")}
                        </div>
                        `
                        : ""
                    }
                `;

                container.appendChild(div);
            });
        })
        .catch(err => console.error("Notice load error:", err));
});
