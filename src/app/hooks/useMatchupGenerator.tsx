
import { useState } from 'react'
import Deck from '../models/Deck'
import PlayerIndexedDeckList from '../models/PlayerIndexedDeckList'
import IMatchup from '../models/IMatchup'
import calculateVariance from '../utils/calculateVariance'
import calculateSD from '../utils/calculateSD'
import commonArrayElements from '../utils/commonArrayElements'

//CAN WE MOVE THIS SOMEWHERE??
class Matchup implements IMatchup {
	matchupDecks: Array<Deck> = [];
	matchupName: string = "";
	w: boolean = false;
	u: boolean = false;
	b: boolean = false;
	r: boolean = false;
	g: boolean = false;
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
		this.powerVariance = +calculateSD(calculateVariance(powers)).toFixed(2);
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

const useMatchupGenerator = () => {
	// ************ STATE ******************
	const [deckListByPlayer, setDeckListByPlayer] = useState<PlayerIndexedDeckList>({});
	const [playerPool, setPlayerPool] = useState<Array<string>>([]);
	const [deckListsByPlayer, setDeckListsByPlayer] = useState<PlayerIndexedDeckList>({}); //key: playerName | value: chosenDecks.
	const [selectedDecks, setSelectedDecks] = useState<PlayerIndexedDeckList>({})
	const [matchups, setMatchups] = useState<Array<Matchup>>([]); //List of Matchup objects
	
	const initializeData = (fullDeckList: Array<Deck>) => {
		if(!fullDeckList) return;
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
	
	const handleDeckSelect = (deck: Deck, event: React.ChangeEvent<HTMLInputElement>) => {
		let player = deck.player;
		//console.log(deck);
		let selected = event.target.checked;
		//console.log(selected);
		
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
		console.log(players);
		//NEED TO FILTER ONLY SELECTED DECKS
		let selectedLists: Array<Array<Deck>> = Object.values(selectedDecks);
		
		console.log(selectedLists);
		let deckMatchups: Array<Array<Deck>> = [[]];
		for(var i = 0; i < selectedLists.length; i++){
			deckMatchups = cartesian(deckMatchups, selectedLists[i]);
		}
		
		console.log(deckMatchups);
		
		let updatedMatchups: Array<Matchup> = [];
		
		for(var i = 0; i < deckMatchups.length; i++){
			updatedMatchups.push(new Matchup(deckMatchups[i]));
		}
		
		updatedMatchups.sort(compareColorCoverageThenStratsThenPower);
		setMatchups(updatedMatchups);
		
	};
	
	return {
		deckListByPlayer,
		playerPool,
		deckListsByPlayer,
		matchups,
		initializeData,
		handlePlayerSelect,
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