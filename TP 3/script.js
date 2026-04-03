function somme() {
  var a = Number(document.getElementById("t1").value);
  var b = Number(document.getElementById("t2").value);
  document.getElementById("resultat").value = a + b;
}

function multiplication() {
  var a = Number(document.getElementById("t1").value);
  var b = Number(document.getElementById("t2").value);
  document.getElementById("resultat").value = a * b;
}

function division() {
  var a = Number(document.getElementById("t1").value);
  var b = Number(document.getElementById("t2").value);
  if (b === 0) { alert("Division par zéro impossible."); return; }
  document.getElementById("resultat").value = a / b;
}

function permuter() {
  var a = document.getElementById("t1").value;
  var b = document.getElementById("t2").value;
  document.getElementById("t1").value = b;
  document.getElementById("t2").value = a;
}

function parite() {
  var a = Number(document.getElementById("t1").value);
  document.getElementById("parite").value = (a % 2 === 0) ? "Pair" : "Impair";
}

function effacer() {
  document.getElementById("t1").value = "";
  document.getElementById("t2").value = "";
  document.getElementById("resultat").value = "";
  document.getElementById("parite").value = "";
}
