const calculateMean = (values: number[]): number => {
  const mean = (values.reduce((sum, current) => sum + current)) / values.length;
  return mean;
}

export default calculateMean;