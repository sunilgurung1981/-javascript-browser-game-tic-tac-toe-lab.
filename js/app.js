


// Step 1: Define the required variables used to track the state of the game
let board = [];
let turn = "X";
let winner = false;
let tie = false;

// Step 2: Store cached element references
const squareEls = document.querySelectorAll(".sqr"); 
const messageEl = document.getElementById("message"); 
const resetBtnEl = document.getElementById("reset"); 

// Step 5: Define the required constants
const winningCombos = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6], 
];

// Step 3: Initialize the game state
function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  console.log("Game Initialized");
  render(); 
}

// Step 4: Create the render function
function render() {
  updateBoard(); 
  updateMessage(); 
}

// Step 4a: Update the board based on the current game state
function updateBoard() {
  board.forEach((value, index) => {
    const square = squareEls[index];
    square.textContent = value; 
  });
}

// Step 4b: Update the message based on the current game state
function updateMessage() {
  if (winner) {
    messageEl.textContent = `${turn} Wins!`; 
  } else if (tie) {
    messageEl.textContent = "It's a Tie!"; 
  } else {
    messageEl.textContent = `${turn}'s Turn`; 
  }
}

// Step 6: Handle a player clicking a square
function handleClick(event) {
  const squareIndex = event.target.id; 

  if (board[squareIndex] !== "" || winner) {
    return; 
  }

  placePiece(squareIndex); 
  checkForWinner(); 
  checkForTie(); 
  switchPlayerTurn(); 
  render(); 
}

// Step 6.1: Place the current player's piece
function placePiece(index) {
  board[index] = turn; 
  console.log(board); 
}

// Step 6.2: Check for a winner
function checkForWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      console.log("Winner:", board[a]); 
      return;
    }
  }
}

// Step 6.3: Check for a tie
function checkForTie() {
  if (winner) return; 

  if (!board.includes("")) {
    tie = true;
    console.log("Tie:", tie); 
  }
}

// Step 6.4: Switch the player's turn
function switchPlayerTurn() {
  if (winner) return; 
  turn = turn === "X" ? "O" : "X"; 
  console.log("Turn:", turn); 
}

// Step 7: Create Reset functionality
resetBtnEl.addEventListener("click", init); 

// Initialize the game when the page loads
init();

// Step 6.5: Add event listeners to the squares
squareEls.forEach((square, index) => {
  square.addEventListener("click", handleClick);  
});
