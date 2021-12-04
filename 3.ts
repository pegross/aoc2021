function bitsAverage(lines: string[]): number[] {
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
  return +(avg >= 0.5);
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

function getRating(lines: string[], searchLeastCommon = false, index: number = 0): string {
  // could be simplified, we just care about the bit average at current index
  const averages = bitsAverage(lines);
  const filtered = lines.filter((line) => {
    const hasMostCommonBitAtIndex = parseInt(line[index]) === getMostCommonBitFromAverage(averages[index]);
    return searchLeastCommon ? !hasMostCommonBitAtIndex : hasMostCommonBitAtIndex;
  });

  if (filtered.length == 1) {
    return filtered[0];
  }

  return getRating(filtered, searchLeastCommon, index + 1);
}

function getLifeSupportRating(lines: string[]): number {
  const oxygenRating = getRating(lines);
  const co2rating = getRating(lines, true);
  return parseInt(oxygenRating, 2) * parseInt(co2rating, 2);
}

const input = await Deno.readTextFile('input/3');
const lines = input.split('\n').filter((line) => line.length);

console.log('power consumption', getPowerConsumption(lines));
console.log('life support rating', getLifeSupportRating(lines));
