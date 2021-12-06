function simulateDay(lanterns: number[]): number[] {
  const newLanterns = [];

  for (let idx in lanterns) {
    if (lanterns[idx] === 0) {
      lanterns[idx] = 6;
      newLanterns.push(8);
    } else {
      lanterns[idx]--;
    }
  }

  return lanterns.concat(newLanterns);
}

const input = await Deno.readTextFile('input/6');
let lanterns = input.split(',').map((el) => parseInt(el));

for (let day = 0; day < 80; day++)
{
  lanterns = simulateDay(lanterns);
}

console.log(lanterns.length);
