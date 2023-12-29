
const gameBoard = (function () {
    let array = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];
    return {
        array
    };
})();

function players() {
    let currentPlayer = "X";

    function switchPlayers() {
        if (currentPlayer == 'X'){
            console.log(`It is now ${currentPlayer}'s turn.`);
            return currentPlayer = 'O';
        }
        else {
            console.log(`It is now ${currentPlayer}'s turn.`);
            return currentPlayer = 'X';
        }
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }
    return {
        switchPlayers,
        getCurrentPlayer
    };
}

function gameFlow() {
    let player = new players();

    const positionOnBoard = (row, col) => gameBoard.array[row][col] = player.getCurrentPlayer(); 

    function playRound(getRow, getCol){
        player.switchPlayers();
        positionOnBoard(getRow, getCol);
        console.log(gameBoard.array);

    }
    console.log(gameBoard.array)
    return {
        playRound
    };
}

const game = gameFlow();
