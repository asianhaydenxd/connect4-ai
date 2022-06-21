const width = 7;
const height = 6;

const Slot = {
    Empty: "Empty",
    Player1: "Player1",
    Player2: "Player2",
}

function Game() {
    this.board = new Board();
    this.turn = Slot.Player1;

    this.swapTurn = function() {
        this.turn = this.turn == Slot.Player1 ? Slot.Player2 : Slot.Player1;
    }

    this.drop = function(x) {
        this.board.drop(this.turn, x);
    }
}

function Board() {
    this.array = new Array(height).fill(null).map( () => new Array(width).fill(Slot.Empty) );

    this.put = function(slot, x, y) {
        this.array[y][x] = slot;
    }

    this.get = function(x, y) {
        return this.array[y][x];
    }

    this.drop = function(slot, x) {
        let dropHeight = this.array.length - 1;
        
        while (dropHeight >= 0 && this.get(x, dropHeight) != Slot.Empty) {
            dropHeight--;
        }

        this.put(slot, x, dropHeight);
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
            cell.className = "cell";
            cell.slot = game.board.array[rowNumber][cellNumber]

            row.appendChild(cell);
        }

        board?.appendChild(row);
    }
}

const game = new Game();

console.table(game.board.array);


generateBoard(game, width, height);
