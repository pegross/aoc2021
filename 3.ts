function bitsAverage(lines: string[]) {
  const positions: number[] = [];
  lines.forEach((line: string) => {
    line.trim().split('').forEach((char, idx) => {
      if (positions[idx] === undefined) {
        positions[idx] = 0;
      }
      positions[idx] += parseInt(char);
    });
  });

  return positions.map((position: number) => {
    return position / lines.length;
  });
}

function getMostCommonBitFromAverage(avg: number): number {
  return +(avg > 0.5);
}

function getPowerConsumption(lines: string[]): number {

  const gammaBits: number[] = [];

  bitsAverage(lines).forEach((avg: number) => {
    gammaBits.push(getMostCommonBitFromAverage(avg));
  });

  const gamma = parseInt(gammaBits.join(''), 2);
  const epsilon = parseInt(gammaBits.map((bit) => +!bit).join(''), 2);

  return gamma * epsilon;
}

function getLifeSupportRating(lines: string[]): number {
  const oxygenRating = 0;
  const co2rating = 0;
  return oxygenRating * co2rating;
}

const input = await Deno.readTextFile('input/3');
const lines = input.split('\n');

console.log('power consumption', getPowerConsumption(lines));
