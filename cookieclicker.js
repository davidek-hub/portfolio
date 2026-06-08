let susenky = 0;
let silaKliknuti = 1;
let cps = 0;

let cenaBabicka = 10;
let cenaTovarna = 50;
let cenaDul = 200;

const textSkore = document.getElementById("skore");
const textCps = document.getElementById("text-cps");
const btnSusenka = document.getElementById("btn-susenka");
const popupsContainer = document.getElementById("popups-container");
const obchod = document.getElementById("obchod");
const btnBabicka = document.getElementById("btn-babicka");
const btnTovarna = document.getElementById("btn-tovarna");
const btnDul = document.getElementById("btn-dul");
const btnZlaty = document.getElementById("btn-zlaty");

function aktualizujUI() {
    textSkore.textContent = Math.floor(susenky);
    textCps.textContent = `Za sekundu: ${cps}`;
    document.title = `Sušenky: ${Math.floor(susenky)}`;
    
    if (susenky >= 10 || cenaBabicka > 10 || cenaTovarna > 50 || cenaDul > 200) {
        obchod.style.display = "block";
    }

    if (susenky >= cenaBabicka) {
        btnBabicka.style.display = "inline-block";
    } else if (cenaBabicka === 10) {
        btnBabicka.style.display = "none";
    }

    if (susenky >= cenaTovarna) {
        btnTovarna.style.display = "inline-block";
    } else if (cenaTovarna === 50) {
        btnTovarna.style.display = "none";
    }

    if (susenky >= cenaDul) {
        btnDul.style.display = "inline-block";
    } else if (cenaDul === 200) {
        btnDul.style.display = "none";
    }
}

function vytvorPopup(text) {
    const popup = document.createElement("div");
    popup.className = "floating-popup";
    popup.textContent = `+${text}`;
    
    let randomX = Math.floor(Math.random() * 40) - 20;
    popup.style.marginLeft = `${randomX}px`;
    
    popupsContainer.appendChild(popup);
    
    setTimeout(function() {
        popup.remove();
    }, 800);
}

btnSusenka.addEventListener("click", function() {
    susenky += silaKliknuti;
    vytvorPopup(silaKliknuti);
    aktualizujUI();
});

btnBabicka.addEventListener("click", function() {
    if (susenky >= cenaBabicka) {
        susenky -= cenaBabicka;
        silaKliknuti++;
        cenaBabicka += 10;
        btnBabicka.textContent = `Najmout Babičku (Cena: ${cenaBabicka})`;
        aktualizujUI();
    } else {
        alert("Nedostatek prostředků!");
    }
});

btnTovarna.addEventListener("click", function() {
    if (susenky >= cenaTovarna) {
        susenky -= cenaTovarna;
        cenaTovarna += 50;
        cps += 1;
        btnTovarna.textContent = `Koupit Továrnu (Cena: ${cenaTovarna})`;
        aktualizujUI();
    }
});

btnDul.addEventListener("click", function() {
    if (susenky >= cenaDul) {
        susenky -= cenaDul;
        cenaDul += 150;
        cps += 5;
        btnDul.textContent = `Důl na čokoládu (Cena: ${cenaDul})`;
        aktualizujUI();
    }
});

btnZlaty.addEventListener("click", function() {
    if (Math.random() > 0.5) {
        susenky += 100;
        alert("Štěstí! Získal jsi 100 sušenek.");
    } else {
        susenky = Math.max(0, susenky - 50);
        alert("Smůla! Ztratil jsi 50 sušenek.");
    }
    aktualizujUI();
});

setInterval(function() {
    if (cps > 0) {
        susenky += cps;
        aktualizujUI();
    }
}, 1000);