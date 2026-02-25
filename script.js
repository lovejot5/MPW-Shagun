function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

window.addEventListener("scroll", function () {
    document.getElementById("header")
        .classList.toggle("scrolled", window.scrollY > 50);
});

/* ================= SLIDER ================= */

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index){
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

function nextSlide(){
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide(){
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

if(slides.length > 0){
    setInterval(nextSlide, 5000);
}

/* ================= LOAD NEWS ================= */

fetch("data/news.json")
.then(res => res.json())
.then(data => {
    const list = document.getElementById("newsList");
    if(!list) return;
    data.forEach(item=>{
        const li = document.createElement("li");
        li.innerHTML = `${item.title} <span style="float:right;font-size:12px;">${item.date}</span>`;
        list.appendChild(li);
    });
});
