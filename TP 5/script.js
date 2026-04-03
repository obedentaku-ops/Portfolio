function afficher(html) {
  var r = document.getElementById("resultat");
  r.innerHTML = html;
  r.classList.add("visible");
}

function calcul_moyenne() {
  var n1 = prompt("Première note sur 20 :");
  var n2 = prompt("Deuxième note sur 20 :");
  var n3 = prompt("Troisième note sur 20 :");
  var somme   = Number(n1) + Number(n2) + Number(n3);
  var moyenne = somme / 3;
  var mention;
  if      (moyenne < 10) mention = "Redoublant.";
  else if (moyenne < 12) mention = "Admis — Passable.";
  else if (moyenne < 14) mention = "Admis — Bien.";
  else                   mention = "Admis — Très bien.";
  afficher(
    "Somme : <strong>" + somme + "</strong><br>" +
    "Moyenne : <strong>" + moyenne.toFixed(2) + " / 20</strong><br>" +
    mention
  );
}

function temp() {
  var t = Number(prompt("Saisissez une température (°C) :"));
  var msg, bg;
  if (t < 10) {
    msg = "Température <strong>froide</strong> (" + t + "°C).";
    bg  = "#001a2a";
  } else if (t < 25) {
    msg = "Température <strong>normale</strong> (" + t + "°C).";
    bg  = "#001a10";
  } else {
    msg = "Température <strong>chaude</strong> (" + t + "°C).";
    bg  = "#2a1000";
  }
  document.body.style.backgroundColor = bg;
  afficher(msg);
}

function comp() {
  var n1 = Number(prompt("Premier nombre :"));
  var n2 = Number(prompt("Deuxième nombre :"));
  if (n1 === n2) {
    afficher("Les deux nombres sont <strong>égaux</strong> (" + n1 + ").");
  } else {
    var grand = n1 > n2 ? n1 : n2;
    var petit = n1 < n2 ? n1 : n2;
    afficher(
      "Plus grand : <strong>" + grand + "</strong><br>" +
      "Plus petit : <strong>" + petit + "</strong>"
    );
  }
}
