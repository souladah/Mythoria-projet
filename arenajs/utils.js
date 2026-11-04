let comptid=0 ;
export function generateId(){
    comptid=comptid+1;
    return "carte_"+Math.random()*100+comptid;
}

export function formatDate(){
    return Date.now();
}

export function melanger(tableau){
    for(let i=0 ;i<tableau.length;i++){
        let indice=Math.floor(Math.random()*(i+1));
        let carteTemporaire=tableau[i];
        tableau[i]=tableau[indice];
        tableau[indice]=carteTemporaire;
    }
    return tableau ;
}