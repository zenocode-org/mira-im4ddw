# TP 1 — Compteur de clics (10 secondes)

**Fichier à rendre :** un seul `[index.html](index.html)` à ouvrir dans le navigateur. Les **consignes et la progression** sont dans ce README ; tu modifies **ce même fichier** jusqu’à ce que le comportement décrit plus bas soit correct (plus simple à corriger pour l’enseignant).

---

## Objectifs du TP (ce que tu dois savoir faire après)

- **Aligner le HTML et le JavaScript** : les `id` du DOM et les sélecteurs passés à `querySelector` doivent correspondre.
- **Relier le script au DOM** : sélectionner des nœuds, réagir aux clics avec `addEventListener`, mettre à jour le texte avec `textContent`.
- **Inspecter l’exécution** : console (rappel rapide) et **débogueur** (points d’arrêt, variables dans la portée locale).
- **Gérer l’état** du mini-jeu (temps, score, minuteur, partie en cours) et les boutons (`disabled`).
- **Planifier et arrêter une action répétée** avec `setInterval` et `clearInterval` (à l’étape 3 tu **corriges** un bloc fourni ; à l’étape 4 tu **écris** le clic sur le bouton de jeu).

Ces notions se réutilisent dans les autres exercices du module : ici l’objectif est de **comprendre le mécanisme**, pas seulement de « faire marcher » la page.

### Documentation utile (à garder sous la main)

- [Document.querySelector()](https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector)
- [EventTarget.addEventListener()](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener)
- [setInterval()](https://developer.mozilla.org/fr/docs/Web/API/setInterval) et [clearInterval()](https://developer.mozilla.org/fr/docs/Web/API/clearInterval)
- [Node.textContent](https://developer.mozilla.org/fr/docs/Web/API/Node/textContent)
- (Optionnel) [HTMLElement.disabled](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/disabled)

**Débogage dans le navigateur (à lire pour l’étape 2) :**

- Firefox — [Le débogueur JavaScript](https://firefox-source-docs.mozilla.org/devtools-user/debugger/index.html) (vue d’ensemble)
- Chrome — [Pause your code with breakpoints](https://developer.chrome.com/docs/devtools/javascript/breakpoints) (en anglais, illustrations très claires)
- Microsoft Edge — [Sources tool overview](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide/sources/) (onglet *Sources*, équivalent à Chrome)

---

## Comportement attendu (jeu final)

1. Au chargement, « Clique ici ! » est **désactivé** ; « Démarrer » est utilisable.
2. Clic sur « Démarrer » : le temps affiche **10, 9, …, 0** ; « Clique ici ! » devient cliquable ; « Démarrer » est désactivé pendant la partie.
3. Chaque clic sur « Clique ici ! » **augmente le score** dans l’élément prévu pour le score (pas dans l’affichage du temps).
4. Quand le temps atteint **0** : le bouton de clic se désactive, « Démarrer » redevient actif ; le minuteur **ne continue pas** en arrière-plan (pense à `clearInterval` sur l’identifiant renvoyé par `setInterval`).

---

## Étapes (dans l’ordre, dans ton `index.html`)

### Étape 1 — Références vers les nœuds du HTML

**But :** obtenir des **références** (variables JavaScript) vers les quatre éléments utiles : bouton Démarrer, bouton de clic, affichage du temps, affichage du score.

Copie le bloc suivant **dans le** `<script>` de ton `index.html` (tu peux l’insérer tel quel au début du `<script>`) :

```js
const start = document.querySelector("#demarrer");
const btn = document.querySelector("#clic");
const timeEl = document.querySelector("#temps");
const scoreEl = document.querySelector("#score");
```

Enregistre, ouvre la page dans le navigateur, ouvre les outils développeur (**F12** ou **Ctrl+Shift+I** / **Cmd+Option+I**), onglet **Console**.

**Vérification rapide (vu en cours) :** les `const` du `<script>` sont accessibles en tapant leur nom dans la console. Ajoute **une ligne** temporaire juste après les quatre `const` : `console.log(start, btn, timeEl, scoreEl);`, enregistre, recharge, et lis le résultat dans l’onglet **Console**.

**Ce que tu devrais constater :** tant que les `id` du HTML ne correspondent pas aux sélecteurs (`#demarrer`, `#clic`, `#temps`, `#score`), `querySelector` ne trouve pas l’élément et chaque variable vaut `null`.

**Consigne :** ne modifie **pas** ce bloc JavaScript : il sert de **référence**. Adapte plutôt le **HTML** : modifie les attributs `id` des quatre éléments concernés dans le `<body>` pour qu’ils correspondent exactement à `demarrer`, `clic`, `temps` et `score` (celui qui affiche le nombre pour le temps, celui pour le score). Recharge et vérifie à nouveau : les quatre variables doivent maintenant référencer des **éléments** (plus `null`).

**Questions à te poser :**

- Quel `id` pour le bouton « Démarrer » ? pour « Clique ici ! » ? pour le `<span>` du temps ? pour le `<span>` du score ?
- Si une variable vaut encore `null`, le sélecteur `'#...'` et l’`id="..."` du HTML sont-ils **strictement** les mêmes ?

---

### Étape 2 — Variables d’état et débogueur

**But :** séparer **l’affichage** (DOM) de **l’état en mémoire** (nombres, drapeaux). Tu vas aussi utiliser le **débogueur** du navigateur pour voir ces variables **au moment où le code s’exécute**, sans seulement les recopier dans la console.

Ajoute **sous** les quatre `const`, les variables d’état :

```js
let time = 10;
let score = 0;
let timer = null;
let running = false;
```

**Attention :** la variable numérique du temps s’appelle `time` et l’élément du DOM pour afficher le temps est `timeEl` — ne les confonds pas dans la suite.

#### Utiliser le débogueur (à faire une fois ici ; tu t’en serviras tout seul plus tard)

Les captures ci-dessous sont faites avec **Firefox** (onglet **Débogueur**). Sous **Chrome** ou **Edge**, l’équivalent est l’onglet **Sources** ; les idées (ouvrir le fichier, point d’arrêt, panneau des variables) restent les mêmes.

**1 — Ouvrir ton fichier et voir le script**

Ouvre les outils développeur (**F12**), puis l’onglet **Débogueur** (Firefox) ou **Sources** (Chrome / Edge). Dans la liste des **sources** à gauche, sélectionne `index.html` : tu vois tout le fichier, HTML et `<script>` inclus, avec les numéros de ligne.

Onglet Débogueur : arborescence des sources et code de index.html

**2 — Poser un point d’arrêt**

Clique sur le **numéro de ligne** à la **première ligne des variables d’état**, par exemple la ligne où tu as écrit `let time = 10;` (juste **après** les quatre `const`). Un marqueur bleu apparaît dans la marge : l’exécution s’arrêtera sur cette ligne au prochain chargement.

Clic sur le numéro de ligne pour ajouter un point d’arrêt

**3 — Recharger et lire les variables**

Recharge la page (**F5** ou Ctrl+R). La page peut afficher **Debugger paused** ; dans le panneau du débogueur, l’exécution est **en pause** sur ta ligne. À droite, ouvre la section **Scopes** / **Portée** (souvent sous **Block** ou **Bloc**) : tu y vois `start`, `btn`, `timeEl`, `scoreEl` avec leur valeur **au moment de la pause**. Les `let` situés **sur ou après** la ligne du point d’arrêt peuvent encore apparaître comme **non initialisés** tant que l’exécution n’a pas fini ces lignes — c’est normal.

Après rechargement : exécution en pause, aperçus inline et panneau Scopes

Sur ces captures, les `id` du HTML sont encore du type `ex1-…` alors que le script utilise `#demarrer`, `#clic`, etc. : les quatre références issues de `querySelector` valent donc `null`, ce que le débogueur affiche dans **Scopes** et souvent en **survol** à côté du code. **Si tu as déjà aligné le HTML sur l’étape 1**, tu verras à la place des objets du DOM (éléments HTML), pas `null` — la manipulation reste la même.

Pour continuer : **Reprendre** (**F8** dans beaucoup de navigateurs) ou le bouton lecture ; tu peux aussi utiliser **Pas à pas** (**F10**) quand tu auras plus de code.

**Alternative :** tu peux insérer temporairement la ligne `debugger;` juste après `let running = false;`. Au rechargement, le navigateur s’arrête comme avec un point d’arrêt. Retire `debugger;` une fois le principe compris.

---

### Étape 3 — Clic sur « Démarrer » (minuteur + fin de partie)

**But :** quand on clique sur « Démarrer », une **partie** commence : le temps repart à 10, le score à 0, les bons boutons s’activent ou se grisent, puis le nombre affiché **baisse d’une unité chaque seconde** jusqu’à 0. À la fin, tout revient à l’état « prêt pour une nouvelle partie ».

Pour ne pas tout mélanger d’un coup, découpe ton travail en **trois blocs** (tu peux les coder l’un après l’autre et tester avec le débogueur ou la console entre deux).

---

#### 3.1 — Écouter le clic et éviter les doubles départs

- Sur `start`, enregistre un écouteur avec `addEventListener` et l’événement `'click'`.
- **Au tout début** du gestionnaire : si `running` vaut déjà `true`, une partie est en cours → affiche un `console.log` du genre « Une partie est déjà en cours » (ou équivalent), puis sors tout de suite avec `return` (sinon tu risques de lancer **plusieurs** minuteurs en même temps).
- **Sinon** une nouvelle partie **peut** démarrer : mets `running` à `true`, puis un autre `console.log` pour indiquer que la partie **démarre** (par ex. « Partie démarrée » et la valeur de `running`, ou `console.log("Partie démarrée, running =", running)`). Tu peux ainsi **tester** : un premier clic sur « Démarrer » affiche le message de départ ; un second clic affiche le message « déjà en cours » (tant que `running` reste `true`). **Note :** une fois l’étape 3.2 en place, « Démarrer » est grisé pendant la partie : pour voir les deux messages à la suite, teste avant d’ajouter la ligne qui désactive `start`, ou commente-la **temporairement**.

Tu peux partir de ce **squelette** (à compléter) :

```js
start.addEventListener("click", function () {
  // Si une partie est déjà en cours : console.log, puis return.
  // ...
  // Sinon : running = true, console.log "partie démarrée", puis enchaîne avec 3.2 et 3.3.
});
```

---

#### 3.2 — Lancer une nouvelle partie (avant le décompte répété)

Toujours **dans le même** gestionnaire de clic, **après** le `return` éventuel et le bloc 3.1 (`running` et les deux `console.log` possibles) :

1. Remets les variables d’état au départ : `time` à `10`, `score` à `0`.
2. Affiche ces valeurs à l’écran : mets à jour `timeEl.textContent` et `scoreEl.textContent` pour qu’elles affichent les mêmes nombres (pense à **convertir en texte** si besoin, par ex. avec `String(...)`).
3. Boutons : le joueur doit pouvoir cliquer sur « Clique ici ! » → `btn.disabled = false`. Pendant la partie, « Démarrer » ne doit pas être cliquable → `start.disabled = true`.

À ce stade, recharge la page, clique sur « Démarrer » : tu dois voir **10** et **0** aux bons endroits, le bon bouton grisé — même si le décompte **n’a pas encore** été codé ; dans la console, les messages de l’étape 3.1 confirment le premier démarrage (et le second message « déjà en cours » si tu peux encore enchaîner deux clics sur « Démarrer », voir la note en 3.1).

---

#### 3.3 — Minuteur : code fourni à comprendre et à corriger

La partie **répétée chaque seconde** (`setInterval`, arrêt avec `clearInterval`) n’a pas forcément été détaillée en cours : plutôt que de tout écrire de zéro, tu pars d’un **bloc déjà rédigé** à coller **à la fin** de ton gestionnaire sur `start`, **juste après** la mise à jour des boutons et de l’affichage de l’étape 3.2 (c’est bien là que le minuteur doit démarrer, une fois `running` déjà passé à `true` en 3.1).

**Documentation à parcourir si besoin :**

- [setInterval()](https://developer.mozilla.org/fr/docs/Web/API/setInterval) — ce que renvoie l’appel, ce que fait le délai en millisecondes
- [clearInterval()](https://developer.mozilla.org/fr/docs/Web/API/clearInterval) — quel argument lui passer et pourquoi

**Code à coller tel quel (il ne se comporte pas encore comme le jeu final) :**

```js
// setInterval enregistre un minuteur : il renvoie un identifiant (stocké dans timer) pour clearInterval, et rappelle la fonction ci-dessous à intervalle régulier.
timer = setInterval(function () {
  // Corps du décompte : exécuté à chaque « tick » du minuteur (voir le délai en millisecondes en bas).
  time = time - 1; // Retire une seconde au temps restant en mémoire.
  timeEl.textContent = String(time); // Met à jour le nombre affiché à l’écran (texte, pas un nombre brut).
  if (time === 0) {
    // Fin de partie : le temps affiché vient d’atteindre 0.
    btn.disabled = true; // Le joueur ne peut plus cliquer sur « Clique ici ! ».
    start.disabled = false; // « Démarrer » redevient cliquable pour une nouvelle partie.
    running = false; // Plus aucune partie en cours (cohérent avec le bouton Démarrer).
  }
}, 1000); // Délai entre deux appels : 1000 ms = 1 seconde.
```

**Avant de changer une ligne, réponds pour toi-même :**

- À quoi sert le nombre renvoyé par `setInterval` et stocké dans `timer` ?
  - Réponse:
- Si tu ne **stoppe** jamais l’intervalle, que devient `time` **après** l’affichage de `0` ? (Pense à la « seconde suivante » : le navigateur rappelle encore la fonction ou non ?)
  - Réponse:
- Où faudrait-il appeler `clearInterval` pour que le décompte **s’arrête** quand la partie est finie ?
  - Réponse:

Lance une partie et observe : tu devrais voir le temps descendre, puis un comportement **incorrect** (temps qui continue en dessous de zéro, ou minuteur qui ne s’arrête pas vraiment, selon ce que tu observes). **Corrige le bloc** (peu de lignes à ajouter ou à réorganiser) pour que :

1. Quand le temps affiché atteint **0**, la partie se termine comme prévu (boutons cohérents avec le comportement attendu en haut du README).
2. Le minuteur **ne continue pas** en arrière-plan une fois la partie terminée.

Tu peux poser un **point d’arrêt** dans la fonction passée à `setInterval` et regarder `time` à chaque passage : cela aide à voir pourquoi l’arrêt manque ou arrive trop tard.

---

### Étape 4 — Clic sur « Clique ici ! » (à coder toi-même)

**But :** c’est l’endroit du TP où tu **écris** le gestionnaire : écoute du clic sur le bouton de jeu, condition sur l’état du bouton, mise à jour du score et de l’affichage.

Sur `btn`, enregistre un écouteur `'click'` :

- Si le bouton est **désactivé**, ne rien faire (sinon tu pourrais compter des clics alors que le jeu ne devrait pas accepter d’action).
- Sinon : augmente `score` et mets à jour le texte affiché dans `scoreEl`.

**Questions à te poser :**

- Comment tester en JavaScript qu’un bouton est grisé / inactif ? (Tu as déjà utilisé `disabled` ailleurs.)
- Le score doit-il augmenter à **chaque** clic **pendant** une partie en cours ?
- `textContent` convient pour afficher le nombre : pense à passer une **chaîne** si besoin (`String(score)` ou équivalent).
- Faut-il **obligatoirement** tester `btn.disabled` dans ce gestionnaire ? (Indice : ce n’est pas toujours *indispensable* pour le comportement — un bouton HTML désactivé ne déclenche en général pas `click` — mais tu peux vérifier par toi-même avec l’essai ci-dessous.)

**Essai pour t’en convaincre :**

1. Dans ton gestionnaire sur `btn`, **commente** temporairement la condition qui vérifie si le bouton est inactif (et le `return` associé), pour que le corps du gestionnaire s’exécute **sans** ce test. Ainsi tu testes le jeu **sans** cette ligne.
2. En JavaScript, pour mettre du code « en pause » sans le supprimer :
   - `//` commente **tout le reste de la ligne** ;
   - `/* … */` entoure un bloc sur **une ou plusieurs lignes**.
3. Enregistre, recharge la page, lance une partie, attends la fin : « Clique ici ! » est grisé. Essaie encore de cliquer : le score augmente-t-il ? Remets ensuite la condition (ou décommente) : même si le navigateur bloque souvent les clics tout seul, garder un test explicite reste **clair** pour qui lit le code.

---

### Étape 5 — Vérifications

- Recharge plusieurs fois : la partie se termine à 0 s sans décompte fantôme.
- Le score augmente pendant les 10 secondes et s’affiche au bon endroit.

---

## Indices si tu es bloqué

- `setInterval` renvoie un **numéro** à passer à `clearInterval` en fin de partie.
- `btn.disabled` et `start.disabled` : `true` = bouton inactif.
- Temps qui continue après la fin : `clearInterval` manquant ou plusieurs `setInterval` non annulés.

---

## Aller plus loin (optionnel)

Ces idées partent du jeu qui fonctionne déjà : tu ajoutes des éléments dans le **HTML** (champs, boutons), tu les sélectionnes en JavaScript comme pour `start` et `btn`, et tu relies leurs **événements** (`change`, `click`) à des variables que tu utilises dans le minuteur ou l’affichage.

### Durée de partie paramétrable (15 s, 30 s, etc.)

**Idée :** au lieu d’un `time = 10` fixe au démarrage, la valeur vient d’un **choix utilisateur** avant ou pendant la configuration.

- **Interface :** un [`<select>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/select) avec des `<option value="10">`, `15`, `30`, ou un [`<input type="number">`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/number) avec `min` / `max` / `step`.
- **Script :** au clic sur « Démarrer », lis la valeur (`element.value` renvoie une **chaîne** : utilise `Number(...)` ou `parseInt(..., 10)` avant de l’affecter à `time`).
- **À anticiper :** si tu affiches le temps restant, pense à mettre à jour le texte initial du `<span>` du temps pour qu’il corresponde au choix (ou laisse « 10 » par défaut jusqu’au premier démarrage).

### Meilleur score avec `localStorage`

**Idée :** conserver le **record** entre deux rechargements de la page (le navigateur stocke des paires clé / valeur par **origine** du site).

- **Lecture au chargement :** [`localStorage.getItem('cle')`](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage) renvoie une chaîne ou `null` si la clé n’existe pas.
- **Écriture :** quand une partie se termine, si `score` bat l’ancien record, [`localStorage.setItem('cle', String(score))`](https://developer.mozilla.org/fr/docs/Web/API/Storage/setItem).
- **Affichage :** ajoute un paragraphe ou un `<span>` « Meilleur score : … » mis à jour après la fin de partie ou au `load` de la page.
- **Documentation :** [Utiliser l’API Web Storage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) (section *localStorage*).

### Pistes bonus

- **Bouton « Réinitialiser le record »** : `localStorage.removeItem('cle')` puis mise à jour de l’affichage.
- **Durée min / max** : valider la valeur saisie en JavaScript avant de lancer une partie (message d’erreur ou retour à une valeur par défaut).

