class Murphy extends Entity {
  constructor(
    row,
    col,
    width,
    forecolor,
    backcolor,
    symbol,
    speed,
    map,
    tileType,
    lives
  ) {
    super(row, col, width, forecolor, backcolor, symbol, speed, map, tileType);
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
      this.map.SetValue(this.row, this.col + 1, TILE_EMPTY);
      return [this.row, this.col + 1];
    }
    if (direction == 'L' && this.CanGoLeft()) {
      this.map.SetValue(this.row, this.col - 1, TILE_EMPTY);
      return [this.row, this.col - 1];
    }
    if (direction == 'U' && this.CanGoUp()) {
      this.map.SetValue(this.row - 1, this.col, TILE_EMPTY);
      return [this.row - 1, this.col];
    }
    if (direction == 'D' && this.CanGoDown()) {
      this.map.SetValue(this.row + 1, this.col, TILE_EMPTY);
      return [this.row + 1, this.col];
    }
    return null;
  }

  CanGoLeft() {
    return (
      this.col > 0 &&
      ![TILE_WALL, TILE_FRAME, TILE_ZONK].includes(
        this.map.GetValue(this.row, this.col - 1)
      ) &&
      !this.isLerping
    );
  }

  CanGoRight() {
    return (
      this.col + 1 < this.map.Cols &&
      ![TILE_WALL, TILE_FRAME, TILE_ZONK].includes(
        this.map.GetValue(this.row, this.col + 1)
      ) &&
      !this.isLerping
    );
  }

  CanGoUp() {
    return (
      this.row > 0 &&
      ![TILE_WALL, TILE_FRAME, TILE_ZONK].includes(
        this.map.GetValue(this.row - 1, this.col)
      ) &&
      !this.isLerping
    );
  }

  CanGoDown() {
    return (
      this.row + 1 < this.map.Rows &&
      ![TILE_WALL, TILE_FRAME, TILE_ZONK].includes(
        this.map.GetValue(this.row + 1, this.col)
      ) &&
      !this.isLerping
    );
  }

  CanPushRight() {
    return (
      this.col + 2 < this.map.Cols &&
      this.map.GetValue(this.row, this.col + 1) == TILE_ZONK &&
      this.map.GetValue(this.row, this.col + 2) == TILE_EMPTY
    );
  }

  CanPushLeft() {
    return (
      this.col - 2 >= 0 &&
      this.map.GetValue(this.row, this.col - 1) == TILE_ZONK &&
      this.map.GetValue(this.row, this.col - 2) == TILE_EMPTY
    );
  }

  Destroy() {}
  // todo: implement an explosion
}
