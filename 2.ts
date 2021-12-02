const input = await Deno.readTextFile('input/2');
const lines = input.split('\n');

let depth = 0;
let horiz = 0;
let aim = 0;

lines.forEach((line) => {
  const tokens = line.split(' ');
  const command = tokens[0];
  const amount = parseInt(tokens[1]);

  switch (command) {
    case 'forward':
      horiz += amount;
      depth += aim * amount;
      break;
    case 'down':
      aim += amount;
      break;
    case 'up':
      aim -= amount;
      break;
    default:
  }
});

const res = depth * horiz;
console.log(res);
