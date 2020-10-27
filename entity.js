/*
Entity represents moving object
*/
class Entity extends Tile {
  constructor(
    row,
    col,
    width,
    forecolor,
    backcolor,
    symbol,
    speed,
    map,
    tileType
  ) {
    super(row, col, width, forecolor, backcolor, symbol);
    this.prevRow = null;
    this.prevCol = null;
    this.originalRow = row;
    this.originalCol = col;
    this.speed = speed;
    this.direction = createVector(0, 0);
    this.map = map;
    // this.map = this.NormalizeMap();
    this.tileType = tileType;
    this.lerpingCount = 0;
    this.isLerping = false;
    this.vulnerable = false;
    this.lerpUnit = lerpSpeed;
  }

  //#region Properties
  get Speed() {
    return this.speed;
  }

  get Direction() {
    return this.direction;
  }

  get Vulnerable() {
    return this.vulnerable;
  }
  //#endregion

  //#region Methods
  Draw(refPos) {
    if (this.visible) {
      noStroke();
      fill(this.forecolor);
      textSize(this.width * 0.9);
      text(
        this.symbol,
        this.pos.x + refPos.x - this.width * 0.1,
        this.pos.y + refPos.y + this.width * 0.8
      );
    }
  }

  NormalizeMap() {
    this.map = this.map.Copy().Normalize();
  }

  ChangeDirection() {}

  SetOriginalPosition() {
    this.SetPosition(this.originalRow, this.originalCol);
  }

  ResetMovement() {
    this.lerpingCount = 0;
    this.isLerping = false;
    this.lerpUnit = lerpSpeed;
    this.ChangeDirection();
  }

  Update() {
    if (this.isLerping) {
      let x = lerp(
        this.pos.x,
        this.pos.x + this.direction.x * this.speed,
        this.lerpUnit
      );
      let y = lerp(
        this.pos.y,
        this.pos.y + this.direction.y * this.speed,
        this.lerpUnit
      );
      this.pos.set(x, y);
      this.lerpingCount++;
      if (this.lerpingCount >= 1 / this.lerpUnit) {
        this.ResetMovement();
      }
    }
  }

  SetVulnerable(value) {
    this.vulnerable = value;
  }

  SetDirection(directionX, directionY) {
    this.direction.set(directionX, directionY);
  }

  CanGoLeft() {
    return (
      this.col - 1 > 0 &&
      this.map.GetValue(this.row, this.col - 1) == null &&
      !this.isLerping
    );
  }

  CanGoRight() {
    return (
      this.col + 1 < this.map.Cols - 1 &&
      this.map.GetValue(this.row, this.col + 1) == null &&
      !this.isLerping
    );
  }

  CanGoUp() {
    return (
      this.row - 1 > 0 &&
      this.map.GetValue(this.row - 1, this.col) == null &&
      !this.isLerping
    );
  }

  CanGoDown() {
    return (
      this.row + 1 < this.map.Rows - 1 &&
      this.map.GetValue(this.row + 1, this.col) == null &&
      !this.isLerping
    );
  }

  GotoDirection(direction) {
    switch (direction) {
      case 'L':
        this.GoLeft();
        break;
      case 'R':
        this.GoRight();
        break;
      case 'U':
        this.GoUp();
        break;
      default:
        this.GoDown();
        break;
    }
  }

  GoLeft() {
    if (this.CanGoLeft()) {
      this.direction.set(-1, 0);
      this.isLerping = true;
      this.map.SetValue(this.row, this.col, null);
      this.col--;
      this.map.SetValue(this.row, this.col, this);
    }
  }

  GoRight() {
    if (this.CanGoRight()) {
      this.direction.set(1, 0);
      this.isLerping = true;
      this.map.SetValue(this.row, this.col, null);
      this.col++;
      this.map.SetValue(this.row, this.col, this);
    }
  }

  GoUp() {
    if (this.CanGoUp()) {
      this.direction.set(0, -1);
      this.isLerping = true;
      this.map.SetValue(this.row, this.col, null);
      this.row--;
      this.map.SetValue(this.row, this.col, this);
    }
  }

  GoDown() {
    if (this.CanGoDown()) {
      this.direction.set(0, 1);
      this.isLerping = true;
      this.map.SetValue(this.row, this.col, null);
      this.row++;
      this.map.SetValue(this.row, this.col, this);
    }
  }

  Stop() {
    this.SetDirection(0, 0);
    this.lerpingCount = 0;
  }

  IsFalling() {
    return this.isLerping;
  }

  Collide(entity) {
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    return d < (this.radius + entity.radius) / 2;
  }
  //#endregion
}
