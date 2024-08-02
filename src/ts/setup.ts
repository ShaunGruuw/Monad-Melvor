// @ts-nocheck
import { ItemList as monadItems, AnyMonadItemData } from '../data/monad-data';
import { nonSupport } from '../data/poe.data';
import Pokemon from '../data/data.allPokemon.json'
import DnDmonsters from '../data/5e.data.json'
import DnDMagicitems from '../data/5e-SRD-Magic-Items.json'

// Styles
import '../css/styles.css';

// Images
import '../img/icon.png';
import '../img/items/BloodPotion.png';
import '../img/items/Black_Band.png';
import '../img/items/Miolite_Gloves.png';
import '../img/people/owl.jpg';
import '../img/items/lootbox.png';
import '../img/items/helberd.png'

// game.items.registeredObjects.forEach(item => {
//   if(item._namespace.name === "monad") {
//       game.bank.addItem(item, 1, true, true, false);
//   }
// })

function randomNumber(min: number, max: number) {
  if (min > max) {
    return 1
  }
  return Math.floor(Math.random() * (max - min) + min);
}

function combatLevelCalc({
  Attack = 1,
  Strength = 1,
  Defence = 1,
  Hitpoints = 1,
  Prayer = 1,
  Ranged = 1,
  Magic = 1
}) {
  const attstr = Attack + Strength
  const baselvl = 0.25 * (Defence + Hitpoints + Math.floor(Prayer * 0.5))
  const offenselvl = 0.325 * (Math.max(attstr, Math.floor(Magic * 1.5), Math.floor(Ranged * 1.5)))
  return Math.floor(baselvl + offenselvl)
}

function calculateRewardsMax(CL = 1, maxLimit = 1) {
  const ans = (CL / 3000) * (CL + 200) < 1 ? 1 : (CL / 3000) * (CL + 200)
  return ans > maxLimit ? maxLimit : Math.floor(ans);
}

function getMagicSpell(magicLevel: number, isDragon = false) {
  // game.standardSpells
  // spell = game.standardSpells.getObjectByID("runescapeEncountersInMelvor:Storm_Of_Armadyl")
  // spell.requirements []
  // spell.requiredItem {}
  // spell.level
  const spells = {
    1: "melvorD:WindStrike",
    3: "melvorD:WaterStrike",
    6: "melvorD:EarthStrike",
    10: "melvorD:FireStrike",
    14: "melvorD:WindBolt",
    16: "melvorD:WaterBolt",
    19: "melvorD:EarthBolt",
    23: "melvorD:FireBolt",
    28: "melvorD:WindBlast",
    30: "melvorD:WaterBlast",
    33: "melvorD:EarthBlast",
    37: "melvorD:FireBlast",
    43: "melvorD:WindWave",
    45: "melvorD:WaterWave",
    48: "melvorD:EarthWave",
    52: "melvorD:FireWave",
    57: "melvorD:WindSurge",
    61: "melvorD:WaterSurge",
    64: "melvorD:EarthSurge",
    68: "melvorD:FireSurge"
  }
  if (isDragon || magicLevel > 67) {
    return "melvorD:FireSurge"
  }
  const counts = Object.keys(spells)
  const output = counts.reduce((prev, curr) => Math.abs(curr - magicLevel) < Math.abs(prev - magicLevel) ? curr : prev)
  return spells[output]
}

// function modifyMaxHit(monster) {
//   return Math.floor(numberMultiplier * monster.selectedSpell.maxHit * (1 + 0 / 100 ) * (1+ (monster.levels.magic +1)/200))
// }

export async function setup(ctx: Modding.ModContext) {
  const _namespace = "monad"
  const errorLog: any[] = []
  const idLog: any[] = []
  try {
    const combatSim = mod.manager.getLoadedModList().includes("[Myth] Combat Simulator")
    if(combatSim) {
      mod.api.mythCombatSimulator?.registerNamespace('monad');
    }
    const TothEntitlement = cloudManager.hasTotHEntitlementAndIsEnabled
    const AoDEntitlement = cloudManager.hasAoDEntitlementAndIsEnabled
    // Register our GameData
    await ctx.gameData.addPackage('data.json');
    // await ctx.gameData.addPackage('monad-data.json');
    if (AoDEntitlement) {
      await ctx.gameData.addPackage('aod.json');
    }

    const showList = (itemID: string, backFunction: any, ...backArgs: any) => {
      const item = game.items.getObjectByID(itemID);

      let html = `<h5 class="font-w400 mb-1">${item.name}</h5>`;
      html += `<img src="${item.media}" style="max-width: 256px; max-height: 256px;"></img>`;
      html += '<p></p>';
      game.allSynergies.forEach(synergy => {
        if (synergy.items.includes(item)) {
          html += `<div>${getLangString('equipped_with')}</div>`;
          synergy.items.forEach(i => {
            // @ts-ignore
            html += `<div>${i.name}</div>`
          })
          html += '<p></p>';
          html += `<div>${getLangString('gain_modifiers')}</div>`;
          for (var modifierIndex in synergy.playerModifiers) {
            // check if the property/key is defined in the object itself, not in parent
            if (synergy.playerModifiers.hasOwnProperty(modifierIndex)) {
              if (modifierIndex === 'allowUnholyPrayerUse') {
                html += `<div>${getLangString('allowUnholyPrayerUse')}</div>`
              } else {
                for (let index = 0; index < synergy.playerModifiers.length; index++) {
                  const mod = synergy.playerModifiers[index];
                  const isNegative = mod.isNegative ? 'red' : 'green'
                  const displayString = mod.getDescription().description
                  html += `<div style="color: ${isNegative}">${displayString}</div>`
                  html += '<p></p>';
                }
              }
            }
          }
          html += '<p></p>';
        }
      })
      // @ts-ignore
      if (game.calcItemLevel && typeof game.calcItemLevel(item) === 'number') {
        // @ts-ignore
        html += `<div>${getLangString('power_rating')} ${Math.floor(game.calcItemLevel(item))}</div>`
        // @ts-ignore
        console.log(`${item._namespace.name + ":" + item.localID}: ${game.calcItemLevel(item)}`)
      }


      if (backFunction) {
        SwalLocale.fire({
          html: html,
          showCancelButton: true,
          confirmButtonText: getLangString('ASTROLOGY_BTN_2'),
          cancelButtonText: getLangString('FARMING_MISC_24'),
        }).then((result) => {
          if (result.value) {
            backFunction(...backArgs);
          }
        });
      } else {
        SwalLocale.fire({
          html: html
        });
      }
    }
    try {
      // ctx.patch(BankSidebarMenuElement, 'initialize').after(function (returnValue, game) {
      //   if (document.getElementsByClassName('btn btn-sm btn-outline-secondary p-0 ml-2 tes').length === 0
      //   ) {
      //     const img = createElement("img", {
      //       classList: ["skill-icon-xxs"],
      //       attributes: [["src", "https://cdn2-main.melvor.net/assets/media/skills/summoning/synergy.svg"]],
      //     });

      //     const button = createElement('button', {
      //       className: 'btn btn-sm btn-outline-secondary p-0 ml-2 monad'
      //     });
      //     // @ts-ignore
      //     button.onclick = () => showList(game.bank.selectedBankItem.item.id);
      //     button.appendChild(img);
      //     // @ts-ignore
      //     bankSideBarMenu.selectedMenu.itemWikiLink.parentNode.append(button);
      //   }
      // });
    } catch (error) {
      errorLog.push("Error, bankSideBarMenu", error)
    }

    ctx.onModsLoaded(async () => {
      try {
        const kcm = mod.manager.getLoadedModList().includes('Custom Modifiers in Melvor')
        const tes = mod.manager.getLoadedModList().includes("The Elder Scrolls")
        const mythLoaded = mod.manager.getLoadedModList().includes("[Myth] Music")
        // const dboxLoaded = mod.manager.getLoadedModList().includes('dbox')
        // const Abyssal = mod.manager.getLoadedModList().includes('Abyssal Rift')
        // const Pokeworld = mod.manager.getLoadedModList().includes('Pokeworld (Generation 1)')
        // const Runescape = mod.manager.getLoadedModList().includes('Runescape Encounters in Melvor')
        // "(Skill) Classes and Species"
        const DragonList: Array<string> = [
        ]
        const HumansList: Array<string> = [
        ]
        const UndeadList: Array<string> = [
          "melvorF:ElderVampire",
        ]
        const DemonList: Array<string> = [
        ]
        const BeastList: Array<string> = [
        ]
        const GoblinList: Array<string> = [
          "melvorD:Golbin",
          "melvorD:RangedGolbin",
        ]
        const MythList: Array<string> = [
        ]
        const elfList: Array<string> = [
        ]
        const RobotsList: Array<string> = [
        ]
        const OrcList: Array<string> = [
        ]
        const SeaCreatureList: Array<string> = [
        ]
        const ElementalCreatureList: Array<string> = [
        ]
        const PlantList: Array<string> = [
          "melvorD:Plant"
        ]
        const OozesList: Array<string> = [
        ]
        const AberrationsList: Array<string> = [
        ]
        const CelestialsList: Array<string> = [
        ]
        const ConstructsList: Array<string> = [
        ]
        const FeyList: Array<string> = [
        ]
        const FiendList: Array<string> = [
        ]
        const GiantsList: Array<string> = [
        ]
        const MonstrositiesList: Array<string> = [
        ]
        const allMonsters: (MonsterData | Monster)[] = []
        const allItems: Array<string> = []
        const junkItems: Array<string> = []
        const commonItems: Array<string> = []
        const normalItems: Array<string> = []
        const intermediateItems: Array<string> = []
        const advancedItems: Array<string> = []
        const rareItems: Array<string> = []
        const epicItems: Array<string> = []
        const legendaryItems: Array<string> = []
        const uniqueItems: Array<string> = []
        const growthItems: Array<string> = []
        const questItems: Array<string> = []
        const bannedList = {
          "dndCoin": true,
          "dndCoinofFinding": true,
          "Sweetroll": true,
          "Crown_of_Rhaelyx": true,
          "Cooking_Gloves": true,
          "Mining_Gloves": true,
          "Smithing_Gloves": true,
          "Gem_Gloves": true,
          "Thieving_Gloves": true,
          "Empty_Food": true,
          "Empty_Equipment": true,
          "Meteorite_Dust": true,
          "Lemonade_Full": true,
          "Locked_Chest": true,
          "Locked_Chest_Key": true,
          "I_Cant_See_Helmet": true,
          "Lemonade_Nope_this_is_half_full_now": true,
          "Lemonade_Wow_this_is_slow": true,
          "Lemonade_Maybe_this_is_half_full": true,
          "Lemonade_Just_over_half_full": true,
          "Lemonade_Half_full": true,
          "Lemonade_A_little_bit_more_now": true,
          "Lemonade_Has_a_bit_now": true,
          "Lemonade_Not_much": true,
          "Lemonade_Not_as_empty_as_before": true,
          "Lemonade_Still_very_empty": true,
          "Lemonade_Very_empty": true,
          "Lemonade_Empty": true,
          "Lemonade_Just_fill_it_up_already": true,
          "Lemonade_Still_not_full": true,
          "Lemonade_Again_still_not_full": true,
          "Lemonade_Less_than_before_because_you_drank_some": true,
          "Lemonade_Back_to_where_we_were_before": true,
          "Lemonade_Haha_just_joking_hurry_up": true,
          "Lemonade_Wait_for_it": true,
          "Lemonade_Wait_for_it2": true,
          "Lemonade_Oh_still_not_full": true,
          "Lemonade_YAY_ITS_FINALLY_FULL": true,
          "Lemonade_What_about_now": true,
          "Lemonade_Now": true,
          "Lemonade_Okay_this_looks_pretty_full_now": true,
          "Lemonade_Wait_this_might_be_half_full_now": true,
          "Lemonade_How_full_is_it_supposed_to_be": true,
          "Lemonade_Still_almost_full": true,
          "Lemonade_Almost_full": true,
          "lootbox": true
        } as const;
        const bannedNameSpace = {
          "tes": true
        } as const;
        const categoryBan = {
          "Limes": true,
          "Lemon": true,
          "Events": true,
          "Event": true
        } as const;
        const initialPackage = ctx.gameData.buildPackage((itemPackage: any) => {
          try {
            // const SRDURL = "https://www.dnd5eapi.co/api/images/monsters/aboleth.png"
            if (false && DnDmonsters) {
              const d5monsterid = []
              const sizes = {
                Gargantuan: "melvorD:Magic_Bones",
                Huge: "melvorD:Big_Bones",
                Large: "melvorD:Big_Bones",
                Medium: "melvorD:Bones",
                Small: "melvorD:Bones",
                Tiny: "melvorD:Bones"
              }
              const sizeList = Object.keys(sizes)

              const species = {
                "humanoid": HumansList,
                "undead": UndeadList,
                "aberration": AberrationsList,
                "beast": BeastList,
                "celestial": CelestialsList,
                "construct": ConstructsList,
                "dragon": DragonList,
                "elemental": ElementalCreatureList,
                "fey": FeyList,
                "fiend": FiendList,
                "giant": GiantsList,
                "monstrosity": MonstrositiesList,
                "ooze": OozesList,
                "plant": PlantList
              }
              const speciesList = Object.keys(species)

              for (let index = 0; index < DnDmonsters.length; index++) {
                const NewMonsterID = DnDmonsters[index].name.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "") + "_monster"
                const NewMonsterID_namespace = _namespace + ":" + NewMonsterID
                d5monsterid.push(NewMonsterID_namespace)
                let bones = "melvorD:Bones"
                for (let j = 0; j < sizeList.length; j++) {
                  if (DnDmonsters[index].meta.includes(sizeList[j])) {
                    // @ts-ignore
                    bones = sizes[sizeList[j]]
                  }
                }
                if (DnDmonsters[index].meta.includes('Celestials')) {
                  bones = 'melvorF:Holy_Dust'
                }
                if (DnDmonsters[index].meta.includes('dragon')) {
                  bones = 'melvorD:Dragon_Bones'
                }

                for (let j = 0; j < speciesList.length; j++) {
                  if (DnDmonsters[index].meta.includes(speciesList[j])) {
                    // @ts-ignore
                    species[speciesList[j]].push(NewMonsterID_namespace)
                  }
                }

                function DnDcalcattacktype(int: string, dex: string, str: string) {
                  if (parseInt(int) > parseInt(dex) && parseInt(int) > parseInt(str)) { return "magic" }
                  if (parseInt(dex) > parseInt(int) && parseInt(dex) > parseInt(str)) { return "ranged" }
                  if (parseInt(str) > parseInt(int) && parseInt(str) > parseInt(dex)) { return "melee" }
                  // we had a tie in two stats
                  if (parseInt(int) > parseInt(dex)) { return "magic" }
                  if (parseInt(dex) > parseInt(int)) { return "ranged" }
                  return "melee"
                }

                const newMonster: MonsterData = {
                  "id": NewMonsterID,
                  "name": DnDmonsters[index].name,
                  "media": DnDmonsters[index].img_url,
                  "levels": {
                    "Attack": Math.floor(Math.pow(1.5, parseInt(DnDmonsters[index].STR))),
                    "Defence": Math.floor(Math.pow(1.5, parseInt(DnDmonsters[index].CON))),
                    "Hitpoints": Math.floor(parseInt(DnDmonsters[index]["Hit Points"])) * 10,
                    "Magic": Math.floor(Math.pow(1.5, parseInt(DnDmonsters[index].INT))),
                    "Ranged": Math.floor(Math.pow(1.5, parseInt(DnDmonsters[index].DEX))),
                    "Strength": Math.floor(Math.pow(1.5, parseInt(DnDmonsters[index].STR)))
                  },
                  "equipmentStats": [
                    {
                      "key": "damageReduction",
                      "value": Math.floor(parseInt(DnDmonsters[index]["Armor Class"])) * 4
                    },
                    {
                      "key": "attackSpeed",
                      "value": !!parseInt(DnDmonsters[index].Speed) ? Math.floor(40 / parseInt(DnDmonsters[index].Speed) * 1000) : 5000
                    }
                  ],
                  "specialAttacks": [],
                  "passives": [],
                  "ignoreCompletion": false,
                  "attackType": DnDcalcattacktype(DnDmonsters[index].INT, DnDmonsters[index].DEX, DnDmonsters[index].STR),
                  "lootChance": 100,
                  "lootTable": [
                    {
                      "itemID": "dnd:dndCoin",
                      "maxQuantity": 10,
                      "minQuantity": 5,
                      "weight": 100
                    }
                  ],
                  "gpDrops": {
                    "min": Math.floor(Math.pow(1.1, parseInt(DnDmonsters[index].Challenge))),
                    "max": Math.floor(Math.pow(2.2, parseInt(DnDmonsters[index].Challenge)))
                  },
                  "bones": {
                    "itemID": bones,
                    "quantity": 1
                  },
                  "canSlayer": true,
                  "isBoss": false,
                  "selectedSpell": getMagicSpell(Math.floor(Math.pow(1.5, parseInt(DnDmonsters[index].INT)))),
                  "pet": {
                    "id": _namespace + ":" + "test_pet",
                    "quantity": 3
                  }
                }
                if (newMonster.id) {
                  allMonsters.push(newMonster)
                  itemPackage.monsters.add(newMonster)
                }
              }

              const dnd_combatarea: any = {
                "id": "dnd_combatarea",
                "name": "DnD Monsters",
                "media": "img/icon.png",
                "monsterIDs": d5monsterid,
                "difficulty": [
                  0,
                  6
                ],
                "entryRequirements": []
              }
              itemPackage.combatAreas.add(dnd_combatarea)
              const dnd_combat_display_order = {
                "insertAt": "End",
                "ids": [
                  `${_namespace}:dnd_combatarea`
                ]
              }
              itemPackage.combatAreaDisplayOrder.add(dnd_combat_display_order)
            }
            if (false && DnDMagicitems) {
              function getMediaFromType(type: string) {
                return `img/${type.replace(' ', '').toLowerCase().replace('wondrousitems', 'wondrousitem')}.jpg`
              }
              function getSellPriceFromDisc(Disc: string) {
                if (Disc === 'Common') {
                  return 10;
                }
                if (Disc === 'Uncommon') {
                  return 100;
                }
                if (Disc === 'Rare') {
                  return 1000;
                }
                if (Disc === 'Very Rare') {
                  return 10000;
                }
                if (Disc === 'Legendary') {
                  return 100000;
                }
                return 0;
              }

              function getValidSlots(item: any) {
                // "Helmet",
                // "Platebody",
                // "Platelegs",
                // "Boots",
                // "Weapon",
                // "Shield",
                // "Amulet",
                // "Ring",
                // "Gloves",
                // "Quiver",
                // "Cape",
                // "Passive",
                // "Summon1",
                // "Summon2",
                // "Consumable",
                // "Gem" 
                if (item.equipment_category.name.includes('Weapon')) {
                  return ['Weapon'];
                }
                if (item.name.includes('Ammunition')) {
                  return ['Quiver'];
                }
                if (item.name.includes('amulet')) {
                  return ['Amulet'];
                }
                if (item.name.includes('greaves')) {
                  return ['Platelegs'];
                }
                if (item.name.includes('cloak')) {
                  return ['Cape'];
                }
                if (item.name.includes('cape')) {
                  return ['Cape'];
                }
                if (item.name.includes('boot')) {
                  return ['Boots'];
                }
                if (item.name.includes('glove')) {
                  return ['Gloves'];
                }
                if (item.name.includes('hat')) {
                  return ['Helmet'];
                }
                if (item.name.includes('helmet')) {
                  return ['Helmet'];
                }
                if (item.name.includes('Shield')) {
                  return ['Shield'];
                }
                const Disc = item.equipment_category.name.replace('Armor', 'Armour')
                if (Disc === 'Staffs') {
                  return ['Weapon'];
                }
                if (Disc === 'Wands') {
                  return ['Weapon'];
                }
                if (Disc === 'Weapons') {
                  return ['Weapon'];
                }
                if (Disc === 'Wondrous Items') {
                  return ['Passive'];
                }
                if (Disc === 'Armour') {
                  return ['Platebody'];
                }
                if (Disc === 'Potions') {
                  return ['Consumable'];
                }
                if (Disc === 'Scrolls') {
                  return ['Consumable'];
                }
                if (Disc === 'Rings') {
                  return ['Ring'];
                }
                if (Disc === 'Rods') {
                  return ['Weapon'];
                }
                return [];
              }
              const uniqueIDs: [string] = ['']
              for (let index = 0; index < DnDMagicitems.length; index++) {
                let itemID = DnDMagicitems[index].name.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "")
                if (uniqueIDs.includes(itemID)) {
                  while (uniqueIDs.includes(itemID)) {
                    itemID = itemID + Math.floor(Math.random() * 1000000)
                  }
                }
                uniqueIDs.push(itemID)
                const templateItem: any = {
                  "id": itemID,
                  "name": DnDMagicitems[index].name,
                  "category": DnDMagicitems[index].equipment_category.name.replace('Armor', 'Armour'),
                  "type": DnDMagicitems[index].equipment_category.name.replace('Armor', 'Armour').replace('Ammunition', 'Ammo'),
                  "itemType": DnDMagicitems[index].equipment_category.name.includes('Weapon') ? "Weapon" : DnDMagicitems[index].equipment_category.name.includes('Potion') ? "Potion" : "Equipment",
                  "media": getMediaFromType(DnDMagicitems[index].equipment_category.name),
                  "ignoreCompletion": false,
                  "obtainFromItemLog": false,
                  "golbinRaidExclusive": false,
                  "sellsFor": getSellPriceFromDisc(DnDMagicitems[index].rarity.name),
                  "tier": "none",
                  "validSlots": getValidSlots(DnDMagicitems[index]),
                  "occupiesSlots": DnDMagicitems[index].name.toLocaleLowerCase().includes('bow') ? ['Shield'] : DnDMagicitems[index].equipment_category.name === 'Staffs' ? ['Shield'] : [],
                  "equipRequirements": [],
                  "equipmentStats": [],
                }
                if (DnDMagicitems[index].equipment_category.name.includes('Potion')) {
                  delete templateItem["validSlots"]
                  delete templateItem["occupiesSlots"]
                  delete templateItem["equipRequirements"]
                  delete templateItem["equipmentStats"]
                  delete templateItem["tier"]

                  templateItem["charges"] = 10
                  templateItem["tier"] = 0,
                    templateItem["action"] = "melvorD:Fishing",
                    templateItem["consumesOn"] = [
                      {
                        "type": "FishingAction"
                      }
                    ]
                }
                if (DnDMagicitems[index].equipment_category.name.includes('Weapon')) {
                  const Disc = DnDMagicitems[index].equipment_category.name.replace('Armor', 'Armour')
                  if (Disc === 'Staffs') {
                    templateItem['attackType'] = "magic"
                  }
                  else if (Disc === 'Wands') {
                    templateItem['attackType'] = "magic"
                  } else if (Disc === 'Bow') {
                    templateItem['attackType'] = "ranged"
                  } else if (DnDMagicitems[index].name.toLocaleLowerCase().includes('bow')) {
                    templateItem['attackType'] = "ranged"
                  } else {
                    templateItem['attackType'] = "melee"
                  }

                }
                itemPackage.items.add(templateItem)
              }
            }
            if (false && Pokemon) {
              const allPokemonId: any[] = []
              const MagicPokemonList: any[] = []
              const WoodcuttingPokemonList: any[] = []
              const FishingPokemonList: any[] = []
              const FiremakingPokemonList: any[] = []
              const CookingPokemonList: any[] = []
              const MiningPokemonList: any[] = []
              const SmithingPokemonList: any[] = []
              const ThievingPokemonList: any[] = []
              const FletchingPokemonList: any[] = []
              const CraftingPokemonList: any[] = []
              const RunecraftingPokemonList: any[] = []
              const HerblorePokemonList: any[] = []
              const AgilityPokemonList: any[] = []
              const AstrologyPokemonList: any[] = []

              for (let index = 0; index < Pokemon.length; index++) {
                const NewPet: any = {
                  name: Pokemon[index].name.english,
                  media: Pokemon[index].image.hires,
                  "id": Pokemon[index].id + "_pet",
                  "hint": "Pokemon",
                  "modifiers": {

                  },
                  "activeInRaid": false,
                  "scaleChanceWithMasteryPool": false,
                  "ignoreCompletion": false
                }
                const newMonster: MonsterData = {
                  "id": Pokemon[index].id + "_monster",
                  "name": Pokemon[index].name.english,
                  "media": Pokemon[index].image.hires,
                  "levels": {
                    "Attack": 1,
                    "Defence": 1,
                    "Hitpoints": 1,
                    "Magic": 1,
                    "Ranged": 1,
                    "Strength": 1
                  },
                  "equipmentStats": [

                  ],
                  "specialAttacks": [],
                  "passives": [],
                  "ignoreCompletion": false,
                  "attackType": "ranged",
                  "lootChance": 100,
                  "lootTable": [
                    {
                      "itemID": "melvorD:Steel_Arrows",
                      "maxQuantity": 10,
                      "minQuantity": 5,
                      "weight": 100
                    },
                  ],
                  "gpDrops": {
                    "min": 1,
                    "max": 100
                  },
                  "bones": {
                    "itemID": "melvorD:Bones",
                    "quantity": 1
                  },
                  "canSlayer": true,
                  "isBoss": false,
                  "selectedSpell": "melvorD:WindStrike"
                }
                newMonster['pet'] = {
                  "id": _namespace + ":" + Pokemon[index].id + "_pet",
                  "quantity": 3
                }
                const attackType: any = {}
                const PokemonStatsKeys = Object.keys(Pokemon[index].base)
                for (let j = 0; j < PokemonStatsKeys.length; j++) {
                  if (PokemonStatsKeys[j] === 'HP') newMonster['levels']['Hitpoints'] = Pokemon[index].base.HP
                  if (PokemonStatsKeys[j] === 'Attack') {
                    newMonster['levels']['Attack'] = Pokemon[index].base.Attack
                    attackType['Attack'] = Pokemon[index].base.Attack
                  }
                  if (PokemonStatsKeys[j] === 'Defense') newMonster['levels']['Defence'] = Pokemon[index].base.Defense
                  if (PokemonStatsKeys[j] === 'Defense') newMonster['equipmentStats'].push(
                    {
                      "key": "rangedDefenceBonus",
                      "value": Pokemon[index].base.Defense
                    },
                    {
                      "key": "meleeDefenceBonus",
                      "value": Pokemon[index].base.Defense
                    }
                  )
                  if (PokemonStatsKeys[j] === 'Attack') newMonster['levels']['Strength'] = Pokemon[index].base.Attack
                  if (PokemonStatsKeys[j] === 'Attack') newMonster['equipmentStats'].push(
                    {
                      "key": "meleeStrengthBonus",
                      "value": Pokemon[index].base.Attack
                    },
                    {
                      "key": "rangedStrengthBonus",
                      "value": Pokemon[index].base.Attack
                    }
                  )
                  if (PokemonStatsKeys[j] === 'Attack') newMonster['levels']['Ranged'] = Pokemon[index].base.Attack
                  if (PokemonStatsKeys[j] === 'Sp. Attack') {
                    newMonster['levels']['Magic'] = Pokemon[index].base['Sp. Attack']
                    attackType['Magic'] = Pokemon[index].base['Sp. Attack']
                  }
                  if (PokemonStatsKeys[j] === 'Sp. Attack') newMonster['equipmentStats'].push({
                    "key": "magicAttackBonus",
                    "value": Pokemon[index].base['Sp. Attack']
                  })
                  if (PokemonStatsKeys[j] === 'Sp. Defense') newMonster['equipmentStats'].push({
                    "key": "magicDefenceBonus",
                    "value": Pokemon[index].base['Sp. Defense']
                  })
                }
                newMonster['equipmentStats'].push(
                  {
                    "key": "attackSpeed",
                    "value": 2400 - Pokemon[index].base['Speed']
                  }
                )
                if (attackType['Magic'] > attackType['Attack']) {
                  newMonster["attackType"] = "magic"
                  newMonster[selectedSpell] = getMagicSpell(newMonster.levels.Magic)
                } else {
                  Math.random() < 0.5 ? newMonster["attackType"] = "ranged" : newMonster["attackType"] = "melee"
                }

                // "increasedTownshipWoodProduction": 0,
                // "increasedTownshipWoodcuttingProduction": 0,
                // "increasedTownshipCoalProduction": 0,
                // "increasedTownshipBarProduction": 0,
                // "increasedTownshipClothingProduction": 0,
                // "increasedTownshipFarmProduction": 0,
                // "increasedTownshipFishingDockProduction": 0,
                // "increasedTownshipFoodProduction": 0,
                // "increasedTownshipEducation": 0,
                // "increasedTownshipHerbProduction": 0,
                // "increasedTownshipLeatherProduction": 0,
                // "increasedTownshipRuneEssenceProduction": 0,
                // "increasedTownshipMagicEmporiumProduction": 0,
                // "increasedTownshipOrchardProduction": 0,
                // "increasedTownshipStoneProduction": 0,

                if (Pokemon[index].type.includes('Normal')) {
                  NewPet.modifiers["increasedTownshipForestProduction"] = 1
                  CraftingPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Fighting')) {
                  NewPet.modifiers["increasedTownshipAridPlainsProduction"] = 1
                  CookingPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Flying')) {
                  NewPet.modifiers["increasedTownshipJungleProduction"] = 1
                  FletchingPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Poison')) {
                  NewPet.modifiers["increasedTownshipSwampProduction"] = 1
                  SmithingPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Ground')) {
                  NewPet.modifiers["increasedTownshipDesertProduction"] = 1
                  RunecraftingPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Rock')) {
                  NewPet.modifiers["increasedTownshipMountainsProduction"] = 1
                  MiningPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Bug')) {
                  NewPet.modifiers["increasedFletchingBoltQuantity"] = 1
                  WoodcuttingPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Ghost')) {
                  NewPet.modifiers["increasedFireRunesWhenMakingElementalRunes"] = 1
                  HerblorePokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Steel')) {
                  NewPet.modifiers["increasedTownshipBlacksmithProduction"] = 1
                  AgilityPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Fire')) {
                  NewPet.modifiers["increasedFiremakingLogGP"] = 1
                  FiremakingPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Water')) {
                  NewPet.modifiers["increasedTownshipWaterProduction"] = 1
                  FishingPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Grass')) {
                  NewPet.modifiers["increasedFlatFarmingYield"] = 1
                  HerblorePokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Electric')) {
                  NewPet.modifiers["increasedTownshipValleyProduction"] = 1
                  FiremakingPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Psychic')) {
                  NewPet.modifiers["increasedTownshipMaxStorage"] = 1
                  AstrologyPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Ice')) {
                  NewPet.modifiers["increasedTownshipSnowlandsProduction"] = 1
                  CookingPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Dragon')) {
                  NewPet.modifiers["increasedPotionChargesFlat"] = 1
                  AstrologyPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Dark')) {
                  NewPet.modifiers["increasedTownshipGPProduction"] = 1
                  ThievingPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Fairy')) {
                  NewPet.modifiers["increasedHolyDustFromBlessedOffering"] = 1
                  MagicPokemonList.push(`${_namespace}:${NewPet['id']}`)
                }

                allPokemonId.push(`${_namespace}:${newMonster['id']}`)
                allMonsters.push(newMonster)
                itemPackage.monsters.add(newMonster)
                itemPackage.pets.add(NewPet)
              }

              const PokemonCraftingSkillData = {
                "skillID": "melvorD:Crafting",
                "data": {
                  "pets": CraftingPokemonList
                }
              }
              itemPackage.skillData.add(PokemonCraftingSkillData)
              const PokemonFletchingSkillData = {
                "skillID": "melvorD:Fletching",
                "data": {
                  "pets": FletchingPokemonList
                }
              }
              itemPackage.skillData.add(PokemonFletchingSkillData)
              const PokemonSmithingSkillData = {
                "skillID": "melvorD:Smithing",
                "data": {
                  "pets": SmithingPokemonList
                }
              }
              itemPackage.skillData.add(PokemonSmithingSkillData)
              const PokemonRunecraftingSkillData = {
                "skillID": "melvorD:Runecrafting",
                "data": {
                  "pets": RunecraftingPokemonList
                }
              }
              itemPackage.skillData.add(PokemonRunecraftingSkillData)
              const PokemonMiningSkillData = {
                "skillID": "melvorD:Mining",
                "data": {
                  "pets": MiningPokemonList
                }
              }
              itemPackage.skillData.add(PokemonMiningSkillData)
              const PokemonWoodcuttingSkillData = {
                "skillID": "melvorD:Woodcutting",
                "data": {
                  "pets": WoodcuttingPokemonList
                }
              }
              itemPackage.skillData.add(PokemonWoodcuttingSkillData)
              const PokemonAgilitySkillData = {
                "skillID": "melvorD:Agility",
                "data": {
                  "pets": AgilityPokemonList
                }
              }
              itemPackage.skillData.add(PokemonAgilitySkillData)
              const PokemonFishingSkillData = {
                "skillID": "melvorD:Fishing",
                "data": {
                  "pets": FishingPokemonList
                }
              }
              itemPackage.skillData.add(PokemonFishingSkillData)
              const PokemonHerbloreSkillData = {
                "skillID": "melvorD:Herblore",
                "data": {
                  "pets": HerblorePokemonList
                }
              }
              itemPackage.skillData.add(PokemonHerbloreSkillData)
              const PokemonFiremakingSkillData = {
                "skillID": "melvorD:Firemaking",
                "data": {
                  "pets": FiremakingPokemonList
                }
              }
              itemPackage.skillData.add(PokemonFiremakingSkillData)
              const PokemonCookingSkillData = {
                "skillID": "melvorD:Cooking",
                "data": {
                  "pets": CookingPokemonList
                }
              }
              itemPackage.skillData.add(PokemonCookingSkillData)
              const PokemonAstrologySkillData = {
                "skillID": "melvorD:Astrology",
                "data": {
                  "pets": AstrologyPokemonList
                }
              }
              itemPackage.skillData.add(PokemonAstrologySkillData)
              const PokemonMagicSkillData = {
                "skillID": "melvorD:Magic",
                "data": {
                  "pets": MagicPokemonList
                }
              }
              itemPackage.skillData.add(PokemonMagicSkillData)
              const PokemonThievingSkillData = {
                "skillID": "melvorD:Thieving",
                "data": {
                  "pets": ThievingPokemonList
                }
              }
              itemPackage.skillData.add(PokemonThievingSkillData)

              const pokemon_combatarea: any = {
                "id": "pokemon_combatarea",
                "name": "Pokemon",
                "media": "img/icon.png",
                "monsterIDs": allPokemonId,
                "difficulty": [
                  0
                ],
                "entryRequirements": []
              }
              itemPackage.combatAreas.add(pokemon_combatarea)
              const pokemon_combat_display_order = {
                "insertAt": "End",
                "ids": [
                  `${_namespace}:pokemon_combatarea`
                ]
              }
              itemPackage.combatAreaDisplayOrder.add(pokemon_combat_display_order)
            }
            if (false && nonSupport) {
              for (let index = 0; index < nonSupport.length; index++) {
                const newPoeGem: any = {
                  "id": nonSupport[index].id,
                  "name": nonSupport[index].name,
                  "category": "Combat",
                  "type": "Gem",
                  "media": nonSupport[index].icon,
                  "ignoreCompletion": true,
                  "obtainFromItemLog": false,
                  "golbinRaidExclusive": false,
                  "sellsFor": 1,
                  "validSlots": [
                    "Gem"
                  ],
                  "occupiesSlots": [],
                  "tier": "none",
                  "equipRequirements": [],
                  "equipmentStats": [],
                  "itemType": "Equipment",
                  "modifiers": {
                  }
                }
                for (let j = 0; j < nonSupport[index].explicitMods.length; j++) {
                  if (nonSupport[index].explicitMods[j].includes("Armour")) {
                    newPoeGem.modifiers["increasedFlatMeleeDefenceBonus"] = parseInt(nonSupport[index].explicitMods[0].replace(/^\D+/g, ''));
                  }
                  if (nonSupport[index].explicitMods[j].includes("Damage")) {
                    newPoeGem.modifiers["increasedDamageToAllMonsters"] = parseInt(nonSupport[index].explicitMods[0].replace(/^\D+/g, ''));
                  }
                  if (nonSupport[index].explicitMods[j].includes("Minions")) {
                    newPoeGem.modifiers["increasedSummoningMaxHit"] = parseInt(nonSupport[index].explicitMods[0].replace(/^\D+/g, ''));
                  }
                  if (nonSupport[index].explicitMods[j].includes("Critical")) {
                    newPoeGem.modifiers["increasedMeleeCritChance"] = parseInt(nonSupport[index].explicitMods[0].replace(/^\D+/g, ''));
                    newPoeGem.modifiers["increasedRangedCritChance"] = parseInt(nonSupport[index].explicitMods[0].replace(/^\D+/g, ''));
                    newPoeGem.modifiers["increasedMagicCritChance"] = parseInt(nonSupport[index].explicitMods[0].replace(/^\D+/g, ''));
                  }
                  if (nonSupport[index].explicitMods[j].includes("Melee")) {
                    newPoeGem.modifiers["increasedMeleeMaxHitFlat"] = parseInt(nonSupport[index].explicitMods[0].replace(/^\D+/g, ''));
                  }
                  if (nonSupport[index].explicitMods[j].includes("Curse")) {
                    newPoeGem.modifiers["increasedChanceToApplyConfusionCurse"] = parseInt(nonSupport[index].explicitMods[0].replace(/^\D+/g, ''));
                  }
                  if (nonSupport[index].explicitMods[j].includes("Brand")) {
                    newPoeGem.modifiers["increasedChanceToApplyConfusionCurse"] = parseInt(nonSupport[index].explicitMods[0].replace(/^\D+/g, ''));
                  }
                  if (nonSupport[index].explicitMods[j].includes("Totem")) {
                    newPoeGem.modifiers["increasedSummoningMaxHit"] = parseInt(nonSupport[index].explicitMods[0].replace(/^\D+/g, ''));
                  }

                  if (nonSupport[index].explicitMods[j].includes("Stun")) {
                    if (nonSupport[index].properties[0].name.includes("Melee")) {
                      newPoeGem.modifiers["increasedMeleeStunChance"] = parseInt(nonSupport[index].explicitMods[0].replace(/^\D+/g, ''));
                    } else {
                      newPoeGem.modifiers["increasedGlobalStunChance"] = parseInt(nonSupport[index].explicitMods[0].replace(/^\D+/g, ''));
                    }
                  }
                }
                // idLog.push(nonSupport[index].name, Object.keys(newPoeGem.modifiers))
                if (Object.keys(newPoeGem.modifiers).length < 1) {
                  // newPoeGem.customDescription = nonSupport[index].secDescrText
                }

                if (newPoeGem.id) { itemPackage.items.add(newPoeGem), allItems.push(_namespace + ":" + nonSupport[index].id) }
              }
            }
            if (true && monadItems) {
              try {
                function monadStats(tempStats, newModifiers = {}, newequipmentStats = [
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
                ]) {
                  if (tempStats) {
                    const statKeys: Array<string> = Object.keys(tempStats)
                    if (statKeys.length > 0) {
                      for (let m = 0; m < statKeys.length; m++) {
                        if (kcm) {
                          if (statKeys[m] === 'elfDamageReductionPerc') {
                            newModifiers['decreasedDamageTakenFromElfs'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'goblinDamageReductionPerc') {
                            newModifiers['decreasedDamageTakenFromGoblins'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'robotDamageReductionPerc') {
                            newModifiers['decreasedDamageTakenFromRobots'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'orcDamageReductionPerc') {
                            newModifiers['decreasedDamageTakenFromOrcs'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'dragonDamageReductionPerc') {
                            newModifiers['decreasedDamageTakenFromDragons'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'humanDamageReductionPerc') {
                            newModifiers['decreasedDamageTakenFromHumans'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'elementalDamageReductionPerc') {
                            newModifiers['decreasedDamageTakenFromElementals'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'mythicalcreatureDamageReductionPerc') {
                            newModifiers['decreasedDamageTakenFromMythicalCreatures'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'seacreatureDamageReductionPerc') {
                            newModifiers['decreasedDamageTakenFromSeaCreatures'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'beastDamageReductionPerc') {
                            newModifiers['decreasedDamageTakenFromBeasts'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'demonDamageReductionPerc') {
                            newModifiers['decreasedDamageTakenFromDemons'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'undeadDamageReductionPerc') {
                            newModifiers['decreasedDamageTakenFromUndead'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'lightningResistancePerc') {
                            newModifiers['decreasedDamageTakenFromFireSpells'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'fireResistancePerc') {
                            newModifiers['decreasedDamageTakenFromFireSpells'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'iceResistancePerc') {
                            newModifiers['decreasedDamageTakenFromWaterSpells'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'waterResistancePerc') {
                            newModifiers['decreasedDamageTakenFromWaterSpells'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'windResistancePerc') {
                            newModifiers['decreasedDamageTakenFromAirSpells'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'allResistancePerc') {
                            newModifiers['increasedDamageReduction'] = Math.floor(tempStats[statKeys[m]])
                          }
                        }
                        if (statKeys[m] === 'increasedPrayerPointsPerMonsterKill') {
                          newModifiers['increasedPrayerPointsPerMonsterKill'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'underwaterBreathing') {
                          newModifiers['increasedBonusFishingSpecialChance'] = Math.floor(tempStats[statKeys[m]] / 100000)
                        }
                        if (statKeys[m] === 'Enchanting') {
                          newModifiers['increasedRunecraftingEssencePreservation'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'stealthInShadowsPerc') {
                          newModifiers['increasedThievingStealth'] = Math.floor(tempStats[statKeys[m]]) * 10
                        }
                        if (statKeys[m] === 'command') {
                          newModifiers['increasedSummoningMaxHit'] = Math.floor(tempStats[statKeys[m]]) * 100
                        }
                        if (statKeys[m] === 'controlPlants') {
                          newModifiers['increasedSummoningMaxHit'] = Math.floor(tempStats[statKeys[m]]) * 10
                        }
                        if (statKeys[m] === 'controlUndead') {
                          newModifiers['increasedSummoningMaxHit'] = Math.floor(tempStats[statKeys[m]]) * 10
                        }
                        if (statKeys[m] === 'SpellSpeed') {
                          newModifiers['decreasedAttackIntervalPercent'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'allCostPerc') {
                          newModifiers['increasedRunePreservation'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'waterCostPerc') {
                          newModifiers['increasedRunePreservation'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'iceCostPerc') {
                          newModifiers['increasedRunePreservation'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'fireCostPerc') {
                          newModifiers['increasedRunePreservation'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'windCostPerc') {
                          newModifiers['increasedRunePreservation'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'lightningCostPerc') {
                          newModifiers['increasedRunePreservation'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'allSkillCooldownPerc') {
                          newModifiers['decreasedAttackIntervalPercent'] = Math.floor(tempStats[statKeys[m]])
                          newModifiers['decreasedGlobalSkillIntervalPercent'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'allIncreasedDamage') {
                          newModifiers['increasedDamageToAllMonsters'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'iceIncreasedDamage') {
                          newModifiers['increasedMaxWaterSpellDmg'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'waterIncreasedDamage') {
                          newModifiers['increasedMaxWaterSpellDmg'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'windIncreasedDamage') {
                          newModifiers['increasedMaxAirSpellDmg'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'fireIncreasedDamage') {
                          newModifiers['increasedMaxFireSpellDmg'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'lightningIncreasedDamage') {
                          newModifiers['increasedMaxFireSpellDmg'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'blockPerc') {
                          newModifiers['increasedChanceToDodge'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'manaRegenPerc') {
                          newModifiers['increasedHitpointRegeneration'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'diseaseResistance') {
                          newModifiers['poisonImmunity'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'diseaseResistancePerc') {
                          newModifiers['poisonImmunity'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'strengthPerc') {
                          newModifiers['increasedMeleeStrengthBonus'] = Math.floor(tempStats[statKeys[m]])
                          newModifiers['increasedRangedStrengthBonus'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'magicPerc') {
                          newModifiers['increasedMagicDamageBonus'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'CriticalHitDamage') {
                          newModifiers['increasedDamageToAllMonsters'] = Math.floor(tempStats[statKeys[m]] / 4)
                        }
                        if (statKeys[m] === 'CriticalHitChance') {
                          newModifiers['increasedMagicCritChance'] = Math.floor(tempStats[statKeys[m]])
                          newModifiers['increasedMeleeCritChance'] = Math.floor(tempStats[statKeys[m]])
                          newModifiers['increasedRangedCritChance'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'HP' || statKeys[m] === 'vitality') {
                          newModifiers['increasedFlatMaxHitpoints'] = (newModifiers['increasedFlatMaxHitpoints'] || 0) + Math.floor(tempStats[statKeys[m]] / 10)
                        }
                        if (statKeys[m] === 'HPPerc' || statKeys[m] === 'vitalityPerc') {
                          newModifiers['increasedMaxHitpoints'] = (newModifiers['increasedMaxHitpoints'] || 0) + Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'meleeDefenceBonus') {
                          for (let q = 0; q < newequipmentStats.length; q++) {
                            if (newequipmentStats[q].key === 'meleeDefenceBonus') {
                              newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]])
                            }
                          }
                        }
                        if (statKeys[m] === 'rangedDefenceBonus') {
                          for (let q = 0; q < newequipmentStats.length; q++) {
                            if (newequipmentStats[q].key === 'rangedDefenceBonus') {
                              newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]])
                            }
                          }
                        }
                        if (statKeys[m] === 'strength') {
                          for (let q = 0; q < newequipmentStats.length; q++) {
                            if (newequipmentStats[q].key === 'meleeStrengthBonus' || newequipmentStats[q].key === 'rangedStrengthBonus') {
                              newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]] * 10)
                            }
                          }
                        }
                        if (statKeys[m] === 'endurance') {
                          for (let q = 0; q < newequipmentStats.length; q++) {
                            if (newequipmentStats[q].key === 'meleeDefenceBonus' || newequipmentStats[q].key === 'rangedDefenceBonus') {
                              newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]] * 2)
                            }
                          }
                        }
                        if (statKeys[m] === 'physicalDamageReduction') {
                          for (let q = 0; q < newequipmentStats.length; q++) {
                            if (newequipmentStats[q].key === 'meleeDefenceBonus' || newequipmentStats[q].key === 'rangedDefenceBonus') {
                              newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]] * 2)
                            }
                          }
                        }
                        if (statKeys[m] === 'willpower' || statKeys[m] === 'magicDamageReduction') {
                          for (let q = 0; q < newequipmentStats.length; q++) {
                            if (newequipmentStats[q].key === 'magicDefenceBonus') {
                              newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                            }
                          }
                        }
                        if (statKeys[m] === 'magic') {
                          for (let q = 0; q < newequipmentStats.length; q++) {
                            if (newequipmentStats[q].key === 'magicAttackBonus') {
                              newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]] * 3)
                            }
                            if (newequipmentStats[q].key === 'magicDamageBonus') {
                              newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                            }
                          }
                        }
                        if (statKeys[m] === 'dexterity') {
                          for (let q = 0; q < newequipmentStats.length; q++) {
                            if (newequipmentStats[q].key === 'rangedAttackBonus' || newequipmentStats[q].key === 'rangedDefenceBonus') {
                              newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                            }
                          }
                        }
                        if (statKeys[m] === 'sense') {
                          for (let q = 0; q < newequipmentStats.length; q++) {
                            if (newequipmentStats[q].key === 'damageReduction') {
                              newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                            }
                          }
                        }
                        if (statKeys[m] === 'charisma') {
                          for (let q = 0; q < newequipmentStats.length; q++) {
                            if (newequipmentStats[q].key === 'summoningMaxhit') {
                              newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                            }
                          }
                        }
                      }
                    }
                  }
                  return { "newModifiers": newModifiers, "newequipmentStats": newequipmentStats }
                }
                const monadItemsKeys: Array<string> = Object.keys(monadItems)
                for (let index = 0; index < monadItemsKeys.length; index++) {
                  const id = monadItemsKeys[index]
                  // const monadItem: AnyMonadItemData = monadItems[id]
                  const type = monadItems[id].type
                  const itemID = id.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "")
                  if (game.items.getObjectByID(`${_namespace}:${itemID}`)) {
                    return;
                  }
                  // const price = parseInt(monadItems[id].long.replace(/\D/g,'')) // for shop data
                  if (type === "Set") {
                    // Add to set effects / ItemSynergyData
                    const newIDs: Array<string> = []
                    if (monadItems[id].itemIDs && monadItems[id].itemIDs.length > 0) {
                      for (let j = 0; j < monadItems[id].itemIDs.length; j++) {
                        newIDs.push(_namespace + ":" + monadItems[id].itemIDs[j].replace(/[^a-zA-Z ]/g, "").replace(/\s/g, ""))
                      }
                    }
                    const newSynergy: ItemSynergyData = {
                      "itemIDs": newIDs,
                      "playerModifiers": monadStats(monadItems[id].stats).newModifiers
                    }
                    if (newSynergy.itemIDs.length > 0) {
                      const Requirements = ['conditionalModifiers', "enemyModifiers", "equipmentStats"]
                      for (let j = 0; j < Requirements.length; j++) {
                        if (monadItems[id][Requirements[j]]) {
                          newSynergy[Requirements[j]] = monadItems[id][Requirements[j]]
                        }
                      }
                      itemPackage.itemSynergies.add(newSynergy)
                    }
                  }
                  else {
                    // Is added to items / AnyItemData
                    const newItem: AnyItemData = {
                      "id": itemID,
                      "name": monadItems[id].name,
                      "category": monadItems[id].category,
                      "type": type,
                      "itemType": type,
                      "media": monadItems[id]?.image || "",
                      "ignoreCompletion": false,
                      "obtainFromItemLog": false,
                      "golbinRaidExclusive": false,
                      "sellsFor": getMonadSalePrice(monadItems[id])
                    }
                    function getRndInteger(min, max) {
                      return Math.floor(Math.random() * (max - min)) + min;
                    }
                    function getMonadSalePrice(monadItem) {
                      if (monadItem.rating === "junk") {
                        return getRndInteger(1, 29)
                      }
                      else if (monadItem.rating === "common") {
                        return getRndInteger(30, 39)
                      }
                      else if (monadItem.rating === "normal") {
                        return getRndInteger(40, 199)
                      }
                      else if (monadItem.rating === "intermediate") {
                        return getRndInteger(200, 399)
                      }
                      else if (monadItem.rating === "advanced") {
                        return getRndInteger(400, 599)
                      }
                      else if (monadItem.rating === "rare") {
                        return getRndInteger(600, 2999)
                      }
                      else if (monadItem.rating === "epic") {
                        return getRndInteger(3000, 3999)
                      }
                      else if (monadItem.rating === "legendary") {
                        return getRndInteger(4000, 99999)
                      }
                      else if (monadItem.rating === "unique") {
                        return getRndInteger(100000, 1000000 - 1)
                      }
                      else if (monadItem.rating === "growth") {
                        return getRndInteger(1000000, 9999999)
                      }
                      else if (monadItem.rating === "quest") {
                        return 1
                      } else {
                        return 1
                      }
                    }
                    const newequipmentStats: ItemStats[] = monadItems[id].equipmentStats ? monadItems[id].equipmentStats : [
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
                    ]
                    const newModifiers: PlayerModifiers = monadItems[id].modifiers ? monadItems[id].modifiers : {

                    }
                    const newequipmentStatsFinal: any[] = []

                    if (monadItems[id].stats) {
                      const tempStats = monadItems[id].stats
                      const statKeys: Array<string> = Object.keys(tempStats)
                      if (statKeys.length > 0) {
                        for (let m = 0; m < statKeys.length; m++) {
                          if (kcm) {
                            if (statKeys[m] === 'elfDamageReductionPerc') {
                              newModifiers['decreasedDamageTakenFromElfs'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'goblinDamageReductionPerc') {
                              newModifiers['decreasedDamageTakenFromGoblins'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'robotDamageReductionPerc') {
                              newModifiers['decreasedDamageTakenFromRobots'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'orcDamageReductionPerc') {
                              newModifiers['decreasedDamageTakenFromOrcs'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'dragonDamageReductionPerc') {
                              newModifiers['decreasedDamageTakenFromDragons'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'humanDamageReductionPerc') {
                              newModifiers['decreasedDamageTakenFromHumans'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'elementalDamageReductionPerc') {
                              newModifiers['decreasedDamageTakenFromElementals'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'mythicalcreatureDamageReductionPerc') {
                              newModifiers['decreasedDamageTakenFromMythicalCreatures'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'seacreatureDamageReductionPerc') {
                              newModifiers['decreasedDamageTakenFromSeaCreatures'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'beastDamageReductionPerc') {
                              newModifiers['decreasedDamageTakenFromBeasts'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'demonDamageReductionPerc') {
                              newModifiers['decreasedDamageTakenFromDemons'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'undeadDamageReductionPerc') {
                              newModifiers['decreasedDamageTakenFromUndead'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'lightningResistancePerc') {
                              newModifiers['decreasedDamageTakenFromFireSpells'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'fireResistancePerc') {
                              newModifiers['decreasedDamageTakenFromFireSpells'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'iceResistancePerc') {
                              newModifiers['decreasedDamageTakenFromWaterSpells'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'waterResistancePerc') {
                              newModifiers['decreasedDamageTakenFromWaterSpells'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'windResistancePerc') {
                              newModifiers['decreasedDamageTakenFromAirSpells'] = Math.floor(tempStats[statKeys[m]])
                            }
                            if (statKeys[m] === 'allResistancePerc') {
                              newModifiers['increasedDamageReduction'] = Math.floor(tempStats[statKeys[m]])
                            }
                          }
                          if (statKeys[m] === 'increasedPrayerPointsPerMonsterKill') {
                            newModifiers['increasedPrayerPointsPerMonsterKill'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'underwaterBreathing') {
                            newModifiers['increasedBonusFishingSpecialChance'] = Math.floor(tempStats[statKeys[m]] / 100000)
                          }
                          if (statKeys[m] === 'Enchanting') {
                            newModifiers['increasedRunecraftingEssencePreservation'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'stealthInShadowsPerc') {
                            newModifiers['increasedThievingStealth'] = Math.floor(tempStats[statKeys[m]]) * 10
                          }
                          if (statKeys[m] === 'command') {
                            newModifiers['increasedSummoningMaxHit'] = Math.floor(tempStats[statKeys[m]]) * 100
                          }
                          if (statKeys[m] === 'controlPlants') {
                            newModifiers['increasedSummoningMaxHit'] = Math.floor(tempStats[statKeys[m]]) * 10
                          }
                          if (statKeys[m] === 'controlUndead') {
                            newModifiers['increasedSummoningMaxHit'] = Math.floor(tempStats[statKeys[m]]) * 10
                          }
                          if (statKeys[m] === 'SpellSpeed') {
                            newModifiers['decreasedAttackIntervalPercent'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'allCostPerc') {
                            newModifiers['increasedRunePreservation'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'waterCostPerc') {
                            newModifiers['increasedRunePreservation'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'iceCostPerc') {
                            newModifiers['increasedRunePreservation'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'fireCostPerc') {
                            newModifiers['increasedRunePreservation'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'windCostPerc') {
                            newModifiers['increasedRunePreservation'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'lightningCostPerc') {
                            newModifiers['increasedRunePreservation'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'allSkillCooldownPerc') {
                            newModifiers['decreasedAttackIntervalPercent'] = Math.floor(tempStats[statKeys[m]])
                            newModifiers['decreasedGlobalSkillIntervalPercent'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'allIncreasedDamage') {
                            newModifiers['increasedDamageToAllMonsters'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'iceIncreasedDamage') {
                            newModifiers['increasedMaxWaterSpellDmg'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'waterIncreasedDamage') {
                            newModifiers['increasedMaxWaterSpellDmg'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'windIncreasedDamage') {
                            newModifiers['increasedMaxAirSpellDmg'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'fireIncreasedDamage') {
                            newModifiers['increasedMaxFireSpellDmg'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'lightningIncreasedDamage') {
                            newModifiers['increasedMaxFireSpellDmg'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'blockPerc') {
                            newModifiers['increasedChanceToDodge'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'manaRegenPerc') {
                            newModifiers['increasedHitpointRegeneration'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'diseaseResistance') {
                            newModifiers['poisonImmunity'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'diseaseResistancePerc') {
                            newModifiers['poisonImmunity'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'strengthPerc') {
                            newModifiers['increasedMeleeStrengthBonus'] = Math.floor(tempStats[statKeys[m]])
                            newModifiers['increasedRangedStrengthBonus'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'magicPerc') {
                            newModifiers['increasedMagicDamageBonus'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'CriticalHitDamage') {
                            newModifiers['increasedDamageToAllMonsters'] = Math.floor(tempStats[statKeys[m]] / 4)
                          }
                          if (statKeys[m] === 'CriticalHitChance') {
                            newModifiers['increasedMagicCritChance'] = Math.floor(tempStats[statKeys[m]])
                            newModifiers['increasedMeleeCritChance'] = Math.floor(tempStats[statKeys[m]])
                            newModifiers['increasedRangedCritChance'] = Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'HP' || statKeys[m] === 'vitality') {
                            newModifiers['increasedFlatMaxHitpoints'] = (newModifiers['increasedFlatMaxHitpoints'] || 0) + Math.floor(tempStats[statKeys[m]] / 10)
                          }
                          if (statKeys[m] === 'HPPerc' || statKeys[m] === 'vitalityPerc') {
                            newModifiers['increasedMaxHitpoints'] = (newModifiers['increasedMaxHitpoints'] || 0) + Math.floor(tempStats[statKeys[m]])
                          }
                          if (statKeys[m] === 'meleeDefenceBonus') {
                            for (let q = 0; q < newequipmentStats.length; q++) {
                              if (newequipmentStats[q].key === 'meleeDefenceBonus') {
                                newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]])
                              }
                            }
                          }
                          if (statKeys[m] === 'rangedDefenceBonus') {
                            for (let q = 0; q < newequipmentStats.length; q++) {
                              if (newequipmentStats[q].key === 'rangedDefenceBonus') {
                                newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]])
                              }
                            }
                          }
                          if (statKeys[m] === 'strength') {
                            for (let q = 0; q < newequipmentStats.length; q++) {
                              if (newequipmentStats[q].key === 'meleeStrengthBonus' || newequipmentStats[q].key === 'rangedStrengthBonus') {
                                newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]] * 10)
                              }
                            }
                          }
                          if (statKeys[m] === 'endurance') {
                            for (let q = 0; q < newequipmentStats.length; q++) {
                              if (newequipmentStats[q].key === 'meleeDefenceBonus' || newequipmentStats[q].key === 'rangedDefenceBonus') {
                                newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]] * 2)
                              }
                            }
                          }
                          if (statKeys[m] === 'physicalDamageReduction') {
                            for (let q = 0; q < newequipmentStats.length; q++) {
                              if (newequipmentStats[q].key === 'meleeDefenceBonus' || newequipmentStats[q].key === 'rangedDefenceBonus') {
                                newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]] * 2)
                              }
                            }
                          }
                          if (statKeys[m] === 'willpower' || statKeys[m] === 'magicDamageReduction') {
                            for (let q = 0; q < newequipmentStats.length; q++) {
                              if (newequipmentStats[q].key === 'magicDefenceBonus') {
                                newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                              }
                            }
                          }
                          if (statKeys[m] === 'magic') {
                            for (let q = 0; q < newequipmentStats.length; q++) {
                              if (newequipmentStats[q].key === 'magicAttackBonus') {
                                newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]] * 3)
                              }
                              if (newequipmentStats[q].key === 'magicDamageBonus') {
                                newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                              }
                            }
                          }
                          if (statKeys[m] === 'dexterity') {
                            for (let q = 0; q < newequipmentStats.length; q++) {
                              if (newequipmentStats[q].key === 'rangedAttackBonus' || newequipmentStats[q].key === 'rangedDefenceBonus') {
                                newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                              }
                            }
                          }
                          if (statKeys[m] === 'sense') {
                            for (let q = 0; q < newequipmentStats.length; q++) {
                              if (newequipmentStats[q].key === 'damageReduction') {
                                newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                              }
                            }
                          }
                          if (statKeys[m] === 'charisma') {
                            for (let q = 0; q < newequipmentStats.length; q++) {
                              if (newequipmentStats[q].key === 'summoningMaxhit') {
                                newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                              }
                            }
                          }
                        }
                      }
                      for (let w = 0; w < newequipmentStats.length; w++) {
                        if (newequipmentStats[w].value > 0) {
                          newequipmentStatsFinal.push(newequipmentStats[w])
                        }
                      }
                    }
                    if (type === "Weapon") {
                      newequipmentStatsFinal.push(
                        {
                          "key": "attackSpeed",
                          "value": monadItems[id].stats.attackSpeed ? monadItems[id].stats.attackSpeed : 3000
                        }
                      )
                      newItem.equipmentStats = newequipmentStatsFinal
                      newItem.modifiers = { ...newItem.modifiers, ...newModifiers };
                      newItem.tier = "none"
                      const Requirements = ['attackType', 'ammoTypeRequired', 'validSlots', 'occupiesSlots', 'equipRequirements', '', 'enemyModifiers', 'conditionalModifiers', 'specialAttacks', 'overrideSpecialChances', 'fightEffects', 'providedRunes', 'ammoType ', 'consumesChargesOn', 'consumesOn', 'consumesItemOn']
                      for (let j = 0; j < Requirements.length; j++) {
                        if (monadItems[id][Requirements[j]]) {
                          newItem[Requirements[j]] = monadItems[id][Requirements[j]]
                        }
                      }
                    }
                    else if (type === "Food") {
                      const Requirements = ['healsFor']
                      for (let j = 0; j < Requirements.length; j++) {
                        if (monadItems[id][Requirements[j]]) {
                          newItem[Requirements[j]] = monadItems[id][Requirements[j]]
                        }
                      }
                    }
                    else if (type === "Bone") {
                      const Requirements = ['prayerPoints']
                      for (let j = 0; j < Requirements.length; j++) {
                        if (monadItems[id][Requirements[j]]) {
                          newItem[Requirements[j]] = monadItems[id][Requirements[j]]
                        }
                      }
                    }
                    else if (type === "Potion") {
                      const Requirements = ['modifiers', 'charges', 'action', 'consumesOn']
                      for (let j = 0; j < Requirements.length; j++) {
                        if (monadItems[id][Requirements[j]]) {
                          newItem[Requirements[j]] = monadItems[id][Requirements[j]]
                        }
                      }
                      newItem.tier = 0
                    }
                    else if (type === "Readable") {
                      const Requirements = ['modalID', 'swalData']
                      for (let j = 0; j < Requirements.length; j++) {
                        if (monadItems[id][Requirements[j]]) {
                          newItem[Requirements[j]] = monadItems[id][Requirements[j]]
                        }
                      }
                    }
                    else if (type === "Openable") {
                      const Requirements = ['dropTable', 'keyItem']
                      for (let j = 0; j < Requirements.length; j++) {
                        if (monadItems[id][Requirements[j]]) {
                          newItem[Requirements[j]] = monadItems[id][Requirements[j]]
                        }
                      }
                    }
                    else if (type === "Misc") {
                      const Requirements = ['keyItem']
                      for (let j = 0; j < Requirements.length; j++) {
                        if (monadItems[id][Requirements[j]]) {
                          newItem[Requirements[j]] = monadItems[id][Requirements[j]]
                        }
                      }
                      newItem.itemType = 'Item'
                    }
                    else if (type === "Equipment") {
                      newItem.equipmentStats = newequipmentStatsFinal
                      newItem.modifiers = newModifiers
                      newItem.tier = "none"
                      const Requirements = ['validSlots', 'occupiesSlots', 'equipRequirements', 'enemyModifiers', 'conditionalModifiers', 'specialAttacks', 'overrideSpecialChances', 'fightEffects', 'providedRunes', 'ammoType', 'consumesChargesOn', 'consumesOn', 'consumesItemOn']
                      for (let j = 0; j < Requirements.length; j++) {
                        if (monadItems[id][Requirements[j]]) {
                          newItem[Requirements[j]] = monadItems[id][Requirements[j]]
                        }
                      }
                    }
                    if (Object.keys(newModifiers).length < 1) {
                      newItem.customDescription = monadItems[id].description
                    }

                    if (newItem.itemType) { itemPackage.items.add(newItem), allItems.push(_namespace + ':' + itemID) }
                    else { errorLog.push("Unknown item", newItem) }
                  }
                }
              } catch (error) {
                errorLog.push("Error @ monadItems ", error)
              }
            }
            if (true) {
              try {
                const _namespaceItemList: Array<string> = [] // split into item ranks, then pass into monster ranks
                // All items already in the game
                game.items.registeredObjects.forEach((item: any) => {
                  try {
                    if (item) {
                      // Skip the item if its localID is in the bannedList
                      if (Object.keys(bannedList).includes(item.localID)) {
                        return;
                      }
                      if (Object.keys(bannedNameSpace).includes(item.namespace)) {
                        return;
                      }
                      if (Object.keys(categoryBan).includes(item.category)) {
                        return;
                      }
                      if (item.swalData) {
                        return;
                      }
                      if (item.ignoreCompletion) {
                        //   [
                        //     "Burnt_Shrimp",
                        //     "Burnt_Sardine",
                        //     "Burnt_Herring",
                        //     "Burnt_Trout",
                        //     "Burnt_Salmon",
                        //     "Burnt_Lobster",
                        //     "Burnt_Swordfish",
                        //     "Burnt_Crab",
                        //     "Burnt_Shark",
                        //     "Burnt_Manta_Ray",
                        //     "Burnt_Whale",
                        //     "Amulet_of_Calculated_Promotion",
                        //     "Burnt_Anglerfish",
                        //     "Burnt_Fanfish",
                        //     "Burnt_Seahorse",
                        //     "Burnt_Carp",
                        //     "Eight",
                        //     "Event_Clue_1",
                        //     "Event_Clue_2",
                        //     "Event_Clue_3",
                        //     "Event_Clue_4",
                        //     "Cake_Base",
                        //     "Candle",
                        //     "Magical_Icing",
                        //     "Magical_Flavouring",
                        //     "Birthday_Cake",
                        //     "Birthday_Token",
                        //     "Purple_Party_Hat",
                        //     "Futures_Prophecy",
                        //     "Yellow_Party_Hat",
                        //     "Red_Herring",
                        //     "Cool_Glasses",
                        //     "Enchanted_Topaz_Bolts",
                        //     "Enchanted_Sapphire_Bolts",
                        //     "Enchanted_Ruby_Bolts",
                        //     "Enchanted_Emerald_Bolts",
                        //     "Enchanted_Diamond_Bolts",
                        //     "Enchanted_Jadestone_Bolts",
                        //     "Poison_Ring",
                        //     "Burning_Ring",
                        //     "Frostburn_Ring",
                        //     "Mystery_Wand",
                        //     "Poison_Arrows",
                        //     "Fire_Arrows",
                        //     "Frost_Arrows",
                        //     "Burning_Wand",
                        //     "Frostburn_Wand",
                        //     "Ring_Of_Balance",
                        //     "Flying_Cape",
                        //     "Amulet_Of_Healing",
                        //     "Sword_Of_Some_Reliability",
                        //     "One_Layer_Shield",
                        //     "Warding_Shield",
                        //     "Tilted_Crossbow",
                        //     "Ultimate_Speed_Boots",
                        //     "Almighty_Ring",
                        //     "Punching_Bag_Platebody",
                        //     "Precision_Gloves",
                        //     "Heavy_Gloves",
                        //     "Ultimate_Slapping_Gloves",
                        //     "Amulet_Of_Burning_Leech",
                        //     "Amulet_Of_Poison_Leech",
                        //     "Magic_Crit_Amulet",
                        //     "Melee_Crit_Amulet",
                        //     "Bloodthirst_Amulet",
                        //     "Dragon_Head_Helmet",
                        //     "Stonewall_Shield",
                        //     "Impossible_Longbow",
                        //     "Throwing_Dragon_Sword",
                        //     "Cape_of_Completion",
                        //     "Unknown_Evil",
                        //     "New_Dawn",
                        //     "Abnormal_Log",
                        //     "Lemon_Cake",
                        //     "Lemon_Cake_Perfect",
                        //     "Beginning_Of_The_End",
                        //     "Impending_Darkness",
                        //     "Superior_Cape_Of_Completion",
                        //     "Woodcutting_Lesser_Relic",
                        //     "Fishing_Lesser_Relic",
                        //     "Firemaking_Lesser_Relic",
                        //     "Cooking_Lesser_Relic",
                        //     "Mining_Lesser_Relic",
                        //     "Smithing_Lesser_Relic",
                        //     "Thieving_Lesser_Relic",
                        //     "Fletching_Lesser_Relic",
                        //     "Crafting_Lesser_Relic",
                        //     "Runecrafting_Lesser_Relic",
                        //     "Herblore_Lesser_Relic",
                        //     "Agility_Lesser_Relic",
                        //     "Summoning_Lesser_Relic",
                        //     "Astrology_Lesser_Relic",
                        //     "Cape_of_Completion_AoD",
                        //     "Test_Gem"
                        // ]
                        return;
                      }
                      // if (item.namespace === _namespace) {
                      //   allItems.push(`${item.namespace}:${item.localID}`)
                      // } else {
                      // https://wiki.melvoridle.com/index.php?title=Table_of_Items
                      allItems.push(`${item.namespace}:${item.localID}`)

                      if (item.category === "Archaeology") {
                        growthItems.push(item.namespace + ":" + item.localID)
                      }

                      else if (item.sellsFor < 1 && item.type != "Misc") questItems.push(item.namespace + ':' + item.localID)

                      else if (item.sellsFor < 30) {
                        junkItems.push(item.namespace + ':' + item.localID)
                      }

                      else if (item.sellsFor < 40) commonItems.push(item.namespace + ':' + item.localID)

                      else if (item.sellsFor < 200) normalItems.push(item.namespace + ':' + item.localID)

                      else if (item.sellsFor < 400) intermediateItems.push(item.namespace + ':' + item.localID)

                      else if (item.sellsFor < 600) advancedItems.push(item.namespace + ':' + item.localID)

                      else if (item.sellsFor < 3000) rareItems.push(item.namespace + ':' + item.localID)

                      else if (item.sellsFor < 4000) epicItems.push(item.namespace + ':' + item.localID)

                      else if (item.sellsFor < 100000) {
                        legendaryItems.push(item.namespace + ':' + item.localID)
                      }

                      else if (item.sellsFor < 1000000) uniqueItems.push(item.namespace + ':' + item.localID)

                      else { growthItems.push(item.namespace + ':' + item.localID) }
                      // }
                    }
                  } catch (error) {
                    errorLog.push("game.items.registeredObjects.forEach ", error)
                  }
                })
                // All items added from this mod
                allItems.forEach(item => {
                  if (item.includes(_namespace)) { _namespaceItemList.push(`${item}`) }

                  itemPackage.items.modify({
                    id: `${_namespace}:lootbox`,
                    dropTable: {
                      add: [
                        {
                          itemID: `${item}`,
                          minQuantity: 1,
                          maxQuantity: 1,
                          weight: 1
                        }
                      ]
                    },
                  })
                })
                // All monsters already in the game
                game.monsters.forEach(monster => {
                  // if (monster && monster.namespace === _namespace) {
                  allMonsters.push(monster)
                  // }
                })
                idLog.push(allMonsters)
                // All monsters added from this mod
                allMonsters.forEach(monster => {
                  if (monster) {
                    let monsterId = ''
                    if (monster instanceof Monster) {
                      monsterId = `${monster.namespace + ':' + monster.localID}`
                    } else {
                      monsterId = `${_namespace + ':' + monster.id}`
                    }
                    if (monsterId && !monster.isBoss) {
                      itemPackage.dungeons.modify({
                        "id": `${_namespace}:Monad_Dungeon`,
                        "monsters": {
                          "add": [
                            {
                              "monsterID": monsterId,
                              "insertAt": 0
                            }
                          ]
                        }
                      })
                      // if (_namespaceItemList.length > 0) {
                      //   itemPackage.monsters.modify({
                      //     "id": monsterId,
                      //     "lootTable": {
                      //       "add": [
                      //         {
                      //           "itemID": `${_namespaceItemList.pop()}`,
                      //           "maxQuantity": 1,
                      //           "minQuantity": 1,
                      //           "weight": 1
                      //         }
                      //       ]
                      //     }
                      //   });
                      // }
                      if (combatLevelCalc(monster.levels) > 1 && junkItems.length > 0) {
                        itemPackage.monsters.modify({
                          "id": monsterId,
                          "lootTable": {
                            "add": [
                              {
                                "itemID": `${junkItems.shift()}`,
                                "maxQuantity": randomNumber(1, calculateRewardsMax(combatLevelCalc(monster.levels), 100)),
                                "minQuantity": 1,
                                "weight": 1
                              }
                            ]
                          }
                        });
                      }
                      if (combatLevelCalc(monster.levels) > 70 && commonItems.length > 0) {
                        itemPackage.monsters.modify({
                          "id": monsterId,
                          "lootTable": {
                            "add": [
                              {
                                "itemID": `${commonItems.shift()}`,
                                "maxQuantity": randomNumber(1, calculateRewardsMax(combatLevelCalc(monster.levels), 70)),
                                "minQuantity": 1,
                                "weight": 1
                              }
                            ]
                          }
                        });
                      }
                      if (combatLevelCalc(monster.levels) > 121 && normalItems.length > 0) {
                        itemPackage.monsters.modify({
                          "id": monsterId,
                          "lootTable": {
                            "add": [
                              {
                                "itemID": `${normalItems.shift()}`,
                                "maxQuantity": randomNumber(1, calculateRewardsMax(combatLevelCalc(monster.levels), 50)),
                                "minQuantity": 1,
                                "weight": 1
                              }
                            ]
                          }
                        });
                      }
                      if (combatLevelCalc(monster.levels) > 158 && intermediateItems.length > 0) {
                        itemPackage.monsters.modify({
                          "id": monsterId,
                          "lootTable": {
                            "add": [
                              {
                                "itemID": `${intermediateItems.shift()}`,
                                "maxQuantity": randomNumber(1, calculateRewardsMax(combatLevelCalc(monster.levels), 20)),
                                "minQuantity": 1,
                                "weight": 1
                              }
                            ]
                          }
                        });
                      }
                      if (combatLevelCalc(monster.levels) > 220 && advancedItems.length > 0) {
                        itemPackage.monsters.modify({
                          "id": monsterId,
                          "lootTable": {
                            "add": [
                              {
                                "itemID": `${advancedItems.shift()}`,
                                "maxQuantity": randomNumber(1, calculateRewardsMax(combatLevelCalc(monster.levels), 10)),
                                "minQuantity": 1,
                                "weight": 1
                              }
                            ]
                          }
                        });
                      }
                      if (combatLevelCalc(monster.levels) > 500 && rareItems.length > 0) {
                        itemPackage.monsters.modify({
                          "id": monsterId,
                          "lootTable": {
                            "add": [
                              {
                                "itemID": `${rareItems.shift()}`,
                                "maxQuantity": randomNumber(1, calculateRewardsMax(combatLevelCalc(monster.levels), 6)),
                                "minQuantity": 1,
                                "weight": 1
                              }
                            ]
                          }
                        });
                      }
                      if (combatLevelCalc(monster.levels) > 700 && epicItems.length > 0) {
                        itemPackage.monsters.modify({
                          "id": monsterId,
                          "lootTable": {
                            "add": [
                              {
                                "itemID": `${epicItems.shift()}`,
                                "maxQuantity": randomNumber(1, calculateRewardsMax(combatLevelCalc(monster.levels), 2)),
                                "minQuantity": 1,
                                "weight": 1
                              }
                            ]
                          }
                        });
                      }
                      if (combatLevelCalc(monster.levels) > 900 && legendaryItems.length > 0) {
                        itemPackage.monsters.modify({
                          "id": monsterId,
                          "lootTable": {
                            "add": [
                              {
                                "itemID": `${legendaryItems.shift()}`,
                                "maxQuantity": 1,
                                "minQuantity": 1,
                                "weight": 1
                              }
                            ]
                          }
                        });
                      }
                      if (combatLevelCalc(monster.levels) > 1000 && uniqueItems.length > 0) {
                        itemPackage.monsters.modify({
                          "id": monsterId,
                          "lootTable": {
                            "add": [
                              {
                                "itemID": `${uniqueItems.shift()}`,
                                "maxQuantity": 1,
                                "minQuantity": 1,
                                "weight": 1
                              }
                            ]
                          }
                        });
                      }
                      if (combatLevelCalc(monster.levels) > 1200 && growthItems.length > 0) {
                        itemPackage.monsters.modify({
                          "id": monsterId,
                          "lootTable": {
                            "add": [
                              {
                                "itemID": `${growthItems.shift()}`,
                                "maxQuantity": 1,
                                "minQuantity": 1,
                                "weight": 1
                              }
                            ]
                          }
                        });
                      }
                      if (false && combatLevelCalc(monster.levels) > 3000 && questItems.length > 0) {
                        itemPackage.monsters.modify({
                          "id": monsterId,
                          "lootTable": {
                            "add": [
                              {
                                "itemID": `${questItems.shift()}`,
                                "maxQuantity": 1,
                                "minQuantity": 1,
                                "weight": 1
                              }
                            ]
                          }
                        });
                      }
                    }
                    // do for other item lists and dont add else so more monsters get more items.
                    // align quanaity with combat level
                  }
                })
              } catch (error) {
                errorLog.push("Item builder for all of monad", error)
              }
            }
          } catch (error) {
            errorLog.push("Error @ Monad onModsLoaded itempackage", error)
          }
        });
        initialPackage.add();
        game.monad = initialPackage
        game.idLog = idLog
        if (kcm) {
          const cmim = mod.api.customModifiersInMelvor;
          if (!cmim) {
            return;
          }
          if (TothEntitlement) {
            UndeadList.push(
              "melvorF:ElderVampire",
              "melvorTotH:CursedSkeletonWarrior",
              "melvorTotH:CursedSpirit",
              "melvorTotH:LadyDarkheart",
              "melvorTotH:Phantom",
              "melvorTotH:Banshee",
              "melvorTotH:Spectre",
              "melvorTotH:VorloranDevastator",
              "melvorTotH:VorloranWatcher",
              "melvorTotH:VorloranProtector",
            )
            SeaCreatureList.push(
              "melvorTotH:TwinSeaDragonSerpent",
              "melvorTotH:Leviathan",
            )
            BeastList.push(
              "melvorTotH:PoisonToad",
              "melvorTotH:Conda",
              "melvorTotH:BurningSnake",
              "melvorTotH:PolarBear",
              "melvorTotH:SpectralIceWolf",
              "melvorTotH:MonsterCroc",
              "melvorTotH:ScouterSpider",
              "melvorTotH:TrapperSpider",
              "melvorTotH:WickedSpider",
              "melvorTotH:BasherSpider",
              "melvorTotH:EnforcerSpider",
              "melvorTotH:GuardianSpider",
              "melvorTotH:SpiderQueen",
              "melvorTotH:Beholder",
              "melvorTotH:ShadowBeast",
            )
            PlantList.push(
              "melvorTotH:HungryPlant",
              "melvorTotH:Alraune",
              "melvorTotH:Morellia",
              "melvorTotH:TreeGiant",
              "melvorTotH:TreeSpirit",
            )
            DragonList.push(
              "melvorTotH:Kongamato", "melvorTotH:GretYun", "melvorTotH:RaZu",
            )
            DemonList.push("melvorTotH:MagicFireDemon",)
            MythList.push(
              "melvorTotH:Manticore",
              "melvorTotH:IceHydra",
              "melvorTotH:Leviathan",
              "melvorTotH:Siren",
              "melvorTotH:GoliathWerewolf",
              "melvorTotH:Torvair",
              "melvorTotH:Arctair",
              "melvorTotH:Harkair",
              "melvorTotH:Cockatrice",
              "melvorTotH:GuardianoftheHerald",
            )
            ElementalCreatureList.push(
              "melvorTotH:InfernalGolem", "melvorTotH:Trogark", "melvorTotH:LargeIceTroll", "melvorTotH:FrostGolem", "melvorTotH:LightningSpirit", "melvorTotH:LightningGolem", "melvorTotH:LightningMonkey",
            )
            HumansList.push("melvorTotH:PlagueDoctor",)
            //     "melvorTotH:TheHeraldPhase1",
            //     "melvorTotH:TheHeraldPhase2",
            //     "melvorTotH:TheHeraldPhase3"

          }
          if (mythLoaded) {
            HumansList.push("mythMusic:Jester",
              "mythMusic:Enchanted_Jester",
              "mythMusic:Mystic_Jester")
          }
          cmim.addMonsters("Dragon", DragonList)
          cmim.addMonsters("Human", HumansList)
          cmim.addMonsters("Undead", UndeadList)
          cmim.addMonsters("Demon", DemonList)
          cmim.addMonsters("Beast", BeastList)
          cmim.addMonsters("MythicalCreature", MythList)
          cmim.addMonsters("SeaCreature", SeaCreatureList)
          cmim.addMonsters("Elemental", ElementalCreatureList)

          cmim.registerOrUpdateType("Elf", "Elves", "https://cdn.melvor.net/core/v018/assets/media/pets/elf_rock.png", elfList, true);
          cmim.registerOrUpdateType("Goblin", "Goblins", "https://cdn.melvor.net/core/v018/assets/media/monsters/goblin.png", GoblinList, true);
          cmim.registerOrUpdateType("Robot", "Robots", "https://cdn.melvor.net/core/v018/assets/media/pets/smithing.png", RobotsList, true);
          cmim.registerOrUpdateType("Orc", "Orcs", "https://cdn.melvor.net/core/v018/assets/media/monsters/goblin.png", OrcList, true);
          cmim.registerOrUpdateType("Plant", "Plants", "https://cdn.melvor.net/core/v018/assets/media/monsters/plant.png", PlantList, true);

          cmim.registerOrUpdateType("Ooze", "Oozes", "https://cdn.melvor.net/core/v018/assets/media/monsters/plant.png", OozesList, true);
          cmim.registerOrUpdateType("Aberration", "Aberrations", "https://cdn.melvor.net/core/v018/assets/media/monsters/plant.png", AberrationsList, true);

          cmim.registerOrUpdateType("Angel", "Angels", "https://cdn.melvor.net/core/v018/assets/media/monsters/plant.png", CelestialsList, true);
          cmim.registerOrUpdateType("Construct", "Constructs", "https://cdn.melvor.net/core/v018/assets/media/monsters/plant.png", ConstructsList, true);
          cmim.registerOrUpdateType("Fey", "Feys", "https://cdn.melvor.net/core/v018/assets/media/monsters/plant.png", FeyList, true);
          cmim.registerOrUpdateType("Demon", "Demons", "https://cdn.melvor.net/core/v018/assets/media/monsters/plant.png", FiendList, true);
          cmim.registerOrUpdateType("Giant", "Giants", "https://cdn.melvor.net/core/v018/assets/media/monsters/plant.png", GiantsList, true);
          // cmim.registerOrUpdateType("monstrosity", "Monstrosities", "https://cdn.melvor.net/core/v018/assets/media/monsters/plant.png", MonstrositiesList, true);
          // mod.api.customModifiersInMelvor.getMonstersOfType('Ooze')

          cmim.forceBaseModTypeActive("Dragon");
          cmim.forceBaseModTypeActive("Undead");
          cmim.forceBaseModTypeActive("Human");
          cmim.forceBaseModTypeActive("Beast");
          cmim.forceBaseModTypeActive("Demon");
          cmim.forceBaseModTypeActive("Elemental");
          cmim.forceBaseModTypeActive("MythicalCreature");
          cmim.forceBaseModTypeActive("SeaCreature");
        }
      } catch (error) {
        errorLog.push("Error, Monad onModsLoaded", error)
      }
    });
    ctx.onCharacterLoaded(ctx => {
      try {
        // deal with synergies
        const synergiesForExport = []
        const found_items = []
        game.itemSynergies.forEach(synergies => {
          if (synergies && synergies.length > 0) {
            synergies.forEach(synergy => {
              synergy.items.forEach(item => {
                // @ts-ignore
                // if (item?._namespace?.name === "monad") {
                  // @ts-ignore
                  if (!found_items.includes(item)) found_items.push(item)
                  // @ts-ignore
                  if (!synergiesForExport.includes(synergy)) synergiesForExport.push(synergy)
                // }
              })
            })
          }
        })
        found_items.forEach(item => {
          const monad_item = game.items.getObjectByID(item._namespace.name + ":" + item._localID)
          if (monad_item._customDescription) {
            monad_item._customDescription = monad_item._customDescription + ". Click the small <strong class=\"text-warning\">synergy icon</strong> to find out which synergies this item is effected by."
          } else {
            monad_item._customDescription = monad_item.description + ". Click the small <strong class=\"text-warning\">synergy icon</strong> to find out which synergies this item is effected by."
          }
        })
        game.allSynergies = synergiesForExport
      } catch (error) {
        console.log(error)
      }
    })
  } catch (error) {
    errorLog.push("Error, Monad setup", error)
  }
  game.monadErrorLog = errorLog
}


// game.items.registeredObjects.forEach(item => {
//     if(item._namespace.name === "monad") {
//         game.bank.addItem(item, 1, true, true, false);
//     }
// })

// ["monad:TrainingHealthPotion","monad:Soulboundwand","monad:BoneLance","monad:TraineeBoneSpear","monad:PaladinEngelersBodyArmoursilverrank","monad:PaladinEngelersSalletsilverrank","monad:PaladinEngelersGauntletssilverrank","monad:PaladinEngelersSabatonsilverrank","monad:PaladinEngelersMacesilverrank","monad:PaladinEngelersShieldsilverrank","monad:PaladinEngelersCapesilverrank","monad:DemonHunterNecklace","monad:DemonHunterBracelet","monad:DemonHunterEaring","monad:DemonHunterRing","monad:ToadsSkinJacket","monad:CrownoftheDammed","monad:Ringofinitialundeadcontrol","monad:RingofLittleStrength","monad:PendentofMediumMagic","monad:WitchesHat","monad:QueensPawn","monad:Skullofvictim","monad:EnchantingQuill","monad:PrincessesCoin","monad:necklacemadeofteeth","monad:Blackscarf","monad:WhaleSkin","monad:LinenHalfgloves","monad:BattlemagesGloves","monad:BattlemagesHat","monad:BattlemagesRobe","monad:BattlemagesCrakows","monad:BattlemagesBreeches","monad:CottonScarf","monad:RayndrJackboots","monad:RoguesRing","monad:DarkElfsScimitar","monad:MeroyriXiphos","monad:RayndrFaceMask","monad:ShadowPiratesCoat","monad:LeatherPirateBoots","monad:BlackBand","monad:TidusEaring","monad:FeaturelessDeathwoodMask","monad:BlackBraidBracelet","monad:FrostGloves","monad:FlameGloves","monad:CeremonialWhiteStagMask","monad:HeavenlyWhiteStagMask","monad:AcademyRobeBlackYellow","monad:HuiLusBattleArmour","monad:HuiLusEnchantingGloves","monad:HuiLusBurningBoots","monad:OtariKote","monad:GlideMoroha","monad:GaleMoroha","monad:NiyoshoGakuran","monad:NiyoshoHakama","monad:OttosLeakyWand","monad:JokotoWakizashi","monad:Seifuku","monad:NiyoshoKimono","monad:AutumnCloak"]


// yee!
// "Fire Blast" for example, could add, depending on your attack type:
// Burn damage (for Melee and Ranged)
// "Free" Fire Runes (like the Fire elemental staves do, I mean) and/or More damage to Fire elemental spells (for Magic)
// I remember there being "Trap" gems
// those could be slower attack speed for monsters, and +x% to whatever element they might be
// I remember there being at least Poison and Fire (since those were the ones I used)
// Al [S/Mas/P - 11.2/1.3/2.6%] — Today at 3:52 PM
// also elemental and non-elemental Teleport/Dash gems
// Teleport ones could be +x% to whichever element they might be, and +y% attack speed/-z attack interval
// and same for Dash, except the attack speed bonus should be lower than the Teleport ones, but maybe higher element damage?
// Teleport due to being faster (literally instant) movement
// Dash being slower but also leaving a damaging trail/AoE of some kind to and from where you moved