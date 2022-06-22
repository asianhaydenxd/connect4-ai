import { Slot } from "./game.js"

export function bestColumn(game) {
    let [evaluation, move] = minimax(game, 1, false);
    return move;
}

function minimax(game, depth, isMax) {
    if (depth == 0) {
        return [evaluate(game), 404]
    }

    if (isMax) {
        let maxEval = Number.NEGATIVE_INFINITY;
        let newEval, bestMove, _;
        for (let x = 0; x < 7; x++) {
            try {
                [newEval, _] = minimax(game.copy().dropSlot(Slot.Player1, x), depth - 1, false);
                if (newEval > maxEval) {
                    maxEval = newEval;
                    bestMove = x;
                }
            }
            catch (e) {
                if (e instanceof RangeError) {
                    continue;
                } else {
                    throw e;
                }
            }
        }
        return [maxEval, bestMove];
    } else {
        let minEval = Number.POSITIVE_INFINITY;
        let newEval, bestMove, _;
        for (let x = 0; x < 7; x++) {
            try {
                [newEval, _] = minimax(game.copy().dropSlot(Slot.Player2, x), depth - 1, true);
                if (newEval < minEval) {
                    minEval = newEval;
                    bestMove = x;
                }
            }
            catch (e) {
                if (e instanceof RangeError) {
                    continue;
                } else {
                    throw e;
                }
            }
        }
        return [minEval, bestMove];
    }
}

export function evaluate(game) {
    // TODO: make possible wins with pre-filled slots more valuable
    // TODO: account for vertical wins
    let score = 0;

    for (const player of [Slot.Player1, Slot.Player2]) {
        for (let x = 0; x + 4 < 8; x++) {
            const gameSim = game.copy();
            for (let slot = 0; slot < 4; slot++) {
                try { gameSim.board.drop(player, x + slot); } catch (RangeError) {}
            }

            if (gameSim.getWinner()) {
                if (player == Slot.Player1) {
                    score += 1;
                }
                if (player == Slot.Player2) {
                    score -= 1;
                }
            }
        }
    }

    return score;
}
