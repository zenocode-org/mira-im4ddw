import React from "react";
import {
  Deck,
  Text,
  Box,
  ListItem,
  UnorderedList,
  OrderedList,
  Notes,
} from "spectacle";
import {
  MiraTitleSlide,
  MiraContentSlide,
  CodeSlide,
  TwinCodeSlide,
} from "../components";
import { MiraDeckTemplate } from "../components/MiraDeckTemplate";
import { miraTheme } from "../components/theme";
import { defaultTheme } from "spectacle";

const theme = {
  ...defaultTheme,
  colors: { ...defaultTheme.colors, ...miraTheme.colors },
  fonts: miraTheme.fonts,
  fontSizes: miraTheme.fontSizes,
};

const noTransition = {
  from: { opacity: 1, transform: "translateX(0)" },
  enter: { opacity: 1, transform: "translateX(0)" },
  leave: { opacity: 1, transform: "translateX(0)" },
};

// --- Schémas Mermaid (iframes Mermaid Live : client/serveur + Docker ; le cycle PHP est en texte sur diapo) ---
const mermaidClientServeurLiveUrl =
  "https://mermaid.live/view#pako:eNptUE1zgjAQ_SuZPaMVCAgcemkPHtqOY2WcKfQQZQWmQGhItK3jD2r_hn-sCdWxX6d9b9--t5vsYMUzhAjWFd-uCiYkuZmlDSGdWuaCtQVZVSU2kiR3bFPmTKISj0YnJE5iWVZld-5hk_2wCuyQKZLMDu8GHH2T-XyazPBZHT4kkgui1ZY3HfbCvzkdio3eQZL7L3AMWpw42eLy2JtOpsktNxcZ-D0tJoPBZb_DMFP7xsKwRQ-1wRBdfit_XDFYkIsyg0gKhRbUKGpmKOzMXAqywBpTiDTMmHhKIW322tOy5oHz-mQTXOUFRGtWdZqpNtN_eV0y_erziD4fxRVXjYTItsM-A6IdvGhKx8PAdqhHHcf1XSew4BUilzpD6o-c0PfdUeCFdG_BW790NAzGNAzDwPU9P6BB6O0_Ab0voJE";

const mermaidDockerPortLiveUrl =
  "https://mermaid.live/view#pako:eNpVj89Kw0AQxl9lmKtpySZNGvYg2FTwIFKKIJh42Ga3SWiyGzbZWm37QD6HL-ZuqFTnMn_45vfNHLFQXCDFbaPei4rpAR7XuQTozabUrKugZUVVSwHZs5KgNK8lG4TRb04EsFhnT2xfl-MMGlWwplL9QBM_8UeJkPwfjqtiJzRkyzFfKGmWKjkIeeW-3C-yu85aC1AGZFnLA9zA6mH1F7pYw2Rye-qUvbozm6b-_gJnDHuhe1udHMYJbXJKSNHDUtcc6aCN8LAVumWuxaOT5ThUohU5Ultypnc55vJsdzomX5Vqf9e0MmWFdMua3nam4_b7Zc3sg1eJPVHoVBk5II1GAtIjHpASn0wTEsyiWRCEcRgkxMMPpCGZT2exH8QxIW4YRGcPP0dTf5rMI99GmMRBFJJwfv4BFO2JxQ";

// --- Extraits PHP (affichage CodePane uniquement, pas de preview) ---
const phpHello = `<?php
// Fichier : public/index.php
echo '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">';
echo '<title>Test</title></head><body>';
echo '<h1>Bonjour depuis PHP</h1>';
echo '</body></html>';`;

const phpHelloHtmlMixed = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Premier mélange HTML / PHP</title>
</head>
<body>
<?php
echo '<h1>Bonjour depuis PHP</h1>';
?>
</body>
</html>`;

const phpVariables = `<?php
$prenom = 'Alice';
$age = 20;
$pi = 3.14;
$actif = true;

echo $prenom;
echo '<br>Nombre : ' . (2 + 3);`;

const phpCommentaires = `<?php
// Ligne unique

# Autre style de commentaire ligne

/*
  Bloc
  sur plusieurs lignes
*/`;

const phpTableauxIndexes = `<?php
$fruits = ['Pomme', 'Banane', 'Orange'];

echo $fruits[0];  // Pomme
echo count($fruits);  // 3`;

const phpTableauxAssoc = `<?php
$user = [
    'nom' => 'Dupont',
    'email' => 'alice@exemple.com',
    'age' => 25,
];

echo $user['email'];
$cle = 'nom';
echo $user[$cle];`;

const phpForeach = `<?php
$notes = [12, 15, 9];

foreach ($notes as $n) {
    echo $n . '<br>';
}

$user = ['prenom' => 'Bob', 'ville' => 'Lyon'];
foreach ($user as $cle => $valeur) {
    echo $cle . ' = ' . $valeur . '<br>';
}`;

const phpFonctions = `<?php
function direBonjour(string $nom): string {
    return 'Bonjour ' . $nom;
}

function addition(int $a, int $b): int {
    return $a + $b;
}

echo direBonjour('Alice');
echo addition(2, 3);`;

const phpIf = `<?php
$age = 17;

if ($age >= 18) {
    echo 'Majeur';
} else {
    echo 'Mineur';
}

$methode = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($methode === 'POST') {
    // traiter le formulaire
}`;

const phpGet = `<?php
// URL : /salut.php?prenom=Alice&ville=Paris
// $_GET est un tableau associatif :

echo $_GET['prenom'];   // Alice
echo $_GET['ville'];    // Paris

// Toujours vérifier si la clé existe :
$prenom = $_GET['prenom'] ?? '';`;

const phpPost = `<?php
// Formulaire envoyé en method="post"
// Les champs <input name="email"> deviennent des clés :

$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

// Ne jamais faire confiance aux données reçues !`;

const phpHtmlspecialchars = `<?php
$texte = $_POST['nom'] ?? '';

// Pour réafficher dans du HTML sans injecter de balises :
echo htmlspecialchars($texte, ENT_QUOTES, 'UTF-8');`;

const phpServer = `<?php
// Quelques entrées utiles de $_SERVER :

echo $_SERVER['REQUEST_METHOD'];  // GET, POST, ...
echo $_SERVER['HTTP_HOST'];        // hôte demandé
echo $_SERVER['SCRIPT_NAME'];     // chemin du script courant
echo $_SERVER['REQUEST_URI'];    // URI complète`;

const phpLogs = `<?php
// Logs = côté serveur (pas visible dans le navigateur).
// Pour déboguer : écrire dans les logs plutôt que dans la page.

$email = $_POST['email'] ?? '';

// Log "simple" (dans le log d'erreur PHP / Apache selon la config) :
error_log('[signup] email=' . $email);

// Dans Docker, ces logs sont souvent capturés et visibles via :
// docker compose logs -f web

// Option : log vers un fichier (si tu sais où écrire et avec quels droits) :
// error_log('message', 3, '/var/www/html/logs/app.log');`;

const htmlFormGet = `<form action="traitement.php" method="get">
  <label>Nom : <input type="text" name="nom"></label>
  <button type="submit">Envoyer</button>
</form>`;

const phpTraitementGet = `<?php
// traitement.php
$nom = $_GET['nom'] ?? '';
echo 'Bonjour ' . htmlspecialchars($nom, ENT_QUOTES, 'UTF-8');`;

const htmlFormPost = `<form action="traitement.php" method="post">
  <label>Email : <input type="email" name="email"></label>
  <button type="submit">Envoyer</button>
</form>`;

const phpTraitementPost = `<?php
// traitement.php
$email = $_POST['email'] ?? '';
if ($email === '') {
    echo 'Email manquant';
} else {
    echo 'Reçu : ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
}`;

const dockerComposeSnippet = `services:
  web:
    image: php:8.3-apache
    ports: ["8080:80"]
    volumes: ["./src:/var/www/html"]`;

const phpFichierPurSansFermeture = `<?php
// Fichier qui ne contient que du PHP : la balise ?> en fin de fichier est facultative.
// Bonne pratique : ne pas la mettre (évite les pièges d'espaces en trop).

echo '<!DOCTYPE html><html><body><p>Bonjour</p></body></html>';`;

const phpMelangeAvecFermeture = `<?php
$titre = 'Accueil';
?>
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title><?php echo htmlspecialchars($titre); ?></title></head>
<body>
  <p>HTML « en clair », puis du PHP : <?php echo date('Y'); ?></p>
</body>
</html>`;

function CoursPhpTheorique() {
  return (
    <Deck
      theme={theme}
      template={(props) => <MiraDeckTemplate {...props} />}
      transition={noTransition}
    >
      {/* === Titre === */}
      <MiraTitleSlide
        title="Introduction à PHP"
        subtitle="Cours théorique — Séance 6"
        date="14 avril"
      >
        <Notes>
          PHP côté serveur, Docker en première approche, syntaxe, superglobales
          et formulaires.
        </Notes>
      </MiraTitleSlide>

      {/* === Bloc A — PHP et le Web === */}
      <MiraContentSlide heading="Objectifs du cours">
        <UnorderedList fontSize="2rem">
          <ListItem>
            <strong>Où</strong> s’exécute PHP (serveur) et{" "}
            <strong>ce que</strong> voit le navigateur (HTML, pas le code
            source).
          </ListItem>
          <ListItem>
            <strong>Environnement local</strong> : code sur ta machine,
            exécution dans un conteneur, accès par un <strong>port</strong>.
          </ListItem>
          <ListItem>
            <strong>Syntaxe</strong> : variables, tableaux, fonctions,
            conditions.
          </ListItem>
          <ListItem>
            <strong>HTTP</strong> : <code>$_GET</code>, <code>$_POST</code>,{" "}
            <code>$_SERVER</code>.
          </ListItem>
        </UnorderedList>
        <Notes>
          Annoncer les 4 blocs : Web, Docker, syntaxe, superglobales.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Rappel : JavaScript vs PHP">
        <UnorderedList fontSize="2rem">
          <ListItem>
            <strong>JavaScript (dans le navigateur)</strong> : s’exécute chez le
            client, peut modifier le DOM, pas d’accès direct au système de
            fichiers du serveur.
          </ListItem>
          <ListItem>
            <strong>PHP (côté serveur)</strong> : s’exécute sur la machine du
            serveur <strong>avant</strong> l’envoi de la page ; le navigateur ne
            reçoit que le résultat (HTML, texte, JSON…).
          </ListItem>
        </UnorderedList>
        <Text fontSize="1rem" marginTop={20} color="#4a5568">
          Les deux peuvent coexister : PHP génère la page, le JS enrichit
          l’interactivité une fois la page chargée.
        </Text>
        <Notes>Insister : le client ne voit jamais le code PHP source.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Modèle client / serveur">
        <Text fontSize="2rem" marginBottom={16}>
          Le <strong>navigateur</strong> envoie une{" "}
          <strong>requête HTTP</strong> ; le <strong>serveur</strong> renvoie
          une <strong>réponse</strong> (souvent du HTML, mais aussi du JSON).
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            Client = navigateur (ou autre outil : mobile, API…).
          </ListItem>
          <ListItem>
            Serveur = programme qui écoute sur un port (80, 443, 8080…).
          </ListItem>
        </UnorderedList>
        <Notes>
          Page statique vs dynamique sur la diapo suivante, puis schéma Mermaid.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Page statique vs page générée par PHP">
        <Text fontSize="2rem" marginBottom={16}>
          Un serveur peut <strong>envoyer un fichier tel quel</strong> (HTML,
          CSS, image) : le contenu est identique pour tous.
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            <strong>Page statique</strong> (ex: <code>.html</code>) : le fichier
            est transmis <strong>sans</strong> exécution de code côté serveur.
          </ListItem>
          <ListItem>
            <strong>Page dynamique</strong> (ex: <code>.php</code>) : le serveur{" "}
            <strong>exécute</strong> le script avant d’envoyer la réponse — le
            résultat peut varier (utilisateur, heure, données…).
          </ListItem>
        </UnorderedList>
        <Text fontSize="0.95rem" marginTop={16} color="#64748b">
          Sans exécution côté serveur, tout le monde verrait le même fichier ;
          PHP permet de <strong>calculer</strong> ou d’assembler la page avant
          envoi.
        </Text>
        <Notes>
          Relier au schéma client/serveur puis à la chaîne des étapes.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Schéma Mermaid — client / serveur" fullWidth>
        <Box
          flex={1}
          width="100%"
          style={{
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid #e2e8f0",
          }}
        >
          <iframe
            title="Schéma client / serveur (Mermaid Live)"
            src={mermaidClientServeurLiveUrl}
            style={{
              width: "100%",
              height: "65vh",
              border: "none",
              display: "block",
            }}
            loading="lazy"
          />
        </Box>
        <Notes>Flux : navigateur ↔ HTTP ↔ serveur web ↔ PHP.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Rôle de PHP">
        <UnorderedList fontSize="2rem">
          <ListItem>
            PHP est un langage <strong>interprété</strong> : le moteur PHP lit
            le fichier et exécute les instructions.
          </ListItem>
          <ListItem>
            Le <strong>serveur web</strong> (Apache, nginx, etc.) sait déléguer
            les fichiers <code>.php</code> au moteur PHP.
          </ListItem>
          <ListItem>
            Le navigateur reçoit uniquement ce que PHP <strong>affiche</strong>{" "}
            (<code>echo</code>, HTML généré) — pas les balises{" "}
            <code>&lt;?php … ?&gt;</code>.
          </ListItem>
        </UnorderedList>
        <Notes>
          Insister sur la confidentialité du code source côté serveur. Enchaîner
          sur la diapo « Une requête : la chaîne ».
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Une requête : la chaîne (ordre des étapes)">
        <OrderedList fontSize="2rem">
          <ListItem>
            Le <strong>navigateur</strong> envoie une{" "}
            <strong>requête HTTP</strong> vers une URL.
          </ListItem>
          <ListItem>
            Le <strong>serveur web</strong> (Apache, nginx…) reçoit la requête.
          </ListItem>
          <ListItem>
            Si la ressource est un fichier <code>.php</code>, le serveur délègue
            au <strong>moteur PHP</strong>.
          </ListItem>
          <ListItem>
            PHP exécute le script ; tout ce qui est <code>echo</code> ou HTML
            généré devient le <strong>corps de la réponse</strong>.
          </ListItem>
          <ListItem>
            Le serveur renvoie la <strong>réponse HTTP</strong> au navigateur.
          </ListItem>
          <ListItem>
            Le navigateur <strong>affiche</strong> le HTML (ou traite le JSON,
            etc.).
          </ListItem>
        </OrderedList>
        <Notes>
          Complète le schéma client/serveur : insister sur l’ordre temporel. Pas
          de second iframe Mermaid ici pour ne pas surcharger.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Pourquoi un fichier .php dans l’URL ?">
        <UnorderedList fontSize="2rem">
          <ListItem>
            L’URL pointe vers une <strong>ressource</strong> sur le serveur ;
            souvent un chemin vers un fichier (ex. <code>/contact.php</code>).
          </ListItem>
          <ListItem>
            Le serveur est configuré pour exécuter les fichiers dont l’extension
            est <code>.php</code> avec le moteur PHP.
          </ListItem>
          <ListItem>
            En production on utilise souvent une{" "}
            <strong>réécriture d’URL</strong> ou un seul <code>index.php</code>{" "}
            — le principe reste : une requête déclenche du code PHP.
          </ListItem>
        </UnorderedList>
        <Notes>
          Ne pas détailler mod_rewrite ; juste mentionner que ce n’est pas
          toujours le nom du fichier dans l’URL.
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Premier fichier PHP"
        code={phpHello}
        language="php"
        showLineNumbers
        notes="Montrer que le résultat vu par l’étudiant dans le navigateur est du HTML. Pas de preview intégrée pour PHP dans ce deck."
      />

      <CodeSlide
        heading="HTML et PHP dans le même fichier"
        code={phpHelloHtmlMixed}
        language="php"
        showLineNumbers
        notes="Le serveur envoie tout le fichier à PHP : le HTML statique sort tel quel ; le bloc entre <?php et ?> est exécuté. Le navigateur ne reçoit que du HTML final (pas les balises PHP)."
      />

      {/* === Bloc C — Syntaxe PHP === */}
      <MiraContentSlide heading="Balises et commentaires">
        <UnorderedList fontSize="2rem">
          <ListItem>
            Fichier interprété par PHP : blocs <code>&lt;?php … ?&gt;</code>{" "}
            (souvent tout le fichier est PHP).
          </ListItem>
          <ListItem>
            On peut mélanger HTML et PHP dans un même fichier ; en pratique on
            structure pour rester lisible.
          </ListItem>
        </UnorderedList>
        <Notes>
          La balise de fermeture ?&gt; est détaillée sur les diapos suivantes,
          puis echo et commentaires.
          {"\n"}Doc (mélange HTML/PHP) :
          https://www.php.net/manual/fr/language.basic-syntax.phpmode.php
          {"\n"}Doc (commentaires) :
          https://www.php.net/manual/fr/language.basic-syntax.comments.php
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="La balise de fermeture ?&gt; : obligatoire ?">
        <Text fontSize="2rem" marginBottom={16}>
          <strong>Non</strong>, pas en fin de fichier si tout le fichier est du
          PHP. En revanche, dès que tu écris du{" "}
          <strong>HTML (ou du texte) en dehors</strong> des balises PHP, tu dois{" "}
          <strong>fermer</strong> le bloc avec <code>?&gt;</code> avant ce
          contenu.
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            <strong>Fichier 100 % PHP</strong> : tu peux omettre{" "}
            <code>?&gt;</code> à la fin — c’est même <strong>recommandé</strong>{" "}
            dans la doc PHP.
          </ListItem>
          <ListItem>
            <strong>PHP + HTML mélangés</strong> : tu utilises{" "}
            <code>?&gt;</code> pour « sortir » du mode PHP, puis{" "}
            <code>&lt;?php</code> pour y revenir.
          </ListItem>
        </UnorderedList>
        <Notes>Deux diapos d’exemples + risque des espaces après ?&gt;.</Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Exemple : fichier entièrement PHP (sans ?&gt; en fin)"
        code={phpFichierPurSansFermeture}
        language="php"
        showLineNumbers
        notes="Insister : absence de ?> en fin de fichier est valide et souhaitable pour du pur PHP."
      />

      <MiraContentSlide heading="Pourquoi éviter ?&gt; en fin de fichier PHP pur ?">
        <UnorderedList fontSize="2rem">
          <ListItem>
            Tout ce qui se trouve <strong>après</strong> <code>?&gt;</code> (y
            compris espaces, lignes vides) est envoyé tel quel dans la{" "}
            <strong>sortie</strong> de la page.
          </ListItem>
          <ListItem>
            Un espace ou un saut de ligne oublié peut provoquer l’erreur{" "}
            <strong>« headers already sent »</strong> si tu dois envoyer des
            en-têtes HTTP (<code>header()</code>, cookies, redirections) plus
            tard dans le script.
          </ListItem>
          <ListItem>
            En omettant <code>?&gt;</code> à la fin d’un fichier qui ne contient
            que du PHP, tu supprimes ce risque.
          </ListItem>
        </UnorderedList>
        <Text fontSize="0.95rem" marginTop={16} color="#64748b">
          En pratique : les frameworks et la plupart des projets PHP n’ont pas
          de <code>?&gt;</code> en fin de fichiers purement PHP.
        </Text>
        <Notes>
          Ne pas dramatiser pour un premier echo ; utile quand ils manipuleront
          sessions et redirections.
          {"\n"}Doc (sortie du mode PHP, balises) :
          https://www.php.net/manual/fr/language.basic-syntax.phpmode.php
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Exemple : mélange HTML / PHP (fermeture ?&gt; nécessaire)"
        code={phpMelangeAvecFermeture}
        language="php"
        showLineNumbers
        notes="Montrer le passage ?> puis HTML, puis réouverture <?php pour une expression courte."
      />

      <MiraContentSlide heading="Récap — balises PHP">
        <UnorderedList fontSize="2rem">
          <ListItem>
            <code>&lt;?php</code> ouvre un bloc ; <code>?&gt;</code> le ferme
            quand du contenu non-PHP suit dans le même fichier.
          </ListItem>
          <ListItem>
            Fin de fichier <strong>uniquement PHP</strong> :{" "}
            <strong>pas</strong> de <code>?&gt;</code> obligatoire — souvent{" "}
            <strong>omise</strong> volontairement.
          </ListItem>
          <ListItem>
            Les tutoriels qui montrent <code>?&gt;</code> partout restent
            corrects syntaxiquement ; la nuance est la{" "}
            <strong>bonne pratique</strong> sur les fichiers purs.
          </ListItem>
        </UnorderedList>
        <Notes>Enchaîner sur les commentaires et la syntaxe de base.</Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Commentaires"
        code={phpCommentaires}
        language="php"
        showLineNumbers
        notes={
          "Même logique que dans d'autres langages.\nDoc : https://www.php.net/manual/fr/language.basic-syntax.comments.php"
        }
      />

      <CodeSlide
        heading="Variables et concaténation"
        code={phpVariables}
        language="php"
        showLineNumbers
        notes={
          "Préfixe $ obligatoire. Point . pour concaténer les chaînes.\nDoc (variables) : https://www.php.net/manual/fr/language.variables.php\nDoc (echo) : https://www.php.net/manual/fr/function.echo.php"
        }
      />

      <CodeSlide
        heading="Tableaux indexés"
        code={phpTableauxIndexes}
        language="php"
        showLineNumbers
        notes={
          "Indices à partir de 0. count() pour la taille.\nDoc : https://www.php.net/manual/fr/language.types.array.php"
        }
      />

      <CodeSlide
        heading="Tableaux associatifs"
        code={phpTableauxAssoc}
        language="php"
        showLineNumbers
        notes={
          "Clés string → valeurs ; base des $_GET et $_POST.\nDoc : https://www.php.net/manual/fr/language.types.array.php"
        }
      />

      <CodeSlide
        heading="foreach"
        code={phpForeach}
        language="php"
        showLineNumbers
        notes={
          "Forme cle => valeur indispensable pour parcourir des données de formulaire.\nDoc : https://www.php.net/manual/fr/control-structures.foreach.php"
        }
      />

      <CodeSlide
        heading="Fonctions"
        code={phpFonctions}
        language="php"
        showLineNumbers
        notes={
          "Types sur les paramètres et retour : optionnel mais utile ; peut être simplifié en cours si besoin.\nDoc : https://www.php.net/manual/fr/functions.user-defined.php"
        }
      />

      <CodeSlide
        heading="Conditions côté serveur"
        code={phpIf}
        language="php"
        showLineNumbers
        notes={
          "Même logique que JS ; ici brancher sur la méthode HTTP ou les données reçues.\nDoc : https://www.php.net/manual/fr/control-structures.if.php"
        }
      />

      {/* === Bloc D — Superglobales === */}
      <MiraContentSlide heading="GET et POST : où passent les données ?">
        <UnorderedList fontSize="2rem">
          <ListItem>
            <strong>GET</strong> : les paramètres sont dans{" "}
            <strong>l’URL</strong> (après <code>?</code>) — filtres, liens
            partageables ; visibles dans la barre d’adresse.
          </ListItem>
          <ListItem>
            <strong>POST</strong> : les données sont dans le{" "}
            <strong>corps</strong> de la requête — pas dans l’URL ; adapté aux
            mots de passe ou aux contenus volumineux (sans parler ici de
            chiffrement).
          </ListItem>
        </UnorderedList>
        <Text fontSize="0.95rem" marginTop={16} color="#4a5568">
          Avant la première ligne de ton script, PHP a déjà{" "}
          <strong>rempli</strong> <code>$_GET</code> et <code>$_POST</code> à
          partir de la requête HTTP reçue — ce sont des tableaux « tout prêts »,
          pas des variables que tu déclares.
        </Text>
        <Text fontSize="0.9rem" marginTop={12} color="#64748b">
          En démo : outils développeur → onglet <strong>Réseau</strong> — une
          ligne par requête.
        </Text>
        <Notes>
          Transition vers le vocabulaire $_GET / $_POST sur les diapos
          suivantes.
          {"\n"}Doc (variables prédéfinies / superglobales) :
          https://www.php.net/manual/fr/reserved.variables.php
          {"\n"}Doc ($_GET) :
          https://www.php.net/manual/fr/reserved.variables.get.php
          {"\n"}Doc ($_POST) :
          https://www.php.net/manual/fr/reserved.variables.post.php
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Variables superglobales">
        <Text fontSize="2rem" marginBottom={16}>
          Tableaux <strong>toujours disponibles</strong> dans ton script :{" "}
          <code>$_GET</code>, <code>$_POST</code>, <code>$_SERVER</code>,{" "}
          <code>$_SESSION</code> (plus tard), etc.
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            <code>$_GET</code> : paramètres dans l’URL (méthode GET).
          </ListItem>
          <ListItem>
            <code>$_POST</code> : corps du formulaire (méthode POST).
          </ListItem>
          <ListItem>
            <code>$_SERVER</code> : informations sur la requête et le serveur.
          </ListItem>
        </UnorderedList>
        <Notes>
          Rappeler : ce sont des tableaux associatifs.
          {"\n"}Doc (superglobales) :
          https://www.php.net/manual/fr/reserved.variables.php
          {"\n"}Doc ($_SERVER) :
          https://www.php.net/manual/fr/reserved.variables.server.php
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="$_GET"
        code={phpGet}
        language="php"
        showLineNumbers
        notes={
          "Clés = noms des paramètres d'URL. Toujours tester avec ?? ou isset.\nDoc : https://www.php.net/manual/fr/reserved.variables.get.php"
        }
      />

      <CodeSlide
        heading="$_POST"
        code={phpPost}
        language="php"
        showLineNumbers
        notes={
          "Clés = attributs name des champs du formulaire.\nDoc : https://www.php.net/manual/fr/reserved.variables.post.php"
        }
      />

      <TwinCodeSlide
        heading="Formulaire GET + traitement PHP"
        leftLabel="HTML (form)"
        rightLabel="PHP"
        leftCode={htmlFormGet}
        rightCode={phpTraitementGet}
        leftLanguage="html"
        rightLanguage="php"
        fontSize={14}
        notes="Lier name du champ à la clé $_GET. Pas de preview : montrer le code en salle."
      />

      <TwinCodeSlide
        heading="Formulaire POST + traitement PHP"
        leftLabel="HTML (form)"
        rightLabel="PHP"
        leftCode={htmlFormPost}
        rightCode={phpTraitementPost}
        leftLanguage="html"
        rightLanguage="php"
        fontSize={14}
        notes="Comparer avec GET : URL propre, corps de requête pour les données."
      />

      <CodeSlide
        heading="Réafficher des données utilisateur : htmlspecialchars"
        code={phpHtmlspecialchars}
        language="php"
        showLineNumbers
        notes={
          "Prévention basique contre l'injection de HTML / XSS quand on affiche des saisies.\nDoc : https://www.php.net/manual/fr/function.htmlspecialchars.php"
        }
      />

      <CodeSlide
        heading="$_SERVER (aperçu)"
        code={phpServer}
        language="php"
        showLineNumbers
        notes={
          "Pas besoin de tout mémoriser ; utile pour la méthode et le chemin.\nDoc : https://www.php.net/manual/fr/reserved.variables.server.php"
        }
      />

      <MiraContentSlide heading="Logs en PHP (côté serveur)">
        <Text fontSize="2rem" marginBottom={16}>
          Un <strong>log</strong> est un message écrit{" "}
          <strong>sur le serveur</strong> (pour déboguer ou tracer) — il
          n’apparaît pas dans la page, et il n’est pas accessible “côté client”
          par défaut.
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            En PHP, le plus simple est <code>error_log()</code> (ou les logs du
            serveur web).
          </ListItem>
          <ListItem>
            En environnement Docker, on peut souvent lire ces logs directement
            via <code>docker compose logs</code> : c’est bien{" "}
            <strong>dans le conteneur</strong>, côté serveur.
          </ListItem>
          <ListItem>
            Ne pas confondre avec <strong>console.log</strong> (JavaScript) qui
            est <strong>dans le navigateur</strong>.
          </ListItem>
        </UnorderedList>
        <Notes>
          Insister : log = serveur. Démo possible : lancer une requête puis
          docker compose logs -f web.
          {"\n"}Doc (error_log) :
          https://www.php.net/manual/fr/function.error-log.php
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Exemple : écrire des logs (error_log)"
        code={phpLogs}
        language="php"
        showLineNumbers
        notes={
          "Montrer error_log() et rappeler que dans Docker on lit souvent via docker compose logs -f web. Éviter d'afficher des infos sensibles en clair en prod.\nDoc : https://www.php.net/manual/fr/function.error-log.php"
        }
      />

      {/* === Bloc B — Docker === */}
      <MiraContentSlide heading="Exécuter PHP en local : pourquoi Docker ?">
        <Text fontSize="2rem" marginBottom={16}>
          On veut la <strong>même version de PHP</strong> (et le même serveur
          web) pour tout le monde, <strong>sans</strong> installer et configurer
          PHP à la main sur chaque machine et chaque OS.
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            <strong>Docker</strong> fournit un environnement{" "}
            <strong>reproductible</strong> : tout le monde part de la même «
            boîte ».
          </ListItem>
          <ListItem>
            Dans ce cours, on utilise une <strong>recette</strong> déjà écrite (
            <code>docker-compose</code>) ; le TP et le README expliquent les
            commandes à lancer.
          </ListItem>
        </UnorderedList>
        <Notes>
          Image Docker = modèle figé ; conteneur = instance qui tourne — détail
          volontairement dans le README du TP. Plus tard (bases de données),
          même idée : service + port ; le dire en oral si besoin.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Conteneur et port (l’essentiel)">
        <UnorderedList fontSize="2rem">
          <ListItem>
            <strong>Conteneur</strong> : l’environnement qui{" "}
            <strong>tourne</strong> sur ta machine (PHP + Apache déjà prêts à
            l’intérieur).
          </ListItem>
          <ListItem>
            <strong>Port</strong> : ex. <code>8080:80</code> — le navigateur
            ouvre <code>http://localhost:8080</code> sur ton PC ; le trafic est
            envoyé au port 80 <strong>à l’intérieur</strong> du conteneur.
          </ListItem>
          <ListItem>
            Ton <strong>code source</strong> est monté dans le conteneur
            (volume) ; le serveur web sert ces fichiers.
          </ListItem>
        </UnorderedList>
        <Notes>
          Schéma sur la diapo suivante. Ne pas détailler réseaux Docker avancés
          ni orchestration.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide
        heading="Schéma Mermaid — navigateur → port → conteneur"
        fullWidth
      >
        <Box
          flex={1}
          width="100%"
          style={{
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid #e2e8f0",
          }}
        >
          <iframe
            title="Navigateur, port, conteneur Docker (Mermaid Live)"
            src={mermaidDockerPortLiveUrl}
            style={{
              width: "100%",
              height: "65vh",
              border: "none",
              display: "block",
            }}
            loading="lazy"
          />
        </Box>
        <Notes>
          localhost:8080 redirige vers le service web dans le conteneur.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="XAMPP ou Docker ?">
        <Text fontSize="2rem" marginBottom={16}>
          <strong>XAMPP</strong> installe Apache, PHP (et souvent MySQL){" "}
          <strong>directement sur ton système</strong> : tout-en-un, simple à
          lancer, mais les versions dépendent de l’installateur et de l’OS —
          deux machines peuvent ne pas être identiques.
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            <strong>Docker</strong> ne remplace pas « l’idée » d’un serveur
            local : il <strong>embarque</strong> PHP + Apache dans un{" "}
            <strong>conteneur</strong> isolé, à partir d’une{" "}
            <strong>image</strong> partagée (même fichier de recette pour toute
            la classe).
          </ListItem>
          <ListItem>
            Pour ce cours, on privilégie Docker pour que{" "}
            <strong>l’environnement soit le même pour tout le monde</strong> et
            aligné avec le TP ; si tu connais déjà XAMPP, garde en tête la même
            logique (serveur + PHP), avec une autre façon de l’obtenir.
          </ListItem>
        </UnorderedList>
        <Notes>
          Ne pas polémiquer : XAMPP reste valable pour expérimenter chez soi.
          Insister sur reproductibilité et équipe pour justifier Docker ici.
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Exemple docker-compose (trois idées)"
        code={dockerComposeSnippet}
        language="yaml"
        showLineNumbers={false}
        notes="image = quelle stack ; ports = accès local ; volumes = ton dossier de code. Le TP / README détaille la stack exacte et les commandes."
      />

      <MiraContentSlide heading="Références (doc officielle PHP)">
        <Text fontSize="1.4rem" marginBottom={16} color="#4a5568">
          À partager aux étudiant·es pour approfondir (docs officielles, en
          français).
        </Text>
        <UnorderedList fontSize="1.6rem">
          <ListItem>
            Balises, mélange HTML/PHP :{" "}
            <a href="https://www.php.net/manual/fr/language.basic-syntax.phpmode.php">
              php.net/manual/fr/language.basic-syntax.phpmode.php
            </a>
          </ListItem>
          <ListItem>
            Variables :{" "}
            <a href="https://www.php.net/manual/fr/language.variables.php">
              php.net/manual/fr/language.variables.php
            </a>
          </ListItem>
          <ListItem>
            Tableaux :{" "}
            <a href="https://www.php.net/manual/fr/language.types.array.php">
              php.net/manual/fr/language.types.array.php
            </a>
          </ListItem>
          <ListItem>
            Superglobales (vue d’ensemble) :{" "}
            <a href="https://www.php.net/manual/fr/reserved.variables.php">
              php.net/manual/fr/reserved.variables.php
            </a>
          </ListItem>
          <ListItem>
            Échappement à l’affichage (`htmlspecialchars`) :{" "}
            <a href="https://www.php.net/manual/fr/function.htmlspecialchars.php">
              php.net/manual/fr/function.htmlspecialchars.php
            </a>
          </ListItem>
          <ListItem>
            Logs serveur (`error_log`) :{" "}
            <a href="https://www.php.net/manual/fr/function.error-log.php">
              php.net/manual/fr/function.error-log.php
            </a>
          </ListItem>
          <ListItem>
            Tutoriel sur l’URL rewriting :{" "}
            <a href="https://grafikart.fr/tutoriels/url-rewriting-71">
              grafikart.fr/tutoriels/url-rewriting-71
            </a>
          </ListItem>
     
        </UnorderedList>
        <Notes>
          Si tu veux une version plus “HTTP”, tu peux ajouter $_GET / $_POST /
          $_SERVER :{"\n"}-
          https://www.php.net/manual/fr/reserved.variables.get.php
          {"\n"}- https://www.php.net/manual/fr/reserved.variables.post.php
          {"\n"}- https://www.php.net/manual/fr/reserved.variables.server.php
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="À retenir pour la suite">
        <UnorderedList fontSize="2rem">
          <ListItem>
            PHP s’exécute <strong>côté serveur</strong> ; le client reçoit le{" "}
            <strong>résultat</strong>.
          </ListItem>
          <ListItem>
            En local : <strong>conteneur</strong> + <strong>port</strong> pour
            accéder au site.
          </ListItem>
          <ListItem>
            Données HTTP : <code>$_GET</code> / <code>$_POST</code> comme
            tableaux associatifs ; <strong>valider</strong> et{" "}
            <strong>échapper</strong> à l’affichage.
          </ListItem>
          <ListItem>
            Le TP mettra tout ça en pratique : formulaires et manipulation des
            données envoyées.
          </ListItem>
        </UnorderedList>
        <Notes>Transition vers le TP « Premiers pas en PHP ».</Notes>
      </MiraContentSlide>
    </Deck>
  );
}

export default CoursPhpTheorique;
