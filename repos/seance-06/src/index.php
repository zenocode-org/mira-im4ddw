<?php

declare(strict_types=1);

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Démos — Cours théorique PHP (Séance 6)</title>
  <style>
    :root { font-family: system-ui, sans-serif; line-height: 1.5; color: #1e293b; background: #f8fafc; }
    body { margin: 0 auto; max-width: 52rem; padding: 1.25rem 1rem 3rem; }
    a { color: #2563eb; }
    h1 { font-size: 1.6rem; }
    h2 { font-size: 1.15rem; margin-top: 1.75rem; color: #334155; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.35rem; }
    ul { margin: 0.5rem 0; padding-left: 1.25rem; }
    li { margin: 0.35rem 0; }
    .note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; margin: 1.25rem 0; font-size: 0.95rem; }
    code { background: #f1f5f9; padding: 0.1em 0.35em; border-radius: 4px; font-size: 0.9em; }
  </style>
</head>
<body>
  <h1>Cours théorique PHP — démonstrations</h1>
  <p>Pages alignées sur <code>slides/seance-06/cours-php-theorique.jsx</code>. En local : <code>docker compose up -d</code> puis <a href="http://localhost:8080/">http://localhost:8080/</a>.</p>

  <div class="note">
    <strong>Bloc A — PHP et le Web</strong> : premier script, rôle du serveur (pas de page dédiée : voir les exemples ci-dessous).
  </div>

  <h2>Bloc A — Premier fichier PHP</h2>
  <ul>
    <li><a href="01-hello.php">01 — Bonjour depuis PHP</a> (équivalent diapo « Premier fichier PHP »)</li>
  </ul>

  <h2>Bloc B — Docker</h2>
  <ul>
    <li>Configuration : <code>docker-compose.yml</code> à la racine du dépôt (image, port <code>8080:80</code>, volume <code>./src</code>).</li>
  </ul>

  <h2>Bloc C — Syntaxe PHP</h2>
  <ul>
    <li><a href="02-commentaires.php">02 — Commentaires</a></li>
    <li><a href="03-variables.php">03 — Variables et concaténation</a></li>
    <li><a href="04-tableaux-indexes.php">04 — Tableaux indexés</a></li>
    <li><a href="05-tableaux-assoc.php">05 — Tableaux associatifs</a></li>
    <li><a href="06-foreach.php">06 — foreach</a></li>
    <li><a href="07-fonctions.php">07 — Fonctions</a></li>
    <li><a href="08-conditions.php">08 — Conditions (if, <code>$_SERVER['REQUEST_METHOD']</code>)</a></li>
  </ul>

  <h2>Bloc D — Superglobales</h2>
  <ul>
    <li><a href="09-get.php">09 — <code>$_GET</code></a> (essayer aussi <a href="09-get.php?prenom=Alice&amp;ville=Paris">avec paramètres</a>)</li>
    <li><a href="10-post.php">10 — <code>$_POST</code></a> (formulaire de démo)</li>
    <li><a href="form-get.php">11 — Formulaire GET</a> → <code>traitement-get.php</code></li>
    <li><a href="form-post.php">12 — Formulaire POST</a> → <code>traitement-post.php</code></li>
    <li><a href="13-htmlspecialchars.php">13 — <code>htmlspecialchars</code></a></li>
    <li><a href="14-server.php">14 — <code>$_SERVER</code> (aperçu)</a></li>
    <li><a href="15-error-log.php">15 — <code>error_log()</code></a> (voir les logs avec <code>docker compose logs -f web</code>)</li>
  </ul>
</body>
</html>
