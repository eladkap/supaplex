class Stats {
  constructor(x, y, w, h, infotrons) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.infotrons = infotrons;
    this.infotronsRemained = infotrons;
    this.levelNum = 1;
    this.levelTitle = 'Level 1';
    this.timerSeconds = 0;
    this.timerMinutes = 0;
    this.timerHours = 0;
  }

  Update() {
    if (frameCount % FPS == 0) {
      this.timerSeconds++;
      if (this.timerSeconds == 60) {
        this.timerSeconds = 0;
        this.timerMinutes++;
        if (this.timerMinutes == 60) {
          this.timerMinutes = 0;
          this.timerHours++;
        }
      }
    }
  }

  Reset() {
    this.infotronsRemained = this.infotrons;
    this.timerSeconds = 0;
    this.timerMinutes = 0;
    this.timerHours = 0;
  }

  DecrementInfotrons() {
    this.infotronsRemained--;
  }

  SetNextLevel() {
    this.levelNum++;
  }

  get Time() {
    return `${this.timerHours}:${this.timerMinutes}:${this.timerSeconds}`;
  }

  Draw() {
    noStroke();
    textSize(36);
    textFont(FONT_FAMILY);
    textStyle(NORMAL);
    fill(WHITE);
    text(
      `Level: ${this.levelNum}\t\t--${this.levelTitle}--\t\t${INFOTRON_SYMBOL}: ${this.infotronsRemained}\t\t Time: ${this.Time}`,
      this.x,
      this.y
    );
  }
}
