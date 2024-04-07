class ScoreBoard {
 /**
  * C'tor
  * @param {number} x scoreboard top-left x position in pixels
  * @param {number} y scoreboard top-left y position in pixels
  * @param {number} w scoreboard width in pixels
  * @param {number} h scoreboard height in pixels
  * @param {number} levelNumer level number
  * @param {string} levelTitle level title
  * @param {number} infotrons required infotrons
  */
  constructor(x, y, w, h, levelNumer, levelTitle, infotrons) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.infotrons = infotrons;
    this.requiredInfotrons = infotrons;
    this.redBombs = 0;
    this.levelNumber = '0'.repeat(3-String(levelNumer).length)+String(levelNumer)
    this.levelTitle = levelTitle;
    this.timerSeconds = 0;
    this.timerMinutes = 0;
    this.timerHours = 0;
    this.timerOn = false;
  }

  /**
   * Return elapsed time since game started
   */
  get Time() {
    let hh = this.timerHours > 9 ? this.timerHours : '0' + this.timerHours;
    let mm =
      this.timerMinutes > 9 ? this.timerMinutes : '0' + this.timerMinutes;
    let ss =
      this.timerSeconds > 9 ? this.timerSeconds : '0' + this.timerSeconds;
    return `${hh}:${mm}:${ss}`;
  }

  /**
   * Update time
   */
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

  /**
   * Reset scoreboard
   */
  Reset() {
    this.requiredInfotrons = this.infotrons;
    this.timerSeconds = 0;
    this.timerMinutes = 0;
    this.timerHours = 0;
    this.timerOn = false;
  }

  decrementRequiredInfotrons() {
    this.requiredInfotrons = Math.max(0, this.requiredInfotrons - 1);
  }

  IncrementRedBombs() {
    this.redBombs++;
  }

  DecrementRedBombs() {
    this.redBombs--;
  }

  SetNextLevel() {
    this.levelNumber++;
  }

  StartTimer() {
    this.timerOn = true;
  }

  StopTimer() {
    this.timerOn = false;
  }

  /**
   * Draw scoreboard
   */
  Draw() {
    noStroke();
    textSize(MESSAGE_FONT_SIZE3);
    textFont(FONT_FAMILY);
    textStyle(NORMAL);
    fill(WHITE);
    text(
      `Level: ${this.levelNumber}\t--${this.levelTitle}--\t${TILE_EMOJI_DICT['infotron']}: ${this.requiredInfotrons}\tBombs: ${this.redBombs}\t Time: ${this.Time}`,
      this.x,
      this.y
    );
  }
}
