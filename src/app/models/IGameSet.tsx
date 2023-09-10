import Matchup from './Matchup'

interface IGameSet {
	matchups: Array<Matchup>;
	totalCoverage: number; //PERCENT
	totalVariance: number;
	totalOverlap: number;
}

export default IGameSet;
