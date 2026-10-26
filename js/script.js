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


  // Chaque vignette ouvre le lien du champ  url: "https://..."  dans un nouvel onglet.
  // Sans ce champ, elle pointe vers un lien d'exemple (https://example.com/).
  // Pour utiliser vos propres images, ajoutez aussi  image: "chemin/vers/image.jpg".
  // Sans ce champ, une vignette illustrée est générée automatiquement.
  var PROJECTS = [
    { title: "Le Nemesis Bleu", desc: "Modélisation d'un navire du début du 19ème siècle",url : "projet01-nmb.html", image :"../../../img/projets-3d/projet01/Vignette.jpg" }

  ];

  function norm(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var grid = document.getElementById("grid");
  var input = document.getElementById("q");
  var clearBtn = document.getElementById("clear");
  var countEl = document.getElementById("count");

  function highlight(title, q) {
    if (!q) return esc(title);
    var i = norm(title).indexOf(q);
    if (i < 0) return esc(title);
    return esc(title.slice(0, i)) + "<mark>" + esc(title.slice(i, i + q.length)) + "</mark>" + esc(title.slice(i + q.length));
  }

  function render() {
    var raw = input.value.trim();
    var q = norm(raw);
    var list = PROJECTS.filter(function (p) { return !q || norm(p.title).indexOf(q) !== -1; });
    clearBtn.hidden = !input.value;
    countEl.textContent = list.length + (list.length > 1 ? " projets" : " projet") + (q ? " trouvé" + (list.length > 1 ? "s" : "") : "");
    if (!list.length) {
      grid.innerHTML = '<li class="empty">Aucun projet ne correspond à « ' + esc(raw) + ' ». Essayez un autre mot du titre.</li>';
      return;
    }
    grid.innerHTML = list.map(function (p) {
      var src = p.image || art(p.title);
      var href = p.url || "https://example.com/";
      return '<li><a class="card" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer"><img class="thumb" alt="" loading="lazy" src="' + src + '">' +
        '<div class="body"><h2>' + highlight(p.title, q) + "</h2><p>" + esc(p.desc) + "</p></div></a></li>";
    }).join("");
  }

  input.addEventListener("input", render);
  clearBtn.addEventListener("click", function () { input.value = ""; render(); input.focus(); });
  render();