const width = 7;
const height = 6;

const Slot = {
    Empty: "Empty",
    Player1: "Player1",
    Player2: "Player2",
}

function Game(width, height) {
    this.board = new Board(width, height);
    this.turn = Slot.Player1;

    this.swapTurn = function() {
        this.turn = this.turn == Slot.Player1 ? Slot.Player2 : Slot.Player1;
    }

    this.drop = function(x) {
        this.board.drop(this.turn, x);
    }
}

function Board(width, height) {
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

        if (dropHeight < 0) {
            throw RangeError(`Cannot find room in column ${x} to stack slot ${slot}`);
        }

        this.put(slot, x, dropHeight);
    }
}

function onColumnClick(game, x) {
    game.drop(x);
    game.swapTurn();
    generateBoard(game, width, height);
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

            cell.addEventListener("click", () => onColumnClick(game, cellNumber));

            row.appendChild(cell);
        }

        board?.appendChild(row);
    }
}

const game = new Game(width, height);

console.table(game.board.array);


generateBoard(game, width, height);
