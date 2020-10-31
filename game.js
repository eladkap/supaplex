class Game {
  constructor(level) {
    this.level = level;
    this.murphy = null;
    this.tileMap = level.TileMap;
    this.state = GAME_READY;
    this.gravity = false;
    this.stats = null;
    this.map = null;
    this.cam = null;
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

  get Map() {
    return this.map;
  }

  //#endregion

  Setup() {
    this.SetMap(this.tileMap);
    this.SetTiles();
    this.SetStats();
    this.SetCamera();
    this.state = GAME_READY;
  }

  Update() {
    this.cam.Update(this.murphy);
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        if (tile != null) {
          tile.Draw(this.cam.pos);
          tile.Update();
        }
      }
    }
    this.murphy.Draw(this.cam.pos);
    this.murphy.Update();
    this.stats.Draw();
    this.stats.Update();

    this.MoveElements();
    // this.MoveFallingElements();
    // this.MoveEnemies();
  }

  Reset() {
    this.SetState(GAME_PLAY);
    this.stats.Reset();
    this.stats.StopTimer();
    this.ResetMap();
    this.SetWallsColor(GRAY1);
    this.murphy.Stop();
    this.murphy.SetOriginalPosition();
    this.StopElements();
    // this.StopFallingElements([Zonk, Infotron]);
    // this.StopEnemies([SnikSnak, Electron]);
  }

  Resume() {
    this.SetState(GAME_PLAY);
    this.stats.StartTimer();
    this.SetWallsColor(GRAY1);
    // this.MoveElements();
    // this.MoveFallingElements();
    // this.MoveEnemies();
  }

  SetState(state) {
    this.state = state;
  }

  SetStats() {
    this.stats = new Stats(
      STATS_POS_X,
      STATS_POS_Y,
      STATS_WIDTH,
      STATS_HEIGHT,
      this.level.Number,
      this.level.Title,
      this.level.InfotronsNeeded
    );
  }

  SetMap(tileMap) {
    this.map = new Map(tileMap);
  }

  SetCamera() {
    this.cam = new Camera(MAP_POS_X, MAP_POS_Y, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  ResetMap() {
    this.map.Create(this.level.tileMap);
    this.SetTiles();
    this.state = GAME_READY;
  }

  SetTiles() {
    for (let i = 0; i < this.map.Rows; i++) {
      for (let j = 0; j < this.map.Cols; j++) {
        let mapVal = this.map.GetValue(i, j);
        if (mapVal == TILE_EMPTY) {
          this.map.matrix[i][j] = null;
        } else if (mapVal == TILE_FRAME) {
          this.map.matrix[i][j] = new Wall(
            i,
            j,
            TILE_SIZE,
            tileImages['wall'],
            WALL_SYMBOL
          );
        } else if (mapVal == TILE_WALL) {
          this.map.matrix[i][j] = new Chip(
            i,
            j,
            TILE_SIZE,
            tileImages['ram_chip'],
            FRAME_SYMBOL
          );
        } else if (mapVal == TILE_BASE) {
          this.map.matrix[i][j] = new Base(
            i,
            j,
            TILE_SIZE,
            tileImages['base'],
            BASE_SYMBOL
          );
        } else if (mapVal == TILE_ZONK) {
          this.map.matrix[i][j] = new Zonk(
            i,
            j,
            TILE_SIZE,
            tileImages['zonk'],
            ZONK_SYMBOL,
            MURPHY_SPEED,
            this.map,
            TILE_ZONK
          );
        } else if (mapVal == TILE_INFOTRON) {
          this.map.matrix[i][j] = new Infotron(
            i,
            j,
            TILE_SIZE,
            tileImages['infotron'],
            INFOTRON_SYMBOL,
            MURPHY_SPEED,
            this.map,
            TILE_INFOTRON
          );
        } else if (mapVal == TILE_BUG) {
          this.map.matrix[i][j] = new Bug(
            i,
            j,
            TILE_SIZE,
            tileImages['bug'],
            BUG_SYMBOL
          );
        } else if (mapVal == TILE_EXIT) {
          this.map.matrix[i][j] = new Exit(
            i,
            j,
            TILE_SIZE,
            tileImages['exit'],
            EXIT_SYMBOL
          );
        } else if (mapVal == TILE_TERMINAL) {
          this.map.matrix[i][j] = new Terminal(
            i,
            j,
            TILE_SIZE,
            tileImages['terminal'],
            TERMINAL_SYMBOL
          );
        } else if (mapVal == TILE_RIGHT_PORT) {
          this.map.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['right_port'],
            '*',
            'right'
          );
        } else if (mapVal == TILE_LEFT_PORT) {
          this.map.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['left_port'],
            '*',
            'left'
          );
        } else if (mapVal == TILE_UP_PORT) {
          this.map.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['up_port'],
            '*',
            'up'
          );
        } else if (mapVal == TILE_DOWN_PORT) {
          this.map.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['down_port'],
            '*',
            'down'
          );
        } else if (mapVal == TILE_VER_PORT) {
          this.map.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['vertical_port'],
            '*',
            'dual_v'
          );
        } else if (mapVal == TILE_HOR_PORT) {
          this.map.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['horizontal_port'],
            '*',
            'dual_h'
          );
        } else if (mapVal == TILE_CROSS_PORT) {
          this.map.matrix[i][j] = new Port(
            i,
            j,
            TILE_SIZE,
            tileImages['cross_port'],
            '*',
            'cross'
          );
        } else if (mapVal == TILE_SNIKSNAK) {
          this.map.matrix[i][j] = new SnikSnak(
            i,
            j,
            TILE_SIZE,
            null,
            SNIKSNAK_SYMBOL,
            MURPHY_SPEED,
            this.map,
            TILE_SNIKSNAK
          );
        } else if (mapVal == TILE_ELECTRON) {
          this.map.matrix[i][j] = new Electron(
            i,
            j,
            TILE_SIZE,
            null,
            ELECTRON_SYMBOL,
            MURPHY_SPEED,
            this.map,
            TILE_ELECTRON
          );
        } else if (mapVal == TILE_MURPHY) {
          this.murphy = new Murphy(
            i,
            j,
            TILE_SIZE,
            null,
            MURPHY_SYMBOL,
            MURPHY_SPEED,
            this.map,
            TILE_MURPHY,
            MAX_LIVES
          );
          this.map.matrix[i][j] = null;
        }
      }
    }
  }

  CheckMurphyEatBase() {
    for (let i = this.tiles.length - 1; i >= 0; i--) {
      if (this.murphy.Collide(this.tiles[i])) {
        if (this.tiles[i] instanceof Base) {
          let base = this.tiles.splice(i, 1)[0];
        }
      }
    }
  }

  CheckMurphyEatInfotron() {
    for (let i = this.tiles.length - 1; i >= 0; i--) {
      if (this.murphy.Collide(this.tiles[i])) {
        if (this.tiles[i] instanceof Infotron) {
          let infotron = this.tiles.splice(i, 1)[0];
          // todo: instad of removing the tile from tiles, set maze[r][c] to null/undefined
          this.stats.DecrementInfotrons();
        }
      }
    }
  }

  CheckMurphyCollidesBug() {
    // Return true if busted or not
    for (let i = this.tiles.length - 1; i >= 0; i--) {
      if (this.murphy.Collide(this.tiles[i])) {
        if (this.tiles[i] instanceof Bug && this.tiles[i].Activated) {
          console.log('bug!');
          return true;
        } else {
          let bug = this.tiles.splice(i, 1)[0];
        }
      }
    }
    return false;
  }

  CheckMurphyCollidesExit() {
    for (let i = this.tiles.length - 1; i >= 0; i--) {
      if (this.murphy.Collide(this.tiles[i])) {
        if (this.tiles[i] instanceof Exit) {
          console.log('Exit!');
          return;
        }
      }
    }
  }

  SetWallsColor(color) {
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        if (tile instanceof Wall) {
          // tile.SetForecolor(color);
        }
      }
    }
  }

  MoveElements() {
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        if (tile != null) {
          tile.Move();
        }
      }
    }
  }

  StopElements() {
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        if (tile != null) {
          tile.Stop();
        }
      }
    }
  }

  MoveFallingElements() {
    let types = [Zonk, Infotron];
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
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
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        for (let type of types) {
          if (tile instanceof type) {
            tile.SetRandomDirection();
          }
        }
      }
    }
  }

  StopFallingElements(types) {
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        for (let type of types) {
          if (tile instanceof type) {
            tile.Stop();
          }
        }
      }
    }
  }

  StopEnemies(types) {
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        for (let type of types) {
          if (tile instanceof type) {
            tile.SetOriginalPosition();
            tile.Stop();
          }
        }
      }
    }
  }

  HandleZonk(tile, direction) {
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

  HandlePort(tile, direction) {
    if (direction == 'L' && this.murphy.CanPassLeft()) {
      console.log('pass');
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

  InteractWithTile(tile, direction) {
    if (tile == null) {
      this.murphy.GotoDirection(direction);
      return;
    }
    let className = tile.constructor.name;
    // wall
    if (className == 'Wall') {
      return;
    }
    // Zonk
    if (className == 'Zonk') {
      this.HandleZonk(tile, direction);
      return;
    }
    //Port
    if (className == 'Port') {
      this.HandlePort(tile, direction);
      return;
    }
    this.murphy.GotoDirection(direction);
  }

  CollideEnemy() {
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        if (tile == null) {
          continue;
        }
        if (this.murphy.Collide(tile)) {
          if (tile instanceof SnikSnak || tile instanceof Electron) {
            return true;
          }
          if (tile instanceof Bug && tile.Activated) {
            if (tile.Activated) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  /* Check if murphy collides a tile that destroys it */
  EatTile() {
    let tile = this.map.matrix[this.murphy.Row][this.murphy.Col];
    if (tile == null) {
      return false;
    }
    let className = tile.constructor.name;
    if (className == 'Base') {
      this.map.matrix[tile.Row][tile.Col] = null;
      return false;
    }
    if (className == 'Infotron') {
      this.map.matrix[tile.Row][tile.Col] = null;
      this.stats.DecrementInfotrons();
      return false;
    }
    if (className == 'Bug') {
      if (!tile.Activated) {
        this.map.matrix[tile.Row][tile.Col] = null;
        return false;
      }
    }
  }

  MoveMurphyRight() {
    let targetTile = this.map.GetValue(this.murphy.Row, this.murphy.Col + 1);
    this.InteractWithTile(targetTile, 'R');
  }

  MoveMurphyLeft() {
    let targetTile = this.map.GetValue(this.murphy.Row, this.murphy.Col - 1);
    this.InteractWithTile(targetTile, 'L');
  }

  MoveMurphyUp() {
    let targetTile = this.map.GetValue(this.murphy.Row - 1, this.murphy.Col);
    this.InteractWithTile(targetTile, 'U');
  }

  MoveMurphyDown() {
    let targetTile = this.map.GetValue(this.murphy.Row + 1, this.murphy.Col);
    this.InteractWithTile(targetTile, 'D');
  }

  MurphyCollectTile(direction) {
    let location = this.murphy.Collect(direction);
    if (location != null) {
      for (let i = 0; i < this.map.Rows; i++) {
        for (let j = 0; j < this.map.Cols; j++) {
          let tile = this.map.matrix[i][j];
          if (tile instanceof Base) {
            if (tile.Row == location[0] && tile.Col == location[1]) {
              this.map.SetValue(location[0], location[1], null);
              return;
            }
          } else if (tile instanceof Infotron) {
            if (tile.Row == location[0] && tile.Col == location[1]) {
              this.map.SetValue(location[0], location[1], null);
              this.stats.DecrementInfotrons();
            }
          }
        }
      }
    }
  }

  CheckMurphyCollidesEnemy() {
    let types = [SnikSnak, Electron];
    for (let tile of this.tiles) {
      for (let type of types) {
        if (tile instanceof type) {
          if (this.murphy.Collide(tile)) {
            return true;
          }
        }
      }
    }
    return false;
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

  CheckMurphyCollidesTerminal() {
    //todo: implement
  }

  // CheckMurphyCollidesPort() {
  //   for (let i = this.tiles.length - 1; i >= 0; i--) {
  //     if (this.murphy.Collide(this.tiles[i])) {
  //       if (this.tiles[i] instanceof Port) {
  //         let port = this.tiles[i];
  //         if (port.type == 'left' && this.murphy.pos.x > port.pos.x) {
  //         }
  //       }
  //     }
  //   }
  // }

  // for debugging
  CountElements(type) {
    let count = 0;
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
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
    for (let row = 0; row < this.map.Rows; row++) {
      for (let col = 0; col < this.map.Cols; col++) {
        let tile = this.map.GetValue(row, col);
        if (tile instanceof type) {
          tiles.push(tile);
        }
      }
    }
    return tiles;
  }
}
