<?php

declare(strict_types=1);

/**
 * Layout commun pour les démos du cours théorique PHP (Séance 6).
 *
 * @param array<int, array{href: string, label: string}> $navExtra liens sous la page courante (optionnel)
 */
function cours_layout_start(string $title, string $breadcrumb = '', array $navExtra = []): void
{
    header('Content-Type: text/html; charset=UTF-8');
    ?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?> — Cours PHP</title>
  <style>
    :root { font-family: system-ui, sans-serif; line-height: 1.5; color: #1e293b; background: #f8fafc; }
    body { margin: 0 auto; max-width: 52rem; padding: 1.25rem 1rem 3rem; }
    a { color: #2563eb; }
    header { margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0; }
    header nav a { margin-right: 0.75rem; font-size: 0.9rem; }
    h1 { font-size: 1.5rem; margin: 0 0 0.5rem; }
    .crumb { font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem; }
    pre, code { background: #f1f5f9; border-radius: 4px; }
    pre { padding: 1rem; overflow: auto; font-size: 0.85rem; }
    code { padding: 0.15em 0.35em; }
    .note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; margin: 1rem 0; font-size: 0.95rem; }
    form label { display: block; margin: 0.5rem 0; }
    input[type="text"], input[type="email"], textarea { width: 100%; max-width: 24rem; padding: 0.35rem 0.5rem; }
    button { margin-top: 0.5rem; padding: 0.4rem 0.75rem; cursor: pointer; }
    ul.demo-links { padding-left: 1.25rem; }
    ul.demo-links li { margin: 0.35rem 0; }
  </style>
</head>
<body>
<header>
  <nav>
    <a href="/index.php">Accueil démos</a>
  </nav>
  <?php if ($breadcrumb !== '') { ?>
    <p class="crumb"><?= htmlspecialchars($breadcrumb, ENT_QUOTES, 'UTF-8') ?></p>
  <?php } ?>
  <h1><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></h1>
  <?php if ($navExtra !== []) { ?>
    <nav>
      <?php foreach ($navExtra as $link) { ?>
        <a href="<?= htmlspecialchars($link['href'], ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($link['label'], ENT_QUOTES, 'UTF-8') ?></a>
      <?php } ?>
    </nav>
  <?php } ?>
</header>
<main>
    <?php
}

function cours_layout_end(): void
{
    ?>
</main>
</body>
</html>
    <?php
}
