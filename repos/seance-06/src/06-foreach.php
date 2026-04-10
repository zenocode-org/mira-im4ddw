<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('foreach', 'Bloc C — Syntaxe PHP');

$notes = [12, 15, 9];

echo '<h2>Notes</h2>';
foreach ($notes as $n) {
    echo htmlspecialchars((string) $n, ENT_QUOTES, 'UTF-8') . '<br>';
}

$user = ['prenom' => 'Bob', 'ville' => 'Lyon'];
echo '<h2>Utilisateur</h2>';
foreach ($user as $cle => $valeur) {
    echo htmlspecialchars($cle . ' = ' . $valeur, ENT_QUOTES, 'UTF-8') . '<br>';
}

cours_layout_end();
