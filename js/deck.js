
const collection=JSON.parse(localStorage.getItem("mythoriaCollection")|| "[]");

const cartesUniques=[];
collection.forEach(carte=>{
    if(!cartesUniques.some(c=>c.nom===carte.nom)){
        cartesUniques.push(carte);
    }
});

const Section=document.getElementById("section");
Section.classList.add("mx-auto","max-w-5xl","px-10","text-white");


let deck=JSON.parse(localStorage.getItem("mythoriaDeck")||"[]");
function afficher(){
    Section.innerHTML='<h2 class="mb-6 text-center flex-2xl font-bold text-amber-200">MON DECK ('+deck.length +'/20)</h2>';
    
    const zoneAjout=document.createElement("div");
    zoneAjout.classList.add("mb-8","flex","flex-wrap","justify-center","gap-3")
    cartesUniques.forEach(carte => {
        const button=document.createElement("button");
        button.textContent="ajouter "+carte.nom;
        button.classList.add(
            "rounded-lg","border-amber-400","bg-slate-950/90",
            "px-4","py-2","text-sm","text-amber-100"
        );
        button.onclick=()=>{
            if(deck.includes(carte.nom)){
                alert("carte deja ajouter");
            }else if(deck.length>=20){
                alert("deck complet !");
            }else{
                deck.push(carte.nom);
                sauvegarder();
                afficher();
            }
        };
        zoneAjout.appendChild(button);
        
    });
    Section.appendChild(zoneAjout);

    const List=document.createElement("ul");

    deck.forEach(nom=>{
        const li=document.createElement("li");
        li.classList.add("flex","items-center","justify-between", "rounded-lg","bg-slate-900","px-4","py-2","mb-2");
        const texte=document.createElement("span");
        texte.textContent=nom ;
        texte.classList.add(
            "font-bold","text-amber-200"
        );

        const boutton=document.createElement("button");
        boutton.textContent="retirer";
        boutton.classList.add("rounded-lg","border","border-red-500/40",
            "px-3","py-1","text-red-300"
        );

        boutton.onclick=()=>{
            deck=deck.filter(carte=>carte!==nom);
            sauvegarder();
            afficher();
        }
        li.appendChild(texte);
        li.appendChild(boutton);
        List.appendChild(li);

    });
    Section.appendChild(List)
    
    const stats=document.createElement("p");
    stats.textContent="nombre de cartes :" +deck.length +"/15";
    stats.classList.add("mt-4","text-center","text-slate-300");
    Section.appendChild(stats);
}

function sauvegarder(){
    localStorage.setItem("mythoriaDeck",JSON.stringify(deck));

} 
afficher();


    
    
    

    
