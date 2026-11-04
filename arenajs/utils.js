export function melanger(tableau ){
    const t=[...tableau] ;
    for(let i=t.length-1; i>0 ;i--){
        const j = Math.floor(Math.random() * (i + 1));
        [t[i], t[j]] = [t[j], t[i]];
    }
    return t;
}