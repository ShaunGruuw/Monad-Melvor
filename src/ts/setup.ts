// Modules
// You can import script modules and have full type completion

// Data
// Game data for registration
import { ItemList as monadItems } from '../data/monad-data';
import { nonSupport } from '../data/poe.data';
import Pokemon from '../data/data.allPokemon.json'


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

        const idLog: any[] = []
        const initialPackage = ctx.gameData.buildPackage((itemPackage: any) => {
          try {
            if (Pokemon) {
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
                const newMonster: any = {
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
                  "selectedSpell": "melvorD:WindStrike",
                  "pet": {

                  }
                }
                newMonster['pet'] = {
                  "id": "monad:" + Pokemon[index].id + "_pet",
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
                  CraftingPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Fighting')) {
                  NewPet.modifiers["increasedTownshipAridPlainsProduction"] = 1
                  CookingPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Flying')) {
                  NewPet.modifiers["increasedTownshipJungleProduction"] = 1
                  FletchingPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Poison')) {
                  NewPet.modifiers["increasedTownshipSwampProduction"] = 1
                  SmithingPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Ground')) {
                  NewPet.modifiers["increasedTownshipDesertProduction"] = 1
                  RunecraftingPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Rock')) {
                  NewPet.modifiers["increasedTownshipMountainsProduction"] = 1
                  MiningPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Bug')) {
                  NewPet.modifiers["increasedFletchingBoltQuantity"] = 1
                  WoodcuttingPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Ghost')) {
                  NewPet.modifiers["increasedFireRunesWhenMakingElementalRunes"] = 1
                  HerblorePokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Steel')) {
                  NewPet.modifiers["increasedTownshipBlacksmithProduction"] = 1
                  AgilityPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Fire')) {
                  NewPet.modifiers["increasedFiremakingLogGP"] = 1
                  FiremakingPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Water')) {
                  NewPet.modifiers["increasedTownshipWaterProduction"] = 1
                  FishingPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Grass')) {
                  NewPet.modifiers["increasedFlatFarmingYield"] = 1
                  HerblorePokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Electric')) {
                  NewPet.modifiers["increasedTownshipValleyProduction"] = 1
                  FiremakingPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Psychic')) {
                  NewPet.modifiers["increasedTownshipMaxStorage"] = 1
                  AstrologyPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Ice')) {
                  NewPet.modifiers["increasedTownshipSnowlandsProduction"] = 1
                  CookingPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Dragon')) {
                  NewPet.modifiers["increasedPotionChargesFlat"] = 1
                  AstrologyPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Dark')) {
                  NewPet.modifiers["increasedTownshipGPProduction"] = 1
                  ThievingPokemonList.push(`monad:${NewPet['id']}`)
                }
                if (Pokemon[index].type.includes('Fairy')) {
                  NewPet.modifiers["increasedHolyDustFromBlessedOffering"] = 1
                  MagicPokemonList.push(`monad:${NewPet['id']}`)
                }

                allPokemonId.push(`monad:${newMonster['id']}`)
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
                  "monad:pokemon_combatarea"
                ]
              }
              itemPackage.combatAreaDisplayOrder.add(pokemon_combat_display_order)
            }
            if (nonSupport) {
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
                if (Object.keys(newPoeGem.modifiers).length < 1) {
                  newPoeGem.customDescription = nonSupport[index].secDescrText
                }
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
            }
            if (monadItems) {
              const monadItemsKeys: any[] = Object.keys(monadItems)
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
              }
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
