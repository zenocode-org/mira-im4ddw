<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('Tableaux associatifs', 'Bloc C — Syntaxe PHP');

$user = [
    'nom' => 'Dupont',
    'email' => 'alice@exemple.com',
    'age' => 25,
];

echo '<p>Email : ' . htmlspecialchars($user['email'], ENT_QUOTES, 'UTF-8') . '</p>';
$cle = 'nom';
echo '<p>Via variable de clé : ' . htmlspecialchars($user[$cle], ENT_QUOTES, 'UTF-8') . '</p>';

cours_layout_end();
