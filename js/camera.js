/*
This class represents the game camera that tracking the player
*/

class Camera {
 /**
  * 
  * @param {Number} x camera x position in pixels
  * @param {Number} y camera y position in pixels
  * @param {Number} width camera width in pixels
  * @param {Number} height camera height in pixels
  */
  constructor(x, y, width, height) {
    this.pos = createVector(x, y);
    this.topLeft = createVector(x, y);
    this.width = width;
    this.height = height;
  }

  /**
   * Get camera width
   */
  get Width() {
    return this.width;
  }

  /**
   * Get camera height
   */
  get Height() {
    return this.height;
  }

  /**
   * Update camera top-left position according to target element
   * 
   * @param {Tile} target target element
   */
  Update(target) {
    let x = -target.pos.x + int(this.width / 2);
    let y = -target.pos.y + int(this.height / 2);
    x = Math.min(0, x);
    y = Math.min(0, y);
    x = Math.max(this.width - MAP_WIDTH, x);
    y = Math.max(this.height - MAP_HEIGHT - this.topLeft.y, y);
    this.pos.set(x, y);
  }
}
