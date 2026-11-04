export const CARTES = [
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

export const HP_DEPART=3000;
export const TAILLE_DECK=16;
export const DECK_MIN=8;
export const MAIN_DEPART =5;
export const MAIN_MAX=5;
export const MAX_CHAMP=10;
export const MULTIPLICATEUR=100;
export const MALUS_CAMP=0.8;
export const CAMP_DU_TYPE={"Héros": "Lumière", "Monstre": "Ténèbres"};
export const COULEUR_RARETE = {
    "Commune": "border-slate-400",
    "Rare": "border-sky-400",
    "Épique": "border-violet-400",
    "Légendaire": "border-amber-400"
};