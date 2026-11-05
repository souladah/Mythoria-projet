import { render } from "./ui.js";
import { etat } from "./state.js";
import { lancerPartie } from "./turns.js";

const dialogIntro = document.getElementById("dialog-intro");
const dialogStart = document.getElementById("dialog-start");
const btnJouer = document.getElementById("btn-jouer");
const btnLumiere = document.getElementById("btn-lumiere");
const btnTenebres = document.getElementById("btn-tenebres");
const btnCommencer = document.getElementById("btn-commencer");
const coinResult = document.getElementById("coin-result");
const playerCamp = document.getElementById("player-camp");
const opponentCamp = document.getElementById("opponent-camp");

function choisirCamp(camp) {
  etat.joueur.camp = camp;
  etat.Adversaire.camp = camp === "Lumière" ? "Ténèbres" : "Lumière";

  playerCamp.textContent = etat.joueur.camp;
  opponentCamp.textContent = etat.Adversaire.camp;

  btnLumiere.classList.toggle("ring-4", camp === "Lumière");
  btnTenebres.classList.toggle("ring-4", camp === "Ténèbres");
  
  btnCommencer.disabled = false;
}

function tirageAuSort() {
  etat.premierJoueur = Math.random() < 0.5 ? "joueur" : "adversaire";
  etat.joueurActif = etat.premierJoueur;

  coinResult.textContent =
    etat.premierJoueur === "joueur"
      ? "Le sort a parlé : tu commences !"
      : "Le sort a parlé : l’adversaire commence.";
    if(etat.premierJoueur==="adversaire"){
        btnLumiere.classList.add("hidden");  
        btnTenebres.classList.add("hidden"); 
        etat.joueur.camp=etat.joueur.camp==="Lumière"? "Ténèbres" :"Lumière" ;
        btnCommencer.disabled=false
    }
}

btnCommencer.disabled = true;

btnJouer.addEventListener("click", () => {
  dialogIntro.close();
  tirageAuSort();
  dialogStart.showModal();
});

btnLumiere.addEventListener("click", () => choisirCamp("Lumière"));
btnTenebres.addEventListener("click", () => choisirCamp("Ténèbres"));

btnCommencer.addEventListener("click", () => {
  dialogStart.close();
  lancerPartie();
});

render();
dialogIntro.showModal();
