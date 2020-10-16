class Zonk extends Entity {
  constructor(
    row,
    col,
    width,
    forecolor,
    backcolor,
    symbol,
    speed,
    maze,
    tileType
  ) {
    super(row, col, width, forecolor, backcolor, symbol, speed, maze, tileType);
  }

  Draw() {
    if (this.visible) {
      noStroke();
      fill(this.forecolor);
      textSize(this.width * 0.9);
      text(
        this.symbol,
        this.pos.x - this.width * 0.1,
        this.pos.y + this.width * 0.8
      );
    }
  }

  // CanGoDown() {
  //   return (
  //     this.row > 0 &&
  //     ![TILE_WALL, TILE_MURPHY, TILE_BASE].includes(
  //       this.maze.GetValue(this.row + 1, this.col)
  //     ) &&
  //     !this.isLerping
  //   );
  // }

  ChangeDirection() {
    this.GoDown();
    this.isMoving = true;
  }
}
