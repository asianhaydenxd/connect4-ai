import { Slot } from "./game.js"

export function bestColumn(game) {
    
}

function evaluate(game) {
    // TODO: make possible wins with pre-filled slots more valuable
    // TODO: account for vertical wins
    let score = 0;

    for (player of [Slot.Player1, Slot.Player2]) {
        for (let x = 0; x + 4 < board.array.length[0]; x++) {
            const gameSim = game.copy();
            for (let slot = 0; slot < 4; slot++) {
                try { gameSim.drop(player, slot); } catch (RangeError) {}
            }
        }

        if (game.getWinner()) {
            if (player == Slot.Player1) {
                score += 1;
            }
            if (player == Slot.Player2) {
                score += 2;
            }
        }
    }

    return score;
}
