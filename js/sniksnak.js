class SnikSnak extends Entity {
  constructor(row, col, width, symbol, speed, grid, murphy) {
    super(row, col, width, symbol, speed, grid, murphy);
  }

  SetRandomDirection() {
    let possibleDirections = this.GetPossibleDirections();
    let chosenDirection = random(possibleDirections);
    this.GotoDirection(chosenDirection);
  }

  GetPossibleDirections() {
    let possibleDirections = [];
    if (this.CanGoLeft()) {
      possibleDirections.push('L');
    }
    if (this.CanGoUp()) {
      possibleDirections.push('U');
    }
    if (this.CanGoRight()) {
      possibleDirections.push('R');
    }
    if (this.CanGoDown()) {
      possibleDirections.push('D');
    }
    return possibleDirections;
  }

  Move() {
    var currentDirection = null;
    var oppositeDirection = null;
    if (this.direction.x < 0) {
      currentDirection = 'L';
      oppositeDirection = 'R';
    }
    if (this.direction.x > 0) {
      currentDirection = 'R';
      oppositeDirection = 'L';
    }
    if (this.direction.y < 0) {
      currentDirection = 'U';
      oppositeDirection = 'D';
    }
    if (this.direction.y > 0) {
      currentDirection = 'D';
      oppositeDirection = 'U';
    }
    let possibleDirections = this.GetPossibleDirections();

    let chosenDirection;
    if (possibleDirections.length == 1) {
      this.GotoDirection(possibleDirections[0]);
      chosenDirection = possibleDirections[0];
    } else {
      let index = possibleDirections.indexOf(oppositeDirection);
      possibleDirections.splice(index, 1);
      let chosenDirection = possibleDirections[0];
      this.GotoDirection(chosenDirection);
    }
    this.isLerping = true;
  }
}
