/*
This class represents the level grid containing tiles
*/

class Grid {
  /*
  tileMap: string represents the level map
  rows: rows number
  cols: columns number
  matrix: 2d array containing the tiles
  width: map width in pixels
  height: map height in pixels
  */
  constructor(tileMap) {
    this.tileMap = tileMap;
    let line = tileMap[0].split(' ');
    this.rows = tileMap.length;
    this.cols = line.length;
    this.matrix = new Array(this.rows);
    this.width = this.cols * TILE_SIZE;
    this.height = this.rows * TILE_SIZE;
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = new Array(this.cols);
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = null;
      }
    }
    this.create(tileMap);
  }

  //#region properties
  get Rows() {
    return this.rows;
  }

  get Cols() {
    return this.cols;
  }

  get Width() {
    return this.width;
  }

  get Height() {
    return this.height;
  }
  //#endregion

  create(tileMap) {
    /* Create tile map objects according to tile map string */
    for (let i = 0; i < this.rows; i++) {
      let line = tileMap[i].split(' ');
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = line[j];
      }
    }
  }

  /**
   * Get tile in (i, j) position
   * 
   * @param {number} i row i
   * @param {number} j column j
   * @returns tile (i, j)
   */
  getTile(i, j) {
    return this.matrix[i][j];
  }

  SetValue(i, j, value) {
    /* Set tile in i,j position */
    this.matrix[i][j] = value;
  }

  Copy() {
    /* Return a copy of grid object */
    let grid = new Grid(this.tileMap);
    return grid;
  }

  Normalize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = this.matrix[i][j] == TILE_EMPTY ? 0 : 1;
      }
    }
  }
}
