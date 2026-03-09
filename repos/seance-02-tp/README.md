# TP Séance 2 — Plateforme d'événements

Structure de départ pour le TP HTML/CSS de la séance 2.

## Structure du projet

```
seance-02-tp/
├── index.html      ← Page principale (à compléter)
├── style.css       ← Feuille de styles (à compléter)
└── images/         ← Images et assets
```

## Lancer le projet

1. **Avec Live Server** (recommandé)  
   Clic droit sur `index.html` → « Open with Live Server »  
   → Rechargement automatique à chaque modification

2. **Directement dans le navigateur**  
   Double-clic sur `index.html` (ouverture via `file://`)

### Comment fonctionne Live Server ?

Live Server lance un **serveur HTTP local** (généralement sur `http://127.0.0.1:5500`) au lieu d'ouvrir le fichier via `file://`. Concrètement :

- **URL propre** — Les pages sont servies en `http://`, ce qui évite certains problèmes liés à l'origine `file://` (chemins, CORS, etc.).
- **Rechargement en direct** — Quand vous modifiez et enregistrez un fichier (HTML, CSS, JS), la page dans le navigateur se recharge automatiquement sans reclic.
- **Utilisation** — Clic droit sur `index.html` → « Open with Live Server », ou bouton « Go Live » en bas de la barre d'état de VS Code.

## Extensions VS Code recommandées

En ouvrant ce projet dans VS Code / Cursor, une suggestion s’affiche pour installer les extensions recommandées.  
Les extensions utiles pour le HTML/CSS sont notamment :

- **Live Server** — serveur local avec rechargement automatique  
- **HTML CSS Support** — complétion des `id`, `class`, navigation HTML ↔ CSS  
- **Prettier** — formatage automatique du code  

## Références

- [MDN : HTML](https://developer.mozilla.org/fr/docs/Web/HTML)
- [MDN : CSS](https://developer.mozilla.org/fr/docs/Web/CSS)
- [CSS-Tricks : Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS-Tricks : Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
