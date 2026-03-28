# TP 3 — Temps de réaction

**Fichier à rendre :** un seul `[index.html](index.html)` à ouvrir dans le navigateur. Les **consignes** sont dans ce README ; tu travailles dans le **script** du même fichier (comme au [TP 1](../ex01-click-counter/README.md)).

Le fichier de départ contient des **trous**, des **bugs volontaires** et des **commentaires** qui expliquent le fil du programme. Ton objectif est de comprendre **l’état du jeu** (variables + timers + événements) et de le faire fonctionner pas à pas.

---

## Idée générale (pourquoi ce code ?)

Tu construis une **mini machine à états** :

1. **Repos** — aucune manche en cours : pas d’attente du vert, zone grise, texte du type « Appuie sur Espace ».
2. **Attente du vert** — une manche est lancée : un `setTimeout` va déclencher le passage au vert après un délai aléatoire ; le bouton peut afficher « Attends… ».
3. **Vert** — le joueur doit cliquer ; tu enregistres **à quel instant** le vert est apparu (`greenAt`) pour comparer avec l’instant du clic (`Date.now()`).

Les **deux variables clés** :


| Variable  | Rôle                                                                                                                          |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `greenAt` | Horodatage en ms quand la zone **devient** verte (`0` = « pas encore vert » ou « déjà traité »).                              |
| `to`      | Valeur retournée par `setTimeout` : sert à `**clearTimeout`** si la manche est annulée (trop tôt, nouvelle manche, touche R). |


Sans `to`, tu ne peux pas annuler le délai : un ancien timer pourrait encore passer au vert alors qu’une nouvelle manche a commencé.

---

## Ce que tu dois faire dans `index.html`


| #          | Type        | Quoi                                                                                                                                                                                                                                          |
| ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trou 1** | À compléter | Corriger le **sélecteur** de `msEl` : l’`id` dans le HTML utilise un **tiret** (`resultat-ms`). En CSS/JS, `#resultat-ms` est valide ; un mauvais caractère fait que `querySelector` renvoie `null` et le script plante au premier affichage. |
| **Trou 2** | À compléter | Dans le **callback** du `setTimeout` (au moment où la zone passe au vert), enregistrer l’instant avec `**Date.now()`** — pas `0`, sinon la condition `greenAt > 0` au clic reste fausse.                                                      |
| **Bug 1**  | À corriger  | La touche **Espace** : pour un `keydown`, `event.key` vaut souvent `**' '`** (un espace), pas la chaîne `'Space'`. Dans **certains** environnements, `event.key === 'Space'` peut être vrai — mais ce n’est **pas fiable partout** (navigateur, OS, disposition clavier). Ne te contente pas d’une seule condition qui marche « chez toi » : combine plutôt **`event.code === 'Space'`** et/ou **`event.key === ' '`** (voir extrait ci-dessous). |
| **Bug 2**  | À corriger  | Après un **clic réussi** (temps affiché), **ne pas** appeler `resetEtat()` : cette fonction remet aussi le résultat à « – » et **efface** les millisecondes tout de suite. Remets seulement le **bouton** (classe `vert`, texte d’accueil).   |


Une fois les quatre points traités, le jeu doit se comporter comme dans le tableau **Synthèse du comportement** plus bas.

---

## Synthèse du comportement (vue rapide)


| Situation                                    | Zone / bouton                      | `#resultat-ms`                     |
| -------------------------------------------- | ---------------------------------- | ---------------------------------- |
| Repos au chargement                          | Gris, « Appuie sur Espace »        | `–`                                |
| Manche : attente du vert                     | Gris, « Attends… »                 | inchangé                           |
| Manche : c’est au vert                       | Vert, « Clique ! »                 | inchangé                           |
| Clic **trop tôt**                            | Message type « Trop tôt ! »        | `—`                                |
| Clic **après** le vert                       | Gris + « Appuie sur Espace »       | **ms mesurées** (restent visibles) |
| Touche **R** ou **nouvelle manche** (Espace) | Selon `resetEtat` / `lancerManche` | `–` si tu réinitialises tout       |


Après un **clic valide**, le temps doit **rester lisible** ; seul **R** ou le lancement d’une **nouvelle manche** efface ou remplace ce qui est affiché dans `#resultat-ms`.

---

## Ordre de travail conseillé

1. **Trou 1** — Ouvre les outils de développement (F12) : si `msEl` est `null`, corrige le sélecteur en regardant l’`id` réel dans le HTML.
2. **Bug 1** — Vérifie que **Espace** lance bien une manche.
3. **Trou 2** — Vérifie qu’après le vert, un clic affiche un **nombre** de millisecondes.
4. **Bug 2** — Vérifie que ce **nombre reste affiché** (ne disparaît pas instantanément).

---

## Indices ciblés (sans tout donner)

### Espace et `event.repeat`

```js
document.addEventListener('keydown', function (event) {
  if (event.repeat) return;

  if (event.code === 'Space' || event.key === ' ') {
    event.preventDefault();
    lancerManche();
    return;
  }
  // …
});
```

`event.repeat` évite de relancer une manche plusieurs fois quand la touche reste enfoncée.

**Pourquoi ne pas s’arrêter à `event.key === 'Space'` ?** La spécification et les implémentations ne garantissent pas la même valeur de `key` pour la barre d’espace sur tous les navigateurs et toutes les configurations. `event.code === 'Space'` décrit la **touche physique** (plus stable pour « la barre d’espace »), et `event.key === ' '` couvre le cas où `key` est l’espace Unicode. Les **deux** ensemble (comme dans l’extrait) évitent les surprises pour les correcteurs et les camarades qui testent ailleurs.

### Après un clic valide (sans effacer le résultat)

À la place de `resetEtat()` :

```js
greenAt = 0;
pad.classList.remove('vert');
pad.textContent = messageAccueil;
```

Le `msEl` a déjà reçu `String(ms)` juste avant.

### Erreur fréquente : deux `setTimeout` sans garder le premier id

Si tu réassignes `to` sans avoir annulé l’ancien timer, le premier délai peut quand même s’exécuter. D’où `clearTimeout(to)` dans `resetEtat` avant une nouvelle manche.

### Après « trop tôt » : remettre `greenAt` à `0`

Sinon un ancien `greenAt` pourrait fausser la branche « mesure » au clic suivant.

---

## Checklist de relecture

- Sélecteurs alignés sur les `id` du HTML.
- `greenAt = Date.now()` **dans** le callback du timer, au moment où tu passes au vert.
- Pas de `resetEtat()` juste après avoir affiché le temps de réaction.
- Espace : condition **portable** (`code` + `key`), pas uniquement `event.key === 'Space'` parce que ça marche sur une machine de test.
- Touche R : tout revenir à un état « prêt » (timer annulé, affichage cohérent).

---

## Documentation utile

- [Document.querySelector()](https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector)
- [setTimeout()](https://developer.mozilla.org/fr/docs/Web/API/setTimeout) et [clearTimeout()](https://developer.mozilla.org/fr/docs/Web/API/clearTimeout)
- [KeyboardEvent](https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent) (`key`, `code`, `repeat`)
- [EventTarget.addEventListener()](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener)

---

## Aller plus loin (optionnel)

Le cœur du TP est une **manche** : délai aléatoire, passage au vert, mesure. Tu peux enrichir l’expérience en accumulant des **données** sur plusieurs manches et en les affichant dans le DOM.

### Plusieurs manches et statistiques

**Idée :** après chaque clic valide (temps de réaction affiché), **incrémenter un compteur** de manches et garder la somme ou le minimum des temps pour afficher une **moyenne** ou un **meilleur temps** sur la session.

- Stocke les durées dans un **tableau** (`[Array.prototype.push](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/push)`) ; pour une moyenne, divise la somme par `tableau.length`. Pour le minimum, `[Math.min](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/min)` avec plusieurs valeurs ou une boucle.
- Ajoute des éléments HTML (`<p>`, `<span>`) pour « Manche n / Moyenne : … ms / Meilleur : … ms » et mets à jour leur `textContent` après chaque mesure.

### Plage de délai avant le vert

**Idée :** le délai aléatoire est actuellement du type `500 + rand(2000)` ms. Tu peux le rendre **réglable** avec deux champs nombre (min / max) ou un `<select>` (« Facile / Difficile ») qui change les bornes utilisées dans le `setTimeout`.

- Pense à **convertir** les valeurs lues depuis `input.value` en nombres et à vérifier que min ≤ max avant de lancer une manche.

### Historique des temps (liste dans la page)

**Idée :** à chaque fin de manche réussie, **créer** un élément de liste (`[<li>](https://developer.mozilla.org/fr/docs/Web/HTML/Element/li)` dans un `[<ul>](https://developer.mozilla.org/fr/docs/Web/HTML/Element/ul)`) avec le temps en millisecondes, ou concaténer une ligne de texte dans un `<pre>` / `<div>`.

- `[document.createElement](https://developer.mozilla.org/fr/docs/Web/API/Document/createElement)` + `[appendChild](https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild)` — même approche que pour construire la grille au TP 2.
- Limite éventuelle : ne garder que les **10 derniers** essais (supprimer le premier enfant du conteneur avec `[removeChild](https://developer.mozilla.org/fr/docs/Web/API/Node/removeChild)` ou vider puis reconstruire).

### Persistance du meilleur temps avec `localStorage`

**Idée :** comme au TP 1, enregistrer le **record** (plus petit temps = mieux) avec `[localStorage.setItem](https://developer.mozilla.org/fr/docs/Web/API/Storage/setItem)` et l’afficher au chargement avec `[getItem](https://developer.mozilla.org/fr/docs/Web/API/Storage/getItem)`. Comparer à chaque manche réussie : si `temps < ancienRecord`, mettre à jour.

- Voir [Utiliser l’API Web Storage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API).

### Accessibilité / confort (bonus technique)

**Idée :** si la zone de jeu est un gros bouton, les lecteurs d’écran utilisent déjà `aria-label` ; tu peux mettre à jour ce libellé en JavaScript quand l’état change (« Attendre le vert », « Cliquer maintenant ») via `[setAttribute('aria-label', '…')](https://developer.mozilla.org/fr/docs/Web/API/Element/setAttribute)`.