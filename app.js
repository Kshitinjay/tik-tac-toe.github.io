const statusDisplay = document.querySelector(".game--status");

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""]; //setting all block empty

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Match Draw`;
const currentPlayerTurn = () => `It's ${currentPlayer} turn`;

statusDisplay.innerHTML = currentPlayerTurn();

//updating gameSate array and cell to current player
function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;

  clickedCell.innerHTML = currentPlayer;
}

//all the winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


//function to check result after every click
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    //checking every winning conditions
    const condition = winningConditions[i];
    let a = gameState[condition[0]];
    let b = gameState[condition[1]];
    let c = gameState[condition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  //If user wins
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage(); //changing the game status text
    gameActive = false; //now game is not active to play
    return;
  }
  //If match draw
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  handlePlayerChange(); //if none conditions true player is changed
}

//function to change the player
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
  }

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;

  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  // If everything is fine
  //change the state of cell
  //check if somebody won after that click
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

//resetting the whole game
function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

//setting eventListener on each cell
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));

//setting eventListener to reset the game
document
  .querySelector(".game-restart")
  .addEventListener("click", handleRestartGame);
