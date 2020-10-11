class Stats {
  constructor(x, y, w, h, infotrons) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.infotrons = infotrons;
    this.infotronsRemained = infotrons;
    this.levelNum = 1;
    this.timer = 0;
  }

  Update() {
    if (frameCount % FPS == 0) {
      this.timer++;
    }
  }

  Reset() {
    this.infotronsRemained = this.infotrons;
  }

  DecrementInfotrons() {
    this.infotronsRemained--;
  }

  SetNextLevel() {
    this.levelNum++;
  }

  Draw() {
    noStroke();
    textSize(36);
    textFont(FONT_FAMILY);
    textStyle(NORMAL);
    fill(WHITE);
    text(
      `Level: ${this.levelNum}\t\t${INFOTRON_SYMBOL}: ${this.infotronsRemained}\t\t Time: ${this.timer}`,
      this.x,
      this.y
    );
  }
}
