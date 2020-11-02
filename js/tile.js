class Tile {
  constructor(row, col, width, image, symbol) {
    this.row = row;
    this.col = col;
    this.pos = createVector(MAP_POS_X + col * width, MAP_POS_Y + row * width);
    this.width = width;
    this.radius = width / 2;
    this.image = image;
    this.symbol = symbol;
    this.visible = true;
  }

  //#region Properties
  get Row() {
    return this.row;
  }

  get Col() {
    return this.col;
  }

  get Position() {
    return this.pos;
  }

  get Width() {
    return this.width;
  }

  get Radius() {
    return this.radius;
  }

  get Points() {
    return this.points;
  }

  get Symbol() {
    return this.symbol;
  }

  get Visible() {
    return this.visible;
  }
  //#endregion

  //#region Methods

  Draw(refPos) {
    image(
      this.image,
      this.pos.x + refPos.x + this.width / 2,
      this.pos.y + refPos.y + this.width / 2,
      this.width,
      this.width
    );
  }

  Update() {}

  Move() {}

  Stop() {}

  SetSymbol(symbol) {
    this.symbol = symbol;
  }

  SetVisible(value) {
    this.visible = value;
  }

  SetPosition(row, col) {
    this.row = row;
    this.col = col;
    let x = MAP_POS_X + col * this.width;
    let y = MAP_POS_Y + row * this.width;
    this.pos.set(x, y);
  }

  SetRandomPosition() {
    let row = int(random(0, MAP_COLS));
    let col = int(random(0, MAP_ROWS));
    this.SetPosition(row, col);
  }

  UpdatePosition() {
    this.pos.set(
      MAP_POS_X + this.col * this.width,
      MAP_POS_Y + this.row * this.width
    );
  }
}
//#endregion