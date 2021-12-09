type Entry = {
  signals: string[];
  output: string[],
}

const input = await Deno.readTextFile('input/8');
const lines = input.trim().split('\n');
const entries: Entry[] = [];

// parse entries
for (const line of lines) {
  const parts = line.split('|').map((part) => {
    return part.split(' ').map((part) => part.trim()).filter((part) => part.length);
  });

  const signals: string[] = parts[0];
  const output: string[] = parts[1];

  entries.push({
    signals,
    output,
  });
}

// part a
const allowedLengths = [2, 4, 3, 7];
let sum = 0;
for (const entry of entries) {
  sum += entry.output.reduce((acc, out) => {
    return allowedLengths.includes(out.length) ? acc + 1 : acc;
  }, 0)
}

console.log(sum);
