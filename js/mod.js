let modInfo = {
	name: "The Incremental Dev Tree",
	id: "ictree",
	author: "Icecreamdude",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum(10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.2",
	name: "FEED THE GODS",
}

let changelog = `<h1>Changelog:</h1><br>
	<br/>
	<h3>v1.2</h3><br/>
		- Adds Clicker Heroes, Incremental^2, and the Hub.<br/>
		- Added a lot more stuff!<br/>
		- Bumped Endgame to around 7F6
	<br/>
	<br/>
	<h3>v1.1</h3><br/>
		- Adds Antimatter Dimensions and Military Minigame.<br/>
		- Added a Research Tree to the Life Layer and a lot of Content!<br/>
		- Bumped Endgame to around ee1e11
	<br/>
	<h3>v1.0</h3><br>
		- Added The First and Second Layer, as well as a Special Layer<br>
		- Added a lot of cool stuff! These layers are Packed with Content!<br/>
		- Bumped Endgame to around 1e10000`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new ExpantaNum(0)
	let gain = new ExpantaNum(1)
	if (hasUpgrade('i', 11)) gain = gain.times(2)
	if (hasUpgrade('i', 12)) gain = gain.times(3)
	if (hasUpgrade('i', 13)) gain = gain.times(upgradeEffect('i', 13))
	if (hasUpgrade('i', 14)) gain = gain.times(upgradeEffect('i', 14))
	gain = gain.times(buyableEffect('i', 11))
	gain = gain.times(buyableEffect('i', 31))
	if (hasUpgrade('i', 42)) gain = gain.times(upgradeEffect('i', 42))
	if (hasUpgrade('i', 43)) gain = gain.pow(1.03)
	if (hasUpgrade('i', 51)) gain = gain.times(1e30)
	gain = gain.pow(buyableEffect('i', 42))
	if (hasUpgrade('cc', 21)) gain = gain.times(upgradeEffect('cc', 21))
	if (hasUpgrade('cc', 42)) gain = gain.times(upgradeEffect('cc', 42))
	if (hasUpgrade('cc', 72)) gain = gain.times(upgradeEffect('cc', 72))
	if (hasUpgrade('cc', 81)) gain = gain.times(upgradeEffect('cc', 81))
	if (hasUpgrade('cc', 83)) gain = gain.times(upgradeEffect('cc', 83))
	if (hasUpgrade('cc', 101)) gain = gain.times(upgradeEffect('cc', 101))
	if (hasUpgrade('l', 11)) gain = gain.times(upgradeEffect('l', 11))
	if (hasUpgrade('l', 12)) gain = gain.times(player.l.savedmoneyeffect)
	if (hasUpgrade('cc', 213)) gain = gain.times(upgradeEffect('cc', 213))
	if (hasUpgrade('l', 25)) gain = gain.times(upgradeEffect('l', 25))
	gain = gain.times(player.l.cookietimeeffect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte([80000000, 2, 0, 1])
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}