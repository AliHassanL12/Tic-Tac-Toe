
const gameBoard = (function () {
    let array = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];
    return {
        array
    };
})();

function players() {
    let currentPlayer = 'O';

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

    function availableSlot(getRow, getCol) {
        if (gameBoard.array[getRow][getCol] == '-'){
            return true;
        }
    }

    function playRound(getRow, getCol){
        if (availableSlot(getRow, getCol)){
            player.switchPlayers();
            positionOnBoard(getRow, getCol);
        }
        else {
            console.log("Cannot Position here, it is already taken.")
        }
        console.log(gameBoard.array);

    }
    console.log(gameBoard.array)
    return {
        playRound
    };
}

const game = gameFlow();
