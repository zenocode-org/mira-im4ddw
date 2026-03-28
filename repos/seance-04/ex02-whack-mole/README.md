# TP 2 — Tape la taupe (grille 3×3)

**Fichier à rendre :** un seul `[index.html](index.html)` à ouvrir dans le navigateur. Les **consignes et la progression** sont dans ce README ; tu modifies **ce même fichier** jusqu’à ce que le comportement décrit plus bas soit correct.

---

## Objectifs du TP (ce que tu dois découvrir ici)

L’accent est sur la **manipulation du DOM** côté JavaScript — pas sur un framework :

- **Créer des éléments** (`createElement`), les **attacher** au document (`appendChild` sur la grille), et leur donner une **classe** (`classList`) pour le style et l’état « taupe ».
- **Écouter un clic** sur chaque case avec `addEventListener` : savoir **quelle** case a été cliquée au moment du clic (d’où l’importance de `**let`** dans la boucle qui crée les cases, pas `var`).
- **Aligner HTML et sélecteurs** : les `id` du HTML et les chaînes passées à `querySelector` doivent correspondre (comme au TP 1).
- **Répéter une action dans le temps** avec `setInterval`, et **arrêter** proprement avec `clearInterval` ; **terminer la partie** après environ 10 s (souvent avec un `**setTimeout`** en parallèle, ou une autre logique équivalente — voir l’étape 4).

Ce que tu **codes toi-même** en priorité : la fonction `**build`** (génération de la grille, cases cliquables, taupe au clic). Le README t’aide sur les **idées** et les **pièges** ; il ne remplace pas l’expérimentation avec le DOM.

### Documentation utile (à garder sous la main)

- [Document.createElement()](https://developer.mozilla.org/fr/docs/Web/API/Document/createElement)
- [Node.appendChild()](https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild)
- [Element.classList](https://developer.mozilla.org/fr/docs/Web/API/Element/classList)
- [EventTarget.addEventListener()](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener)
- [setInterval()](https://developer.mozilla.org/fr/docs/Web/API/setInterval) et [clearInterval()](https://developer.mozilla.org/fr/docs/Web/API/clearInterval)
- [setTimeout()](https://developer.mozilla.org/fr/docs/Web/API/setTimeout) (souvent pratique pour « dans 10 secondes, arrêter le jeu »)

---

## Comportement attendu (jeu final)

1. Au chargement, la grille est remplie de cases (sans taupe tant que la partie n’a pas démarré, selon ton implémentation — l’important est le comportement après « Démarrer »).
2. Après **« Démarrer »**, pendant **environ 10 s**, une case **orange** (classe `taupe`) **change de place** régulièrement (intervalle du type ~700 ms, ajustable).
3. **Cliquer** sur la case **actuellement** orange augmente le **score** et fait **disparaître** la taupe sur cette case (retirer la classe, mettre à jour l’état « case active »).
4. **Fin de partie** : plus de taupe sur la grille, **plus** d’intervalle qui tourne en arrière-plan (`clearInterval` sur l’identifiant stocké dans `loop`).

---

## Étapes (dans l’ordre, dans ton `index.html`)

### Étape 1 — Corriger les sélecteurs

En tête du `<script>`, le fichier te donne des **mauvais** `#id` à dessein. Avant de modifier quoi que ce soit, **ouvre la page dans le navigateur** et affiche la **console** (outils de développement : souvent `F12` ou clic droit → Inspecter → onglet Console).

Tu devrais voir une **erreur** au chargement : le script s’arrête parce qu’il tente d’appeler `start.addEventListener(…)` alors que `start` vaut `**null`**. `querySelector('#go')` (ou l’équivalent dans ton fichier) ne trouve **aucun** élément dans le HTML : la chaîne après `#` ne correspond à **aucun** `id` réel sur la page — d’où `null`, et le message du type Cannot read properties of null ou can't access property "addEventListener", start is null selon le navigateur.

**À retenir :** une erreur sur `… is null` + `.addEventListener` pointe souvent vers un **sélecteur qui ne matche pas le HTML** (mauvais `id`, faute de frappe, élément absent).

Ensuite, ouvre le HTML du `<body>` : repère les **vrais** `id` de la grille, du bouton « Démarrer » et du `<span>` du score, et **adapte les trois** `querySelector` pour qu’ils pointent vers ces éléments. Recharge la page : l’erreur liée à `addEventListener` sur `null` doit **disparaître** (le script peut encore ne rien afficher de jouable tant que `build` et le clic sur « Démarrer » ne sont pas codés — c’est normal).

**Vérification :** après correction, `grid`, `start` et `scoreEl` ne doivent **pas** être `null` (tu peux temporairement ajouter `console.log(grid, start, scoreEl);` puis retirer la ligne, ou utiliser le debugger).

---

### Étape 2 — Lire les variables déjà déclarées

Sans tout coder tout de suite, comprends le rôle de chaque variable :


| Variable | Rôle typique                                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| `cells`  | Tableau des **éléments** des cases (dans l’ordre 0…8), pour savoir où est la taupe.                         |
| `score`  | Nombre de taupes touchées ; à afficher dans `scoreEl`.                                                      |
| `loop`   | Identifiant renvoyé par `setInterval` — à passer à `clearInterval` pour arrêter le déplacement de la taupe. |
| `active` | Indice de la case qui a **actuellement** la classe `taupe` (souvent `-1` si aucune).                        |


---

### Étape 3 — Fonction `build` : génération de la grille (**à coder toi-même**)

**But global :** remplir `grid` avec **9** `div`, chacune avec la classe `**case`** (le CSS est déjà là), les ranger dans `cells`, et attacher un **gestionnaire de clic** sur chaque case. Tu peux avancer sous-étape par sous-étape et tester au fur et à mesure (par ex. vérifier dans l’inspecteur que les 9 cases apparaissent).

#### 3.1 — Repartir sur une grille vide

- **Vider** le contenu actuel de `grid` : `innerHTML = ''` (et, si tu utilises un tableau global `cells`, le **réinitialiser** aussi : `cells = []`), pour pouvoir reconstruire proprement si tu rappelles `build` plus tard.
- Sans cette étape, un second appel à `build` pourrait **empiler** des cases en double.

#### 3.2 — Créer les neuf cases et les enregistrer

- Boucle **9 fois** (`for (...) {}`).
- À chaque tour : créer un `div` avec `document.createElement('div')`, lui ajouter la classe `case` (`classList.add('case')`), l’ajouter à `grid` avec `appendChild`, et **pousser** la variable `cell` (l'element `div`) dans `cells` (`cells.push(...)`).

À ce stade, recharge la page : tu dois voir une grille de 9 cases cliquables visuellement, même si le clic ne fait encore rien d’utile. Tu peux vérifier dans l’inspecteur que les neuf `div` sont bien présentes.

#### 3.3 — Réagir au clic sur une case (bonne case = taupe)

- Sur **chaque** case (`cell`), enregistre un gestionnaire avec `addEventListener('click', …)`.
- Dans le gestionnaire : si l’indice de **cette** case est égal à `active` **et** qu’il y a bien une taupe en jeu (`active !== -1`), alors :
  - augmenter `score` ;
  - mettre à jour le texte affiché dans `scoreEl` ;
  - retirer la classe `taupe` sur la cellule concernée ;
  - remettre `active` à `-1`.

##### Piège classique : `let` vs `var` dans la boucle

Si tu écris `for (var i = 0; …)` et que tu utilises `i` dans le gestionnaire de clic, au moment du clic `i` vaut souvent **9** pour **toutes** les cases (une seule variable partagée). Utilise `**for (let i = 0; …)`** pour qu’à chaque tour de boucle, le gestionnaire « se souvienne » du bon indice. Tu peux aussi figer l’indice autrement (fonction qui prend `i` en paramètre, etc.) si tu préfères.

---

### Étape 4 — Bouton « Démarrer » : intervalle + fin de partie à ~10 s

**But global :** au clic sur « Démarrer », lancer une **nouvelle** manche : remettre le **score** à 0, l’**afficher**, faire apparaître et déplacer la taupe pendant **environ 10 s**, puis tout **arrêter** proprement.

**Comment travailler :** avant de remplir les trous, parcours ton `index.html` (étapes 2 et 3 déjà codées) : repère où `score`, `active`, `cells` et `loop` sont lus ou modifiés. Les **questions** ci-dessous sont des guides : réponds-y en t’appuyant sur le code, **puis** complète les blocs. Le corrigé (`solution-index.html`) sert surtout si tu bloques, pas comme premier réflexe.

---

#### 4.1 — Reset avant une nouvelle manche

Une **nouvelle** partie commence par remettre l’**état** du jeu dans une situation connue : score, affichage, taupe à l’écran, et minuteurs éventuels de la manche précédente.

##### 4.1.1 — Explorer le fichier avant de coder

- Où **déclare**-tu `loop` et `finPartie` ? À quoi elles servent **avant** que tu cliques sur « Démarrer » (valeur initiale) ?
- Dans l’étape 3, quand tu as bien touché la taupe, `active` passe à quelle valeur ? Que signifie cette « convention » pour la suite ?
- Si tu **ne** faisais **pas** `clearInterval` avant de relancer une partie, combien de `setInterval` pourraient tourner en même temps après deux clics sur « Démarrer » ? Qu’observerais-tu dans le jeu (même sans l’avoir encore codé) ?

##### 4.1.2 — Annuler les anciens minuteurs

À quoi sert `clearInterval` : quelle **information** lui doit-on passer (indice : la même que celle stockée dans `loop` quand tu as lancé `setInterval`) ? Même idée pour `clearTimeout` et `finPartie`.

- **Question :** pourquoi remettre `loop` et `finPartie` à `null` **après** les `clear` ? (À quoi ça sert « dans la tête du programme » ?)

Complète les blocs suivants au **début** du gestionnaire sur `start` :

```javascript
  // Si une partie précédente a laissé un intervalle actif, on l’arrête avant d’en créer un nouveau.
  if (loop !== null) {
    clearInterval(___);  // quelle variable contient l’identifiant à annuler ?
    loop = null;
  }
  // Idem pour la fin de partie programmée (setTimeout).
  if (finPartie !== null) {
    clearTimeout(___);
    finPartie = null;
  }
```

*(Résumé : `null` = « pas de minuteur enregistré pour cette variable » ; sinon tu risques plusieurs parties en parallèle — voir 4.5.)*

##### 4.1.3 — Remettre le score à zéro

- **Question :** au début d’une **nouvelle** manche, quelle valeur numérique doit avoir `score` dans la variable JavaScript ? Et que doit afficher `scoreEl` (même principe qu’à l’étape 3 quand le score augmente) ?

```javascript
  score = ___;
  scoreEl.textContent = ___;
```

##### 4.1.4 — Nettoyer la taupe à l’écran

- **Question :** si une manche précédente s’est arrêtée alors qu’une case était encore orange, quelle variable te dit **quelle** case enlever ? Pourquoi tester `active !== -1` avant d’appeler `remove` (pense au cas « aucune taupe à l’écran ») ?
- **Question :** à quoi sert `cells[active]` dans la condition (que se passe-t-il si `active` pointait vers une case qui n’existe plus) ?

```javascript
  // Nettoyer l’affichage : enlever la taupe sur la case mémorisée, si elle existait encore.
  if (active !== -1 && cells[active]) {
    cells[active].classList.remove('taupe');
  }
  active = ___;  // quelle valeur indique « aucune case active » ? (voir étape 2)
```

---

#### 4.2 — Déplacer la taupe avec `setInterval`

##### 4.2.1 — Comprendre ce que fait `setInterval`

- **Question :** en lisant `setInterval` sur [MDN](https://developer.mozilla.org/fr/docs/Web/API/setInterval) (ou dans ton cours), **combien de fois** la fonction passée en premier argument est-elle exécutée **tant que** tu n’appelles pas `clearInterval` ?
- **Question :** en quoi est-ce différent d’une boucle `for` qui ferait 100 tours d’affilée ? (Indice : le navigateur peut faire autre chose entre deux appels.)

Optionnel : une fois ton intervalle en place, tu peux temporairement ajouter `console.log('tick')` dans la fonction pour **voir** la répétition dans la console.

##### 4.2.2 — Décider quoi faire à chaque « tick »

Sans écrire encore tout le code, réponds :

- **Question :** dans quel ordre logique dois-tu : (a) retirer la classe `taupe` sur l’ancienne case, (b) tirer un nouvel indice aléatoire, (c) mettre à jour `active`, (d) ajouter `taupe` sur la nouvelle case ? Pourquoi **ne pas** tirer le hasard avant d’avoir enlevé la taupe sur l’ancienne position (lien avec 4.3) ?

##### 4.2.3 — Compléter le bloc

- **Question :** au **premier** passage dans la fonction, après le reset, `active` vaut souvent `-1`. Que se passerait-il si tu faisais `cells[active]` dans ce cas ? D’où le `if (active !== -1)` au début.

```javascript
loop = setInterval(function () {
  // Ancienne taupe : on ne retire que si une case était déjà « active ».
  if (active !== -1) {
    cells[active].classList.remove('taupe');
  }
  // Nouvelle case : indice entier entre 0 et (nombre de cases − 1).
  active = Math.floor(Math.random() * ___);
  cells[active].classList.add('taupe');
}, ___);  // ex. 700 → une nouvelle case environ toutes les 0,7 s
```

N’oublie pas : le **retour** de `setInterval` doit être stocké dans `loop` (déjà fait dans le bloc ci-dessus).

---

#### 4.3 — Corrige le bug : taupe qui « s’empile »

##### 4.3.1 — Observer et formuler une hypothèse

Voici un comportement **incorrect** (à ne pas garder tel quel dans ton fichier) :

```javascript
// BUG — à ne pas laisser tel quel
  loop = setInterval(function () {
    active = Math.floor(Math.random() * 9);
    cells[active].classList.add('taupe');
  }, 700);
```

- **Question :** après plusieurs ticks, combien de cases peuvent avoir la classe `taupe` en même temps ? Dessine ou décris ce que tu vois (ou imagine) à l’écran.
- **Question :** quelle **étape** manque par rapport à ta liste 4.2.2 ?

##### 4.3.2 — Corriger dans ton code

Réécris le `setInterval` comme en **4.2.3** (retirer sur l’ancienne case **avant** de remplacer `active` par le nouvel indice), sans recopier mécaniquement le corrigé : vérifie que le flux correspond à tes réponses.

---

#### 4.4 — Fin de partie après ~10 s avec `setTimeout`

##### 4.4.1 — Deux minuteurs en même temps

- **Question :** `setInterval` s’arrête-t-il **tout seul** après 10 secondes ? Si non, comment « prévoir » un événement **une seule fois** à l’instant où la manche doit finir ?
- **Question :** pourquoi parle-t-on de « en parallèle » : le `setTimeout` tourne-t-il en même temps que `setInterval` dans le sens où les deux sont **programmés** avant la fin de la manche ?

##### 4.4.2 — Stocker `finPartie` et tout arrêter au bon moment

- **Question :** au début d’une **nouvelle** partie (4.1), pourquoi peut-on avoir besoin d’annuler l’**ancien** `setTimeout` avec `clearTimeout(finPartie)` ? (Imagine : partie relancée avant la fin des 10 s.)
- **Question :** dans le callback du `setTimeout` (fin de manche), pourquoi appelle-t-on `clearInterval` **là** ? Qu’arriverait-il à la taupe si on arrêtait l’intervalle mais qu’on oubliait de retirer la classe `taupe` sur la cellule courante ?

Complète les `___` :

```javascript
finPartie = setTimeout(function () {
  // Fin de manche : arrêter le déplacement périodique de la taupe.
  clearInterval(___);
  loop = null;
  finPartie = null;

  if (active !== -1) {
    cells[active].classList.remove('taupe');
  }
  active = ___;
}, ___);  // durée en millisecondes
```

##### 4.4.3 — Convertir 10 secondes en millisecondes

- **Question :** combien de millisecondes dans **une** seconde ? Dans **dix** secondes ? (Écris le calcul en une ligne.) Passe ce résultat comme **nombre** au deuxième argument de `setTimeout` (ex. `10000`), pas une expression qui pourrait rester une chaîne par erreur.

---

#### 4.5 — Ordre des morceaux (ce que tu dois avoir au final)

Dans le gestionnaire `start.addEventListener('click', function () { ... })`, l’ordre logique est en général :

1. Annuler les anciens minuteurs (`clearInterval` / `clearTimeout`) et remettre `loop` et `finPartie` à `null` quand c’est fait.
2. Remettre le score à 0, l’afficher, nettoyer la taupe à l’écran si besoin (`active`, classes CSS).
3. Lancer `setInterval` (déplacement de la taupe) → résultat dans `loop`.
4. Lancer `setTimeout` (fin de manche après 10 s) → résultat dans `finPartie`.

**Vérification :** compare mentalement chaque étape avec ton fichier : si tu inverses 3 et 4, la fin de partie pourrait-elle s’exécuter avant que le jeu ne démarre ? Si tu mets le reset du score **après** `setInterval`, que se passerait-il ?

---

#### 4.6 — À relire sur MDN

- Ce que **renvoie** `setInterval` / `setTimeout`, quels arguments passer à `clearInterval` / `clearTimeout`, et pourquoi **sans** `clearInterval` le code continue en arrière-plan même quand la manche est « finie » visuellement.

---

### Étape 5 — Vérifications

- Sélecteurs corrects, pas de `null`.
- Taupe qui **bouge** pendant ~10 s, puis **disparaît** et plus de boucle parasite.
- Score qui augmente seulement quand on clique sur la **bonne** case orange.

---

## Indices si tu es bloqué

- `Math.floor(Math.random() * 9)` → entier entre **0** et **8** inclus.
- `classList.add('taupe')` / `classList.remove('taupe')` pour montrer ou cacher la taupe sans changer tout le HTML à la main.
- Plusieurs intervalles qui se chevauchent : `clearInterval` au bon moment + une variable booléenne « partie en cours » si besoin.

---

## Aller plus loin (optionnel)

Une fois la grille 3×3 et la logique de jeu stables, tu peux rendre l’expérience **configurable** sans framework : tout passe par du HTML supplémentaire, des variables partagées entre `build` et le gestionnaire de « Démarrer », et un peu de CSS pour la mise en page.

### Choisir la taille de la grille (liste, boutons radio, nombre)

**Idée :** l’utilisateur indique combien de **cases** il veut (ou une grille **N×N**), par exemple 9 (3×3), 16 (4×4), 25 (5×5).

- **Interface :** une liste déroulante `[<select>](https://developer.mozilla.org/fr/docs/Web/HTML/Element/select)` dont les `value` sont `9`, `16`, `25`, ou un `[<input type="number">](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/number)` pour le **côté** de la grille (3, 4, 5…) avec `min` et `max`.
- **Calculs :** si tu stockes le **nombre total de cases** dans une variable `nbCases` (ex. 16), la boucle dans `build` devient `for (let i = 0; i < nbCases; i++)`. Le tirage aléatoire utilise `Math.floor(Math.random() * nbCases)`.
- **CSS :** pour une grille carrée, `[grid-template-columns](https://developer.mozilla.org/fr/docs/Web/CSS/grid-template-columns)` peut dépendre de `N` : soit tu définis des classes `.grille-3`, `.grille-4` en dur, soit tu construis la propriété en JavaScript (`element.style.gridTemplateColumns = 'repeat(' + n + ', 4rem)'`). Voir [CSS Grid — grilles](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout).
- **Quand reconstruire :** au changement de taille, appelle à nouveau `build()` (après avoir vidé `grid` et réinitialisé `cells`) ; pense à **annuler** les anciens `setInterval` / `setTimeout` si une partie était en cours.

### Difficulté : vitesse de la taupe

**Idée :** raccourcir l’intervalle (par ex. **500 ms** au lieu de 700 ms) pour que la taupe change de case plus souvent.

- Le délai est le **deuxième argument** de `setInterval(fn, delaiMs)` : tu peux le stocker dans une variable lue depuis un `<select>` (« Lent / Normal / Rapide ») ou un `<input type="range">` ([documentation](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/range)).
- Vérifie que tu passes bien un **nombre** (pas une chaîne) à `setInterval`.

### Durée de partie ou score cible

**Idée :** laisser le joueur choisir la **durée** de la manche (10 s, 20 s) comme au TP 1, ou arrêter après **N** taupes touchées (compteur + condition dans le gestionnaire de clic).

- Pour un temps variable : le `10000` dans `setTimeout(..., 10000)` devient une variable en millisecondes (`secondes * 1000`).

### Documentation utile pour ces extensions

- [Document.createElement()](https://developer.mozilla.org/fr/docs/Web/API/Document/createElement), [Node.appendChild()](https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild) — déjà utilisés pour les cases ; même principe pour ajouter des contrôles dans le HTML.
- [HTMLElement.style](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/style) — pour ajuster dynamiquement la grille sans multiplier les feuilles de style.

