<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('Conditions côté serveur', 'Bloc C — Syntaxe PHP');

$age = 17;

echo '<p>Âge testé : ' . $age . ' → ';
if ($age >= 18) {
    echo 'Majeur';
} elseif ($age >= 13) {
    echo 'Adolescent';
} else {
    echo 'Mineur';
}
echo '</p>';

$methode = $_SERVER['REQUEST_METHOD'] ?? 'GET';
echo '<p>Méthode HTTP courante : <code>' . htmlspecialchars($methode, ENT_QUOTES, 'UTF-8') . '</code></p>';
if ($methode === 'POST') {
    echo '<p>Ici on pourrait traiter un formulaire envoyé en POST.</p>';
}

cours_layout_end();
