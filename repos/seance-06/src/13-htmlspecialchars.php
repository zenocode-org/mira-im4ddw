<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('htmlspecialchars', 'Bloc D — réafficher des données utilisateur');

$texte = $_POST['nom'] ?? '';

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    echo '<p>Sans échappement (dangereux si saisie malveillante) : ';
    // Ne pas faire en production — démo seulement
    echo '<span style="border:1px dashed #f97316;padding:2px 6px">' . $texte . '</span></p>';

    echo '<p>Avec <code>htmlspecialchars</code> (recommandé) : ';
    echo htmlspecialchars($texte, ENT_QUOTES, 'UTF-8');
    echo '</p>';
}

?>
<form method="post" action="">
  <label>Nom (essaie <code>&lt;script&gt;alert(1)&lt;/script&gt;</code>) :
    <input type="text" name="nom" value="<?= htmlspecialchars($texte, ENT_QUOTES, 'UTF-8') ?>">
  </label>
  <button type="submit">Tester</button>
</form>
<?php

cours_layout_end();
