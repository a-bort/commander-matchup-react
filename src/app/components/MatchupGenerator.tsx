'use client'

//IMPORTS
import useMatchupGenerator from '../hooks/useMatchupGenerator'
import Deck from '../models/Deck'
import PlayerIndexedDeckList from '../models/PlayerIndexedDeckList'
import IMatchup from '../models/IMatchup'

//COMPONENTS LARGE TO SMALL

function MatchupGenerator() {
	const {
		deckListByPlayer,
		playerPool,
		numberOfGames,
		deckListsByPlayer,
		matchups,
		handlePlayerSelect,
		handleGamesSelect,
		handleDeckSelect,
		readyToGenerate,
		handleSubmit
	} = useMatchupGenerator();
	
	/**
	* BASE COMPONENT
	**/
	
	return (
		<div style={{minWidth:"65vw"}}>
			<ChoosePlayersStep playerPool={playerPool} handlePlayerSelect={handlePlayerSelect}/>
			<br/><hr/><br/>
			<ChooseGamesStep numberOfGames={numberOfGames} handleGamesSelect={handleGamesSelect} />
			<br/><hr/><br/>
			<ChooseDecksStep deckListsByPlayer={deckListsByPlayer} handleDeckSelect={handleDeckSelect}/>
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

interface ChoosePlayersStepProps {
	playerPool: Array<string>,
	handlePlayerSelect: React.ChangeEventHandler<HTMLInputElement>
}

function ChoosePlayersStep({playerPool, handlePlayerSelect}: ChoosePlayersStepProps){
	return (
	<>
		<h2>Who&apos;s Playing?</h2>
		<PlayerSelect playerPool={playerPool} handlePlayerSelect={handlePlayerSelect} />
	</> );
}

//--------------

interface ChooseGamesStepProps {
	numberOfGames: number,
	handleGamesSelect: React.ChangeEventHandler<HTMLInputElement>
}

function ChooseGamesStep({numberOfGames, handleGamesSelect}: ChooseGamesStepProps){
	return (
	<>
		<h3>How many games?</h3>
		<input type="number" min="1" max="6" value={numberOfGames} onChange={handleGamesSelect}/>
	</> );
}

//--------------

interface PlayerSelectProps {
	playerPool: Array<string>,
	handlePlayerSelect: React.ChangeEventHandler<HTMLInputElement>
}

function PlayerSelect({playerPool, handlePlayerSelect}: PlayerSelectProps){
	return (
		<div className="checkList">
			<div className="list-container">
				{playerPool.map((player: string, index: number) => (
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

interface ChooseDecksStepProps {
	deckListsByPlayer: PlayerIndexedDeckList,
	handleDeckSelect: (deck: Deck, event: React.ChangeEvent<HTMLInputElement>) => void
}

function ChooseDecksStep({deckListsByPlayer, handleDeckSelect}: ChooseDecksStepProps){
	let players = Object.keys(deckListsByPlayer);
	return (
		<>
			<h2>Choose Decks</h2>
			<div style={{display:"flex", marginTop:"10px"}}>
				{players.map((name: string, index: number) => (
					<DeckSelector key={index} playerName={name} decks={deckListsByPlayer[name]} handleDeckSelect={handleDeckSelect} />
				))}
			</div>
		</> 
	);
}

interface DeckSelectorProps {
	playerName: string,
	decks: Array<Deck>,
	handleDeckSelect: (deck: Deck, event: React.ChangeEvent<HTMLInputElement>) => void
}

function DeckSelector({playerName, decks, handleDeckSelect}: DeckSelectorProps){
	return (
	<>
		<span style={{marginRight: "auto"}}>
			<h3>{playerName}</h3>
			{decks.map((deck: Deck, index: number) => (
				<div key={index}>
					<input type="checkbox" value={index} onChange={e => handleDeckSelect(deck, e)}/>
					<span style={{marginLeft:"5px"}}>
						{deck.commander}
					</span>
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

interface MatchupListProps {
	matchups: Array<IMatchup>
}

function MatchupList({matchups}: MatchupListProps){
	return (
		<>
			<h2 style={{display: matchups.length ? "" : "none"}}>Matchups</h2>
			<div style={{marginTop: "10px"}}>
				{matchups.map((matchup, index: number) => (
					<div key={index}>
						<MatchupListItem matchup={matchup}/>
					</div>			
				))}
			</div>
		</>
	);
}

interface MatchupListItemProps {
	matchup: IMatchup
}

function MatchupListItem({matchup}: MatchupListItemProps){
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

interface ManaSetProps {
	matchup: IMatchup
}

function ManaSet({matchup}: ManaSetProps){
	let letters = matchup.colorCoverage.split("");
	return (
		<>
		{letters.map((letter: string, index: number) => (
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

interface ManaSymbolProps {
	letter: string;
}

function ManaSymbol({letter} : ManaSymbolProps){
	let imageUrl = getManaSymbolImageUrl(letter);
	
	return(
		<>
		<div style={{backgroundImage:imageUrl, width:"var(--mana-symbol-width)", height:"var(--mana-symbol-height)", display: "inline-block", margin: "1px, 1px, -1px, 1px", borderRadius: "500px", boxShadow: "-1px, 1px, 0, rgba(0,0,0,0.85)", textIndent: "-999em", overflow:"hidden", backgroundSize: "100% 100%", backgroundPosition: "top left"}}>
			{letter}
		</div>
		</>
	)
}