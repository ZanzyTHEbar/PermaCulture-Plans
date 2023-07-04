# Syntropic Agroforestry

## Table of Contents

- [Syntropic Agroforestry](#syntropic-agroforestry)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Key Concepts](#key-concepts)
  - [Strata](#strata)
  - [Stages of Succession](#stages-of-succession)
  - [Consortium Rules](#consortium-rules)
    - [Spacing](#spacing)
    - [Group Rules](#group-rules)
      - [Sorting Species](#sorting-species)
      - [Sorting Groups](#sorting-groups)
    - [Algorithm](#algorithm)
  - [Planting Plan](#planting-plan)

## Introduction

- [Syntropic Agroforestry - Wiki](https://en.wikipedia.org/wiki/Syntropic_agriculture)

Syntropic Agroforestry is the process of growing a forest in a way that is beneficial to the whole forest system using the principles of succession.  This is in contrast to entropic, which is the process of growing a forest in a way that is detrimental to the forest, such as a mono-cropped orchard.

Developed by `Ernst Gulch`, Syntropic Agroforestry is driven by the power of the natural succession of living systems that are mutually beneficial to each other.  This is in contrast to the traditional agricultural model of growing a monoculture of a single crop.

Ultimately, the goal of a Syntropic Farming system is to evolve into a forest.

## Key Concepts

- Pruning
  - > **Note**: Done strategically
  - Stimulate growth
  - Increase yield
  - Create biomass for fertilizer
  - Create biomass for mulch (chips)
  - Maintain the balance of the system
- Cover Crop
  - > **Note**: Cover the Soil with organic matter
  - leaves
  - wood chips
  - sticks
  - logs
  - cardboard
  - paper
  - straw
  - Crops
    - Creeping Thyme
      - Ground cover
      - Attracts pollinators
- Plant Intelligent Groupings (Consortiums)
  - Groups of mutually beneficial plants with succession in mind
  - Example:
    - Banana
      - Large plant
      - Provides shade
      - Medium growing
      - Provides biomass
      - Provides mulch
      - Provides food
    - Cacao
      - Medium plant
      - Needs shade
      - Provides biomass
      - Provides mulch
      - Provides food
      - Slow growing
    - Tomato
      - Small plant
      - Needs sun
      - Provides biomass
      - Provides mulch
      - Provides food
      - Fast growing

## Strata

Stratification is the process of dividing the forest into layers.  Each layer has a different set of plants that live in that layer.  

The layers are governed by the amount of sunlight that reaches the layer, and thus the height of the plants in that layer. Taller trees are in the upper layers, and shorter plants are in the lower layers. Respective to their need for sunlight.

The layers are as follows:

- Emergent
  - > **Note**: The Emergent Strata is the tallest layer of the forest.
- High Canopy
  - > **Note**: The High Canopy Strata is the second tallest layer of the forest.
-Medium Canopy
  - > **Note**: The Medium Canopy Strata is the third tallest layer of the forest.
- Low Canopy
  - > **Note**: The Low Canopy Strata is the fourth tallest layer of the forest.

## Stages of Succession

In Syntropic Agroforestry, the trees that live and produce for more than `80 years` belong to the `Climax Stage` of succession.

However, we usually combine trees that belong to both `Climax and Secondary III` stages in tropical systems. These include softer timbers and fruit-producing trees that can live for over 30 years.

- Climax Stage
  - Trees that live and produce for more than 80 years
- Secondary III Stage
  - Softer timbers and fruit-producing trees that can live for over 30 years
- Secondary
  - live and produce in 2 to 30 years.
- Placental
  - > **Note**: However, the lifespans and needs of these plants can vary considerably. As a result, it is usually split into two distinct groups..
  - The Placenta Stage includes plants that produce in less than 2 years.
    - Placental II
      - plants with short life cycles between 6 months and 2 years. E.g., bananas, papayas, and many crops are considered staples.
    - Placental I
      - plants with short life cycles, up to 6 months. E.g., vegetables and most crops grown in market gardens.

## Consortium Rules

To plan, we need to choose our species, then create a sorting algorithm to sort the species into groups.  The groups will then be sorted into the consortiums.

Each consortium will have a set of rules that will be used to determine if a species is a good fit for the consortium.

To create an `intelligent consortium`, we need to understand how long each plant will remain productive in the system and the required ideal spacing to maximize photosynthesis.

The rules will be based on the following:

### Spacing

You should plant trees within the same stratification level with a minimum distance as follows:

| Stratum   | Sec. 3 / Climate (30yrs+)  |  Minimum Spacing  |
|   ---     |            ---             |        ---        |
|  Emergent |  Mahogany, Cedar Wood      |  12m              |
|  High     |  Coconut, Breadfruit, Mango, Jackfruit, Tamarind, Avocado                                  |  9m               |
|  Medium   |  Cashew, Mandarin          |  6m               |
|  Low      |  Coffee, Cocoa             |  3m               |

However, you should maintain about 7 feet (2 meters) between plants from different levels.

This spacing can be represented as follows:

| Stratum   | Stratum  |  Minimum Spacing  |
|   ---     |   ---    |        ---        |
|  Emergent |  Emergent|  12m              |
|  High     |  High    |  9m               |
|  Medium   |  Medium  |  6m               |
|  Low      |  Low     |  3m               |
|  Emergent |  Medium  |  2m               |
|  High     |  Low     |  2m               |
|  Emergent |  Low     |  2m               |

For example, you can plant Mango, Jackfruit, and Avocado `12m` away from each other `(High)`.

Then interplant with cocoa or coffee `(Low)`, spacing them about `2m` from the Mangoes, etc.

However, you will need to maintain at least `3m` between cocoa plants. `(Low To Low)`

> **Note**: You can plant Biomass Trees as close to `0.5m` apart from other plants.

### Group Rules

The following is a list of rules used to generate a consortium.

To generate a consortium, first we much sort the species we intend to use into groups.  The groups will then be sorted into the consortiums.

#### Sorting Species

All plants _must_ fall into _both_ of the following categories:

- Stratum
  - Emergent
  - High
  - Medium
  - Low
- Succession
  - Climax / Secondary III
  - Secondary
    - Secondary II
    - Secondary I
  - Placental
    - Placental II
    - Placental I

Sorting of the Strata and Succession categories will be done by the following rules:

- Max age of the plant
  - > **Note**: The max age of the plant will be used to determine the Succession category.
- Max height of the plant
  - > **Note**: The max height of the plant will be used to determine the Strata category.

#### Sorting Groups

Each plant is then sorted into the following groups based on input metadata:

- Pollinator Attractor
- Pest Detractor
- Biomass Accumulator
- Nitrogen Fixer
- Chop and Drop
- Hardiness Zone

### Algorithm

To feed the algorithm, we will need to create a list of species that we intend to use in the system.  The list will be used to generate a consortium. Each plant must come with the following metadata:

- Max age of the plant
- Max height of the plant
- Pollinator Attractor
- Pest Detractor
- Biomass Accumulator
- Nitrogen Fixer
- Chop and Drop
- Hardiness Zone

The algorithm will generate a consortium _ignoring_ the hardiness zone. Unless the option is enabled, then the hardiness zone will be used to sort all species into like hardiness-zones.

An algorithm will be used to sort the species into groups.  The algorithm will be based on the following rules:

> A single consortium _must_ have the following properties:

- 3 or more members
- All members _must_ have _at least_ one of the following properties:
  - Pollinator Attractor
  - Pest Detractor
  - Biomass Accumulator
  - Nitrogen Fixer
  - Chop and Drop
- Consortium members _must_ fall into one of the Strata categories, and one of the Succession categories.

## Planting Plan

- Consortium members _must_ be spaced according to the Stratum spacing rules.
