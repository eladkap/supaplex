class Murphy extends Entity {
  constructor(row, col, width, color, symbol, speed, maze, tileType, lives) {
    super(row, col, width, color, symbol, speed, maze, tileType);
    this.lives = lives;
  }

  get Lives() {
    return this.lives;
  }

  Draw() {
    if (this.visible) {
      noStroke();
      fill(this.color);
      textSize(this.width * 0.6);
      text(this.symbol, this.pos.x, this.pos.y + this.width * 0.7);
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
      this.maze.GetValue(this.row, this.col - 1) != TILE_WALL &&
      !this.isLerping
    );
  }

  CanGoRight() {
    return (
      this.col + 1 < this.maze.Cols &&
      this.maze.GetValue(this.row, this.col + 1) != TILE_WALL &&
      !this.isLerping
    );
  }

  CanGoUp() {
    return (
      this.row > 0 &&
      this.maze.GetValue(this.row - 1, this.col) != TILE_WALL &&
      !this.isLerping
    );
  }

  CanGoDown() {
    return (
      this.row + 1 < this.maze.Rows &&
      this.maze.GetValue(this.row + 1, this.col) != TILE_WALL &&
      !this.isLerping
    );
  }

  Destroy() {}
  // todo: implement an explosion
}
