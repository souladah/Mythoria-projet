import { MAIN_DEPART } from "./cards.js";
import { etat } from "./state.js";
import { ajouterLog , render } from "./ui.js";
import { construireDeckBot , construireDeckJoueur } from "./deck.js";

export function lancerPartie(){
    etat.joueur.deck=construireDeckJoueur();
    etat.Adversaire.deck=construireDeckBot();

    for(let i=0 ;i<MAIN_DEPART;i++){
          etat.joueur.main.push(etat.joueur.deck.shift());
          etat.Adversaire.main.push(etat.Adversaire.deck.shift());
    }
   
    ajouterLog("la partie commence . " +
                (etat.premierJoueur === "joueur" ? "Tu joues en premier." : "L'adversaire joue en premier."));

    render();
}