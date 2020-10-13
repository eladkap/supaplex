class Bug extends Tile {
  constructor(row, col, width, color, symbol) {
    super(row, col, width, color, symbol);
    this.visible = true;
    this.offTimer = 0;
    this.onTimer = 0;
    this.offDuration = random([5, 6, 7, 8]);
    this.onDuration = BUG_DURATION_SEC;
    this.activated = true;
  }

  get Activated() {
    return this.activated;
  }

  SetActivated(value) {
    this.activated = value;
  }

  Draw() {
    if (this.visible) {
      noStroke();
      fill(this.color);
      textSize(this.width * 0.6);
      text(this.symbol, this.pos.x, this.pos.y + this.width * 0.7);
    }
  }

  Update() {
    if (frameCount % FPS == 0) {
      if (this.visible) {
        this.onTimer++;
      } else {
        this.offTimer++;
      }
      if (this.offTimer == this.offDuration) {
        this.offTimer = 0;
        this.SetVisible(true);
        this.activated = true;
      }
      if (this.onTimer == this.onDuration) {
        this.onTimer = 0;
        this.SetVisible(false);
        this.activated = false;
      }
    }
  }

  Reset() {
    this.SetVisible(true);
    this.offTimer = 0;
    this.onTimer = 0;
  }
}
