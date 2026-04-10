<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('Variables et concaténation', 'Bloc C — Syntaxe PHP');

$prenom = 'Alice';
$age = 20;
$pi = 3.14;
$actif = true;

echo '<p>Prénom : ' . htmlspecialchars((string) $prenom, ENT_QUOTES, 'UTF-8') . '</p>';

echo '<p>Âge : ' . $age . ', π ≈ ' . $pi . ', actif : ' . ($actif ? 'oui' : 'non') . '</p>';

cours_layout_end();
?>
<p>Nombre :<?= (2 + 3) ?> </p>