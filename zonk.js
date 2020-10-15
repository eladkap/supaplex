class Zonk extends Entity {
  constructor(row, col, width, color, symbol, speed, maze, tileType) {
    super(row, col, width, color, symbol, speed, maze, tileType);
  }

  Draw() {
    if (this.visible) {
      noStroke();
      fill(this.color);
      textSize(this.width * 0.6);
      text(this.symbol, this.pos.x, this.pos.y + this.width * 0.7);
    }
  }

  CanGoDown() {
    return (
      this.row > 0 &&
      [TILE_EMPTY, TILE_MURPHY].includes(
        this.maze.GetValue(this.row + 1, this.col)
      ) &&
      !this.isLerping
    );
  }

  ChangeDirection() {
    this.GoDown();
    this.isMoving = true;
  }
}
