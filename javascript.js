
const gameBoard = (function () {
    const array = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];
    return {
        array
    };
})();

function players() {
    let currentPlayer = 'X';

    function switchPlayers() {
        if (currentPlayer == 'X'){
            currentPlayer = 'O';
        }
        else {
            currentPlayer = 'X';
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

const game = (function() {
    let player = new players();

    const positionOnBoard = (row, col) => gameBoard.array[row][col] = player.getCurrentPlayer(); 

    function isSlotAvailable(getRow, getCol) {
        if (gameBoard.array[getRow][getCol] == '-'){
            return true;
        }
    }

    function checkForWin(playerMarker) {
       // 3 in a row are x or o, 3 in a col are x or o, and 3 in diag are x or o.
       for(let i=0; i <gameBoard.array.length; i++) {
        if ((gameBoard.array[i][0] == playerMarker && gameBoard.array[i][1] == playerMarker && gameBoard.array[i][2] == playerMarker) || 
            (gameBoard.array[0][i] == playerMarker && gameBoard.array[1][i] == playerMarker && gameBoard.array[2][i] == playerMarker)) {
            console.log(`Congrats, ${player.getCurrentPlayer()} Wins`);
            return true;
        }
        }
    }

    function printNewBoard(){
        console.log(`${player.getCurrentPlayer()}'s Turn`)
        console.log(gameBoard.array);
    }

    function playRound(getRow, getCol){
        if (isSlotAvailable(getRow, getCol)){
            positionOnBoard(getRow, getCol);
            let hasWon = checkForWin(player.getCurrentPlayer());
            if (!hasWon){
                player.switchPlayers();
                printNewBoard();
            }
        }
        else if (!isSlotAvailable(getRow, getCol)) {
            console.log("Cannot Position here, it is already taken.")
        }
    }
    printNewBoard();
    return {
        playRound
    };
})();

