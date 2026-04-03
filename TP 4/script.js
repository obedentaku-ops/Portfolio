function afficher(html) {
  var r = document.getElementById("resultat");
  r.innerHTML = html;
  r.classList.add("visible");
}

function calcul_moyenne() {
  var n1 = prompt("Première note :");
  var n2 = prompt("Deuxième note :");
  var n3 = prompt("Troisième note :");
  var somme   = Number(n1) + Number(n2) + Number(n3);
  var moyenne = somme / 3;
  var mention = moyenne < 10 ? "Non admis." : "Admis.";
  afficher(
    "Somme : <strong>" + somme + "</strong><br>" +
    "Moyenne : <strong>" + moyenne.toFixed(2) + "</strong><br>" +
    mention
  );
}

function test_age() {
  var age = prompt("Quel est votre âge ?");
  if (Number(age) < 18) {
    document.body.style.backgroundColor = "#3a0000";
    afficher("Vous êtes <strong>mineur</strong>.");
  } else {
    document.body.style.backgroundColor = "#003a10";
    afficher("Vous êtes <strong>majeur</strong>.");
  }
}

function simple_affichage() {
  var nom    = prompt("Votre nom :");
  var prenom = prompt("Votre prénom :");
  afficher("Bonjour <strong>" + prenom + " " + nom + "</strong> !");
}

function test_couleur() {
  var couleur = prompt("Entrez une couleur (rouge, bleu, vert, rose) :");
  var map = {
    rouge: "#3a0000", red:   "#3a0000",
    bleu:  "#001a3a", blue:  "#001a3a",
    vert:  "#003a10", green: "#003a10",
    rose:  "#3a0030", pink:  "#3a0030"
  };
  var bg = map[couleur ? couleur.toLowerCase() : ""];
  if (bg) {
    document.body.style.backgroundColor = bg;
    afficher("Couleur appliquée : <strong>" + couleur + "</strong>");
  } else {
    afficher("Couleur non reconnue.");
  }
}
