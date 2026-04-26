<?php

/**
 * =============================================================================
 * TP Séance 7 — Forum anonyme (un seul fichier à faire évoluer)
 * =============================================================================
 *
 * Ce fichier mélange du PHP « prêt à l’emploi » (affichage, sécurité de base) et
 * des **trous à combler** (exercices 2.2 à 4.1). Lis le README d’abord.
 *
 * Ordre de lecture recommandé pour un débutant en PHP :
 *   1) Les constantes (haut de fichier) — ce sont des « réglages » nommés.
 *   2) `h()` — échappe le texte pour le HTML (anti-XSS) ; sert partout en affichage.
 *   3) Les fonctions `valider…` / `traiterImage` / `contientMotInterdit` — une fonction
 *      = une responsabilité ; elles **retournent** plutôt qu’imprimer.
 *   4) Le bloc `if ($_SERVER['REQUEST_METHOD'] === 'POST')` — **traitement** du formulaire.
 *   5) Le HTML en bas — le **même** fichier, mode « gabarit ».
 *
 * Exercices (ordre pédago. conseillé) :
 *   2.1  `validerTitre` — DÉJÀ FAIT ici (exemple à imiter pour l’ex. 2.2).
 *   2.2  `validerMessage` — **à écrire** (longueur min/max après le cas « vide »).
 *   2.3  reprise de saisie — **décommenter** 2 lignes dans le bloc POST + vérifier le formulaire.
 *   3.1  `traiterImage` — **remplacer** le corps du « squelette » par une vraie logique
 *         (`$_FILES`, erreurs, taille, MIME, Data URI — voir README).
 *   4.1  `contientMotInterdit` + tableau `$motsInterdits` — **à compléter**.
 *
 * Tant que 2.2 n’est pas faite, un message très court pourra quand même être **accepté**
 * côté serveur : c’est **normal** (règle min pas encore codée).
 * =============================================================================
 */
declare(strict_types=1);

// --- Constantes (à utiliser dans tes `if` dès que tu les codes) ---

const TITRE_MAX_CARACTERES = 200;

const MESSAGE_MIN_CARACTERES = 10;
const MESSAGE_MAX_CARACTERES = 4000;

const IMAGE_MAX_OCTETS = 1_500_000; // Cadrer avec l’attribut caché MAX_FILE_SIZE du formulaire
const CLE_FICHIER_IMAGE = 'image';

/**
 * Sera utile pour l’ex. 3.1 : MIME vérifiés côté **contenu** (FileInfo), pas l’extension.
 *
 * @var list<string>
 */
const IMAGE_MIMES_AUTORISES = [
    'image/jpeg',
    'image/png',
];

/**
 * « Wrapper » de htmlspecialchars : tout texte venu de l’utilisateur affiché en HTML
 * doit passer ici (attributs `value`, contenu de `<textarea>`, messages d’erreur).
 */
function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

/**
 * Ex. 2.1 (corrigé fourni) : exemple de structure « refuser + messages dans un tableau ».
 * Regarde le test de longueur : on réutilisera la même idée en 2.2 sur `$message` déjà `trim`mé.
 */
function validerTitre(string $titre): array
{
    $erreurs = [];
    if (trim($titre) === '') {
        $erreurs[] = 'Le titre est obligatoire.';

        return $erreurs;
    }

    if (mb_strlen($titre, 'UTF-8') > TITRE_MAX_CARACTERES) {
        $erreurs[] = 'Le titre est trop long (maximum ' . (string) TITRE_MAX_CARACTERES . ' caractères).';
    }

    return $erreurs;
}

/**
 * Ex. 2.2 (TODO) : après le cas « vide » (déjà géré), impose une longueur **min** et **max**
 * sur la chaîne déjà `trim`mée, avec `mb_strlen($message, 'UTF-8')` et les constantes
 * MESSAGE_MIN_CARACTERES / MESSAGE_MAX_CARACTERES. Messages d’erreur **différents** pour
 * trop court vs trop long.
 */
function validerMessage(string $message): array
{
    $erreurs = [];
    $message = trim($message);
    if ($message === '') {
        $erreurs[] = 'Le message ne peut pas être vide.';

        return $erreurs;
    }

    // --- Ex. 2.2 : écris ici le contrôle de longueur (voir validerTitre + README) ---

    return $erreurs;
}

/**
 * Ex. 4.1 (TODO) : renvoie `true` si l’un des mots de la liste apparaît dans le texte
 * (définition pédago. : sous-chaîne, casse insensible — README).
 */
function contientMotInterdit(string $texte, array $motsInterdits): bool
{
    // Tant que la liste est vide, rien n’est interdit.
    if ($motsInterdits === []) {
        return false;
    }

    // --- Ex. 4.1 : remplir le corps (indices : mb_strtolower, str_contains, foreach) ---

    return false;
}

/**
 * Ex. 3.1 (TODO) : lit le fichier optionnel en `$_FILES` sans l’enregistrer sur le disque.
 * Pour l’instant, ce **squelette** refuse toute vraie image (tu dois le remplacer).
 * Si pas de fichier, ou pas d’image envoyée, c’est accepté.
 *
 * Rappel : structure de retour :
 *   [ 'ok' => bool, 'dataUri' => string|null, 'erreur' => string|null ]
 */
function traiterImage(?array $fichier): array
{
    if ($fichier === null) {
        return ['ok' => true, 'dataUri' => null, 'erreur' => null];
    }

    $err = (int) ($fichier['error'] ?? 0);
    if ($err === UPLOAD_ERR_NO_FILE) {
        return ['ok' => true, 'dataUri' => null, 'erreur' => null];
    }

    // --- Ex. 3.1 : supprime ce return et implémente (README + constantes, finfo, base64) ---
    return [
        'ok' => false,
        'dataUri' => null,
        'erreur' => 'Ex. 3.1 : compléter traiterImage() dans index.php (voir README). Téléversement ignoré pour l’instant.',
    ];
}

header('Content-Type: text/html; charset=UTF-8');

$erreurs = [];
$titreSaisi = '';
$messageSaisi = '';
$messageAccepte = false;
$recapTitre = '';
$recapMessage = '';
$recapImageDataUri = null;

// Ex. 4.1 : ajoute quelques mots d’exemple ici (liste courte, pédago.)
$motsInterdits = [
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titreBrut = (string) ($_POST['titre'] ?? '');
    $messageBrut = (string) ($_POST['message'] ?? '');

    // Ex. 2.3 — reprise de saisie : **décommente** les deux lignes ci-dessous, sinon après
    // une erreur le formulaire reparaît **vide** (c’est voulu tant que l’ex. n’est pas faite).
    // $titreSaisi = $titreBrut;
    // $messageSaisi = $messageBrut;

    $titre = trim($titreBrut);
    $message = trim($messageBrut);

    // a) Valider d’abord le texte (titre + message) ; les erreurs s’ajoutent dans $erreurs
    $erreurs = array_merge(
        $erreurs,
        validerTitre($titre),
        validerMessage($message)
    );

    $fichier = array_key_exists(CLE_FICHIER_IMAGE, $_FILES) ? $_FILES[CLE_FICHIER_IMAGE] : null;
    // b) Image seulement si le texte est déjà valide (moins d’erreurs en même temps)
    if ($erreurs === []) {
        $r = traiterImage($fichier);
        if (!$r['ok'] && $r['erreur'] !== null) {
            $erreurs[] = $r['erreur'];
        } else {
            $recapImageDataUri = $r['dataUri'];
        }
    }

    if ($erreurs === [] && (contientMotInterdit($titre, $motsInterdits) || contientMotInterdit($message, $motsInterdits))) {
        $erreurs[] = 'Le contenu contient un mot interdit (modération pédago.).';
    }

    if ($erreurs === []) {
        $messageAccepte = true;
        $recapTitre = $titre;
        $recapMessage = $messageBrut;
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TP Séance 7 — Forum anonyme</title>
  <link rel="stylesheet" href="css/tp-seance-7.css">
</head>
<body>
  <div class="wrap">
    <h1>Forum anonyme (démo)</h1>
    <p class="sub">Aucune authentification, aucun stockage en base. Après un envoi réussi, l’aperçu s’affiche <strong>une seule fois</strong> (recharge la page : tout disparaît — c’est voulu).</p>
    <p class="hint">Lis le haut de <code>index.php</code> et le <code>README.md</code> : ex. 2.2, 2.3 (décommenter), 3.1, 4.1.</p>

    <?php if ($erreurs !== []) { ?>
      <div class="card err" role="alert">
        <strong>À corriger :</strong>
        <ul>
          <?php foreach ($erreurs as $msg) { ?>
            <li><?= h($msg) ?></li>
          <?php } ?>
        </ul>
      </div>
    <?php } elseif ($messageAccepte) { ?>
      <div class="card ok" role="status">
        <strong>Message accepté (aperçu)</strong> — il serait enregistré sur un vrai forum ; ici, on n’a pas de base de données.
      </div>
    <?php } ?>

    <div class="card">
      <form method="post" action="" enctype="multipart/form-data" autocomplete="off">
        <input type="hidden" name="MAX_FILE_SIZE" value="1500000" />

        <label for="titre">Titre *</label>
        <input type="text" name="titre" id="titre" value="<?= h($titreSaisi) ?>" required maxlength="200" />

        <label for="message">Message (texte libre) *</label>
        <textarea name="message" id="message" rows="5" required maxlength="4000"><?= h($messageSaisi) ?></textarea>

        <label for="image">Image (optionnelle) — ex. 3.1</label>
        <input type="file" name="image" id="image" accept="image/jpeg,image/png" />

        <button type="submit">Envoyer</button>
      </form>
    </div>

    <?php if ($messageAccepte) { ?>
      <div class="forum-card" role="region" aria-label="Aperçu du message publié">
        <?php if ($recapImageDataUri !== null) { ?>
          <div class="thumb" aria-hidden="true">
            <img src="<?= h($recapImageDataUri) ?>" alt="Image jointe au message" />
          </div>
        <?php } ?>
        <h2><?= h($recapTitre) ?></h2>
        <p class="body"><?= h($recapMessage) ?></p>
        <p class="meta">Aperçu immédiat (pas d’enregistrement) — rechargement = disparition</p>
      </div>
    <?php } ?>
  </div>
</body>
</html>
