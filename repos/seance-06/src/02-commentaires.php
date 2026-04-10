<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('Commentaires', 'Bloc C — Syntaxe PHP');

// Ligne unique

# Autre style de commentaire ligne

/*
  Bloc
  sur plusieurs lignes
*/

echo '<p class="note">Les commentaires ci-dessus ne produisent aucune sortie : seul ce texte est affiché.</p>';

cours_layout_end();
