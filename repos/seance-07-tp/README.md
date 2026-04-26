# TP Séance 7 — Forum anonyme (PHP, sans base de données)

**Durée indicative :** 1 h 30  

**Sujet :** une seule page, un fichier [src/index.php](src/index.php) : envoi **anonyme** (titre, texte, image optionnelle), **validation serveur**, aperçu en **carte**, **pas** de stockage. Tu **complètes** les `TODO` / lignes indiquées ; le README dit *quoi* faire.

> **Enseignant·e :** corrigé de référence (optionnel côté étudiants) : [ENSEIGNANT-corrige.md](ENSEIGNANT-corrige.md).

> **En séance :** on peut rappeler à l’oral que **le détail des liens** de doc est en **fin** de ce README — pas besoin de tout lire d’un trait ; la section **0** (Docker) et l’**index** en fin restent la référence.

Tout le travail est dans **`index.php`**. Le **commentaire d’en-tête** du fichier résume l’ordre de lecture et ce qui est déjà en exemple.

## Prérequis

- Docker, Docker Compose.
- Variables, tableaux, `if` / `foreach`, `$_POST` ; `h()` fourni (échappement HTML).
- (Utile) [`$_FILES`](https://www.php.net/manual/fr/reserved.variables.files.php), [upload](https://www.php.net/manual/fr/features.file-upload.php) — **sans** `move_uploaded_file` ici : aperçu en **Data URI** (étape 3).

## Comportement **sans** tout compléter (normal)

| Si manquant | Comportement typique |
| ----------- | -------------------- |
| Ex. 2.2 | Message court (non vide) peut passer : **min** pas encore codé. |
| Ex. 2.3 | Erreur → formulaire **vide** ; **décommente** les 2 lignes de reprise. |
| Ex. 3.1 | Upload d’image → message pédago. « ex. 3.1 non complété ». |
| Ex. 4.1 | Filtre mots **inactif** si liste vide / détection absente. |

**Conception :** [src/index.php](src/index.php) mélange exemples (2.1) et trous (2.2–4.1) ; [src/css/tp-seance-7.css](src/css/tp-seance-7.css) = habillage, tu n’y touches pas (sauf perso). **Ordre serveur :** `$_POST` / `$_FILES` → `validerTitre` + `validerMessage` → si pas d’erreur texte, `traiterImage` → mots interdits → aperçu. **Ordre de travail :** 2.2 → 2.3 → 3.1 → 4.1 — **2.1** = **lecture** seule (exemple `validerTitre`).

```
seance-07-tp/
├── docker-compose.yml
├── README.md
├── ENSEIGNANT-corrige.md
└── src/
    ├── index.php
    └── css/tp-seance-7.css
```

Le conteneur sert `src/` à la racine web.

---

## 0. Configuration de l’environnement

### 0.1 Démarrage Docker

1. À la racine : `docker compose up -d` (ou `docker compose up` en avant-plan).
2. Ouvre `http://localhost:8080` (port dans `docker-compose.yml`).

   [Docker Compose — démarrer un projet](https://docs.docker.com/compose/gettingstarted/)

### 0.2 Vérifier que PHP sert le bon dossier

Tu dois voir le formulaire. Par défaut : `index.php` (Apache → `/var/www/html` → volume `./`).

Aide locale (jamais en prod) : [phpinfo](https://www.php.net/manual/fr/function.phpinfo.php) — fuite d’info.

### 0.3 En cas de souci

Note le message exact (navigateur, réponse, `docker compose logs` sur le service `web`).

[logs Docker Compose](https://docs.docker.com/reference/cli/docker/compose/logs/)

---

## Étape 1 — Lire le squelette

**Objectif :** se repérer (10–15 min).

Parcours : en-tête `index.php` (constantes → `h()` → fonctions → `POST` → HTML), repère `if ($_SERVER['REQUEST_METHOD'] === 'POST')`, `validerTitre` (2.1, modèle). [$_POST](https://www.php.net/manual/fr/reserved.variables.post.php) si besoin.

**Critère :** tu sais où vont les erreurs, où se fait l’aperçu, quel `TODO` va avec quel ex.

---

## Étape 2 — Texte (sans l’image pour l’instant)

> **2.1** = lecture seule. Pour coder : **2.2** puis **2.3**.

**Idée :** les erreurs s’accumulent dans **`$erreurs`** ; vide → on peut enchaîner image + aperçu.

### Ex. 2.1 — Titre (déjà fait)

Lire `validerTitre` (structure, `mb_strlen` UTF-8). **Test :** titre ok / trop long.

### Ex. 2.2 — Message min / max

Après le cas **vide** (`trim`), ajouter min/max via `MESSAGE_MIN_CARACTERES` et `MESSAGE_MAX_CARACTERES` : erreurs **vides, trop court, trop long**. [`mb_strlen` UTF-8](https://www.php.net/manual/fr/function.mb-strlen.php).

> **2.2 ≠ 2.3** : 2.2 = règles dans `validerMessage` ; 2.3 = reprise des champs.

### Ex. 2.3 — Reprise

**Décommente** les deux lignes qui recopient `$titreBrut` / `$messageBrut` vers `$titreSaisi` / `$messageSaisi`. **Test :** titre vide + long message : après envoi, le **message** doit **rester** dans le `textarea`.

Tant que 3.1 n’est pas fini, l’upload retourne le message pédago. d’`traiterImage`.

---

## Étape 3 — Image sans disque (ex. 3.1)

**Objectif :** lire l’upload, refuser l’invalide, **sans** `move_uploaded_file` ; aperçu en **Data URI** ([upload](https://www.php.net/manual/fr/features.file-upload.php), [UPLOAD_ERR_*](https://www.php.net/manual/fr/features.file-upload.errors.php), [finfo](https://www.php.net/manual/fr/book.fileinfo.php)).

- Remplacer le `return` place-holder de `traiterImage` : clé `CLE_FICHIER_IMAGE`, `UPLOAD_ERR_*`, `is_uploaded_file`, `IMAGE_MAX_OCTETS`, **MIME** dans `IMAGE_MIMES_AUTORISES` (**JPEG et PNG seulement** — moins de cas à gérer), puis `data:…;base64,…`. `MAX_FILE_SIZE` côté HTML n’est **pas** une preuve : tu vérifies en PHP.
- Grosses Data URI = HTML lourd (en prod, fichier ; hors sujet).

[`input type="file"`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/file)

**Tests :** pas d’image = OK (texte) ; vrai JPEG/PNG = image visible ; fichier texte renommé en `.jpg` = **rejet** MIME.

---

## Étape 4 — Mots interdits (ex. 4.1)

Compléter `contientMotInterdit` (règles dans l’en-tête de `index.php`) et remplir `$motsInterdits` : **2 ou 3 mots** suffisent pour l’exercice. Source en ligne = **licence** + commentaire.

**Test :** propre = OK ; mot de la liste → message *« contenu contient un mot interdit… »* (déjà dans le script). Ce n’est **pas** une vraie modération — l’**oral** sur les **limites** du filtre compte.

---

## Comportement attendu (rappel)

| Élément | Ce TP (démo) |
| ------- | ------------ |
| Auth | Aucune |
| SQL / fichiers | Aucun stockage (image : Data URI seulement) |
| Rechargement | Tout disparaît |

---

## Index des références

- **HTTP / HTML** : [envoi de formulaire](https://developer.mozilla.org/fr/docs/Learn/Forms/Sending_and_retrieving_form_data) · [`<form>` enctype](https://developer.mozilla.org/fr/docs/Web/HTML/Element/form#attr-enctype) · [`<input type="file">`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/file)
- **PHP** : [$_POST / $_FILES](https://www.php.net/manual/fr/language.variables.superglobals.php) · [htmlspecialchars](https://www.php.net/manual/fr/function.htmlspecialchars.php)
- **Fichiers** : [upload](https://www.php.net/manual/fr/features.file-upload.php) · [codes d’erreur](https://www.php.net/manual/fr/features.file-upload.errors.php) · [is_uploaded_file](https://www.php.net/manual/fr/function.is-uploaded-file.php) · [finfo](https://www.php.net/manual/fr/book.fileinfo.php)

---

## Reprise (enseignant) — checklist

- Docker, `http://localhost:8080` OK.
- 2.2 : min/max dans `validerMessage` ; 2.3 : reprise (titre vide + texte, le texte reste).
- 3.1 : `traiterImage` (taille, MIME **JPEG/PNG**, Data URI).
- 4.1 : mots + limites d’un filtre naïf.

Bonne suite dans la validation entrante côté serveur.
