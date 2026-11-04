import { etat } from "./state.js";

const playerHpEl=document.getElementById("player-hp");
const opponentHpEl=document.getElementById("opponent-hp");
const logList=document.getElementById("log-list");

export function ajouterLog(message){
    etat.log.push(message);
    const li=document.createElement("li");
    li.textContent=message;
    logList.prepend(li);
}

export function render(){
  playerHpEl.textContent="❤ "+etat.joueur.hp+" HP";
  opponentHpEl.textContent="❤ "+etat.Adversaire.hp+" HP";
}