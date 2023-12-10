// Modules
// You can import script modules and have full type completion

// Data
// Game data for registration
import { ItemList as monadItems } from '../data/monad-data';
import { nonSupport } from '../data/poe.data';
import pokemon3 from '../data/data.pokemon.3.json';


// Styles
// Will automatically load your styles upon loading the mod
import '../css/styles.css';

// Images
// To bundle your mod's icon
import '../img/icon.png';
import '../img/items/BloodPotion.png';
import '../img/items/Black_Band.png';
import '../img/items/Miolite_Gloves.png';
import '../img/people/owl.jpg';
import '../img/items/lootbox.png';

// Reference images using `ctx.getResourceUrl`

export async function setup(ctx: Modding.ModContext) {
  const errorLog: any[] = []
  try {
    // Register our GameData
    await ctx.gameData.addPackage('data.json');
    // await ctx.gameData.addPackage('monad-data.json');

    // Because we're loading our templates.min.html file via the manifest.json,
    // the templates aren't available until after the setup() function runs
    ctx.onModsLoaded(async () => {
      try {
        const TothEntitlement = cloudManager.hasTotHEntitlement
        const kcm = mod.manager.getLoadedModList().includes('Custom Modifiers in Melvor')
        const tes = mod.manager.getLoadedModList().includes("The Elder Scrolls")
        const mythLoaded = mod.manager.getLoadedModList().includes("[Myth] Music")
        // const dboxLoaded = mod.manager.getLoadedModList().includes('dbox')
        // const Abyssal = mod.manager.getLoadedModList().includes('Abyssal Rift')
        // const Pokeworld = mod.manager.getLoadedModList().includes('Pokeworld (Generation 1)')
        // const Runescape = mod.manager.getLoadedModList().includes('Runescape Encounters in Melvor')

        if (kcm) {
          const cmim = mod.api.customModifiersInMelvor;
          if (!cmim) {
            return;
          }
          const DragonList: any[] = [
          ]
          const HumansList: any[] = [
          ]
          const UndeadList: any[] = [
            "melvorF:ElderVampire",
          ]
          const DemonList: any[] = [
          ]
          const AnimalList: any[] = [
          ]
          const GoblinList: any[] = [
            "melvorD:Golbin",
            "melvorD:RangedGolbin",
          ]
          const MythList: any[] = [
          ]
          const elfList: any[] = [
          ]
          const RobotsList: any[] = [
          ]
          const OrcList: any[] = [
          ]
          const SeaCreatureList: any[] = [
          ]
          const ElementalCreatureList: any[] = [
          ]
          const PlantList: any[] = [
            "melvorD:Plant"
          ]
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
            AnimalList.push(
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
          cmim.addMonsters("Animal", AnimalList)
          cmim.addMonsters("MythicalCreature", MythList)
          cmim.addMonsters("SeaCreature", SeaCreatureList)
          cmim.addMonsters("Elemental", ElementalCreatureList)

          cmim.registerOrUpdateType("Elf", "Elves", "https://cdn.melvor.net/core/v018/assets/media/pets/elf_rock.png", elfList, true);
          cmim.registerOrUpdateType("Goblin", "Goblins", "https://cdn.melvor.net/core/v018/assets/media/monsters/goblin.png", GoblinList, true);
          cmim.registerOrUpdateType("Robot", "Robots", "https://cdn.melvor.net/core/v018/assets/media/pets/smithing.png", RobotsList, true);
          cmim.registerOrUpdateType("Orc", "Orcs", "https://cdn.melvor.net/core/v018/assets/media/monsters/goblin.png", OrcList, true);
          cmim.registerOrUpdateType("Plant", "Plants", "https://cdn.melvor.net/core/v018/assets/media/monsters/plant.png", PlantList, true);

          cmim.forceBaseModTypeActive("Dragon");
          cmim.forceBaseModTypeActive("Undead");
          cmim.forceBaseModTypeActive("Human");
          cmim.forceBaseModTypeActive("Animal");
          cmim.forceBaseModTypeActive("Demon");
          cmim.forceBaseModTypeActive("Elemental");
          cmim.forceBaseModTypeActive("MythicalCreature");
          cmim.forceBaseModTypeActive("SeaCreature");
        }

        const monadItemsKeys: any[] = Object.keys(monadItems)
        const idLog: any[] = []
        // Error: [test] Error constructing NamespacedObject. Local ID "Training Health Potion" is invalid.
        const initialPackage = ctx.gameData.buildPackage((itemPackage: any) => {
          try {
            for (let index = 0; index < pokemon3.length; index++) {
              const NewPet: any = {
                name: pokemon3[index].name,
                media: pokemon3[index].src,
                "id": pokemon3[index].name + "_pet",
                "hint": "Pokemon Gen 3",
                "modifiers": {
                  "increasedHolyDustFromBlessedOffering": 1
                },
                "activeInRaid": false,
                "scaleChanceWithMasteryPool": false,
                "ignoreCompletion": false
              }
              const newMonster: any = {
                "id": pokemon3[index].name + "_monster",
                "name": pokemon3[index].name,
                "media": pokemon3[index].src,
                "levels": {
                  "Attack": 1,
                  "Defence": 1,
                  "Hitpoints": 1,
                  "Magic": 1,
                  "Ranged": 1,
                  "Strength": 1
                },
                "equipmentStats": [
                  {
                    "key": "attackSpeed",
                    "value": 2400
                  }
                ],
                "specialAttacks": [],
                "passives": [],
                "ignoreCompletion": false,
                "attackType": "ranged",
                "lootChance": 50,
                "lootTable": [
                  {
                    "itemID": "melvorD:Steel_Arrows",
                    "maxQuantity": 100,
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
                "selectedSpell": "melvorD:WindStrike",
                "pet": {

                }
              }
              newMonster['pet'] = {
                "id": "monad:" + pokemon3[index].name + "_pet",
                "quantity": 1000
              }
              for (let j = 0; j < pokemon3[index].stats.length; j++) {
                const attackType: any = {}
                if (pokemon3[index].stats[j].stat.name === 'hp') newMonster['levels']['Hitpoints'] = pokemon3[index].stats[j].base_stat
                if (pokemon3[index].stats[j].stat.name === 'attack') {
                  newMonster['levels']['Attack'] = pokemon3[index].stats[j].base_stat
                  attackType['Attack'] = pokemon3[index].stats[j].base_stat
                }
                if (pokemon3[index].stats[j].stat.name === 'defense') newMonster['levels']['Defence'] = pokemon3[index].stats[j].base_stat
                if (pokemon3[index].stats[j].stat.name === 'defense') newMonster['equipmentStats'].push(
                  {
                    "key": "rangedDefenceBonus",
                    "value": pokemon3[index].stats[j].base_stat
                  },
                  {
                    "key": "meleeDefenceBonus",
                    "value": pokemon3[index].stats[j].base_stat
                  }
                )
                if (pokemon3[index].stats[j].stat.name === 'attack') newMonster['levels']['Strength'] = pokemon3[index].stats[j].base_stat
                if (pokemon3[index].stats[j].stat.name === 'attack') newMonster['equipmentStats'].push(
                  {
                    "key": "meleeStrengthBonus",
                    "value": pokemon3[index].stats[j].base_stat
                  },
                  {
                    "key": "rangedStrengthBonus",
                    "value": pokemon3[index].stats[j].base_stat
                  }
                )
                if (pokemon3[index].stats[j].stat.name === 'attack') newMonster['levels']['Ranged'] = pokemon3[index].stats[j].base_stat
                if (pokemon3[index].stats[j].stat.name === 'special-attack') {
                  newMonster['levels']['Magic'] = pokemon3[index].stats[j].base_stat
                  attackType['Magic'] = pokemon3[index].stats[j].base_stat
                }
                if (pokemon3[index].stats[j].stat.name === 'special-attack') newMonster['equipmentStats'].push({
                  "key": "magicAttackBonus",
                  "value": pokemon3[index].stats[j].base_stat
                })
                if (pokemon3[index].stats[j].stat.name === 'special-defense') newMonster['equipmentStats'].push({
                  "key": "magicDefenceBonus",
                  "value": pokemon3[index].stats[j].base_stat
                })
                if(attackType['Magic'] > attackType['Attack']) {
                  newMonster["attackType"] = "magic"
                } else {
                  Math.random() < 0.5 ? newMonster["attackType"] = "ranged" : newMonster["attackType"] = "melee"
                }
              }
              idLog.push("monad:" + pokemon3[index].name + "_pet")
              itemPackage.monsters.add(newMonster)
              itemPackage.pets.add(NewPet)
            }
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
              }
              // idLog.push(nonSupport[index].name, Object.keys(newPoeGem.modifiers))
              // if (Object.keys(newPoeGem.modifiers).length < 1) {
              newPoeGem.customDescription = nonSupport[index].secDescrText
              // }
              if (newPoeGem.id) { itemPackage.items.add(newPoeGem) }
              itemPackage.items.modify({
                id: "monad:lootbox",
                dropTable: {
                  add: [
                    {
                      itemID: `monad:${newPoeGem.id}`,
                      minQuantity: 1,
                      maxQuantity: 1,
                      weight: 1
                    }
                  ]
                },
              })
            }
            for (let index = 0; index < monadItemsKeys.length; index++) {
              const id = monadItemsKeys[index]
              const type = monadItems[id].type
              const itemID = id.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "")
              if (game.items.getObjectByID(`monad:${itemID}`)) {
                return;
              }
              // const price = parseInt(monadItems[id].long.replace(/\D/g,'')) // for shop data
              if (type === "Set") {
                // Add to set effects / ItemSynergyData
                const newIDs: any[] = []
                if (monadItems[id].itemIDs && monadItems[id].itemIDs.length > 0) {
                  for (let j = 0; j < monadItems[id].itemIDs.length; j++) {
                    newIDs.push('monad:' + monadItems[id].itemIDs[j].replace(/[^a-zA-Z ]/g, "").replace(/\s/g, ""))
                  }
                }
                const newSynergy: any = {
                  "itemIDs": newIDs
                }
                if (newSynergy.itemIDs.length > 0) {
                  const Requirements = ['conditionalModifiers', "enemyModifiers", "equipmentStats", "playerModifiers"]
                  for (let j = 0; j < Requirements.length; j++) {
                    if (monadItems[id][Requirements[j]]) {
                      newSynergy[Requirements[j]] = monadItems[id][Requirements[j]]
                    }
                  }
                  itemPackage.itemSynergies.add(newSynergy)
                }
              }
              else {
                // idLog.push("monad:" + itemID)
                // Is added to items / AnyItemData
                const newItem: any = {
                  "id": itemID,
                  "name": monadItems[id].name,
                  "category": monadItems[id].category,
                  "type": type,
                  "itemType": type,
                  "media": monadItems[id].image || "",
                  "ignoreCompletion": false,
                  "obtainFromItemLog": false,
                  "golbinRaidExclusive": false,
                  "sellsFor": monadItems[id].sellsFor,
                  // "customDescription": monadItems[id].description,
                }
                const newequipmentStats: any[] = [
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
                const newModifiers: any = {

                }
                const newequipmentStatsFinal: any[] = []

                if (monadItems[id].stats) {
                  const tempStats: any[] = monadItems[id].stats
                  const statKeys: any[] = Object.keys(tempStats)
                  if (statKeys.length > 0) {
                    for (let m = 0; m < statKeys.length; m++) {
                      if (kcm) {
                        // traitApplied: `${typeSingularNameLower}TraitApplied`,
                        // increasedDamage: `increasedDamageAgainst${typePluralName}`,
                        // decreasedDamage: `decreasedDamageAgainst${typePluralName}`,
                        // increasedDamageTaken: `increasedDamageTakenFrom${typePluralName}`,
                        // decreasedDamageTaken: `decreasedDamageTakenFrom${typePluralName}`,
                        // increasedMaxHitPercent: `increasedMaxHitPercentAgainst${typePluralName}`,
                        // decreasedMaxHitPercent: `decreasedMaxHitPercentAgainst${typePluralName}`,
                        // increasedMaxHitFlat: `increasedMaxHitFlatAgainst${typePluralName}`,
                        // decreasedMaxHitFlat: `decreasedMaxHitFlatAgainst${typePluralName}`,
                        // increasedMinHitBasedOnMaxHit: `increasedMinHitBasedOnMaxHitAgainst${typePluralName}`,
                        // decreasedMinHitBasedOnMaxHit: `decreasedMinHitBasedOnMaxHitAgainst${typePluralName}`,
                        // increasedFlatMinHit: `increasedFlatMinHitAgainst${typePluralName}`,
                        // decreasedFlatMinHit: `decreasedFlatMinHitAgainst${typePluralName}`,
                        // increasedGlobalAccuracy: `increasedGlobalAccuracyAgainst${typePluralName}`,
                        // decreasedGlobalAccuracy: `decreasedGlobalAccuracyAgainst${typePluralName}`,
                        // increasedDamageReduction: `increasedDamageReductionAgainst${typePluralName}`,
                        // decreasedDamageReduction: `decreasedDamageReductionAgainst${typePluralName}`,
                        // increasedChanceToApplyTraitInfiniteOnSpawn: `increasedChanceToApply${typeSingularName}TraitInfiniteOnSpawn`,
                        // decreasedChanceToApplyTraitInfiniteOnSpawn: `decreasedChanceToApply${typeSingularName}TraitInfiniteOnSpawn`,
                        // applyTraitTurnsOnSpawn: `apply${typeSingularName}TraitTurnsOnSpawn`,
                        // increasedChanceToApplyTrait: `increasedChanceToApply${typeSingularName}Trait`,
                        // decreasedChanceToApplyTrait: `decreasedChanceToApply${typeSingularName}Trait`,
                        // applyTraitTurns: `apply${typeSingularName}TraitTurns`

                        // increasedDamageTakenFromAirSpells: Standard,
                        // decreasedDamageTakenFromAirSpells: Standard,
                        // increasedDamageTakenFromWaterSpells: Standard,
                        // decreasedDamageTakenFromWaterSpells: Standard,
                        // increasedDamageTakenFromEarthSpells: Standard,
                        // decreasedDamageTakenFromEarthSpells: Standard,
                        // increasedDamageTakenFromFireSpells: Standard,
                        // decreasedDamageTakenFromFireSpells: Standard,

                        // const monadSpecies = ['demon', 'undead', 'animal', "SeaCreature", "MythicalCreature", "Elemental", "Human", "Dragon", "Orc", "Robot", "Goblin", "Elf"] as const;
                        if (statKeys[m] === 'demonDamageReductionPerc') {
                          newModifiers['decreasedDamageTakenFromDemons'] = Math.floor(tempStats[statKeys[m]])
                        }
                        if (statKeys[m] === 'undeadDamageReductionPerc') {
                          newModifiers['decreasedDamageTakenFromUndead'] = Math.floor(tempStats[statKeys[m]])
                        }
                      }
                      // 'stabAttackBonus' | 'slashAttackBonus' | 'blockAttackBonus' | 'rangedAttackBonus' | 'magicAttackBonus' | 'meleeStrengthBonus' | 'rangedStrengthBonus' | 'magicDamageBonus' | 'meleeDefenceBonus' | 'rangedDefenceBonus' | 'magicDefenceBonus' | 'damageReduction' | 'summoningMaxhit' 

                      // 'MP'  'MPPerc'  'endurancePerc' | 'willpowerPerc' | 'dexterityPerc' | 'sensePerc' | 'charismaPerc'  'magicDamageReductionPerc' | 'physicalDamageReductionPerc'  'manaRegenPerc';
                      if (statKeys[m] === 'controlUndead') {
                        newModifiers['increasedSummoningMaxHit'] = Math.floor(tempStats[statKeys[m]])
                      }
                      if (statKeys[m] === 'strengthPerc') {
                        newModifiers['increasedMeleeStrengthBonus'] = Math.floor(tempStats[statKeys[m]])
                        newModifiers['increasedRangedStrengthBonus'] = Math.floor(tempStats[statKeys[m]])
                      }
                      if (statKeys[m] === 'magicPerc') {
                        newModifiers['increasedMagicDamageBonus'] = Math.floor(tempStats[statKeys[m]])
                      }
                      // 'CriticalHitDamage'
                      if (statKeys[m] === 'CriticalHitChance') {
                        newModifiers['increasedMagicCritChance'] = Math.floor(tempStats[statKeys[m]])
                        newModifiers['increasedMeleeCritChance'] = Math.floor(tempStats[statKeys[m]])
                        newModifiers['increasedRangedCritChance'] = Math.floor(tempStats[statKeys[m]])
                      }
                      if (statKeys[m] === 'HP' || statKeys[m] === 'vitality') {
                        newModifiers['increasedFlatMaxHitpoints'] = (newModifiers['increasedFlatMaxHitpoints'] || 0) + Math.floor(tempStats[statKeys[m]] / 10)
                      }
                      else if (statKeys[m] === 'HPPerc' || statKeys[m] === 'vitalityPerc') {
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
                      else if (statKeys[m] === 'strength') {
                        for (let q = 0; q < newequipmentStats.length; q++) {
                          if (newequipmentStats[q].key === 'meleeStrengthBonus' || newequipmentStats[q].key === 'rangedStrengthBonus') {
                            newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]] * 10)
                          }
                        }
                      }
                      else if (statKeys[m] === 'endurance') {
                        for (let q = 0; q < newequipmentStats.length; q++) {
                          if (newequipmentStats[q].key === 'meleeDefenceBonus' || newequipmentStats[q].key === 'rangedDefenceBonus') {
                            newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]] * 2)
                          }
                        }
                      }
                      else if (statKeys[m] === 'physicalDamageReduction') {
                        for (let q = 0; q < newequipmentStats.length; q++) {
                          if (newequipmentStats[q].key === 'meleeDefenceBonus' || newequipmentStats[q].key === 'rangedDefenceBonus') {
                            newequipmentStats[q].value = newequipmentStats[q].value + Math.floor(tempStats[statKeys[m]] * 2)
                          }
                        }
                      }
                      else if (statKeys[m] === 'willpower' || statKeys[m] === 'magicDamageReduction') {
                        for (let q = 0; q < newequipmentStats.length; q++) {
                          if (newequipmentStats[q].key === 'magicDefenceBonus') {
                            newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                          }
                        }
                      }
                      else if (statKeys[m] === 'magic') {
                        for (let q = 0; q < newequipmentStats.length; q++) {
                          if (newequipmentStats[q].key === 'magicAttackBonus') {
                            newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]] * 3)
                          }
                          if (newequipmentStats[q].key === 'magicDamageBonus') {
                            newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                          }
                        }
                      }
                      else if (statKeys[m] === 'dexterity') {
                        for (let q = 0; q < newequipmentStats.length; q++) {
                          if (newequipmentStats[q].key === 'rangedAttackBonus' || newequipmentStats[q].key === 'rangedDefenceBonus') {
                            newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                          }
                        }
                      }
                      else if (statKeys[m] === 'sense') {
                        for (let q = 0; q < newequipmentStats.length; q++) {
                          if (newequipmentStats[q].key === 'damageReduction') {
                            newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                          }
                        }
                      }
                      else if (statKeys[m] === 'charisma') {
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
                if (newItem.itemType) { itemPackage.items.add(newItem) }
                else { errorLog.push("Unknown item", newItem) }
              }
              if (tes) {
                itemPackage.items.modify({
                  id: "tes:lootbox",
                  dropTable: {
                    add: [
                      {
                        itemID: `monad:${itemID}`,
                        minQuantity: 1,
                        maxQuantity: 1,
                        weight: 1
                      }
                    ]
                  },
                })
              }
              itemPackage.items.modify({
                id: "monad:lootbox",
                dropTable: {
                  add: [
                    {
                      itemID: `monad:${itemID}`,
                      minQuantity: 1,
                      maxQuantity: 1,
                      weight: 1
                    }
                  ]
                },
              })
            }
          } catch (error) {
            errorLog.push("Error @ Monad onModsLoaded itempackage", error)
          }
        });
        initialPackage.add();
        game.monad = initialPackage
        game.idLog = idLog
      } catch (error) {
        errorLog.push("Error, Monad onModsLoaded", error)
      }
    });
  } catch (error) {
    errorLog.push("Error, Monad setup", error)
  }
  game.monadErrorLog = errorLog
}

// ["monad:TrainingHealthPotion","monad:Soulboundwand","monad:BoneLance","monad:TraineeBoneSpear","monad:PaladinEngelersBodyArmoursilverrank","monad:PaladinEngelersSalletsilverrank","monad:PaladinEngelersGauntletssilverrank","monad:PaladinEngelersSabatonsilverrank","monad:PaladinEngelersMacesilverrank","monad:PaladinEngelersShieldsilverrank","monad:PaladinEngelersCapesilverrank","monad:DemonHunterNecklace","monad:DemonHunterBracelet","monad:DemonHunterEaring","monad:DemonHunterRing","monad:ToadsSkinJacket","monad:CrownoftheDammed","monad:Ringofinitialundeadcontrol","monad:RingofLittleStrength","monad:PendentofMediumMagic","monad:WitchesHat","monad:QueensPawn","monad:Skullofvictim","monad:EnchantingQuill","monad:PrincessesCoin","monad:necklacemadeofteeth","monad:Blackscarf","monad:WhaleSkin","monad:LinenHalfgloves","monad:BattlemagesGloves","monad:BattlemagesHat","monad:BattlemagesRobe","monad:BattlemagesCrakows","monad:BattlemagesBreeches","monad:CottonScarf","monad:RayndrJackboots","monad:RoguesRing","monad:DarkElfsScimitar","monad:MeroyriXiphos","monad:RayndrFaceMask","monad:ShadowPiratesCoat","monad:LeatherPirateBoots","monad:BlackBand","monad:TidusEaring","monad:FeaturelessDeathwoodMask","monad:BlackBraidBracelet","monad:FrostGloves","monad:FlameGloves","monad:CeremonialWhiteStagMask","monad:HeavenlyWhiteStagMask","monad:AcademyRobeBlackYellow","monad:HuiLusBattleArmour","monad:HuiLusEnchantingGloves","monad:HuiLusBurningBoots","monad:OtariKote","monad:GlideMoroha","monad:GaleMoroha","monad:NiyoshoGakuran","monad:NiyoshoHakama","monad:OttosLeakyWand","monad:JokotoWakizashi","monad:Seifuku","monad:NiyoshoKimono","monad:AutumnCloak"]


// pokemon 3


// ["monad:treecko_pet","monad:grovyle_pet","monad:sceptile_pet","monad:torchic_pet","monad:combusken_pet","monad:blaziken_pet","monad:mudkip_pet","monad:marshtomp_pet","monad:swampert_pet","monad:poochyena_pet","monad:mightyena_pet","monad:zigzagoon_pet","monad:linoone_pet","monad:wurmple_pet","monad:silcoon_pet","monad:beautifly_pet","monad:cascoon_pet","monad:dustox_pet","monad:lotad_pet","monad:lombre_pet","monad:ludicolo_pet","monad:seedot_pet","monad:nuzleaf_pet","monad:shiftry_pet","monad:taillow_pet","monad:swellow_pet","monad:wingull_pet","monad:pelipper_pet","monad:ralts_pet","monad:kirlia_pet","monad:gardevoir_pet","monad:surskit_pet","monad:masquerain_pet","monad:shroomish_pet","monad:breloom_pet","monad:slakoth_pet","monad:vigoroth_pet","monad:slaking_pet","monad:nincada_pet","monad:ninjask_pet","monad:shedinja_pet","monad:whismur_pet","monad:loudred_pet","monad:exploud_pet","monad:makuhita_pet","monad:hariyama_pet","monad:azurill_pet","monad:nosepass_pet","monad:skitty_pet","monad:delcatty_pet","monad:sableye_pet","monad:mawile_pet","monad:aron_pet","monad:lairon_pet","monad:aggron_pet","monad:meditite_pet","monad:medicham_pet","monad:electrike_pet","monad:manectric_pet","monad:plusle_pet","monad:minun_pet","monad:volbeat_pet","monad:illumise_pet","monad:roselia_pet","monad:gulpin_pet","monad:swalot_pet","monad:carvanha_pet","monad:sharpedo_pet","monad:wailmer_pet","monad:wailord_pet","monad:numel_pet","monad:camerupt_pet","monad:torkoal_pet","monad:spoink_pet","monad:grumpig_pet","monad:spinda_pet","monad:trapinch_pet","monad:vibrava_pet","monad:flygon_pet","monad:cacnea_pet","monad:cacturne_pet","monad:swablu_pet","monad:altaria_pet","monad:zangoose_pet","monad:seviper_pet","monad:lunatone_pet","monad:solrock_pet","monad:barboach_pet","monad:whiscash_pet","monad:corphish_pet","monad:crawdaunt_pet","monad:baltoy_pet","monad:claydol_pet","monad:lileep_pet","monad:cradily_pet","monad:anorith_pet","monad:armaldo_pet","monad:feebas_pet","monad:milotic_pet","monad:castform_pet","monad:kecleon_pet","monad:shuppet_pet","monad:banette_pet","monad:duskull_pet","monad:dusclops_pet","monad:tropius_pet","monad:chimecho_pet","monad:absol_pet","monad:wynaut_pet","monad:snorunt_pet","monad:glalie_pet","monad:spheal_pet","monad:sealeo_pet","monad:walrein_pet","monad:clamperl_pet","monad:huntail_pet","monad:gorebyss_pet","monad:relicanth_pet","monad:luvdisc_pet","monad:bagon_pet","monad:shelgon_pet","monad:salamence_pet","monad:beldum_pet","monad:metang_pet","monad:metagross_pet","monad:regirock_pet","monad:regice_pet","monad:registeel_pet","monad:latias_pet","monad:latios_pet","monad:kyogre_pet","monad:groudon_pet","monad:rayquaza_pet","monad:jirachi_pet"]
