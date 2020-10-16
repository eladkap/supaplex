class Camera {
  constructor(width, height) {
    this.pos = createVector(0, 0);
    this.width = width;
    this.height = height;
  }

  Apply(tile) {
    tile.pos.set(this.pos.x + tile.pos.x, this.pos.y + tile.pos.y);
  }

  Update(target) {
    let x = -target.pos.x + int(SCREEN_WIDTH / 2);
    let y = -target.pos.y + int(SCREEN_HEIGHT / 2);
    x = Math.min(0, x);
    y = Math.min(0, y);
    // x = Math.max(-(this.width - SCREEN_WIDTH), x);
    // y = Math.max(-(this.height - SCREEN_HEIGHT), x);
    this.pos.set(x, y);
  }
}
