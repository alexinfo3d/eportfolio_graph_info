// Détection visibilité catégories HOME

const elements = document.querySelectorAll(".reveal, .appear:not(.see-projects-container)");

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.3
    }
);

elements.forEach((element) => {
    observer.observe(element);
});

// Afficher le bouton après l'apparition de la 3e catégorie
const troisiemeImage = document.querySelector(".am-cat");
const projets = document.querySelector(".see-projects-container");

if (troisiemeImage && projets) {
    troisiemeImage.addEventListener("transitionend", (event) => {
        if (
            event.propertyName === "opacity" &&
            troisiemeImage.classList.contains("visible")
        ) {
            projets.classList.add("visible");
        }
    });
}