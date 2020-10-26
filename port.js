class Port extends Tile {
  constructor(row, col, width, forecolor, backcolor, symbol, type) {
    super(row, col, width, forecolor, backcolor, symbol);
    this.type = type;
  }

  Draw(refPos) {
    let img = undefined;
    if (this.type == 'right') {
      img = rightPortImage;
    } else if (this.type == 'left') {
      img = leftPortImage;
    } else if (this.type == 'up') {
      img = upPortImage;
    } else if (this.type == 'down') {
      img = downPortImage;
    } else if (this.type == 'cross') {
      img = crossPortImage;
    } else if (this.type == 'dual_h') {
      img = dualHorPortImage;
    } else if (this.type == 'dual_v') {
      img = dualVerPortImage;
    }

    image(
      img,
      this.pos.x + refPos.x + this.width / 2,
      this.pos.y + refPos.y + this.width / 2,
      this.width,
      this.width
    );
  }
}
