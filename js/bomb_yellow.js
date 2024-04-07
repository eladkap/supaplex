class YellowBomb extends Entity {
  constructor(row, col, width, image, symbol, speed, grid, murphy) {
    super(row, col, width, image, symbol, speed, grid, murphy);
  }

  explode() {  
    this.destroy();
  }
}
