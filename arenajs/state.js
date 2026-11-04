import {cards,deckAdversaire,trouverCarte} from "./cards.js";
import { generateId,melanger , formatDate } from "./utils.js";

export const CAMP_LUMIERE="Lumière";
export const CAMP_TENEBRES="Ténèbres";


export let   etat={ // le initiliser
    joueur: {
        nom: "Joueur",
        hp:3000,
        main:[],
        deck:[],
        camp:null,
        champ: Array(10).fill(undefined)
    } ,
    adversaire :{
        nom:"Adversaire",
        hp:3000,
        main:[],
        deck:[],
        camp:null,
        champ: Array(10).fill(undefined)
    },
    tour:1 , // contour de tour 
    joueurActif: Math.random() < 0.5 ? "joueur" : "adversaire",
    premierJoueur: Math.random() < 0.5 ? "joueur" : "adversaire",
    fini:false , // si gameover
    log:[] , // hysto,
    dragSource :null

    };

export function tirerCarte(cible,nombre){
    // je doit parcourir le deck du cible (etat.joueur ou etat.adversaire)
    while((nombre>0)&&(cible.deck.length>0)){
            // je doit generer un index alatoire 
            const index=Math.floor(Math.random()*cible.deck.length );// un index de 0 a len de tableau du deck
            const carte=cible.deck[index];
            cible.deck.splice(index,1);// suprimer la carte du deck pour eviter la duplication dans main dans les next tour
            if(cible.main.length<5){ // main peut pas contenir plus de 5 
                        cible.main.push(carte);
            }
            nombre--
    }
    return cible.main ;
}

export function  creerPartie(){// lors du crrer une partie je doit initilaiser tout les donnes des jeouer et advrsaire , tirer les cartes
     etat={ // le initiliser
    joueur: {
        hp:3000,
        main:[],
        deck:JSON.parse(localStorage.getItem("mythoriaDeck")||"[]"),
        camp:"lumière",
        champ: new Array(10).fill(null)
    } ,
    adversaire :{
        hp:3000,
        main:[],// va contenir 5 
        deck:deckAdversaire(),
        camp:"Ténèbres",
        champ: new Array(10).fill(null) // pour crrer 10 cases tout  null
    },
    tour:1 , // contour de tour 
    fini:false , // si gameover
    log:[] // hysto

    };
    tirerCarte(etat.joueur,5);
    tirerCarte(etat.adversaire,5);
    etat.log.push('le combat commence');
}
