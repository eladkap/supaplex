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

  Draw(refPos) {
    if (this.visible) {
      noStroke();
      fill(this.forecolor);
      textSize(this.width * 0.88);
      text(
        this.symbol,
        this.pos.x + refPos.x - this.width * 0.1,
        this.pos.y + refPos.y + this.width * 0.8
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
      // this.map.SetValue(this.row, this.col + 1, null);
      return [this.row, this.col + 1];
    }
    if (direction == 'L' && this.CanGoLeft()) {
      // this.map.SetValue(this.row, this.col - 1, null);
      return [this.row, this.col - 1];
    }
    if (direction == 'U' && this.CanGoUp()) {
      // this.map.SetValue(this.row - 1, this.col, null);
      return [this.row - 1, this.col];
    }
    if (direction == 'D' && this.CanGoDown()) {
      // this.map.SetValue(this.row + 1, this.col, null);
      return [this.row + 1, this.col];
    }
    return null;
  }

  GoLeft() {
    if (this.CanGoLeft()) {
      this.direction.set(-1, 0);
      this.isLerping = true;
      this.col--;
    }
  }

  GoRight() {
    if (this.CanGoRight()) {
      this.direction.set(1, 0);
      this.isLerping = true;
      this.col++;
    }
  }

  GoUp() {
    if (this.CanGoUp()) {
      this.direction.set(0, -1);
      this.isLerping = true;
      this.row--;
    }
  }

  GoDown() {
    if (this.CanGoDown()) {
      this.direction.set(0, 1);
      this.isLerping = true;
      this.row++;
    }
  }

  CanGoLeft() {
    return this.col - 1 > 0 && !this.isLerping;
    // return (
    //   this.col > 0 &&
    //   [TILE_INFOTRON, TILE_BASE, TILE_EMPTY, TILE_BUG].includes(
    //     this.map.GetValue(this.row, this.col - 1)
    //   ) &&
    //   !this.isLerping
    // );
  }

  CanGoRight() {
    return this.col + 1 < this.map.Cols - 1 && !this.isLerping;
    // return (
    //   this.col + 1 < this.map.Cols &&
    //   [TILE_INFOTRON, TILE_BASE, TILE_EMPTY, TILE_BUG].includes(
    //     this.map.GetValue(this.row, this.col + 1)
    //   ) &&
    //   !this.isLerping
    // );
  }

  CanGoUp() {
    return this.row - 1 > 0 && !this.isLerping;
    // return (
    //   this.row > 0 &&
    //   [TILE_INFOTRON, TILE_BASE, TILE_EMPTY, TILE_BUG].includes(
    //     this.map.GetValue(this.row - 1, this.col)
    //   ) &&
    //   !this.isLerping
    // );
  }

  CanGoDown() {
    return this.row + 1 < this.map.Rows - 1 && !this.isLerping;
    // return (
    //   this.row + 1 < this.map.Rows &&
    //   [TILE_INFOTRON, TILE_BASE, TILE_EMPTY, TILE_BUG].includes(
    //     this.map.GetValue(this.row + 1, this.col)
    //   ) &&
    //   !this.isLerping
    // );
  }

  CanPushRight() {
    return (
      this.col + 2 < this.map.Cols &&
      this.map.GetValue(this.row, this.col + 1) instanceof Zonk &&
      this.map.GetValue(this.row, this.col + 2) == null
    );
  }

  CanPushLeft() {
    return (
      this.col - 2 >= 0 &&
      this.map.GetValue(this.row, this.col - 1) instanceof Zonk &&
      this.map.GetValue(this.row, this.col - 2) == null
    );
  }

  CanPassRight() {
    return (
      this.col + 2 < this.map.Cols &&
      this.map.GetValue(this.row, this.col + 1) instanceof Port &&
      ['right', 'dual_h', 'cross'].includes(
        this.map.GetValue(this.row, this.col + 1).type
      ) &&
      this.map.GetValue(this.row, this.col + 2) == null
    );
  }

  CanPassLeft() {
    return (
      this.col - 2 >= 0 &&
      this.map.GetValue(this.row, this.col - 1) instanceof Port &&
      ['left', 'dual_h', 'cross'].includes(
        this.map.GetValue(this.row, this.col + 1).type
      ) &&
      this.map.GetValue(this.row, this.col - 2) == null
    );
  }

  CanPassUp() {
    return (
      this.row - 2 >= 0 &&
      this.map.GetValue(this.row - 1, this.col) instanceof Port &&
      ['up', 'dual_v', 'cross'].includes(
        this.map.GetValue(this.row - 1, this.col).type
      ) &&
      this.map.GetValue(this.row - 2, this.col) == null
    );
  }

  CanPassDown() {
    return (
      this.row + 2 < this.map.Rows &&
      this.map.GetValue(this.row + 1, this.col) instanceof Port &&
      ['down', 'dual_v', 'cross'].includes(
        this.map.GetValue(this.row + 1, this.col).type
      ) &&
      this.map.GetValue(this.row + 2, this.col) == null
    );
  }

  Destroy() {}
  // todo: implement an explosion
}
