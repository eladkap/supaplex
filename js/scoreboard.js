class ScoreBoard {
  /*
  x: scoreboard top-left x position in pixels
  y: scoreboard top-left y position in pixels
  w: scoreboard width in pixels
  h: scoreboard height in pixels
  levelNumber: level number
  levelTitle: level title
  infotrons: required infotrons
  */
  constructor(x, y, w, h, levelNumer, levelTitle, infotrons) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.infotronsRequired = infotrons;
    this.infotronsCollected = 0;
    this.redBombs = 0;
    this.levelNumber = levelNumer;
    this.levelTitle = levelTitle;
    this.timerSeconds = 0;
    this.timerMinutes = 0;
    this.timerHours = 0;
    this.timerOn = false;
  }

  get Time() {
    /* Return elapsed time since game started */
    let hh = this.timerHours > 9 ? this.timerHours : '0' + this.timerHours;
    let mm =
      this.timerMinutes > 9 ? this.timerMinutes : '0' + this.timerMinutes;
    let ss =
      this.timerSeconds > 9 ? this.timerSeconds : '0' + this.timerSeconds;
    return `${hh}:${mm}:${ss}`;
  }

  Update() {
    /* Update time */
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
    /* Reset scoreboard (infotrons collected and time) */
    this.infotronsCollected = 0;
    this.timerSeconds = 0;
    this.timerMinutes = 0;
    this.timerHours = 0;
    this.timerOn = false;
  }

  IncrementInfotronsCollected() {
    /* Increment infotrons collected */
    this.infotronsCollected++;
  }

  IncrementRedBombs() {
    /* Increment red disks collected */
    this.redBombs++;
  }

  DecrementRedBombs() {
    /* Decrement red disks */
    this.redBombs--;
  }

  SetNextLevel() {
    /* Set next level */
    this.levelNumber++;
  }

  StartTimer() {
    /* Start timer */
    this.timerOn = true;
  }

  StopTimer() {
    /* Stop timer */
    this.timerOn = false;
  }

  Draw() {
    /* Draw scoreboard */
    noStroke();
    textSize(MESSAGE_FONT_SIZE3);
    textFont(FONT_FAMILY);
    textStyle(NORMAL);
    fill(WHITE);
    text(
      `Level: ${this.levelNumber}\t--${this.levelTitle}--\t${INFOTRON_SYMBOL}: ${this.infotronsCollected}/${this.infotronsRequired}\tBombs: ${this.redBombs}\t Time: ${this.Time}`,
      this.x,
      this.y
    );
  }
}
