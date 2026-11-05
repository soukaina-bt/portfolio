// ---- 1. Filtre des projets par catégorie ----
const boutons = document.querySelectorAll(".filter");
const projets = document.querySelectorAll(".project");

boutons.forEach(function (bouton) {
  bouton.addEventListener("click", function () {
    const cat = bouton.dataset.cat;

    boutons.forEach(function (b) { b.classList.remove("active"); });
    bouton.classList.add("active");

    projets.forEach(function (p) {
      const visible = cat === "tous" || p.dataset.cat === cat;
      p.classList.toggle("cache", !visible);
    });
  });
});

// ---- 2. Mode sombre / clair (mémorisé) ----
const boutonTheme = document.getElementById("theme");

function appliquerTheme(sombre) {
  document.body.classList.toggle("sombre", sombre);
  boutonTheme.textContent = sombre ? "Mode clair" : "Mode sombre";
}

let sombre = false;
try { sombre = localStorage.getItem("theme") === "sombre"; } catch (e) {}
appliquerTheme(sombre);

boutonTheme.addEventListener("click", function () {
  const maintenantSombre = !document.body.classList.contains("sombre");
  appliquerTheme(maintenantSombre);
  try { localStorage.setItem("theme", maintenantSombre ? "sombre" : "clair"); } catch (e) {}
});

// ---- 3. Validation du formulaire de contact ----
const form = document.getElementById("form");
const retour = document.getElementById("retour");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const champs = ["nom", "email", "objet", "message"].map(function (id) {
    return document.getElementById(id);
  });
  let erreur = "";

  champs.forEach(function (c) {
    c.classList.remove("erreur");
    if (c.value.trim() === "") {
      c.classList.add("erreur");
      erreur = "Merci de remplir tous les champs.";
    }
  });

  const email = document.getElementById("email");
  const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  if (!erreur && !emailValide) {
    email.classList.add("erreur");
    erreur = "L'adresse e-mail n'est pas valide.";
  }

  if (erreur) {
    retour.textContent = erreur;
    retour.className = "ko";
  } else {
    retour.textContent = "Message prêt à être envoyé. Merci !";
    retour.className = "ok";
    form.reset();
  }
});
