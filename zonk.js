class Zonk extends Entity {
  constructor(row, col, width, image, symbol, speed, map, tileType) {
    super(row, col, width, image, symbol, speed, map, tileType);
    this.angle = 0;
  }

  Draw(refPos) {
    if (this.visible) {
      // push();
      // translate(this.pos.x + refPos.x, this.pos.y + refPos.y);
      // this.angle += 0.2;
      // rotate(this.angle);
      image(
        this.image,
        this.pos.x + refPos.x + this.width / 2,
        this.pos.y + refPos.y + this.width / 2,
        this.width,
        this.width
      );
      // pop();
    }
  }

  CanGoDown() {
    let downTile = this.map.GetValue(this.row + 1, this.col);
    return (
      this.row + 1 < this.map.Rows - 1 && downTile == null && !this.isLerping
    );
  }

  Move() {
    this.GoDown();
    this.isMoving = true;
  }
}
