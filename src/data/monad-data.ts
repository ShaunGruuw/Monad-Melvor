
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

declare type ratings = "junk" |
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

interface monadItemList {
  [key: string]: monadItem | monadEquipmentItemData | monadWeaponItemData | monadFoodItemData | monadBoneItemData | monadPotionItemData | monadReadableItemData | monadOpenableItemData | monadMiscItemData;
}

interface monadItem {
  // [key: string]: any // for production to make it shut up about adding stuff dynamicly
  name: string;
  description: string;
  image: string;
  rating: ratings;
  sellsFor: number; // buys for would be in shops data.
  
  long?: string; // Appears a the bottom of cards. Is the same as (description overwrites effect), but longer and overwrites description. Let's remove effect. Shows the price if shown in a shop. Should really make shop data then.
  note: string;
  1?: levelMonadItem;
  2?: levelMonadItem;
  3?: levelMonadItem;
  4?: levelMonadItem;
  5?: levelMonadItem;
  6?: levelMonadItem;
  7?: levelMonadItem;
  8?: levelMonadItem;
  9?: levelMonadItem;
}

interface levelMonadItem {
  name?: string;
  description?: string;
  image?: string;
  rating?: ratings;
  category?: string; // for sorting them out easily.
  sellsFor?: number; // buys for would be in shops data.
  long?: string;
  note?: string;
}

interface monadEquipmentItemData extends monadBaseEquipmentItemData {
  type: 'Equipment';
}

interface monadBaseEquipmentItemData extends monadItem {
  stats: {};
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

export const ItemList: monadItemList = {
  // Each item can be enchanted by level / 10. That is how you increase the stats, not an automatic increase.
  // Should stats really be : {1:{magic: 1}, 2:{magic: 2}}
  "Training Health Potion": {
    name: "Training Health Potion",
    description: "Recovers 1HP every 5 seconds for the next 120 seconds.", // 24 HP
    image: "img/items/BloodPotion.png",
    long: "¤1", // Price since it was shown In a shop.
    note: "",
    type: "Potion",
    rating: "junk",
    sellsFor: 0
  },
  "Soul bound wand": {
    name: "Soul bound wand",
    description: "Third Eye (active skill). Control minion: +1, sense: +1,",
    image: "https://ottotsuma.github.io/images/items/wand1.png",
    long: "¤3,200,000", // Price since it was shown In a shop.
    rating: "normal",
    stats: { sense: 1 },
    note: "",
    type: "Weapon",
  },
  "Bone Lance": {
    name: "Bone Lance",
    description: "",
    image:
      "https://ottotsuma.github.io/images/people/2d7002b02e419fb5cca7be2ec8e9f755.jpg",
    long: "", // Price since it was shown In a shop.
    rating: "",
    stats: {},
    note: "",
    type: "Weapon",
  },
  "Trainee Bone Spear": {
    name: "Trainee Bone Spear",
    description: "Tiny increase in spear proficiency when equipped.",
    image: "",
    long: "", // Price since it was shown In a shop.
    rating: "",
    stats: {},
    note: "",
    type: "Weapon",
  },
  "Paladin Engeler's Body Armour (silver rank)": {
    name: "Paladin Engeler's Body Armour (silver rank)",
    description:
      "Reduces physical damage taken by 10%, except spears. Endurance +1, Endurance +10%.",
    rating: "epic",
    stats: { endurance: 1, enduranceMultiplier: 1.1 },
    note: "",
    type: "Equipment",
    image: ""
  },
  "Paladin Engeler's Sallet (silver rank)": {
    name: "Paladin Engeler's Sallet (silver rank)",
    description: "Endurance +1.8.",
    rating: "epic",
    stats: { endurance: 1.8 },
    note: "",
    type: "Equipment",
  },
  "Paladin Engeler's Gauntlets (silver rank)": {
    name: "Paladin Engeler's Gauntlets (silver rank)",
    description: "Endurance +1.",
    rating: "epic",
    stats: { endurance: 1 },
    note: "",
    type: "Equipment",
  },
  "Paladin Engeler's Sabaton (silver rank)": {
    name: "Paladin Engeler's Sabaton (silver rank)",
    description: "Endurance +1.2.",
    rating: "epic",
    stats: { endurance: 1.2 },
    note: "",
    type: "Equipment",
  },
  "Paladin Engeler's Mace (silver rank)": {
    name: "Paladin Engeler's Mace (silver rank)",
    description: "Strength +3.",
    rating: "epic",
    stats: { strength: 3 },
    note: "",
    type: "Equipment",
  },
  "Paladin Engeler's Shield (silver rank)": {
    name: "Paladin Engeler's Shield (silver rank)",
    description:
      "Threat increased 20%, Reduce received damage from Demons by 7%, Reduce received damage from Undead by 7%, chance to block 20%.",
    rating: "epic",
    stats: { endurance: 0 },
    note: "",
    type: "Equipment",
  },
  "Paladin Engeler's Cape (silver rank)": {
    name: "Paladin Engeler's Cape (silver rank)",
    description: "Increase HP by 315, Increase MP by 225.",
    rating: "epic",
    stats: { HP: 315, MP: 225 },
    note: "",
    type: "Equipment",
    1: {
      description: "Increase HP by 32, Increase MP by 23.",
      stats: { HP: 32, MP: 23 },
    }
  },
  "Demon Hunter Necklace": {
    name: "Demon Hunter Necklace",
    description:
      "Reduces physical damage taken by 15, Reduces magical damage taken by 17, Reduce received damage from Demons by 3%",
    rating: "epic",
    stats: {
      "Physical Damage Reduction": 15,
    },
    note: "",
    type: "Equipment",
  },
  "Demon Hunter Bracelet": {
    name: "Demon Hunter Bracelet",
    description:
      "Reduces physical damage taken by 15, Reduces magical damage taken by 17, Reduce received damage from Demons by 3%",
    rating: "epic",
    stats: {
      "Physical Damage Reduction": 15,
      "Magical Damage Reduction": 17,
      "Damage from Demons Reduction %": 3, // "1.03 This change will require "stats" code changes"
    },
    note: "",
    type: "Equipment",
  },
  "Demon Hunter Earring": {
    name: "Demon Hunter Earring",
    description:
      "Reduces physical damage taken by 15, Reduces magical damage taken by 17, Reduce received damage from Demons by 3%",
    rating: "epic",
    note: "",
    type: "Equipment",
  },
  "Demon Hunter Ring": {
    name: "Demon Hunter Ring",
    description:
      "Reduces physical damage taken by 15, Reduces magical damage taken by 17, Reduce received damage from Demons by 3%",
    rating: "epic",
    note: "",
    type: "Equipment",
  },
  "Paladin Engeler's Set (3/7)": {
    name: "Paladin Engeler's Set",
    description: "HP + 217.0, endurance + 0.9",
    rating: "epic",
    stats: { endurance: 0.9, HP: 217 },
    1: {
      description: "HP + 22, endurance + 0.9",
      stats: { endurance: 0.9, HP: 22 }
    },
    note: "",
    type: "set effect",
  },
  "Paladin Engeler's Set (4/7)": {
    name: "Paladin Engeler's Set",
    description: "Crit Rate: +1, Critical Damage: +2.5%.",
    rating: "epic",
    // stats: {}
    note: "",
    type: "set effect",
  },
  "Paladin Engeler's Set (7/7)": {
    name: "Paladin Engeler's Set",
    description:
      "Skill: One of the Twelve; Increases all stats by 12% for 7 seconds.",
    rating: "epic",
    stats: { endurance: 0 },
    note: "",
    type: "set effect",
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
  },
  "Crown of the Dammed": {
    name: "Crown of the Dammed",
    description: "Magic + 25, -5 Charisma, control undead +1.",
    image: "",
    rating: "rare",
    stats: { magic: 25, charisma: -5 },
    long: "", // Price since it was shown In a shop.
    note: "Ch5, kings crown",
    type: "Equipment",
  },
  "Ring of initial undead control": {
    name: "Ring of initial undead control",
    description: "mag + 10, Control undead +1.",
    image: "",
    rating: "normal",
    stats: { magic: 10 },
    long: "", // Price since it was shown In a shop.
    note: "Ch5, kings ring",
    type: "Equipment",
  },
  "Ring of Little Strength": {
    name: "Ring of Little Strength",
    description: "Strength +1.",
    image: "",
    rating: "junk",
    stats: { strength: 10 },
    long: "", // Price since it was shown In a shop.
    note: "Ch11, queens ring",
    type: "Equipment",
  },
  "Pendent of Medium Magic": {
    name: "Pendent of Medium Magic",
    description: "magic +2, strength -1.",
    image: "",
    rating: "normal",
    stats: { strength: -1, magic: 2 },
    long: "", // Price since it was shown In a shop.
    note: "Ch11",
    type: "Equipment",
  },
  "Witches Hat": {
    name: "Witches Hat",
    description: "magic +30.",
    image: "",
    rating: "normal",
    stats: { magic: 30 },
    long: "", // Price since it was shown In a shop.
    note: "Ch11",
    type: "Equipment",
  },
  "Queen's Pawn": {
    name: "Queen's Pawn",
    description: "Skill: Animate stone.",
    image: "",
    rating: "rare",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "Ch11, Tiara",
    type: "Equipment",
  },
  "Skull of victim": {
    name: "Skull of victim",
    description: "Control undead +2.",
    image: "",
    rating: "normal",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "Ch11, Skull",
    type: "Misc",
  },
  "Enchanting Quill": {
    name: "Enchanting Quill",
    description: "Enchanting chance of success + 5%.",
    image: "",
    rating: "normal",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "Ch11, Quill",
    type: "Misc",
  },
  "Princesses Coin": {
    name: "Princesses Coin",
    description: "(???).",
    image: "",
    rating: "junk",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "Ch11, Coin",
    type: "Misc",
  },
  "necklace made of teeth": {
    name: "necklace made of teeth",
    description: "(???).",
    image: "",
    rating: "junk",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "Ch17",
    type: "Equipment",
  },
  "Black scarf": {
    name: "Black scarf",
    description: "Hides users identity.",
    image: "",
    rating: "junk",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Whale Skin": {
    name: "Whale Skin",
    description: "Coating boats to go faster.",
    image: "",
    rating: "normal",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
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
    type: "Equipment",
  },
  "Battlemage's Gloves": {
    name: "Battlemage's Gloves",
    description: "Magic +1, Willpower: +1, Spell Speed: +1%.",
    image:
      "https://ffxiv.gamerescape.com/w/images/9/9a/Model-Linen_Halfgloves-Male-Hyur.png",
    rating: "normal",
    stats: { magic: 1, willpower: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Battlemage's Hat": {
    name: "Battlemage's Hat",
    description: "Magic +1, Willpower: +1, Spell Speed: +1%.",
    image:
      "https://ffxiv.gamerescape.com/w/images/3/34/Model-Battlemage%27s_Hat-Male-Hyur.png",
    rating: "normal",
    stats: { magic: 1, willpower: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Battlemage's Robe": {
    name: "Battlemage's Robe",
    description: "Magic +1, Willpower: +1, Spell Speed: +1%.",
    image:
      "https://ffxiv.gamerescape.com/w/images/6/63/Model-Battlemage%27s_Robe-Male-Hyur.png",
    rating: "normal",
    stats: { magic: 1, willpower: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Battlemage's Crakows": {
    name: "Battlemage's Crakows",
    description: "Magic +1, Willpower: +1, Spell Speed: +1%.",
    image:
      "https://ffxiv.gamerescape.com/w/images/0/0c/Model-Battlemage%27s_Crakows-Male-Hyur.png",
    rating: "normal",
    stats: { magic: 1, willpower: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Battlemage's Breeches": {
    name: "Battlemage's Breeches",
    description: "Magic +1, Willpower: +1, Spell Speed: +1%.",
    image:
      "https://ffxiv.gamerescape.com/w/images/2/2e/Model-Battlemage%27s_Breeches-Male-Hyur.png",
    rating: "normal",
    stats: { magic: 1, willpower: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "trousers",
  },
  "Battlemage's Set (4/4)": {
    name: "Battlemage's Set (4/4)",
    description: "Magic +1, Willpower: +1, Spell Speed: +1%.",
    rating: "normal",
    stats: { magic: 1, willpower: 1 },
    note: "",
    type: "set effect",
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
    type: "scarf",
  },
  "Rayndr Jackboots": {
    name: "Rayndr Jackboots",
    description: "Critical hit rate: +1, Endurance: +1.",
    image:
      "https://ffxiv.gamerescape.com/w/images/2/23/Model-Qarn_Jackboots-Male-Hyur.png",
    rating: "normal",
    stats: { endurance: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Rogue's Ring": {
    name: "Rogue's Ring",
    description: "Critical hit rate: +1, Dexterity: +1.",
    image:
      "https://ffxiv.gamerescape.com/w/images/thumb/0/05/Model-Rogue%27s_Ring.png/450px-Model-Rogue%27s_Ring.png",
    rating: "normal",
    stats: { dexterity: 1 },
    long: "", // Price since it was shown In a shop.
    note: "https://ffxiv.gamerescape.com/wiki/Category:Ring/iLevel_30-39",
    type: "ring",
    3: {
      name: "Rogue's Ring +3",
      description: "Critical hit rate: +3, Dexterity: +3.",
      image:
        "https://ffxiv.gamerescape.com/w/images/thumb/0/05/Model-Rogue%27s_Ring.png/450px-Model-Rogue%27s_Ring.png",
      rating: "normal",
      stats: { dexterity: 3 },
      long: "", // Price since it was shown In a shop.
      note: "https://ffxiv.gamerescape.com/wiki/Category:Ring/iLevel_30-39",
      type: "ring",
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
      type: "ring",
    },
  },
  "Dark Elf's Scimitar": {
    name: "Dark Elf's Scimitar",
    description: "Cutting deals 3% more damage, strength: +1.",
    image:
      "https://i.pinimg.com/564x/e4/b7/5d/e4b75d01d093430bb055a82dc5967c38.jpg",
    rating: "normal",
    stats: { strength: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
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
    type: "Equipment",
  },
  "Rayndr Face Mask": {
    name: "Rayndr Face Mask",
    description: "Disease resistance +3%.",
    image: "",
    rating: "junk",
    stats: { strength: 0 },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Shadow Pirate's Coat": {
    name: "Shadow Pirate's Coat",
    description:
      "Hiding in shadows is 40% more effective. +150 water resistance. 2% water resistance.",
    image: "",
    rating: "rare",
    stats: { strength: 0 },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Leather Pirate Boots": {
    name: "Leather Pirate Boots",
    description: "+1 Endurance.",
    image: "",
    rating: "junk",
    stats: { endurance: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Black Band": {
    name: "Black Band",
    description: "Dexterity: +1.",
    image: "",
    rating: "normal",
    stats: { dexterity: 1 },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "ring",
    9: {
      name: "Black Band +9",
      description: "Dexterity: +9.",
      image: "",
      rating: "normal",
      stats: { dexterity: 9 },
      long: "", // Price since it was shown In a shop.
      note: "",
      type: "ring",
    },
  },
  "Tidus Earring": {
    name: "Tidus Earring",
    description:
      "Dexterity +9, Swimming speed +5, Can breath underwater for 5 minutes.",
    image:
      "https://image.vector-park.jp/images/item/original2/019/2017/08/24/019-201708240761_1.jpg?t=1572379770",
    rating: "epic",
    stats: {
      9: { dexterity: 9 },
    },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Featureless Deathwood Mask": {
    name: "Featureless Deathwood Mask",
    description: "Hides the users stats, name and other details.",
    image: "",
    rating: "rare",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Black Braid Bracelet": {
    name: "Black Braid Bracelet",
    description: "",
    image: "",
    rating: "junk",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "bracelet",
  },
  "Frost Gloves": {
    name: "Frost Gloves",
    description: "",
    image: "",
    rating: "normal",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Flame Gloves": {
    name: "Flame Gloves",
    description: "",
    image: "",
    rating: "normal",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Ceremonial White Stag Mask": {
    name: "Ceremonial White Stag Mask",
    description: "",
    image: "",
    rating: "normal",
    stats: { "Small magic increase": "+?" },
    long: "",
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
    0: {
      name: "Ceremonial White Stag Mask",
      description: "",
      image: "",
      rating: "normal",
      stats: { "Small magic increase": "+?" },
      long: "",
      long: "", // Price since it was shown In a shop.
      note: "",
      type: "Equipment",
    },
  },
  "Heavenly White Stag Mask": {
    name: "Heavenly White Stag Mask",
    description:
      "Magic: +2, Disease resistance + 20%, Mana regeneration + 20%, blessing of 建御雷 [Takemikazuchi].",
    image: "",
    rating: "unique",
    stats: { magic: 2 },
    long: "",
    long: "Blessing of 建御雷 [Takemikazuchi]: Resist lightning +20%, Lightning cost - 15%, Lightning power +20%.", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
    0: {
      name: "Heavenly White Stag Mask",
      description:
        "Magic: +1, Disease resistance + 20%, Mana regeneration + 10%, blessing of 建御雷 [Takemikazuchi].",
      image: "",
      rating: "unique",
      stats: { magic: 1, },
      long: "",
      long: "Blessing of 建御雷 [Takemikazuchi]: Resist lightning +10%, Lightning cost - 10%, Lightning power +10%.", // Price since it was shown In a shop.
      note: "",
      type: "Equipment",
    },
    1: {
      name: "Heavenly White Stag Mask",
      description:
        "Magic: +2, Disease resistance + 20%, Mana regeneration + 20%, blessing of 建御雷 [Takemikazuchi].",
      image: "",
      rating: "unique",
      stats: { magic: 2 },
      long: "",
      long: "Blessing of 建御雷 [Takemikazuchi]: Resist lightning +20%, Lightning cost - 15%, Lightning power +20%.", // Price since it was shown In a shop.
      note: "",
      type: "Equipment",
    }
  },
  "Academy Robe (Black/Yellow)": {
    name: "Academy Robe (Black/Yellow)",
    description: "Magic: +2, Lightning +2%, HP +10.",
    image: "",
    rating: "junk",
    stats: { magic: 2, HP: 10 },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Hui Lu's Battle Armour": {
    name: "Hui Lu's Battle Armour",
    description: "",
    image: "",
    rating: "",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
    0: {
      name: "Hui Lu's Battle Armour",
      description: "???",
      image: "",
      rating: "normal",
      stats: {},
      long: "", // Price since it was shown In a shop.
      note: "",
      type: "Equipment",
    },
  },
  "Hui Lu's Enchanting Gloves": {
    name: "Hui Lu's Enchanting Gloves",
    description: "",
    image: "",
    rating: "",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
    0: {
      name: "Hui Lu's Enchanting Gloves",
      description: "???",
      image: "",
      rating: "normal",
      stats: {},
      long: "", // Price since it was shown In a shop.
      note: "",
      type: "Equipment",
    },
  },
  "Hui Lu's Burning Boots": {
    name: "Hui Lu's Burning Boots",
    description: "",
    image: "",
    rating: "",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
    0: {
      name: "Hui Lu's Burning Boots",
      description: "???",
      image: "",
      rating: "normal",
      stats: {},
      long: "", // Price since it was shown In a shop.
      note: "",
      type: "Equipment",
    },
  },
  "Otari Kote": {
    name: "Otari Kote",
    description: "Endurance +1, Skill: Powdered Snow Defense (Passive).",
    image: "",
    rating: "normal",
    stats: {
      endurance: 1,
    },
    long: "", // Price since it was shown In a shop.
    note: "",
    type: "Equipment",
  },
  "Glide Moroha": {
    name: "Glide Moroha",
    description:
      "Deals +5 ice damage. Ice skills cost 5% less mana, other skills cost 2% less mana.",
    image: "",
    rating: "rare",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "Moroha is the type of blade. Ice.",
    type: "Equipment",
  },
  "Gale Moroha": {
    name: "Gale Moroha",
    description:
      "Deals +1 wind damage. Attack speed starts at 10% of user maximum speed. Skill cool downs are reduced 3%.",
    image: "",
    rating: "rare",
    stats: {},
    long: "", // Price since it was shown In a shop.
    note: "Moroha is the type of blade. Wind.",
    type: "Equipment",
  },
  "Glide & Gale (2/2)": {
    name: "Set Effect:",
    description: "Skill: Biting Wind (Lowest Item Enchant Level).",
    rating: "rare",
    stats: {},
    note: "",
    type: "set effect",
  },
  "Niyosho Gakuran": {
    name: "Niyosho Gakuran",
    description: "The male school uniform of Niyosho.",
    rating: "junk",
    stats: {},
    note: "gakuran (学ラン)",
    type: "Equipment",
  },
  "Niyosho Hakama": {
    name: "Niyosho Hakama",
    description: "The school uniform of Niyosho.",
    rating: "junk",
    stats: {},
    note: "Originally students just wore standard everyday clothes to school; kimono for female students, with hakama for male students. During the Meiji period, students began to wear uniforms modelled after Western dress.",
    type: "Equipment",
  },
  "Otto's Leaky Wand": {
    name: "Otto's Leaky Wand",
    description: "Can only be used by Otto. Command +1, Command over plant's +4.",
    rating: "normal",
    stats: {},
    note: "",
    type: "Equipment",
  },
  "Jokoto Wakizashi": {
    name: "Jokoto Wakizashi",
    description: "A 55cm length short sword. This sword was made long ago, it is very worn.",
    rating: "junk",
    stats: {},
    note: "Jokotō (ancient swords, until around A.D. 900), https://en.wikipedia.org/wiki/Wakizashi",
    type: "Equipment",
  },
  "Seifuku": {
    name: "Seifuku",
    description: "High school sailor outfit worn by female students of Niyosho.",
    rating: "junk",
    stats: {},
    note: "seifuku (制服). The sailor fuku (セーラー服, sērā fuku) (lit. 'sailor outfit') is a common style of uniform worn by female middle school students, traditionally by high school students.",
    type: "Equipment",
  },
  "Niyosho Kimono": {
    name: "Niyosho Kimono",
    description: "A kimono made in Niyosho.",
    rating: "junk",
    stats: {},
    note: "",
    type: "Equipment",
  },
  "Autumn Cloak": {
    name: "Autumn Cloak",
    description: "Once a day you can cause the leaves on this cloak to swirl around you, obscuring you from sight for one minute.",
    rating: "rare",
    image: "https://ottotsuma.github.io/images/items/AutumnCloak.jpg",
    stats: {},
    note: "",
    type: "Equipment",
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