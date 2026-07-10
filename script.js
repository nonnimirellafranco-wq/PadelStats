/* =====================================
   PADEL STATS v1.0
===================================== */

// ----------------------------
// DATABASE
// ----------------------------

let partite = JSON.parse(localStorage.getItem("partite")) || [];
let periodoDashboard = "1mese";
let dataInizioPeriodo = null;
let dataFinePeriodo = null;
// indice della partita in modifica
let partitaInModifica = -1;

let meseCorrente = new Date().getMonth();
let annoCorrente = new Date().getFullYear();

// ----------------------------
// SEZIONI
// ----------------------------

const home = document.getElementById("home");
const nuovaPartita = document.getElementById("nuovaPartita");
const archivio = document.getElementById("archivio");
const statistiche = document.getElementById("statistiche");
const impostazioni = document.getElementById("impostazioni");
const agenda = document.getElementById("agenda");
const valoriIniziali = document.getElementById("valoriIniziali");
const backup = document.getElementById("backup");
const informazioni = document.getElementById("informazioni");
const impostazioniApp =
    document.getElementById("impostazioniApp");

// ----------------------------
// PULSANTI
// ----------------------------

const btnHome = document.getElementById("btnHome");
const btnNuova = document.getElementById("btnNuova");
const btnArchivio = document.getElementById("btnArchivio");
const btnStatistiche = document.getElementById("btnStatistiche");
const btnImpostazioni = document.getElementById("btnImpostazioni");
const btnAgenda = document.getElementById("btnAgenda");
const btnSalva = document.getElementById("salvaPartita");
const btnTorna = document.getElementById("btnTorna");
const btnSalvaProfilo = document.getElementById("salvaProfilo");

btnTorna.onclick = mostraHome;


// ----------------------------
// MENU
// ----------------------------

function filtraPartitePeriodo(){

    // Periodo personalizzato
    if(periodoDashboard=="personalizzato"){

        return partite.filter(function(p){

            const data = new Date(p.data);

            if(dataInizioPeriodo && data < dataInizioPeriodo) return false;

            if(dataFinePeriodo && data > dataFinePeriodo) return false;

            return true;

        });

    }

    // Filtri rapidi
    const oggi = new Date();

    const dataLimite = new Date();

    switch(periodoDashboard){

        case "1mese":
            dataLimite.setMonth(oggi.getMonth()-1);
            break;

        case "3mesi":
            dataLimite.setMonth(oggi.getMonth()-3);
            break;

        case "6mesi":
            dataLimite.setMonth(oggi.getMonth()-6);
            break;

        case "1anno":
            dataLimite.setFullYear(oggi.getFullYear()-1);
            break;

        default:
            return partite;

    }

    return partite.filter(function(p){

        return new Date(p.data) >= dataLimite;

    });

}

function nascondiSezioni(){

    home.style.display = "none";
    nuovaPartita.style.display = "none";
    archivio.style.display = "none";
    statistiche.style.display = "none";
    impostazioni.style.display = "none";
    agenda.style.display = "none";
    valoriIniziali.style.display = "none";
    impostazioniApp.style.display = "none";
    backup.style.display = "none";
    informazioni.style.display = "none";


}

function mostraHome(){

    nascondiSezioni();
    home.style.display="block";

}

function tornaIndietro(){

    partitaInModifica = -1;

    switch(schermataPrecedente){

        case "agenda":
            mostraAgenda();
            break;

        case "archivio":
            mostraArchivio();
            break;

        default:
            mostraHome();
            break;

    }

}

function mostraAgenda(){

    nascondiSezioni();

    agenda.style.display = "block";

    aggiornaAgenda();

}

function mostraValoriIniziali(){

    nascondiSezioni();

    valoriIniziali.style.display = "block";

}

function chiudiMenuGioco(){

    menuGioco.classList.remove("aperto");

    overlayMenu.classList.remove("aperto");

}


function salvaValoriIniziali(){

    localStorage.setItem("racchettaDefault",
        document.getElementById("defaultRacchetta").value);

   
    localStorage.setItem("scarpeDefault",
        document.getElementById("defaultScarpe").value);

    localStorage.setItem("circoloDefault",
        document.getElementById("defaultCircolo").value);

    localStorage.setItem("campoDefault",
        document.getElementById("defaultCampo").value);

     alert("✅ Valori iniziali salvati.");

}

function mostraNuova(){

    nascondiSezioni();

    nuovaPartita.style.display = "block";

const titolo = document.getElementById("titoloNuovaPartita");

if(partitaInModifica !== -1){

    titolo.textContent = "Modifica partita";

}else{

    titolo.textContent = "Nuova partita";

}

    // Se sto modificando una partita, NON caricare i preferiti
    if(partitaInModifica !== -1){
        return;
    }

    document.getElementById("compagno").value = "";
    document.getElementById("avv1").value = "";
    document.getElementById("avv2").value = "";


    document.getElementById("racchetta").value =
    localStorage.getItem("racchettaDefault") || "";

    document.getElementById("scarpe").value =
    localStorage.getItem("scarpeDefault") || "";

    document.getElementById("circolo").value =
    localStorage.getItem("circoloDefault") || "";

   
    document.getElementById("campo").value =
    localStorage.getItem("campoDefault") || "Indoor";

    document.getElementById("stelle").value = 3;

        stelleTouch.forEach(s => s.textContent = "☆");

      document.getElementById("tipoPartita").value = "Amichevole";

for(let i=0;i<3;i++){

    stelleTouch[i].textContent = "⭐";

}

aggiornaNomiSet();

}

function mostraStatistiche(){

    nascondiSezioni();

    statistiche.style.display = "block";

    aggiornaStatisticheGiocatori();
    aggiornaMigliorCompagno();
    aggiornaStatisticheTipoPartita();
    aggiornaClassificaCompagni();
    aggiornaRecordPersonali();
    aggiornaStatisticheCampo();
    aggiornaUltimePartite();
    aggiornaClassificaAvversari();
    aggiornaStatisticheAttrezzatura();
    aggiornaUltimi30Giorni();
    aggiornaMigliorCircolo();
    aggiornaRendimento();
    aggiornaForma();

}

function mostraImpostazioni(){

    nascondiSezioni();

    impostazioni.style.display = "block";

    caricaNomeGiocatore();

}

function mostraImpostazioniApp(){

    nascondiSezioni();

    impostazioniApp.style.display = "block";

}

function mostraBackup(){

    nascondiSezioni();

    backup.style.display = "block";

}

function mostraInformazioni(){

    nascondiSezioni();

    informazioni.style.display = "block";

}

function mostraArchivio(){

    nascondiSezioni();

    archivio.style.display = "block";

    aggiornaArchivio();

}

// ----------------------------
// EVENTI MENU
// ----------------------------

btnHome.onclick = mostraHome;
btnNuova.onclick = function(){

    
    partitaInModifica = -1;

    mostraNuova();

};

if(btnArchivio)
    btnArchivio.onclick = mostraArchivio;

if(btnStatistiche)
    btnStatistiche.onclick = mostraStatistiche;

if(btnImpostazioni)
    btnImpostazioni.onclick = mostraImpostazioni;

if(btnAgenda)
    btnAgenda.onclick = mostraAgenda;

if(btnSalvaProfilo){

    btnSalvaProfilo.onclick = salvaProfilo;

}

document.getElementById("btnSalvaValori").onclick = salvaValoriIniziali;

// ----------------------------
// DATA AUTOMATICA
// ----------------------------

document.getElementById("data").valueAsDate = new Date();

// ----------------------------
// STATISTICHE HOME
// ----------------------------

function aggiornaDashboard(){

    const elenco = filtraPartitePeriodo().filter(partitaGiocata);

    let vittorie = elenco.filter(p => p.esito == "Vittoria").length;

    let pareggi = elenco.filter(p => p.esito == "Pareggio").length;

    let sconfitte = elenco.filter(p => p.esito == "Sconfitta").length;

    let percentuale = 0;

    if(elenco.length > 0){

        percentuale = Math.round(vittorie / elenco.length * 100);

    }

    document.getElementById("totPartite").innerHTML = elenco.length;

    document.getElementById("totVittorie").innerHTML = vittorie;

    document.getElementById("totPareggi").innerHTML = pareggi;

    document.getElementById("totSconfitte").innerHTML = sconfitte;

    document.getElementById("percentuale").innerHTML = percentuale + "%";

}
// ----------------------------
// AGGIORNA ARCHIVIO
// ----------------------------
let mesiAperti = {};
function apriChiudiMese(nome){

    mesiAperti[nome] = !mesiAperti[nome];

    aggiornaArchivio();

}

function creaChiaveMese(data){

    const anno = data.substring(0,4);

    const mese = data.substring(5,7);

    return anno + "-" + mese;

}

function nomeMese(data){

    const mesi = [
        "Gennaio","Febbraio","Marzo","Aprile",
        "Maggio","Giugno","Luglio","Agosto",
        "Settembre","Ottobre","Novembre","Dicembre"
    ];

    return mesi[Number(data.substring(5,7))-1] +
           " " +
           data.substring(0,4);

}

function aggiornaArchivio(){

let ricerca = document.getElementById("ricercaArchivio");

let filtro = "";

const ricercaAttiva = filtro.trim() !== "";

if(ricerca){

    filtro = ricerca.value.toLowerCase();

}

let html = "";


const gruppi = {};

partite.forEach(function(p, indice){

    if(!partitaGiocata(p)){
        return;
    }

    let chiave = creaChiaveMese(p.data);

    if(!gruppi[chiave]){

        gruppi[chiave] = [];

    }

    gruppi[chiave].push({

        partita:p,

        indice:indice

    });

});

const mesi = Object.keys(gruppi).sort().reverse();

if(partite.length===0){

    document.getElementById("listaPartite").innerHTML =
        "<p>Nessuna partita registrata.</p>";

    return;

}

html = "";

mesi.forEach(function(chiave){

    const elenco = gruppi[chiave];

    const aperto = ricercaAttiva ? true : mesiAperti[chiave];

    let partiteDelMese = [];

elenco
.slice()
.sort((a, b) => b.partita.data.localeCompare(a.partita.data))
.forEach(function(item){
    const p = item.partita;

    let testo = (
        (p.compagno || "") + " " +
        (p.avv1 || "") + " " +
        (p.avv2 || "") + " " +
        (p.circolo || "")
    ).toLowerCase();

    if(!testo.includes(filtro)){
        return;
    }

    partiteDelMese.push(item);

});

if(partiteDelMese.length==0){
    return;
}

html += `

<div class="titoloMeseArchivio"
     onclick="apriChiudiMese('${chiave}')">

    ${aperto ? "▼" : "▶"} ${nomeMese(elenco[0].partita.data)}
    (${partiteDelMese.length})

</div>

`;

if(aperto){

    html += `<div class="grigliaMese">`;

}

if(!aperto){

    return;

}
partiteDelMese.forEach(function(item){

    const p = item.partita;

let testo = (
    (p.compagno || "") + " " +
    (p.avv1 || "") + " " +
    (p.avv2 || "") + " " +
    (p.circolo || "")
).toLowerCase();

if(!testo.includes(filtro)){
    return;
}

    let icona = "🔴";

    if(p.esito=="Vittoria") icona="🟢";
    if(p.esito=="Pareggio") icona="🟡";

    html += `

<div class="card">

<h3>${icona} ${p.data}</h3>

<p><b>${p.compagno}</b></p>

<p>${p.avv1} - ${p.avv2}</p>

<p>${p.risultato}</p>

<p>${p.circolo}</p>

<div class="azioniPartita">

<button class="btnIcona" onclick="modificaPartita(${item.indice})">
✏️
</button>

<button class="btnIcona" onclick="condividiPartita(${item.indice})">
📤
</button>

<button class="btnIcona" onclick="eliminaPartita(${item.indice})">
🗑️
</button>

</div>
</div>

`;

});



if(aperto){

    html += `</div>`;

}

});

document.getElementById("listaPartite").innerHTML = html;


}
// ----------------------------
// SALVA PARTITA
// ----------------------------

btnSalva.onclick = function () {


aggiornaRisultato();

if(document.getElementById("risultato").value.trim() === ""){
    document.getElementById("esito").value = "";
}

    const partita = {

        data: document.getElementById("data").value,
        circolo: document.getElementById("circolo").value,
        campo: document.getElementById("campo").value,
        racchetta: document.getElementById("racchetta").value,
        scarpe: document.getElementById("scarpe").value,
        compagno: document.getElementById("compagno").value,
        avv1: document.getElementById("avv1").value,
        avv2: document.getElementById("avv2").value,
        io1: document.getElementById("io1").value,
        avvSet1: document.getElementById("avvSet1").value,

        io2: document.getElementById("io2").value,
        avvSet2: document.getElementById("avvSet2").value,

        io3: document.getElementById("io3").value,
        avvSet3: document.getElementById("avvSet3").value,

        io4: document.getElementById("io4").value,
        avvSet4: document.getElementById("avvSet4").value,

        io5: document.getElementById("io5").value,
        avvSet5: document.getElementById("avvSet5").value,
        risultato: document.getElementById("risultato").value,
        esito: document.getElementById("esito").value,
        stelle: document.getElementById("stelle").value,
        tipoPartita: document.getElementById("tipoPartita").value,
        note: document.getElementById("note").value

    };

    if(partitaInModifica==-1){


    partite.push(partita);

}else{

    partite[partitaInModifica]=partita;

    partitaInModifica=-1;

}

    localStorage.setItem("partite", JSON.stringify(partite));

   aggiornaTutto();

    alert("Operazione completata!");

    document.getElementById("formPartita").reset();

// Torna alla visualizzazione iniziale dei set
setVisibili = 3;

document.getElementById("set4").style.display = "none";
document.getElementById("set5").style.display = "none";

document.getElementById("btnAggiungiSet").style.display = "block";
document.getElementById("btnAggiungiSet").innerHTML = "➕ Aggiungi 4° set";

// Ripristina la modalità selezionata
cambiaModalita();

    document.getElementById("data").valueAsDate = new Date();

    tornaIndietro();

};

// ----------------------------
// ULTIMA PARTITA
// ----------------------------

function aggiornaUltimaPartita() {

    const box = document.getElementById("ultimaPartita");

    if(!box) return;

    const giocate = partite
        .filter(partitaGiocata)
        .slice()
        .sort((a,b)=>b.data.localeCompare(a.data));

    if(giocate.length===0){

        box.innerHTML = "Nessuna partita registrata";

        return;

    }

    const p = giocate[0];

    let colore;
    let icona;

    if(p.esito=="Vittoria"){

        colore="#2E7D32";
        icona="🏆";

    }else if(p.esito=="Pareggio"){

        colore="#F9A825";
        icona="🤝";

    }else{

        colore="#C62828";
        icona="❌";

    }

    box.innerHTML = `

<p class="dataUltima">

    📅 ${p.data}

</p>

<p class="esito"
   style="background:${colore};color:white;">

    ${icona} ${p.esito}

</p>

<div class="sfida">

    <div class="squadra">

        <b>${localStorage.getItem("nomeGiocatore") || "Io"}</b><br>
        <b>${p.compagno}</b>

    </div>

    <div class="vs">

        VS

    </div>

    <div class="squadra">

        <b>${p.avv1}</b><br>
        <b>${p.avv2}</b>

    </div>

</div>

<p class="risultato">

    ${p.risultato}

</p>

<p class="stelleUltima">

    ${mostraStelle(p.stelle)}

</p>

<hr>

<div class="footerPartita">

    ${p.circolo ? `
    <div class="circolo">
        🏟 ${p.circolo}
    </div>
    ` : ""}

    ${(p.racchetta || p.scarpe) ? `
    <div class="attrezzatura">
        ${p.racchetta ? `🎾 ${p.racchetta}` : ""}
        ${p.racchetta && p.scarpe ? "&nbsp;&nbsp;&nbsp;" : ""}
        ${p.scarpe ? `👟 ${p.scarpe}` : ""}
    </div>
    ` : ""}

</div>

`;

}

function formattaDataBreve(data){

    const giorni = [
        "Dom","Lun","Mar","Mer","Gio","Ven","Sab"
    ];

    const mesi = [
        "Gen","Feb","Mar","Apr","Mag","Giu",
        "Lug","Ago","Set","Ott","Nov","Dic"
    ];

    const d = new Date(data);

    return giorni[d.getDay()] + " " +
           d.getDate() + " " +
           mesi[d.getMonth()];

}

function aggiornaProssimaPartita(){

    const box = document.getElementById("prossimaPartita");

    if(!box) return;

    const oggi = new Date();

    const oggiStringa =
        oggi.getFullYear() + "-" +
        String(oggi.getMonth()+1).padStart(2,"0") + "-" +
        String(oggi.getDate()).padStart(2,"0");

    const future = partite
        .map((p, indice) => ({
            partita: p,
            indice: indice
        }))
        .filter(item =>
            !partitaGiocata(item.partita) &&
            item.partita.data >= oggiStringa &&
            (
                (item.partita.compagno || "").trim() !== "" ||
                (item.partita.avv1 || "").trim() !== "" ||
                (item.partita.avv2 || "").trim() !== ""
            )
        )
        .sort((a,b)=>a.partita.data.localeCompare(b.partita.data));

    if(future.length===0){

        box.innerHTML = `
            <div class="nessunaPartita">

                <div class="iconaCalendario">📅</div>

                <p>Nessuna partita<br>programmata</p>

            </div>
        `;

        return;

    }

    const p = future[0].partita;
    const indiceOriginale = future[0].indice;

    box.innerHTML = `

<div class="schedaProssima"
     onclick="modificaPartita(${indiceOriginale})"
     style="cursor:pointer;">

    <div class="dataProssima">

        📅 <b>${formattaDataBreve(p.data)}</b>

    </div>

    <div class="sfidaProssima">

        <div class="squadra">

            <b>${localStorage.getItem("nomeGiocatore") || "Io"}</b><br>
            <b>${p.compagno}</b>

        </div>

        <div class="vs">

            VS

        </div>

        <div class="squadra">

            <b>${p.avv1}</b><br>
            <b>${p.avv2}</b>

        </div>

    </div>

    ${p.circolo ? `
    <div class="circoloProssima">

        🏟 ${p.circolo}

    </div>
    ` : ""}

</div>

`;

}
function aggiornaCarouselPartite(){

    const box = document.getElementById("carouselPartite");




    if(!box) return;

   const ultime = partite
    .filter(partitaGiocata)
    .slice()
    .sort((a, b) => b.data.localeCompare(a.data))
    .slice(0, 3);

    if(ultime.length===0){

        box.innerHTML = `
            <div class="card cardSwipe">
                <p>Nessuna partita registrata</p>
            </div>
        `;

        return;

    }

    let html = "";

    ultime.forEach(function(p){

const indiceOriginale = partite.indexOf(p);

        let colore = "#C62828";
        let icona = "❌";

        if(p.esito=="Vittoria"){
            colore="#2E7D32";
            icona="🏆";
        }

        if(p.esito=="Pareggio"){
            colore="#F9A825";
            icona="🤝";
        }

       html += `

<div class="card cardSwipe" id="${p === ultime[0] ? 'cardDaCondividere' : ''}">

    <p class="dataUltima">📅 ${p.data}</p>

    <p class="esito" style="background:${colore};color:white;">
        ${icona} ${p.esito}
    </p>

    <div class="sfida">

        <div class="squadra">
            <b>${localStorage.getItem("nomeGiocatore") || "Io"}</b><br>
            <b>${p.compagno}</b>
        </div>

        <div class="vs">VS</div>

        <div class="squadra">
            <b>${p.avv1}</b><br>
            <b>${p.avv2}</b>
        </div>

    </div>

    <p class="risultato">${p.risultato}</p>

    <p class="stelleUltima">
        ${mostraStelle(p.stelle)}
    </p>

    <hr>

 <div class="footerPartita">

    <div>

       ${p.circolo ? `
    <div class="circolo">
        🏟 ${p.circolo}
    </div>
` : ""}

${(p.racchetta || p.scarpe) ? `
    <div class="attrezzatura">
        ${p.racchetta ? `🎾 ${p.racchetta}` : ""}
        ${p.racchetta && p.scarpe ? "&nbsp;&nbsp;" : ""}
        ${p.scarpe ? `👟 ${p.scarpe}` : ""}
    </div>
` : ""}

    </div>

    <div class="azioniPartita">

        <button class="btnIcona"
                onclick="condividiPartita(${indiceOriginale})">
            📤
        </button>

    </div>

</div>

</div>

`;

    });

    box.innerHTML = html;

const contatore = document.getElementById("contatoreCarousel");

box.onscroll = function(){

    const larghezzaCard = box.querySelector(".cardSwipe").offsetWidth + 16;

    const indice = Math.round(box.scrollLeft / larghezzaCard) + 1;

    contatore.textContent = indice + " / " + ultime.length;

};

}

// ----------------------------
// MODIFICA PARTITA
// ----------------------------

function modificaPartita(indice){

    const p = partite[indice];


    // Memorizza la schermata di provenienza
    if(agenda.style.display=="block"){

        

    }else if(archivio.style.display=="block"){

    

    }else{

        

    }

    // IMPORTANTE: imposto subito la modifica
    partitaInModifica = indice;

    // Apro la schermata
    mostraNuova();

    // -----------------------------
    // Dati generali
    // -----------------------------
    document.getElementById("data").value = p.data;
    document.getElementById("circolo").value = p.circolo;
    document.getElementById("campo").value = p.campo;
    document.getElementById("racchetta").value = p.racchetta || "";
    document.getElementById("scarpe").value = p.scarpe || "";
    document.getElementById("compagno").value = p.compagno;
    document.getElementById("avv1").value = p.avv1;
    document.getElementById("avv2").value = p.avv2;

    // -----------------------------
    // Set
    // -----------------------------
    document.getElementById("io1").value = p.io1 || "";

    document.getElementById("avvSet1").value = p.avvSet1 || "";

    document.getElementById("io2").value = p.io2 || "";
    document.getElementById("avvSet2").value = p.avvSet2 || "";

    document.getElementById("io3").value = p.io3 || "";
    document.getElementById("avvSet3").value = p.avvSet3 || "";

    document.getElementById("io4").value = p.io4 || "";
    document.getElementById("avvSet4").value = p.avvSet4 || "";

    document.getElementById("io5").value = p.io5 || "";
    document.getElementById("avvSet5").value = p.avvSet5 || "";

    // -----------------------------
    // Mostra i set necessari
    // -----------------------------
    setVisibili = 3;

    document.getElementById("set4").style.display = "none";
    document.getElementById("set5").style.display = "none";

    document.getElementById("btnAggiungiSet").style.display = "block";
    document.getElementById("btnAggiungiSet").innerHTML = "➕ Aggiungi 4° set";

    if(p.io4 || p.avvSet4){

        document.getElementById("set4").style.display = "block";
        setVisibili = 4;

        document.getElementById("btnAggiungiSet").innerHTML =
        "➕ Aggiungi 5° set";

    }

    if(p.io5 || p.avvSet5){

        document.getElementById("set4").style.display = "block";
        document.getElementById("set5").style.display = "block";

        setVisibili = 5;

        document.getElementById("btnAggiungiSet").style.display = "none";

    }

    // -----------------------------
    // Aggiorna risultato ed esito
    // -----------------------------
    aggiornaRisultato();

    // -----------------------------
    // Stelle
    // -----------------------------
    document.getElementById("stelle").value = p.stelle || "3";

    stelleTouch.forEach(s => s.textContent = "☆");

    for(let i=0; i<Number(p.stelle || 3); i++){

        stelleTouch[i].textContent = "⭐";

    }

    document.getElementById("tipoPartita").value =
        p.tipoPartita || "Amichevole";

    document.getElementById("note").value = p.note;

}

// ----------------------------
// ELIMINA PARTITA
// ----------------------------

function eliminaPartita(indice){

    if(!confirm("Eliminare questa partita?")){

        return;

    }

    partite.splice(indice,1);

    localStorage.setItem("partite",JSON.stringify(partite));

   aggiornaTutto();

}

// ----------------------------
// AGGIORNA ELENCO GIOCATORI
// ----------------------------

function aggiornaGiocatori(){

    let nomi = [];

    partite.forEach(function(p){

        if(p.compagno && !nomi.includes(p.compagno))
            nomi.push(p.compagno);

        if(p.avv1 && !nomi.includes(p.avv1))
            nomi.push(p.avv1);

        if(p.avv2 && !nomi.includes(p.avv2))
            nomi.push(p.avv2);

    });

    nomi.sort();

    let html = "";

    nomi.forEach(function(nome){

        html += `<option value="${nome}">`;

    });

    document.getElementById("listaGiocatori").innerHTML = html;

}

// ----------------------------
// AGGIORNA ELENCO RACCHETTE
// ----------------------------

function aggiornaRacchette(){

    let elenco=[];

    partite.forEach(function(p){

        if(p.racchetta && !elenco.includes(p.racchetta))
            elenco.push(p.racchetta);

    });

    elenco.sort();

    let html="";

    elenco.forEach(function(nome){

        html += `<option value="${nome}">`;

    });

    document.getElementById("listaRacchette").innerHTML = html;

}

// ----------------------------
// AGGIORNA ELENCO SCARPE
// ----------------------------

function aggiornaScarpe(){

    let elenco=[];

    partite.forEach(function(p){

        if(p.scarpe && !elenco.includes(p.scarpe))
            elenco.push(p.scarpe);

    });

    elenco.sort();

    let html="";

    elenco.forEach(function(nome){

        html += `<option value="${nome}">`;

    });

    document.getElementById("listaScarpe").innerHTML = html;

}


function aggiornaStatisticheTipoPartita(){

    let tipi = {

        "Amichevole": {
            partite:0,
            vittorie:0,
            stelle:0
        },

        "Competitiva": {
            partite:0,
            vittorie:0,
            stelle:0
        }

    };

    partite.forEach(function(p){

        let tipo = p.tipoPartita || "Amichevole";

        if(!tipi[tipo]) return;

        tipi[tipo].partite++;

        if(p.esito=="Vittoria")
            tipi[tipo].vittorie++;

        tipi[tipo].stelle += Number(p.stelle || 3);

    });

    let html = "";

    Object.keys(tipi).forEach(function(tipo){

        let t = tipi[tipo];

        if(t.partite==0)
            return;

        let win = Math.round(t.vittorie/t.partite*100);

        let media = (t.stelle/t.partite).toFixed(1);

        html += `

        <div class="card" style="margin-bottom:15px;">

            <h3>${tipo=="Amichevole" ? "🤝 Amichevole" : "🏆 Competitiva"}</h3>

            <p>🎾 Partite: <b>${t.partite}</b></p>

            <p>🏆 Vittorie: <b>${t.vittorie}</b></p>

            <p>📈 Win Rate: <b>${win}%</b></p>

            <p>⭐ Prestazione media:
            <b>${media}/5</b></p>

        </div>

        `;

    });

    if(html=="")
        html="<p>Nessuna partita registrata.</p>";

    document.getElementById("statTipoPartita").innerHTML = html;

}

// ----------------------------
// MIGLIOR COMPAGNO
// ----------------------------

function aggiornaMigliorCompagno()

{

    let compagni = {};

    partite.forEach(function(p){

        if(!p.compagno) return;

        if(!compagni[p.compagno]){

            compagni[p.compagno]={

                partite:0,
                vittorie:0

            };

        }

        compagni[p.compagno].partite++;

       if(p.esito=="Vittoria"){

    compagni[p.compagno].vittorie++;

}else if(p.esito=="Pareggio"){

    compagni[p.compagno].vittorie += 0.5;

}

    });

  let migliore = null;

let percentuale = -1;

const MIN_PARTITE = 5;

Object.keys(compagni).forEach(function(nome){

    let g = compagni[nome];

    if(g.partite < MIN_PARTITE)
        return;

    let perc = Math.round(g.vittorie / g.partite * 100);

    if(perc > percentuale){

        percentuale = perc;

        migliore = {

            nome:nome,
            partite:g.partite,
            vittorie:g.vittorie,
            percentuale:perc

        };

    }

});

    if(!migliore){

        document.getElementById("migliorCompagno").innerHTML =
"Servono almeno 5 partite con lo stesso compagno.";

        return;

    }

    document.getElementById("migliorCompagno").innerHTML = `

    <div class="bestPartner">

        <div class="bestPartnerNome">

            👤 ${migliore.nome}

        </div>

        <div class="bestPartnerStat">

            🎾 ${migliore.partite} partite

        </div>

        <div class="bestPartnerStat">

            🏆 ${migliore.vittorie} vittorie

        </div>

        <div class="bestPartnerPercent">

            ${migliore.percentuale}%

        </div>

    </div>

`;


}

// ----------------------------
// CLASSIFICA COMPAGNI
// ----------------------------

function aggiornaClassificaCompagni(){

    const MIN_PARTITE = 5;

    let compagni = {};

    partite.forEach(function(p){

        if(!p.compagno) return;

        if(!compagni[p.compagno]){

            compagni[p.compagno]={

                partite:0,
                vittorie:0

            };

        }

        compagni[p.compagno].partite++;

       if(p.esito=="Vittoria"){

    compagni[p.compagno].vittorie++;

}else if(p.esito=="Pareggio"){

    compagni[p.compagno].vittorie += 0.5;

}

    });

    let elenco=[];

    Object.keys(compagni).forEach(function(nome){

        let g=compagni[nome];

        if(g.partite<MIN_PARTITE) return;

        elenco.push({

            nome:nome,

            partite:g.partite,

            vittorie:g.vittorie,

            percentuale:Math.round(g.vittorie/g.partite*100)

        });

    });

    elenco.sort(function(a,b){

        if(b.percentuale!=a.percentuale)
            return b.percentuale-a.percentuale;

        return b.partite-a.partite;

    });

    let html="";

    elenco.forEach(function(g,i){

        let medaglia=(i+1)+"°";

        if(i==0) medaglia="🥇";
        if(i==1) medaglia="🥈";
        if(i==2) medaglia="🥉";

        html+=`

<div style="padding:10px;border-bottom:1px solid #ddd;">

<h3>${medaglia} ${g.nome}</h3>

<p>${g.percentuale}% - ${g.partite} partite</p>

</div>

`;

    });

    if(html==""){

        html="Servono almeno 5 partite con lo stesso compagno.";

    }

    document.getElementById("classificaCompagni").innerHTML=html;

}

// ---------------------------- 
// CLASSIFICA AVVERSARI
// ----------------------------

function aggiornaClassificaAvversari(){

    const MIN_PARTITE = 3;

    let avversari = {};

    partite.forEach(function(p){

        [p.avv1,p.avv2].forEach(function(nome){

            if(!nome) return;

            if(!avversari[nome]){

                avversari[nome]={

                    partite:0,

                    vittorie:0

                };

            }

            avversari[nome].partite++;

           if(p.esito=="Vittoria"){

    avversari[nome].vittorie++;

}else if(p.esito=="Pareggio"){

    avversari[nome].vittorie += 0.5;

}

        });

    });

    let elenco=[];

    Object.keys(avversari).forEach(function(nome){

        let g=avversari[nome];

        if(g.partite<MIN_PARTITE) return;

        elenco.push({

            nome:nome,

            partite:g.partite,

            percentuale:Math.round(g.vittorie/g.partite*100)

        });

    });

    elenco.sort(function(a,b){

        return a.percentuale-b.percentuale;

    });

    let html="";

    elenco.forEach(function(g,i){

        let medaglia=(i+1)+"°";

        if(i==0) medaglia="🥇";

        if(i==1) medaglia="🥈";

        if(i==2) medaglia="🥉";

        html+=`

<div style="padding:10px;border-bottom:1px solid #ddd;">

<h3>${medaglia} ${g.nome}</h3>

<p>Hai vinto il ${g.percentuale}%</p>

<p>${g.partite} partite</p>

</div>

`;

    });

    if(html==""){

        html="Servono almeno 3 partite contro lo stesso avversario.";

    }

    document.getElementById("classificaAvversari").innerHTML=html;

}

// ----------------------------
// RECORD PERSONALI
// ----------------------------

function aggiornaRecordPersonali(){

    let vittorieConsecutive = 0;
    let recordVittorie = 0;

    let sconfitteConsecutive = 0;
    let recordSconfitte = 0;

    partite.forEach(function(p){

        if(p.esito=="Vittoria"){

    vittorieConsecutive++;
    sconfitteConsecutive=0;

}else if(p.esito=="Sconfitta"){

    sconfitteConsecutive++;
    vittorieConsecutive=0;

}else{

    // Pareggio: interrompe entrambe le serie
    vittorieConsecutive=0;
    sconfitteConsecutive=0;

}

        if(vittorieConsecutive>recordVittorie)
            recordVittorie=vittorieConsecutive;

        if(sconfitteConsecutive>recordSconfitte)
            recordSconfitte=sconfitteConsecutive;

    });

   let migliorPrestazione = 0;

partite.forEach(function(p){

    let stelle = Number(p.stelle || 0);

    if(stelle > migliorPrestazione){

        migliorPrestazione = stelle;

    }

});

let compagni = {};

partite.forEach(function(p){

    if(!p.compagno) return;

    if(!compagni[p.compagno]){

        compagni[p.compagno] = 0;

    }

    compagni[p.compagno]++;

});

let compagnoTop = "-";
let maxPartite = 0;

Object.keys(compagni).forEach(function(nome){

    if(compagni[nome] > maxPartite){

        maxPartite = compagni[nome];

        compagnoTop = nome;

    }

});

let avversari = {};

partite.forEach(function(p){

    [p.avv1, p.avv2].forEach(function(nome){

        if(!nome) return;

        if(!avversari[nome]){

            avversari[nome] = 0;

        }

        avversari[nome]++;

    });

});

let avversarioTop = "-";
let maxSfide = 0;

Object.keys(avversari).forEach(function(nome){

    if(avversari[nome] > maxSfide){

        maxSfide = avversari[nome];

        avversarioTop = nome;

    }

});

let circoli = {};

partite.forEach(function(p){

    if(!p.circolo) return;

    if(!circoli[p.circolo]){

        circoli[p.circolo] = 0;

    }

    circoli[p.circolo]++;

});

let circoloTop = "-";
let maxCircolo = 0;

Object.keys(circoli).forEach(function(nome){

    if(circoli[nome] > maxCircolo){

        maxCircolo = circoli[nome];

        circoloTop = nome;

    }

});

let racchette = {};

partite.forEach(function(p){

    if(!p.racchetta) return;

    if(!racchette[p.racchetta]){

        racchette[p.racchetta] = 0;

    }

    racchette[p.racchetta]++;

});

let racchettaTop = "-";
let maxRacchetta = 0;

Object.keys(racchette).forEach(function(nome){

    if(racchette[nome] > maxRacchetta){

        maxRacchetta = racchette[nome];

        racchettaTop = nome;

    }

});

document.getElementById("recordPersonali").innerHTML = `

<p>🔥 Record vittorie consecutive: <b>${recordVittorie}</b></p>

<p>😱 Record sconfitte consecutive: <b>${recordSconfitte}</b></p>

<p>⭐ Miglior prestazione: <b>${mostraStelle(migliorPrestazione)}</b></p>

<p>👤 Compagno più utilizzato: <b>${compagnoTop}</b> (${maxPartite} partite)</p>

<p>😈 Avversario più affrontato: <b>${avversarioTop}</b> (${maxSfide} partite)</p>

<p>🏟 Circolo più frequentato: <b>${circoloTop}</b> (${maxCircolo} partite)</p>

<p>🎾 Racchetta più usata: <b>${racchettaTop}</b> (${maxRacchetta} partite)</p>

`;

}

// ----------------------------
// INDOOR / OUTDOOR
// ----------------------------

function aggiornaStatisticheCampo(){

   let indoor = {
    partite:0,
    vittorie:0,
    pareggi:0,
    sconfitte:0
};

let outdoor = {
    partite:0,
    vittorie:0,
    pareggi:0,
    sconfitte:0
};

   partite.forEach(function(p){

    if(p.campo=="Indoor"){

        indoor.partite++;

        if(p.esito=="Vittoria")
            indoor.vittorie++;
        else if(p.esito=="Pareggio")
            indoor.pareggi++;
        else
            indoor.sconfitte++;

    }else{

        outdoor.partite++;

        if(p.esito=="Vittoria")
            outdoor.vittorie++;
        else if(p.esito=="Pareggio")
            outdoor.pareggi++;
        else
            outdoor.sconfitte++;

    }

});

    let indoorPerc = indoor.partite==0 ? 0 :
        Math.round(indoor.vittorie/indoor.partite*100);

    let outdoorPerc = outdoor.partite==0 ? 0 :
        Math.round(outdoor.vittorie/outdoor.partite*100);

    document.getElementById("statisticheCampo").innerHTML=`

    <h3>🏠 Indoor</h3>

    <p>Partite: ${indoor.partite}</p>

    <p>Vittorie: ${indoor.vittorie}</p>

<p>Pareggi: ${indoor.pareggi}</p>

<p>Sconfitte: ${indoor.sconfitte}</p>

    <p><b>${indoorPerc}%</b></p>

    <hr>

    <h3>🌳 Outdoor</h3>

    <p>Partite: ${outdoor.partite}</p>

    <p>Vittorie: ${outdoor.vittorie}</p>

<p>Pareggi: ${outdoor.pareggi}</p>

<p>Sconfitte: ${outdoor.sconfitte}</p>

    <p><b>${outdoorPerc}%</b></p>

    `;

}

// ----------------------------
// ULTIME 10 PARTITE
// ----------------------------

function aggiornaUltimePartite(){

    let html="";

   let ultime = partite
    .filter(p => p.esito === "Vittoria" || p.esito === "Pareggio" || p.esito === "Sconfitta")
    .slice()
    .sort((a,b) => b.data.localeCompare(a.data))
    .slice(0,10)
    .reverse();

    ultime.forEach(function(p){

       if(p.esito=="Vittoria"){

    html+="🟢";

}else if(p.esito=="Pareggio"){

    html+="🟡";

}else{

    html+="🔴";

}

    });

    if(html==""){

        html="Nessuna partita";

    }

    document.getElementById("ultimePartiteGrafico").innerHTML=html;

}

// ----------------------------
// STATISTICHE GIOCATORI
// ----------------------------

function aggiornaStatisticheGiocatori(){

let ricerca =
    document.getElementById("ricercaGiocatorePopup") ||
    document.getElementById("ricercaGiocatore");

let filtro = "";

if(ricerca){

    filtro = ricerca.value.toLowerCase();

}
    let giocatori = {};

    function aggiungi(nome,vinto){

        if(!nome) return;

        if(!giocatori[nome]){

            giocatori[nome]={

                partite:0,
                vittorie:0,
                sconfitte:0

            };

        }

        giocatori[nome].partite++;

      if(vinto === true){

    giocatori[nome].vittorie++;

}else if(vinto === false){

    giocatori[nome].sconfitte++;


    }

}
partite.forEach(function(p){

    if(p.esito=="Vittoria"){

        aggiungi(p.compagno,true);

        aggiungi(p.avv1,false);

        aggiungi(p.avv2,false);

    }else if(p.esito=="Sconfitta"){

        aggiungi(p.compagno,false);

        aggiungi(p.avv1,true);

        aggiungi(p.avv2,true);

    }else{

        // Pareggio
        aggiungi(p.compagno,null);

        aggiungi(p.avv1,null);

        aggiungi(p.avv2,null);

    }

});

    let html="";

    Object.keys(giocatori)
    .sort()
    .forEach(function(nome){

    if(!nome.toLowerCase().includes(filtro))
    return;

        let g=giocatori[nome];

        let perc=Math.round(g.vittorie/g.partite*100);

        html+=`

<div class="card">

<h3>${nome}</h3>

<p>Partite ${g.partite}</p>

<p>🏆 Vittorie ${g.vittorie}</p>

<p>❌ Sconfitte ${g.sconfitte}</p>

<p><b>${perc}%</b></p>

</div>

`;

    });

    return html;


}

document
.getElementById("ricercaArchivio")
.addEventListener("keyup",aggiornaArchivio);

// ----------------------------
// ATTREZZATURA PIÙ VINCENTE
// ----------------------------

function aggiornaStatisticheAttrezzatura(){

document.getElementById("statAttrezzatura").innerHTML="";

    creaStatAttrezzatura("racchetta","🎾 Racchetta");
    creaStatAttrezzatura("scarpe","👟 Scarpe");
   

}

function creaStatAttrezzatura(campo,titolo){

    let elenco={};

    partite.forEach(function(p){

        let nome=p[campo];

        if(!nome) return;

        if(!elenco[nome]){

            elenco[nome]={

                partite:0,
                vittorie:0

            };

        }

        elenco[nome].partite++;

        if(p.esito=="Vittoria")
            elenco[nome].vittorie++;

    });

    let migliore=null;

    Object.keys(elenco).forEach(function(nome){

        let g=elenco[nome];

        if(g.partite<3) return;

        let perc=Math.round(g.vittorie/g.partite*100);

        if(!migliore || perc>migliore.percentuale){

            migliore={

                nome:nome,
                partite:g.partite,
                vittorie:g.vittorie,
                percentuale:perc

            };

        }

    });

   let html="";

if(migliore){

    html+=`

<h3>${titolo}</h3>

<p><b>${migliore.nome}</b></p>

<p>${migliore.partite} partite</p>

<p>${migliore.vittorie} vittorie</p>

<p><b>${migliore.percentuale}%</b></p>

<hr>

`;

}else{

    html+=`

<h3>${titolo}</h3>

<p>Servono almeno <b>3 partite</b></p>

<p>con la stessa attrezzatura.</p>

<hr>

`;

}

document.getElementById("statAttrezzatura").innerHTML += html;

}

// ----------------------------
// ULTIMI 30 GIORNI
// ----------------------------

function aggiornaUltimi30Giorni(){

    const oggi = new Date();

    let partite30 = partite.filter(function(p){

        let data = new Date(p.data);

        let diff = (oggi - data) / (1000*60*60*24);

        return diff <= 30;

    });

   let vinte = partite30.filter(p => p.esito=="Vittoria").length;

   let pareggi = partite30.filter(p => p.esito=="Pareggio").length;

   let perse = partite30.filter(p => p.esito=="Sconfitta").length;

    let perc = 0;

    if(partite30.length>0){

        perc = Math.round(vinte/partite30.length*100);

    }

    document.getElementById("ultimi30giorni").innerHTML = `

        <p>Partite: <b>${partite30.length}</b></p>

        <p>Vittorie: <b>${vinte}</b></p>
        <p>Pareggi: <b>${pareggi}</b></p>
        <p>Sconfitte: <b>${perse}</b></p>

        <p>Win Rate: <b>${perc}%</b></p>

    `;

}

// ----------------------------
// MIGLIOR CIRCOLO
// ----------------------------

function aggiornaMigliorCircolo(){

    const MIN_PARTITE = 3;

    let circoli = {};

    partite.forEach(function(p){

        if(!p.circolo) return;

        if(!circoli[p.circolo]){

            circoli[p.circolo] = {

                partite:0,
                vittorie:0

            };

        }

        circoli[p.circolo].partite++;

        if(p.esito=="Vittoria")
            circoli[p.circolo].vittorie++;

    });

    let migliore = null;

    Object.keys(circoli).forEach(function(nome){

        let g = circoli[nome];

        if(g.partite < MIN_PARTITE)
            return;

        let perc = Math.round(g.vittorie/g.partite*100);

        if(!migliore || perc > migliore.percentuale){

            migliore = {

                nome:nome,
                partite:g.partite,
                vittorie:g.vittorie,
                percentuale:perc

            };

        }

    });

    if(!migliore){

        document.getElementById("migliorCircolo").innerHTML =
        "Servono almeno 3 partite nello stesso circolo.";

        return;

    }

    document.getElementById("migliorCircolo").innerHTML = `

        <h3>${migliore.nome}</h3>

        <p>Partite: ${migliore.partite}</p>

        <p>Vittorie: ${migliore.vittorie}</p>

        <p><b>${migliore.percentuale}%</b></p>

    `;

}

// ----------------------------
// RENDIMENTO
// ----------------------------

function aggiornaRendimento(){

    let ultime = partite
    .filter(partitaGiocata)
    .slice()
    .sort((a, b) => b.data.localeCompare(a.data))
    .slice(0, 10)
    .reverse();

    if(ultime.length === 0){

        document.getElementById("rendimento").innerHTML = "Nessuna partita giocata.";

        return;

    }

    let vinte = ultime.filter(p => p.esito=="Vittoria").length;

    let pareggi = ultime.filter(p => p.esito=="Pareggio").length;

    let perc = Math.round((vinte + pareggi*0.5) / ultime.length * 100);

    let messaggio="";

    if(perc>=80){

        messaggio="🔥 Stato di forma eccezionale";

    }else if(perc>=60){

        messaggio="💪 Ottimo periodo";

    }else if(perc>=40){

        messaggio="🙂 Periodo nella media";

    }else{

        messaggio="⚠️ Momento difficile";

    }

    document.getElementById("rendimento").innerHTML=`

        <p>Ultime ${ultime.length} partite</p>

        <h2>${perc}%</h2>

        <p>${messaggio}</p>

    `;

}

// ----------------------------
// ESPORTA BACKUP
// ----------------------------

document.getElementById("esportaDati").onclick = function(){


    let dati = JSON.stringify(partite,null,2);

    let blob = new Blob([dati],{
        type:"application/json"
    });

    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    let oggi = new Date();

    let nome =
        "PadelStats_" +
        oggi.toISOString().substring(0,10) +
        ".json";

    link.download = nome;

    link.click();

};


// ----------------------------
// IMPORTA BACKUP
// ----------------------------

document.getElementById("importaDati")
.addEventListener("change",function(e){

    let file = e.target.files[0];

    if(!file) return;

    let reader = new FileReader();

    reader.onload=function(event){

        try{

            partite = JSON.parse(event.target.result);

            localStorage.setItem(
                "partite",
                JSON.stringify(partite)
            );

            aggiornaTutto();

            alert("Backup importato con successo!");

        }catch{

            alert("File non valido.");

        }

    };

    reader.readAsText(file);

});

// ----------------------------
// AGGIORNA TUTTO
// ----------------------------

function aggiornaTutto(){

   

    aggiornaDashboard();

    aggiornaArchivio();

    aggiornaGiocatori();

    aggiornaRacchette();
    aggiornaScarpe();
    

    aggiornaStatisticheGiocatori();

    aggiornaMigliorCompagno();

    aggiornaClassificaCompagni();

    aggiornaClassificaAvversari();

    aggiornaRecordPersonali();

    aggiornaStatisticheCampo();

    aggiornaUltimePartite();

 

    aggiornaStatisticheAttrezzatura();



    aggiornaUltimaPartita();

    aggiornaCarouselPartite();

    aggiornaProssimaPartita();

    aggiornaUltimi30Giorni();

    aggiornaMigliorCircolo();

    aggiornaRendimento();

    aggiornaForma();

    aggiornaStatisticheTipoPartita();

}

const ricercaGiocatore = document.getElementById("ricercaGiocatore");

if(ricercaGiocatore){

    ricercaGiocatore.addEventListener(
        "keyup",
        aggiornaStatisticheGiocatori
    );

}

// ----------------------------
// STATO DI FORMA
// ----------------------------

function aggiornaForma(){

    const indice = document.getElementById("indiceForma");
    

    let ultime = partite
    .filter(partitaGiocata)
    .slice()
    .sort((a, b) => b.data.localeCompare(a.data))
    .slice(0, 10)
    .reverse();

    if(ultime.length===0){

        indice.innerHTML="0 / 10";

        

        return;

    }

    let punteggio = 0;

ultime.forEach(function(p){

    if(p.esito=="Vittoria"){

        punteggio++;

    }else if(p.esito=="Sconfitta"){

        punteggio--;

    }

});

let voto = ((punteggio + ultime.length) / (ultime.length * 2)) * 10;

    let votoTesto = Number.isInteger(voto) ? voto : voto.toFixed(1);

    indice.innerHTML = votoTesto + " / 10";

    let html = "";

ultime.forEach(function(p){

    let colore = "#BDBDBD";

    if(p.esito=="Vittoria") colore="#2E7D32";

    if(p.esito=="Pareggio") colore="#F9A825";

    if(p.esito=="Sconfitta") colore="#C62828";

    html +=
    '<div class="pallinoForma" style="background:'+colore+'"></div>';

});

document.getElementById("ultime10Pallini").innerHTML = html;

const canvas = document.getElementById("graficoForma");

if(canvas){

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    let valori = [];

    ultime.forEach(function(p){

        if(p.esito=="Vittoria") valori.push(3);

        else if(p.esito=="Pareggio") valori.push(2);

        else valori.push(1);

    });

    const spazio = canvas.width/(valori.length-1);

    ctx.beginPath();

    ctx.lineWidth = 3;

    ctx.strokeStyle = "#1565C0";

    valori.forEach(function(v,i){

        let x = i*spazio;

        let y = canvas.height - (v*18);

        if(i==0){

            ctx.moveTo(x,y);

        }else{

            ctx.lineTo(x,y);

        }

    });

    ctx.stroke();

}

}

// ----------------------------
// PROFILO GIOCATORE
// ----------------------------

function salvaProfilo(){

    localStorage.setItem(
        "nomeGiocatore",
        document.getElementById("nomeGiocatore").value.trim()
    );

   localStorage.setItem(
    "manoDominante",
    document.getElementById("manoDominante").value
);

localStorage.setItem(
    "latoPreferito",
    document.getElementById("latoPreferito").value
);

localStorage.setItem(
    "livelloGioco",
    document.getElementById("livelloGioco").value
);

    // 👇 AGGIUNGI QUESTA RIGA
    caricaFotoProfilo();
const saluto = document.getElementById("salutoHome");

if(saluto){

    const ora = new Date().getHours();

    let testo = "Buongiorno";

    if(ora >= 18){

        testo = "Buonasera";

    }else if(ora >= 12){

        testo = "Buon pomeriggio";

    }

    const nome =
        localStorage.getItem("nomeGiocatore") || "";

    saluto.innerHTML =
        "👋 " + testo + (nome ? " " + nome : "");

}

    alert("✅ Profilo salvato con successo!");

}

// ----------------------------
// CARICA IMPOSTAZIONI
// ----------------------------

function caricaNomeGiocatore(){

    document.getElementById("nomeGiocatore").value =
        localStorage.getItem("nomeGiocatore") || "";

   document.getElementById("manoDominante").value =
    localStorage.getItem("manoDominante") || "Destra";

document.getElementById("latoPreferito").value =
    localStorage.getItem("latoPreferito") || "Destra";

document.getElementById("livelloGioco").value =
    localStorage.getItem("livelloGioco") || "Intermedio";

}

function mostraStelle(voto){

    voto = Number(voto) || 3;

    return "⭐".repeat(voto) + "☆".repeat(5 - voto);

}

function partitaGiocata(partita){

    return (partita.risultato || "").trim() !== "";

}


// ----------------------------
// STELLE TOUCH
// ----------------------------

const stelleTouch = document.querySelectorAll("#stelleTouch span");

stelleTouch.forEach(stella => {

    stella.onclick = function(){

        const voto = Number(this.dataset.voto);

        document.getElementById("stelle").value = voto;

        stelleTouch.forEach(s => s.textContent = "☆");

        for(let i=0;i<voto;i++){

            stelleTouch[i].textContent = "⭐";

        }

    };

});

const fotoProfilo = document.getElementById("fotoProfilo");
const inputFoto = document.getElementById("inputFoto");
const btnFoto = document.getElementById("btnFoto");

// Clic sul pulsante
btnFoto.onclick = function(){

    inputFoto.click();

};

// Scelta della foto
inputFoto.onchange = function(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(){

        localStorage.setItem("fotoProfilo", reader.result);

        fotoProfilo.src = reader.result;

    };

    reader.readAsDataURL(file);

};

function cambiaModalita(){

    const modalita =
        document.querySelector('input[name="modalita"]:checked').value;

    if(modalita=="singolo"){

        document.getElementById("bloccoCompagno").style.display="none";
        document.getElementById("bloccoAvv2").style.display="none";
        document.getElementById("labelAvv1").textContent="Avversario";

    }else{

        document.getElementById("bloccoCompagno").style.display="block";
        document.getElementById("bloccoAvv2").style.display="block";
        document.getElementById("labelAvv1").textContent="Avversario 1";

    }

    aggiornaNomiSet();

}

function aggiornaNomiSet(){

    const mioNome = localStorage.getItem("nomeGiocatore") || "";

    const compagno = document.getElementById("compagno").value.trim();
    const avv1 = document.getElementById("avv1").value.trim();
    const avv2 = document.getElementById("avv2").value.trim();

    const singolo =
        document.querySelector('input[name="modalita"]:checked').value=="singolo";

    let noi = mioNome;

   if(!singolo && compagno){
    noi += "\n" + compagno;
}

    let loro = "";

    if(avv1){
        loro = avv1;
    }

   if(!singolo && avv2){
    loro += "\n" + avv2;
}

    for(let i=1;i<=5;i++){

        document.getElementById("labelNoi"+i).textContent = noi;
        document.getElementById("labelLoro"+i).textContent = loro;

    }

}

function aggiungiSet(){

    if(setVisibili === 3){

        document.getElementById("set4").style.display = "block";

        setVisibili = 4;

        document.getElementById("btnAggiungiSet").innerHTML =
        "➕ Aggiungi 5° set";

        return;

    }

    if(setVisibili === 4){

        document.getElementById("set5").style.display = "block";

        setVisibili = 5;

        document.getElementById("btnAggiungiSet").style.display = "none";

    }

}

function passaAlSuccessivo(event){

    if(event.target.value.length > 0){

        const inputs = document.querySelectorAll(".rigaSet input");

        const indice = Array.from(inputs).indexOf(event.target);

        if(indice < inputs.length-1){

            inputs[indice+1].focus();

        }

    }

}

// Carica la foto salvata
function caricaFotoProfilo(){

    const foto = localStorage.getItem("fotoProfilo");

    let immagine;

    if(foto){

        immagine = foto;

    }else{

        immagine =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
            <circle cx="60" cy="60" r="60" fill="#ECEFF1"/>
            <text x="60" y="76" font-size="60" text-anchor="middle">👤</text>
        </svg>`);

    }

    fotoProfilo.src = immagine;
    document.getElementById("fotoHome").src = immagine;

    const nome = localStorage.getItem("nomeGiocatore") || "";

    const nomeHeader = document.getElementById("nomeHeader");
const sottotitoloHeader = document.getElementById("sottotitoloHeader");

if(nomeHeader){
    nomeHeader.textContent = nome;
}

if(sottotitoloHeader){
    const ora = new Date().getHours();

let saluto = "Ciao";

if(ora < 12){

    saluto = "Buongiorno";

}else if(ora >= 18){

    saluto = "Buonasera";

}

sottotitoloHeader.textContent =
    nome ? saluto + " " + nome + " 👋" : saluto + "!";
}

}

// ----------------------------
// HEADER HOME
// ----------------------------

// ----------------------------
// HEADER HOME
// ----------------------------

const fotoHome = document.getElementById("fotoHome");

if(fotoHome){

    fotoHome.onclick = function(){

        mostraImpostazioni();

    };

}

function apriGiorno(data){

    let partiteGiorno = partite.filter(p => p.data == data);

    if(partiteGiorno.length==0){

        

        mostraNuova();

        document.getElementById("data").value = data;

        return;

    }

    const popup = document.getElementById("popupAgenda");
    const box = document.getElementById("contenutoPopupAgenda");

   let html = `<h2 style="text-align:center;">📅 ${data}</h2>`;

    partiteGiorno.forEach(function(partita,index){
    const indiceOriginale = partite.indexOf(partita);

       let colore = "#1976D2";
let icona = "📅";
let testoEsito = "PROGRAMMATA";

if(partitaGiocata(partita)){

    if(partita.esito=="Vittoria"){
        colore = "#2E7D32";
        icona = "🏆";
        testoEsito = "Vittoria";

    }else if(partita.esito=="Pareggio"){
        colore = "#F9A825";
        icona = "🤝";
        testoEsito = "Pareggio";

    }else{
        colore = "#C62828";
        icona = "❌";
        testoEsito = "Sconfitta";
    }

}

        html += `

<p class="esito"
style="background:${colore};color:white;text-align:center;">

${icona} ${testoEsito}

</p>

<div class="sfida">

    <div class="squadra">

        <b>${localStorage.getItem("nomeGiocatore") || "Io"}</b><br>
        <b>${partita.compagno || "-"}</b>

    </div>

    <div class="vs">

        VS

    </div>

    <div class="squadra">

        <b>${partita.avv1}</b><br>
        <b>${partita.avv2}</b>

    </div>

</div>

<p class="risultato">

${partita.risultato || "-"}

</p>

<p class="stelleUltima">

${mostraStelle(partita.stelle)}

</p>

<div class="footerPartita">

    <div>

        ${partita.circolo ? `
        <div class="circolo">
            🏟 ${partita.circolo}
        </div>
        ` : ""}

        ${(partita.racchetta || partita.scarpe) ? `
        <div class="attrezzatura">
            ${partita.racchetta ? `🎾 ${partita.racchetta}` : ""}
            ${partita.racchetta && partita.scarpe ? "&nbsp;&nbsp;" : ""}
            ${partita.scarpe ? `👟 ${partita.scarpe}` : ""}
        </div>
        ` : ""}

    </div>

    <div class="azioniPartita">
        <button class="btnIcona"
                onclick="modificaPartita(${indiceOriginale})">
            ✏️
        </button>

        ${partitaGiocata(partita) ? `
        <button class="btnIcona"
                onclick="condividiPartita(${indiceOriginale})">
            📤
        </button>
        ` : ""}

        <button class="btnIcona"
                onclick="eliminaPartita(${indiceOriginale})">
            🗑️
        </button>

    </div>

</div>

${partita.note ?

`<p style="margin-top:10px;"><b>📝 Note</b><br>${partita.note}</p>`

: ""}

`;

        if(index < partiteGiorno.length-1){

            html += "<hr style='margin:25px 0;'>";

        }

    });

    box.innerHTML = html;

    popup.style.display="flex";

}

function tornaIndietro(){

    if(schermataPrecedente=="agenda"){

        mostraAgenda();

    }else if(schermataPrecedente=="archivio"){

        mostraArchivio();

    }else{

        mostraHome();

    }

}

function chiudiPopupAgenda(){

    document.getElementById("popupAgenda").style.display="none";

}

function aggiornaAgenda(){

    const mesi = [
        "Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno",
        "Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"
    ];

   document.getElementById("headerCalendario").innerHTML = `

<div class="titoloCalendario">

    <div class="meseNavigazione">

        <span class="btnMese" onclick="mesePrecedente()">◀</span>

        <span class="meseTitolo">🗓 ${mesi[meseCorrente]} ${annoCorrente}</span>

        <span class="btnMese" onclick="meseSuccessivo()">▶</span>

    </div>

    <span class="chiudiAgenda" onclick="mostraHome()">✖</span>

</div>

`;

    const calendario = document.getElementById("calendario");

    calendario.innerHTML = "";

    const giorni = ["L","M","M","G","V","S","D"];

    giorni.forEach(function(g){

        calendario.innerHTML +=
            `<div class="giornoSettimana">${g}</div>`;

    });

// Primo giorno del mese
let primo = new Date(annoCorrente, meseCorrente, 1);

// In JavaScript: Domenica=0 ... Sabato=6
let offset = primo.getDay();

// Noi vogliamo: Lunedì=0 ... Domenica=6
offset = (offset + 6) % 7;

// Celle vuote prima del giorno 1
for(let i=0; i<offset; i++){

    calendario.innerHTML += `<div></div>`;

}

// Numero di giorni del mese
let giorniNelMese =
    new Date(annoCorrente, meseCorrente + 1, 0).getDate();

// Disegna tutti i giorni
for(let giorno=1; giorno<=giorniNelMese; giorno++){

    let data =
    annoCorrente + "-" +
    String(meseCorrente+1).padStart(2,"0") + "-" +
    String(giorno).padStart(2,"0");

let oggi = new Date();

let oggiStringa =
    oggi.getFullYear() + "-" +
    String(oggi.getMonth()+1).padStart(2,"0") + "-" +
    String(oggi.getDate()).padStart(2,"0");

let classe = "giornoCalendario";

if(data == oggiStringa){

    classe = "giornoCalendario oggi";

}

let partiteGiorno = partite.filter(p => p.data == data);

let simbolo = "";

partiteGiorno.slice(0,3).forEach(function(p){

   if(!partitaGiocata(p)){

    simbolo += "📅";

}else if(p.esito=="Vittoria"){

    simbolo += "🟢";

}else if(p.esito=="Pareggio"){

    simbolo += "🟡";

}else if(p.esito=="Sconfitta"){

    simbolo += "🔴";

}

});

if(partiteGiorno.length > 3){

    simbolo += "+";

}

calendario.innerHTML += `

<div class="${classe}"
     onclick="apriGiorno('${data}')">
    <div>${giorno}</div>

    <div>${simbolo}</div>

</div>

`;

}

}

function mesePrecedente(){

    meseCorrente--;

    if(meseCorrente < 0){

        meseCorrente = 11;

        annoCorrente--;

    }

    aggiornaAgenda();

}

function meseSuccessivo(){

    meseCorrente++;

    if(meseCorrente > 11){

        meseCorrente = 0;

        annoCorrente++;

    }

    aggiornaAgenda();

}

function aggiornaRisultato(){

    let risultato = "";

    let setVinti = 0;
    let setPersi = 0;

    for(let i=1;i<=5;i++){

        let io = document.getElementById("io"+i).value;
        let avv = document.getElementById("avvSet"+i).value;

        if(io!=="" && avv!==""){

            risultato += io + "-" + avv + " ";

            if(parseInt(io) > parseInt(avv)){

                setVinti++;

            }else if(parseInt(io) < parseInt(avv)){

                setPersi++;

            }

        }

    }

    document.getElementById("risultato").value = risultato.trim();

   if(risultato.trim() === ""){

    document.getElementById("esito").value = "";

}else if(setVinti > setPersi){

    document.getElementById("esito").value = "Vittoria";

}else if(setPersi > setVinti){

    document.getElementById("esito").value = "Sconfitta";

}else{

    document.getElementById("esito").value = "Pareggio";

}

}

function apriStatistica(nome){

    document.getElementById("popupStatistica").style.display="flex";

    switch(nome){

        case "migliorCompagno":
        case "classificaCompagni":
        case "compagni":

    popupCompagni();

    break;

        case "classificaAvversari":

            popupAvversari();

            break;

case "statAttrezzatura":

    popupAttrezzatura();

    break;

case "migliorCircolo":

    popupCircoli();

    break;

case "rendimento":

    popupRendimento();

    break;

case "recordPersonali":

    popupRecord();

    break;

case "statTipoPartita":

    popupTipoPartita();

    break;

case "ultimi30giorni":

    popupUltimi30Giorni();

    break;

case "statisticheCampo":

    popupCampo();

    break;

case "ultimePartiteGrafico":

    popupUltimePartite();

    break;

case "giocatori":

    popupGiocatori();

    break;

        default:

            document.getElementById("titoloPopup").innerHTML="Statistiche";

            document.getElementById("contenutoPopup").innerHTML="<p>In costruzione...</p>";

    }

}

function popupCompagni(){

    aggiornaMigliorCompagno();
    aggiornaClassificaCompagni();

    document.getElementById("titoloPopup").innerHTML="👥 Compagni";


    document.getElementById("contenutoPopup").innerHTML=`

        <div class="miniCard">

            ${document.getElementById("migliorCompagno").innerHTML}

        </div>

        <div class="miniCard">

            ${document.getElementById("classificaCompagni").innerHTML}

        </div>

    `;

}

function popupAvversari(){

    aggiornaClassificaAvversari();

    document.getElementById("titoloPopup").innerHTML="😈 Avversari";

    document.getElementById("contenutoPopup").innerHTML=`

        <div class="miniCard">

            <h3>😈 Avversari più difficili</h3>

            ${document.getElementById("classificaAvversari").innerHTML}

        </div>

    `;

}

function popupAttrezzatura(){

    aggiornaStatisticheAttrezzatura();

    document.getElementById("titoloPopup").innerHTML="🎾 Attrezzatura";

    document.getElementById("contenutoPopup").innerHTML=`

        <div class="miniCard">

            ${document.getElementById("statAttrezzatura").innerHTML}

        </div>

    `;

}

function popupCircoli(){

    aggiornaMigliorCircolo();

    document.getElementById("titoloPopup").innerHTML="🏟️ Circoli";

    document.getElementById("contenutoPopup").innerHTML=`

        <div class="miniCard">

            <h3>🏟️ Miglior Circolo</h3>

            ${document.getElementById("migliorCircolo").innerHTML}

        </div>

    `;

}

function popupRendimento(){

    aggiornaRendimento();

    document.getElementById("titoloPopup").innerHTML="📈 Rendimento";

    document.getElementById("contenutoPopup").innerHTML=`

        <div class="miniCard">

            <h3>📈 Stato di forma</h3>

            ${document.getElementById("rendimento").innerHTML}

        </div>

    `;

}

function popupRecord(){

    aggiornaRecordPersonali();

    document.getElementById("titoloPopup").innerHTML="🔥 Record Personali";

    document.getElementById("contenutoPopup").innerHTML=`

        <div class="miniCard">

            <h3>🏆 I miei record</h3>

            ${document.getElementById("recordPersonali").innerHTML}

        </div>

    `;

}

function popupTipoPartita(){

    aggiornaStatisticheTipoPartita();

    document.getElementById("titoloPopup").innerHTML="📊 Tipo di Partita";

    document.getElementById("contenutoPopup").innerHTML=`

        <div class="miniCard">

            <h3>📊 Statistiche per tipo</h3>

            ${document.getElementById("statTipoPartita").innerHTML}

        </div>

    `;

}

function popupUltimi30Giorni(){

    aggiornaUltimi30Giorni();

    document.getElementById("titoloPopup").innerHTML="📅 Ultimi 30 giorni";

    document.getElementById("contenutoPopup").innerHTML=`

        <div class="miniCard">

            <h3>📅 Attività recente</h3>

            ${document.getElementById("ultimi30giorni").innerHTML}

        </div>

    `;

}

function popupCampo(){

    aggiornaStatisticheCampo();

    document.getElementById("titoloPopup").innerHTML="🏠 Indoor / Outdoor";

    document.getElementById("contenutoPopup").innerHTML=`

        <div class="miniCard">

            <h3>🏠 Confronto Indoor / Outdoor</h3>

            ${document.getElementById("statisticheCampo").innerHTML}

        </div>

    `;

}

function apriPopupPeriodo(){

    document.getElementById("popupPeriodo").style.display="flex";

}

function chiudiPopupPeriodo(){

    document.getElementById("popupPeriodo").style.display="none";

}

function popupUltimePartite(){

    aggiornaUltimePartite();

    document.getElementById("titoloPopup").innerHTML="📈 Ultime 10 partite";

    document.getElementById("contenutoPopup").innerHTML=`

        <div class="miniCard">

            <h3>📈 Andamento recente</h3>

            ${document.getElementById("ultimePartiteGrafico").innerHTML}

            <hr style="margin:20px 0;">

            <p>
                🟢 Vittoria &nbsp;&nbsp;
                🟡 Pareggio &nbsp;&nbsp;
                🔴 Sconfitta
            </p>

        </div>

    `;

}

function popupGiocatori(){

    aggiornaStatisticheGiocatori();

    document.getElementById("titoloPopup").innerHTML="👥 Giocatori";

    document.getElementById("contenutoPopup").innerHTML=`

        <div class="miniCard">

            <h3>👥 Tutti i giocatori</h3>

            <input
                type="text"
                id="ricercaGiocatorePopup"
                placeholder="🔍 Cerca un giocatore..."
                onkeyup="filtraGiocatoriPopup()"
            >

           <div id="listaGiocatoriPopup">

    ${aggiornaStatisticheGiocatori()}

</div>

        </div>

    `;

}

function filtraGiocatoriPopup(){

    document.getElementById("listaGiocatoriPopup").innerHTML =
        aggiornaStatisticheGiocatori();

}

function chiudiPopup(){

    document.getElementById("popupStatistica").style.display="none";

}

document.querySelectorAll(".periodo").forEach(function(btn){

    btn.onclick = function(){

        if(this.id=="btnPeriodoPersonalizzato"){

            apriPopupPeriodo();

            return;

        }

        document.querySelectorAll(".periodo").forEach(function(b){

            b.classList.remove("attivo");

        });

        this.classList.add("attivo");

        document.getElementById("btnPeriodoPersonalizzato").innerHTML =
            "📅 Periodo";

        periodoDashboard = this.dataset.periodo;

        dataInizioPeriodo = null;
        dataFinePeriodo = null;

        aggiornaDashboard();

    };

});

document.getElementById("btnApplicaPeriodo").onclick = function(){

    const inizio = document.getElementById("dataInizio").value;
    const fine = document.getElementById("dataFine").value;

    if(!inizio || !fine){

        alert("Seleziona sia la data di inizio che quella di fine.");

        return;

    }

    dataInizioPeriodo = new Date(inizio);
    dataFinePeriodo = new Date(fine);
    dataFinePeriodo.setHours(23,59,59,999);

    periodoDashboard = "personalizzato";

    document.querySelectorAll(".periodo").forEach(function(b){

        b.classList.remove("attivo");

    });

    const btnPeriodo = document.getElementById("btnPeriodoPersonalizzato");

    btnPeriodo.classList.add("attivo");

    const dataDa =
        String(dataInizioPeriodo.getDate()).padStart(2,"0") + "/" +
        String(dataInizioPeriodo.getMonth()+1).padStart(2,"0") + "/" +
        String(dataInizioPeriodo.getFullYear()).slice(-2);

    const dataA =
        String(dataFinePeriodo.getDate()).padStart(2,"0") + "/" +
        String(dataFinePeriodo.getMonth()+1).padStart(2,"0") + "/" +
        String(dataFinePeriodo.getFullYear()).slice(-2);

    btnPeriodo.innerHTML = "📅 " + dataDa.substring(0,5) + "–" + dataA.substring(0,5);

    aggiornaDashboard();

    chiudiPopupPeriodo();

};

document.getElementById("btnAzzeraPeriodo").onclick = function(){

    document.getElementById("dataInizio").value = "";
    document.getElementById("dataFine").value = "";

    dataInizioPeriodo = null;
    dataFinePeriodo = null;

    document.querySelectorAll(".periodo").forEach(function(b){

        b.classList.remove("attivo");

    });

    document.querySelector('[data-periodo="1mese"]').classList.add("attivo");

    document.getElementById("btnPeriodoPersonalizzato").innerHTML =
        "📅 Periodo";

    periodoDashboard = "1mese";

    aggiornaDashboard();

   

};    
// ----------------------------
// AVVIO APP
// ----------------------------

caricaNomeGiocatore();

caricaFotoProfilo();

aggiornaTutto();

cambiaModalita();

mostraHome();

const menuGioco = document.getElementById("menuGioco");

const overlayMenu = document.getElementById("overlayMenu");

const menuSistema = document.getElementById("menuSistema");

const overlaySistema = document.getElementById("overlaySistema");

function chiudiMenuSistema(){

    menuSistema.classList.remove("aperto");

    overlaySistema.classList.remove("aperto");

}

overlayMenu.onclick = chiudiMenuGioco;

overlaySistema.onclick = chiudiMenuSistema;

document.getElementById("btnAltro").onclick = function(){

    menuGioco.classList.add("aperto");

    overlayMenu.classList.add("aperto");

}

document.getElementById("btnSistema").onclick = function(){

    menuSistema.classList.add("aperto");

    overlaySistema.classList.add("aperto");

}

document.getElementById("chiudiMenuGioco").onclick = chiudiMenuGioco;

document.getElementById("chiudiMenuSistema").onclick = chiudiMenuSistema;


document.getElementById("btnArchivioMenu").onclick = function(){

    chiudiMenuGioco();

    mostraArchivio();

}

document.getElementById("btnStatisticheMenu").onclick = function(){

    chiudiMenuGioco();

    mostraStatistiche();

}

document.getElementById("btnValoriMenu").onclick = function(){

    chiudiMenuGioco();

    mostraValoriIniziali();

}

document.getElementById("btnRecordMenu").onclick = function(){

    chiudiMenuGioco();

    apriStatistica("recordPersonali");

}

document.getElementById("btnGiocatoriMenu").onclick = function(){

    chiudiMenuGioco();

    apriStatistica("giocatori");

}

document.getElementById("btnCircoliMenu").onclick = function(){

    chiudiMenuGioco();

    apriStatistica("migliorCircolo");

}

document.getElementById("btnAttrezzaturaMenu").onclick = function(){

    chiudiMenuGioco();

    apriStatistica("statAttrezzatura");

}

document.getElementById("btnProfiloMenu").onclick = function(){

    chiudiMenuSistema();

    mostraImpostazioni();

}

document.getElementById("btnImpostazioniMenu").onclick = function(){

    chiudiMenuSistema();

    mostraImpostazioniApp();

}

document.getElementById("btnBackupMenu").onclick = function(){

    chiudiMenuSistema();

    mostraBackup();

}

document.getElementById("btnInfoMenu").onclick = function(){

    chiudiMenuSistema();

    mostraInformazioni();

}

// ============================
// TEMA CHIARO / SCURO
// ============================

function cambiaTema(tema){

    document.body.classList.remove("temaScuro");

    if(tema=="scuro"){

        document.body.classList.add("temaScuro");

    }

    localStorage.setItem("tema",tema);

}

function caricaTema(){

    const tema = localStorage.getItem("tema") || "chiaro";

    cambiaTema(tema);

    const radio = document.querySelector(
        'input[name="tema"][value="'+tema+'"]'
    );

    if(radio){

        radio.checked = true;

    }

}

function caricaColore(){

    const colore = localStorage.getItem("coloreApp");

    if(!colore) return;

    cambiaColore(colore);

    document.querySelectorAll(".colorBtn").forEach(function(btn){

        btn.classList.remove("attivo");

        if(btn.dataset.color===colore){

            btn.classList.add("attivo");

        }

    });

}

document.querySelectorAll('input[name="tema"]').forEach(function(radio){

    radio.onchange = function(){

        cambiaTema(this.value);

    };

});

caricaTema();
caricaColore();

// ============================
// COLORE APP
// ============================

function cambiaColore(colore){

    document.documentElement.style.setProperty("--primary", colore);

    let accent = colore;
    let hover = colore;

    switch(colore){

        case "#1565C0":

            accent="#7EB6FF";
            hover="#0D47A1";

            break;

        case "#2E7D32":

            accent="#66BB6A";
            hover="#1B5E20";

            break;

        case "#6A1B9A":

            accent="#BA68C8";
            hover="#4A148C";

            break;

        case "#C62828":

            accent="#EF5350";
            hover="#8E0000";

            break;

        case "#EF6C00":

            accent="#FFB74D";
            hover="#E65100";

            break;

    }

    document.documentElement.style.setProperty("--primary-hover", hover);

    document.documentElement.style.setProperty("--accent", accent);

    document.documentElement.style.setProperty("--accent-hover", accent);

    localStorage.setItem("coloreApp", colore);

}

// ============================
// COLOR PICKER
// ============================

document.querySelectorAll(".colorBtn").forEach(function(btn){

    btn.addEventListener("click", function(){

        cambiaColore(this.dataset.color);

        document.querySelectorAll(".colorBtn").forEach(function(b){

            b.classList.remove("attivo");

        });

        this.classList.add("attivo");

    });

});

function condividiUltimaPartita(){

    if(partite.length===0){

        alert("Non ci sono partite da condividere.");

        return;

    }

    const p = partite[partite.length-1];

  const testo = `🎾 PADEL STATS

🏆 ${p.esito.toUpperCase()}

👤 Compagno
${p.compagno}

⚔️ Avversari
${p.avv1} - ${p.avv2}

🎾 Risultato
${p.risultato}

📍 Circolo
${p.circolo}

📅 Data
${p.data}

⭐ Voto partita
${p.stelle || "-"}/5

━━━━━━━━━━━━━━━━━━

📲 Registrata con Padel Stats`;

  if (/Android|iPhone|iPad/i.test(navigator.userAgent) && navigator.share) {

    navigator.share({
        title: "Padel Stats",
        text: testo
    });

} else {

    navigator.clipboard.writeText(testo);

    alert("✅ Testo copiato negli appunti.\n\nIncollalo su WhatsApp, Outlook o dove preferisci.");

}

}

const btnCondividi = document.getElementById("btnCondividi");

if(btnCondividi){

    btnCondividi.addEventListener("click", testCardCondivisione);

}

function preparaCardCondivisione(partita){

   document.getElementById("shareData").textContent =
    "📅 " + (partita.data || "");

    const esito = document.getElementById("shareEsito");

    if(partita.esito === "Vittoria"){

        esito.textContent = "🏆 VITTORIA";
        esito.style.background = "#2E7D32";

    }else if(partita.esito === "Pareggio"){

        esito.textContent = "🤝 PAREGGIO";
        esito.style.background = "#F9A825";

    }else{

        esito.textContent = "❌ SCONFITTA";
        esito.style.background = "#C62828";

    }

    document.getElementById("shareGiocatore").textContent =
        localStorage.getItem("nomeGiocatore") || "Giocatore";

    document.getElementById("shareCompagno").textContent =
        partita.compagno || "";

    document.getElementById("shareAvv1").textContent =
        partita.avv1 || "";

    document.getElementById("shareAvv2").textContent =
        partita.avv2 || "";

    document.getElementById("shareRisultato").textContent =
        partita.risultato || "";

    const boxCircolo = document.getElementById("shareCircoloBox");

    if(partita.circolo){

        boxCircolo.style.display = "block";
        document.getElementById("shareCircolo").textContent =
            partita.circolo;

    }else{

        boxCircolo.style.display = "none";

    }

}

async function testCardCondivisione(){



    const giocate = partite
    .filter(partitaGiocata)
    .slice()
    .sort((a, b) => b.data.localeCompare(a.data));

const partita = giocate[0];

    if(!partita){

        alert("Nessuna partita presente.");

        return;

    }

    preparaCardCondivisione(partita);

    const card = document.getElementById("shareCard");

    card.style.left = "20px";

    const canvas = await html2canvas(card, {
    scale: 2,
    backgroundColor: null,
    useCORS: true
});

    card.style.left = "-9999px";

  const blob = await new Promise(resolve =>
    canvas.toBlob(resolve, "image/png")
);

// PC → scarica il file
if(!/Android|iPhone|iPad/i.test(navigator.userAgent)){

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = `PadelStats_${partita.data}_${partita.esito || "Programmata"}.png`;

    link.click();

    return;

}

// Telefono → condivisione
const file = new File(
    [blob],
    "PadelStats.png",
    { type: "image/png" }
);

await navigator.share({
    title: "Padel Stats",
    text: "🎾 La mia ultima partita",
    files: [file]
});

}

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker.register("service-worker.js")
            .then(function () {
                console.log("Service Worker registrato");
            })
            .catch(function (errore) {
                console.log("Errore Service Worker:", errore);
            });

    });

}

async function condividiPartita(indice){

    const partita = partite[indice];

    if(!partita){

        alert("Nessuna partita presente.");

        return;

    }

    preparaCardCondivisione(partita);

    const card = document.getElementById("shareCard");

    card.style.left = "20px";

    const canvas = await html2canvas(card,{
        scale:2,
        backgroundColor:null,
        useCORS:true
    });

    card.style.left = "-9999px";

    const blob = await new Promise(resolve =>
        canvas.toBlob(resolve,"image/png")
    );

    // PC → scarica il PNG
    if(!/Android|iPhone|iPad/i.test(navigator.userAgent)){

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);

        link.download = `PadelStats_${partita.data}_${partita.esito || "Programmata"}.png`;

        link.click();

        return;

    }

    // Telefono → condividi
    const file = new File(
        [blob],
        "PadelStats.png",
        {type:"image/png"}
    );

    await navigator.share({
        title:"Padel Stats",
        text:"🎾 La mia partita",
        files:[file]
    });

}

