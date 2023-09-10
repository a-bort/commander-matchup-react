
import { useState, useEffect } from 'react'
import getFullDeckList from '../data'
import Deck from '../models/Deck'
import PlayerIndexedDeckList from '../models/PlayerIndexedDeckList'
import Matchup from '../models/Matchup'

const useMatchupGenerator = () => {
	// ************ STATE ******************
	const [deckListByPlayer, setDeckListByPlayer] = useState<PlayerIndexedDeckList>({});
	const [playerPool, setPlayerPool] = useState<Array<string>>([]);
	const [numberOfGames, setNumberOfGames] = useState<number>(1);
	const [deckListsByPlayer, setDeckListsByPlayer] = useState<PlayerIndexedDeckList>({}); //key: playerName | value: chosenDecks.
	const [selectedDecks, setSelectedDecks] = useState<PlayerIndexedDeckList>({})
	const [matchups, setMatchups] = useState<Array<Matchup>>([]); //List of Matchup objects
	
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
		let games = event.target.value;
		console.log(games);
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
		let players: Array<string> = Object.keys(selectedDecks);
		let selectedLists: Array<Array<Deck>> = Object.values(selectedDecks);
		
		let deckMatchups: Array<Array<Deck>> = [[]];
		for(var i = 0; i < selectedLists.length; i++){
			deckMatchups = cartesian(deckMatchups, selectedLists[i]);
		}
		
		let updatedMatchups: Array<Matchup> = [];
		
		for(var i = 0; i < deckMatchups.length; i++){
			updatedMatchups.push(new Matchup(deckMatchups[i]));
		}
		
		updatedMatchups.sort(compareColorCoverageThenStratsThenPower);
		setMatchups(updatedMatchups);
		console.log(updatedMatchups);
	};
	
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
		handleSubmit
	}
}

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

export default useMatchupGenerator;