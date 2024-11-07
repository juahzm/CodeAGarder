// @ts-ignore
import { expect, test } from "https://maxime-pigeon.github.io/t/test.js";

/**Definir des constantes dans la porte global */

const heart = 1, diamont = 2, club = 3, spade = 4; /*enseigne*/

/*declarer des types pour la carte et le paquet*/

type carte = { sorte: number, enseigne: number };
type paquet = carte[];

/*Une fonction pour créer un paquet des cartes */

function unpaquetcartes(): paquet {
    let tableau_cartes: carte[] = [];
    for (let enseigne = 1; enseigne <= 4; enseigne++) {
        for (let sorte = 1; sorte <= 13; sorte++) {
            tableau_cartes.push({ sorte, enseigne });
        }
    };
    return tableau_cartes;
};


/*Une fonction pour créer un paquet des cartes avec le pointage correct*/

function unpaquetcartespointage(): paquet {

    let tableau_cartespointage = unpaquetcartes();
    tableau_cartespointage.forEach(carte => {
        if (carte.sorte === 13 || carte.sorte === 12 || carte.sorte === 11) { carte.sorte = 10; }
        if (carte.sorte === 1) { carte.sorte = 11; }
    });
    return tableau_cartespointage;
}

/*Une function pour avoir un idex entre 0 et 51*/

function randomindexpaquet(): number {

    const paquet = unpaquetcartespointage()
    const min = 0;
    const max = paquet.length - 1;
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

/*Une function qui melange le paquet en utilisant swap et l'index de la function randonindexpaquet */

function paquetMelange(): paquet {

    let paquet = unpaquetcartespointage();
    for (let i = paquet.length - 1; i >= 0; i--) {

        const frontIndex = randomindexpaquet();
        const backIndex = i;
        paquet[frontIndex] = paquet[backIndex];
        paquet[backIndex] = paquet[frontIndex];
    }
    return paquet;
}

/*Declarer le type pour l'etat*/

type etat = { paquetcartes: paquet; jouer: carte[]; banque: carte[] };


/*Une fonction qui donne une carte au jouer*/

function donnercarte(etat: etat): etat {

    const card = etat.paquetcartes[0];
    const paquet = etat.paquetcartes.slice(1);
    etat.jouer = etat.jouer.concat(card);
    return { paquetcartes: paquet, jouer: etat.jouer, banque: etat.banque };

};

let etatactuel = { paquetcartes: paquetMelange(), jouer: [], banque: [] };

console.log(donnercarte(etatactuel));

// test("Determiner l'etat1", () => {
//     const p = etatactuel.jouer;
//     const actual = donnercarte(etatactuel).jouer;
//     const expected = p;
//     expect(actual).toBe(expected);
// });

/*Une fonction qui donne une deuxième carte au jouer*/


function donnerDeuxiemecarte(etat: etat): etat {

    const card = etat.paquetcartes[1];
    etat.paquetcartes = etat.paquetcartes.slice(2);
    etat.jouer = etat.jouer.concat(card);
    return { paquetcartes: etat.paquetcartes, jouer: etat.jouer, banque: etat.banque };

};

let etatactuel2 = { paquetcartes: etatactuel.paquetcartes.slice(2), jouer: [etatactuel.jouer[0]], banque: [] };

console.log(donnerDeuxiemecarte(etatactuel2));

// test("Determiner l'etat2", () => {
//     const p = etatactuel2.jouer;
//     const actual = donnerDeuxiemecarte(etatactuel).jouer;
//     const expected = p;
//     expect(actual).toBe(expected);
// });


/*Une fonction qui donne une carte à la banque*/

function donnerCarte1banque(etat: etat): etat {

    const card = etat.paquetcartes[2];
    etat.paquetcartes = etat.paquetcartes.slice(3);
    etat.banque = etat.banque.concat(card);
    return { paquetcartes: etat.paquetcartes, jouer: etat.jouer, banque: etat.banque };
};

let etatactuel3 = { paquetcartes: etatactuel.paquetcartes.slice(3), jouer: [etatactuel.jouer[0], etatactuel2.jouer[1]], banque: [] };
console.log(donnerCarte1banque(etatactuel3));

// test("Determiner l'etat3", () => {
//     const p = etatactuel3.banque;
//     const actual = donnerCarte1banque(etatactuel2).banque;
//     const expected = p;
//     expect(actual).toBe(expected);
// });


/*Une fonction qui donne une deuxième carte à la banque*/

function donnerCarte2banque(etat: etat): etat {

    const card = etat.paquetcartes[3];
    etat.paquetcartes = etat.paquetcartes.slice(4);
    etat.banque = etat.banque.concat(card);
    return { paquetcartes: etat.paquetcartes, jouer: etat.jouer, banque: etat.banque };
};

let etatactuel4 = { paquetcartes: etatactuel.paquetcartes.slice(4), jouer: [etatactuel.jouer[0], etatactuel2.jouer[1]], banque: [etatactuel3.banque[0]] };
console.log(donnerCarte2banque(etatactuel4));


// test("Determiner l'etat4", () => {
//     const p = etatactuel4.banque;
//     const actual = donnerCarte2banque(etatactuel3).banque;
//     const expected = p;
//     expect(actual).toBe(expected);
// });


/*Une fonction qui calcule la valeur d'une main pour le jouer*/

function valeurMainjoueur(etat: etat): number {

    let total = 0;
    for (const carte of etat.jouer) {
        total += carte.sorte;
    }
    return total;
};

let etatpourcalcule = etatactuel4;
console.log(valeurMainjoueur(etatpourcalcule));

// test("Calculer la valeur d'une main du jouer", () => {

//     const actual = valeurMainjoueur(etatactuel4);
//     const expected = 16;
//     expect(actual).toBe(expected);
// });

/*Une fonction qui calcule la valeur d'une main pour la banque*/

function valeurMainbanque(etat: etat): number {

    let total = 0;
    for (const carte of etat.banque) {
        total += carte.sorte;
    }
    return total;
};

let etatpourcalculeb = etatactuel4;
console.log(valeurMainbanque(etatpourcalculeb));

// test("Calculer la valeur d'une main de la banque", () => {

//     const actual = valeurMainbanque(etatactuel4);
//     const expected = 8;
//     expect(actual).toBe(expected);
// });

/*Une fonction qui determine le gagnant*/


function quiGagne(): string {

    let pointageJoueur = valeurMainjoueur(etatpourcalcule);
    let pointageBanque = valeurMainbanque(etatpourcalculeb);

    if (pointageJoueur > 21) { return `Le pointage de joueur est: ${valeurMainjoueur(etatpourcalcule)}: Le pointage de la banque est: ${valeurMainbanque(etatpourcalculeb)}. \nLa banque gagne avec ${pointageBanque} points.`; }
    if (pointageBanque > 21) { return `Le pointage de joueur est: ${valeurMainjoueur(etatpourcalcule)}: Le pointage de la banque est: ${valeurMainbanque(etatpourcalculeb)}.\nLe joueur gagne avec ${pointageJoueur} points.`; }

    if (pointageJoueur > pointageBanque) { return `Le pointage de joueur est: ${valeurMainjoueur(etatpourcalcule)}: Le pointage de la banque est: ${valeurMainbanque(etatpourcalculeb)}. \nLe gagant est le joueur avec ${pointageJoueur} points.`; }
    else if (pointageJoueur < pointageBanque) { return `Le pointage de joueur est: ${valeurMainjoueur(etatpourcalcule)}: Le pointage de la banque est: ${valeurMainbanque(etatpourcalculeb)}. \nLa banque gagne avec ${pointageBanque} points.`; }
    else { return `Le pointage de joueur est: ${valeurMainjoueur(etatpourcalcule)}: Le pointage de la banque est: ${valeurMainbanque(etatpourcalculeb)}. \nC'est une égalité avec ${pointageJoueur} points.` }
};



/*Une fonction qui dit à l'utilisateur la première carte qui à été donné*/

function quellecartejoueur1(etat: etat): string {

    let answer = "";
    for (const carte of etat.jouer) {
        let sorte = String(carte.sorte);
        if (carte.sorte === 1) sorte = "As";
        if (carte.sorte === 11) sorte = "Valets";
        if (carte.sorte === 12) sorte = "Dames";
        if (carte.sorte === 13) sorte = "Rois";
        let enseigne = "";
        if (carte.enseigne === heart) enseigne = "Coeur";
        if (carte.enseigne === diamont) enseigne = "Carreau";
        if (carte.enseigne === club) enseigne = "Trèfle";
        if (carte.enseigne === spade) enseigne = "Pique";
        answer = `une ${sorte} de ${enseigne}`;
    }
    return answer;
};

let etattypecarte = etatactuel;

// test("Montrer le type de carte sorte et enseigne 1", () => {

//     const actual = quellecartejoueur1(etatactuel4);
//     const expected = "Une As de Trèfle";
//     expect(actual).toBe(expected);
// });


/*Une fonction qui dit à l'utilisateur la deuxième carte qui à été donné*/


function quellecartejoueur2(etat: etat): string {

    let answer = "";
    for (const carte of etat.jouer) {
        let sorte = String(carte.sorte);
        if (carte.sorte === 1) sorte = "As";
        if (carte.sorte === 11) sorte = "Valets";
        if (carte.sorte === 12) sorte = "Dames";
        if (carte.sorte === 13) sorte = "Rois";
        let enseigne = "";
        if (carte.enseigne === heart) enseigne = "Coeur";
        if (carte.enseigne === diamont) enseigne = "Carreau";
        if (carte.enseigne === club) enseigne = "Trèfle";
        if (carte.enseigne === spade) enseigne = "Pique";
        answer = `une ${sorte} de ${enseigne}`;
    }
    return answer;
};

let etattypecarte2 = etatactuel2;


// test("Montrer le type de carte sorte et enseigne 2", () => {

//     const actual = quellecartejoueur2(etatactuel4);
//     const expected = "une 7 de Coeur";
//     expect(actual).toBe(expected);
// });



/*Une fonction main*/


function main(): void {

    let continuer = true;

    while (continuer) {
        const p = prompt("Tapez cartes pour demander deux cartes.");
        const card1 = quellecartejoueur1(etattypecarte);
        const card2 = quellecartejoueur2(etattypecarte2);
        if (p === "cartes") {
            continuer = false;
        }
        console.log(`Voici vos cartes: ${card1} et ${card2} `);
    };
    console.log(quiGagne());
}

console.log(main());