/**
 * EXEMPLES À EXÉCUTER DANS LA CONSOLE DU NAVIGATEUR (F12 → Console)
 * Copie-colle chaque bloc pendant la démo.
 * ================================================================
 */

// ========== DÉMO MAGIE (Introduction) ==========

document.body.style.backgroundColor = 'pink';

document.querySelector('h1').textContent = 'Je contrôle cette page !';


// ========== CONSOLE.LOG ==========

console.log('Hello world!');


// ========== VARIABLES ==========

let compteur = 0;
console.log(compteur);

compteur = 5;
console.log(compteur);

const pi = 3.14;
console.log(pi);

// pi = 3.15;  // ❌ Décommente pour montrer l'erreur : const ne peut pas être modifié


// ========== SÉLECTIONNER UN ÉLÉMENT DU DOM ==========

let affichageCompteur = document.querySelector('#compteur');
console.log(affichageCompteur);


// ========== MODIFIER LE CONTENU ==========

compteur = 42;
affichageCompteur.textContent = compteur;


// ========== AUTRES MANIPULATIONS UTILES ==========

// Changer la couleur du compteur
affichageCompteur.style.color = 'red';

// Changer la taille
affichageCompteur.style.fontSize = '120px';

// Masquer un élément
document.querySelector('p').style.display = 'none';

// Réafficher
document.querySelector('p').style.display = 'block';
