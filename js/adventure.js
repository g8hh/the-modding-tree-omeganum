let smallerBuyable = {
    width: '120px',
    height: '120px',
    'min-height': '125px',
    'font-size': '9px',
}
addLayer("i3", {
    startData() {
        return {
            unlocked: true,
            maxhp: new ExpantaNum(0),
            hpregen: new ExpantaNum(0),
            defense: new ExpantaNum(0),
            damagereduction: new ExpantaNum(0),
            idleattack: new ExpantaNum(0),
            activeattack: new ExpantaNum(0),
            armorbreaker: new ExpantaNum(0),
            zoneadvancement: new ExpantaNum(0),
            respawntime: new ExpantaNum(0),
            deathtime: new ExpantaNum(0),
            lootgain: new ExpantaNum(0),
            hp: new ExpantaNum(0),
            deadtime: new ExpantaNum(0),
            strikecooldown: new ExpantaNum(0),
            sacrificecooldown: new ExpantaNum(0),
            idlecooldown: new ExpantaNum(0),
            enemyhp: new ExpantaNum(0),
            enemymaxhp: new ExpantaNum(0),
            enemyhpregen: new ExpantaNum(0),
            enemydefense: new ExpantaNum(0),
            enemydamage: new ExpantaNum(0),
            enemyattackcooldown: new ExpantaNum(0),
            enemyid: new ExpantaNum(0),
            id: new ExpantaNum(0),
            enemyspawncooldown: new ExpantaNum(0),
            enemyname: "",
            enemypicture: "",
            consoleLines: ["", "", "", "", "", "", ""],
            adventurelevel: new ExpantaNum(1),
            adventureleveleffect: new ExpantaNum(0),
            adventurelevelreq: new ExpantaNum(0),
            adventurelevelxp: new ExpantaNum(0),
            baseexpgain: new ExpantaNum(0),
            expgain: new ExpantaNum(0),
            tokens: new ExpantaNum(0),
            tokenpicture: "<img src='resources/token.png'</img>",
            basetokengain: new ExpantaNum(0),
            tokengain: new ExpantaNum(0),
            fighterreqplayers: new ExpantaNum(150000),
            adventureexppersecond: new ExpantaNum(0),
            tokengainpersecond: new ExpantaNum(0),
            recruitinglevel: new ExpantaNum(1),
            recruitingleveleffect: new ExpantaNum(0),
            recruitinglevelreq: new ExpantaNum(0),
            recruitinglevelxp: new ExpantaNum(0),
            recruitinglevelxppersecond: new ExpantaNum(0),
            choppinglevel: new ExpantaNum(1),
            choppingleveleffect: new ExpantaNum(0),
            choppinglevelreq: new ExpantaNum(0),
            choppinglevelxp: new ExpantaNum(0),
            oaklogs: new ExpantaNum(0),
            oaklogscapacity: new ExpantaNum(10),
            oaklogtime: new ExpantaNum(0),
            chopping: new ExpantaNum(0),
            birchlogs: new ExpantaNum(0),
            birchlogscapacity: new ExpantaNum(10),
            birchlogtime: new ExpantaNum(0),
            choppingpower: new ExpantaNum(1),
            lumberjackreqgames: new ExpantaNum(3),
            choppingexppersecond: new ExpantaNum(0),
            oaklogspersecond: new ExpantaNum(0),
            birchlogsexppersecond: new ExpantaNum(0),
            slimekills: new ExpantaNum(0),
            slimekillsboost: new ExpantaNum(0),
            bigslimekills: new ExpantaNum(0),
            bigslimekillsboost: new ExpantaNum(0),
            currentzone: new ExpantaNum(1),
            frostypeaktime: new ExpantaNum(3600),
            frostykills: new ExpantaNum(0),
            frostykillsboost: new ExpantaNum(0),
            sentienttreekills: new ExpantaNum(0),
            sentienttreekillsboost: new ExpantaNum(0),
            abandonedshovelkills: new ExpantaNum(0),
            abandonedshovelkillsboost: new ExpantaNum(0),
            zonetext: "",
            pinelogs: new ExpantaNum(0),
            pinelogscapacity: new ExpantaNum(10),
            pinelogtime: new ExpantaNum(0),
            pinelogsexppersecond: new ExpantaNum(0),
            crazycavernstime: new ExpantaNum(7200),
            cavecyclopskills: new ExpantaNum(0),
            cavecyclopskillsboost: new ExpantaNum(0),
            stonegolemkills: new ExpantaNum(0),
            stonegolemkillsboost: new ExpantaNum(0),
            abandonedpickaxekills: new ExpantaNum(0),
            abandonedpickaxekillsboost: new ExpantaNum(0),
            mininglevel: new ExpantaNum(1),
            miningleveleffect: new ExpantaNum(0),
            mininglevelreq: new ExpantaNum(0),
            mininglevelxp: new ExpantaNum(0),
            mininglevelxppersecond: new ExpantaNum(0),
            dirt: new ExpantaNum(0),
            stone: new ExpantaNum(0),
            miningchance: new ExpantaNum(0),
            miningpower: new ExpantaNum(0),
            mining: new ExpantaNum(0),
            mine1time: new ExpantaNum(0),
            mine1timepersecond: new ExpantaNum(0),
            mine2time: new ExpantaNum(0),
            mine2timepersecond: new ExpantaNum(0),
            minerreqincrementalstones: new ExpantaNum("1e2500000")
        }
    },
    nodeStyle:
    {
        "background-image": "linear-gradient(85deg, red, blue)",
        "background-origin": "border-box",
        'min-height': '100px',
        'min-width': '100px',
        'border-radius': '25px',
    },
    color: "#ffffff",
    symbol: "I3",
    row: "side",
    tooltip: "Incremental^3",
    midsection: ["grid", "blank"],
    branches: ["h", "cc"],
    displayRow: 1,
    position: 3,
    automate() {
    },
    buyables:
    {
        11: {
            cost(x) { return new ExpantaNum("5").pow(x.div(4)).mul("5") },
            title: "Attack Amplifier",
            unlocked() { return true },
            canAfford() { return player.i3.tokens.gte(this.cost()) },
            buy() {
                player.i3.tokens = player.i3.tokens.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + player.i3.tokenpicture + "\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " Idle Attack";
            },
            effect() {
                return player[this.layer].buyables[this.id].mul(0.01).add(1)
            },
            style() {
                return { ...researchBuyable }
            },
        },
        12: {
            cost(x) { return new ExpantaNum("25").pow(x.div(4)).mul("25") },
            title: "Health Amplifier",
            unlocked() { return true },
            canAfford() { return player.i3.tokens.gte(this.cost()) },
            buy() {
                player.i3.tokens = player.i3.tokens.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + player.i3.tokenpicture + "\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " Max Hp";
            },
            effect() {
                return player[this.layer].buyables[this.id].mul(0.02).add(1)
            },
            style() {
                return { ...researchBuyable }
            },
        },
        13: {
            cost(x) { return new ExpantaNum("75").pow(x.div(4)).mul("75") },
            title: "Movement Amplifier",
            unlocked() { return true },
            canAfford() { return player.i3.tokens.gte(this.cost()) },
            buy() {
                player.i3.tokens = player.i3.tokens.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + player.i3.tokenpicture + "\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " Zone Advancement Speed";
            },
            effect() {
                return player[this.layer].buyables[this.id].mul(0.05).add(1)
            },
            style() {
                return { ...researchBuyable }
            },
        },
        14: {
            cost(x) { return new ExpantaNum("500").pow(x.div(4)).mul("500") },
            title: "Loot Amplifier",
            unlocked() { return true },
            canAfford() { return player.i3.tokens.gte(this.cost()) },
            buy() {
                player.i3.tokens = player.i3.tokens.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + player.i3.tokenpicture + "\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " Loot Gain";
            },
            effect() {
                return player[this.layer].buyables[this.id].mul(0.01).add(1)
            },
            style() {
                return { ...researchBuyable }
            },
        },
        15: {
            cost(x) { return new ExpantaNum("10").pow(x.div(3)).mul("10") },
            title: "Hire a fighter",
            unlocked() { return true },
            canAfford() { return player.i3.tokens.gte(this.cost()) && player.h.players.gte(player.i3.fighterreqplayers) },
            buy() {
                player.i3.tokens = player.i3.tokens.sub(this.cost())
                player.i3.fighterreqplayers = player.i3.fighterreqplayers.mul(3)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Req: " + format(player.i3.fighterreqplayers) + " players\n\Cost: " + format(data.cost) + player.i3.tokenpicture + "\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + "% loot gain per second";
            },
            effect() {
                return player[this.layer].buyables[this.id].pow(0.9)
            },
        },
        16: {
            cost(x) { return player.i3.oaklogscapacity },
            title() {
                return "Increase Oak Capacity (" + format(getBuyableAmount(this.layer, this.id), 0) + ")";
                    },
            unlocked() { return true },
            canAfford() { return player.i3.oaklogs.gte(this.cost()) },
            buy() {
                player.i3.oaklogs = player.i3.oaklogs.sub(this.cost())
                player.i3.oaklogscapacity = player.i3.oaklogscapacity.mul(10)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Required max logs";
            },
            style() {
                return { ...smallerBuyable }
            },
        },
        17: {
            cost(x) { return new ExpantaNum("5").pow(x.div(4)).mul("5") },
            title: "Oak Booster",
            unlocked() { return true },
            canAfford() { return player.i3.oaklogs.gte(this.cost()) },
            buy() {
                player.i3.oaklogs = player.i3.oaklogs.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Oak Logs\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " Max HP";
            },
            effect() {
                return player[this.layer].buyables[this.id].mul(0.01).add(1)
            },
            style() {
                return { ...smallerBuyable }
            },
        },
        18: {
            cost(x) { return player.i3.birchlogscapacity },
            title() {
                return "Increase Birch Capacity (" + format(getBuyableAmount(this.layer, this.id), 0) + ")";
            },
            unlocked() { return player.i3.choppinglevel.gte(5) },
            canAfford() { return player.i3.birchlogs.gte(this.cost()) },
            buy() {
                player.i3.birchlogs = player.i3.birchlogs.sub(this.cost())
                player.i3.birchlogscapacity = player.i3.birchlogscapacity.mul(10)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Required max logs";
            },
            style() {
                return { ...smallerBuyable }
            },
        },
        19: {
            cost(x) { return new ExpantaNum("8").pow(x.div(4)).mul("8") },
            title: "Birch Booster",
            unlocked() { return player.i3.choppinglevel.gte(5) },
            canAfford() { return player.i3.birchlogs.gte(this.cost()) },
            buy() {
                player.i3.birchlogs = player.i3.birchlogs.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Birch Logs\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " HP Regen";
            },
            effect() {
                return player[this.layer].buyables[this.id].mul(0.04).add(1)
            },
            style() {
                return { ...smallerBuyable }
            },
        },
        21: {
            cost(x) { return new ExpantaNum("20").pow(x.div(5.5)).mul("20") },
            title: "Hire a lumberjack",
            unlocked() { return player.i3.choppinglevel.gte(5) },
            canAfford() { return player.i3.oaklogs.gte(this.cost()) && player.h.games.gte(player.i3.lumberjackreqgames) },
            buy() {
                player.i3.oaklogs = player.i3.oaklogs.sub(this.cost())
                player.i3.lumberjackreqgames = player.i3.lumberjackreqgames.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Req: " + format(player.i3.lumberjackreqgames) + " Games\n\Cost: " + format(data.cost) + " Oak Logs\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + "% chopping gain per second (varies depending on type of tree)";
            },
            effect() {
                return player[this.layer].buyables[this.id].mul(5).pow(0.95)
            },
        },
        22: {
            cost(x) { return player.i3.pinelogscapacity },
            title() {
                return "Increase Pine Capacity (" + format(getBuyableAmount(this.layer, this.id), 0) + ")";
            },
            unlocked() { return player.i3.choppinglevel.gte(10) },
            canAfford() { return player.i3.pinelogs.gte(this.cost()) },
            buy() {
                player.i3.pinelogs = player.i3.pinelogs.sub(this.cost())
                player.i3.pinelogscapacity = player.i3.pinelogscapacity.mul(10)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Required max logs";
            },
            style() {
                return { ...smallerBuyable }
            },
        },
        23: {
            cost(x) { return new ExpantaNum("10").pow(x.div(4)).mul("10") },
            title: "Pine Booster",
            unlocked() { return player.i3.choppinglevel.gte(10) },
            canAfford() { return player.i3.pinelogs.gte(this.cost()) },
            buy() {
                player.i3.pinelogs = player.i3.pinelogs.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Pine Logs\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " Defense";
            },
            effect() {
                return player[this.layer].buyables[this.id].mul(0.03).add(1)
            },
            style() {
                return { ...smallerBuyable }
            },
        },
        24: {
            cost(x) { return new ExpantaNum("20").pow(x.div(5)).mul("20") },
            title: "Dirt Booster",
            unlocked() { return true},
            canAfford() { return player.i3.dirt.gte(this.cost()) },
            buy() {
                player.i3.dirt = player.i3.dirt.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Dirt\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " Idle Attack";
            },
            effect() {
                return player[this.layer].buyables[this.id].mul(0.01).add(1)
            },
            style() {
                return { ...smallerBuyable }
            },
        },
        25: {
            cost(x) { return new ExpantaNum("10").pow(x.div(4.2)).mul("10") },
            title: "Stone Booster",
            unlocked() { return true },
            canAfford() { return player.i3.stone.gte(this.cost()) },
            buy() {
                player.i3.stone = player.i3.stone.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Stone\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " Zone Advancement Speed";
            },
            effect() {
                return player[this.layer].buyables[this.id].mul(0.02).add(1)
            },
            style() {
                return { ...smallerBuyable }
            },
        },
        26: {
            cost(x) { return new ExpantaNum("100").pow(x.div(6)).mul("100") },
            title: "Hire a miner",
            unlocked() { return player.i3.mininglevel.gte(8) },
            canAfford() { return player.i3.dirt.gte(this.cost()) && player.i2.points.gte(player.i3.minerreqincrementalstones) },
            buy() {
                player.i3.dirt = player.i3.dirt.sub(this.cost())
                player.i3.minerreqincrementalstones = player.i3.minerreqincrementalstones.mul("1e150000")
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Req: " + format(player.i3.minerreqincrementalstones) + " Incremental Stones\n\Cost: " + format(data.cost) + " Dirt\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + "% mining gain per second";
            },
            effect() {
                return player[this.layer].buyables[this.id].mul(5).pow(0.8)
            },
        },
    },
    upgrades:
    {
    },
    achievements: {

    },
    clickables: {
        11: {
            title() { return "Strike" },
            unlocked() { return player.i3.strikecooldown.lt(0) },
            canClick() { return player.i3.strikecooldown.lte(0) && player.i3.deadtime.lte(0) },
            onClick() {
                player.i3.strikecooldown = EN(3)
                player.i3.enemyhp = player.i3.enemyhp.sub(player.i3.idleattack.mul(player.i3.activeattack))
                if (player.i3.enemydefense.lt(player.i3.idleattack)) {
                    player.i3.enemyhp = player.i3.enemyhp.add(player.i3.enemydefense)
                }
                consolePrint2("You deal " + format(player.i3.idleattack.mul(player.i3.activeattack)) + " damage")
            },
        },
        12: {
            title() { return "Sacrifice" },
            unlocked() { return player.i3.sacrificecooldown.lt(0) && player.i3.adventurelevel.gte(5) },
            canClick() { return player.i3.sacrificecooldown.lte(0) && player.i3.deadtime.lte(0) },
            onClick() {
                player.i3.sacrificecooldown = EN(10)
                player.i3.hp = player.i3.hp.sub(player.i3.hp.mul(0.1))
                player.i3.enemyhp = player.i3.enemyhp.sub(player.i3.idleattack.mul(player.i3.activeattack.mul(1.5)))
                if (player.i3.enemydefense.lt(player.i3.idleattack)) {
                    player.i3.enemyhp = player.i3.enemyhp.add(player.i3.enemydefense)
                }
                consolePrint2("You deal " + format(player.i3.idleattack.mul(player.i3.activeattack.mul(1.5))) + " damage")
                consolePrint2("You lose " + format(player.i3.hp.mul(0.1)) + " health")
            },
        },
        13: {
            title() { return "<img src='resources/oaktree.png'</img>" },
            unlocked() { return true },
            canClick() { return true },
            onClick() {
                player.i3.chopping = EN(1)
            },
        },
        14: {
            title() { return "<img src='resources/birchtree.png'</img>" },
            unlocked() { return player.i3.choppinglevel.gte(5) },
            canClick() { return true },
            onClick() {
                player.i3.chopping = EN(2)
            },
        },
        15: {
            title() { return "Travel to Slime Valley" },
            unlocked() { return true },
            canClick() { return true },
            onClick() {
                player.i3.currentzone = EN(1)
                player.i3.zonetext = "Slime Valley"
            },
        },
        16: {
            title() { return "Travel to Frosty Peaks" },
            unlocked() { return player.i3.adventurelevel.gte(4) && player.i3.frostypeaktime.lt(0) },
            canClick() { return true },
            onClick() {
            player.i3.currentzone = EN(2)
            player.i3.zonetext = "Frosty Peaks"
            },
        },
        17: {
            title() { return "<img src='resources/pinetree.png'</img>" },
            unlocked() { return player.i3.choppinglevel.gte(10) },
            canClick() { return true },
            onClick() {
                player.i3.chopping = EN(3)
            },
        },
        18: {
            title() { return "Travel to Crazy Caverns" },
            unlocked() { return player.i3.adventurelevel.gte(8) && player.i3.crazycavernstime.lt(0) },
            canClick() { return true },
            onClick() {
                player.i3.currentzone = EN(3)
                player.i3.zonetext = "Crazy Caverns"
            },
        },
        19: {
            title() { return "<img src='resources/dirtblock.png'</img>" },
            unlocked() { return true },
            canClick() { return true },
            onClick() {
                player.i3.mining = EN(1)
            },
        },
        21: {
            title() { return "<img src='resources/stoneblock.png'</img>" },
            unlocked() { return player.i3.mininglevel.gte(8) },
            canClick() { return true },
            onClick() {
                player.i3.mining = EN(2)
            },
        },
    },
    challenges: {
    },
    fightenemy() {
        if (player.i3.enemyid.eq(0)) {
            if (player.i3.currentzone.eq(1)) {
                if (player.i3.id.lt(5)) {
                    player.i3.enemyid = EN(1) //Slime
                }
                if (player.i3.id.gt(5)) {
                    player.i3.enemyid = EN(2) //Big Slime
                }
            }
            if (player.i3.currentzone.eq(2)) {
                if (player.i3.id.lt(3)) {
                    player.i3.enemyid = EN(3) //Frosty
                }
                if (player.i3.id.gt(3) && player.i3.id.lt(6)) {
                    player.i3.enemyid = EN(4) //Tree
                }
                if (player.i3.id.gt(6)) {
                    player.i3.enemyid = EN(5) //Shovel
                }
            }
            if (player.i3.currentzone.eq(3)) {
                if (player.i3.id.lt(3)) {
                    player.i3.enemyid = EN(6) //Cyclops
                }
                if (player.i3.id.gt(3) && player.i3.id.lt(6)) {
                    player.i3.enemyid = EN(7) //Golem
                }
                if (player.i3.id.gt(6)) {
                    player.i3.enemyid = EN(8) //Pickaxe
                }
            }
            getenemytype()
            player.i3.enemyhp = player.i3.enemymaxhp
        }
    },
    update(delta) {
        let hpbase = new ExpantaNum(100)
        player.i3.maxhp = hpbase.add(player.i2.helmlevel.add(player.i2.chestplatelevel.add(player.i2.leggingslevel.add(player.i2.bootslevel)))).mul(buyableEffect("i3", 12)).mul(buyableEffect("i3", 17)).mul(player.i3.bigslimekillsboost)
        let hpregenboosts = new ExpantaNum(1)
        hpregenboosts = buyableEffect("h", 27).mul(buyableEffect("i3", 19)).mul(player.i3.cavecyclopskillsboost)
        player.i3.hpregen = player.i2.helmlevel.add(player.i2.chestplatelevel.add(player.i2.leggingslevel.add(player.i2.bootslevel))).div(100).div(1.5).add(hpregenboosts)
        player.i3.damagereduction = player.i2.chestplatelevel.div(400).add(1).mul(buyableEffect("h", 28)).mul(player.i3.abandonedpickaxekillsboost)
        player.i3.defense = player.i2.defenselevel.div(100).pow(0.6).mul(buyableEffect("h", 26)).mul(player.i3.frostykillsboost).mul(buyableEffect("i3", 23))
        player.i3.idleattack = player.i2.attacklevel.div(100).pow(0.8).mul(buyableEffect("i3", 11)).mul(buyableEffect("h", 25)).mul(player.i3.slimekillsboost).mul(buyableEffect("i3", 24))
        player.i3.activeattack = player.i2.helmlevel.pow(0.3).mul(player.i2.intelligencelevel.div(100).pow(0.6))

        let respawnbase = new ExpantaNum(60)
        let timer = new ExpantaNum(1)

        player.i3.zoneadvancement = player.i2.movementlevel.div(500).pow(0.8).mul(player.i2.bootslevel.pow(0.5)).mul(buyableEffect("i3", 13)).mul(player.i3.stonegolemkillsboost).mul(buyableEffect("i3", 25)).add(1)
        player.i3.respawntime = respawnbase.div(buyableEffect("h", 29))
        player.i3.lootgain = player.i2.leggingslevel.pow(0.2).mul(0.2).mul(buyableEffect("i3", 14)).mul(player.i3.choppingleveleffect).mul(player.i3.frostykillsboost).add(1)
        let lumberjackeffect = buyableEffect("i3", 21)
        let minereffect = buyableEffect("i3", 26)

        if (player.i3.hp.lt(0)) {
            player.i3.deadtime = player.i3.respawntime
            player.i3.hp = new ExpantaNum(0)
            player.i3.enemyid = EN(0)
            consolePrint2("You died!")
        }
        if (player.i3.hp.lte(0)) {
            player.i3.deadtime = player.i3.deadtime.sub(timer.mul(delta))
        }
        if (player.i3.deadtime.lt(0)) {
            player.i3.hp = player.i3.maxhp
            player.i3.deadtime = new ExpantaNum(0)
            consolePrint2("You respawn")
        }
        if (player.i3.deadtime.lte(0) && player.i3.hp.lt(player.i3.maxhp)) {
            player.i3.hp = player.i3.hp.add(player.i3.hpregen.mul(delta))
        }
        if (player.i3.hp.gt(player.i3.maxhp)) {
            player.i3.hp = player.i3.maxhp
        }
        if (player.i3.deadtime.lte(0)) {
            player.i3.idlecooldown = player.i3.idlecooldown.sub(timer.mul(delta))
        }
        if (player.i3.idlecooldown.lte(0) && player.i3.deadtime.lte(0)) {
            player.i3.enemyhp = player.i3.enemyhp.sub(player.i3.idleattack)
            if (player.i3.enemydefense.lt(player.i3.idleattack)) {
                player.i3.enemyhp = player.i3.enemyhp.add(player.i3.enemydefense)
            }
            player.i3.idlecooldown = new ExpantaNum(2)
            consolePrint2("You deal " + format(player.i3.idleattack) + " damage")
        }
        if (player.i3.enemyhp.gte(player.i3.enemymaxhp)) {
            player.i3.enemyhp = player.i3.enemymaxhp
        }
        player.i3.strikecooldown = player.i3.strikecooldown.sub(timer.mul(delta))
        player.i3.sacrificecooldown = player.i3.sacrificecooldown.sub(timer.mul(delta))
        player.i3.enemyattackcooldown = player.i3.enemyattackcooldown.sub(timer.mul(delta))
        if (player.i3.enemyhp.lt(player.i3.enemymaxhp)) {
            player.i3.enemyhp = player.i3.enemyhp.add(player.i3.enemyhpregen.mul(delta))
        }
        if (player.i3.enemyhp.lt(0) && player.i3.enemyid.neq(0)) {
            consolePrint2("You killed the " + player.i3.enemyname + "!")
            consolePrint2("+" + format(player.i3.expgain.mul(player.i3.lootgain)) + " Adventure EXP")
            consolePrint2("+" + format(player.i3.tokengain.mul(player.i3.lootgain)) + " Tokens")
            player.i3.adventurelevelxp = player.i3.adventurelevelxp.add(player.i3.expgain.mul(player.i3.lootgain))
            player.i3.tokens = player.i3.tokens.add(player.i3.tokengain.mul(player.i3.lootgain))
            if (player.i3.enemyid.eq(1)) {
                player.i3.slimekills = player.i3.slimekills.add(1)
            }
            if (player.i3.enemyid.eq(2)) {
                player.i3.bigslimekills = player.i3.bigslimekills.add(1)
            }
            if (player.i3.enemyid.eq(3)) {
                player.i3.frostykills = player.i3.frostykills.add(1)
            }
            if (player.i3.enemyid.eq(4)) {
                player.i3.sentienttreekills = player.i3.sentienttreekills.add(1)
                if (player.i3.choppinglevel.gte(10)) {
                    consolePrint2("+" + format(lumberjackeffect.mul(player.i3.lootgain.div(2))) + " Chopping EXP")
                    player.i3.choppinglevelxp = player.i3.choppinglevelxp.add(lumberjackeffect.mul(player.i3.lootgain.div(2)))
                }
            }
            if (player.i3.enemyid.eq(5)) {
                player.i3.abandonedshovelkills = player.i3.abandonedshovelkills.add(1)
            }
            if (player.i3.enemyid.eq(6)) {
                player.i3.cavecyclopskills = player.i3.cavecyclopskills.add(1)
            }
            if (player.i3.enemyid.eq(7)) {
                player.i3.stonegolemkills = player.i3.stonegolemkills.add(1)
                if (player.i3.mininglevel.gte(10)) {
                    consolePrint2("+" + format(minereffect.mul(player.i3.lootgain.div(2))) + " Mining EXP")
                    player.i3.mininglevelxp = player.i3.mininglevelxp.add(minereffect.mul(player.i3.lootgain.div(2)))
                }
            }
            if (player.i3.enemyid.eq(8)) {
                player.i3.abandonedpickaxekills = player.i3.abandonedpickaxekills.add(1)
            }
        }
        player.i3.adventureexppersecond = player.i3.expgain.mul(player.i3.lootgain.mul(buyableEffect("i3", 15))).div(100)
        player.i3.tokengainpersecond = player.i3.tokengain.mul(player.i3.lootgain.mul(buyableEffect("i3", 15))).div(100)
        player.i3.recruitinglevelxppersecond = buyableEffect("i3", 15).div(30).mul(player.i3.choppingleveleffect).mul(lumberjackeffect)
        player.i3.tokens = player.i3.tokens.add(player.i3.tokengainpersecond.mul(delta))
        player.i3.adventurelevelxp = player.i3.adventurelevelxp.add(player.i3.adventureexppersecond.mul(delta))
        player.i3.recruitinglevelxp = player.i3.recruitinglevelxp.add(player.i3.recruitinglevelxppersecond.mul(delta))
        if (player.i3.enemyhp.lt(0)) {
            player.i3.enemyid = EN(0)
        }
        if (player.i3.enemyattackcooldown.lte(0) && player.i3.deadtime.lte(0) && player.i3.enemyid.neq(0)) {
            player.i3.hp = player.i3.hp.sub(player.i3.enemydamage.div(player.i3.damagereduction))
            if (player.i3.defense.lt(player.i3.enemydamage.div(player.i3.damagereduction))) {
                player.i3.hp = player.i3.hp.add(player.i3.defense)
            consolePrint2("The " + player.i3.enemyname + " deals " + format(player.i3.enemydamage.div(player.i3.damagereduction).sub(player.i3.defense)) + " damage")
            }
            if (player.i3.defense.gt(player.i3.enemydamage.div(player.i3.damagereduction))) {
                player.i3.hp = player.i3.hp.add(player.i3.enemydamage.div(player.i3.damagereduction))
            consolePrint2("The " + player.i3.enemyname + " is too weak to deal damage to you")
            }
            player.i3.enemyattackcooldown = new ExpantaNum(4)
        }
        enemyhpbase = new ExpantaNum(0)
        enemyhpregenbase = new ExpantaNum(0)
        enemydamagebase = new ExpantaNum(0)
        enemydefensebase = new ExpantaNum(0)
        spawnbase = new ExpantaNum(15)
        if (player.i3.enemyspawncooldown.lte(0)) {
            layers.i3.fightenemy();
            player.i3.enemyspawncooldown = spawnbase.mul(Math.random() + 2)
        }
        player.i3.enemyspawncooldown = player.i3.enemyspawncooldown.sub(timer.mul(delta))
        player.i3.adventurelevelreq = player.i3.adventurelevel.pow(1.7).mul(10)
        player.i3.id = EN(Math.random() * 7)
        if (player.i3.adventurelevelxp.gte(player.i3.adventurelevelreq)) {
            player.i3.adventurelevel = player.i3.adventurelevel.add(1)
            player.i3.adventurelevelxp = new ExpantaNum(0)
        }
        player.i3.adventureleveleffect = player.i3.adventurelevel.sub(1).mul(0.1)
        player.i3.recruitinglevelreq = player.i3.recruitinglevel.pow(1.8).mul(2)
        if (player.i3.recruitinglevelxp.gte(player.i3.recruitinglevelreq)) {
            player.i3.recruitinglevel = player.i3.recruitinglevel.add(1)
            player.i3.recruitinglevelxp = new ExpantaNum(0)
        }
        player.i3.recruitingleveleffect = player.i3.recruitinglevel.mul(0.2).add(1).sub(0.2)

        player.i3.choppinglevelreq = player.i3.choppinglevel.pow(1.7).mul(4)
        if (player.i3.choppinglevelxp.gte(player.i3.choppinglevelreq)) {
            player.i3.choppinglevel = player.i3.choppinglevel.add(1)
            player.i3.choppinglevelxp = new ExpantaNum(0)
        }
        player.i3.choppingleveleffect = player.i3.choppinglevel.mul(0.02).add(1).sub(0.02)

        player.i3.mininglevelreq = player.i3.mininglevel.pow(1.9).mul(2)
        if (player.i3.mininglevelxp.gte(player.i3.mininglevelreq)) {
            player.i3.mininglevel = player.i3.mininglevel.add(1)
            player.i3.mininglevelxp = new ExpantaNum(0)
        }
        player.i3.miningleveleffect = player.i3.mininglevel.mul(0.03).add(1).sub(0.03)

        let choppingbase = EN(1)
        player.i3.choppingpower = choppingbase.mul(player.i3.sentienttreekillsboost)
        player.i3.choppingpower = player.i3.choppingpower.mul(player.i3.miningleveleffect)
        let oakspeed = player.i3.choppingpower
        if (player.i3.chopping.eq(1)) {
            if (player.i3.oaklogs.lt(player.i3.oaklogscapacity)) {
                player.i3.oaklogtime = player.i3.oaklogtime.add(oakspeed.mul(delta))
            }
        }
        if (player.i3.oaklogtime.gte(2)) {
            player.i3.oaklogs = player.i3.oaklogs.add(1)
            player.i3.choppinglevelxp = player.i3.choppinglevelxp.add(1)
            player.i3.choppingexppersecond = lumberjackeffect.mul(0.01)
            player.i3.oaklogtime = EN(0)
        }

        let birchspeed = player.i3.choppingpower
        if (player.i3.chopping.eq(2)) {
            if (player.i3.birchlogs.lt(player.i3.birchlogscapacity)) {
                player.i3.birchlogtime = player.i3.birchlogtime.add(birchspeed.mul(delta))
            }
        }
        if (player.i3.birchlogtime.gte(5)) {
            player.i3.birchlogs = player.i3.birchlogs.add(1)
            player.i3.choppinglevelxp = player.i3.choppinglevelxp.add(2)
            player.i3.choppingexppersecond = lumberjackeffect.mul(0.02)
            player.i3.birchlogtime = EN(0)
        }
        player.i3.oaklogspersecond = lumberjackeffect.mul(0.007)
        player.i3.birchlogspersecond = lumberjackeffect.mul(0.005)
        player.i3.pinelogspersecond = lumberjackeffect.mul(0.003)

        player.i3.choppinglevelxp = player.i3.choppinglevelxp.add(player.i3.choppingexppersecond.mul(delta))
        if (player.i3.pinelogs.lt(player.i3.pinelogscapacity)) {
            player.i3.pinelogs = player.i3.pinelogs.add(player.i3.pinelogspersecond.mul(delta))
        }
        if (player.i3.birchlogs.lt(player.i3.birchlogscapacity)) {
            player.i3.birchlogs = player.i3.birchlogs.add(player.i3.birchlogspersecond.mul(delta))
        }
        if (player.i3.oaklogs.lt(player.i3.oaklogscapacity)) {
            player.i3.oaklogs = player.i3.oaklogs.add(player.i3.oaklogspersecond.mul(delta))
        }

        basezonespeed = EN(1)
        basezonespeed = basezonespeed.mul(player.i3.zoneadvancement)
        if (player.i3.adventurelevel.gte(4)) {
            player.i3.frostypeaktime = player.i3.frostypeaktime.sub(basezonespeed.mul(delta))
        }
        if (player.i3.adventurelevel.gte(8)) {
            player.i3.crazycavernstime = player.i3.crazycavernstime.sub(basezonespeed.mul(delta))
        }

        player.i3.slimekillsboost = player.i3.slimekills.add(1).pow(0.02)
        player.i3.bigslimekillsboost = player.i3.bigslimekills.add(1).pow(0.025)
        player.i3.frostykillsboost = player.i3.frostykills.add(1).pow(0.028)
        player.i3.sentienttreekillsboost = player.i3.sentienttreekills.add(1).pow(0.035)
        player.i3.abandonedshovelkillsboost = player.i3.abandonedshovelkills.add(1).pow(0.015)
        player.i3.cavecyclopskillsboost = player.i3.cavecyclopskills.add(1).pow(0.026)
        player.i3.stonegolemkillsboost = player.i3.stonegolemkills.add(1).pow(0.033)
        player.i3.abandonedpickaxekillsboost = player.i3.abandonedpickaxekills.add(1).pow(0.022)

        let pinespeed = player.i3.choppingpower
        if (player.i3.chopping.eq(3)) {
            if (player.i3.pinelogs.lt(player.i3.pinelogscapacity)) {
                player.i3.pinelogtime = player.i3.pinelogtime.add(pinespeed.mul(delta))
            }
        }
        if (player.i3.pinelogtime.gte(10)) {
            player.i3.pinelogs = player.i3.pinelogs.add(1)
            player.i3.choppinglevelxp = player.i3.choppinglevelxp.add(4)
            player.i3.choppingexppersecond = lumberjackeffect.mul(0.04)
            player.i3.pinelogtime = EN(0)
        }

        player.i3.miningchance = EN(Math.random() * 10)

        baseminingpower = EN(1)
        player.i3.miningpower = baseminingpower
        if (player.i3.mining.eq(1)) {
            player.i3.mine1time = player.i3.mine1time.add(player.i3.miningpower.mul(delta))
        }
        if (player.i3.mine1time.gte(1)) {
            if (player.i3.miningchance.lt(8)) {
                player.i3.dirt = player.i3.dirt.add(1)
            }
            if (player.i3.miningchance.gt(8)) {
                player.i3.stone = player.i3.stone.add(1)
            }
            player.i3.mininglevelxp = player.i3.mininglevelxp.add(1)
            player.i3.mine1time = EN(0)
        }
        if (player.i3.mining.eq(2)) {
            player.i3.mine2time = player.i3.mine2time.add(player.i3.miningpower.mul(delta))
        }
        if (player.i3.mine2time.gte(3)) {
            if (player.i3.miningchance.lt(6)) {
                player.i3.stone = player.i3.stone.add(1)
            }
            if (player.i3.miningchance.gt(4)) {
                player.i3.dirt = player.i3.dirt.add(1)
            }
            player.i3.mininglevelxp = player.i3.mininglevelxp.add(2)
            player.i3.mine2time = EN(0)
        }
        player.i3.mine1time = player.i3.mine1time.add(minereffect.mul(player.i3.miningpower.div(100)).mul(delta))
        player.i3.mine2time = player.i3.mine2time.add(minereffect.mul(player.i3.miningpower.div(100)).mul(delta))
    },
    bars: {
        hpbar: {
            direction: RIGHT,
            width: 476,
            height: 50,
            unlocked() { return player.i3.deadtime.lte(0) },
            progress() {
                return player.i3.hp.div(player.i3.maxhp)
            },
            fillStyle: {
                "background-color": "red",
            },
            display() {
                return "<h5>" + format(player.i3.hp, 2) + "/" + format(player.i3.maxhp, 2) + " HP<br/>";
            },
        },
        deadbar: {
            direction: RIGHT,
            width: 476,
            height: 50,
            unlocked() { return player.i3.deadtime.gt(0) },
            progress() {
                return player.i3.deadtime.div(player.i3.respawntime)
            },
            fillStyle: {
                "background-color": "black",
            },
            display() {
                return "<h5>" + format(player.i3.deadtime) + "/" + format(player.i3.respawntime) + " Time To Respawn<br/>";
            },
        },
        strikebar: {
            direction: RIGHT,
            width: 120,
            height: 120,
            unlocked() { return player.i3.strikecooldown.gte(0) },
            progress() {
                return player.i3.strikecooldown.div(3)
            },
            fillStyle: {
                "background-color": "blue",
            },
            display() {
                return "<h5>" + format(player.i3.strikecooldown) + "/3<br/>";
            },
        },
        sacrificebar: {
            direction: RIGHT,
            width: 120,
            height: 120,
            unlocked() { return player.i3.sacrificecooldown.gte(0) && player.i3.adventurelevel.gte(5) },
            progress() {
                return player.i3.sacrificecooldown.div(10)
            },
            fillStyle: {
                "background-color": "blue",
            },
            display() {
                return "<h5>" + format(player.i3.sacrificecooldown) + "/10<br/>";
            },
        },
        idlebar: {
            direction: RIGHT,
            width: 120,
            height: 120,
            unlocked() { return true },
            progress() {
                return player.i3.idlecooldown.div(2)
            },
            fillStyle: {
                "background-color": "blue",
            },
            display() {
                return "<h5>Idle Attacks\n" + format(player.i3.idlecooldown) + "/2<br/>";
            },
        },
        enemybar: {
            direction: RIGHT,
            width: 476,
            height: 50,
            unlocked() { return player.i3.enemyid.neq(0) },
            progress() {
                return player.i3.enemyhp.div(player.i3.enemymaxhp)
            },
            fillStyle: {
                "background-color": "red",
            },
            display() {
                return "<h5>" + format(player.i3.enemyhp, 2) + "/" + format(player.i3.enemymaxhp, 2) + " HP<br/>";
            },
        },
        adventurelevelbar: {
            direction: RIGHT,
            width: 476,
            height: 50,
            unlocked() { return true },
            progress() {
                return player.i3.adventurelevelxp.div(player.i3.adventurelevelreq)
            },
            fillStyle: {
                "background-color": "green",
            },
            display() {
                return "<h5>" + format(player.i3.adventurelevelxp, 2) + "/" + format(player.i3.adventurelevelreq, 2) + " Adventure XP<br/>";
            },
        },
        recruitinglevelbar: {
            direction: RIGHT,
            width: 476,
            height: 50,
            unlocked() { return true },
            progress() {
                return player.i3.recruitinglevelxp.div(player.i3.recruitinglevelreq)
            },
            fillStyle: {
                "background-color": "black",
            },
            display() {
                return "<h5>" + format(player.i3.recruitinglevelxp, 2) + "/" + format(player.i3.recruitinglevelreq, 2) + " Recruiting XP<br/>";
            },
        },
        choppinglevelbar: {
            direction: RIGHT,
            width: 476,
            height: 50,
            unlocked() { return true },
            progress() {
                return player.i3.choppinglevelxp.div(player.i3.choppinglevelreq)
            },
            fillStyle: {
                "background-color": "brown",
            },
            display() {
                return "<h5>" + format(player.i3.choppinglevelxp, 2) + "/" + format(player.i3.choppinglevelreq, 2) + " Chopping XP<br/>";
            },
        },
        mininglevelbar: {
            direction: RIGHT,
            width: 476,
            height: 50,
            unlocked() { return true },
            progress() {
                return player.i3.mininglevelxp.div(player.i3.mininglevelreq)
            },
            fillStyle: {
                "background-color": "grey",
            },
            display() {
                return "<h5>" + format(player.i3.mininglevelxp, 2) + "/" + format(player.i3.mininglevelreq, 2) + " Mining XP<br/>";
            },
        },
        oaklogbar: {
            direction: RIGHT,
            width: 250,
            height: 50,
            unlocked() { return true },
            progress() {
                return player.i3.oaklogs.div(player.i3.oaklogscapacity)
            },
            fillStyle: {
                "background-color": "green",
            },
            display() {
                return "<h5>" + format(player.i3.oaklogs, 2) + "/" + format(player.i3.oaklogscapacity, 0) + " Oak Logs<br/>";
            },
        }, oaktreebar: {
            direction: RIGHT,
            width: 250,
            height: 50,
            unlocked() { return true },
            progress() {
                return player.i3.oaklogtime.div(2)
            },
            fillStyle: {
                "background-color": "green",
            },
            display() {
                return "<h5>" + format(player.i3.oaklogtime, 2) + "/2 Time to chop<br/>";
            },
        },
        birchlogbar: {
            direction: RIGHT,
            width: 250,
            height: 50,
            unlocked() { return player.i3.choppinglevel.gte(5) },
            progress() {
                return player.i3.birchlogs.div(player.i3.birchlogscapacity)
            },
            fillStyle: {
                "background-color": "green",
            },
            display() {
                return "<h5>" + format(player.i3.birchlogs, 2) + "/" + format(player.i3.birchlogscapacity, 0) + " Birch Logs<br/>";
            },
        }, birchtreebar: {
            direction: RIGHT,
            width: 250,
            height: 50,
            unlocked() { return player.i3.choppinglevel.gte(5) },
            progress() {
                return player.i3.birchlogtime.div(5)
            },
            fillStyle: {
                "background-color": "green",
            },
            display() {
                return "<h5>" + format(player.i3.birchlogtime, 2) + "/5 Time to chop<br/>";
            },
        },
        frostypeakbar: {
            direction: RIGHT,
            width: 300,
            height: 100,
            unlocked() { return player.i3.adventurelevel.gte(4) && player.i3.frostypeaktime.gt(0) },
            progress() {
                return player.i3.frostypeaktime.div(3600)
            },
            fillStyle: {
                "background-color": "black",
            },
            display() {
                return "<h5>Unlocking: " + formatTime(player.i3.frostypeaktime, 2) + "/1h<br/>";
            },
        },
        pinelogbar: {
            direction: RIGHT,
            width: 250,
            height: 50,
            unlocked() { return player.i3.choppinglevel.gte(10) },
            progress() {
                return player.i3.pinelogs.div(player.i3.pinelogscapacity)
            },
            fillStyle: {
                "background-color": "green",
            },
            display() {
                return "<h5>" + format(player.i3.pinelogs, 2) + "/" + format(player.i3.pinelogscapacity, 0) + " Pine Logs<br/>";
            },
        }, pinetreebar: {
            direction: RIGHT,
            width: 250,
            height: 50,
            unlocked() { return player.i3.choppinglevel.gte(10) },
            progress() {
                return player.i3.pinelogtime.div(10)
            },
            fillStyle: {
                "background-color": "green",
            },
            display() {
                return "<h5>" + format(player.i3.pinelogtime, 2) + "/10 Time to chop<br/>";
            },
        },
        crazycavernsbar: {
            direction: RIGHT,
            width: 300,
            height: 100,
            unlocked() { return player.i3.adventurelevel.gte(8) && player.i3.crazycavernstime.gt(0) },
            progress() {
                return player.i3.crazycavernstime.div(7200)
            },
            fillStyle: {
                "background-color": "black",
            },
            display() {
                return "<h5>Unlocking: " + formatTime(player.i3.crazycavernstime, 2) + "/2h<br/>";
            },
        },
        mine1bar: {
            direction: RIGHT,
            width: 250,
            height: 100,
            unlocked() { return true },
            progress() {
                return player.i3.mine1time.div(1)
            },
            fillStyle: {
                "background-color": "grey",
            },
            display() {
                return "<h5>" + format(player.i3.mine1time, 2) + "/1 Time to mine<br/>";
            },
        },
        mine2bar: {
            direction: RIGHT,
            width: 250,
            height: 100,
            unlocked() { return player.i3.mininglevel.gte(8) },
            progress() {
                return player.i3.mine2time.div(3)
            },
            fillStyle: {
                "background-color": "grey",
            },
            display() {
                return "<h5>" + format(player.i3.mine2time, 2) + "/3 Time to mine<br/>";
            },
        },
    },
    milestones: {
    },
    microtabs: {
        stuff: {
            "Stats": {
                content: [
                    ["microtabs", "stats"],
                ]
            },
            "Adventure": {
                content: [
                    ["raw-html", function () { return "<button onclick='layers.i3.fightenemy()'>Fight</button>" }],
                    ["row", [["clickable", 11], ["clickable", 12], ["bar", "strikebar"], ["bar", "sacrificebar"], ["bar", "idlebar"]]],
                    ["display-text", () => "Adventure Level " + format(player.i3.adventurelevel, 0) + " which gives an additional +" + format(player.i3.adventureleveleffect, 1) + " potential", { "font-size": "18px", "font-family": "monospace" }],
                    ["bar", "adventurelevelbar"],
                    ["bar", "hpbar"],
                    ["bar", "deadbar"],
                    ["blank", "15px"],
                    ["display-text", () => player.i3.enemyid.neq(0) ? player.i3.enemypicture : ""],
                    ["display-text", () => player.i3.enemyid.neq(0) ? "Enemy Type: " + player.i3.enemyname : "", { "font-size": "24px", "font-family": "monospace" }],
                    ["display-text", () => player.i3.enemyid.neq(0) ? format(player.i3.enemyhpregen, 2) + ' HP Regen ' + format(player.i3.enemydefense, 2) + ' Defense ' + format(player.i3.enemydamage, 2) + ' Damage ' : "", { "font-size": "16px", "font-family": "monospace" }],
                    ["bar", "enemybar"],
                    ["raw-html", () => `<div style="width:$404px;text-align:center;margin:20px;">
                        ${player.i3.consoleLines.map((x, i) => `<span style="opacity:1">${x}</span><br/>`).join("")}
                        &gt;`],
                ]
            },
            "Shop": {
                content: [
                    ["microtabs", "shops"],
                ]
            },
            "Skills": {
                unlocked() { return player.i3.adventurelevel.gte(2) },
                content: [
                    ["microtabs", "skills"],
                ]
            },
            "Zones": {
                unlocked() { return player.i3.adventurelevel.gte(4) },
                content: [                 
                    ["display-text", () => player.i3.currentzone.neq(0) ? "Current Zone: " + player.i3.zonetext : "", { "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["display-text", function () { return "<img src='resources/slimevalley.png' style='width:calc(100%);height:calc(100%)'></img>" }, { "font-size": "16px", "font-family": "monospace" }], ["clickable", 15]]],
                    ["row", [["bar", "frostypeakbar"], ["display-text", () => player.i3.frostypeaktime.lt(0) ? "<img src='resources/frostypeaks.png' style='width:calc(100%);height:calc(100%)'></img>" : "", { "font-size": "16px", "font-family": "monospace" }], ["clickable", 16]]],
                    ["row", [["bar", "crazycavernsbar"], ["display-text", () => player.i3.crazycavernstime.lt(0) ? "<img src='resources/crazycaverns.png' style='width:calc(100%);height:calc(100%)'></img>" : "", { "font-size": "16px", "font-family": "monospace" }], ["clickable", 18]]],
                ]
            },
        },
        stats:
        {
            "Numbers": {
                unlocked() { return true },
                content: [
                    ["display-text", function () { return 'HP and Defense' }, { "font-size": "24px", "font-family": "monospace" }],
                    ["display-text", function () { return 'You have ' + format(player.i3.maxhp, 2) + " Max HP, based on total armor" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'You have ' + format(player.i3.hpregen, 2) + " HP Regen, based on total armor" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'You have ' + format(player.i3.defense, 2) + " Defense, based on defense level which subtracts damage dealt to you" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'You have ' + format(player.i3.damagereduction, 2) + " Damage Reduction, based on chestplate level which divides damage dealt to you" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Attack' }, { "font-size": "24px", "font-family": "monospace" }],
                    ["display-text", function () { return 'You have ' + format(player.i3.idleattack, 2) + " Idle Attack, based on Attack Level" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Active attacks do x' + format(player.i3.activeattack, 2) + " more damage than idle attacks, based on helmet level, and intelligence level." }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'You have ' + format(player.i3.armorbreaker, 2) + " Armor Breaker, based on weapon level, and lowers enemy defense" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Misc Stats' }, { "font-size": "24px", "font-family": "monospace" }],
                    ["display-text", function () { return format(player.i3.zoneadvancement) + "x Zone Advancement Speed, based on movement Level and boots level" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return formatTime(player.i3.respawntime) + " Respawn Time" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'You have x' + format(player.i3.lootgain, 2) + " boost to loot drops, based on leggings level" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Skill Stats' }, { "font-size": "24px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Idle gain power: ' + format(buyableEffect("i3", 15)) + "%" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Chopping gain power: ' + format(buyableEffect("i3", 21)) + "%" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Mining gain power: ' + format(buyableEffect("i3", 26)) + "%" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Chopping power: ' + format(player.i3.choppingpower) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Mining power: ' + format(player.i3.miningpower) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Oak capacity: ' + format(player.i3.oaklogscapacity) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Birch capacity: ' + format(player.i3.birchlogscapacity) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Pine capacity: ' + format(player.i3.pinelogscapacity) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Level Stats' }, { "font-size": "24px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Warrior Level ' + format(player.i2.warriorlevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Attack Level ' + format(player.i2.attacklevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Defense Level ' + format(player.i2.defenselevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Intelligence Level ' + format(player.i2.intelligencelevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Movement Level ' + format(player.i2.movementlevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Helmet Level ' + format(player.i2.helmlevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Chestplate Level ' + format(player.i2.chestplatelevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Leggings Level ' + format(player.i2.leggingslevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Boots Level ' + format(player.i2.bootslevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Adventure Level ' + format(player.i3.adventurelevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Recruiting Level ' + format(player.i3.recruitinglevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Chopping Level ' + format(player.i3.choppinglevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'Mining Level ' + format(player.i3.mininglevel, 0) }, { "font-size": "16px", "font-family": "monospace" }],
                ]
            },
            "Bestiary Boosters": {
                unlocked() { return true },
                content: [
                    ["display-text", function () { return "<img src='resources/slime.png' style='width:calc(10%);height:calc(10%)'></img>" + " " + format(player.i3.slimekills) + " Kills and a x" + format(player.i3.slimekillsboost) + " boost to idle attack"}, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return "<img src='resources/bigslime.png' style='width:calc(10%);height:calc(10%)'></img>" + " " + format(player.i3.bigslimekills) + " Kills and a x" + format(player.i3.bigslimekillsboost) + " boost to max hp" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return "<img src='resources/frosty.png' style='width:calc(10%);height:calc(10%)'></img>" + " " + format(player.i3.frostykills) + " Kills and a x" + format(player.i3.frostykillsboost) + " boost to defense" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return "<img src='resources/sentienttree.png' style='width:calc(10%);height:calc(10%)'></img>" + " " + format(player.i3.sentienttreekills) + " Kills and a x" + format(player.i3.sentienttreekillsboost) + " boost to chopping power" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return "<img src='resources/abandonedshovel.png' style='width:calc(10%);height:calc(10%)'></img>" + " " + format(player.i3.abandonedshovelkills) + " Kills and a x" + format(player.i3.abandonedshovelkillsboost) + " boost to loot gains" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return "<img src='resources/cavecyclops.png' style='width:calc(10%);height:calc(10%)'></img>" + " " + format(player.i3.cavecyclopskills) + " Kills and a x" + format(player.i3.cavecyclopskillsboost) + " boost to hp regen" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return "<img src='resources/stonegolem.png' style='width:calc(10%);height:calc(10%)'></img>" + " " + format(player.i3.stonegolemkills) + " Kills and a x" + format(player.i3.stonegolemkillsboost) + " boost to zone advancement speed" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return "<img src='resources/abandonedpickaxe.png' style='width:calc(10%);height:calc(10%)'></img>" + " " + format(player.i3.abandonedpickaxekills) + " Kills and a x" + format(player.i3.abandonedpickaxekillsboost) + " boost to damage reduction" }, { "font-size": "16px", "font-family": "monospace" }],
                ]
            },
        },
        shops:
        {
            "Token Shop": {
                unlocked() { return true },
                content: [
                    ["display-text", function () { return 'You have ' + format(player.i3.tokens, 0) + " " + player.i3.tokenpicture }, { "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                ]
            },
        },
        skills:
        {
            "Recruiting": {
                unlocked() { return true },
                content: [
                    ["display-text", () => "Recruiting Level " + format(player.i3.recruitinglevel, 0) + " which gives a x" + format(player.i3.recruitingleveleffect, 1) + " boost to IQ gain", { "font-size": "18px", "font-family": "monospace" }],
                    ["bar", "recruitinglevelbar"],
                    ["row", [["buyable", 15], ["buyable", 21], ["buyable", 26]]],
                    ["display-text", function () { return '+' + format(player.i3.tokengainpersecond, 3) + " " + player.i3.tokenpicture + " per second" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return '+' + format(player.i3.adventureexppersecond, 3) + " adventure exp per second" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return '+' + format(player.i3.recruitinglevelxppersecond, 3) + " recruiting exp per second" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return '+' + format(player.i3.choppingexppersecond, 3) + " chopping exp per second" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return '+' + format(player.i3.oaklogspersecond, 3) + " oak logs per second" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return '+' + format(player.i3.birchlogspersecond, 3) + " birch logs per second" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return '+' + format(player.i3.pinelogspersecond, 3) + " pine logs per second" }, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return '+' + format(buyableEffect("i3", 26), 3) + "% mining power per second" }, { "font-size": "16px", "font-family": "monospace" }],
                ]
            },
            "Chopping": {
                unlocked() { return player.i3.adventurelevel.gte(3) },
                content: [
                    ["display-text", () => "Chopping Level " + format(player.i3.choppinglevel, 0) + " which gives a x" + format(player.i3.choppingleveleffect, 2) + " boost to Loot gain and Recruiting XP gain", { "font-size": "18px", "font-family": "monospace" }],
                    ["bar", "choppinglevelbar"],
                    ["row", [["clickable", 13], ["column", [["bar", "oaktreebar"], ["bar", "oaklogbar"]]], ["buyable", 16], ["buyable", 17] ]],
                    ["row", [["clickable", 14], ["column", [["bar", "birchtreebar"], ["bar", "birchlogbar"]]], ["buyable", 18], ["buyable", 19] ]],
                    ["row", [["clickable", 17], ["column", [["bar", "pinetreebar"], ["bar", "pinelogbar"]]], ["buyable", 22], ["buyable", 23] ]],
                ]
            },
            "Mining": {
                unlocked() { return player.i3.adventurelevel.gte(8) },
                content: [
                    ["display-text", () => "Mining Level " + format(player.i3.mininglevel, 0) + " which gives a x" + format(player.i3.miningleveleffect, 2) + " boost to chopping power", { "font-size": "18px", "font-family": "monospace" }],
                    ["bar", "mininglevelbar"],
                    ["row", [["clickable", 19], ["bar", "mine1bar"]]],
                    ["row", [["clickable", 21], ["bar", "mine2bar"]]],
                    ["blank", "25px"],
                    ["display-text", function () { return 'You have ' + format(player.i3.dirt, 0) + " dirt"}, { "font-size": "16px", "font-family": "monospace" }],
                    ["display-text", function () { return 'You have ' + format(player.i3.stone, 0) + " stone"}, { "font-size": "16px", "font-family": "monospace" }],
                    ["row", [["buyable", 24], ["buyable", 25]]],
                ]
            },
        },
    },

    tabFormat: [
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("h", 48) }
},
)
function getenemytype() {
    if (player.i3.enemyid.eq(0)) {
        enemyhpbase = EN(0)
        enemyhpregenbase = EN(0)
        enemydamagebase = EN(0)
        enemydefensebase = EN(0)
        player.i3.enemymaxhp = EN(enemyhpbase.mul(Math.random() + 0.6))
        player.i3.enemyhpregen = EN(enemyhpregenbase.mul(Math.random() + 0.6))
        player.i3.enemydamage = EN(enemydamagebase.mul(Math.random() + 0.7))
        player.i3.enemydefense = EN(enemydefensebase.mul(Math.random() + 0.7))
    }
    if (player.i3.enemyid.eq(1)) {
        enemyhpbase = EN(40)
        enemyhpregenbase = EN(0.4)
        enemydamagebase = EN(7)
        enemydefensebase = EN(0.4)
        player.i3.baseexpgain = EN(1)
        player.i3.basetokengain = EN(2)
        player.i3.enemymaxhp = EN(enemyhpbase.mul(Math.random() + 0.6))
        player.i3.enemyhpregen = EN(enemyhpregenbase.mul(Math.random() + 0.6))
        player.i3.enemydamage = EN(enemydamagebase.mul(Math.random() + 0.7))
        player.i3.enemydefense = EN(enemydefensebase.mul(Math.random() + 0.7))
        player.i3.enemyname = "Slime"
        player.i3.enemypicture = "<img src='resources/slime.png'</img>"
        player.i3.expgain = EN(player.i3.baseexpgain.mul(Math.random() + 0.5))
        player.i3.tokengain = EN(player.i3.basetokengain.mul(Math.random() + 0.5))
        consolePrint2("A " + player.i3.enemyname + " Spawned!")
    }
    if (player.i3.enemyid.eq(2)) {
        enemyhpbase = EN(100)
        enemyhpregenbase = EN(0.5)
        enemydamagebase = EN(10)
        enemydefensebase = EN(0.8)
        player.i3.baseexpgain = EN(1.5)
        player.i3.basetokengain = EN(4)
        player.i3.enemymaxhp = EN(enemyhpbase.mul(Math.random() + 0.6))
        player.i3.enemyhpregen = EN(enemyhpregenbase.mul(Math.random() + 0.6))
        player.i3.enemydamage = EN(enemydamagebase.mul(Math.random() + 0.7))
        player.i3.enemydefense = EN(enemydefensebase.mul(Math.random() + 0.7))
        player.i3.enemyname = "Big Slime"
        player.i3.enemypicture = "<img src='resources/bigslime.png'</img>"
        player.i3.expgain = EN(player.i3.baseexpgain.mul(Math.random() + 0.5))
        player.i3.tokengain = EN(player.i3.basetokengain.mul(Math.random() + 0.5))
        consolePrint2("A " + player.i3.enemyname + " Spawned!")
    }
    if (player.i3.enemyid.eq(3)) {
        enemyhpbase = EN(80)
        enemyhpregenbase = EN(0.8)
        enemydamagebase = EN(12)
        enemydefensebase = EN(1.1)
        player.i3.baseexpgain = EN(6)
        player.i3.basetokengain = EN(3)
        player.i3.enemymaxhp = EN(enemyhpbase.mul(Math.random() + 0.7))
        player.i3.enemyhpregen = EN(enemyhpregenbase.mul(Math.random() + 0.8))
        player.i3.enemydamage = EN(enemydamagebase.mul(Math.random() + 0.5))
        player.i3.enemydefense = EN(enemydefensebase.mul(Math.random() + 0.8))
        player.i3.enemyname = "Frosty"
        player.i3.enemypicture = "<img src='resources/frosty.png'</img>"
        player.i3.expgain = EN(player.i3.baseexpgain.mul(Math.random() + 0.6))
        player.i3.tokengain = EN(player.i3.basetokengain.mul(Math.random() + 0.6))
        consolePrint2("A " + player.i3.enemyname + " Spawned!")
    }
    if (player.i3.enemyid.eq(4)) {
        enemyhpbase = EN(50)
        enemyhpregenbase = EN(2)
        enemydamagebase = EN(11)
        enemydefensebase = EN(1.5)
        player.i3.baseexpgain = EN(4)
        player.i3.basetokengain = EN(6)
        player.i3.enemymaxhp = EN(enemyhpbase.mul(Math.random() + 0.8))
        player.i3.enemyhpregen = EN(enemyhpregenbase.mul(Math.random() + 0.6))
        player.i3.enemydamage = EN(enemydamagebase.mul(Math.random() + 0.9))
        player.i3.enemydefense = EN(enemydefensebase.mul(Math.random() + 0.8))
        player.i3.enemyname = "Sentient Tree"
        player.i3.enemypicture = "<img src='resources/sentienttree.png'</img>"
        player.i3.expgain = EN(player.i3.baseexpgain.mul(Math.random() + 0.65))
        player.i3.tokengain = EN(player.i3.basetokengain.mul(Math.random() + 0.5))
        consolePrint2("A " + player.i3.enemyname + " Spawned!")
    }
    if (player.i3.enemyid.eq(5)) {
        enemyhpbase = EN(150)
        enemyhpregenbase = EN(0.05)
        enemydamagebase = EN(15)
        enemydefensebase = EN(0.2)
        player.i3.baseexpgain = EN(12)
        player.i3.basetokengain = EN(12)
        player.i3.enemymaxhp = EN(enemyhpbase.mul(Math.random() + 0.7))
        player.i3.enemyhpregen = EN(enemyhpregenbase.mul(Math.random() + 0.7))
        player.i3.enemydamage = EN(enemydamagebase.mul(Math.random() + 0.7))
        player.i3.enemydefense = EN(enemydefensebase.mul(Math.random() + 0.7))
        player.i3.enemyname = "Abandoned Shovel"
        player.i3.enemypicture = "<img src='resources/abandonedshovel.png'</img>"
        player.i3.expgain = EN(player.i3.baseexpgain.mul(Math.random() + 0.8))
        player.i3.tokengain = EN(player.i3.basetokengain.mul(Math.random() + 0.8))
        consolePrint2("A " + player.i3.enemyname + " Spawned!")
    }
    if (player.i3.enemyid.eq(6)) {
        enemyhpbase = EN(100)
        enemyhpregenbase = EN(0.8)
        enemydamagebase = EN(14)
        enemydefensebase = EN(1.1)
        player.i3.baseexpgain = EN(9)
        player.i3.basetokengain = EN(6)
        player.i3.enemymaxhp = EN(enemyhpbase.mul(Math.random() + 0.6))
        player.i3.enemyhpregen = EN(enemyhpregenbase.mul(Math.random() + 0.8))
        player.i3.enemydamage = EN(enemydamagebase.mul(Math.random() + 0.5))
        player.i3.enemydefense = EN(enemydefensebase.mul(Math.random() + 0.8))
        player.i3.enemyname = "Cave Cyclops"
        player.i3.enemypicture = "<img src='resources/cavecyclops.png'</img>"
        player.i3.expgain = EN(player.i3.baseexpgain.mul(Math.random() + 0.7))
        player.i3.tokengain = EN(player.i3.basetokengain.mul(Math.random() + 0.7))
        consolePrint2("A " + player.i3.enemyname + " Spawned!")
    }
    if (player.i3.enemyid.eq(7)) {
        enemyhpbase = EN(150)
        enemyhpregenbase = EN(0.5)
        enemydamagebase = EN(11)
        enemydefensebase = EN(2)
        player.i3.baseexpgain = EN(5)
        player.i3.basetokengain = EN(10)
        player.i3.enemymaxhp = EN(enemyhpbase.mul(Math.random() + 0.7))
        player.i3.enemyhpregen = EN(enemyhpregenbase.mul(Math.random() + 0.2))
        player.i3.enemydamage = EN(enemydamagebase.mul(Math.random() + 0.9))
        player.i3.enemydefense = EN(enemydefensebase.mul(Math.random() + 0.7))
        player.i3.enemyname = "Stone Golem"
        player.i3.enemypicture = "<img src='resources/stonegolem.png'</img>"
        player.i3.expgain = EN(player.i3.baseexpgain.mul(Math.random() + 0.75))
        player.i3.tokengain = EN(player.i3.basetokengain.mul(Math.random() + 0.45))
        consolePrint2("A " + player.i3.enemyname + " Spawned!")
    }
    if (player.i3.enemyid.eq(8)) {
        enemyhpbase = EN(250)
        enemyhpregenbase = EN(0.3)
        enemydamagebase = EN(16)
        enemydefensebase = EN(0.4)
        player.i3.baseexpgain = EN(16)
        player.i3.basetokengain = EN(16)
        player.i3.enemymaxhp = EN(enemyhpbase.mul(Math.random() + 0.7))
        player.i3.enemyhpregen = EN(enemyhpregenbase.mul(Math.random() + 0.7))
        player.i3.enemydamage = EN(enemydamagebase.mul(Math.random() + 0.7))
        player.i3.enemydefense = EN(enemydefensebase.mul(Math.random() + 0.7))
        player.i3.enemyname = "Abandoned Pickaxe"
        player.i3.enemypicture = "<img src='resources/abandonedpickaxe.png'</img>"
        player.i3.expgain = EN(player.i3.baseexpgain.mul(Math.random() + 0.9))
        player.i3.tokengain = EN(player.i3.basetokengain.mul(Math.random() + 0.8))
        consolePrint2("A " + player.i3.enemyname + " Spawned!")
    }
}
function consolePrint2(line) {
    player.i3.consoleLines.push(line.replaceAll(' ', '&nbsp;'))
    player.i3.consoleLines.shift()
}