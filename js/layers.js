
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
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for incremental points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    automate()
    {
                if (!hasUpgrade('ad', 43))
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
            cost: new ExpantaNum(2e87),
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
    row: 1, // Row the layer is in on the tree (0 is the first row)
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
            if (!hasUpgrade('ad', 43))
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
        cost(x) { return new ExpantaNum(4).pow(x.div(40)).mul(4) },
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
        cost(x) { return new ExpantaNum(1e7).pow(x.div(16)).mul(1e7) },
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
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 24))).pow(0.95).add(1)
        },
        },
        24: {
        cost(x) { return new ExpantaNum(1e26).pow(x.div(11)).mul(1e26) },
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
            return player[this.layer].buyables[this.id].pow(0.95).add(1)
        },
        },
        31: {
        cost(x) { return new ExpantaNum(1000).pow(x.div(20)).mul(1000) },
        title: "Cookie Shipment",
        unlocked() { return (tmp.cc.buyables[24].effect||0)>=3.8  || (tmp.cc.buyables[41].effect||0)>=1 },
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
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
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
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
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
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
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
        cost(x) { return new ExpantaNum(1e37).pow(x.div(3.55)).mul(1e37) },
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
            return player[this.layer].buyables[this.id].mul(1).pow(1.5)
        },
        },
        51: {
        cost(x) { return new ExpantaNum(100).pow(x.div(20)).mul(100) },
        title: "Cookie Antimatter Condenser",
        unlocked() { return (tmp.cc.buyables[41].effect||0)>=2.5 },
        canAfford() { return player.cc.heavenlychips.gte(this.cost()) },
        buy() {
            player.cc.heavenlychips = player.cc.heavenlychips.sub(this.cost())
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
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 52))).pow(0.8).add(1)
        },
        },
        52: {
        cost(x) { return new ExpantaNum(1000).pow(x.div(18)).mul(1000) },
        title: "Cookie Prism",
        unlocked() { return (tmp.cc.buyables[51].effect||0)>=4.2 },
        canAfford() { return player.cc.heavenlychips.gte(this.cost()) },
        buy() {
            player.cc.heavenlychips = player.cc.heavenlychips.sub(this.cost())
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
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 53))).pow(0.8).add(1)
        },
        },
        53: {
        cost(x) { return new ExpantaNum(10000).pow(x.div(15)).mul(10000) },
        title: "Cookie Chancemaker",
        unlocked() { return (tmp.cc.buyables[52].effect||0)>=5.18 },
        canAfford() { return player.cc.heavenlychips.gte(this.cost()) },
        buy() {
            player.cc.heavenlychips = player.cc.heavenlychips.sub(this.cost())
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
            return player[this.layer].buyables[this.id].pow(0.8).add(1)
        },
        },
        61: {
        cost(x) { return new ExpantaNum(1e16).pow(x.div(5)).mul(1e16) },
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
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 72))).pow(0.7).add(1)
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
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 73))).pow(0.7).add(1)
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
            return player[this.layer].buyables[this.id].pow(0.7).add(1)
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
        cost(x) { return new ExpantaNum(1e6).pow(x.div(18)).mul(1e6) },
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
            return player[this.layer].buyables[this.id].pow(0.5).add(1)
        },
        },
        112: {
        cost(x) { return new ExpantaNum(1e6).pow(x.div(18)).mul(1e6) },
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
            return player[this.layer].buyables[this.id].pow(0.4).add(1)
        },
        },
        113: {
        cost(x) { return new ExpantaNum(1e6).pow(x.div(18)).mul(1e6) },
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
            return player[this.layer].buyables[this.id].pow(0.45).add(1)
        },
        },
        121: {
        cost(x) { return new ExpantaNum(25).pow(x.div(20)).mul(25) },
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
        cost(x) { return new ExpantaNum(400).pow(x.div(5)).mul(400) },
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
            cost: new ExpantaNum(1),
        },
        12:
        {
            title: "Automation^3",
            description: "Autobuys all the upgrades",
            cost: new ExpantaNum(6),
        },
        13:
        {
            title: "Automation^4",
            description: "Passively Generate Cookies",
            cost: new ExpantaNum(100),
        },
        21:
        {
            title: "Cookie-Point Synergy",
            description: "Cookies also boost Point gain",
            cost: new ExpantaNum(1e10),
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
            cost: new ExpantaNum(1e20),
            unlocked() { return (tmp.cc.buyables[14].effect||0)>=24 },
        },
        31:
        {
            title: "Point-Cookie Synergy",
            description: "Points boost Cookie gain",
            cost: new ExpantaNum(1e15),
            unlocked() { return (tmp.cc.buyables[21].effect||0)>=3 },
                effect() 
                {
                     return player.points.add(1).pow(0.0005)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        32:
        {
            title: "Incremental Point-Cookie Synergy",
            description: "Incremental Points boost Cookie gain",
            cost: new ExpantaNum(1e15),
            unlocked() { return (tmp.cc.buyables[21].effect||0)>=3 },
                effect() 
                {
                     return player.points.add(1).pow(0.0007)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        33:
        {
            title: "Cookie-Cookie Synergy",
            description: "Cookies boost Cookie gain",
            cost: new ExpantaNum(1e15),
            unlocked() { return (tmp.cc.buyables[21].effect||0)>=3 },
                effect() 
                {
                     return player.cc.points.add(1).pow(0.008)
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
                     return player.cc.sugarlumps.add(1).pow(0.23456789)
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
            cost: new ExpantaNum(50),
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
            cost: new ExpantaNum(250),
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
            cost: new ExpantaNum(1e27),
            unlocked() { return (tmp.cc.buyables[24].effect||0)>=2 },
        },
        52:
        {
            title: "Cookie Master",
            description: "Boost Cookie Gain based on Time Played",
            cost: new ExpantaNum(100000),
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
            cost: new ExpantaNum(20),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=1 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        72:
        {
            title: "Heavenly Chip-Points and Incremental Points Synergy",
            description: "Boosts Points and Incremental Points based on Heavenly Chips",
            cost: new ExpantaNum(100),
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
            cost: new ExpantaNum(100),
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
            cost: new ExpantaNum(100),
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
            cost: new ExpantaNum(2500),
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
            cost: new ExpantaNum(2500),
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
            cost: new ExpantaNum(10000),
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
            cost: new ExpantaNum(10000),
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
            cost: new ExpantaNum(25000),
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
            cost: new ExpantaNum(1000000),
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
            cost: new ExpantaNum(5e8),
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
            cost: new ExpantaNum(1e9),
            unlocked() { return (tmp.cc.buyables[53].effect||0)>=11 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        111:
        {
            title: "Cookie Devil",
            description: "Automates the Fifth row of buyables",
            cost: new ExpantaNum(1e90),
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
            cost: new ExpantaNum(1000),
            unlocked() { return (tmp.cc.buyables[81].effect||0)>=11 },
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
            cost: new ExpantaNum(1000),
            unlocked() { return (tmp.cc.buyables[82].effect||0)>=8.55 },
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
            cost: new ExpantaNum(250),
            unlocked() { return (tmp.cc.buyables[83].effect||0)>=2.7 },
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
            cost: new ExpantaNum(1000),
            unlocked() { return (tmp.cc.buyables[83].effect||0)>=3.15 },
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
            cost: new ExpantaNum(200000),
            unlocked() { return hasUpgrade("cc", 161) && hasUpgrade("cc", 162) && hasUpgrade("cc", 163) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Sugar Lumps",
            currencyInternalName: "zlumps",
        },
        181:
        {
            title: "Sugar Lump flavored Gatorade",
            description: "Autowalks Forward Faster based on Sugar Lumps",
            cost: new ExpantaNum(1e6),
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
            cost: new ExpantaNum(1e6),
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
            cost: new ExpantaNum(4e7),
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
            cost: new ExpantaNum(1e12),
            unlocked() { return hasUpgrade("cc", 191) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Sugar Lumps",
            currencyInternalName: "zlumps",
        },
        201:
        {
            title: "Cookie Trollge",
            description: "Automates buying Dimensional Grandmas and Dimensional Wrinklers",
            cost: new ExpantaNum(50000),
            unlocked() { return (tmp.cc.buyables[122].effect||0)>=0.27 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Cookie Bibles",
            currencyInternalName: "cookiebibles",
        },
        202:
        {
            title: "Blood Donation",
            description: "Boosts Cookie Blood Gain based on Cultists",
            cost: new ExpantaNum(2000),
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
            cost: new ExpantaNum(100000),
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
            cost: new ExpantaNum(20),
            unlocked() { return hasUpgrade("cc", 211) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Patreon Subscribers",
            currencyInternalName: "patreonsubscribers",
        },
        222:
        {
            title: "Heralds",
            description: "Boosts Cookies Based on Patreon Subscribers",
            cost: new ExpantaNum(1e30),
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
            cost: new ExpantaNum(30),
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
                    ["display-text", () => "You have " + format(player.cc.cultists) + " Cultists and a x" + format(player.cc.cultisteffect) + " boost to all layer all Dimensional cookies and Lumps"],
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
        row6researchcost: new ExpantaNum(1e24),
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
                return "e1e1000"
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
                return "e1e10000"
            },
            currencyLocation() { return player[this.layer] },
        },
        111:
        {
            title: "Extra Demand",
            description: "x3 Coins gained on Sell",
            unlocked() { return hasUpgrade("l", 105) },
            cost() {
                return "1000"
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
                return "5000"
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
                return "15000"
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
                return "25000"
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
                return "150000"
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
                return "1000000"
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
                return "5000000"
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
                return "7500000"
            },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Coins",
            currencyInternalName: "coins",
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
        
        update(delta) 
        {
            if (hasUpgrade("cc", 211)) player.l.$persecond = player.points.plus(10).log10().log10().pow(0.5).div(250).mul(player.cc.patreoneffect)
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

            let row6researchmult = new ExpantaNum(1e24)
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
            player.l.antimattertime = player.l.antimattertime.add(antimattertimeincome.mul(delta))

            player.l.antimattertimeeffect = EN(player[this.layer].antimattertime)
            player.l.antimattertimeeffect = EN.pow(4, EN.pow(4, player.l.antimattertimeeffect)).sub(3)

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
        },
    microtabs: 
    {
        stuff: 
        {
          "Finance": {
          content: [
          ["blank", "15px"],
          ["display-text", () => "You Gain Dollars Based on the Log10(Log10)^0.5/250 of Points you have"],
          ["display-text", () => format(player.l.$persecond) + "$ per second"],
          ["display-text", () => "Your Salary is " + format(player.l.$persecond.mul(3600)) + "$ per hour"],
          ["display-text", () => "You Specifically Have " + format(player.l.points) + "$"],   
          ["display-text", () => "You Have " + format(player.l.savedmoney) + "$ in your Savings Account and a x" + format(player.l.savedmoneyeffect) + " boost to Points"],
          ["display-text", () => hasUpgrade("l", 76) ? "Your $ Converts to " + format(player.l.euros) + " Euros in your Savings Account and a x" + format(player.l.euroeffect) + " boost to Hevipelle Points" : ""],  
          ["row", [["buyable", 11]]],
          ["row", [["upgrade", 75], ["upgrade", 76], ["upgrade", 77], ["upgrade", 78], ["upgrade", 79], ["upgrade", 101], ["upgrade", 102], ["upgrade", 103], ["upgrade", 104]]],
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
                "The List of Games Made": {
                unlocked() { return hasUpgrade("l", 22) },
                content: 
                [
                    ["blank", "15px"],
                    ["display-text", () => "Cookie Clicker Time: " + formatTime(player.l.cookietime) + " -> x" + format(player.l.cookietimeeffect) + " boost to Points"],
                    ["display-text", () => hasUpgrade("ad", 98) ? "Antimatter Dimensions Time: " + formatTime(player.l.antimattertime) + " -> x" + format(player.l.antimattertimeeffect) + " boost to Cookie Clicker Time" : ""],
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
    row: 1, // Row the layer is in on the tree (0 is the first row)
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
            cost: new ExpantaNum(20000),
        },
        32:
        {
            title: "Speed up the Timewalls",
            description: "Speeds up Timewall Seconds gain by 3x and Automatically generate Hevipelle points",
            unlocked() { return player.ad.timewalls >= 10 },
            cost: new ExpantaNum(5000000),
        },
        33:
        {
            title: "Automatic Timewalls",
            description: "Automatically gets Timewalls",
            unlocked() { return player.ad.timewalls >= 15 },
            cost: new ExpantaNum(1000000000),
        },
        34:
        {
            title: "Hevi Timewalls",
            description: "Timewalls boost Hevipelle points",
            unlocked() { return player.ad.timewalls >= 25 },
            cost: new ExpantaNum(5000000000),
                effect() 
                {
                     return player[this.layer].timewalls.pow(0.85).add(1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        35:
        {
            title: "Antimatter Dimensions",
            description: "Unlocks a new Tab",
            unlocked() { return player.ad.timewalls >= 40 },
            cost: new ExpantaNum(1e12),
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
        40:
        {
            title: "Just to make stuff easier",
            description: "Boost all dimensions by x100",
            unlocked() { return player.ad.dimboost >= 1 },
            cost: new ExpantaNum(1e20),
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
            description: "Automates buying Dimension Boosts, Galaxies, Production Multipliers, and Automatically gains Sacrifice mult, But unfortunately, stops autobuying buyables in the Incremental Layer and the Cookie Clicker layer. (This is due to performance issues it wont change anything gameplay-wise so dont worry)",
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
            cost: new ExpantaNum(10000),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        47:
        {
            title: "The Boost of the Infinite Gods",
            description: "Boost to the 1st Dimension based on Infinity Points",
            unlocked() { return hasUpgrade("ad", 46) },
            cost: new ExpantaNum(500000),
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
            cost: new ExpantaNum(500000),
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
            cost: new ExpantaNum(1e8),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        51:
        {
            title: "Replicanti this early in the game?????",
            description: "Unlocks a new tab",
            unlocked() { return hasUpgrade("ad", 49) },
            cost: new ExpantaNum(1e10),
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
            cost: new ExpantaNum(1e13),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        55:
        {
            title: "Couldn't get enought replicanti?",
            description: "Gets 5x Replicanti now",
            unlocked() { return hasUpgrade("ad", 54) },
            cost: new ExpantaNum(4e14),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        56:
        {
            title: "We need more Infinity Points",
            description: "Replicanti Boosts Infinity Points",
            unlocked() { return hasUpgrade("ad", 55) },
            cost: new ExpantaNum(1e17),
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
            unlocked() { return hasUpgrade("ad", 54) },
            cost: new ExpantaNum(1e19),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        58:
        {
            title: "More Singularities?",
            description: "Boosts Singularities based on Replicanti",
            unlocked() { return hasUpgrade("ad", 57) },
            cost: new ExpantaNum(1e22),
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
            cost: new ExpantaNum(1e26),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        61:
        {
            title: "Big Black Holes (AYO?)",
            description: "Generates Black Holes based on Infinity Points",
            unlocked() { return hasUpgrade("ad", 59) },
            cost: new ExpantaNum(1e26),
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
            cost: new ExpantaNum(1e68),
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
            cost: new ExpantaNum(1e88),
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
            cost: new ExpantaNum(1e250),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        69:
        {
            title: "A boost everyone would like",
            description: "x1e50 Replicanti Boost and unlocks a new tab",
            unlocked() { return hasUpgrade("ad", 68) },
            cost: new ExpantaNum("1e700"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        71:
        {
            title: "Subatomic Booster",
            description: "Autobuys Subatomic Dimensions and Subatomic Power Effect also boosts Subatomic Particles",
            unlocked() { return hasUpgrade("ad", 69) },
            cost: new ExpantaNum("1e2000"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        72:
        {
            title: "Atom Self-Replication",
            description: "Boosts Atoms based on Atoms",
            unlocked() { return hasUpgrade("ad", 71) },
            cost: new ExpantaNum("1e6000"),
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
            cost: new ExpantaNum("1e150000"),
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
            title: "The Cost of this Upgrade is Funny Number",
            description: "Effect Shards and Gain Shards boost each other",
            unlocked() { return hasUpgrade("ad", 92) },
            cost: new ExpantaNum("e6e9"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        94:
        {
            title: "Hevipelle knows your the Chosen one",
            description: "Boosts Electron effect Pow to ^2000",
            unlocked() { return hasUpgrade("ad", 93) },
            cost: new ExpantaNum("e5e10"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        95:
        {
            title: "Even more Inflated boosting",
            description: "Effect Shards and Gain Shards boost each other even more",
            unlocked() { return hasUpgrade("ad", 94) },
            cost: new ExpantaNum("e7.5e10"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        96:
        {
            title: "No more Constant Switching",
            description: "Produce Gain Shards and Effect Shards at the Same time",
            unlocked() { return hasUpgrade("ad", 95) },
            cost: new ExpantaNum("e1e14"),
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinitypoints",
        },
        97:
        {
            title: "The End is Near...",
            description: "Unlock Final Shards but turn off the other Autobuyers (For Performance)",
            unlocked() { return hasUpgrade("ad", 96) },
            cost: new ExpantaNum("e1e20"),
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
            return player[this.layer].buyables[this.id].add(1).pow(0.8)
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
        cost(x) { return new ExpantaNum(1e10).pow(x.div(40)).mul(1e10) },
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
            if (hasUpgrade("ad", 44)) alldimsmult = alldimsmult.mul(upgradeEffect("ad", 44))
            if (hasUpgrade("ad", 40)) alldimsmult = alldimsmult.mul(100)

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
            player.ad.replicantieffect = player.ad.replicanti.add(1).pow(0.5)
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
            player.ad.blackholestoget = player.ad.infinitypoints.plus(10).log10()
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
                player.ad.finalshardspersecond = player.points.plus(10).log10().log10().pow(0.5)
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
          ["row", [["buyable", 21]]],
          ["row", [["buyable", 22]]],
          ["row", [["buyable", 23]]],
          ["row", [["buyable", 24]]],
          ["row", [["buyable", 25]]],
          ["row", [["buyable", 26]]],
          ["row", [["buyable", 27]]],
          ["row", [["buyable", 28]]],
          ]
          },
          "Boosts and Galaxies": {
          unlocked() { return player.ad.dimension8 >= 5 || player.ad.dimboost >= 1  || player.ad.antimattergalaxies >= 1 || player.ad.infinitypoints > 0},
          content: [
          ["display-text", () => "You have " + format(player.ad.antimatter) + " Antimatter and a x" + format(player.ad.antimattereffect) + " boost to Cookie Time"],
          ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33], ["buyable", 34]]],
          ["row", [["upgrade", 4], ["upgrade", 41], ["upgrade", 42]]],
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
			}
            if (player.m.playerhealth <= 0)
            {
                player.m.deadcooldown = new ExpantaNum(60)
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
        player.m.militarypowereffect = player.m.militarypower.add(1).pow(0.2)
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
          ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
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
    displayRow: 1,
    		effect() 
        {
			return new ExpantaNum.add(player.ch.points, 1);
		},
        effectDescription(){
                let eff = layers.ch.effect()
                return "which multiplies Coin gain by x" + format(eff)
        },
            buyables:
    {
    },    
    upgrades: 
    {
        },
    update(delta) 
    {
    },
        microtabs: 
    {
        stuff: 
        {
        },
    },
        tabFormat: [
        "main-display",
        ["LAYER COMING SOON"],
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    layerShown(){return hasUpgrade("l", 118)}
},
)