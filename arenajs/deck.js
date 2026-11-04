import { CARTES, TAILLE_DECK } from "./cards.js";
import { melanger } from "./utils.js";
import { creerInstance } from "./state.js";

export function construireDeckJoueur(){
    return melanger(CARTES).slice(0,TAILLE_DECK).map(creerInstance);
}

export function construireDeckBot(){
    return melanger(CARTES).slice(0, TAILLE_DECK).map(creerInstance);
}