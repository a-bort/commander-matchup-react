import calculateMean from './calculateMean'

const calculateVariance = (values: number[]): number => {
  const average = calculateMean(values);
  const squareDiffs = values.map((value: number): number => {
	const diff = value - average;
	return diff * diff;
  })

  const variance = calculateMean(squareDiffs);
  return variance;
}

export default calculateVariance;