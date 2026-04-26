# TP Séance 6 — Gestion des fichiers et sécurité (PHP)

**Durée indicative :** 1 h 30  

**Sujet :** envoi de formulaires complexes, **upload et stockage** de fichiers, **introduction** aux questions de **sécurité** côté serveur (validation, noms de fichiers, durcissement du dépôt).

## Prérequis

- Docker et Docker Compose installés sur ta machine.
- Notions utiles : variables, tableaux, `foreach`, `$_GET` / `$_POST` / `$_FILES`, `htmlspecialchars`, blocs de base `if` / `else`.

## Comment l’exercice est conçu (pour aller vers du « vrai travail d’étudiant »)

L’idée n’est **pas** de livrer un mini-projet déjà abouti : l’**interface** (mise en page) est prise en charge par une feuille de style **commune** pour que l’on se concentre sur le **PHP** et le **comportement**. Ce que toi, tu mets en place, ce sont des **petits blocs ciblés** dans chaque étape, repérables par des **exercices numérotés** (1.1, 2.1, 3.1, etc.) en commentaire (et parfois un **exemple** déjà correct à imiter, par ex. la validation du titre en étape 1).

- **Un fichier PHP = un fil conducteur d’exercice** (étape 1, 2, 3) : tu enchaînes des micro-tâches au lieu d’inventer toute l’appli d’un coup.
- **Un exercice = une compétence** (valider l’e-mail, contrôler une longueur, blanchir une catégorie, générer un nom de fichier sûr, etc.) : tu as un **critère de réussite** concret dès que le texte s’affiche correctement, que l’upload échoue / réussit comme prévu, ou qu’un cas malveillant est rejeté.
- **Dégager** la présentation dans [`src/css/tp-seance-6.css`](src/css/tp-seance-6.css) évite de **copier-coller** du style entre pages ; tu n’y touches **pas** sauf goût personnel. Le lien HTML est le même sur chaque page : `<link rel="stylesheet" href="css/tp-seance-6.css">`.
- En **séance**, une stratégie efficace est : lire l’en-tête de fichier (objectif) → traiter **un** exercice numéroté → tester dans le navigateur (formulaire, fichier de test) → passer au suivant.

**Pour l’enseignant / chargé de TD :** on peut ajouter une **feuille de route** (checklist) ou noter côté critères d’évaluation chaque **exercice 1.x / 2.x / 3.x** comme barème partiel, pour rendre l’autonomie observable. Un guide **séparé** (rythme indicatif, pièges PHP / Docker fréquents, pistes d’accompagnement) est proposé dans [`ENSEIGNANT-rythme-et-pieges.md`](ENSEIGNANT-rythme-et-pieges.md) — *réservé encadrement : à ne pas diffuser comme énoncé d’examen si vous voulez préserver l’autonomie de dépannage des étudiant·es*.

## Structure du projet (3 étapes = 1 fichier par étape)

```
seance-06-tp/
├── docker-compose.yml
├── README.md
├── ENSEIGNANT-rythme-et-pieges.md   ← rythme & pièges (équipe pédago., voir paragraphe plus haut)
└── src/
    ├── index.php             ← accueil : liens vers les étapes
    ├── etape-1.php           ← formulaire côté serveur
    ├── etape-2.php           ← upload et stockage
    ├── etape-3.php           ← contrôles et sécurité (fichier)
    ├── css/
    │   └── tp-seance-6.css  ← apparence commune (hors sujet pédagogique du PHP)
    └── uploads/              ← stockage (fichiers de test : ne pas versionner)
```

Le conteneur sert le dossier `src/` à la racine web (voir le volume dans `docker-compose.yml`).

---

## 0. Configuration de l’environnement

### Sous-étape 0.1 — Démarrage Docker

1. À la racine de ce dépôt, lance : `docker compose up -d` (ou `docker-compose up -d` selon ta version).  
   Documentation : [Docker Compose — lancer un projet](https://docs.docker.com/compose/gettingstarted/) (aperçu ; adapte la commande à ta version installée).
2. Ouvre le site : `http://localhost:8080` (port défini dans `docker-compose.yml` : `8080:80`).

### Sous-étape 0.2 — Vérifier que PHP répond

Tu dois voir la **page d’accueil** du TP (`index.php`) listant les trois étapes.  
En cas de doute, tu peux **temporairement** placer un fichier de test (ex. `test-php.php`) contenant `<?php phpinfo();` seul, ouvrir son URL, puis **supprimer** le fichier (et tout `phpinfo()`) **avant** un rendu : c’est une **fuite d’information** sur le serveur.  
Aide : [PHP : `phpinfo`](https://www.php.net/manual/fr/function.phpinfo.php).

### Sous-étape 0.3 — Droits sur le dossier `uploads/`

Avant l’**étape 2**, le serveur doit pouvoir **écrire** dans `src/uploads/`. Sous l’image `php:8.3-apache`, l’utilisateur du processus est souvent `www-data` ; le **volume** hôte et les **permissions** locales peuvent bloquer l’écriture.

- Si `move_uploaded_file` **échoue** : depuis la machine hôte, à la racine du TP, tu peux (pédago. uniquement) exécuter :

```bash
chmod 777 src/uploads
```

En production, on préfère un **propriétaire** cohérent (ex. utilisateur du serveur web) plutôt que `777` — rappel pédago. sur [Permissions UNIX (Wikipédia)](https://fr.wikipedia.org/wiki/Permissions_UNIX) et commandes `chmod` / `chown` (manuel Linux de ta distribution).

### Sous-étape 0.4 — En cas de blocage

Note le **message d’erreur exact** (navigateur, réponse du serveur, ou `docker compose logs` sur le service `web`) et demande de l’aide en séance.  
Aide : [consulter les logs Docker Compose](https://docs.docker.com/reference/cli/docker/compose/logs/).

---

## Étape 1 — `etape-1.php` : formulaire « riche » et traitement côté serveur

**Objectif global :** envoyer un **formulaire en POST** avec plusieurs champs, relire le tout dans **PHP** avec `$_POST`, valider, accumuler des erreurs dans **`$erreurs`**, n’**afficher** en HTML (valeurs, messages) qu’en passant par **`h()`** (dérivé de `htmlspecialchars` — voir [manuel : htmlspecialchars](https://www.php.net/manual/fr/function.htmlspecialchars.php)).

L’**interface HTML** (champs, labels) est déjà fournie. En cas de `POST` **sans** erreur, le squelette affiche un **récapitulatif** (ne pas y mettre d’information sensible inutile).

Rappel utile : [superglobale `$_POST`](https://www.php.net/manual/fr/reserved.variables.post.php) ; côté HTML, un formulaire « classique » vers la même page : [MDN : envoyer des données de formulaire](https://developer.mozilla.org/fr/docs/Learn/Forms/Sending_and_retrieving_form_data).

### Sous-étape 0 — Lire le squelette (avant de coder)

- Repère le bloc `if ($_SERVER['REQUEST_METHOD'] === 'POST')` : c’est ici que tu ajoutes des conditions.
- Un **exemple** de validation (titre non vide) est déjà écrit : imite le même modèle (test → `$erreurs[] = '…'`).
- Rien à coder pour l’**affichage** des erreurs : une boucle `foreach` sur `$erreurs` est déjà dans le HTML.

### Sous-étape 1.1 — E-mail requis et format

**À faire :**  
Après le `trim` de l’e-mail, (1) si le champ est **vide** après trim, ajoute un message d’erreur explicite (« e-mail obligatoire » ou équivalent) ; (2) sinon, utilise **`filter_var($email, FILTER_VALIDATE_EMAIL)`** : si le résultat est **`false`**, c’est un **format** invalide (message d’erreur distinct du cas « vide »).

**Documentation :**  
- [`filter_var`](https://www.php.net/manual/fr/function.filter-var.php) et constante [`FILTER_VALIDATE_EMAIL`](https://www.php.net/manual/fr/filter.constants.php#constant.filter-validate-email)  
- Comparaison : [PHP : `empty`](https://www.php.net/manual/fr/function.empty.php) (optionnel, pour le cas « 0 » rare sur un e-mail)

### Sous-étape 1.2 — Longueur minimale du message

**À faire :**  
Si, après `trim`, la longueur de `$message` est **strictement inférieure à 10** caractères, ajoute une entrée à `$erreurs`. Tu peux utiliser `strlen` pour des caractères ASCII ; pour du texte Unicode général, `mb_strlen` avec encodage UTF-8 (extension **mbstring**, souvent activée) — [manuel : `mb_strlen`](https://www.php.net/manual/fr/function.mb-strlen.php), [strlen](https://www.php.net/manual/fr/function.strlen.php).

**À vérifier en test :** moins de 10 caractères → erreur ; 10 caractères ou plus → passé (si les autres règles le permettent).

### Sous-étape 1.3 — Case « consentement » (checkbox)

**À faire :**  
Une case à cocher **non cochée** n’apparaît **pas** dans `$_POST`. La variable `$consentement = isset($_POST['consentement']);` te dit déjà si elle était cochée. Si le consentement est **obligatoire** pour toi, ajoute une erreur lorsque `$consentement` est `false`.  
Aide : [manipulation des champs de formulaire en PHP (checkboxes)](https://www.php.net/manual/fr/faq.html.php#faq.html.arrays) (section FAQ sur les tableaux / formulaires).

### Sous-étape 1.4 — Liste blanche (catégorie)

**À faire :**  
N’accepter que des valeurs **connues** pour `$categorie` (par ex. le tableau de chaînes `'news'`, `'tutoriel'`, `'autre'`). Si la valeur reçue n’est **pas** dans la liste, soit tu remets une valeur sûre par défaut (à **documenter** en commentaire), soit tu écris une entrée d’erreur.  
Aide : [`in_array` (troisième paramètre `true` en **strict** pour les comparaisons de types)](https://www.php.net/manual/fr/function.in-array.php) ; rappel sur l’[opérateur `!`](https://www.php.net/manual/fr/language.operators.php) / conditions.

---

## Étape 2 — `etape-2.php` : envoi et stockage d’un fichier

**Objectif global :** utiliser un formulaire en **`enctype="multipart/form-data"`**, lire le fichier côté serveur via **`$_FILES`**, gérer les **codes d’erreur** d’upload, vérifier avec **`is_uploaded_file`**, enregistrer avec **`move_uploaded_file`**.

**Documentation d’entrée (à parcourir une fois) :**  
- [Fonctionnalité « Gestion des fichiers téléversés » (PHP)](https://www.php.net/manual/fr/features.file-upload.php) — schéma `$_FILES`, limites, `move_uploaded_file`  
- [Constantes d’erreur d’upload](https://www.php.net/manual/fr/features.file-upload.errors.php) (taille, fichier partiel, etc.)  
- [`$_FILES`](https://www.php.net/manual/fr/reserved.variables.files.php)  
- [`is_uploaded_file`](https://www.php.net/manual/fr/function.is-uploaded-file.php) (évite d’accepter un chemin arbitraire)  
- [`move_uploaded_file`](https://www.php.net/manual/fr/function.move-uploaded-file.php)  
- [`is_dir` / `is_writable` / `file_exists`](https://www.php.net/manual/fr/ref.filesystem.php) (présence du dossier `uploads/`)  
- Côté HTML : [attribut `enctype` sur `<form>` (MDN)](https://developer.mozilla.org/fr/docs/Web/HTML/Element/form#attr-enctype), élément [`<input type="file">`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/file)

### Sous-étape 0 — Ce qui est déjà implémenté dans le fichier (à comprendre)

- Détection d’**absence** de clé `fichier` dans `$_FILES`.  
- `match` sur le **code d’erreur** (hors `UPLOAD_ERR_OK`) avec messages pédagogiques.  
- Vérification **`is_uploaded_file`** sur le chemin temporaire.  
- Vérification que **`uploads/`** existe et est inscriptible.  
- Un **`move_uploaded_file`** vers `uploads/ + nom du client` (comportement **naïf** volontaire — sécurisé en étape 3).

Lis le commentaire `DANGER` dans le source : on ne fera **pas** confiance au nom côté client en production (étape 3).

### Sous-étape 2.1 (optionnel) — Fichier homonyme déjà présent

**À faire :**  
Avant ou après l’appel actuel, réfléchis au cas `file_exists($nomDestination)` : **refus** (message clair) ? **écrasement** documenté ? **Sufixe** (ex. horodatage) ? Aujourd’hui le code enregistre quand même et signale le **remplacement** : tu peux remplacer ce comportement en t’inspirant de la [doc `file_exists`](https://www.php.net/manual/fr/function.file-exists.php) et, si besoin, de [`uniqid`](https://www.php.net/manual/fr/function.uniqid.php) (suffixe unique) ou d’un compteur.

---

## Étape 3 — `etape-3.php` : sécurité liée au fichier

**Objectif global :** appliquer des règles **uniquement côté serveur** : **taille** max (variable `$tailleMaxOctets` déjà utilisée en comparaison), **extension** (liste explicite, déjà proche du flux), et **nom de fichier généré** (variable `$nomStocke` : tant qu’elle reste `null`, l’exercice 3.1 n’est pas terminé).  
Aide lecture : rappel sur [`pathinfo` / `PATHINFO_EXTENSION`](https://www.php.net/manual/fr/function.pathinfo.php) et [comparaison de tableaux `in_array`](https://www.php.net/manual/fr/function.in-array.php).

### Sous-étape 3.1 — Nom de fichier sûr et unique

**À faire :**  
Affecte à **`$nomStocke`** une chaîne **générée côté serveur** (ex. octets aléatoires hexadécimaux + **`.`** + **extension** déjà validée dans `$ext`). N’utilise **pas** le nom brut de l’utilisateur comme nom final sur le disque.

**Documentation :**  
- [`random_bytes`](https://www.php.net/manual/fr/function.random-bytes.php) (entropie), [`bin2hex`](https://www.php.net/manual/fr/function.bin2hex.php) (représentation du nom de fichier)  
- Pourquoi c’est important : fiche ou cours sur l’injection de chemin / noms dangereux — ici, **on évite** `../` et les collisions (voir commentaire dans `etape-3.php`).

### Sous-étape 3.2 — Durcir le répertoire `uploads/` (hors PHP ou via fichier Apache)

**À faire :**  
Créer un fichier **`.htaccess`** **dans** le dossier `src/uploads/` (même conteneur que le site) pour qu’**Apache** refuse d’**exécuter** des scripts (PHP, etc.) s’y trouvent — c’est un filet de sécurité si un fichier « déguisé » arrive dans le dépôt.

**Exemple de contenu (Apache 2.4, à valider sur ta stack) :**

```apache
# Exemple pédagogique (Apache) — interdire l’exécution de PHP dans ce dossier
<FilesMatch "\.(php|phtml|phar)$">
  Require all denied
</FilesMatch>
```

**Pistes de lecture :** [Apache — fichiers de configuration .htaccess](https://httpd.apache.org/docs/2.4/fr/howto/htaccess.html) (ou version EN), [directive `FilesMatch`](https://httpd.apache.org/docs/2.4/mod/core.html#filesmatch), module [mod_access_compat / Require](https://httpd.apache.org/docs/2.4/mod/mod_authz_core.html#require) (selon version d’Apache). Adapte si l’hébergeur ou l’image Docker n’autorise pas `AllowOverride` : le but est d’en **parler** et de vérifier la **doc du serveur** utilisé.

### Sous-étape 3.3 (bonus) — Vérifier le type MIME « réel » (FileInfo)

**À faire :**  
En plus de l’**extension** (facilement falsifiable) et de l’attribut HTML `accept` (contournable), ouvrir le fichier temporaire avec l’**extension `fileinfo`** (fonctions de type `finfo_*` en procédural) pour lire le **type MIME** et le comparer à une **liste** autorisée (ex. `image/png`, `image/jpeg`, `application/pdf`).

**Documentation :**  
- [Extension **FileInfo** (PHP)](https://www.php.net/manual/fr/book.fileinfo.php) — [`finfo_open` / `finfo_file` / `finfo_close` en style procédural](https://www.php.net/manual/fr/function.finfo-file.php)  
- Rappel : l’[attribut `accept` sur `<input type="file">`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/file#attr-accept) est une **aide** pour l’utilisateur, **pas** une preuve côté serveur.

---

## Comportement attendu (rappel)

| Étape | Fichier        | Contenu visé |
|-------|----------------|--------------|
| 1     | `etape-1.php`  | Traitement d’un **formulaire complexe** en POST, validation, messages d’erreur. |
| 2     | `etape-2.php`  | **Upload** basique, stockage sur disque, gestion d’erreurs. |
| 3     | `etape-3.php`  | Filtres de **sécurité** sur le fichier + réflexion sur le dépôt et Apache. |

---

## Critères de reprise (enseignant)

- Environnement Docker opérationnel, pages accessibles.
- **Étape 1 :** contrôles serveur cohérents (e-mail, champs, liste blanche) et échappement à l’affichage.
- **Étape 2 :** upload fonctionnel vers `uploads/`, prise en compte d’au moins une erreur d’upload.
- **Étape 3 :** nom côté serveur non devinable / non injectable, règles d’extension et de taille, fichier `.htaccess` (ou équivalent documenté) pour le dépôt.

---

## Références (index)

Les **sous-étapes** des étapes 1 à 3 contiennent des liens **contextuels** (c’est l’endroit le plus pratique pour les ouvrir pendant le travail). Ci-dessous, un rappel condensé.

- **HTTP / HTML :** [MDN — envoi d’un formulaire (données)](https://developer.mozilla.org/fr/docs/Learn/Forms/Sending_and_retrieving_form_data) · [`<form>` et `enctype`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/form#attr-enctype) · [`<input type="file">` et `accept`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/file)
- **Saisie côté PHP :** [Variables `$_POST` / `$_FILES`](https://www.php.net/manual/fr/language.variables.superglobals.php)
- **Chaînes et filtrage :** [`htmlspecialchars`](https://www.php.net/manual/fr/function.htmlspecialchars.php) · [`filter_var` / e-mail](https://www.php.net/manual/fr/function.filter-var.php) · [`in_array` (strict)](https://www.php.net/manual/fr/function.in-array.php) · [`strlen` / `mb_strlen`](https://www.php.net/manual/fr/function.strlen.php)
- **Fichiers téléversés :** [Fonctionnalité Upload (vue d’ensemble)](https://www.php.net/manual/fr/features.file-upload.php) · [Codes d’erreur](https://www.php.net/manual/fr/features.file-upload.errors.php) · [`move_uploaded_file`](https://www.php.net/manual/fr/function.move-uploaded-file.php) · [`is_uploaded_file`](https://www.php.net/manual/fr/function.is-uploaded-file.php) · [`pathinfo`](https://www.php.net/manual/fr/function.pathinfo.php) · [FileInfo / `finfo_file`](https://www.php.net/manual/fr/book.fileinfo.php) · [`random_bytes` + `bin2hex`](https://www.php.net/manual/fr/function.random-bytes.php)
- **Configuration Apache (pédago.) :** [`.htaccess` (aperçu)](https://httpd.apache.org/docs/2.4/fr/howto/htaccess.html) · [`<FilesMatch>`](https://httpd.apache.org/docs/2.4/mod/core.html#filesmatch)
