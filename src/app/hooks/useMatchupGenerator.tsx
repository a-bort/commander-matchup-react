
import { useState, useEffect } from 'react'
import getFullDeckList from '../data'
import Deck from '../models/Deck'
import PlayerIndexedDeckList from '../models/PlayerIndexedDeckList'
import Matchup from '../models/Matchup'
import GameSet from '../models/GameSet'

const useMatchupGenerator = () => {
	// ************ STATE ******************
	const [deckListByPlayer, setDeckListByPlayer] = useState<PlayerIndexedDeckList>({});
	const [playerPool, setPlayerPool] = useState<Array<string>>([]);
	const [numberOfGames, setNumberOfGames] = useState<number>(1);
	const [deckListsByPlayer, setDeckListsByPlayer] = useState<PlayerIndexedDeckList>({}); //key: playerName | value: chosenDecks.
	const [selectedDecks, setSelectedDecks] = useState<PlayerIndexedDeckList>({})
	const [matchups, setMatchups] = useState<Array<Matchup>>([]); //List of Matchup objects
	const [gameSets, setGameSets] = useState<Array<GameSet>>([]);//list of ALL game sets
	const [validGameSets, setValidGameSets] = useState<Array<GameSet>>([]);//list of VALID game sets
	const [showingGameSets, setShowingGameSets] = useState(false); //whether UI displays game sets or matchups

	const initializeData = () => {
		let fullDeckList = getFullDeckList();
		let updatedDeckListByPlayer: PlayerIndexedDeckList = {};

		for(var i = 0; i < fullDeckList.length; i++){
			var deck = fullDeckList[i];
			if(!updatedDeckListByPlayer[deck.player]){
				updatedDeckListByPlayer[deck.player] = new Array<Deck>();
			}
			updatedDeckListByPlayer[deck.player].push(deck);
		}
		setDeckListByPlayer(updatedDeckListByPlayer);
		setPlayerPool([...new Set(fullDeckList.map(deck => deck.player))]);
	}

	const handlePlayerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		var updatedDeckListsByPlayer = {...deckListsByPlayer};
		if(event.target && event.target.checked){
			updatedDeckListsByPlayer[event.target.value] = deckListByPlayer[event.target.value];
		} else {
			delete updatedDeckListsByPlayer[event.target.value];
		}
		setDeckListsByPlayer(updatedDeckListsByPlayer);
	};

	const handleGamesSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		let games = +event.target.value;
		setNumberOfGames(games);
	};

	const handleDeckSelect = (deck: Deck, event: React.ChangeEvent<HTMLInputElement>) => {
		let player = deck.player;
		let selected = event.target.checked;

		var updatedSelectedDecks = {...selectedDecks};
		if(!updatedSelectedDecks[deck.player]){
			updatedSelectedDecks[deck.player] = [];
		}

		if(selected){
			updatedSelectedDecks[deck.player].push(deck);
		} else {
			for(var i = 0; i < updatedSelectedDecks[deck.player].length; i++){
				if(updatedSelectedDecks[deck.player][i]._id === deck._id){
					updatedSelectedDecks[deck.player].splice(i, 1);
					break;
				}
			}
		}

		setSelectedDecks(updatedSelectedDecks);
	}

	const readyToGenerate = () => {

		var selectedPlayers = Object.keys(deckListsByPlayer);
		if(selectedPlayers.length < 2){ return false; }

		var chosenDeckPlayers = Object.keys(selectedDecks);
		if(chosenDeckPlayers.length < selectedPlayers.length){ return false; }
		else {
			for (var i = 0; i < chosenDeckPlayers.length; i++){
				if(selectedDecks[chosenDeckPlayers[i]].length === 0){
					return false;
				}
			}
		}
		return true;
	}

	const handleSubmit = () => {

		//generateMatchups();

		let selectedLists: Array<Array<Deck>> = Object.values(selectedDecks);

		let deckMatchups: Array<Array<Deck>> = [[]];
		for(var i = 0; i < selectedLists.length; i++){
			deckMatchups = cartesian(deckMatchups, selectedLists[i]);
		}

		let updatedMatchups: Array<Matchup> = [];

		for(var i = 0; i < deckMatchups.length; i++){
			updatedMatchups.push(new Matchup(deckMatchups[i]));
		}

		updatedMatchups.sort(compareMatchupsColorCoverageThenStratsThenPower);
		setMatchups(updatedMatchups);
		//Generate sets if more than 1 game selected
		if(numberOfGames > 1){
			//generateGameSets();
			let rawGameSets: Array<Array<Matchup>> = [[]];
			for(var i = 0; i < numberOfGames; i++){
				rawGameSets = cartesian(rawGameSets, updatedMatchups);
			}


			let updatedGameSets: Array<GameSet> = [];
			for(var i = 0; i < rawGameSets.length; i++){
				updatedGameSets.push(new GameSet(rawGameSets[i]));
			}
			setGameSets(updatedGameSets);

			let updatedValidGameSets: Array<GameSet> = [];
			for(var i = 0; i < updatedGameSets.length; i++){
				if(checkGameSetValidity(updatedGameSets[i], updatedValidGameSets)){
					updatedValidGameSets.push(updatedGameSets[i]);
				}
			}

			updatedValidGameSets.sort(compareGameSetsColorCoverageThenStratsThenPower);
			setValidGameSets(updatedValidGameSets);
		}
	};

	const checkGameSetValidity = (setToValidate: GameSet, currentValidSets: Array<GameSet>) => {
		//two things to check for validity
		// * if a player is bringing at least as many decks as games, ASSUME that player should have no overlap in decks across gameSets
		// * we're not concerned with order of matchups, therefore a gameset featuring the same matchups in different orders are functionally equivalent.
		// ** if there's a functionally equivalent game set already in play, the game set is not valid

		//first check if there's a functionally equivalent valid set already
		for (var i = 0; i < currentValidSets.length; i++){
			if(currentValidSets[i].hash === setToValidate.hash){
				return false;
			}
		}

		let players: Array<string> = Object.keys(selectedDecks);
		let playersToValidate: Array<string> = [];

		for(var i = 0; i < players.length; i++){
			let deckList: Array<Deck> = selectedDecks[players[i]];
			if(deckList.length >= numberOfGames){ //players bringing fewer decks than the number of games will not need validated
				playersToValidate.push(players[i]);
			}
		}

		//***
		// TO BE DONE - logic for ensuring that, for each player, all selected decks are be played at least once per game set
		//***

		for(var i = 0; i < playersToValidate.length; i++){
			let player: string = playersToValidate[i];
			let decksInSet: Array<string> = []; //array of deck ids
			//console.log(player);
			for(var j = 0; j < setToValidate.matchups.length; j++){
				let matchup = setToValidate.matchups[j];
				//console.log(matchup);
				for(var k = 0; k < matchup.matchupDecks.length; k++){
					let deck = matchup.matchupDecks[k];
					//console.log(deck);
					if(deck.player === player){
						if(decksInSet.includes(deck._id)){
							return false;
						}
						decksInSet.push(deck._id);
						break;
					}
				}
			}
		}

		return true;
	}

	useEffect(() => {
		initializeData();
	}, []);

	return {
		deckListByPlayer,
		playerPool,
		numberOfGames,
		deckListsByPlayer,
		matchups,
		handlePlayerSelect,
		handleGamesSelect,
		handleDeckSelect,
		readyToGenerate,
		handleSubmit,
		validGameSets
	}
}

const cartesian = (set_a: Array<Array<any>>, set_b: Array<any>): Array<Array<any>> => {
	let result: Array<Array<any>> = [];
	for(var i=0; i<set_a.length; i++){
		for(var j=0; j<set_b.length; j++){
			let temp: Array<any> = set_a[i].concat(set_b[j]);
			result.push(temp);
		}
	}
	return result;
}

const compareMatchupsColorCoverageThenStratsThenPower = (m1: Matchup, m2: Matchup): number => {
	//Highest weight to color coverate
	if(m1.colorCoverage.length > m2.colorCoverage.length){
		return -1;
	} else if (m1.colorCoverage.length < m2.colorCoverage.length){
		return 1;
	}
	else {
		//Second weight to strategy overlap (full coverage isn't hard)
		if(m1.strategyOverlap < m2.strategyOverlap){
			return -1;
		} else if(m1.strategyOverlap > m2.strategyOverlap){
			return 1;
		} else {
			//Third weight to power variance, since it's arbitrary
			if(m1.powerVariance < m2.powerVariance){
				return -1;
			} else if(m1.powerVariance > m2.powerVariance){
				return 1;
			}
			return 0;
		}
	}
}

const compareGameSetsColorCoverageThenStratsThenPower = (g1: GameSet, g2: GameSet): number => {
	//Highest weight to color coverate
	if(g1.totalCoverage > g2.totalCoverage){
		return -1;
	} else if (g1.totalCoverage < g2.totalCoverage){
		return 1;
	}
	else {
		//Second weight to strategy overlap (full coverage isn't hard)
		if(g1.totalOverlap < g2.totalOverlap){
			return -1;
		} else if(g1.totalOverlap > g2.totalOverlap){
			return 1;
		} else {
			//Third weight to power variance, since it's arbitrary
			if(g1.totalVariance < g2.totalVariance){
				return -1;
			} else if(g1.totalVariance > g2.totalVariance){
				return 1;
			}
			return 0;
		}
	}
}

export default useMatchupGenerator;
