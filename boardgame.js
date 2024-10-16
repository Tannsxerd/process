//chanaphat junpradub s6601012620020 multiplayer hint timer
let cur_player = "P_1";
let match = true;
let click_count = 0;
let ls;  
let devMode = false;  // Developer mode to show answers
// hint positions
let hint_row = " ";
let hint_col = " ";

// scores for each player
let score_P1 = 0;
let score_P2 = 0;

let clickedCells = [];  
let card1 = null;
let card2 = null;
let canClick = true;  
const easy = 2;
const medium = 4;
const hard = 8;
let color_wheel = ['red', 'green', 'blue', 'yellow'];
let color_index = 0;
let frame_count = 0;
let time_elapsed = 0;

function setup() {
  frameRate(60);  // Set frame rate to 60 fps
  console.log(ls);
  createCanvas(windowWidth, windowHeight);
  background(100);
  let cellWidth = width / 4; 
  let cellHeight = height / 5;  
  console.log(cellWidth, cellHeight);
  ls = array2D(medium);  
  console.log(ls);
  
  let button = createButton('click me');
  button.mousePressed(change_color);

  // Button to toggle developer mode
  let devButton = createButton('Toggle Dev Mode');
  devButton.position(20, 60);
  devButton.mousePressed(toggleDevMode);
}

function array2D(mode) {
  let arr = []; 
  let numb = [];  
  for (let num = 1; num < mode * 5 / 4 + 1; num++) {
    numb.push(num, num, num, num);  // Push 4 copies of each number
  }

  for (let row = 0; row < 5; row++) {
    arr[row] = [];  
    for (let col = 0; col < 4; col++) {
      let randValue = random(numb); 
      arr[row][col] = randValue;  
      let index = numb.indexOf(randValue);
      if (index > -1) {
        numb.splice(index, 1);  
      }
    }
  }
  
  return arr;  
}

function mousePressed() {
  if (!canClick) { return; } 

  let clickPosition = getMousePosition();
  let col = int(clickPosition.x / (width / medium));  // 4 columns
  let row = int(clickPosition.y / (height / 5));  // 5 rows

  if (row >= 0 && row < 5 && col >= 0 && col < 4) {
    let cellClicked = { row: row, col: col };

    if (!isCellClicked(cellClicked)) {
      if (card1 === null) {
        card1 = ls[row][col];
        clickedCells.push(cellClicked);
        hint(row, col);
      } else if (card2 === null) {
        card2 = ls[row][col];
        clickedCells.push(cellClicked);
        canClick = false;  
        cur_player = cur_player === "P_1" ? "P_2" : "P_1";
        hint_row = " ";
        hint_col = " ";
        
        setTimeout(checkMatch, 1000);
      }
    }
  }
  console.log(clickedCells);
}

function checkMatch() {
  if (card1 === card2) {
    // Increase the score for the current player
    if (cur_player === "P_1") {
      score_P1 += 1;
    } else {
      score_P2 += 1;
    }
  } else {
    // Remove the last two clicks if no match
    clickedCells.pop();  
    clickedCells.pop(); 
  }

  card1 = null;
  card2 = null;
  canClick = true;  
}

function hint(row, col) {
  let number = ls[row][col];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 4; c++) {
      if (ls[r][c] === number) {
        hint_row = r - 1;
        hint_col = c - 1;
        break;
      }
    }
  }
}

function isCellClicked(cell) {
  for (let i = 0; i < clickedCells.length; i++) {
    if (clickedCells[i].row === cell.row && clickedCells[i].col === cell.col) {
      return true;
    }
  }
  return false;
}

function change_color() {
  color_index += 1;
  color_index /= 3;
}

function toggleDevMode() {
  devMode = !devMode;  // Toggle developer mode
}

function getMousePosition() {
  return { x: mouseX, y: mouseY };
}

function draw() {
  background(100); 
  frame_count += 1;
  
  // Calculate time elapsed in seconds (every 60 frames is 1 second)
  if (frame_count % 60 === 0) {
    time_elapsed += 1;
  }

  // Display time and frame count
  text("Time Elapsed: " + time_elapsed + " seconds", 100, 50);

  let cellWidth = width / 4; 
  let cellHeight = height / 5;  
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(color_wheel[color_index]); 
  text("HINT: " + hint_row + ", " + hint_col, windowWidth - 300, windowHeight - 50);
  text("Turn: " + cur_player, windowWidth - 100, windowHeight - 50);
  text("Score P_1: " + score_P1, 100, windowHeight - 50);
  text("Score P_2: " + score_P2, 300, windowHeight - 50);
  
  // Draw grid
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < medium; col++) {
      stroke(255);
      noFill(); 
      rect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);

      // If devMode is on, display the answer for each cell
      if (devMode) {
        fill(255);
        text(ls[row][col], col * cellWidth + cellWidth-50 , row * cellHeight+100);
      }
    }
  }

  // Draw clicked cells
  for (let i = 0; i < clickedCells.length; i++) {
    let cell = clickedCells[i];
    let num = ls[cell.row][cell.col];  
    let position = 0;
    for (let j = 0; j < num; j++) {
      text("|", cell.col * cellWidth + cellWidth / 2 + position, cell.row * cellHeight + cellHeight / 2);
      position += 10;
    }
  }
}