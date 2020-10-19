class Map {
  constructor(tileMap) {
    let line = tileMap[0].split(' ');
    this.rows = tileMap.length;
    this.cols = line.length;
    this.matrix = new Array(this.rows);
    this.width = this.cols * TILE_SIZE;
    this.height = this.rows * TILE_SIZE;
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = new Array(this.cols);
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = undefined;
      }
    }
  }

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

  Create(tileMap) {
    for (let i = 0; i < this.rows; i++) {
      let line = tileMap[i].split(' ');
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = line[j];
      }
    }
  }

  GetValue(i, j) {
    return this.matrix[i][j];
  }

  SetValue(i, j, value) {
    this.matrix[i][j] = value;
  }
}
