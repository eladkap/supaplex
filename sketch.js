var game;
var tileMap;
var spaceKeyIsHold;
// var murphy;
// var tiles;
// var walls;
// var infotrons;
// var zonks;
// var bases;
// var enemies;
// var exit;

// var gameStatus;
// var spaceKeyIsHold = false;
// var gravity = true;

// var tileMap;
// var stats;
// var maze;
// var cam;

//#region Main Functions
function LoadTileMap() {
  tileMap = ReadTextFile('levels/level001.txt');
}

function preload() {
  LoadTileMap();
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  frameRate(FPS);
  game = new Game(tileMap);
  game.Setup();
  noLoop();
}

async function draw() {
  background(BLACK);
  game.Update();
  // DrawMaze();
  // stats.Draw();
  // stats.Update();
  // DrawWalls();
  // MoveMurphy();
  // MoveInfotrons();
  // MoveZonks();
  // MoveEnemies();
  // DrawBases();
  // DrawBugs();
  // DrawExit();
  // cam.Update(murphy);

  // if (gravity) {
  //   murphy.GoDown();
  // }

  if (game.State == GAME_READY) {
    DisplayReady();
  }
  if (game.Stat == GAME_PAUSED) {
    DisplayPause();
  }
  if (game.Stat == GAME_BUSTED) {
    DisplayBusted();
  }
  game.CheckMurphyEatElement();
  if (game.CheckMurphyCollidesBug()) {
    Busted();
  }
  game.CheckMurphyEnemyCollision();

  // game.CheckMurphyEatBase();
  // game.CheckMurphyEatInfotron();
  // if (game.CheckMurphyCollidesBug()) {
  // Busted();
  // }
  // CheckTileFallOnMurphy();

  CheckKeyIsDown();

  // DrawGameSignature();
}
//#endregion

function DrawGameSignature() {
  DisplayMessage(
    'Deveolped by Elad Kapuza 2020',
    MAZE_X,
    SCREEN_HEIGHT + STATS_HEIGHT - TILE_SIZE / 2,
    WHITE,
    MESSAGE_FONT_SIZE2
  );
}

function ResetRound() {
  ConsoleLog('Reset round');
  game.Reset();
  loop();
}

//#region Draw Functions
function DrawWalls() {
  for (let wall of walls) {
    wall.Draw();
    // cam.Apply(wall);
  }
}

function MoveMurphy() {
  murphy.Draw();
  murphy.Update();
  // cam.Apply(murphy);
}

function MoveInfotrons() {
  for (let infotron of infotrons) {
    infotron.Draw();
    infotron.Update();
    infotron.GoDown();
    // cam.Apply(infotron);
  }
}

function MoveZonks() {
  for (let zonk of zonks) {
    zonk.GoDown();
    zonk.Draw();
    zonk.Update();
    // cam.Apply(zonk);
  }
}

function DrawBases() {
  for (let base of bases) {
    base.Draw();
    // cam.Apply(base);
  }
}

function DrawBugs() {
  for (let bug of bugs) {
    bug.Draw();
    bug.Update();
    // cam.Apply(bug);
  }
}

function DrawExit() {
  exit.Draw();
  // cam.Apply(exit);
}

function MoveEnemies() {
  for (let enemy of enemies) {
    enemy.Draw();
    enemy.Update();
    // cam.Apply(enemy);
  }
}

function DrawMaze() {
  strokeWeight(1);
  stroke(NAVY);
  noFill();
  rect(MAZE_X, MAZE_Y, maze.Width, maze.Height);
}
//#endregion

function setStats() {
  stats = new Stats(
    STATS_POS_X,
    STATS_POS_Y,
    STATS_WIDTH,
    STATS_HEIGHT,
    INFOTRONS
  );
}

function SetMaze(tileMap) {
  maze = new Maze(tileMap);
  maze.Create(tileMap);
  cam = new Camera(MAZE_POS_X, MAZE_POS_Y, MAZE_WIDTH, MAZE_HEIGHT);
}

function ResetMaze() {
  game.maze.Create(tileMap);
  SetTiles();
}

function SetTiles() {
  bases = [];
  infotrons = [];
  zonks = [];
  walls = [];
  bugs = [];
  enemies = [];

  for (let i = 0; i < maze.Rows; i++) {
    for (let j = 0; j < maze.Cols; j++) {
      let mazeVal = maze.GetValue(i, j);
      if (mazeVal == TILE_WALL) {
        let wall = new Wall(i, j, TILE_SIZE, BLUE, BLACK, WALL_SYMBOL);
        walls.push(wall);
      } else if (mazeVal == TILE_FRAME) {
        let wall = new Wall(i, j, TILE_SIZE, GRAY1, BLACK, FRAME_SYMBOL);
        walls.push(wall);
      } else if (mazeVal == TILE_BASE) {
        let base = new Base(i, j, TILE_SIZE, GREEN, BLACK, BASE_SYMBOL);
        bases.push(base);
      } else if (mazeVal == TILE_ZONK) {
        let zonk = new Zonk(
          i,
          j,
          TILE_SIZE,
          GRAY3,
          BLACK,
          ZONK_SYMBOL,
          MURPHY_SPEED,
          maze,
          TILE_ZONK
        );
        zonks.push(zonk);
      } else if (mazeVal == TILE_INFOTRON) {
        let infotron = new Infotron(
          i,
          j,
          TILE_SIZE,
          RED,
          BLACK,
          INFOTRON_SYMBOL,
          MURPHY_SPEED,
          maze,
          TILE_INFOTRON
        );
        infotrons.push(infotron);
      } else if (mazeVal == TILE_BUG) {
        let bug = new Bug(i, j, TILE_SIZE, YELLOW, GREEN, BUG_SYMBOL);
        bugs.push(bug);
      } else if (mazeVal == TILE_EXIT) {
        exit = new Exit(i, j, TILE_SIZE, WHITE, RED, EXIT_SYMBOL);
      } else if (mazeVal == TILE_SNIKSNAK) {
        let snikSnak = new SnikSnak(
          i,
          j,
          TILE_SIZE,
          YELLOW,
          BLACK,
          SNIKSNAK_SYMBOL,
          MURPHY_SPEED,
          maze,
          TILE_SNIKSNAK
        );
        enemies.push(snikSnak);
      } else if (mazeVal == TILE_ELECTRON) {
        let electron = new Electron(
          i,
          j,
          TILE_SIZE,
          YELLOW,
          BLACK,
          ELECTRON_SYMBOL,
          MURPHY_SPEED,
          maze,
          TILE_ELECTRON
        );
        enemies.push(electron);
      } else if (mazeVal == TILE_MURPHY) {
        murphy = new Murphy(
          i,
          j,
          TILE_SIZE,
          YELLOW,
          BLACK,
          MURPHY_SYMBOL,
          MURPHY_SPEED,
          maze,
          TILE_MURPHY,
          MAX_LIVES
        );
      }
    }
  }
}

function SetLifeTile() {
  // lifeTile = new Tile(FRUIT_ROW, FRUIT_COL, TILE_SIZE, WHITE, LIFE_SYMBOL);
}

function Busted() {
  ConsoleLog('Busted');
  game.SetWallsColor(DARK_BLUE);
  game.SetState(GAME_BUSTED);
  DisplayBusted();
  noLoop();
}

function LevelCompleted() {
  ConsoleLog('Level completed.');
  DisplayLevelCompleted();
  game.SetState(GAME_LEVEL_COMPLETED);
  noLoop();
}

// function SetWallsColor(color) {
//   for (let wall of walls) {
//     wall.SetColor(color);
//   }
// }

function DisplayLevelCompleted() {
  let msg_x = SCREEN_WIDTH * 0.3;
  let msg_y = SCREEN_HEIGHT * 0.71;
  let msg = 'Level completed. Press ENTER for level ' + (currLevelIndex + 2);
  DisplayMessage(msg, msg_x, msg_y, GREEN, MESSAGE_FONT_SIZE2);
}

function DisplayMessage(msg, x, y, col, font_size) {
  fill(col);
  textSize(font_size);
  textFont(FONT_FAMILY);
  textStyle(NORMAL);
  text(msg, x, y);
}

function DisplayReady() {
  let msg_x = SCREEN_WIDTH * 0.4;
  let msg_y = SCREEN_HEIGHT * 0.05;
  DisplayMessage(
    'Press SPACE to start',
    msg_x,
    msg_y,
    YELLOW,
    MESSAGE_FONT_SIZE2
  );
}

function DisplayBusted() {
  let msg_x = (MAZE_POS_X + SCREEN_WIDTH) * 0.32;
  let msg_y = SCREEN_HEIGHT * 0.58;
  let msg = 'Busted!';
  DisplayMessage(msg, msg_x, msg_y, RED, MESSAGE_FONT_SIZE1);
  msg_x = (MAZE_POS_X + SCREEN_WIDTH) * 0.3;
  msg_y = SCREEN_HEIGHT * 0.71;
  msg = 'Press SPACE to restart.';
  DisplayMessage(msg, msg_x, msg_y, WHITE, MESSAGE_FONT_SIZE2);
}

function DisplayGameOver() {
  let msg_x = (MAZE_X + SCREEN_WIDTH) * 0.3;
  let msg_y = SCREEN_HEIGHT * 0.58;
  let msg = 'GAME OVER';
  DisplayMessage(msg, msg_x, msg_y, RED, MESSAGE_FONT_SIZE);
}

function DisplayPause() {
  let msg_x = (MAZE_X + SCREEN_WIDTH) * 0.28;
  let msg_y = SCREEN_HEIGHT * 0.7;
  let msg = 'Game Paused';
  DisplayMessage(msg, msg_x, msg_y, WHITE, MESSAGE_FONT_SIZE);
}

function PauseGame() {
  ConsoleLog('Game paused.');
  game.SetState(GAME_PAUSED);
  game.SetWallsColor(DARK_BLUE);
  DisplayPause();
  noLoop();
}

function ResumeGame() {
  ConsoleLog('Game resumed');
  game.Resume();
  // game.SetState(GAME_PLAY);
  // game.SetWallsColor(BLUE);
  // game.MoveFallingElements();
  // game.MoveEnemies();

  // for (let zonk of zonks) {
  //   zonk.GoDown();
  // }
  // for (let infotron of infotrons) {
  //   infotron.GoDown();
  // }
  // for (let enemy of enemies) {
  //   enemy.SetRandomDirection();
  // }
  loop();
}

function SetNextLevel() {
  // currLevelIndex++;
  // if (currLevelIndex == fruits.length) {
  //   currLevelIndex = fruits.length - 1;
  // }
  // stats.SetNextLevel();
  game.Reset();
  // game.SetState(GAME_READY);
  // loop();
}

function finishGame() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = 'Game Finished';
  game.SetState(GAME_FINISHED);
  DisplayMessage(msg, msg_x, msg_y, GREEN, MESSAGE_FONT_SIZE2);
  noLoop();
}

// function CheckMurphyEatInfotron() {
//   for (let i = infotrons.length - 1; i >= 0; i--) {
//     if (murphy.Collide(infotrons[i])) {
//       let infotron = infotrons.splice(i, 1)[0];
//       stats.DecrementInfotrons();
//     }
//   }
// }

// todo: fix this function
function CheckTileFallOnMurphy() {
  for (let zonk of zonks) {
    // if (zonk.Collide(murphy) && zonk.isLerping) {
    //   Busted();
    // }
    // if (zonk.col == murphy.col && zonk.Row == murphy.Row) {
    //   Busted();
    // }
  }
}

// function MurphyCollectTile(direction) {
//   let location = murphy.Collect(direction);
//   if (location != null) {
//     for (let i = game.tiles.length - 1; i >= 0; i--) {
//       let base = bases[i];
//       if (base.Row == location[0] && base.Col == location[1]) {
//         bases.splice(i, 1);
//       }
//     }
//     for (let i = infotrons.length - 1; i >= 0; i--) {
//       let infotron = infotrons[i];
//       if (infotron.Row == location[0] && infotron.Col == location[1]) {
//         infotrons.splice(i, 1);
//         stats.DecrementInfotrons();
//       }
//     }
//   }
// }

// function MurphyPushRight() {
//   for (let zonk of zonks) {
//     if (zonk.pos.y == murphy.pos.y && zonk.pos.x - murphy.pos.x == TILE_SIZE) {
//       zonk.GoRight();
//       murphy.GoRight();
//       return;
//     }
//   }
// }

// function MurphyPushLeft() {
//   for (let zonk of zonks) {
//     if (zonk.pos.y == murphy.pos.y && murphy.pos.x - zonk.pos.x == TILE_SIZE) {
//       zonk.GoLeft();
//       game.Murphy.GoLeft();
//       return;
//     }
//   }
// }

function MoveMurphyRight() {
  if (game.Murphy.CanPushRight()) {
    game.MurphyPushRight();
  } else {
    game.Murphy.GoRight();
  }
}

function MoveMurphyLeft() {
  if (game.Murphy.CanPushLeft()) {
    game.MurphyPushLeft();
  } else {
    game.Murphy.GoLeft();
  }
}

//#region Keyboard Events
function CheckKeyIsDown() {
  if (game.State == GAME_PLAY) {
    if (keyIsDown(SPACE_KEY)) {
      spaceKeyIsHold = true;
    }
    if (spaceKeyIsHold) {
      if (keyIsDown(RIGHT_ARROW)) {
        game.MurphyCollectTile('R');
      } else if (keyIsDown(LEFT_ARROW)) {
        game.MurphyCollectTile('L');
      } else if (keyIsDown(UP_ARROW)) {
        game.MurphyCollectTile('U');
      } else if (keyIsDown(DOWN_ARROW)) {
        game.MurphyCollectTile('D');
      }
    } else {
      if (keyIsDown(RIGHT_ARROW)) {
        MoveMurphyRight();
      } else if (keyIsDown(LEFT_ARROW)) {
        MoveMurphyLeft();
      } else if (keyIsDown(UP_ARROW)) {
        game.Murphy.GoUp();
      } else if (keyIsDown(DOWN_ARROW)) {
        game.Murphy.GoDown();
      }
    }
  }
}

function keyReleased() {
  spaceKeyIsHold = false;
}

function keyPressed() {
  if (game.State == GAME_READY && key == ' ') {
    ResumeGame();
  }
  if (game.State == GAME_BUSTED && key == ' ') {
    ResetRound();
  }
  if (game.State == GAME_LEVEL_COMPLETED && keyCode == ENTER) {
    SetNextLevel();
  }
  if (game.State == GAME_PLAY && key === 'p') {
    PauseGame();
    return;
  }
  if (game.State == GAME_PLAY && keyCode == ESCAPE) {
    game.Murphy.Destroy();
    Busted();
  }
  if (game.State == GAME_PAUSED && key === 'p') {
    ResumeGame();
  }
  if (game.State == GAME_PLAY && !spaceKeyIsHold) {
    if (keyCode === RIGHT_ARROW) {
      MoveMurphyRight();
    } else if (keyCode === LEFT_ARROW) {
      MoveMurphyLeft();
    } else if (keyCode === UP_ARROW) {
      game.Murphy.GoUp();
    } else if (keyCode === DOWN_ARROW) {
      game.Murphy.GoDown();
    }
  }
}
//#endregion
