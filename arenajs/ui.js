import { etat } from "./state.js";
import { COULEUR_RARETE } from "./cards.js";

const playerHpEl=document.getElementById("player-hp");
const opponentHpEl=document.getElementById("opponent-hp");
const logList=document.getElementById("log-list");
const deckCountEl=document.getElementById("deck-count");
const handCountEl=document.getElementById("hand-count");
const playerHandEl=document.getElementById("player-hand");
const opponentHandCountEl=document.getElementById("opponent-hand-count");
const opponentHandEl=document.getElementById("opponent-hand");
const playerBattleFieldEl=document.getElementById("player-battlefield");
const opponentBattlefieldEl=document.getElementById("opponent-battlefield");
function creerCarteEl(carte){
    const div = document.createElement("div");
    div.className = "rounded-lg border-2 bg-slate-900 p-1 text-center text-white " +
      (COULEUR_RARETE[carte.rarete] || "border-slate-400");
    const img=document.createElement("img");
    img.src="./assets/images/cards/"+carte.image;
    img.alt=carte.nom;
    img.className="mx-auto w-full rounded";

    const nom=document.createElement("p");
    nom.textContent=carte.nom;
    nom.className="mt-1 truncate text-[11px] font-bold text-amber-200";

    const stats=document.createElement("p");
    stats.textContent=carte.type+". ⚔ "+ carte.attaque +" 🛡 "+ carte.defense;
    stats.className="text-[10px] text-slate-300";
    div.append(img , nom , stats);
    return div ;
}


export function ajouterLog(message){
    etat.log.push(message);
    const li=document.createElement("li");
    li.textContent=message;
    logList.prepend(li);
}

export function render(){
  playerHpEl.textContent="❤ "+etat.joueur.hp+" HP";
  opponentHpEl.textContent="❤ "+etat.Adversaire.hp+" HP";

  deckCountEl.textContent=etat.joueur.deck.length ;
  handCountEl.textContent=etat.joueur.main.length ;
  opponentHandCountEl.textContent=etat.Adversaire.main.length;

  playerHandEl.innerHTML="";
  etat.joueur.main.forEach((carte)=>{
    const el=creerCarteEl(carte);
    el.classList.add("w-28");
    playerHandEl.appendChild(el);
    el.draggable=true;
    el.addEventListener("dragstart",(event)=>{
      event.dataTransfer.setData("text/plain",String(carte.id));
      event.dataTransfer.effectAllowed="move";
    })
  });

  opponentHandEl.innerHTML="";
  etat.Adversaire.main.forEach((carte, index)=>{
    const dosCarte=document.createElement("div");
    dosCarte.className="flex h-24 w-16 items-center justify-center rounded-lg border-2 border-violet-300 bg-slate-900 text-xl text-violet-200";
    dosCarte.textContent="✦";
    dosCarte.setAttribute("aria-label", `Carte adverse face cachée ${index + 1}`);
    opponentHandEl.appendChild(dosCarte);
  });

  opponentBattlefieldEl.querySelectorAll("[data-slot-index]").forEach((slot)=>{
    slot.replaceChildren();
    const carte=etat.Adversaire.champ[Number(slot.dataset.slotIndex)];
    if(!carte) return ;

    const elemntCarte=creerCarteEl(carte);
    elemntCarte.classList.add("w-full");
    slot.appendChild(elemntCarte);
  });
  
  playerBattleFieldEl.querySelectorAll("[data-slot-index]").forEach((slot) => {
  slot.replaceChildren();

  const carte = etat.joueur.champ[Number(slot.dataset.slotIndex)];
  if (!carte) return;

  const elementCarte = creerCarteEl(carte);
  elementCarte.classList.add("w-full");
  slot.appendChild(elementCarte);
});
  
}

playerBattleFieldEl.addEventListener("dragover",(event)=>{
  if(event.target.closest("[data-slot-index]")){
    event.preventDefault();
  }
});

playerBattleFieldEl.addEventListener("drop",(event)=>{
  event.preventDefault();
  const slot=event.target.closest("[data-slot-index]");
  if(!slot) return ;
  const indexCase=Number(slot.dataset.slotIndex);
  if(etat.joueur.champ[indexCase]) return ;
  const idCarte=event.dataTransfer.getData("text/plain");
  const indexMain=etat.joueur.main.findIndex((carte)=>String(carte.id)===idCarte);
  if(indexMain===-1) return ;
  etat.joueur.champ[indexCase]=etat.joueur.main.splice(indexMain,1)[0];
  render();
});
