<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('$_SERVER (aperçu)', 'Bloc D — Superglobales');

$keys = [
    'REQUEST_METHOD',
    'HTTP_HOST',
    'SCRIPT_NAME',
    'REQUEST_URI',
    'SERVER_SOFTWARE',
    'PHP_SELF',
];

echo '<ul>';
foreach ($keys as $key) {
    $val = $_SERVER[$key] ?? '(absent)';
    echo '<li><code>' . htmlspecialchars($key, ENT_QUOTES, 'UTF-8') . '</code> = ';
    echo htmlspecialchars((string) $val, ENT_QUOTES, 'UTF-8') . '</li>';
}
echo '</ul>';

echo '<p class="note">Pas besoin de tout mémoriser ; utile surtout pour la méthode HTTP et le chemin.</p>';

echo '<details><summary>$_SERVER complet (debug)</summary><pre>';
echo htmlspecialchars(print_r($_SERVER, true), ENT_QUOTES, 'UTF-8');
echo '</pre></details>';

cours_layout_end();
