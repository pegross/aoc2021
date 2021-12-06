type VentMap = {
  rows: Row[];
}

type Row = {
  tiles: Tile[];
}

type Tile = {
  visited: number;
}

const input = await Deno.readTextFile('input/5');
const lines = input.split('\n')
const pipes = lines.map((line) => {
  return line.split('->').map((el) => el.trim()).filter((el) => el.length);
}).filter((el) => el.length);

const vents: VentMap = {
  rows: [],
};

let maxX = 0;
let maxY = 0;

for (const pipe of pipes) {
  const source = pipe[0].split(',').map((el) => parseInt(el));
  const target = pipe[1].split(',').map((el) => parseInt(el));

  const sourceX = source[0];
  const sourceY = source[1];
  const targetX = target[0];
  const targetY = target[1];

  maxX = Math.max(maxX, sourceX, targetX);
  maxY = Math.max(maxY, sourceY, targetY);
}

for (let y = 0; y <= maxY; y++) {
  vents.rows[y] = {
    tiles: [],
  }
}

for (let x = 0; x <= maxX; x++) {
  for (let y = 0; y <= maxY; y++) {
    vents.rows[y].tiles[x] = {
      visited: 0,
    }
  }
}

for (const pipe of pipes) {
  const source = pipe[0].split(',').map((el) => parseInt(el));
  const target = pipe[1].split(',').map((el) => parseInt(el));

  let sourceX = source[0];
  let sourceY = source[1];
  const targetX = target[0];
  const targetY = target[1];

  // diagonal lines (45 degrees)
  if (Math.abs(sourceX - targetX) === Math.abs(sourceY - targetY)) {
    let delta = Math.abs(targetX - sourceX);
    let modX = targetX >= sourceX ? 1 : -1;
    let modY = targetY >= sourceY ? 1 : -1;

    for (let i = delta; delta >= 0; delta--) {
      vents.rows[sourceY].tiles[sourceX].visited++;
      sourceX += modX;
      sourceY += modY;
    }
  }

  // vertical lines
  if (sourceX === targetX) {
    let from = Math.min(sourceY, targetY);
    let to = Math.max(sourceY, targetY);

    for (from; from <= to; from++) {
      vents.rows[from].tiles[sourceX].visited++;
    }
  }

  // horizontal lines
  if (sourceY === targetY) {
    let from = Math.min(sourceX, targetX);
    let to = Math.max(sourceX, targetX);

    for (from; from <= to; from++) {
      vents.rows[sourceY].tiles[from].visited++;
    }
  }
}

let overlaps = 0;
for (const row of vents.rows) {
  if (!row.tiles) continue;
  for (const tile of row.tiles) {
    if (tile.visited > 1) {
      overlaps++;
    }
  }
}

console.log(overlaps);
