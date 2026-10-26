let boosters = JSON.parse(
    localStorage.getItem("mythoriaBoosters")
) || [];

const boosterList = document.getElementById("booster-list");
const ul = document.createElement("ul");

boosterList.innerHTML = "";



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
            
            ul.appendChild(li);
}
boosterList.appendChild(ul);
}
    
