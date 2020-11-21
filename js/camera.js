class Camera {
  constructor(x, y, width, height) {
    this.pos = createVector(x, y);
    this.topLeft = createVector(x, y);
    this.width = width;
    this.height = height;
  }

  get Width() {
    /* Return camera width */
    return this.width;
  }

  get Height() {
    /* Return camera height */
    return this.height;
  }

  Update(target) {
    /* Update camera top-left position according to target element */
    let x = -target.pos.x + int(this.width / 2);
    let y = -target.pos.y + int(this.height / 2);
    x = Math.min(0, x);
    y = Math.min(0, y);
    x = Math.max(this.width - MAP_WIDTH, x);
    y = Math.max(this.height - MAP_HEIGHT - this.topLeft.y, y);
    this.pos.set(x, y);
  }
}
