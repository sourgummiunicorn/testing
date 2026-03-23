const boardElement = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const statusMessage = document.getElementById('statusMessage');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraws = document.getElementById('scoreDraws');
const resetBoardButton = document.getElementById('resetBoardButton');
const newMatchButton = document.getElementById('newMatchButton');

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let boardState = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let scores = {
  X: 0,
  O: 0,
  draws: 0,
};

function updateStatus(message) {
  statusMessage.textContent = message;
}

function renderScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraws.textContent = scores.draws;
}

function clearWinningHighlight() {
  cells.forEach((cell) => cell.classList.remove('winning-cell'));
}

function resetBoard() {
  boardState = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  clearWinningHighlight();

  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('taken', 'x', 'o');
    cell.disabled = false;
  });

  updateStatus("Player 1's turn (X)");
}

function resetMatch() {
  scores = { X: 0, O: 0, draws: 0 };
  renderScores();
  resetBoard();
}

function endRound(message) {
  gameActive = false;
  updateStatus(message);
  cells.forEach((cell) => {
    if (!cell.textContent) {
      cell.disabled = true;
    }
  });
}

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    const value = boardState[a];

    if (value && value === boardState[b] && value === boardState[c]) {
      combination.forEach((index) => cells[index].classList.add('winning-cell'));
      scores[value] += 1;
      renderScores();
      endRound(value === 'X' ? 'Player 1 wins this round!' : 'Player 2 wins this round!');
      return true;
    }
  }

  if (boardState.every(Boolean)) {
    scores.draws += 1;
    renderScores();
    endRound("It's a draw!");
    return true;
  }

  return false;
}

function handleCellClick(event) {
  const selectedCell = event.currentTarget;
  const selectedIndex = Number(selectedCell.dataset.cellIndex);

  if (!gameActive || boardState[selectedIndex]) {
    return;
  }

  boardState[selectedIndex] = currentPlayer;
  selectedCell.textContent = currentPlayer;
  selectedCell.classList.add('taken', currentPlayer.toLowerCase());
  selectedCell.disabled = true;

  if (checkWinner()) {
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(currentPlayer === 'X' ? "Player 1's turn (X)" : "Player 2's turn (O)");
}

cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
resetBoardButton.addEventListener('click', resetBoard);
newMatchButton.addEventListener('click', resetMatch);

renderScores();
updateStatus("Player 1's turn (X)");
boardElement.setAttribute('data-ready', 'true');
