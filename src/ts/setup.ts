// Modules
// You can import script modules and have full type completion
import Greeter from '../components/Greeter/Greeter';

// Data
// Game data for registration
import ModData from '../data/data.json';
import { ItemList as monadItems } from '../data/monad-data';
import { nonSupport } from '../data/poe.data';

// Styles
// Will automatically load your styles upon loading the mod
import '../css/styles.css';

// Images
// To bundle your mod's icon
import '../img/icon.png';
// Reference images using `ctx.getResourceUrl`
import LargeIcon from '../img/icon_large.png';

export async function setup(ctx: Modding.ModContext) {
  const errorLog: any[] = []
  try {
    // Register our GameData
    await ctx.gameData.addPackage('data.json');
    // Because we're loading our templates.min.html file via the manifest.json,
    // the templates aren't available until after the setup() function runs
    ctx.onModsLoaded(async () => {
      try {
        const TothEntitlement = cloudManager.hasTotHEntitlement
        const kcm = mod.manager.getLoadedModList().includes('Custom Modifiers in Melvor')
        // const tes = mod.manager.getLoadedModList().includes("The Elder Scrolls")
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


        const monadItemsArray: any[] = Object.keys(monadItems)
        const idLog: any[] = []
        // Error: [test] Error constructing NamespacedObject. Local ID "Training Health Potion" is invalid.
        const initialPackage = ctx.gameData.buildPackage((itemPackage: any) => {
          try {
            for (let index = 0; index < monadItemsArray.length; index++) {
              const id = monadItemsArray[index]
              const type = monadItems[id].type
              const itemID = id.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "")
              idLog.push(itemID)
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
                  "customDescription": monadItems[id].description,
                }
                const newequipmentStats: any = {
                   'stabAttackBonus': 0, 'slashAttackBonus': 0, 'blockAttackBonus': 0, 'rangedAttackBonus': 0, 'magicAttackBonus': 0, 'meleeStrengthBonus': 0, 'rangedStrengthBonus': 0, 'magicDamageBonus': 0, 'meleeDefenceBonus': 0, 'rangedDefenceBonus': 0, 'magicDefenceBonus': 0, 'damageReduction': 0, 'summoningMaxhit': 0
                }
                const newModifiers: any = {

                }
                if (monadItems[id].stats) {
                  const tempStats:any[] = monadItems[id].stats
                  const statKeys:any[] = Object.keys(tempStats)
                  // stats: { sense: 1, attackSpeed: 2600 },
                  if(statKeys.length > 0 ) {
                    for (let m = 0; m < statKeys.length; m++) {
                      if(statKeys[m] === 'HP') {
                        newModifiers['increasedFlatMaxHitpoints'] = tempStats[statKeys[m]]
                      }
                      else if(statKeys[m] === 'HPPerc') {
                        newModifiers['increasedMaxHitpoints'] = tempStats[statKeys[m]]
                      }
                      else if(statKeys[m] === 'vitality') {
                        newModifiers['increasedFlatMaxHitpoints'] = newModifiers['increasedFlatMaxHitpoints'] + tempStats[statKeys[m]]
                      }
                      else if(statKeys[m] === 'attackSpeed') {
                        newequipmentStats['attackSpeed'] = tempStats[statKeys[m]]
                      }
                      else if(statKeys[m] === 'strength') {
                        newequipmentStats['meleeStrengthBonus'] = tempStats[statKeys[m]]
                      }
                      else if(statKeys[m] === 'endurance') {
                        newequipmentStats['meleeDefenceBonus'] = tempStats[statKeys[m]]
                      }
                      else if(statKeys[m] === 'willpower') {
                        newequipmentStats['magicDefenceBonus'] = tempStats[statKeys[m]]
                      }
                      else if(statKeys[m] === 'magic') {
                        newequipmentStats['magicAttackBonus'] = tempStats[statKeys[m]]
                      }
                      else if(statKeys[m] === 'dexterity') {
                        newequipmentStats['rangedAttackBonus'] = tempStats[statKeys[m]]
                      }
                      else if(statKeys[m] === 'sense') {
                        newequipmentStats['damageReduction'] = tempStats[statKeys[m]]
                      }
                      else if(statKeys[m] === 'charisma') {
                        newequipmentStats['summoningMaxhit'] = tempStats[statKeys[m]]
                      }
                    }
                  }
                  monadItems[id].equipmentStats = newequipmentStats
                }
                if (type === "Weapon") {
                  newequipmentStats['attackSpeed'] = 3000;
                  const Requirements = ['attackType', 'ammoTypeRequired', 'stats', 'validSlots', 'occupiesSlots', 'equipRequirements', 'equipmentStats', 'modifiers', 'enemyModifiers', 'conditionalModifiers', 'specialAttacks', 'overrideSpecialChances', 'fightEffects', 'providedRunes', 'ammoType ', 'consumesChargesOn', 'consumesOn', 'consumesItemOn']
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
                  const Requirements = ['stats', 'validSlots', 'occupiesSlots', 'equipRequirements', 'equipmentStats', 'modifiers', 'enemyModifiers', 'conditionalModifiers', 'specialAttacks', 'overrideSpecialChances', 'fightEffects', 'providedRunes', 'ammoType', 'consumesChargesOn', 'consumesOn', 'consumesItemOn']
                  for (let j = 0; j < Requirements.length; j++) {
                    if (monadItems[id][Requirements[j]]) {
                      newItem[Requirements[j]] = monadItems[id][Requirements[j]]
                    }
                  }
                }
                if (newItem.itemType) { itemPackage.items.add(newItem) }
                else { console.log('Monad, onModsLoaded, itempackage, What is this?', newItem) }
              }
            }
          } catch (error) {
            errorLog.push("Error @ Monad onModsLoaded itempackage", error)
            console.log("Monad onModsLoaded itempackage", error)
          }
        });
        initialPackage.add();
        game.monad = initialPackage
        game.idLog = idLog
      } catch (error) {
        errorLog.push("Error, Monad onModsLoaded", error)
        console.log('Error, Monad onModsLoaded', error)
      }
    });
  } catch (error) {
    errorLog.push("Error, Monad setup", error)
    console.log('Error, Monad setup', error)
  }
  game.monadErrorLog = errorLog
}