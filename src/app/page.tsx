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
		this.colorCoverage = (w ? "W" : "").concat(u ? "U" : "", b ? "B" : "", r ? "R" : "", g ? "G" : "");
	}
	
	generatePowerVariance() {
		let powers: Array<number> = [];
		for(var i = 0; i < this.matchupDecks.length; i++){
			powers.push(this.matchupDecks[i].power);
		}
		this.powerVariance = calculateSD(calculateVariance(powers));
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
	let deckb1: Deck = {player: "Brian", commander: "Meren", w:false, u: false, b: true, r: false, g: true, strategy:["Reanimator"], power: 6};
	let deckb2: Deck = {player: "Brian", commander: "Perrie", w:true, u: true, b: false, r: false, g: true, strategy:["Counters", "Control"], power: 5};
	let deckb3: Deck = {player: "Brian", commander: "Konrad", w:false, u: false, b: true, r: false, g: false, strategy:["Drain & Gain", "Self Mill"], power: 7};
	let deckb4: Deck = {player: "Brian", commander: "Zegana", w:false, u: true, b: false, r: false, g: true, strategy:["Plus One Counters", "Stompy"], power: 5};
	let deckb5: Deck = {player: "Brian", commander: "Aegar", w:false, u: true, b: false, r: true, g: false, strategy:["Burn"], power: 5};
	let deckb6: Deck = {player: "Patrick", commander: "Leinore", w:true, u: false, b: false, r: false, g: true, strategy:["Plus One Counters", "Go Wide"], power: 5};
	let deckb7: Deck = {player: "Patrick", commander: "Anje", w:false, u: false, b: true, r: true, g: false, strategy:["Drain & Gain"], power: 5};
	let deckb8: Deck = {player: "Patrick", commander: "Marneus", w:true, u: true, b: true, r: false, g: false, strategy:["Tokens", "Go Wide"], power: 5};
	let deckb9: Deck = {player: "Patrick", commander: "Lucea", w:false, u: true, b: false, r: true, g: true, strategy:["Plus One Counters", "Stompy", "Ramp"], power: 7};
	let decks1: Deck = {player: "Stamm", commander: "Mazzy", w:true, u: false, b: false, r: true, g: true, strategy:["Enchantress"], power: 7};
	let decks2: Deck = {player: "Stamm", commander: "Alexi", w:false, u: true, b: false, r: false, g: false, strategy:["Control"], power: 4};
	let decks3: Deck = {player: "Stamm", commander: "Koll", w:true, u: false, b: false, r: true, g: false, strategy:["Equipment"], power: 4};
	let decks4: Deck = {player: "Stamm", commander: "Magar", w:false, u: false, b: true, r: true, g: false, strategy:["Spell Recursion"], power: 5};
	let decks5: Deck = {player: "Stamm", commander: "Myra", w:false, u: true, b: false, r: true, g: false, strategy:["Artifacts", "Spell Slinger"], power: 5};
	let decks6: Deck = {player: "Stamm", commander: "Juri", w:false, u: false, b: true, r: true, g: false, strategy:["Voltron"], power: 5};
	let decko1: Deck = {player: "Olivier", commander: "Kamiz", w:true, u: true, b: true, r: false, g: false, strategy:["Reanimator"], power: 7};
	let decko2: Deck = {player: "Olivier", commander: "Faldorn", w:false, u: false, b: false, r: true, g: true, strategy:["Exile", "Tokens"], power: 6};
	let decko3: Deck = {player: "Olivier", commander: "Dimir Zombies", w:false, u: true, b: true, r: false, g: false, strategy:["Stompy", "Tokens"], power: 5};
	let decko4: Deck = {player: "Olivier", commander: "Isperia", w:true, u: true, b: false, r: false, g: false, strategy:["Flyers", "Stompy"], power: 5};
	let decko5: Deck = {player: "Olivier", commander: "Atarka", w:false, u: false, b: false, r: true, g: true, strategy:["Flyers", "Stompy"], power: 5};
	let deckm1: Deck = {player: "Mark", commander: "Rafiq", w:true, u: true, b: false, r: false, g: true, strategy:["Voltron"], power: 5};
	let deckm2: Deck = {player: "Mark", commander: "Kresh", w:false, u: true, b: true, r: true, g: true, strategy:["Voltron", "Plus One Counters"], power: 5};

	let fullDeckList: Array<Deck> = [
		decka1,
		decka2,
		decka3,
		decka4,
		decka5,
		decka6,
		decka7,
		deckb1,
		deckb2,
		deckb3,
		deckb4,
		deckb5,
		deckb6,
		deckb7,
		deckb8,
		deckb9,
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
		deckm2	
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
		console.log(selectedPlayerDeckLists);
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
		console.log(players);
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
		
		console.log(selectedLists);
		
		let deckMatchups: Array<Array<Deck>> = [[]];
		for(var i = 0; i < selectedLists.length; i++){
			deckMatchups = cartesian(deckMatchups, selectedLists[i]);
		}
		
		console.log(deckMatchups);
		let updatedMatchups = [...matchups];
		console.log(matchups);
		for(var i = 0; i < deckMatchups.length; i++){
			updatedMatchups.push(new Matchup(deckMatchups[i]));
		}
		setMatchups(updatedMatchups);
		
	};
	
	const submitText = () => {
		return "Generate";
	}
	
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
		<div>
			<ChoosePlayersStep playerPool={playerPool} handlePlayerSelect={handlePlayerSelect}/>
			<br/><hr/><br/>
			<ChooseDecksStep selectedPlayerDeckLists={selectedPlayerDeckLists} handleDeckSelect={handleDeckSelect}/>
			<br/><hr/><br/>
			<button disabled={submitDisabled()} onClick={handleSubmit} /*style for button*/ >{submitText()}</button>
			<br/><br />
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
						<span>{player}</span>
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
			<ul>
			{players.map((name, index) => (
				<DeckSelector key={index} playerName={name} decks={selectedPlayerDeckLists[name]} handleDeckSelect={handleDeckSelect} />
			))}
			</ul>
		</> 
	);
}

function DeckSelector({playerName, decks, handleDeckSelect}){
	return (
	<>
		<li>
			<h3>{playerName}</h3>
			{decks.map((deck, index) => (
				<div key={index}>
					<input type="checkbox" value={index} pname={playerName} onChange={handleDeckSelect}/>
					<span>{deck.commander}</span>
				</div>
			))}
		</li>
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
			<h2>Matchups</h2>
			<div>
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
		<div>
			<span>{matchup.matchupName}</span>
		</div>
	)
}