import IGameSet from './IGameSet'
import Matchup from './Matchup'
import calculateMean from '../utils/calculateMean'

const sha1 = require('sha-1');

class GameSet implements IGameSet {
  hash: string = "";
  matchups: Array<Matchup> = [];
  totalCoverage: number = 0; //PERCENT
	totalVariance: number = 0;
	totalOverlap: number = 0;
  powerAverage: number = 0;

	constructor(matchups: Array<Matchup>) {
		this.matchups = matchups;

    this.generateHash();
    this.generateTotalCoverage();
    this.generateTotalVariance();
    this.generateTotalOverlap();
    this.generatePowerAverage();
	}

  generateHash(){
    let sortedByNames = [...this.matchups].sort((m1: Matchup, m2: Matchup): number => {
      return m1.matchupName.localeCompare(m2.matchupName);
    });

    let fullNameString = "";
    for(var i = 0; i < sortedByNames.length; i++){
      fullNameString += sortedByNames[i].matchupName;
    }

    this.hash = sha1(fullNameString);
  }

  generateTotalCoverage(){
    let coverage: number = 0;
    let maxCoverage = 5 * this.matchups.length;
    for(var i = 0; i < this.matchups.length; i++){
      coverage += this.matchups[i].colorCoverage.length;
    }

    this.totalCoverage = +((coverage / maxCoverage).toFixed(2));
  }

  generateTotalVariance(){
    let variance: number = 0;
    for(var i = 0; i < this.matchups.length; i++){
      variance += this.matchups[i].powerVariance;
    }
    this.totalVariance = +variance.toFixed(2);
  }

  generateTotalOverlap(){
    let overlap: number = 0;
    for(var i = 0; i < this.matchups.length; i++){
      overlap += this.matchups[i].strategyOverlap;
    }
    this.totalOverlap = overlap;
  }

  generatePowerAverage(){
    let powers: Array<number> = [];
		for(var i = 0; i < this.matchups.length; i++){
			powers.push(+this.matchups[i].powerAverage);
		}
		this.powerAverage = +calculateMean(powers).toFixed(2);
  }
}

export default GameSet;
