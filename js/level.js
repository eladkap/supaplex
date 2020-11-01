class Level {
  constructor(number, title, tileMap, infotronsNeeded, gravity) {
    this.number = number;
    this.title = title;
    this.tileMap = tileMap;
    this.infotronsNeeded = infotronsNeeded;
    this.gravity = gravity;
  }

  get Number() {
    return this.number;
  }

  get Title() {
    return this.title;
  }

  get TileMap() {
    return this.tileMap;
  }

  get InfotronsNeeded() {
    return this.infotronsNeeded;
  }
}
