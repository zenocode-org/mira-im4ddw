<?php

declare(strict_types=1);

require __DIR__ . '/inc/layout.php';

cours_layout_start('$_POST', 'Bloc D — Superglobales');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';
    echo '<p>Email reçu : ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</p>';
    echo '<p>Message : ' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</p>';
    echo '<p class="note">En production : ne jamais faire confiance aux données sans validation.</p>';
} else {
    ?>
    <form method="post" action="">
      <label>Email : <input type="email" name="email" value="demo@exemple.com"></label>
      <label>Message : <textarea name="message" rows="3">Bonjour</textarea></label>
      <button type="submit">Envoyer en POST</button>
    </form>
    <?php
}

cours_layout_end();
