class ScoreBoard {
  constructor(x, y, w, h, levelNumer, levelTitle, infotrons) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.infotronsRequired = infotrons;
    this.infotronsCollected = 0;
    this.redBombs = 0;
    this.levelNum = levelNumer;
    this.levelTitle = levelTitle;
    this.timerSeconds = 0;
    this.timerMinutes = 0;
    this.timerHours = 0;
    this.timerOn = false;
  }

  get Time() {
    let hh = this.timerHours > 9 ? this.timerHours : '0' + this.timerHours;
    let mm =
      this.timerMinutes > 9 ? this.timerMinutes : '0' + this.timerMinutes;
    let ss =
      this.timerSeconds > 9 ? this.timerSeconds : '0' + this.timerSeconds;
    return `${hh}:${mm}:${ss}`;
  }

  Update() {
    if (this.timerOn && frameCount % FPS == 0) {
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
    this.infotronsCollected = 0;
    this.timerSeconds = 0;
    this.timerMinutes = 0;
    this.timerHours = 0;
    this.timerOn = false;
  }

  IncrementInfotronsCollected() {
    this.infotronsCollected++;
  }

  IncrementRedBombs() {
    this.redBombs++;
  }

  DecrementRedBombs() {
    this.redBombs--;
  }

  SetNextLevel() {
    this.levelNum++;
  }

  StartTimer() {
    this.timerOn = true;
  }

  StopTimer() {
    this.timerOn = false;
  }

  Draw() {
    noStroke();
    textSize(MESSAGE_FONT_SIZE3);
    textFont(FONT_FAMILY);
    textStyle(NORMAL);
    fill(WHITE);
    text(
      `Level: ${this.levelNum}\t--${this.levelTitle}--\t${INFOTRON_SYMBOL}: ${this.infotronsCollected}/${this.infotronsRequired}\tBombs: ${this.redBombs}\t Time: ${this.Time}`,
      this.x,
      this.y
    );
  }
}
