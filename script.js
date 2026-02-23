/* ================= MOBILE MENU ================= */
function toggleMenu(btn) {
    const menu = document.getElementById("menu");
    if (!menu) return;

    menu.classList.toggle("show");
    btn.classList.toggle("active");
    btn.blur();
}

/* Close menu on outside click */
document.addEventListener("click", (e) => {
    const menu = document.getElementById("menu");
    const btn = document.querySelector(".menu-btn");

    if (!menu || !btn) return;

    if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove("show");
        btn.classList.remove("active");
    }
});

/* ================= INFINITE NEWS LOOP ================= */
document.addEventListener("DOMContentLoaded", () => {

    const list = document.getElementById("newsList");
    const container = document.querySelector(".latest-news-container");

    if (!list || !container) return;

    fetch("data/news.json")
        .then(res => res.json())
        .then(data => {

            /* Render original items */
            data.forEach(item => {
                list.appendChild(createNewsItem(item));
            });

            /* Duplicate items for seamless loop */
            data.forEach(item => {
                list.appendChild(createNewsItem(item));
            });

            startInfiniteScroll();
        });

    function createNewsItem(item) {
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
        return li;
    }

    function startInfiniteScroll() {
        let scrollSpeed = 0.5;
        let isPaused = false;

        function step() {
            if (!isPaused) {
                container.scrollTop += scrollSpeed;

                /* When half reached, reset smoothly */
                if (container.scrollTop >= container.scrollHeight / 2) {
                    container.scrollTop = 0;
                }
            }
            requestAnimationFrame(step);
        }

        /* Pause on interaction */
        container.addEventListener("mouseenter", () => isPaused = true);
        container.addEventListener("mouseleave", () => isPaused = false);
        container.addEventListener("touchstart", () => isPaused = true);
        container.addEventListener("touchend", () => isPaused = false);

        requestAnimationFrame(step);
    }
});
