//'use client'

//IMPORTS
import getFullDeckList from '../data'
import useMatchupGenerator from '../hooks/useMatchupGenerator'
import { useEffect } from 'react'

//COMPONENTS LARGE TO SMALL

function MatchupGenerator() {
	const {
		deckListByPlayer,
		playerPool,
		selectedPlayerDeckLists,
		matchups,
		initializeData,
		handlePlayerSelect,
		handleDeckSelect,
		readyToGenerate,
		handleSubmit
	} = useMatchupGenerator();
	
	//USE EFFECT IN THE FUTURE
	
	useEffect(() => {
		let data = getFullDeckList();
		initializeData(data);
	}, []);
	
	/**
	* BASE COMPONENT
	**/
	
	return (
		<div style={{width:"75%"}}>
			<ChoosePlayersStep playerPool={playerPool} handlePlayerSelect={handlePlayerSelect}/>
			<br/><hr/><br/>
			<ChooseDecksStep selectedPlayerDeckLists={selectedPlayerDeckLists} handleDeckSelect={handleDeckSelect}/>
			<br/>
			<button disabled={!readyToGenerate()} onClick={handleSubmit} /*style for button*/ >Generate</button>
			<br/><br/><hr/><br/>
			<MatchupList matchups={matchups}  />
		</div>
	);
};

export default MatchupGenerator;

/************
*
* CHOOSE players
*
************/

function ChoosePlayersStep({playerPool, handlePlayerSelect}){
	return (
	<>
		<h2>Who&apos;s Playing?</h2>
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