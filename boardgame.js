let ls;  
let clickedCells = [];  
let card1 = null;
let card2 = null;
let canClick = true;  

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  let cellWidth = width / 4; 
  let cellHeight = height / 5;  
  console.log(cellWidth,cellHeight)
  ls = array2D();  
}

function array2D() {
  let arr = []; 
  let numb = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];  


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
  if (!canClick) return;  

  let clickPosition = getMousePosition();
  let col = int(clickPosition.x / (width / 4));  // 4 columns
  let row = int(clickPosition.y / (height / 5));  // 5 rows

  if (row >= 0 && row < 5 && col >= 0 && col < 4) {
    let cellClicked = { row: row, col: col };

    if (!isCellClicked(cellClicked)) {
      if (card1 === null) {
        card1 = ls[row][col];
        clickedCells.push(cellClicked);
      } else if (card2 === null) {
        card2 = ls[row][col];
        clickedCells.push(cellClicked);
        canClick = false;  
       
				
        setTimeout(checkMatch, 1000);
      }
    }
  }
}

function checkMatch() {
  if (card1 !== card2) {
    clickedCells.pop();  
    clickedCells.pop(); 
  }

  
  card1 = null;
	card2 = null;
  canClick = true;  
}

function isCellClicked(cell) {
  // Check if the cell has already been clicked
  for (let i = 0; i < clickedCells.length; i++) {
    if (clickedCells[i].row === cell.row && clickedCells[i].col === cell.col) {
      return true;
    }
  }
  return false;
}

function getMousePosition() {
  return { x: mouseX, y: mouseY };
}

function draw() {
  background(100); 
  
  let cellWidth = width / 4; 
  let cellHeight = height / 5;  
  textAlign(CENTER, CENTER);
  textSize(32);
  fill('#00ff00'); 
  
  
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 4; col++) {
      stroke(255);
      noFill(); 
      rect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
    }
  }


  for (let i = 0; i < clickedCells.length; i++) {
    let cell = clickedCells[i];
    let num = ls[cell.row][cell.col];  
    text(num, cell.col * cellWidth + cellWidth / 2, cell.row * cellHeight + cellHeight / 2); 
}
}