function testqcm() {
    let score = 0;

    let q1 = document.querySelectorAll('input[name="q1"]:checked');
    let q2 = document.querySelectorAll('input[name="q2"]:checked');
    let q3 = document.querySelectorAll('input[name="q3"]:checked');
    let q4 = document.querySelectorAll('input[name="q4"]:checked');
    let q5 = document.querySelectorAll('input[name="q5"]:checked');
    let q6 = document.querySelectorAll('input[name="q6"]:checked');
    let q7 = document.querySelectorAll('input[name="q7"]:checked');
    let q8 = document.querySelectorAll('input[name="q8"]:checked');
    let q9 = document.querySelectorAll('input[name="q9"]:checked');
    let q10 = document.querySelectorAll('input[name="q10"]:checked');
    

    q1.forEach(r => score += parseInt(r.value));
    q2.forEach(r => score += parseInt(r.value));
    q3.forEach(r => score += parseInt(r.value));
    q4.forEach(r => score += parseInt(r.value));
    q5.forEach(r => score += parseInt(r.value));
    q6.forEach(r => score += parseInt(r.value));
    q7.forEach(r => score += parseInt(r.value));
    q8.forEach(r => score += parseInt(r.value));
    q9.forEach(r => score += parseInt(r.value));
    q10.forEach(r => score += parseInt(r.value));
    


    alert("Votre score : " + score + " bonne(s) réponse(s)");
}

function ouvrirCorrige() {
    window.open("corrigé8.html", "Corrigé", "width=800,height=600");
}