import React from 'react';
import { Deck, Text, Box, ListItem, UnorderedList, Notes } from 'spectacle';
import {
  MiraTitleSlide,
  MiraContentSlide,
  MiraCodePane,
  MiraTable,
  CodeSlide,
  CodePreviewConsoleSlide,
  CodeAndPreviewSlide,
  PreviewSlide,
} from '../components';
import { MiraDeckTemplate } from '../components/MiraDeckTemplate';
import { miraTheme } from '../components/theme';
import { defaultTheme } from 'spectacle';

const theme = {
  ...defaultTheme,
  colors: { ...defaultTheme.colors, ...miraTheme.colors },
  fonts: miraTheme.fonts,
  fontSizes: miraTheme.fontSizes,
};

const noTransition = {
  from: { opacity: 1, transform: 'translateX(0)' },
  enter: { opacity: 1, transform: 'translateX(0)' },
  leave: { opacity: 1, transform: 'translateX(0)' },
};

// --- Section 2: Setup & Console ---
const linkScriptHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma page</title>
  <script src="script.js"></script>
</head>
<body>

</body>
</html>`;

const consoleSnippet = `console.log('Bonjour !');
console.log(2 + 2);`;

// --- Section 3: Variables ---
const variablesLet = `let prenom = 'Alice';
let age = 25;`;

const letModifiable = `let score = 0;
console.log(score);  // 0

score = 10;
console.log(score);  // 10`;

const constCode = `const PI = 3.14159;
const API_URL = 'https://api.exemple.com';

PI = 3.14;  // ❌ ERREUR !`;

const constMajusculesCode = `// Constantes « vraies » (jamais modifiées) → MAJUSCULES
const PI = 3.14159;
const MAX_SCORE = 100;
const API_URL = 'https://api.exemple.com';

// Convention : UPPER_SNAKE_CASE (majuscules + underscores)`;

const varCode = `var nom = 'Bob';
// Ancien JS (avant 2015)`;

const varPourquoiEviter = `// var : scope « fonction » → la variable FUIT hors du bloc
if (true) {
  var x = 10;
}
console.log(x);  // 10 ! (x existe encore en dehors)

// let : scope « bloc » → la variable reste DANS le bloc
if (true) {
  let y = 10;
}
console.log(y);  // ReferenceError ! (y n'existe pas ici)

// Hoisting : var existe avant sa déclaration
console.log(z);  // undefined (pas d'erreur !)
var z = 5;`;

const nommageCode = `let prenomUtilisateur = 'Alice';`;

// --- Section 4: Types ---
const nombresCode = `let age = 25;
let prix = 19.99;
let temperature = -5;`;

const chainesCode = `let prenom = 'Alice';
let nom = "Dupont";`;

const templateCode = `let prenom = 'Alice';
let age = 25;

let message = \`Je m'appelle \${prenom} et j'ai \${age} ans.\`;
console.log(message);`;

const booleensCode = `let isConnected = true;
let hasPermission = false;`;

const tableauxCode = `let fruits = ['Pomme', 'Banane', 'Orange'];

console.log(fruits[0]);  // 'Pomme'
console.log(fruits[1]);  // 'Banane'
console.log(fruits[2]);  // 'Orange'
console.log(fruits.length);  // 3`;

const objetsCode = `let personne = {
    prenom: 'Alice',
    age: 25,
    ville: 'Paris'
};

console.log(personne.prenom);  // 'Alice'
console.log(personne['age']);  // 25`;

// --- Section 5: Opérateurs ---
const arithmCode = `let a = 10;
let b = 3;

console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.333...
console.log(a % b);  // 1 (reste)`;

const comparaisonCode = `let x = 5;

x == 5     // true (valeur)
x == '5'   // true (conversion ⚠️)

x === 5    // true (valeur ET type)
x === '5'  // false (types différents)

// WTFJS:
"b" + "a" + + "a" + "a";  // ????

// Utilise TOUJOURS === et !== !`;

const logiquesCode = `let age = 20;
let hasLicense = true;
let jour = 'samedi';
let isConnected = true;

console.log(age >= 18 && hasLicense); // true

console.log(jour === 'samedi' || jour === 'dimanche'); // true

console.log(!isConnected); // false

console.log(!!isConnected); // ???`;

// --- Section 6: Conditions ---
const ifCode = `let age = 20;

if (age >= 18) {
    console.log('Majeur');
}`;

const elseCode = `let age = 16;

if (age >= 18) {
    console.log('Majeur');
} else {
    console.log('Mineur');
}`;

const elseIfCode = `let note = 15;

if (note >= 16) {
    console.log('Très bien');
} else if (note >= 12) {
    console.log('Bien');
} else if (note >= 10) {
    console.log('Passable');
} else {
    console.log('Insuffisant');
}`;

// --- Section 7: Boucles ---
const forCode = `for (let i = 0; i < 5; i++) {
    console.log(i);
}
// 0, 1, 2, 3, 4`;

const whileCode = `let compteur = 0;

while (compteur < 3) {
    console.log(compteur);
    compteur++;
}
// 0, 1, 2`;

const forEachCode = `let fruits = ['Pomme', 'Banane', 'Orange'];

fruits.forEach(function(fruit) {
    console.log(fruit);
});
// Pomme, Banane, Orange`;

const mapCode = `let nombres = [1, 2, 3, 4, 5];

let doubles = nombres.map(function(n) {
    return n * 2;
});
console.log(doubles);  // [2, 4, 6, 8, 10]`;

const mapVsForEachCode = `let numbers = [1, 2, 3];
// map → nouveau tableau
numbers.map(n => n * 2).map(n => n * 2) 

// forEach → pas de retour
numbers.forEach(n => console.log(n));`;

const filterCode = `let nombres = [1, 2, 3, 4, 5];

let pairs = nombres.filter(function(n) {
    return n % 2 === 0;
});
console.log(pairs);  // [2, 4]`;

const findCode = `let fruits = ['Pomme', 'Banane', 'Orange'];

let result = fruits.find(function(fruit) {
    return fruit === 'Banane';
});
console.log(result);  // 'Banane'`;

const nullVsUndefinedCode = `// undefined = « pas de valeur » (JS l'assigne automatiquement)
let x;
console.log(x);  // undefined

let fruits = ['Pomme', 'Banane'];
let result = fruits.find(f => f === 'Cerise');
console.log(result);  // undefined (aucun élément trouvé)

// null = « valeur intentionnellement vide »
let user = null;  // Pas d'utilisateur connecté

// Vérifier avant d'utiliser
if (result !== undefined && result !== null) {
    console.log(result);
}`;

const tryCatchCode = `try {
    let data = JSON.parse('texte invalide');  // Lance une erreur
} catch (erreur) {
    console.log('Erreur attrapée :', erreur.message);
}
// Le programme continue au lieu de planter`;

// --- Section 8: Fonctions ---
const fonctionCode = `function direBonjour() {
    console.log('Bonjour !');
}

direBonjour();  // 'Bonjour !'`;

const fonctionParams = `function direBonjour(prenom) {
    console.log(\`Bonjour \${prenom} !\`);
}

direBonjour('Alice');   // 'Bonjour Alice !'
direBonjour('Bob');     // 'Bonjour Bob !'`;

const fonctionReturn = `function addition(a, b) {
    return a + b;
}

let resultat = addition(5, 3);
console.log(resultat);  // 8`;

const arrowCode = `// Fonction classique
function addition(a, b) {
    return a + b;
}

// Fonction fléchée
const addition = (a, b) => {
    return a + b;
};

// Version ultra-courte
const addition = (a, b) => a + b;`;

// --- Section 9: DOM ---
const domArbre = `document
  └─ body
      ├─ h1 ("Titre")
      └─ p ("Paragraphe")`;

const getElementByIdCode = `<h1 id="titre">Mon titre</h1>

let titre = document.getElementById('titre');
console.log(titre);`;

const querySelectorAllCode = `// querySelector : premier élément
let paragraphe = document.querySelector('.texte');

// querySelectorAll : tous les éléments
let items = document.querySelectorAll('.item');
items.forEach(function(item) { ... });`;

const textContentCode = `let titre = document.getElementById('titre');
titre.textContent = 'Nouveau titre';`;

const innerHtmlCode = `let conteneur = document.getElementById('conteneur');
conteneur.innerHTML = '<p>Nouveau <strong>paragraphe</strong></p>';

// ⚠️ Attention XSS si contenu utilisateur !`;

const styleCode = `let texte = document.getElementById('texte');
texte.style.color = 'red';
texte.style.fontSize = '24px';`;

const classListCode = `let box = document.getElementById('box');

box.classList.add('active');
box.classList.remove('container');
box.classList.toggle('visible');`;

// --- Section 10: Créer/supprimer ---
const createElementCode = `let nouveauParagraphe = document.createElement('p');
nouveauParagraphe.textContent = 'Nouveau contenu';`;

const appendRemoveCode = `let conteneur = document.getElementById('liste');

conteneur.appendChild(nouveauParagraphe);

// Supprimer : récupérer l'élément à supprimer
let element = document.getElementById('elementASupprimer');
element.remove();`;

// --- Section 11: Événements ---
const addEventListenerCode = `let bouton = document.getElementById('monBouton');

bouton.addEventListener('click', function() {
    console.log('Bouton cliqué !');
});`;

const clickCode = `let btn = document.getElementById('btn');
let message = document.getElementById('message');

btn.addEventListener('click', function() {
    message.textContent = 'Tu as cliqué !';
});`;

const inputCode = `let prenom = document.getElementById('prenom');
let affichage = document.getElementById('affichage');

prenom.addEventListener('input', function() {
    affichage.textContent = \`Bonjour \${prenom.value} !\`;
});`;

const submitCode = `let form = document.getElementById('monForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulaire envoyé !');
});`;

const eventObjCode = `bouton.addEventListener('click', function(event) {
    console.log(event.type);    // 'click'
    console.log(event.target); // L'élément cliqué
    console.log(event.clientX); // Position X souris
});`;

// --- Section 12: Formulaires ---
const formValuesCode = `let form = document.getElementById('monForm');
let inputNom = document.getElementById('nom');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valeur = inputNom.value;
    console.log(valeur);
});`;

const validationCode = `let nom = inputNom.value.trim();

if (nom === '') {
    // Champ vide
}

if (nom.length < 3) {
    // Trop court
}`;

const formDemoHtml = `<form id="formulaire">
  <input type="text" id="nom" placeholder="Nom">
  <span id="erreur-nom"></span>
  <button type="button" id="btnEnvoyer">Envoyer</button>
</form>`;

const formDemoScript = `let inputNom = document.getElementById('nom');
let erreurNom = document.getElementById('erreur-nom');
let btn = document.getElementById('btnEnvoyer');

btn.addEventListener('click', function() {
  erreurNom.textContent = '';
  let nom = inputNom.value.trim();
  if (nom === '') {
    erreurNom.textContent = 'Le nom est requis';
    return;
  }
  if (nom.length < 3) {
    erreurNom.textContent = 'Le nom doit faire au moins 3 caractères';
    return;
  }
  alert('Bienvenue, ' + nom + ' !');
});`;

// --- Section 13: Exemples (Preview) ---
const compteurHtml = `<button id="btnCompter">Clique-moi</button>
<p>Clics : <span id="compteur">0</span></p>`;
const compteurScript = `let btn = document.getElementById('btnCompter');
let compteur = document.getElementById('compteur');
let count = 0;
btn.addEventListener('click', function() {
  count++;
  compteur.textContent = count;
});`;

const toggleHtml = `<button id="btnToggle">Afficher/Masquer</button>
<p id="texte">Je suis visible !</p>`;
const toggleScript = `let btn = document.getElementById('btnToggle');
let texte = document.getElementById('texte');
btn.addEventListener('click', function() {
  texte.classList.toggle('hidden');
});`;
const toggleCss = `.hidden { display: none; }`;

const todoHtml = `<h2>Ma To-Do List</h2>
<input type="text" id="nouvelle-tache" placeholder="Nouvelle tâche...">
<button id="btn-ajouter">Ajouter</button>
<ul id="liste-taches"></ul>`;
const todoScript = `let inputTache = document.querySelector('#nouvelle-tache');
let btnAjouter = document.querySelector('#btn-ajouter');
let listeTaches = document.querySelector('#liste-taches');
btnAjouter.addEventListener('click', function() {
  let texte = inputTache.value;
  if (texte !== '') {
    let li = document.createElement('li');
    li.textContent = texte;
    li.addEventListener('click', function() { li.remove(); });
    listeTaches.appendChild(li);
    inputTache.value = '';
  }
});`;
const todoCss = `h2 { margin-bottom: 12px; }
input { padding: 10px; font-size: 16px; width: 220px; }
ul { list-style: none; padding: 0; margin-top: 18px; }
li { padding: 10px; margin: 6px 0; border-radius: 6px; cursor: pointer; background: #f0f0f0; }
li:hover { background: #e0e0e0; }`;

// Combined code for Section 13 slides (HTML + CSS + JS)
const compteurCode = `// index.html
${compteurHtml}

// script.js
${compteurScript}`;

const toggleCode = `// index.html
${toggleHtml}

// style.css
${toggleCss}

// script.js
${toggleScript}`;

const todoCode = `// index.html
${todoHtml}

// script.js
${todoScript}`;

function CoursJavascriptTheorique() {
  return (
    <Deck theme={theme} template={(props) => <MiraDeckTemplate {...props} />} transition={noTransition}>
      {/* === Section 1: Introduction (5 slides) === */}
      <MiraTitleSlide
        title="Introduction à JavaScript"
        subtitle="Cours théorique - Séance 3"
        date="17 mars"
      >
        <Notes>
          Vue d'ensemble de JavaScript moderne : variables, conditions, boucles, DOM, événements, validation.
        </Notes>
      </MiraTitleSlide>

      <MiraContentSlide heading="JavaScript : le langage du web">
        <Text fontSize="1.5rem" marginBottom={16}>
          <strong>JavaScript = Interactivité</strong>
        </Text>
        <Text fontSize="1.2rem" color="#4a5568">
          C'est le seul langage de programmation que les navigateurs comprennent.
        </Text>
        <Notes>JavaScript fait bouger les choses sur la page. Sans lui, le web serait statique.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="JavaScript ≠ Java">
        <Text fontSize="1.3rem" marginBottom={20}>
          Deux langages complètement différents !
        </Text>
        <UnorderedList fontSize="1.1rem">
          <ListItem><strong>Java</strong> : Langage backend, applications lourdes</ListItem>
          <ListItem><strong>JavaScript</strong> : Langage web, s'exécute dans le navigateur</ListItem>
        </UnorderedList>
        <Notes>Erreur de débutant : confondre les deux. JavaScript créé en 10 jours par Brendan Eich en 1995.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="JavaScript fait 3 choses">
        <UnorderedList fontSize="1.2rem">
          <ListItem><strong>Réagir aux actions</strong> (clics, saisies...)</ListItem>
          <ListItem><strong>Modifier la page</strong> (ajouter/supprimer du contenu)</ListItem>
          <ListItem><strong>Communiquer avec des serveurs</strong> (récupérer des données)</ListItem>
        </UnorderedList>
        <Notes>Exemples : bouton J'aime, panier sans recharger, fil d'actualité au scroll.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Où écrire du JavaScript ?">
        <UnorderedList fontSize="1.2rem">
          <ListItem><strong>Inline</strong> (à éviter)</ListItem>
          <ListItem><strong>Interne</strong> (pour tester)</ListItem>
          <ListItem><strong>Externe</strong> (recommandé)</ListItem>
        </UnorderedList>
        <Text fontSize="1rem" marginTop={20} color="#4a5568">
          Même logique que CSS : séparer structure, présentation et comportement.
        </Text>
        <Notes>Fichier externe = meilleure pratique. Script souvent avant &lt;/body&gt;.</Notes>
      </MiraContentSlide>

      {/* === Section 2: Setup & Console (3 slides) === */}
      <CodeSlide
        heading="Lier un fichier JavaScript au HTML"
        code={linkScriptHtml}
        language="html"
        showLineNumbers
        notes="Le script s'exécute quand la page charge. Souvent placé avant </body>."
      />

      <CodePreviewConsoleSlide
        heading="La console : ton amie"
        code={consoleSnippet}
        language="javascript"
        preview={{
          html: `<h1>Bienvenue</h1><p>Ouvre la console (F12) et tape le snippet.</p>`,
          title: 'Console',
        }}
        notes="Montre en live : console.log('test'). La console est TON AMIE pour déboguer."
      />

      <MiraContentSlide heading="DevTools (F12)">
        <Text fontSize="1.2rem" marginBottom={16}>
          Trois onglets importants :
        </Text>
        <UnorderedList fontSize="1.1rem">
          <ListItem><strong>Console</strong> : logs, erreurs, exécuter du JS</ListItem>
          <ListItem><strong>Elements</strong> : inspecter le DOM en temps réel</ListItem>
          <ListItem><strong>Sources</strong> : breakpoints, débogage</ListItem>
        </UnorderedList>
        <Notes>F12 ou clic droit → Inspecter. Montre les 3 onglets.</Notes>
      </MiraContentSlide>

      {/* === Section 3: Variables (9 slides) === */}
      <MiraContentSlide heading="Qu'est-ce qu'une variable ?">
        <Text fontSize="1.2rem" marginBottom={16}>
          Une <strong>variable</strong> = une boîte nommée qui stocke une valeur.
        </Text>
        <UnorderedList fontSize="1.1rem">
          <ListItem>On lui donne un <strong>nom</strong> (ex. <code>prenom</code>, <code>age</code>)</ListItem>
          <ListItem>Elle contient une <strong>valeur</strong> (texte, nombre, etc.)</ListItem>
          <ListItem>On peut la lire et parfois la modifier</ListItem>
        </UnorderedList>
        <Notes>Variable = conteneur réutilisable. Sans variables, on ne pourrait pas mémoriser de données.</Notes>
      </MiraContentSlide>

      <CodeSlide heading="const : variable constante" code={constCode} language="javascript" notes="const = valeur fixe. Réassigner = erreur." />
      <MiraContentSlide heading="const : quand l'utiliser ?">
        <Text fontSize="1.2rem" marginBottom={16}>
          <strong>Règle : const par défaut</strong>
        </Text>
        <UnorderedList fontSize="1.1rem">
          <ListItem>Utilise <code>const</code> pour tout ce qui ne change pas</ListItem>
          <ListItem>Utilise <code>let</code> uniquement quand tu dois <strong>réassigner</strong> (compteur, boucle, etc.)</ListItem>
          <ListItem>Plus sûr : le code indique clairement ce qui peut changer</ListItem>
        </UnorderedList>
        <Notes>const par défaut, let seulement si nécessaire. Bonne pratique moderne.</Notes>
      </MiraContentSlide>

      <CodeSlide heading="Constantes avec majuscules (UPPER_SNAKE_CASE)" code={constMajusculesCode} language="javascript" notes="Convention : vraies constantes (PI, config) en MAJUSCULES." />

      <CodeSlide heading="let : variable modifiable" code={variablesLet} language="javascript" notes="let = déclarer une variable qu'on peut réassigner." />
      <CodeSlide heading="let : on peut réassigner" code={letModifiable} language="javascript" notes="Parfait pour compteurs, scores, boucles." />

      <CodeSlide heading="var : à éviter" code={varCode} language="javascript" notes="Ancien JS, avant ES6 (2015)." />
      <CodeSlide heading="var vs let : la différence de scope" code={varPourquoiEviter} language="javascript" notes="var fuit hors du bloc, let reste dedans. Hoisting avec var. Toujours let/const." />

      <CodeSlide heading="Règles de nommage (camelCase)" code={nommageCode} language="javascript" notes="camelCase = convention JavaScript standard." />

      {/* === Section 4: Types de données (6 slides) === */}
      <CodeSlide heading="Nombres" code={nombresCode} language="javascript" notes="Un seul type Number (entiers et décimaux)." />
      <CodeSlide heading="Chaînes de caractères" code={chainesCode} language="javascript" notes="Guillemets simples, doubles ou backticks." />
      <CodeSlide heading="Template literals" code={templateCode} language="javascript" notes="Backticks + ${variable} = insertion de variables." />
      <CodeSlide heading="Booléens" code={booleensCode} language="javascript" notes="true ou false. Utilisés dans les conditions." />
      <CodeSlide heading="Tableaux (index, length)" code={tableauxCode} language="javascript" notes="Index commence à 0. length = taille." />
      <CodeSlide heading="Objets (propriétés, accès)" code={objetsCode} language="javascript" notes="objet.propriete ou objet['propriete']." />

      {/* === Section 5: Opérateurs (3 slides) === */}
      <CodeSlide heading="Opérateurs arithmétiques (+, -, *, /, %)" code={arithmCode} language="javascript" notes="% = modulo, reste de la division." />
      <CodeSlide heading="Opérateurs de comparaison (== vs ===)" code={comparaisonCode} language="javascript" notes="TOUJOURS === et !==. == fait des conversions bizarres.">
        <Box fontSize="0.85rem" color="#64748b" marginTop={8}>
          Source : <a href="https://github.com/denysdovhan/wtfjs" target="_blank" rel="noopener noreferrer">github.com/denysdovhan/wtfjs</a>
        </Box>
      </CodeSlide>
      <CodeSlide heading="Opérateurs logiques (&&, ||, !)" code={logiquesCode} language="javascript" notes="ET, OU, NON. Utilisés dans les conditions." />

      {/* === Section 6: Conditions (4 slides) === */}
      <CodeSlide heading="Condition if" code={ifCode} language="javascript" notes="Si la condition est vraie, le code s'exécute." />
      <CodeSlide heading="if...else" code={elseCode} language="javascript" notes="Soit l'un, soit l'autre." />
      <CodeSlide heading="if...else if...else" code={elseIfCode} language="javascript" notes="Teste dans l'ordre, s'arrête au premier vrai." />
      <MiraContentSlide heading="Opérateurs logiques dans les conditions">
        <Text fontSize="1.1rem" marginBottom={16}>
          <code>&&</code> (ET), <code>||</code> (OU), <code>!</code> (NON)
        </Text>
        <MiraCodePane language="javascript" fontSize={16}>
          {`if (age >= 18 && hasLicense) { ... }
if (jour === 'samedi' || jour === 'dimanche') { ... }
if (!isConnected) { ... }`}
        </MiraCodePane>
        <Notes>Les trois opérateurs combinés avec if.</Notes>
      </MiraContentSlide>

      <CodeSlide heading="try/catch — gestion d'erreurs basique" code={tryCatchCode} language="javascript" notes="try/catch évite que le programme plante. Utile pour JSON.parse, accès API, etc." />

      {/* === Section 7: Boucles (6 slides) === */}
      <CodeSlide heading="Boucle for" code={forCode} language="javascript" notes="3 parties : init, condition, incrémentation." />
      <CodeSlide heading="Boucle while" code={whileCode} language="javascript" notes="Attention aux boucles infinies !" />
      <CodeSlide heading="forEach — parcourir un tableau" code={forEachCode} language="javascript" notes="Plus simple que for pour les tableaux." />

      <CodePreviewConsoleSlide
        heading="map — transformer un tableau"
        code={mapCode}
        language="javascript"
        preview={{
          html: `<p>Ouvre la console et exécute le snippet.</p>`,
          title: 'map',
        }}
        notes="map retourne un nouveau tableau transformé. Montre en live dans la console."
      />

      <MiraContentSlide heading="map vs forEach : résumé">
        <Text fontSize="1.1rem" marginBottom={12}>
          <strong>map()</strong> transforme et retourne un nouveau tableau. <strong>forEach()</strong> exécute une action pour chaque élément (retourne <code>undefined</code>).
        </Text>
        <MiraTable
          headers={['', 'map()', 'forEach()']}
          rows={[
            ['Retour', 'Nouveau tableau', 'undefined'],
            ['Usage', 'Transformer des données', 'Effets de bord (log, DOM...)'],
            ['Chaînable', 'Oui', 'Non'],
          ]}
          fontSize="0.95rem"
        />
        <Box marginTop={16}>
          <MiraCodePane language="javascript" fontSize={14} showLineNumbers={false}>
            {mapVsForEachCode}
          </MiraCodePane>
        </Box>
        <Notes>map transforme, forEach exécute. Ne pas utiliser map pour des side effects.</Notes>
      </MiraContentSlide>

      <CodeSlide heading="filter — filtrer un tableau" code={filterCode} language="javascript" notes="Retourne les éléments qui passent le test." />
      <CodeSlide heading="find — trouver un élément" code={findCode} language="javascript" notes="Retourne le premier élément qui correspond." />
      <CodeSlide heading="null vs undefined" code={nullVsUndefinedCode} language="javascript" notes="undefined = pas de valeur (find sans résultat). null = vide intentionnel. Utile pour gérer les valeurs manquantes." />

      {/* === Section 8: Fonctions (4 slides) === */}
      <CodeSlide heading="Fonctions : réutiliser du code" code={fonctionCode} language="javascript" notes="Bloc de code réutilisable." />
      <CodeSlide heading="Fonctions avec paramètres" code={fonctionParams} language="javascript" notes="Paramètre = variable passée à la fonction." />
      <CodeSlide heading="Fonctions qui retournent une valeur" code={fonctionReturn} language="javascript" notes="return renvoie une valeur." />
      <CodeSlide heading="Fonctions fléchées (arrow functions)" code={arrowCode} language="javascript" notes="Syntaxe ES6, plus concise." />

      {/* === Section 9: DOM (8 slides) === */}
      <MiraContentSlide heading="Le DOM : Document Object Model">
        <Text fontSize="1.2rem" marginBottom={16}>
          Le DOM = représentation de ta page HTML en JavaScript.
        </Text>
        <Text fontSize="1.1rem" color="#4a5568">
          Le navigateur transforme ton HTML en un arbre d'objets.
        </Text>
        <Notes>Chaque balise devient un objet JavaScript manipulable.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Visualiser le DOM (arbre)">
        <MiraCodePane language="text" showLineNumbers={false}>
          {domArbre}
        </MiraCodePane>
        <Text fontSize="1rem" marginTop={16} color="#4a5568">
          DevTools (F12) → Elements : tu vois l'arbre HTML.
        </Text>
        <Notes>JavaScript peut modifier cet arbre en temps réel.</Notes>
      </MiraContentSlide>

      <CodeSlide heading="getElementById" code={getElementByIdCode} language="javascript" notes="Sélectionne UN élément par son ID." />
      <CodeSlide heading="querySelector et querySelectorAll" code={querySelectorAllCode} language="javascript" notes="Sélecteur CSS. querySelector = premier, querySelectorAll = tous." />
      <CodeSlide heading="Modifier le contenu : textContent" code={textContentCode} language="javascript" notes="Remplace le texte brut." />
      <CodeSlide heading="Modifier le HTML : innerHTML (attention XSS)" code={innerHtmlCode} language="javascript" notes="Dangereux si contenu utilisateur. Préfère textContent." >
        <Box fontSize="0.85rem" color="#64748b" marginTop={8}>
          Source : <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS" target="_blank" rel="noopener noreferrer">developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS</a>
        </Box>
        </CodeSlide>
      <CodeSlide heading="Modifier les styles : style" code={styleCode} language="javascript" notes="font-size → fontSize (camelCase)." />
      <CodeSlide heading="classList (add, remove, toggle)" code={classListCode} language="javascript" notes="Meilleure pratique que modifier style directement." />

      {/* === Section 10: Créer/supprimer (2 slides) === */}
      <CodeSlide heading="createElement" code={createElementCode} language="javascript" notes="Crée un nouvel élément DOM." />
      <CodeSlide heading="appendChild et remove" code={appendRemoveCode} language="javascript" notes="appendChild ajoute, remove supprime." />

      {/* === Section 11: Événements (7 slides) === */}
      <MiraContentSlide heading="Événements : réagir aux actions">
        <Text fontSize="1.2rem" marginBottom={16}>
          Événement = action de l'utilisateur (clic, saisie...)
        </Text>
        <Text fontSize="1.1rem" color="#4a5568">
          <code>addEventListener</code> = « écoute cet événement »
        </Text>
        <Notes>L'utilisateur clique → signal → JavaScript exécute ta fonction.</Notes>
      </MiraContentSlide>
      <CodeSlide heading="addEventListener" code={addEventListenerCode} language="javascript" notes="Élément.addEventListener('type', fonction)." />
      <CodeSlide heading="Événement click" code={clickCode} language="javascript" notes="Détecter un clic sur un élément." />
      <CodeSlide heading="Événement input" code={inputCode} language="javascript" notes="Se déclenche à chaque caractère tapé." />
      <CodeSlide heading="Événement submit" code={submitCode} language="javascript" notes="Gérer l'envoi d'un formulaire. preventDefault bloque le rechargement." />
      <CodeSlide heading="event.preventDefault()" code={`form.addEventListener('submit', function(event) {
    event.preventDefault();  // Empêche le rechargement
    // Traiter les données ici
});`} language="javascript" notes="Bloque le comportement par défaut (rechargement)." />
      <CodeSlide heading="Objet event (target, type, etc.)" code={eventObjCode} language="javascript" notes="event contient des infos sur l'événement." />

      {/* === Section 12: Formulaires & validation (4 slides) === */}
      <CodeSlide heading="Récupérer les valeurs d'un formulaire" code={formValuesCode} language="javascript" notes="input.value pour récupérer le texte." />
      <CodeSlide heading="Validation basique (champ vide, longueur)" code={validationCode} language="javascript" notes="Vérifier avant de traiter." />
      <CodeSlide heading="Afficher les messages d'erreur" code={validationCode} language="javascript" notes="element.textContent = 'Message erreur'." />

      <CodePreviewConsoleSlide
        heading="Exemple : formulaire avec validation"
        code={formDemoScript}
        language="javascript"
        preview={{
          html: formDemoHtml,
          script: formDemoScript,
          css: '#erreur-nom { color: red; font-size: 0.9rem; display: block; margin-top: 4px; }',
          title: 'Formulaire validé',
        }}
        consoleSnippet={`// Teste le formulaire dans la preview :
// 1. Vide → "Le nom est requis"
// 2. "ab" → "au moins 3 caractères"
// 3. "Alice" → "Bienvenue, Alice !"`}
        notes="Démo complète : validation + messages d'erreur."
      />

      {/* === Section 13: Exemples complets (3 slides) === */}
      <CodeAndPreviewSlide
        heading="Compteur de clics"
        code={compteurCode}
        preview={{
          html: compteurHtml,
          script: compteurScript,
          title: 'Compteur',
        }}
        language="javascript"
        notes="Compteur : addEventListener + textContent."
      />
      <CodeAndPreviewSlide
        heading="Toggle de visibilité"
        code={toggleCode}
        preview={{
          html: toggleHtml,
          css: toggleCss,
          script: toggleScript,
          title: 'Toggle',
        }}
        language="javascript"
        notes="Toggle : classList.toggle pour afficher/masquer."
      />
      <CodeAndPreviewSlide
        heading="To-do list minimaliste"
        code={todoCode}
        preview={{
          html: todoHtml,
          css: todoCss,
          script: todoScript,
          title: 'To-Do',
        }}
        fontSize={10}
        language="javascript"
        notes="To-Do : createElement, appendChild, remove, addEventListener."
      />

      {/* === Section 14: Bonnes pratiques (3 slides) === */}
      <MiraContentSlide heading="Bonnes pratiques JavaScript">
        <UnorderedList fontSize="1rem">
          <ListItem>Utilise <code>const</code> par défaut, <code>let</code> si la valeur change</ListItem>
          <ListItem>Nomme tes variables clairement (camelCase)</ListItem>
          <ListItem>Cache tes sélecteurs DOM dans des variables</ListItem>
          <ListItem>Utilise <code>textContent</code> plutôt que <code>innerHTML</code> si possible</ListItem>
          <ListItem>Valide toujours les entrées utilisateur</ListItem>
        </UnorderedList>
        <Notes>Éviter les bugs et écrire du code maintenable.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Erreurs courantes">
        <UnorderedList fontSize="1rem">
          <ListItem>Oublier de sélectionner l'élément avant de le modifier</ListItem>
          <ListItem>Script dans le <code>&lt;head&gt;</code> avant que le DOM existe → placer avant <code>&lt;/body&gt;</code></ListItem>
          <ListItem>Utiliser <code>==</code> au lieu de <code>===</code></ListItem>
        </UnorderedList>
        <Notes>Script à la fin du body ou DOMContentLoaded.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Débogage : console.log et DevTools">
        <Text fontSize="1.1rem" marginBottom={16}>
          <code>console.log</code> partout pour comprendre ce qui se passe !
        </Text>
        <UnorderedList fontSize="1rem">
          <ListItem><strong>Console</strong> : logs, erreurs</ListItem>
          <ListItem><strong>Elements</strong> : inspecter le DOM</ListItem>
          <ListItem><strong>Sources</strong> : breakpoints</ListItem>
        </UnorderedList>
        <Notes>90% du temps, console.log suffit pour trouver le bug.</Notes>
      </MiraContentSlide>

      {/* === Section 15: Conclusion (3 slides) === */}
      <MiraContentSlide heading="Récap JavaScript">
        <UnorderedList fontSize="1rem">
          <ListItem>Variables (<code>let</code>, <code>const</code>)</ListItem>
          <ListItem>Types (Number, String, Boolean, Array, Object)</ListItem>
          <ListItem>Conditions, boucles, fonctions</ListItem>
          <ListItem>DOM (sélection, modification)</ListItem>
          <ListItem>Événements (<code>click</code>, <code>input</code>, <code>submit</code>)</ListItem>
        </UnorderedList>
        <Notes>On a vu les bases. Prochaine séance : TP pour pratiquer.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Prochaine fois : TP">
        <Text fontSize="1.2rem" marginBottom={16}>
          TP « Dynamiser l'interface utilisateur »
        </Text>
        <UnorderedList fontSize="1rem">
          <ListItem>Menu burger interactif</ListItem>
          <ListItem>To-do list dynamique</ListItem>
          <ListItem>Système de filtres</ListItem>
        </UnorderedList>
        <Text fontSize="0.95rem" marginTop={20} color="#4a5568">
          Même boîte à outils : querySelector, événements, conditions, boucles.
        </Text>
        <Notes>Pratiquer, faire des erreurs, déboguer.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Ressources">
        <UnorderedList fontSize="0.95rem">
          <ListItem>
            <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              MDN Web Docs
            </a>
          </ListItem>
          <ListItem>
            <a href="https://javascript.info/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              JavaScript.info
            </a>
          </ListItem>
          <ListItem>
            <a href="https://javascript30.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              JavaScript30
            </a>
          </ListItem>
        </UnorderedList>
        <Notes>MDN = LA référence. Ajoute "MDN" à tes recherches Google.</Notes>
      </MiraContentSlide>
    </Deck>
  );
}

export default CoursJavascriptTheorique;
