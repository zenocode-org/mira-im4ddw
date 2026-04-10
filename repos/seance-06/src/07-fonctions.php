<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

function direBonjour(string $nom): string
{
    return 'Bonjour ' . $nom;
}

function addition(int $a, int $b): int
{
    return $a + $b;
}

cours_layout_start('Fonctions', 'Bloc C — Syntaxe PHP');

echo '<p>' . htmlspecialchars(direBonjour('Alice'), ENT_QUOTES, 'UTF-8') . '</p>';
echo '<p>2 + 3 = ' . addition(2, 3) . '</p>';

cours_layout_end();
