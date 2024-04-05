class Zonk extends Entity {
  constructor(row, col, width, image, symbol, speed, grid, murphy) {
    super(row, col, width, image, symbol, speed, grid, murphy);
    this.angle = 0;
  }

  // Draw(refPos) {
  //   if (this.visible) {
  //     image(
  //       this.image,
  //       this.pos.x + refPos.x + this.width / 2,
  //       this.pos.y + refPos.y + this.width / 2,
  //       this.width,
  //       this.width
  //     );
  //   }
  // }

  CanGoDown() {
    let downTile = this.grid.GetValue(this.row + 1, this.col);
    let murphyBelowCondition =
      this.Col == this.murphy.Col && this.Row == this.murphy.Row - 1;
    return (
      this.row + 1 < this.grid.Rows - 1 &&
      downTile == null &&
      !murphyBelowCondition &&
      !this.isLerping
    );
  }

  Move() {
    this.GoDown();
  }
}
