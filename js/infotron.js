class Infotron extends Entity {
  constructor(row, col, width, image, symbol, speed, grid, murphy) {
    super(row, col, width, image, symbol, speed, grid, murphy);
  }

  CanGoDown() {
    let downTile = this.grid.getTile(this.row + 1, this.col);
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
