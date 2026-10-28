const MAX_DECK=16;
const collection=JSON.parse(localStorage.getItem("mythoriaCollection")|| "[]");

const cartesUniques=[];

function cheminImage(carte){
    return carte.image.startsWith("./assets/images/cards/")? carte.image :"./assets/images/cards/"+carte.image ;

}
collection.forEach(carte=>{
    if(!cartesUniques.some(c=>c.nom===carte.nom)){
        cartesUniques.push(carte);
    }
});

const Section=document.getElementById("section");
Section.classList.add("mx-auto","max-w-5xl","px-10","text-white");


let deck=JSON.parse(localStorage.getItem("mythoriaDeck")||"[]")
 .filter(nom=>cartesUniques.some(c=>c.nom===nom)).slice(0,MAX_DECK);
function afficher(){
    Section.innerHTML='<h2 class="mb-6 text-center  text-2xl font-bold text-amber-200">MON DECK ('+deck.length +'/'+MAX_DECK+')</h2>';
    
    const zoneAjout=document.createElement("div");
    zoneAjout.classList.add("mb-8","flex","flex-wrap","justify-center","gap-3")
    cartesUniques.forEach(carte => {
        const dansDeck=deck.includes(carte.nom);
        const div=document.createElement("div");
        div.classList.add("rounded-lg","border","border-amber-300/20","bg-slate-900","p-3","text-center","w-36");
        const img=document.createElement("img");
        img.src=cheminImage(carte);
        img.alt=carte.nom;
        img.classList.add("mx-auto","w-24","rounded-lg");
        const nomCarte=document.createElement("p");
        nomCarte.textContent=carte.nom;
        nomCarte.classList.add("mt-2","text-sm","font-bold","text-amber-200");
        const button=document.createElement("button");
        button.textContent=dansDeck ? "Dans le deck" : "Ajouter";
        button.disabled=dansDeck;   
        button.classList.add(
            "rounded-lg","border","border-amber-400","bg-slate-950/90",
            "mt-2","px-3","py-1","text-sm","text-amber-100"        );
        button.onclick=()=>{
            if(deck.includes(carte.nom)){
                alert("carte deja ajouter");
            }else if(deck.length>=MAX_DECK){
                alert("deck complet !");
            }else{
                deck.push(carte.nom);
                sauvegarder();
                afficher();
            }
        };
        div.appendChild(img);
        div.appendChild(nomCarte);
        div.appendChild(button);
        zoneAjout.appendChild(div);        
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
        const carteDeck=cartesUniques.find(c=>c.nom===nom);
        const imgDeck=document.createElement("img");
        imgDeck.src=cheminImage(carteDeck);
        imgDeck.alt=nom;
        imgDeck.classList.add("w-12","rounded");

        const gauche=document.createElement("div");
        gauche.classList.add("flex","items-center","gap-3");
        gauche.appendChild(imgDeck);
        gauche.appendChild(texte);

        li.appendChild(gauche);
        li.appendChild(boutton);
        List.appendChild(li);


    });
    Section.appendChild(List)
    
    let totalAtt=0 , totalDef=0;
    const parType={};
    const parRarete={};
    deck.forEach(nom=>{
        const c=cartesUniques.find(carte=>carte.nom===nom);
        totalAtt+=c.attaque;
        totalDef+=c.defense;
        parType[c.type]=(parType[c.type]||0)+1;
        parRarete[c.rarete]=(parRarete[c.rarete]||0)+1;
    });
    const stats=document.createElement("div");
    stats.classList.add("mt-6","text-center","text-slate-300");

    const lignes=[
        "Nombre de cartes :"+deck.length+"/"+MAX_DECK ,
        "attaque totale : " + totalAtt+"| Défense  totale :"+totalDef,
        "Par type :"+Object.entries(parType).map(([k,v])=>k+"x"+v).join(", "),
        "Par rarete :"+Object.entries(parRarete).map(([k,v])=>k+"x"+v).join(", "),
    ];
    lignes.forEach(t=>{
        const p=document.createElement("p");
        p.textContent=t;
        stats.appendChild(p);

    });
    Section.appendChild(stats);
}

function sauvegarder(){
    localStorage.setItem("mythoriaDeck",JSON.stringify(deck));

} 
afficher();


    
    
    

    
