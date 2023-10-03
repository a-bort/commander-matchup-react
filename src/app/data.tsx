import Deck from './models/Deck'


let fullDeckList: Array<Deck> = [
	{_id:"", player: "Andrew", commander: "Bahamut", w:true, u: false, b: false, r: false, g: false, strategy:["Initiative", "Tokens", "Superfriends"], power: 5},
	{_id:"", player: "Andrew", commander: "Ikra & Co.", w:true, u: false, b: true, r: false, g: true, strategy:["Lifegain", "Toughness", "Tokens"], power: 7},
	{_id:"", player: "Andrew", commander: "Chromium", w:true, u: true, b: true, r: false, g: false, strategy:["Control", "Self Discard"], power: 5},
	{_id:"", player: "Andrew", commander: "Slimefoot", w:false, u: false, b: true, r: false, g: true, strategy:["Gain & Drain", "Tokens", "Aristocrats"], power: 4},
	{_id:"", player: "Andrew", commander: "Narset", w:true, u: true, b: false, r: true, g: false, strategy:["Tokens", "Go Wide", "Reanimator"], power: 7},
	{_id:"", player: "Andrew", commander: "The Archimandrite", w:true, u: true, b: false, r: true, g: false, strategy:["Go Wide", "Stompy"], power: 5},
	{_id:"", player: "Andrew", commander: "Aboshan", w:false, u: true, b: false, r: false, g: false, strategy:["Self Mill", "Tap Untap"], power: 4},
	{_id:"", player: "Andrew", commander: "Mishra", w:false, u: true, b: true, r: true, g: false, strategy:["Artifacts"], power: 4},
	{_id:"", player: "Andrew", commander: "Mathas", w:true, u: false, b: true, r: true, g: false, strategy:["Punisher", "Burn", "Lifegain"], power: 4},
	{_id:"", player: "Andrew", commander: "Runo", w:false, u: true, b: true, r: false, g: false, strategy:["Stompy", "Creature Copies"], power: 6},
	{_id:"", player: "Brian", commander: "Meren", w:false, u: false, b: true, r: false, g: true, strategy:["Reanimator"], power: 6},
	{_id:"", player: "Brian", commander: "Perrie", w:true, u: true, b: false, r: false, g: true, strategy:["Counters", "Control"], power: 5},
	{_id:"", player: "Brian", commander: "Konrad", w:false, u: false, b: true, r: false, g: false, strategy:["Drain & Gain", "Mill", "Self Mill"], power: 7},
	{_id:"", player: "Brian", commander: "Zegana", w:false, u: true, b: false, r: false, g: true, strategy:["Plus One Counters", "Stompy"], power: 5},
	{_id:"", player: "Brian", commander: "Aegar", w:false, u: true, b: false, r: true, g: false, strategy:["Burn"], power: 5},
	{_id:"", player: "Brian", commander: "Leinore", w:true, u: false, b: false, r: false, g: true, strategy:["Plus One Counters", "Go Wide"], power: 5},
	{_id:"", player: "Brian", commander: "Anje", w:false, u: false, b: true, r: true, g: false, strategy:["Drain & Gain"], power: 5},
	{_id:"", player: "Brian", commander: "Marneus", w:true, u: true, b: true, r: false, g: false, strategy:["Tokens", "Go Wide"], power: 5},
	{_id:"", player: "Brian", commander: "Lucea", w:false, u: true, b: false, r: true, g: true, strategy:["Plus One Counters", "Stompy", "Ramp"], power: 7},
	{_id:"", player: "Brian", commander: "Firja", w:true, u: false, b: true, r: false, g: false, strategy:["Lifegain", "Flyers"], power: 4},
	{_id:"", player: "Brian", commander: "Alela", w:false, u: true, b: true, r: false, g: false, strategy:["Faeries", "Flyers", "Draw Go", "Spell Slinger"], power: 5},
	{_id:"", player: "Brian", commander: "Myrkul", w:true, u: false, b: true, r: false, g: true, strategy:["Enchantments", "Sacrifice"], power: 7},
	{_id:"", player: "Stamm", commander: "Mazzy", w:true, u: false, b: false, r: true, g: true, strategy:["Enchantress"], power: 7},
	{_id:"", player: "Stamm", commander: "Alexi", w:false, u: true, b: false, r: false, g: false, strategy:["Control"], power: 4},
	{_id:"", player: "Stamm", commander: "Koll", w:true, u: false, b: false, r: true, g: false, strategy:["Equipment"], power: 5},
	{_id:"", player: "Stamm", commander: "Magar", w:false, u: false, b: true, r: true, g: false, strategy:["Spell Recursion"], power: 5},
	{_id:"", player: "Stamm", commander: "Myra", w:false, u: true, b: false, r: true, g: false, strategy:["Artifacts", "Spell Slinger"], power: 5},
	{_id:"", player: "Stamm", commander: "Juri", w:false, u: false, b: true, r: true, g: false, strategy:["Voltron", "Burn"], power: 5},
	{_id:"", player: "Stamm", commander: "Atla", w:true, u: false, b: false, r: true, g: true, strategy:["Banding", "Damage Redirection"], power: 4},
	{_id:"", player: "Stamm", commander: "Wernog + Othelm", w:true, u: false, b: true, r: false, g: true, strategy:["Artifacts", "Clues"], power: 6},
	{_id:"", player: "Stamm", commander: "Araumi", w:false, u: true, b: true, r: false, g: false, strategy:["Reanimator"], power: 5},
	{_id:"", player: "Olivier", commander: "Kamiz", w:true, u: true, b: true, r: false, g: false, strategy:["Reanimator"], power: 7},
	{_id:"", player: "Olivier", commander: "Faldorn", w:false, u: false, b: false, r: true, g: true, strategy:["Exile", "Tokens"], power: 6},
	{_id:"", player: "Olivier", commander: "Dimir Zombies", w:false, u: true, b: true, r: false, g: false, strategy:["Stompy", "Tokens"], power: 5},
	{_id:"", player: "Olivier", commander: "Isperia", w:true, u: true, b: false, r: false, g: false, strategy:["Flyers", "Stompy"], power: 5},
	{_id:"", player: "Olivier", commander: "Atarka", w:false, u: false, b: false, r: true, g: true, strategy:["Flyers", "Stompy"], power: 5},
	{_id:"", player: "Olivier", commander: "Emmara", w:true, u: false, b: false, r: false, g: true, strategy:["Tokens", "Lifegain"], power: 5},
	{_id:"", player: "Olivier", commander: "Henzie", w:false, u: false, b: true, r: true, g: true, strategy:["Blitz", "Stompy"], power: 5},
	{_id:"", player: "Olivier", commander: "Xander", w:false, u: true, b: true, r: true, g: false, strategy:["Spell Slinger"], power: 5},
	{_id:"", player: "Olivier", commander: "Kitt Kanto", w:true, u: false, b: false, r: true, g: true, strategy:["Goad", "Tokens"], power: 5},
	{_id:"", player: "Mark", commander: "Rafiq", w:true, u: true, b: false, r: false, g: true, strategy:["Voltron"], power: 5},
	{_id:"", player: "Mark", commander: "Kresh", w:false, u: false, b: true, r: true, g: true, strategy:["Voltron", "Plus One Counters"], power: 5},
	{_id:"", player: "Mark", commander: "Irenicus", w:false, u: true, b: true, r: false, g: true, strategy:["Tainted Gifts"], power: 4},
	{_id:"", player: "Mark", commander: "Hannah", w:true, u: true, b: false, r: false, g: false, strategy:["Artifacts", "Artifact Creatures"], power: 6},
	{_id:"", player: "Mark", commander: "Niv Mizzet", w:false, u: true, b: false, r: true, g: false, strategy:["Pingers", "Burn"], power: 4},
	{_id:"", player: "Mark", commander: "Karthus", w:false, u: false, b: true, r: true, g: true, strategy:["Voltron"], power: 5},
	{_id:"", player: "Mark", commander: "Obzedadt", w:true, u: false, b: true, r: false, g: false, strategy:["Drain & Gain"], power: 5},
	{_id:"", player: "Mark", commander: "Knights & Dragons", w:true, u: false, b: false, r: true, g: false, strategy:["Stompy", "Flyers"], power: 4},
	{_id:"", player: "Mark", commander: "Jared", w:true, u: false, b: false, r: true, g: true, strategy:["Monarch", "Damage Redirection"], power: 5},
	{_id:"", player: "Daren", commander: "Reaper King", w:true, u: true, b: true, r: true, g: true, strategy:["Good Stuff"], power: 5},
	{_id:"", player: "Daren", commander: "Seton", w:false, u: false, b: false, r: false, g: true, strategy:["Ramp"], power: 4},
	{_id:"", player: "Daren", commander: "Jhoira", w:false, u: true, b: false, r: true, g: false, strategy:["Chaos"], power: 5},
	{_id:"", player: "Daren", commander: "Karn", w:false, u: false, b: false, r: false, g: false, strategy:["Artifacts"], power: 8}
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
