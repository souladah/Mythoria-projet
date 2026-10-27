const collection=JSON.parse(
    localStorage.getItem("mythoriaCollection")
)|| [];

const quantites={};
const cartesUniques=[];

for (let i=0;i<collection.length ;i++){
    const carte=collection[i];

    if(quantites[cartes.nom]){
        quantites[carte.nom]++;

    }else{
        quantites[carte.nom]=1;
        cartesUniques.push(carte);
        
    }
}