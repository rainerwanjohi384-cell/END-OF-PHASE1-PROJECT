const cells = document.querySelectorAll("[data-cell]");// select all elements with the data-cell attributes which are the 9 grid cells of the Tic tac toe board.(DOM)
const board = document.getElementById("board");//the container element of the game board.(DOM)
const statusText = document.getElementById("status");// an element where the game messages are shown like player x wins.(DOM)
const resetBtn = document.getElementById("reset");//the rest button element.(DOM)

let currentPlayer = "X";//keep track of the current player, starting with "X".
let gameActive = true;// it is used to block further moves after the game ends.
// All possible winning combinations
const winningCombinations = [//it defines all possible winning combinations in the game.
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];// the numbers represent the index positions of the cells of the cells NodeList.(from 0 to 8).

// Start the game
cells.forEach(cell => {
  cell.addEventListener("click", handleClick, { once: true });//adds a click event listener to each cell, ensuring each cell can only be clicked once per game.
});

resetBtn.addEventListener("click", resetGame);//adds a click event listener to the reset button to restart the game when clicked.

function handleClick(e) {
  const cell = e.target;// it is used to get the specific cell that was clicked.

  if (!gameActive) return;// If the game is over, ignore further clicks

  cell.textContent = currentPlayer;//sets the text content of the clicked cell to the current player's symbol ("X" or "O").

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }//it is used to check for a win after each move and and stops further moves if a player has won.

  if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }// it is used to check for a draw after each move and stops further moves if the game is a draw.

  // Switch turns
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}// it is used to switch the current player and update the status text to indicate whose turn it is next.

function checkWin(player) {
  return winningCombinations.some(combination => { //some method checks if any winning combination is fully occupied by the current player's symbol.
    return combination.every(index => { // every method checks if all cells in a winning combination contain the current player's symbol.
      return cells[index].textContent === player;
    });
  });// it is used to check if the current player has won by checking all possible winning combinations.
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}// it is used to check if all cells are filled and there is no winner, indicating a draw.

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }); // it is used to clear the board and reattach click event listeners to each cell for a new game.

  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}// it is used to reset the game state, including the current player, game status, and status text.
