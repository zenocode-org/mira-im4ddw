# Séance 4 — JavaScript dans le navigateur (mini-jeux)

Cette séance regroupe plusieurs **travaux pratiques autonomes**. Chaque dossier (`ex01-click-counter`, `ex02-whack-mole`, `ex03-reaction-time`) contient un **`index.html`** à ouvrir dans le navigateur et, sauf mention contraire, un **`README.md`** dans le même dossier avec les consignes détaillées.

---

## Comment travailler

1. **Ouvre le `README.md` de l’exercice** avant de coder : tu y trouves l’ordre des étapes, le comportement attendu et des liens vers de la documentation.
2. **Complète le `<script>` dans `index.html`** (souvent en bas de page). On évite les fichiers `.js` séparés ici pour tout avoir sous les yeux.
3. **Teste dans le navigateur** après chaque petite modification : recharger la page, vérifier la console (**F12** → onglet *Console*) si quelque chose ne réagit pas.
4. **Utilise le débogueur** (onglet *Débogueur* / *Sources*) dès que tu ne comprends pas l’ordre d’exécution — au minimum pour l’exercice 1, où c’est détaillé pas à pas.

Tu peux faire les exercices **dans l’ordre** (recommandé) : chaque TP réinvestit ce que tu as vu dans le précédent (événements, DOM, timers).

---

## Pourquoi ces exercices ?

| Exercice | Idée principale | Compétence visée |
|----------|-----------------|------------------|
| **TP 1 — Compteur de clics** | Relier boutons et affichage, `setInterval` / `clearInterval`, état d’une partie | Base indispensable : DOM, événements, minuterie, débogage |
| **TP 2 — Tape la taupe** | Créer des éléments avec le JS, classes CSS, `let` dans une boucle | Manipuler le DOM sans framework, éviter les pièges de portée |
| **TP 3 — Temps de réaction** | `setTimeout`, `Date.now()`, clavier (`keydown`, `repeat`) | Mesurer un délai et gérer plusieurs sources d’événements |

L’objectif n’est pas seulement que « ça marche » : c’est de **comprendre** ce que fait le navigateur (quel code s’exécute quand, quelles variables vivent où). Les mini-jeux rendent les bugs visibles ce qui oblige à structurer l’état et à lire les erreurs.

---

## Bonus (`bonus/`)

Petit détour ludique : pas le cœur de la séance, mais utile pour manipuler le DOM et les événements autrement. Voir le `README.md` du dossier si présent.

---

## Rendu

Le rendu est en général **le fichier `index.html` complété** pour chaque exercice demandé.
