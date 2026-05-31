
        const skillsSection = document.querySelector("#skills");
         const progressBar = document.querySelectorAll(".progress-bar");

        function fillBars() {
        const sectionTop = skillsSection.getBoundingClientRect().top;

        if (sectionTop < window.innerHeight) {
            progressBar.forEach(bar => {
                bar.style.width = bar.getAttribute("data-width");
            });
        }
    }

    window.addEventListener("scroll", fillBars);
    window.addEventListener("load", fillBars);
    
    const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});
    