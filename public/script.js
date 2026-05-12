function confirmDelete() {
    let nombre = 0;
    while (nombre<10) {
        nombre = Math.floor(Math.random()*100);
    }
    const valeur = prompt("Tapez le nombre '" + nombre + "' pour confirmer");

    return valeur==nombre;
}

function inputEvent() {
    const value = document.getElementById("collectionNameSearch").value.toLowerCase();
    
    let nombreJeux = 0;

    document.querySelectorAll(".collectionJeuVideo").forEach(jeu => {
        const nom = jeu.querySelector(".nom-jeu").textContent.toLowerCase();
        const visible = nom.includes(value);
        jeu.style.display = visible ? "" : "none";
        if (visible) nombreJeux++;
    });

    if (nombreJeux == 0) {
        document.getElementById("collectionNombreJeux").textContent = "Pas de résultats";
    } else {
        document.getElementById("collectionNombreJeux").textContent = "Total : " + nombreJeux + " jeux";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("collectionNameSearch").addEventListener("input", inputEvent);
    inputEvent();
});

document.getElementById("formulaireimage").addEventListener("change", function() {
    const img = this.files[0];
    if (img) {
        const reader = new FileReader;
        reader.onload = function(e) {
            document.getElementById("formulaireimg").src = e.target.result
        }
        reader.readAsDataURL(img);
    }
})