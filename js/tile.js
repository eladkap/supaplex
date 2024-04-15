/*
This class represents the most basic game element
*/

class Tile {
  /**
   * 
   * @param {Number} row tile row
   * @param {Number} col tile column
   * @param {Number} width tile width
   * @param {Number} image tile image
   * @param {Number} symbol tile symbol
   */
  constructor(row, col, width, image, symbol) {
    this.row = row;
    this.col = col;
    this.pos = createVector(MAP_POS_X + col * width, MAP_POS_Y + row * width);
    this.width = width;
    this.radius = width / 2;
    this.image = image;
    this.symbol = symbol;
    this.visible = true;
    this.destroyed = false;
    this.time = 0;
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

  get Symbol() {
    return this.symbol;
  }

  get Visible() {
    return this.visible;
  }
  //#endregion

  //#region Methods
  /**
   * Draw tile refer to a position
   * 
   * @param {Vector} refPos reference position
   */
  Draw(refPos) {
    if (this.visible && GFX_MODE == GFX_TILE_IMAGE_MODE && this.image != null) {
      image(
        this.image,
        this.pos.x + refPos.x + this.width / 2,
        this.pos.y + refPos.y + this.width / 2,
        this.width,
        this.width
      );
    }
    else {
      noStroke();
      textSize(this.width * 0.9);
      text(
        this.symbol,
        this.pos.x + refPos.x - this.width * 0.1,
        this.pos.y + refPos.y + this.width * 0.8
      );
    }   
  }

  Update() {
  }

  Move() {}

  Stop() {}

  SetSymbol(symbol) {
    this.symbol = symbol;
  }

  SetVisible(value) {
    this.visible = value;
  }

  /**
   * Set tile position on the map
   * 
   * @param {Number} row tile row 
   * @param {Number} col tile column
   */
  SetPosition(row, col) {
    this.row = row;
    this.col = col;
    let x = MAP_POS_X + col * this.width;
    let y = MAP_POS_Y + row * this.width;
    this.pos.set(x, y);
  }

  /**
   * Set tile random position
   */
  SetRandomPosition() {
    let row = int(random(0, MAP_COLS));
    let col = int(random(0, MAP_ROWS));
    this.SetPosition(row, col);
  }

  /**
   * Update tile position
   */
  UpdatePosition() {
    this.pos.set(
      MAP_POS_X + this.col * this.width,
      MAP_POS_Y + this.row * this.width
    );
  }

  /**
   * Destroy tile and exchange it to explosion
   */
  destroy() {
    this.destroyed = true;
    this.image = tileImages['explosion'];
    this.symbol = TILE_EMOJI_DICT['explosion'];
  }
}
//#endregion
