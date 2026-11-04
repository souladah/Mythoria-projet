import { render  } from "./ui.js";
import { etat } from "./ui.js";
import { lancerPartie } from "./turns.js";
const dialogue=document.getElementById("dialog-start");
const btnLumiere=document.getElementById("btn-lumiere");
const btnTenebres=document.getElementById("btn-tenebres");
const btnCommencer=document.getElementById("btn-commencer");
const coinResult=document.getElementById("coin-result");
const playerCamp=document.getElementById("player-camp");
const opponentCamp=document.getElementById("opponenr-camp");

function choisirCamp(camp){
    etat.joueur.camp;
    etat.adversaire.camp = camp === "Lumière" ? "Ténèbres" : "Lumière";
    playerCamp.textContent=etat.joueur.camp ;
    opponentCamp.textContent=etat.adversaire.camp;
    btnLumiere.classList.toggle("ring-4", camp==="Lumière");
    btnTenebres.classList.toggle("ring-4", camp==="Ténèbres")
    btnCommencer.disabled=false;
}

function tirageAuSort(){
    etat.premierJoueur = Math.random() < 0.5 ? "joueur" : "adversaire";
    etat.joueurActif = etat.premierJoueur;
    coinResult.textContent=etat.premierJoueur === "joueur"
        ? "Le sort a parlé : tu commences !"
        : "Le sort a parlé : l'adversaire commence.";
}

btnCommencer.disabled=true;
btnLumiere,addEventListener("click",()=>choisirCamp("Lumière"));
btnLumiere,addEventListener("click",()=>choisirCamp("Ténèbres"));
btnCommencer.addEventListener("click", () => {
    dialogue.close();
    lancerPartie();
});
tirageAuSort();
render();
dialogue.showModal();
