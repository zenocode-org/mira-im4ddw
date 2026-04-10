<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('$_GET', 'Bloc D — Superglobales', [
    ['href' => '09-get.php?prenom=Alice&ville=Paris', 'label' => 'Exemple avec ?prenom=Alice&ville=Paris'],
]);

// URL : /09-get.php?prenom=Alice&ville=Paris
// $_GET est un tableau associatif :

echo '<p><code>prenom</code> : ';
echo htmlspecialchars($_GET['prenom'] ?? '(non défini)', ENT_QUOTES, 'UTF-8');
echo '</p>';
echo '<p><code>ville</code> : ';
echo htmlspecialchars($_GET['ville'] ?? '(non défini)', ENT_QUOTES, 'UTF-8');
echo '</p>';

$prenom = $_GET['prenom'] ?? '';
echo '<p>Avec <code>??</code> (chaîne vide par défaut) : <code>' . htmlspecialchars($prenom, ENT_QUOTES, 'UTF-8') . '</code></p>';

echo '<pre>' . htmlspecialchars(print_r($_GET, true), ENT_QUOTES, 'UTF-8') . '</pre>';

cours_layout_end();
