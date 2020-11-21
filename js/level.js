class Level {
  constructor(number, title, tileMap, infotronsRequired, gravity) {
    /*
    number: level number
    title: level number
    tileMap: tile map
    infotronsRequired: required infotrons to complete the level
    gravity: true if there is gravity or false otherwise
     */
    this.number = number;
    this.title = title;
    this.tileMap = tileMap;
    this.infotronsRequired = infotronsRequired;
    this.gravity = gravity;
  }

  get Number() {
    /* Return level number */
    return this.number;
  }

  get Title() {
    /* Return level title */
    return this.title;
  }

  get TileMap() {
    /* Return level tile map */
    return this.tileMap;
  }

  get InfotronsRequired() {
    /* Return required infotrons */
    return this.infotronsRequired;
  }
}
