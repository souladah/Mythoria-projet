const collection=JSON.parse(
    localStorage.getItem("mythoriaCollection")
)|| [];

const quantites={};
const cartesUniques=[];

for (let i=0;i<collection.length ;i++){
    const carte=collection[i];

    if(quantites[carte.nom]){ // verifier si objet qunatite vide ou nom
        quantites[carte.nom]++; // si pas vide donc la quantite sera adition de quantite exist et quantite nouveau puisque jai empecher de obtenir meme carte dans chauqe ouverture donc il va augmenter juste par 1

    }else{
        quantites[carte.nom]=1;
        cartesUniques.push(carte);
        
    }
     
}

const collectionCartes=document.getElementById("collection-cartes");

const fitreType=document.getElementById("filtre-type");
const filtreRarete=document.getElementById("filtre-rarete");

function afficherCartes(){
    collectionCartes.innerHTML="";


    const typeChoisie=fitreType.value;
    const rareteChoisie=filtreRarete.value;

    for(let i=0;i<cartesUniques.length;i++){
        const carte=cartesUniques[i];
        if((typeChoisie==="all" || carte.type===typeChoisie) &&
        (rareteChoisie ==="all" || carte.rarete=== rareteChoisie)){
              const div=document.createElement("div");
        div.classList.add(
        "rounded-lg", 
        "border-2",                                       
        "bg-slate-900",
        "p-3",
        "text-center",
        "text-white"
        );
                const img=document.createElement("img");
                if(carte.image.startsWith("./assets/images/cards/")){
                    img.src=carte.image;
                }else{
                    img.src="./assets/images/cards/"+ carte.image;
                }
                img.alt=carte.nom;
                img.classList.add("mx-auto","w-32","rounded-lg");

                const nom=document.createElement("p");
                nom.textContent=carte.nom +"*"+quantites[carte.nom];
                nom.classList.add("mt-2","font-bold","text-amber-200");

                div.appendChild(img);
                div.appendChild(nom);
                collectionCartes.appendChild(div);
    }
        }
}
filtreRarete.addEventListener("change",afficherCartes);
fitreType.addEventListener("change",afficherCartes);
afficherCartes();