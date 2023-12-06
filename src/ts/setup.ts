// Modules
// You can import script modules and have full type completion

// Data
// Game data for registration
import { ItemList as monadItems } from '../data/monad-data';
import { nonSupport } from '../data/poe.data';

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

        const nonSupportKeys: any[] = Object.keys(nonSupport)
        const monadItemsKeys: any[] = Object.keys(monadItems)
        const idLog: any[] = []
        // Error: [test] Error constructing NamespacedObject. Local ID "Training Health Potion" is invalid.
        const initialPackage = ctx.gameData.buildPackage((itemPackage: any) => {
          try {
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
                idLog.push("monad:" + itemID)
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
                if (monadItems[id].stats) {
                  const tempStats: any[] = monadItems[id].stats
                  const statKeys: any[] = Object.keys(tempStats)
                  if (statKeys.length > 0) {
                    for (let m = 0; m < statKeys.length; m++) {
                      if (statKeys[m] === 'HP') {
                        newModifiers['increasedFlatMaxHitpoints'] = Math.floor(tempStats[statKeys[m]] / 10)
                      }
                      else if (statKeys[m] === 'HPPerc') {
                        newModifiers['increasedMaxHitpoints'] = Math.floor(tempStats[statKeys[m]])
                      }
                      else if (statKeys[m] === 'vitality') {
                        newModifiers['increasedFlatMaxHitpoints'] = newModifiers['increasedFlatMaxHitpoints'] + Math.floor(tempStats[statKeys[m]])
                      }

                      if (statKeys[m] === 'attackSpeed') {
                        for (let q = 0; q < newequipmentStats.length; q++) {
                          if (newequipmentStats[q].key === 'attackSpeed') {
                            newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]])
                          }
                        }
                      }
                      else if (statKeys[m] === 'strength') {
                        for (let q = 0; q < newequipmentStats.length; q++) {
                          if (newequipmentStats[q].key === 'meleeStrengthBonus' || 'rangedStrengthBonus') {
                            newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]] * 10)
                          }
                        }
                      }
                      else if (statKeys[m] === 'endurance') {
                        for (let q = 0; q < newequipmentStats.length; q++) {
                          if (newequipmentStats[q].key === 'meleeDefenceBonus' || 'rangedDefenceBonus') {
                            newequipmentStats[q].value = Math.floor(tempStats[statKeys[m]] * 2)
                          }
                        }
                      }
                      else if (statKeys[m] === 'willpower') {
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
                          if (newequipmentStats[q].key === 'rangedAttackBonus' || 'rangedDefenceBonus') {
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
                }
                if (type === "Weapon") {
                  newequipmentStats.push({
                    "key": "attackSpeed",
                    "value": 3000
                  },)
                  newItem.equipmentStats = newequipmentStats
                  newItem.modifiers = newModifiers
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
                  newItem.equipmentStats = newequipmentStats
                  newItem.modifiers = newModifiers
                  newItem.tier = "none"
                  const Requirements = ['validSlots', 'occupiesSlots', 'equipRequirements', 'enemyModifiers', 'conditionalModifiers', 'specialAttacks', 'overrideSpecialChances', 'fightEffects', 'providedRunes', 'ammoType', 'consumesChargesOn', 'consumesOn', 'consumesItemOn']
                  for (let j = 0; j < Requirements.length; j++) {
                    if (monadItems[id][Requirements[j]]) {
                      newItem[Requirements[j]] = monadItems[id][Requirements[j]]
                    }
                  }
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