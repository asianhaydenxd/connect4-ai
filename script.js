const width = 7;
const height = 6;

const Slot = {
    Empty: "Empty",
    Player1: "Player1",
    Player2: "Player2",
}

function Game() {
    this.board = new Array(height).fill(null).map( () => new Array(width).fill(Slot.Empty) );
    this.put = function(slot, x, y) {
        this.board[y][x] = slot;
    }
}

function generateBoard(game, width, height) {
    const board = document.getElementById("board");

    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    for (let rowNumber = 0; rowNumber < height; rowNumber++) {
        const row = document.createElement("div");
        row.className = "row";

        for (let cellNumber = 0; cellNumber < width; cellNumber++) {
            const cell = document.createElement("div");
            cell.className = 'cell';
            cell.slot = game.board[rowNumber][cellNumber]

            row.appendChild(cell);
        }

        board?.appendChild(row);
    }
}

const game = new Game();

game.put(Slot.Player1, 0, 5); // Place a red piece at coords (0, 5)
console.table(game.board);


generateBoard(game, width, height);
