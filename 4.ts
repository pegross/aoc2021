type Board = {
  didWin: boolean;
  rows: Row[];
}

type Row = {
  fields: Field[];
}

type Field = {
  number: number;
  checked: boolean;
}

function parseBoards(rng: number[]) {
  const boards: Board[] = [];
  for (let i = 0; i <= rng.length;) {
    const board: Board = {
      didWin: false,
      rows: [],
    };

    for (let y = 0; y <= 4; y++) {
      const row: Row = {
        fields: [],
      };

      for (let x = 0; x <= 4; x++) {
        const field = {
          number: rng[i],
          checked: false
        };
        row.fields.push(field);
        i++;
      }
      board.rows.push(row);
    }

    boards.push(board);
  }
  return boards;
}

function checkWin(board: Board): boolean {
  let win = false;

  // check horizontal
  for (const row of board.rows) {
    win = true;
    for (const field of row.fields) {
      if (!win) break;
      win = win && field.checked;
    }

    if (win) return win;
  }

  // check vertical
  for (let i = 0; i < board.rows.length; i++) {
    win = true;
    for (const row of board.rows) {
      const field = row.fields[i];
      if (!field || !win) {
        win = false;
        break;
      }
      win = win && field.checked;
    }
    if (win) return win;
  }

  return false;
}

function calculateBoardScore(board: Board) {
  let score = 0;
  for (const row of board.rows) {
    for (const field of row.fields) {
      if (!field.checked) score+= field.number;
    }
  }

  return score;
}

function runBingo(boards: Board[], rng: number[]): void {
  const winBoards = [];

  for (const number of rng) {
    console.log('draw: ', number);

    for (const board of boards) {
      if (board.didWin) continue;
      for (const row of board.rows) {
        for (const field of row.fields) {
          if (field.number === number) {
            field.checked = true;
            if (checkWin(board)) {
              board.didWin = true;
              winBoards.push(calculateBoardScore(board) * number);
            }
          }
        }
      }
    }
  }

  console.log('first winner: ', winBoards[0] ?? 'none');
  console.log('last winner: ', winBoards[winBoards.length - 1] ?? 'none');
}


let input = await Deno.readTextFile('input/4');
const drawRngLine = input.split('\n')[0];
input = input.replace(drawRngLine, '');
const drawRng = drawRngLine.split(',').map((el) => parseInt(el));

const boardRng = input.match(/[\d ]{2}\s/g)?.map((el) => parseInt(el.trim())) ?? [];
const boards = parseBoards(boardRng);
runBingo(boards, drawRng);
