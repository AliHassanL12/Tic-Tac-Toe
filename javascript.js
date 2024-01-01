
const gameBoard = (function () {
    let array = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];

    function checkForDraw(){
        if (!array[0].includes("-") && !array[1].includes("-") && !array[2].includes("-") && draw == false){
            draw = true;
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

    const hasWon = () => gameBoard.checkForWin(player.getCurrentPlayer());
    const hasDrawn = () => gameBoard.checkForDraw();

    function playRound(getRow, getCol){
        if (isSlotAvailable(getRow, getCol)){
            positionOnBoard(getRow, getCol);
            if (!hasWon()){
                player.switchPlayers();
                displayDOM.displayArray();
            }
            else if (hasWon()){
                displayDOM.displayArray();
                displayDOM.announceWinner();
            }
        }
    }
    return {
        player,
        playRound,
        hasWon,
        hasDrawn
    };
})();

const displayDOM = (function() {
    const container = document.querySelector('.container');
    const startBtn = document.querySelector('.start-game');
    const resetBtn = document.querySelector('.reset-game');

    startBtn.addEventListener("click", displayArray);
    resetBtn.addEventListener("click", resetGame);

    function placeItems(){
        const allCells = document.querySelectorAll('.cell');
        allCells.forEach((element) => {
        element.addEventListener("click", function(){
            game.playRound(element.getAttribute("First"), element.getAttribute("Second"))
        });
        });
    }

    function resetGame(){
        const winner = document.querySelector('.winner');
        gameBoard.array = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];
        displayDOM.displayArray();
        winner.textContent = " ";
    }

    function announceDraw(){
        const winner = document.querySelector('.winner');
        winner.textContent = "No Winner. Draw.";
        displayDOM.displayArray();
    }

    function announceWinner(){
        const winner = document.querySelector(".winner");
        winner.textContent = `${game.player.getCurrentPlayer()} Has Won!`
    }

    function removeDisplay(){
        const allCells = document.querySelectorAll('.cell');
        allCells.forEach((element) => {
            element.remove();
        })
    }

    function displayArray(){
        removeDisplay();
        for (let i=0; i<gameBoard.array.length; i++){
            for(let j=0; j<gameBoard.array.length; j++) {
                const cell = document.createElement('div');
                cell.textContent = gameBoard.array[i][j];
                cell.classList.add('cell');
                cell.setAttribute("First", i);
                cell.setAttribute("Second", j);
                container.appendChild(cell);
            }
        }
        if(!game.hasWon()){
            placeItems();
        }
    }
    return {
        displayArray,
        placeItems,
        announceDraw,
        announceWinner
    }
})();

