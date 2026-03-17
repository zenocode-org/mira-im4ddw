import React from 'react';
import { Deck, Text, Box, ListItem, UnorderedList, Notes } from 'spectacle';
import {
  MiraTitleSlide,
  MiraContentSlide,
  MiraCodePane,
  CodeSlide,
  TwinCodeSlide,
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

const setupHtml = `<!-- index.html -->
<h1>Compteur Interactif</h1>
<div id="compteur">0</div>
<button id="btn-plus">+</button>
<button id="btn-moins">-</button>
<button id="btn-reset">Reset</button>
<script src="script.js"></script>`;

const setupJs = `// script.js
let compteur = 0;
let affichageCompteur = document.querySelector('#compteur');

document.querySelector('#btn-plus').addEventListener('click', function() {
  compteur++;
  affichageCompteur.textContent = compteur;
});

document.querySelector('#btn-moins').addEventListener('click', function() {
  compteur--;
  affichageCompteur.textContent = compteur;
});

document.querySelector('#btn-reset').addEventListener('click', function() {
  compteur = 0;
  affichageCompteur.textContent = compteur;
});`;

const variablesCode = `let compteur = 0;
console.log(compteur);

compteur = 5;
console.log(compteur);

const pi = 3.14;
console.log(pi);

pi = 3.15; // Erreur`;

const domCode = `let compteur = 0;
let affichageCompteur = document.querySelector('#compteur');

affichageCompteur.textContent = compteur;

// Test dans la console :
compteur = 42;
affichageCompteur.textContent = compteur;`;

const eventCode = `let btnPlus = document.querySelector('#btn-plus');

btnPlus.addEventListener('click', function() {
  console.log('Bouton + cliqué !');
});`;

const plusCode = `btnPlus.addEventListener('click', function() {
  compteur = compteur + 1; // ou compteur++
  affichageCompteur.textContent = compteur;
});`;

const allButtonsCode = `let btnMoins = document.querySelector('#btn-moins');
let btnReset = document.querySelector('#btn-reset');

btnPlus.addEventListener('click', function() {
  compteur++;
  affichageCompteur.textContent = compteur;
});

btnMoins.addEventListener('click', function() {
  compteur--;
  affichageCompteur.textContent = compteur;
});

btnReset.addEventListener('click', function() {
  compteur = 0;
  affichageCompteur.textContent = compteur;
});`;

const limitsCode = `btnPlus.addEventListener('click', function() {
  if (compteur < 10) {
    compteur++;
    affichageCompteur.textContent = compteur;
  }
});

btnMoins.addEventListener('click', function() {
  if (compteur > 0) {
    compteur--;
    affichageCompteur.textContent = compteur;
  }
});`;

const todoHtml = `<hr>

<h2>Ma To-Do List</h2>

<input
  type="text"
  id="nouvelle-tache"
  placeholder="Nouvelle tâche..."
>
<button id="btn-ajouter">Ajouter</button>

<ul id="liste-taches"></ul>`;

const addTaskCode = `let inputTache = document.querySelector('#nouvelle-tache');
let btnAjouter = document.querySelector('#btn-ajouter');
let listeTaches = document.querySelector('#liste-taches');

btnAjouter.addEventListener('click', function() {
  let texte = inputTache.value;

  if (texte !== '') {
    let nouvelleTache = document.createElement('li');
    nouvelleTache.textContent = texte;
    listeTaches.appendChild(nouvelleTache);

    inputTache.value = '';
  }
});`;

const removeTaskCode = `btnAjouter.addEventListener('click', function() {
  let texte = inputTache.value;

  if (texte !== '') {
    let nouvelleTache = document.createElement('li');
    nouvelleTache.textContent = texte;

    nouvelleTache.addEventListener('click', function() {
      nouvelleTache.remove();
    });

    listeTaches.appendChild(nouvelleTache);
    inputTache.value = '';
  }
});`;

const loopCode = `let tachesParDefaut = [
  'Apprendre JavaScript',
  'Faire le TP',
  'Réviser HTML/CSS',
];

for (let i = 0; i < tachesParDefaut.length; i++) {
  let tache = document.createElement('li');
  tache.textContent = tachesParDefaut[i];

  tache.addEventListener('click', function() {
    tache.remove();
  });

  listeTaches.appendChild(tache);
}`;

function CoursJavascriptInteractif() {
  return (
    <Deck theme={theme} template={(props) => <MiraDeckTemplate {...props} />} transition={noTransition}>
      <MiraTitleSlide
        title="Cours JavaScript Interactif"
        subtitle="Séance 3 - Atelier pratique"
        date="17 mars"
      >
        <Notes>
          Objectif de la séance : faire coder les étudiants en direct. On construit un compteur puis une mini
          to-do list pour introduire variables, DOM, événements, conditions et boucles.
        </Notes>
      </MiraTitleSlide>

      <MiraContentSlide heading="Le programme de l'atelier">
        <MiraCodePane language="text" showLineNumbers={false}>
          {`0-10 min  → intro + setup
10-25 min → compteur simple
25-40 min → compteur avec limites
40-55 min → mini to-do list
55-60 min → récap + lien vers le TP`}
        </MiraCodePane>
        <Text fontSize="1.05rem" marginTop={20}>
          On code ensemble, étape par étape.
        </Text>
        <UnorderedList fontSize="0.95rem" marginTop={16}>
          <ListItem>Bloc 1 : variables + DOM</ListItem>
          <ListItem>Bloc 2 : événements + conditions</ListItem>
          <ListItem>Bloc 3 : boucles + manipulation du DOM</ListItem>
        </UnorderedList>
      </MiraContentSlide>

      <CodeSlide
        heading='Démo "magie" dans la console'
        code={`document.body.style.backgroundColor = 'pink';

document.querySelector('h1').textContent =
  'Je contrôle cette page !';`}
        language="javascript"
        notes="Ouvre n'importe quel site, F12, console. Fais la démo en direct pour montrer que JavaScript agit immédiatement sur la page."
      />

      <CodeSlide
        heading="Lier un fichier JavaScript au HTML"
        code={`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma page</title>
  <script src="script.js"></script>
</head>
<body>

</body>
</html>`}
        language="html"
        showLineNumbers
        notes="Le script s'exécute quand la page charge. Souvent placé avant </body> pour que le DOM soit prêt."
      />

      <TwinCodeSlide
        heading="Setup : le HTML et JavaScript minimum"
        leftCode={setupHtml}
        rightCode={setupJs}
        leftLanguage="html"
        rightLanguage="javascript"
        showLineNumbers
        fontSize={15}
        gap={24}
        notes="Fais créer les trois fichiers : index.html, style.css, script.js."
      />

      <PreviewSlide
        heading="L'interface : compteur interactif"
        html={`<h1>Compteur Interactif</h1>
<div id="compteur">0</div>
<button id="btn-plus">+</button>
<button id="btn-moins">-</button>
<button id="btn-reset">Reset</button>`}
        css={`body { font-family: Arial, sans-serif; text-align: center; padding: 24px; }
#compteur { font-size: 56px; font-weight: bold; margin: 16px 0; }
button { margin: 4px; padding: 10px 16px; background: #007bff; color: white; border: none; border-radius: 6px; }`}
        script={`let compteur = 0;
let affichageCompteur = document.querySelector('#compteur');
document.querySelector('#btn-plus').addEventListener('click', function() {
  compteur++;
  affichageCompteur.textContent = compteur;
});
document.querySelector('#btn-moins').addEventListener('click', function() {
  compteur--;
  affichageCompteur.textContent = compteur;
});
document.querySelector('#btn-reset').addEventListener('click', function() {
  compteur = 0;
  affichageCompteur.textContent = compteur;
});`}
        title="Atelier JavaScript"
        notes="Les boutons fonctionnent. Lance Live Server pour tester."
      />

      <CodeSlide
        heading="Variables : let ou const ?"
        code={variablesCode}
        language="javascript"
        notes="Question au groupe : pour le compteur, on utilise let ou const ? Réponse : let, car la valeur change à chaque clic."
      />

      <CodeAndPreviewSlide
        heading="DOM : sélectionner et modifier"
        code={domCode}
        language="javascript"
        showLineNumbers
        preview={{
          html: `<div id="compteur">42</div>`,
          css: `#compteur { font-size: 72px; font-weight: bold; color: #333; text-align: center; margin-top: 32px; }`,
          title: 'textContent',
        }}
        notes="Explique que le DOM est la représentation de la page en JavaScript. querySelector récupère un élément, textContent modifie ce qui s'affiche."
      />

      <CodeSlide
        heading="Événement : écouter un clic"
        code={eventCode}
        language="javascript"
        notes="Montre addEventListener('click', ...). Recharge, clique, regarde la console : on a enfin une réaction au bouton."
      />

      <MiraContentSlide heading="Défi 1 : faire augmenter le compteur">
        <Text fontSize="1.15rem" marginBottom={20}>
          Mission en 3 minutes :
        </Text>
        <UnorderedList fontSize="1.05rem">
          <ListItem>
            Augmenter la variable <code>compteur</code>
          </ListItem>
          <ListItem>Mettre à jour l'affichage</ListItem>
          <ListItem>
            Tester au clic sur <code>+</code>
          </ListItem>
        </UnorderedList>
        <Box marginTop={24}>
          <Text color="#4a5568" fontSize="0.95rem">
            Indice : inspire-toi de <code>console.log(...)</code>, mais remplace le message par une vraie
            action.
          </Text>
        </Box>
        <Notes>Laisse chercher. Circule dans la salle. Le but est qu'ils testent, se trompent et manipulent le code eux-mêmes.</Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Correction : bouton +"
        code={plusCode}
        language="javascript"
        notes="Souligne compteur = compteur + 1 et compteur++. Deux écritures valides. L'important : changer la variable puis l'affichage."
      />

      <CodeSlide
        heading="Défi 2 : les boutons - et Reset"
        code={allButtonsCode}
        language="javascript"
        showLineNumbers
        notes="Deuxième défi : ils reproduisent la logique pour moins et reset. Fais remarquer la répétition : même structure, seules les actions changent."
      />

      <CodeSlide
        heading="Conditions : limiter entre 0 et 10"
        code={limitsCode}
        language="javascript"
        showLineNumbers
        notes="Présente if comme un garde-fou. On ne descend pas sous 0, on ne monte pas au-dessus de 10."
      />

      <CodeAndPreviewSlide
        heading="To-do list : ajouter le HTML"
        code={todoHtml}
        language="html"
        preview={{
          html: `<h2>Ma To-Do List</h2>
<input type="text" id="nouvelle-tache" placeholder="Nouvelle tâche...">
<button id="btn-ajouter">Ajouter</button>
<ul id="liste-taches">
  <li>Apprendre JavaScript</li>
  <li>Faire le TP</li>
</ul>`,
          css: `h2 { margin-bottom: 12px; }
input { padding: 10px; font-size: 16px; width: 220px; }
button { margin-left: 8px; padding: 10px 14px; background: #007bff; color: white; border: none; border-radius: 6px; }
ul { list-style: none; padding: 0; margin-top: 18px; }
li { background: white; padding: 10px; margin: 6px 0; border-radius: 6px; cursor: pointer; }`,
          script: `var inputTache = document.querySelector('#nouvelle-tache');
var btnAjouter = document.querySelector('#btn-ajouter');
var listeTaches = document.querySelector('#liste-taches');
btnAjouter.addEventListener('click', function() {
  var texte = inputTache.value;
  if (texte !== '') {
    var li = document.createElement('li');
    li.textContent = texte;
    li.addEventListener('click', function() { li.remove(); });
    listeTaches.appendChild(li);
    inputTache.value = '';
  }
});
document.querySelectorAll('#liste-taches li').forEach(function(li) {
  li.addEventListener('click', function() { li.remove(); });
});`,
          title: 'Mini To-Do List',
        }}
        notes="On ajoute une deuxième mini-app dans la même page. Le HTML reste simple : un input, un bouton, une liste."
      />

      <CodeAndPreviewSlide
        heading="Créer une tâche avec JavaScript"
        code={addTaskCode}
        language="javascript"
        showLineNumbers
        preview={{
          html: `<h2>Ma To-Do List</h2>
<input type="text" id="nouvelle-tache" placeholder="Nouvelle tâche...">
<button id="btn-ajouter">Ajouter</button>
<ul id="liste-taches"></ul>`,
          css: `h2 { margin-bottom: 12px; }
input { padding: 10px; font-size: 16px; width: 220px; }
button { margin-left: 8px; padding: 10px 14px; background: #007bff; color: white; border: none; border-radius: 6px; }
ul { list-style: none; padding: 0; margin-top: 18px; }
li { background: #fff; padding: 10px; margin: 6px 0; border-radius: 6px; cursor: pointer; }`,
          script: `var inputTache = document.querySelector('#nouvelle-tache');
var btnAjouter = document.querySelector('#btn-ajouter');
var listeTaches = document.querySelector('#liste-taches');
btnAjouter.addEventListener('click', function() {
  var texte = inputTache.value;
  if (texte !== '') {
    var li = document.createElement('li');
    li.textContent = texte;
    li.addEventListener('click', function() { li.remove(); });
    listeTaches.appendChild(li);
    inputTache.value = '';
  }
});`,
          title: 'createElement + appendChild',
        }}
        notes="Explique la séquence : lire la valeur, vérifier si elle est vide, créer un li, injecter le texte, l'ajouter à la liste, vider l'input."
      />

      <CodeSlide
        heading="Supprimer une tâche au clic"
        code={removeTaskCode}
        language="javascript"
        showLineNumbers
        notes="On ajoute un événement directement sur chaque nouvelle tâche. remove() la retire du DOM."
      />

      <CodeSlide
        heading="Bonus : générer des tâches avec une boucle"
        code={loopCode}
        language="javascript"
        showLineNumbers
        notes="Si le groupe avance vite, montre for, length et l'accès par index. C'est le pont vers les tableaux."
      />

      <MiraContentSlide heading="Récap : ce qu'on a utilisé">
        <UnorderedList fontSize="1rem">
          <ListItem>
            Variables : <code>let</code>, <code>const</code>
          </ListItem>
          <ListItem>
            DOM : <code>querySelector</code>, <code>textContent</code>
          </ListItem>
          <ListItem>
            Événements : <code>addEventListener('click', ...)</code>
          </ListItem>
          <ListItem>
            Conditions : <code>if</code>
          </ListItem>
          <ListItem>
            Créer du HTML : <code>createElement</code>, <code>appendChild</code>
          </ListItem>
          <ListItem>
            Supprimer : <code>remove()</code>
          </ListItem>
          <ListItem>
            Boucles : <code>for</code>
          </ListItem>
        </UnorderedList>
        <Notes>Insiste sur l'idée clé : on n'a pas juste appris du vocabulaire, on a construit deux petites fonctionnalités complètes.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Lien avec le TP de la séance 4">
        <Text fontSize="1.1rem" marginBottom={16}>
          La prochaine étape : ajouter de l'interactivité à la plateforme d'événements.
        </Text>
        <UnorderedList fontSize="1rem">
          <ListItem>Filtres d'événements</ListItem>
          <ListItem>Menu burger responsive</ListItem>
          <ListItem>Compteur d'événements trouvés</ListItem>
        </UnorderedList>
        <Text fontSize="0.95rem" marginTop={20} color="#4a5568">
          Même boîte à outils : <code>querySelector</code>, événements, conditions, boucles.
        </Text>
      </MiraContentSlide>

      <MiraContentSlide heading="Ressources et défi bonus">
        <Text fontSize="1rem" marginBottom={10} fontWeight="bold" color="#00a3a3">
          Ressources
        </Text>
        <UnorderedList fontSize="0.95rem" marginBottom={18}>
          <ListItem>
            <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              MDN JavaScript Guide
            </a>
          </ListItem>
          <ListItem>
            <a href="https://javascript.info/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              JavaScript.info
            </a>
          </ListItem>
          <ListItem>
            <a href="https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              FreeCodeCamp JavaScript
            </a>
          </ListItem>
        </UnorderedList>
        <Text fontSize="1rem" marginBottom={10} fontWeight="bold" color="#00a3a3">
          Défis à faire chez soi
        </Text>
        <UnorderedList fontSize="0.95rem">
          <ListItem>Ajouter un bouton "Supprimer toutes les tâches"</ListItem>
          <ListItem>Ajouter une checkbox "terminée"</ListItem>
          <ListItem>
            Sauvegarder les tâches avec <code>localStorage</code>
          </ListItem>
        </UnorderedList>
        <Notes>Finis sur une ouverture : ils ont déjà les bases pour enrichir la mini app eux-mêmes.</Notes>
      </MiraContentSlide>
    </Deck>
  );
}

export default CoursJavascriptInteractif;
