/*
Entity represents moving object
*/
class Entity extends Tile {
  constructor(row, col, width, color, symbol, speed, maze, tileType) {
    super(row, col, width, color, symbol);
    this.prevRow = null;
    this.prevCol = null;
    this.originalRow = row;
    this.originalCol = col;
    this.speed = speed;
    this.direction = createVector(0, 0);
    this.maze = maze;
    this.tileType = tileType;
    this.lerpingCount = 0;
    this.isLerping = false;
    this.vulnerable = false;
    this.lerpUnit = LERP_UNIT_NORMAL;
    this.lerpMode = LERP_MODE_NORMAL;
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
  Draw() {}

  ChangeDirection() {}

  SetOriginalPosition() {
    this.SetPosition(this.originalRow, this.originalCol);
  }

  ResetMovement() {
    this.lerpingCount = 0;
    this.isLerping = false;
    if (this.lerpMode == LERP_MODE_SLOW) {
      this.lerpUnit = LERP_UNIT_SLOW;
    } else {
      this.lerpUnit = LERP_UNIT_NORMAL;
    }
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
      this.col > 0 &&
      this.maze.GetValue(this.row, this.col - 1) == TILE_EMPTY &&
      !this.isLerping
    );
  }

  CanGoRight() {
    return (
      this.col + 1 < this.maze.Cols &&
      this.maze.GetValue(this.row, this.col + 1) == TILE_EMPTY &&
      !this.isLerping
    );
  }

  CanGoUp() {
    return (
      this.row > 0 &&
      this.maze.GetValue(this.row - 1, this.col) == TILE_EMPTY &&
      !this.isLerping
    );
  }

  CanGoDown() {
    return (
      this.row > 0 &&
      this.maze.GetValue(this.row + 1, this.col) == TILE_EMPTY &&
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
      this.maze.SetValue(this.row, this.col, TILE_EMPTY);
      this.prevCol = this.col;
      this.col--;
      this.maze.SetValue(this.row, this.col, this.tileType);
    }
  }

  GoRight() {
    if (this.CanGoRight()) {
      this.direction.set(1, 0);
      this.isLerping = true;
      this.maze.SetValue(this.row, this.col, TILE_EMPTY);
      this.prevCol = this.col;
      this.col++;
      this.maze.SetValue(this.row, this.col, this.tileType);
    }
  }

  GoUp() {
    if (this.CanGoUp()) {
      this.direction.set(0, -1);
      this.isLerping = true;
      this.maze.SetValue(this.row, this.col, TILE_EMPTY);
      this.prevRow = this.row;
      this.row--;
      this.maze.SetValue(this.row, this.col, this.tileType);
    }
  }

  GoDown() {
    if (this.CanGoDown()) {
      this.direction.set(0, 1);
      this.isLerping = true;
      this.maze.SetValue(this.row, this.col, TILE_EMPTY);
      this.prevRow = this.row;
      this.row++;
      this.maze.SetValue(this.row, this.col, this.tileType);
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
