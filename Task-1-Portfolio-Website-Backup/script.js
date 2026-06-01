
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
    