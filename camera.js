class Camera {
  constructor(x, y, width, height) {
    this.pos = createVector(x, y);
    this.topLeft = createVector(x, y);
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
    tile.pos.add(this.pos);
  }

  Update(target) {
    let x = -target.pos.x + int(SCREEN_WIDTH / 2);
    let y = -target.pos.y + int(SCREEN_HEIGHT / 2);
    x = Math.min(this.topLeft.x, x);
    y = Math.min(this.topLeft.y, y);
    x = Math.max(-(this.width - SCREEN_WIDTH), x);
    y = Math.max(-(this.height - SCREEN_HEIGHT), y);
    this.pos.set(x, y);
  }
}
