class Murphy extends Entity {
  constructor(row, col, width, image, symbol, speed, grid, murphy) {
    super(row, col, width, image, symbol, speed, grid, murphy);
  }

  Draw(refPos) {
    if (this.visible) {
      noStroke();
      // fill(this.forecolor);
      textSize(this.width * 0.88);
      text(
        this.symbol,
        this.pos.x + refPos.x - this.width * 0.1,
        this.pos.y + refPos.y + this.width * 0.8
      );
    }
  }

  Collect(direction) {
    if (direction == 'R' && this.CanGoRight()) {
      // this.grid.SetValue(this.row, this.col + 1, null);
      return [this.row, this.col + 1];
    }
    if (direction == 'L' && this.CanGoLeft()) {
      // this.grid.SetValue(this.row, this.col - 1, null);
      return [this.row, this.col - 1];
    }
    if (direction == 'U' && this.CanGoUp()) {
      // this.grid.SetValue(this.row - 1, this.col, null);
      return [this.row - 1, this.col];
    }
    if (direction == 'D' && this.CanGoDown()) {
      // this.grid.SetValue(this.row + 1, this.col, null);
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
  }

  CanGoRight() {
    return this.col + 1 < this.grid.Cols - 1 && !this.isLerping;
  }

  CanGoUp() {
    return this.row - 1 > 0 && !this.isLerping;
  }

  CanGoDown() {
    return this.row + 1 < this.grid.Rows - 1 && !this.isLerping;
  }

  CanPushLeft() {
    let tile = this.grid.GetValue(this.row, this.col - 1);
    let tilePushable =
      tile instanceof Zonk ||
      tile instanceof OrangeBomb ||
      tile instanceof YellowBomb;
    return (
      this.col - 2 >= 0 &&
      tilePushable &&
      this.grid.GetValue(this.row, this.col - 2) == null
    );
  }

  CanPushRight() {
    let tile = this.grid.GetValue(this.row, this.col + 1);
    let tilePushable =
      tile instanceof Zonk ||
      tile instanceof OrangeBomb ||
      tile instanceof YellowBomb;
    return (
      this.col + 2 < this.grid.Cols &&
      tilePushable &&
      this.grid.GetValue(this.row, this.col + 2) == null
    );
  }

  CanPushUp() {
    let tile = this.grid.GetValue(this.row - 1, this.col);
    let tilePushable =
      tile instanceof Zonk ||
      tile instanceof OrangeBomb ||
      tile instanceof YellowBomb;
    return (
      this.row - 2 >= 0 &&
      tilePushable &&
      this.grid.GetValue(this.row - 2, this.col) == null
    );
  }

  CanPushDown() {
    let tile = this.grid.GetValue(this.row + 1, this.col);
    let tilePushable =
      tile instanceof Zonk ||
      tile instanceof OrangeBomb ||
      tile instanceof YellowBomb;
    return (
      this.row + 1 < this.grid.Cols &&
      tilePushable &&
      this.grid.GetValue(this.row + 2, this.col) == null
    );
  }

  CanPassRight() {
    return (
      this.col + 2 < this.grid.Cols &&
      this.grid.GetValue(this.row, this.col + 1) instanceof Port &&
      ['right', 'dual_h', 'cross'].includes(
        this.grid.GetValue(this.row, this.col + 1).type
      ) &&
      this.grid.GetValue(this.row, this.col + 2) == null
    );
  }

  CanPassLeft() {
    return (
      this.col - 2 >= 0 &&
      this.grid.GetValue(this.row, this.col - 1) instanceof Port &&
      ['left', 'dual_h', 'cross'].includes(
        this.grid.GetValue(this.row, this.col - 1).type
      ) &&
      this.grid.GetValue(this.row, this.col - 2) == null
    );
  }

  CanPassUp() {
    return (
      this.row - 2 >= 0 &&
      this.grid.GetValue(this.row - 1, this.col) instanceof Port &&
      ['up', 'dual_v', 'cross'].includes(
        this.grid.GetValue(this.row - 1, this.col).type
      ) &&
      this.grid.GetValue(this.row - 2, this.col) == null
    );
  }

  CanPassDown() {
    return (
      this.row + 2 < this.grid.Rows &&
      this.grid.GetValue(this.row + 1, this.col) instanceof Port &&
      ['down', 'dual_v', 'cross'].includes(
        this.grid.GetValue(this.row + 1, this.col).type
      ) &&
      this.grid.GetValue(this.row + 2, this.col) == null
    );
  }

  Destroy() {}
  // todo: implement an explosion
}
