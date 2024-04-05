class Bug extends Tile {
  constructor(row, col, width, image, symbol) {
    super(row, col, width, image, symbol);
    this.visible = true;
    this.timer = 0;
    this.onDuration = BUG_DURATION_SEC;
    this.offDuration = random([4, 5, 6, 7, 8]);
    this.activated = true;
  }

  get Activated() {
    return this.activated;
  }

  SetActivated(value) {
    this.activated = value;
  }

  // Draw(refPos) {
  //   image(
  //     this.image,
  //     this.pos.x + refPos.x + this.width / 2,
  //     this.pos.y + refPos.y + this.width / 2,
  //     this.width,
  //     this.width
  //   );
  // }

  Update() {
    if (frameCount % FPS == 0) {
      if (this.timer % this.offDuration == 0) {
        this.activated = true;
        this.image = tileImages['bug'];
        this.symbol = TILE_EMOJI_DICT['bug'];
      }
      else {
        this.activated = false;
        this.image = tileImages['base'];
        this.symbol = TILE_EMOJI_DICT['base'];
      }
      this.timer++;
    }
  }

  Reset() {
    this.timer = 0;
  }
}
