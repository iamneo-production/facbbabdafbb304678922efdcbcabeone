// Variables to keep track of the current player (X or O) and whether the game is over.
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameWon = false;

// Function to handle a player's move.
function makeMove(button) {
    const index = parseInt(button.id);
    
    // Check if the cell is empty and the game is not over.
    if (!gameBoard[index] && !gameWon) {
        gameBoard[index] = currentPlayer;
        button.innerText = currentPlayer;
        
        // Check for a win after every move.
        if (checkWin()) {
            document.getElementById('result').innerText = `Player ${currentPlayer} wins!`;
            gameWon = true;
        } else if (!gameBoard.includes('')) {
            document.getElementById('result').innerText = "It's a draw!";
            gameWon = true;
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            document.getElementById('result').innerText = `Player ${currentPlayer}'s Turn`;
        }
    }
}

// Function to check for a win.
function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];
    
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    
    return false;
}

// Function to reset the game.
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameWon = false;
    currentPlayer = 'X';
    document.querySelectorAll('.btn').forEach(button => {
        button.innerText = '';
        button.disabled = false;
    });
    document.getElementById('result').innerText = `Player ${currentPlayer}'s Turn`;
}

// Add event listeners to buttons.
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        makeMove(this);
        this.disabled = true;
    });
});

// Initialize the game.
document.getElementById('result').innerText = `Player ${currentPlayer}'s Turn`;
