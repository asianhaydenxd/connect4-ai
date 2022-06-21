const width = 7;
const height = 6;

function generateBoard(width, height) {
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

            row.appendChild(cell);
        }

        board?.appendChild(row);
    }
}

generateBoard(width, height);
