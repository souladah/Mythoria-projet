export function melanger(tableau ){
    const t=[...tableau] ;
    for(let i=t.length-1; i>0 ;i--){
        const j = Math.floor(Math.random() * (i + 1));
        [t[i], t[j]] = [t[j], t[i]];
    }
    return t;
}

export function generateId(){
    return Date.now().toString(36)+Math.random().toString(36).slice(2,8);
}

export function formatDate(date=new Date()){
    return date.toLocaleString("fr-FR");
}

export function creerInstance(modele){
    return {...modele,id:generateId()};
}