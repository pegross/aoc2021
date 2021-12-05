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

for (const pipe of pipes) {
  const source = pipe[0].split(',').map((el) => parseInt(el));
  const target = pipe[1].split(',').map((el) => parseInt(el));

  const sourceX = source[0];
  const sourceY = source[1];
  const targetX = target[0];
  const targetY = target[1];

  // vertical lines
  if (sourceX === targetX) {
    let from = Math.min(sourceY, targetY);
    let to = Math.max(sourceY, targetY);

    for (from; from <= to; from++) {
      if (!vents.rows[from]) {
        vents.rows[from] = {
          tiles: [],
        }
      }

      if (!vents.rows[from].tiles[sourceX]) {
        vents.rows[from].tiles[sourceX] = {
          visited: 0,
        }
      }

      vents.rows[from].tiles[sourceX].visited++;
    }
  }

  // horizontal lines
  if (sourceY === targetY) {
    let from = Math.min(sourceX, targetX);
    let to = Math.max(sourceX, targetX);

    if (!vents.rows[sourceY]) {
      vents.rows[sourceY] = {
        tiles: [],
      }
    }

    for (from; from <= to; from++) {
      if (!vents.rows[sourceY].tiles[from]) {
        vents.rows[sourceY].tiles[from] = {
          visited: 0,
        }
      }

      vents.rows[sourceY].tiles[from].visited++;
    }
  }
}

let overlaps = 0;
for (const row of vents.rows) {
  if (!row?.tiles) continue;
  for (const tile of row.tiles) {
    if (tile && tile.visited > 1) {
      overlaps++;
    }
  }
}

console.log(overlaps);
