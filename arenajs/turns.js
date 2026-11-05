import { MAIN_DEPART } from "./cards.js";
import { etat } from "./state.js";
import { ajouterLog , render } from "./ui.js";
import { construireDeckBot , construireDeckJoueur } from "./deck.js";

export function lancerPartie(){
    etat.Adversaire.deck=construireDeckBot();
    etat.joueur.deck=construireDeckJoueur();

    etat.joueur.champ=Array(10).fill(null);
    etat.Adversaire.champ=Array(10).fill(null);

    for(let i=0 ;i<MAIN_DEPART;i++){
          etat.joueur.main.push(etat.joueur.deck.shift());
          etat.Adversaire.champ[i]=etat.Adversaire.deck.shift();
    }
   
    ajouterLog("la partie commence . " +
                (etat.premierJoueur === "joueur" ? "Tu joues en premier." : "L'adversaire joue en premier."));

    render();
}