import { HP_DEPART } from "./cards.js";

function creerJoueur(nom){
  return {nom , hp:HP_DEPART , main :[] , deck:[], camp:null , champ:[],cimetiere:[]};
}
export const etat={
    joueur: creerJoueur("Joueur"),
    Adversaire: creerJoueur("Joueur"),
    tour:1,
    joueurActif:null,
    premierJoueur:null,
    fini:false,
    demarre:false,
    occupe:false,
    selection:null,
    log:[]
};

export function autreCle(cle){
    
}
let compteurId=0;
export function creerInstance(modele){
    return { ...modele,id:++compteurId};
}

