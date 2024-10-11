int board_size = 3;  
int[][] board = new int[board_size][board_size];  
int i = 0;  // Counter for tracking the current line to draw
int count = 0;  // Counter for tracking the segments of each line

void settings() {
  size(400, 400);
}

void setup() {
  background(255);
  strokeWeight(20);
  frameRate(20);  // Set the frame rate to 1 frame per second for a visible delay
}

void draw() {
  // Draw the current line segment by segment
  if (i < 3) {  // Draw for 3 columns
    if (count <= 20) {  // Each line has 4 segments
      draw_line(20, 20, i, count);  // Draw one segment at a time
      count++;  // Increment the segment counter
    } else {
      i++;  // Move to the next line
      count = 0;  // Reset the segment counter for the next line
    }
  }
}

void draw_line(int row, int col, int n, int seg) {
  int x = row + n * 30;  // Column offset based on line number
  int y_start = col + seg *2;  // Y position for current segment
  line(x, y_start, x, y_start + 10);  // Draw a small segment of the line
}
