<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('Formulaire POST', 'Bloc D — aligné sur TwinCodeSlide « Formulaire POST + traitement PHP »');

?>
<form action="traitement-post.php" method="post">
  <label>Email : <input type="email" name="email" value=""></label>
  <button type="submit">Envoyer</button>
</form>
<p class="note">Les données vont dans le corps de la requête ; l’URL reste <code>traitement-post.php</code> sans paramètres visibles.</p>
<?php

cours_layout_end();
