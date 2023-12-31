
const gameBoard = (function () {
    const array = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];

    function checkForDraw(){
        if (!array[0].includes("-") && !array[1].includes("-") && !array[2].includes("-")){
            console.log("Game Over, No Winners");
            return true;
        }
    }

    function checkForWin(playerMarker) {
        //win if 3 in a row are x or o, 3 in a col are x or o, and 3 in diag are x or o.
        for(let i=0; i <gameBoard.array.length; i++) {
         if ((gameBoard.array[i][0] == playerMarker && gameBoard.array[i][1] == playerMarker && gameBoard.array[i][2] == playerMarker) || 
             (gameBoard.array[0][i] == playerMarker && gameBoard.array[1][i] == playerMarker && gameBoard.array[2][i] == playerMarker) || 
             (gameBoard.array[0][0] == playerMarker && gameBoard.array[1][1] == playerMarker && gameBoard.array[2][2] == playerMarker) ||
             (gameBoard.array[0][2] == playerMarker && gameBoard.array[1][1] == playerMarker && gameBoard.array[2][0] == playerMarker)){
             console.log(`Congrats, ${playerMarker} Wins`);
             return true;
         }
         }
     }
    return {
        array,
        checkForWin,
        checkForDraw
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

    function printNewBoard(){
        console.log(`${player.getCurrentPlayer()}'s Turn`)
        console.log(gameBoard.array);
    }

    function playRound(getRow, getCol){
        if (isSlotAvailable(getRow, getCol)){
            positionOnBoard(getRow, getCol);
            let hasWon = gameBoard.checkForWin(player.getCurrentPlayer());
            let hasDrawn = gameBoard.checkForDraw();
            if (!hasWon || !hasDrawn){
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

const displayDOM = (function() {
    const container = document.querySelector('.container');

    for (let i=0; i<gameBoard.array.length; i++){
        for(let j=0; j<gameBoard.array.length; j++) {
            const cell = document.createElement('div');
            cell.textContent = gameBoard.array[i][j];
            cell.classList.add('cell');
            container.appendChild(cell);
        }
    }
})();

