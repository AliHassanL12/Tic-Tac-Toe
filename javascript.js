
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

    function checkForWin() {
        for (let i=0; i < gameBoard.array.length-2; i++){
            for(let j=0; j < gameBoard.array.length-2; j++){
                if (gameBoard.array[i][j] == gameBoard.array[i][j+1] && gameBoard.array[i][j+1] == gameBoard.array[i][j+2]){
                    console.log(`${player.getCurrentPlayer()} Wins`)
                    return true; 
                }
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
        }
        else if (!isSlotAvailable(getRow, getCol)) {
            console.log("Cannot Position here, it is already taken.")
        }
        checkForWin();
        if (!checkForWin()){
            player.switchPlayers();
            printNewBoard();
        }
    }
    printNewBoard();
    return {
        playRound
    };
})();

