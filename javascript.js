
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

const game = (function() {
    let player = new players();

    const positionOnBoard = (row, col) => gameBoard.array[row][col] = player.getCurrentPlayer(); 

    function availableSlot(getRow, getCol) {
        if (gameBoard.array[getRow][getCol] == '-'){
            return true;
        }
    }

    function checkForWin() {
        for (let i=0; i < gameBoard.array.length-2; i++){
            for(let j=0; j < gameBoard.array.length-2; j++){
                if (gameBoard.array[i][j] == gameBoard.array[i][j+1] && gameBoard.array[i][j+1] == gameBoard.array[i][j+2]){
                    return true; 
                }
            }
        }
    }

    function playRound(getRow, getCol){
        if (availableSlot(getRow, getCol)){
            player.switchPlayers();
            positionOnBoard(getRow, getCol);
            checkForWin();
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
})();

