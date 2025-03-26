/* script.js */
const board = document.getElementById("board");
const message = document.getElementById("message");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.dataset.value = cell;
        cellElement.textContent = cell;
        cellElement.addEventListener("click", handleMove);
        board.appendChild(cellElement);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] === "" && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        event.target.dataset.value = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        createBoard();
        checkWinner();
        if (currentPlayer === "O") {
            setTimeout(aiMove, 500);
        }
    }
}

function aiMove() {
    let emptyCells = gameBoard.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameBoard[randomIndex] = "O";
        currentPlayer = "X";
        createBoard();
        checkWinner();
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            message.textContent = `${gameBoard[a]} wins!`;
            return true;
        }
    }
    if (!gameBoard.includes("")) {
        message.textContent = "It's a draw!";
        return true;
    }
    return false;
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    message.textContent = "";
    createBoard();
}

createBoard();


function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    message.textContent = "";
    createBoard();
}

createBoard();
