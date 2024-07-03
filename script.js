// script.js

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameMode = 'two-player';
let difficulty = 'easy';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const statusMessage = document.getElementById('status-message');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const singlePlayerButton = document.getElementById('single-player');
const twoPlayerButton = document.getElementById('two-player');
const selfPlayButton = document.getElementById('self-play');
const difficultySelection = document.getElementById('difficulty-selection');
const easyButton = document.getElementById('easy');
const mediumButton = document.getElementById('medium');
const hardButton = document.getElementById('hard');

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winCondition.forEach(index => {
                document.querySelector(`.cell[data-index='${index}']`).classList.add('celebrate');
            });
            break;
        }
    }

    if (roundWon) {
        statusMessage.innerHTML = `Player ${currentPlayer} has won!`;
        gameActive = false;
        launchConfetti();
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusMessage.innerHTML = `Game ended in a draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.innerHTML = `It's ${currentPlayer}'s turn`;
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

    if (gameActive && (gameMode === 'single-player' || gameMode === 'self-play') && currentPlayer === 'O') {
        setTimeout(handleComputerMove, 500); // Delay for better UX
    }
}

function handleComputerMove() {
    let move;
    switch (difficulty) {
        case 'easy':
            move = getRandomMove();
            break;
        case 'medium':
            move = getBestMove(false);
            break;
        case 'hard':
            move = getBestMove(true);
            break;
    }
    gameState[move] = 'O';
    document.querySelector(`.cell[data-index='${move}']`).innerHTML = 'O';
    handleResultValidation();
    currentPlayer = 'X';
}

function getRandomMove() {
    let availableCells = gameState
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);
        return availableCells[Math.floor(Math.random() * availableCells.length)];
    }
    
    function getBestMove(isHard) {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === '') {
                gameState[i] = 'O';
                let score = minimax(gameState, 0, false, isHard);
                gameState[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }
    
    function minimax(board, depth, isMaximizing, isHard) {
        let result = checkWinner();
        if (result !== null) {
            return scores[result];
        }
    
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    let score = minimax(board, depth + 1, false, isHard);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                    if (!isHard && depth === 0 && Math.random() < 0.5) {
                        break;
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    let score = minimax(board, depth + 1, true, isHard);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }
    
    const scores = {
        X: -1,
        O: 1,
        tie: 0
    };
    
    function checkWinner() {
        let winner = null;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                winner = gameState[a];
            }
        }
    
        if (winner === null && !gameState.includes('')) {
            return 'tie';
        } else {
            return winner;
        }
    }
    
    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusMessage.innerHTML = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('celebrate');
        });
        difficultySelection.classList.add('hidden');
    }
    
    function handleModeChange(mode) {
        gameMode = mode;
        if (mode === 'single-player') {
            difficultySelection.classList.remove('hidden');
        } else {
            difficultySelection.classList.add('hidden');
            handleRestartGame();
        }
    }
    
    function handleDifficultyChange(diff) {
        difficulty = diff;
        handleRestartGame();
    }
    
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
    singlePlayerButton.addEventListener('click', () => handleModeChange('single-player'));
    twoPlayerButton.addEventListener('click', () => handleModeChange('two-player'));
    selfPlayButton.addEventListener('click', () => handleModeChange('self-play'));
    easyButton.addEventListener('click', () => handleDifficultyChange('easy'));
    mediumButton.addEventListener('click', () => handleDifficultyChange('medium'));
    hardButton.addEventListener('click', () => handleDifficultyChange('hard'));
    
    statusMessage.innerHTML = `It's ${currentPlayer}'s turn`;
    
    function launchConfetti() {
        for (let i = 0; i < 100; i++) {
            createConfetti();
        }
    }
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.body.appendChild(confetti);
    
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
   
