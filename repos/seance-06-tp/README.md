# TP Séance 6 — Premiers pas en PHP

Durée indicative : 1 h 30. Objectif : configurer un environnement PHP local (Docker), traiter des formulaires et manipuler les données envoyées avec `$_GET`, `$_POST`, conditions et échappement HTML.

## Prérequis

- Docker et Docker Compose installés sur ta machine.
- Notions vues en cours : variables, tableaux, `foreach`, superglobales `$_GET` / `$_POST`, `htmlspecialchars`.

## Structure du projet

```
seance-06-tp/
├── docker-compose.yml
├── README.md
└── src/
    └── index.php          ← à compléter (point d’entrée possible)
```

Le conteneur sert les fichiers du dossier `src/` comme racine web (voir le mapping de volume dans `docker-compose.yml`).

## 1. Configuration de l’environnement

1. À la racine de ce dossier, lance : `docker compose up -d` (ou `docker-compose up -d` selon ta version).
2. Ouvre un navigateur sur l’URL indiquée dans la console (par défaut : `http://localhost:8080`).
3. Tu dois voir une page générée par PHP. Optionnel : remplace temporairement le contenu par un appel à `phpinfo();` pour vérifier la version de PHP, puis **retire** `phpinfo()` avant de rendre ton travail (fuite d’informations sur le serveur).

Si quelque chose bloque, note le message d’erreur exact et demande de l’aide en séance.

## 2. Formulaire en GET

Crée une page (par exemple `contact.php` ou une section dans `index.php`) avec :

- Un formulaire en **`method="get"`** avec au moins les champs **`nom`** et **`email`** (attributs `name` explicites).
- Une **action** qui pointe vers le fichier PHP qui affiche le résultat (même fichier ou fichier séparé, à ton choix).

Après envoi du formulaire :

- Affiche les valeurs reçues en utilisant **`$_GET`** (tableau associatif : les clés correspondent aux `name` HTML).
- Utilise **`htmlspecialchars(..., ENT_QUOTES, 'UTF-8')`** pour tout ce que tu réaffiches dans la page HTML.

Observe ce qui apparaît dans la **barre d’adresse** du navigateur quand tu envoies le formulaire (paramètres dans l’URL).

## 3. Passage en POST

- Reprends le même formulaire (ou une variante) avec **`method="post"`**.
- Lis les données dans **`$_POST`**.
- Compare avec GET : que vois-tu dans l’URL après soumission ? Où passent les données ?

## 4. Manipulation des données (validation simple)

Avant d’afficher un message de succès :

- Vérifie que **`nom`** et **`email`** ne sont pas vides (après `trim` éventuel).
- Pour l’email, utilise soit **`filter_var($email, FILTER_VALIDATE_EMAIL)`**, soit une validation très simple documentée dans ton code.

Comportement attendu :

- Si des erreurs : affiche des **messages d’erreur** clairs (par champ ou liste).
- Si tout est valide : affiche un **message de confirmation** (sans données sensibles inutiles).

**Bonus** : accumule les messages d’erreur dans un **tableau** PHP, puis affiche-les avec une boucle (`foreach`).

## Critères de reprise (enseignant)

- Environnement Docker qui tourne et page PHP accessible sur le port prévu.
- Un formulaire GET fonctionnel avec affichage des paramètres via `$_GET` et échappement à l’affichage.
- Un formulaire POST fonctionnel avec lecture via `$_POST`.
- Au moins une validation (champs vides + format email) avec messages d’erreur vs succès.
- **Bonus** : erreurs regroupées dans un tableau et parcourues en boucle.

## Références

- [PHP : htmlspecialchars](https://www.php.net/manual/fr/function.htmlspecialchars.php)
- [PHP : filter_var](https://www.php.net/manual/fr/function.filter-var.php)
- [MDN : méthodes GET et POST](https://developer.mozilla.org/fr/docs/Web/HTTP/Methods)
