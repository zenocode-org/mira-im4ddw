# Avant le TP : HTTP, JSON et le navigateur

Ce court texte résume ce que tu dois savoir pour **lire** la réponse d’une API dans le TP météo. Ce n’est pas un cours complet sur le Web : l’objectif est de donner un **vocabulaire commun** avec le README du TP.

---

## 1. Le navigateur et le serveur distant

Quand tu ouvres une page **HTML** en local (`index.html`), le **JavaScript** de cette page s’exécute dans ton navigateur (Firefox, Chrome, etc.).

Une **API** (ici Open-Meteo) est un **programme sur un autre ordinateur** (un serveur) qui accepte des **requêtes** sur Internet et renvoie des **réponses**.

- Tu **demandes** des données avec une **URL** précise (adresse + paramètres, comme une recherche Google).
- Le serveur **répond** avec un **contenu** : souvent du **texte** au format **JSON**.

Tu n’as pas besoin d’installer le serveur chez toi : le TP utilise `fetch()` pour envoyer la requête **depuis ta page** vers Open-Meteo.

---

## 2. Qu’est-ce que le JSON ?

**JSON** (*JavaScript Object Notation*) est une façon d’écrire des **données structurées** en texte. Ça ressemble beaucoup aux **objets** et **tableaux** JavaScript, mais c’est d’abord du **texte** reçu sur le réseau.

Exemple minimal :

```json
{
  "ville": "Ajaccio",
  "temperatures": [12, 14, 11]
}
```

- Les **clés** sont entre guillemets : `"ville"`, `"temperatures"`.
- Une **liste** de valeurs s’écrit avec des crochets `[ ... ]`.
- Un **objet** (ensemble de paires clé / valeur) s’écrit avec des accolades `{ ... }`.

Les **vraies** réponses d’Open-Meteo sont plus longues et **imbriquées** : par exemple un objet `daily` qui contient lui-même des tableaux `time`, `temperature_2m_max`, etc. Le README du TP t’indique **quels chemins** utiliser dans l’objet une fois converti en JavaScript.

---

## 3. De la réponse HTTP à l’objet JavaScript

Le flux typique dans ton script :

1. **`fetch(url)`** — envoie une requête HTTP vers l’URL ; le navigateur reçoit une **réponse** (objet `Response` en JS).
2. **`response.json()`** — la réponse « brute » n’est pas encore un objet prêt à l’emploi : `.json()` **lit** le corps de la réponse comme du JSON et renvoie une **Promise** qui se résout en **objet** (ou tableau) JavaScript.
3. Avec **`async` / `await`**, tu peux écrire : `const data = await response.json();` puis utiliser `data.daily.temperature_2m_max`, etc.

**À retenir :** tant que tu n’as pas **attendu** (`await`) le résultat de `.json()`, tu n’as pas encore l’objet — tu as une **Promise** (le TP revient là-dessus).

---

## 4. L’onglet Réseau (*Network*)

Les outils développeur du navigateur (**F12** ou **Ctrl+Shift+I** / **Cmd+Option+I**) incluent un onglet qui enregistre **toutes les requêtes HTTP** effectuées par la page : images, feuilles de style, scripts, et surtout pour ce TP les appels **`fetch`** vers des API.

| Navigateur | Nom usuel de l’onglet |
| ---------- | --------------------- |
| Firefox    | **Réseau**            |
| Chrome / Edge | **Network**      |

C’est le même outil ; la suite parle d’**onglet Réseau** pour rester cohérent avec le français des menus Firefox.

### 4.1 — À quoi ça sert ?

- **Voir** qu’une requête vers Open-Meteo a bien été **envoyée** (après rechargement de la page ou après ton code qui appelle `fetch`).
- Lire la **réponse brute** du serveur (**corps** de la réponse) avant même de la transformer en objet JavaScript : tu vois le **JSON texte** tel qu’il arrive sur le réseau.
- Vérifier le **code de statut HTTP** (souvent **200** si tout va bien, **4xx** / **5xx** en cas de problème côté client ou serveur).
- Comprendre **pourquoi** ton script affiche des `undefined` : en comparant le JSON réel (onglet Réseau) avec ce que tu lis dans le code (`data.daily`, etc.).

Sans cet onglet, tu devines ; avec lui, tu **constates** ce que le serveur a réellement renvoyé.

### 4.2 — Comment l’utiliser (pas à pas)

1. Ouvre ton `index.html` dans le navigateur.
2. Ouvre les outils développeur (**F12**), puis l’onglet **Réseau** / **Network**.
3. **Recharge** la page (**F5** ou Ctrl+R) pour que la liste des requêtes se remplisse. Si la liste était déjà pleine, tu peux vider avec l’icône **interdire** (*Clear*) puis recharger.
4. Dans la **barre de filtre** (souvent « Tout » / *All*), tu peux choisir **XHR** ou **Fetch** selon le navigateur : les appels `fetch` apparaissent souvent dans cette catégorie. Sinon, laisse « Tout » et cherche une ligne dont l’**URL** contient `api.open-meteo.com`.
5. **Clique** sur cette ligne : un panneau de détail s’ouvre (à droite ou en dessous).
6. Explore les sous-onglets du détail :
   - **En-têtes** (*Headers*) : méthode (**GET**), URL complète, code de statut (**200**, **404**, etc.).
   - **Réponse** (*Response* ou *Aperçu* / *Preview*) : le **JSON** renvoyé par le serveur. C’est ici que tu vois la structure réelle (`daily`, `daily_units`, tableaux de dates, etc.).

**Astuce :** l’option **Conserver les journaux** (*Preserve log*) évite que la liste se vide à chaque rechargement ; pratique si tu compares plusieurs essais.

### 4.3 — Lien avec `fetch` et ton code

- Le navigateur affiche **une ligne par requête** : ton `fetch(URL_METEO)` correspond à **une** entrée vers `open-meteo.com`.
- Ce que tu lis dans **Réponse** est exactement ce que `await response.json()` va **parser** en objet JavaScript. Si tu te trompes de chemin dans le code (`daily` vs `daily_units`), l’onglet Réseau te montre où sont **vraiment** les tableaux.

### 4.4 — Onglet Console (rappel court)

L’onglet **Console** sert surtout aux **messages** et **erreurs** du JavaScript (syntaxe, `null`, exception). L’onglet **Réseau** sert à inspecter **le trafic HTTP** et le **contenu** des réponses. Les deux se complètent : erreur dans la console → souvent une piste ; doute sur les données → Réseau.

---

## 5. Codes HTTP : l’exemple du **404**

Une réponse HTTP contient toujours un **code de statut** (nombre à 3 chiffres). Les plus connus :

| Code  | Signification usuelle (simplifié) |
| ----- | --------------------------------- |
| **200** | OK — la ressource existe et le corps de la réponse contient souvent les données demandées. |
| **404** | **Not Found** — le serveur a compris la requête, mais **rien** ne correspond à l’URL (chemin ou ressource inexistante). |
| **4xx** | Souvent une erreur **côté client** (mauvaise URL, accès refusé, etc.). |
| **5xx** | Souvent une erreur **côté serveur**. |

Au **début du TP**, tu appelles une URL qui se termine par **`/v1`** sans la suite (`/forecast`, paramètres…). Le serveur Open-Meteo répond **404** : « cette adresse précise n’existe pas sur mon API ».

**Dans l’onglet Réseau**, repère la colonne **Statut** / **Status** sur la ligne de la requête, ou ouvre la requête → **En-têtes** → première ligne de réponse du type `404`.

**Avec `fetch` en JavaScript :** un **404 ne fait pas planter** `fetch` tout seul : tu reçois un objet `Response` avec `response.status === 404` et **`response.ok === false`**. C’est pour cela que le TP te fera tester `response.ok` avant de traiter le JSON : sinon tu pourrais appeler `.json()` sur une page d’erreur.

Pour aller plus loin : [Liste des codes de réponse HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Status) (MDN).

---

## 6. Lien avec le TP

Le fichier **[README.md](README.md)** du TP te guide pas à pas : URL à construire, `fetch`, le cas **404** à l’étape 1, conversion JSON, affichage dans la page, et l’usage de l’onglet Réseau. Reviens à ce fichier **JSON-et-API.md** si les mots *requête*, *JSON*, *Promise* ou *objet imbriqué* ne sont pas clairs.

---

### Documentation (optionnel)

- [Introduction au JSON](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON) (MDN)
- [Utiliser fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch) (MDN)
