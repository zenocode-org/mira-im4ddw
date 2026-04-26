import React from "react";
import { Deck, Text, Box, ListItem, UnorderedList, OrderedList, Notes } from "spectacle";
import {
  MiraTitleSlide,
  MiraContentSlide,
  CodeSlide,
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

// --- Exemple User : une slide par notion (ellipses pour tenir sur l’écran) ---
const phpUserProprietes = `final class User
{
    /** « Promoted properties » = propriétés + paramètres du constructeur */
    public function __construct(
        private int $id,
        private string $firstName,
        private string $lastName,
        private string $email,
    ) {
        // ... voir diapo « Constructeur »
    }

    // ... voir diapo « Méthodes »
}`;

const phpUserConstructeur = `
final class User
{
    public function __construct(
        private int $id,
        private string $firstName,
        private string $lastName,
        private string $email,
    ) {
        if ($this->firstName === '' || $this->lastName === '') {
            throw new InvalidArgumentException('...');
        }
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('...');
        }
    }
    // ...
}`;

const phpUserMethodes = `final class User
{
    // ... constructeur, propriétés

    public function id(): int { return $this->id; }
    public function email(): string { return $this->email; }

    public function fullName(): string { return $this->firstName . ' ' . $this->lastName; }

    public function changeEmail(string $email): void
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('...');
        }
        $this->email = $email;
    }
}`;

// --- Héritage (2 extraits) : boutique en ligne, article de catalogue → livre ---
const phpInheritanceBase = `/** Tout article du catalogue partage un id, un libellé, un prix */
abstract class CatalogItem
{
    public function __construct(
        protected int $id,
        protected string $title,
        protected int $priceCents,
    ) {}

    public function id(): int
    {
        return $this->id;
    }

    public function priceEuro(): float
    {
        return $this->priceCents / 100;
    }

    /** Titre affiché panier / fiche (spécifique : livre, abonnement, etc.) */
    abstract public function displayName(): string;

    // ... ex. description courte, TVA, promotion
}`;

const phpInheritanceProduct = `/** Exemple concret : livre papier (ISBN) */
final class Book extends CatalogItem
{
    public function __construct(
        int $id,
        string $title,
        int $priceCents,
        private string $isbn,
    ) {
        parent::__construct($id, $title, $priceCents);
    }

    public function displayName(): string
    {
        return $this->title . ' (ISBN ' . $this->isbn . ')';
    }

    // ... auteurs, stock, poids
}`;

// --- Interface + DTO météo + 2 implémentations (fournisseurs / JSON distincts) ---
const phpInterfaceContract = `interface WeatherProviderInterface
{
    public function getCurrentForCity(string $city): WeatherReport;
    // ... autres besoins météo
}`;

const phpWeatherReportDto = `final class WeatherReport
{
    public function __construct(
        public readonly string $city,
        public readonly float $temperatureC,
        public readonly int $humidityPct,
    ) {}
    // ... helpers éventuels
}`;

const phpWeatherOpenMeteoImpl = `/** Données via Open-Meteo (champs current.temperature_2m, etc.) */
final class OpenMeteoProvider implements WeatherProviderInterface
{
    // ... __construct (baseUrl, etc.)

    public function getCurrentForCity(string $city): WeatherReport
    {
        $url = $this->baseUrl . '/v1/forecast?...'; // lat/lon, etc.
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

const phpWeatherOtherApiImpl = `/** Autre fournisseur : autre URL, autre forme de JSON (ex. main.temp) */
final class OpenWeatherMapStyleProvider implements WeatherProviderInterface
{
    // ... __construct (clé API, baseUrl, etc.)

    public function getCurrentForCity(string $city): WeatherReport
    {
        $url = $this->baseUrl . "/data/2.5/weather?q={$city}&appid={$this->apiKey}&...";
        $json = file_get_contents($url);
        $data = json_decode($json, true);

        $main = $data['main'] ?? [];
        return new WeatherReport(
            city: $city,
            temperatureC: (float) ($main['temp'] ?? 0),
            humidityPct: (int) ($main['humidity'] ?? 0),
        );
    }
}`;

const phpPdoConnexion = `$pdo = new PDO(
    'mysql:host=db;dbname=app;charset=utf8mb4',
    '...',
    '...',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

// ... requête sur la diapo suivante`;

const phpPdoRequete = `// $pdo = ...

$stmt = $pdo->prepare(
    'SELECT id, name, price_cents FROM products WHERE id = :id'
);
$stmt->execute(['id' => 42]);

/** @var array<string, mixed>|false $row */
$row = $stmt->fetch(PDO::FETCH_ASSOC);
// ex. ['id' => '42', 'name' => '...', ...]`;

const phpHydrationChamps = `final class Product
{
    public function __construct(
        private int $id,
        private string $name,
        private int $priceCents,
    ) {}

    public function id(): int { return $this->id; }
    public function name(): string { return $this->name; }
    public function priceEuro(): float { return $this->priceCents / 100; }

    // ... voir diapo « fromRow() »
}`;

const phpHydrationFromRow = `final class Product
{
    // ... propriétés, constructeur, accesseurs

    public static function fromRow(array $row): self
    {
        return new self(
            (int) $row['id'],
            (string) $row['name'],
            (int) $row['price_cents'],
        );
    }
}`;

const phpRepositoryShell = `final class ProductRepository
{
    public function __construct(private PDO $pdo) {}

    // ... findById() sur la diapo suivante
}`;

const phpRepositoryFind = `final class ProductRepository
{
    // ... __construct

    public function findById(int $id): ?Product
    {
        $stmt = $this->pdo->prepare('...');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row === false) {
            return null;
        }

        return Product::fromRow($row);
    }
}`;

const phpControllerEntree = `$id = (int) ($_GET['id'] ?? 0);
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'id invalide']);
    exit;
}

// ... appel repository`;

const phpControllerRepo = `// $id est valide

$repo = new ProductRepository($pdo);
$product = $repo->findById($id);

if ($product === null) {
    http_response_code(404);
    echo json_encode(['error' => '...']);
    exit;
}

// ... réponse`;

const phpControllerReponse = `// $product : Product (domaine)

echo json_encode([
    'id' => $product->id(),
    'name' => $product->name(),
    'priceEuro' => $product->priceEuro(),
    // ... champs, format, en-têtes
]);`;

const phpFakeWeatherProvider = `final class FakeWeatherProvider implements WeatherProviderInterface
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
        heading="Exemple User — propriétés (constructeur promu)"
        code={phpUserProprietes}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="Une propriété = état de l'objet. Ici, propriétés privées injectées par le constructeur (PHP 8+). Les ... renvoient aux diapos suivantes."
      />

      <CodeSlide
        heading="Exemple User — constructeur"
        code={phpUserConstructeur}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="Le constructeur est l'endroit classique pour refuser un état incohérent dès l'instanciation. Les '...' dans les messages raccourcissent l'affichage."
      />

      <CodeSlide
        heading="Exemple User — méthodes (accesseurs + métier + mutation)"
        code={phpUserMethodes}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="Accesseurs, calcul (fullName/initials), règle sur changeEmail. Les ... indiquent du code non affiché pour tenir sur la slide."
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
          <ListItem>
            Si l'état est invalide (ex. e-mail rejeté au constructeur), on peut{" "}
            <strong>lever une exception</strong> (<code>InvalidArgumentException</code>
            ) : le créateur reçoit un signal d'erreur clair au lieu d'un objet tronqué.
          </ListItem>
        </UnorderedList>
        <Notes>
          Exemple oral : “email valide” / “prix non négatif” : les règles restent
          dans l'objet. Exception = refus explicite, à attraper plus haut si besoin.
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

      <MiraContentSlide heading="Classe abstraite (`abstract`)">
        <Text fontSize="2rem" marginBottom={16}>
          Une <strong>classe abstraite</strong> sert de modèle : on n’y crée
          pas d’objets directement avec <code>new NomDeLaClasseAbstraite</code>.
        </Text>
        <UnorderedList fontSize="1.9rem">
          <ListItem>
            Seules les <strong>classes filles</strong> concrètes sont
            instanciables (ex. <code>Book</code>, pas <code>CatalogItem</code> seul
            {")"}.
          </ListItem>
          <ListItem>
            Les méthodes <code>abstract</code> n’ont pas d’implémentation dans
            la mère : chaque enfant <strong>doit</strong> fournir le corps
            (ex. <code>displayName()</code>).
          </ListItem>
        </UnorderedList>
        <Notes>
          Lier à l’exemple boutique ci-dessous : <code>CatalogItem</code> = ce
          qui est commun, les types concrets = variantes.
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Héritage — boutique : `CatalogItem` (ce qui est commun)"
        code={phpInheritanceBase}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="Rappel diapo précédente : abstract, pas d’instance directe. displayName() oblige chaque type concret (livre, abonnement…) à préciser l’intitulé."
      />

      <CodeSlide
        heading="Héritage — `Book` extends `CatalogItem`"
        code={phpInheritanceProduct}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="parent::__construct() remplit id/titre/prix. Spécifique au livre : ISBN. Même filet qu’en base : d’autres classes pourraient extends CatalogItem (ex. Ebook, Abonnement)."
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
        <Notes>
          Point clé avant les exemples météo : « transformer des données brutes
          en objets métier » — chaque source a son format (JSON, ligne SQL) ;
          l’idée s’applique partout.
        </Notes>
      </MiraContentSlide>

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
        heading="Interface — contrat du provider"
        code={phpInterfaceContract}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="L'interface = ce qu'on peut demander, sans imposer l'API externe, la BDD, etc."
      />

      <CodeSlide
        heading="Objet de domaine — `WeatherReport` (DTO / valeur)"
        code={phpWeatherReportDto}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="readonly public = simple conteneur de données. En projet, on peut aussi tout passer en private + getters."
      />

      <MiraContentSlide heading="Même interface : input? output?">
        <Text fontSize="2rem" marginBottom={16}>
          <code>WeatherProviderInterface</code> fixe le <strong>contrat</strong> :{" "}
          même paramètre d'entrée (ex. <code>getCurrentForCity(string $city)</code>
          ) et <strong>le même type de retour</strong> : un <code>WeatherReport</code>.
        </Text>
        <UnorderedList fontSize="1.9rem">
          <ListItem>
            L'<strong>implémentation</strong> est libre d'aller lire l'API 1, l'API
            2, un cache, un fichier, etc. : chaque chemin a son format brut.
          </ListItem>
          <ListItem>
            À chaque fois, on <strong>adapte</strong> (parse JSON, noms de champs
            différents) pour produire <strong>le même</strong> objet métier.
          </ListItem>
        </UnorderedList>
        <Text fontSize="1.15rem" marginTop={14} color="#64748b">
          Les diapos de code qui suivent : deux API HTTP, puis une version{" "}
          <strong>fake</strong> (même interface, sans réseau) — une seule forme
          côté application.
        </Text>
        <Notes>
          Insister : entrée/sortie stables, « comment » caché dans chaque classe
          concrète. Faire le lien explicite API1 = structure JSON A, API2 = B, même
          WeatherReport.
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Impl. 1 — Open-Meteo"
        code={phpWeatherOpenMeteoImpl}
        language="php"
        showLineNumbers
        fontSize={15}
        notes="Premier choix d’intégration : HTTP + parse du JSON Open-Meteo. Les clés (current, temperature_2m) sont spécifiques à ce fournisseur."
      />

      <CodeSlide
        heading="Impl. 2 — OpenWeather"
        code={phpWeatherOtherApiImpl}
        language="php"
        showLineNumbers
        fontSize={15}
        notes="Même interface : autre base URL, autre requête, autre forme de réponse. On mappe main.temp / main.humidity vers le même WeatherReport. Nom OpenWeatherMapStyleProvider = explicite sans être le focus du code."
      />

      <CodeSlide
        heading="Impl. 3 — fake : tests / dev sans Internet"
        code={phpFakeWeatherProvider}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="Même contrat que les deux API : utile en local et pour les tests. Pas d'HTTP : données fixes ou paramétrables."
      />

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

      <MiraContentSlide heading="Arborescence type — requête → données → domaine → réponse" fullWidth>
        <Box
          marginTop={20}
          padding="20px 24px"
          style={{
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
            textAlign: "left",
            overflow: "auto",
          }}
        >
          <pre
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: "1.1rem",
              lineHeight: 1.55,
              margin: 0,
              color: "#0f172a",
              whiteSpace: "pre",
            }}
          >{`projet/
├── public/
│   └── index.php              ← point d'entrée HTTP
├── src/
│   ├── Http/Controllers/      ← routes, paramètres, orchestration
│   ├── Infrastructure/
│   │   └── Repositories/      ← DB / API / cache → hydratation
│   ├── Domain/                ← entités, règles métier
│   └── View/                  ← HTML (ou JSON émis par le contrôleur)
└── var/                       ← cache, logs, fichiers générés (optionnel)
`}</pre>
        </Box>
        <Text fontSize="1.1rem" marginTop={18} color="#4a5568">
          Idée centrale : le reste du code veut des <strong>objets métier</strong>,
          quelle que soit la source des données.
        </Text>
        <Notes>
          Parcourir l’arbre du haut vers le domaine, puis la réponse. Insister
          : <code>Repositories</code> = “zone de traduction” des lignes
          brutes → objets du domaine.
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="PDO — connexion (extrait)"
        code={phpPdoConnexion}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="Raccourci volontaire : identifiants en '...'. On active ERRMODE pour remonter les erreurs SQL clairement."
      />

      <CodeSlide
        heading="PDO — requête → tableau associatif"
        code={phpPdoRequete}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="FETCH_ASSOC : prêt à être transformé en objet métier (types souvent en string côté MySQL)."
      />

      <MiraContentSlide heading="Hydratation : de la ligne SQL à l’objet">
        <Text fontSize="2rem" marginBottom={16}>
          <strong>Hydratation</strong> = remplir un <strong>objet du domaine</strong> à partir
          de <strong>données brutes</strong> (souvent un tableau : ligne PDO, morceau de JSON,{" "}
          <code>$_POST</code>…).
        </Text>
        <UnorderedList fontSize="2rem">
          <ListItem>
            On choisit quelles clés du tableau vont dans quelles propriétés, et on{" "}
            <strong>convertit les types</strong> (ex. <code>(int)</code> car MySQL renvoie parfois
            des chaînes).
          </ListItem>
          <ListItem>
            Ça se fait en général <strong>à la lisière</strong> (repository, contrôleur) : le reste
            du code manipule un <code>Product</code>, pas un <code>array</code> anonyme.
          </ListItem>
        </UnorderedList>
        <Notes>
          Insister : “hydrater” = même idée qu’ailleurs (remplir un modèle), ici le terme
          qu’on croise en persistance / DDD léger. Enchaîner : d’abord la classe
          Product, la diapo sur <code>static</code> / <code>fromRow</code>, puis le
          code.
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Méthode statique : pourquoi `fromRow` ?">
        <Text fontSize="2rem" marginBottom={16}>
          Une <strong>méthode statique</strong> s’appelle sur le nom de la
          classe (<code>Product::fromRow($row)</code>), pas sur une instance déjà
          créée — utile pour <strong>fabriquer</strong> l’objet à partir d’un
          tableau.
        </Text>
        <UnorderedList fontSize="1.9rem">
          <ListItem>
            On <strong>centralise</strong> ici le mapping (clés, casts) : un
            seul endroit quand le schéma SQL ou les alias changent.
          </ListItem>
          <ListItem>
            C’est un patron courant (factory) : le reste du code appelle{" "}
            <code>fromRow</code> / le constructeur, sans répéter le détail de la
            ligne PDO.
          </ListItem>
        </UnorderedList>
        <Notes>
          Option avancée : constructeur <code>private</code> + seulement
          <code>fromRow</code> public — ici on garde un constructeur classique
          pour aller simple.
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Hydratation — l’objet `Product` (champs + accesseurs)"
        code={phpHydrationChamps}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="On sépare l'objet (domaine) de la source (ligne SQL). Les ... = suite du mapping."
      />

      <CodeSlide
        heading="Hydratation — `fromRow(array)` (factory statique)"
        code={phpHydrationFromRow}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="Point central : cast explicite (int/string) = conversion dès la lisière (tableau -> objet). Voir diapo précédente pour le rôle de static / factory."
      />

      <CodeSlide
        heading="Repository — rôle (dépend de PDO)"
        code={phpRepositoryShell}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="Le repository encapsule l'accès : il reçoit souvent le client BDD (PDO) au constructeur — injection de dépendance : on passe explicitement ce dont la classe a besoin, plutôt qu'un global caché. Le reste du code ne connaît pas le SQL ici-bas (démo sur la diapo suivante)."
      />

      <CodeSlide
        heading="Repository — `findById` → `Product` ou `null`"
        code={phpRepositoryFind}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="null = 'pas trouvé' : à gérer au niveau HTTP (404) dans le contrôleur."
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

      <MiraContentSlide heading="Même principe après SQL : `fromRow` = adapter comme un provider">
        <Text fontSize="2rem" marginBottom={16}>
          Une ligne PDO ou un JSON d'API ne sont <strong>pas</strong> le domaine
          tel quel : on <strong>adapte</strong> en un endroit —{" "}
          <code>fromRow</code> / repository pour la base, implémentations{" "}
          d'<strong>interface</strong> pour l'HTTP (vu plus haut : météo).
        </Text>
        <UnorderedList fontSize="1.9rem">
          <ListItem>
            Les données peuvent venir de : base, API, cache, fichier… Le reste du
            code travaille sur des <strong>objets</strong> stables.
          </ListItem>
          <ListItem>
            Conversions regroupées : <strong>repository</strong> /{" "}
            <strong>provider</strong> (vocabulaire « anti-corruption layer » en
            bonus seulement si utile).
          </ListItem>
        </UnorderedList>
        <Notes>
          Enchaîner vers l'orchestration : le contrôleur s'appuie sur ces couches,
          pas sur le format brut. ACL = vocabulaire bonus seulement si utile.
        </Notes>
      </MiraContentSlide>

      <CodeSlide
        heading="Orchestration — lecture / validation de l’entrée"
        code={phpControllerEntree}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="Étape 1 : on ne fait pas confiance à l'URL : id > 0. Erreur HTTP 400 si invalide."
      />

      <CodeSlide
        heading="Orchestration — repository + ressource introuvable"
        code={phpControllerRepo}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="Étape 2 : le domaine arrive via le repository. null => 404 (ressource absente)."
      />

      <CodeSlide
        heading="Orchestration — réponse (objet métier → JSON)"
        code={phpControllerReponse}
        language="php"
        showLineNumbers
        fontSize={16}
        notes="Étape 3 : on sérialise ce qu'on expose (ici, champs publics). ... = filtrer/formatter au besoin."
      />

      <MiraContentSlide heading="Bonnes pratiques (à ce niveau du cours)">
        <UnorderedList fontSize="1.9rem">
          <ListItem>
            Ne pas mettre du SQL dans un objet métier (<code>Product</code> ne
            doit pas “faire des requêtes”).
          </ListItem>
          <ListItem>
            Faire entrer les <strong>dépendances</strong> (ex.{" "}
            <code>new ProductRepository($pdo)</code>) par le{" "}
            <strong>constructeur</strong> : plus lisible qu’un <code>PDO</code>{" "}
            global caché, et plus facile à tester.
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
          Répéter : “responsabilités”, “transformer la donnée brute en domaine”,
          et “dépendances explicites” (même principe que pour le fake provider).
        </Notes>
      </MiraContentSlide>

      <MiraContentSlide heading="Récap — ce que tu dois retenir">
        <UnorderedList fontSize="1.9rem">
          <ListItem>
            POO : classes/objets, encapsulation, méthodes = règles métier
            (invalidité → <strong>exception</strong> possible).
          </ListItem>
          <ListItem>
            Héritage (dont <code>abstract</code>) + <strong>interfaces</strong>{" "}
            pour structurer et brancher des implémentations.
          </ListItem>
          <ListItem>
            Projet web : tableaux/JSON/PDO → on <strong>hydrate</strong> en
            objets (souvent <code>static</code> / <code>fromRow</code> en lisière).
          </ListItem>
          <ListItem>
            On isole les sources (DB/API) dans des classes dédiées
            (repositories / providers) avec dépendances <strong>explicites</strong>{" "}
            au besoin.
          </ListItem>
        </UnorderedList>
        <Notes>Transition possible : TP ou mini-projet API + DB.</Notes>
      </MiraContentSlide>
    </Deck>
  );
}

export default CoursPhpPoo;
