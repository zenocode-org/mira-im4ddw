import React from "react";
import { Deck, Text, Box, ListItem, UnorderedList, OrderedList, Notes } from "spectacle";
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

// --- Extraits de code (courts, orientés cours) ---
const phpClassBasics = `<?php

declare(strict_types=1);

final class User
{
    public function __construct(
        private int $id,
        private string $firstName,
        private string $lastName,
        private string $email,
    ) {}

    public function id(): int { return $this->id; }

    public function fullName(): string
    {
        return $this->firstName . ' ' . $this->lastName;
    }

    public function changeEmail(string $email): void
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Email invalide');
        }
        $this->email = $email;
    }
}`;

const phpInheritance = `<?php

declare(strict_types=1);

abstract class DomainEntity
{
    public function __construct(protected int $id) {}
    public function id(): int { return $this->id; }
}

final class Product extends DomainEntity
{
    public function __construct(int $id, private string $name, private int $priceCents)
    {
        parent::__construct($id);
    }

    public function priceEuro(): float
    {
        return $this->priceCents / 100;
    }
}`;

const phpInterface = `<?php

declare(strict_types=1);

interface WeatherProviderInterface
{
    public function getCurrentForCity(string $city): WeatherReport;
}

final class WeatherReport
{
    public function __construct(
        public readonly string $city,
        public readonly float $temperatureC,
        public readonly int $humidityPct,
    ) {}
}`;

const phpPdoFetchAssoc = `<?php

declare(strict_types=1);

$pdo = new PDO(
    'mysql:host=db;dbname=app;charset=utf8mb4',
    'root',
    'root',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

$stmt = $pdo->prepare('SELECT id, name, price_cents FROM products WHERE id = :id');
$stmt->execute(['id' => 42]);

$row = $stmt->fetch(PDO::FETCH_ASSOC);
// $row est un tableau associatif : ['id' => '42', 'name' => '...', 'price_cents' => '...']`;

const phpHydration = `<?php

declare(strict_types=1);

final class Product
{
    public function __construct(
        private int $id,
        private string $name,
        private int $priceCents,
    ) {}

    public function id(): int { return $this->id; }
    public function name(): string { return $this->name; }
    public function priceEuro(): float { return $this->priceCents / 100; }

    public static function fromRow(array $row): self
    {
        return new self(
            (int) $row['id'],
            (string) $row['name'],
            (int) $row['price_cents'],
        );
    }
}`;

const phpRepository = `<?php

declare(strict_types=1);

final class ProductRepository
{
    public function __construct(private PDO $pdo) {}

    public function findById(int $id): ?Product
    {
        $stmt = $this->pdo->prepare(
            'SELECT id, name, price_cents FROM products WHERE id = :id'
        );
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row === false) {
            return null;
        }

        return Product::fromRow($row);
    }
}`;

const phpControllerFlow = `<?php

declare(strict_types=1);

// Exemple très simplifié (sans framework)

$id = (int) ($_GET['id'] ?? 0);
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'id invalide']);
    exit;
}

$repo = new ProductRepository($pdo);
$product = $repo->findById($id);

if ($product === null) {
    http_response_code(404);
    echo json_encode(['error' => 'Produit introuvable']);
    exit;
}

echo json_encode([
    'id' => $product->id(),
    'name' => $product->name(),
    'priceEuro' => $product->priceEuro(),
]);`;

const phpWeatherApiClient = `<?php

declare(strict_types=1);

final class OpenMeteoProvider implements WeatherProviderInterface
{
    public function __construct(private string $baseUrl = 'https://api.open-meteo.com') {}

    public function getCurrentForCity(string $city): WeatherReport
    {
        // Ici, on imagine qu'on a déjà des coordonnées (simplification cours)
        $url = $this->baseUrl . '/v1/forecast?latitude=48.85&longitude=2.35&current=temperature_2m,relative_humidity_2m';
        $json = file_get_contents($url);
        $data = json_decode($json, true);

        $current = $data['current'] ?? [];
        return new WeatherReport(
            city: $city,
            temperatureC: (float) ($current['temperature_2m'] ?? 0),
            humidityPct: (int) ($current['relative_humidity_2m'] ?? 0),
        );
    }
}`;

const phpFakeWeatherProvider = `<?php

declare(strict_types=1);

final class FakeWeatherProvider implements WeatherProviderInterface
{
    public function getCurrentForCity(string $city): WeatherReport
    {
        return new WeatherReport(city: $city, temperatureC: 21.5, humidityPct: 45);
    }
}`;

function CoursPhpPoo() {
  return (
    <Deck
      theme={theme}
      template={(props) => <MiraDeckTemplate {...props} />}
      transition={noTransition}
    >
      <MiraTitleSlide
        title="POO en PHP (et lien avec les données)"
        subtitle="Cours théorique — Séance 7"
        date="à compléter"
      >
        <Notes>
          Objectif : POO de base (30 min), puis modèle “domaine + sources de
          données” (DB + API) pour un projet web.
        </Notes>
      </MiraTitleSlide>

      <MiraContentSlide heading="Objectifs du cours">
        <UnorderedList fontSize="2rem">
          <ListItem>
            Comprendre <strong>classes</strong>, <strong>objets</strong>,{" "}
            <strong>propriétés</strong>, <strong>méthodes</strong>.
          </ListItem>
          <ListItem>
            Savoir quand utiliser <strong>héritage</strong>,{" "}
            <strong>interfaces</strong>, <strong>abstractions</strong>.
          </ListItem>
          <ListItem>
            Relier la POO à un projet web : <strong>requête</strong> →{" "}
            <strong>récupération des données</strong> → <strong>objets métier</strong> →{" "}
            <strong>réponse</strong>.
          </ListItem>
        </UnorderedList>
        <Notes>Annonce des 2 parties : bases POO puis utilisation projet.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Pourquoi la POO (dans un projet web) ?">
        <Text fontSize="2rem" marginBottom={16}>
          Sans POO, on manipule vite des <strong>tableaux</strong> partout (PDO,
          JSON, $_POST…), et la logique métier se disperse.
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            Avec la POO : on manipule des concepts du projet (ex.{" "}
            <code>User</code>, <code>Product</code>, <code>WeatherReport</code>).
          </ListItem>
          <ListItem>
            Le code devient plus <strong>lisible</strong>, plus{" "}
            <strong>testable</strong>, et les responsabilités sont séparées.
          </ListItem>
        </UnorderedList>
        <Notes>
          Message clé : la POO n'est pas “pour faire joli”, elle structure le
          projet quand les sources de données se multiplient.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Classe vs objet">
        <UnorderedList fontSize="2rem">
          <ListItem>
            <strong>Classe</strong> : un “plan” (structure + comportements).
          </ListItem>
          <ListItem>
            <strong>Objet</strong> : une instance réelle, créée avec{" "}
            <code>new</code>.
          </ListItem>
          <ListItem>
            Un projet manipule souvent <strong>beaucoup d'objets</strong> issus
            de quelques classes.
          </ListItem>
        </UnorderedList>
        <Notes>
          Faire un parallèle : “tableau de produits” devient “liste d'objets
          Product”.
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Classe : propriétés, constructeur, méthodes"
        code={phpClassBasics}
        language="php"
        showLineNumbers
        notes="Montrer : propriétés privées, constructeur, méthode métier, validation et exception. Insister sur l'encapsulation."
      />

      <MiraContentSlide heading="Encapsulation : pourquoi private ?">
        <Text fontSize="2rem" marginBottom={16}>
          Encapsulation = protéger l'état interne : le reste du code ne doit pas
          pouvoir mettre l'objet dans un état incohérent.
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            On expose des <strong>méthodes</strong> (ex:{" "}
            <code>changeEmail()</code>) plutôt que modifier des champs partout.
          </ListItem>
          <ListItem>
            L'objet devient le gardien des <strong>règles métier</strong>.
          </ListItem>
        </UnorderedList>
        <Notes>
          Exemple oral : “email valide” / “prix non négatif” : les règles restent
          dans l'objet.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Propriétés : visibilité (public / private)">
        <UnorderedList fontSize="2rem">
          <ListItem>
            <code>public</code> : accessible depuis l'extérieur.
          </ListItem>
          <ListItem>
            <code>private</code> : accessible uniquement dans la classe.
          </ListItem>
          <ListItem>
            <code>protected</code> : accessible dans la classe + enfants
            (héritage).
          </ListItem>
        </UnorderedList>
        <Text fontSize="0.95rem" marginTop={16} color="#64748b">
          En cours : préférer <strong>private</strong> + méthodes, sauf cas
          particulier.
        </Text>
        <Notes>
          Option : évoquer “readonly” sur propriétés (PHP 8.1+) pour les DTO
          simples.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Héritage : factoriser, mais sans abuser">
        <UnorderedList fontSize="2rem">
          <ListItem>
            <code>extends</code> permet de partager du code commun entre
            classes.
          </ListItem>
          <ListItem>
            Risque : hiérarchies profondes et couplage fort.
          </ListItem>
          <ListItem>
            Règle pratique : l'héritage doit exprimer un <strong>vrai</strong>{" "}
            “est-un”.
          </ListItem>
        </UnorderedList>
        <Notes>
          Préparer la transition : en projet web, les interfaces sont souvent
          plus flexibles.
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Exemple d’héritage (simple)"
        code={phpInheritance}
        language="php"
        showLineNumbers
        notes="Montrer abstract, protected, parent::__construct. Insister : exemple pédagogique, pas un modèle universel."
      />

      <MiraContentSlide heading="Interfaces : un contrat, plusieurs implémentations">
        <Text fontSize="2rem" marginBottom={16}>
          Une interface définit <strong>ce que</strong> fait une classe, sans
          imposer <strong>comment</strong>.
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            Utile pour brancher plusieurs sources (API réelle vs fake, DB réelle
            vs mock).
          </ListItem>
          <ListItem>
            Favorise le test : on remplace une implémentation par une autre.
          </ListItem>
        </UnorderedList>
        <Notes>Transition vers la partie “données : DB + API météo”.</Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Interface + objet de domaine (WeatherReport)"
        code={phpInterface}
        language="php"
        showLineNumbers
        notes="Présenter un objet métier simple (report) et le contrat du provider."
      />

      <MiraContentSlide heading="Objets vs tableaux (PDO, JSON, formulaires)">
        <UnorderedList fontSize="2rem">
          <ListItem>
            Beaucoup d'entrées arrivent en <strong>tableaux</strong> (PDO fetch,
            json_decode, $_POST).
          </ListItem>
          <ListItem>
            Dans l'application, on préfère manipuler des <strong>objets</strong>{" "}
            stables : mêmes méthodes, mêmes invariants, mêmes noms.
          </ListItem>
        </UnorderedList>
        <Notes>Point clé : “transformer des données brutes en objets métier”.</Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Début de la partie projet : le problème réel">
        <Text fontSize="2rem" marginBottom={16}>
          Une requête web arrive : on doit <strong>trouver</strong> une ressource
          (produit, utilisateur, météo…), appliquer des règles, puis répondre
          (HTML/JSON).
        </Text>
        <OrderedList fontSize="2rem">
          <ListItem>Lire l'entrée (route, paramètres, auth…).</ListItem>
          <ListItem>Récupérer les données (DB, API…).</ListItem>
          <ListItem>Transformer en objets métier.</ListItem>
          <ListItem>Produire une réponse.</ListItem>
        </OrderedList>
        <Notes>
          Mettre l'accent sur l'orchestration : chaque étape a sa place dans le
          code.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Domaine : le cœur de l’application">
        <Text fontSize="2rem" marginBottom={16}>
          Le <strong>domaine</strong> = les objets et règles métier qui doivent
          rester stables même si la source de données change.
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            Exemples : <code>Product</code>, <code>User</code>,{" "}
            <code>WeatherReport</code>.
          </ListItem>
          <ListItem>
            Le domaine ne devrait pas dépendre directement de PDO, de SQL, ni
            d'un JSON externe.
          </ListItem>
        </UnorderedList>
        <Notes>
          Phrase : “Le domaine est ce que ton code manipule partout dans ton
          projet”.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Schéma — requête → données → domaine → réponse" fullWidth>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="stretch"
          justifyContent="space-between"
          gap={16}
          width="100%"
          marginTop={20}
        >
          {[
            { title: "HTTP Request", sub: "route, params, auth" },
            { title: "Controller", sub: "orchestration" },
            { title: "Repository/Provider", sub: "DB / API / cache" },
            { title: "Domaine", sub: "objets métier" },
            { title: "Response", sub: "HTML / JSON" },
          ].map((b) => (
            <Box
              key={b.title}
              flex={1}
              padding="16px"
              style={{
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                background: "#ffffff",
              }}
            >
              <Text fontSize="1.4rem" fontWeight={700} marginBottom={8}>
                {b.title}
              </Text>
              <Text fontSize="1.1rem" color="#64748b">
                {b.sub}
              </Text>
            </Box>
          ))}
        </Box>
        <Text fontSize="1.1rem" marginTop={18} color="#4a5568">
          Idée centrale : le reste du code veut des <strong>objets métier</strong>,
          quelle que soit la source des données.
        </Text>
        <Notes>
          Lire de gauche à droite. Insister : repository/provider = “zone de
          traduction” vers le domaine.
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="PDO : récupérer une ligne (tableau associatif)"
        code={phpPdoFetchAssoc}
        language="php"
        showLineNumbers
        notes="Insister : la DB renvoie des chaînes ; on fera la conversion au moment de créer l'objet."
      />

      <CodeSlide
        heading="Hydrater un objet métier à partir d’un tableau"
        code={phpHydration}
        language="php"
        showLineNumbers
        notes="Montrer la factory fromRow : conversion de types et mapping champ→propriété."
      />

      <CodeSlide
        heading="Repository : isoler l’accès à la base de données"
        code={phpRepository}
        language="php"
        showLineNumbers
        notes="Point clé : ailleurs dans le code, on demande un Product, pas un array."
      />

      <MiraContentSlide heading="Pourquoi isoler SQL / HTTP / domaine ?">
        <UnorderedList fontSize="2rem">
          <ListItem>
            Évite le fichier “tout mélangé” : SQL + HTML + logique.
          </ListItem>
          <ListItem>
            Rend le code plus facile à maintenir : changer une requête SQL ne
            casse pas la logique métier.
          </ListItem>
          <ListItem>
            Testabilité : on peut remplacer le repository par une version fake.
          </ListItem>
        </UnorderedList>
        <Notes>
          Introduire la notion de responsabilités : controller orchestre, repo
          récupère, domaine décide.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Relations entre objets (exemples)">
        <UnorderedList fontSize="2rem">
          <ListItem>
            <code>User</code> → une liste de <code>Order</code>.
          </ListItem>
          <ListItem>
            <code>Article</code> → une <code>Category</code>.
          </ListItem>
          <ListItem>
            Une relation = souvent une clé étrangère en DB, mais en domaine on
            veut un objet (ou un identifiant clair).
          </ListItem>
        </UnorderedList>
        <Notes>
          Rester simple : expliquer “objet ou id”, et qu'on évite les chargements
          implicites magiques au début.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Même logique avec une API externe (météo)">
        <Text fontSize="2rem" marginBottom={16}>
          Une API renvoie du <strong>JSON</strong> : ce n'est pas “le domaine”.
          On transforme ce JSON en <strong>WeatherReport</strong>.
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            L'application manipule toujours le même objet métier, quelle que
            soit la source.
          </ListItem>
          <ListItem>
            On peut stubber l'API avec une implémentation fake.
          </ListItem>
        </UnorderedList>
        <Notes>
          Faire le parallèle DB↔API : deux sources, même “sortie” : objet métier.
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Provider réel : appel API → WeatherReport"
        code={phpWeatherApiClient}
        language="php"
        showLineNumbers
        notes="Simplification volontaire : focus sur la transformation JSON -> objet (pas sur la géolocalisation)."
      />

      <CodeSlide
        heading="Provider fake : pour tester / développer sans Internet"
        code={phpFakeWeatherProvider}
        language="php"
        showLineNumbers
        notes="Montrer l'intérêt des interfaces : même contrat, autre implémentation."
      />

      <MiraContentSlide heading="Même domaine, sources différentes">
        <UnorderedList fontSize="2rem">
          <ListItem>
            Les données peuvent venir de : base de données, API externe, cache,
            fichier…
          </ListItem>
          <ListItem>
            Le reste du code veut une forme stable : <strong>des objets</strong>{" "}
            avec des méthodes et des règles.
          </ListItem>
          <ListItem>
            On centralise les conversions au bon endroit : repository / provider
            (anti-corruption layer).
          </ListItem>
        </UnorderedList>
        <Notes>
          Donner le vocabulaire “anti-corruption layer” en bonus seulement si
          utile.
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Orchestration : de la requête à la réponse"
        code={phpControllerFlow}
        language="php"
        showLineNumbers
        notes="Montrer : validation d'entrée, appel repo, gestion 404, réponse JSON."
      />

      <MiraContentSlide heading="Bonnes pratiques (à ce niveau du cours)">
        <UnorderedList fontSize="2rem">
          <ListItem>
            Ne pas mettre du SQL dans un objet métier (<code>Product</code> ne
            doit pas “faire des requêtes”).
          </ListItem>
          <ListItem>
            Ne pas faire une classe “God object” (tout dans un seul fichier).
          </ListItem>
          <ListItem>
            Commencer simple : quelques classes claires, des responsabilités
            nettes.
          </ListItem>
        </UnorderedList>
        <Notes>
          Répéter : “responsabilités” et “transformer la donnée brute en domaine”.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Récap — ce que tu dois retenir">
        <UnorderedList fontSize="2rem">
          <ListItem>
            POO : classes/objets, encapsulation, méthodes = règles métier.
          </ListItem>
          <ListItem>
            Projet web : la donnée vient souvent en tableaux/JSON → on{" "}
            <strong>hydrate</strong> des objets métier.
          </ListItem>
          <ListItem>
            On isole les sources (DB/API) dans des classes dédiées (repositories
            / providers).
          </ListItem>
        </UnorderedList>
        <Notes>Transition possible : TP ou mini-projet API + DB.</Notes>
      </MiraContentSlide>
    </Deck>
  );
}

export default CoursPhpPoo;
