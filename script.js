const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let gameState = Array(9).fill(null);

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            status.textContent = `Player ${gameState[a]} wins!`;
            board.removeEventListener("click", handleMove);
            return true;
        }
    }

    if (!gameState.includes(null)) {
        status.textContent = "It's a draw!";
        return true;
    }

    return false;
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (!gameState[index]) {
        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add("taken");
        if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function resetGame() {
    gameState.fill(null);
    currentPlayer = "X";
    status.textContent = "Player X's turn";
    board.innerHTML = "";
    createBoard();
}

function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
    }
}

createBoard();