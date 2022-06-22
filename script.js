import { Game } from "./game.js"
import { bestColumn, evaluate } from "./ai.js"

const width = 7;
const height = 6;

const modeToggle = document.getElementById("mode")
modeToggle.ai = true;

modeToggle.onclick = function() {
    this.ai = !this.ai;
    this.innerHTML = this.ai ? "Mode: AI" : "Mode: Multiplayer";
}

function onColumnClick(game, x) {
    game.play(x);
    generateBoard(game, width, height);
    
    if (modeToggle.ai) {
        game.play(bestColumn(game));
        generateBoard(game, width, height);
    }

    if (game.getWinner()) {
        console.log(`Winner: ${game.getWinner()}`);
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

            cell.addEventListener("click", () => onColumnClick(game, cellNumber));

            row.appendChild(cell);
        }

        board?.appendChild(row);
    }
}

const game = new Game(width, height);


generateBoard(game, width, height);
