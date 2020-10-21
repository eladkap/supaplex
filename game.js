class Game {
  constructor(level) {
    this.level = level;
    this.murphy = null;
    this.tiles = [];
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
    this.murphy.Draw(this.cam.pos);
    this.murphy.Update();
    // if (gravity) {
    //   murphy.GoDown();
    // }
    for (let tile of this.tiles) {
      tile.Draw(this.cam.pos);
      tile.Update();
    }
    this.MoveFallingElements();
    this.MoveEnemies();
    this.stats.Draw();
    this.stats.Update();
  }

  Reset() {
    this.SetState(GAME_PLAY);
    this.stats.Reset();
    this.ResetMap();
    this.SetWallsColor(BLUE);
    this.stats.Reset();
    this.murphy.Stop();
    this.murphy.SetOriginalPosition();
    this.StopFallingElements([Zonk, Infotron]);
    this.StopEnemies([SnikSnak, Electron]);
  }

  Resume() {
    this.SetState(GAME_PLAY);
    this.SetWallsColor(BLUE);
    this.MoveFallingElements();
    this.MoveEnemies();
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
    this.map.Create(tileMap);
  }

  SetCamera() {
    this.cam = new Camera(MAP_POS_X, MAP_POS_Y, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  ResetMap() {
    this.map.Create(tileMap);
    this.SetTiles();
    this.state = GAME_READY;
  }

  SetTiles() {
    for (let i = 0; i < this.map.Rows; i++) {
      for (let j = 0; j < this.map.Cols; j++) {
        let mapVal = this.map.GetValue(i, j);
        if (mapVal == TILE_WALL) {
          this.tiles.push(new Wall(i, j, TILE_SIZE, BLUE, BLACK, WALL_SYMBOL));
        } else if (mapVal == TILE_FRAME) {
          this.tiles.push(
            new Wall(i, j, TILE_SIZE, GRAY1, BLACK, FRAME_SYMBOL)
          );
        } else if (mapVal == TILE_BASE) {
          this.tiles.push(new Base(i, j, TILE_SIZE, GREEN, BLACK, BASE_SYMBOL));
        } else if (mapVal == TILE_ZONK) {
          this.tiles.push(
            new Zonk(
              i,
              j,
              TILE_SIZE,
              GRAY3,
              BLACK,
              ZONK_SYMBOL,
              MURPHY_SPEED,
              this.map,
              TILE_ZONK
            )
          );
        } else if (mapVal == TILE_INFOTRON) {
          this.tiles.push(
            new Infotron(
              i,
              j,
              TILE_SIZE,
              RED,
              BLACK,
              INFOTRON_SYMBOL,
              MURPHY_SPEED,
              this.map,
              TILE_INFOTRON
            )
          );
        } else if (mapVal == TILE_BUG) {
          this.tiles.push(new Bug(i, j, TILE_SIZE, YELLOW, GREEN, BUG_SYMBOL));
        } else if (mapVal == TILE_EXIT) {
          this.tiles.push(new Exit(i, j, TILE_SIZE, WHITE, RED, EXIT_SYMBOL));
        } else if (mapVal == TILE_SNIKSNAK) {
          this.tiles.push(
            new SnikSnak(
              i,
              j,
              TILE_SIZE,
              YELLOW,
              BLACK,
              SNIKSNAK_SYMBOL,
              MURPHY_SPEED,
              this.map,
              TILE_SNIKSNAK
            )
          );
        } else if (mapVal == TILE_ELECTRON) {
          this.tiles.push(
            new Electron(
              i,
              j,
              TILE_SIZE,
              YELLOW,
              BLACK,
              ELECTRON_SYMBOL,
              MURPHY_SPEED,
              this.map,
              TILE_ELECTRON
            )
          );
        } else if (mapVal == TILE_MURPHY) {
          this.murphy = new Murphy(
            i,
            j,
            TILE_SIZE,
            YELLOW,
            BLACK,
            MURPHY_SYMBOL,
            MURPHY_SPEED,
            this.map,
            TILE_MURPHY,
            MAX_LIVES
          );
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
          this.stats.DecrementInfotrons();
        }
      }
    }
  }

  CheckMurphyCollidesBug() {
    // Return true if busted or not
    for (let i = this.tiles.length - 1; i >= 0; i--) {
      if (this.murphy.Collide(this.tiles[i])) {
        if (this.tiles[i].Activated) {
          return true;
        } else {
          let bug = this.tiles.splice(i, 1)[0];
        }
      }
    }
    return false;
  }

  SetWallsColor(color) {
    for (let tile of this.tiles) {
      if (tile instanceof Wall) {
        tile.SetColor(color);
      }
    }
  }

  MoveFallingElements() {
    let types = [Zonk, Infotron];
    for (let tile of this.tiles) {
      for (let type of types) {
        if (tile instanceof type) {
          tile.GoDown();
        }
      }
    }
  }

  MoveEnemies() {
    let types = [SnikSnak, Electron];
    for (let tile of this.tiles) {
      for (let type of types) {
        if (tile instanceof type) {
          tile.SetRandomDirection();
        }
      }
    }
  }

  StopFallingElements(types) {
    for (let tile of this.tiles) {
      for (let type of types) {
        if (tile instanceof type) {
          tile.Stop();
        }
      }
    }
  }

  StopEnemies(types) {
    for (let tile of this.tiles) {
      for (let type of types) {
        if (tile instanceof type) {
          tile.SetOriginalPosition();
          tile.Stop();
        }
      }
    }
  }

  MurphyCollectTile(direction) {
    let location = this.murphy.Collect(direction);
    if (location != null) {
      for (let i = this.tiles.length - 1; i >= 0; i--) {
        if (this.tiles[i] instanceof Base) {
          let base = this.tiles[i];
          if (base.Row == location[0] && base.Col == location[1]) {
            this.tiles.splice(i, 1);
            return;
          }
        } else if (this.tiles[i] instanceof Infotron) {
          let infotron = this.tiles[i];
          if (infotron.Row == location[0] && infotron.Col == location[1]) {
            this.tiles.splice(i, 1);
            this.stats.DecrementInfotrons();
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

  MurphyPushLeft() {
    for (let tile of this.tiles) {
      if (tile instanceof Zonk) {
        if (
          tile.pos.y == this.murphy.pos.y &&
          this.murphy.pos.x - tile.pos.x == TILE_SIZE
        ) {
          tile.GoLeft();
          this.murphy.GoLeft();
          return;
        }
      }
    }
  }

  MurphyPushRight() {
    for (let tile of this.tiles) {
      if (tile instanceof Zonk) {
        if (
          tile.pos.y == this.murphy.pos.y &&
          tile.pos.x - this.murphy.pos.x == TILE_SIZE
        ) {
          tile.GoRight();
          this.murphy.GoRight();
          return;
        }
      }
    }
  }
}
