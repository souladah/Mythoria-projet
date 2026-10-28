
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
    Section.innerHTML='<h2 class="mb-8" ,"flex","flex-wrap","justify-center","gap-3">MON DECK ("+deck.length +"/20)</h2>';
    cartesUniques.forEach(carte => {
        const button=document.createElement("button");
        button.textContent="ajouter "+carte.nom;
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
        Section.appendChild(button);
        
    });
    const List=document.createElement("ul");

    deck.forEach(nom=>{
        const li=document.createElement("li");
        li.textContent=nom+"";

        const boutton=document.createElement("button");
        boutton.textContent="retirer";
        boutton.onclick=()=>{
            deck=deck.filter(carte=>carte!==nom);
            sauvegarder();
            afficher();
        }
        li.appendChild(boutton);
        List.appendChild(li);

    });
    Section.appendChild(List)
    
    const stats=document.createElement("p");
    stats.textContent="nombre de cartes :" +deck.length +"/15";
    Section.appendChild(stats);
}

function sauvegarder(){
    localStorage.setItem("mythoriaDeck",JSON.stringify(deck));

} 
afficher();


    
    
    

    
