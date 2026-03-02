import React from 'react';
import {
  Deck,
  FlexBox,
  Box,
  Grid,
  Text,
  ListItem,
  UnorderedList,
  Notes,
  defaultTheme,
  OrderedList,
} from 'spectacle';
import {
  MiraTitleSlide,
  MiraContentSlide,
  MiraTable,
  MiraTitle,
  MiraSubtitle,
} from '../components';
import { MiraDeckTemplate } from '../components/MiraDeckTemplate';
import { miraTheme } from '../components/theme';

const theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    ...miraTheme.colors,
  },
  fonts: miraTheme.fonts,
  fontSizes: miraTheme.fontSizes,
};

const PROJECTS = [
  {
    title: 'Gestionnaire de Tâches Collaboratif',
    level: '⭐⭐',
    concept: 'To-do list avec partage et collaboration',
    features: ['CRUD tâches', 'Utilisateurs (inscription/connexion)', 'Catégorisation', 'API REST', 'Responsive'],
    bonus: ['Partage de listes', 'Filtres avancés', 'Notifications'],
  },
  {
    title: 'Bibliothèque de Films Personnelle',
    level: '⭐⭐',
    concept: 'Collection films avec API externe',
    features: ['CRUD films', 'API OMDB/TMDB', 'Notation et commentaires', 'Grille responsive'],
    bonus: ['Statistiques', 'Recommandations', 'Import/export'],
  },
  {
    title: 'Réservation de Restaurant',
    level: '⭐⭐⭐',
    concept: 'Réservation en ligne avec créneaux',
    features: ['Calendrier', 'Formulaire complet', 'Validation créneaux', 'Interface admin', 'API REST'],
    bonus: ['Email confirmation', 'Rappel J-1', 'Plusieurs salles'],
  },
  {
    title: 'Plateforme de Blog Minimaliste',
    level: '⭐⭐',
    concept: 'Système de blog complet',
    features: ['CRUD articles', 'Commentaires', 'Authentification auteur', 'API pagination', 'Responsive'],
    bonus: ['Éditeur Markdown', 'Recherche full-text', 'Tags'],
  },
  {
    title: "Gestionnaire d'Événements Musicaux",
    level: '⭐⭐⭐',
    concept: 'Concerts/festivals avec inscriptions',
    features: ['Création événements', 'Inscription (places limitées)', 'Filtrage', 'API REST'],
    bonus: ['Favoris', 'Billets PDF', 'Galerie photos'],
  },
  {
    title: 'Portfolio Interactif avec Admin',
    level: '⭐',
    concept: 'Portfolio personnel avec back-office',
    features: ['Page publique responsive', 'Admin projets', 'CRUD', 'Formulaire contact', 'API REST'],
    bonus: ['Upload images', 'Filtrage tech', 'Section blog'],
  },
];

function PresentationModule() {
  return (
    <Deck theme={theme} template={(props) => <MiraDeckTemplate {...props} />}>
      <MiraTitleSlide
        title="Présentation du Module IM4DDW"
        subtitle="Développement Web"
        date="3 mars"
        presenter="Antoine Frau"
      >
        <Notes>
          Commence avec énergie, souris. Insiste sur le fait que ce module est concret et pratique.
          Demande qui a déjà fait du HTML/CSS, du JavaScript ou du PHP.
        </Notes>
      </MiraTitleSlide>

      <MiraContentSlide heading="Bienvenue">
        <Text fontSize="2rem" marginBottom={16}>
          Module IM4DDW : Développement Web
        </Text>
        <MiraSubtitle marginBottom={8}>Du 3 mars au 22 mai</MiraSubtitle>
        <Text fontSize="1.25rem" color="#4a5568">
          12 séances pour maîtriser le développement web moderne
        </Text>
        <Notes>
          Commence avec énergie, souris, montre que tu es content de les voir.
          Insiste sur le fait que ce module est concret et pratique.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Qui suis-je ?">
        <Text fontSize="1.75rem" marginBottom={24} fontWeight="bold" color="#2d3748">
          Antoine Frau
        </Text>
        <Text fontSize="1.25rem" marginBottom={20} color="#4a5568">
          Ingénieur Full Stack — Python, Next.js — spécialisé en LLM
        </Text>
        <UnorderedList fontSize="1.05rem" color="#4a5568" marginBottom={16}>
          <ListItem>Master info (Univ. Corse) → échange à Montréal pour la dernière année</ListItem>
          <ListItem>Stage là-bas → <strong>6 ans</strong> chez <a href="https://korbit.ai" target="_blank" rel="noopener noreferrer">korbit.ai</a> : génération de feedback par IA pour l'apprentissage de la programmation — ère pré-ChatGPT</ListItem>
          <ListItem>PhD commencé, stoppé après 6 mois — content aujourd'hui vu la révolution LLM</ListItem>
          <ListItem>Sortie de ChatGPT : pivot korbit.ai → <strong>premier outil de code review par LLM</strong>, succès, puis faillite de l'entreprise</ListItem>
          <ListItem><strong>Aujourd'hui :</strong> Lead AI chez <a href="https://kerno.io" target="_blank" rel="noopener noreferrer">Kerno.io</a> — Agent LLM pour la génération de tests E2E</ListItem>
          <ListItem>Quelques projets personnels à découvrir...</ListItem>
        </UnorderedList>
        <Notes>
          Master Corse → échange Montréal dernière année → stage → 6 ans korbit.ai (feedback apprentissage programmation, pré-ChatGPT). PhD 6 mois puis stop — content vu la révolution LLM. ChatGPT sort → korbit pivote → 1er outil code review LLM, succès, puis faillite. Aujourd'hui Kerno.io. Présente-toi de façon détendue.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Parolla" centered>
        <FlexBox flexDirection="column" alignItems="center">
          <a href="https://parolla.chat" target="_blank" rel="noopener noreferrer">
            <img
              src={`${import.meta.env.BASE_URL}screenshots/parolla.png`}
              alt="Parolla"
              style={{ width: '100%', borderRadius: 12, boxShadow: '0 4px 12px #0001' }}
            />
          </a>
        </FlexBox>
        <Notes>
          Parolla — présente ce projet.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Lampe" centered>
        <FlexBox flexDirection="column" alignItems="center">
            <a href="https://docs.montagne.dev" target="_blank" rel="noopener noreferrer">
          <img
            src={`${import.meta.env.BASE_URL}screenshots/lampe.png`}
            alt="Lampe"
            style={{ width: '100%', borderRadius: 12, boxShadow: '0 4px 12px #0001' }}
            />
            </a>
        </FlexBox>
        <Notes>
          Lampe — présente ce projet.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="MediaGuard" centered>
        <FlexBox flexDirection="column" alignItems="center">
          <a href="https://antoinefrau.github.io/media-guard/" target="_blank" rel="noopener noreferrer">
          <img
            src={`${import.meta.env.BASE_URL}screenshots/mediaguard.png`}
            alt="MediaGuard"
            style={{ width: '100%', borderRadius: 12, boxShadow: '0 4px 12px #0001' }}
          />
          </a>
        </FlexBox>
        <Notes>
          MediaGuard — présente ce projet.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Ce que tu vas apprendre">
        <Grid gridTemplateColumns="1fr 1fr 1fr" width="100%">
          <Box>
            <Text fontSize="1.5rem" marginBottom={12} fontWeight="bold" color="#2d3748">
              Front-end (séances 1-5)
            </Text>
            <UnorderedList>
              <ListItem><strong>HTML5</strong> : structurer tes pages web</ListItem>
              <ListItem><strong>CSS3</strong> : les rendre belles et responsives</ListItem>
              <ListItem><strong>JavaScript</strong> : les rendre interactives</ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Text fontSize="1.5rem" marginBottom={12} fontWeight="bold" color="#2d3748">
              Back-end (séances 6-9)
            </Text>
            <UnorderedList>
              <ListItem><strong>PHP</strong> : logique côté serveur</ListItem>
              <ListItem><strong>POO</strong> : programmer proprement avec des objets</ListItem>
              <ListItem><strong>Bases de données</strong> : stocker et gérer les données</ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Text fontSize="1.5rem" marginBottom={12} fontWeight="bold" color="#2d3748">
              Architecture moderne (séances 10-11)
            </Text>
            <Text><strong>API REST</strong> : faire communiquer front et back</Text>
          </Box>
        </Grid>
        <Notes>
          Explique la progression logique. Rassure-les : c'est normal de ne pas tout comprendre maintenant.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Le parcours des 12 séances" centered>
        <MiraTable
          headers={['Séance', 'Date', 'Durée', 'Contenu']}
          fontSize="0.8rem"
          compact
          rows={[
            ['1', '3 mars', '30 min + 1h', 'Introduction + HTML/CSS'],
            ['2', '10 mars', '1h30', 'TP HTML & CSS'],
            ['3', '17 mars', '30 min + 1h', 'TP Responsive + Intro JavaScript'],
            ['4', '31 mars', '1h30', 'TP JavaScript (DOM)'],
            ['5', '10 avril', '1h30', 'TP JavaScript (Asynchrone)'],
            ['6', '14 avril', '1h30 + 1h30', 'Cours + TP PHP'],
            ['7', '27 avril', '1h30 + 1h30', 'TP PHP + Cours POO'],
            ['8', '5 mai', '1h30 + 1h30', 'TP POO + Cours BDD'],
            ['9', '12 mai', '1h30', 'TP CRUD'],
            ['10', '13 mai', '1h + 30 min', 'Cours API + Début TP'],
            ['11', '21 mai', '1h30', 'TP API (suite)'],
            ['12', '22 mai', '3h', <><strong>Soutenances</strong></>],
          ]}
          highlightRows={[11]}
        />
        <Notes>
          Montre la progression : théorie → pratique. Insiste sur les TPs.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Le projet final">
        <Text fontSize="1.2rem" marginBottom={16}>
          Date de présentation : <strong>22 mai</strong>
        </Text>
        <Text fontSize="1.2rem" marginBottom={24}>
          Format : <strong>10 min</strong> présentation + <strong>5 min</strong> questions
        </Text>
        <Grid
          gridTemplateColumns={['1fr', '1fr 1fr']}
          gap={32}
          alignItems="flex-start"
          marginBottom={0}
        >
          <Box>
            <Text fontSize="1.1rem" marginBottom={16} fontWeight="bold">
              Support
            </Text>
            <UnorderedList marginBottom={16}>
              <ListItem>8 à 10 slides</ListItem>
              <ListItem>Démonstration vidéo ou live</ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Text fontSize="1.1rem" marginBottom={8} fontWeight="bold">
              Contenu obligatoire
            </Text>
            <UnorderedList fontSize="1rem">
              <ListItem>Contexte et idée du projet</ListItem>
              <ListItem>Choix techniques</ListItem>
              <ListItem>Démonstration fonctionnelle</ListItem>
              <ListItem>Difficultés rencontrées</ListItem>
              <ListItem>Améliorations possibles</ListItem>
            </UnorderedList>
          </Box>
        </Grid>
        <Notes>
          Rassure-les : tu ne demandes pas un produit commercial parfait.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="6 Projets au choix">
        <Text fontSize="1.2rem" marginBottom={16}>
          Tu peux choisir parmi ces 6 propositions...
        </Text>
        <Text fontSize="1.3rem" fontWeight="bold" color="#00a3a3">
          ou proposer ton propre projet !
        </Text>
        <Text color="#4a5568" marginTop={16}>
          (tant qu'il mobilise toutes les compétences)
        </Text>
        <Notes>Encourager la créativité.</Notes>
      </MiraContentSlide>

      {PROJECTS.map((project, i) => (
        <MiraContentSlide
          key={i}
          heading={<MiraTitle fontSize="1.75rem" marginBottom={16}>Projet {i + 1} : {project.title}</MiraTitle>}
        >
          <Text marginBottom={12} color="#4a5568">
            Niveau : {project.level}
          </Text>
          <Text fontSize="1.1rem" marginBottom={16} fontWeight="bold">
            {project.concept}
          </Text>
          <Text fontSize="0.95rem" marginBottom={8} fontWeight="bold">
            Fonctionnalités minimales :
          </Text>
          <UnorderedList fontSize="0.9rem">
            {project.features.map((f, j) => (
              <ListItem key={j}>{f}</ListItem>
            ))}
          </UnorderedList>
          <Text fontSize="0.9rem" marginTop={12} color="#00a3a3">
            Bonus : {project.bonus.slice(0, 3).join(', ')}...
          </Text>
          <Notes>Projet {i + 1} - voir markdown pour notes présentateur.</Notes>
        </MiraContentSlide>
      ))}

      <MiraContentSlide heading="Tableau récapitulatif" centered>
        <MiraTable
          headers={['Projet', 'Niveau', 'Forces']}
          fontSize="0.8rem"
          rows={[
            ['Gestionnaire Tâches', '⭐⭐', 'CRUD + Auth'],
            ['Bibliothèque Films', '⭐⭐', 'API externe'],
            ['Réservation Restaurant', '⭐⭐⭐', 'Logique complexe'],
            ['Blog Minimaliste', '⭐⭐', 'Contenu éditorial'],
            ['Événements Musicaux', '⭐⭐⭐', 'Inscriptions'],
            ['Portfolio Admin', '⭐', 'Professionnel'],
          ]}
        />
        <Notes>Chaque projet a ses forces. Pas de "meilleur" choix.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Technologies imposées">
        <Text marginBottom={8}><strong>Front :</strong> HTML5, CSS3, JavaScript vanilla</Text>
        <Text marginBottom={8}><strong>Back :</strong> PHP POO (MVC recommandé)</Text>
        <Text marginBottom={8}><strong>BDD :</strong> MySQL ou PostgreSQL</Text>
        <Text marginBottom={8}><strong>API :</strong> Au moins 1 endpoint REST, JSON</Text>
        <Text fontSize="0.95rem" marginTop={16} color="#4a5568">
          Pas de frameworks (React, Laravel...) pour comprendre les fondamentaux.
        </Text>
        <Notes>L'architecture MVC est un plus mais pas obligatoire.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Livrables attendus">
        <UnorderedList>
          <ListItem><strong>Code source</strong> (Git/GitHub)</ListItem>
          <ListItem><strong>8 à 10 slides</strong> (envoyées avant le cours)</ListItem>
          <ListItem><strong>Démonstration</strong> (live ou vidéo)</ListItem>
        </UnorderedList>
        <Text marginTop={16} fontWeight="bold">
          <UnorderedList marginTop={2}>
            <ListItem>Contexte</ListItem>
            <ListItem>Choix techniques</ListItem>
            <ListItem>Démo</ListItem>
            <ListItem>Difficultés</ListItem>
            <ListItem>Améliorations</ListItem>
          </UnorderedList>
        </Text>
        <Notes>Insister sur Git et envoi des slides AVANT.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Critères d'évaluation">
        <Text fontSize="1.1rem" marginBottom={12}><strong>Fonctionnalité</strong> : Ça marche ?</Text>
        <Text fontSize="1.1rem" marginBottom={12}><strong>Qualité du code</strong> : C'est propre ?</Text>
        <Text fontSize="1.1rem" marginBottom={12}><strong>Présentation</strong> : C'est clair ?</Text>
        <Text fontSize="1.1rem" marginBottom={12}><strong>Créativité</strong> : C'est original ?</Text>
        <Text fontSize="0.95rem" marginTop={16} color="#4a5568">
          Un projet simple mais parfaitement exécuté vaut mieux qu'un ambitieux non fonctionnel.
        </Text>
        <Notes>Être transparent sur les critères.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Timeline du projet">
        <Text fontSize="1rem" marginBottom={8}><strong>Maintenant → 10 mai</strong> : Apprendre les technologies</Text>
        <Text fontSize="1rem" marginBottom={8}><strong>13 mai</strong> : Cours API (dernière brique)</Text>
        <Text fontSize="1rem" marginBottom={8}><strong>13-21 mai</strong> : Développement intensif</Text>
        <Text fontSize="1rem" marginBottom={8}><strong>21 mai</strong> : Dernière séance TP</Text>
        <Text fontSize="1.1rem" marginTop={16} fontWeight="bold" color="#00a3a3">
          22 mai : Présentation finale (3h)
        </Text>
        <Notes>Rassurer : ~9 jours entre 13 et 22 mai pour développer.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Environnement de travail">
        <UnorderedList>
          <ListItem><strong>VS Code</strong> (éditeur)</ListItem>
          <ListItem><strong>Navigateur</strong> Chrome, Firefox, Edge</ListItem>
          <ListItem><strong>Serveur local</strong> XAMPP/MAMP (séance 6)</ListItem>
          <ListItem><strong>Extensions</strong> : Live Server, PHP Intelephense, Prettier</ListItem>
        </UnorderedList>
        <Notes>Demande qui a déjà VS Code installé.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Conseils pour réussir">
        <OrderedList>
          <ListItem><strong> Commence simple</strong> — Fonctionnalités minimales d'abord</ListItem>
          <ListItem><strong>Teste régulièrement</strong> — Ne laisse pas tout pour la fin</ListItem>
          <ListItem><strong>Versionne ton code</strong> — Git dès le début</ListItem>
          <ListItem><strong>Documente</strong> — Tu vas présenter, tu dois expliquer</ListItem>
          <ListItem><strong>Prépare ta démo</strong> — Pas de setup live le jour J !</ListItem>
        </OrderedList>
        <Notes>Ces conseils sont cruciaux.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Questions fréquentes">
        <Text marginBottom={8}>« Je peux travailler en binôme ? » → Non, projet individuel</Text>
        <Text marginBottom={8}>« Je peux utiliser Bootstrap/Tailwind ? » → Oui pour le CSS</Text>
        <Text marginBottom={8}>« Je peux proposer un autre projet ? » → Oui</Text>
        <Text marginBottom={8}>« Je peux utiliser ChatGPT/Copilot/Cursor ? » → Pour de l'aide oui, mais tu dois tout comprendre demande lui d'expliquer les choses en détail.</Text>
        <Notes>Clarifier ces points dès maintenant.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="À toi de choisir !">
        <Text fontSize="1.2rem" marginBottom={24}>
          Réfléchis d'ici la prochaine séance :
        </Text>
        <UnorderedList fontSize="1.1rem">
          <ListItem>Quel projet t'intéresse ?</ListItem>
          <ListItem>Quel niveau de défi tu veux ?</ListItem>
          <ListItem>As-tu une idée originale ?</ListItem>
        </UnorderedList>
        <Text marginTop={24} color="#4a5568">
          On en reparle régulièrement pendant le module.
        </Text>
        <Notes>Ne pas forcer une décision aujourd'hui.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Questions ?">
        
      </MiraContentSlide>

      <MiraContentSlide heading={<MiraTitle fontSize="2.5rem" marginBottom={24}>C'est parti !</MiraTitle>}>
        <Text fontSize="1.3rem" marginBottom={16}>
          On attaque avec HTML et CSS.
        </Text>
        <Text marginTop={24}>
          👉 <a href={`${import.meta.env.BASE_URL}?deck=seance-01-html-css`}>
            Accéder au cours HTML & CSS &rarr;
          </a>
        </Text>
        <Notes>Conclus avec enthousiasme. "Let's go!"</Notes>
      </MiraContentSlide>
    </Deck>
  );
}

export default PresentationModule;
