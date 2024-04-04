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
    image(
      this.image,
      this.pos.x + refPos.x + this.width / 2,
      this.pos.y + refPos.y + this.width / 2,
      this.width,
      this.width
    );

    if (this.visible && game.state == GAME_PLAY) {
      stroke(BLUE);
      strokeWeight(3);
      line(this.pos.x + refPos.x, this.pos.y + refPos.y + this.width, this.pos.x + refPos.x + this.width, this.pos.y + refPos.y);
      line(this.pos.x + refPos.x + this.radius, this.pos.y + refPos.y + this.radius, this.pos.x + refPos.x + this.width,  this.pos.y + refPos.y + this.width);
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
