  const boardSize = 20;
  let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));
  let currentPlayer = 'X';
  let gameWon = false;

  const boardElement = document.getElementById('board');
  const messageElement = document.getElementById('message');

  function initializeBoard() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));
    gameWon = false;

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
      }
    }
  }

  initializeBoard();

  function handleCellClick(event) {
    if (gameWon) return;

    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (board[row][col] === '') {
      board[row][col] = currentPlayer;
      event.target.textContent = currentPlayer;

      if (checkWin(row, col)) {
        gameWon = true;
        messageElement.textContent = `Hráč ${currentPlayer} vyhrál!`;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  function checkWin(row, col) {
    return (
      checkDirection(row, col, 0, 1) || // horizontálně
      checkDirection(row, col, 1, 0) || // vertikálně
      checkDirection(row, col, 1, 1) || // diagonálně \
      checkDirection(row, col, 1, -1)   // diagonálně /
    );
  }

  function checkDirection(row, col, rowDir, colDir) {
    const player = board[row][col];
    let count = 1;

    for (let i = 1; i < 5; i++) {
      const newRow = row + i * rowDir;
      const newCol = col + i * colDir;

      if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize) {
        break;
      }

      if (board[newRow][newCol] === player) {
        count++;
      } else {
        break;
      }
    }

    for (let i = 1; i < 5; i++) {
      const newRow = row - i * rowDir;
      const newCol = col - i * colDir;

      if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize) {
        break;
      }

      if (board[newRow][newCol] === player) {
        count++;
      } else {
        break;
      }
    }

    return count >= 5;
  }

  function resetGame() {
    boardElement.innerHTML = '';
    messageElement.textContent = '';
    currentPlayer = 'X';
    initializeBoard();
  }