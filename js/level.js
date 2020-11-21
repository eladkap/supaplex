class Level {
  constructor(number, title, tileMap, infotronsRequired, gravity) {
    this.number = number;
    this.title = title;
    this.tileMap = tileMap;
    this.infotronsRequired = infotronsRequired;
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

  get InfotronsRequired() {
    return this.infotronsRequired;
  }
}
