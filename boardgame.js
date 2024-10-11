//chanaphat junpradub s6601012620020 multiplayer hint timer
let cur_player = "P_1";
let match = true;

let ls;  
let clickedCells = [];  
let card1 = null;
let card2 = null;
let canClick = true;  
const easy = 2;
const medium =4;
const hard = 8;
let color_wheel = ['red', 'green', 'blue', 'yellow'];
let color_index = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  let cellWidth = width / 4; 
  let cellHeight = height / 5;  
  console.log(cellWidth,cellHeight)
  ls = array2D(medium);  
  console.log(ls);
  let button = createButton('click me');
   button.mousePressed(change_color);
}

function array2D(mode) {
  let arr = []; 
  let numb = [];  
  for (let num = 1;num < mode*5/4+1;num++){
    numb.push(num);
    numb.push(num);
    numb.push(num);
    numb.push(num);
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
  if (!canClick){return;} 

  let clickPosition = getMousePosition();
  let col = int(clickPosition.x / (width / medium));  // 4 columns
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
  console.log(clickedCells)
}

function checkMatch() {
  if (card1 !== card2) {
    clickedCells.pop();  
    clickedCells.pop();
    card1 = null;
    card2 = null;
    canClick = true;  
    
  }else{
    card1 = null;
    card2 = null;
    canClick = true;  
    return true;
  }

  
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
function change_color(){
  color_index += 1;
  color_index /=3;
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
  fill(color_wheel[color_index]); 
  
   text(cur_player,windowWidth-50, windowHeight-50)
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < medium; col++) {
      stroke(255);
      noFill(); 
      rect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
    }
  }


  for (let i = 0; i < clickedCells.length; i++) {
    let cell = clickedCells[i];
    let num = ls[cell.row][cell.col];  
    let position = 0;
    for (let i=0;i<num;i++){
     text("|", cell.col * cellWidth + cellWidth/ 2+position, cell.row * cellHeight + cellHeight / 2);
     position += 10;
    }
}
}