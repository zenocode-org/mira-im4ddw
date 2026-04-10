<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('error_log()', 'Bloc D — déboguer côté serveur');

$email = $_POST['email'] ?? '';
$logged = false;

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    // Les logs ne s’affichent pas dans le navigateur : ils vont vers le journal PHP / Apache.
    error_log('[demo-error-log] email=' . $email);
    $logged = true;
}

?>
<?php if ($logged) { ?>
  <p>Une ligne a été écrite dans les <strong>logs du serveur</strong> (rien n’apparaît ici pour le contenu du log).</p>
  <p class="note">En local avec Docker, ouvre un terminal à la racine du dépôt et lance : <code>docker compose logs -f web</code> pour voir la ligne (souvent préfixée par <code>AH01071</code> / Apache).</p>
<?php } else { ?>
  <p>Les messages de débogage peuvent être envoyés avec <code>error_log()</code> plutôt qu’affichés dans la page HTML.</p>
<?php } ?>

<form method="post" action="">
  <label>Email (démo — en production, éviter de journaliser des données sensibles en clair) :
    <input type="email" name="email" value="<?= htmlspecialchars($email, ENT_QUOTES, 'UTF-8') ?>" placeholder="toi@exemple.org">
  </label>
  <button type="submit">Écrire un log</button>
</form>

<p class="note">Référence : <a href="https://www.php.net/manual/fr/function.error-log.php">documentation <code>error_log</code></a>. Option avancée : écrire vers un fichier avec le 3ᵉ paramètre si la config le permet.</p>
<?php

cours_layout_end();
