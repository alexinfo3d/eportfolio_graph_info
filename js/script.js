const elements = document.querySelectorAll(".reveal");

// Crée un observateur qui détecte leur apparition à l'écran
const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {

            // Vérifie si l'élément devient visible
            if (entry.isIntersecting) {

                // Déclenche l'animation CSS
                entry.target.classList.add("visible");

                // Arrête l'observation après l'animation
                observer.unobserve(entry.target);
            }
        });
    },
    // le pourcentage visible nécessaire pour déclencher l'animation //
    {
        threshold: 0.3
    }
);

// Observe chaque élément
elements.forEach((element) => {
    observer.observe(element);
});