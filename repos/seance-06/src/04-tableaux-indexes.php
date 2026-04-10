<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('Tableaux indexés', 'Bloc C — Syntaxe PHP');

$fruits = ['Pomme', 'Banane', 'Orange'];

echo '<p>Premier fruit : ' . htmlspecialchars($fruits[0], ENT_QUOTES, 'UTF-8') . '</p>';
echo '<p>Nombre d’éléments : ' . count($fruits) . '</p>';
echo '<pre>' . htmlspecialchars(print_r($fruits, true), ENT_QUOTES, 'UTF-8') . '</pre>';

cours_layout_end();
