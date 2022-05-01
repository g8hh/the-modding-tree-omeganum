
addLayer("i", {
    name: "Incremental Game", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
    }},
    color: "white",
    nodeStyle() {
        if (hasUpgrade("i", 71))
        {
            return           {
            background: "linear-gradient(90deg, #ff0000, #ff7700, #ffff00, #77ff00, #00ff00, #00ff77, #00ffff, #0077ff, #0000ff, #7700ff, #ff00ff, #ff0077)",
            "background-origin": "border-box",
			}
		}
    },
    requires: new ExpantaNum(10), // Can be a function that takes requirement increases into account
    resource: "incremental points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        if (hasUpgrade('i', 15)) mult = mult.times(upgradeEffect('i', 15))
        mult = mult.times(buyableEffect('i', 21))
        if (hasUpgrade('i', 32)) mult = mult.times(upgradeEffect('i', 32))
        if (hasUpgrade('i', 42)) mult = mult.times(upgradeEffect('i', 42))
        mult = mult.times(buyableEffect('i', 41))
        mult = mult.times(layers.cc.effect())
        if (hasUpgrade('cc', 43)) mult = mult.times(upgradeEffect('cc', 43))
        if (hasUpgrade('cc', 72)) mult = mult.times(upgradeEffect('cc', 72))
        if (hasUpgrade('cc', 82)) mult = mult.times(upgradeEffect('cc', 82))
        if (hasUpgrade('cc', 84)) mult = mult.times(upgradeEffect('cc', 84))
        if (hasUpgrade('l', 12)) mult = mult.times(upgradeEffect('l', 12))
        if (hasUpgrade('l', 26)) mult = mult.times(upgradeEffect('l', 26))
        return mult
    },
    passiveGeneration() { return (hasUpgrade('i', 23)) || (hasUpgrade('cc', 12))},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for incremental points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    automate()
    {
                if (!hasUpgrade('ad', 35))
            {
                if (hasUpgrade('i', 31)) {
    buyBuyable(this.layer, 11)
    buyBuyable(this.layer, 12)
    buyBuyable(this.layer, 13)
    buyBuyable(this.layer, 14)
    }
    if (hasUpgrade('i', 33)) {
    buyBuyable(this.layer, 21)
    buyBuyable(this.layer, 22)
    buyBuyable(this.layer, 23)
    buyBuyable(this.layer, 24)
    }
    if (hasUpgrade('cc', 11)) 
    {
    buyBuyable([this.layer], 31)
    buyBuyable([this.layer], 41)
    buyBuyable([this.layer], 42)
    }
    if (hasUpgrade('cc', 11)) 
    {
    buyBuyable([this.layer], 31)
    buyBuyable([this.layer], 41)
    buyBuyable([this.layer], 42)
    }
    if (hasUpgrade('ad', 11)) 
    {
    buyBuyable(this.layer, 11)
    buyBuyable(this.layer, 12)
    buyBuyable(this.layer, 13)
    buyBuyable(this.layer, 14)
    buyBuyable(this.layer, 21)
    buyBuyable(this.layer, 22)
    buyBuyable(this.layer, 23)
    buyBuyable(this.layer, 24)
    buyBuyable([this.layer], 31)
    buyBuyable([this.layer], 41)
    buyBuyable([this.layer], 42)
    }
            }
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 11)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 12)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 13)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 14)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 15)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 23)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 31)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 32)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 33)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 41)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 42)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 43)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 51)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 52)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 61)
    },
    buyables: {
    11: {
        cost(x) { return new ExpantaNum(20).pow(x.div(50)).mul(20) },
        title: "Learn Coding",
        unlocked() { return hasUpgrade("i", 15) || (tmp.i.buyables[31].effect||0)>=2 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            if (!hasUpgrade("i", 31))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Hours of Practice: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Points";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.95).mul((buyableEffect('i', 23))).mul(player.cc.cookiebibleeffect).add(1)
        },
    },
        12: {
        cost(x) { return new ExpantaNum(40).pow(x.div(50)).mul(40) },
        title: "Javascript",
        unlocked() { return (tmp.i.buyables[11].effect||0)>=8 || (tmp.i.buyables[31].effect||0)>=2 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                        if (!hasUpgrade("i", 31))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Lines of Code: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to 3rd upgrade";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.95).mul((buyableEffect('i', 23))).mul(player.cc.cookiebibleeffect).add(1)
        },
    },
        13: {
        cost(x) { return new ExpantaNum(100).pow(x.div(50)).mul(100) },
        title: "Python",
        unlocked() { return (tmp.i.buyables[12].effect||0)>=8 || (tmp.i.buyables[31].effect||0)>=2},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                        if (!hasUpgrade("i", 31))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Lines of Code: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to 4th upgrade";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.70).mul((buyableEffect('i', 23))).mul(player.cc.cookiebibleeffect).add(1)
        },
    },
        14: {
        cost(x) { return new ExpantaNum(400).pow(x.div(50)).mul(400) },
        title: "C#",
        unlocked() { return (tmp.i.buyables[13].effect||0)>=5 || (tmp.i.buyables[31].effect||0)>=2},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                        if (!hasUpgrade("i", 31))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Lines of Code: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to 5th upgrade";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.70).mul((buyableEffect('i', 23))).mul(player.cc.cookiebibleeffect).add(1)
        },
    },
        21: {
        cost(x) { return new ExpantaNum(1e8).pow(x.div(25)).mul(1e8) },
        title: "Gather Ideas",
        unlocked() { return (hasUpgrade('i', 23)) || (tmp.i.buyables[31].effect||0)>=2},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                                    if (!hasUpgrade("i", 33))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Ideas: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Incremental Points";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.95).mul((buyableEffect('i', 24))).mul(player.cc.cookiebibleeffect).add(1)
        },
    },
        22: {
        cost(x) { return new ExpantaNum(1e11).pow(x.div(25)).mul(1e11) },
        title: "Clicker",
        unlocked() { return (hasUpgrade('i', 31)) || (tmp.i.buyables[31].effect||0)>=2},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                                                if (!hasUpgrade("i", 33))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Clicked: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to 3rd, 4th, and 5th upgrades";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.80).mul(player.cc.cookiebibleeffect).add(1)
        },
    },
        23: {
        cost(x) { return new ExpantaNum(1e12).pow(x.div(25)).mul(1e12) },
        title: "Passive Income",
        unlocked() { return (tmp.i.buyables[22].effect||0)>=4 || (tmp.i.buyables[31].effect||0)>=2},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                                                if (!hasUpgrade("i", 33))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Different Industries: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to the first 4 buyables";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.80).mul(player.cc.cookiebibleeffect).add(1)
        },
    },
        24: {
        cost(x) { return new ExpantaNum(1e22).pow(x.div(25)).mul(1e25) },
        title: "Upgrades",
        unlocked() { return (tmp.i.buyables[23].effect||0)>=10 || (tmp.i.buyables[31].effect||0)>=2},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                                                if (!hasUpgrade("i", 33))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Different Upgrades: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to the fifth buyable";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.85).add(1)
            if (!hasUpgrade("i", 53))
            {
                return player[this.layer].buyables[this.id].pow(0.85).mul(player.cc.cookiebibleeffect).add(1)
            }
        },
    },
        31: {
        cost(x) { return new ExpantaNum(5e31).pow(x.div(1.5)).mul(5e31) },
        title: "Prestige Function",
        unlocked() { return (hasUpgrade('i', 41)) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            if (!hasUpgrade("i", 52))
            {
            player.points = new ExpantaNum("0")
            player.i.points = new ExpantaNum("0")
            player.i.buyables[11] = new ExpantaNum("0")
            player.i.buyables[12] = new ExpantaNum("0")
            player.i.buyables[13] = new ExpantaNum("0")
            player.i.buyables[14] = new ExpantaNum("0")
            player.i.buyables[21] = new ExpantaNum("0")
            player.i.buyables[22] = new ExpantaNum("0")
            player.i.buyables[23] = new ExpantaNum("0")
            player.i.buyables[24] = new ExpantaNum("0")
            }
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Layers: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to points\n\Resets everything but Upgrades";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul(1e10).pow(0.97).mul(player.cc.cookiebibleeffect).add(1)
        },
    },
        41: {
        cost(x) { return new ExpantaNum(1e165).pow(x.div(7)).mul(1e165) },
        title: "Make the game look good",
        unlocked() { return (hasUpgrade('i', 51)) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
              if (!hasUpgrade("cc", 11))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Art Added: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to incremental points";
         },
        branches: [11, 12, 13, 14, 21, 22, 23, 24, 31],
        effect() 
        {
            return player[this.layer].buyables[this.id].mul(4e11).pow(0.971).mul(player.cc.cookiebibleeffect).add(1)
        },
    },
        42: {
        cost(x) { return new ExpantaNum(1e190).pow(x.div(22)).mul(1e190) },
        title: "Test The Game",
        unlocked() { return (tmp.i.buyables[41].effect||0)>=9e10 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            if (player.i.buyables[42] < 1320)
            {
                          if (!hasUpgrade("cc", 11))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
             setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))             
			}
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Hours of Testing: " + player[this.layer].buyables[this.id] + " \n\
           ^" + format(data.effect) + " boost to points";
         },
        branches: ["blue", 11, 12, 13, 14, 21, 22, 23, 24, 31],
        effect() 
        {
            return player[this.layer].buyables[this.id].add(1).pow(0.04)
        },
    },
    },
    upgrades: 
    {
        11:
        {
            title: "The Beginning of the Idea",
            description: "Double your point gain.",
            cost: new ExpantaNum(1),
        },
        12:
        {
            title: "It's a Great Idea",
            description: "Triple your point gain.",
            cost: new ExpantaNum(2),
            unlocked() { return hasUpgrade("i", 11) },
        },
        13:
        {
            title: "Incremental Game?",
            description: "Boost Point gain based on Incremental Points",
            cost: new ExpantaNum(5),
            unlocked() { return hasUpgrade("i", 12) },
                effect() 
                {
                     return player[this.layer].points.add(1).mul((buyableEffect('i', 12))).mul((buyableEffect('i', 22))).pow(0.5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14:
        {
            title: "Or Maybe Idle Game",
            description: "Boost Point gain based on Points",
            cost: new ExpantaNum(20),
            unlocked() { return hasUpgrade("i", 13) },
                effect() 
                {
                     return player.points.add(1).mul((buyableEffect('i', 13))).mul((buyableEffect('i', 22))).pow(0.25)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15:
        {
            title: "I should start making the game?",
            description: "Boost Incremental Points based on Incremental Points",
            cost: new ExpantaNum(100),
            unlocked() { return hasUpgrade("i", 14) },
                effect() 
                {
                     return player[this.layer].points.add(1).mul((buyableEffect('i', 14))).mul((buyableEffect('i', 22))).pow(0.20)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23:
        {
            title: "Start making the game",
            description: "Gain 100% of Incremental Points per second, and unlocks cool stuff",
            cost: new ExpantaNum(25000),
            unlocked() { return (tmp.i.buyables[14].effect||0)>=6 },
            branches: [11, 12, 13, 14, 15],
        },
        31:
        {
            title: "Automated Coding Lessons",
            description: "Autobuys the first 4 buyables and it does not deduct your Incremental Points",
            cost: new ExpantaNum(1e12),
            unlocked() { return (tmp.i.buyables[21].effect||0)>=4 },
            branches: [11, 12, 13, 14, 15, 23],
        },
        32:
        {
            title: "Make Developing Faster",
            description: "Boosts Incremental Points Based On Points",
            cost: new ExpantaNum(1e13),
            unlocked() { return (tmp.i.buyables[23].effect||0)>=1.9 },
            branches: [11, 12, 13, 14, 15, 23],
                effect() 
                {
                     return player.points.add(1).pow(0.15)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        33:
        {
            title: "Pure Automation",
            description: "Automates the second row of buyables",
            cost: new ExpantaNum(1e32),
            unlocked() { return (tmp.i.buyables[24].effect||0)>=2.5 },
            branches: [11, 12, 13, 14, 15, 23],
        },
        41:
        {
            title: "Resets Sound Like a good idea!",
            description: "Unlocks more cool stuff",
            cost: new ExpantaNum(2e31),
            unlocked() { return (tmp.i.buyables[24].effect||0)>=2.5 },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33],
        },
        42:
        {
            title: "Time for rest can help right?",
            description: "Boost to Points and Incremental Points based on Time Played",
            cost: new ExpantaNum(5e59),
            unlocked() { return (tmp.i.buyables[31].effect||0)>=9e9 },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33],
                effect() 
                {
                     return player.timePlayed
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        43:
        {
            title: "Github",
            description: "^1.03 boost to Point gain",
            cost: new ExpantaNum(1e75),
            unlocked() { return (tmp.i.buyables[31].effect||0)>=1.4e10 },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33],
        },
        51:
        {
            title: "Finish Coding",
            description: "x1e30 boost to Point gain, and unlock new stuff",
            cost: new ExpantaNum(2e85),
            unlocked() { return hasUpgrade("i", 43) },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33, 41, 42, 43],
        },
        52:
        {
            title: "Non Resetting Layers",
            description: "Buying Prestige Functions doesnt reset anything",
            cost: new ExpantaNum(1e240),
            unlocked() { return hasUpgrade("i", 51) },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33, 41, 42, 43],
        },
        61:
        {
            title: "Publish the Game",
            description: "Unlocks a new layer (Finally)",
            cost: new ExpantaNum(1.79e308),
            currencyLocation() {return player}, 
            currencyDisplayName: "points",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade("i", 52) },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33, 41, 42, 43],
        },
        71:
        {
            title: "UNLOCK THE POWER OF INCREMENTAL",
            description: "Adds a ^10 to the Cookie Time Effect and make stuff look cool (makes the node look gay?)",
            cost: new ExpantaNum("1e25000000"),
            unlocked() { return hasUpgrade("l", 76) },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33, 41, 42, 43, 61],
        },
    },
    layerShown(){return true}
})

addLayer("cc", {
    name: "Cookie Clicker", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "<img src='resources/cookielayersymbol.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
        sugarlumps: new ExpantaNum(0),
        heavenlychips: new ExpantaNum(0),
        wrinklerjuice: new ExpantaNum(0),
        xcookies: new ExpantaNum(0),
        ycookies: new ExpantaNum(0),
        zcookies: new ExpantaNum(0),
        x: new ExpantaNum(0),
        y: new ExpantaNum(0),
        xlumps: new ExpantaNum(0),
        ylumps: new ExpantaNum(0),
        zlumps: new ExpantaNum(0),
        autowalkingdirection: new ExpantaNum(0),
        cookiebibles: new ExpantaNum(0),
        cookiebibleeffect: new ExpantaNum(0),
        cultists: new ExpantaNum(0),
        cultisteffect: new ExpantaNum(0),
        cookieblood: new ExpantaNum(0),
        cookiebloodeffect: new ExpantaNum(0),
        ritualactive: new ExpantaNum(0),
        patreonsubscribers: new ExpantaNum(0),
        patreoneffect: new ExpantaNum(0),
        cookietime: new ExpantaNum(0)
    }},
    color: "#654321",
    requires: new ExpantaNum(1.79e308), // Can be a function that takes requirement increases into account
    resource: "Cookies", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.044, // Prestige currency exponent

    passiveGeneration() { return (hasUpgrade('cc', 13)) },
    branches: ["i"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        mult = mult.times(buyableEffect('cc', 11))
        if (hasUpgrade('cc', 31)) mult = mult.times(upgradeEffect('cc', 31))
        if (hasUpgrade('cc', 32)) mult = mult.times(upgradeEffect('cc', 32))
        if (hasUpgrade('cc', 33)) mult = mult.times(upgradeEffect('cc', 33))
        if (hasUpgrade('cc', 41)) mult = mult.times(upgradeEffect('cc', 41))
        if (hasUpgrade('cc', 52)) mult = mult.times(upgradeEffect('cc', 52))
        if (hasUpgrade('cc', 73)) mult = mult.times(upgradeEffect('cc', 73))
	    if (hasUpgrade('cc', 102)) mult = mult.times(0.01)
        if (hasUpgrade('cc', 122)) mult = mult.times(upgradeEffect('cc', 122))
        if (hasUpgrade('l', 13)) mult = mult.times(upgradeEffect('l', 13))
        if (hasUpgrade('cc', 222)) mult = mult.times(upgradeEffect('cc', 222))
        if (hasUpgrade('l', 27)) mult = mult.times(upgradeEffect('l', 27))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: Reset for Cookies", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
		effect() 
        {
			return new ExpantaNum.add(player.cc.points.pow(0.5), 1);
		},
        effectDescription(){
                let eff = layers.cc.effect()
                return "which multiplies incremental point gain by x" + format(eff)
        },
    automate()
    {
            if (!hasUpgrade('ad', 35))
            {
                        if (hasUpgrade('cc', 22)) 
        {
        buyBuyable([this.layer], 11)
        buyBuyable([this.layer], 12)
        buyBuyable([this.layer], 13)
        buyBuyable([this.layer], 14)
        }
        if (hasUpgrade('cc', 51)) 
        {
        buyBuyable([this.layer], 21)
        buyBuyable([this.layer], 22)
        buyBuyable([this.layer], 23)
        buyBuyable([this.layer], 24)
        }
        if (hasUpgrade('cc', 71)) 
        {
        buyBuyable([this.layer], 31)
        buyBuyable([this.layer], 32)
        buyBuyable([this.layer], 33)
        buyBuyable([this.layer], 34)
        }
        if (hasUpgrade('cc', 111)) 
        {
        buyBuyable([this.layer], 51)
        buyBuyable([this.layer], 52)
        buyBuyable([this.layer], 53)
        }
        if (hasUpgrade('cc', 113)) 
        {
        buyBuyable([this.layer], 41)
        buyBuyable([this.layer], 61)
        buyBuyable([this.layer], 71)
        buyBuyable([this.layer], 72)
        buyBuyable([this.layer], 73)
        }
        if (hasUpgrade('cc', 201)) 
        {
        buyBuyable([this.layer], 81)
        buyBuyable([this.layer], 82)
        buyBuyable([this.layer], 83)
        buyBuyable([this.layer], 111)
        buyBuyable([this.layer], 112)
        buyBuyable([this.layer], 113)
        }
        if (hasUpgrade('cc', 221)) 
        {
        buyBuyable([this.layer], 121)
        buyBuyable([this.layer], 122)
        }
            }
    },
    buyables:
    {
        11: {
        cost(x) { return new ExpantaNum(2).pow(x.div(40)).mul(2) },
        title: "Cursor",
        unlocked() { return hasUpgrade("cc", 12)  || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                          if (!hasUpgrade("cc", 22))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookies";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 12))).pow(0.95).add(1)
        },
    },
        12: {
        cost(x) { return new ExpantaNum(200).pow(x.div(20)).mul(200) },
        title: "Grandma",
        unlocked() { return (tmp.cc.buyables[11].effect||0)>=40  || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                                      if (!hasUpgrade("cc", 22))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + format(player[this.layer].buyables[this.id]) + " \n\
           x" + format(data.effect) + " boost to Cursors";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 13))).pow(0.95).add(1)
        },
        },
        13: {
        cost(x) { return new ExpantaNum(8000).pow(x.div(19)).mul(8000) },
        title: "Cookie Farm",
        unlocked() { return (tmp.cc.buyables[12].effect||0)>=6  || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                                      if (!hasUpgrade("cc", 22))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Grandmas";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 14))).pow(0.95).add(1)
        },
        },
        14: {
        cost(x) { return new ExpantaNum(4e6).pow(x.div(16)).mul(4e6) },
        title: "Cookie Mine",
        unlocked() { return (tmp.cc.buyables[12].effect||0)>=25  || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                                      if (!hasUpgrade("cc", 22))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Farms";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 21))).pow(0.95).add(1)
        },
        },
        21: {
        cost(x) { return new ExpantaNum(1e10).pow(x.div(14)).mul(1e10) },
        title: "Cookie Factory",
        unlocked() { return (tmp.cc.buyables[14].effect||0)>=7  || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                                     if (!hasUpgrade("cc", 51))
            {
               player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Mines";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 22))).pow(0.95).add(1)
        },
        },
        22: {
        cost(x) { return new ExpantaNum(1e15).pow(x.div(13)).mul(1e15) },
        title: "Cookie Bank",
        unlocked() { return (tmp.cc.buyables[21].effect||0)>=4  || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                                                 if (!hasUpgrade("cc", 51))
            {
               player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Factories \n\Also produces Sugar Lumps";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 23))).pow(0.95).add(1)
        },
        },
        23: {
        cost(x) { return new ExpantaNum(1e20).pow(x.div(12)).mul(1e20) },
        title: "Cookie Temple",
        unlocked() { return (tmp.cc.buyables[22].effect||0)>=5  || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                                                 if (!hasUpgrade("cc", 51))
            {
               player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Banks";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 24))).pow(1.05).add(1)
        },
        },
        24: {
        cost(x) { return new ExpantaNum(1e25).pow(x.div(11)).mul(1e25) },
        title: "Cookie Wizard Tower",
        unlocked() { return (tmp.cc.buyables[23].effect||0)>=4.5  || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
                                                 if (!hasUpgrade("cc", 51))
            {
               player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Temples";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(1.05).add(1)
        },
        },
        31: {
        cost(x) { return new ExpantaNum(1000).pow(x.div(20)).mul(1000) },
        title: "Cookie Shipment",
        unlocked() { return (tmp.cc.buyables[24].effect||0)>=3.8  || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player.cc.sugarlumps.gte(this.cost()) },
        buy() {
                                                         if (!hasUpgrade("cc", 71))
            {
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Sugar Lumps";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 32))).pow(0.5).add(1)
        },
        },
        32: {
        cost(x) { return new ExpantaNum(10000).pow(x.div(18)).mul(10000) },
        title: "Cookie Alchemy Lab",
        unlocked() { return (tmp.cc.buyables[31].effect||0)>=4.5  || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player.cc.sugarlumps.gte(this.cost()) },
        buy() {
                                                         if (!hasUpgrade("cc", 71))
            {
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Shipments";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 33))).pow(0.5).add(1)
        },
        },
        33: {
        cost(x) { return new ExpantaNum(100000).pow(x.div(16)).mul(100000) },
        title: "Cookie Portal",
        unlocked() { return (tmp.cc.buyables[32].effect||0)>=4.0  || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player.cc.sugarlumps.gte(this.cost()) },
        buy() {
                                                         if (!hasUpgrade("cc", 71))
            {
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Alchemy Labs";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 34))).pow(0.5).add(1)
        },
        },
        34: {
        cost(x) { return new ExpantaNum(1000000).pow(x.div(13)).mul(1000000) },
        title: "Cookie Time Machine",
        unlocked() { return (tmp.cc.buyables[33].effect||0)>=3.4 || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player.cc.sugarlumps.gte(this.cost()) },
        buy() {
                                                         if (!hasUpgrade("cc", 71))
            {
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Portal";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.5).add(1)
        },
        },
        41: {
        cost(x) { return new ExpantaNum(1e37).pow(x.div(6.5)).mul(1e37) },
        title: "Cookie Ascension",
        unlocked() { return (tmp.cc.buyables[34].effect||0)>=2.4 || (tmp.cc.buyables[41].effect||0)>=1 },
        canAfford() { return player.cc.points.gte(this.cost()) },
        buy() {
            player.cc.points = player.cc.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            if (!hasUpgrade("cc", 113))
            {
            player.cc.points = new ExpantaNum("0")
            player.cc.sugarlumps = new ExpantaNum("0")
            player.cc.buyables[11] = new ExpantaNum("0")
            player.cc.buyables[12] = new ExpantaNum("0")
            player.cc.buyables[13] = new ExpantaNum("0")
            player.cc.buyables[14] = new ExpantaNum("0")
            player.cc.buyables[21] = new ExpantaNum("0")
            player.cc.buyables[22] = new ExpantaNum("0")
            player.cc.buyables[23] = new ExpantaNum("0")
            player.cc.buyables[24] = new ExpantaNum("0")
            player.cc.buyables[31] = new ExpantaNum("0")
            player.cc.buyables[32] = new ExpantaNum("0")
            player.cc.buyables[33] = new ExpantaNum("0")
            player.cc.buyables[34] = new ExpantaNum("0")
            }
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Heavenly Chips per second ";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul(1).pow(1.8)
        },
        },
        51: {
        cost(x) { return new ExpantaNum(100).pow(x.div(20)).mul(100) },
        title: "Cookie Antimatter Condenser",
        unlocked() { return (tmp.cc.buyables[41].effect||0)>=2.5 },
        canAfford() { return player.cc.heavenlychips.gte(this.cost()) },
        buy() {
                                                                 if (!hasUpgrade("cc", 111))
            {
            player.cc.heavenlychips = player.cc.heavenlychips.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Heavenly Chips\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Heavenly Chips";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 52))).pow(0.95).add(1)
        },
        },
        52: {
        cost(x) { return new ExpantaNum(1000).pow(x.div(18)).mul(1000) },
        title: "Cookie Prism",
        unlocked() { return (tmp.cc.buyables[51].effect||0)>=4.2 },
        canAfford() { return player.cc.heavenlychips.gte(this.cost()) },
        buy() {
                                                                 if (!hasUpgrade("cc", 111))
            {
            player.cc.heavenlychips = player.cc.heavenlychips.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Heavenly Chips\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Antimatter Condensers";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 53))).pow(0.95).add(1)
        },
        },
        53: {
        cost(x) { return new ExpantaNum(10000).pow(x.div(15)).mul(10000) },
        title: "Cookie Chancemaker",
        unlocked() { return (tmp.cc.buyables[52].effect||0)>=5.18 },
        canAfford() { return player.cc.heavenlychips.gte(this.cost()) },
        buy() {
                                                                 if (!hasUpgrade("cc", 111))
            {
            player.cc.heavenlychips = player.cc.heavenlychips.sub(this.cost())
            }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Heavenly Chips\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Prism";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.95).add(1)
        },
        },
        61: {
        cost(x) { return new ExpantaNum(1e15).pow(x.div(14)).mul(1e15) },
        title: "Wrinkler",
        unlocked() { return hasUpgrade("cc", 102) },
        canAfford() { return player.cc.sugarlumps.gte(this.cost()) },
        buy() {
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Wrinkler Juice per Second";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 71))).pow(1.5)
        },
        },
        71: {
        cost(x) { return new ExpantaNum(100).pow(x.div(14)).mul(100) },
        title: "Cookie Antimatter Condenser",
        unlocked() { return hasUpgrade("cc", 111) },
        canAfford() { return player.cc.wrinklerjuice.gte(this.cost()) },
        buy() {
            player.cc.wrinklerjuice = player.cc.wrinklerjuice.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Wrinkler Juice\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Wrinklers";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 72))).pow(0.9).add(1)
        },
        },
        72: {
        cost(x) { return new ExpantaNum(10000).pow(x.div(12)).mul(10000) },
        title: "Cookie Javascript Console",
        unlocked() { return (tmp.cc.buyables[71].effect||0)>=6.6 },
        canAfford() { return player.cc.wrinklerjuice.gte(this.cost()) },
        buy() {
            player.cc.wrinklerjuice = player.cc.wrinklerjuice.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Wrinkler Juice\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Antimatter Condensers";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 73))).pow(0.9).add(1)
        },
        },
        73: {
        cost(x) { return new ExpantaNum(10000000).pow(x.div(8)).mul(10000000) },
        title: "Cookie Idleverse",
        unlocked() { return (tmp.cc.buyables[72].effect||0)>=4.89 },
        canAfford() { return player.cc.wrinklerjuice.gte(this.cost()) },
        buy() {
            player.cc.wrinklerjuice = player.cc.wrinklerjuice.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Wrinkler Juice\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Antimatter Condensers";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.9).add(1)
        },
        },
        81: {
        cost(x) { return new ExpantaNum(10).pow(x.div(20)).mul(10) },
        title: "X Cookie Grandma",
        unlocked() { return hasUpgrade("cc", 121) },
        canAfford() { return player.cc.xcookies.gte(this.cost()) },
        buy() {
            player.cc.xcookies = player.cc.xcookies.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " X Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Sugar Lumps";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 112))).pow(0.8).add(1)
        },
        },
        82: {
        cost(x) { return new ExpantaNum(10).pow(x.div(20)).mul(10) },
        title: "Y Cookie Grandma",
        unlocked() { return hasUpgrade("cc", 121) },
        canAfford() { return player.cc.ycookies.gte(this.cost()) },
        buy() {
            player.cc.ycookies = player.cc.ycookies.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Y Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Heavenly Chips";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 112))).pow(0.7).add(1)
        },
        },
        83: {
        cost(x) { return new ExpantaNum(20).pow(x.div(10)).mul(20) },
        title: "Z Cookie Grandma",
        unlocked() { return hasUpgrade("cc", 121) },
        canAfford() { return player.cc.zcookies.gte(this.cost()) },
        buy() {
            player.cc.zcookies = player.cc.zcookies.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Z Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to X and Y Cookies";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 112))).pow(0.3).add(1)
        },
        },
        91: {
        cost(x) { return new ExpantaNum(0) },
        title: "Walk Right",
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.cc.x = player.cc.x.add(1)
        },
        },
        93: {
        cost(x) { return new ExpantaNum(0) },
        title: "Walk Forward",
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.cc.y = player.cc.y.add(1)
        },
        },
        111: {
        cost(x) { return new ExpantaNum(100000).pow(x.div(18)).mul(100000) },
        title: "X Cookie Wrinkler",
        unlocked() { return hasUpgrade("cc", 181) && hasUpgrade("cc", 182)},
        canAfford() { return player.cc.xlumps.gte(this.cost()) },
        buy() {
            player.cc.xlumps = player.cc.xlumps.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " X Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Dimensional Cookies";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.8).add(1)
        },
        },
        112: {
        cost(x) { return new ExpantaNum(100000).pow(x.div(18)).mul(100000) },
        title: "Y Cookie Wrinkler",
        unlocked() { return hasUpgrade("cc", 181) && hasUpgrade("cc", 182) },
        canAfford() { return player.cc.ylumps.gte(this.cost()) },
        buy() {
            player.cc.ylumps = player.cc.ylumps.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Y Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Dimensional Grandmas";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.8).add(1)
        },
        },
        113: {
        cost(x) { return new ExpantaNum(100000).pow(x.div(18)).mul(100000) },
        title: "Z Cookie Wrinkler",
        unlocked() { return hasUpgrade("cc", 181) && hasUpgrade("cc", 182) },
        canAfford() { return player.cc.zlumps.gte(this.cost()) },
        buy() {
            player.cc.zlumps = player.cc.zlumps.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Z Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to autowalking";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.7).add(1)
        },
        },
        121: {
        cost(x) { return new ExpantaNum(20).pow(x.div(20)).mul(20) },
        title: "Priest Grandma",
        unlocked() { return hasUpgrade("cc", 192) },
        canAfford() { return player.cc.cookiebibles.gte(this.cost()) },
        buy() {
            player.cc.cookiebibles = player.cc.cookiebibles.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookie Bibles\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Bible income";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.6).add(1)
        },
        },
        122: {
        cost(x) { return new ExpantaNum(100).pow(x.div(5)).mul(100) },
        title: "Sacrifice Cultists",
        unlocked() { return (tmp.cc.buyables[121].effect||0)>=4.8 },
        canAfford() { return player.cc.cultists.gte(this.cost()) },
        buy() {
            player.cc.cultists = player.cc.cultists.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cultists\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Cookie Blood per second";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(1.5).times(0.1)
        },
        },
        131: {
        cost(x) { return },
        title: "Cookie Ritual Activation",
        unlocked() { return (tmp.cc.buyables[122].effect||0)>=0.27 },
        canAfford() { return true },
        buy() {
                player.cc.ritualactive = new ExpantaNum(1)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cookie Blood effect boosts Cultist, but exponentially drains Cookie Blood. Ritual Active: " + format(player.cc.ritualactive);
         },
        },
        132: {
        cost(x) { return },
        title: "Cookie Ritual Deactivation",
        unlocked() { return (tmp.cc.buyables[122].effect||0)>=0.27 },
        canAfford() { return true },
        buy() {
                player.cc.ritualactive = new ExpantaNum(0)
        },
        },
        141: {
        cost(x) { return new ExpantaNum(2).pow(x.div(20)).mul(2) },
        title: "Advertise Your Patreon",
        unlocked() { return hasUpgrade("l", 14) },
        canAfford() { return player.l.points.gte(this.cost()) },
        buy() {
            player.l.points = player.l.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + "$\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Patreon Subscribers per Second";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.8).times(0.01)
        },
        },
    },
    upgrades: 
    {
        11:
        {
            title: "Free Points",
            description: "Get 1e14 Incremental Points per second and autobuys the rest of the buyables",
            cost: new ExpantaNum(0),
        },
        12:
        {
            title: "Automation^3",
            description: "Autobuys all the upgrades",
            cost: new ExpantaNum(1),
        },
        13:
        {
            title: "Automation^4",
            description: "Passively Generate Cookies",
            cost: new ExpantaNum(3),
        },
        21:
        {
            title: "Cookie-Point Synergy",
            description: "Cookies also boost Point gain",
            cost: new ExpantaNum(1e9),
            unlocked() { return (tmp.cc.buyables[14].effect||0)>=5 },
                effect() 
                {
                     return player.cc.points.add(1).pow(0.499)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22:
        {
            title: "Cookie Engineer",
            description: "Automates the First row of buyables",
            unlocked() { return (tmp.cc.buyables[14].effect||0)>=5 },
            cost: new ExpantaNum(1e12),
            unlocked() { return (tmp.cc.buyables[14].effect||0)>=24 },
        },
        31:
        {
            title: "Point-Cookie Synergy",
            description: "Points boost Cookie gain",
            cost: new ExpantaNum(1e13),
            unlocked() { return (tmp.cc.buyables[21].effect||0)>=3 },
                effect() 
                {
                     return player.points.add(1).pow(0.0006)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        32:
        {
            title: "Incremental Point-Cookie Synergy",
            description: "Incremental Points boost Cookie gain",
            cost: new ExpantaNum(1e13),
            unlocked() { return (tmp.cc.buyables[21].effect||0)>=3 },
                effect() 
                {
                     return player.points.add(1).pow(0.0009)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        33:
        {
            title: "Cookie-Cookie Synergy",
            description: "Cookies boost Cookie gain",
            cost: new ExpantaNum(1e13),
            unlocked() { return (tmp.cc.buyables[21].effect||0)>=3 },
                effect() 
                {
                     return player.cc.points.add(1).pow(0.01)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        41:
        {
            title: "Sugar Lumps-Cookie Synergy",
            description: "Sugar Lumps boost Cookie gain",
            cost: new ExpantaNum(10),
            unlocked() { return (tmp.cc.buyables[22].effect||0)>=1.9 },
                effect() 
                {
                     return player.cc.sugarlumps.add(1).pow(0.3456789)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        42:
        {
            title: "Sugar Lumps-Point Synergy",
            description: "Sugar Lumps boost Point gain",
            cost: new ExpantaNum(20),
            unlocked() { return (tmp.cc.buyables[22].effect||0)>1.9 },
                effect() 
                {
                     return player.cc.sugarlumps.add(1).pow(2.1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        43:
        {
            title: "Sugar Lumps-Incremental Point Synergy",
            description: "Sugar Lumps boost Incremental Point gain",
            cost: new ExpantaNum(40),
            unlocked() { return (tmp.cc.buyables[22].effect||0)>=1.9 },
                effect() 
                {
                     return player.cc.sugarlumps.add(1).pow(1.8)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        51:
        {
            title: "Cookie Lord",
            description: "Automates the Second row of buyables",
            cost: new ExpantaNum(1e26),
            unlocked() { return (tmp.cc.buyables[24].effect||0)>=2 },
        },
        52:
        {
            title: "Cookie Master",
            description: "Boost Cookie Gain based on Time Played",
            cost: new ExpantaNum(10000),
            unlocked() { return (tmp.cc.buyables[24].effect||0)>=2 },
                effect() 
                {
                     return player.timePlayed
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        61:
        {
            title: "Points-Sugar Lumps Synergy",
            description: "Points boost Sugar Lumps Gain",
            cost: new ExpantaNum(150000),
            unlocked() { return (tmp.cc.buyables[33].effect||0)>=2.4 },
                effect() 
                {
                     return player.points.add(1).pow(0.0003)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        62:
        {
            title: "Inremental Points-Sugar Lumps Synergy",
            description: "Incremental Points boost Sugar Lumps Gain",
            cost: new ExpantaNum(250000),
            unlocked() { return (tmp.cc.buyables[33].effect||0)>=2.4 },
                effect() 
                {
                     return player.i.points.add(1).pow(0.00035)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        63:
        {
            title: "Cookies-Sugar Lumps Synergy",
            description: "Cookies boost Sugar Lumps Gain",
            cost: new ExpantaNum(450000),
            unlocked() { return (tmp.cc.buyables[33].effect||0)>=2.4 },
                effect() 
                {
                     return player.cc.points.add(1).pow(0.004)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        64:
        {
            title: "Sugar Lumps-Sugar Lumps Synergy",
            description: "Sugar Lumps boost Sugar Lumps Gain",
            cost: new ExpantaNum(1000000),
            unlocked() { return (tmp.cc.buyables[33].effect||0)>=2.4 },
                effect() 
                {
                     return player.cc.sugarlumps.add(1).pow(0.05)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        71:
        {
            title: "Cookie God",
            description: "Automates the Third row of buyables",
            cost: new ExpantaNum(5),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=1 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        72:
        {
            title: "Heavenly Chip-Points and Incremental Points Synergy",
            description: "Boosts Points and Incremental Points based on Heavenly Chips",
            cost: new ExpantaNum(10),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=1 },
                effect() 
                {
                     return player.cc.heavenlychips.add(1).pow(0.8)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        73:
        {
            title: "Heavenly Chip-Cookies Synergy",
            description: "Boosts Cookies based on Heavenly Chips",
            cost: new ExpantaNum(15),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=1 },
                effect() 
                {
                     return player.cc.heavenlychips.add(1).pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        74:
        {
            title: "Heavenly Chip-Sugar Lumps Synergy",
            description: "Boosts Sugar Lumps based on Heavenly Chips",
            cost: new ExpantaNum(20),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=1 },
                effect() 
                {
                     return player.cc.heavenlychips.add(1).pow(0.2)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        81:
        {
            title: "Heavenly Chip-Points Synergy",
            description: "Boosts Points based on Heavenly Chips",
            cost: new ExpantaNum(250),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=2.5 },
                effect() 
                {
                     return player.cc.heavenlychips.add(1).pow(0.9)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        82:
        {
            title: "Heavenly Chip-Incremental Points Synergy",
            description: "Boosts Incremental Points based on Heavenly Chips",
            cost: new ExpantaNum(250),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=2.5 },
                effect() 
                {
                     return player.cc.heavenlychips.add(1).pow(0.88)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        83:
        {
            title: "Incremental Points and Cookies-Point Synergy",
            description: "Boosts Points based on Incremental Points and Cookies",
            cost: new ExpantaNum(1000),
            unlocked() { return (tmp.cc.buyables[51].effect||0)>=3.44 },
                effect() 
                {
                     return player.i.points.add(1).pow(0.001).mul(player.cc.points.add(1).pow(0.08))
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        84:
        {
            title: "Points and Cookies-Incremental Point Synergy",
            description: "Boosts Incremental Points based on Points and Cookies",
            cost: new ExpantaNum(1000),
            unlocked() { return (tmp.cc.buyables[51].effect||0)>=3.44 },
                effect() 
                {
                     return player.points.add(1).pow(0.0003).mul(player.cc.points.add(1).pow(0.08))
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        91:
        {
            title: "Cookie Immortality",
            description: "Boosts Heavenly Chips and Sugar Lumps based on time played",
            cost: new ExpantaNum(2500),
            unlocked() { return (tmp.cc.buyables[52].effect||0)>=2.7 },
                effect() 
                {
                     let a = player.timePlayed
                     return (a/10000)+1
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        92:
        {
            title: "Cookie Holy Lords",
            description: "Boosts Heavenly Chips and Sugar Lumps based on amount of Cursors",
            cost: new ExpantaNum(100000),
            unlocked() { return (tmp.cc.buyables[53].effect||0)>=4 },
                effect() 
                {
                     return player[this.layer].buyables[11].add(1).pow(0.25)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        93:
        {
            title: "Cookie Jesus",
            description: "Boosts Heavenly Chips and Sugar Lumps based on amount of Grandmas",
            cost: new ExpantaNum(1e7),
            unlocked() { return (tmp.cc.buyables[53].effect||0)>=7 },
                effect() 
                {
                     return player[this.layer].buyables[12].add(1).pow(0.3)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        101:
        {
            title: "The Grandmas are Mad...",
            description: "Boosts Points based on amount of Grandmas",
            cost: new ExpantaNum(1e8),
            unlocked() { return (tmp.cc.buyables[53].effect||0)>=11 },
                effect() 
                {
                     return player[this.layer].buyables[12].add(1).pow(0.9)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        102:
        {
            title: "START THE GRANDMAPOCALYPSE",
            description: "THIS UPGRADE HAS NO OFF BUTTON. BE WARNED. SLOWS COOKIE GAIN BY 100 AND INCREASES SUGAR LUMP GAIN BY 10. IT IS UNCERTAIN ABOUT WHAT IS GOING TO HAPPEN NEXT.",
            cost: new ExpantaNum(5e8),
            unlocked() { return (tmp.cc.buyables[53].effect||0)>=11 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        111:
        {
            title: "Cookie Devil",
            description: "Automates the Fifth row of buyables",
            cost: new ExpantaNum(1e80),
            unlocked() { return (tmp.cc.buyables[61].effect||0)>=1.4},
        },
        112:
        {
            title: "Cookie Goku",
            description: "Boosts Wrinkler Juice based on time played",
            cost: new ExpantaNum(1500),
            unlocked() { return (tmp.cc.buyables[71].effect||0)>=2.7 },
                effect() 
                {
                     let a = player.timePlayed
                     return a
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Wrinkler Juice",
            currencyInternalName: "wrinklerjuice",
        },
        113:
        {
            title: "Cookie Rick Astley",
            description: "Autobuys Final 2 Rows of Cookie Buyables, and Cookie Ascensions do not reset everything and automates Cookie Ascensions.",
            cost: new ExpantaNum(100000000),
            unlocked() { return (tmp.cc.buyables[73].effect||0)>=1.9 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Wrinkler Juice",
            currencyInternalName: "wrinklerjuice",
        },
        121:
        {
            title: "Unlock the second quarter of this layer (COOL)",
            description: "Unlocks a new tab",
            cost: new ExpantaNum(1e9),
            unlocked() { return (tmp.cc.buyables[73].effect||0)>=1.9 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Wrinkler Juice",
            currencyInternalName: "wrinklerjuice",
        },
        122:
        {
            title: "Break the laws of Cookie Physics",
            description: "Boosts Cookies based on Cookie Ascensions, and start producing dimensional cookies",
            cost: new ExpantaNum(1e9),
            unlocked() { return hasUpgrade("cc", 121) },
                effect() 
                {
                     return player[this.layer].buyables[41].pow(2)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Wrinkler Juice",
            currencyInternalName: "wrinklerjuice",
        },
        131:
        {
            title: "X cookie synergy",
            description: "Boosts X Cookies based on X Cookie Grandmas",
            cost: new ExpantaNum(50),
            unlocked() { return (tmp.cc.buyables[81].effect||0)>=6 },
                effect() 
                {
                     return player[this.layer].buyables[81].pow(0.95)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "X Cookies",
            currencyInternalName: "xcookies",
        },
        132:
        {
            title: "Y cookie synergy",
            description: "Boosts Y Cookies based on Y Cookie Grandmas",
            cost: new ExpantaNum(50),
            unlocked() { return (tmp.cc.buyables[82].effect||0)>=6 },
                effect() 
                {
                     return player[this.layer].buyables[82].pow(0.90)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Y Cookies",
            currencyInternalName: "ycookies",
        },
        133:
        {
            title: "Z cookie synergy",
            description: "Boosts Z Cookies based on Z Cookie Grandmas",
            cost: new ExpantaNum(50),
            unlocked() { return (tmp.cc.buyables[83].effect||0)>=2.3 },
                effect() 
                {
                     return player[this.layer].buyables[83].pow(0.90)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Cookies",
            currencyInternalName: "zcookies",
        },
        141:
        {
            title: "Look for Dimensional Sugar Lumps?",
            description: "Boost all Dimensional Cookie gain by 10 and unlocks a new tab",
            cost: new ExpantaNum(200),
            unlocked() { return (tmp.cc.buyables[83].effect||0)>=2.7 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Cookies",
            currencyInternalName: "zcookies",
        },
        151:
        {
            title: "X cookie booster",
            description: "Boosts Sugar Lumps based on X Cookies",
            cost: new ExpantaNum(50000),
            unlocked() { return (hasUpgrade("cc", 141)) },
                effect() 
                {
                     return player[this.layer].xcookies.pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "X Sugar Lumps",
            currencyInternalName: "xlumps",
        },
        152:
        {
            title: "Y cookie booster",
            description: "Boosts Heavenly Chips based on Y Cookies",
            cost: new ExpantaNum(50000),
            unlocked() { return (hasUpgrade("cc", 141)) },
                effect() 
                {
                     return player[this.layer].ycookies.pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Y Sugar Lumps",
            currencyInternalName: "ylumps",
        },
        153:
        {
            title: "Z cookie booster",
            description: "Boosts X and Y Cookies based on Z Cookies",
            cost: new ExpantaNum(50000),
            unlocked() { return (hasUpgrade("cc", 141)) },
                effect() 
                {
                     return player[this.layer].zcookies.pow(0.2)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Sugar Lumps",
            currencyInternalName: "zlumps",
        },
        161:
        {
            title: "X sugar lumps booster",
            description: "Boosts X Cookies based on X Sugar Lumps",
            cost: new ExpantaNum(100000),
            unlocked() { return hasUpgrade("cc", 151) },
                effect() 
                {
                     return player[this.layer].xlumps.pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "X Sugar Lumps",
            currencyInternalName: "xlumps",
        },
        162:
        {
            title: "Y sugar lumps booster",
            description: "Boosts Y Cookies based on Y Sugar Lumps",
            cost: new ExpantaNum(100000),
            unlocked() { return hasUpgrade("cc", 152) },
                effect() 
                {
                     return player[this.layer].ylumps.pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Y Sugar Lumps",
            currencyInternalName: "ylumps",
        },
        163:
        {
            title: "Z sugar lumps booster",
            description: "Boosts Z Cookies based on Z Sugar Lumps",
            cost: new ExpantaNum(100000),
            unlocked() { return hasUpgrade("cc", 153) },
                effect() 
                {
                     return player[this.layer].zlumps.pow(0.2)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Sugar Lumps",
            currencyInternalName: "zlumps",
        },
        171:
        {
            title: "Train your mind to make you automatically run",
            description: "Automatically Walks 10 Meters Per Second",
            cost: new ExpantaNum(100000),
            unlocked() { return hasUpgrade("cc", 161) && hasUpgrade("cc", 162) && hasUpgrade("cc", 163) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Sugar Lumps",
            currencyInternalName: "zlumps",
        },
        181:
        {
            title: "Sugar Lump flavored Gatorade",
            description: "Autowalks Forward Faster based on Sugar Lumps",
            cost: new ExpantaNum(200000),
            unlocked() { return hasUpgrade("cc", 171) },
                effect() 
                {
                     return player[this.layer].ylumps.pow(0.05)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Y Sugar Lumps",
            currencyInternalName: "ylumps",
        },
        182:
        {
            title: "Ascended Heavenly Chip Shoes",
            description: "Autowalks Right Faster based on Heavenly Chips",
            cost: new ExpantaNum(200000),
            unlocked() { return hasUpgrade("cc", 171) },
                effect() 
                {
                     return player[this.layer].zlumps.pow(0.08)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "X Sugar Lumps",
            currencyInternalName: "xlumps",
        },
        191:
        {
            title: "The Big Boost",
            description: "Boosts Autowalking Speed based on time played",
            cost: new ExpantaNum(1e6),
            unlocked() { return hasUpgrade("cc", 181) && hasUpgrade("cc", 182) },
                effect() 
                {
                     let a = player.timePlayed
                     return a/10
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Sugar Lumps",
            currencyInternalName: "zlumps",
        },
        192:
        {
            title: "Unlock the third quarter of this layer",
            description: "Unlocks the Church",
            cost: new ExpantaNum(1e9),
            unlocked() { return hasUpgrade("cc", 191) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Sugar Lumps",
            currencyInternalName: "zlumps",
        },
        201:
        {
            title: "Cookie Trollge",
            description: "Automates buying Dimensional Grandmas and Dimensional Wrinklers",
            cost: new ExpantaNum(1000),
            unlocked() { return (tmp.cc.buyables[122].effect||0)>=0.27 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Cookie Bibles",
            currencyInternalName: "cookiebibles",
        },
        202:
        {
            title: "Blood Donation",
            description: "Boosts Cookie Blood Gain based on Cultists",
            cost: new ExpantaNum(300),
            unlocked() { return hasUpgrade("cc", 201) },
                effect() 
                {
                     return player[this.layer].cultists.pow(0.3)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Cultists",
            currencyInternalName: "cultists",
        },
        203:
        {
            title: "The New Testament",
            description: "Boosts Cookie Blood Gain based on Cookie Bibles",
            cost: new ExpantaNum(10000),
            unlocked() { return hasUpgrade("cc", 202) },
                effect() 
                {
                     return player[this.layer].cookiebibles.pow(0.26)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Cookie Bibles",
            currencyInternalName: "cookiebibles",
        },
        204:
        {
            title: "Revelation",
            description: "Boost Cultists based on Cultists",
            cost: new ExpantaNum(7500),
            unlocked() { return hasUpgrade("cc", 203) },
                effect() 
                {
                     return player[this.layer].cultists.pow(0.35)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Cultists",
            currencyInternalName: "cultists",
        },
        211:
        {
            title: "SUMMON THE COOKIE GOD OF GODS",
            description: "???",
            cost: new ExpantaNum(1.79e308),
            unlocked() { return hasUpgrade("cc", 204) },
        },
        221:
        {
            title: "The Final Cookie",
            description: "Automatically buys Church Buyables",
            cost: new ExpantaNum(10),
            unlocked() { return hasUpgrade("cc", 211) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Patreon Subscribers",
            currencyInternalName: "patreonsubscribers",
        },
        222:
        {
            title: "Heralds",
            description: "Boosts Cookies Based on Patreon Subscribers",
            cost: new ExpantaNum(1e26),
            unlocked() { return hasUpgrade("cc", 221) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
                effect() 
                {
                     return player[this.layer].patreonsubscribers.pow(1.00)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        223:
        {
            title: "Money is Power",
            description: "Boosts Patreon Subscribers based on $",
            cost: new ExpantaNum(15),
            unlocked() { return hasUpgrade("cc", 222) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Patreon Subscribers",
            currencyInternalName: "patreonsubscribers",
                effect() 
                {
                     return player.l.points.add(1).pow(0.3)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
        update(delta) {
        {
            if (player.i.points < 0)
            {
                player.i.points = new ExpantaNum(0)     
			}
            let mult = new ExpantaNum(1)
            mult = mult.times(buyableEffect('cc', 31))
            if (hasUpgrade('cc', 61)) mult = mult.times(upgradeEffect('cc', 61))
            if (hasUpgrade('cc', 62)) mult = mult.times(upgradeEffect('cc', 62))
            if (hasUpgrade('cc', 63)) mult = mult.times(upgradeEffect('cc', 63))
            if (hasUpgrade('cc', 64)) mult = mult.times(upgradeEffect('cc', 64))
            if (hasUpgrade('cc', 73)) mult = mult.times(upgradeEffect('cc', 73))
            if (hasUpgrade('cc', 91)) mult = mult.times(upgradeEffect('cc', 91))
            if (hasUpgrade('cc', 92)) mult = mult.times(upgradeEffect('cc', 92))
            if (hasUpgrade('cc', 93)) mult = mult.times(upgradeEffect('cc', 93))
	        if (hasUpgrade('cc', 102)) mult = mult.times(10)
            mult = mult.times(buyableEffect('cc', 81))
            if (hasUpgrade('cc', 151)) mult = mult.times(upgradeEffect('cc', 151))
            if (hasUpgrade('l', 35)) mult = mult.times(upgradeEffect('l', 35))
            player.cc.sugarlumps = player.cc.sugarlumps.add(tmp.cc.buyables[22].effect.add(-1).mul(delta).mul(mult))
            
            let heavenlymult = new ExpantaNum(1)
            if (hasUpgrade('cc', 91)) heavenlymult = heavenlymult.times(upgradeEffect('cc', 91))
            if (hasUpgrade('cc', 92)) heavenlymult = heavenlymult.times(upgradeEffect('cc', 92))
            if (hasUpgrade('cc', 93)) heavenlymult = heavenlymult.times(upgradeEffect('cc', 93))
            heavenlymult = heavenlymult.times(buyableEffect('cc', 82))
            if (hasUpgrade('cc', 152)) heavenlymult = heavenlymult.times(upgradeEffect('cc', 152))
            if (hasUpgrade('l', 36)) mult = heavenlymult.times(upgradeEffect('l', 36))
            player.cc.heavenlychips = player.cc.heavenlychips.add(tmp.cc.buyables[41].effect.mul(buyableEffect('cc', 51)).mul(delta).mul(heavenlymult))
       
            let wrinklermult = new ExpantaNum(1)
            if (hasUpgrade('cc', 112)) wrinklermult = wrinklermult.times(upgradeEffect('cc', 112))
            player.cc.wrinklerjuice = player.cc.wrinklerjuice.add(tmp.cc.buyables[61].effect.mul(delta).mul(wrinklermult))

            let grandmaincome = new ExpantaNum(1)
            player.cc.buyables[12] = player.cc.buyables[12].add(player.cc.wrinklerjuice.mul(delta))

            let xcookiesmult = new ExpantaNum(0)
            if (hasUpgrade('cc', 122)) xcookiesmult = xcookiesmult.add(1)
            xcookiesmult = xcookiesmult.times(buyableEffect('cc', 83))
            if (hasUpgrade('cc', 131)) xcookiesmult = xcookiesmult.times(upgradeEffect('cc', 131))
            if (hasUpgrade('cc', 141)) xcookiesmult = xcookiesmult.times(10)
            if (hasUpgrade('cc', 153)) xcookiesmult = xcookiesmult.times(upgradeEffect('cc', 153))
            if (hasUpgrade('cc', 161)) xcookiesmult = xcookiesmult.times(upgradeEffect('cc', 161))
            xcookiesmult = xcookiesmult.times(buyableEffect('cc', 111))
            xcookiesmult = xcookiesmult.times(player.cc.cultisteffect)
            if (hasUpgrade('l', 33)) xcookiesmult = xcookiesmult.times(upgradeEffect('l', 33))
            player.cc.xcookies = player.cc.xcookies.add(xcookiesmult.mul(delta))

            let ycookiesmult = new ExpantaNum(0)
            if (hasUpgrade('cc', 122)) ycookiesmult = ycookiesmult.add(1)
            ycookiesmult = ycookiesmult.times(buyableEffect('cc', 83))
            if (hasUpgrade('cc', 132)) ycookiesmult = ycookiesmult.times(upgradeEffect('cc', 132))
            if (hasUpgrade('cc', 141)) ycookiesmult = ycookiesmult.times(10)
            if (hasUpgrade('cc', 153)) ycookiesmult = ycookiesmult.times(upgradeEffect('cc', 153))
            if (hasUpgrade('cc', 162)) ycookiesmult = ycookiesmult.times(upgradeEffect('cc', 162))
            ycookiesmult = ycookiesmult.times(buyableEffect('cc', 111))
            ycookiesmult = ycookiesmult.times(player.cc.cultisteffect)
            if (hasUpgrade('l', 33)) ycookiesmult = ycookiesmult.times(upgradeEffect('l', 33))
            player.cc.ycookies = player.cc.ycookies.add(ycookiesmult.mul(delta))

            let zcookiesmult = new ExpantaNum(0)
            if (hasUpgrade('cc', 122)) zcookiesmult = zcookiesmult.add(1)
            if (hasUpgrade('cc', 133)) zcookiesmult = zcookiesmult.times(upgradeEffect('cc', 133))
            if (hasUpgrade('cc', 141)) zcookiesmult = zcookiesmult.times(10)
            if (hasUpgrade('cc', 163)) zcookiesmult = zcookiesmult.times(upgradeEffect('cc', 163))
            zcookiesmult = zcookiesmult.times(buyableEffect('cc', 111))
            zcookiesmult = zcookiesmult.times(player.cc.cultisteffect)
            if (hasUpgrade('l', 33)) zcookiesmult = zcookiesmult.times(upgradeEffect('l', 33))
            player.cc.zcookies = player.cc.zcookies.add(zcookiesmult.mul(delta))

            let xlumpsmult = new ExpantaNum(0)
            if ((player.cc.x > 0) && (player.cc.y > 0)) xlumpsmult = xlumpsmult.add(player.cc.x)
            if ((player.cc.x > 0) && (player.cc.y < 0)) xlumpsmult = xlumpsmult.add(player.cc.x)
            if ((player.cc.x < 0) && (player.cc.y > 0)) xlumpsmult = xlumpsmult.add(player.cc.x.times(-1))
            xlumpsmult = xlumpsmult.times(player.cc.cultisteffect)
            if (hasUpgrade('l', 34)) xlumpsmult = xlumpsmult.times(upgradeEffect('l', 34))
            player.cc.xlumps = player.cc.xlumps.add(xlumpsmult.mul(delta))

            let ylumpsmult = new ExpantaNum(0)
            if ((player.cc.x > 0) && (player.cc.y > 0)) ylumpsmult = ylumpsmult.add(player.cc.y)
            if ((player.cc.x < 0) && (player.cc.y < 0)) ylumpsmult = ylumpsmult.add(player.cc.y.times(-1))
            ylumpsmult = ylumpsmult.times(player.cc.cultisteffect)
            if (hasUpgrade('l', 34)) ylumpsmult = ylumpsmult.times(upgradeEffect('l', 34))
            player.cc.ylumps = player.cc.ylumps.add(ylumpsmult.mul(delta))

            let zlumpsmult = new ExpantaNum(0)
            if ((player.cc.x > 0) && (player.cc.y > 0)) zlumpsmult = zlumpsmult.add(player.cc.y.mul(player.cc.x).pow(0.5))
            if ((player.cc.x < 0) && (player.cc.y < 0)) zlumpsmult = zlumpsmult.add(player.cc.y.mul(player.cc.x).pow(0.5))
            if ((player.cc.x < 0) && (player.cc.y > 0)) zlumpsmult = zlumpsmult.add(player.cc.y.mul(player.cc.x).pow(0.5))
            if (hasUpgrade('cc', 171)) zlumpsmult = zlumpsmult.add(player.cc.y.mul(player.cc.x).pow(0.5))
            zlumpsmult = zlumpsmult.times(player.cc.cultisteffect)
            if (hasUpgrade('l', 34)) zlumpsmult = zlumpsmult.times(upgradeEffect('l', 34))
            player.cc.zlumps = player.cc.zlumps.add(zlumpsmult.mul(delta))

            let autowalkright = new ExpantaNum(0)
            if (hasUpgrade('cc', 171)) autowalkright = autowalkright.add(10)
            if (hasUpgrade('cc', 182)) autowalkright = autowalkright.times(upgradeEffect('cc', 182))
            if (hasUpgrade('cc', 191)) autowalkright = autowalkright.times(upgradeEffect('cc', 191))
            autowalkright = autowalkright.times(buyableEffect('cc', 113))

            let autowalkforward = new ExpantaNum(0)
            if (hasUpgrade('cc', 171)) autowalkforward = autowalkforward.add(10)
            if (hasUpgrade('cc', 181)) autowalkforward = autowalkforward.times(upgradeEffect('cc', 181))
            if (hasUpgrade('cc', 191)) autowalkforward = autowalkforward.times(upgradeEffect('cc', 191))
            autowalkforward = autowalkforward.times(buyableEffect('cc', 113))

            player.cc.x = player.cc.x.add(autowalkright.mul(delta))
            player.cc.y = player.cc.y.add(autowalkforward.mul(delta))

            let cookiebibleincome = new ExpantaNum(0)
            if (hasUpgrade('cc', 192)) cookiebibleincome = cookiebibleincome.add(1)
            cookiebibleincome = cookiebibleincome.times(buyableEffect('cc', 121))
            cookiebibleincome = cookiebibleincome.times(player.cc.cookiebloodeffect)
            if (hasUpgrade('l', 72)) cookiebibleincome = cookiebibleincome.times(upgradeEffect('l', 72))
            player.cc.cookiebibles = player.cc.cookiebibles.add(cookiebibleincome.mul(delta))

            player.cc.cookiebibleeffect = player.cc.cookiebibles.pow(0.5).add(1)

            let cultistincome = new ExpantaNum(0)
            if (hasUpgrade('cc', 192)) cultistincome = cultistincome.add(player.cc.cookiebibles).pow(0.1)
            if (hasUpgrade('cc', 204)) cultistincome = cultistincome.times(upgradeEffect('cc', 204))
            if (hasUpgrade('l', 73)) cultistincome = cultistincome.times(upgradeEffect('l', 73))
            if (player.cc.ritualactive > 0.5)
            {
                        cultistincome = cultistincome.times(player.cc.ritualactive.times(player.cc.cookiebloodeffect))
			}
            player.cc.cultists = player.cc.cultists.add(cultistincome.mul(delta))

            player.cc.cultisteffect = player.cc.cultists.pow(0.45).add(1)

            let cookiebloodincome = new ExpantaNum(0)
            cookiebloodincome = cookiebloodincome.add(buyableEffect('cc', 122))
            if (hasUpgrade('cc', 202)) cookiebloodincome = cookiebloodincome.times(upgradeEffect('cc', 202))
            if (hasUpgrade('cc', 203)) cookiebloodincome = cookiebloodincome.times(upgradeEffect('cc', 203))
            if (hasUpgrade('l', 74)) cookiebloodincome = cookiebloodincome.times(upgradeEffect('l', 74))
            player.cc.cookieblood = player.cc.cookieblood.add(cookiebloodincome.mul(delta))
            player.cc.cookieblood = player.cc.cookieblood.div(player.cc.ritualactive.mul(delta).add(1))

            player.cc.cookiebloodeffect = player.cc.cookieblood.pow(0.7).add(1)
            if (player.cc.cookiebloodeffect > 100000)
            {
                  player.cc.cookiebloodeffect = new ExpantaNum(17000000).pow(0.7).add(1).times(player.cc.cookieblood.pow(0.001).add(1))           
			}

            let patreonsubscribersincome = new ExpantaNum(0)
            patreonsubscribersincome = patreonsubscribersincome.add(buyableEffect('cc', 141))
            if (hasUpgrade('cc', 223)) patreonsubscribersincome = patreonsubscribersincome.times(upgradeEffect('cc', 223))
            if (hasUpgrade('l', 32)) patreonsubscribersincome = patreonsubscribersincome.times(upgradeEffect('l', 32))
            player.cc.patreonsubscribers = player.cc.patreonsubscribers.add(patreonsubscribersincome.mul(delta))

            player.cc.patreoneffect = player.cc.patreonsubscribers.pow(0.1).mul(0.1).add(1)
            
            let randomincomething = new ExpantaNum("1e14")
            if (hasUpgrade('cc', 11)) player.i.points = player.i.points.add(randomincomething.mul(delta))
        }
    },
            
        microtabs: {
        stuff: {
                    "Upgrades": {
                content: [
                    ["blank", "15px"],
                    "upgrades"
                ]
            },
            "Cookie Clicker": {
            unlocked() { return hasUpgrade("cc", 12) },
                content: [
                    ["blank", "15px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                    ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23], ["buyable", 24]]],
                    ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33], ["buyable", 34]]],
                    ["row", [["buyable", 41]]],
                    ["row", [["buyable", 51], ["buyable", 52], ["buyable", 53]]],
                    ["row", [["buyable", 61]]],
                    ["row", [["buyable", 71], ["buyable", 72], ["buyable", 73]]],
                ]
            },
                "Extended Cookie Clicker": {
                unlocked() { return hasUpgrade("cc", 121) },
                content: [
                    ["display-text", () => "You have " + format(player.cc.xcookies) + " X Cookies"],
                    ["display-text", () => "You have " + format(player.cc.ycookies) + " Y Cookies"],
                    ["display-text", () => "You have " + format(player.cc.zcookies) + " Z Cookies"],
                    ["row", [["buyable", 81], ["buyable", 82], ["buyable", 83]]],
                    ["row", [["upgrade", 122]]],
                    ["row", [["upgrade", 131], ["upgrade", 132], ["upgrade", 133]]],
                    ["row", [["upgrade", 141]]],
                ]
            },
                "Exploration": {
                unlocked() { return hasUpgrade("cc", 141) },
                content: [
                    ["display-text", () => "You have " + format(player.cc.xcookies) + " X Cookies"],
                    ["display-text", () => "You have " + format(player.cc.ycookies) + " Y Cookies"],
                    ["display-text", () => "You have " + format(player.cc.zcookies) + " Z Cookies"],
                    ["display-text", () => "You have " + format(player.cc.xlumps) + " X Sugar Lumps"],
                    ["display-text", () => "You have " + format(player.cc.ylumps) + " Y Sugar Lumps"],
                    ["display-text", () => "You have " + format(player.cc.zlumps) + " Z Sugar Lumps"],
                    ["blank", "15px"],
                    ["display-text", () => "You walked " + format(player.cc.x) + " Meters Right"],
                    ["display-text", () => "You walked " + format(player.cc.y) + " Meters Forward"],
                    ["row", [["buyable", 91], ["buyable", 92], ["buyable", 93], ["buyable", 94]]],
                    ["row", [["buyable", 101]]],
                    ["display-text", () => "Sorry no more cool function OmegaNum is STUPID and doesnt allow negatives! NOT COOL OMEGANUM"],
                    ["display-text", () => "X Sugar Lumps are gained based on how much you traveled right, Y Sugar Lumps are gained based on how much you traveled forward, Z Sugar Lumps are gained based on both positions"],
                    ["row", [["upgrade", 151], ["upgrade", 152], ["upgrade", 153]]],
                    ["row", [["upgrade", 161], ["upgrade", 162], ["upgrade", 163]]],
                    ["row", [["upgrade", 171]]],
                    ["row", [["upgrade", 181], ["upgrade", 182]]],
                    ["row", [["buyable", 111], ["buyable", 112], ["buyable", 113]]],
                    ["row", [["upgrade", 191], ["upgrade", 192]]],
                ]
            },
                "Cookie Church": {
                unlocked() { return hasUpgrade("cc", 192) },
                content: [
                    ["display-text", () => "You have " + format(player.cc.xcookies) + " X Cookies"],
                    ["display-text", () => "You have " + format(player.cc.ycookies) + " Y Cookies"],
                    ["display-text", () => "You have " + format(player.cc.zcookies) + " Z Cookies"],
                    ["display-text", () => "You have " + format(player.cc.xlumps) + " X Sugar Lumps"],
                    ["display-text", () => "You have " + format(player.cc.ylumps) + " Y Sugar Lumps"],
                    ["display-text", () => "You have " + format(player.cc.zlumps) + " Z Sugar Lumps"],
                    ["blank", "15px"],
                    ["display-text", () => "You have " + format(player.cc.cookiebibles) + " Cookie Bibles and a x" + format(player.cc.cookiebibleeffect) + " boost to all layer 1 buyables except the last one"],
                    ["display-text", () => "You have " + format(player.cc.cultists) + " Cultists and a x" + format(player.cc.cultisteffect) + " boost to all Dimensional cookies and Lumps"],
                    ["display-text", () => "You have " + format(player.cc.cookieblood) + " Cookie Blood and a x" + format(player.cc.cookiebloodeffect) + " boost to Cookie Bible production"],
                    ["row", [["buyable", 121], ["buyable", 122]]],
                    ["row", [["buyable", 131], ["buyable", 132]]],
                    ["row", [["upgrade", 201], ["upgrade", 202], ["upgrade", 203], ["upgrade", 204]]],
                    ["row", [["upgrade", 211]]],
                ]
            },
                "Patreon (SUS)": {
                unlocked() { return hasUpgrade("l", 14) },
                content: 
                [
                    ["display-text", () => "You have " + format(player.cc.patreonsubscribers) + " Patreon Subscribers and a x" + format(player.cc.patreoneffect) + " boost to $ gain"],
                    ["display-text", () => "Your Salary is " + format(player.l.$persecond.mul(3600)) + "$ per hour"],
                    ["row", [["buyable", 141]]],
                    ["row", [["upgrade", 221], ["upgrade", 222], ["upgrade", 223]]],
                ]
            },
        },
    },

        tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", () => "You have " + format(player.cc.sugarlumps) + " Sugar Lumps"],
        ["display-text", () => "You have " + format(player.cc.heavenlychips) + " Heavenly Chips"],
        ["display-text", () => "You have " + format(player.cc.wrinklerjuice) + " Wrinkler Juice, which produces free Grandmas"],
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    layerShown(){return hasUpgrade("i", 61) || player.cc.total.gte(1)},
})
addLayer("l", {
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),
        $persecond: new ExpantaNum(0),
        savedmoney: new ExpantaNum(0),
        savedmoneyeffect: new ExpantaNum(0),
        cookietime: new ExpantaNum(0),
        cookietimeeffect: new ExpantaNum(0),
        researchpoints: new ExpantaNum(0),
        row2researchcost: new ExpantaNum(10),
        row3researchcost: new ExpantaNum(100),
        row5researchcost: new ExpantaNum(250000),
        row6researchcost: new ExpantaNum(1e15),
        row7researchcost: new ExpantaNum(1e3500),
        row8researchcost: new ExpantaNum(1e150000),
        euros: new ExpantaNum(0), //€
        euroeffect: new ExpantaNum(1),
        antimattertime: new ExpantaNum(0),
        antimattertimeeffect: new ExpantaNum(0),
        itemsforsale: new ExpantaNum(0),
        itemsforsaletimer: new ExpantaNum(0),
        itemvalue: new ExpantaNum(10),
        coins: new ExpantaNum(0),
        coineffect: new ExpantaNum(1),
        minigamenumber: new ExpantaNum(1),
        minigamenumbereffect: new ExpantaNum(1),
        minigamenumbermult: new ExpantaNum(2),
        militarytime: new ExpantaNum(0),
        militarytimeeffect: new ExpantaNum(0),
        supermarkettime: new ExpantaNum(0),
        supermarkettimeeffect: new ExpantaNum(0),
        clickerheroestime: new ExpantaNum(0),
        clickerheroestimeeffect: new ExpantaNum(0),
    }},
    color: "green",
    resource: "$", 
    symbol: "$",
    row: "side",
    branches: ["i"],
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Life")
    },
    tabFormat: [
        "main-display",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    upgrades: 
    {
        11:
        {
            title: "Big Mac",
            description: "Boosts Points based on $",
            cost: new ExpantaNum(2),
                effect() 
                {
                     return player[this.layer].points.pow(10).mul(1e10).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12:
        {
            title: "Notebook",
            cost: new ExpantaNum(4),
            unlocked() { return hasUpgrade("l", 11) },
            description: "Boosts Incremental Points based on $",
                effect() 
                {
                     return player[this.layer].points.pow(9.5).mul(1e10).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13:
        {
            title: "Headphones",
            cost: new ExpantaNum(10),
            unlocked() { return hasUpgrade("l", 12) },
            description: "Boosts Cookies based on $",
                effect() 
                {
                     return player[this.layer].points.pow(2.4).mul(1e1).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14:
        {
            title: "Router",
            cost: new ExpantaNum(10),
            unlocked() { return hasUpgrade("l", 13) },
            description: "Unlocks a new tab in the Cookie Clicker layer",
        },
        21:
        {
            title: "Chromebook",
            description: "Boosts $ based on $",
            unlocked() { return hasUpgrade("l", 14) },
            cost: new ExpantaNum(50),
                effect() 
                {
                     return player[this.layer].points.pow(0.02).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22:
        {
            title: "Oven",
            description: "Get Ready for another layer...",
            unlocked() { return hasUpgrade("l", 21) },
            cost: new ExpantaNum(50),
        },
        23:
        {
            title: "IPad",
            description: "Unlocks a new tab",
            unlocked() { return hasUpgrade("l", 22) },
            cost: new ExpantaNum(75),
        },
        24:
        {
            title: "Speed things up a bit",
            description: "Boosts Cookie Time based on Research Points",
            unlocked() { return hasUpgrade("l", 23) },
            cost: new ExpantaNum(5),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(0.4).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        25:
        {
            title: "Research Point Boost",
            description: "Boosts Points based on Research Points",
            unlocked() { return hasUpgrade("l", 24) },
                        cost() {
                return player.l.row2researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(1.6).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [24],
        },
        26:
        {
            title: "Research Incremental Point Boost",
            description: "Boosts Incremental Points based on Research Points",
            unlocked() { return hasUpgrade("l", 24) },
                        cost() {
                return player.l.row2researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(1.4).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [24],
        },
        27:
        {
            title: "Research Cookie Boost",
            description: "Boosts Cookies based on Research Points",
            unlocked() { return hasUpgrade("l", 24) },
            cost() {
                return player.l.row2researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(0.8).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [24],
        },
        31:
        {
            title: "Research $ Boost",
            description: "Boosts $ based on Research Points",
            unlocked() { return hasUpgrade("l", 25) },
                        cost() {
                return player.l.row3researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.add(1).pow(0.02)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [25],
        },
        32:
        {
            title: "Research Patreon Boost",
            description: "Boosts Patreon Subscribers based on Research Points",
            unlocked() { return hasUpgrade("l", 25) },
                        cost() {
                return player.l.row3researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(0.1).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [25]
        },
        33:
        {
            title: "Research Dimensional Cookies Boost",
            description: "Boosts Dimensional Cookies based on Research Points",
            unlocked() { return hasUpgrade("l", 26) },
            cost() {
                return player.l.row3researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(0.7).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [26],
        },
        34:
        {
            title: "Research Dimensional Sugar Lumps Boost",
            description: "Boosts Dimensional Sugar Lumps based on Research Points",
            unlocked() { return hasUpgrade("l", 26) },
                        cost() {
                return player.l.row3researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(0.6).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [26],
        },
        35:
        {
            title: "Research Sugar Lumps Point Boost",
            description: "Boosts Sugar Lumps based on Research Points",
            unlocked() { return hasUpgrade("l", 27) },
                        cost() {
                return player.l.row3researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(0.75).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [27],
        },
        36:
        {
            title: "Research Heavenly Chips Boost",
            description: "Boosts Heavenly Chips based on Research Points",
            unlocked() { return hasUpgrade("l", 27) },
            cost() {
                return player.l.row3researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(0.73).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [27],
        },
        37:
        {
            title: "Make another Game",
            description: "Unlocks a new layer",
            unlocked() { return hasUpgrade("l", 31) && hasUpgrade("l", 32) && hasUpgrade("l", 33) && hasUpgrade("l", 34) && hasUpgrade("l", 35) && hasUpgrade("l", 36) },
            cost: new ExpantaNum(2500),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
            branches: [31, 32, 33, 34, 35, 36],
        },
        38:
        {
            title: "Cheap TV",
            description: "Boosts Research Points based on $",
            unlocked() { return hasUpgrade("l", 24) },
            cost: new ExpantaNum(150),
                effect() 
                {
                     return player[this.layer].points.add(1).pow(0.5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        41:
        {
            title: "Research game.js Boost",
            description: "Boosts game.js based on Research Points",
            unlocked() { return hasUpgrade("ad", 23) },
                        cost() {
                return player.l.row5researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(0.30).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [37],
        },
        42:
        {
            title: "Research autobuyer.js Boost",
            description: "Boosts autobuyer.js based on Research Points",
            unlocked() { return hasUpgrade("ad", 23) },
            cost() {
                return player.l.row5researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(0.275).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [37],
        },
        43:
        {
            title: "Research breakinfinity.js Boost",
            description: "Boosts breakinfinity.js based on Research Points",
            unlocked() { return hasUpgrade("ad", 23) },
            cost() {
                return player.l.row5researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(0.25).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [37],
        },
        51:
        {
            title: "IPhone",
            description: "Boosts Hevipelle Points based on $",
            unlocked() { return hasUpgrade("ad", 31) },
            cost: new ExpantaNum(500),
                effect() 
                {
                     return player[this.layer].points.pow(0.45).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        52:
        {
            title: "Gaming PC",
            description: "Boosts game.js based on $",
            unlocked() { return hasUpgrade("ad", 31) },
            cost: new ExpantaNum(750),
                effect() 
                {
                     return player[this.layer].points.pow(0.4).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        53:
        {
            title: "PS5",
            description: "Boosts autobuyer.js based on $",
            unlocked() { return hasUpgrade("ad", 31) },
            cost: new ExpantaNum(1000),
                effect() 
                {
                     return player[this.layer].points.pow(0.35).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        54:
        {
            title: "Grand Piano",
            description: "Boosts breakinfinity.js based on $",
            unlocked() { return hasUpgrade("ad", 31) },
            cost: new ExpantaNum(2250),
                effect() 
                {
                     return player[this.layer].points.pow(0.3).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        61:
        {
            title: "Research Hevipelle Boost",
            description: "Boosts Hevipelle Points based on Research Points",
            unlocked() { return hasUpgrade("l", 54) },
            cost() {
                return player.l.row6researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(0.225).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [41, 42, 43],
        },
        62:
        {
            title: "Research Antimatter Boost",
            description: "Boosts Antimatter based on Research Points",
            unlocked() { return hasUpgrade("l", 54) },
            cost() {
                return player.l.row6researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.pow(0.125).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [41, 42, 43],
        },
        71:
        {
            title: "Apartment",
            description: "Boosts Antimatter based on $",
            unlocked() { return hasUpgrade("ad", 31) },
            cost: new ExpantaNum(3000),
                effect() 
                {
                     return player[this.layer].points.pow(0.3).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        72:
        {
            title: "Week Long Vacation",
            description: "Boosts Cookie Bibles based on $",
            unlocked() { return hasUpgrade("ad", 31) },
            cost: new ExpantaNum(5000),
                effect() 
                {
                     return player[this.layer].points.pow(0.45).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        73:
        {
            title: "Gold Bar",
            description: "Boosts Cultists based on $",
            unlocked() { return hasUpgrade("ad", 31) },
            cost: new ExpantaNum(6000),
                effect() 
                {
                     return player[this.layer].points.pow(0.44).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        74:
        {
            title: "2000 Server Boosts to the Cookie Clicker discord server",
            description: "Boosts Cookie Blood based on $",
            unlocked() { return hasUpgrade("ad", 31) },
            cost: new ExpantaNum(10000),
                effect() 
                {
                     return player[this.layer].points.pow(0.43).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        75:
        {
            title: "JOIN THE MILITARY",
            description: "JOINS THE MILITARY. THERE IS NO COMING BACK.",
            unlocked() { return hasUpgrade("l", 74) },
            cost: new ExpantaNum(1e12),
        },
        76:
        {
            title: "I can't buy the Universe (Sad)",
            description: "You got so much money the value of the dollar dropped so low that you now have to use Euros",
            unlocked() { return hasUpgrade("l", 75) },
            cost: new ExpantaNum(1e115),
        },
        77:
        {
            title: "The Effect's Kinda Getting Useless",
            description: "Bumps Respect Effect to ^5",
            unlocked() { return hasUpgrade("l", 76) },
            cost: new ExpantaNum(1.79e308),
        },
        78:
        {
            title: "All These Effects Kinda Getting Useless Again",
            description: "Bumps Respect Effect to ^100 and Euros effect to ^10000",
            unlocked() { return hasUpgrade("l", 77) },
            cost: new ExpantaNum("1e2048"),
        },
        79:
        {
            title: "Gotta Keep the Game's Effects Useful",
            description: "Bumps Euros effect to ^150000",
            unlocked() { return hasUpgrade("l", 78) },
            cost: new ExpantaNum("1e11400"),
        },
        81:
        {
            title: "Research Infinity Points Boost",
            description: "Boosts Infinity Points based on Research Points",
            unlocked() { return hasUpgrade("l", 75) },
            cost() {
                return player.l.row7researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.plus(10).log10().div(50)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [61],
        },
        82:
        {
            title: "Research Infinity Dimensions Boost",
            description: "Boosts Infinity Dimensions based on Research Points",
            unlocked() { return hasUpgrade("l", 75) },
            cost() {
                return player.l.row7researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.plus(10).log10().div(100)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [62],
        },
        91:
        {
            title: "Research Proton Boost",
            description: "Boosts Protons based on Research Points",
            unlocked() { return hasUpgrade("l", 81) },
            cost() {
                return player.l.row8researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.plus(10).log10().div(0.6)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [81],
        },
        92:
        {
            title: "Research Neutron Boost",
            description: "Boosts Neutrons based on Research Points",
            unlocked() { return hasUpgrade("l", 81) || hasUpgrade("l", 82) },
            cost() {
                return player.l.row8researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.plus(10).log10().div(0.8)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [81, 82],
        },
        93:
        {
            title: "Research Electron Boost",
            description: "Boosts Electrons based on Research Points",
            unlocked() { return hasUpgrade("l", 82) },
            cost() {
                return player.l.row8researchcost
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Research Points",
            currencyInternalName: "researchpoints",
                effect() 
                {
                     return player[this.layer].researchpoints.plus(10).log10().div(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [82],
        },
        101:
        {
            title: "Make the Effect as good as it possibly get",
            description: "Boosts The Respect pow based on Euros",
            unlocked() { return hasUpgrade("l", 79) },
            cost() {
                return "1e100000"
            },
            currencyLocation() { return player[this.layer] },
                effect() 
                {
                     return player[this.layer].euros.pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        102:
        {
            title: "A Pretty Inflated Upgrade",
            description: "Adds ^140 to the Cookie time Effect",
            unlocked() { return hasUpgrade("l", 101) },
            cost() {
                return "e2e9"
            },
            currencyLocation() { return player[this.layer] },
        },
        103:
        {
            title: "Make the Effect as even better as it possibly get",
            description: "Boosts The Respect and Euro pow based on Euros",
            unlocked() { return hasUpgrade("l", 79) },
            cost() {
                return "e8e9"
            },
            currencyLocation() { return player[this.layer] },
                effect() 
                {
                     return player[this.layer].euros.pow(0.45)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        104:
        {
            title: "Make Respect have a new Purpose",
            description: "Boosts Antimatter Dimensions Time based on Respect",
            unlocked() { return hasUpgrade("ad", 98) },
            cost() {
                return "e1e150"
            },
            currencyLocation() { return player[this.layer] },
                effect() 
                {
                     return player.m.points.add(1).pow(0.1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        105:
        {
            title: "BUY THE SUPERMARKET",
            description: "Unlocks Supermarket Management, and Boosts Antimatter Dimensions Time by 10",
            unlocked() { return hasUpgrade("l", 104) },
            cost() {
                return "e1e600"
            },
            currencyLocation() { return player[this.layer] },
        },
        111:
        {
            title: "Extra Demand",
            description: "x3 Coins gained on Sell",
            unlocked() { return hasUpgrade("l", 105) },
            cost() {
                return "100"
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Coins",
            currencyInternalName: "coins",
        },
        112:
        {
            title: "Speed Shipping",
            description: "Makes Item gain 2 times faster",
            unlocked() { return hasUpgrade("l", 111) },
            cost() {
                return "500"
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Coins",
            currencyInternalName: "coins",
        },
        113:
        {
            title: "Advertisements",
            description: "x3 Coins gained on Sell (Again)",
            unlocked() { return hasUpgrade("l", 112) },
            cost() {
                return "1500"
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Coins",
            currencyInternalName: "coins",
        },
        114:
        {
            title: "Make Respect have a new Purpose that is better than the last one",
            description: "Boosts Coins based on Respect",
            unlocked() { return hasUpgrade("l", 113) },
            cost() {
                return "2500"
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Coins",
            currencyInternalName: "coins",
                effect() 
                {
                     return player.m.points.add(1).pow(0.11)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        115:
        {
            title: "Workers",
            description: "Automatically Sells when you get 100 items",
            unlocked() { return hasUpgrade("l", 114) },
            cost() {
                return "15000"
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Coins",
            currencyInternalName: "coins",
        },
        116:
        {
            title: "Adrenaline",
            description: "Boosts Time to make an Item based on Items you have",
            unlocked() { return hasUpgrade("l", 115) },
            cost() {
                return "100000"
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Coins",
            currencyInternalName: "coins",
                effect() 
                {
                     return player.l.itemsforsale.add(1).pow(0.80)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        117:
        {
            title: "Workaholic",
            description: "Boosts Time to make an Item based on Items you don't have",
            unlocked() { return hasUpgrade("l", 116) },
            cost() {
                return "500000"
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Coins",
            currencyInternalName: "coins",
                effect() 
                {
                     let value = new ExpantaNum(100)
                     return value.sub(player.l.itemsforsale).add(1).pow(0.75)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        118:
        {
            title: "New Opportunities",
            description: "Unlocks a new layer",
            unlocked() { return hasUpgrade("l", 117) },
            cost() {
                return "750000"
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Coins",
            currencyInternalName: "coins",
        },
        119:
        {
            title: "Bored, so Imma add a Minigame.",
            description: "Adds a 2048 minigame tab",
            unlocked() { return hasUpgrade("ch", 21) },
            cost() {
                return "e1ee40"
            },
            currencyLocation() { return player[this.layer] },
        },
        121:
        {
            title: "<p style='transform: scale(-0.5, -2)'><alternate>HELP THE GOD</alternate></p>",
            description: "<p style='transform: scale(-2, -0.5)'><alternate>MAKE HIM HAPPY AND GIVE HIM WHAT HE DESERVES</alternate></p>",
            unlocked() { return hasUpgrade("l", 119) },
            cost() {
                return "e1ee125"
            },
            currencyLocation() { return player[this.layer] },
        },
        122:
        {
            title: "This Minigame also has an End?",
            description: "Finishes this Minigame and get 100% of Sell Value per Second",
            unlocked() { return hasUpgrade("l", 118) },
            cost() {
                return "1e6000000"
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Coins",
            currencyInternalName: "coins",
        },
        123:
        {
            title: "Finally, F NOTATION!",
            description: "Unlocks a new layer (Probably the most Important Layer)",
            unlocked() { return hasUpgrade("ch", 39) },
            cost() {
                return "10^^6"
            },
            currencyLocation() { return player },
            currencyDisplayName: "Points",
            currencyInternalName: "points",
        },
    },
    buyables:
    {
        11: {
        cost(x) { return },
        title: "Deposit Money into Savings Account",
        unlocked() { return hasUpgrade("l", 12) },
        canAfford() { return true },
        buy() {
        player.l.savedmoney = player.l.savedmoney.add(player.l.points)
        player.l.points = new ExpantaNum(0)
        },
    },
       12: {
        cost(x) { return },
        title: "Sell your Items",
        unlocked() { return hasUpgrade("l", 12) },
        canAfford() { return true },
        buy() {
        player.l.coins = player.l.coins.add(player.l.itemsforsale.mul(player.l.itemvalue))
        player.l.itemsforsale = new ExpantaNum(0)
        },
        display() 
        { // Everything else displayed in the buyable button after the title
          let data = tmp[this.layer].buyables[this.id]
          return "Coins gained on Sell: " + format(player.l.itemsforsale.mul(player.l.itemvalue));
        },
    },
           13: {
        cost(x) { return },
        title: "Multiply your Number",
        unlocked() { return hasUpgrade("l", 119) },
        canAfford() { return true },
        buy() {
        player.l.minigamenumber = player.l.minigamenumber.mul(player.l.minigamenumbermult)
        },
        display() 
        { // Everything else displayed in the buyable button after the title
          let data = tmp[this.layer].buyables[this.id]
          return "Current Multiplier: " + format(player.l.minigamenumbermult);
        }, 
    },
    },
            bars: {
        itemsforsalebar: {
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                return player.l.itemsforsaletimer.div(10)
            },
            fillStyle: {
                "background-color": "green",
            },
            display() {
                return "<h5>Time to get an Item<br/>" + format(player.l.itemsforsaletimer) + " / 10 Seconds</h5>";
            },
        },
        },
            clickables: {
    11: {
        title() {return format(player.l.minigamenumber)},
    },
    },
        update(delta) 
        {
            if (hasUpgrade("cc", 211)) player.l.$persecond = player.points.plus(10).log10().log10().pow(0.5).mul(player.cc.patreoneffect)
            if (hasUpgrade("l", 21)) player.l.$persecond = player.l.$persecond.mul(upgradeEffect("l", 21))
            if (hasUpgrade("l", 31)) player.l.$persecond = player.l.$persecond.mul(upgradeEffect("l", 31))
            player.l.$persecond = player.l.$persecond.mul(layers.m.effect())
            player.l.points = player.l.points.add(player.l.$persecond.mul(delta))
            player.l.savedmoneyeffect = player.l.savedmoney.pow(10.5).add(1)

            let cookietimeincome = new ExpantaNum(0)
            if (hasUpgrade("l", 22)) cookietimeincome = cookietimeincome.add(1)
            if (hasUpgrade("l", 24)) cookietimeincome = cookietimeincome.mul(upgradeEffect("l", 24))
            if (hasUpgrade("ad", 12)) cookietimeincome = cookietimeincome.mul(1000)
            cookietimeincome = cookietimeincome.mul(player.ad.antimattereffect)
            cookietimeincome = cookietimeincome.mul(layers.m.effect())
            cookietimeincome = cookietimeincome.mul(player.l.antimattertimeeffect)
            player.l.cookietime = player.l.cookietime.add(cookietimeincome.mul(delta))

            let cookietimeeffectpow = new ExpantaNum(4)
            if (hasUpgrade("ad", 11)) cookietimeeffectpow = cookietimeeffectpow.add(46)
            if (hasUpgrade("i", 71)) cookietimeeffectpow = cookietimeeffectpow.add(10)
            if (hasUpgrade("l", 102)) cookietimeeffectpow = cookietimeeffectpow.add(140)
            player.l.cookietimeeffect = player.l.cookietime.pow(cookietimeeffectpow).add(1)

            let researchpointsincome = new ExpantaNum(0)
            if (hasUpgrade("l", 23)) researchpointsincome = researchpointsincome.add(1)
            researchpointsincome = researchpointsincome.mul(layers.ad.effect())
            if (hasUpgrade("l", 38)) researchpointsincome = researchpointsincome.mul(upgradeEffect("l", 38))
            player.l.researchpoints = player.l.researchpoints.add(researchpointsincome.mul(delta))

            let row2researchmult = new ExpantaNum(10)
            if (hasUpgrade("l", 25)) row2researchmult = row2researchmult.mul(3)
            if (hasUpgrade("l", 26)) row2researchmult = row2researchmult.mul(3)
            if (hasUpgrade("l", 27)) row2researchmult = row2researchmult.mul(3)
            player.l.row2researchcost = row2researchmult

            let row3researchmult = new ExpantaNum(100)
            if (hasUpgrade("l", 31)) row3researchmult = row3researchmult.mul(2)
            if (hasUpgrade("l", 32)) row3researchmult = row3researchmult.mul(2)
            if (hasUpgrade("l", 33)) row3researchmult = row3researchmult.mul(2)
            if (hasUpgrade("l", 34)) row3researchmult = row3researchmult.mul(2)
            if (hasUpgrade("l", 35)) row3researchmult = row3researchmult.mul(2)
            if (hasUpgrade("l", 36)) row3researchmult = row3researchmult.mul(2)
            player.l.row3researchcost = row3researchmult

            let row5researchmult = new ExpantaNum(250000)
            if (hasUpgrade("l", 41)) row5researchmult = row5researchmult.mul(4)
            if (hasUpgrade("l", 42)) row5researchmult = row5researchmult.mul(4)
            if (hasUpgrade("l", 43)) row5researchmult = row5researchmult.mul(4)
            player.l.row5researchcost = row5researchmult

            let row6researchmult = new ExpantaNum(1e15)
            if (hasUpgrade("l", 61)) row6researchmult = row6researchmult.mul(1e4)
            if (hasUpgrade("l", 62)) row6researchmult = row6researchmult.mul(1e4)
            player.l.row6researchcost = row6researchmult

            let row7researchmult = new ExpantaNum("1e3500")
            if (hasUpgrade("l", 81)) row7researchmult = row7researchmult.mul("1e500")
            if (hasUpgrade("l", 82)) row7researchmult = row7researchmult.mul("1e500")
            player.l.row7researchcost = row7researchmult

            let row8researchmult = new ExpantaNum("1e150000")
            if (hasUpgrade("l", 91)) row8researchmult = row8researchmult.mul("1e30000")
            if (hasUpgrade("l", 92)) row8researchmult = row8researchmult.mul("1e30000")
            if (hasUpgrade("l", 93)) row8researchmult = row8researchmult.mul("1e30000")
            player.l.row8researchcost = row8researchmult

            if (hasUpgrade("ad", 13)) player.l.savedmoney = player.l.savedmoney.add(player.l.points.mul(0.1).mul(delta))

            if (hasUpgrade("l", 76))
            {
                player.l.euros = player.l.points.plus(10).log10().div(100)   
			}
            let europow = new ExpantaNum(500)
            if (hasUpgrade("l", 78)) europow = new ExpantaNum(10000)
            if (hasUpgrade("l", 79)) europow = new ExpantaNum(150000)
            if (hasUpgrade("l", 103)) europow = europow.mul(upgradeEffect("l", 103))
            player.l.euroeffect = player.l.euros.pow(europow)

            let antimattertimeincome = new ExpantaNum(0)
            if (hasUpgrade("ad", 98)) antimattertimeincome = antimattertimeincome.add(1)
            if (hasUpgrade("l", 104)) antimattertimeincome = antimattertimeincome.mul(upgradeEffect("l", 104))
            if (hasUpgrade("l", 105)) antimattertimeincome = antimattertimeincome.mul(10)
            antimattertimeincome = antimattertimeincome.mul(player.l.coineffect)
            if (hasUpgrade("i2", 13)) antimattertimeincome = antimattertimeincome.mul(player.i2.incrementalstoneseffect1)
            player.l.antimattertime = player.l.antimattertime.add(antimattertimeincome.mul(delta))

            player.l.antimattertimeeffect = EN(player[this.layer].antimattertime)
            player.l.antimattertimeeffect = EN.pow(4, EN.pow(4, player.l.antimattertimeeffect)).sub(3)

            let militarytimeincome = new ExpantaNum(0)
            if (hasUpgrade("m", 19)) militarytimeincome = militarytimeincome.add(1)
            if (hasUpgrade("i2", 17)) militarytimeincome = militarytimeincome.mul(player.i2.incrementalstoneseffect3)
            militarytimeincome = militarytimeincome.mul(player.l.supermarkettimeeffect)
            player.l.militarytime = player.l.militarytime.add(militarytimeincome.mul(delta))

            player.l.militarytimeeffect = player.l.militarytime.pow(0.9)

            let supermarkettimeincome = new ExpantaNum(0)
            if (hasUpgrade("l", 122)) supermarkettimeincome = supermarkettimeincome.add(1)
            if (hasUpgrade("ch", 39)) supermarkettimeincome = supermarkettimeincome.mul(player.l.clickerheroestimeeffect)
            player.l.supermarkettime = player.l.supermarkettime.add(supermarkettimeincome.mul(delta))

            player.l.supermarkettimeeffect = player.l.supermarkettime.pow(0.2).add(1)

            let clickerheroestimeincome = new ExpantaNum(0)
            if (hasUpgrade("ch", 39)) clickerheroestimeincome = clickerheroestimeincome.add(1)
            if (hasUpgrade("i2", 19)) clickerheroestimeincome = clickerheroestimeincome.mul(player.i2.incrementalstoneseffect3)
            if (hasUpgrade("h", 17)) clickerheroestimeincome = clickerheroestimeincome.mul(player.h.timeeffect3)
            clickerheroestimeincome = clickerheroestimeincome.mul(player.rg.pointeffect)
            player.l.clickerheroestime = player.l.clickerheroestime.add(clickerheroestimeincome.mul(delta))
            player.l.clickerheroestimeeffect = EN.pow(1.1, EN.pow(1.1, player.l.clickerheroestime)).sub(3)

            let itemgaintimer = new ExpantaNum(1)
            if (hasUpgrade("l", 112)) itemgaintimer = new ExpantaNum(2)
            if (hasUpgrade("l", 116)) itemgaintimer = itemgaintimer.mul(upgradeEffect("l", 116))
            if (hasUpgrade("l", 117)) itemgaintimer = itemgaintimer.mul(upgradeEffect("l", 117))

            if (hasUpgrade("l", 105))
            {
            if (player.l.itemsforsale < 100)
            {
                    player.l.itemsforsaletimer = player.l.itemsforsaletimer.add(itemgaintimer.mul(delta))
			}
            if (player.l.itemsforsale >= 100)
            {
                    if (hasUpgrade("l", 115)) player.l.coins = player.l.coins.add(player.l.itemsforsale.mul(player.l.itemvalue))
                    if (hasUpgrade("l", 115)) player.l.itemsforsale = new ExpantaNum(0)
			}
            if (player.l.itemsforsaletimer > 10)
            {
                    player.l.itemsforsaletimer = new ExpantaNum(0)
                    player.l.itemsforsale = player.l.itemsforsale.add(1)
			}
            }
            player.l.itemvalue = player.l.itemsforsale.add(10)
            player.l.coineffect = player.l.coins.add(1)
          
            if (hasUpgrade("l", 111)) player.l.itemvalue = player.l.itemvalue.mul(3)
            if (hasUpgrade("l", 113)) player.l.itemvalue = player.l.itemvalue.mul(3)
            if (hasUpgrade("l", 114)) player.l.itemvalue = player.l.itemvalue.mul(upgradeEffect("l", 114))
            player.l.itemvalue = player.l.itemvalue.mul(layers.ch.effect())

            player.l.minigamenumbereffect = player.l.minigamenumber.pow(0.5)

            if (hasUpgrade("l", 122)) player.l.coins = player.l.coins.add(player.l.itemvalue.mul(delta))    
        },
    microtabs: 
    {
        stuff: 
        {
          "Finance": {
          content: [
          ["blank", "15px"],
          ["display-text", () => "You Gain Dollars Based on the Log10(Log10)^0.5 of Points you have"],
          ["display-text", () => format(player.l.$persecond) + "$ per second"],
          ["display-text", () => "Your Salary is " + format(player.l.$persecond.mul(3600)) + "$ per hour"],
          ["display-text", () => "You Specifically Have " + format(player.l.points) + "$"],   
          ["display-text", () => "You Have " + format(player.l.savedmoney) + "$ in your Savings Account and a x" + format(player.l.savedmoneyeffect) + " boost to Points"],
          ["display-text", () => hasUpgrade("l", 76) ? "Your $ Converts to " + format(player.l.euros) + " Euros in your Savings Account and a x" + format(player.l.euroeffect) + " boost to Hevipelle Points" : ""],  
          ["row", [["buyable", 11]]],
          ["row", [["upgrade", 75], ["upgrade", 76], ["upgrade", 77], ["upgrade", 78], ["upgrade", 79]]],
          ["row", [["upgrade", 101], ["upgrade", 102], ["upgrade", 103], ["upgrade", 104], ["upgrade", 119]]],
          ["row", [["upgrade", 121], ["upgrade", 123]]],
          ]
          },
          "Supermarket": 
          {
          content: [
          ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
          ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 38]]],
          ["row", [["upgrade", 51], ["upgrade", 52], ["upgrade", 53], ["upgrade", 54]]],
          ["row", [["upgrade", 71], ["upgrade", 72], ["upgrade", 73], ["upgrade", 74]]],
          ["row", [["upgrade", 105]]],
          ]
          },
                "The Times": {
                unlocked() { return hasUpgrade("l", 22) },
                content: 
                [
                    ["blank", "15px"],
                    ["display-text", () => "Cookie Clicker Time: " + formatTime(player.l.cookietime) + " -> x" + format(player.l.cookietimeeffect) + " boost to Points"],
                    ["display-text", () => hasUpgrade("ad", 98) ? "Antimatter Dimensions Time: " + formatTime(player.l.antimattertime) + " -> x" + format(player.l.antimattertimeeffect) + " boost to Cookie Clicker Time" : ""],
                    ["display-text", () => hasUpgrade("ch", 39) ? "Clicker Heroes Time: " + formatTime(player.l.clickerheroestime) + " -> x" + format(player.l.clickerheroestimeeffect) + " boost to Supermarket Time" : ""],
                    ["blank", "25px"],
                    ["display-text", () => hasUpgrade("m", 19) ? "The Minigames" : ""],
                    ["blank", "15px"],
                    ["display-text", () => hasUpgrade("m", 19) ? "Military Time: " + formatTime(player.l.militarytime) + " -> +^" + format(player.l.militarytimeeffect) + " to Clicker Heroes Gold Effect" : ""],
                    ["display-text", () => hasUpgrade("l", 122) ? "Supermarket Time: " + formatTime(player.l.supermarkettime) + " -> x" + format(player.l.supermarkettimeeffect) + " boost to Military Time" : ""],
                ]
            },
                "Research Tree": {
                unlocked() { return hasUpgrade("l", 23) },
                content: 
                [
                    ["blank", "15px"],
                    ["display-text", () => "You have " + format(player.l.researchpoints) + " Research Points"],
                    ["blank", "15px"],
                    ["row", [["upgrade", 24]]],
                    ["blank", "100px"],
                    ["row", [["upgrade", 25], ["blank", "15px"], ["upgrade", 26], ["blank", "15px"], ["upgrade", 27]]],
                    ["blank", "100px"],
                    ["row", [["upgrade", 31], ["blank", "15px"], ["upgrade", 32], ["blank", "15px"], ["upgrade", 33], ["blank", "15px"], ["upgrade", 34], ["blank", "15px"], ["upgrade", 35], ["blank", "15px"], ["upgrade", 36]]],
                    ["blank", "100px"],
                    ["row", [["upgrade", 37]]],
                    ["blank", "100px"],
                    ["row", [["upgrade", 41], ["blank", "15px"], ["upgrade", 42], ["blank", "15px"], ["upgrade", 43]]],
                    ["blank", "100px"],
                    ["row", [["upgrade", 61], ["blank", "15px"], ["upgrade", 62]]],
                    ["blank", "100px"],
                    ["row", [["upgrade", 81], ["blank", "15px"], ["upgrade", 82]]],
                    ["blank", "100px"],
                    ["row", [["upgrade", 91], ["blank", "15px"], ["upgrade", 92], ["blank", "15px"], ["upgrade", 93]]],
                ]
            },
                "Supermarket Management": {
                unlocked() { return hasUpgrade("l", 105) },
                content: 
                [
                ["display-text", () => "You have " + format(player.l.itemsforsale) + "/100 Items for Sale"],
                ["display-text", () => "You have " + format(player.l.coins) + " Coins and a x"+ format(player.l.coineffect) + " boost to Antimatter Dimensions Time"],
                ["display-text", () => "Item Value: " + format(player.l.itemvalue) + " Coins"],
                ["blank", "15px"],
                ["bar", "itemsforsalebar"],
                ["row", [["buyable", 12]]],
                ["row", [["upgrade", 111], ["upgrade", 112], ["upgrade", 113], ["upgrade", 114]]],
                ["row", [["upgrade", 115], ["upgrade", 116], ["upgrade", 117], ["upgrade", 118]]],
                ["row", [["upgrade", 122]]],
                ]
            },
               "2048 Minigame": {
                unlocked() { return hasUpgrade("l", 119) },
                content: 
                [
                ["row", [["clickable", 11]]],
                ["display-text", () => "Your number gives a x" + format(player.l.minigamenumbereffect) + " boost to Respect"],
                ["blank", "15px"],
                ["row", [["buyable", 13]]],
                ]
            },
                "Timewall Graveyard": {
                unlocked() { return hasUpgrade("l", 31) },
                content: 
                [
                 ['display-image', 'https://purepng.com/public/uploads/large/purepng.com-gravestonegravestoneheadstonetombstonestele-1701527777253h01mk.png'],
                 ["display-text", () => "Here lies the Timewalls of this game"],
                 ["display-text", () => "2021-2022"],
                 ["blank", "40px"],
                 ["display-text", () => "Nobody liked you, you will never be missed."],
                 ["blank", "25px"],
                 ["display-text", () => "You know that nobody is gonna play that? There are already too many timewalls"],
                 ["display-text", () => "-jakub 4/17/22"],
                 ["blank", "15px"],
                 ["display-text", () => "Abuses Timewalls, Trash, and a pile of GARBAGE!"],
                 ["display-text", () => "-nullified_okra 4/18/22"],
                 ["blank", "15px"],
                 ["display-text", () => "F**king Amount of Timewall."],
                 ["display-text", () => "-3^3=7 4/18/22"],
                 ["blank", "15px"],
                 ["display-text", () => "id give u a 65 with the current timewalls"],
                 ["display-text", () => "-reeeeeeeeeeeeeeeeeee 4/19/22"],
                 ["blank", "15px"],
                 ["display-text", () => "I'm gonna be honest, the timewalls are the only things stopping this from being in my top mods"],
                 ["display-text", () => "-Razorphoenix 4/19/22"],
                 ["blank", "15px"],
                 ["display-text", () => "i aint waiting 1 week for an upgrade"],
                 ["display-text", () => "-Alex208 4/19/22"],
                ]
            },
        },
    },
    layerShown(){return hasUpgrade("cc", 211)}
            
},
)
addLayer("ad", {
    name: "Antimatter Dimensions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AD",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
        linesofcodegamejs: new ExpantaNum(0),
        linesofcodegamejseffect: new ExpantaNum(0),
        linesofcodeautobuyerjs: new ExpantaNum(0),
        linesofcodeautobuyerjseffect: new ExpantaNum(0),
        linesofcodebreakinfinityjs: new ExpantaNum(0),
        linesofcodebreakinfinityjseffect: new ExpantaNum(0),
        timewalls: new ExpantaNum(0),
        timewalleffect: new ExpantaNum(0),
        timewalltime: new ExpantaNum(0),
        timewalltoggle: new ExpantaNum(0),
        antimatter: new ExpantaNum(0),
        antimattereffect: new ExpantaNum(0),
        antimattereffect2: new ExpantaNum(0),
        dimensionmult: new ExpantaNum(1.07),
        dimension1: new ExpantaNum(0),
        dimension1mult: new ExpantaNum(1),
        dimension1cost: new ExpantaNum(10),
        dimension2: new ExpantaNum(0),
        dimension2mult: new ExpantaNum(1),
        dimension2cost: new ExpantaNum(100),
        dimension3: new ExpantaNum(0),
        dimension3mult: new ExpantaNum(1),
        dimension3cost: new ExpantaNum(10000),
        dimension4: new ExpantaNum(0),
        dimension4mult: new ExpantaNum(1),
        dimension4cost: new ExpantaNum(1e6),
        dimension5: new ExpantaNum(0),
        dimension5mult: new ExpantaNum(1),
        dimension5cost: new ExpantaNum(1e9),
        dimension6: new ExpantaNum(0),
        dimension6mult: new ExpantaNum(1),
        dimension6cost: new ExpantaNum(1e12),
        dimension7: new ExpantaNum(0),
        dimension7mult: new ExpantaNum(1),
        dimension7cost: new ExpantaNum(1e16),
        dimension8: new ExpantaNum(0),
        dimension8mult: new ExpantaNum(1),
        dimension8cost: new ExpantaNum(1e22),
        dimboost: new ExpantaNum(0),
        dimboosteffect: new ExpantaNum(1),
        dimboostreq: new ExpantaNum(5),
        sacrificemult: new ExpantaNum(1),
        sacrificestored: new ExpantaNum(0),
        sacrificemulttoget: new ExpantaNum(0),
        antimattergalaxies: new ExpantaNum(0),
        antimattergalaxieseffect: new ExpantaNum(0),
        antimattergalaxiesreq: new ExpantaNum(40),
        minidimension1: new ExpantaNum(0),
        minidimension1effect: new ExpantaNum(0),
        minidimension2: new ExpantaNum(0),
        minidimension3: new ExpantaNum(0),
        minidimension4: new ExpantaNum(0),
        infinitypoints: new ExpantaNum(0),
        infinitypointstoget: new ExpantaNum(0),
        infinitypower: new ExpantaNum(0),
        infinitypowereffect: new ExpantaNum(0),
        infinitydimensionmult: new ExpantaNum(2),
        ipdoubler: new ExpantaNum(0),
        ipdoublereffect: new ExpantaNum(1),
        ipdoublercost: new ExpantaNum(1),
        infinitydimension1: new ExpantaNum(0),
        infinitydimension1mult: new ExpantaNum(1),
        infinitydimension1cost: new ExpantaNum(10),
        infinitydimension2: new ExpantaNum(0),
        infinitydimension2mult: new ExpantaNum(1),
        infinitydimension2cost: new ExpantaNum(100),
        infinitydimension3: new ExpantaNum(0),
        infinitydimension3mult: new ExpantaNum(1),
        infinitydimension3cost: new ExpantaNum(10000),
        infinitydimension4: new ExpantaNum(0),
        infinitydimension4mult: new ExpantaNum(1),
        infinitydimension4cost: new ExpantaNum(1e6),
        replicanti: new ExpantaNum(0),
        replicantieffect: new ExpantaNum(0),
        replicantitime: new ExpantaNum(0),
        replicantitimeboost: new ExpantaNum(1),
        singularities: new ExpantaNum(0),
        singularityeffect: new ExpantaNum(1),
        singularityeffect2: new ExpantaNum(1),
        blackholes: new ExpantaNum(0),
        blackholestoget: new ExpantaNum(0),
        blackholeseffect: new ExpantaNum(1),
        omegapower: new ExpantaNum(0),
        omegapowereffect: new ExpantaNum(1),
        omegadimensionmult: new ExpantaNum(1.2),
        omegadimension1: new ExpantaNum(0),
        omegadimension1mult: new ExpantaNum(1),
        omegadimension1cost: new ExpantaNum(10000),
        omegadimension2: new ExpantaNum(0),
        omegadimension2mult: new ExpantaNum(1),
        omegadimension2cost: new ExpantaNum(1e5),
        omegadimension3: new ExpantaNum(0),
        omegadimension3mult: new ExpantaNum(1),
        omegadimension3cost: new ExpantaNum(1e8),
        omegadimension4: new ExpantaNum(0),
        omegadimension4mult: new ExpantaNum(1),
        omegadimension4cost: new ExpantaNum(1e12),
        singularitydoubler: new ExpantaNum(0),
        singularitydoublereffect: new ExpantaNum(1),
        singularitydoublercost: new ExpantaNum(1),
        blackholedoubler: new ExpantaNum(0),
        blackholedoublereffect: new ExpantaNum(1),
        blackholedoublercost: new ExpantaNum(1),
        protonicdimension: new ExpantaNum(0),
        neutronicdimension: new ExpantaNum(0),
        electronicdimension: new ExpantaNum(0),
        protons: new ExpantaNum(0),
        neutrons: new ExpantaNum(0),
        electrons: new ExpantaNum(0),
        protoneffect: new ExpantaNum(0),
        neutroneffect: new ExpantaNum(0),
        electroneffect: new ExpantaNum(0),
        subatomicpower: new ExpantaNum(0),
        subatomicpowereffect: new ExpantaNum(1),
        subatomicdimensionmult: new ExpantaNum(1.25),
        subatomicdimension1: new ExpantaNum(0),
        subatomicdimension1mult: new ExpantaNum(1),
        subatomicdimension1cost: new ExpantaNum(100),
        subatomicdimension2: new ExpantaNum(0),
        subatomicdimension2mult: new ExpantaNum(1),
        subatomicdimension2cost: new ExpantaNum(1e4),
        subatomicdimension3: new ExpantaNum(0),
        subatomicdimension3mult: new ExpantaNum(1),
        subatomicdimension3cost: new ExpantaNum(1e7),
        atoms: new ExpantaNum(0),
        atomspersecond: new ExpantaNum(0),
        atomeffect: new ExpantaNum(1),
        atomdoubler: new ExpantaNum(0),
        atomdoublereffect: new ExpantaNum(1),
        atomdoublercost: new ExpantaNum(1),
        replicantibooster: new ExpantaNum(0),
        replicantiboostereffect: new ExpantaNum(1),
        replicantiboostercost: new ExpantaNum(1e10),
        universetoggle: new ExpantaNum(0),
        universes: new ExpantaNum(0),
        universespersecond: new ExpantaNum(0),
        universeseffect: new ExpantaNum(1),
        universeupgradetime: new ExpantaNum(0),        
        multiverse: new ExpantaNum(0),
        multiverseeffect: new ExpantaNum(0),
        metaverse: new ExpantaNum(0),
        omniverse: new ExpantaNum(0),
        heviverse: new ExpantaNum(0),
        hevipelleshards: new ExpantaNum(0),
        hevipelleshardspersecond: new ExpantaNum(0),
        hevipelleshardeffect: new ExpantaNum(0),
        shardtoggle: new ExpantaNum(3),
        gainshards: new ExpantaNum(0),
        gainshardseffect: new ExpantaNum(0),
        gainshardspersecond: new ExpantaNum(0),
        effectshards: new ExpantaNum(0),
        effectshardseffect: new ExpantaNum(0),
        effectshardspersecond: new ExpantaNum(0),
        finalshards: new ExpantaNum(0),
        finalshardseffect: new ExpantaNum(0),
        finalshardspersecond: new ExpantaNum(0),
    }},
    symbol: "<img src='resources/antimatterdimensionslayersymbol.png' style='width:calc(95%);height:calc(80%);margin:0%'></img>",
    color: "#4BDF34",
    nodeStyle: {
        background: "linear-gradient(-50deg, #4BDF43, #4BDF34, #008B8B, #008B7B, #009B7B)",
        "background-origin": "border-box",
    },
    branches: ["cc", "i"],
    requires: new ExpantaNum("1e11000"), // Can be a function that takes requirement increases into account
    resource: "hevipelle points", // Name of prestige currency
        automate()
    {

    if (!hasUpgrade("ad", 97))
    {
            if (hasUpgrade('ad', 33))
    {
        buyBuyable(this.layer, 11)
    }
    if (hasUpgrade('ad', 41))
    {
                 buyBuyable(this.layer, 21)
        buyBuyable(this.layer, 22)
        buyBuyable(this.layer, 23)
        buyBuyable(this.layer, 24)
        buyBuyable(this.layer, 25)
        buyBuyable(this.layer, 26)
        buyBuyable(this.layer, 27)
        buyBuyable(this.layer, 28)
         
    }
    if (hasUpgrade('ad', 43))
    {
        buyBuyable(this.layer, 31)
        buyBuyable(this.layer, 33)
        buyBuyable(this.layer, 34)
    }
    if (hasUpgrade('ad', 62))
    {
        buyBuyable(this.layer, 42)
        buyBuyable(this.layer, 51)
        buyBuyable(this.layer, 52)
        buyBuyable(this.layer, 53)
        buyBuyable(this.layer, 54)
        buyBuyable(this.layer, 71)
        buyBuyable(this.layer, 72)
        buyBuyable(this.layer, 73)
        buyBuyable(this.layer, 74)
    }
        if (hasUpgrade('ad', 68))
    {
        buyBuyable(this.layer, 75)
        buyBuyable(this.layer, 76)
    }
    if (hasUpgrade('ad', 71))
    {
        buyBuyable(this.layer, 81)
        buyBuyable(this.layer, 82)
        buyBuyable(this.layer, 83)
    }
	}
    },
    baseResource: "incremental points", // Name of resource prestige is based on
    passiveGeneration() { return (hasUpgrade('ad', 32))},
    baseAmount() {return player.i.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0003, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        if (hasUpgrade('ad', 21)) mult = mult.times(player.ad.linesofcodegamejseffect)
        if (hasUpgrade('ad', 34)) mult = mult.times(upgradeEffect('ad', 34))
        if (hasUpgrade('l', 51)) mult = mult.times(upgradeEffect('l', 51))
        if (hasUpgrade('l', 61)) mult = mult.times(upgradeEffect('l', 61))
        if (hasUpgrade('l', 76)) mult = mult.times(player.l.euroeffect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "A", description: "A: Reset for hevipelle points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    	effect() 
        {
			return new ExpantaNum.add(player.ad.points.pow(0.5), 1);
		},
        effectDescription(){
                let eff = layers.ad.effect()
                return "which multiplies Research Point and Cookie Time gain by x" + format(eff)
        },
    upgrades: 
    {
        11:
        {
            title: "A Revolutionary Idea",
            description: "Adds ^46 to the Cookie Time Effect",
            unlocked() { return hasUpgrade("l", 37) },
            cost: new ExpantaNum(2),
        },
        12:
        {
            title: "Polynomial Growth?",
            description: "Multiplies Cookie Clicker Time gain by 1000x",
            unlocked() { return hasUpgrade("ad", 11) },
            cost: new ExpantaNum(10),
        },
        13:
        {
            title: "Different from Cookie Clicker",
            description: "Automatically sends 10% of your $ to your savings account without losing any of your $",
            unlocked() { return hasUpgrade("ad", 12) },
            cost: new ExpantaNum(25),
        },
        21:
        {
            title: "Start Creating for game.js",
            description: "Gives you Lines of Code for game.js based on Hevipelle Points",
            unlocked() { return hasUpgrade("ad", 13) },
            cost: new ExpantaNum(60),
                effect() 
                {
                     return player[this.layer].points.pow(0.25).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+" per Second" }, // Add formatting to the effect
        },
        22:
        {
            title: "Start Creating for autobuyer.js",
            description: "Gives you Lines of Code for autobuyer.js based on Hevipelle Points",
            unlocked() { return hasUpgrade("ad", 21) },
            cost: new ExpantaNum(200),
                effect() 
                {
                     return player[this.layer].points.pow(0.225).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+" per Second" }, // Add formatting to the effect
        },
        23:
        {
            title: "Start Creating for breakinfinity.js",
            description: "Gives you Lines of Code for breakinfinity.js based on Hevipelle Points",
            unlocked() { return hasUpgrade("ad", 22) },
            cost: new ExpantaNum(1000),
                effect() 
                {
                     return player[this.layer].points.pow(0.2).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+" per Second" }, // Add formatting to the effect
        },
        31:
        {
            title: "Timewalls?",
            description: "Unlock Timewalls",
            unlocked() { return hasUpgrade("ad", 23) },
            cost: new ExpantaNum(5000),
        },
        32:
        {
            title: "Speed up the Timewalls",
            description: "Speeds up Timewall Seconds gain by 3x and Automatically generate Hevipelle points",
            unlocked() { return player.ad.timewalls >= 1 },
            cost: new ExpantaNum(20000),
        },
        33:
        {
            title: "Automatic Timewalls",
            description: "Automatically gets Timewalls",
            unlocked() { return player.ad.timewalls >= 4 },
            cost: new ExpantaNum(10000000),
        },
        34:
        {
            title: "Hevi Timewalls",
            description: "Timewalls boost Hevipelle points",
            unlocked() { return player.ad.timewalls >= 7 },
            cost: new ExpantaNum(1e9),
                effect() 
                {
                     return player[this.layer].timewalls.pow(0.85).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        35:
        {
            title: "Antimatter Dimensions",
            description: "Unlocks a new Tab (Also disables some autobuyers for performance it wont affect that much)",
            unlocked() { return player.ad.timewalls >= 11 },
            cost: new ExpantaNum(1e10),
        },
        36:
        {
            title: "Speed up the Timewalls... Again",
            description: "Speeds up Timewall Seconds gain by 2x",
            unlocked() { return player.ad.timewalls >= 450 },
            cost: new ExpantaNum(1e54),
        },
        37:
        {
            title: "Speed up the Timewalls... Again... Again",
            description: "Speeds up Timewall Seconds gain by 2x",
            unlocked() { return player.ad.timewalls >= 1000 },
            cost: new ExpantaNum(1e106),
        },
        38:
        {
            title: "Speed up the Timewalls... Again(3)",
            description: "Speeds up Timewall Seconds gain by 10x",
            unlocked() { return player.ad.timewalls >= 5000 },
            cost: new ExpantaNum("1e3456"),
        },
        39:
        {
            title: "Even more Hevi Timewalls",
            description: "Timewalls boost Timewall Effect",
            unlocked() { return player.ad.timewalls >= 6000 },
            cost: new ExpantaNum("1e4444"),
                effect() 
                {
                     return player[this.layer].timewalls.pow(50).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        101:
        {
            title: "Just to make stuff easier",
            description: "Boost all dimensions by x100",
            unlocked() { return player.ad.dimboost >= 1 },
            cost: new ExpantaNum(1e20),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
        },
        102:
        {
            title: "Just to make stuff even easier",
            description: "Boost all dimensions by x1000",
            unlocked() { return player.ad.antimattergalaxies >= 2 },
            cost: new ExpantaNum(1e120),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
        },
        41:
        {
            title: "Automation, Already??? And where is the Tickspeed Boost???",
            description: "Automates buying Dimensions and buying them doesn't deduct any Antimatter",
            unlocked() { return player.ad.dimboost >= 6 || player.ad.antimattergalaxies >= 1 || player.ad.infinitypoints > 0 },
            cost: new ExpantaNum(1e55),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
        },
        42:
        {
            title: "Mini Dimensions",
            description() { return "Produces 4th Mini Dimensions based on 8th Dimension Multiplier, and 1st Mini Dimensions boost 8th Dimensions\n\
            1st Mini Dimensions: " + format(player.ad.minidimension1) + "\n\
            2nd Mini Dimensions: " + format(player.ad.minidimension2) + "\n\
            3rd Mini Dimensions: " + format(player.ad.minidimension3) + "\n\
            4th Mini Dimensions: " + format(player.ad.minidimension4)+ "\n\
            1st Mini Dimension Effect: x" + format(player.ad.minidimension1effect) + " boost to 8th Dimensions"},
            unlocked() { return player.ad.antimattergalaxies >= 2  || player.ad.infinitypoints > 0 },
            cost: new ExpantaNum(1e120),
                effect() 
                {
                     return player[this.layer].dimension8mult
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+" 4th Mini Dimensions per Second"
            }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            style: { width: "220px", "min-height": "220px" }
        },
        43:
        {
            title: "THE INFLATED UPGRADE #1",
            description: "Automates buying Dimension Boosts, Galaxies, Production Multipliers, and Automatically gains Sacrifice mult",
            unlocked() { return player.ad.infinitypoints > 0 },
            cost: new ExpantaNum(1),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        44:
        {
            title: "Finally, a lot of Money!",
            description: "Boost to all Dimensions based on Infinity Points",
            unlocked() { return hasUpgrade("ad", 43) },
            cost: new ExpantaNum(3),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
                effect() 
                {
                     return player[this.layer].infinitypoints.pow(0.8).mul(4e2).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        45:
        {
            title: "Infinity and Beyond!",
            description: "Unlocks Infinity Dimensions",
            unlocked() { return hasUpgrade("ad", 44) },
            cost: new ExpantaNum(10),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        46:
        {
            title: "Why Not?",
            description: "Gets 50% of Infinity Points production per Second",
            unlocked() { return hasUpgrade("ad", 45) },
            cost: new ExpantaNum(3),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        47:
        {
            title: "The Boost of the Infinite Gods",
            description: "Boost to the 1st Dimension based on Infinity Points",
            unlocked() { return hasUpgrade("ad", 46) },
            cost: new ExpantaNum(5000),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
                effect() 
                {
                     return player[this.layer].infinitypoints.pow(5).mul("1e2000").add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        48:
        {
            title: "Infinite Synergy",
            description: "Boost to Infinity Points based on Infinity Points",
            unlocked() { return hasUpgrade("ad", 46) },
            cost: new ExpantaNum(10000),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
                effect() 
                {
                     return player[this.layer].infinitypoints.pow(0.2).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        49:
        {
            title: "You will need this",
            description: "x10 Boost to all Infinity Dimensions and Infinity Points",
            unlocked() { return hasUpgrade("ad", 48) },
            cost: new ExpantaNum(1e5),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        51:
        {
            title: "Replicanti this early in the game?????",
            description: "Unlocks a new tab",
            unlocked() { return hasUpgrade("ad", 49) },
            cost: new ExpantaNum(1e8),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        52:
        {
            title: "Make the Timewalls Sped Up",
            description: "Speed Up Timewalls by x10",
            unlocked() { return player.ad.timewalls >= 20000 },
            cost: new ExpantaNum("1e7222"),
        },
        53:
        {
            title: "Supreme Timewall Speed",
            description: "Speed Up Timewalls by x15",
            unlocked() { return player.ad.timewalls >= 50000 },
            cost: new ExpantaNum("1e8666"),
        },
        54:
        {
            title: "Replication is now Duplication",
            description: "Gets 2x Replicanti instead of 1.1x",
            unlocked() { return hasUpgrade("ad", 49) },
            cost: new ExpantaNum(1e9),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        55:
        {
            title: "Couldn't get enought replicanti?",
            description: "Gets 5x Replicanti now",
            unlocked() { return hasUpgrade("ad", 54) },
            cost: new ExpantaNum(1e10),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        56:
        {
            title: "We need more Infinity Points",
            description: "Replicanti Boosts Infinity Points",
            unlocked() { return hasUpgrade("ad", 55) },
            cost: new ExpantaNum(1e11),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
                effect() 
                {
                     return player[this.layer].replicanti.plus(10).log10().pow(1.5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        57:
        {
            title: "Breakreplicantinfinity",
            description: "You can go past 1.79e308 Replicanti and get 0.1 Singularities per Second",
            unlocked() { return hasUpgrade("ad", 56) },
            cost: new ExpantaNum(1e15),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        58:
        {
            title: "More Singularities?",
            description: "Boosts Singularities based on Replicanti",
            unlocked() { return hasUpgrade("ad", 57) },
            cost: new ExpantaNum(1e18),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
                effect() 
                {
                     return player[this.layer].replicanti.plus(10).log10().pow(0.3)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        59:
        {
            title: "This was never in the real game!",
            description: "Unlocks a new tab",
            unlocked() { return hasUpgrade("ad", 58) },
            cost: new ExpantaNum(1e21),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        61:
        {
            title: "Big Black Holes (AYO?)",
            description: "Generates Black Holes based on Infinity Points",
            unlocked() { return hasUpgrade("ad", 59) },
            cost: new ExpantaNum(1e21),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
            effectDisplay() { return format(player.ad.blackholestoget) + " Black Holes per second"}, // Add formatting to the effect
        },
        62:
        {
            title: "Even more Automation",
            description: "Automates Infinity Point Doublers, Infinity Dimensions and Omega Dimensions.",
            unlocked() { return hasUpgrade("ad", 61) },
            cost: new ExpantaNum(1e50),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        63:
        {
            title: "Make the Dimensions useful again",
            description: "Boost Replicanti Mult Gain based on 1st Infinity Dimension Mult",
            unlocked() { return hasUpgrade("ad", 62) },
            cost: new ExpantaNum(1e54),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
                effect() 
                {
                     return player[this.layer].infinitydimension1mult.plus(10).log10().pow(0.5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        64:
        {
            title: "The Heviest Timewalls",
            description: "Timewalls boost Timewall Effect",
            unlocked() { return player.ad.timewalls >= 180000 },
            cost: new ExpantaNum("1e123456"),
                effect() 
                {
                     return player[this.layer].timewalls.pow(5000).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        65:
        {
            title: "Omega > Infinity",
            description: "Boost Omega Dimensions based on Singularities",
            unlocked() { return hasUpgrade("ad", 63) },
            cost: new ExpantaNum(1e70),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
                effect() 
                {
                     return player[this.layer].singularities.plus(10).log10()
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        66:
        {
            title: "Cool Chemistry Stuff",
            description: "Unlocks a new Tab",
            unlocked() { return hasUpgrade("ad", 63) },
            cost: new ExpantaNum(1e100),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        67:
        {
            title: "Start Producing Subatomic Particles",
            description: "",
            unlocked() { return hasUpgrade("ad", 63) },
            cost: new ExpantaNum(1e100),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        68:
        {
            title: "Doubler Automation",
            description: "Automates Singularity Doublers and Black Hole Doublers",
            unlocked() { return hasUpgrade("ad", 67) },
            cost: new ExpantaNum(1e200),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        69:
        {
            title: "A boost everyone would like",
            description: "x1e50 Replicanti Boost and unlocks a new tab",
            unlocked() { return hasUpgrade("ad", 68) },
            cost: new ExpantaNum("1e350"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        71:
        {
            title: "Subatomic Booster",
            description: "Autobuys Subatomic Dimensions and Subatomic Power Effect also boosts Subatomic Particles",
            unlocked() { return hasUpgrade("ad", 69) },
            cost: new ExpantaNum("1e1000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        72:
        {
            title: "Atom Self-Replication",
            description: "Boosts Atoms based on Atoms",
            unlocked() { return hasUpgrade("ad", 71) },
            cost: new ExpantaNum("1e3000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
                effect() 
                {
                     return player[this.layer].atoms.add(1).pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        73:
        {
            title: "Start the Universal Generation",
            description: "Unlocks a new Tab",
            unlocked() { return hasUpgrade("ad", 72) },
            cost: new ExpantaNum("1e20000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        74:
        {
            title: "Sorta Automation",
            description: "Gains 100 Replicanti Boosters per Second",
            unlocked() { return hasUpgrade("ad", 73) },
            cost: new ExpantaNum("1e400000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        75:
        {
            title: "Quantum Fluctuations",
            description: "Boosts Universes based on Atoms",
            unlocked() { return hasUpgrade("ad", 71) },
            cost: new ExpantaNum("1e500000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
                effect() 
                {
                     return player[this.layer].atoms.plus(10).log10().div(100).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        76:
        {
            title: "Double Quantum Fluctuations",
            description: "Boosts Universes based on Universes",
            unlocked() { return hasUpgrade("ad", 75) },
            cost: new ExpantaNum("1e1000000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
                effect() 
                {
                     return player[this.layer].universes.add(1).pow(0.5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        77:
        {
            title: "Electric Boogaloo",
            description: "Boosts Electron effect pow to ^35",
            unlocked() { return hasUpgrade("ad", 76) },
            cost: new ExpantaNum("1e1600000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        78:
        {
            title: "Triple Quantum Fluctuations",
            description: "Boosts Universes based on Time after buying this upgrade",
            unlocked() { return hasUpgrade("ad", 77) },
            cost: new ExpantaNum("1e1700000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
                effect() 
                {
                     return player[this.layer].universeupgradetime.add(1).pow(5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        79:
        {
            title: "The very wanted upgrade",
            description: "Universe generation no longer decreases Atoms",
            unlocked() { return hasUpgrade("ad", 78) },
            cost: new ExpantaNum("1e5500000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        81:
        {
            title: "The Much more Universe Types",
            description() { return "Produces Heviverses based on Hevipelle Points, and Multiverses boost Universe Upgrade Time gain\n\
            Multiverses: " + format(player.ad.multiverse) + "\n\
            Metaverses: " + format(player.ad.metaverse) + "\n\
            Omniverses: " + format(player.ad.omniverse) + "\n\
            Heviverses: " + format(player.ad.heviverse)+ "\n\
            Multiverse Effect: x" + format(player.ad.multiverseeffect) + " boost to Universe Upgrade Time"},
            unlocked() { return hasUpgrade("ad", 79)},
            cost: new ExpantaNum("1e7000000"),
                effect() 
                {
                     return player[this.layer].points.plus(10).log10().log10()
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+" Heviverses per Second"
            }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
            style: { width: "220px", "min-height": "220px" }
        },
        82:
        {
            title: "A Gift from Antimatter Jesus",
            description: "x1e10 boost to the Other Universe Types",
            unlocked() { return hasUpgrade("ad", 81) },
            cost: new ExpantaNum("1e20000000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        83:
        {
            title: "THE END???",
            description: "Unlocks a new Tab",
            unlocked() { return hasUpgrade("ad", 82) },
            cost: new ExpantaNum("1e40000000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        91:
        {
            title: "Hevipelle must be proud",
            description: "Start producing Hevipelle Shards",
            unlocked() { return hasUpgrade("ad", 83) },
            cost: new ExpantaNum("1e100000000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        92:
        {
            title: "Hevipelle is proud...",
            description: "Unlocks more types of Shards",
            unlocked() { return hasUpgrade("ad", 91) },
            cost: new ExpantaNum("1e200000000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        93:
        {
            title: "Boosts each other like brothers",
            description: "Effect Shards and Gain Shards boost each other",
            unlocked() { return hasUpgrade("ad", 92) },
            cost: new ExpantaNum("e2e9"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        94:
        {
            title: "Hevipelle knows your the Chosen one",
            description: "Boosts Electron effect Pow to ^2000",
            unlocked() { return hasUpgrade("ad", 93) },
            cost: new ExpantaNum("e1e10"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        95:
        {
            title: "Even more Inflated boosting",
            description: "Effect Shards and Gain Shards boost each other even more",
            unlocked() { return hasUpgrade("ad", 94) },
            cost: new ExpantaNum("e2e10"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        96:
        {
            title: "No more Constant Switching",
            description: "Produce Gain Shards and Effect Shards at the Same time",
            unlocked() { return hasUpgrade("ad", 95) },
            cost: new ExpantaNum("e4e12"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        97:
        {
            title: "The End is Near...",
            description: "Unlock Final Shards but turn off the other Autobuyers (For Performance)",
            unlocked() { return hasUpgrade("ad", 96) },
            cost: new ExpantaNum("e1e16"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        98:
        {
            title: "Finish the Layer",
            description: "Completes the Layer (FINALLY)",
            unlocked() { return hasUpgrade("ad", 96) },
            cost: new ExpantaNum("e1e100"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
        },
    },
        buyables:
    {
        11: {
        cost(x) { return new ExpantaNum(100).pow(player.ad.timewalls.div(20)).mul(100) },
        title: "Add a Timewall",
        unlocked() { return hasUpgrade("ad", 31)},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() 
        {
             if (player.ad.timewalltoggle < 1)
             {
             player[this.layer].timewalltoggle = new ExpantaNum(1)
                                                   if (!hasUpgrade("ad", 33))
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
            }
			 }
        },
                 display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Hevipelle Points";
         },
        },
        21: {
        cost(x) { return player.ad.dimension1cost.add(-10) },
        title: "1st Dimension",
        unlocked() { return hasUpgrade("ad", 35) || player.ad.dimboost >= 1 || player.ad.antimattergalaxies >= 1},
        canAfford() { return player.ad.antimatter.gte(this.cost()) },
        buy() {
             if (!hasUpgrade("ad", 41))
             {
                player[this.layer].antimatter = player[this.layer].antimatter.sub(this.cost())
             }
             player.ad.dimension1 = player.ad.dimension1.add(1)
             player.ad.dimension1mult = player.ad.dimension1mult.mul(player.ad.dimensionmult)
             player.ad.dimension1cost = player.ad.dimension1cost.mul(3)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Antimatter\n\
           Amount: " + format(player.ad.dimension1) + " 1st Dimensions\n\
           x" + format(player.ad.dimension1mult) + " multiplier";
         },
        },
        22: {
        cost(x) { return player.ad.dimension2cost },
        title: "2nd Dimension",
        unlocked() { return player.ad.dimension1 >= 5 || player.ad.dimboost >= 1 || player.ad.antimattergalaxies >= 1},
        canAfford() { return player.ad.antimatter.gte(this.cost()) },
        buy() {
                          if (!hasUpgrade("ad", 41))
             {
                player[this.layer].antimatter = player[this.layer].antimatter.sub(this.cost())
             }
             player.ad.dimension2 = player.ad.dimension2.add(1)
             player.ad.dimension2mult = player.ad.dimension2mult.mul(player.ad.dimensionmult)
             player.ad.dimension2cost = player.ad.dimension2cost.mul(4)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Antimatter\n\
           Amount: " + format(player.ad.dimension2) + " 2nd Dimensions\n\
           x" + format(player.ad.dimension2mult) + " multiplier";
         },
        },
        23: {
        cost(x) { return player.ad.dimension3cost },
        title: "3rd Dimension",
        unlocked() { return player.ad.dimension2 >= 5 || player.ad.dimboost >= 1 || player.ad.antimattergalaxies >= 1},
        canAfford() { return player.ad.antimatter.gte(this.cost()) },
        buy() {
                         if (!hasUpgrade("ad", 41))
             {
                player[this.layer].antimatter = player[this.layer].antimatter.sub(this.cost())
             }
             player.ad.dimension3 = player.ad.dimension3.add(1)
             player.ad.dimension3mult = player.ad.dimension3mult.mul(player.ad.dimensionmult)
             player.ad.dimension3cost = player.ad.dimension3cost.mul(5)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Antimatter\n\
           Amount: " + format(player.ad.dimension3) + " 3rd Dimensions\n\
           x" + format(player.ad.dimension3mult) + " multiplier";
         },
        },
        24: {
        cost(x) { return player.ad.dimension4cost },
        title: "4th Dimension",
        unlocked() { return player.ad.dimension3 >= 5 || player.ad.dimboost >= 1 || player.ad.antimattergalaxies >= 1},
        canAfford() { return player.ad.antimatter.gte(this.cost()) },
        buy() {
                          if (!hasUpgrade("ad", 41))
             {
                player[this.layer].antimatter = player[this.layer].antimatter.sub(this.cost())
             }
             player.ad.dimension4 = player.ad.dimension4.add(1)
             player.ad.dimension4mult = player.ad.dimension4mult.mul(player.ad.dimensionmult)
             player.ad.dimension4cost = player.ad.dimension4cost.mul(6)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Antimatter\n\
           Amount: " + format(player.ad.dimension4) + " 4th Dimensions\n\
           x" + format(player.ad.dimension4mult) + " multiplier";
         },
        },
                25: {
        cost(x) { return player.ad.dimension5cost },
        title: "5th Dimension",
        unlocked() { return player.ad.dimension4 >= 5 || player.ad.dimboost >= 1 || player.ad.antimattergalaxies >= 1},
        canAfford() { return player.ad.antimatter.gte(this.cost()) },
        buy() {
                          if (!hasUpgrade("ad", 41))
             {
                player[this.layer].antimatter = player[this.layer].antimatter.sub(this.cost())
             }
             player.ad.dimension5 = player.ad.dimension5.add(1)
             player.ad.dimension5mult = player.ad.dimension5mult.mul(player.ad.dimensionmult)
             player.ad.dimension5cost = player.ad.dimension5cost.mul(7)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Antimatter\n\
           Amount: " + format(player.ad.dimension5) + " 5th Dimensions\n\
           x" + format(player.ad.dimension5mult) + " multiplier";
         },
        },
                26: {
        cost(x) { return player.ad.dimension6cost },
        title: "6th Dimension",
        unlocked() { return player.ad.dimension5 >= 5 || player.ad.dimboost >= 1 || player.ad.antimattergalaxies >= 1},
        canAfford() { return player.ad.antimatter.gte(this.cost()) },
        buy() {
                          if (!hasUpgrade("ad", 41))
             {
                player[this.layer].antimatter = player[this.layer].antimatter.sub(this.cost())
             }
             player.ad.dimension6 = player.ad.dimension6.add(1)
             player.ad.dimension6mult = player.ad.dimension6mult.mul(player.ad.dimensionmult)
             player.ad.dimension6cost = player.ad.dimension6cost.mul(8)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Antimatter\n\
           Amount: " + format(player.ad.dimension6) + " 6th Dimensions\n\
           x" + format(player.ad.dimension6mult) + " multiplier";
         },
        },
                27: {
        cost(x) { return player.ad.dimension7cost },
        title: "7th Dimension",
        unlocked() { return player.ad.dimension6 >= 5 || player.ad.dimboost >= 1 || player.ad.antimattergalaxies >= 1},
        canAfford() { return player.ad.antimatter.gte(this.cost()) },
        buy() {
                          if (!hasUpgrade("ad", 41))
             {
                player[this.layer].antimatter = player[this.layer].antimatter.sub(this.cost())
             }
             player.ad.dimension7 = player.ad.dimension7.add(1)
             player.ad.dimension7mult = player.ad.dimension7mult.mul(player.ad.dimensionmult)
             player.ad.dimension7cost = player.ad.dimension7cost.mul(9)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Antimatter\n\
           Amount: " + format(player.ad.dimension7) + " 7th Dimensions\n\
           x" + format(player.ad.dimension7mult) + " multiplier";
         },
        },
                28: {
        cost(x) { return player.ad.dimension8cost},
        title: "8th Dimension",
        unlocked() { return player.ad.dimension7 >= 5 || player.ad.dimboost >= 1  || player.ad.antimattergalaxies >= 1},
        canAfford() { return player.ad.antimatter.gte(this.cost()) },
        buy() {
                          if (!hasUpgrade("ad", 41))
             {
                player[this.layer].antimatter = player[this.layer].antimatter.sub(this.cost())
             }
             player.ad.dimension8 = player.ad.dimension8.add(1)
             player.ad.dimension8mult = player.ad.dimension8mult.mul(player.ad.dimensionmult)
             player.ad.dimension8cost = player.ad.dimension8cost.mul(10)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Antimatter\n\
           Amount: " + format(player.ad.dimension8) + " 8th Dimensions\n\
           x" + format(player.ad.dimension8mult) + " multiplier";
         },
        },
        31: {
        cost(x) { return player.ad.dimboostreq},
        title: "Dimension Boost",
        unlocked() { return player.ad.dimension8 >= 5 || player.ad.dimboost >= 1 || player.ad.antimattergalaxies >= 1 || player.ad.infinitypoints > 0 },
        canAfford() { return player.ad.dimension8.gte(this.cost()) },
        buy() 
        {
             if (!hasUpgrade("ad", 43))
             {
                                  player.ad.antimatter = new ExpantaNum(0)
                     player.ad.dimension1 = new ExpantaNum(0)
             player.ad.dimension1mult = new ExpantaNum(1)
             player.ad.dimension1cost = new ExpantaNum(10) 
                          player.ad.dimension2 = new ExpantaNum(0)
             player.ad.dimension2mult = new ExpantaNum(1)
             player.ad.dimension2cost = new ExpantaNum(100) 
                          player.ad.dimension3 = new ExpantaNum(0)
             player.ad.dimension3mult = new ExpantaNum(1)
             player.ad.dimension3cost = new ExpantaNum(10000) 
                          player.ad.dimension4 = new ExpantaNum(0)
             player.ad.dimension4mult = new ExpantaNum(1)
             player.ad.dimension4cost = new ExpantaNum(1e6) 
                          player.ad.dimension5 = new ExpantaNum(0)
             player.ad.dimension5mult = new ExpantaNum(1)
             player.ad.dimension5cost = new ExpantaNum(1e9) 
                          player.ad.dimension6 = new ExpantaNum(0)
             player.ad.dimension6mult = new ExpantaNum(1)
             player.ad.dimension6cost = new ExpantaNum(1e12) 
                          player.ad.dimension7 = new ExpantaNum(0)
             player.ad.dimension7mult = new ExpantaNum(1)
             player.ad.dimension7cost = new ExpantaNum(1e16) 
             player.ad.dimension8 = new ExpantaNum(0)
             player.ad.dimension8mult = new ExpantaNum(1)
             player.ad.dimension8cost = new ExpantaNum(1e22) 
             }

             player.ad.dimboosteffect = player.ad.dimboosteffect.mul(2)
             player.ad.dimboost = player.ad.dimboost.add(1)
             player.ad.dimboostreq = player.ad.dimboostreq.add(5)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Requirement: " + format(data.cost) + " 8th Dimensions\n\
           Amount: " + format(player.ad.dimboost) + " Dimension Boosts\n\
           x" + format(player.ad.dimboosteffect) + " multiplier to all Dimensions";
         },
        },
        32: {
        cost(x) { return player.points },
        title: "Dimensional Sacrifice",
        unlocked() { return player.ad.dimboost >= 3  || player.ad.antimattergalaxies >= 1 || player.ad.infinitypoints > 0 },
        canAfford() { return player.ad.dimension8 >= 1 },
        buy() 
        {
        
             player.ad.sacrificestored = player.ad.sacrificestored.add(player.ad.antimatter)
             player.ad.antimatter = new ExpantaNum(0)
                     player.ad.dimension1 = new ExpantaNum(0)
                          player.ad.dimension2 = new ExpantaNum(0)
                          player.ad.dimension3 = new ExpantaNum(0)
                          player.ad.dimension4 = new ExpantaNum(0)
                          player.ad.dimension5 = new ExpantaNum(0)
                          player.ad.dimension6 = new ExpantaNum(0)
                          player.ad.dimension7 = new ExpantaNum(0) 
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "You lose all your dimensions before 8th dimension\n\
           x" + format(player.ad.sacrificemult) + " multiplier to 8th dimensions"
         },
        },
                33: {
        cost(x) { return player.ad.antimattergalaxiesreq },
        title: "Antimatter Galaxy",
        unlocked() { return player.ad.dimboost >= 8  || player.ad.antimattergalaxies >= 1 || player.ad.infinitypoints > 0 },
        canAfford() { return player.ad.dimension8.gte(this.cost()) },
        buy() 
        {
                     if (!hasUpgrade("ad", 43))
             {
                                  player.ad.antimatter = new ExpantaNum(0)
                     player.ad.dimension1 = new ExpantaNum(0)
             player.ad.dimension1mult = new ExpantaNum(1)
             player.ad.dimension1cost = new ExpantaNum(10) 
                          player.ad.dimension2 = new ExpantaNum(0)
             player.ad.dimension2mult = new ExpantaNum(1)
             player.ad.dimension2cost = new ExpantaNum(100) 
                          player.ad.dimension3 = new ExpantaNum(0)
             player.ad.dimension3mult = new ExpantaNum(1)
             player.ad.dimension3cost = new ExpantaNum(10000) 
                          player.ad.dimension4 = new ExpantaNum(0)
             player.ad.dimension4mult = new ExpantaNum(1)
             player.ad.dimension4cost = new ExpantaNum(1e6) 
                          player.ad.dimension5 = new ExpantaNum(0)
             player.ad.dimension5mult = new ExpantaNum(1)
             player.ad.dimension5cost = new ExpantaNum(1e9) 
                          player.ad.dimension6 = new ExpantaNum(0)
             player.ad.dimension6mult = new ExpantaNum(1)
             player.ad.dimension6cost = new ExpantaNum(1e12) 
                          player.ad.dimension7 = new ExpantaNum(0)
             player.ad.dimension7mult = new ExpantaNum(1)
             player.ad.dimension7cost = new ExpantaNum(1e16) 
             player.ad.dimension8 = new ExpantaNum(0)
             player.ad.dimension8mult = new ExpantaNum(1)
             player.ad.dimension8cost = new ExpantaNum(1e22) 

             player.ad.dimboostreq = new ExpantaNum(5)
             player.ad.dimboost = new ExpantaNum(0)
             player.ad.dimboosteffect = new ExpantaNum(1)

             player.ad.sacrificestored = new ExpantaNum(0)
             }

             if (player.ad.antimattergalaxies <= 10)
             {
             player.ad.antimattergalaxieseffect = player.ad.antimattergalaxieseffect.add(0.01)
             player.ad.dimensionmult = player.ad.dimensionmult.add(0.01)
             player.ad.antimattergalaxies = player.ad.antimattergalaxies.add(1)
             player.ad.antimattergalaxiesreq = player.ad.antimattergalaxiesreq.add(40)
             }
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Requirement: " + format(data.cost) + " 8th Dimensions\n\
           Amount: " + format(player.ad.antimattergalaxies) + "/11 Antimatter Galaxies\n\
           +x" + format(player.ad.antimattergalaxieseffect) + " multiplier on dimension purchase";
         },
        },
        34: {
        cost(x) { return new ExpantaNum(1e50).pow(x.div(5)).mul(1e50) },
        title: "Production Booster",
        unlocked() { return player.ad.antimattergalaxies >= 1  || player.ad.infinitypoints > 0 },
        canAfford() { return player.ad.antimatter.gte(this.cost()) },
        buy() {
                             if (!hasUpgrade("ad", 43))
             {
                 player.ad.antimatter = player.ad.antimatter.sub(this.cost())
             }
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Points\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to all Dimensions";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].add(1).pow(1.5)
        },
        },
                        41: {
        cost(x) { return new ExpantaNum(1.79e308) },
        title: "Get Infinity Points",
        unlocked() { return player.ad.dimboost >= 8  || player.ad.antimattergalaxies >= 1 || player.ad.infinitypoints > 0 },
        canAfford() { return player.ad.antimatter.gte(this.cost()) },
        buy() 
        {
                     player.ad.antimatter = new ExpantaNum(0)
                     player.ad.dimension1 = new ExpantaNum(0)
             player.ad.dimension1mult = new ExpantaNum(1)
             player.ad.dimension1cost = new ExpantaNum(10) 
                          player.ad.dimension2 = new ExpantaNum(0)
             player.ad.dimension2mult = new ExpantaNum(1)
             player.ad.dimension2cost = new ExpantaNum(100) 
                          player.ad.dimension3 = new ExpantaNum(0)
             player.ad.dimension3mult = new ExpantaNum(1)
             player.ad.dimension3cost = new ExpantaNum(10000) 
                          player.ad.dimension4 = new ExpantaNum(0)
             player.ad.dimension4mult = new ExpantaNum(1)
             player.ad.dimension4cost = new ExpantaNum(1e6) 
                          player.ad.dimension5 = new ExpantaNum(0)
             player.ad.dimension5mult = new ExpantaNum(1)
             player.ad.dimension5cost = new ExpantaNum(1e9) 
                          player.ad.dimension6 = new ExpantaNum(0)
             player.ad.dimension6mult = new ExpantaNum(1)
             player.ad.dimension6cost = new ExpantaNum(1e12) 
                          player.ad.dimension7 = new ExpantaNum(0)
             player.ad.dimension7mult = new ExpantaNum(1)
             player.ad.dimension7cost = new ExpantaNum(1e16) 
             player.ad.dimension8 = new ExpantaNum(0)
             player.ad.dimension8mult = new ExpantaNum(1)
             player.ad.dimension8cost = new ExpantaNum(1e22) 

             player.ad.dimboostreq = new ExpantaNum(5)
             player.ad.dimboost = new ExpantaNum(0)
             player.ad.dimboosteffect = new ExpantaNum(1)

             player.ad.sacrificestored = new ExpantaNum(0)

             player.ad.antimattergalaxieseffect = new ExpantaNum(0)
             player.ad.dimensionmult = new ExpantaNum(1.07)
             player.ad.antimattergalaxies = new ExpantaNum(0)
             player.ad.antimattergalaxiesreq = new ExpantaNum(40)

             player.ad.buyables[34].amount = new ExpantaNum(0)

             player.ad.infinitypoints = player.ad.infinitypoints.add(player.ad.infinitypointstoget)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "+" + format(player.ad.infinitypointstoget) + " Infinity Poins on reset";
         },
        },
        42: {
        cost(x) { return player.ad.ipdoublercost },
        title: "Infinity Points Doubler",
        unlocked() { return hasUpgrade("ad", 45)},
        canAfford() { return player.ad.infinitypoints.gte(this.cost()) },
        buy() {
             player[this.layer].infinitypoints = player[this.layer].infinitypoints.sub(this.cost())
             player.ad.ipdoubler = player.ad.ipdoubler.add(1)
             player.ad.ipdoublereffect = player.ad.ipdoublereffect.mul(2)
             player.ad.ipdoublercost = player.ad.ipdoublercost.mul(10)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Infinity Points\n\
           Amount: " + format(player.ad.ipdoubler) + " Infinity Point Doublers\n\
           x" + format(player.ad.ipdoublereffect) + " multiplier to Infinity Points";
         },
        },
        51: {
        cost(x) { return player.ad.infinitydimension1cost },
        title: "1st Infinity Dimension",
        unlocked() { return hasUpgrade("ad", 45)},
        canAfford() { return player.ad.infinitypoints.gte(this.cost()) },
        buy() {
             player[this.layer].infinitypoints = player[this.layer].infinitypoints.sub(this.cost())
             player.ad.infinitydimension1 = player.ad.infinitydimension1.add(1)
             player.ad.infinitydimension1mult = player.ad.infinitydimension1mult.mul(player.ad.infinitydimensionmult)
             player.ad.infinitydimension1cost = player.ad.infinitydimension1cost.mul(100)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Infinity Points\n\
           Amount: " + format(player.ad.infinitydimension1) + " 1st Infinity Dimensions\n\
           x" + format(player.ad.infinitydimension1mult) + " multiplier";
         },
        },
        52: {
        cost(x) { return player.ad.infinitydimension2cost },
        title: "2nd Infinity Dimension",
        unlocked() { return hasUpgrade("ad", 45)},
        canAfford() { return player.ad.infinitypoints.gte(this.cost()) },
        buy() {
             player[this.layer].infinitypoints = player[this.layer].infinitypoints.sub(this.cost())
             player.ad.infinitydimension2 = player.ad.infinitydimension2.add(1)
             player.ad.infinitydimension2mult = player.ad.infinitydimension2mult.mul(player.ad.infinitydimensionmult)
             player.ad.infinitydimension2cost = player.ad.infinitydimension2cost.mul(1000)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Infinity Points\n\
           Amount: " + format(player.ad.infinitydimension2) + " 2nd Infinity Dimensions\n\
           x" + format(player.ad.infinitydimension2mult) + " multiplier";
         },
        },
        53: {
        cost(x) { return player.ad.infinitydimension3cost },
        title: "3rd Infinity Dimension",
        unlocked() { return hasUpgrade("ad", 46)},
        canAfford() { return player.ad.infinitypoints.gte(this.cost()) },
        buy() {
             player[this.layer].infinitypoints = player[this.layer].infinitypoints.sub(this.cost())
             player.ad.infinitydimension3 = player.ad.infinitydimension3.add(1)
             player.ad.infinitydimension3mult = player.ad.infinitydimension3mult.mul(player.ad.infinitydimensionmult)
             player.ad.infinitydimension3cost = player.ad.infinitydimension3cost.mul(10000)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Infinity Points\n\
           Amount: " + format(player.ad.infinitydimension3) + " 3rd Infinity Dimensions\n\
           x" + format(player.ad.infinitydimension3mult) + " multiplier";
         },
        },
        54: {
        cost(x) { return player.ad.infinitydimension4cost },
        title: "4th Infinity Dimension",
        unlocked() { return hasUpgrade("ad", 46)},
        canAfford() { return player.ad.infinitypoints.gte(this.cost()) },
        buy() {
             player[this.layer].infinitypoints = player[this.layer].infinitypoints.sub(this.cost())
             player.ad.infinitydimension4 = player.ad.infinitydimension4.add(1)
             player.ad.infinitydimension4mult = player.ad.infinitydimension4mult.mul(player.ad.infinitydimensionmult)
             player.ad.infinitydimension4cost = player.ad.infinitydimension4cost.mul(100000)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Infinity Points\n\
           Amount: " + format(player.ad.infinitydimension4) + " 4th Infinity Dimensions\n\
           x" + format(player.ad.infinitydimension4mult) + " multiplier";
         },
        },
        61: {
        cost(x) { return new ExpantaNum(1e8).pow(x.div(70)).mul(1e8) },
        title: "Replicanti Time Booster",
        unlocked() { return player.ad.antimattergalaxies >= 1  || player.ad.infinitypoints > 0 },
        canAfford() { return player.ad.infinitypoints.gte(this.cost()) },
        buy() {
            if (player.ad.buyables[61] < 60)
            {
            player.ad.infinitypoints = player.ad.infinitypoints.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            player.ad.replicantitimeboost = player.ad.replicantitimeboost.mul(1.1)
			}
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Infinity Points\n\
           Amount: " + player[this.layer].buyables[this.id] + "/60 \n\
           x" + format(player.ad.replicantitimeboost) + " boost to Replicanti Time";
         },
        },
        62: {
        cost(x) { return new ExpantaNum("1.797e308") },
        title: "Singularity",
        unlocked() { return player.ad.singularities >= 1  || player.ad.replicanti > 1.79e308 },
        canAfford() { return player.ad.replicanti.gte(this.cost()) },
        buy() {
            player.ad.singularities = player.ad.singularities.add(1)
            player.ad.replicanti = new ExpantaNum(0)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Reset your Replicanti for a Singularity";
         },
        },
        71: {
        cost(x) { return player.ad.omegadimension1cost },
        title: "1st Omega Dimension",
        unlocked() { return hasUpgrade("ad", 61)},
        canAfford() { return player.ad.blackholes.gte(this.cost()) },
        buy() {
             player[this.layer].blackholes = player[this.layer].blackholes.sub(this.cost())
             player.ad.omegadimension1 = player.ad.omegadimension1.add(1)
             player.ad.omegadimension1mult = player.ad.omegadimension1mult.mul(player.ad.omegadimensionmult)
             player.ad.omegadimension1cost = player.ad.omegadimension1cost.mul(4)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Black Holes\n\
           Amount: " + format(player.ad.omegadimension1) + " 1st Omega Dimensions\n\
           x" + format(player.ad.omegadimension1mult) + " multiplier";
         },
        },
        72: {
        cost(x) { return player.ad.omegadimension2cost },
        title: "2nd Omega Dimension",
        unlocked() { return hasUpgrade("ad", 61)},
        canAfford() { return player.ad.blackholes.gte(this.cost()) },
        buy() {
             player[this.layer].blackholes = player[this.layer].blackholes.sub(this.cost())
             player.ad.omegadimension2 = player.ad.omegadimension2.add(1)
             player.ad.omegadimension2mult = player.ad.omegadimension2mult.mul(player.ad.omegadimensionmult)
             player.ad.omegadimension2cost = player.ad.omegadimension2cost.mul(6)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Black Holes\n\
           Amount: " + format(player.ad.omegadimension2) + " 2nd Omega Dimensions\n\
           x" + format(player.ad.omegadimension2mult) + " multiplier";
         },
        },
        73: {
        cost(x) { return player.ad.omegadimension3cost },
        title: "3rd Omega Dimension",
        unlocked() { return hasUpgrade("ad", 61)},
        canAfford() { return player.ad.blackholes.gte(this.cost()) },
        buy() {
             player[this.layer].blackholes = player[this.layer].blackholes.sub(this.cost())
             player.ad.omegadimension3 = player.ad.omegadimension3.add(1)
             player.ad.omegadimension3mult = player.ad.omegadimension3mult.mul(player.ad.omegadimensionmult)
             player.ad.omegadimension3cost = player.ad.omegadimension3cost.mul(8)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Black Holes\n\
           Amount: " + format(player.ad.omegadimension3) + " 3rd Omega Dimensions\n\
           x" + format(player.ad.omegadimension3mult) + " multiplier";
         },
        },
        74: {
        cost(x) { return player.ad.omegadimension4cost },
        title: "4th Omega Dimension",
        unlocked() { return hasUpgrade("ad", 61)},
        canAfford() { return player.ad.blackholes.gte(this.cost()) },
        buy() {
             player[this.layer].blackholes = player[this.layer].blackholes.sub(this.cost())
             player.ad.omegadimension4 = player.ad.omegadimension4.add(1)
             player.ad.omegadimension4mult = player.ad.omegadimension4mult.mul(player.ad.omegadimensionmult)
             player.ad.omegadimension4cost = player.ad.omegadimension4cost.mul(10)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Black Holes\n\
           Amount: " + format(player.ad.omegadimension4) + " 4th Omega Dimensions\n\
           x" + format(player.ad.omegadimension4mult) + " multiplier";
         },
        },
        75: {
        cost(x) { return player.ad.singularitydoublercost },
        title: "Singularity Doubler",
        unlocked() { return hasUpgrade("ad", 63)},
        canAfford() { return player.ad.singularities.gte(this.cost()) },
        buy() {
             player[this.layer].singularities = player[this.layer].singularities.sub(this.cost())
             player.ad.singularitydoubler = player.ad.singularitydoubler.add(1)
             player.ad.singularitydoublereffect = player.ad.singularitydoublereffect.mul(2)
             player.ad.singularitydoublercost = player.ad.singularitydoublercost.mul(10)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Singularities\n\
           Amount: " + format(player.ad.singularitydoubler) + " Singularity Doublers\n\
           x" + format(player.ad.singularitydoublereffect) + " multiplier to Singularities";
         },
        },
        76: {
        cost(x) { return player.ad.blackholedoublercost },
        title: "Black Hole Doubler",
        unlocked() { return hasUpgrade("ad", 63)},
        canAfford() { return player.ad.blackholes.gte(this.cost()) },
        buy() {
             player[this.layer].blackholes = player[this.layer].blackholes.sub(this.cost())
             player.ad.blackholedoubler = player.ad.blackholedoubler.add(1)
             player.ad.blackholedoublereffect = player.ad.blackholedoublereffect.mul(2)
             player.ad.blackholedoublercost = player.ad.blackholedoublercost.mul(10)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Black Holes\n\
           Amount: " + format(player.ad.blackholedoubler) + " Black Hole Doublers\n\
           x" + format(player.ad.blackholedoublereffect) + " multiplier to Black Holes";
         },
        },
        81: {
        cost(x) { return player.ad.subatomicdimension1cost },
        title: "1st Subatomic Dimension",
        unlocked() { return hasUpgrade("ad", 68)},
        canAfford() { return player.ad.electronicdimension.gte(this.cost()) },
        buy() {
             player[this.layer].electronicdimension = player[this.layer].electronicdimension.sub(this.cost())
             player.ad.subatomicdimension1 = player.ad.subatomicdimension1.add(1)
             player.ad.subatomicdimension1mult = player.ad.subatomicdimension1mult.mul(player.ad.subatomicdimensionmult)
             player.ad.subatomicdimension1cost = player.ad.subatomicdimension1cost.mul(2)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Electronic Dimensions\n\
           Amount: " + format(player.ad.subatomicdimension1) + " 1st Subatomic Dimensions\n\
           x" + format(player.ad.subatomicdimension1mult) + " multiplier";
         },
        },
        82: {
        cost(x) { return player.ad.subatomicdimension2cost },
        title: "2nd Subatomic Dimension",
        unlocked() { return hasUpgrade("ad", 68)},
        canAfford() { return player.ad.electronicdimension.gte(this.cost()) },
        buy() {
             player[this.layer].electronicdimension = player[this.layer].electronicdimension.sub(this.cost())
             player.ad.subatomicdimension2 = player.ad.subatomicdimension2.add(1)
             player.ad.subatomicdimension2mult = player.ad.subatomicdimension2mult.mul(player.ad.subatomicdimensionmult)
             player.ad.subatomicdimension2cost = player.ad.subatomicdimension2cost.mul(3.5)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Electronic Dimensions\n\
           Amount: " + format(player.ad.subatomicdimension2) + " 2nd Subatomic Dimensions\n\
           x" + format(player.ad.subatomicdimension2mult) + " multiplier";
         },
        },
        83: {
        cost(x) { return player.ad.subatomicdimension3cost },
        title: "3rd Subatomic Dimension",
        unlocked() { return hasUpgrade("ad", 68)},
        canAfford() { return player.ad.electronicdimension.gte(this.cost()) },
        buy() {
             player[this.layer].electronicdimension = player[this.layer].electronicdimension.sub(this.cost())
             player.ad.subatomicdimension3 = player.ad.subatomicdimension3.add(1)
             player.ad.subatomicdimension3mult = player.ad.subatomicdimension3mult.mul(player.ad.subatomicdimensionmult)
             player.ad.subatomicdimension3cost = player.ad.subatomicdimension3cost.mul(5)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Electronic Dimensions\n\
           Amount: " + format(player.ad.subatomicdimension3) + " 3rd Subatomic Dimensions\n\
           x" + format(player.ad.subatomicdimension3mult) + " multiplier";
         },
        },
        91: {
        cost(x) { return player.ad.atomdoublercost },
        title: "Atom Doubler",
        unlocked() { return hasUpgrade("ad", 71)},
        canAfford() { return player.ad.atoms.gte(this.cost()) },
        buy() {
        if (player.ad.atomdoubler < 1000)
             {
                          player[this.layer].atoms = player[this.layer].atoms.sub(this.cost())
             player.ad.atomdoubler = player.ad.atomdoubler.add(1)
             player.ad.atomdoublereffect = player.ad.atomdoublereffect.mul(2)
             player.ad.atomdoublercost = player.ad.atomdoublercost.mul(10)
			 }
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Atoms\n\
           Amount: " + format(player.ad.atomdoubler) + "/1000 Atom Doublers\n\
           x" + format(player.ad.atomdoublereffect) + " multiplier to Atoms";
         },
        },
        92: {
        cost(x) { return player.ad.replicantiboostercost },
        title: "Replicanti Booster",
        unlocked() { return hasUpgrade("ad", 71)},
        canAfford() { return player.ad.atoms.gte(this.cost()) },
        buy() {
             player[this.layer].atoms = player[this.layer].atoms.sub(this.cost())
             player.ad.replicantibooster = player.ad.replicantibooster.add(1)
             player.ad.replicantiboostereffect = player.ad.replicantiboostereffect.mul(100)
             player.ad.replicantiboostercost = player.ad.replicantiboostercost.mul(1.5)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Atoms\n\
           Amount: " + format(player.ad.replicantibooster) + " Replicanti Boosters\n\
           x" + format(player.ad.replicantiboostereffect) + " multiplier to Replicanti";
         },
        },
        93: {
        cost(x) { return new ExpantaNum(100) },
        title: "Start producing Universes",
        unlocked() { return true },
        canAfford() { return true },
        buy() {
            player.ad.universetoggle = new ExpantaNum(1)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Universes Per Second: " + format(player.ad.universespersecond);
         },
        effect() 
        {
            return player[this.layer].buyables[this.id]
        },
        },
        94: {
        cost(x) { return new ExpantaNum(100) },
        title: "Stop producing Universes",
        unlocked() { return true },
        canAfford() { return true },
        buy() {
            player.ad.universetoggle = new ExpantaNum(0)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id]
        },
        },
        95: {
        cost(x) { return new ExpantaNum(100) },
        title: "Start producing Gain Shards",
        unlocked() { return hasUpgrade("ad", 92) },
        canAfford() { return true },
        buy() {
            player.ad.shardtoggle = new ExpantaNum(0)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Gain Shards Per Second: " + format(player.ad.gainshardspersecond);
         },
        effect() 
        {
            return player[this.layer].buyables[this.id]
        },
        },
        96: {
        cost(x) { return new ExpantaNum(100) },
        title: "Start producing Effect Shards",
        unlocked() { return hasUpgrade("ad", 92) },
        canAfford() { return true },
        buy() {
            player.ad.shardtoggle = new ExpantaNum(1)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Effect Shards Per Second: " + format(player.ad.effectshardspersecond);
         },
        effect() 
        {
            return player[this.layer].buyables[this.id]
        },
        },
    },
        bars: {
        antimatterbar: {
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                return player.ad.antimatter.plus(10).log10().log10().div(100)
            },
            fillStyle: {
                "background-color": "#4BDF34",
            },
            display() {
                return "<h5>Amount of Existence Converted to Antimatter<br/>" + format(player.ad.antimatter.plus(10).log10().log10()) + "% / 100.00%</h5>";
            },
        },
    },
            update(delta) 
        {
            let linesofcodegamejsgain = new ExpantaNum(0)
            if (hasUpgrade("ad", 21)) linesofcodegamejsgain = linesofcodegamejsgain.add(upgradeEffect("ad", 21))
            linesofcodegamejsgain = linesofcodegamejsgain.mul(player.ad.linesofcodeautobuyerjseffect)
            if (hasUpgrade("l", 41)) linesofcodegamejsgain = linesofcodegamejsgain.mul(upgradeEffect("l", 41))
            linesofcodegamejsgain = linesofcodegamejsgain.mul(player.ad.timewalleffect)
            if (hasUpgrade("l", 52)) linesofcodegamejsgain = linesofcodegamejsgain.mul(upgradeEffect("l", 52))
            player.ad.linesofcodegamejs = player.ad.linesofcodegamejs.add(linesofcodegamejsgain.mul(delta))

            player.ad.linesofcodegamejseffect = player.ad.linesofcodegamejs.add(1).pow(0.20)

            let linesofcodeautobuyerjsgain = new ExpantaNum(0)
            if (hasUpgrade("ad", 22)) linesofcodeautobuyerjsgain = linesofcodeautobuyerjsgain.add(upgradeEffect("ad", 22))
            linesofcodeautobuyerjsgain = linesofcodeautobuyerjsgain.mul(player.ad.linesofcodebreakinfinityjseffect)
            if (hasUpgrade("l", 42)) linesofcodeautobuyerjsgain = linesofcodeautobuyerjsgain.mul(upgradeEffect("l", 42))
            linesofcodeautobuyerjsgain = linesofcodeautobuyerjsgain.mul(player.ad.timewalleffect)
            if (hasUpgrade("l", 53)) linesofcodeautobuyerjsgain = linesofcodeautobuyerjsgain.mul(upgradeEffect("l", 53))
            player.ad.linesofcodeautobuyerjs = player.ad.linesofcodeautobuyerjs.add(linesofcodeautobuyerjsgain.mul(delta))

            player.ad.linesofcodeautobuyerjseffect = player.ad.linesofcodeautobuyerjs.add(1).pow(0.20)

            let linesofcodebreakinfinityjsgain = new ExpantaNum(0)
            if (hasUpgrade("ad", 23)) linesofcodebreakinfinityjsgain = linesofcodebreakinfinityjsgain.add(upgradeEffect("ad", 23))
            if (hasUpgrade("l", 43)) linesofcodebreakinfinityjsgain = linesofcodebreakinfinityjsgain.mul(upgradeEffect("l", 43))
            linesofcodebreakinfinityjsgain = linesofcodebreakinfinityjsgain.mul(player.ad.timewalleffect)
            if (hasUpgrade("l", 54)) linesofcodebreakinfinityjsgain = linesofcodebreakinfinityjsgain.mul(upgradeEffect("l", 54))
            player.ad.linesofcodebreakinfinityjs = player.ad.linesofcodebreakinfinityjs.add(linesofcodebreakinfinityjsgain.mul(delta))

            player.ad.linesofcodebreakinfinityjseffect = player.ad.linesofcodebreakinfinityjs.add(1).pow(0.20)

            let timewallmult = new ExpantaNum(1)
            if (hasUpgrade("ad", 32)) timewallmult = timewallmult.mul(3)
            if (hasUpgrade("ad", 36)) timewallmult = timewallmult.mul(2)
            if (hasUpgrade("ad", 37)) timewallmult = timewallmult.mul(2)
            if (hasUpgrade("ad", 38)) timewallmult = timewallmult.mul(10)
            if (hasUpgrade("ad", 52)) timewallmult = timewallmult.mul(10)
            if (hasUpgrade("ad", 53)) timewallmult = timewallmult.mul(15)
            player.ad.timewalltime = player.ad.timewalltime.add(player.ad.timewalltoggle.mul(timewallmult).mul(delta))

            let timewalleffectmult = new ExpantaNum(1)
            if (hasUpgrade("ad", 39)) timewalleffectmult = timewalleffectmult.mul(upgradeEffect("ad", 39))
            if (hasUpgrade("ad", 64)) timewalleffectmult = timewalleffectmult.mul(upgradeEffect("ad", 64))

            player.ad.timewalleffect = player.ad.timewalls.add(1).pow(0.7).mul(timewalleffectmult)

            if (player.ad.timewalltime > 60)
            {
                player.ad.timewalltoggle = new ExpantaNum(0)
                player.ad.timewalls = player.ad.timewalls.add(1)
                player.ad.timewalltime = new ExpantaNum(0)
			}

            let antimattermult = new ExpantaNum(1)
            if (hasUpgrade("l", 62)) antimattermult = antimattermult.mul(upgradeEffect("l", 62))
            if (hasUpgrade("l", 71)) antimattermult = antimattermult.mul(upgradeEffect("l", 71))
            if (hasUpgrade("ad", 47)) antimattermult = antimattermult.mul(upgradeEffect("ad", 47))

            let alldimsmult = new ExpantaNum(1)
            if (hasUpgrade("ad", 101)) alldimsmult = alldimsmult.mul(100)
            if (hasUpgrade("ad", 44)) alldimsmult = alldimsmult.mul(upgradeEffect("ad", 44))
            if (hasUpgrade("ad", 102)) alldimsmult = alldimsmult.mul(1000)

            player.ad.antimatter = player.ad.antimatter.add(player.ad.dimension1.mul(player.ad.dimension1mult).mul(player.ad.dimboosteffect).mul(antimattermult).mul(buyableEffect("ad", 34)).mul(alldimsmult).mul(player.ad.infinitypowereffect).mul(delta))
            player.ad.dimension1 = player.ad.dimension1.add(player.ad.dimension2.mul(player.ad.dimension2mult).mul(player.ad.dimboosteffect).mul(buyableEffect("ad", 34)).mul(alldimsmult).mul(player.ad.infinitypowereffect).mul(delta))
            player.ad.dimension2 = player.ad.dimension2.add(player.ad.dimension3.mul(player.ad.dimension3mult).mul(player.ad.dimboosteffect).mul(buyableEffect("ad", 34)).mul(alldimsmult).mul(player.ad.infinitypowereffect).mul(delta))
            player.ad.dimension3 = player.ad.dimension3.add(player.ad.dimension4.mul(player.ad.dimension4mult).mul(player.ad.dimboosteffect).mul(buyableEffect("ad", 34)).mul(alldimsmult).mul(player.ad.infinitypowereffect).mul(delta))
            player.ad.dimension4 = player.ad.dimension4.add(player.ad.dimension5.mul(player.ad.dimension5mult).mul(player.ad.dimboosteffect).mul(buyableEffect("ad", 34)).mul(alldimsmult).mul(player.ad.infinitypowereffect).mul(delta))
            player.ad.dimension5 = player.ad.dimension5.add(player.ad.dimension6.mul(player.ad.dimension6mult).mul(player.ad.dimboosteffect).mul(buyableEffect("ad", 34)).mul(alldimsmult).mul(player.ad.infinitypowereffect).mul(delta))
            player.ad.dimension6 = player.ad.dimension6.add(player.ad.dimension7.mul(player.ad.dimension7mult).mul(player.ad.dimboosteffect).mul(buyableEffect("ad", 34)).mul(alldimsmult).mul(player.ad.infinitypowereffect).mul(delta))
            player.ad.dimension7 = player.ad.dimension7.add(player.ad.dimension8.mul(player.ad.dimension8mult).mul(player.ad.dimboosteffect).mul(buyableEffect("ad", 34)).mul(player.ad.sacrificemult).mul(player.ad.minidimension1effect).mul(alldimsmult).mul(player.ad.infinitypowereffect).mul(delta))

             if (hasUpgrade("ad", 42))
            {
                        player.ad.minidimension1 = player.ad.minidimension1.add(player.ad.minidimension2.mul(player.ad.singularityeffect2).mul(delta))
            player.ad.minidimension2 = player.ad.minidimension2.add(player.ad.minidimension3.mul(player.ad.singularityeffect2).mul(delta))
            player.ad.minidimension3 = player.ad.minidimension3.add(player.ad.minidimension4.mul(player.ad.singularityeffect2).mul(delta))
            player.ad.minidimension4 = player.ad.minidimension4.add(player[this.layer].dimension8mult.mul(player.ad.singularityeffect2).mul(delta))
            }
            player.ad.minidimension1effect = player.ad.minidimension1.add(1).pow(0.25)
            
            player.ad.antimattereffect = player.ad.antimatter.add(1)

            player.ad.sacrificemult = player.ad.sacrificestored.add(1).pow(0.05)

            let infinitymult = new ExpantaNum(1)
            if (hasUpgrade("ad", 48)) infinitymult = infinitymult.mul(upgradeEffect("ad", 48))
            if (hasUpgrade("ad", 49)) infinitymult = infinitymult.mul(10)
            if (hasUpgrade("ad", 49)) infinitymult = infinitymult.mul(10)
            if (hasUpgrade("l", 81)) infinitymult = infinitymult.mul(upgradeEffect("l", 81))
            if (hasUpgrade("ad", 56)) infinitymult = infinitymult.mul(upgradeEffect("ad", 56))
            infinitymult = infinitymult.mul(player.ad.blackholeseffect)
            infinitymult = infinitymult.mul(player.ad.protoneffect)

            player.ad.infinitypointstoget = player.ad.antimatter.div(1.79e308).plus(10).log10().pow(0.3).mul(player.ad.ipdoublereffect).mul(infinitymult)

            if (hasUpgrade("ad", 43))
            {
                player.ad.sacrificestored = player.ad.sacrificestored.add(player.ad.antimatter.mul(delta))     
			}
            if (hasUpgrade("ad", 46))
            {
                player.ad.infinitypoints = player.ad.infinitypoints.add(player.ad.infinitypointstoget.div(2).mul(delta))     
			}

            let infinitydimensionmult = new ExpantaNum(1)
            if (hasUpgrade("ad", 49)) infinitydimensionmult = infinitydimensionmult.mul(10)
            if (hasUpgrade("l", 82)) infinitymult = infinitymult.mul(upgradeEffect("l", 82))

            player.ad.infinitypower = player.ad.infinitypower.add(player.ad.infinitydimension1.mul(player.ad.infinitydimension1mult.mul(infinitydimensionmult).mul(player.ad.replicantieffect).mul(player.ad.singularityeffect).mul(delta)))
            player.ad.infinitydimension1 = player.ad.infinitydimension1.add(player.ad.infinitydimension2.mul(player.ad.infinitydimension2mult.mul(infinitydimensionmult).mul(player.ad.replicantieffect).mul(player.ad.singularityeffect).mul(delta)))
            player.ad.infinitydimension2 = player.ad.infinitydimension2.add(player.ad.infinitydimension3.mul(player.ad.infinitydimension3mult.mul(infinitydimensionmult).mul(player.ad.replicantieffect).mul(player.ad.singularityeffect).mul(delta)))
            player.ad.infinitydimension3 = player.ad.infinitydimension3.add(player.ad.infinitydimension4.mul(player.ad.infinitydimension4mult.mul(infinitydimensionmult).mul(player.ad.replicantieffect).mul(player.ad.singularityeffect).mul(delta)))

            player.ad.infinitypowereffect = player.ad.infinitypower.pow(2.5).add(1)

            let replicantitimegain = new ExpantaNum(1)
            replicantitimegain = replicantitimegain.mul(player.ad.replicantitimeboost)
            let replicantimultboost = new ExpantaNum(1)
            if (hasUpgrade("ad", 63)) replicantimultboost = replicantimultboost.mul(upgradeEffect("ad", 63))
            if (hasUpgrade("ad", 69)) replicantimultboost = replicantimultboost.mul(1e50)
            replicantimultboost = replicantimultboost.mul(player.ad.replicantiboostereffect)
            replicantimultboost = replicantimultboost.mul(player.ad.electroneffect)
            replicantimultboost = replicantimultboost.mul(player.ad.atomeffect)
            if (hasUpgrade("ad", 51))
            {
                        if (player.ad.replicanti > 1.797e308)
                        {
                                            if (!hasUpgrade("ad", 57))
                                            {
                                                player.ad.replicanti = new ExpantaNum(1.797e308)
                                            }
                        }
                player.ad.replicantitime = player.ad.replicantitime.add(replicantitimegain.mul(delta))
                if (player.ad.replicantitime > 5)
                {
                    if (!hasUpgrade("ad", 54))
                    {
                       player.ad.replicanti = player.ad.replicanti.add(1)
                       player.ad.replicanti = player.ad.replicanti.mul(1.1)
                       player.ad.replicantitime = new ExpantaNum(0)
					}
                    if (hasUpgrade("ad", 54))
                    {
                                       if (!hasUpgrade("ad", 55))
                                       {
                                          player.ad.replicanti = player.ad.replicanti.add(1)
                                          player.ad.replicanti = player.ad.replicanti.mul(2)
                                          player.ad.replicantitime = new ExpantaNum(0)
                                       }
                                       if (hasUpgrade("ad", 55))
                                       {
                                          player.ad.replicanti = player.ad.replicanti.add(1)
                                          player.ad.replicanti = player.ad.replicanti.mul(5).mul(replicantimultboost)
                                          player.ad.replicantitime = new ExpantaNum(0)
                                       }
					}
				}
			}
            player.ad.replicantieffect = player.ad.replicanti.add(1).pow(1.1)
            player.ad.singularityeffect = player.ad.singularities.add(1).pow(125)
            player.ad.singularityeffect2 = player.ad.singularities.add(1).pow(1250)
            let singularitygain = new ExpantaNum(0.1)
            if (hasUpgrade("ad", 58)) singularitygain = singularitygain.mul(upgradeEffect("ad", 58))
            singularitygain = singularitygain.mul(player.ad.singularitydoublereffect)
            singularitygain = singularitygain.mul(player.ad.blackholeseffect)
            if (hasUpgrade("ad", 57))
            {
                player.ad.singularities = player.ad.singularities.add(singularitygain.mul(delta))
            }
            let blackholemult = new ExpantaNum(1)
            blackholemult = blackholemult.mul(player.ad.omegapowereffect)
            blackholemult = blackholemult.mul(player.ad.blackholedoublereffect)
            if (hasUpgrade("ad", 61))
            {
                player.ad.blackholes = player.ad.blackholes.add(player.ad.blackholestoget.mul(blackholemult).mul(delta))
            }
            player.ad.blackholestoget = player.ad.infinitypoints.plus(10).log10().mul(100)
            player.ad.blackholeseffect = player.ad.blackholes.add(1).pow(0.9)

            let omegadimensionmult = new ExpantaNum(1)
            if (hasUpgrade("ad", 65)) omegadimensionmult = omegadimensionmult.mul(upgradeEffect("ad", 65))
            omegadimensionmult = omegadimensionmult.mul(player.ad.neutroneffect)

            player.ad.omegapowereffect = player.ad.omegapower.add(1).pow(0.95)
            player.ad.omegapower = player.ad.omegapower.add(player.ad.omegadimension1.mul(player.ad.omegadimension1mult.mul(omegadimensionmult).mul(delta)))
            player.ad.omegadimension1 = player.ad.omegadimension1.add(player.ad.omegadimension2.mul(player.ad.omegadimension2mult.mul(omegadimensionmult).mul(delta)))
            player.ad.omegadimension2 = player.ad.omegadimension2.add(player.ad.omegadimension3.mul(player.ad.omegadimension3mult.mul(omegadimensionmult).mul(delta)))
            player.ad.omegadimension3 = player.ad.omegadimension3.add(player.ad.omegadimension4.mul(player.ad.omegadimension4mult.mul(omegadimensionmult).mul(delta)))

            let electronicdimensiongain = new ExpantaNum(1)
            player.ad.protonicdimension = player.ad.protonicdimension.add(player.ad.neutronicdimension.mul(player.ad.subatomicpowereffect).mul(player.ad.atomeffect).mul(delta))
            player.ad.neutronicdimension = player.ad.neutronicdimension.add(player.ad.electronicdimension.mul(player.ad.subatomicpowereffect).mul(player.ad.atomeffect).mul(delta))
            if (hasUpgrade("ad", 67)) player.ad.electronicdimension = player.ad.electronicdimension.add(electronicdimensiongain.mul(player.ad.subatomicpowereffect).mul(player.ad.atomeffect).mul(delta))

            let protonmult = new ExpantaNum(1)
            if (hasUpgrade("l", 91)) protonmult = protonmult.mul(upgradeEffect("l", 91))
            if (hasUpgrade("ad", 71)) protonmult = protonmult.mul(player.ad.subatomicpowereffect)
            let neutronmult = new ExpantaNum(1)
            if (hasUpgrade("l", 92)) neutronmult = neutronmult.mul(upgradeEffect("l", 92))
            if (hasUpgrade("ad", 71)) neutronmult = neutronmult.mul(player.ad.subatomicpowereffect)
            let electronmult = new ExpantaNum(1)
            if (hasUpgrade("l", 93)) electronmult = electronmult.mul(upgradeEffect("l", 93))
            if (hasUpgrade("ad", 71)) electronmult = electronmult.mul(player.ad.subatomicpowereffect)

            player.ad.protons = player.ad.protons.add(player.ad.protonicdimension.mul(player.ad.atomeffect).mul(protonmult).mul(delta))
            player.ad.neutrons = player.ad.neutrons.add(player.ad.neutronicdimension.mul(player.ad.atomeffect).mul(neutronmult).mul(delta))
            player.ad.electrons = player.ad.electrons.add(player.ad.electronicdimension.mul(player.ad.atomeffect).mul(electronmult).mul(delta))

            player.ad.protoneffect = player.ad.protons.add(1).pow(0.9)
            player.ad.neutroneffect = player.ad.neutrons.add(1).pow(0.6)
            player.ad.electroneffect = player.ad.electrons.add(1).pow(0.2)
            if (hasUpgrade("ad", 77)) player.ad.electroneffect = player.ad.electrons.add(1).pow(35)
            if (hasUpgrade("ad", 77)) player.ad.electroneffect = player.ad.electrons.add(1).pow(2000)

            player.ad.subatomicpowereffect = player.ad.subatomicpower.add(1).pow(0.8)
            player.ad.subatomicpower = player.ad.subatomicpower.add(player.ad.subatomicdimension1.mul(player.ad.subatomicdimension1mult.mul(delta)))
            player.ad.subatomicdimension1 = player.ad.subatomicdimension1.add(player.ad.subatomicdimension2.mul(player.ad.subatomicdimension2mult.mul(delta)))
            player.ad.subatomicdimension2 = player.ad.subatomicdimension2.add(player.ad.subatomicdimension3.mul(player.ad.subatomicdimension3mult.mul(delta)))

            let atommult = new ExpantaNum(1)
            if (hasUpgrade("ad", 72)) atommult = atommult.mul(upgradeEffect("ad", 72))
            player.ad.atoms = player.ad.atoms.add(player.ad.atomspersecond.mul(delta))
            player.ad.atomeffect = player.ad.atoms.add(1).pow(6)

            let universeatomdecline = new ExpantaNum("1e10")
            let universesmult = new ExpantaNum(1)
            if (hasUpgrade("ad", 75)) universesmult = universesmult.mul(upgradeEffect("ad", 75))
            if (hasUpgrade("ad", 76)) universesmult = universesmult.mul(upgradeEffect("ad", 76))
            if (hasUpgrade("ad", 78)) universesmult = universesmult.mul(upgradeEffect("ad", 78))
            if (player.ad.universetoggle > 0)
            {
            player.ad.universespersecond = player.ad.atoms.plus(10).log10().div(10000).mul(universesmult)
            if (!hasUpgrade("ad", 79))
            {
            player.ad.atoms = player.ad.atoms.div(player.ad.universespersecond.add(1).pow("100").mul(delta))
            player.ad.atomspersecond = new ExpantaNum(0)
			}
            if (hasUpgrade("ad", 79)) player.ad.atomspersecond = player.ad.protons.pow(0.01).mul(player.ad.atomdoublereffect).mul(atommult).mul(player.ad.universeseffect)
            player.ad.universes = player.ad.universes.add(player.ad.universespersecond.mul(delta))
			}
            if (player.ad.universetoggle <= 0)
            {
            player.ad.universespersecond = new ExpantaNum(0)
            if (hasUpgrade("ad", 69)) player.ad.atomspersecond = player.ad.protons.pow(0.01).mul(player.ad.atomdoublereffect).mul(atommult).mul(player.ad.universeseffect)
            }
            player.ad.universeseffect = player.ad.universes.pow(1000).add(1)

            let replicantiboostereffectgain = new ExpantaNum("1e200")
            let replicantiboostergain = new ExpantaNum(100)
            let replicantiboostercostgain = new ExpantaNum(4.06e17)
            if (hasUpgrade("ad", 74))
            {
                player.ad.replicantiboostereffect = player.ad.replicantiboostereffect.mul(replicantiboostereffectgain.mul(delta))     
                player.ad.replicantibooster = player.ad.replicantibooster.add(replicantiboostergain.mul(delta))     
                player.ad.replicantiboostercost = player.ad.replicantiboostercost.mul(replicantiboostercostgain.mul(delta))     
			}

            let universeupgradetimegain = new ExpantaNum(1)
            if (hasUpgrade("ad", 78)) player.ad.universeupgradetime = player.ad.universeupgradetime.add(universeupgradetimegain.mul(player.ad.multiverseeffect).mul(delta))

            let universalgain = new ExpantaNum(1)
            if (hasUpgrade("ad", 82)) universalgain = universalgain.mul(1e10)
            universalgain = universalgain.mul(player.ad.hevipelleshardeffect)
              
            if (hasUpgrade("ad", 81))
            {
            player.ad.multiverse = player.ad.multiverse.add(player.ad.metaverse.mul(universalgain).mul(delta))
            player.ad.metaverse = player.ad.metaverse.add(player.ad.omniverse.mul(universalgain).mul(delta))
            player.ad.omniverse = player.ad.omniverse.add(player.ad.heviverse.mul(universalgain).mul(delta))
            player.ad.heviverse = player.ad.heviverse.add(player[this.layer].points.plus(10).log10().log10().mul(universalgain).mul(delta))
			}
            player.ad.multiverseeffect = player.ad.multiverse.add(1).pow(1.1)

            let hevipelleshardpow = new ExpantaNum(3.5)
            if (hasUpgrade("ad", 91)) player.ad.hevipelleshardspersecond = player.ad.antimatter.plus(10).log10().log10().mul(player.ad.gainshardseffect)
            player.ad.hevipelleshards = player.ad.hevipelleshards.add(player.ad.hevipelleshardspersecond.mul(delta))
            player.ad.hevipelleshardeffect = player.ad.hevipelleshards.add(1).pow(hevipelleshardpow.add(player.ad.effectshardseffect))
            if (player.ad.shardtoggle <= 0)
            {
                player.ad.gainshards = player.ad.gainshards.add(player.ad.gainshardspersecond.mul(delta))
            }
            if (player.ad.shardtoggle > 0 && player.ad.shardtoggle < 2)
            {
                player.ad.effectshards = player.ad.effectshards.add(player.ad.effectshardspersecond.mul(delta))
            }
            let gainshardvaluegain = new ExpantaNum(1)
            if (hasUpgrade("ad", 93)) gainshardvaluegain = gainshardvaluegain.mul(player.ad.effectshards.pow(0.4))
            if (hasUpgrade("ad", 95)) gainshardvaluegain = gainshardvaluegain.mul(player.ad.effectshards.pow(0.5))
            let effectshardvaluegain = new ExpantaNum(1)
            if (hasUpgrade("ad", 93)) effectshardvaluegain = effectshardvaluegain.mul(player.ad.gainshards.pow(0.4))
            if (hasUpgrade("ad", 95)) effectshardvaluegain = effectshardvaluegain.mul(player.ad.gainshards.pow(0.5))
            player.ad.gainshardspersecond = new ExpantaNum(gainshardvaluegain)
            player.ad.effectshardspersecond = new ExpantaNum(effectshardvaluegain)
            player.ad.gainshardseffect = player.ad.gainshards.add(1).pow(6)
            player.ad.effectshardseffect = player.ad.effectshards.pow(0.5)

            if (hasUpgrade("ad", 96))
            {
                player.ad.gainshards = player.ad.gainshards.add(player.ad.gainshardspersecond.mul(player.ad.finalshardseffect).mul(delta))
                player.ad.effectshards = player.ad.effectshards.add(player.ad.effectshardspersecond.mul(player.ad.finalshardseffect).mul(delta))
			}
            if (hasUpgrade("ad", 97))
            {
                player.ad.finalshardspersecond = player.points.plus(10).log10().log10().pow(1)
                player.ad.finalshards = player.ad.finalshards.add(player.ad.finalshardspersecond.mul(delta)) 
            }
            player.ad.finalshardseffect = player.ad.finalshards.add(1).pow(4)
        },
    microtabs: 
    {
        stuff: 
        {
          "Game Development": {
          content: [
          ["blank", "15px"],
          ["display-text", () => "You have written " + format(player.ad.linesofcodegamejs) + " Lines of Code for game.js and a x" + format(player.ad.linesofcodegamejseffect) + " boost to Hevipelle points"],
          ["display-text", () => "You have written " + format(player.ad.linesofcodeautobuyerjs) + " Lines of Code for autobuyer.js and a x" + format(player.ad.linesofcodeautobuyerjseffect) + " boost to game.js Lines of Code"],
          ["display-text", () => "You have written " + format(player.ad.linesofcodebreakinfinityjs) + " Lines of Code for breakinfinity.js and a x" + format(player.ad.linesofcodebreakinfinityjseffect) + " boost to autobuyer.js Lines of Code"],
          ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
          ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23]]],
          ["row", [["upgrade", 31]]],
          ]
          },
          "Timewalls": {
          unlocked() { return hasUpgrade("ad", 31) },
          content: [
          ["row", [["buyable", 11]]],
          ["display-text", () => format(player.ad.timewalltime) + "/60 Timewall Seconds"],
          ["display-text", () => "You have developed " + format(player.ad.timewalls) + " Timewalls a x" + format(player.ad.timewalleffect) + " boost to all Antimatter Dimensions lines of code"],
          ["row", [["upgrade", 32], ["upgrade", 33], ["upgrade", 34]]],
          ["row", [["upgrade", 35], ["upgrade", 36], ["upgrade", 37]]],
          ["row", [["upgrade", 38], ["upgrade", 39], ["upgrade", 52]]],
          ["row", [["upgrade", 53], ["upgrade", 64]]],
          ]
          },
          "Antimatter Dimensions": {
          unlocked() { return hasUpgrade("ad", 35) },
          content: [
          ["display-text", () => "You have " + format(player.ad.antimatter) + " Antimatter and a x" + format(player.ad.antimattereffect) + " boost to Cookie Time"],
          ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23], ["buyable", 24]]],
          ["row", [["buyable", 25], ["buyable", 26], ["buyable", 27], ["buyable", 28]]],
          ]
          },
          "Boosts and Galaxies": {
          unlocked() { return player.ad.dimension8 >= 5 || player.ad.dimboost >= 1  || player.ad.antimattergalaxies >= 1 || player.ad.infinitypoints > 0},
          content: [
          ["display-text", () => "You have " + format(player.ad.antimatter) + " Antimatter and a x" + format(player.ad.antimattereffect) + " boost to Cookie Time"],
          ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33], ["buyable", 34]]],
          ["row", [["upgrade", 101], ["upgrade", 41], ["upgrade", 42], ["upgrade", 102]]],
          ]
          },
          "Infinity": {
          unlocked() { return player.ad.antimatter > 1.79e308 || player.ad.infinitypoints > 0 },
          content: [
          ["display-text", () => "You have " + format(player.ad.infinitypoints) + " Infinity Points"],
          ["row", [["buyable", 41], ["buyable", 42]]],
          ["blank", "15px"],
          ["row", [["upgrade", 43], ["upgrade", 44], ["upgrade", 45], ["upgrade", 46], ["upgrade", 47], ["upgrade", 48], ["upgrade", 49], ["upgrade", 51]]],
          ["blank", "15px"],
          ["display-text", () => hasUpgrade("ad", 45) ? "You have " + format(player.ad.infinitypower) + " Infinity Power and a x" + format(player.ad.infinitypowereffect) + " boost to all Dimensions" : ""],
          ["blank", "15px"],
          ["row", [["buyable", 51], ["buyable", 52], ["buyable", 53], ["buyable", 54]]],
          ]
          },
          "Replicanti": {
          unlocked() { return hasUpgrade("ad", 51) },
          content: [
          ["display-text", () => "You have " + format(player.ad.infinitypoints) + " Infinity Points"],
          ["blank", "15px"],
          ["display-text", () => "You have " + format(player.ad.replicanti) + " Replicanti and a x" + format(player.ad.replicantieffect) + " boost to all Infinity Dimensions"],
          ["display-text", () => "You have " + format(player.ad.replicantitime) + "/5 Seconds to Replicate"],
          ["display-text", () => player.ad.singularities >= 1  || player.ad.replicanti > 1.79e308 ? "You have " + format(player.ad.singularities) + " Singularities and a x" + format(player.ad.singularityeffect) + " boost to all Infinity Dimensions as well as a x" + format(player.ad.singularityeffect2) + " boost to all Mini Dimensions" : ""],
          ["row", [["buyable", 61], ["buyable", 62]]],
          ["row", [["upgrade", 54], ["upgrade", 55], ["upgrade", 56], ["upgrade", 57], ["upgrade", 58], ["upgrade", 59]]],
          ]
          },
          "Black Holes": {
          unlocked() { return hasUpgrade("ad", 59) },
          content: [
          ["display-text", () => "You have " + format(player.ad.infinitypoints) + " Infinity Points"],
          ["display-text", () => player.ad.singularities >= 1  || player.ad.replicanti > 1.79e308 ? "You have " + format(player.ad.singularities) + " Singularities and a x" + format(player.ad.singularityeffect) + " boost to all Infinity Dimensions as well as a x" + format(player.ad.singularityeffect2) + " boost to all Mini Dimensions" : ""],
          ["display-text", () => "You have " + format(player.ad.blackholes) + " Black Holes and a x" + format(player.ad.blackholeseffect) + " boost to Infinity Points and Singularities"],
          ["row", [["upgrade", 61], ["upgrade", 62], ["upgrade", 63], ["upgrade", 65],  ["upgrade", 66]]],
          ["display-text", () => "You have " + format(player.ad.omegapower) + " Omega Power and a x" + format(player.ad.omegapowereffect) + " boost to Black Holes"],
          ["row", [["buyable", 71], ["buyable", 72], ["buyable", 73], ["buyable", 74]]],
          ["row", [["buyable", 75], ["buyable", 76]]],
          ]
          },
          "Subatomic Particles": {
          unlocked() { return hasUpgrade("ad", 66) },
          content: [
          ["display-text", () => "You have " + format(player.ad.infinitypoints) + " Infinity Points"],
          ["display-text", () => "You have " + format(player.ad.replicanti) + " Replicanti and a x" + format(player.ad.replicantieffect) + " boost to all Infinity Dimensions"],
          ["display-text", () => "You have " + format(player.ad.blackholes) + " Black Holes and a x" + format(player.ad.blackholeseffect) + " boost to Infinity Points and Singularities"],
          ["display-text", () => "You have " + format(player.ad.omegapower) + " Omega Power and a x" + format(player.ad.omegapowereffect) + " boost to Black Holes"],
          ["blank", "15px"],
          ["display-text", () => "You have " + format(player.ad.protonicdimension) + " Protonic Dimensions which Produced " + format(player.ad.protons) + " Protons and a x" + format(player.ad.protoneffect) + " boost to Infinity Points"],
          ["display-text", () => "You have " + format(player.ad.neutronicdimension) + " Neutronic Dimensions which Produced " + format(player.ad.neutrons) + " Neutrons and a x" + format(player.ad.neutroneffect) + " boost to Omega Dimensions"],
          ["display-text", () => "You have " + format(player.ad.electronicdimension) + " Electronic Dimensions which Produced " + format(player.ad.electrons) + " Electrons and a x" + format(player.ad.electroneffect) + " boost to Replicanti"],
          ["row", [["upgrade", 67], ["upgrade", 68], ["upgrade", 69]]],
          ["display-text", () => hasUpgrade("ad", 68) ? "You have " + format(player.ad.subatomicpower) + " Subatomic Power and a x" + format(player.ad.subatomicpowereffect) + " boost to Protonic, Neutronic, and Electronic Dimensions." : ""],
          ["row", [["buyable", 81], ["buyable", 82], ["buyable", 83]]],
          ]
          },
          "Atoms": {
          unlocked() { return hasUpgrade("ad", 69) },
          content: [
          ["display-text", () => "You have " + format(player.ad.protonicdimension) + " Protonic Dimensions which Produced " + format(player.ad.protons) + " Protons and a x" + format(player.ad.protoneffect) + " boost to Infinity Points"],
          ["display-text", () => "You have " + format(player.ad.neutronicdimension) + " Neutronic Dimensions which Produced " + format(player.ad.neutrons) + " Neutrons and a x" + format(player.ad.neutroneffect) + " boost to Omega Dimensions"],
          ["display-text", () => "You have " + format(player.ad.electronicdimension) + " Electronic Dimensions which Produced " + format(player.ad.electrons) + " Electrons and a x" + format(player.ad.electroneffect) + " boost to Replicanti"],
          ["blank", "15px"],
          ["display-text", () => "You have " + format(player.ad.atoms) + " Atoms and a x" + format(player.ad.atomeffect) + " boost to all Subatomic Particle and Protonic, Neutronic, Electronic Dimension, and Replicanti Gain"],
          ["display-text", () => "You are gaining " + format(player.ad.atomspersecond) + " Atoms per Second, based on Protons"],
          ["row", [["upgrade", 71], ["upgrade", 72], ["upgrade", 73]]],
          ["row", [["buyable", 91], ["buyable", 92]]],
          ]
          },
          "Universes": {
          unlocked() { return hasUpgrade("ad", 73) },
          content: [
          ["display-text", () => "You have " + format(player.ad.atoms) + " Atoms and a x" + format(player.ad.atomeffect) + " boost to all Subatomic Particle and Protonic, Neutronic, Electronic Dimension, and Replicanti Gain"],
          ["blank", "15px"],
          ["display-text", () => "You have " + format(player.ad.universes) + " Universes and a x" + format(player.ad.universeseffect) + " boost to Atoms"],
          ["row", [["buyable", 93], ["buyable", 94]]],
          ["row", [["upgrade", 74], ["upgrade", 75], ["upgrade", 76], ["upgrade", 77], ["upgrade", 78], ["upgrade", 79]]],
          ["row", [["upgrade", 81]]],
          ["row", [["upgrade", 82], ["upgrade", 83]]],
          ]
          },
          "The End": {
          unlocked() { return hasUpgrade("ad", 83) },
          content: [
          ["bar", "antimatterbar"],
          ["row", [["upgrade", 91], ["upgrade", 92], ["upgrade", 93], ["upgrade", 94], ["upgrade", 95], ["upgrade", 96], ["upgrade", 97]]],
          ["display-text", () => "You have " + format(player.ad.hevipelleshards) + " Hevipelle Shards and a x" + format(player.ad.hevipelleshardeffect) + " boost to Other Universes Gain"],
          ["display-text", () => "You are gaining " + format(player.ad.hevipelleshardspersecond) + " Hevipelle Shards per Second"],
          ["blank", "15px"],
          ["display-text", () => hasUpgrade("ad", 92) ? "You have " + format(player.ad.gainshards) + " Gain Shards and a x" + format(player.ad.gainshardseffect) + " boost to Hevipelle shard Gain" : ""],
          ["display-text", () => hasUpgrade("ad", 92) ? "You have " + format(player.ad.effectshards) + " Effect Shards and a +" + format(player.ad.effectshardseffect) + " to the Hevipelle shard effect pow" : ""],
          ["row", [["buyable", 95], ["buyable", 96]]],
          ["blank", "15px"],
          ["display-text", () => hasUpgrade("ad", 97) ? "You have " + format(player.ad.finalshards) + " Final Shards and a x" + format(player.ad.finalshardseffect) + " boost to Gain Shards and Effect Shards gain" : ""],
          ["display-text", () => hasUpgrade("ad", 97) ? "You are gaining " + format(player.ad.finalshardspersecond) + " Final Shards per Second, based on Points" : ""],
          ]
          },
        },
    },
            tabFormat: [
        "main-display",
        ["row", [["upgrade", 98]]],
        "prestige-button",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    layerShown(){return hasUpgrade("l", 37)}
})

// A side layer with achievements, with no prestige
addLayer("m", {
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),
        militarypow: new ExpantaNum(1.1),
        respectpersecond: new ExpantaNum(0),
        trainingtime: new ExpantaNum(0),
        trainingmult: new ExpantaNum(0),
        trainingcooldown: new ExpantaNum(0),
        inspiration: new ExpantaNum(0),
        inspirationeffect: new ExpantaNum(0),
        newtraineebadge: new ExpantaNum(0),
        rookiebadge: new ExpantaNum(0),
        growingsoldierbadge: new ExpantaNum(0),
        battlesoldierbadge: new ExpantaNum(0),
        battletoggle: new ExpantaNum(0),
        playerhealth: new ExpantaNum(50),
        maxplayerhealth: new ExpantaNum(50),
        enemyhealth: new ExpantaNum(10),
        maxenemyhealth: new ExpantaNum(10),
        playerdamage: new ExpantaNum(1),
        enemydamage: new ExpantaNum(1),
        enemylevel: new ExpantaNum(1),
        militarypower: new ExpantaNum(0),
        militarypowereffect: new ExpantaNum(1),
        deadcooldown: new ExpantaNum(0),
        bloodshedbadge: new ExpantaNum(0),
        intermediatesoldierbadge: new ExpantaNum(0),
        experiencedsoldierbadge: new ExpantaNum(0),
        commanderbadge: new ExpantaNum(0),
        supersoldierbadge: new ExpantaNum(0),
        finalbadge: new ExpantaNum(0),
        veteranbadge: new ExpantaNum(0),
    }},
    color: "#766D31",
        nodeStyle() {
        if (player.m.battletoggle <= 0)
        {
            return           {
        background: "linear-gradient(85deg, #766D31, #576844, #766844)",
        "background-origin": "border-box",
			}
		}
        if (player.m.battletoggle >= 1)
        {
            return           {
        background: "linear-gradient(85deg, #660000, #650000, #670000)",
        "background-origin": "border-box",
			}
		}
    },
    symbol: "<img src='resources/militarylayersymbol.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>",
    resource: " Respect", 
    row: "side",
    midsection: ["grid", "blank"],
    branches: ["l", "cc"],
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Military")
    },
    		effect() 
        {
			return new ExpantaNum.add(player.m.points.pow(player.m.militarypow), 1);
		},
        effectDescription(){
                let eff = layers.m.effect()
                return "which multiplies $ gain by x" + format(eff)
        },
            buyables:
    {
        11: {
        cost(x) { return true },
        title: "Start Training",
        unlocked() { return hasUpgrade("l", 75)},
        canAfford() { return true },
        buy() 
        {
            if (player.m.trainingcooldown <= 0)
            {
                        if (player.m.trainingtime <= 0)
                        {
                            if (player.m.battletoggle < 1)
                            {
                             player.m.trainingtime = new ExpantaNum(10).add(buyableEffect("m", 12))                           
							}
                        }
            }
        },
        },
        12: {
        cost(x) { return new ExpantaNum(100).pow(x.div(25)).mul(100) },
        title: "Endurance Upgrade",
        unlocked() { return true },
        canAfford() { return player.m.points.gte(this.cost()) },
        buy() {
            player.m.points = player.m.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Respect\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Seconds in Training";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id]
        },
        },
                13: {
        cost(x) { return new ExpantaNum(100) },
        title: "START THE BATTLE",
        unlocked() { return true },
        canAfford() { return true },
        buy() {
            player.m.battletoggle = new ExpantaNum(1)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Starts the Battle";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id]
        },
        },
                        14: {
        cost(x) { return new ExpantaNum(100) },
        title: "RETREAT",
        unlocked() { return true },
        canAfford() { return true },
        buy() {
            player.m.battletoggle = new ExpantaNum(0)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Ends the Battle";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id]
        },
        },
        },
        
    upgrades: 
    {
        11:
        {
            title: "MRE Meals",
            description: "Makes Training 2x Faster, as well as getting 2x the Respect.",
            unlocked() { return player.m.points > 1000 || hasUpgrade("ad", 11) },
            cost: new ExpantaNum(1000),
        },
        12:
        {
            title: "Inspiration",
            description: "Every time you finish your training, you get inspiration, which boosts Respect gain.",
            unlocked() { return hasUpgrade("m", 11) },
            cost: new ExpantaNum(2000),
        },
        13:
        {
            title: "WAR HAS STARTED",
            description: "JOIN THE WAR NOW!! COME ON SOLDIER WE NEED YOU!!",
            unlocked() { return player.points.gte("1e540000000") },
            cost: new ExpantaNum(20000),
        },
        14:
        {
            title: "Big Inflation So Funny",
            description: "Boosts Player Max Health based on Military Power and Disables the Death Cooldown",
            unlocked() { return hasUpgrade("m", 13) },
            cost: new ExpantaNum("1e500"),
                effect() 
                {
                     return player[this.layer].militarypower.add(1).pow(0.8)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15:
        {
            title: "Too much, right?",
            description: "Boosts Gold effect to ^20",
            unlocked() { return hasUpgrade("m", 14) },
            cost: new ExpantaNum("1e1000"),
        },
        16:
        {
            title: "Turn into a Chad",
            description: "Boosts Player Damage based on Military Power",
            unlocked() { return hasUpgrade("m", 15) },
            cost: new ExpantaNum("1e2500"),
                effect() 
                {
                     return player[this.layer].militarypower.add(1).pow(0.7)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        17:
        {
            title: "Turn into a Gigachad",
            description: "Boosts Player Damage based on Enemy Level",
            unlocked() { return hasUpgrade("m", 16) },
            cost: new ExpantaNum("1e7500"),
                effect() 
                {
                     return player[this.layer].enemylevel.add(1).pow(1.1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        18:
        {
            title: "Go Saiyan",
            description: "Boosts Player Health based on Enemy Level",
            unlocked() { return hasUpgrade("m", 17) },
            cost: new ExpantaNum("1e8000"),
                effect() 
                {
                     return player[this.layer].enemylevel.add(1).pow(1.1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        19:
        {
            title: "THE END",
            description: "Finishes the Layer",
            unlocked() { return player.m.veteranbadge >= 1 },
            cost: new ExpantaNum("1e300000"),
        },
        },
    update(delta) 
    {
            let trainingmult = new ExpantaNum(1)
        if (hasUpgrade("m", 11)) trainingmult = trainingmult.mul(2)
        if (player.m.newtraineebadge >= 1)
        {
            trainingmult = trainingmult.mul(1.3)
        }
        if (player.m.growingsoldierbadge >= 1)
        {
            trainingmult = trainingmult.mul(1.2)
        }
        if (player.m.rookiebadge >= 1)
        {
            trainingmult = trainingmult.mul(1.2)
        }
        if (player.m.bloodshedbadge >= 1)
        {
            trainingmult = trainingmult.mul(1.3)
        }
        trainingmult = trainingmult.mul(player.m.militarypowereffect)
        trainingmult = trainingmult.mul(player.m.inspirationeffect)
        trainingmult = trainingmult.mul(player.l.minigamenumbereffect)
        player.m.trainingmult = trainingmult

        player.m.points = player.m.points.add(player.m.trainingtime.mul(trainingmult).mul(delta))

        let trainingtimesub = new ExpantaNum(1)
        if (hasUpgrade("m", 11)) trainingtimesub = trainingtimesub.mul(2)
        if (player.m.rookiebadge >= 1)
        {
            trainingtimesub = trainingtimesub.mul(1.2)
        }
        if (player.m.bloodshedbadge >= 1)
        {
            trainingtimesub = trainingtimesub.mul(1.3)
        }
        let trainingcooldownsub = new ExpantaNum(1)
        if (player.m.trainingtime > 0)
        {
            player.m.trainingtime = player.m.trainingtime.sub(trainingtimesub.mul(delta))  
		}
        if (player.m.trainingcooldown > 0)
        {
            player.m.trainingcooldown = player.m.trainingcooldown.sub(trainingcooldownsub.mul(delta))  
		}
        if (player.m.trainingtime < 0)
        {
            player.m.trainingcooldown = new ExpantaNum(10).sub(player.m.rookiebadge).sub(player.m.battlesoldierbadge)
            if (hasUpgrade("m", 12))
            {
                player.m.inspiration = player.m.inspiration.add(1).add(player.m.intermediatesoldierbadge)
            }
            player.m.trainingtime = new ExpantaNum(0) 
		}
        if (player.m.trainingcooldown < 0)
        {
            player.m.trainingcooldown = new ExpantaNum(0) 
		}
        if (player.m.inspiration >= 10)
        {
            player.m.newtraineebadge = new ExpantaNum(1)  
		}
        if (player.m.inspiration >= 50)
        {
            player.m.growingsoldierbadge = new ExpantaNum(1)  
		}
        if (player.m.militarypower >= 25)
        {
            player.m.bloodshedbadge = new ExpantaNum(1)  
		}
        if (player.m.militarypower >= 60)
        {
            player.m.intermediatesoldierbadge = new ExpantaNum(1)  
		}
        if (player.m.buyables[12] >= 20)
        {
            player.m.rookiebadge = new ExpantaNum(1)  
		}
        if (hasUpgrade("m", 13))
        {
            player.m.battlesoldierbadge = new ExpantaNum(1)  
		}
        if (player.m.militarypower >= 200000)
        {
            player.m.experiencedsoldierbadge = new ExpantaNum(1)  
		}
        if (player.m.points >= "1e2000")
        {
            player.m.commanderbadge = new ExpantaNum(1)  
		}
        if (player.m.militarypower >= 5000000)
        {
            player.m.supersoldierbadge = new ExpantaNum(1)  
		}
        if (player.m.militarypower >= 1e20)
        {
            player.m.finalbadge = new ExpantaNum(1)  
		}
        if (player.m.militarypower >= "1e1000000")
        {
            player.m.veteranbadge = new ExpantaNum(1)  
		}
        let trainingtimemult = new ExpantaNum(0.1)
        let inspirationmult = new ExpantaNum(0.5)
        let enemylevelmult = new ExpantaNum(1.1)
        let enemylevelpow = new ExpantaNum(1.1)
        if (player.m.experiencedsoldierbadge >= 1)
        {
            player.m.trainingtime = player.m.trainingtime.mul(trainingtimemult.mul(delta).add(1))
		}
        if (player.m.commanderbadge >= 1)
        {
            player.m.inspiration = player.m.inspiration.mul(inspirationmult.mul(delta).add(1))
		}
        player.m.inspirationeffect = player.m.inspiration.mul(0.05).pow(0.9).add(1)

        if (!hasUpgrade("l", 77)) player.m.militarypow = new ExpantaNum(1.1)
        if (hasUpgrade("l", 77)) player.m.militarypow = new ExpantaNum(5)
        if (hasUpgrade("l", 78)) player.m.militarypow = new ExpantaNum(100)
        let militarypowdefault = new ExpantaNum(100)
        if (hasUpgrade("l", 101)) player.m.militarypow = new ExpantaNum(militarypowdefault.mul(upgradeEffect("l", 101)))
        if (hasUpgrade("l", 103)) player.m.militarypow = player.m.militarypow.mul(upgradeEffect("l", 103))

        if (player.m.battletoggle >= 1)
        {
            if (player.m.deadcooldown <= 0)
            {
                player.m.enemydamage = player.m.enemylevel
                if (player.m.playerhealth >= 0)
                {
                player.m.playerhealth = player.m.playerhealth.sub(player.m.enemydamage.mul(delta))
				}
                player.m.enemyhealth = player.m.enemyhealth.sub(player.m.playerdamage.mul(delta))
                player.m.playerdamage = player.m.points.plus(10).log10()
                player.m.deadcooldown = new ExpantaNum(0)
			}

            player.m.maxenemyhealth = player.m.enemylevel.mul(10)

            if (player.m.enemyhealth <= 0)
            {
                player.m.militarypower = player.m.militarypower.add(player.m.enemylevel)
                player.m.enemylevel = player.m.enemylevel.add(1)
                player.m.enemyhealth = player.m.maxenemyhealth
                if (player.m.supersoldierbadge >= 1)
                {
                    player.m.enemylevel = player.m.enemylevel.mul(enemylevelmult)
	        	}
                if (player.m.supersoldierbadge >= 1)
                {
                    player.m.enemylevel = player.m.enemylevel.pow(enemylevelpow)
	        	}
			}
            if (player.m.playerhealth <= 0)
            {
                if (!hasUpgrade("m", 14)) player.m.deadcooldown = new ExpantaNum(60)
                player.m.playerhealth = new ExpantaNum(0)
                player.m.enemylevel = new ExpantaNum(1)
                player.m.enemydamage = new ExpantaNum(1)
                player.m.enemyhealth =  new ExpantaNum(10)
                player.m.maxenemyhealth = new ExpantaNum(10)
                player.m.playerhealth = player.m.maxplayerhealth
			}
		}
        let deadsub = new ExpantaNum(1)
        if (player.m.deadcooldown > 0)
        {
             player.m.deadcooldown = player.m.deadcooldown.sub(deadsub.mul(delta))
        }
        if (player.m.deadcooldown <= 0)
        {
             player.m.deadcooldown = new ExpantaNum(0)
        }
                if (player.m.battletoggle <= 0)
        {
        }
        if (!player.m.veteranbadge >= 1) player.m.militarypowereffect = player.m.militarypower.add(1).pow(0.2)
        if (player.m.veteranbadge >= 1)
        {
             player.m.militarypowereffect = new ExpantaNum("1e300000")  
		}

        player.m.maxplayerhealth = new ExpantaNum(50)
        if (hasUpgrade("m", 14)) player.m.maxplayerhealth = player.m.maxplayerhealth.mul(upgradeEffect("m", 14))
        if (hasUpgrade("m", 18)) player.m.maxplayerhealth = player.m.maxplayerhealth.mul(upgradeEffect("m", 18))
        if (hasUpgrade("m", 16)) player.m.playerdamage = player.m.playerdamage.mul(upgradeEffect("m", 16))
        if (hasUpgrade("m", 17)) player.m.playerdamage = player.m.playerdamage.mul(upgradeEffect("m", 17))
    },
        microtabs: 
    {
        stuff: 
        {
          "Training": {
          content: [
          ["blank", "15px"],
          ["display-text", () => hasUpgrade("m", 12) ? "You have " + format(player.m.inspiration) + " Inspiration and a x" + format(player.m.inspirationeffect) + " boost to Respect" : ""],
          ["blank", "15px"],
          ["display-text", () => "Training Time Left: " + format(player.m.trainingtime) + " Seconds"],
          ["display-text", () => "Cooldown: " + format(player.m.trainingcooldown) + " Seconds"],
          ["row", [["buyable", 11]]],
          ["row", [["buyable", 12]]],
          ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16], ["upgrade", 17], ["upgrade", 18], ["upgrade", 19]]],
          ]
          },
          "Badges": {
          unlocked() { return hasUpgrade("m", 12) },
          content: [
          ["display-text", () => "Current Respect Multiplier: x" + format(player.m.trainingmult)],
          ["display-text", () => player.m.newtraineebadge >= 1 ? "New Trainee Badge: x1.3 Respect Boost (Get 10 Inspiration)" : ""],
          ["display-text", () => player.m.rookiebadge >= 1 ? "Rookie Badge: x1.2 Respect Boost and x1.2 Training Speed and a -1 Second Cooldown Time (Get Endurance level 20)" : ""],
          ["display-text", () => player.m.growingsoldierbadge >= 1 ? "Growing Soldier Badge: x1.2 Respect Boost (Get 50 Inspiration)" : ""],
          ["display-text", () => player.m.battlesoldierbadge >= 1 ? "Battle Soldier Badge: -1 Second Cooldown Time (Join the War)" : ""],
          ["display-text", () => player.m.bloodshedbadge >= 1 ? "Bloodshed Badge: x1.3 Respect Boost and x1.3 Training Speed (Get 25 Military Power)" : ""],
          ["display-text", () => player.m.intermediatesoldierbadge >= 1 ? "Intermediate Soldier Badge: x2 Inspiration Gain (Get 60 Military Power)" : ""],
          ["display-text", () => player.m.experiencedsoldierbadge >= 1 ? "Experienced Soldier Badge: x1.1 Additional Training time per Second (Get 200000 Military Power)" : ""],
          ["display-text", () => player.m.commanderbadge >= 1 ? "Commander Badge: x1.5 Additional Inspiration per Second (Get 1e2000 Respect)" : ""],
          ["display-text", () => player.m.supersoldierbadge >= 1 ? "Super Soldier Badge: Get x1.1 Enemy Level on Kill (Get 5000000 Military Power)" : ""],
          ["display-text", () => player.m.finalbadge >= 1 ? "Final Badge: Get ^1.1 Enemy Level on Kill (Get 1e20 Military Power)" : ""],
          ["display-text", () => player.m.veteranbadge >= 1 ? "Veteran Badge: Hardcaps Military Power Effect, but unlocks the upgrade for this layer's completion (Get 1e1000000 Military Power)" : ""],
          ]
          },
          "War": {
          unlocked() { return hasUpgrade("m", 13) },
          content: [
          ["row", [["buyable", 13], ["buyable", 14]]],
          ["blank", "15px"],
          ["display-text", () => "Player HP: " + format(player.m.playerhealth) + "/" + format(player.m.maxplayerhealth) + " Damage: " + format(player.m.playerdamage) ],
          ["blank", "15px"],
          ["display-text", () => "Enemy HP: " + format(player.m.enemyhealth) + "/" + format(player.m.maxenemyhealth) + " Damage: " + format(player.m.enemydamage) + " Level: " + format(player.m.enemylevel) ],
          ["blank", "15px"],
          ["display-text", () => format(player.m.deadcooldown) + " Second Cooldown For Death" ],
          ["blank", "15px"],
          ["display-text", () => "You have " + format(player.m.militarypower) + " Military Power and a x" + format(player.m.militarypowereffect) + " boost to Respect"],
          ["blank", "15px"],
          ["display-text", () => "You can't do training during battle"],
          ["blank", "15px"],
          ["display-text", () => "If your game freezes while joining battle, just refresh your game and it is all good."],
          ]
          },
        },
    },
            tabFormat: [
        "main-display",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    layerShown(){return hasUpgrade("l", 75)}
},
)
// A side layer with achievements, with no prestige
addLayer("ch", {
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),
        heroicpointspersecond: new ExpantaNum(0),
        heroictime: new ExpantaNum(0),
        gold: new ExpantaNum(0),
        goldeffect: new ExpantaNum(0),
        enemylevel: new ExpantaNum(1),
        enemyhealth: new ExpantaNum(10),
        enemymaxhealth: new ExpantaNum(10),
        goldtoget: new ExpantaNum(1),
        damagepersecond: new ExpantaNum(0),
        zone: new ExpantaNum(0),
        powersurgetime: new ExpantaNum(0),
        powersurgecooldown: new ExpantaNum(0),
        metaldetectortime: new ExpantaNum(0),
        metaldetectorcooldown: new ExpantaNum(0),
        ancienttreasurecooldown: new ExpantaNum(0),
        herosouls: new ExpantaNum(0),
        herosoulstoget: new ExpantaNum(0),
        herosoulseffect: new ExpantaNum(1),
        chronostime: new ExpantaNum(0),
        inflationrelics: new ExpantaNum(0),
        inflationrelicspersecond: new ExpantaNum(0),
        inflationrelicseffect: new ExpantaNum(0),
        inflationrelics2: new ExpantaNum(0),
        inflationrelics2persecond: new ExpantaNum(0),
        inflationrelics2effect: new ExpantaNum(0),
    }},
            nodeStyle: {
            background: "linear-gradient(100deg, #006400, #ffd800)",
            "background-origin": "border-box",
    },

    color: "#123456",
    symbol: "<img src='resources/clickerheroeslayersymbol.png' style='width:calc(110%);height:calc(60%);margin:-15%'></img>",
    resource: " Heroic Points", 
    row: "side",
    midsection: ["grid", "blank"],
    branches: ["i", "ad"],
    displayRow: 2,
    		effect() 
        {
			return new ExpantaNum.add(player.ch.points.pow(1.1), 1);
		},
        effectDescription(){
                let eff = layers.ch.effect()
                return "which multiplies Coin gain by x" + format(eff)
        },
        automate()
    {
        if (!hasUpgrade('ch', 36)) {
            if (hasMilestone('ch', 13)) {
    buyBuyable(this.layer, 11)
    buyBuyable(this.layer, 12)
    buyBuyable(this.layer, 13)
    buyBuyable(this.layer, 14)
    buyBuyable(this.layer, 15)
    buyBuyable(this.layer, 16)
    buyBuyable(this.layer, 17)
    buyBuyable(this.layer, 18)
    }
        if (hasMilestone('ch', 14)) {
    buyBuyable(this.layer, 31)
    buyBuyable(this.layer, 32)
    buyBuyable(this.layer, 33)
    buyBuyable(this.layer, 34)
    }
        }
    if (hasUpgrade('ch', 27)) {
    buyBuyable(this.layer, 21)
    buyBuyable(this.layer, 22)
    buyBuyable(this.layer, 23)
    }
        if (hasUpgrade('ch', 36)) {
    buyBuyable(this.layer, 35)
    buyBuyable(this.layer, 36)
    }
    },    
    upgrades: 
    {        
        11:
        {
            title: "Start becoming a Hero",
            description: "You get 1 Heroic Point per Second",
            unlocked() { return true },
            cost: new ExpantaNum("ee1e9"),
            currencyLocation() { return player },
            currencyDisplayName: "Points",
            currencyInternalName: "points",
        },
        12:
        { 
            title: "What about an Idle RPG game?",
            description: "Boosts Heroic points based on Heroic points",
            unlocked() { return hasUpgrade("ch", 11) },
            cost: new ExpantaNum("10"),
                effect() 
                {
                     return player[this.layer].points.pow(0.3).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13:
        { 
            title: "A fighting Idle Game?",
            description: "Boosts Heroic points based on time after buying the Upgrade",
            unlocked() { return hasUpgrade("ch", 12) },
            cost: new ExpantaNum("100"),
                effect() 
                {
                     return player[this.layer].heroictime.pow(1.1).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14:
        { 
            title: "Screw this lets just finish the game now",
            description: "Unlocks a new tab :)",
            unlocked() { return hasUpgrade("ch", 13) },
            cost: new ExpantaNum("1e5"),
        },
        15:
        { 
            title: "START THE JOURNEY",
            description: "Deal 1 Damage per Second",
            unlocked() { return hasUpgrade("ch", 14) },
            cost: new ExpantaNum("1e5"),
        },
        16:
        { 
            title: "Let's make this faster, shall we?",
            description: "Boosts Damage based on Enemy Level",
            unlocked() { return hasUpgrade("ch", 15) },
            cost: new ExpantaNum("1000"),
                effect() 
                {
                     return player[this.layer].enemylevel.add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player.ch },
            currencyDisplayName: "Gold",
            currencyInternalName: "gold",
        },
        17:
        { 
            title: "ZONES",
            description: "Unlocks Zones and boosts damage per second based on your zone.",
            unlocked() { return hasUpgrade("ch", 16) },
            cost: new ExpantaNum("5000"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Gold",
            currencyInternalName: "gold",
                effect() 
                {
                     return player[this.layer].zone.add(1).pow(5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        18:
        { 
            title: "Powersurge",
            description: "Unlocks the Powersurge Skill",
            unlocked() { return hasUpgrade("ch", 17) },
            cost: new ExpantaNum("50000"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Gold",
            currencyInternalName: "gold",
        },
        19:
        { 
            title: "A lot of Gold!",
            description: "Boosts gold based on Enemy Level",
            unlocked() { return hasUpgrade("ch", 18) },
            cost: new ExpantaNum("100000"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Gold",
            currencyInternalName: "gold",
                effect() 
                {
                     return player[this.layer].enemylevel.add(1).pow(1.1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21:
        { 
            title: "Metal Detector",
            description: "Unlocks the Metal Detector Skill",
            unlocked() { return hasUpgrade("ch", 18) },
            cost: new ExpantaNum("100000000"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Gold",
            currencyInternalName: "gold",
        },
        22:
        { 
            title: "Improved Sorcery",
            description: "Speeds up Powersurge and Metal Detector's cooldown times by 5x",
            unlocked() { return hasUpgrade("ch", 21) },
            cost: new ExpantaNum("150000000"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Gold",
            currencyInternalName: "gold",
        },
        23:
        { 
            title: "Ancient Treasure",
            description: "Unlocks the Ancient Treasure Skill",
            unlocked() { return hasUpgrade("ch", 22) },
            cost: new ExpantaNum("1e10"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Gold",
            currencyInternalName: "gold",
        },
        24:
        { 
            title: "Ascension :()",
            description: "Unlocks a new Tab",
            unlocked() { return player[this.layer].buyables[18] >= 5},
            cost: new ExpantaNum("1e11"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Gold",
            currencyInternalName: "gold",
        },
        25:
        { 
            title: "Faster Game",
            description: "Killing an Enemy Levels it up by 10, not 1",
            unlocked() { return hasUpgrade("ch", 24)},
            cost: new ExpantaNum("5"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Hero Souls",
            currencyInternalName: "herosouls",
        },
        26:
        { 
            title: "Automated Ascensions",
            description: "Gains 25% of Hero Souls per Second",
            unlocked() { return hasUpgrade("ch", 25)},
            cost: new ExpantaNum("50"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Hero Souls",
            currencyInternalName: "herosouls",
        },
        27:
        { 
            title: "Wizard",
            description: "Speeds up Powersurge, Metal Detector, and Ancient Treasure's Cooldown times by 10, and Automates Casting.",
            unlocked() { return player[this.layer].buyables[33] >= 5},
            cost: new ExpantaNum("1e28"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Gold",
            currencyInternalName: "gold",
        },
        28:
        { 
            title: "OH GOD NO OH DEAR HEAVENS NO",
            description: "Unlocks the Hall of Inflation",
            unlocked() { return hasUpgrade("ch", 26)},
            cost: new ExpantaNum("25000"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Hero Souls",
            currencyInternalName: "herosouls",
        },
        29:
        { 
            title: "Decorate the Hall of Inflation",
            description: "Hero Souls boost Gold gain",
            unlocked() { return hasUpgrade("ch", 26)},
            cost: new ExpantaNum("1e12"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Inflation Relics",
            currencyInternalName: "inflationrelics",
                effect() 
                {
                     return player[this.layer].herosouls.add(1).pow(1.1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        31:
        { 
            title: "Build a Garden outside of the Hall of Inflation",
            description: "Inflation Relics boost Inflation Relics",
            unlocked() { return hasUpgrade("ch", 26)},
            cost: new ExpantaNum("1e13"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Inflation Relics",
            currencyInternalName: "inflationrelics",
                effect() 
                {
                     return player[this.layer].inflationrelics.add(1).pow(0.7)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        32:
        { 
            title: "Inflate balloons to put inside of the hall of inflation",
            description: "Enemy Kills add 100000 Levels",
            unlocked() { return hasUpgrade("ch", 26)},
            cost: new ExpantaNum("1e52"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Inflation Relics",
            currencyInternalName: "inflationrelics",
        },
        33:
        { 
            title: "Paint the Hall of Inflation",
            description: "Enemy Level boost Inflation Relics",
            unlocked() { return hasUpgrade("ch", 32)},
            cost: new ExpantaNum("1e55"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Inflation Relics",
            currencyInternalName: "inflationrelics",
                effect() 
                {
                     return player[this.layer].enemylevel.add(1).pow(5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        34:
        { 
            title: "Build another Hall of Inflation",
            description: "Unlocks Inflation Relics^2",
            unlocked() { return hasUpgrade("ch", 33)},
            cost: new ExpantaNum("1e165"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Inflation Relics",
            currencyInternalName: "inflationrelics",
        },
        35:
        { 
            title: "Add another Floor to the Hall of Inflation",
            description: "Inflation Relics^2 boost Inflation Relics^2",
            unlocked() { return hasUpgrade("ch", 34)},
            cost: new ExpantaNum("1e210"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Inflation Relics",
            currencyInternalName: "inflationrelics",
                effect() 
                {
                     return player[this.layer].inflationrelics2.add(1).pow(0.7)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        36:
        { 
            title: "Add a basement to the Hall of Inflation",
            description: "Automates buying Hall of Inflation Buyables and stops autobuying Heroes and Ancients (Lag Purposes)",
            unlocked() { return hasUpgrade("ch", 35)},
            cost: new ExpantaNum("1e300"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Inflation Relics",
            currencyInternalName: "inflationrelics",
        },
        37:
        { 
            title: "Add a Bouncy House outside of the Hall of Inflation",
            description: "Boosts DPS based on Gold",
            unlocked() { return hasUpgrade("ch", 36)},
            cost: new ExpantaNum("1e6"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Inflation Relics^2",
            currencyInternalName: "inflationrelics2",
                effect() 
                {
                     return player[this.layer].gold.add(1).pow(50)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        38:
        { 
            title: "Inflate it so Much that it is kind of Concerning",
            description: "Boosts Inflation Relics^2 based on DPS",
            unlocked() { return hasUpgrade("ch", 37)},
            cost: new ExpantaNum("1e370"),
            currencyLocation() { return player.ch },
            currencyDisplayName: "Inflation Relics",
            currencyInternalName: "inflationrelics",
                effect() 
                {
                     return player[this.layer].damagepersecond.add(1).pow(0.00001)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        39:
        { 
            title: "THE END",
            description: "Finishes the layer",
            unlocked() { return hasUpgrade("ch", 38)},
            cost: new ExpantaNum("ee1000"),
        },
    },
    clickables: {
    11: {
        display() {return "<img src='resources/sword.png' style='width:calc(130%);height:calc(60%);margin:-15%'></img>"},
    },
    12: {
        display() {return "<img src='resources/enemy.png' style='width:calc(90%);height:calc(45%);margin:-15%'></img>"},
    },
    13: {
        title() {return "Zone " + format(player.ch.zone.add(1))},
    },
    14: {
        canClick() { return true },
        title() {return "You are here at Zone " + format(player.ch.zone)},
    },
    15: {
        title() {return "Zone " + format(player.ch.zone.sub(1))},
    },
    },
                buyables:
    {
        11: {
        cost(x) { return new ExpantaNum(2).pow(x.div(12)).mul(2) },
        title: "Cid, the Helpful Adventurer",
        unlocked() { return true },
        canAfford() { return player.ch.gold.gte(this.cost()) },
        buy() {
            if (!hasMilestone('ch', 13)) player.ch.gold = player.ch.gold.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Gold\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Damage Per Second";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('ch', 12))).pow(1.5).add(1)
        },
        },
        12: {
        cost(x) { return new ExpantaNum(10).pow(x.div(12.5)).mul(10) },
        title: "Treebeast",
        unlocked() { return (player[this.layer].buyables[11] >= 5)},
        canAfford() { return player.ch.gold.gte(this.cost()) },
        buy() {
            if (!hasMilestone('ch', 13)) player.ch.gold = player.ch.gold.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Gold\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cid";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('ch', 13))).pow(1.5).add(1)
        },
        },
        13: {
        cost(x) { return new ExpantaNum(100).pow(x.div(13)).mul(100) },
        title: "Brittany, Beach Princess",
        unlocked() { return (player[this.layer].buyables[12] >= 5)},
        canAfford() { return player.ch.gold.gte(this.cost()) },
        buy() {
            if (!hasMilestone('ch', 13)) player.ch.gold = player.ch.gold.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Gold\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Treebeast";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('ch', 14))).pow(1.5).add(1)
        },
        },
        14: {
        cost(x) { return new ExpantaNum(1000).pow(x.div(13.5)).mul(1000) },
        title: "The Masked Samurai",
        unlocked() { return (player[this.layer].buyables[13] >= 5)},
        canAfford() { return player.ch.gold.gte(this.cost()) },
        buy() {
            if (!hasMilestone('ch', 13)) player.ch.gold = player.ch.gold.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Gold\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Brittany";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('ch', 15))).pow(1.5).add(1)
        },
        },
        15: {
        cost(x) { return new ExpantaNum(1e5).pow(x.div(14)).mul(1e5) },
        title: "The Great Forest Seer",
        unlocked() { return (player[this.layer].buyables[14] >= 10)},
        canAfford() { return player.ch.gold.gte(this.cost()) },
        buy() {
            if (!hasMilestone('ch', 13)) player.ch.gold = player.ch.gold.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Gold\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to The Masked Samurai";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('ch', 16))).pow(1.5).add(1)
        },
        },
        16: {
        cost(x) { return new ExpantaNum(1e6).pow(x.div(14)).mul(1e6) },
        title: "Mercedes, Duchess of Blades",
        unlocked() { return (player[this.layer].buyables[15] >= 5)},
        canAfford() { return player.ch.gold.gte(this.cost()) },
        buy() {
            if (!hasMilestone('ch', 13)) player.ch.gold = player.ch.gold.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Gold\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to The Great Forest Seer";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('ch', 17))).pow(1.5).add(1)
        },
        },
        17: {
        cost(x) { return new ExpantaNum(1e8).pow(x.div(14.5)).mul(1e8) },
        title: "King Midas",
        unlocked() { return (player[this.layer].buyables[16] >= 5)},
        canAfford() { return player.ch.gold.gte(this.cost()) },
        buy() {
            if (!hasMilestone('ch', 13)) player.ch.gold = player.ch.gold.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Gold\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Mercedes, Duchess of Blades";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('ch', 18))).pow(1.5).add(1)
        },
        },
        18: {
        cost(x) { return new ExpantaNum(1e9).pow(x.div(15)).mul(1e9) },
        title: "Amenhotep",
        unlocked() { return hasMilestone("ch", 12)},
        canAfford() { return player.ch.gold.gte(this.cost()) },
        buy() {
            if (!hasMilestone('ch', 13)) player.ch.gold = player.ch.gold.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Gold\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Mercedes, Duchess of Blades";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(1.5).add(1)
        },
        },
        21: {
        cost(x) { return new ExpantaNum(1000) },
        title: "Powersurge",
        unlocked() { return hasUpgrade("ch", 18) },
        canAfford() { return player.ch.powersurgecooldown <= 0 },
        buy() {

                        if (player.ch.powersurgetime <= 0)
                        {
                           player.ch.powersurgetime = new ExpantaNum(30)
                        }
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "x100 boost to Damage per Second \n\
           Spell time: " + formatTime(player.ch.powersurgetime) + " seconds" + " \n\
           Cooldown time: " + formatTime(player.ch.powersurgecooldown) + " seconds";
         },
        },
        22: {
        cost(x) { return new ExpantaNum(1000) },
        title: "Metal Detector",
        unlocked() { return hasUpgrade("ch", 21) },
        canAfford() { return player.ch.metaldetectorcooldown <= 0 },
        buy() {

                        if (player.ch.metaldetectortime <= 0)
                        {
                            player.ch.metaldetectortime = new ExpantaNum(120)
                        }
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "x5 boost to Coins\n\
           Spell time: " + formatTime(player.ch.metaldetectortime) + " seconds" + " \n\
           Cooldown time: " + formatTime(player.ch.metaldetectorcooldown) + " seconds";
         },
        },
        23: {
        cost(x) { return new ExpantaNum(1000) },
        title: "Ancient Treasure",
        unlocked() { return hasUpgrade("ch", 23) },
        canAfford() { return player.ch.ancienttreasurecooldown <= 0 },
        buy() {
              player.ch.gold = player.ch.gold.add(player.ch.goldtoget.mul(2000))
              player.ch.ancienttreasurecooldown = new ExpantaNum(7200)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Gains 2000x Enemy drops worth of Gold on use" + " \n\
           Cooldown time: " + formatTime(player.ch.ancienttreasurecooldown) + " seconds";
         },
        },
        24: {
        cost(x) { return new ExpantaNum(1000) },
        title: "Ascension",
        unlocked() { return true },
        canAfford() { return player.ch.zone >= 20 },
        buy() {
              player.ch.gold = new ExpantaNum(0)
              player.ch.buyables[11] = new ExpantaNum(0)
              player.ch.buyables[12] = new ExpantaNum(0)
              player.ch.buyables[13] = new ExpantaNum(0)
              player.ch.buyables[14] = new ExpantaNum(0)
              player.ch.buyables[15] = new ExpantaNum(0)
              player.ch.buyables[16] = new ExpantaNum(0)
              player.ch.buyables[17] = new ExpantaNum(0)
              player.ch.buyables[18] = new ExpantaNum(0)
              player.ch.enemylevel = new ExpantaNum(1)
              player.ch.enemymaxhealth = new ExpantaNum(10)
              player.ch.enemyhealth = new ExpantaNum(10)
              player.ch.goldtoget = new ExpantaNum(1)
              player.ch.herosouls = player.ch.herosouls.add(player.ch.herosoulstoget)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Reset for " + format(player.ch.herosoulstoget) + " Hero Souls (Requires Zone 20)";
         },
        },
        31: {
        cost(x) { return new ExpantaNum(2).pow(x.div(8)).mul(2) },
        title: "Mammon, Ancient of Greed",
        unlocked() { return hasMilestone("ch", 13)},
        canAfford() { return player.ch.herosouls.gte(this.cost()) },
        buy() {
            player.ch.herosouls = player.ch.herosouls.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Hero Souls\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Gold";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(10).add(1)
        },
        },
        32: {
        cost(x) { return new ExpantaNum(10).pow(x.div(7.5)).mul(10) },
        title: "Siyalatas, Ancient of Abandon",
        unlocked() { return player.ch.buyables[31] >= 10 },
        canAfford() { return player.ch.herosouls.gte(this.cost()) },
        buy() {
            player.ch.herosouls = player.ch.herosouls.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Hero Souls\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to DPS";
         },
        effect() 
        {
            let basevalue = new ExpantaNum(1000)
            return player[this.layer].buyables[this.id].mul(basevalue.pow(player[this.layer].buyables[this.id])).pow(2).add(1)
        },
        },
        33: {
        cost(x) { return new ExpantaNum(100).pow(x.div(7.25)).mul(100) },
        title: "Chronos, Ancient of Time",
        unlocked() { return player.ch.buyables[32] >= 5 },
        canAfford() { return player.ch.herosouls.gte(this.cost()) },
        buy() {
            player.ch.herosouls = player.ch.herosouls.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Hero Souls\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to DPS based on time after buying one of this Ancient";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul(player.ch.chronostime).pow(9).add(1)
        },
        },
        34: {
        cost(x) { return new ExpantaNum(1000).pow(x.div(7)).mul(1000) },
        title: "Morgulis, Ancient of Death",
        unlocked() { return player.ch.buyables[33] >= 5 },
        canAfford() { return player.ch.herosouls.gte(this.cost()) },
        buy() {
            player.ch.herosouls = player.ch.herosouls.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Hero Souls\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Hero Souls";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(2).add(1)
        },
        },
        35: {
        cost(x) { return new ExpantaNum(3).pow(x.div(2)).mul(3) },
        title: "Upgrade the Hall of Inflation",
        unlocked() { return player.ch.buyables[33] >= 5 },
        canAfford() { return player.ch.inflationrelics.gte(this.cost()) },
        buy() {
            player.ch.inflationrelics = player.ch.inflationrelics.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Inflation Totems\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Inflation Totems";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(6.5).add(1)
        },
        },
        36: {
        cost(x) { return new ExpantaNum(100).pow(x.div(2)).mul(100) },
        title: "Make the Hall of Inflation Bigger",
        unlocked() { return hasUpgrade("ch", 29) },
        canAfford() { return player.ch.inflationrelics.gte(this.cost()) },
        buy() {
            player.ch.inflationrelics = player.ch.inflationrelics.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Inflation Totems\n\
           Level: " + player[this.layer].buyables[this.id] + " \n\
           +^" + format(data.effect) + " to the Inflation Totems Effect Power";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.8)
        },
        },
    },
    milestones: {
    11: {
        requirementDescription: "Reach Zone 6",
        effectDescription: "Unlocks a new Tab",
        done() { return player.ch.zone.gte(6) }
    },
    12: {
        requirementDescription: "Reach Zone 14",
        effectDescription: "Gains 100% of Gold on Kill per second and unlocks the Final Hero",
        done() { return player.ch.zone.gte(14) }
    },
    13: {
        requirementDescription: "Reach Zone 20",
        effectDescription: "Autobuys all Heroes",
        done() { return player.ch.zone.gte(20) }
    },
    14: {
        requirementDescription: "Reach Zone 666",
        effectDescription: "Autobuys all Ancients",
        done() { return player.ch.zone.gte(666) }
    },
    },
    update(delta) 
    {
        if (hasUpgrade("ch", 11)) player.ch.heroicpointspersecond = new ExpantaNum(1)
        if (hasUpgrade("ch", 12)) player.ch.heroicpointspersecond = player.ch.heroicpointspersecond.mul(upgradeEffect("ch", 12))
        if (hasUpgrade("ch", 13)) player.ch.heroicpointspersecond = player.ch.heroicpointspersecond.mul(upgradeEffect("ch", 13))
        player.ch.heroicpointspersecond = player.ch.heroicpointspersecond.mul(player.ch.goldeffect)
        player.ch.points = player.ch.points.add(player.ch.heroicpointspersecond.mul(delta))

        heroictimegain = new ExpantaNum(1)
        if (hasUpgrade("ch", 13)) player.ch.heroictime = player.ch.heroictime.add(heroictimegain.mul(delta))

        spellspeed = new ExpantaNum(1)
        if (hasUpgrade("ch", 15)) player.ch.damagepersecond = new ExpantaNum(1)
        player.ch.damagepersecond = player.ch.damagepersecond.mul(buyableEffect("ch", 11))
        if (hasUpgrade("ch", 16)) player.ch.damagepersecond = player.ch.damagepersecond.mul(upgradeEffect("ch", 16))
        if (hasUpgrade("ch", 17)) player.ch.damagepersecond = player.ch.damagepersecond.mul(upgradeEffect("ch", 17))
        if (hasUpgrade("i2", 16)) player.ch.damagepersecond = player.ch.damagepersecond.mul(player.i2.incrementalstoneseffect2)
        player.ch.damagepersecond = player.ch.damagepersecond.mul(player.ch.herosoulseffect)
        player.ch.damagepersecond = player.ch.damagepersecond.mul(buyableEffect("ch", 32))
        player.ch.damagepersecond = player.ch.damagepersecond.mul(buyableEffect("ch", 33))
        if (hasUpgrade("ch", 37)) player.ch.damagepersecond = player.ch.damagepersecond.mul(upgradeEffect("ch", 37))
        let powersurgetimesub = new ExpantaNum(1)
        let powersurgecooldownsub = new ExpantaNum(1)
        if (hasUpgrade("ch", 22)) powersurgecooldownsub = powersurgecooldownsub.mul(5)
        if (hasUpgrade("ch", 27)) powersurgecooldownsub = powersurgecooldownsub.mul(10)
        if (player.ch.powersurgetime > 0)
        {
            player.ch.damagepersecond = player.ch.damagepersecond.mul(100)
            player.ch.powersurgetime = player.ch.powersurgetime.sub(powersurgetimesub.mul(delta))  
		}
        if (player.ch.powersurgecooldown > 0)
        {
            player.ch.powersurgecooldown = player.ch.powersurgecooldown.sub(powersurgecooldownsub.mul(delta))  
		}
        if (player.ch.powersurgetime < 0)
        {
            player.ch.powersurgecooldown = new ExpantaNum(60)
            player.ch.powersurgetime = new ExpantaNum(0) 
		}
        if (player.ch.powersurgecooldown < 0)
        {
            player.ch.powersurgecooldown = new ExpantaNum(0) 
		}
        player.ch.enemyhealth = player.ch.enemyhealth.sub(player.ch.damagepersecond.mul(delta))
        player.ch.goldtoget = player.ch.enemylevel.pow(1.5)
        let metaldetectortimesub = new ExpantaNum(1)
        let metaldetectorcooldownsub = new ExpantaNum(1)
        if (hasUpgrade("ch", 22)) metaldetectorcooldownsub = metaldetectorcooldownsub.mul(5)
        if (hasUpgrade("ch", 27)) metaldetectorcooldownsub = metaldetectorcooldownsub.mul(10)
        if (player.ch.metaldetectortime > 0)
        {
            player.ch.goldtoget = player.ch.goldtoget.mul(5)
            player.ch.metaldetectortime = player.ch.metaldetectortime.sub(metaldetectortimesub.mul(delta))  
		}
        if (player.ch.metaldetectorcooldown > 0)
        {
            player.ch.metaldetectorcooldown = player.ch.metaldetectorcooldown.sub(metaldetectorcooldownsub.mul(delta))  
		}
        if (player.ch.metaldetectortime < 0)
        {
            player.ch.metaldetectorcooldown = new ExpantaNum(180)
            player.ch.metaldetectortime = new ExpantaNum(0) 
		}
        if (player.ch.metaldetectorcooldown < 0)
        {
            player.ch.metaldetectorcooldown = new ExpantaNum(0) 
		}
        if (hasUpgrade("ch", 19)) player.ch.goldtoget = player.ch.goldtoget.mul(upgradeEffect("ch", 19))
        player.ch.goldtoget = player.ch.goldtoget.mul(buyableEffect("ch", 31))
        if (hasUpgrade("ch", 29)) player.ch.goldtoget = player.ch.goldtoget.mul(upgradeEffect("ch", 29))

        let goldeffectpow = new ExpantaNum(3.5)
        if (hasUpgrade("m", 15)) goldeffectpow = new ExpantaNum(20)
        goldeffectpow = goldeffectpow.plus(player.l.militarytimeeffect)
        player.ch.goldeffect = player.ch.gold.pow(goldeffectpow).add(1)

        if (player.ch.enemyhealth <= 0)
        {  
            if (!hasUpgrade("ch", 25)) player.ch.enemylevel = player.ch.enemylevel.add(1)
            if ((hasUpgrade("ch", 25)) && (!hasUpgrade("ch", 32))) player.ch.enemylevel = player.ch.enemylevel.add(10)
            if (hasUpgrade("ch", 32)) player.ch.enemylevel = player.ch.enemylevel.add(100000)
            player.ch.gold = player.ch.gold.add(player.ch.goldtoget)
            if (!hasUpgrade("ch", 25))  player.ch.enemymaxhealth = player.ch.enemymaxhealth.mul(1.2)
            if ((hasUpgrade("ch", 25)) && (!hasUpgrade("ch", 32)))  player.ch.enemymaxhealth = player.ch.enemymaxhealth.mul(6.1917364224)
            if (hasUpgrade("ch", 32))  player.ch.enemymaxhealth = player.ch.enemymaxhealth.mul("1.332e7918")
            player.ch.enemyhealth = player.ch.enemymaxhealth
		}

        player.ch.zone = player.ch.enemylevel.div(50).round(50)

        if (hasMilestone("ch", 12))
        {
            player.ch.gold = player.ch.gold.add(player.ch.goldtoget.div(10))                             
		}

        ancienttreasurecooldowncub = new ExpantaNum(1)
        if (hasUpgrade("ch", 27)) ancienttreasurecooldowncub = ancienttreasurecooldowncub.mul(10)
        if (player.ch.ancienttreasurecooldown > 0)
        {
            player.ch.ancienttreasurecooldown = player.ch.ancienttreasurecooldown.sub(ancienttreasurecooldowncub.mul(delta))  
		}
        if (player.ch.ancienttreasurecooldown < 0)
        {
            player.ch.ancienttreasurecooldown = new ExpantaNum(0)
		}

        let herosoulsmult = new ExpantaNum(1)
        player.ch.herosoulstoget = player.ch.gold.pow(0.05).mul(herosoulsmult)
        player.ch.herosoulstoget = player.ch.herosoulstoget.mul(buyableEffect("ch", 34))
        player.ch.herosoulstoget = player.ch.herosoulstoget.mul(player.ch.inflationrelicseffect)

        player.ch.herosoulseffect = player.ch.herosouls.mul(10).pow(7.5).add(1)

        let chronosgain = new ExpantaNum(1)
        if (player.ch.buyables[33] >= 1)
        {
            player.ch.chronostime = player.ch.chronostime.add(chronosgain.mul(delta))
		}
        if (hasUpgrade("ch", 26))  player.ch.herosouls = player.ch.herosouls.add(player.ch.herosoulstoget.mul(delta))

        let inflationrelicspow = new ExpantaNum(10)
        inflationrelicspow = inflationrelicspow.add(buyableEffect("ch", 36))
        player.ch.inflationrelics = player.ch.inflationrelics.add(player.ch.inflationrelicspersecond.mul(delta))
        if (hasUpgrade("ch", 28)) player.ch.inflationrelicspersecond = new ExpantaNum(1)
        player.ch.inflationrelicspersecond = player.ch.inflationrelicspersecond.mul(buyableEffect("ch", 35))
        if (hasUpgrade("ch", 31)) player.ch.inflationrelicspersecond = player.ch.inflationrelicspersecond.mul(upgradeEffect("ch", 31))
        if (hasUpgrade("ch", 33)) player.ch.inflationrelicspersecond = player.ch.inflationrelicspersecond.mul(upgradeEffect("ch", 33))
        player.ch.inflationrelicspersecond = player.ch.inflationrelicspersecond.mul(player.ch.inflationrelics2effect)
        player.ch.inflationrelicseffect = player.ch.inflationrelics.pow(inflationrelicspow).add(1)

        player.ch.inflationrelics2 = player.ch.inflationrelics2.add(player.ch.inflationrelics2persecond.mul(delta))
        if (hasUpgrade("ch", 34)) player.ch.inflationrelics2persecond = new ExpantaNum(1)
        if (hasUpgrade("ch", 35)) player.ch.inflationrelics2persecond = player.ch.inflationrelics2persecond.mul(upgradeEffect("ch", 35))
        if (hasUpgrade("ch", 38)) player.ch.inflationrelics2persecond = player.ch.inflationrelics2persecond.mul(upgradeEffect("ch", 38))
        player.ch.inflationrelics2effect = player.ch.inflationrelics2.pow(7).add(1)
    },
        microtabs: 
    {
        stuff: 
        {
          "Development": {
          content: [
          ["blank", "15px"],
          ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
          ]
          },
          "Clicker Heroes": {
          unlocked() { return hasUpgrade("ch", 14) },
          content: [
          ["display-text", () => "Gold: " + format(player.ch.gold) + " and a x" + format(player.ch.goldeffect) + " boost to Heroic Points"],
          ["row", [["clickable", 11], ["blank", "100px"], ["clickable", 12]]],
          ["display-text", () => "Enemy HP: " + format(player.ch.enemyhealth) + "/" + format(player.ch.enemymaxhealth) ],
          ["display-text", () => "Gold on Kill: " + format(player.ch.goldtoget)],
          ["display-text", () => "Level: " + format(player.ch.enemylevel) ],
          ["display-text", () => "Damage Per Second: " + format(player.ch.damagepersecond) ],
          ["row", [["upgrade", 15], ["upgrade", 16], ["upgrade", 17], ["upgrade", 19], ["upgrade", 24]]],
          ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
          ["row", [["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
          ]
          },
          "Zones": {
          unlocked() { return hasUpgrade("ch", 17) },
          content: [
          ["display-text", () => "Gold: " + format(player.ch.gold) + " and a x" + format(player.ch.goldeffect) + " boost to Heroic Points"],
          ["row", [["clickable", 13]]],
          ["row", [["clickable", 14]]],
          ["row", [["clickable", 15]]],
          ["blank", "15px"],
          ["row", [["milestone", 11]]],
          ["row", [["milestone", 12]]],
          ["row", [["milestone", 13]]],
          ["row", [["milestone", 14]]],
          ]
          },
          "Skills": {
          unlocked() { return hasMilestone("ch", 11) },
          content: [
          ["display-text", () => "Gold: " + format(player.ch.gold) + " and a x" + format(player.ch.goldeffect) + " boost to Heroic Points"],
          ["row", [["upgrade", 18], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 27]]],
          ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23]]],
          ]
          },
          "Ascension": {
          unlocked() { return hasUpgrade("ch", 24) },
          content: [
          ["display-text", () => "Gold: " + format(player.ch.gold) + " and a x" + format(player.ch.goldeffect) + " boost to Heroic Points"],
          ["display-text", () => "Level: " + format(player.ch.enemylevel) ],
          ["display-text", () => "Zone: " + format(player.ch.zone) ],
          ["display-text", () => "Hero Souls: " + format(player.ch.herosouls) + " and a x" + format(player.ch.herosoulseffect) + " boost to Damage per Second"],
          ["row", [["buyable", 24]]],
          ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33], ["buyable", 34]]],
          ["blank", "15px"],
          ["row", [["upgrade", 25], ["upgrade", 26], ["upgrade", 28]]],
          ]
          },
          "The Hall of Inflation": {
          unlocked() { return hasUpgrade("ch", 28) },
          content: [
          ["display-text", () => "Gold: " + format(player.ch.gold) + " and a x" + format(player.ch.goldeffect) + " boost to Heroic Points"],
          ["display-text", () => "Level: " + format(player.ch.enemylevel) ],
          ["display-text", () => "Hero Souls: " + format(player.ch.herosouls) + " and a x" + format(player.ch.herosoulseffect) + " boost to Damage per Second"],
          ["blank", "15px"],
          ["display-text", () => "Inflation Relics: " + format(player.ch.inflationrelics) + " and a x" + format(player.ch.inflationrelicseffect) + " boost to Hero Souls"],
          ["display-text", () => "You are gaining " + format(player.ch.inflationrelicspersecond) + " inflation relics per second"],
          ["row", [["buyable", 35], ["buyable", 36]]],
          ["row", [["upgrade", 29], ["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34], ["upgrade", 35], ["upgrade", 36]]],
          ["row", [["upgrade", 37], ["upgrade", 38]]],
          ["display-text", () => hasUpgrade("ch", 34) ? "You have " + format(player.ch.inflationrelics2) + " Inflation Relics^2, and a x" + format(player.ch.inflationrelics2effect) + " boost to Inflation Relics" : ""],
          ["display-text", () => hasUpgrade("ch", 34) ? "You are gaining " + format(player.ch.inflationrelics2persecond) + " Inflation Relics^2 per second" : ""],
          ]
          },
        },
    },
            tabFormat: [
        "main-display",
        ["row", [["upgrade", 39]]],
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    layerShown(){return hasUpgrade("l", 118)}
},
)
// A side layer with achievements, with no prestige
addLayer("i2", {
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
        incrementalblessings: new ExpantaNum(0),
        incrementalblessingeffect: new ExpantaNum(0),
        incrementalritualtime: new ExpantaNum(0),
        incrementalritualcooldown: new ExpantaNum(0),
        incrementalstoneseffect1: new ExpantaNum(0),
        cookieblessings: new ExpantaNum(0),
        cookieblessingeffect: new ExpantaNum(0),
        cookieritualtime: new ExpantaNum(0),
        cookieritualcooldown: new ExpantaNum(0),
        incrementalstoneseffect2: new ExpantaNum(0),
        incrementalstoneseffect3: new ExpantaNum(0),
        antimatterblessings: new ExpantaNum(0),
        antimatterblessingeffect: new ExpantaNum(0),
        antimatterritualtime: new ExpantaNum(0),
        antimatterritualcooldown: new ExpantaNum(0),
        clickerblessings: new ExpantaNum(0),
        clickerblessingeffect: new ExpantaNum(0),
        clickerritualtime: new ExpantaNum(0),
        clickerritualcooldown: new ExpantaNum(0),
        incrementalstoneseffect4: new ExpantaNum(0),
    }},
            nodeStyle: 
            {
            background: "linear-gradient(180deg, #ff0000, #ff7700, #ffff00, #77ff00, #00ff00, #00ff77, #00ffff, #0077ff, #0000ff, #7700ff, #ff00ff, #ff0077)",
            "background-origin": "border-box",
    },
    color: "#123456",
    symbol: "<p style='transform: scale(-2, -2)'><alternate>I2</alternate></p>",
    resource: " Incremental Stones", 
    row: "side",
    midsection: ["grid", "blank"],
    branches: ["cc"],
    displayRow: 1,
    position: 1, 
        automate()
    {
    if (hasUpgrade('i2', 14)) {
    buyBuyable(this.layer, 11)
    }
    if (hasUpgrade('i2', 18)) {
    buyBuyable(this.layer, 12)
    }
    if (hasUpgrade('i2', 19)) {
    buyBuyable(this.layer, 13)
    }
    if (hasUpgrade('h', 17)) {
    buyBuyable(this.layer, 14)
    }
    },
    buyables:
    {
    },    
    upgrades: 
    {
        11:
        { 
            title: "Start the Ritual",
            description: "Gain 1 Incremental Stone per Second",
            unlocked() { return true },
            cost: new ExpantaNum("0"),
        },
        12:
        { 
            title: "Wait a whole minute for this Upgrade >:(",
            description: "Unlocks the Incremental Ritual",
            unlocked() { return hasUpgrade("i2", 11) },
            cost: new ExpantaNum("60"),
        },
        13:
        { 
            title: "Boosters? I'm interested!",
            description: "Unlocks the Booster Tab",
            unlocked() { return hasUpgrade("i2", 12) },
            cost: new ExpantaNum("1e10"),
        },
        14:
        { 
            title: "Back at the Cookies",
            description: "Unlocks the Cookie Ritual",
            unlocked() { return hasUpgrade("i2", 12) },
            cost: new ExpantaNum("1e20"),
        },
        15:
        { 
            title: "Blessing Automation",
            description: "Automates the Incremental Ritual",
            unlocked() { return hasUpgrade("i2", 14) },
            cost: new ExpantaNum("ee1e180"),
            currencyLocation() { return player },
            currencyDisplayName: "Points",
            currencyInternalName: "points",
        },
        16:
        { 
            title: "Bring on the Boosters!",
            description: "Unlocks the second Incremental Stone effect",
            unlocked() { return hasUpgrade("i2", 15) },
            cost: new ExpantaNum("1e45"),
        },
        17:
        { 
            title: "A Great Boost!",
            description: "Unlocks the third Incremental Stone effect",
            unlocked() { return hasUpgrade("i2", 16) },
            cost: new ExpantaNum("1e60"),
        },
        18:
        { 
            title: "Aha! The Game Inflated Again!",
            description: "Automates the Cookie Ritual and unlocks another Ritual",
            unlocked() { return hasUpgrade("i2", 17) },
            cost: new ExpantaNum("ee1e8000000"),
            currencyLocation() { return player },
            currencyDisplayName: "Points",
            currencyInternalName: "points",
        },
        19:
        { 
            title: "The Gods are seeing your worth...",
            description: "Automates the Antimatter Dimensions Ritual and unlocks another Ritual and Effect #3 boosts Clicker Heroes time as well",
            unlocked() { return hasUpgrade("i2", 18) },
            cost: new ExpantaNum("eeeeee2"),
            currencyLocation() { return player },
            currencyDisplayName: "Points",
            currencyInternalName: "points",
        },
        21:
        { 
            title: "Finally, another useful boost!",
            description: "Unlocks the fourth Incremental Stone effect",
            unlocked() { return hasUpgrade("rg", 16) },
            cost: new ExpantaNum("7e77777"),
        },
    },
    clickables: {
    },
    buyables:
    {
        11: {
        cost(x) { return },
        title: "Incremental Ritual",
        unlocked() { return hasUpgrade("i2", 12) },
        canAfford() { return player.i2.incrementalritualcooldown <= 0 },
        buy() {
        if (player.i2.incrementalritualtime <= 0)
        {
            player.i2.incrementalritualtime = new ExpantaNum(360)
		}
        },
                 display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "+1 Incremental Blessing per ritual\n\
           Ritual time: " + formatTime(player.i2.incrementalritualtime) + " seconds" + " \n\
           Cooldown time: " + formatTime(player.i2.incrementalritualcooldown) + " seconds";
         },
        },
        12: {
        cost(x) { return },
        title: "Cookie Ritual",
        unlocked() { return hasUpgrade("i2", 14) },
        canAfford() { return player.i2.cookieritualcooldown <= 0 },
        buy() {
        if (player.i2.cookieritualtime <= 0)
        {
            player.i2.cookieritualtime = new ExpantaNum(10)
        }
		},
                 display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "+1 Cookie Blessing per ritual\n\
           Ritual time: " + formatTime(player.i2.cookieritualtime) + " seconds" + " \n\
           Cooldown time: " + formatTime(player.i2.cookieritualcooldown) + " seconds";
         },
        },
        13: {
        cost(x) { return },
        title: "Antimatter Ritual",
        unlocked() { return hasUpgrade("i2", 18) },
        canAfford() { return player.i2.antimatterritualcooldown <= 0 },
        buy() {
        if (player.i2.antimatterritualtime <= 0)
        {
            player.i2.antimatterritualtime = new ExpantaNum(1800)
		}
        },
                 display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "+1 Antimatter Blessing per ritual\n\
           Ritual time: " + formatTime(player.i2.antimatterritualtime) + " seconds" + " \n\
           Cooldown time: " + formatTime(player.i2.antimatterritualcooldown) + " seconds";
         },
        },
        14: {
        cost(x) { return },
        title: "Clicker Heroes Ritual",
        unlocked() { return hasUpgrade("i2", 19) },
        canAfford() { return player.i2.clickerritualcooldown <= 0 },
        buy() {
        if (player.i2.clickerritualtime <= 0)
        {
            player.i2.clickerritualtime = new ExpantaNum(2)
		}
        },
                 display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "+1 Clicker Heroes Blessing per ritual\n\
           Ritual time: " + formatTime(player.i2.clickerritualtime) + " seconds" + " \n\
           Cooldown time: " + formatTime(player.i2.clickerritualcooldown) + " seconds";
         },
        },
    },
    milestones: {
    },
    infoboxes: {
    lore: {
        title: "ee1e125 Points: Act 1: The Beginning",
        body() { return "Yes, you may be wondering. Why is the lore this far into the game? Well, it's only the beginning. You will learn why you are doing this. You will learn about what you have to accomplish in this game. You see, you have been appointed by a god to do this. Who? I do not know. Why? I can not tell you. But all you know is what. You have to master the arts of all of these incremental games. In a world where Incremental games doesn't exist, you are there to create them. Now you are reading this, go and start an Incremental Ritual for the gods. They like it." },
    },
        lore2: {
        unlocked() { return player.points > "10^^6" },
        title: "1F6 Points: Act 2: The Hub",
        body() { return "You realize what you have been doing. You are the Gods Servant. You make all these games to power the gods. You think to yourself, I will be better than the Gods one day. You made it far enough to unlock the hub. The main layer of everything. Good Luck." },
    },
    },
    update(delta) 
    {
        incrementalstonegain = new ExpantaNum(1)
        incrementalstonegain = incrementalstonegain.mul(player.i2.incrementalblessingeffect)
        if (hasUpgrade("i2", 11)) player.i2.points = player.i2.points.add(incrementalstonegain.mul(delta))

        let incrementalblessinggain = new ExpantaNum(0.00277777777778)
        incrementalblessinggain = incrementalblessinggain.mul(player.i2.cookieblessingeffect)
        incrementalblessinggain = incrementalblessinggain.mul(player.h.moonlighteffect)
        let incrementalritualtimesub = new ExpantaNum(1)
        let incrementalritualcooldownsub = new ExpantaNum(1)
        if (hasUpgrade("h", 17)) incrementalritualcooldownsub = incrementalritualcooldownsub.mul(player.h.timeeffect2)
        if (hasUpgrade("h", 18)) incrementalritualcooldownsub = incrementalritualcooldownsub.mul(player.h.sunshineeffect)
        if (player.i2.incrementalritualtime > 0)
        {
            player.i2.incrementalblessings = player.i2.incrementalblessings.add(incrementalblessinggain.mul(delta))
            player.i2.incrementalritualtime = player.i2.incrementalritualtime.sub(incrementalritualtimesub.mul(delta))  
		}
        if (player.i2.incrementalritualcooldown > 0)
        {
            player.i2.incrementalritualcooldown = player.i2.incrementalritualcooldown.sub(incrementalritualcooldownsub.mul(delta))  
		}
        if (player.i2.incrementalritualtime < 0)
        {
            player.i2.incrementalritualcooldown = new ExpantaNum(360)
            player.i2.incrementalritualtime = new ExpantaNum(0) 
		}
        if (player.i2.incrementalritualcooldown < 0)
        {
            player.i2.incrementalritualcooldown = new ExpantaNum(0) 
		}
        player.i2.incrementalblessingeffect = player.i2.incrementalblessings.add(1).pow(40)

        player.i2.incrementalstoneseffect1 = player.i2.points.pow(0.3).add(1)
        player.i2.incrementalstoneseffect2 = player.i2.points.plus(1).log10().pow(0.8)
        player.i2.incrementalstoneseffect3 = player.i2.points.plus(1).log10().pow(0.2)
        player.i2.incrementalstoneseffect4 = player.i2.points.plus(1).log10().pow(0.08).mul(100000)

        let cookieblessinggain = new ExpantaNum(0.1)
        cookieblessinggain = cookieblessinggain.mul(player.i2.antimatterblessingeffect)
        cookieblessinggain = cookieblessinggain.mul(player.h.moonlighteffect)
        let cookieritualtimesub = new ExpantaNum(1)
        let cookieritualcooldownsub = new ExpantaNum(1)
        if (hasUpgrade("h", 17)) cookieritualcooldownsub = cookieritualcooldownsub.mul(player.h.timeeffect2)
        if (hasUpgrade("h", 18)) cookieritualcooldownsub = cookieritualcooldownsub.mul(player.h.sunshineeffect)
        if (player.i2.cookieritualtime > 0)
        {
            player.i2.cookieblessings = player.i2.cookieblessings.add(cookieblessinggain.mul(delta))
            player.i2.cookieritualtime = player.i2.cookieritualtime.sub(cookieritualtimesub.mul(delta))  
		}
        if (player.i2.cookieritualcooldown > 0)
        {
            player.i2.cookieritualcooldown = player.i2.cookieritualcooldown.sub(cookieritualcooldownsub.mul(delta))  
		}
        if (player.i2.cookieritualtime < 0)
        {
            player.i2.cookieritualcooldown = new ExpantaNum(420)
            player.i2.cookieritualtime = new ExpantaNum(0) 
		}
        if (player.i2.cookieritualcooldown < 0)
        {
            player.i2.cookieritualcooldown = new ExpantaNum(0) 
		}
        player.i2.cookieblessingeffect = player.i2.cookieblessings.add(1).pow(5)

        let antimatterblessinggain = new ExpantaNum(0.0005555555555555555555555)
        antimatterblessinggain = antimatterblessinggain.mul(player.i2.clickerblessingeffect)
        antimatterblessinggain = antimatterblessinggain.mul(player.h.moonlighteffect)
        let antimatterritualtimesub = new ExpantaNum(1)
        let antimatterritualcooldownsub = new ExpantaNum(1)
        if (hasUpgrade("h", 17)) antimatterritualcooldownsub = antimatterritualcooldownsub.mul(player.h.timeeffect2)
        if (hasUpgrade("h", 18)) antimatterritualcooldownsub = antimatterritualcooldownsub.mul(player.h.sunshineeffect)
        if (player.i2.antimatterritualtime > 0)
        {
            player.i2.antimatterblessings = player.i2.antimatterblessings.add(antimatterblessinggain.mul(delta))
            player.i2.antimatterritualtime = player.i2.antimatterritualtime.sub(antimatterritualtimesub.mul(delta))  
		}
        if (player.i2.antimatterritualcooldown > 0)
        {
            player.i2.antimatterritualcooldown = player.i2.antimatterritualcooldown.sub(antimatterritualcooldownsub.mul(delta))  
		}
        if (player.i2.antimatterritualtime < 0)
        {
            player.i2.antimatterritualcooldown = new ExpantaNum(1800)
            player.i2.antimatterritualtime = new ExpantaNum(0) 
		}
        if (player.i2.antimatterritualcooldown < 0)
        {
            player.i2.antimatterritualcooldown = new ExpantaNum(0) 
		}
        player.i2.antimatterblessingeffect = player.i2.antimatterblessings.add(1).pow(7)

        let clickerblessinggain = new ExpantaNum(0.5)
        clickerblessinggain = clickerblessinggain.mul(player.h.moonlighteffect)
        let clickerritualtimesub = new ExpantaNum(1)
        let clickerritualcooldownsub = new ExpantaNum(1)
        if (hasUpgrade("h", 17)) clickerritualcooldownsub = clickerritualcooldownsub.mul(player.h.timeeffect2)
        if (hasUpgrade("h", 18)) clickerritualcooldownsub = clickerritualcooldownsub.mul(player.h.sunshineeffect)
        if (player.i2.clickerritualtime > 0)
        {
            player.i2.clickerblessings = player.i2.clickerblessings.add(clickerblessinggain.mul(delta))
            player.i2.clickerritualtime = player.i2.clickerritualtime.sub(clickerritualtimesub.mul(delta))  
		}
        if (player.i2.clickerritualcooldown > 0)
        {
            player.i2.clickerritualcooldown = player.i2.clickerritualcooldown.sub(clickerritualcooldownsub.mul(delta))  
		}
        if (player.i2.clickerritualtime < 0)
        {
            player.i2.clickerritualcooldown = new ExpantaNum(600)
            player.i2.clickerritualtime = new ExpantaNum(0) 
		}
        if (player.i2.clickerritualcooldown < 0)
        {
            player.i2.clickerritualcooldown = new ExpantaNum(0) 
		}
        player.i2.clickerblessingeffect = player.i2.clickerblessings.add(1).pow(7.5)
    },
        microtabs: 
    {
        stuff: 
        {
          "Lore": {
          content: [
          ["row", [["infobox", "lore"]]],
          ["row", [["infobox", "lore2"]]],
          ]
          },
          "Incremental Ritual": {
          content: [
          ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16], ["upgrade", 17]]],
          ["row", [["upgrade", 18], ["upgrade", 19], ["upgrade", 21]]],
          ["display-text", () => hasUpgrade("i2", 12) ? "You have " + format(player.i2.incrementalblessings) + " Incremental Blessings, and a x" + format(player.i2.incrementalblessingeffect) + " boost to Incremental Stones" : ""],
          ["display-text", () => hasUpgrade("i2", 14) ? "You have " + format(player.i2.cookieblessings) + " Cookie Blessings, and a x" + format(player.i2.cookieblessingeffect) + " boost to Incremental Blessings" : ""],
          ["display-text", () => hasUpgrade("i2", 18) ? "You have " + format(player.i2.antimatterblessings) + " Antimatter Blessings, and a x" + format(player.i2.antimatterblessingeffect) + " boost to Cookie Blessings" : ""],
          ["display-text", () => hasUpgrade("i2", 19) ? "You have " + format(player.i2.clickerblessings) + " Clicker Heroes Blessings, and a x" + format(player.i2.clickerblessingeffect) + " boost to Antimatter Blessings" : ""],
          ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
          ]
          },
          "Boosters": {
          unlocked() { return hasUpgrade("i2", 13) },
          content: [
          ["display-text", () => hasUpgrade("i2", 13) ? format(player.i2.points) + " Incremental Stones converted to a x" + format(player.i2.incrementalstoneseffect1) + " boost to Antimatter Dimensions Time" : ""],
          ["display-text", () => hasUpgrade("i2", 16) ? "Incremental Stones also convert to a x" + format(player.i2.incrementalstoneseffect2) + " boost to DPS in the Clicker Heroes Layer" : ""],
          ["display-text", () => hasUpgrade("i2", 17) ? "Incremental Stones also convert to a x" + format(player.i2.incrementalstoneseffect3) + " boost to Military Time" : ""],
          ["display-text", () => hasUpgrade("i2", 21) ? "Incremental Stones also convert to a x" + format(player.i2.incrementalstoneseffect4) + " boost to Willpower" : ""],
          ]
          },
        },
    },
            tabFormat: [
        "main-display",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    layerShown(){return hasUpgrade("l", 121)}
},
)
addLayer("h", {
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
		willpower: new ExpantaNum(0),
		willpowerpersecond: new ExpantaNum(0),
        willpowereffect: new ExpantaNum(0),
        achievementpower: new ExpantaNum(0),
        second: new ExpantaNum(0),
        minute: new ExpantaNum(0),
        time: new ExpantaNum(0),
        timeeffect: new ExpantaNum(0),
        timeeffect2: new ExpantaNum(0),
        timeeffect3: new ExpantaNum(0),
        timeplayedstring: "How'd you get here so fast? You probably cheated.",
        dayornight: new ExpantaNum(0),
        sunshine: new ExpantaNum(0),
        moonlight: new ExpantaNum(0),
        sunshineeffect: new ExpantaNum(0),
        moonlighteffect: new ExpantaNum(0),
    }},
            nodeStyle: 
            {
           "background-image": "linear-gradient(85deg, #fbef53, #68e8f4, #fbef53)",  
         "width": 400,
        "height": 400,
        "border-left": "100px solid fbef53",
        "border-right": "100px solid 68e8f4",
        "border-bottom": "140px solid fbef53",
        "border-radius": 0,
    },
    color: "#68e8f4",
    symbol: "<p style='transform: scale(3, 3)'><alternate>H</alternate></p>",
    resource: " Potential", 
    row: "side",
    tooltip: "The Hub",
    midsection: ["grid", "blank"],
    branches: ["i", "i2"],
    displayRow: 0,
    position: 0, 
        automate()
    {
    },
    buyables:
    {
    },    
    upgrades: 
    {
        11:
        { 
            title: "Become Worthy",
            description: "Gain 1 Willpower per Second",
            unlocked() { return true },
            cost: new ExpantaNum("eeeeee1.1"),
            currencyLocation() { return player },
            currencyDisplayName: "Points",
            currencyInternalName: "points",
        },
        12:
        { 
            title: "Achievements",
            description: "Unlocks the Achievements Tab",
            unlocked() { return hasUpgrade("h", 11) },
            cost: new ExpantaNum("60"),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
        },
        13:
        { 
            title: "Willpower Booster",
            description: "Unlocks a Buyable",
            unlocked() { return hasUpgrade("h", 12) },
            cost: new ExpantaNum("140"),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
        },
        14:
        { 
            title: "Become Worthier",
            description: "Boost Willpower based on Achievement Power",
            unlocked() { return true },
            cost: new ExpantaNum("eeeeee1.4"),
            currencyLocation() { return player },
            currencyDisplayName: "Points",
            currencyInternalName: "points",
                effect() 
                {
                     return player[this.layer].achievementpower.add(1).pow(3)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15:
        { 
            title: "The Clock",
            description: "Unlocks a new tab",
            unlocked() { return hasUpgrade("h", 13) },
            cost: new ExpantaNum("1000000"),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
        },
        16:
        { 
            title: "Give Potential some Worth",
            description: "Potential boosts Willpower",
            unlocked() { return hasUpgrade("h", 14) },
            cost: new ExpantaNum("50000"),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
                effect() 
                {
                     return player[this.layer].points.add(1).pow(3)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        17:
        { 
            title: "A Wrinkle in Time",
            description: "Time gives more effects",
            unlocked() { return hasUpgrade("h", 16) },
            cost: new ExpantaNum("1.5e10"),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
        },
        18:
        { 
            title: "The Fun Achievements!",
            description: "Adds Miscellaneous Achievements and more things in the Clock Tab",
            unlocked() { return hasUpgrade("h", 16) },
            cost: new ExpantaNum("1e11"),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
        },
        19:
        { 
            title: "Realm Grinder?",
            description: "Adds the Realm Grinder Game",
            unlocked() { return hasUpgrade("h", 18) },
            cost: new ExpantaNum("eeeeee4.44"),
            currencyLocation() { return player },
            currencyDisplayName: "Points",
            currencyInternalName: "points",
        },
    },
    achievements: {
        11: {
            name: "Willpower I",
            done() {return player.h.willpower.gte(1000)},
            tooltip: "Get 1000 Willpower", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        12: {
            name: "Willpower II",
            done() {return player.h.willpower.gte(1e6)},
            tooltip: "Get 1000000 Willpower", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        13: {
            name: "Willpower III",
            done() {return player.h.willpower.gte(1e20)},
            tooltip: "Get 1e20 Willpower", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        14: {
            name: "Willpower IV",
            done() {return player.h.willpower.gte(1e80)},
            tooltip: "Get 1e80 Willpower", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        15: {
            name: "Willpower V",
            done() {return player.h.willpower.gte("1e400")},
            tooltip: "Get 1e400 Willpower", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        16: {
            name: "Willpower VI",
            done() {return player.h.willpower.gte("1e1000")},
            tooltip: "Get 1e1000 Willpower", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(2)}
        },
        21: {
            name: "Potential I",
            done() {return player.h.points.gte(6)},
            tooltip: "Get 6 Potential", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        22: {
            name: "Potential II",
            done() {return player.h.points.gte(8)},
            tooltip: "Get 8 Potential", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        23: {
            name: "Potential III",
            done() {return player.h.points.gte(12)},
            tooltip: "Get 12 Potential", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        24: {
            name: "Potential IV",
            done() {return player.h.points.gte(16)},
            tooltip: "Get 16 Potential", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(2)}
        },
        25: {
            name: "Potential V",
            done() {return player.h.points.gte(30)},
            tooltip: "Get 30 Potential", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(4)}
        },
        26: {
            name: "Potential VI",
            done() {return player.h.points.gte(100)},
            tooltip: "Get 100 Potential", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(6)}
        },
        27: {
            name: "Potential VII",
            done() {return player.h.points.gte(300)},
            tooltip: "Get 300 Potential", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(8)}
        },
        28: {
            name: "Potential VIII",
            done() {return player.h.points.gte(1000)},
            tooltip: "Get 1000 Potential", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(12)}
        },
        31: {
            name: "Incremental Stones I",
            done() {return player.i2.points.gte("1e5000")},
            tooltip: "Get 1e5000 Incremental Stones", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        32: {
            name: "Incremental Stones II",
            done() {return player.i2.points.gte("1e10000")},
            tooltip: "Get 1e10000 Incremental Stones", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        33: {
            name: "Incremental Stones III",
            done() {return player.i2.points.gte("1e50000")},
            tooltip: "Get 1e50000 Incremental Stones", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        34: {
            name: "Incremental Stones IV",
            done() {return player.i2.points.gte("e1e9")},
            tooltip: "Get e1e9 Incremental Stones", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        35: {
            name: "Incremental Stones V",
            done() {return player.i2.points.gte("e1e300")},
            tooltip: "Get e1e300 Incremental Stones", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(2)}
        },
        36: {
            name: "Incremental Stones VI",
            done() {return player.i2.points.gte("ee1e1000")},
            tooltip: "Get ee1e1000 Incremental Stones", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(2)}
        },
        41: {
            name: "Points I",
            done() {return player.points.gte("10^^7")},
            tooltip: "Get 1F7 Points", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        42: {
            name: "Points II",
            done() {return player.points.gte("10^^10")},
            tooltip: "Get 1F10 Points", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)}
        },
        43: {
            name: "Points III",
            done() {return player.points.gte("10^^10^20")},
            tooltip: "Get 1F1e20 Points", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(2)}
        },
        44: {
            name: "Points IV",
            done() {return player.points.gte("10^^10^10^10")},
            tooltip: "Get 1Fe1e10 Points", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(2)}
        },
        45: {
            name: "Points V",
            done() {return player.points.gte("10^^10^10^10^1000")},
            tooltip: "Get 1Fee1e1000 Points", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(3)}
        },
        46: {
            name: "Points VI",
            done() {return player.points.gte("10^^10^^6")},
            tooltip: "Get 1FF6 Points", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(3)}
        },
        47: {
            name: "Points VII",
            done() {return player.points.gte("10^^^6")},
            tooltip: "Get 1G6 Points", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(4)}
        },
        48: {
            name: "Points VIII",
            done() {return player.points.gte("10^^^10^^^6")},
            tooltip: "Get 1GG6 Points", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(6)}
        },
        49: {
            name: "Points IX",
            done() {return player.points.gte("10^^^^6")},
            tooltip: "Get 1H6 Points", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(6)}
        },
        51: {
            name: "Points X",
            done() {return player.points.gte("10^^^^10^^^^6")},
            tooltip: "Get 1HH6 Points", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(7)}
        },
        52: {
            name: "Points XI",
            done() {return player.points.gte("10^^^^^^^^^^6")},
            tooltip: "Get 1J10 Points", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(9)}
        },
        53: {
            name: "Points XII",
            done() {return player.points.gte("10^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6")},
            tooltip: "Get 1J100 Points", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(10)}
        },
        54: {
            name: "Why would anyone even do this???",
            done() {return player.l.minigamenumber.gte("1e10000")},
            tooltip: "Get your 2048 Minigame number to 1e10000", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(0.25)},
            unlocked() { return hasUpgrade("h", 18) },
        },
        55: {
            name: "Generation to the Maximum!!!",
            done() {return player[this.layer].buyables[11].gte("400")},
            tooltip: "Buy 400 Willpower Generators", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(0.25)},
            unlocked() { return hasUpgrade("h", 18) },
        },
        56: {
            name: "Will the Willpower Power my Power?",
            done() {return player.h.willpowereffect.gte("2")},
            tooltip: "Get Willpower to make 2 Potential", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(0.5)},
            unlocked() { return hasUpgrade("h", 18) },
        },
        57: {
            name: "Will the Willpower Power my Power? II",
            done() {return player.h.willpowereffect.gte("40")},
            tooltip: "Get Willpower to make 40 Potential", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(1)},
            unlocked() { return hasUpgrade("h", 18) },
        },
        58: {
            name: "True Veteran",
            done() {return player.m.points.gte("1e400000")},
            tooltip: "Get 1e400000 Respect", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(0.25)},
            unlocked() { return hasUpgrade("h", 18) },
        },
        59: {
            name: "Now you remember this part of the game!",
            done() {return player.cc.wrinklerjuice.gte("1e21")},
            tooltip: "Get 1e21 Wrinkler Juice", // Shows when achievement is not completed
            onComplete() {player.h.achievementpower = player.h.achievementpower.add(0.25)},
            unlocked() { return hasUpgrade("h", 18) },
        },
    },
    clickables: {
    },
    buyables:
    {
        11: {
        cost(x) { return new ExpantaNum("5").pow(x.div(20)).mul("5") },
        title: "Willpower Generator",
        unlocked() { return hasUpgrade("h", 13) },
        canAfford() { return player.h.willpower.gte(this.cost()) },
        buy() {
            player.h.willpower = player.h.willpower.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Willpower\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Willpower";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].add(1)
        },
        },
    },
    update(delta) {
    let beatcookie = new ExpantaNum(0)
    let beatanti = new ExpantaNum(0)
    let beatclicker = new ExpantaNum(0)

    if (hasUpgrade("l", 21))
    {
        beatcookie = new ExpantaNum(2)
	}
    if (hasUpgrade("ad", 98))
    {
        beatanti = new ExpantaNum(3)
	}
    if (hasUpgrade("ch", 39))
    {
        beatclicker = new ExpantaNum(1)
	}
    player.h.willpowereffect = player.h.willpower.plus(1).log10().pow(0.2)
    player.h.points = beatcookie.add(beatanti.add(beatclicker.add(player.h.willpowereffect)))
    if (hasUpgrade("h", 11)) player.h.willpowerpersecond = new ExpantaNum(1)
    player.h.willpowerpersecond = player.h.willpowerpersecond.mul(buyableEffect('h', 11))
    if (hasUpgrade("h", 14)) player.h.willpowerpersecond = player.h.willpowerpersecond.mul(upgradeEffect("h", 14))
    if (hasUpgrade("h", 15)) player.h.willpowerpersecond = player.h.willpowerpersecond.mul(player.h.timeeffect)
    if (hasUpgrade("h", 16)) player.h.willpowerpersecond = player.h.willpowerpersecond.mul(upgradeEffect("h", 16))
    if (hasUpgrade("i2", 21)) player.h.willpowerpersecond = player.h.willpowerpersecond.mul(player.i2.incrementalstoneseffect4)
    player.h.willpower = player.h.willpower.add(player.h.willpowerpersecond.mul(delta))

    let clockspeed = new ExpantaNum(60)
    let hours = player.h.time.div(3600).floor()
    let minutes = player.h.time.div(60).sub(hours.mul(60)).floor()
    let seconds = player.h.time.sub(hours.mul(3600).add(minutes.mul(60)))
    if (player.h.time > 86400)
    {
        player.h.time = new ExpantaNum(0)
	}
    player.h.time = player.h.time.add(clockspeed.mul(delta))
    player.h.timeeffect = player.h.time.div(1800).pow(1.5).add(1)
    player.h.timeeffect2 = seconds.pow(1.1).add(1)
    player.h.timeeffect3 = minutes.pow(1.4).add(1)

    let day = new ExpantaNum(86400)
    if (player.timePlayed > day.mul(0.5))
    {
        player.h.timeplayedstring = "You are a speedrunner to get here this fast!"
	}
    if (player.timePlayed > day.mul(2))
    {
        player.h.timeplayedstring = "You have been playing this game for some time now."
	}
    if (player.timePlayed > day.mul(6))
    {
        player.h.timeplayedstring = "Take your time, this is an incremental game anyways!"
	}
    if (player.timePlayed > day.mul(30))
    {
        player.h.timeplayedstring = "Pathetic. More Than A month"
	}
    if (player.timePlayed > day.mul(100))
    {
        player.h.timeplayedstring = "Is anyone going to stop you?"
	}
    if (player.timePlayed > day.mul(365))
    {
        player.h.timeplayedstring = "It's been more than a year!"
	}
    if (player.timePlayed > day.mul(1800))
    {
        player.h.timeplayedstring = "It's been years now!"
	}
    if (player.timePlayed > day.mul(46500))
    {
        player.h.timeplayedstring = "You are probably dead right now."
	}
    player.h.timeplayed = player.timePlayed
    let sunshinegain = new ExpantaNum(1)
    let moonlightgain = new ExpantaNum(1)
    if (player.h.time < 43200 && hasUpgrade("h", 18))
    {
        player.h.dayornight = 1
        player.h.sunshine = player.h.sunshine.add(sunshinegain.mul(delta))
	}
    if (player.h.time > 43200 && hasUpgrade("h", 18))
    {
        player.h.dayornight = 2
        player.h.moonlight = player.h.moonlight.add(moonlightgain.mul(delta))
	}
        player.h.sunshineeffect = player.h.sunshine.pow(0.1).add(1)
        player.h.moonlighteffect = player.h.moonlight.pow(0.5).add(1)
	},
    milestones: {
    },

        microtabs: 
    {
        stuff: 
        {
          "Main": {
          content: [
          ["blank", "10px"],
          ["display-text", () => hasUpgrade("l", 22) ? "Cookie Clicker: 2 Potential" : ""],
          ["display-text", () => hasUpgrade("ad", 98) ? "Antimatter Dimensions: 3 Potential" : ""],
          ["display-text", () => hasUpgrade("ch", 39) ? "Clicker Heroes: 1 Potential" : ""],
          ["blank", "10px"],
          ["display-text", () => hasUpgrade("h", 11) ? "Willpower: " + format(player.h.willpowereffect) + " Potential" : ""],
          ]
          },
          "Willpower": {
          content: [
          ["display-text", () => hasUpgrade("h", 11) ? "You have " + format(player.h.willpower) + " Willpower" : ""],
          ["blank", "10px"],
          ["row", [["upgrade", 11], ["upgrade", 14], ["upgrade", 16]]],
          ["blank", "10px"],
          ["row", [["buyable", 11]]],
          ["blank", "10px"],
          ["microtabs", "willpower"],
          ]
          },
          "Achievements": {
          unlocked() { return hasUpgrade("h", 12) },
          content: [
          ["display-text", () => "You have " + format(player.h.achievementpower) + " Achievement Power"],
          ["blank", "10px"],
          ["display-text", () => "Willpower"],
          ["row", [["achievement", 11], ["achievement", 12], ["achievement", 13], ["achievement", 14], ["achievement", 15], ["achievement", 16]]],
          ["blank", "10px"],
          ["display-text", () => "Potential"],
          ["row", [["achievement", 21], ["achievement", 22], ["achievement", 23], ["achievement", 24], ["achievement", 25], ["achievement", 26], ["achievement", 27], ["achievement", 28]]],
          ["blank", "10px"],
          ["display-text", () => "Incremental Stones"],
          ["row", [["achievement", 31], ["achievement", 32], ["achievement", 33], ["achievement", 34], ["achievement", 35], ["achievement", 36]]],
          ["blank", "10px"],
          ["display-text", () => "Points"],
          ["row", [["achievement", 41], ["achievement", 42], ["achievement", 43], ["achievement", 44], ["achievement", 45], ["achievement", 46]]],
          ["row", [["achievement", 47], ["achievement", 48], ["achievement", 49], ["achievement", 51], ["achievement", 52], ["achievement", 53]]],
          ["display-text", () => hasUpgrade("h", 18) ? "Miscellaneous Achievements" : ""],
          ["row", [["achievement", 54], ["achievement", 55], ["achievement", 56], ["achievement", 57], ["achievement", 58], ["achievement", 59]]],
          ]
          },
        },
        willpower: 
        {
          "Unlockables": {
          content: [
          ["row", [["upgrade", 12], ["upgrade", 13], ["upgrade", 15], ["upgrade", 18], ["upgrade", 19]]],
          ]
          },
          "The Clock": {
          unlocked() { return hasUpgrade("h", 15) },
          content: [
          ['display-image', 'https://www.drpescatore.com/wp-content/uploads/2016/12/ticking_clock.gif'],
          ["display-text", () => "It has been " + formatTime(player.h.time) + " into the Day"],
          ["display-text", () => "The time translates to a " + format(player.h.timeeffect) + "x boost to Willpower"],
          ["display-text", () => hasUpgrade("h", 17) ? "The time (seconds) also translates to a " + format(player.h.timeeffect2) + "x boost to Ritual Cooldowns. Also automates Clicker Heroes ritual." : ""],
          ["display-text", () => hasUpgrade("h", 17) ? "The time (minutes) also translates to a " + format(player.h.timeeffect3) + "x boost to Clicker Heroes Time" : ""],
          ["blank", "10px"],
          ["row", [["upgrade", 17]]],
          ["blank", "10px"],
          ["display-text", () => player.h.time < 43200 && hasUpgrade("h", 18) ? "It is day": ""],
          ["display-text", () => player.h.time > 43200 && hasUpgrade("h", 18) ? "It is night": ""],
          ["display-text", () => hasUpgrade("h", 18) ? "You have " + format(player.h.moonlight) + " Moonlight and a x" + format(player.h.moonlighteffect) + " boost to Incremental, Cookie, Antimatter, and Clicker Hero blessings": ""],
          ["display-text", () => hasUpgrade("h", 18) ? "You have " + format(player.h.sunshine) + " Sunshine and a x" + format(player.h.sunshineeffect) + " boost to Ritual Cooldowns": ""],
          ["blank", "10px"],
          ["display-text", () => hasUpgrade("h", 18) ? "You have played this game for " + formatTime(player.timePlayed) + ". " + player.h.timeplayedstring: ""],
          ]
          },
        },
    },
            tabFormat: [
        "main-display",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    layerShown(){return hasUpgrade("l", 123)}
},
)
addLayer("rg", {
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
		pointeffect: new ExpantaNum(0),
		realmpowerpersecond: new ExpantaNum(0),
		codethegamechallengeeffect: new ExpantaNum(1),
		devenergy: new ExpantaNum(0),
		challengeupgradetime: new ExpantaNum(0),
		coins: new ExpantaNum(0),
		coinseffect: new ExpantaNum(1),
		coinspersecond: new ExpantaNum(0),
        assistants: new ExpantaNum(0),
        assistanteffect: new ExpantaNum(1),
        assistantspersecond: new ExpantaNum(0),
        goodalignment: new ExpantaNum(0),
        evilalignment: new ExpantaNum(0),
        factioncoins: new ExpantaNum(0),
        factioncointime: new ExpantaNum(0),
        building4: "",
        building5: "",
        fairyboost: new ExpantaNum(1),
        elvenboost: new ExpantaNum(1),
        angelboost: new ExpantaNum(1),
        goblinboost: new ExpantaNum(1),
        undeadboost: new ExpantaNum(1),
        demonboost: new ExpantaNum(1),
        factioncoingain: new ExpantaNum(1),
    }},
            nodeStyle: 
            {
           "background-image": "linear-gradient(85deg, #5c0a0a, #333333)",  
    },
    color: "#333333",
    symbol: "<img src='resources/realmgrinder.png' style='width:calc(100%);height:calc(80%);margin:0%'></img>",
    resource: " Realm Power", 
    row: "side",
    midsection: ["grid", "blank"],
    branches: ["cc", "ad", "ch"],
    displayRow: 3,
    position: 0, 
        effectDescription(){
                let eff = player.rg.pointeffect
                return "which multiplies Clicker Heroes Time gain by x" + format(eff)
        },
    automate()
    {
    },
    buyables:
    {
                    11: {
        cost(x) { return },
        title: "Convert Realm Power into Dev Energy",
        unlocked() { return hasUpgrade("rg", 13) },
        canAfford() { return true },
        effect() 
        {
            return player.rg.devenergy
        },
        effectDisplay() { return format(buyableEffect(this.layer, this.id))+" Dev Energy" }, // Add formatting to the effect
        buy() {
        player.rg.devenergy = player.rg.devenergy.add(player.rg.points.pow(0.3))
        player.rg.points = new ExpantaNum(0)
        },
        },
        12: {
        cost(x) { return new ExpantaNum(10).pow(x.div(20)).mul(10).sub(10) },
        title: "Farm",
        unlocked() { return true },
        canAfford() { return player[this.layer].coins.gte(this.cost()) },
        buy() {
            player[this.layer].coins = player[this.layer].coins.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Coins\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Coins per Second";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul(2).mul(player.rg.fairyboost)
        },
        },
                13: {
        cost(x) { return new ExpantaNum(10).pow(x.div(15)).mul(10).add(110) },
        title: "Inn",
        unlocked() { return true },
        canAfford() { return player[this.layer].coins.gte(this.cost()) },
        buy() {
            player[this.layer].coins = player[this.layer].coins.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Coins\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Coins per Second";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul(6).mul(player.rg.fairyboost)
        },
    },
        14: {
        cost(x) { return new ExpantaNum(10).pow(x.div(9.7)).mul(10).add(600) },
        title: "Blacksmith",
        unlocked() { return true },
        canAfford() { return player[this.layer].coins.gte(this.cost()) },
        buy() {
            player[this.layer].coins = player[this.layer].coins.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Coins\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Coins per Second";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul(20).mul(player.rg.fairyboost)
        },
        },
                15: {
        cost(x) { return new ExpantaNum(5).pow(x.div(20)).mul(5) },
        title: "Royal Exchange",
        unlocked() { return true },
        canAfford() { return player[this.layer].factioncoins.gte(this.cost()) },
        buy() {
            player[this.layer].factioncoins = player[this.layer].factioncoins.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Faction Coins\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Coins";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].div(5).add(1)
        },
    },
            16: {
        cost(x) { return new ExpantaNum(1000).pow(x.div(5)).mul(1000).add(30000).sub(10) },
        title() {return player.rg.building4},
        unlocked() { return hasUpgrade("rg", 18) },
        canAfford() { return player[this.layer].coins.gte(this.cost()) },
        buy() {
            player[this.layer].coins = player[this.layer].coins.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Coins\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Coins per Second";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul(600).mul(player.rg.demonboost)
        },
        },
        17: {
        cost(x) { return new ExpantaNum(1000).pow(x.div(4)).mul(1000).add(600000).sub(10) },
        title() {return player.rg.building5},
        unlocked() { return hasUpgrade("rg", 18) },
        canAfford() { return player[this.layer].coins.gte(this.cost()) },
        buy() {
            player[this.layer].coins = player[this.layer].coins.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Coins\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Coins per Second";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul(2000).mul(player.rg.demonboost)
        },
        },
        21: {
        cost(x) { return },
        title: "Be Good",
        unlocked() { return true },
        canAfford() { return true },
        buy() {
        player.rg.evilalignment = new ExpantaNum(0)
        player.rg.goodalignment = new ExpantaNum(1)
        },
    },
        22: {
        cost(x) { return },
        title: "Be Evil",
        unlocked() { return true },
        canAfford() { return true },
        buy() {
        player.rg.evilalignment = new ExpantaNum(1)
        player.rg.goodalignment = new ExpantaNum(0)
        },
    },
    },    
    upgrades: 
    {
        11:
        { 
            title: "Start developing Realm Grinder",
            description: "Gain 1 Realm Power per Second",
            unlocked() { return true },
            cost: new ExpantaNum("0"),
        },
        12:
        { 
            title: "A Medival Idle Game?",
            description: "Boost Realm Power based on Realm Power",
            unlocked() { return hasUpgrade("rg", 11) },
            cost: new ExpantaNum("20"),
            currencyLocation() { return player.rg },
            currencyDisplayName: "Points",
            currencyInternalName: "points",
                effect() 
                {
                     return player[this.layer].points.add(1).pow(0.2)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13:
        { 
            title: "With many ways of playing!",
            description: "Unlocks Dev Energy",
            unlocked() { return hasUpgrade("rg", 12) },
            cost: new ExpantaNum("150"),
            currencyLocation() { return player.rg },
            currencyDisplayName: "Points",
            currencyInternalName: "points",
        },
        14:
        { 
            title: "Positive Coding Environment",
            description: "Boost Realm Power based on Dev Energy",
            unlocked() { return hasUpgrade("rg", 13) },
            cost: new ExpantaNum("20"),
            currencyLocation() { return player.rg },
            currencyDisplayName: "Dev Energy",
            currencyInternalName: "devenergy",
                effect() 
                {
                     return player[this.layer].devenergy.add(1).pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15:
        { 
            title: "Negative Coding Environment",
            description: "Boost Realm Power based on Dev Energy again but with a different formula",
            unlocked() { return hasUpgrade("rg", 14) },
            cost: new ExpantaNum("100"),
            currencyLocation() { return player.rg },
            currencyDisplayName: "Dev Energy",
            currencyInternalName: "devenergy",
                effect() 
                {
                     return player[this.layer].devenergy.add(1).mul(0.5).pow(0.5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        16:
        { 
            title: "Aww Dang! You Found Me!",
            description: "Boost Realm Power based on time after buying the upgrade",
            unlocked() { return hasUpgrade("rg", 15) && inChallenge("rg", 12) && player.rg.points > 400 },
            cost: new ExpantaNum("300"),
            currencyLocation() { return player.rg },
            currencyDisplayName: "Dev Energy",
            currencyInternalName: "devenergy",
                effect() 
                {
                     return player[this.layer].challengeupgradetime.add(1).pow(0.3)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        17:
        { 
            title: "Generate Supreme Coding Power",
            description: "Gains 10% of Dev Energy per Second",
            unlocked() { return hasUpgrade("rg", 16) },
            cost: new ExpantaNum("1000"),
            currencyLocation() { return player.rg },
            currencyDisplayName: "Dev Energy",
            currencyInternalName: "devenergy",
        },
        18:
        { 
            title: "ALIGNMENTS?",
            description: "Unlocks a New Tab",
            unlocked() { return hasUpgrade("rg", 17) },
            cost: new ExpantaNum("25000"),
            currencyLocation() { return player.rg },
            currencyDisplayName: "Coins",
            currencyInternalName: "coins",
        },
    },
    achievements: {

    },
    clickables: {
    },
    challenges: {
    12: {
        name: "Code the Game",
        challengeDescription: "Raises Realm Power Gain to the 0.5th power",
        canComplete: function() {return player.rg.points.gte(4000)},
        goal() { return new ExpantaNum("4000") },
        currencyDisplayName: "Realm Power",
        currencyInternalName: "points",
        currencyLocation() { return player.rg },
		rewardDescription: "Unlocks a lot of Stuff",
        			onEnter() {
						player.rg.codethegamechallengeeffect = new ExpantaNum(0.5);
                        player.rg.points = new ExpantaNum(0)
				},
                    onExit() {
						player.rg.codethegamechallengeeffect = new ExpantaNum(1);
                        player.rg.points = new ExpantaNum(0)
				},
    },
        }, 
    update(delta) 
    {
       if (hasUpgrade("rg", 11)) player.rg.realmpowerpersecond = new ExpantaNum(1)
       if (hasUpgrade("rg", 12)) player.rg.realmpowerpersecond = player.rg.realmpowerpersecond.mul(upgradeEffect("rg", 12))
       if (hasUpgrade("rg", 14)) player.rg.realmpowerpersecond = player.rg.realmpowerpersecond.mul(upgradeEffect("rg", 14))
       if (hasUpgrade("rg", 15)) player.rg.realmpowerpersecond = player.rg.realmpowerpersecond.mul(upgradeEffect("rg", 15))
       player.rg.realmpowerpersecond = player.rg.realmpowerpersecond.pow(player.rg.codethegamechallengeeffect)
       if (hasUpgrade("rg", 18)) player.rg.realmpowerpersecond = player.rg.realmpowerpersecond.mul(player.rg.coineffect)
       player.rg.points = player.rg.points.add(player.rg.realmpowerpersecond.mul(delta))
       let upgradetimepersecond = new ExpantaNum(0)
       if (hasUpgrade("rg", 16)) upgradetimepersecond = new ExpantaNum(1)
       player.rg.challengeupgradetime = player.rg.challengeupgradetime.add(upgradetimepersecond)

       let devenergygain = new ExpantaNum(player.rg.points.pow(0.3))
       if (hasUpgrade("rg", 17)) player.rg.devenergy = player.rg.devenergy.add(devenergygain.mul(delta))

       player.rg.coinspersecond = buyableEffect("rg", 12)
       player.rg.coinspersecond = player.rg.coinspersecond.add(buyableEffect("rg", 13))
       player.rg.coinspersecond = player.rg.coinspersecond.add(buyableEffect("rg", 14))
       player.rg.coinspersecond = player.rg.coinspersecond.mul(player.rg.assistanteffect)
       player.rg.coinspersecond = player.rg.coinspersecond.mul(buyableEffect("rg", 15))
       player.rg.coinspersecond = player.rg.coinspersecond.add(buyableEffect("rg", 16))
       player.rg.coinspersecond = player.rg.coinspersecond.add(buyableEffect("rg", 17))
       player.rg.coinspersecond = player.rg.coinspersecond.mul(player.rg.goblinboost)
       player.rg.coinspersecond = player.rg.coinspersecond.mul(player.rg.undeadboost)
       player.rg.coins = player.rg.coins.add(player.rg.coinspersecond.mul(delta))
       player.rg.coineffect = player.rg.coins.pow(0.8).add(1)

       player.rg.assistantspersecond = player.rg.coins.plus(1).log10().div(25)
       player.rg.assistantspersecond = player.rg.assistantspersecond.mul(player.rg.angelboost)
       player.rg.assistants = player.rg.assistants.add(player.rg.assistantspersecond.mul(delta))
       player.rg.assistanteffect = player.rg.assistants.div(100).add(1)

       let factioncointimegain = new ExpantaNum(1)
       if (hasUpgrade("rg", 18))
       {
            player.rg.factioncointime = player.rg.factioncointime.add(factioncointimegain.mul(delta))
	   }
       player.rg.factioncoingain = new ExpantaNum(1)
       player.rg.factioncoingain = player.rg.factioncoingain.mul(player.rg.elvenboost)
       if (player.rg.factioncointime > 10)
       {
            player.rg.factioncointime = new ExpantaNum(0)
            player.rg.factioncoins = player.rg.factioncoins.add(player.rg.factioncoingain)
	   }
       if (player.rg.goodalignment > 0)
       {         
            player.rg.building4 = "Cathedral"
            player.rg.building5 = "Royal Castle"
            player.rg.fairyboost = new ExpantaNum(5)
            player.rg.elvenboost = new ExpantaNum(1.5)
            player.rg.angelboost = new ExpantaNum(1.2)
            player.rg.goblinboost = new ExpantaNum(1)
            player.rg.undeadboost = new ExpantaNum(1)
            player.rg.demonboost = new ExpantaNum(1)
	   }
       if (player.rg.evilalignment > 0)
       {
            player.rg.building4 = "Dark Temple"
            player.rg.building5 = "Evil Fortress"
            player.rg.fairyboost = new ExpantaNum(1)
            player.rg.elvenboost = new ExpantaNum(1) 
            player.rg.angelboost = new ExpantaNum(1)
            player.rg.goblinboost = new ExpantaNum(2)
            player.rg.undeadboost = player.rg.coins.pow(0.01).add(1)
            player.rg.demonboost = new ExpantaNum(1.5)
	   }
       player.rg.pointeffect = player.rg.points.pow(2).add(1)
	},
                bars: {
        factioncoinbar: {
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                return player.rg.factioncointime.div(10)
            },
            fillStyle: {
                "background-color": "red",
            },
            display() {
                return "<h5>Time to get " + format(player.rg.factioncoingain) +" Faction Coins <br/>" + format(player.rg.factioncointime) + " / 10 Seconds</h5>";
            },
        },
        },
    milestones: {
    },

        microtabs: 
    {
        stuff: 
        {
          "Development": {
          content: [
          ["blank", "10px"],
          ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
          ["row", [["upgrade", 14], ["upgrade", 15], ["upgrade", 16], ["upgrade", 17]]],
          ["blank", "10px"],
          ["row", [["buyable", 11]]],
          ["display-text", () => hasUpgrade("rg", 13) ? "You have " + format(player.rg.devenergy) + " Dev Energy" : ""],
          ["blank", "10px"],
          ["row", [["challenge", 12]]],
          ]
          },
          "Realm Grinder": {
          unlocked() { return maxedChallenge("rg", 12) },
          content: [
          ["display-text", () => "You have " + format(player.rg.coins) + " Coins and a x" + format(player.rg.coineffect) + " boost to Realm Power (After Alignments Upgrade is Bought)"],
          ["display-text", () => "You are gaining " + format(player.rg.coinspersecond) + " Coins per Second"],
          ["blank", "10px"],
          ["display-text", () => "You have " + format(player.rg.assistants) + " Assistants a x" + format(player.rg.assistanteffect) + " boost to Coin Gain"],
          ["display-text", () => "You are gaining " + format(player.rg.assistantspersecond) + " Assistants per Second"],
          ["blank", "10px"],
          ["row", [["buyable", 12], ["buyable", 13], ["buyable", 14]]],
          ["row", [["buyable", 16], ["buyable", 17]]],
          ["blank", "10px"],
          ["row", [["upgrade", 18]]],
          ]
          },
          "Alignments": {
          unlocked() { return hasUpgrade("rg", 18) },
          content: [
          ["display-text", () => "You have " + format(player.rg.coins) + " Coins and a x" + format(player.rg.coineffect) + " boost to Realm Power"],
          ["display-text", () => "You are gaining " + format(player.rg.coinspersecond) + " Coins per Second"],
          ["blank", "10px"],
          ["row", [["buyable", 21], ["buyable", 22]]],
          ["display-text", () => player.rg.goodalignment >= 1 ? "You are Good" : ""],
          ["display-text", () => player.rg.evilalignment >= 1 ? "You are Evil" : ""],
          ["display-text", () => "You have " + format(player.rg.factioncoins) + " Faction Coins"],
          ["row", [["buyable", 15]]],
          ["row", [["bar", "factioncoinbar"]]],
          ["blank", "10px"],
          ["display-text", () => "Faction Boosts:"],
          ["display-text", () => "Fairy: x" + format(player.rg.fairyboost) + " boost to the first 3 buildings"],
          ["display-text", () => "Elven: x" + format(player.rg.elvenboost) + " boost to Faction Coin Gain"],
          ["display-text", () => "Angel: x" + format(player.rg.angelboost) + " boost to Assistant Gain"],
          ["display-text", () => "Goblin: x" + format(player.rg.goblinboost) + " boost to Coin Gain"],
          ["display-text", () => "Undead: x" + format(player.rg.undeadboost) + " boost to Coin Gain based on Coins"],
          ["display-text", () => "Demon: x" + format(player.rg.demonboost) + " boost to the last 3 buildings"],
          ]
          },
        },
    },
            tabFormat: [
        "main-display",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    layerShown(){return hasUpgrade("h", 19)}
},
)
