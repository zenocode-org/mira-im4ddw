# TP — Météo avec Open-Meteo (`fetch` et asynchrone)

**Durée indicative :** 1 h 30  
**Fichier à rendre :** `[index.html](index.html)` complété (un seul fichier ; le HTML et le CSS sont déjà fournis, tu travailles dans le `<script>`).

Le départ est **minimal** : une URL incorrecte et un premier `fetch` dans `chargerMeteo`. Tu **construis** le reste **petit morceau par petit morceau** : chaque étape te donne un fragment de code ou une consigne pour compléter toi-même, puis une courte explication. Ne saute pas d’étape : elles s’enchaînent logiquement. Vers la fin du TP, l’**étape 9** enchaîne : après avoir lu `data`, tu **parcours** les jours avec **`forEach`** (et l’indice **`i`**) pour lire les trois tableaux **en parallèle** et **ajouter** chaque ligne à la liste HTML.

---

## Lis d’abord ceci

Les notions de **JSON** et de **communication entre la page et un serveur distant** ne sont pas encore vues en cours sous cet angle. Avant de coder, lis le fichier **[JSON-et-API.md](JSON-et-API.md)** (10 minutes environ). Le README du TP ne répète pas tout ce contenu.

---

## L’onglet Réseau (*Network*) pendant le TP

Tu vas t’appuyer sur l’onglet **Réseau** des outils développeur pour **voir** la requête vers Open-Meteo et **lire** la réponse du serveur. **Dès l’étape 1**, ouvre cet onglet en parallèle de la **Console** : tu y verras une requête avec un code **404** (chemin incomplet), puis plus tard une requête **réussie** (statut **200**, corps JSON).

**À faire au moins une fois après une requête réussie :**

1. Ouvre **`index.html`** dans le navigateur, puis **F12** → onglet **Réseau** (Firefox) ou **Network** (Chrome / Edge).
2. Recharge la page (**F5**) après que ton script appelle `fetch`.
3. Repère la ligne dont l’URL contient **`api.open-meteo.com`** (quand l’URL sera corrigée) et clique dessus.
4. Ouvre le sous-onglet **Réponse** / **Response** (ou **Aperçu** / **Preview**) : tu y vois le JSON brut. Compare-le avec ce que tu utilises en JavaScript (`data.daily.time`, etc.).
5. Regarde aussi les **En-têtes** (*Headers*) : méthode, URL complète, **code de statut** HTTP.

Les noms de menus varient selon le navigateur ; le détail (filtres *Fetch*, *Preserve log*, sous-onglets *Headers* / *Response*) est expliqué dans **[JSON-et-API.md](JSON-et-API.md)** § 4.

---

## Objectifs du TP (ce que tu dois savoir faire après)

- Expliquer en une phrase pourquoi **`fetch`** ne « renvoie pas tout de suite » les données affichables.
- Construire une **URL** d’API avec paramètres (`latitude`, `longitude`, `daily`, `timezone`).
- Enchaîner **`await fetch(...)`**, vérifier **`response.ok`**, puis **`await response.json()`** pour obtenir un **objet** JavaScript.
- **Lire** des données **imbriquées** (`data.daily`, etc.), puis **parcourir** les jours avec **`forEach`** en utilisant le **même indice** `i` sur les tableaux `time`, `temperature_2m_max`, `temperature_2m_min` ; pour chaque jour, créer un **`<li>`** (`createElement`), le remplir, l’**ajouter** à la liste.
- Gérer un message de **chargement** et un message d’**erreur** si la requête échoue.
- Utiliser l’onglet **Réseau** pour contrôler la requête HTTP et le corps JSON de la réponse.

### Documentation utile

- [Utiliser fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)
- [Codes de statut HTTP (référence MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [async function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function)
- [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Array.prototype.forEach](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [Open-Meteo — API Forecast](https://open-meteo.com/en/docs) (aperçu des paramètres)

### Outils (rappel)

- **Réseau** (*Network*) : voir la section **L’onglet Réseau (*Network*) pendant le TP** plus haut dans ce fichier, et le [§ 4 de JSON-et-API.md](JSON-et-API.md#4-longlet-réseau-network).
- **Console** (**F12** → onglet *Console*) : erreurs JavaScript, `console.log` pour inspecter une variable.
- **Débogueur** (*Débogueur* / *Sources*) : poser un **point d’arrêt** sur une ligne avec `await` pour voir l’ordre d’exécution et les valeurs (`data`, `response`, etc.). Tu as déjà vu une introduction au débogueur en séance ; ici sers-t’en si le flux `async` / `await` te semble flou.

---

## Comportement attendu (résultat final)

À la fin de **toutes** les étapes :

1. Au **chargement** de la page, un texte du type « Chargement… » apparaît brièvement.
2. Ensuite s’affiche le nom de la ville (**Ajaccio** ou celle dont tu as choisi les coordonnées) et une **liste des prévisions** sur plusieurs jours : pour chaque jour, la **date** et les températures **max** et **min** (en °C), issues de l’API Open-Meteo.
3. Si la requête échoue (réseau coupé, URL incorrecte, etc.), un message d’**erreur** visible remplace l’état de chargement ; la liste reste vide ou cohérente avec ce que tu as codé.

Au **départ** (étape 1 seule), la page ne fait qu’exécuter un `fetch` vers une URL **incomplète** (`…/v1` seulement) : le serveur répond **404** — c’est le scénario voulu pour comprendre ce code HTTP avant de construire la bonne URL.

---

## API utilisée (référence — à utiliser à partir de l’étape 2)

Exemple d’URL **valide** :

```txt
https://api.open-meteo.com/v1/forecast?latitude=41.9189&longitude=8.7381&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FParis
```

Les valeurs `latitude` et `longitude` ci-dessus correspondent à **Ajaccio** ; tu peux les remplacer par celles d’**une autre ville** si tu préfères (voir étape 2).

Pour voir directement la réponse de l’API, **clique sur le lien** ci-dessus : le navigateur affichera le résultat renvoyé par le serveur (en JSON).

La réponse JSON contient notamment un objet `daily` avec des **tableaux** `time`, `temperature_2m_max`, `temperature_2m_min` (un indice = un jour). Il existe aussi `daily_units` : ce sont des **libellés d’unités** (ex. `"°C"`), pas les valeurs des températures jour par jour — tu vas t’en rendre compte **en manipulant** les deux à l’étape 6.

---

## Étapes (dans l’ordre, dans ton `index.html`)

### Étape 1 — Premier `fetch`, Console et Réseau (compréhension) — réponse **404**

**But :** voir **qu’une requête HTTP part** depuis ta page, recevoir une **réponse** du serveur (même « négative »), et savoir **lire le code de statut** dans la Console et dans l’onglet Réseau.

1. Ouvre `[index.html](index.html)` **dans le navigateur**.
2. Ouvre les outils développeur (**F12**), puis :
   - l’onglet **Console** ;
   - l’onglet **Réseau** / **Network** (voir aussi [JSON-et-API.md](JSON-et-API.md) § 4 et § 5).
3. Si la liste du Réseau est vide, c’est normal : elle ne se remplit qu’à partir du moment où l’onglet est ouvert (recharge ensuite si besoin).
4. **Recharge** la page (**F5**).

#### Captures d’écran (où voir le **404**)

Les fichiers **`[logs.png](logs.png)`** et **`[networktab.png](networktab.png)`** (même dossier que ce README) montrent **le même scénario** que ton départ : requête vers `api.open-meteo.com` avec une URL incomplète (`…/v1` seulement) → réponse **404**.


| Image                              | Où regarder                     | Ce qu’on voit                                                                                                                                                                                 |
| ---------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[logs.png](logs.png)`             | Onglet **Console**              | Les messages du script : objet `Response`, **`status HTTP : 404`**, **`response.ok : false`** — ce n’est **pas** une erreur JavaScript dans le `catch`, c’est la **réponse HTTP** du serveur. |
| `[networktab.png](networktab.png)` | Onglet **Réseau** / **Network** | La ligne de la requête vers le serveur Open-Meteo ; colonne **Statut** / **Status** en **404** (souvent la ligne en rouge). C’est **ici** qu’on vérifie le code HTTP côté « trafic ».         |


Le script appelle déjà **`chargerMeteo()`**, qui fait un **`fetch(URL_METEO)`**. L’URL est volontairement incomplète : elle se termine par **`/v1`** seulement — il n’y a ni **`/forecast`**, ni paramètres (`latitude`, `longitude`, etc.). Le serveur Open-Meteo **répond** quand même (le domaine est bon), mais il indique qu’**il n’y a pas de ressource** à cette adresse précise : c’est une erreur HTTP **404 Not Found** (« non trouvé »).

#### Qu’est-ce que **`fetch`** ?

`fetch` est une **fonction du navigateur** (API [Fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)) : tu lui passes une **URL** (et éventuellement des options), et elle **envoie une requête HTTP** au serveur (souvent en GET). Elle **ne renvoie pas tout de suite** les données affichables : elle retourne une **`Promise`** qui, une fois résolue, donne un objet **`Response`** (statut HTTP, en-têtes, corps de la réponse). Pour obtenir un **objet JavaScript** à partir du corps JSON, il faut enchaîner avec `response.json()` (souvent après `await fetch(...)`).

#### Qu’est-ce qu’un **404** ?

- Le **404** est un **code de statut** HTTP : la requête a bien atteint le serveur, mais **aucune page ni API** ne correspond au **chemin** demandé (ici `/v1` sans la suite attendue). La liste complète des codes et leur signification est documentée sur MDN : [HTTP response status codes](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status).
- En **succès** « normal », le serveur renvoie souvent **200** (**OK**) : c’est le code qui signifie que la requête s’est bien passée et que la réponse correspond à ce qu’on attend ; c’est **ce qu’on vise** quand l’URL est correcte. Ici le **404** montre que **ce n’est pas** le cas.
- Ce n’est **pas** la même chose qu’un **problème de réseau** (coupure, DNS impossible, etc.) : dans ce cas, `fetch` peut **rejeter** la promesse et l’erreur tombe dans le `catch` (message du type Failed to fetch).
- **Important pour la suite :** avec un **404**, `fetch` **ne lance pas** d’exception par défaut : il te donne un objet **`Response`** avec `status === 404` et `ok === false`. Tu dois donc **lire** `response.status` ou `response.ok` pour distinguer un **succès** (souvent **200**) d’une **erreur HTTP** (comme **404**).

#### Comment le voir dans l’onglet **Réseau** (*Network*) ?

1. **Recharge** la page avec l’onglet Réseau ouvert (sinon vide la liste et recharge).
2. Repère la ligne correspondant à `api.open-meteo.com` (souvent méthode **GET**).
3. Dans la **liste** des requêtes, une colonne du type **Statut** / **Status** affiche souvent **404** (parfois la ligne est en **rouge** selon le navigateur).
4. **Clique** sur cette ligne : dans le panneau de détail, ouvre **En-têtes** (*Headers*) : tu dois voir une ligne du type **`HTTP/1.1 404`** ou **`Status Code: 404`** (libellé exact selon navigateur).
5. Onglet **Réponse** / **Response** : le corps peut être vide, court, ou une page d’erreur — **ce n’est pas** le JSON prévisions ; on le corrigera à l’étape 2 en complétant l’URL.

#### Dans la **Console**

Tu dois voir **`Objet Response :`** suivi de l’objet, puis une ligne **`status HTTP : 404 | response.ok : false`** (loggée par le script de départ). C’est cohérent avec le Réseau.

**Questions à te poser :**

- Quelle différence entre une erreur **dans le `catch`** et une réponse avec **`status` 404** ?
- Où est-ce que tu lis le **404** en priorité : Console, Réseau, ou les deux ?

**À retenir :** une URL d’API doit être **complète** (bon chemin + bons paramètres). Où savoir ce qu’il faut mettre ? En général dans la **documentation de l’API** utilisée — ici [Open-Meteo](https://open-meteo.com/en/docs) indique le chemin (`/v1/forecast`, etc.) et les **paramètres** attendus.

Tu ne modifies **pas** encore le reste de la page (liste, messages) : uniquement cette compréhension + la lecture du [JSON-et-API.md](JSON-et-API.md) (notamment § 4 et § 5 sur le Réseau et le **404**).

---

### Étape 2 — Corriger l’URL et choisir une ville (latitude / longitude)

**But :** obtenir une **première requête réussie** (statut **200**) et voir le **JSON** dans l’onglet Réseau.

1. **Remplace** `URL_METEO` dans ton script par une URL **valide** : au lieu de t’arrêter à **`…/v1`** (ce qui provoquait le **404**), ajoute le chemin **`/forecast`** et les paramètres de requête (`latitude`, `longitude`, `daily`, `timezone`, etc.). Reprends l’URL complète de la section [API utilisée](#api-utilisée-référence--à-utiliser-à-partir-de-létape-2) ci-dessus pour **Ajaccio**, ou adapte les coordonnées.
2. **Pour une autre ville** (optionnel) : récupère la **latitude** et la **longitude** en degrés décimaux (souvent 4 à 6 décimales), puis **remplace** les valeurs dans l’URL (Wikipédia, [doc Open-Meteo](https://open-meteo.com/en/docs), etc.).
3. Recharge la page. Dans la **Console**, tu devrais voir **`Objet Response :`** avec **`status: 200`** (ou équivalent) et **`response.ok : true`**.
4. Dans l’onglet **Réseau**, ouvre la **Réponse** : tu dois voir le **JSON** avec `daily`, etc.

Tu peux **garder** pour l’instant les deux `console.log` sur `response` (étape 1) : à l’étape suivante on va transformer le flux pour lire le JSON proprement.

---

### Étape 3 — Références DOM : cibler les éléments

**But :** avoir des variables JavaScript qui pointent vers le titre de ville, le statut, l’erreur et la liste.

**À faire :** ajoute **sous** les constantes existantes (`URL_METEO`, etc.) :

```js
const villeEl = document.querySelector('#ville');
const statutEl = document.querySelector('#statut');
const erreurEl = document.querySelector('#erreur');
const listeEl = document.querySelector('#liste-previsions');
```

**Vérification :** les quatre variables ne sont pas `null` — teste avec `console.log(villeEl, statutEl, erreurEl, listeEl);` si besoin.

Tu ne t’en sers pas encore dans `chargerMeteo` tout de suite : à partir de l’**étape 8**, tu utiliseras `villeEl`, `statutEl`, `erreurEl` et `listeEl` pour le chargement, les erreurs et la liste.

---

### Étape 4 — Après `fetch` : tester `response.ok` (sans lire le JSON pour l’instant)

**But :** refuser les réponses HTTP « ratées » (404, 500, etc.) **avant** de parser le corps.

Juste après `const response = await fetch(URL_METEO);`, ajoute :

```js
if (!response.ok) {
  throw new Error('Réponse HTTP ' + response.status);
}
```

**Pourquoi :** avec une URL correcte tu obtiens souvent **200**, mais si l’URL redevient incorrecte ou le serveur répond une erreur, `fetch` ne jette pas toujours une exception : tu dois tester **`response.ok`** (ou `response.status`) toi-même.

Recharge : en usage normal avec l’URL valide de l’étape 2, rien ne change côté message d’erreur ; si tu remets volontairement une URL qui renvoie **404**, l’exception partira dans le `catch` (on affichera proprement l’erreur plus tard).

---

### Étape 5 — Premier contact avec le JSON : `console.log` de **`data`**

**But :** voir l’**objet JavaScript** obtenu après parsing du corps, **sans** encore toucher au DOM.

**À faire :** toujours dans le `try`, **après** le `if (!response.ok) { … }`, ajoute :

```js
const data = await response.json();
console.log('Données parsées :', data);
```

**Point important :** le corps de la réponse ne se lit qu’**une fois**. Tant que tu fais seulement `console.log(data)`, tu n’as pas besoin d’autre lecture. Plus tard, tout ton code utilisera **cette même variable** `data` (pas un second `response.json()` sans nouveau `fetch`).

Recharge la page, ouvre la Console : développe l’objet, repère à la main les clés du premier niveau (`daily`, `daily_units`, etc.). Compare avec l’onglet **Réseau** → **Réponse**.

**À compléter par toi :** dans la Console, essaie d’évaluer (ou ajoute une ligne temporaire) `data.daily` puis `data.daily.time` : tu dois voir un **tableau de dates** (chaînes). Ne passe à l’étape suivante que lorsque tu as **vu** ces tableaux.

---

### Étape 6 — Mini-exercice : `daily` versus `daily_units`

**But :** comprendre que **le même nom de propriété** (`temperature_2m_max`) peut apparaître à deux endroits avec des **rôles différents**.

La doc et le JSON montrent :

- **`data.daily`** : tableaux de **valeurs jour par jour** (une entrée par jour).
- **`data.daily_units`** : souvent **une seule chaîne par variable** (ex. l’unité `"°C"`), pas une liste de températures par jour.

**À faire (court) :**

1. Ajoute temporairement après `const data = await response.json();` :

   ```js
   console.log('daily_units.temperature_2m_max :', data.daily_units.temperature_2m_max);
   console.log('daily.temperature_2m_max (extrait) :', data.daily.temperature_2m_max.slice(0, 3));
   ```

2. Observe la différence : le premier log ressemble à un **libellé** (unité), le second à un **tableau de nombres** (les vraies prévisions).

3. **Question :** pour afficher la température max du **3ᵉ jour**, quel tableau utiliser — `daily` ou `daily_units` ?

4. Retire ou commente ces `console.log` de comparaison une fois que c’est clair.

Cette petite confusion est fréquente : l’étape suivante résume la **forme** des données brutes avant qu’on les transforme pour l’affichage.

---

### Étape 7 — Comprendre `daily` : trois tableaux **parallèles**

**But :** voir clairement comment Open-Meteo structure les prévisions **jour par jour**, avant de les afficher dans la page (étape 9).

Dans `data.daily`, le **même indice** `i` désigne toujours **le même jour** :

- `data.daily.time[i]` — la date (chaîne du type `"2026-03-31"`) ;
- `data.daily.temperature_2m_max[i]` — la température max ce jour-là ;
- `data.daily.temperature_2m_min[i]` — la température min ce jour-là.

**Vérification rapide :** les longueurs des trois tableaux doivent être **égales** (Open-Meteo les aligne). Tu peux le vérifier dans la Console avec `data.daily.time.length`, etc.

Pour chaque **endpoint** d’une API, la **forme** de la réponse est **documentée** par le fournisseur : [Open-Meteo](https://open-meteo.com/en/docs) décrit ces champs pour les séries **daily** demandées dans l’URL.

Tu n’as pas encore besoin de nouvelles variables dans ton script : à l’**étape 9**, tu parcourras ces tableaux avec **`forEach`** et l’indice **`i`** pour remplir la liste dans la page.

---

### Étape 8 — Début de `chargerMeteo` : chargement, liste vide, erreur masquée

**But :** préparer l’interface **avant** le `fetch`.

Au **tout début** du corps de `chargerMeteo` (juste après l’ouverture `{` de la fonction), ajoute :

```js
erreurEl.hidden = true;
erreurEl.textContent = '';
statutEl.textContent = 'Chargement…';
listeEl.innerHTML = '';
```

**Explication :** on annonce le chargement, on vide la liste pour éviter d’empiler d’anciens résultats, on cache le bandeau d’erreur tant qu’on n’a pas d’échec.

L’ordre exact par rapport au `try` : soit tu mets ces quatre lignes **avant** `try {`, soit au début du `try` — l’essentiel est qu’elles s’exécutent **à chaque** appel de `chargerMeteo()`.

**Important :** ce bloc doit s’exécuter **avant** `await fetch(...)` pour que « Chargement… » soit visible **pendant** la requête réseau. Si tu as déjà codé l’affichage de la liste (étape 9) avant d’ajouter ces lignes, place-les bien **au début** de `chargerMeteo`, et pas après le `fetch` — sinon le statut ne se met pas à jour au bon moment.

---

### Étape 9 — Parcourir les jours avec `forEach` et remplir la liste

**But :** à partir des trois tableaux **parallèles** (étape 7), afficher chaque jour dans la page : pour chaque indice `i`, lire la date et les deux températures, créer un **`<li>`**, l’ajouter à `#liste-previsions` — **sans** passer par un tableau intermédiaire d’objets.

**Rappel :** [`forEach`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) appelle une fonction pour **chaque** élément du tableau. Le **deuxième paramètre** de cette fonction est l’**indice** `i` : c’est le même `i` que pour `temperature_2m_max[i]` et `temperature_2m_min[i]` (voir étape 7).

Après `const data = await response.json();`, un schéma possible :

```js
data.daily.time.forEach((dateStr, i) => {
  const max = data.daily.temperature_2m_max[i];
  const min = data.daily.temperature_2m_min[i];
  const li = document.createElement('li');
  const hi = max != null ? Math.round(max) : '–';
  const lo = min != null ? Math.round(min) : '–';
  li.textContent = dateStr + ' — max ' + hi + ' °C, min ' + lo + ' °C';
  listeEl.appendChild(li);
});
```

**À toi :** tu peux commencer avec un `li.textContent` **incomplet** (par ex. seulement `dateStr`), recharger pour vérifier que la liste se remplit, puis ajouter max/min.

**Note (optionnelle) :** avec l’URL proposée dans ce TP, tu reçois en général **sept** jours. Si tu changes l’URL pour demander plus de jours (`forecast_days`, etc.) et que tu veux n’en afficher que sept, tu peux par exemple `data.daily.time.slice(0, 7).forEach(...)` — ce n’est pas nécessaire tant que tu restes sur l’URL par défaut du corrigé.

Ensuite : mets `statutEl.textContent = ''` et `villeEl.textContent = 'Ajaccio'` (ou le nom de **ta** ville) **après** avoir rempli la liste, pour effacer « Chargement… ». (Sans encore le `catch` propre : étape suivante.)

---

### Étape 10 — Gérer le `catch` : message d’erreur visible

**But :** en cas d’échec (`fetch` qui rejette, ou `throw` sur `!response.ok`), afficher un texte dans `#erreur` et vider le statut.

Dans le `catch`, par exemple :

```js
statutEl.textContent = '';
erreurEl.hidden = false;
erreurEl.textContent = 'Impossible de charger la météo : ' + err.message;
```

Adapte le nom du paramètre (`err`, `e`, etc.) à celui de ton `catch`.

**Vérification :** coupe le réseau (mode hors ligne dans les outils) ou remets une URL invalide : tu dois voir le message d’erreur et plus « Chargement… » indéfiniment.

---

### Étape 11 — Nettoyage et rendu

- Retire les `console.log` de debug devenus inutiles (réponse HTTP détaillée, `data` entier, etc.) pour garder une console propre en usage normal.
- Vérifie que `chargerMeteo()` est bien appelée au chargement (déjà le cas dans le fichier de départ).

Une fois le TP terminé, tu peux comparer avec `[solution-index.html](solution-index.html)` (corrigé type — même logique : **`forEach`** sur les jours, **`<li>`** dans la liste).

---

## Vérifications finales

- Recharge la page : liste cohérente avec les jours à venir, températures plausibles.
- Pas d’erreur dans la console en usage normal.
- Avec le **réseau désactivé** ou une **URL incorrecte** : message d’erreur visible.

---

## Indices si tu es bloqué

- `await` s’utilise dans une fonction déclarée `async` (ou au niveau module — ici tu es dans une fonction `async`).
- Si tu vois `Promise { … }` dans la console à la place des données, une étape `await` manque probablement.
- Confonds-tu `daily` et `daily_units` ? Reprends la section **Étape 6 — Mini-exercice** ci-dessus.
- Tu parcours **`data.daily.time`** avec **`forEach`** ; pour chaque **`i`**, tu lis **`temperature_2m_max[i]`** et **`temperature_2m_min[i]`** — le même **`i`** que pour la date à la même position.

---

## Aller plus loin (optionnel)

Ces idées **ne font pas** partie du rendu minimal ; tu peux les explorer si tu as le temps.

- **Autre ville à la main :** change `latitude` et `longitude` en dur dans l’URL (par ex. Lyon, Marseille) et adapte le texte affiché pour le nom de la ville.
- **Nom de ville saisi → coordonnées (deux requêtes) :** le même projet **Open-Meteo** expose une [API de géocodage](https://open-meteo.com/en/docs/geocoding-api) (sans clé, JSON dans le navigateur). Tu appelles par exemple  
`https://geocoding-api.open-meteo.com/v1/search?name=` + encodeURIComponent(laVille) + `&count=1`  
puis tu lis `results[0].latitude`, `results[0].longitude` et `results[0].name` pour construire l’URL de **prévision** comme dans le TP. Enchaînement typique : `fetch` géocodage → `await response.json()` → `fetch` météo avec les coordonnées. Pense au cas où `results` est vide (ville inconnue). Tu peux ajouter un `<input>` et un bouton dans le HTML en bonus pour déclencher cette chaîne.
- **Autre paramètre `daily` :** consulte la [doc Open-Meteo](https://open-meteo.com/en/docs) et ajoute par exemple `weathercode` ou `precipitation_sum` pour enrichir chaque ligne de la liste.
- **Bouton « Actualiser » :** le HTML peut rester inchangé si tu ajoutes un bouton uniquement en bonus : au clic, rappelle `chargerMeteo()` (pense à désactiver le bouton pendant le chargement pour éviter les doubles requêtes).

---

## Rendu

Dépose le fichier **`index.html`** complété comme demandé par ton enseignant.
