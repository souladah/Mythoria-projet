export const cards=[
  { "nom": "Apprenti", "image": "apprenti.png", "rarete": "Commune", "type": "Serviteur", "camp": "Lumière", "attaque": 2, "defense": 2 },
  { "nom": "Aria", "image": "aria.png", "rarete": "Commune", "type": "Héros", "camp": "Lumière", "attaque": 3, "defense": 1 },
  { "nom": "Loup spectral", "image": "loup-spectral.png", "rarete": "Rare", "type": "Monstre", "camp": "Ténèbres", "attaque": 5, "defense": 3 },
  { "nom": "Mage de cristal", "image": "mage-cristal.png", "rarete": "Rare", "type": "Héros", "camp": "Lumière", "attaque": 6, "defense": 2 },
  { "nom": "Chevalier de l'aube", "image": "chevalier-aube.png", "rarete": "Épique", "type": "Héros", "camp": "Lumière", "attaque": 7, "defense": 6 },
  { "nom": "Dragon des abysses", "image": "dragon-abysses.png", "rarete": "Légendaire", "type": "Monstre", "camp": "Ténèbres", "attaque": 10, "defense": 8 },
  { "nom": "Phoenix", "image": "phoenix.png", "rarete": "Épique", "type": "Monstre", "camp": "Lumière", "attaque": 8, "defense": 4 },
  { "nom": "Roi des ombres", "image": "roi-ombres.png", "rarete": "Légendaire", "type": "Monstre", "camp": "Ténèbres", "attaque": 9, "defense": 9 },
  { "nom": "Ange de l'éternité", "image": "ange-eternite.png", "rarete": "Légendaire", "type": "Héros", "camp": "Lumière", "attaque": 8, "defense": 10 },
  { "nom": "Flamme du jugement", "image": "flamme-jugement.png", "rarete": "Épique", "type": "Sort", "camp": "Lumière", "attaque": 9, "defense": 0 },
  { "nom": "Invocation suprême", "image": "invocation-supreme.png", "rarete": "Légendaire", "type": "Sort", "camp": "Lumière", "attaque": 10, "defense": 5 },
  { "nom": "Aurelion", "image": "legendaire-aurelion.webp", "rarete": "Légendaire", "type": "Héros", "camp": "Lumière", "attaque": 10, "defense": 7 },
  { "nom": "Éclipse", "image": "legendaire-eclipse.webp", "rarete": "Légendaire", "type": "Sort", "camp": "Ténèbres", "attaque": 9, "defense": 8 },
  { "nom": "Nocthar", "image": "legendaire-nocthar.webp", "rarete": "Légendaire", "type": "Monstre", "camp": "Ténèbres", "attaque": 10, "defense": 6 },
  { "nom": "Ombre vorace", "image": "ombre-vorace.png", "rarete": "Rare", "type": "Serviteur", "camp": "Ténèbres", "attaque": 5, "defense": 4 },
  { "nom": "Portail", "image": "portail.png", "rarete": "Épique", "type": "Sort", "camp": "Ténèbres", "attaque": 0, "defense": 8 }
]

export function trouverCarte(nom){
    return cards.find(c=>c.nom===nom)
}


export function deckAdversaire(){
    return cards.map(c=>({...c}));
}