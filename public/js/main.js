// public/js/main.js

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // Mobile Menu
    // =========================

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }


    // =========================
    // Smooth Scroll
    // =========================

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


    // =========================
    // Shop Now Button
    // =========================

    const shopBtn = document.querySelector(".shop-now-btn");

    if (shopBtn) {
        shopBtn.addEventListener("click", () => {
            window.location.href = "catalog.html";
        });
    }


    // =========================
    // Explore Collection Button
    // =========================

    const exploreBtn = document.querySelector(".explore-btn");

    if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            window.location.href = "catalog.html";
        });
    }

});