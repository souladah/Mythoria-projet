let boosters = JSON.parse(
    localStorage.getItem("mythoriaBoosters")
) || [];

const boosterList = document.getElementById("booster-list");
const ul = document.createElement("ul");

boosterList.innerHTML = "";

const selectedNmae=document.getElementById("selected-booster-name");
const LaSection=document.getElementById("section");

const toutLesLI=boosterList.querySelectorAll("li");

const cartes = [
    { nom: "Apprenti", image: "apprenti.png", rarete: "Commune", type: "Serviteur", attaque: 2, defense: 2 },
    { nom: "Aria", image: "aria.png", rarete: "Commune", type: "Héros", attaque: 3, defense: 1 },
    { nom: "Loup spectral", image: "loup-spectral.png", rarete: "Rare", type: "Monstre", attaque: 5, defense: 3 },
    { nom: "Mage de cristal", image: "mage-cristal.png", rarete: "Rare", type: "Héros", attaque: 6, defense: 2 },
    { nom: "Chevalier de l'aube", image: "chevalier-aube.png", rarete: "Épique", type: "Héros", attaque: 7, defense: 6 },
    { nom: "Dragon des abysses", image: "dragon-abysses.png", rarete: "Légendaire", type: "Monstre", attaque: 10, defense: 8 },
    { nom: "Phoenix", image: "phoenix.png", rarete: "Épique", type: "Monstre", attaque: 8, defense: 4 },
    { nom: "Roi des ombres", image: "roi-ombres.png", rarete: "Légendaire", type: "Monstre", attaque: 9, defense: 9 },
    { nom: "Ange de l'éternité", image: "ange-eternite.png", rarete: "Légendaire", type: "Héros", attaque: 8, defense: 10 },
    { nom: "Flamme du jugement", image: "flamme-jugement.png", rarete: "Épique", type: "Sort", attaque: 9, defense: 0 },
    { nom: "Invocation suprême", image: "invocation-supreme.png", rarete: "Légendaire", type: "Sort", attaque: 10, defense: 5 },
    { nom: "Aurelion", image: "legendaire-aurelion.webp", rarete: "Légendaire", type: "Héros", attaque: 10, defense: 7 },
    { nom: "Éclipse", image: "legendaire-eclipse.webp", rarete: "Légendaire", type: "Sort", attaque: 9, defense: 8 },
    { nom: "Nocthar", image: "legendaire-nocthar.webp", rarete: "Légendaire", type: "Monstre", attaque: 10, defense: 6 },
    { nom: "Ombre vorace", image: "ombre-vorace.png", rarete: "Rare", type: "Serviteur", attaque: 5, defense: 4 },
    { nom: "Portail", image: "portail.png", rarete: "Épique", type: "Sort", attaque: 0, defense: 8 }
];
const openBtn=document.getElementById("open-booster-btn");

const Lasection=document.getElementById("section");
if (boosters.length === 0) { 
    boosterList.textContent = "Tu n'as aucun booster.";
} else {
    const compte={};

    for (let i = 0; i < boosters.length; i++) {

        const type=boosters[i].type;
        compte[type]=compte[type]?compte[type] +1 :1;
    }
    const ul=document.createElement("ul");

    for(const type in compte){
        const li = document.createElement("li");
            
        li.dataset.type=type;
        li.dataset.quantite=compte[type];
        li.textContent=type+"*"+compte[type]
            
            li.classList.add(
                "rounded-lg",
                "text-center",
                "bg-white",
                "text-amber-500",
                "m-5"
            );
            li.addEventListener("click",()=>{
                LiSelectionne=li; 
                boosterSelectionne=type;                 
                selectedNmae.textContent=type;
                const toustesLI=ul.querySelectorAll("li");
                for(let j=0;j<toustesLI.length;j++){
                    toustesLI[j].classList.remove("ring-4","ring-purple-500");
                }
                li.classList.add("ring-4","ring-purple-500");
            })
            ul.appendChild(li);
}
boosterList.appendChild(ul);
}

const typesBoosters={
    "Beginner Pack":{
        nbCartes:5,
        familles:["Héros","Monstre","Serviteur","Sort"],
        probas:{"Commune":70,"Rare":22,"Épique":7,"Légendaire":1}
    },
    "Summoning of the Legends":{
        nbCartes:5,
        familles:["Héros","Monstre","Serviteur","Sort"],
        probas:{"Commune":30,"Rare":30,"Épique":25,"Légendaire":15}
    },
    "Dark Summoning":{
        nbCartes:5,
        familles:["Monstre","Serviteur","Sort"],
        probas:{"Commune":40,"Rare":30,"Épique":20,"Légendaire":10}
    },
    "Lucky Pack":{
        nbCartes:5,
        familles:["Héros","Monstre","Serviteur","Sort"],
        probas:{"Commune":40,"Rare":25,"Épique":20,"Légendaire":15}
    }
};

const configParDefaut={
    nbCartes:5,
    familles:["Héros","Monstre","Serviteur","Sort"],
    probas:{"Commune":60,"Rare":25,"Épique":10,"Légendaire":5}
};
function tirerRarete(probas){
    let total=0;
    for(const r in probas){
        total=total+probas[r];
    }
    let tirage=Math.random()* total ;
    for(const r in probas){
        if(tirage<probas[r]){
            return r ;
        }
        tirage=tirage-probas[r];
    }
    return "Commune";
}

function tirerCarte(config){
    const rarete=tirerRarete(config.probas);
    let pool=cartes.filter(c=>c.rarete===rarete && config.familles.includes(c.type));
    if(pool.length===0){
        pool=cartes.filter(c=>c.rarete===rarete);
    }
    return pool[Math.floor(Math.random()*pool.length)];
}
 
const statusText=document.getElementById("opening-status");
let boosterSelectionne=null;
let LiSelectionne=null;
openBtn.addEventListener("click",()=>{
    if(!boosterSelectionne){
        statusText.textContent="slectionne d abord un booster";
             return ;
    }
    const config=typesBoosters[boosterSelectionne]|| configParDefaut ;
   const collection=JSON.parse(localStorage.getItem("mythoriaCollection")) || [];
   let message="";
   const index=boosters.findIndex(b=>b.type===boosterSelectionne);
   if(index!==-1){
     boosters.splice(index,1);
   }
   localStorage.setItem("mythoriaBoosters",JSON.stringify(boosters));
   const restant = boosters.filter(b=>b.type===boosterSelectionne).length ;
   if (restant===0){
    LiSelectionne.remove();
    boosterSelectionne=null ;
    selectedNmae.textContent="aucun booster selectionne";

   }else{
    LiSelectionne.textContent=boosterSelectionne+"*"+restant;
   }
    

   const UnDiv=document.createElement("div");
   const uneUl=document.createElement("ul");
   uneUl.classList.add("flex","flex-wrap","justify-center");

   for(let i=0; i<config.nbCartes;i++){
    const Uneli=document.createElement("li");
    const carte=tirerCarte(config);

    collection.push(carte);
    const img=document.createElement("img");
    img.src="./assets/images/cards/"+carte.image ;
    img.alt=carte.nom ;
    img.classList.add("w-32","rounded-lg","mx-auto");

    const texte=document.createElement("p");
    texte.textContent=carte.nom +"("+carte.rarete+")";
    texte.classList.add("font-bold","text-amber-200");

    const infos=document.createElement("p");
    infos.textContent="type:"+carte.type+"| ⚔"+carte.attaque+"  🛡"+carte.defense ;
    Uneli.appendChild(img);
    Uneli.appendChild(texte);
    Uneli.appendChild(infos)
    uneUl.appendChild(Uneli)
    Uneli.classList.add("text-center" ,"text-white","m-4");

    if(carte.rarete==="Légendaire"){
        message="Carte Légendaire decouverte :"+carte.nom +"!";

}else if(carte.rarete==="Épique" && !message.includes("Légendaire")){        message="carte Épique decouverte :"+ carte.nom +"!";

    }else if (carte.rarete==="Rare" && message===""){
        message="Carte rare decouverte :"+carte.nom + "!";
    }
   }
    
   localStorage.setItem("mythoriaCollection",JSON.stringify(collection));
   UnDiv.appendChild(uneUl);
   LaSection.innerHTML="";
   LaSection.appendChild(UnDiv);

   statusText.textContent=message || "booster ouvert : que des cartes communes cetee fois";

});