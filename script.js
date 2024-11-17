const board = document.getElementById("board");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

let cells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

function createBoard() {
    board.innerHTML = "";
    cells.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        board.appendChild(cellElement);
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }

    return cells.includes("") ? null : "draw";
}

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (!cells[index] && isGameActive) {
        cells[index] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        const winner = checkWinner();
        if (winner) {
            isGameActive = false;
            statusElement.textContent = winner === "draw" ? "draw!" : `The Winner: ${winner}`;
        } else {
            statusElement.textContent = ` ${currentPlayer}`;
        }
        createBoard();
    }
}

function resetGame() {
    cells = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusElement.textContent = ` ${currentPlayer}`;
    createBoard();
}

board.addEventListener("click", handleCellClick);
resetButton.addEventListener("click", resetGame);

createBoard();
statusElement.textContent = `${currentPlayer}`;
