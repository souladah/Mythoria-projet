const MAX_DECK=16;

const cartesUniques=JSON.parse(localStorage.getItem("mythoria-uniqu"))||[];

const Section=document.getElementById("section");
Section.classList.add("mx-auto","max-w-5xl","px-10","text-white");


let deck=JSON.parse(localStorage.getItem("mythoriaDeck")||"[]");
function afficher(){
    Section.innerHTML='<h2 class="mb-6 text-center  text-2xl font-bold text-amber-200">MON DECK ('+deck.length +'/'+MAX_DECK+')</h2>';
    
    const zoneAjout=document.createElement("div");
    zoneAjout.classList.add("mb-8","flex","flex-wrap","justify-center","gap-3")
    cartesUniques.forEach(carte => {
        const dansDeck=deck.includes(carte.nom);
        const div=document.createElement("div");
        div.classList.add("rounded-lg","border","border-amber-300/20","bg-slate-900","p-3","text-center","w-36");
        const img=document.createElement("img");
        img.src="./assets/images/cards/"+carte.image;
        img.alt=carte.nom;
        img.classList.add("mx-auto","w-24","rounded-lg");
        const nomCarte=document.createElement("p");
        nomCarte.textContent=carte.nom;
        nomCarte.classList.add("mt-2","text-sm","font-bold","text-amber-200");
        const infos=document.createElement("p");
        infos.textContent=carte.type+" | "+carte.rarete+" | ⚔ "+carte.attaque+" 🛡 "+carte.defense;
        infos.classList.add("mt-1","text-xs","text-slate-300");
        const button=document.createElement("button");
        button.textContent=dansDeck ? "Dans le deck" : "Ajouter";
        button.disabled=dansDeck;   
        button.classList.add(
            "rounded-lg","border","border-amber-400","bg-slate-950/90",
            "mt-2","px-3","py-1","text-sm","text-amber-100"        );
        button.onclick=()=>{
            if(dansDeck){
                alert("carte deja ajouter");
            }else{
                deck.push(carte.nom);
                sauvegarder();
                afficher();
            }
        };
        div.appendChild(img);
        div.appendChild(nomCarte);
        div.appendChild(infos);
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
        imgDeck.src="./assets/images/cards/"+carteDeck.image;
        imgDeck.alt=nom;
        imgDeck.classList.add("w-12","rounded");

        const infosDeck=document.createElement("p");
        infosDeck.textContent=carteDeck.type+" | "+carteDeck.rarete+" | ⚔ "+carteDeck.attaque+" 🛡 "+carteDeck.defense;        infosDeck.classList.add("mt-1","text-xs","text-slate-300");

        const textes=document.createElement("div");
        textes.appendChild(texte);
        textes.appendChild(infosDeck);

        const gauche=document.createElement("div");
        gauche.classList.add("flex","items-center","gap-3");
        gauche.appendChild(imgDeck);
        gauche.appendChild(textes);

        li.appendChild(gauche);

        li.appendChild(boutton);
        List.appendChild(li);


    });
    Section.appendChild(List)
    
    
}

function sauvegarder(){
    localStorage.setItem("mythoriaDeck",JSON.stringify(deck));

} 
afficher();


    
    
    

    
