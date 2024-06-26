const catId = Number(window.location.href.split("=")[1]);
if (window.location.href.split("=").length == 1 || 0 > catId || catId >= wordLists.length) {
    //hibás az id
    alert("Hopp, valami probléma akadt!");
    location.href="category.html";
} else {
    document.getElementById("category").innerText = catNames[catId];
}



const maxHp = 11;
let currentHp = maxHp;
let usedLetters = [];
let wordId;

const wordContainer = document.getElementById("word");
const letterContainer = document.getElementById("letterContainer");
const healthBar = document.getElementById("healthbar").children[0];
const healthCounter = document.getElementById("healthCounter");
healthCounter.innerText = maxHp;
const popUp = document.getElementById("popUp");



document.addEventListener("keypress", Event => {
    if (('a' <= Event.key && Event.key <= 'z') || "öüóőúéáűí".includes(Event.key)) {
        check(Event.key);
    }
})

letterContainer.childNodes.forEach(element => {
    element.addEventListener("click", () => {
        check(element.innerHTML);
    })
});

topRndBtn.addEventListener("click", () => {
    if (popUp.querySelector("#title").alt == "" || popUp.querySelector("#title").alt == "szunet") {
        if (popUp.style.display != "flex") {
            popUp.querySelector("#title").src = "./kepek/szunet.png";
            popUp.querySelector("#title").alt = "szunet";
            popUp.style.display = "flex";
        } else {
            popUp.style.display = "none";
        }
    }
})



function newWord() {
    wordId = Math.floor(Math.random() * wordLists[catId].length);

    for(let i = 0; i < wordLists[catId][wordId].length; i++) {
        wordContainer.appendChild(document.createElement("div"))
    }
}

function check(letter) {
    let correct = true;

    if (!usedLetters.includes(letter) && wordLists[catId][wordId].includes(letter)) {
        usedLetters.push(letter);

        let done = true;

        for (let i = 0; i < wordLists[catId][wordId].length; i++) {
            if (letter == wordLists[catId][wordId][i]) {
                wordContainer.childNodes[i].innerHTML = letter;
                wordContainer.childNodes[i].classList.add("selected");
            }

            if (wordContainer.childNodes[i].innerHTML != wordLists[catId][wordId][i]) {
                done = false;
            }
        }

        letterContainer.childNodes.forEach(child => {
            if (child.innerHTML == letter) {
                    child.style.animationName = "correct";
            }
        })

        if (done) {
            setTimeout(() => {
                win();
            }, 50);
            return;
        }
    } else if (!usedLetters.includes(letter) && !wordLists[catId][wordId].includes(letter)) {
        currentHp--;
        healthCounter.innerText = currentHp;
        correct = false;
        usedLetters.push(letter);

        healthBar.style.width = (healthBar.offsetWidth - 160 / maxHp) + "px";
        healthBar.style.animationName = "hurt";
        healthCounter.style.animationName = "hurt2";
        setTimeout(() => {
            healthBar.style.animationName = "";
            healthCounter.style.animationName = "";
        }, 200);

        letterContainer.childNodes.forEach(child => {
            if (child.innerHTML == letter) {
                    child.style.animationName = "wrong";
            }
        })
        
        if (currentHp == 0) {
            setTimeout(() => {
                lose();
            }, 200);
            return;
        }
    }
}

function win() {
    if (currentHp > 0) {
        let done = true;
        for (let i = 0; i < wordLists[catId][wordId].length; i++) {
            if (wordContainer.childNodes[i].innerHTML != wordLists[catId][wordId][i]) {
                done = false;
            }
        }
        if (done) {
            popUp.querySelector("#title").src = "./kepek/gyoztel.png";
            popUp.querySelector("#title").alt = "gyoztel";
            popUp.style.display = "flex";
        } else {
            console.log("nice try :)");
            return;
        }
    }
}

function lose() {
    if (currentHp <= 0) {
        let i = 0;
        wordContainer.childNodes.forEach(child => {
            child.innerHTML = wordLists[catId][wordId][i++];
        })


        popUp.querySelector("#title").src = "./kepek/vesztettel.png";
        popUp.querySelector("#title").alt = "vesztettel";
        popUp.style.display = "flex";
    }
}

document.getElementById("continueBtn").addEventListener("click", () => {
    letterContainer.childNodes.forEach(child => {
        child.style.animationName = "";
    })

    wordContainer.innerHTML = "";
    progress = [];
    currentHp = maxHp;
    healthCounter.innerText = maxHp;
    healthBar.style.width = "100%";
    usedLetters = [];

    popUp.querySelector("#title").src = "";
    popUp.querySelector("#title").alt = "";
    popUp.style.display = "none";

    newWord();
})