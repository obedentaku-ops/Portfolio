
function AjouterLigne() {

    const corpsTableau = document.getElementById("corps-tableau");
    const premiereLigne = document.getElementsByClassName("ligne-commande")[0];
    

    let nouvelleLigne = premiereLigne.cloneNode(true);
    

    let inputs = nouvelleLigne.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = ""; 
    }

    const pointInsertion = document.getElementById("point-insertion");
    corpsTableau.insertBefore(nouvelleLigne, pointInsertion);
}


function remplir() {
    const descriptions = ["Bureau", "Portable", "Ram 8go", "Clef usb 16go", "Souris", "Ecran 17 pouces"];
    

    const listeDesc = document.getElementsByClassName("desc");
    const listeQte = document.getElementsByClassName("qte");
    const listePrix = document.getElementsByClassName("prix");


    for (let i = 0; i < listeDesc.length; i++) {

        let randDescIndex = Math.floor(Math.random() * descriptions.length);
        listeDesc[i].value = descriptions[randDescIndex];


        listeQte[i].value = Math.floor(Math.random() * 10) + 1;


        listePrix[i].value = Math.floor(Math.random() * 100) + 1;
    }
}


function calculate() {

    const listeQte = document.getElementsByClassName("qte");
    const listePrix = document.getElementsByClassName("prix");
    const listeTotalLigne = document.getElementsByClassName("total-ligne");

    let sousTotal = 0;


    for (let i = 0; i < listeQte.length; i++) {
   
        let qte = parseInt(listeQte[i].value);
        let prix = parseFloat(listePrix[i].value);

  
        if (isNaN(qte)) qte = 0;
        if (isNaN(prix)) prix = 0;

        let totalLigne = qte * prix;

        listeTotalLigne[i].value = totalLigne.toFixed(2);

        sousTotal += totalLigne;
    }


    let tauxRemise = parseFloat(document.getElementById("taux-remise").value); 
    let tauxImpot = parseFloat(document.getElementById("taux-impot").value);   
    let fraisExp = parseFloat(document.getElementById("frais-exped").value);

    if (isNaN(tauxRemise)) tauxRemise = 0;
    if (isNaN(tauxImpot)) tauxImpot = 0;
    if (isNaN(fraisExp)) fraisExp = 0;

 
    
 
    document.getElementById("res-sous-total").innerText = sousTotal.toFixed(2);

  
    let montantRemise = sousTotal * tauxRemise;
    let sousTotalRemise = sousTotal - montantRemise;
    document.getElementById("res-sous-total-remise").innerText = sousTotalRemise.toFixed(2);


    let taxeTotale = sousTotal * tauxImpot; 
    document.getElementById("res-taxe").innerText = taxeTotale.toFixed(2);

   
    let solde = sousTotalRemise + taxeTotale + fraisExp;

  
    document.getElementById("res-solde").innerText = solde.toFixed(2);
}