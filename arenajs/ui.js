import { etat } from "./state.js";
import { COULEUR_RARETE } from "./cards.js";

const playerHpEl=document.getElementById("player-hp");
const opponentHpEl=document.getElementById("opponent-hp");
const logList=document.getElementById("log-list");
const deckCountEl=document.getElementById("deck-count");
const handCountEl=document.getElementById("hand-count");
const playerHandEl=document.getElementById("player-hand");

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
  playerHandEl.innerHTML="";
  etat.joueur.main.forEach((carte)=>{
    const el=creerCarteEl(carte);
    el.classList.add("w-28");
    playerHandEl.appendChild(el);
  });
}
