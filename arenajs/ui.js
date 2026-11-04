import { etat } from "./state.js";

const playerHpEl=document.getElementById("player-hp");
const opponentHpEl=document.getElementById("opponent-hp");

export function render(){
  playerHpEl.textContent="❤ "+etat.joueur.hp+" HP";
  opponentHpEl.textContent="❤ "+etat.Adversaire.hp+" HP";
}