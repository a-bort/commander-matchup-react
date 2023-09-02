import Deck from './models/Deck'

// ************ REPLACE WITH DATABASE 
let decka1: Deck = {_id:"", player: "Andrew", commander: "Bahamut", w:true, u: false, b: false, r: false, g: false, strategy:["Initiative", "Tokens", "Superfriends"], power: 5};
let decka2: Deck = {_id:"", player: "Andrew", commander: "Sidar & Ikra", w:true, u: false, b: true, r: false, g: true, strategy:["Lifegain"], power: 7};
let decka3: Deck = {_id:"", player: "Andrew", commander: "Chromium", w:true, u: true, b: true, r: false, g: false, strategy:["Control", "Self Discard"], power: 5};
let decka4: Deck = {_id:"", player: "Andrew", commander: "Slimefoot", w:false, u: false, b: true, r: false, g: true, strategy:["Gain & Drain", "Tokens"], power: 4};
let decka5: Deck = {_id:"", player: "Andrew", commander: "Narset", w:true, u: true, b: false, r: true, g: false, strategy:["Tokens", "Go Wide", "Reanimator"], power: 7};
let decka6: Deck = {_id:"", player: "Andrew", commander: "Aboshan", w:false, u: true, b: false, r: false, g: false, strategy:["Self Mill", "Tap Untap"], power: 4};
let decka7: Deck = {_id:"", player: "Andrew", commander: "Mishra", w:false, u: true, b: true, r: true, g: false, strategy:["Artifacts"], power: 4};
let decka8: Deck = {_id:"", player: "Andrew", commander: "Mathas", w:true, u: false, b: true, r: true, g: false, strategy:["Punisher", "Burn", "Lifegain"], power: 4};
let deckb1: Deck = {_id:"", player: "Brian", commander: "Meren", w:false, u: false, b: true, r: false, g: true, strategy:["Reanimator"], power: 6};
let deckb2: Deck = {_id:"", player: "Brian", commander: "Perrie", w:true, u: true, b: false, r: false, g: true, strategy:["Counters", "Control"], power: 5};
let deckb3: Deck = {_id:"", player: "Brian", commander: "Konrad", w:false, u: false, b: true, r: false, g: false, strategy:["Drain & Gain", "Self Mill"], power: 7};
let deckb4: Deck = {_id:"", player: "Brian", commander: "Zegana", w:false, u: true, b: false, r: false, g: true, strategy:["Plus One Counters", "Stompy"], power: 5};
let deckb5: Deck = {_id:"", player: "Brian", commander: "Aegar", w:false, u: true, b: false, r: true, g: false, strategy:["Burn"], power: 5};
let deckb6: Deck = {_id:"", player: "Brian", commander: "Leinore", w:true, u: false, b: false, r: false, g: true, strategy:["Plus One Counters", "Go Wide"], power: 5};
let deckb7: Deck = {_id:"", player: "Brian", commander: "Anje", w:false, u: false, b: true, r: true, g: false, strategy:["Drain & Gain"], power: 5};
let deckb8: Deck = {_id:"", player: "Brian", commander: "Marneus", w:true, u: true, b: true, r: false, g: false, strategy:["Tokens", "Go Wide"], power: 5};
let deckb9: Deck = {_id:"", player: "Brian", commander: "Lucea", w:false, u: true, b: false, r: true, g: true, strategy:["Plus One Counters", "Stompy", "Ramp"], power: 7};
let deckb10: Deck = {_id:"", player: "Brian", commander: "Firja", w:true, u: false, b: true, r: false, g: false, strategy:["Lifegain", "Flyers"], power: 4};
let decks1: Deck = {_id:"", player: "Stamm", commander: "Mazzy", w:true, u: false, b: false, r: true, g: true, strategy:["Enchantress"], power: 7};
let decks2: Deck = {_id:"", player: "Stamm", commander: "Alexi", w:false, u: true, b: false, r: false, g: false, strategy:["Control"], power: 4};
let decks3: Deck = {_id:"", player: "Stamm", commander: "Koll", w:true, u: false, b: false, r: true, g: false, strategy:["Equipment"], power: 5};
let decks4: Deck = {_id:"", player: "Stamm", commander: "Magar", w:false, u: false, b: true, r: true, g: false, strategy:["Spell Recursion"], power: 5};
let decks5: Deck = {_id:"", player: "Stamm", commander: "Myra", w:false, u: true, b: false, r: true, g: false, strategy:["Artifacts", "Spell Slinger"], power: 5};
let decks6: Deck = {_id:"", player: "Stamm", commander: "Juri", w:false, u: false, b: true, r: true, g: false, strategy:["Voltron", "Burn"], power: 5};
let decko1: Deck = {_id:"", player: "Olivier", commander: "Kamiz", w:true, u: true, b: true, r: false, g: false, strategy:["Reanimator"], power: 7};
let decko2: Deck = {_id:"", player: "Olivier", commander: "Faldorn", w:false, u: false, b: false, r: true, g: true, strategy:["Exile", "Tokens"], power: 6};
let decko3: Deck = {_id:"", player: "Olivier", commander: "Dimir Zombies", w:false, u: true, b: true, r: false, g: false, strategy:["Stompy", "Tokens"], power: 5};
let decko4: Deck = {_id:"", player: "Olivier", commander: "Isperia", w:true, u: true, b: false, r: false, g: false, strategy:["Flyers", "Stompy"], power: 5};
let decko5: Deck = {_id:"", player: "Olivier", commander: "Atarka", w:false, u: false, b: false, r: true, g: true, strategy:["Flyers", "Stompy"], power: 5};
let deckm1: Deck = {_id:"", player: "Mark", commander: "Rafiq", w:true, u: true, b: false, r: false, g: true, strategy:["Voltron"], power: 5};
let deckm2: Deck = {_id:"", player: "Mark", commander: "Kresh", w:false, u: false, b: true, r: true, g: true, strategy:["Voltron", "Plus One Counters"], power: 5};
let deckm3: Deck = {_id:"", player: "Mark", commander: "Irenicus", w:false, u: true, b: true, r: false, g: true, strategy:["Tainted Gifts"], power: 4};
let deckm4: Deck = {_id:"", player: "Mark", commander: "Hannah", w:true, u: true, b: false, r: false, g: false, strategy:["Artifacts", "Artifact Creatures"], power: 6};
let deckm5: Deck = {_id:"", player: "Mark", commander: "Niv Mizzet", w:false, u: true, b: false, r: true, g: false, strategy:["Pingers", "Burn"], power: 4};
let deckm6: Deck = {_id:"", player: "Mark", commander: "Karthus", w:false, u: false, b: true, r: true, g: true, strategy:["Voltron"], power: 5};

let fullDeckList: Array<Deck> = [
	decka1,
	decka2,
	decka3,
	decka4,
	decka5,
	decka6,
	decka7,
	decka8,
	deckb1,
	deckb2,
	deckb3,
	deckb4,
	deckb5,
	deckb6,
	deckb7,
	deckb8,
	deckb9,
	deckb10,
	decks1,
	decks2,
	decks3,
	decks4,
	decks5,
	decks6,
	decko1,
	decko2,
	decko3,
	decko4,
	decko5,
	deckm1,
	deckm2,
	deckm3,
	deckm4,
	deckm5,
	deckm6,
];

//FAKING IDS TIL DB INTEGRATION
function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

for (var i = 0; i < fullDeckList.length; i++){
	fullDeckList[i]._id = makeid(8);
}

export default function getFullDeckList() : Array<Deck> {
	console.log("Getting deck list");
	return fullDeckList;
}