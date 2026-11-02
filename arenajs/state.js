let deck=JSON.parse(localStorage.getItem("mythoriaDeck")||"[]");
console.log(deck);
const etat={
    joueur: {
        hp:3000,
        main:[],
        deck:deck,
        camp:"lumière",
        champ: new Array(10).fill(null)
    } ,
    adversaire :{
        hp:3000,
        main:[],// va contenir 5 
        deck:[],
        camp:"Ténèbres",
        champ: new Array(10).fill(null) // pour crrer 10 cases tout  null
    },
    tour:1 , // contour de tour 
    fini:false , // si gameover
    log:[] // hysto

};
export function tirerCarte(cible,nombre){
 while((nombre>0)&&(cible.deck.length>0)){
        const index=Math.floor(Math.random()*cible.deck.length );
        const carte=cible.deck[index];
        cible.deck.splice(index,1);
        if(cible.main.lenght<5){
                    cible.main.push(carte);
        }
        nombre--
 }
}
export function addItem(){

    
}
export function loadItems(){

}
export function saveItems(){

}