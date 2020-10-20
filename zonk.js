class Zonk extends Entity {
  constructor(
    row,
    col,
    width,
    forecolor,
    backcolor,
    symbol,
    speed,
    map,
    tileType
  ) {
    super(row, col, width, forecolor, backcolor, symbol, speed, map, tileType);
    this.angle = 0;
  }

  Draw(refPos) {
    if (this.visible) {
      // push();
      // translate(this.pos.x + refPos.x, this.pos.y + refPos.y);
      // this.angle += 0.2;
      // rotate(this.angle);
      image(
        zonkImage,
        this.pos.x + refPos.x + this.width / 2,
        this.pos.y + refPos.y + this.width / 2,
        this.width,
        this.width
      );
      // pop();
    }
  }

  ChangeDirection() {
    this.GoDown();
    this.isMoving = true;
  }
}
