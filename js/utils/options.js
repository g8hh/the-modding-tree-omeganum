// ************ Options ************

let options = {}

function getStartOptions() {
	return {
		optionTab: "saving",

		autosave: true,
		msDisplay: "always",
		lore: "help",
		theme: null,
		hqTree: false,
		offlineProd: true,
		hideChallenges: false,
		showStory: true,
		forceOneTab: false,
		oldStyle: false,
		antiEpilepsy: false,
		notation: "default",
	}
}

function toggleOpt(name) {
	if (name == "oldStyle" && styleCooldown > 0)
		return;

	options[name] = !options[name];
	if (name == "hqTree")
		changeTreeQuality();
	if (name == "oldStyle")
		updateStyle();
}
var styleCooldown = 0;
function updateStyle() {
	styleCooldown = 1;
	let css = document.getElementById("styleStuff");
	css.href = options.oldStyle ? "oldStyle.css" : "style.css";
	needCanvasUpdate = true;
}
function changeTreeQuality() {
	var on = options.hqTree;
	document.body.style.setProperty('--hqProperty1', on ? "2px solid" : "4px solid");
	document.body.style.setProperty('--hqProperty2a', on ? "-4px -4px 4px rgba(0, 0, 0, 0.25) inset" : "-4px -4px 4px rgba(0, 0, 0, 0) inset");
	document.body.style.setProperty('--hqProperty2b', on ? "0px 0px 20px var(--background)" : "");
	document.body.style.setProperty('--hqProperty3', on ? "2px 2px 4px rgba(0, 0, 0, 0.25)" : "none");
}
function toggleAuto(toggle) {
	player[toggle[0]][toggle[1]] = !player[toggle[0]][toggle[1]];
	needCanvasUpdate=true
}

const MS_DISPLAYS = ["ALL", "LAST, AUTO, INCOMPLETE", "AUTOMATION, INCOMPLETE", "INCOMPLETE", "NONE"];

const MS_SETTINGS = ["always", "last", "automation", "incomplete", "never"];

const loresettings = ["HELP", "I NEED HELP", "PLEASE GET ME OUT OF HERE", "THEY PUT ME IN THIS BUTTON", "I NEED TO GET OUT I HAVE A WIFE WITH 2 KIDS", "NOW JUST GO TO THIS LINK AND HELP ME", "https://textdoc.co/fCZ48ajUxcbnV5Jy"];

const loredisplay = ["HELP", "I NEED HELP", "PLEASE GET ME OUT OF HERE", "THEY PUT ME IN THIS BUTTON", "I NEED TO GET OUT I HAVE A WIFE WITH 2 KIDS", "NOW JUST GO TO THIS LINK AND HELP ME", "https://textdoc.co/fCZ48ajUxcbnV5Jy"];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % 5];
}
function milestoneShown(layer, id) {
	complete = player[layer].milestones.includes(id);
	auto = layers[layer].milestones[id].toggles;

	switch (options.msDisplay) {
		case "always":
			return true;
			break;
		case "last":
			return (auto) || !complete || player[layer].lastMilestone === id;
			break;
		case "automation":
			return (auto) || !complete;
			break;
		case "incomplete":
			return !complete;
			break;
		case "never":
			return false;
			break;
	}
	return false;
}
function adjustlore() {
	options.lore = loresettings[(loredisplay.indexOf(options.lore) + 1) % 7];
}
const NT_DISPLAYS = ["FGH-J NOTATION", "HYPER-E", "CHAINED ARROWS", "FALLBACK NOTATION"];

const NT_SETTINGS = ["default", "hypere", "chained", "fallback"];

function adjustNotation() {
	options.notation = NT_SETTINGS[(NT_SETTINGS.indexOf(options.notation) + 1) % NT_SETTINGS.length];
}