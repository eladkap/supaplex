class Murphy extends Entity {
  constructor(
    row,
    col,
    width,
    forecolor,
    backcolor,
    symbol,
    speed,
    maze,
    tileType,
    lives
  ) {
    super(row, col, width, forecolor, backcolor, symbol, speed, maze, tileType);
    this.lives = lives;
  }

  get Lives() {
    return this.lives;
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

  IncrementLives() {
    this.lives++;
  }

  DecrementLives() {
    this.lives--;
  }

  Collect(direction) {
    if (direction == 'R' && this.CanGoRight()) {
      this.maze.SetValue(this.row, this.col + 1, TILE_EMPTY);
      return [this.row, this.col + 1];
    }
    if (direction == 'L' && this.CanGoLeft()) {
      this.maze.SetValue(this.row, this.col - 1, TILE_EMPTY);
      return [this.row, this.col - 1];
    }
    if (direction == 'U' && this.CanGoUp()) {
      this.maze.SetValue(this.row - 1, this.col, TILE_EMPTY);
      return [this.row - 1, this.col];
    }
    if (direction == 'D' && this.CanGoDown()) {
      this.maze.SetValue(this.row + 1, this.col, TILE_EMPTY);
      return [this.row + 1, this.col];
    }
    return null;
  }

  CanGoLeft() {
    return (
      this.col > 0 &&
      ![TILE_WALL, TILE_FRAME, TILE_ZONK].includes(
        this.maze.GetValue(this.row, this.col - 1)
      ) &&
      !this.isLerping
    );
  }

  CanGoRight() {
    return (
      this.col + 1 < this.maze.Cols &&
      ![TILE_WALL, TILE_FRAME, TILE_ZONK].includes(
        this.maze.GetValue(this.row, this.col + 1)
      ) &&
      !this.isLerping
    );
  }

  CanGoUp() {
    return (
      this.row > 0 &&
      ![TILE_WALL, TILE_FRAME, TILE_ZONK].includes(
        this.maze.GetValue(this.row - 1, this.col)
      ) &&
      !this.isLerping
    );
  }

  CanGoDown() {
    return (
      this.row + 1 < this.maze.Rows &&
      ![TILE_WALL, TILE_FRAME, TILE_ZONK].includes(
        this.maze.GetValue(this.row + 1, this.col)
      ) &&
      !this.isLerping
    );
  }

  CanPushRight() {
    return (
      this.col + 2 < this.maze.Cols &&
      this.maze.GetValue(this.row, this.col + 1) == TILE_ZONK &&
      this.maze.GetValue(this.row, this.col + 2) == TILE_EMPTY
    );
  }

  CanPushLeft() {
    return (
      this.col - 2 >= 0 &&
      this.maze.GetValue(this.row, this.col - 1) == TILE_ZONK &&
      this.maze.GetValue(this.row, this.col - 2) == TILE_EMPTY
    );
  }

  Destroy() {}
  // todo: implement an explosion
}
