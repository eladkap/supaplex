class Game {
  constructor(level) {
    this.level = level;
    this.murphy = null;
    this.tileMap = level.TileMap;
    this.state = GameStates.GAME_READY;
    this.gravity = false;
    this.scoreBoard = null;
    this.grid = null;
    this.camera = null;
    this.enemies = [];
    this.yellowBombs = [];
    this.exitTiles = [];
    this.terminalTiles = [];
    this.destroyedTiles = [];
    this.isCompleted = false;
  }

  //#region Properties
  get Murphy() {
    return this.murphy;
  }

  get Tiles() {
    return this.tiles;
  }

  get State() {
    return this.state;
  }

  get Grid() {
    return this.grid;
  }
  //#endregion

  Setup() {
    this.setGrid(this.tileMap);
    this.SetMurphy();
    this.setTiles();
    this.setEnemies();
    this.setYellowBombs();
    this.setExitTiles();
    this.setTerminalTiles();
    this.SetScoreBoard();
    this.SetCamera();
    this.state = GameStates.GAME_READY;
  }

  Update() {
    this.camera.Update(this.murphy);
    for (let row = 0; row < this.grid.Rows; row++) {
      for (let col = 0; col < this.grid.Cols; col++) {
        let tile = this.grid.getTile(row, col);
        if (tile != null && tile != TILE_MURPHY) {
          try {
            tile.Update();
            tile.Draw(this.camera.pos);
            tile.Move();
          }
          catch (error) {
            console.log(error);
          } 
        }
      }
    }
    this.murphy.Draw(this.camera.pos);
    this.murphy.Update();
    this.scoreBoard.Draw();
    this.scoreBoard.Update();
  }

  Reset() {
    this.SetState(GameStates.GAME_PLAY);
    this.scoreBoard.Reset();
    this.scoreBoard.StopTimer();
    this.resetGrid();
    this.SetWallsColor(GRAY1);
    this.murphy.Stop();
    this.murphy.SetOriginalPosition();
    this.StopElements();
    // this.StopFallingElements([Zonk, Infotron]);
    // this.StopEnemies([SnikSnak, Electron]);
  }

  Resume() {
    this.SetState(GameStates.GAME_PLAY);
    this.scoreBoard.StartTimer();
    this.SetWallsColor(GRAY1);
    // this.MoveElements();
    // this.MoveFallingElements();
    // this.MoveEnemies();
  }

  SetState(state) {
    this.state = state;
  }

  SetScoreBoard() {
    this.scoreBoard = new ScoreBoard(
      SCORE_BOARD_POS_X,
      SCORE_BOARD_POS_Y,
      SCORE_BOARD_WIDTH,
      SCORE_BOARD_HEIGHT,
      this.level.Number,
      this.level.Title,
      this.level.InfotronsRequired
    );
  }

  setGrid(tileMap) {
    this.grid = new Grid(tileMap);
  }

  SetCamera() {
    this.camera = new Camera(MAP_POS_X, MAP_POS_Y, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  resetGrid() {
    this.grid.create(this.level.tileMap);
    this.setTiles();
    this.setEnemies();
    this.setYellowBombs();
    this.setExitTiles();
    this.setTerminalTiles();
    this.destroyedTiles = [];
    this.state = GameStates.GAME_READY;
  }

  SetMurphy() {
    for (let i = 0; i < this.grid.Rows; i++) {
      for (let j = 0; j < this.grid.Cols; j++) {
        let mapVal = this.grid.getTile(i, j);
        if (mapVal == TILE_MURPHY) {
          this.murphy = new Murphy(
            i,
            j,
            TILE_SIZE,
            null,
            TILE_EMOJI_DICT['murphy'],
            MURPHY_SPEED,
            this.grid,
            null
          );
          delete this.grid.matrix[i][j];
          this.grid.matrix[i][j] = null;
        }
      }
    }
  }

  setEnemies() {
    this.enemies = [];
    for (let i = 0; i < this.grid.Rows; i++) {
      for (let j = 0; j < this.grid.Cols; j++) {
        let tile = this.grid.getTile(i, j);
        if (tile instanceof Enemy) {
          this.enemies.push(tile);
        }
      }
    }
  }

  setYellowBombs() {
    this.yellowBombs = [];
    for (let i = 0; i < this.grid.Rows; i++) {
      for (let j = 0; j < this.grid.Cols; j++) {
        let tile = this.grid.getTile(i, j);
        if (tile instanceof YellowBomb) {
          this.yellowBombs.push(tile);
        }
      }
    }
  }

  setExitTiles() {
    this.exitTiles = [];
    for (let i = 0; i < this.grid.Rows; i++) {
      for (let j = 0; j < this.grid.Cols; j++) {
        let tile = this.grid.getTile(i, j);
        if (tile instanceof Exit) {
          this.exitTiles.push(tile);
        }
      }
    }
  }

  setTerminalTiles() {
    this.terminalTiles = [];
    for (let i = 0; i < this.grid.Rows; i++) {
      for (let j = 0; j < this.grid.Cols; j++) {
        let tile = this.grid.getTile(i, j);
        if (tile instanceof Terminal) {
          this.terminalTiles.push(tile);
        }
      }
    }
  }

  setTiles() {
    for (let i = 0; i < this.grid.Rows; i++) {
      for (let j = 0; j < this.grid.Cols; j++) {
        let mapVal = this.grid.getTile(i, j);
        if (mapVal == TILE_EMPTY) {
          this.grid.matrix[i][j] = null;
        } else if (mapVal == TILE_FRAME) {
          this.grid.matrix[i][j] = new Wall(
            i,
            j,
            TILE_SIZE,
            tileImages['wall'],
            TILE_EMOJI_DICT['wall']
          );
        } else if (mapVal == TILE_WALL) {
          this.grid.matrix[i][j] = new Chip(
            i,
            j,
            TILE_SIZE,
            tileImages['ram_chip'],
            TILE_EMOJI_DICT['frame']
          );
        } else if (mapVal == TILE_BASE) {
          this.grid.matrix[i][j] = new Base(
            i,
            j,
            TILE_SIZE,
            tileImages['base'],
            TILE_EMOJI_DICT['base']
          );
        } else if (mapVal == TILE_ZONK) {
          this.grid.matrix[i][j] = new Zonk(
            i,
            j,
            TILE_SIZE,
            tileImages['zonk'],
            TILE_EMOJI_DICT['zonk'],
            MURPHY_SPEED,
            this.grid,
            this.murphy
          );
        } else if (mapVal == TILE_INFOTRON) {
          this.grid.matrix[i][j] = new Infotron(
            i,
            j,
            TILE_SIZE,
            tileImages['infotron'],
            TILE_EMOJI_DICT['infotron'],
            MURPHY_SPEED,
            this.grid,
            this.murphy
          );
        } else if (mapVal == TILE_BUG) {
          this.grid.matrix[i][j] = new Bug(
            i,
            j,
            TILE_SIZE,
            tileImages['base'],
            TILE_EMOJI_DICT['base']
          );
        } else if (mapVal == TILE_EXIT) {
          this.grid.matrix[i][j] = new Exit(
            i,
            j,
            TILE_SIZE,
            tileImages['exit'],
            TILE_EMOJI_DICT['exit']
          );
        } else if (mapVal == TILE_TERMINAL) {
          this.grid.matrix[i][j] = new Terminal(
            i,
            j,
            TILE_SIZE,
            tileImages['terminal'],
            TILE_EMOJI_DICT['terminal']
          );
        } else if (mapVal == TILE_BOMB_ORANGE) {
          this.grid.matrix[i][j] = new OrangeBomb(
            i,
            j,
            TILE_SIZE,
            tileImages['orange_bomb'],
            TILE_EMOJI_DICT['orange_bomb'],
            MURPHY_SPEED,
            this.grid,
            this.murphy
          );
        } else if (mapVal == TILE_BOMB_YELLOW) {
          this.grid.matrix[i][j] = new YellowBomb(
            i,
            j,
            TILE_SIZE,
            tileImages['yellow_bomb'],
            TILE_EMOJI_DICT['yellow_bomb'],
            MURPHY_SPEED,
            this.grid,
            this.murphy
          );
        } else if (mapVal == TILE_BOMB_RED) {
          this.grid.matrix[i][j] = new RedBomb(
            i,
            j,
            TILE_SIZE,
            tileImages['red_bomb'],
            TILE_EMOJI_DICT['red_bomb']
          );
        } else if (mapVal == TILE_RIGHT_PORT) {
          this.grid.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['right_port'],
            TILE_EMOJI_DICT['right_port'],
            'right'
          );
        } else if (mapVal == TILE_LEFT_PORT) {
          this.grid.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['left_port'],
            TILE_EMOJI_DICT['left_port'],
            'left'
          );
        } else if (mapVal == TILE_UP_PORT) {
          this.grid.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['up_port'],
            TILE_EMOJI_DICT['up_port'],
            'up'
          );
        } else if (mapVal == TILE_DOWN_PORT) {
          this.grid.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['down_port'],
            TILE_EMOJI_DICT['down_port'],
            'down'
          );
        } else if (mapVal == TILE_VER_PORT) {
          this.grid.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['vertical_port'],
            TILE_EMOJI_DICT['vertical_port'],
            'dual_v'
          );
        } else if (mapVal == TILE_HOR_PORT) {
          this.grid.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['horizontal_port'],
            TILE_EMOJI_DICT['horizontal_port'],
            'dual_h'
          );
        } else if (mapVal == TILE_CROSS_PORT) {
          this.grid.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['cross_port'],
            TILE_EMOJI_DICT['cross_port'],
            'cross'
          );
        } else if (mapVal == TILE_SNIKSNAK) {
          this.grid.matrix[i][j] = new SnikSnak(
            i,
            j,
            TILE_SIZE,
            null,
            TILE_EMOJI_DICT['sniksnak'],
            MURPHY_SPEED,
            this.grid,
            this.murphy
          );
        } else if (mapVal == TILE_ELECTRON) {
          this.grid.matrix[i][j] = new Electron(
            i,
            j,
            TILE_SIZE,
            null,
            TILE_EMOJI_DICT['electron'],
            MURPHY_SPEED,
            this.grid,
            this.murphy
          );
        }
      }
    }
  }

  SetWallsColor(color) {
    for (let row = 0; row < this.grid.Rows; row++) {
      for (let col = 0; col < this.grid.Cols; col++) {
        let tile = this.grid.getTile(row, col);
        if (tile instanceof Wall) {
          // tile.SetForecolor(color);
        }
      }
    }
  }

  MoveElements() {
    for (let row = 0; row < this.grid.Rows; row++) {
      for (let col = 0; col < this.grid.Cols; col++) {
        let tile = this.grid.getTile(row, col);
        if (tile != null) {
          tile.Move();
        }
      }
    }
  }

  StopElements() {
    for (let row = 0; row < this.grid.Rows; row++) {
      for (let col = 0; col < this.grid.Cols; col++) {
        let tile = this.grid.getTile(row, col);
        if (tile != null && tile != TILE_MURPHY) {
          tile.Stop();
        }
      }
    }
  }

  MoveFallingElements() {
    let types = [Zonk, Infotron];
    for (let row = 0; row < this.grid.Rows; row++) {
      for (let col = 0; col < this.grid.Cols; col++) {
        let tile = this.grid.getTile(row, col);
        for (let type of types) {
          if (tile instanceof type) {
            tile.GoDown();
          }
        }
      }
    }
  }

  MoveEnemies() {
    let types = [SnikSnak, Electron];
    for (let row = 0; row < this.grid.Rows; row++) {
      for (let col = 0; col < this.grid.Cols; col++) {
        let tile = this.grid.getTile(row, col);
        for (let type of types) {
          if (tile instanceof type) {
            tile.SetRandomDirection();
          }
        }
      }
    }
  }

  StopFallingElements(types) {
    for (let row = 0; row < this.grid.Rows; row++) {
      for (let col = 0; col < this.grid.Cols; col++) {
        let tile = this.grid.getTile(row, col);
        for (let type of types) {
          if (tile instanceof type) {
            tile.Stop();
          }
        }
      }
    }
  }

  StopEnemies(types) {
    for (let row = 0; row < this.grid.Rows; row++) {
      for (let col = 0; col < this.grid.Cols; col++) {
        let tile = this.grid.getTile(row, col);
        for (let type of types) {
          if (tile instanceof type) {
            tile.SetOriginalPosition();
            tile.Stop();
          }
        }
      }
    }
  }

  HandleTilePushHorizotalOnly(tile, direction) {
    if (direction == 'U' || direction == 'D') {
      return;
    }
    if (direction == 'L' && this.murphy.CanPushLeft()) {
      this.MurphyPushLeft(tile);
      return;
    }
    if (direction == 'R' && this.murphy.CanPushRight()) {
      this.MurphyPushRight(tile);
      return;
    }
  }

  HandleTilePushHorizotalOrVertical(tile, direction) {
    if (direction == 'U' && this.murphy.CanPushUp()) {
      this.MurphyPushUp(tile);
      return;
    }
    if (direction == 'D' && this.murphy.CanPushDown()) {
      this.MurphyPushDown(tile);
      return;
    }
    if (direction == 'L' && this.murphy.CanPushLeft()) {
      this.MurphyPushLeft(tile);
      return;
    }
    if (direction == 'R' && this.murphy.CanPushRight()) {
      this.MurphyPushRight(tile);
      return;
    }
  }

  HandlePort(tile, direction) {
    if (direction == 'L' && this.murphy.CanPassLeft()) {
      this.MurphyPassLeft(tile);
      return;
    }
    if (direction == 'R' && this.murphy.CanPassRight()) {
      this.MurphyPassRight(tile);
      return;
    }
    if (direction == 'U' && this.murphy.CanPassUp()) {
      this.MurphyPassUp(tile);
      return;
    }
    if (direction == 'D' && this.murphy.CanPassDown()) {
      this.MurphyPassDown(tile);
      return;
    }
  }

  /**
   * Check Murphy interaction with static/pushable tiles - wall, ram-chip, port, zonk, yellow bomb, orange bomb
   * 
   * @param {*} tile 
   * @param {*} direction 
   * @returns 
   */
  interactWithTile(tile, direction) {
    // empty tile
    if (tile == null) {
      this.murphy.GotoDirection(direction);
      return;
    }
    if (tile instanceof Wall || tile instanceof Chip || tile instanceof Exit || tile instanceof Terminal) {
      return;
    }
    if (tile instanceof Port) {
      this.HandlePort(tile, direction);
      return;
    }
    if (tile instanceof Zonk) {
      this.HandleTilePushHorizotalOnly(tile, direction);
      return;
    }
    if (tile instanceof OrangeBomb) {
      console.log('orange disk');
      this.HandleTilePushHorizotalOnly(tile, direction);
      return;
    }
    if (tile instanceof YellowBomb) {
      this.HandleTilePushHorizotalOrVertical(tile, direction);
      return;
    } 
    this.murphy.GotoDirection(direction);
  }

  /**
   * 
   * @returns true/false if Murphy collides enemy
   */
  collideEnemy() {
    for (let enemy of this.enemies) {
      if (Physics.areCollide(this.murphy, enemy)) {
        console.log('Busted by:');
        console.log(enemy);
        return true;
      }
    }
    return false;
  }

  updateDestroyedTiles() {
    for (let destroyedTile of this.destroyedTiles) {
      // delete destroyedTile;
    }
  }

  ExitLevel() {
    console.log('Exit level');
    this.murphy.exit();
    this.isCompleted = true;
  }

  isMurphyNearTile(tile) {
    return Utils.manhattanDistance(this.murphy.Row, this.murphy.Col, tile.Row, tile.Col) <= 1;
  }

  isMurphyNearExitTile() {
    for (let exitTile of this.exitTiles) {
      if (this.isMurphyNearTile(exitTile)) {
        return true;
      }
    }
    return false;
  }

  isMurphyNearTerminalTile() {
    for (let terminalTile of this.terminalTiles) {
      if (this.isMurphyNearTile(terminalTile)) {
        return true;
      }
    }
    return false;
  }

  tryExitLevel() {
    if (this.isMurphyNearExitTile() && this.scoreBoard.requiredInfotrons <= 0) {
      this.ExitLevel();
    }
  }

  detonateYellowBombs() {
    if (!this.isMurphyNearTerminalTile()) {
      return;
    }
    if (this.yellowBombs.length == 0) {
      return;
    }
    console.log('detonate yellow bombs');
    for (let yellowBomb of this.yellowBombs) {
      yellowBomb.destroy();
      // this.destroyedTiles.push(yellowBomb);
      // let explosion = new Explosion(yellowBomb.row, yellowBomb.col, yellowBomb.width, yellowBomb.image, TILE_EMOJI_DICT['explosion'])
      // let row = yellowBomb.row;
      // let col = yellowBomb.col;
      // this.grid.SetValue(row, col, explosion);
    }
    this.yellowBombs = [];
  }

  updateExitTilesToGreen() {
    for (let exitTile of this.exitTiles) {
      exitTile.image = tileImages['exit_green'];
    }
  }

  decrementRequiredInfotrons() {
    this.scoreBoard.decrementRequiredInfotrons();
    if (this.scoreBoard.requiredInfotrons <= 0) {
      this.updateExitTilesToGreen();
    }
  }

  /**
   * 
   * @returns true/false if Murphy collected tile without destroyed
   */
  collectTile() {
    let tile = this.grid.matrix[this.murphy.Row][this.murphy.Col];
    if (tile == null) {
      return true;
    }
    if (tile instanceof Base) {
      delete this.grid.matrix[tile.Row][tile.Col]
      this.grid.matrix[tile.Row][tile.Col] = null;
      return true;
    }
    if (tile instanceof Infotron) {
      delete this.grid.matrix[tile.Row][tile.Col]
      this.grid.matrix[tile.Row][tile.Col] = null;
      this.decrementRequiredInfotrons();
      return true;
    }
    if (tile instanceof Bug) {
      if (!tile.Activated) {
        delete this.grid.matrix[tile.Row][tile.Col]
        this.grid.matrix[tile.Row][tile.Col] = null;
        return true;
      }
      else {
        console.log('Busted by:');
        console.log(tile);
        return false;
      }
    }
    if (tile instanceof RedBomb) {
      delete this.grid.matrix[tile.Row][tile.Col]
      this.grid.matrix[tile.Row][tile.Col] = null;
      this.scoreBoard.IncrementRedBombs();
      return true;
    }
    return true;
  }

  /**
   * Move Murphy to a tile given direction
   * 
   * @param {string} direction direction
   */
  moveMurphyToDirection(direction) {
    let targetTile = null;
    if (direction == 'R') {
      targetTile = this.grid.getTile(this.murphy.Row, this.murphy.Col + 1);
    }
    else if (direction == 'L') {
      targetTile = this.grid.getTile(this.murphy.Row, this.murphy.Col - 1);
    }
    else if (direction == 'U') {
      targetTile = this.grid.getTile(this.murphy.Row - 1, this.murphy.Col);
    }
    else if (direction == 'D') {
      targetTile = this.grid.getTile(this.murphy.Row + 1, this.murphy.Col);
    }
    this.interactWithTile(targetTile, direction);
  }

  murphyCollectTileWithoutEntering(direction) {
    let targetLocation = this.murphy.Collect(direction);
    if (targetLocation != null) {
      let row = targetLocation[0];
      let col = targetLocation[1];
      let tile = this.grid.getTile(row, col);
      if (tile instanceof Base) {
        if (tile.Row == targetLocation[0] && tile.Col == targetLocation[1]) {
          this.grid.SetValue(targetLocation[0], targetLocation[1], null);
          return;
        }
      }
      else if (tile instanceof Bug) {
        if (tile.Activated) {
          Busted();
        }
        else {
          this.grid.SetValue(targetLocation[0], targetLocation[1], null);
          return;
        }
      }
      else if (tile instanceof Infotron) {
        if (
          tile.Row == targetLocation[0] &&
          tile.Col == targetLocation[1] && !tile.isLerping
        ) {
          this.grid.SetValue(targetLocation[0], targetLocation[1], null);
          this.decrementRequiredInfotrons();
        }
      }
      else if (tile instanceof RedBomb) {
        if (tile.Row == targetLocation[0] && tile.Col == targetLocation[1]) {
          this.grid.SetValue(targetLocation[0], targetLocation[1], null);
          this.scoreBoard.IncrementRedBombs();
        }
      }
    }
  }

  MurphyPushLeft(tile) {
    if (
      tile.pos.y == this.murphy.pos.y &&
      this.murphy.pos.x - tile.pos.x == TILE_SIZE
    ) {
      tile.GoLeft();
      this.murphy.GoLeft();
      return;
    }
  }

  MurphyPushRight(tile) {
    if (
      tile.pos.y == this.murphy.pos.y &&
      tile.pos.x - this.murphy.pos.x == TILE_SIZE
    ) {
      tile.GoRight();
      this.murphy.GoRight();
      return;
    }
  }

  MurphyPushUp(tile) {
    if (
      tile.pos.x == this.murphy.pos.x &&
      this.murphy.pos.y - tile.pos.y == TILE_SIZE
    ) {
      tile.GoUp();
      this.murphy.GoUp();
      return;
    }
  }

  MurphyPushDown(tile) {
    if (
      tile.pos.x == this.murphy.pos.x &&
      tile.pos.y - this.murphy.pos.y == TILE_SIZE
    ) {
      tile.GoDown();
      this.murphy.GoDown();
      return;
    }
  }

  MurphyPassLeft(tile) {
    if (
      tile.pos.y == this.murphy.pos.y &&
      this.murphy.pos.x - tile.pos.x == TILE_SIZE
    ) {
      this.murphy.GoLeft();
      this.murphy.GoLeft();
      return;
    }
  }

  MurphyPassRight(tile) {
    if (
      tile.pos.y == this.murphy.pos.y &&
      tile.pos.x - this.murphy.pos.x == TILE_SIZE
    ) {
      this.murphy.GoRight();
      this.murphy.GoRight();
      return;
    }
  }

  MurphyPassUp(tile) {
    if (
      tile.pos.x == this.murphy.pos.x &&
      this.murphy.pos.y - tile.pos.y == TILE_SIZE
    ) {
      this.murphy.GoUp();
      this.murphy.GoUp();
      return;
    }
  }

  MurphyPassDown(tile) {
    if (
      tile.pos.x == this.murphy.pos.x &&
      tile.pos.y - this.murphy.pos.y == TILE_SIZE
    ) {
      this.murphy.GoDown();
      this.murphy.GoDown();
      return;
    }
  }

  // for debugging
  CountElements(type) {
    let count = 0;
    for (let row = 0; row < this.grid.Rows; row++) {
      for (let col = 0; col < this.grid.Cols; col++) {
        let tile = this.grid.getTile(row, col);
        if (tile instanceof type) {
          count++;
        }
      }
    }
    return count;
  }

  // for debugging
  GetTilesOf(type) {
    let tiles = [];
    for (let row = 0; row < this.grid.Rows; row++) {
      for (let col = 0; col < this.grid.Cols; col++) {
        let tile = this.grid.getTile(row, col);
        if (tile instanceof type) {
          tiles.push(tile);
        }
      }
    }
    return tiles;
  }
}
