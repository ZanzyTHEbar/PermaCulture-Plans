// TODO: Port to Dino and server-side logic
// TODO: Port to a lib to be used in a dockerized dino environment

const prompt = require("prompt-sync")({ sigint: true });

export { };

interface PlantMetadata {
  name: string;
  maxAge: number;
  maxHeight: number;
  pollinatorAttractor: boolean;
  pestDetractor: boolean;
  biomassAccumulator: boolean;
  nitrogenFixer: boolean;
  chopAndDrop: boolean;
  hardinessZone: string;
}

interface StratumSpacingRule {
  stratum1: string;
  stratum2: string;
  minimumSpacing: number;
}

interface StratumSuccession {
  stratum: string;
  succession: string;
}

const stratumSpacingRules: StratumSpacingRule[] = [
  { stratum1: "Emergent", stratum2: "Emergent", minimumSpacing: 12 },
  { stratum1: "High", stratum2: "High", minimumSpacing: 9 },
  { stratum1: "Medium", stratum2: "Medium", minimumSpacing: 6 },
  { stratum1: "Low", stratum2: "Low", minimumSpacing: 3 },
  { stratum1: "Emergent", stratum2: "Medium", minimumSpacing: 2 },
  { stratum1: "High", stratum2: "Low", minimumSpacing: 2 },
  { stratum1: "Emergent", stratum2: "Low", minimumSpacing: 2 },
];

const stratumCategories = ["Emergent", "High", "Medium", "Low"];
const successionCategories = [
  "Climax / Secondary III",
  "Secondary II",
  "Secondary I",
  "Placental II",
  "Placental I",
];

const validHardinessZones = [
  "AA",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function generateConsortium(
  speciesList: PlantMetadata[],
  useHardinessZone: boolean = false
): { label: string; consortium: PlantMetadata[] }[] {
  const consortiums: { label: string; consortium: PlantMetadata[] }[] = [];

  const filteredSpeciesList = useHardinessZone
    ? filterSpeciesByHardinessZone(speciesList)
    : speciesList;

  if (filteredSpeciesList.length === 0) {
    console.log("No plants match your query");
    return [];
  }

  const groupedSpecies = groupSpecies(filteredSpeciesList);
  for (const group of groupedSpecies) {
    const consortium = createConsortium(group);
    if (consortium.length >= 3 && hasRequiredProperties(consortium)) {
      const label = getConsortiumLabel(group);
      consortiums.push({ label, consortium });
    }
  }

  return consortiums;
}

function getConsortiumLabel(speciesGroup: PlantMetadata[]): string {
  const stratumSuccession = getStratumSuccession(speciesGroup);
  return `${stratumSuccession.stratum} - ${stratumSuccession.succession} Consortium`;
}

function groupSpecies(speciesList: PlantMetadata[]): PlantMetadata[][] {
  const groups: PlantMetadata[][] = [];
  for (const stratum of stratumCategories) {
    for (const succession of successionCategories) {
      const group = speciesList.filter(
        (species) =>
          species.maxHeight <= getMaxHeightForStratum(stratum) &&
          belongsToSuccession(species, succession)
      );
      groups.push(group);
    }
  }

  return groups;
}

function getStratumSuccession(
  speciesGroup: PlantMetadata[]
): StratumSuccession {
  for (const stratum of stratumCategories) {
    for (const succession of successionCategories) {
      if (
        speciesGroup.every((species) =>
          belongsToSuccession(species, succession)
        )
      ) {
        return { stratum, succession };
      }
    }
  }

  return { stratum: "Unknown", succession: "Unknown" };
}

function getMaxHeightForStratum(stratum: string): number {
  switch (stratum) {
    case "Emergent":
      return 30;
    case "High":
      return 20;
    case "Medium":
      return 10;
    case "Low":
      return 5;
    default:
      return 0;
  }
}

function belongsToSuccession(
  species: PlantMetadata,
  succession: string
): boolean {
  if (succession === "Climax / Secondary III") {
    return species.maxAge >= 80;
  } else if (succession === "Secondary II") {
    return species.maxAge >= 30 && species.maxAge < 80;
  } else if (succession === "Secondary I") {
    return species.maxAge >= 2 && species.maxAge < 30;
  } else if (succession === "Placental II") {
    return species.maxAge >= 0.5 && species.maxAge < 2;
  } else if (succession === "Placental I") {
    return species.maxAge < 0.5;
  }

  return false;
}

function createConsortium(group: PlantMetadata[]): PlantMetadata[] {
  const consortium: PlantMetadata[] = [];

  for (const species of group) {
    if (consortium.length === 0 || hasRequiredProperties([species])) {
      consortium.push(species);
    }
  }

  return consortium;
}

function filterSpeciesByHardinessZone(
  speciesList: PlantMetadata[]
): PlantMetadata[] {
  const raw_answer = prompt("Enter the hardiness zone (e.g., Zone A): ");
  if (!raw_answer) {
    console.log("Please input a valid answer.");
    return [];
  }
  const answer = raw_answer.trim().split(" ")[1];
  const hardinessZone = answer.toUpperCase();
  return isValidHardinessZone(hardinessZone, speciesList);
}

function isValidHardinessZone(
  hardinessZone: string,
  speciesList: PlantMetadata[]
): PlantMetadata[] {
  // List of valid hardiness zones from the Wikipedia page

  if (hardinessZone.includes("-")) {
    // If the hardiness zone is specified as a range (e.g., Zone A-B)
    const [startZone, endZone] = hardinessZone
      .split("-")
      .map((zone) => zone.trim().toUpperCase());

    const startZoneIndex = validHardinessZones.indexOf(startZone);
    const endZoneIndex = validHardinessZones.indexOf(endZone);

    if (
      startZoneIndex !== -1 &&
      endZoneIndex !== -1 &&
      startZoneIndex <= endZoneIndex
    ) {
      // Check if the start zone index is less than or equal to the end zone index
      let newList: PlantMetadata[] = [];

      for (const species of speciesList) {
        const speciesZoneIndex = validHardinessZones.indexOf(
          species.hardinessZone
        );

        if (
          speciesZoneIndex !== -1 &&
          speciesZoneIndex >= startZoneIndex &&
          speciesZoneIndex <= endZoneIndex
        ) {
          newList.push(species);
        }
      }

      return newList;
    }
  } else {
    // If the hardiness zone is a single zone
    const isValidZone = validHardinessZones.includes(hardinessZone);
    if (isValidZone) {
      return speciesList.filter(
        (species) => species.hardinessZone === hardinessZone
      );
    }
  }

  console.log(
    "Your selection is not a valid Hardiness Zone or range of Hardiness Zones"
  );
  return [];
}

function hasRequiredProperties(consortium: PlantMetadata[]): boolean {
  for (const species of consortium) {
    if (
      species.pollinatorAttractor ||
      species.pestDetractor ||
      species.biomassAccumulator ||
      species.nitrogenFixer ||
      species.chopAndDrop
    ) {
      return true;
    }
  }

  return false;
}

// TODO: Implement spacing algorithm for cross-stratum rules based on succession rules
function calculateSpacing(stratum1: string, stratum2: string): number {
  const rule = stratumSpacingRules.find(
    (spacingRule) =>
      (spacingRule.stratum1 === stratum1 &&
        spacingRule.stratum2 === stratum2) ||
      (spacingRule.stratum1 === stratum2 && spacingRule.stratum2 === stratum1)
  );

  if (rule) {
    return rule.minimumSpacing;
  }

  return 0;
}


//* Example usage:
function getRandomPlantName(): string {
  const adjectives = [
    "Green",
    "Leafy",
    "Blooming",
    "Fragrant",
    "Delicate",
    "Exotic",
    "Spiraled",
    "Tropical",
    "Dainty",
    "Whimsical",
  ];

  const nouns = [
    "Orchid",
    "Fern",
    "Bonsai",
    "Cactus",
    "Lily",
    "Rose",
    "Palm",
    "Daisy",
    "Tulip",
    "Ivy",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

function generateRandomSpecies(): PlantMetadata {
  const species: PlantMetadata = {
    name: getRandomPlantName(),
    maxAge: Math.floor(Math.random() * 100),
    maxHeight: Math.floor(Math.random() * 30),
    pollinatorAttractor: Math.random() >= 0.5,
    pestDetractor: Math.random() >= 0.5,
    biomassAccumulator: Math.random() >= 0.5,
    nitrogenFixer: Math.random() >= 0.5,
    chopAndDrop: Math.random() >= 0.5,
    hardinessZone: [
      "AA",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ][Math.floor(Math.random() * 25)],
  };

  return species;
}

// generate species list
const speciesList: PlantMetadata[] = [];
for (let i = 0; i < 100; i++) {
  speciesList.push(generateRandomSpecies());
}
/**
 * @description This algorithm generates Syntropic Agroforestry Consortiums based on a provided list of species.
 * @note The algorithm takes a list of plant species with their required metadata and an optional flag to indicate whether to consider hardiness zones for sorting.
 * @note The algorithm first filters the species list based on the hardiness zone if enabled. Then it groups the species into categories based on stratum and succession.
 * @note After that, it creates consortiums by selecting species that meet the requirements.
 */
const consortiums = generateConsortium(speciesList, true);
for (const { label, consortium } of consortiums) {
  console.log(`${label}:`);
  console.log(consortium);
}
