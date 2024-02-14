// Player is a factory function that creates player objects
const player = (name, symbol, color) => {
    const makeMove = (board, index) => {
      return board.makeMove(index, symbol);
    };
  
    return {
      name,
      symbol,
      color,
      makeMove
    };
  };

// GameBoard is a factory function in an IIFE that stores the array named gameboard and 
// returns its properties allowing it to interact with the rest of the program
// has a built in property that drops a player marker into one of its 
// array parameters are which player and marker
const gameboard = (() => {
    let board = Array(9).fill(null);
  
    const getBoard = () => [...board];
  
    const makeMove = (index, symbol) => {
      if (index >= 0 && index < 9 && !board[index]) {
        board[index] = symbol;
        return true; // move done
      }
      return false; // move taken
    };
  
    const isBoardFull = () => board.every(cell => cell !== null);
  
    const checkWinner = () => {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]             // Diagonal
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a]; // Return the winning symbol
        }
      }
  
      return null; // No winner yet
    };
  
    const resetBoard = () => {
      board = Array(9).fill(null);
    };
  
    return {
      getBoard,
      makeMove,
      isBoardFull,
      checkWinner,
      resetBoard
    };
  })();


// GameController is a IIFE that controls the flow of the game and is run right away
// has functions that switches player turns, check won status, play round
// playRound function takes in array index and places a player marker onto board
const gameController = (() => {
  let currentPlayer = null;

  const startGame = (playerX, playerO) => {
    // Initialize game state
    currentPlayer = playerX;
    gameboard.resetBoard();
  };

  const placeMarker = (index) => {
    const moveResult = currentPlayer.makeMove(gameboard, index);

    if (moveResult) {
      const clickedBox = document.getElementById(`box-${index}`);
      clickedBox.style.backgroundColor = currentPlayer.color;
      // Check for a winner or switch to the other player
      const winner = gameboard.checkWinner();
      if (winner) {
        console.log(`Player ${winner} wins!`);
        gameboard.resetBoard();
      } else if (gameboard.isBoardFull()) {
        turn.innerHTML = "Its a tie!"
      } else {
        // Switch to the other player
        let turn = document.getElementById('turn');
        turn.innerHTML = `${currentPlayer.name} turn`
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
      }
    } else {
      turn.innerHTML = "Invalid move";
    }
  };

  return {
    startGame,
    placeMarker
  };
})();

// Create two players
const playerX = player("Player X", "X", "red");
const playerO = player("Player O", "O", "blue");

// Start the game
gameController.startGame(playerX, playerO);

// Set up click event listeners for each square
const allSquares = Array.from(document.querySelectorAll(".grid-item"));

allSquares.forEach((element, index) => {
  element.addEventListener("click", function () {
    gameController.placeMarker(index);
  });
});
// store DOM logic and display in a object
// render content of gameboard array to the webpage
// write functions that allow players to add marks to a spot on the board
// allow name input, restart game and show game results
/* 
const allSquares = Array.from(document.querySelectorAll(".grid-item"));


allSquares.forEach(element => element.addEventListener("click", function  () {
    console.log("you clicked " + this.textContent);
}));
 */