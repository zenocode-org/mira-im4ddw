<?php
declare(strict_types=1);

/**
 * ÉTAPE 1 — Formulaire « riche » et traitement côté serveur
 *
 * Exercices (dans l’ordre) :
 *   1.1  E-mail requis + format (filter_var)
 *   1.2  Longueur min. du message
 *   1.3  Consentement obligatoire
 *   1.4  Liste blanche sur la catégorie
 *
 * Déjà en place : récupération des champs, affichage des erreurs, h(), exemple de validation (titre).
 */

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

header('Content-Type: text/html; charset=UTF-8');

$erreurs = [];
$titre = '';
$email = '';
$categorie = 'news';
$message = '';
$consentement = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titre = trim((string) ($_POST['titre'] ?? ''));
    $email = trim((string) ($_POST['email'] ?? ''));
    $categorie = (string) ($_POST['categorie'] ?? 'news');
    $message = trim((string) ($_POST['message'] ?? ''));
    $consentement = isset($_POST['consentement']);

    // Exemple déjà en place (à garder) : titre obligatoire
    if ($titre === '') {
        $erreurs[] = 'Le titre est obligatoire.';
    }

    // Ex. 1.1 — e-mail requis : si vide, message dédié ; sinon filter_var(…, FILTER_VALIDATE_EMAIL) faux → message « format d’e-mail invalide ».
    // Ex. 1.2 — message < 10 caractères (après trim) → erreur.
    // Ex. 1.3 — case « consentement » non cochée → erreur.
    // Ex. 1.4 — $categorie ∈ { 'news', 'tutoriel', 'autre' } uniquement (ou documente forçage / erreur).
}

$afficherRecap = $_SERVER['REQUEST_METHOD'] === 'POST' && $erreurs === [];
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Étape 1 — Formulaire serveur</title>
  <link rel="stylesheet" href="css/tp-seance-6.css">
</head>
<body>
  <div class="wrap">
    <p><a href="index.php">← Accueil du TP</a></p>
    <h1>Étape 1 — Formulaire et gestion côté serveur</h1>
    <p class="hint">Méthode <code>POST</code> — utilise <code>$_POST</code> et <code>h()</code> pour tout ce que tu affiches en HTML.</p>

    <?php if ($erreurs !== []) { ?>
      <div class="card err" role="alert">
        <strong>À corriger :</strong>
        <ul>
          <?php foreach ($erreurs as $msg) { ?>
            <li><?= h($msg) ?></li>
          <?php } ?>
        </ul>
      </div>
    <?php } elseif ($afficherRecap) { ?>
      <div class="card ok" role="status">
        <strong>Envoi accepté (résumé) :</strong>
        <p>Titre : <?= h($titre) ?></p>
        <p>Catégorie : <?= h($categorie) ?></p>
        <p>Consentement : <?= $consentement ? 'oui' : 'non' ?></p>
        <p>Message (aperçu) : <?= h(mb_substr($message, 0, 120) . (mb_strlen($message) > 120 ? '…' : '')) ?></p>
      </div>
    <?php } ?>

    <div class="card">
      <form method="post" action="">
        <label for="titre">Titre *</label>
        <input type="text" name="titre" id="titre" value="<?= h($titre) ?>" required>

        <label for="email">E-mail (contact) *</label>
        <input type="email" name="email" id="email" value="<?= h($email) ?>" required>

        <label for="categorie">Catégorie</label>
        <select name="categorie" id="categorie">
          <option value="news"<?= $categorie === 'news' ? ' selected' : '' ?>>News</option>
          <option value="tutoriel"<?= $categorie === 'tutoriel' ? ' selected' : '' ?>>Tutoriel</option>
          <option value="autre"<?= $categorie === 'autre' ? ' selected' : '' ?>>Autre</option>
        </select>

        <label for="message">Message * (min. 10 caractères en phase de validation — à appliquer dans le PHP TODO)</label>
        <textarea name="message" id="message" rows="4"><?= h($message) ?></textarea>

        <label>
          <input type="checkbox" name="consentement" value="1"<?= $consentement ? ' checked' : '' ?>>
          J’accepte l’enregistrement de ces informations à des fins pédagogiques
        </label>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  </div>
</body>
</html>
