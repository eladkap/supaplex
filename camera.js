class Camera {
  constructor(x, y, width, height) {
    this.pos = createVector(x, y);
    this.width = width;
    this.height = height;
  }

  get Width() {
    return this.width;
  }

  get Height() {
    return this.height;
  }

  Apply(tile) {
    tile.pos.set(this.pos.x + tile.pos.x, this.pos.y + tile.pos.y);
  }

  Update(target) {
    let x = -target.pos.x + int(SCREEN_WIDTH / 2);
    let y = -target.pos.y + int(SCREEN_HEIGHT / 2);
    x = Math.min(0, x);
    y = Math.min(0, y);
    x = Math.max(-(this.width - MAZE_WIDTH), x);
    y = Math.max(-(this.height - MAZE_HEIGHT), y);
    this.pos.set(x, y);
  }
}
