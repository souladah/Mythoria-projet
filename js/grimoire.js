const collection=JSON.parse(
    localStorage.getItem("mythoriaCollection")
)|| [];
const collectionCartes=document.getElementById("collection-cartes");
const filtreType=document.getElementById("filtre-type");
const filtreRarete=document.getElementById("filtre-rarete");
const grimoireVide=document.getElementById("grimoire-vide")
const cartesUniques=[];// va contenir nom des cart pas de diplication

for (let i=0;i<collection.length ;i++){
    
       let dejaVue=false;
       for(let j=0;j<cartesUniques.length;j++){
                if(cartesUniques[j].nom===collection[i].nom){
                    dejaVue=true;
            }     
       }
       if(!dejaVue){
                cartesUniques.push(collection[i]);

                }
}
localStorage.setItem("mythoria-uniqu",JSON.stringify(cartesUniques));
function afficherCartes(){
    collectionCartes.innerHTML="";
    
    if(collection.length===0){
        grimoireVide.classList.remove("hidden");
        return ;
    }
   grimoireVide.classList.add("hidden");


    const typeChoisie=filtreType.value;
    const rareteChoisie=filtreRarete.value;

    for(let i=0;i<cartesUniques.length;i++){
        const carte=cartesUniques[i];
        if((typeChoisie==="all" || carte.type===typeChoisie) &&
        (rareteChoisie ==="all" || carte.rarete=== rareteChoisie)){// 25 cas couvert ; all et all=1 , c1 et c2 4*4=16 , c1 et all=4*1=4 , c2 et all 4*1=4 donc total=25 
                const div=document.createElement("div");
                div.classList.add(
                "rounded-lg", 
                "border-2",  
                "border-amber-300/30",                                  
                "bg-slate-900",
                "p-3",
                "text-center",
                "text-white"
                );
                const img=document.createElement("img");
                img.src="./assets/images/cards/"+carte.image;
                img.alt=carte.nom;
                img.classList.add("mx-auto","w-32","rounded-lg");

                const nom=document.createElement("p");
                nom.textContent=carte.nom ;
                nom.classList.add("mt-2","font-bold","text-amber-200");
                div.appendChild(img);
                div.appendChild(nom);
                collectionCartes.appendChild(div);        
    }
        }
}
filtreRarete.addEventListener("change",afficherCartes);
filtreType.addEventListener("change",afficherCartes);
afficherCartes();