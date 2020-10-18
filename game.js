class Game {
  constructor(tileMap) {
    this.murphy = null;
    this.tiles = [];
    this.tileMap = tileMap;
    this.state = GAME_READY;
    this.gravity = false;
    this.stats = null;
    this.maze = null;
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

  get Maze() {
    return this.maze;
  }

  //#endregion

  Setup() {
    this.SetMaze(this.tileMap);
    this.SetTiles();
    this.SetStats();
    this.state = GAME_READY;
  }

  Update() {
    this.stats.Draw();
    this.stats.Update();
    this.murphy.Draw();
    this.murphy.Update();
    for (let tile of this.tiles) {
      tile.Draw();
      tile.Update();
      // this.cam.Apply(tile);
    }
    this.MoveFallingElements();
    this.MoveEnemies();
  }

  Reset() {
    game.SetState(GAME_PLAY);
    this.ResetMaze();
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
      INFOTRONS
    );
  }

  SetMaze(tileMap) {
    this.maze = new Maze(tileMap);
    this.maze.Create(tileMap);
  }

  SetCamera() {
    this.cam = new Camera(MAZE_POS_X, MAZE_POS_Y, MAZE_WIDTH, MAZE_HEIGHT);
  }

  ResetMaze() {
    this.maze.Create(tileMap);
    this.SetTiles();
    game.state = GAME_READY;
  }

  SetTiles() {
    for (let i = 0; i < this.maze.Rows; i++) {
      for (let j = 0; j < this.maze.Cols; j++) {
        let mazeVal = this.maze.GetValue(i, j);
        if (mazeVal == TILE_WALL) {
          this.tiles.push(new Wall(i, j, TILE_SIZE, BLUE, BLACK, WALL_SYMBOL));
        } else if (mazeVal == TILE_FRAME) {
          this.tiles.push(
            new Wall(i, j, TILE_SIZE, GRAY1, BLACK, FRAME_SYMBOL)
          );
        } else if (mazeVal == TILE_BASE) {
          this.tiles.push(new Base(i, j, TILE_SIZE, GREEN, BLACK, BASE_SYMBOL));
        } else if (mazeVal == TILE_ZONK) {
          this.tiles.push(
            new Zonk(
              i,
              j,
              TILE_SIZE,
              GRAY3,
              BLACK,
              ZONK_SYMBOL,
              MURPHY_SPEED,
              this.maze,
              TILE_ZONK
            )
          );
        } else if (mazeVal == TILE_INFOTRON) {
          this.tiles.push(
            new Infotron(
              i,
              j,
              TILE_SIZE,
              RED,
              BLACK,
              INFOTRON_SYMBOL,
              MURPHY_SPEED,
              this.maze,
              TILE_INFOTRON
            )
          );
        } else if (mazeVal == TILE_BUG) {
          this.tiles.push(new Bug(i, j, TILE_SIZE, YELLOW, GREEN, BUG_SYMBOL));
        } else if (mazeVal == TILE_EXIT) {
          this.tiles.push(new Exit(i, j, TILE_SIZE, WHITE, RED, EXIT_SYMBOL));
        } else if (mazeVal == TILE_SNIKSNAK) {
          this.tiles.push(
            new SnikSnak(
              i,
              j,
              TILE_SIZE,
              YELLOW,
              BLACK,
              SNIKSNAK_SYMBOL,
              MURPHY_SPEED,
              this.maze,
              TILE_SNIKSNAK
            )
          );
        } else if (mazeVal == TILE_ELECTRON) {
          this.tiles.push(
            new Electron(
              i,
              j,
              TILE_SIZE,
              YELLOW,
              BLACK,
              ELECTRON_SYMBOL,
              MURPHY_SPEED,
              this.maze,
              TILE_ELECTRON
            )
          );
        } else if (mazeVal == TILE_MURPHY) {
          this.murphy = new Murphy(
            i,
            j,
            TILE_SIZE,
            YELLOW,
            BLACK,
            MURPHY_SYMBOL,
            MURPHY_SPEED,
            this.maze,
            TILE_MURPHY,
            MAX_LIVES
          );
          // this.tiles.push(this.murphy);
        }
      }
    }
  }

  CheckMurphyEatElement() {
    for (let i = this.tiles.length - 1; i >= 0; i--) {
      if (this.murphy.Collide(this.tiles[i])) {
        if (this.tiles[i] instanceof Base) {
          let base = this.tiles.splice(i, 1)[0];
        }
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

  MoveElements() {
    for (let zonk of this.zonks) {
      zonk.GoDown();
    }
  }

  MoveInfotrons() {
    for (let infotron of this.infotrons) {
      infotron.GoDown();
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

  CheckMurphyEnemyCollision() {
    let types = [SnikSnak, Electron];
    for (let tile of this.tiles) {
      for (let type of types) {
        if (tile instanceof type) {
          if (this.murphy.Collide(tile)) {
            Busted();
            return;
          }
        }
      }
    }
  }

  MurphyPushLeft() {
    for (let tile of this.tiles) {
      if (tile instanceof Zonk) {
        if (
          tile.pos.y == game.murphy.pos.y &&
          game.murphy.pos.x - tile.pos.x == TILE_SIZE
        ) {
          tile.GoLeft();
          game.murphy.GoLeft();
          return;
        }
      }
    }
  }

  MurphyPushRight() {
    for (let tile of this.tiles) {
      if (tile instanceof Zonk) {
        if (
          tile.pos.y == game.murphy.pos.y &&
          tile.pos.x - game.murphy.pos.x == TILE_SIZE
        ) {
          tile.GoRight();
          game.murphy.GoRight();
          return;
        }
      }
    }
  }
}
