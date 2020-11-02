class OrangeBomb extends Entity {
  constructor(row, col, width, image, symbol, speed, map, murphy) {
    super(row, col, width, image, symbol, speed, map, murphy);
  }

  Draw(refPos) {
    image(
      this.image,
      this.pos.x + refPos.x + this.width / 2,
      this.pos.y + refPos.y + this.width / 2,
      this.width,
      this.width
    );
  }

  CanGoDown() {
    let downTile = this.map.GetValue(this.row + 1, this.col);
    let murphyBelowCondition =
      this.Col == this.murphy.Col && this.Row == this.murphy.Row - 1;
    return (
      this.row + 1 < this.map.Rows - 1 &&
      downTile == null &&
      !murphyBelowCondition &&
      !this.isLerping
    );
  }

  Move() {
    this.GoDown();
  }

  Explode() {}
}
