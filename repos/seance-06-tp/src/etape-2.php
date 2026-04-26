<?php
declare(strict_types=1);

/**
 * ÉTAPE 2 — Upload d’un fichier et stockage sur le disque
 *
 * Exercice 2.1 (optionnel avancé) : si un fichier cible existe déjà (même nom), choisir
 * une stratégie (refus, écrasement explicite, autre) et l’expliquer en commentaire.
 *
 * Prérequis : le dossier src/uploads/ doit être inscriptible (voir README : chmod)
 * si move_uploaded_file échoue.
 */

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

header('Content-Type: text/html; charset=UTF-8');

// Répertoire de stockage, à l’intérieur du site (déploiement pédagogique)
$dossierUpload = __DIR__ . '/uploads';

$message = '';
$typeMessage = 'info';
$fichierEnregistre = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!array_key_exists('fichier', $_FILES)) {
        $message = 'Aucun fichier n’a été envoyé (clé "fichier" absente).';
        $typeMessage = 'err';
    } else {
        $f = $_FILES['fichier'];
        $code = (int) $f['error'];

        // Rappel des codes d’erreur : https://www.php.net/manual/fr/features.file-upload.errors.php
        if ($code !== UPLOAD_ERR_OK) {
            $message = match ($code) {
                UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'Fichier trop volumineux pour la configuration actuelle.',
                UPLOAD_ERR_PARTIAL => 'Transfert incomplet.',
                UPLOAD_ERR_NO_FILE => 'Aucun fichier sélectionné.',
                default => 'Erreur d’upload (code ' . $code . ').',
            };
            $typeMessage = 'err';
        } else {
            $cheminSource = (string) $f['tmp_name'];
            if (!is_uploaded_file($cheminSource)) {
                $message = 'Fichier temporaire invalide (sécurité).';
                $typeMessage = 'err';
            } else {
                $nomClient = (string) $f['name'];
                // DANGER (étape 3) : accepter le nom fourni par le client ouvre des risques. Ici, version naïve à sécuriser plus tard.
                $nomDestination = $dossierUpload . '/' . $nomClient;

                if (!is_dir($dossierUpload) || !is_writable($dossierUpload)) {
                    $message = 'Le dossier <code>uploads/</code> n’existe pas ou n’est pas inscriptible (voir README : droits sur le disque / Docker).';
                    $typeMessage = 'err';
                } else {
                    // Ex. 2.1 (optionnel) : si file_exists($nomDestination), refuser, renommer ou documenter l’écrasement. Ici, move_uploaded_file écrase un fichier existant.
                    $conflit = file_exists($nomDestination);
                    if (move_uploaded_file($cheminSource, $nomDestination)) {
                        $fichierEnregistre = basename($nomDestination);
                        $message = $conflit
                            ? 'Fichier enregistré (un fichier portant le même nom a été remplacé).'
                            : 'Fichier enregistré côté serveur.';
                        $typeMessage = 'ok';
                    } else {
                        $message = 'Impossible d’enregistrer le fichier (droits, disque, chemin ?). Vérifie le dossier uploads/ et le README.';
                        $typeMessage = 'err';
                    }
                }
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Étape 2 — Upload</title>
  <link rel="stylesheet" href="css/tp-seance-6.css">
</head>
<body>
  <div class="wrap">
    <p><a href="index.php">← Accueil du TP</a> · <a href="etape-1.php">Étape 1</a> · <a href="etape-3.php">Étape 3</a></p>
    <h1>Étape 2 — Upload et stockage</h1>
    <p class="hint">N’oublie pas <code>enctype="multipart/form-data"</code> sur le formulaire.</p>

    <?php if ($message !== '') { ?>
      <div class="card <?= $typeMessage === 'ok' ? 'ok' : ($typeMessage === 'err' ? 'err' : 'info') ?>" role="status">
        <?= h($message) ?>
        <?php if ($fichierEnregistre !== null) { ?>
          <p><strong>Nom côté serveur (fichier) :</strong> <?= h($fichierEnregistre) ?></p>
        <?php } ?>
      </div>
    <?php } ?>

    <div class="card">
      <form method="post" action="" enctype="multipart/form-data">
        <input type="hidden" name="MAX_FILE_SIZE" value="1048576" />
        <label for="fichier">Fichier (max. ~1 Mo côté formulaire, voir configuration PHP)</label>
        <input type="file" name="fichier" id="fichier" required>
        <button type="submit">Envoyer</button>
      </form>
    </div>

    <p class="hint">Indices utiles côté PHP : <code>$_FILES</code>, <code>is_uploaded_file</code>, <code>move_uploaded_file</code>, <code>basename</code> pour n’afficher qu’un nom de fichier.</p>
  </div>
</body>
</html>
