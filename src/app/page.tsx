'use client'

//IMPORTS

import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'

//INTERFACES

interface Deck {
	player: string;
	commander: string;
	w: boolean;
	u: boolean;
	b: boolean;
	r: boolean;
	g: boolean;
	strategy: Array<string>;
	power: number;
};

interface PlayerIndexedDeckList {
	[key: string]: Array<Deck>;
}

//CLASSES

class Matchup {
	matchupDecks: Array<Deck> = [];
	matchupName: string = "";
	w: boolean;
	u: boolean;
	b: boolean;
	r: boolean;
	g: boolean;
	colorCoverage: string = "";
	powerVariance: number = 0;
	strategyOverlap: number = 0;
	
	constructor(decks: Array<Deck>) {
		this.matchupDecks = decks;
		this.generateMatchupName();
		this.generateColorCoverage();
		this.generatePowerVariance();
		this.generateStrategyOverlap();
	}
	
	generateMatchupName() {
		if(this.matchupDecks.length == 0){return;}
		var name = this.matchupDecks[0].commander;
		for(var i = 1; i < this.matchupDecks.length; i++){
			name = `${name} vs. ${this.matchupDecks[i].commander}`;
		}
		this.matchupName = name;
	}
	
	generateColorCoverage() {
		let w: boolean = false;
		let u: boolean = false;
		let b: boolean = false;
		let r: boolean = false;
		let g: boolean = false;
		for(var i = 0; i < this.matchupDecks.length; i++){
			w = w || this.matchupDecks[i].w;
			u = u || this.matchupDecks[i].u;
			b = b || this.matchupDecks[i].b;
			r = r || this.matchupDecks[i].r;
			g = g || this.matchupDecks[i].g;
		}
		this.w = w;
		this.u = u;
		this.b = b;
		this.r = r;
		this.g = g;
		this.colorCoverage = (w ? "W" : "").concat(u ? "U" : "", b ? "B" : "", r ? "R" : "", g ? "G" : "");
	}
	
	generatePowerVariance() {
		let powers: Array<number> = [];
		for(var i = 0; i < this.matchupDecks.length; i++){
			powers.push(this.matchupDecks[i].power);
		}
		this.powerVariance = calculateSD(calculateVariance(powers)).toFixed(2);
	}
	
	generateStrategyOverlap() {
		let overlap: number = 0;
		for(var i = 0; i < this.matchupDecks.length - 1; i++){
			for(var j = i+1; j < this.matchupDecks.length; j++){
				overlap += commonArrayElements(this.matchupDecks[i].strategy, this.matchupDecks[j].strategy);
			}
		}
		this.strategyOverlap = overlap;
	}
}

/********************
*
* UTILITY FUNCTIONS
*
***********************/

const cartesian = (set_a: Array<Array<Deck>>, set_b: Array<Deck>): Array<Array<Deck>> => {
	let result: Array<Array<Deck>> = [];
	for(var i=0; i<set_a.length; i++){
		for(var j=0; j<set_b.length; j++){
			let temp: Array<Deck> = set_a[i].concat(set_b[j]);
			result.push(temp);
		}
	}
	return result;
}

const calculateMean = (values: number[]): number => {
  const mean = (values.reduce((sum, current) => sum + current)) / values.length;
  return mean;
}

// Calculate variance
const calculateVariance = (values: number[]): number => {
  const average = calculateMean(values);
  const squareDiffs = values.map((value: number): number => {
	const diff = value - average;
	return diff * diff;
  })

  const variance = calculateMean(squareDiffs);
  return variance;
}

// Calculate stand deviation
const calculateSD = (variance: number): number => {
  return  Math.sqrt(variance);
}

const commonArrayElements = (arr_1: Array<string>, arr_2: Array<string>): number => {
	let count = 0;
	for(var i = 0; i < arr_1.length; i++){
		for(var j = 0; j < arr_2.length; j++){
			if(arr_1[i] == arr_2[j]){
				count++;
			}
		}
	}
	return count;
}

const compareColorCoverageThenStratsThenPower = (m1: Matchup, m2: Matchup): number => {
	//Highest weight to color coverate
	if(m1.colorCoverage.length > m2.colorCoverage.length){
		return -1;
	} else if (m1.colorCoverage.length < m2.colorCoverage.length){
		return 1;
	}
	else {
		//Second weight to strategy overlap (full coverage isn't hard)
		if(m1.strategyOverlap > m2.strategyOverlap){
			return 1;
		} else if(m1.strategyOverlap < m2.strategyOverlap){
			return -1;
		} else {
			//Third weight to power variance, since it's arbitrary
			if(m1.powerVariance > m2.powerVariance){
				return 1;
			} else if(m1.powerVariance < m2.powerVariance){
				return -1;
			}
			return 0;	
		}
	}
}

//BASE COMPONENT

export default function Home() {
	return (
		<main className={styles.main}>
		  <MatchupGenerator />
		</main>
	)
}

//COMPONENTS LARGE TO SMALL

function MatchupGenerator() {

	// ************ STATE ******************
	const [step, setStep] = useState(0); //DEFUNCT?
	const [selectedPlayerDeckLists, setSelectedPlayerDeckLists] = useState({}); //key: playerName | value: chosenDecks
	const [submitEnabled, setSubmitEnabled] = useState(false);
	const [matchups, setMatchups] = useState([]); //List of Matchup objects
	
	const maxStep = 2;

	// ************ REPLACE WITH DATABASE 
	let decka1: Deck = {player: "Andrew", commander: "Bahamut", w:true, u: false, b: false, r: false, g: false, strategy:["Initiative", "Tokens", "Superfriends"], power: 5};
	let decka2: Deck = {player: "Andrew", commander: "Sidar & Ikra", w:true, u: false, b: true, r: false, g: true, strategy:["Lifegain"], power: 7};
	let decka3: Deck = {player: "Andrew", commander: "Chromium", w:true, u: true, b: true, r: false, g: false, strategy:["Control", "Self Discard"], power: 5};
	let decka4: Deck = {player: "Andrew", commander: "Slimefoot", w:false, u: false, b: true, r: false, g: true, strategy:["Gain & Drain", "Tokens"], power: 4};
	let decka5: Deck = {player: "Andrew", commander: "Narset", w:true, u: true, b: false, r: true, g: false, strategy:["Tokens", "Go Wide", "Reanimator"], power: 7};
	let decka6: Deck = {player: "Andrew", commander: "Aboshan", w:false, u: true, b: false, r: false, g: false, strategy:["Self Mill", "Tap Untap"], power: 4};
	let decka7: Deck = {player: "Andrew", commander: "Mishra", w:false, u: true, b: true, r: true, g: false, strategy:["Artifacts"], power: 4};
	let decka8: Deck = {player: "Andrew", commander: "Mathas", w:true, u: false, b: true, r: true, g: false, strategy:["Punisher"], power: 4};
	let deckb1: Deck = {player: "Brian", commander: "Meren", w:false, u: false, b: true, r: false, g: true, strategy:["Reanimator"], power: 6};
	let deckb2: Deck = {player: "Brian", commander: "Perrie", w:true, u: true, b: false, r: false, g: true, strategy:["Counters", "Control"], power: 5};
	let deckb3: Deck = {player: "Brian", commander: "Konrad", w:false, u: false, b: true, r: false, g: false, strategy:["Drain & Gain", "Self Mill"], power: 7};
	let deckb4: Deck = {player: "Brian", commander: "Zegana", w:false, u: true, b: false, r: false, g: true, strategy:["Plus One Counters", "Stompy"], power: 5};
	let deckb5: Deck = {player: "Brian", commander: "Aegar", w:false, u: true, b: false, r: true, g: false, strategy:["Burn"], power: 5};
	let deckb6: Deck = {player: "Brian", commander: "Leinore", w:true, u: false, b: false, r: false, g: true, strategy:["Plus One Counters", "Go Wide"], power: 5};
	let deckb7: Deck = {player: "Brian", commander: "Anje", w:false, u: false, b: true, r: true, g: false, strategy:["Drain & Gain"], power: 5};
	let deckb8: Deck = {player: "Brian", commander: "Marneus", w:true, u: true, b: true, r: false, g: false, strategy:["Tokens", "Go Wide"], power: 5};
	let deckb9: Deck = {player: "Brian", commander: "Lucea", w:false, u: true, b: false, r: true, g: true, strategy:["Plus One Counters", "Stompy", "Ramp"], power: 7};
	let deckb10: Deck = {player: "Brian", commander: "Firja", w:true, u: false, b: true, r: false, g: false, strategy:["Lifegain", "Flyers"], power: 4};
	let decks1: Deck = {player: "Stamm", commander: "Mazzy", w:true, u: false, b: false, r: true, g: true, strategy:["Enchantress"], power: 7};
	let decks2: Deck = {player: "Stamm", commander: "Alexi", w:false, u: true, b: false, r: false, g: false, strategy:["Control"], power: 4};
	let decks3: Deck = {player: "Stamm", commander: "Koll", w:true, u: false, b: false, r: true, g: false, strategy:["Equipment"], power: 5};
	let decks4: Deck = {player: "Stamm", commander: "Magar", w:false, u: false, b: true, r: true, g: false, strategy:["Spell Recursion"], power: 5};
	let decks5: Deck = {player: "Stamm", commander: "Myra", w:false, u: true, b: false, r: true, g: false, strategy:["Artifacts", "Spell Slinger"], power: 5};
	let decks6: Deck = {player: "Stamm", commander: "Juri", w:false, u: false, b: true, r: true, g: false, strategy:["Voltron"], power: 5};
	let decko1: Deck = {player: "Olivier", commander: "Kamiz", w:true, u: true, b: true, r: false, g: false, strategy:["Reanimator"], power: 7};
	let decko2: Deck = {player: "Olivier", commander: "Faldorn", w:false, u: false, b: false, r: true, g: true, strategy:["Exile", "Tokens"], power: 6};
	let decko3: Deck = {player: "Olivier", commander: "Dimir Zombies", w:false, u: true, b: true, r: false, g: false, strategy:["Stompy", "Tokens"], power: 5};
	let decko4: Deck = {player: "Olivier", commander: "Isperia", w:true, u: true, b: false, r: false, g: false, strategy:["Flyers", "Stompy"], power: 5};
	let decko5: Deck = {player: "Olivier", commander: "Atarka", w:false, u: false, b: false, r: true, g: true, strategy:["Flyers", "Stompy"], power: 5};
	let deckm1: Deck = {player: "Mark", commander: "Rafiq", w:true, u: true, b: false, r: false, g: true, strategy:["Voltron"], power: 5};
	let deckm2: Deck = {player: "Mark", commander: "Kresh", w:false, u: false, b: true, r: true, g: true, strategy:["Voltron", "Plus One Counters"], power: 5};
	let deckm3: Deck = {player: "Mark", commander: "Irenicus", w:false, u: true, b: true, r: false, g: true, strategy:["Tainted Gifts"], power: 4};
	let deckm4: Deck = {player: "Mark", commander: "Hannah", w:true, u: true, b: false, r: false, g: false, strategy:["Artifacts", "Artifact Creatures"], power: 6};
	let deckm5: Deck = {player: "Mark", commander: "Niv Mizzet", w:false, u: true, b: false, r: true, g: false, strategy:["Pingers", "Burn"], power: 4};
	let deckm6: Deck = {player: "Mark", commander: "Karthus", w:false, u: false, b: true, r: true, g: true, strategy:["Voltron"], power: 5};

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
	
	// **************** DATA MANIPULATION
	
	let deckListByPlayer: PlayerIndexedDeckList = {};

	for(var i = 0; i < fullDeckList.length; i++){
		var deck = fullDeckList[i];
		if(!deckListByPlayer[deck.player]){
			deckListByPlayer[deck.player] = new Array<Deck>();
		}
		deckListByPlayer[deck.player].push(deck);
	}

	let playerPool = [...new Set(fullDeckList.map(deck => deck.player))];
	
	const handlePlayerSelect = (event) => {
		var updatedSelectedPlayerDeckLists = {...selectedPlayerDeckLists};
		if(event.target.checked){
			updatedSelectedPlayerDeckLists[event.target.value] = deckListByPlayer[event.target.value];
		} else {
			delete updatedSelectedPlayerDeckLists[event.target.value];
		}
		setSelectedPlayerDeckLists(updatedSelectedPlayerDeckLists);
	};
	
	const handleDeckSelect = (event) => {
		let player = event.target.getAttribute("pname");
		let deckIndex = event.target.value;
		
		var updatedSelectedPlayerDeckLists = {...selectedPlayerDeckLists};
		
		updatedSelectedPlayerDeckLists[player][deckIndex].selected = event.target.checked;
		setSelectedPlayerDeckLists(updatedSelectedPlayerDeckLists);
		//console.log(selectedPlayerDeckLists);
	}

	/********
	*  DEFUNCT DISPLAY FOR PAGED VERSION
	
	const conditionalComponent = () => {
		switch(step) {
			case 0: 
				return <ChoosePlayersStep playerPool={playerPool} handlePlayerSelect={handlePlayerSelect}/>;
			case 1:
				return <ChooseDecksStep selectedPlayerDeckLists={selectedPlayerDeckLists} handleDeckSelect={handleDeckSelect}/>;
			case 2:
				return <MatchupList />;
			default:
				console.log("ERROR - STEP OUT OF BOUNDS");
				return <ChoosePlayersStep />;
		}
	};
	
	const nextDisabled = () => {
		switch(step){
			case 0:
				return Object.keys(selectedPlayerDeckLists).length < 2;
			case 1:
				return !readyToGenerate();
			case 2:
				return false;
			default:
				console.log("ERROR: STEP OUT OF BOUNDS");
				return true;
		}
	}
	
	*
	*********************/
	
	const readyToGenerate = () => {
		var players = Object.keys(selectedPlayerDeckLists);
		if(players.length < 2){ return false; }
		else {
			for (var i = 0; i < players.length; i++){
				var player = players[i];
				var found = false;
				for(var j = 0; j < selectedPlayerDeckLists[player].length; j++){
					if(selectedPlayerDeckLists[player][j].selected){
						found = true;
						break;
					}
				}
				if(!found){
					return false;
				}
			}
		}
		return true;
	}
	
	const submitDisabled = () => {
		return !readyToGenerate();
	};
	
	const handleSubmit = () => {
		let players: Array<string> = Object.keys(selectedPlayerDeckLists);
		//console.log(players);
		//NEED TO FILTER ONLY SELECTED DECKS
		let fullLists: Array<Array<Deck>> = Object.values(selectedPlayerDeckLists);
		let selectedLists: Array<Array<Deck>> = [];
		
		for(var i = 0; i < fullLists.length; i++){
			var selectedList = [];
			for(var j = 0; j < fullLists[i].length; j++){
				if(fullLists[i][j].selected){
					selectedList.push(fullLists[i][j]);
				}
			}
			selectedLists.push(selectedList);
		}
		
		let deckMatchups: Array<Array<Deck>> = [[]];
		for(var i = 0; i < selectedLists.length; i++){
			deckMatchups = cartesian(deckMatchups, selectedLists[i]);
		}
		
		let updatedMatchups = [];
		
		for(var i = 0; i < deckMatchups.length; i++){
			updatedMatchups.push(new Matchup(deckMatchups[i]));
		}
		
		updatedMatchups.sort(compareColorCoverageThenStratsThenPower);
		setMatchups(updatedMatchups);
		
	};
	
	/****************
	*
	* DEFUNCT NEXT BUTTON FUNCTIONALITY
	
	const handleBack = () => {
		if(step > 0){
			setStep(step - 1);
		} else {
			setStep(0);
		}
	};
	
	********************************/
	
	/**
	* BASE COMPONENT
	**/
	
	return (
		<div style={{width:"75%"}}>
			<ChoosePlayersStep playerPool={playerPool} handlePlayerSelect={handlePlayerSelect}/>
			<br/><hr/><br/>
			<ChooseDecksStep selectedPlayerDeckLists={selectedPlayerDeckLists} handleDeckSelect={handleDeckSelect}/>
			<br/>
			<button disabled={submitDisabled()} onClick={handleSubmit} /*style for button*/ >Generate</button>
			<br/><br/><hr/><br/>
			<MatchupList matchups={matchups}  />
		</div>
	);
};

/************
*
* CHOOSE players
*
************/

function ChoosePlayersStep({playerPool, handlePlayerSelect}){
	return (
	<>
		<h2>Who's Playing?</h2>
		<PlayerSelect playerPool={playerPool} handlePlayerSelect={handlePlayerSelect} />
	</> );
}

function PlayerSelect({playerPool, handlePlayerSelect}){
	return (
		<div className="checkList">
			<div className="list-container">
				{playerPool.map((player, index) => (
					<div key={index}>
						<input value={player} type="checkbox" onChange={handlePlayerSelect}/>
						<span style={{marginLeft:"5px"}}>{player}</span>
					</div>
				))}
			</div>
		</div>
	);
}

/****************
*
* CHOOSE DECKS
*
*****************/

function ChooseDecksStep({selectedPlayerDeckLists, handleDeckSelect}){
	let players = Object.keys(selectedPlayerDeckLists);
	return (
		<>
			<h2>Choose Decks</h2>
			<div style={{display:"flex", marginTop:"10px"}}>
				{players.map((name, index) => (
					<DeckSelector key={index} playerName={name} decks={selectedPlayerDeckLists[name]} handleDeckSelect={handleDeckSelect} />
				))}
			</div>
		</> 
	);
}

function DeckSelector({playerName, decks, handleDeckSelect}){
	return (
	<>
		<span style={{marginRight: "auto"}}>
			<h3>{playerName}</h3>
			{decks.map((deck, index) => (
				<div key={index}>
					<input type="checkbox" value={index} pname={playerName} onChange={handleDeckSelect}/>
					<span style={{marginLeft:"5px"}}>{deck.commander}</span>
				</div>
			))}
		</span>
	</>
	);
}

/************************
*
* RENDER matchups
*
*************************/

function MatchupList({matchups}){
	return (
		<>
			<h2 style={{display: matchups.length ? "" : "none"}}>Matchups</h2>
			<div style={{marginTop: "10px"}}>
				{matchups.map((matchup, index) => (
					<div key={index}>
						<MatchupListItem matchup={matchup}/>
					</div>			
				))}
			</div>
		</>
	);
}

function MatchupListItem({matchup}){
	return (
	<div style={{padding: "10px", border:"1px solid", marginBottom: "10px"}}>
		<div>
			<span><h3><u>{matchup.matchupName}</u></h3></span>
			<ManaSet matchup={matchup} />
		</div>
		<div>
			<span><b>Color Coverage</b>: {matchup.colorCoverage}</span>
			<span>&nbsp;</span>
			<span><b>Strat Overlap</b>: {matchup.strategyOverlap}</span>
			<span>&nbsp;</span>
			<span><b>Power variance</b>: {matchup.powerVariance}</span>
		</div>
	</div>
	)
}

function ManaSet({matchup}){
	let letters = matchup.colorCoverage.split("");
	return (
		<>
		{letters.map((letter, index) => (
			<ManaSymbol key={index} letter={letter}/>
		))}
		</>
	)
}

const getManaSymbolImageUrl = (letter: string) : string => {
	switch(letter.toUpperCase()){
		case "W":
			return "var(--white-mana-image)";
		case "U":
			return "var(--blue-mana-image)";
		case "B":
			return "var(--black-mana-image)";
		case "R":
			return "var(--red-mana-image)";
		case "G":
			return "var(--green-mana-image)";
	}
	return "var(--colorless-mana-image)";
}

function ManaSymbol({letter}){
	let imageUrl = getManaSymbolImageUrl(letter);
	
	return(
		<>
		<div style={{backgroundImage:imageUrl, width:"var(--mana-symbol-width)", height:"var(--mana-symbol-height)", display: "inline-block", margin: "1px, 1px, -1px, 1px", borderRadius: "500px", boxShadow: "-1px, 1px, 0, rgba(0,0,0,0.85)", textIndent: "-999em", overflow:"hidden", backgroundSize: "100% 100%", backgroundPosition: "top left"}}>
			{letter}
		</div>
		</>
	)
}