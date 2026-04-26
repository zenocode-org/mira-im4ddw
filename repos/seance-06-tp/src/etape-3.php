<?php
declare(strict_types=1);

/**
 * ÉTAPE 3 — Pièces jointes : contrôles de base (poids, type, nom sûr, durcissement du dossier)
 *
 * Exercice 3.1 : affecter $nomStocke (nom aléatoire + extension vérifiée) — requis pour que l’upload aboutisse.
 * Exercice 3.2 (hors page) : fichier .htaccess dans uploads/ (voir README).
 * Bonus 3.3 : vérification MIME (finfo) en plus de l’extension.
 */

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

header('Content-Type: text/html; charset=UTF-8');

$dossierUpload = __DIR__ . '/uploads';

// Limite de taille (en octets) — à appliquer dans le PHP
$tailleMaxOctets = 512 * 1024; // 512 Ko
// Extensions autorisées (minuscules, sans le point) — comparaison à faire côté serveur, pas seulement sur le « type » affiché par le navigateur
$extensionsAutorisees = ['png', 'jpg', 'jpeg', 'pdf'];

$message = '';
$typeMessage = 'info';
$fichierEnregistre = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!array_key_exists('fichier', $_FILES)) {
        $message = 'Aucun fichier reçu.';
        $typeMessage = 'err';
    } else {
        $f = $_FILES['fichier'];
        if ((int) $f['error'] === UPLOAD_ERR_NO_FILE) {
            $message = 'Choisis un fichier.';
            $typeMessage = 'err';
        } elseif ((int) $f['error'] !== UPLOAD_ERR_OK) {
            $message = 'Erreur d’upload (code ' . (int) $f['error'] . ').';
            $typeMessage = 'err';
        } else {
            $cheminSource = (string) $f['tmp_name'];
            if (!is_uploaded_file($cheminSource)) {
                $message = 'Fichier temporaire invalide.';
                $typeMessage = 'err';
            } else {
                $taille = (int) $f['size'];
                if ($taille > $tailleMaxOctets) {
                    $message = 'Fichier trop volumineux (max. ' . (int) ($tailleMaxOctets / 1024) . ' Ko).';
                    $typeMessage = 'err';
                } else {
                    $ext = strtolower(pathinfo((string) $f['name'], PATHINFO_EXTENSION));
                    if (!in_array($ext, $extensionsAutorisees, true)) {
                        $message = 'Type de fichier non autorisé (extensions acceptées : ' . implode(', ', $extensionsAutorisees) . ').';
                        $typeMessage = 'err';
                    } else {
                        // Ex. 3.1 : affecte ici un nom SÛR et unique, par ex. :
                        //   $nomStocke = bin2hex(random_bytes(8)) . '.' . $ext;
                        // (Pourquoi ne pas réutiliser le nom client ? : ../, caractères douteux, collision entre utilisateurs)
                        $nomStocke = null;

                        if ($nomStocke === null) {
                            $message = 'Complète l’exercice 3.1 (nom de fichier côté serveur) dans etape-3.php, puis réessaie.';
                            $typeMessage = 'err';
                        } else {
                        $cheminCible = $dossierUpload . '/' . $nomStocke;

                        if (!is_dir($dossierUpload) || !is_writable($dossierUpload)) {
                            $message = 'Le dossier d’upload n’est pas utilisable (droits / existence).';
                            $typeMessage = 'err';
                        } elseif (file_exists($cheminCible)) {
                            $message = 'Conflit de nom sur le disque (rare si le nom est aléatoire).';
                            $typeMessage = 'err';
                        } elseif (move_uploaded_file($cheminSource, $cheminCible)) {
                            $fichierEnregistre = $nomStocke;
                            $message = 'Fichier accepté (contrôles basiques) et enregistré.';
                            $typeMessage = 'ok';
                        } else {
                            $message = 'Échec de l’enregistrement (droits, chemin).';
                            $typeMessage = 'err';
                        }
                        }
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
  <title>Étape 3 — Sécurité</title>
  <link rel="stylesheet" href="css/tp-seance-6.css">
</head>
<body>
  <div class="wrap">
    <p><a href="index.php">← Accueil</a> · <a href="etape-2.php">Étape 2</a></p>
    <h1>Étape 3 — Sécurité (fichiers)</h1>
    <p class="hint">Dans <code>uploads/</code> : vérification taille, extension, <strong>nom unique</strong>, et (hors page) règles Apache / PHP (voir README).</p>

    <?php if ($message !== '') { ?>
      <div class="card <?= $typeMessage === 'ok' ? 'ok' : ($typeMessage === 'err' ? 'err' : 'info') ?>"><?= h($message) ?><?php if ($fichierEnregistre !== null) { ?><p class="lst">Nom côté disque : <?= h($fichierEnregistre) ?></p><?php } ?></div>
    <?php } ?>

    <div class="card">
      <form method="post" action="" enctype="multipart/form-data">
        <input type="hidden" name="MAX_FILE_SIZE" value="600000" />
        <label for="fichier">Fichier (.png, .jpg, .pdf — 512 Ko max. côté logique de cette page)</label>
        <input type="file" name="fichier" id="fichier" accept=".png,.jpg,.jpeg,.pdf" required>
        <button type="submit">Téléverser (contrôlé)</button>
      </form>
    </div>

    <div class="card">
      <p><strong>Exercice 3.1 (bloc plus haut) :</strong> donner une valeur à <code>$nomStocke</code> (nom aléatoire + extension contrôlée). <strong>Bonus 3.3 :</strong> vérifier le <strong>type réel</strong> avec <a href="https://www.php.net/manual/fr/book.fileinfo.php">finfo</a> (MIME) en plus de l’extension — pourquoi l’<code>accept</code> du navigateur ne suffit pas ?</p>
    </div>
  </div>
</body>
</html>
