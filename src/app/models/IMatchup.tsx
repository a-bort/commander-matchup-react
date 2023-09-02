import Deck from './Deck'

interface IMatchup {
	matchupDecks: Array<Deck>;
	matchupName: string;
	w: boolean;
	u: boolean;
	b: boolean;
	r: boolean;
	g: boolean;
	colorCoverage: string;
	powerVariance: number;
	strategyOverlap: number;
}

export default IMatchup;