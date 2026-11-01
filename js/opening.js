const boosterList = document.getElementById("booster-list");
const selectedNmae=document.getElementById("selected-booster-name");
const LaSection=document.getElementById("section");
const boosterVisual=document.getElementById("booster-visual");
const openBtn=document.getElementById("open-booster-btn");
const statusText=document.getElementById("opening-status");

// donnees
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
let choisi=null ;

const imgBooster=document.createElement("img");
imgBooster.hidden=true;
imgBooster.className="h-40 object-contain rounded-lg";
boosterVisual.prepend(imgBooster);



function afficherListe(){
    boosterList.innerHTML="";
    if(boosters.length===0){
        boosterList.textContent="tu n'as aucun booster" ;
        boosterList.classList.add("text-amber-500")
        return ;
    }
    const quantites={};
    for (let i=0 ; i<boosters.length ;i++) {
        const type=boosters[i].type;
        if(quantites[type]){
            quantites[type]+=1;
        }else{
            quantites[type]=1;
           
        }
    
    }
    for(const type in quantites){
        const div=document.createElement("div");
        div.textContent=type+" × "+quantites[type];
        div.className="cursor-pointer rounded-lg border border-amber-300/30 bg-slate-900 px-4 py-3 text-center text-amber-200";
        if(type===choisi) div.classList.add("ring-4","ring-purple-500");
        div.addEventListener("click",function(){
            choisirBooster(type)  
    });
        boosterList.appendChild(div);
    }
}
function choisirBooster(type){
    choisi=type;
    if(type==null){
        selectedNmae.textContent= "Aucun booster sélectionné" ;
        imgBooster.hidden=true;
    }
    else{
        selectedNmae.textContent=type;
        imgBooster.src="./assets/images/boosters/"+boostersConfig[type].image;
        imgBooster.alt=type;
        imgBooster.hidden=false;
    }
    afficherListe();
    
}

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

function tirerCarte(config,dejaTirees){
    let pool=[];
    while(pool.length===0){
        const rarete=tirerRarete(config.probas);
        pool=cartes.filter(c=>c.rarete===rarete && config.familles.includes(c.type) && !dejaTirees.includes(c));    
}
    return pool[Math.floor(Math.random()*pool.length)];
}
 
openBtn.addEventListener("click",()=>{
    if(choisi==null){
        statusText.textContent="slectionne d abord un booster";
             return ;
    }
    const index=boosters.findIndex(b=>b.type===choisi);
    boosters.splice(index,1);
    localStorage.setItem("mythoriaBoosters",JSON.stringify(boosters));
   
   const config=boostersConfig[choisi];
   const tirage=[];
   for(let i=0 ;i<NB_CARTES;i++){
    tirage.push(tirerCarte(config,tirage));
   }
   const collection=JSON.parse(localStorage.getItem("mythoriaCollection"))||[];
   localStorage.setItem("mythoriaCollection",JSON.stringify(collection.concat(tirage)));
   let html='<ul class="flex flex-wrap justify-center">';
       let message="Booster ouvert : que des cartes communes cette fois.";
       for(let i=0;i<tirage.length;i++){
           const c=tirage[i];
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
       statusText.textContent=message;

   const restant = boosters.filter(b=>b.type===choisi).length ;
   if (restant===0){
     choisirBooster(null)

   }else{
      afficherListe();  
   }
});
    

   
afficherListe();
