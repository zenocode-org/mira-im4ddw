import React from 'react';
import { Deck, Text, Box, ListItem, UnorderedList, Notes, CodePane, codePaneThemes } from 'spectacle';
import {
  MiraTitleSlide,
  MiraContentSlide,
  CodeSlide,
  CodeAndPreviewSlide,
  PreviewSlide,
} from '../components';
import { MiraDeckTemplate } from '../components/MiraDeckTemplate';
import { miraTheme } from '../components/theme';
import { defaultTheme } from 'spectacle';

const theme = {
  ...defaultTheme,
  colors: { ...defaultTheme.colors, ...miraTheme.colors },
  fonts: miraTheme.fonts,
  fontSizes: miraTheme.fontSizes,
};

function CoursHtmlCss() {
  return (
    <Deck theme={theme} template={(props) => <MiraDeckTemplate {...props} />}>
      <MiraTitleSlide
        title="Introduction à HTML5 & CSS3"
        subtitle="Cours Théorique - Séance 1"
        date="3 mars"
      >
        <Notes>
          Objectifs : comprendre le front-end, maîtriser la structure sémantique HTML5, découvrir les
          principes CSS3, connaître les normes W3C.
        </Notes>
      </MiraTitleSlide>

      {/* --- Le web --- */}
      <CodeSlide
        heading="Le web : Client → Serveur → Réponse"
        code={`Navigateur (Client)  →  Serveur Web  →  Navigateur affiche
      [Demande]             [Envoie]         [Résultat]`}
        language="text"
        fontSize={18}
        notes="Tu demandes une page → le serveur te l'envoie → ton navigateur l'affiche."
      >
        <Text fontSize="1rem" marginTop={16} color="#4a5568">
          C'est la base du web.
        </Text>
      </CodeSlide>

      <MiraContentSlide heading="Le web : Client → Serveur → Réponse" centered>
        <CodePane
          language="text"
          showLineNumbers={false}
          theme={codePaneThemes.oneLight}
          fontSize={18}
        >{`Navigateur (Client)  →  Serveur Web  →  Navigateur affiche
      [Demande]             [Envoie]         [Résultat]`}
      </CodePane>
        <Text fontSize="1rem" marginTop={16} color="#4a5568">
          Tu demandes une page → le serveur te l'envoie → ton navigateur l'affiche.
        </Text>
      </MiraContentSlide>

      {/* --- HTML : la structure --- */}
      <MiraContentSlide heading="HTML : la structure">
        <Text fontSize="1.2rem" marginBottom={16}>
          <strong>HTML</strong> = le squelette de la page web
        </Text>
        <Text fontSize="1rem" color="#4a5568">
          C'est la structure de ton site.
        </Text>
        <Notes>Analogie : HTML c'est les murs d'une maison. Sans les murs, pas de maison.</Notes>
      </MiraContentSlide>

      {/* --- CSS : le style --- */}
      <MiraContentSlide heading="CSS : le style">
        <Text fontSize="1.2rem" marginBottom={16}>
          <strong>CSS</strong> = la peau et les vêtements
        </Text>
        <Text fontSize="1rem" color="#4a5568">
          C'est le design de ton site.
        </Text>
        <Notes>CSS c'est la peinture et la décoration de ta maison.</Notes>
      </MiraContentSlide>

      {/* --- JavaScript : l'interaction --- */}
      <MiraContentSlide heading="JavaScript : l'interaction">
        <Text fontSize="1.2rem" marginBottom={16}>
          <strong>JavaScript</strong> = les muscles
        </Text>
        <Text fontSize="1rem" color="#4a5568">
          C'est l'interaction de ton site.
        </Text>
        <Notes>JavaScript c'est l'électricité et la plomberie : ce qui fait bouger les choses.</Notes>
      </MiraContentSlide>

      {/* --- DevTools F12 --- */}
      <MiraContentSlide heading="Exemple : Ouvre ton navigateur (F12)">
        <Text fontSize="1rem" marginBottom={16}>
          Trois onglets importants :
        </Text>
        <UnorderedList fontSize="1.2rem">
          <ListItem>
            <strong>Elements</strong> → HTML (structure)
          </ListItem>
          <ListItem>
            <strong>Styles</strong> → CSS (design)
          </ListItem>
          <ListItem>
            <strong>Console</strong> → JavaScript (interactions)
          </ListItem>
        </UnorderedList>
        <Notes>
          Montre en live : ouvre n'importe quel site, appuie sur F12, montre les 3 onglets. Modifie un
          texte dans Elements, change une couleur dans Styles.
        </Notes>
      </MiraContentSlide>

      {/* --- HTML = HyperText Markup Language --- */}
      <MiraContentSlide heading="HTML = HyperText Markup Language">
        <Text fontSize="1.1rem" marginBottom={16}>
          <strong>C'est un langage de balisage, PAS de programmation.</strong>
        </Text>
        <UnorderedList fontSize="1rem">
          <ListItem>Pas de <code>if</code>, pas de boucles, pas de variables</ListItem>
          <ListItem>On marque des zones avec des étiquettes</ListItem>
        </UnorderedList>
        <Notes>Insiste : HTML n'est PAS un langage de programmation. C'est du balisage.</Notes>
      </MiraContentSlide>

      {/* --- Syntaxe HTML --- */}
      <CodeAndPreviewSlide
        heading="Syntaxe HTML : les balises"
        code={`<balise>Contenu</balise>

<!-- Exemple : -->
<strong>Texte en gras</strong>`}
        preview={{
          html: `<strong>Texte en gras</strong>`,
        }}
        language="html"
        notes="Toujours fermer ce que tu ouvres ! Une balise ouvrante, le contenu, une balise fermante."
      />

      {/* --- Exemple minimal --- */}
      <CodeAndPreviewSlide
        heading="Exemple minimal : ta première page"
        headingFontSize="1.75rem"
        code={`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma première page</title>
</head>
<body>
  <h1>Bonjour le monde !</h1>
  <p>Ceci est mon premier paragraphe.</p>
</body>
</html>`}
        preview={{
          html: `<h1>Bonjour le monde !</h1>
<p>Ceci est mon premier paragraphe.</p>`,
          title: 'Ma première page',
        }}
        language="html"
        showLineNumbers
        notes="Décortique : DOCTYPE, html, head, body."
      />

      {/* --- HTML5 Avant --- */}
      <CodeAndPreviewSlide
        heading="HTML5 : Avant (l'âge sombre)"
        code={`<div id="header">...</div>
<div id="nav">...</div>
<div id="content">...</div>
<div id="footer">...</div>`}
        preview={{
          html: `<div id="header" style="background:#e2e8f0;padding:8px;border-bottom:1px solid #cbd5e0;">Header</div>
<div id="nav" style="padding:8px;background:#f7fafc;">Nav</div>
<div id="content" style="padding:16px;">Contenu principal</div>
<div id="footer" style="background:#e2e8f0;padding:8px;border-top:1px solid #cbd5e0;">Footer</div>`,
        }}
        language="html"
        notes="Avant HTML5, tout était des divs. Pas de sens, juste des boîtes."
      />

      {/* --- HTML5 Maintenant --- */}
      <CodeAndPreviewSlide
        heading="HTML5 : Maintenant"
        code={`<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>`}
        preview={{
          html: `<header style="background:#e2e8f0;padding:8px;border-bottom:1px solid #cbd5e0;">Header</header>
<nav style="padding:8px;background:#f7fafc;">Nav</nav>
<main style="padding:16px;">Contenu principal</main>
<footer style="background:#e2e8f0;padding:8px;border-top:1px solid #cbd5e0;">Footer</footer>`,
        }}
        language="html"
        fontSize={15}
        notes="HTML5 a introduit des balises sémantiques."
      />

      {/* --- Pourquoi HTML5 --- */}
      <MiraContentSlide heading="Pourquoi HTML5 c'est mieux ?">
        <UnorderedList fontSize="1.1rem">
          <ListItem>
            <strong>Plus lisible</strong> pour les humains
          </ListItem>
          <ListItem>
            <strong>Meilleur pour le SEO</strong> (Google comprend mieux)
          </ListItem>
          <ListItem>
            <strong>Meilleur pour l'accessibilité</strong> (lecteurs d'écran)
          </ListItem>
        </UnorderedList>
        <Notes>
          Pareil qu'un texte Word : Titre 1, Titre 2, Citation… pas juste Gras partout. Les robots
          comprennent mieux.
        </Notes>
      </MiraContentSlide>

      {/* --- Balises sémantiques individuelles (condensées) --- */}
      <CodeAndPreviewSlide
        heading="Balises sémantiques principales"
        code={`<header>   <!-- Entête du site -->
<nav>     <!-- Menu de navigation -->
<main>    <!-- Contenu principal (UN SEUL) -->
<section> <!-- Section thématique -->
<article> <!-- Contenu autonome -->
<aside>   <!-- Barre latérale -->
<footer>  <!-- Pied de page -->`}
        preview={{
          html: `<header style="background:#cbd5e0;padding:6px;font-size:12px;">header</header>
<nav style="padding:6px;font-size:12px;">nav</nav>
<div style="display:flex;gap:8px;">
  <main style="flex:1;background:#e2e8f0;padding:12px;font-size:12px;">main</main>
  <aside style="width:80px;background:#edf2f7;padding:8px;font-size:11px;">aside</aside>
</div>
<footer style="background:#cbd5e0;padding:6px;font-size:12px;">footer</footer>`,
        }}
        language="html"
        fontSize={13}
        showLineNumbers
        notes="header, nav, main = les plus utilisés."
      />

      {/* --- Structure complète --- */}
      <CodeAndPreviewSlide
        heading="Exemple : Structure complète"
        headingFontSize="1.75rem"
        code={`<body>
  <header>
    <h1>Mon Blog</h1>
    <nav>
      <a href="#accueil">Accueil</a>
      <a href="#articles">Articles</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Mon premier article</h2>
      <p>Le contenu...</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2025 Mon Blog</p>
  </footer>
</body>`}
        preview={{
          html: `<header style="border-bottom:1px solid #e2e8f0;">
  <h1 style="margin:0 0 8px 0;">Mon Blog</h1>
  <nav>
    <a href="#accueil">Accueil</a> |
    <a href="#articles">Articles</a>
  </nav>
</header>
<main style="margin:16px 0;">
  <article>
    <h2>Mon premier article</h2>
    <p>Le contenu...</p>
  </article>
</main>
<footer style="border-top:1px solid #e2e8f0; margin-top:16px;">
  <p>&copy; 2025 Mon Blog</p>
</footer>`,
          title: 'Structure',
        }}
        language="html"
        showLineNumbers
        fontSize={12}
        gap={16}
        notes="header en haut, nav dedans, main au centre, footer en bas."
      />

      {/* --- Titres --- */}
      <CodeAndPreviewSlide
        heading="Titres &lt;h1&gt; à &lt;h6&gt;"
        code={`<h1>Titre principal</h1>
<h2>Sous-titre</h2>
<h3>Sous-sous-titre</h3>
<h4>Titre niveau 4</h4>
<h5>Titre niveau 5</h5>
<h6>Titre niveau 6</h6>`}
        preview={{
          html: `<h1 style="margin:0 0 8px 0;font-size:1.5rem;">Titre principal</h1>
<h2 style="margin:0 0 6px 0;font-size:1.25rem;">Sous-titre</h2>
<h3 style="margin:0 0 4px 0;font-size:1.1rem;">Sous-sous-titre</h3>
<h4 style="margin:0 0 4px 0;font-size:1rem;">Titre niveau 4</h4>
<h5 style="margin:0 0 2px 0;font-size:0.9rem;">Titre niveau 5</h5>
<h6 style="margin:0;font-size:0.8rem;">Titre niveau 6</h6>`,
        }}
        language="html"
        notes="Hiérarchie : h1 > h2 > h3. Ne saute pas de niveau."
      />

      {/* --- Paragraphes --- */}
      <CodeAndPreviewSlide
        heading="Paragraphes &lt;p&gt;"
        code={`<p>Un paragraphe de texte.</p>
<p>Un autre paragraphe.</p>`}
        preview={{
          html: `<p>Un paragraphe de texte.</p>
<p>Un autre paragraphe.</p>`,
        }}
        language="html"
        notes="Un paragraphe par idée."
      />

      {/* --- Listes non ordonnées --- */}
      <CodeAndPreviewSlide
        heading="Listes non ordonnées &lt;ul&gt;"
        code={`<ul>
  <li>Élément 1</li>
  <li>Élément 2</li>
  <li>Élément 3</li>
</ul>`}
        preview={{
          html: `<ul>
  <li>Élément 1</li>
  <li>Élément 2</li>
  <li>Élément 3</li>
</ul>`,
        }}
        language="html"
        notes="UL = Unordered List. Des puces, pas de numéros. L'ordre n'a pas d'importance."
      />

      {/* --- Listes ordonnées --- */}
      <CodeAndPreviewSlide
        heading="Listes ordonnées &lt;ol&gt;"
        code={`<ol>
  <li>Premier</li>
  <li>Deuxième</li>
  <li>Troisième</li>
</ol>`}
        preview={{
          html: `<ol>
  <li>Premier</li>
  <li>Deuxième</li>
  <li>Troisième</li>
</ol>`,
        }}
        language="html"
        notes="OL = Ordered List. Numéros automatiques. Parfait pour étapes, classements."
      />

      {/* --- Listes de définitions --- */}
      <CodeAndPreviewSlide
        heading="Listes de définitions &lt;dl&gt;"
        code={`<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language — structure</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets — présentation</dd>
</dl>`}
        preview={{
          html: `<dl style="max-width:400px;">
  <dt style="font-weight:bold; margin-top:8px;">HTML</dt>
  <dd style="margin-left:20px; margin-bottom:4px;">HyperText Markup Language — structure</dd>
  <dt style="font-weight:bold; margin-top:8px;">CSS</dt>
  <dd style="margin-left:20px; margin-bottom:4px;">Cascading Style Sheets — présentation</dd>
</dl>`,
        }}
        language="html"
        notes="dl = definition list, dt = term, dd = definition. Glossaires, FAQ."
      />

      {/* --- Listes imbriquées --- */}
      <CodeAndPreviewSlide
        heading="Listes imbriquées"
        code={`<ol>
  <li>Première étape
    <ul>
      <li>Sous-élément A</li>
      <li>Sous-élément B</li>
    </ul>
  </li>
  <li>Deuxième étape</li>
</ol>`}
        preview={{
          html: `<ol>
  <li>Première étape
    <ul>
      <li>Sous-élément A</li>
      <li>Sous-élément B</li>
    </ul>
  </li>
  <li>Deuxième étape</li>
</ol>`,
        }}
        language="html"
        fontSize={12}
        notes="Un <ul> ou <ol> peut contenir un <li> qui contient une autre liste."
      />

      {/* --- Liens --- */}
      <CodeAndPreviewSlide
        heading="Liens &lt;a&gt;"
        code={`<a href="https://exemple.com">Cliquez ici</a>`}
        preview={{
          html: `<a href="https://exemple.com" style="color:#00a3a3;text-decoration:underline;">Cliquez ici</a>`,
        }}
        language="html"
        notes="Attribut href = destination."
      />

      {/* --- Images --- */}
      <CodeAndPreviewSlide
        heading="Images &lt;img&gt;"
        code={`<img src="image.jpg" alt="Description de l'image">`}
        preview={{
          html: `<img src="https://picsum.photos/200" alt="Photo aléatoire">`,
        }}
        language="html"
        notes="alt est OBLIGATOIRE pour accessibilité et SEO."
      />

      {/* --- Images alt fallback --- */}
      <CodeAndPreviewSlide
        heading="Images : si l'image manque"
        code={`<img src="notfound.jpg" alt="Description affichée">`}
        preview={`<img src="notfound.jpg" alt="Description affichée">`}
        notes="Le navigateur affiche le texte alt quand l'image ne charge pas."
      />

      {/* --- Formulaire --- */}
      <CodeAndPreviewSlide
        heading="Formulaire : Structure &lt;form&gt;"
        code={`<form action="/traitement.php" method="POST">
  <label for="nom">Nom :</label>
  <input type="text" id="nom" name="nom" required>

  <label for="email">Email :</label>
  <input type="email" id="email" name="email" required>

  <label for="message">Message :</label>
  <textarea id="message" name="message"></textarea>

  <button type="submit">Envoyer</button>
</form>`}
        preview={{
          html: `<form>
  <label for="nom">Nom :</label>
  <input type="text" id="nom" name="nom" placeholder="Votre nom" required>
  <br><br>
  <label for="email">Email :</label>
  <input type="email" id="email" name="email" placeholder="vous@exemple.com" required>
  <br><br>
  <label for="message">Message :</label>
  <textarea id="message" name="message" placeholder="Votre message" rows="3" style="width:100%;"></textarea>
  <br><br>
  <button type="submit">Envoyer</button>
</form>`,
          css: `form { max-width: 300px; }
input, textarea { width: 100%; padding: 8px; margin: 4px 0; box-sizing: border-box; }
button { background: #00a3a3; color: white; padding: 8px 16px; border: none; cursor: pointer; }`,
        }}
        language="html"
        fontSize={11}
        notes="action = où envoyer, method = GET ou POST. id pour label, name pour serveur."
      />

      {/* ========== TRANSITION CSS ========== */}
      <MiraContentSlide heading="CSS = Cascading Style Sheets">
        <Text fontSize="1.2rem" marginBottom={16}>
          <strong>CSS met en forme le HTML.</strong>
        </Text>
        <UnorderedList fontSize="1.1rem">
          <ListItem>Couleurs</ListItem>
          <ListItem>Tailles</ListItem>
          <ListItem>Positionnement</ListItem>
        </UnorderedList>
        <Text fontSize="1rem" marginTop={24} color="#4a5568">
          Feuilles de style en cascade — toute la présentation visuelle de ton site.
        </Text>
        <Notes>Transition naturelle : on a vu la structure (HTML), maintenant le design (CSS).</Notes>
      </MiraContentSlide>

      {/* --- Syntaxe CSS --- */}
      <CodeSlide
        heading="Syntaxe CSS"
        code={`sélecteur {
  propriété: valeur;
}

h1 {
  color: blue;
  font-size: 32px;
}`}
        language="css"
        notes="Toujours un point-virgule après chaque propriété."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/default.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : CSS
            </a>
          </Text>
        </Box>
      </CodeSlide>

      {/* --- 3 façons d'écrire du CSS --- */}
      <CodeSlide
        heading="3 façons d'écrire du CSS"
        code={`/* 1. Inline (à éviter) */
<h1 style="color: blue;">Titre</h1>

/* 2. Interne (pour tester) */
<style>h1 { color: blue; }</style>

/* 3. Externe (recommandé ✅) */
<link rel="stylesheet" href="style.css">`}
        language="html"
        fontSize={12}
        notes="Fichier externe = séparation structure/présentation. LA bonne pratique."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css_howto.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : How to add CSS
            </a>
          </Text>
        </Box>
      </CodeSlide>

      {/* --- Lier CSS et HTML --- */}
      <CodeAndPreviewSlide
        heading="Lier CSS et HTML"
        code={`<!-- Dans le HTML <head> : -->
<link rel="stylesheet" href="style.css">

/* Dans style.css : */
h1 {
  color: #3498db;
}`}
        preview={{
          html: `<h1 style="color:#3498db;">Titre stylé</h1>`,
        }}
        language="html"
        fontSize={13}
        notes="Même dossier : style.css. Recharge la page pour voir les changements."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css_howto.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : How to add CSS
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- Sélecteurs --- */}
      <CodeAndPreviewSlide
        heading="Sélecteurs : élément, classe, ID"
        code={`<!-- HTML -->
<p>Paragraphe normal</p>
<p class="texte-rouge">Texte rouge (classe)</p>
<h1 id="titre">Titre (ID unique)</h1>

/* CSS (style.css) */
p { color: black; }           /* → tous les <p> */
.texte-rouge { color: red; }  /* → éléments avec class="texte-rouge" */
#titre { font-size: 40px; }   /* → l'élément avec id="titre" */`}
        preview={{
          html: `<p>Paragraphe normal</p>
<p class="texte-rouge">Texte rouge (classe)</p>
<h1 id="titre">Titre (ID unique)</h1>`,
          css: `p { margin: 8px 0; }
.texte-rouge { color: red; }
#titre { font-size: 28px; color: #00a3a3; }`,
        }}
        language="html"
        fontSize={12}
        notes="Privilégie les classes ! ID = unique."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css_selectors.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : CSS Selectors
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- Règle d'or classes --- */}
      <MiraContentSlide heading="Règle d'or : Utilise les classes !">
        <UnorderedList fontSize="1.1rem">
          <ListItem>Privilégie les classes (réutilisables)</ListItem>
          <ListItem>Évite les ID en CSS (sauf cas particulier)</ListItem>
        </UnorderedList>
        <Text fontSize="0.95rem" marginTop={16} color="#4a5568">
          Si tu as 3 boutons rouges → une classe <code>.btn-rouge</code> plutôt que 3 ID.
        </Text>
        <Box width="100%" marginTop={12} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css_selectors.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : CSS Selectors
            </a>
          </Text>
        </Box>
        <Notes>Plus flexible.</Notes>
      </MiraContentSlide>

      {/* --- Box Model --- */}
      <CodeAndPreviewSlide
        heading="Box Model : Vue globale"
        code={`<!-- Chaque élément HTML est une boîte -->
<div class="ma-boite">Contenu</div>

+---------------------------+
|        margin             |  (extérieur)
|  +---------------------+  |
|  |     border          |  |  (bordure)
|  |  +---------------+  |  |
|  |  |   padding     |  |  |  (intérieur)
|  |  |  +---------+  |  |  |
|  |  |  | Content |  |  |  |
|  |  |  +---------+  |  |  |
|  |  +---------------+  |  |
|  +---------------------+  |
+---------------------------+`}
        language="text"
        fontSize={10}
        preview={{
          html: `<div style="background:#e2e8f0;padding:24px;min-height:100px;display:flex;align-items:center;justify-content:center;">
  <div style="margin:20px;border:3px solid #00a3a3;padding:16px;background:#fff;">
    <span style="background:#edf2f7;padding:4px 8px;">Content</span>
  </div>
</div>`,
          title: 'Box Model',
        }}
        notes="Chaque élément est une boîte. DevTools > Elements > Box Model."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css_boxmodel.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : CSS Box Model
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- Box Model CSS --- */}
      <CodeAndPreviewSlide
        heading="Box Model : propriétés CSS"
        code={`<!-- HTML -->
<div class="ma-boite">Contenu</div>

/* CSS */
.ma-boite {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}
/* Content → Padding → Border → Margin */`}
        language="html"
        notes="Content = contenu, Padding = coussin intérieur, Border = cadre, Margin = espace extérieur."
        preview={{
          html: `<div style="background:#e2e8f0;padding:16px;">
  <div class="ma-boite">Contenu</div>
</div>`,
          css: `.ma-boite {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
  background: #fff;
}`,
          title: 'Box Model',
        }}
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css_boxmodel.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : CSS Box Model
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- Couleurs --- */}
      <CodeAndPreviewSlide
        heading="Couleurs"
        code={`<!-- HTML -->
<p class="nom">Par nom</p>
<p class="hexa">Hexadécimal</p>
<p class="rgb">RGB</p>
<p class="rgba">RGBA (transparence)</p>

/* CSS */
.nom { color: red; }
.hexa { color: #FF5733; }
.rgb { color: rgb(255, 87, 51); }
.rgba { color: rgba(255, 87, 51, 0.8); }`}
        language="html"
        fontSize={12}
        preview={{
          html: `<p class="nom">Par nom</p>
<p class="hexa">Hexadécimal</p>
<p class="rgb">RGB</p>
<p class="rgba">RGBA (transparence)</p>`,
          css: `.nom { color: red; margin: 4px 0; }
.hexa { color: #FF5733; margin: 4px 0; }
.rgb { color: rgb(255, 87, 51); margin: 4px 0; }
.rgba { color: rgba(255, 87, 51, 0.8); margin: 4px 0; }`,
        }}
        notes="Hexa = courant. Coolors.co pour les palettes."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css_colors.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : CSS Colors
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- Typographie --- */}
      <CodeAndPreviewSlide
        heading="Typographie"
        code={`<!-- HTML -->
<p class="texte-style">Texte stylé</p>

/* CSS */
.texte-style {
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
}`}
        language="html"
        preview={{
          html: `<p class="texte-style">Texte stylé</p>`,
          css: `.texte-style {
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
}`,
        }}
        notes="Line-height 1.5 ou 1.6 = bonne lisibilité. Google Fonts."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css_font.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : CSS Fonts
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- Display --- */}
      <CodeAndPreviewSlide
        heading="Display : block vs inline"
        code={`<!-- HTML : block (div, p, h1) vs inline (span, a) -->
<div class="bloc">Bloc 1</div>
<div class="bloc">Bloc 2</div>

<span class="inline">Inline 1</span>
<span class="inline">Inline 2</span>

<span class="inline-block">Inline-block</span>

/* CSS */
.bloc { display: block; background: #e2e8f0; margin: 4px 0; padding: 8px; }
.inline { display: inline; background: #cbd5e0; padding: 4px 8px; }
.inline-block { display: inline-block; background: #00a3a3; color: white; padding: 8px; }`}
        language="html"
        fontSize={12}
        preview={{
          html: `<div class="bloc">Bloc 1</div>
<div class="bloc">Bloc 2</div>
<span class="inline">Inline 1</span>
<span class="inline">Inline 2</span>
<span class="inline-block">Inline-block</span>`,
          css: `.bloc { display: block; background: #e2e8f0; margin: 4px 0; padding: 8px; }
.inline { display: inline; background: #cbd5e0; padding: 4px 8px; }
.inline-block { display: inline-block; background: #00a3a3; color: white; padding: 8px; }`,
        }}
        notes="Block = div, p, h1. Inline = span, a, strong."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css_display_visibility.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : CSS Display
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- Position --- */}
      <CodeAndPreviewSlide
        heading="Position"
        code={`<!-- HTML -->
<div class="parent">
  <div class="relatif">relative</div>
  <div class="absolu">absolute</div>
</div>

/* CSS */
.parent { position: relative; height: 120px; background: #e2e8f0; }
.relatif { position: relative; top: 10px; left: 20px; background: #cbd5e0; padding: 8px; }
.absolu { position: absolute; bottom: 10px; right: 20px; background: #00a3a3; color: white; padding: 8px; }`}
        language="html"
        fontSize={12}
        preview={{
          html: `<div class="parent">
  <div class="relatif">relative</div>
  <div class="absolu">absolute</div>
</div>`,
          css: `.parent { position: relative; height: 120px; background: #e2e8f0; padding: 16px; }
.relatif { position: relative; top: 10px; left: 20px; background: #cbd5e0; padding: 8px; width: fit-content; }
.absolu { position: absolute; bottom: 10px; right: 20px; background: #00a3a3; color: white; padding: 8px; }`,
        }}
        notes="Fixed = menus collés en haut."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css_positioning.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : CSS Position
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- Flexbox --- */}
      <CodeAndPreviewSlide
        heading="Flexbox : Introduction"
        code={`/* CSS - conteneur flex (parent) */
.conteneur {
  display: flex;
}

/* HTML - la classe .conteneur sur le parent */
<div class="conteneur">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`}
        language="html"
        preview={{
          html: `<div style="display:flex; padding:12px; gap:8px; border:2px dashed #64748b; background:#f8fafc; min-height:80px;">
  <div style="background:#dbeafe; border:2px solid #3b82f6; padding:12px; font-size:12px;">Item 1</div>
  <div style="background:#dcfce7; border:2px solid #22c55e; padding:12px; font-size:12px;">Item 2</div>
  <div style="background:#fef3c7; border:2px solid #f59e0b; padding:12px; font-size:12px;">Item 3</div>
</div>`,
        }}
        notes="La classe .conteneur sur le parent → ses enfants deviennent des flex items."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css3_flexbox.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : Flexbox
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- Flexbox direction et axes --- */}
      <CodeAndPreviewSlide
        heading="Flexbox : flex-direction &amp; axes"
        code={`/* CSS */
.ligne { display: flex; flex-direction: row; }
.colonne { display: flex; flex-direction: column; }

/* HTML - row sur le parent */
<div class="ligne">
  <div>1</div><div>2</div><div>3</div>
</div>

/* HTML - column sur le parent */
<div class="colonne">
  <div>1</div><div>2</div><div>3</div>
</div>`}
        language="html"
        preview={{
          html: `<div style="display:flex; flex-direction:column; gap:8px;">
  <div style="display:flex; padding:8px; gap:6px; border:2px dashed #64748b; background:#f8fafc;">
    <span style="font-size:10px; color:#64748b;">row</span>
    <div style="background:#dbeafe; border:2px solid #3b82f6; padding:8px; font-size:11px;">1</div>
    <div style="background:#dcfce7; border:2px solid #22c55e; padding:8px; font-size:11px;">2</div>
    <div style="background:#fef3c7; border:2px solid #f59e0b; padding:8px; font-size:11px;">3</div>
  </div>
  <div style="display:flex; flex-direction:column; padding:8px; gap:6px; border:2px dashed #64748b; background:#f8fafc;">
    <span style="font-size:10px; color:#64748b;">column</span>
    <div style="background:#dbeafe; border:2px solid #3b82f6; padding:8px; font-size:11px;">1</div>
    <div style="background:#dcfce7; border:2px solid #22c55e; padding:8px; font-size:11px;">2</div>
    <div style="background:#fef3c7; border:2px solid #f59e0b; padding:8px; font-size:11px;">3</div>
  </div>
</div>`,
        }}
        notes="Classes .ligne et .colonne sur le parent. justify = axe principal, align = axe secondaire."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css3_flexbox.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : Flexbox
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- Flexbox justify/align : code (CSS + HTML) --- */}
      <CodeSlide
        heading="Flexbox : justify-content &amp; align-items (code)"
        code={`/* CSS - appliqué sur le parent */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* HTML - class="nav" sur <nav> */
<nav class="nav">
  <a href="#">Accueil</a>
  <a href="#">Articles</a>
  <a href="#">Contact</a>
</nav>

/* Valeurs justify: flex-start, center, flex-end,
   space-between, space-around, space-evenly */
/* Valeurs align: flex-start, center, flex-end, stretch */`}
        language="html"
        notes="La classe .nav sur <nav> applique flex, justify-content et align-items."
      />

      {/* --- Flexbox justify/align : aperçu plein écran --- */}
      <PreviewSlide
        heading="Flexbox : justify-content &amp; align-items (aperçu)"
        html={`<div style="display:flex; flex-direction:column; gap:16px; max-width:100%;">
  <div>
    <div style="font-size:11px; color:#64748b; margin-bottom:4px;">justify-content: space-between</div>
    <div style="display:flex; justify-content:space-between; padding:10px; border:2px dashed #64748b; background:#f8fafc;">
      <div style="background:#dbeafe; border:2px solid #3b82f6; padding:8px 12px; font-size:12px;">A</div>
      <div style="background:#dcfce7; border:2px solid #22c55e; padding:8px 12px; font-size:12px;">B</div>
      <div style="background:#fef3c7; border:2px solid #f59e0b; padding:8px 12px; font-size:12px;">C</div>
    </div>
  </div>
  <div>
    <div style="font-size:11px; color:#64748b; margin-bottom:4px;">justify-content: center</div>
    <div style="display:flex; justify-content:center; gap:12px; padding:10px; border:2px dashed #64748b; background:#f8fafc;">
      <div style="background:#dbeafe; border:2px solid #3b82f6; padding:8px 12px; font-size:12px;">A</div>
      <div style="background:#dcfce7; border:2px solid #22c55e; padding:8px 12px; font-size:12px;">B</div>
      <div style="background:#fef3c7; border:2px solid #f59e0b; padding:8px 12px; font-size:12px;">C</div>
    </div>
  </div>
  <div>
    <div style="font-size:11px; color:#64748b; margin-bottom:4px;">justify-content: flex-end</div>
    <div style="display:flex; justify-content:flex-end; gap:12px; padding:10px; border:2px dashed #64748b; background:#f8fafc;">
      <div style="background:#dbeafe; border:2px solid #3b82f6; padding:8px 12px; font-size:12px;">A</div>
      <div style="background:#dcfce7; border:2px solid #22c55e; padding:8px 12px; font-size:12px;">B</div>
      <div style="background:#fef3c7; border:2px solid #f59e0b; padding:8px 12px; font-size:12px;">C</div>
    </div>
  </div>
  <div>
    <div style="font-size:11px; color:#64748b; margin-bottom:4px;">align-items: center (conteneur plus haut)</div>
    <div style="display:flex; align-items:center; height:70px; padding:10px; border:2px dashed #64748b; background:#f8fafc;">
      <div style="background:#dbeafe; border:2px solid #3b82f6; padding:8px; font-size:12px;">A</div>
      <div style="background:#dcfce7; border:2px solid #22c55e; padding:16px; font-size:12px;">B plus grand</div>
      <div style="background:#fef3c7; border:2px solid #f59e0b; padding:8px; font-size:12px;">C</div>
    </div>
  </div>
</div>`}
        notes="Plusieurs exemples : space-between, center, flex-end, align-items center."
      />

      {/* --- Flexbox wrap, gap, flex --- */}
      <CodeAndPreviewSlide
        heading="Flexbox : flex-wrap, gap &amp; propriétés des items"
        code={`/* CSS - conteneur */
.layout { display: flex; gap: 16px; }
.wrap { display: flex; flex-wrap: wrap; gap: 8px; }

/* CSS - enfants */
.sidebar { flex: 0 0 250px; }  /* taille fixe */
.contenu { flex: 1; }          /* prend l'espace restant */

/* HTML */
<div class="layout">
  <aside class="sidebar">fixe</aside>
  <main class="contenu">flex:1</main>
</div>`}
        language="html"
        preview={{
          html: `<div style="display:flex; gap:12px; padding:12px; border:2px dashed #64748b; background:#f8fafc;">
  <div style="flex:0 0 80px; background:#e0e7ff; border:2px solid #6366f1; padding:8px; font-size:11px;">fixe</div>
  <div style="flex:1; background:#dbeafe; border:2px solid #3b82f6; padding:8px; font-size:11px;">flex:1</div>
</div>
<div style="display:flex; flex-wrap:wrap; gap:8px; padding:12px; border:2px dashed #64748b; background:#f8fafc; margin-top:12px;">
  <div style="background:#dcfce7; border:2px solid #22c55e; padding:8px; font-size:11px;">A</div>
  <div style="background:#fef3c7; border:2px solid #f59e0b; padding:8px; font-size:11px;">B</div>
  <div style="background:#fce7f3; border:2px solid #ec4899; padding:8px; font-size:11px;">C</div>
</div>`,
        }}
        notes="Classe .layout sur le parent, .sidebar et .contenu sur les enfants. gap et wrap sur le conteneur."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css3_flexbox.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : Flexbox
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- CSS Grid --- */}
      <CodeAndPreviewSlide
        heading="CSS Grid : Introduction"
        code={`/* CSS - appliqué sur le conteneur */
.grille {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

/* HTML - class="grille" sur le parent */
<div class="grille">
  <div>1</div><div>2</div><div>3</div>
  <div>4</div><div>5</div><div>6</div>
</div>

/* 1fr = fraction, repeat(3,1fr), minmax(200px,1fr) */`}
        language="html"
        preview={{
          html: `<div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:12px; padding:12px; border:2px dashed #64748b; background:#f8fafc;">
  <div style="background:#dbeafe; border:2px solid #3b82f6; padding:12px; font-size:12px;">1</div>
  <div style="background:#dcfce7; border:2px solid #22c55e; padding:12px; font-size:12px;">2</div>
  <div style="background:#fef3c7; border:2px solid #f59e0b; padding:12px; font-size:12px;">3</div>
  <div style="background:#fce7f3; border:2px solid #ec4899; padding:12px; font-size:12px;">4</div>
  <div style="background:#e0e7ff; border:2px solid #6366f1; padding:12px; font-size:12px;">5</div>
  <div style="background:#f3e8ff; border:2px solid #a855f7; padding:12px; font-size:12px;">6</div>
</div>`,
        }}
        notes="La classe .grille sur le parent crée une grille 3 colonnes."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css_grid.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : CSS Grid
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- CSS Grid exemple --- */}
      <CodeAndPreviewSlide
        heading="CSS Grid : Grille de cartes responsive"
        code={`/* CSS - class .cartes sur le conteneur */
.cartes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

/* HTML */
<div class="cartes">
  <article class="carte">Carte 1</article>
  <article class="carte">Carte 2</article>
  <article class="carte">Carte 3</article>
  <article class="carte">Carte 4</article>
</div>`}
        language="html"
        preview={{
          html: `<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap:12px; padding:12px; border:2px dashed #64748b; background:#f8fafc;">
  <div style="background:#dbeafe; border:2px solid #3b82f6; padding:12px; border-radius:8px; font-size:12px;">Carte 1</div>
  <div style="background:#dcfce7; border:2px solid #22c55e; padding:12px; border-radius:8px; font-size:12px;">Carte 2</div>
  <div style="background:#fef3c7; border:2px solid #f59e0b; padding:12px; border-radius:8px; font-size:12px;">Carte 3</div>
  <div style="background:#fce7f3; border:2px solid #ec4899; padding:12px; border-radius:8px; font-size:12px;">Carte 4</div>
</div>`,
        }}
        notes="Classe .cartes sur le parent. auto-fill + minmax = responsive sans media queries."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css_grid.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : CSS Grid
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- Flexbox vs Grid --- */}
      <MiraContentSlide heading="Flexbox vs Grid : quand utiliser quoi ?">
        <UnorderedList fontSize="0.95rem">
          <ListItem><strong>Flexbox</strong> : navbar, centrage, layout 1 col (sidebar + contenu)</ListItem>
          <ListItem><strong>Grid</strong> : grille de cartes, dashboard, layout 2D complexe</ListItem>
          <ListItem>Les deux sont complémentaires, on les combine souvent !</ListItem>
        </UnorderedList>
        <Text fontSize="0.9rem" marginTop={16} color="#4a5568">
          <a href="https://flexboxfroggy.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>flexboxfroggy.com</a>
          {' · '}
          <a href="https://cssgridgarden.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>cssgridgarden.com</a>
        </Text>
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/css3_flexbox.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>W3Schools : Flexbox</a>
            {' · '}
            <a href="https://www.w3schools.com/css/css_grid.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>W3Schools : Grid</a>
          </Text>
        </Box>
        <Notes>Pas de guerre : Flexbox pour aligner, Grid pour des grilles. Choisis selon le problème.</Notes>
      </MiraContentSlide>

      {/* --- CSS classique vs Tailwind --- */}
      <CodeAndPreviewSlide
        heading="CSS classique vs TailwindCSS"
        code={`/* CSS classique */
.btn-bleu {
  background-color: #3490dc;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

/* Tailwind : classes utilitaires */
<button class="bg-blue-500 text-white px-4 py-2 rounded">
  Cliquer
</button>`}
        preview={{
          html: `<button style="background:#3490dc;color:white;padding:8px 16px;border-radius:4px;">
  Cliquer
</button>`,
        }}
        language="css"
        fontSize={12}
        notes="Tailwind = rapide, cohérent. HTML plus chargé."
      >
        <Box width="100%" marginTop={8} textAlign="center">
          <Text fontSize="0.85rem" as="span">
            <a href="https://www.w3schools.com/css/default.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              📖 W3Schools : CSS
            </a>
            {' · '}
            <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>
              Tailwind docs
            </a>
          </Text>
        </Box>
      </CodeAndPreviewSlide>

      {/* --- W3C --- */}
      <MiraContentSlide heading="W3C : Qu'est-ce que c'est ?">
        <Text fontSize="1.2rem" marginBottom={16}>
          <strong>World Wide Web Consortium</strong>
        </Text>
        <Text fontSize="1rem" marginBottom={16}>
          Mission : définir les standards du web (HTML, CSS, accessibilité…)
        </Text>
        <Notes>Le &quot;gouvernement&quot; du web. Chrome, Firefox, Safari suivent leurs règles.</Notes>
      </MiraContentSlide>

      {/* --- Pourquoi valider --- */}
      <MiraContentSlide heading="Pourquoi valider son code ?">
        <UnorderedList fontSize="1.1rem">
          <ListItem>
            <strong>Compatibilité</strong> : ton site marche sur tous les navigateurs
          </ListItem>
          <ListItem>
            <strong>Accessibilité</strong> : accessible aux personnes handicapées
          </ListItem>
          <ListItem>
            <strong>Pérennité</strong> : ton code reste valide dans le temps
          </ListItem>
        </UnorderedList>
        <Text marginTop={16} fontSize="0.95rem">
          Outils : <a href="https://validator.w3.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>validator.w3.org</a> (HTML) • <a href="https://jigsaw.w3.org/css-validator/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>jigsaw.w3.org</a> (CSS)
        </Text>
        <Notes>Montre rapidement le validateur HTML.</Notes>
      </MiraContentSlide>

      {/* --- Bonnes pratiques --- */}
      <MiraContentSlide heading="Bonnes pratiques">
        <Text fontSize="1rem" marginBottom={8}>
          <strong>HTML :</strong>
        </Text>
        <UnorderedList fontSize="0.95rem">
          <ListItem>Balises sémantiques</ListItem>
          <ListItem><code>alt</code> sur les images</ListItem>
          <ListItem>Indentation</ListItem>
          <ListItem>Pas de styles inline</ListItem>
        </UnorderedList>
        <Text fontSize="1rem" marginTop={16} marginBottom={8}>
          <strong>CSS :</strong>
        </Text>
        <UnorderedList fontSize="0.95rem">
          <ListItem>Fichier externe</ListItem>
          <ListItem>Noms de classes clairs</ListItem>
          <ListItem>Commentaires</ListItem>
          <ListItem>Pas de <code>!important</code></ListItem>
        </UnorderedList>
        <Notes>Code propre = important pour la collaboration.</Notes>
      </MiraContentSlide>

      {/* --- Récap HTML --- */}
      <MiraContentSlide heading="Récap HTML">
        <UnorderedList fontSize="1rem">
          <ListItem>Rôle du front-end</ListItem>
          <ListItem>Balises sémantiques (header, nav, main, article, footer…)</ListItem>
          <ListItem>Structure d'une page</ListItem>
          <ListItem>Balises de contenu (h1, p, ul, ol, dl, a, img)</ListItem>
          <ListItem>Formulaires de base</ListItem>
        </UnorderedList>
        <Notes>Récap rapide. La pratique va clarifier.</Notes>
      </MiraContentSlide>

      {/* --- Récap CSS --- */}
      <MiraContentSlide heading="Récap CSS">
        <UnorderedList fontSize="0.95rem">
          <ListItem>Syntaxe CSS</ListItem>
          <ListItem>Sélecteurs (élément, classe, ID)</ListItem>
          <ListItem>Box Model (margin, border, padding, content)</ListItem>
          <ListItem>Couleurs et typographie</ListItem>
          <ListItem>Display et positionnement</ListItem>
          <ListItem>Flexbox (axes, justify/align, wrap, gap, flex)</ListItem>
          <ListItem>CSS Grid (template-columns, gap, responsive)</ListItem>
          <ListItem>TailwindCSS</ListItem>
          <ListItem>Normes W3C</ListItem>
        </UnorderedList>
        <Notes>Pareil : récap. Rassure-les.</Notes>
      </MiraContentSlide>

      {/* --- Prochaine fois --- */}
      <MiraContentSlide heading="Prochaine fois : TP !">
        <Text fontSize="1.2rem" marginBottom={16}>
          Séance 2 (10 mars) : TP HTML &amp; CSS
        </Text>
        <Text fontSize="1rem" marginBottom={8}>
          Tu devras avoir :
        </Text>
        <UnorderedList fontSize="1rem">
          <ListItem>Visual Studio Code installé</ListItem>
          <ListItem>Extension Live Server installée</ListItem>
          <ListItem>Un navigateur moderne</ListItem>
        </UnorderedList>
        <Text fontSize="0.95rem" marginTop={16} color="#4a5568">
          Prépare-toi : relis ce cours, teste des balises, essaie des styles CSS simples.
        </Text>
        <Notes>Termine sur une note positive. Au prochain cours, vous mettez les mains dans le code !</Notes>
      </MiraContentSlide>

      {/* --- Documentation et ressources --- */}
      <MiraContentSlide heading="Documentation et ressources">
        <Text fontSize="0.9rem" marginBottom={12} fontWeight="bold" color="#00a3a3">
          Documentation générale
        </Text>
        <UnorderedList fontSize="0.9rem" marginBottom={16}>
          <ListItem>
            <a href="https://developer.mozilla.org/fr/docs/Learn" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>MDN Learn</a> — tout apprendre sur le web
          </ListItem>
          <ListItem>
            <a href="https://developer.mozilla.org/fr/docs/Learn/Getting_started_with_the_web" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>MDN : Démarrer avec le web</a>
          </ListItem>
          <ListItem>
            <a href="https://www.w3schools.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>W3Schools</a> — tutoriels HTML, CSS, JS avec exemples interactifs
          </ListItem>
          <ListItem>
            <a href="https://htmlreference.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>htmlreference.io</a> — référence des balises HTML
          </ListItem>
        </UnorderedList>
        <Text fontSize="0.9rem" marginBottom={12} fontWeight="bold" color="#00a3a3">
          HTML
        </Text>
        <UnorderedList fontSize="0.9rem" marginBottom={16}>
          <ListItem>
            <a href="https://developer.mozilla.org/fr/docs/Web/HTML" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>MDN : HTML</a>
          </ListItem>
          <ListItem>
            <a href="https://developer.mozilla.org/fr/docs/Glossary/Semantics#s%C3%A9mantique_en_html" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>MDN : Sémantique HTML</a>
          </ListItem>
          <ListItem>
            <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/img" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>MDN : &lt;img&gt;</a>
          </ListItem>
          <ListItem>
            <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/form" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>MDN : &lt;form&gt;</a>
          </ListItem>
        </UnorderedList>
        <Text fontSize="0.9rem" marginBottom={12} fontWeight="bold" color="#00a3a3">
          CSS
        </Text>
        <UnorderedList fontSize="0.9rem" marginBottom={16}>
          <ListItem>
            <a href="https://developer.mozilla.org/fr/docs/Web/CSS" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>MDN : CSS</a>
          </ListItem>
          <ListItem>
            <a href="https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Selectors" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>MDN : Sélecteurs CSS</a>
          </ListItem>
          <ListItem>
            <a href="https://developer.mozilla.org/fr/docs/Learn/CSS/Building_blocks/The_box_model" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>MDN : Box Model</a>
          </ListItem>
          <ListItem>
            <a href="https://css-tricks.com/almanac/properties/p/position/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>CSS-Tricks : position</a>
          </ListItem>
          <ListItem>
            <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>CSS-Tricks : Guide Flexbox</a>
          </ListItem>
          <ListItem>
            <a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>CSS-Tricks : Guide CSS Grid</a>
          </ListItem>
        </UnorderedList>
        <Text fontSize="0.9rem" marginBottom={12} fontWeight="bold" color="#00a3a3">
          Apprendre en s&apos;amusant &amp; outils
        </Text>
        <UnorderedList fontSize="0.9rem" marginBottom={16}>
          <ListItem>
            <a href="https://flexboxfroggy.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>Flexbox Froggy</a> — jeu pour apprendre Flexbox
          </ListItem>
          <ListItem>
            <a href="https://cssgridgarden.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>CSS Grid Garden</a> — jeu pour apprendre Grid
          </ListItem>
          <ListItem>
            <a href="https://validator.w3.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>Validateur HTML (W3C)</a>
          </ListItem>
          <ListItem>
            <a href="https://jigsaw.w3.org/css-validator/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>Validateur CSS (W3C)</a>
          </ListItem>
          <ListItem>
            <a href="https://coolors.co/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>Coolors</a> — palettes de couleurs
          </ListItem>
          <ListItem>
            <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>Google Fonts</a>
          </ListItem>
          <ListItem>
            <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" style={{ color: '#00a3a3' }}>Tailwind CSS — docs</a>
          </ListItem>
        </UnorderedList>
        <Notes>Donne ces liens aux étudiants pour qu&apos;ils puissent approfondir et tester en autonomie.</Notes>
      </MiraContentSlide>
    </Deck>
  );
}

export default CoursHtmlCss;
