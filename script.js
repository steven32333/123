const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.querySelector('.game-status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫排
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 直排
    [0, 4, 8], [2, 4, 6]             // 斜排
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(cell, index) {
    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
    if (checkWin()) {
        gameStatus.textContent = `玩家 ${currentPlayer} 獲勝！`;
        gameStatus.classList.add('winner');
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        gameStatus.textContent = '遊戲平手！';
        gameStatus.classList.add('draw');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `輪到玩家 ${currentPlayer}`;
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameStatus.textContent = `輪到玩家 ${currentPlayer}`;
    gameStatus.classList.remove('winner', 'draw');
    cells.forEach(cell => {
        cell.textContent = '';
    });
}