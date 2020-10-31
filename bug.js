class Bug extends Tile {
  constructor(row, col, width, image, symbol) {
    super(row, col, width, image, symbol);
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

  Draw(refPos) {
    strokeWeight(0.1);
    stroke(GRAY3);
    fill(BLACK);
    rect(this.pos.x + refPos.x, this.pos.y + refPos.y, this.width, this.width);
    if (this.visible) {
      textSize(this.width * 0.7);
      textFont(FONT_FAMILY);
      // fill(this.forecolor);
      text(
        this.symbol,
        this.pos.x + refPos.x,
        this.pos.y + refPos.y + this.width * 0.7
      );
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
