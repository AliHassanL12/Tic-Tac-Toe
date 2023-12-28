
const gameBoard = (function () {
    let array = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];
    return {
        array
    };
})();

function players() {
    const player1 = "X";
    const player2 = "O";
    return {
        player1,
        player2
    };
}

function gameFlow() {
    let winner = false;
    let getRow; 
    let getColumn;
    function playTurn(getCurrentPlayer){
        getRow = prompt("Pick Number 1-3");
        getColumn = prompt("Pick Number 1-3");
        gameBoard.array[getRow-1][getColumn-1] = getCurrentPlayer;
    }
    return {
        playTurn
    };
}

const game = gameFlow();
const player = players();

game.playTurn(player.player1);
game.playTurn(player.player2);
console.log(gameBoard.array)