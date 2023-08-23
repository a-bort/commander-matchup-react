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

	const [step, setStep] = useState(0);
	const [selectedPlayers, setSelectedPlayers] = useState([]);
	const [selectedDecks, setSelectedDecks] = useState([]);
	
	const maxStep = 1;

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

	let playerPool = [...new Set(fullDeckList.map(deck => deck.player))];
	//console.log(playerPool);
	
	const handlePlayerSelect = (event) => {
		var updatedPlayerList = [...selectedPlayers];
		if(event.target.checked){
			updatedPlayerList = [...selectedPlayers, event.target.value];
		} else {
			updatedPlayerList.splice(updatedPlayerList.indexOf(event.target.value), 1);
		}
		setSelectedPlayers(updatedPlayerList);
	};

	const conditionalComponent = () => {
		switch(step) {
			case 0: 
				return <ChoosePlayersStep playerPool={playerPool} handlePlayerSelect={handlePlayerSelect}/>;
			case 1:
				return <ChooseDecksStep selectedPlayers={selectedPlayers}/>;
			default:
				console.log("ERROR - STEP OUT OF BOUNDS");
				return <ChoosePlayersStep />;
		}
	};
	
	const nextDisabled = () => {
		switch(step){
			case 0:
				return selectedPlayers.length < 2;
			case 1:
				return true;
			default:
				console.log("ERROR: STEP OUT OF BOUNDS");
				return true;
		}
	}
	
	const handleNext = () => {
		if(step < maxStep){
			setStep(step + 1);
		} else {
			setStep(0);
		}
	};
	
	const nextButtonText = () => {
		switch(step){
			case 0:
				return "Next";
			case 1: 
				return "Submit";
			case 2:
				return "Start Over";
		}
	}
	
	const handleBack = () => {
		if(step > 0){
			setStep(step - 1);
		} else {
			setStep(0);
		}
	};
	
	
	return (
		<div /*style for first frame*/>
			{conditionalComponent()}
			{step > 0 && <button onClick={handleBack}>Back</button>}
			<button disabled={nextDisabled()} onClick={handleNext} /*style for button*/ >{nextButtonText()}</button>
		</div>
	);
};

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

function ChooseDecksStep({selectedPlayers}){
	return (
		<>
			<h2>Choose Decks</h2>
			{selectedPlayers.map((item, index) => (
				<div key={index}>{item}</div>
			))}
		</> 
	);
}