<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('Formulaire GET', 'Bloc D — aligné sur TwinCodeSlide « Formulaire GET + traitement PHP »');

?>
<form action="traitement-get.php" method="get">
  <label>Nom : <input type="text" name="nom" value=""></label>
  <button type="submit">Envoyer</button>
</form>
<p class="note">Après envoi, les données apparaissent dans l’URL ; le fichier <code>traitement-get.php</code> lit <code>$_GET['nom']</code>.</p>
<?php

cours_layout_end();
