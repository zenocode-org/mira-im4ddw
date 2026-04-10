<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('Traitement POST (traitement-post.php)', 'Bloc D');

// traitement.php (diapo) — ici : traitement-post.php
$email = $_POST['email'] ?? '';
if ($email === '') {
    echo '<p>Email manquant</p>';
} else {
    echo '<p>Reçu : ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</p>';
}
echo '<p><a href="form-post.php">← Retour au formulaire</a></p>';

cours_layout_end();
