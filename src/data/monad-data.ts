const monadColors = {
  junk: "rgb(186, 186, 186)", // grey
  common: "rgb(168, 168, 168)", // light grey
  normal: "blue",
  intermediate: "rgb(69, 150, 255)", // light blue
  advanced: "rgb(50, 205, 219)", // cyan
  rare: "green",
  epic: "red",
  legendary: "orange",
  unique: "purple",
  growth: "#e2abac", // pink?
  quest: "gold",
  // BS colors below
  mana: "#382871",
  fire: "#FF7700",
  metal: "#838897",
  plant: "#777A44",
  water: "#2666b0",
  earth: "#be8354",
  lightning: "#ffd63d",
  ice: "#CDEBE1",
  cold: "#CDEBE1",
  wind: "#2ff289", //
  shadow: "#7B7A72",
  light: "#f1f1f1",
  sound: "#94fefc",
  toxic: "#4db560",
  time: "#592720",
  gravity: "#454A53",
  portal: "#8C06B1",
  spirit: "", // pearl?
  blood: "#880808",
  beast: "", // brown bear
  curse: "", // purple?
  mental: "", // opal ? 
  none: "",
}
const ranks = [
  "junk",
  "common",
  "normal",
  "intermediate",
  "advanced",
  "rare",
  "epic",
  "legendary",
  "unique",
  "growth",
  "quest",
]
declare type ratings =
  "junk" |
  "common" |
  "normal" |
  "intermediate" |
  "advanced" |
  "rare" |
  "epic" |
  "legendary" |
  "unique" |
  "growth" |
  "quest"
interface monadItem {
  // [key: string]: any // for production to make it shut up about adding stuff dynamicly
  category: string; // for sorting. So you have type: Weapon, category Dagger.
  name: string;
  description: string;
  image: string;
  rating: ratings;
  sellsFor: number; // buys for would be in shops data.
  long?: string; // Appears a the bottom of cards. Is the same as (description overwrites effect), but longer and overwrites description. Let's remove effect. Shows the price if shown in a shop. Should really make shop data then.
  note: string;
  0?: Partial<monadItem> | Partial<monadEquipmentItemData> | Partial<monadWeaponItemData> | Partial<monadFoodItemData> | Partial<monadBoneItemData> | Partial<monadPotionItemData> | Partial<monadReadableItemData> | Partial<monadOpenableItemData> | Partial<monadMiscItemData> | Partial<monadSetItemData>;
  1?: Partial<monadItem> | Partial<monadEquipmentItemData> | monadWeaponItemData | monadFoodItemData | monadBoneItemData | monadPotionItemData | monadReadableItemData | monadOpenableItemData | monadMiscItemData | monadSetItemData;
  2?: Partial<monadItem> | Partial<monadEquipmentItemData> | monadWeaponItemData | monadFoodItemData | monadBoneItemData | monadPotionItemData | monadReadableItemData | monadOpenableItemData | monadMiscItemData | monadSetItemData;
  3?: Partial<monadItem> | monadEquipmentItemData | monadWeaponItemData | monadFoodItemData | monadBoneItemData | monadPotionItemData | monadReadableItemData | monadOpenableItemData | monadMiscItemData | monadSetItemData;
  4?: Partial<monadItem> | Partial<monadEquipmentItemData> | monadWeaponItemData | monadFoodItemData | monadBoneItemData | monadPotionItemData | monadReadableItemData | monadOpenableItemData | monadMiscItemData | monadSetItemData;
  5?: Partial<monadItem> | Partial<monadEquipmentItemData> | monadWeaponItemData | monadFoodItemData | monadBoneItemData | monadPotionItemData | monadReadableItemData | monadOpenableItemData | monadMiscItemData | monadSetItemData;
  6?: Partial<monadItem> | Partial<monadEquipmentItemData> | monadWeaponItemData | monadFoodItemData | monadBoneItemData | monadPotionItemData | monadReadableItemData | monadOpenableItemData | monadMiscItemData | monadSetItemData;
  7?: Partial<monadItem> | Partial<monadEquipmentItemData> | monadWeaponItemData | monadFoodItemData | monadBoneItemData | monadPotionItemData | monadReadableItemData | monadOpenableItemData | monadMiscItemData | monadSetItemData;
  8?: Partial<monadItem> | Partial<monadEquipmentItemData> | monadWeaponItemData | monadFoodItemData | monadBoneItemData | monadPotionItemData | monadReadableItemData | monadOpenableItemData | monadMiscItemData | monadSetItemData;
  9?: Partial<monadItem> | Partial<monadEquipmentItemData> | monadWeaponItemData | monadFoodItemData | monadBoneItemData | monadPotionItemData | monadReadableItemData | monadOpenableItemData | monadMiscItemData | monadSetItemData;
  // For some spcific items that extend this one
  type: string;
  itemIDs?: (string | SynergyGroup)[];
  equipmentStats?: EquipStatPair[];
  stats?: monadStatPair;
  modifiers?: PlayerModifierData;
}
interface monadEquipmentItemData extends monadBaseEquipmentItemData {
  type: 'Equipment';
}
interface monadStats {
  [key: string]: Number // to take in all other keys added to stats but keeping number as the value. This would include damage to a spcific type of monster
  vitality?: Number
  endurance?: Number
  willpower?: Number
  magic?: Number
  strength?: Number
  dexterity?: Number
  sense?: Number
  charisma?: Number
  HP?: Number
  MP?: Number

  HPPerc?: Number
  MPPerc?: Number

  vitalityPerc?: Number
  endurancePerc?: Number
  willpowerPerc?: Number
  magicPerc?: Number
  strengthPerc?: Number
  dexterityPerc?: Number
  sensePerc?: Number
  charismaPerc?: Number

  physicalDamageReduction?: Number
  magicDamageReduction?: Number
  physicalDamageReductionPerc?: Number
  magicDamageReductionPerc?: Number
}
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]?: Number;
}

declare type monadStatKey = 'vitality' | 'endurance' | 'willpower' | 'magic' | 'strength' | 'dexterity' | 'sense' | 'charisma' | 'HP' | 'MP' | 'HPPerc' | 'MPPerc' | 'vitalityPerc' | 'endurancePerc' | 'willpowerPerc' | 'magicPerc' | 'strengthPerc' | 'dexterityPerc' | 'sensePerc' | 'charismaPerc' | 'physicalDamageReduction' | 'magicDamageReduction' | 'physicalDamageReductionPerc' | 'magicDamageReductionPerc' | 'manaRegenPerc';

declare type monadStatEquipmentKey = 'attackSpeed' | 'stabAttackBonus' | 'slashAttackBonus' | 'blockAttackBonus' | 'rangedAttackBonus' | 'magicAttackBonus' | 'meleeStrengthBonus' | 'rangedStrengthBonus' | 'magicDamageBonus' | 'meleeDefenceBonus' | 'rangedDefenceBonus' | 'magicDefenceBonus' | 'damageReduction' | 'summoningMaxhit';

const monadModifiers = ['ResistancePerc', 'DamageReductionPerc', 'CostPerc', 'SkillCooldownPerc']
type monadModifiersTypes = typeof monadModifiers[number];
const monadSpecies = ['demon', 'undead', 'animal', "SeaCreature", "MythicalCreature", "Elemental", "Human", "Dragon", "Orc", "Robot", "Goblin", "Elf"] as const;
type monadSpeciesTypes = typeof monadSpecies[number];
declare type monadSpeciesKey = `${monadSpeciesTypes}${monadModifiersTypes}`;
type monadSpeciesEvent = { kind: monadSpeciesKey };

const monadElements = ['lightning', 'wind', 'water', 'fire', 'ice', 'all'] as const;
type monadElementsTypes = typeof monadElements[number];
declare type monadElementsKey = `${monadElementsTypes}${monadModifiersTypes}`;
type monadElementsEvent = { kind: monadElementsKey };

type monadSpcificKeys = 'blockPerc' | 'controlUndead' | 'Enchanting' | 'SpellSpeed' | 'CriticalHitChance' | 'CriticalHitDamage' | 'diseaseResistance' | 'diseaseResistancePerc' | 'underwaterBreathing' | 'swimSpeed' | 'stealthInShadowsPerc' | 'controlPlants' | 'command';

type monadSpcificEvent = { kind: monadSpcificKeys };

type monadStatEvent = { kind: monadStatKey };
type monadStatEquipmentEvent = { kind: monadStatEquipmentKey };


declare type monadStatPair = EventConfig<monadStatEvent | monadStatEquipmentEvent | monadElementsEvent | monadSpeciesEvent | monadSpcificEvent>
interface monadBaseEquipmentItemData extends monadItem {
  // stats: monadStats;
  stats: monadStatPair;
  validSlots: SlotTypes[];
  occupiesSlots: SlotTypes[];
  equipRequirements: AnyRequirementData[];
  equipmentStats: EquipStatPair[];
  modifiers?: PlayerModifierData;
  enemyModifiers?: CombatModifierData;
  conditionalModifiers?: ConditionalModifierData[];
  specialAttacks?: string[];
  overrideSpecialChances?: number[];
  fightEffects?: string[];
  providedRunes?: IDQuantity[];
  ammoType?: AmmoType;
  consumesChargesOn?: GameEventMatcherData[];
  consumesOn?: GameEventMatcherData[];
  consumesItemOn?: {
    itemID: string;
    chance: number;
    matchers: GameEventMatcherData[];
  };
}

interface monadWeaponItemData extends monadBaseEquipmentItemData {
  type: 'Weapon';
  attackType: AttackType;
  ammoTypeRequired?: AmmoType;
}

interface monadFoodItemData extends monadItem {
  type: 'Food';
  healsFor: number;
}

interface monadBoneItemData extends monadItem {
  type: 'Bone';
  prayerPoints: number;
}

interface monadPotionItemData extends monadItem {
  type: 'Potion';
  modifiers: PlayerModifierData;
  charges: number;
  action: string;
  consumesOn: GameEventMatcherData[];
  tier?: Number
}

interface monadReadableItemData extends monadItem {
  type: 'Readable';
  modalID?: string;
  swalData?: ReadableItemSwalData;
}

interface monadOpenableItemData extends monadItem {
  type: 'Openable';
  dropTable: DropTableData[];
  keyItem?: IDQuantity;
}

interface monadMiscItemData extends monadItem {
  type: 'Misc';
  keyItem?: IDQuantity;
}

interface monadSetItemData extends Partial<monadBaseEquipmentItemData> {
  type: 'Set';
  itemIDs: (string | SynergyGroup)[];
  playerModifiers?: PlayerModifierData;
  enemyModifiers?: CombatModifierData;
  conditionalModifiers?: ConditionalModifierData[];
  equipmentStats?: EquipStatPair[];
}

interface monadItemList {
  [key: string]: monadItem | monadEquipmentItemData | monadWeaponItemData | monadFoodItemData | monadBoneItemData | monadPotionItemData | monadReadableItemData | monadOpenableItemData | monadMiscItemData | monadSetItemData;
}

export declare type AnyMonadItemData = monadItem | monadEquipmentItemData | monadWeaponItemData | monadFoodItemData | monadBoneItemData | monadPotionItemData | monadReadableItemData | monadOpenableItemData | monadMiscItemData | monadSetItemData;

export const ItemList: monadItemList = {
  // Each item can be enchanted by level / 10. That is how you increase the stats, not an automatic increase.
  "Training Health Potion": {
    type: "Potion",
    name: "Training Health Potion",
    description: "Recovers 1HP every 5 seconds for the next 120 seconds.", // 24 HP
    image: "img/BloodPotion.png",
    long: "¤1", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    rating: "junk",
    category: "Potion",
    // Melvor
    "modifiers": {
      // "increasedHealEvery200Int": 1
    },
    "charges": 5,
    "tier": 0,
    "action": "melvorD:Combat",
    "consumesOn": [
      {
        "type": "PlayerAttack"
      }
    ]
  },
  "Soul bound wand": {
    name: "Soul bound wand",
    description: "Third Eye (active skill). Control minion: +1, sense: +1,",
    image: "https://ottotsuma.github.io/images/items/wand1.png",
    long: "¤3,200,000", // Price since it was shown In a shop.
    rating: "normal",
    stats: { sense: 1, attackSpeed: 2600 },
    note: "",
    sellsFor: 3200000,
    type: "Weapon",
    "category": "wand",
    attackType: "magic",
    // melvor
    validSlots: ["Weapon"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {
      "increasedSummoningMaxHit": 100
    },
    enemyModifiers: {},
    equipmentStats: [
      {
        "key": "stabAttackBonus",
        "value": 0
      },
      {
        "key": "slashAttackBonus",
        "value": 0
      },
      {
        "key": "blockAttackBonus",
        "value": 0
      },
      {
        "key": "rangedAttackBonus",
        "value": 0
      },
      {
        "key": "magicAttackBonus",
        "value": 40
      },
      {
        "key": "meleeStrengthBonus",
        "value": 0
      },
      {
        "key": "rangedStrengthBonus",
        "value": 0
      },
      {
        "key": "magicDamageBonus",
        "value": 60
      },
      {
        "key": "meleeDefenceBonus",
        "value": 0
      },
      {
        "key": "rangedDefenceBonus",
        "value": 0
      },
      {
        "key": "magicDefenceBonus",
        "value": 0
      },
      {
        "key": "damageReduction",
        "value": 1
      },
      {
        "key": "summoningMaxhit",
        "value": 100
      },
      {
        "key": "attackSpeed",
        "value": 2600
      }
    ],
  },
  "Bone Lance": {
    name: "Bone Lance",
    description: "",
    image:
      "https://ottotsuma.github.io/images/people/2d7002b02e419fb5cca7be2ec8e9f755.jpg",
    long: "", // Price since it was shown In a shop.
    rating: "normal",
    stats: {},
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Weapon",
    "attackType": "melee",
    // melvor
    validSlots: ["Weapon"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {
      "increasedMeleeMaxHitFlat": 1
    },
    enemyModifiers: {},
    "equipmentStats": [
      {
        "key": "stabAttackBonus",
        "value": 26
      },
      {
        "key": "slashAttackBonus",
        "value": -4
      },
      {
        "key": "blockAttackBonus",
        "value": 26
      },
      {
        "key": "rangedAttackBonus",
        "value": 0
      },
      {
        "key": "magicAttackBonus",
        "value": 0
      },
      {
        "key": "meleeStrengthBonus",
        "value": 0
      },
      {
        "key": "rangedStrengthBonus",
        "value": 0
      },
      {
        "key": "magicDamageBonus",
        "value": 0
      },
      {
        "key": "meleeDefenceBonus",
        "value": 0
      },
      {
        "key": "rangedDefenceBonus",
        "value": 0
      },
      {
        "key": "magicDefenceBonus",
        "value": 0
      },
      {
        "key": "damageReduction",
        "value": 0
      },
      {
        "key": "summoningMaxhit",
        "value": 0
      },
      {
        "key": "attackSpeed",
        "value": 3000
      }
    ]
  },
  "Trainee Bone Spear": {
    name: "Trainee Bone Spear",
    description: "Tiny increase in spear proficiency when equipped.",
    image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg4.wikia.nocookie.net%2F__cb20100812144340%2Frunescape%2Fimages%2F4%2F43%2FBone_spear_detail.png",
    long: "", // Price since it was shown In a shop.
    rating: "junk",
    stats: {},
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Weapon",
    "attackType": "melee",
    // melvor

    validSlots: ["Weapon"],
    occupiesSlots: [], // "Shield" if two handed
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
    "equipmentStats": [
      {
        "key": "stabAttackBonus",
        "value": 26
      },
      {
        "key": "slashAttackBonus",
        "value": -4
      },
      {
        "key": "blockAttackBonus",
        "value": 26
      },
      {
        "key": "rangedAttackBonus",
        "value": 0
      },
      {
        "key": "magicAttackBonus",
        "value": 0
      },
      {
        "key": "meleeStrengthBonus",
        "value": 0
      },
      {
        "key": "rangedStrengthBonus",
        "value": 0
      },
      {
        "key": "magicDamageBonus",
        "value": 0
      },
      {
        "key": "meleeDefenceBonus",
        "value": 0
      },
      {
        "key": "rangedDefenceBonus",
        "value": 0
      },
      {
        "key": "magicDefenceBonus",
        "value": 0
      },
      {
        "key": "damageReduction",
        "value": 0
      },
      {
        "key": "summoningMaxhit",
        "value": 0
      },
      {
        "key": "attackSpeed",
        "value": 3000
      }
    ]
  },
  "Paladin Engeler's Body Armour (silver rank)": {
    name: "Paladin Engeler's Body Armour (silver rank)",
    description:
      "Reduces physical damage taken by 10%, except spears. Endurance +1, Endurance +10%.",
    rating: "epic",
    stats: { endurance: 1, endurancePerc: 10, physicalDamageReduction: 10 },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    image: "https://ottotsuma.github.io/images/people/w1.jpg",
    // melvor
    "equipmentStats": [
      {
        "key": "magicDefenceBonus",
        "value": 50
      },
      {
        "key": "rangedDefenceBonus",
        "value": 250
      },
      {
        "key": "meleeDefenceBonus",
        "value": 250
      },
      {
        "key": "damageReduction",
        "value": 10
      },
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Platebody"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {
    },
    enemyModifiers: {}
  },
  "Paladin Engeler's Sallet (silver rank)": {
    name: "Paladin Engeler's Sallet (silver rank)",
    description: "Endurance +1.8.",
    rating: "epic",
    stats: { endurance: 1.8 },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    image: "https://ottotsuma.github.io/images/people/w1.jpg",
    // melvor
    "equipmentStats": [
      {
        "key": "magicDefenceBonus",
        "value": 15
      },
      {
        "key": "rangedDefenceBonus",
        "value": 95
      },
      {
        "key": "meleeDefenceBonus",
        "value": 95
      },
      {
        "key": "damageReduction",
        "value": 10
      },

      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Helmet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Paladin Engeler's Gauntlets (silver rank)": {
    name: "Paladin Engeler's Gauntlets (silver rank)",
    description: "Endurance +1.",
    rating: "epic",
    stats: { endurance: 1 },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    image: "https://ottotsuma.github.io/images/people/w1.jpg",
    // melvor
    "equipmentStats": [
      {
        "key": "magicDefenceBonus",
        "value": 15
      },
      {
        "key": "rangedDefenceBonus",
        "value": 12
      },
      {
        "key": "meleeDefenceBonus",
        "value": 12
      },
      {
        "key": "damageReduction",
        "value": 10
      }
    ],
    validSlots: ["Gloves"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Paladin Engeler's Sabaton (silver rank)": {
    name: "Paladin Engeler's Sabaton (silver rank)",
    description: "Endurance +1.2.",
    rating: "epic",
    stats: { endurance: 1.2 },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    image: "https://ottotsuma.github.io/images/people/w1.jpg",
    // melvor
    "equipmentStats": [
      {
        "key": "magicDefenceBonus",
        "value": 15
      },
      {
        "key": "rangedDefenceBonus",
        "value": 30
      },
      {
        "key": "meleeDefenceBonus",
        "value": 30
      },
      {
        "key": "damageReduction",
        "value": 10
      },
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Boots"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Paladin Engeler's Mace (silver rank)": {
    name: "Paladin Engeler's Mace (silver rank)",
    description: "Strength +3.",
    rating: "epic",
    stats: { strength: 3, strengthPerc: 1 },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Weapon",
    image: "https://ottotsuma.github.io/images/people/w1.jpg",
    "attackType": "melee",
    // melvor
    "equipmentStats": [
      {
        "key": "attackSpeed",
        "value": 3200
      },
      {
        "key": "stabAttackBonus",
        "value": 10
      },
      {
        "key": "slashAttackBonus",
        "value": 10
      },
      {
        "key": "blockAttackBonus",
        "value": 160
      },
      {
        "key": "meleeStrengthBonus",
        "value": 300
      },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Weapon"],
    occupiesSlots: [], // "Shield" if two handed
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Paladin Engeler's Shield (silver rank)": {
    name: "Paladin Engeler's Shield (silver rank)",
    description:
      "Threat increased 20%, Reduce received damage from Demons by 7%, Reduce received damage from Undead by 7%, chance to block 20%.",
    rating: "epic",
    stats: { "demonDamageReductionPerc": 7, undeadDamageReductionPerc: 7, blockPerc: 20, meleeDefenceBonus: 100, rangedDefenceBonus: 100 },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    image: "https://ottotsuma.github.io/images/people/w1.jpg",
    // melvor
    "equipmentStats": [
      {
        "key": "meleeDefenceBonus",
        "value": 310
      },
      {
        "key": "rangedDefenceBonus",
        "value": 210
      },
      {
        "key": "magicDefenceBonus",
        "value": 30
      },
      {
        "key": "damageReduction",
        "value": 10
      },
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Shield"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Paladin Engeler's Cape (silver rank)": {
    name: "Paladin Engeler's Cape (silver rank)",
    description: "Increase HP by 315, Increase MP by 225.",
    rating: "epic",
    stats: { HP: 315, MP: 225 },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    image: "https://ottotsuma.github.io/images/people/w1.jpg",
    // melvor
    "equipmentStats": [
      {
        "key": "magicDefenceBonus",
        "value": 80
      },
      {
        "key": "meleeDefenceBonus",
        "value": 80
      },
      {
        "key": "rangedDefenceBonus",
        "value": 80
      },
      {
        "key": "slashAttackBonus",
        "value": 40
      },
      {
        "key": "blockAttackBonus",
        "value": 40
      },
      {
        "key": "stabAttackBonus",
        "value": 40
      },
      {
        "key": "meleeStrengthBonus",
        "value": 20
      },

      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Cape"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
    1: {
      description: "Increase HP by 32, Increase MP by 23.",
      stats: { HP: 32, MP: 23 },
      type: "Equipment",
    }
  },
  "Demon Hunter Necklace": {
    name: "Demon Hunter Necklace",
    description:
      "Reduces physical damage taken by 15, Reduces magical damage taken by 17, Reduce received damage from Demons by 3%",
    rating: "epic",
    stats: {
      physicalDamageReduction: 15,
      magicDamageReduction: 17,
      demonDamageReductionPerc: 3
    },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Faa%2Fce%2F84%2Faace8423095c3544a43b45708415ed82.png",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Amulet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Demon Hunter Bracelet": {
    name: "Demon Hunter Bracelet",
    description:
      "Reduces physical damage taken by 15, Reduces magical damage taken by 17, Reduce received damage from Demons by 3%",
    rating: "epic",
    stats: {
      "physicalDamageReduction": 15,
      "magicDamageReductionPerc": 17,
      "demonDamageReductionPerc": 3, // "1.03 This change will require "stats" code changes"
    },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Faa%2F43%2Fb9%2Faa43b99db20d309cdb7389b15cab69cc.png",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Ring", "Passive"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Demon Hunter Earing": {
    name: "Demon Hunter Earing",
    description:
      "Reduces physical damage taken by 15, Reduces magical damage taken by 17, Reduce received damage from Demons by 3%",
    stats: {
      "physicalDamageReduction": 15,
      "magicDamageReductionPerc": 17,
      "demonDamageReductionPerc": 3, // "1.03 This change will require "stats" code changes"
    },
    rating: "epic",
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fdress-up%2F200%2Fdress_ear_earrings_jewel_rings-512.png",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Ring", "Passive"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Demon Hunter Ring": {
    name: "Demon Hunter Ring",
    description:
      "Reduces physical damage taken by 15, Reduces magical damage taken by 17, Reduce received damage from Demons by 3%",
    stats: {
      "physicalDamageReduction": 15,
      "magicDamageReductionPerc": 17,
      "demonDamageReductionPerc": 3, // "1.03 This change will require "stats" code changes"
    },
    rating: "epic",
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0201%2F1744%2Fproducts%2FStrata.Wide.Realtree.GreenOrange.Angle.png",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Ring", "Passive"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Paladin Engeler's Set (3/7)": {
    name: "Paladin Engeler's Set",
    description: "HP + 217.0, endurance + 1",
    rating: "epic",
    stats: { endurance: 1, HP: 217 },
    1: {
      description: "HP + 22, endurance + 1",
      stats: { endurance: 1, HP: 22 }
    },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Set",
    itemIDs: ["Paladin Engeler's Body Armour (silver rank)", "Paladin Engeler's Sabaton (silver rank)", "Paladin Engeler's Sallet (silver rank)"],
    validSlots: [],
    occupiesSlots: []
  },
  "Paladin Engeler's Set (4/7)": {
    name: "Paladin Engeler's Set",
    description: "Crit Rate: +1, Critical Damage: +3%.",
    rating: "epic",
    stats: { CriticalHitChance: 1, CriticalHitDamage: 3 },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Set",
    itemIDs: ["Paladin Engeler's Body Armour (silver rank)", "Paladin Engeler's Sabaton (silver rank)", "Paladin Engeler's Sallet (silver rank)", "Paladin Engeler's Gauntlets (silver rank)"],
    validSlots: [],
    occupiesSlots: []
  },
  "Paladin Engeler's Set (7/7)": {
    name: "Paladin Engeler's Set",
    description:
      "Skill: One of the Twelve; Increases all stats by 12% for 7 seconds.",
    rating: "epic",
    stats: {},
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Set",
    itemIDs: ["Paladin Engeler's Body Armour (silver rank)", "Paladin Engeler's Sabaton (silver rank)", "Paladin Engeler's Sallet (silver rank)", "Paladin Engeler's Gauntlets (silver rank)", "Paladin Engeler's Cape (silver rank)", "Paladin Engeler's Shield (silver rank)", "Paladin Engeler's Mace (silver rank)"],
    validSlots: [],
    occupiesSlots: []
  },
  "Toads Skin Jacket": {
    name: "Toads Skin Jacket",
    description: "Has a small chance to poison on contact, dexterity +1.",
    image:
      "https://ffxiv.gamerescape.com/w/images/7/70/Model-Toadskin_Jacket-Male-Hyur.png",
    rating: "normal",
    stats: { dexterity: 1 },
    long: "", // Price since it was shown In a shop.
    note: "https://ffxiv.gamerescape.com/wiki/Category:Rogue_Body/iLevel_30-39",
    type: "Equipment",
    sellsFor: 1,
    "category": "Combat",
    // melvor
    "equipmentStats": [
      {
        "key": "stabAttackBonus",
        "value": 3
      },
      {
        "key": "slashAttackBonus",
        "value": 3
      },
      {
        "key": "blockAttackBonus",
        "value": 3
      },
      {
        "key": "magicAttackBonus",
        "value": 3
      },
      {
        "key": "magicDamageBonus",
        "value": 0
      },
      {
        "key": "rangedAttackBonus",
        "value": 3
      },
      {
        "key": "rangedStrengthBonus",
        "value": 0
      },
      {
        "key": "meleeStrengthBonus",
        "value": 3
      },
      {
        "key": "meleeDefenceBonus",
        "value": 3
      },
      {
        "key": "rangedDefenceBonus",
        "value": 3
      },
      {
        "key": "magicDefenceBonus",
        "value": 3
      },
      {
        "key": "damageReduction",
        "value": 0
      },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Platebody"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Crown of the Dammed": {
    name: "Crown of the Dammed",
    description: "Magic + 25, -5 Charisma, control undead +1.",
    image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg4.wikia.nocookie.net%2F__cb20120612154312%2Felderscrolls%2Fimages%2F4%2F42%2FBonecrowngo.png",
    rating: "rare",
    stats: { magic: 25, charisma: -5, controlUndead: 1 },
    long: "", // Price since it was shown In a shop.
    note: "Ch5, kings crown",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "damageReduction",
        "value": 4
      },
      {
        "key": "rangedDefenceBonus",
        "value": 10
      },
      {
        "key": "magicDefenceBonus",
        "value": 10
      },
      {
        "key": "meleeDefenceBonus",
        "value": 10
      },
      {
        "key": "rangedAttackBonus",
        "value": -10
      },
      {
        "key": "magicAttackBonus",
        "value": 10
      },

      
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Helmet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}, sellsFor: 1,
    "category": "Combat",
  },
  "Ring of initial undead control": {
    name: "Ring of initial undead control",
    description: "mag + 10, Control undead +1.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fthe-bloodied-goats%2Fimages%2F2%2F2b%2FNecromanticRing_01.png",
    rating: "normal",
    stats: { magic: 10, controlUndead: 1 },
    long: "", // Price since it was shown In a shop.
    note: "Ch5, kings ring",
    type: "Equipment",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Ring"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}, sellsFor: 1,
    "category": "Combat",
  },
  "Ring of Little Strength": {
    name: "Ring of Little Strength",
    description: "Strength +1.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdemonssouls.wiki.fextralife.com%2Ffile%2FDemons-Souls%2Fring_of_great_strength_ring_demon%27s_souls_wiki_guide234px.png",
    rating: "junk",
    stats: { strength: 1 },
    long: "", // Price since it was shown In a shop.
    note: "Ch11, queens ring",
    type: "Equipment",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Ring"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}, sellsFor: 1,
    "category": "Combat",
  },
  "Pendent of Medium Magic": {
    name: "Pendent of Medium Magic",
    description: "magic +2, strength -1.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F6d%2F67%2F34%2F6d6734a47795c57393d8722de88a02d3.png",
    rating: "normal",
    stats: { strength: -1, magic: 2 },
    long: "", // Price since it was shown In a shop.
    note: "Ch11",
    type: "Equipment",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Amulet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}, sellsFor: 1,
    "category": "Combat",
  },
  "Witches Hat": {
    name: "Witches Hat",
    description: "magic +30.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fhalloween-4%2F60%2Fhalloween_hat_witch-1024.png",
    rating: "normal",
    stats: { magic: 30 },
    long: "", // Price since it was shown In a shop.
    note: "Ch11",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "damageReduction",
        "value": 4
      },
      {
        "key": "rangedDefenceBonus",
        "value": 10
      },
      {
        "key": "magicDefenceBonus",
        "value": 10
      },
      {
        "key": "meleeDefenceBonus",
        "value": 10
      },
      {
        "key": "slashAttackBonus",
        "value": 10
      },
      {
        "key": "stabAttackBonus",
        "value": 10
      },
      {
        "key": "rangedAttackBonus",
        "value": -10
      },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Helmet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}, sellsFor: 1,
    "category": "Combat",
  },
  "Queen's Pawn": {
    name: "Queen's Pawn",
    description: "Skill: Animate stone.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipground.com%2Fimages%2Fqueen-chess-piece-png-5.png",
    rating: "rare",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "Ch11, Tiara",
    type: "Equipment",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Passive"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
    specialAttacks: ['monad:AnimateStone'],
    overrideSpecialChances: [15], sellsFor: 1,
    "category": "Combat",
  },
  "Skull of victim": {
    name: "Skull of victim",
    description: "Control undead +2.",
    stats: { controlUndead: 2 },
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2FoHigspi.jpg",
    rating: "normal",
    long: "", // Price since it was shown In a shop.
    note: "Ch11, Skull",
    type: "Equipment",
    sellsFor: 1,
    "category": "Combat",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Passive"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Enchanting Quill": {
    name: "Enchanting Quill",
    description: "Enchanting chance of success + 5%.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F4d%2Fea%2Fa3%2F4deaa39ea2c9b61448246b35d9208b62.jpg",
    stats: { Enchanting: 5 },
    rating: "normal",
    sellsFor: 1,
    "category": "Combat",
    long: "", // Price since it was shown In a shop.
    note: "Ch11, Quill",
    type: "Equipment",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Weapon"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Princesses Coin": {
    name: "Princesses Coin",
    description: "(???).",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thirdwayindustries.com%2Fwp-content%2Fuploads%2F2021%2F03%2Ftales_coin_princess.png",
    rating: "junk",
    sellsFor: 1,
    "category": "Combat",
    long: "", // Price since it was shown In a shop.
    note: "Ch11, Coin",
    type: "Misc",
  },
  "necklace made of teeth": {
    name: "necklace made of teeth",
    description: "(???).",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fclubpenguin%2Fimages%2F7%2F70%2FToothy_Necklace.png",
    rating: "junk",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "Ch17",
    type: "Equipment",
    sellsFor: 1,
    "category": "Combat",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Amulet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Black scarf": {
    name: "Black scarf",
    description: "Hides users identity.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpurepng.com%2Fpublic%2Fuploads%2Flarge%2Fpurepng.com-heather-black-scarfscarfscarvesfabricwarmthfashionclipartheatherblack-1421526411611eyqmx.png",
    rating: "junk",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Amulet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Whale Skin": {
    name: "Whale Skin",
    description: "Coating boats to go faster.",
    image: "https://i.redd.it/eyoqcw8tm0u21.png",
    rating: "normal",
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Misc",
  },
  "Linen Halfgloves": {
    name: "Linen Halfgloves",
    description: "Dexterity +1.",
    image:
      "https://ffxiv.gamerescape.com/w/images/9/9a/Model-Linen_Halfgloves-Male-Hyur.png",
    rating: "junk",
    stats: { dexterity: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "damageReduction",
        "value": 4
      },
      {
        "key": "rangedDefenceBonus",
        "value": 10
      },
      {
        "key": "magicDefenceBonus",
        "value": 10
      },
      {
        "key": "meleeDefenceBonus",
        "value": 10
      },
      {
        "key": "slashAttackBonus",
        "value": 10
      },
      {
        "key": "stabAttackBonus",
        "value": 10
      },
      {
        "key": "rangedAttackBonus",
        "value": -10
      }
    ],
    validSlots: ["Gloves"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Battlemage's Gloves": {
    name: "Battlemage's Gloves",
    description: "Magic +1, Willpower: +1, Spell Speed: +1%.",
    image:
      "https://ffxiv.gamerescape.com/w/images/9/9a/Model-Linen_Halfgloves-Male-Hyur.png",
    rating: "normal",
    stats: { magic: 1, willpower: 1, SpellSpeed: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "damageReduction",
        "value": 4
      },
      {
        "key": "rangedDefenceBonus",
        "value": 10
      },
      {
        "key": "magicDefenceBonus",
        "value": 10
      },
      {
        "key": "meleeDefenceBonus",
        "value": 10
      },
      {
        "key": "slashAttackBonus",
        "value": 10
      },
      {
        "key": "stabAttackBonus",
        "value": 10
      },
      {
        "key": "rangedAttackBonus",
        "value": -10
      },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Gloves"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Battlemage's Hat": {
    name: "Battlemage's Hat",
    description: "Magic +1, Willpower: +1, Spell Speed: +1%.",
    image:
      "https://ffxiv.gamerescape.com/w/images/3/34/Model-Battlemage%27s_Hat-Male-Hyur.png",
    rating: "normal",
    stats: { magic: 1, willpower: 1, SpellSpeed: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "damageReduction",
        "value": 4
      },
      {
        "key": "rangedDefenceBonus",
        "value": 10
      },
      {
        "key": "magicDefenceBonus",
        "value": 10
      },
      {
        "key": "meleeDefenceBonus",
        "value": 10
      },
      {
        "key": "slashAttackBonus",
        "value": 10
      },
      {
        "key": "stabAttackBonus",
        "value": 10
      },
      {
        "key": "rangedAttackBonus",
        "value": -10
      },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Helmet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Battlemage's Robe": {
    name: "Battlemage's Robe",
    description: "Magic +1, Willpower: +1, Spell Speed: +1%.",
    image:
      "https://ffxiv.gamerescape.com/w/images/6/63/Model-Battlemage%27s_Robe-Male-Hyur.png",
    rating: "normal",
    stats: { magic: 1, willpower: 1, SpellSpeed: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "magicDamageBonus",
        "value": 5
      },
      {
        "key": "magicAttackBonus",
        "value": 30
      },
      {
        "key": "magicDefenceBonus",
        "value": 30
      },
      {
        "key": "damageReduction",
        "value": 5
      },
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Platebody"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Battlemage's Crakows": {
    name: "Battlemage's Crakows",
    description: "Magic +1, Willpower: +1, Spell Speed: +1%.",
    image:
      "https://ffxiv.gamerescape.com/w/images/0/0c/Model-Battlemage%27s_Crakows-Male-Hyur.png",
    rating: "normal",
    stats: { magic: 1, willpower: 1, SpellSpeed: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "damageReduction",
        "value": 4
      },
      {
        "key": "rangedDefenceBonus",
        "value": 10
      },
      {
        "key": "magicDefenceBonus",
        "value": 10
      },
      {
        "key": "meleeDefenceBonus",
        "value": 10
      },
      {
        "key": "slashAttackBonus",
        "value": 10
      },
      {
        "key": "stabAttackBonus",
        "value": 10
      },
      {
        "key": "rangedAttackBonus",
        "value": -10
      },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Boots"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Battlemage's Breeches": {
    name: "Battlemage's Breeches",
    description: "Magic +1, Willpower: +1, Spell Speed: +1%.",
    image:
      "https://ffxiv.gamerescape.com/w/images/2/2e/Model-Battlemage%27s_Breeches-Male-Hyur.png",
    rating: "normal",
    stats: { magic: 1, willpower: 1, SpellSpeed: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "magicDamageBonus",
        "value": 5
      },
      {
        "key": "magicAttackBonus",
        "value": 30
      },
      {
        "key": "magicDefenceBonus",
        "value": 30
      },
      {
        "key": "damageReduction",
        "value": 5
      },
      
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Platelegs"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Battlemage's Set (5/5)": {
    name: "Battlemage's Set (5/5)",
    description: "Magic +1, Willpower: +1, Spell Speed: +1%.",
    rating: "normal",
    stats: { magic: 1, willpower: 1, SpellSpeed: 1 },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Set",
    itemIDs: ["Battlemage's Gloves", "Battlemage's Hat", "Battlemage's Robe", "Battlemage's Crakows", "Battlemage's Breeches"],
  },
  "Cotton Scarf": {
    name: "Cotton Scarf",
    description: "",
    image:
      "https://ffxiv.gamerescape.com/w/images/a/a1/Model-Cotton_Scarf-Male-Hyur.png",
    rating: "junk",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Amulet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Rayndr Jackboots": {
    name: "Rayndr Jackboots",
    description: "Critical hit rate: +1, Endurance: +1.",
    image:
      "https://ffxiv.gamerescape.com/w/images/2/23/Model-Qarn_Jackboots-Male-Hyur.png",
    rating: "normal",
    stats: { endurance: 1, CriticalHitChance: +1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "damageReduction",
        "value": 4
      },
      {
        "key": "rangedDefenceBonus",
        "value": 10
      },
      {
        "key": "magicDefenceBonus",
        "value": 10
      },
      {
        "key": "meleeDefenceBonus",
        "value": 10
      },
      {
        "key": "slashAttackBonus",
        "value": 10
      },
      {
        "key": "stabAttackBonus",
        "value": 10
      },
      {
        "key": "rangedAttackBonus",
        "value": -10
      }
    ],
    validSlots: ["Boots"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Rogue's Ring": {
    name: "Rogue's Ring",
    description: "Critical hit rate: +1, Dexterity: +1.",
    image:
      "https://ffxiv.gamerescape.com/w/images/thumb/0/05/Model-Rogue%27s_Ring.png/450px-Model-Rogue%27s_Ring.png",
    rating: "normal",
    stats: { dexterity: 1, CriticalHitChance: 1 },
    long: "", // Price since it was shown In a shop.
    note: "https://ffxiv.gamerescape.com/wiki/Category:Ring/iLevel_30-39",
    type: "Equipment",
    sellsFor: 1,
    "category": "Combat",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Ring"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
    3: {
      name: "Rogue's Ring +3",
      description: "Critical hit rate: +3, Dexterity: +3.",
      image:
        "https://ffxiv.gamerescape.com/w/images/thumb/0/05/Model-Rogue%27s_Ring.png/450px-Model-Rogue%27s_Ring.png",
      rating: "normal",
      stats: { dexterity: 3 },
      long: "", // Price since it was shown In a shop.
      note: "https://ffxiv.gamerescape.com/wiki/Category:Ring/iLevel_30-39",
      type: "Equipment",
    },
    9: {
      name: "Rogue's Ring +9",
      description: "Critical hit rate: +9, Dexterity: +9.",
      image:
        "https://ffxiv.gamerescape.com/w/images/thumb/0/05/Model-Rogue%27s_Ring.png/450px-Model-Rogue%27s_Ring.png",
      rating: "normal",
      stats: { dexterity: 9 },
      long: "", // Price since it was shown In a shop.
      note: "https://ffxiv.gamerescape.com/wiki/Category:Ring/iLevel_30-39",
      type: "Equipment",
      // melvor

      validSlots: ["Platebody"],
      occupiesSlots: [],
      equipRequirements: [],
      modifiers: {},
      enemyModifiers: {}
    },
  },
  "Dark Elf's Scimitar": {
    name: "Dark Elf's Scimitar",
    description: "Cutting deals 3% more damage, strength: +1.",
    image:
      "https://i.pinimg.com/564x/e4/b7/5d/e4b75d01d093430bb055a82dc5967c38.jpg",
    rating: "normal",
    stats: { strength: 1, slashAttackBonus: 3 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Weapon",
    "attackType": "melee",
    // melvor
    "equipmentStats": [
      {
        "key": "attackSpeed",
        "value": 2400
      },
      {
        "key": "stabAttackBonus",
        "value": 24
      },
      {
        "key": "slashAttackBonus",
        "value": 75
      },
      {
        "key": "blockAttackBonus",
        "value": 28
      },
      {
        "key": "meleeStrengthBonus",
        "value": 75
      }
    ],
    validSlots: ["Weapon"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Meroyri Xiphos": {
    name: "Meroyri Xiphos",
    description: "strength: +1.",
    image:
      "https://i.pinimg.com/564x/36/0d/28/360d2889c232ccfc54439397d95198d2.jpg",
    rating: "junk",
    stats: { strength: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Weapon",
    "attackType": "melee",
    // melvor
    "equipmentStats": [
      {
        "key": "attackSpeed",
        "value": 3100
      },
      {
        "key": "stabAttackBonus",
        "value": 86
      },
      {
        "key": "slashAttackBonus",
        "value": 86
      },
      {
        "key": "blockAttackBonus",
        "value": 86
      },
      {
        "key": "meleeStrengthBonus",
        "value": 126
      }
    ],
    validSlots: ["Weapon"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Rayndr Face Mask": {
    name: "Rayndr Face Mask",
    description: "Disease resistance +3%.",
    image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fauronlu.istad.org%2Fffx-script%2Fwp-content%2Fuploads%2F2015%2F09%2F96nedus.jpg",
    rating: "junk",
    stats: { diseaseResistancePerc: 3 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "damageReduction",
        "value": 4
      },
      {
        "key": "rangedDefenceBonus",
        "value": 10
      },
      {
        "key": "magicDefenceBonus",
        "value": 10
      },
      {
        "key": "meleeDefenceBonus",
        "value": 10
      },
      {
        "key": "slashAttackBonus",
        "value": 10
      },
      {
        "key": "stabAttackBonus",
        "value": 10
      },
      {
        "key": "rangedAttackBonus",
        "value": -10
      }
    ],
    validSlots: ["Helmet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Shadow Pirate's Coat": {
    name: "Shadow Pirate's Coat",
    description:
      "Hiding in shadows is 40% more effective. +150 water resistance. 2% water resistance.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F474x%2F7d%2F0b%2Fd6%2F7d0bd6d33ea4f540d26ce3d59b642258.jpg",
    rating: "rare",
    stats: { stealthInShadowsPerc: 40, waterResistancePerc: 2, waterResistance: 150 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "stabAttackBonus",
        "value": 3
      },
      {
        "key": "slashAttackBonus",
        "value": 3
      },
      {
        "key": "blockAttackBonus",
        "value": 3
      },
      {
        "key": "magicAttackBonus",
        "value": 3
      },
      {
        "key": "magicDamageBonus",
        "value": 3
      },
      {
        "key": "rangedAttackBonus",
        "value": 3
      },
      {
        "key": "rangedStrengthBonus",
        "value": 3
      },
      {
        "key": "meleeStrengthBonus",
        "value": 3
      },
      {
        "key": "meleeDefenceBonus",
        "value": 120
      },
      {
        "key": "rangedDefenceBonus",
        "value": 100
      },
      {
        "key": "magicDefenceBonus",
        "value": 50
      },
      {
        "key": "damageReduction",
        "value": 5
      },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Cape"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {
      increasedThievingStealth: 40,
    },
    enemyModifiers: {},
  },
  "Leather Pirate Boots": {
    name: "Leather Pirate Boots",
    description: "+1 Endurance.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frudokstavern.com%2Fwp-content%2Fuploads%2F2021%2F08%2FBoots-of-the-Shadow-Walker_1-768x768.jpg",
    rating: "junk",
    stats: { endurance: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "stabAttackBonus",
        "value": 3
      },
      {
        "key": "slashAttackBonus",
        "value": 3
      },
      {
        "key": "blockAttackBonus",
        "value": 3
      },
      {
        "key": "magicAttackBonus",
        "value": 3
      },
      {
        "key": "magicDamageBonus",
        "value": 0
      },
      {
        "key": "rangedAttackBonus",
        "value": 3
      },
      {
        "key": "rangedStrengthBonus",
        "value": 0
      },
      {
        "key": "meleeStrengthBonus",
        "value": 12
      },
      {
        "key": "meleeDefenceBonus",
        "value": 22
      },
      {
        "key": "rangedDefenceBonus",
        "value": 6
      },
      {
        "key": "magicDefenceBonus",
        "value": 9
      },
      {
        "key": "damageReduction",
        "value": 5
      }
    ],
    validSlots: ["Boots"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
  },
  "Black Band": {
    name: "Black Band",
    description: "Dexterity: +1.",
    image: "img/Black_Band.png",
    rating: "normal",
    stats: { dexterity: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Ring"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
    9: {
      name: "Black Band +9",
      description: "Dexterity: +9.",
      image: "img/Black_Band.png",
      rating: "normal",
      stats: { dexterity: 9 },
      long: "", // Price since it was shown In a shop.
      note: "",
      sellsFor: 1,
      "category": "Combat",
      type: "Equipment",
    },
  },
  "Tidus Earing": {
    name: "Tidus Earing",
    description:
      "Dexterity +9, Swimming speed +5, Can breath underwater for 5 minutes.",
    image:
      "https://image.vector-park.jp/images/item/original2/019/2017/08/24/019-201708240761_1.jpg?t=1572379770",
    rating: "epic",
    stats: { dexterity: 9, swimSpeed: 5, underwaterBreathing: 300000 },
    9: {
      name: "Tidus Earing",
      description: "Dexterity +9, Swimming speed +5, Can breath underwater for 5 minutes.",
      image: "https://image.vector-park.jp/images/item/original2/019/2017/08/24/019-201708240761_1.jpg?t=1572379770",
      rating: "normal",
      stats: { dexterity: 9 },
      long: "", // Price since it was shown In a shop.
      note: "",
      sellsFor: 1,
      "category": "Combat",
      type: "Equipment",
    },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Ring"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Featureless Deathwood Mask": {
    name: "Featureless Deathwood Mask",
    description: "Hides the users stats, name and other details.",
    image: "https://static.wikia.nocookie.net/elderscrolls/images/f/f5/Nahkriin_Mask.png",
    rating: "rare",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "damageReduction",
        "value": 4
      },
      {
        "key": "rangedDefenceBonus",
        "value": 10
      },
      {
        "key": "magicDefenceBonus",
        "value": 10
      },
      {
        "key": "meleeDefenceBonus",
        "value": 10
      },
      {
        "key": "slashAttackBonus",
        "value": 10
      },
      {
        "key": "stabAttackBonus",
        "value": 10
      },
      {
        "key": "rangedAttackBonus",
        "value": -10
      },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Helmet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Black Braid Bracelet": {
    name: "Black Braid Bracelet",
    description: "",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fcd%2F5b%2Fa1%2Fcd5ba160093ba063c0f5c5e2a60402e7.png",
    rating: "junk",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Ring"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Frost Gloves": {
    name: "Frost Gloves",
    description: "",
    image: "img/Miolite_Gloves.png",
    rating: "normal",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "stabAttackBonus",
        "value": 3
      },
      {
        "key": "slashAttackBonus",
        "value": 3
      },
      {
        "key": "blockAttackBonus",
        "value": 3
      },
      {
        "key": "magicAttackBonus",
        "value": 3
      },
      {
        "key": "magicDamageBonus",
        "value": 0
      },
      {
        "key": "rangedAttackBonus",
        "value": 3
      },
      {
        "key": "rangedStrengthBonus",
        "value": 0
      },
      {
        "key": "meleeStrengthBonus",
        "value": 3
      },
      {
        "key": "meleeDefenceBonus",
        "value": 3
      },
      {
        "key": "rangedDefenceBonus",
        "value": 3
      },
      {
        "key": "magicDefenceBonus",
        "value": 3
      },
      {
        "key": "damageReduction",
        "value": 0
      },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Gloves"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Flame Gloves": {
    name: "Flame Gloves",
    description: "",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgamepedia.cursecdn.com%2Fpathofexile_gamepedia%2F2%2F29%2FFire_Gloves_inventory_icon.png",
    rating: "normal",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "stabAttackBonus",
        "value": 3
      },
      {
        "key": "slashAttackBonus",
        "value": 3
      },
      {
        "key": "blockAttackBonus",
        "value": 3
      },
      {
        "key": "magicAttackBonus",
        "value": 3
      },
      {
        "key": "magicDamageBonus",
        "value": 0
      },
      {
        "key": "rangedAttackBonus",
        "value": 3
      },
      {
        "key": "rangedStrengthBonus",
        "value": 0
      },
      {
        "key": "meleeStrengthBonus",
        "value": 3
      },
      {
        "key": "meleeDefenceBonus",
        "value": 3
      },
      {
        "key": "rangedDefenceBonus",
        "value": 3
      },
      {
        "key": "magicDefenceBonus",
        "value": 3
      },
      {
        "key": "damageReduction",
        "value": 0
      },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Gloves"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Ceremonial White Stag Mask": {
    name: "Ceremonial White Stag Mask",
    description: "",
    image: "img/owl.jpg",
    rating: "normal",
    stats: { "magic": 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "damageReduction",
        "value": 4
      },
      {
        "key": "rangedDefenceBonus",
        "value": 10
      },
      {
        "key": "magicDefenceBonus",
        "value": 10
      },
      {
        "key": "meleeDefenceBonus",
        "value": 10
      },
      {
        "key": "slashAttackBonus",
        "value": 10
      },
      {
        "key": "stabAttackBonus",
        "value": 10
      },
      {
        "key": "rangedAttackBonus",
        "value": -10
      },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Helmet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
    0: {
      name: "Ceremonial White Stag Mask",
      description: "",
      image: "img/owl.jpg",
      rating: "normal",
      stats: { "magic": 10 },
      long: "", // Price since it was shown In a shop.
      note: "",
      sellsFor: 1,
      "category": "Combat",
      type: "Equipment",
    },
  },
  "Heavenly White Stag Mask": {
    name: "Heavenly White Stag Mask",
    description:
      "Magic: +2, Disease resistance + 20%, Mana regeneration + 20%, blessing of 建御雷 [Takemikazuchi].",
    image: "img/owl.jpg",
    rating: "unique",
    stats: { magic: 2, diseaseResistancePerc: 20, manaRegenPerc: 20, lightningResistancePerc: 20, lightningCostPerc: 15 },
    long: "Blessing of 建御雷 [Takemikazuchi]: Resist lightning +20%, Lightning cost - 15%, Lightning power +20%.", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "damageReduction",
        "value": 4
      },
      {
        "key": "rangedDefenceBonus",
        "value": 10
      },
      {
        "key": "magicDefenceBonus",
        "value": 10
      },
      {
        "key": "meleeDefenceBonus",
        "value": 10
      },
      {
        "key": "slashAttackBonus",
        "value": 10
      },
      {
        "key": "stabAttackBonus",
        "value": 10
      },
      {
        "key": "rangedAttackBonus",
        "value": -10
      },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Helmet"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
    0: {
      name: "Heavenly White Stag Mask",
      description:
        "Magic: +1, Disease resistance + 20%, Mana regeneration + 10%, blessing of 建御雷 [Takemikazuchi].",
      image: "img/owl.jpg",
      rating: "unique",
      stats: { magic: 1, },
      long: "Blessing of 建御雷 [Takemikazuchi]: Resist lightning +10%, Lightning cost - 10%, Lightning power +10%.", // Price since it was shown In a shop.
      note: "",
      sellsFor: 1,
      "category": "Combat",
      type: "Equipment",
      // melvor
      equipmentStats:[
        { "key": 'stabAttackBonus', "value": 0 },
        { "key": 'slashAttackBonus', "value": 0 },
        { "key": 'blockAttackBonus', "value": 0 },
        { "key": 'rangedAttackBonus', "value": 0 },
        { "key": 'magicAttackBonus', "value": 0 },
        { "key": 'meleeStrengthBonus', "value": 0 },
        { "key": 'rangedStrengthBonus', "value": 0 },
        { "key": 'magicDamageBonus', "value": 0 },
        { "key": 'meleeDefenceBonus', "value": 0 },
        { "key": 'rangedDefenceBonus', "value": 0 },
        { "key": 'magicDefenceBonus', "value": 0 },
        { "key": 'damageReduction', "value": 0 },
        { "key": 'summoningMaxhit', "value": 0 }
      ],
      validSlots: ["Platebody"],
      occupiesSlots: [],
      equipRequirements: [],
      modifiers: {},
      enemyModifiers: {}
    },
    1: {
      name: "Heavenly White Stag Mask",
      description:
        "Magic: +2, Disease resistance + 20%, Mana regeneration + 20%, blessing of 建御雷 [Takemikazuchi].",
      image: "img/owl.jpg",
      rating: "unique",
      stats: { magic: 2 },
      long: "Blessing of 建御雷 [Takemikazuchi]: Resist lightning +20%, Lightning cost - 15%, Lightning power +20%.", // Price since it was shown In a shop.
      note: "",
      sellsFor: 1,
      "category": "Combat",
      type: "Equipment",
      // melvor
      equipmentStats:[
        { "key": 'stabAttackBonus', "value": 0 },
        { "key": 'slashAttackBonus', "value": 0 },
        { "key": 'blockAttackBonus', "value": 0 },
        { "key": 'rangedAttackBonus', "value": 0 },
        { "key": 'magicAttackBonus', "value": 0 },
        { "key": 'meleeStrengthBonus', "value": 0 },
        { "key": 'rangedStrengthBonus', "value": 0 },
        { "key": 'magicDamageBonus', "value": 0 },
        { "key": 'meleeDefenceBonus', "value": 0 },
        { "key": 'rangedDefenceBonus', "value": 0 },
        { "key": 'magicDefenceBonus', "value": 0 },
        { "key": 'damageReduction', "value": 0 },
        { "key": 'summoningMaxhit', "value": 0 }
      ],
      validSlots: ["Platebody"],
      occupiesSlots: [],
      equipRequirements: [],
      modifiers: {},
      enemyModifiers: {}
    }
  },
  "Academy Robe (Black/Yellow)": {
    name: "Academy Robe (Black/Yellow)",
    description: "Magic: +2, Lightning +2%, HP +10.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.sphere.co.uk%2Fpubtool-images%2Fnau89xt86itn68e7cswvg24yvcit&f=1&nofb=1&ipt=0731a0d425e37930a55835401236d4e146cc9c29305cbda2efa5f7882eb88741&ipo=images",
    rating: "junk",
    stats: { magic: 2, HP: 10, lightningIncreasedDamage: 2 },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "magicDamageBonus",
        "value": 5
      },
      {
        "key": "magicAttackBonus",
        "value": 30
      },
      {
        "key": "magicDefenceBonus",
        "value": 30
      },
      {
        "key": "damageReduction",
        "value": 5
      },
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Platebody"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Hui Lu's Battle Armour": {
    name: "Hui Lu's Battle Armour",
    description: "",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.wallhere.com%2Fphoto%2FHua-Lu-drawing-digital-art-samurai-men-creature-armor-tie-1557857.jpg",
    rating: "rare",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "magicDefenceBonus",
        "value": -6
      },
      {
        "key": "rangedDefenceBonus",
        "value": 106
      },
      {
        "key": "meleeDefenceBonus",
        "value": 109
      },
      {
        "key": "rangedAttackBonus",
        "value": -10
      },
      {
        "key": "magicAttackBonus",
        "value": -30
      },
      
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Platebody"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
    0: {
      name: "Hui Lu's Battle Armour",
      description: "???",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.wallhere.com%2Fphoto%2FHua-Lu-drawing-digital-art-samurai-men-creature-armor-tie-1557857.jpg",
      rating: "normal",
      stats: {},
      long: "", // Price since it was shown In a shop.
      note: "",
      sellsFor: 1,
      "category": "Combat",
      type: "Equipment",
    },
  },
  "Hui Lu's Enchanting Gloves": {
    name: "Hui Lu's Enchanting Gloves",
    description: "",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.wallhere.com%2Fphoto%2FHua-Lu-drawing-digital-art-samurai-men-creature-armor-tie-1557857.jpg",
    rating: "rare",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "meleeDefenceBonus",
        "value": 8
      },
      {
        "key": "stabAttackBonus",
        "value": 8
      },
      {
        "key": "slashAttackBonus",
        "value": 8
      },
      {
        "key": "blockAttackBonus",
        "value": 8
      },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Gloves"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
    0: {
      name: "Hui Lu's Enchanting Gloves",
      description: "???",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.wallhere.com%2Fphoto%2FHua-Lu-drawing-digital-art-samurai-men-creature-armor-tie-1557857.jpg",
      rating: "normal",
      stats: {},
      long: "", // Price since it was shown In a shop.
      note: "",
      sellsFor: 1,
      "category": "Combat",
      type: "Equipment",
    },
  },
  "Hui Lu's Burning Boots": {
    name: "Hui Lu's Burning Boots",
    description: "",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.wallhere.com%2Fphoto%2FHua-Lu-drawing-digital-art-samurai-men-creature-armor-tie-1557857.jpg",
    rating: "rare",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "meleeDefenceBonus",
        "value": 16
      },
      {
        "key": "rangedAttackBonus",
        "value": -1
      },
      {
        "key": "magicAttackBonus",
        "value": -3
      },

      
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    
    ],
    validSlots: ["Boots"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
    0: {
      name: "Hui Lu's Burning Boots",
      description: "???",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.wallhere.com%2Fphoto%2FHua-Lu-drawing-digital-art-samurai-men-creature-armor-tie-1557857.jpg",
      rating: "normal",
      stats: {},
      long: "", // Price since it was shown In a shop.
      note: "",
      sellsFor: 1,
      "category": "Combat",
      type: "Equipment",
    },
  },
  "Otari Kote": {
    name: "Otari Kote",
    description: "Endurance +1, Skill: Powdered Snow Defense (Passive).",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F24%2F9f%2F00%2F249f00a8b019357ac998c60d3df129f9.jpg",
    rating: "normal",
    stats: {
      endurance: 1,
    },
    long: "", // Price since it was shown In a shop.
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    "equipmentStats": [
      {
        "key": "meleeDefenceBonus",
        "value": 8
      },
      {
        "key": "stabAttackBonus",
        "value": 8
      },
      {
        "key": "slashAttackBonus",
        "value": 8
      },
      {
        "key": "blockAttackBonus",
        "value": 8
      },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Gloves"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Glide Moroha": {
    name: "Glide Moroha",
    description:
      "Deals +5 ice damage. Ice skills cost 5% less mana, other skills cost 2% less mana.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.darkknightarmoury.com%2Fwp-content%2Fuploads%2F2021%2F02%2FSH2413.jpg",
    rating: "rare",
    stats: { iceIncreasedDamage: 5, iceCostPerc: 5, allCostPerc: 2 },
    long: "", // Price since it was shown In a shop.
    note: "Moroha is the type of blade. Ice.",
    type: "Weapon",
    sellsFor: 1,
    "category": "Combat",
    "attackType": "melee",
    // melvor
    "equipmentStats": [
      {
        "key": "meleeDefenceBonus",
        "value": 56
      },
      {
        "key": "rangedDefenceBonus",
        "value": 58
      },
      {
        "key": "magicDefenceBonus",
        "value": -1
      },
      {
        "key": "magicAttackBonus",
        "value": -8
      },
      {
        "key": "rangedAttackBonus",
        "value": -2
      },
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Shield"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Gale Moroha": {
    name: "Gale Moroha",
    description:
      "Deals +1 wind damage. Attack speed starts at 10% of user maximum speed. Skill cool downs are reduced 3%.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.darkknightarmoury.com%2Fwp-content%2Fuploads%2F2021%2F02%2FSH2413.jpg",
    rating: "rare",
    stats: { windIncreasedDamage: 1, attackSpeed: 2400, allSkillCooldownPerc: 3 },
    long: "", // Price since it was shown In a shop.
    note: "Moroha is the type of blade. Wind.",
    type: "Weapon",
    sellsFor: 1,
    attackType: "melee",
    "category": "Combat",
    // melvor
    equipmentStats:[
      {
        "key": "attackSpeed",
        "value": 2600
      },
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Weapon"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Glide & Gale (2/2)": {
    name: "Set Effect:",
    description: "Skill: Biting Wind (Lowest Item Enchant Level).",
    rating: "rare",
    stats: {},
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Set",
    itemIDs: ["Gale Moroha", "Glide Moroha"],
  },
  "Niyosho Gakuran": {
    name: "Niyosho Gakuran",
    description: "The male school uniform of Niyosho.",
    rating: "junk",
    stats: {},
    note: "gakuran (学ラン)",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F3.bp.blogspot.com%2F-F5Tt2VoG3U0%2FU-8FvYC1ERI%2FAAAAAAAAkxY%2FYiSzIsYU6-Y%2Fs800%2Fseifuku_gakuran.png",
    type: "Equipment",
    sellsFor: 1,
    "category": "Combat",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Platebody"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Niyosho Hakama": {
    name: "Niyosho Hakama",
    description: "The school uniform of Niyosho.",
    rating: "junk",
    stats: {},
    note: "Originally students just wore standard everyday clothes to school; kimono for female students, with hakama for male students. During the Meiji period, students began to wear uniforms modelled after Western dress.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ffd%2Fe6%2F75%2Ffde675e4fe3d7eeef19e5b4e2fab8366.png",
    type: "Equipment",
    sellsFor: 1,
    "category": "Combat",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Platebody"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Otto's Leaky Wand": {
    name: "Otto's Leaky Wand",
    description: "Can only be used by Otto. Command +1, Command over plant's +4.",
    rating: "normal",
    stats: {
      controlPlants: 4,
      command: 1
    },
    note: "",
    sellsFor: 1,
    "category": "Combat",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fd6%2F20%2F7a%2Fd6207a896f16deb3df75e9ca32f3de82.jpg",
    type: "Weapon",
    attackType: "magic",
    // melvor
    "equipmentStats": [
      {
        "key": "attackSpeed",
        "value": 2600
      },
      {
        "key": "magicAttackBonus",
        "value": 12
      },
      {
        "key": "damageReduction",
        "value": 3
      },
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Weapon"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Jokoto Wakizashi": {
    name: "Jokoto Wakizashi",
    description: "A 55cm length short sword. This sword was made long ago, it is very worn.",
    rating: "junk",
    stats: {},
    note: "Jokotō (ancient swords, until around A.D. 900), https://en.wikipedia.org/wiki/Wakizashi",
    type: "Weapon",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.medievalcollectibles.com%2Fwp-content%2Fuploads%2F2019%2F04%2FMC-TR-005.png",
    attackType: "melee",
    // melvor
    equipmentStats:[
      {
        "key": "attackSpeed",
        "value": 2600
      },
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Weapon"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {},
    sellsFor: 1,
    "category": "Combat",
  },
  "Seifuku": {
    name: "Seifuku",
    description: "High school sailor outfit worn by female students of Niyosho.",
    rating: "junk",
    stats: {},
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnanj-challenge.up.seesaa.net%2Fimage%2Fseifuku_sailor.png",
    note: "seifuku (制服). The sailor fuku (セーラー服, sērā fuku) (lit. 'sailor outfit') is a common style of uniform worn by female middle school students, traditionally by high school students.",
    type: "Equipment",
    sellsFor: 1,
    "category": "Combat",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Platebody"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Niyosho Kimono": {
    name: "Niyosho Kimono",
    description: "A kimono made in Niyosho.",
    rating: "junk",
    stats: {},
    note: "",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngmart.com%2Ffiles%2F22%2FKimono-PNG-Isolated-Transparent.png",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Platebody"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {},
    enemyModifiers: {}
  },
  "Autumn Cloak": {
    name: "Autumn Cloak",
    description: "Once a day you can cause the leaves on this cloak to swirl around you, obscuring you from sight for one minute.",
    rating: "rare",
    image: "https://ottotsuma.github.io/images/items/bc253ed84af1a472a0b23f1f07600190.jpg",
    stats: {},
    note: "",
    sellsFor: 1,
    "category": "Combat",
    type: "Equipment",
    // melvor
    equipmentStats:[
      { "key": 'stabAttackBonus', "value": 0 },
      { "key": 'slashAttackBonus', "value": 0 },
      { "key": 'blockAttackBonus', "value": 0 },
      { "key": 'rangedAttackBonus', "value": 0 },
      { "key": 'magicAttackBonus', "value": 0 },
      { "key": 'meleeStrengthBonus', "value": 0 },
      { "key": 'rangedStrengthBonus', "value": 0 },
      { "key": 'magicDamageBonus', "value": 0 },
      { "key": 'meleeDefenceBonus', "value": 0 },
      { "key": 'rangedDefenceBonus', "value": 0 },
      { "key": 'magicDefenceBonus', "value": 0 },
      { "key": 'damageReduction', "value": 0 },
      { "key": 'summoningMaxhit', "value": 0 }
    ],
    validSlots: ["Cape"],
    occupiesSlots: [],
    equipRequirements: [],
    modifiers: {
      increasedThievingStealth: 250
    },
    enemyModifiers: {}
  },
  //   The following are types of Japanese swords:
  // Tsurugi/Ken (剣, "sword"): A straight two edged sword that was mainly produced prior to the 10th century. Before the 10th century, they completely disappeared as weapons and came to be made only as offerings to Shinto shrines and Buddhist temples.
  // Chokutō (直刀, "straight sword"): A straight single edged sword that was mainly produced prior to the 10th century. Since the 10th century, they disappeared as weapons and came to be made only as offerings to Shinto shrines and Buddhist temples.
  // Tachi (太刀, "long sword"): A sword that is generally longer and more curved than the later katana, with curvature often centered from the middle or towards the tang, and often including the tang. Tachi were worn suspended, with the edge downward. The tachi was in vogue before the 15th century.
  // Kodachi (小太刀, "small Tachi"): A shorter version of the tachi, but with similar mounts and intended use, mostly found in the 13th century or earlier.
  // Ōdachi (大太刀, "big Tachi")/Nodachi (野太刀, "field Tachi"): Very large tachi, some in excess of 90 cm, and usually a blade of the late 14th century.
  // Nagamaki (長巻, "long wrapping"): A sword with an exceptionally long handle, usually about as long as the blade. The name refers to the length of the handle wrapping.[1]
  // Katana (刀, "sword"): A sword with a curved blade longer than 60 cm (there is no upper length limit but generally they are shorter than 90 cm), worn with the edge upwards in the sash. It was developed from sasuga, a kind of tantō, around the 14th century, and became the mainstream replacing tachi from the 15th century.
  // Wakizashi (脇差, "side inserted [sword]"): A general term for a sword between one and two shaku long (30 cm and 60 cm in modern measurement), predominantly made after 1600. Generally it is the short blade that accompanies a katana in the traditional samurai daisho pairing of swords, but may be worn by classes other than the samurai as a single blade, also worn edge up as the katana. The name derives from the way the sword would be stuck at one's side through the obi (sash/belt).[8]
  // Tantō (短刀, "short blade"): A sword with a blade shorter than 30 cm. Tantō is generally classified as a sword, but its usage is the same as that of a knife. Usually one-edged, but some were double-edged, through asymmetrical.
  // There are bladed weapons made in the same traditional manner as Japanese swords, which are not swords, but which are still Japanese sword (nihontō) (as "tō" means "blade", rather than specifically "sword"):

  // Naginata (なぎなた, 薙刀): A polearm with a curved single-edged blade. Naginata mounts consist of a long wooden pole, different from a nagamaki mount, which is shorter and wrapped.
  // Yari (槍, "spear"): A spear, or spear-like polearm. Yari have various blade forms, from a simple double edged and flat blade, to a triangular cross section double edged blade, to those with a symmetric cross-piece (jumonji-yari) or those with an asymmetric cross piece. The main blade is symmetric and straight unlike a naginata, and usually smaller but can be as large or bigger than some naginata blades.
  // Other edged weapons or tools that are made using the same methods as Japanese swords:

  // Arrowheads for war, yajiri (or yanone).
  // Kogatana (小刀, "small blade"): An accessory or utility knife, sometimes found mounted in a pocket on the side of the scabbard of a sword. A typical blade is about 10 cm long and 1 cm wide, and is made using the same techniques as the larger sword blades. Also referred to as a "Kozuka" (小柄), which literally means 'small handle', but this terminology can also refer to the handle and the blade together. In entertainment media, the kogatana is sometimes shown as a throwing weapon, but its real purpose was the same as a 'pocket knife' in the West.[9]
};