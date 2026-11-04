import { HP_DEPART } from "./cards.js";

export const etat={
    joueur:{nom:"joueur",hp:HP_DEPART , main:[] , deck:[],camp:null,champ:{}},
    Adversaire:{nom:"Adversaire",hp:HP_DEPART , main:[] , deck:[],camp:null,champ:{}},
    tour:1,
    joueurActif:null,
    premierJoueur:null,
    fini:false,
    demarre:false,
    occupe:false,
    selection:null,
    log:[]
};

let compteurId=0;
export function creerInstance(modele){
    return { ...modele,id:++compteurId};
}

