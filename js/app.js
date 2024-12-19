// /*-------------------------------- Constants --------------------------------*/

// /*---------------------------- Variables (state) ----------------------------*/

// let board;
// let turn;
// let winner;
// let tie;

// const winningCombos = [
//   [0, 1, 2], // Top row
//   [3, 4, 5], // Middle row
//   [6, 7, 8], // Bottom row
//   [0, 3, 6], // Left column
//   [1, 4, 7], // Middle column
//   [2, 5, 8], // Right column
//   [0, 4, 8], // Diagonal (top-left to bottom-right)
//   [2, 4, 6], // Diagonal (top-right to bottom-left)
// ];

// /*------------------------ Cached Element References ------------------------*/

// const squareEls = document.querySelectorAll(".sqr");
// console.log(squareEls);
// const messageEl = document.querySelector("#message");
// console.log(messageEl);

// /*-------------------------------- Functions --------------------------------*/

// function init() {
//   console.log("colling the function");
//   board = ["", "", "", "", "", "", "", "", ""];
//   turn = "X";
//   winner = false;
//   tie = false;
//   render();
// }

// function render() {
//   updateBoard();
//   updateMessage();
// }

// function updateBoard() {
//   board.forEach((cell, index) => {
//     const square = squareEls[index];
//     square.textContent = cell;

//     if (cell === "X") {
//       square.style.color = "blue"; // Style for X
//     } else if (cell === "O") {
//       square.style.color = "red"; // Style for O
//     } else {
//       square.style.color = "black"; // Default style for empty squares
//     }
//   });
// }

// function updateMessage() {
//   if (winner === false && tie === falsse) {
//     messageEl.textContent = `player ${turn} turn`;
//   } else if (winner === false && tie === true) {
//     messageEl.textContent = "its tie";
//   } else {
//     messageEl.textContent = `player ${turn} wins`;
//   }
// }

// function handleClick(event) {
//   const squareIndex = event.target.id;

//   if (board[squareIndex] !== "" || winner) {
//     return;
//   }

//   placePiece(squareIndex);

//   if (checkWinner()) {
//     winner = true;
//     updateMessage();
//   } else if (checkTie()) {
//     tie = true;
//     updateMessage();
//   } else {
//     turn = turn === "X" ? "O" : "X";
//   }

//   render();
// }

// function placePiece(index) {
//     board[index] = turn;

//     console.log(board);
//   }

// /*----------------------------- Event Listeners -----------------------------*/

// squareEls.forEach((square) => {
//   square.addEventListener("click", handleClick);
// });

//===================

// Step 1: Define the required variables used to track the state of the game
let board = [];
let turn = "X";
let winner = false;
let tie = false;

// Step 2: Store cached element references
const squareEls = document.querySelectorAll(".sqr"); // Assuming the squares have class 'square'
const messageEl = document.getElementById("message"); // Assuming there's an element with id 'message'
const resetBtnEl = document.getElementById("reset"); // Reset button element

// Step 5: Define the required constants
const winningCombos = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6], // Diagonal from top-right to bottom-left
];

// Step 3: Initialize the game state
function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  console.log("Game Initialized");
  render(); // Initial rendering
}

// Step 4: Create the render function
function render() {
  updateBoard(); // Update the board
  updateMessage(); // Update the message
}

// Step 4a: Update the board based on the current game state
function updateBoard() {
  board.forEach((value, index) => {
    const square = squareEls[index];
    square.textContent = value; // Place the X or O in the square
    // You can also add CSS classes to style the squares based on their value
  });
}

// Step 4b: Update the message based on the current game state
function updateMessage() {
  if (winner) {
    messageEl.textContent = `${turn} Wins!`; // Display winner message
  } else if (tie) {
    messageEl.textContent = "It's a Tie!"; // Display tie message
  } else {
    messageEl.textContent = `${turn}'s Turn`; // Display whose turn it is
  }
}

// Step 6: Handle a player clicking a square
function handleClick(event) {
  const squareIndex = event.target.id; // Get the index of the clicked square

  if (board[squareIndex] !== "" || winner) {
    return; // Don't do anything if the square is already taken or if the game is over
  }

  placePiece(squareIndex); // Place the current player's piece
  checkForWinner(); // Check for a winner
  checkForTie(); // Check for a tie
  switchPlayerTurn(); // Switch the turn
  render(); // Re-render the updated game state
}

// Step 6.1: Place the current player's piece
function placePiece(index) {
  board[index] = turn; // Update the board array
  console.log(board); // For testing purposes
}

// Step 6.2: Check for a winner
function checkForWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      console.log("Winner:", board[a]); // For testing purposes
      return;
    }
  }
}

// Step 6.3: Check for a tie
function checkForTie() {
  if (winner) return; // Exit if there's already a winner

  if (!board.includes("")) {
    tie = true;
    console.log("Tie:", tie); // For testing purposes
  }
}

// Step 6.4: Switch the player's turn
function switchPlayerTurn() {
  if (winner) return; // No need to switch turns if there's a winner
  turn = turn === "X" ? "O" : "X"; // Switch turns
  console.log("Turn:", turn); // For testing purposes
}

// Step 7: Create Reset functionality
resetBtnEl.addEventListener("click", init); // Reset the game when the reset button is clicked

// Initialize the game when the page loads
init();

// Step 6.5: Add event listeners to the squares
squareEls.forEach((square, index) => {
  square.addEventListener("click", handleClick); // Attach the handleClick function to each square
});
