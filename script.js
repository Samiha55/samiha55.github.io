// Projets : modifie cette liste pour ajouter tes réalisations
const projets = [
  { titre: "Atlas des oiseaux", desc: "Site web avec carte du monde : découvrir les oiseaux par pays (exemple : la France).", tech: ["HTML", "CSS", "JavaScript"], lien: "#" },
  { titre: "Portfolio personnel", desc: "Ce site, conçu avec un thème sombre et des accents bleus.", tech: ["HTML", "CSS", "JavaScript"], lien: "https://github.com/Samiha55" },
  { titre: "Projet à ajouter", desc: "Décris ici ton projet : objectif, ta contribution, résultat.", tech: ["WordPress", "PHP"], lien: "#" }
];

const liste = document.getElementById("project-list");
projets.forEach(p => {
  const a = document.createElement("article");
  a.className = "card";
  a.innerHTML = `<h3></h3><p></p><ul class="tags" style="margin-top:.8rem"></ul><a class="more" target="_blank" rel="noopener">Voir le projet →</a>`;
  a.querySelector("h3").textContent = p.titre;
  a.querySelector("p").textContent = p.desc;
  p.tech.forEach(t => { const li = document.createElement("li"); li.textContent = t; a.querySelector(".tags").appendChild(li); });
  a.querySelector(".more").href = p.lien;
  liste.appendChild(a);
});

// Menu mobile
const burger = document.querySelector(".burger"), menu = document.querySelector(".nav nav");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

// Apparition des sections + lien actif
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("show")), { threshold: .1 });
document.querySelectorAll(".reveal").forEach(s => io.observe(s));
const liens = [...menu.querySelectorAll("a")];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) liens.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section").forEach(s => spy.observe(s));

// Formulaire : ouvre le mail du visiteur (remplace EMAIL par ton adresse)
const EMAIL = "ton.email@exemple.com";
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, msg = f.querySelector(".msg");
  if (!f.nom.value.trim() || !f.email.validity.valid || !f.message.value.trim()) {
    msg.textContent = "Merci de remplir correctement tous les champs.";
    return;
  }
  const sujet = encodeURIComponent("Contact portfolio – " + f.nom.value);
  const corps = encodeURIComponent(f.message.value + "\n\n" + f.nom.value + " (" + f.email.value + ")");
  window.location.href = `mailto:${EMAIL}?subject=${sujet}&body=${corps}`;
  msg.textContent = "Ton application mail va s’ouvrir.";
});

document.getElementById("year").textContent = new Date().getFullYear();
