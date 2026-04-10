<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('Traitement GET (traitement-get.php)', 'Bloc D');

// traitement.php (diapo) — ici : traitement-get.php
$nom = $_GET['nom'] ?? '';
echo '<p>Bonjour ' . htmlspecialchars($nom, ENT_QUOTES, 'UTF-8') . '</p>';
echo '<p><a href="form-get.php">← Retour au formulaire</a></p>';

cours_layout_end();
