const boosterList = document.getElementById("booster-list");
const selectedNmae=document.getElementById("selected-booster-name");
const LaSection=document.getElementById("section");// section ou les cartes vont safficher
const boosterVisual=document.getElementById("booster-visual");// tout le div ou se trouver le selected booster
const openBtn=document.getElementById("open-booster-btn");
const statusText=document.getElementById("opening-status");// message dans le bas

// donnees chauque carte a nom, imgae , rarete , type , attaque , defense
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
const ToutesFamilles=["Héros", "Monstre", "Serviteur", "Sort"];
const NB_CARTES = 5;


const boostersConfig={
    "Beginner Pack" :{
        image:"pack-debutant.png" ,
        familles:ToutesFamilles,
        probas:{"Commune":70,"Rare":22,"Épique":7,"Légendaire":1}
    },
    "Summoning of the Legends" :{
        image:"pack-legendes.png" ,
        familles:ToutesFamilles,
        probas:{"Commune":30,"Rare":30,"Épique":25,"Légendaire":15}
    },
    "Dark Summoning" :{
        image:"booster-obscur.png" ,
        familles:["Monstre", "Serviteur", "Sort"],
        probas:{"Commune":40,"Rare":30,"Épique":20,"Légendaire":10}
    },
    "Lucky Pack" :{
        image:"booster-chance.png" ,
        familles:ToutesFamilles,
        probas:{"Commune":40,"Rare":25,"Épique":20,"Légendaire":15}
    }
}


// RECUPERE LES boosters acheter depuis local storage
let boosters = JSON.parse(localStorage.getItem("mythoriaBoosters")) || [];
let BoosterSelectione=null ;

function afficherListe(){
    boosterList.innerHTML="";
    boosterVisual.innerHTML="";

    if(boosters.length===0){
        boosterList.textContent="tu n'as aucun booster" ;
        boosterList.classList.add("text-amber-500")
        return ;
    }
    for (let i=0 ; i<boosters.length ;i++) {
        const b=boosters[i];

            const div=document.createElement("div");
            div.textContent=b.nom+" × "+b.quantite;
            div.className="cursor-pointer rounded-lg border border-amber-300/30 bg-slate-900 px-4 py-3 text-center text-amber-200";
            div.addEventListener("click",function(){
                BoosterSelectione=b.nom;
                afficherListe();
            });  
            if(BoosterSelectione===b.nom) div.classList.add("ring-4","ring-purple-500");
        boosterList.appendChild(div);
    }
    if(BoosterSelectione==null){
            selectedNmae.textContent= "Aucun booster sélectionné" ;
        }
        else{
            selectedNmae.textContent=BoosterSelectione;
            const imgBooster=document.createElement("img");
            imgBooster.className="h-40 object-contain rounded-lg";
            imgBooster.src="./assets/images/boosters/"+boostersConfig[BoosterSelectione].image;
            imgBooster.alt=BoosterSelectione;
            boosterVisual.prepend(imgBooster);

        }
    
}
//pour le tirage je doit parcourir probas puis calculer total puis genere un nombre de 0 a total puis comprer si se nombre<probas[r] si ca donc rerte=r sinon soutration de nombre avec probas de r 
function tirerRarete(probas){
    let total=0;
    for(const r in probas){
        total=total+probas[r];
    }
    let generatedNomber=Math.random()* total ;
    for(const r in probas){
        if(generatedNomber<probas[r]){
            return r ;
        }
        generatedNomber=generatedNomber-probas[r];
    }
    return "Commune"; // si aucun r donc commune
}

function tirerCarte(config,dejaTirees){// config objt contient img famiille probas , dejatire table conyient les carte deja tiree 
    const CarteDisponibles = [];
        for (let i = 0; i < cartes.length; i++) {
            const carte = cartes[i];
    
            const typeAutorise = config.familles.includes(carte.type);
            const dejaPrise = dejaTirees.includes(carte);
    
            if (typeAutorise && !dejaPrise) {
                CarteDisponibles.push(carte);
            }
        }
        // apres avoir definir les carte dsipo maintennat je doit trouver les cartes where sa rarete== la rarete je peux utiliser filter ici 
        const rarete = tirerRarete(config.probas);
        const pool = CarteDisponibles.filter(c=>c.rarete===rarete);
        if (pool.length > 0) {
            const position = Math.floor(Math.random() * pool.length);
            return pool[position];
        }else{                
            const position = Math.floor(Math.random() * CarteDisponibles.length);
            return CarteDisponibles[position];        
        }     
}
 
openBtn.addEventListener("click",()=>{
    if(BoosterSelectione==null){
        statusText.textContent="slectionne d abord un booster";
             return ;
    }
    let booster=boosters.find(b=>b.nom===BoosterSelectione);
    if(!booster){ BoosterSelectione=null;  afficherListe(); return ;}
    booster.quantite--;
    const restant=booster.quantite;
    if(restant<=0){// supprimer un booster si sa quantite=0
        boosters=boosters.filter(b=>
            b.nom!==BoosterSelectione
        );
    }
    localStorage.setItem("mythoriaBoosters",JSON.stringify(boosters));// sauvegarde
   
   const config=boostersConfig[BoosterSelectione];
   const CarteTirre=[];
   for(let i=0 ;i<NB_CARTES;i++){
       CarteTirre.push(tirerCarte(config,CarteTirre));
   }
   const collection=JSON.parse(localStorage.getItem("mythoriaCollection"))||[];
   localStorage.setItem("mythoriaCollection",JSON.stringify(collection.concat(CarteTirre)));

   let html='<ul class="flex flex-wrap justify-center">';
       let message="Booster ouvert : que des cartes communes cette fois.";
       for(let i=0;i<CarteTirre.length;i++){
           const c=CarteTirre[i];
           html+='<li class="m-4 text-center text-white">';
           html+='<img src="./assets/images/cards/'+c.image+'" alt="'+c.nom+'" class="mx-auto w-32 rounded-lg">';
           html+='<p class="font-bold text-amber-200">'+c.nom+' ('+c.rarete+')</p>';
           html+='<p>Type : '+c.type+' | ⚔ '+c.attaque+' 🛡 '+c.defense+'</p>';
           html+='</li>';
           if(c.rarete==="Légendaire"){
               message="Carte légendaire découverte : "+c.nom+" !";
           }else if(c.rarete==="Épique" && !message.includes("légendaire")){
               message="Carte épique découverte : "+c.nom+" !";
           }else if(c.rarete==="Rare" && message.includes("communes")){
               message="Carte rare découverte : "+c.nom+" !";
           }
       }
       LaSection.innerHTML=html+"</ul>";

   if (restant<=0){
     BoosterSelectione=null;

   }
      afficherListe();  

   statusText.textContent=message ;
});
afficherListe();
