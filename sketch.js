var murphy;
var walls;
var infotrons;
var zonks;
var bases;
var enemies;
var exit;

var gameStatus;
var spaceKeyIsHold = false;

var tileMap;
var stats;
var maze;

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
  SetMaze(tileMap);
  SetTiles();
  setStats();
  gameStatus = GAME_READY;
  noLoop();
}

async function draw() {
  background(BLACK);
  DrawMaze();
  stats.Draw();
  stats.Update();
  DrawWalls();
  DrawInfotrons();
  DrawZonks();
  DrawBases();
  DrawBugs();
  DrawExit();
  murphy.Draw();
  murphy.Update();

  if (gameStatus == GAME_READY) {
    DisplayReady();
  }
  if (gameStatus == GAME_PAUSED) {
    DisplayPause();
  }
  if (gameStatus == GAME_BUSTED) {
    DisplayBusted();
  }

  CheckMurphyEatBase();
  CheckMurphyEatInfotron();
  CheckMurphyCollidesBug();

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
  gameStatus = GAME_PLAY;
  ResetMaze();
  SetWallsColor(BLUE);
  stats.Reset();
  murphy.Stop();
  murphy.SetOriginalPosition();
  // for (let ghost of ghosts) {
  //   ghost.SetOriginalPosition();
  //   ghost.Reset();
  //   ghost.Stop();
  // }
  loop();
}

//#region Draw Functions
function DrawWalls() {
  for (let wall of walls) {
    wall.Draw();
  }
}

function DrawInfotrons() {
  for (let infotron of infotrons) {
    infotron.Draw();
    infotron.GoDown();
    infotron.Update();
  }
}
function DrawZonks() {
  for (let zonk of zonks) {
    zonk.Draw();
    zonk.GoDown();
    zonk.Update();
  }
}

function DrawBases() {
  for (let base of bases) {
    base.Draw();
  }
}

function DrawBugs() {
  for (let bug of bugs) {
    bug.Draw();
    bug.Update();
  }
}

function DrawExit() {
  exit.Draw();
}

// function MoveGhosts() {
//   for (let ghost of ghosts) {
//     ghost.Draw();
//     ghost.Update();
//     ghost.UpdateState();
//   }
// }

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
}

function ResetMaze() {
  maze.Create(tileMap);
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
      if (maze.GetValue(i, j) == TILE_WALL) {
        let wall = new Wall(i, j, TILE_SIZE, BLUE, WALL_SYMBOL);
        walls.push(wall);
      } else if (maze.GetValue(i, j) == TILE_BASE) {
        let base = new Base(i, j, TILE_SIZE, GREEN, BASE_SYMBOL);
        bases.push(base);
      } else if (maze.GetValue(i, j) == TILE_ZONK) {
        let zonk = new Zonk(
          i,
          j,
          TILE_SIZE,
          GRAY3,
          ZONK_SYMBOL,
          MURPHY_SPEED,
          maze,
          TILE_ZONK
        );
        zonks.push(zonk);
      } else if (maze.GetValue(i, j) == TILE_INFOTRON) {
        let infotron = new Infotron(
          i,
          j,
          TILE_SIZE,
          RED,
          INFOTRON_SYMBOL,
          MURPHY_SPEED,
          maze,
          TILE_INFOTRON
        );
        infotrons.push(infotron);
      } else if (maze.GetValue(i, j) == TILE_BUG) {
        let bug = new Bug(i, j, TILE_SIZE, YELLOW, BUG_SYMBOL);
        bugs.push(bug);
      } else if (maze.GetValue(i, j) == TILE_EXIT) {
        exit = new Exit(i, j, TILE_SIZE, ORANGE, EXIT_SYMBOL);
      } else if (maze.GetValue(i, j) == TILE_MURPHY) {
        murphy = new Murphy(
          i,
          j,
          TILE_SIZE,
          YELLOW,
          MURPHY_SYMBOL,
          MURPHY_SPEED,
          maze,
          TILE_MURPHY,
          MAX_LIVES
        );
      }
    }
  }
  // for (let i = 0; i < maze.Rows; i++) {
  //   for (let j = 0; j < maze.Cols; j++) {
  //     let tileType = maze.GetValue(i, j);
  //     if (tileType == TILE_DOT || tileType == TILE_POWER) {
  //       maze.SetValue(i, j, TILE_EMPTY);
  //     }
  //   }
  // }
}

function SetLifeTile() {
  // lifeTile = new Tile(FRUIT_ROW, FRUIT_COL, TILE_SIZE, WHITE, LIFE_SYMBOL);
}

function Busted() {
  ConsoleLog('Busted');
  SetWallsColor(DARK_BLUE);
  gameStatus = GAME_BUSTED;
  DisplayBusted();
  noLoop();
}

function LevelCompleted() {
  ConsoleLog('Level completed.');
  DisplayLevelCompleted();
  gameStatus = GAME_LEVEL_COMPLETED;
  noLoop();
}

function SetWallsColor(color) {
  for (let wall of walls) {
    wall.SetColor(color);
  }
}

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
  let msg_x = (MAZE_X + SCREEN_WIDTH) * 0.3;
  let msg_y = SCREEN_HEIGHT * 0.71;
  DisplayMessage(
    'Press SPACE to start',
    msg_x,
    msg_y,
    YELLOW,
    MESSAGE_FONT_SIZE2
  );
}

function DisplayBusted() {
  let msg_x = (MAZE_X + SCREEN_WIDTH) * 0.32;
  let msg_y = SCREEN_HEIGHT * 0.58;
  let msg = 'Busted!';
  DisplayMessage(msg, msg_x, msg_y, RED, MESSAGE_FONT_SIZE);
  msg_x = (MAZE_X + SCREEN_WIDTH) * 0.3;
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
  gameStatus = GAME_PAUSED;
  SetWallsColor(DARK_BLUE);
  DisplayPause();
  noLoop();
}

function ResumeGame() {
  ConsoleLog('Game resumed');
  gameStatus = GAME_PLAY;
  SetWallsColor(BLUE);
  for (let zonk of zonks) {
    zonk.GoDown();
  }
  for (let infotron of infotrons) {
    infotron.GoDown();
  }
  loop();
}

function SetNextLevel() {
  // currLevelIndex++;
  // if (currLevelIndex == fruits.length) {
  //   currLevelIndex = fruits.length - 1;
  // }
  // stats.SetNextLevel();
  // ResetMaze();
  gameStatus = GAME_READY;
  // loop();
}

function finishGame() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = 'Game Finished';
  gameStatus = GAME_FINISHED;
  DisplayMessage(msg, msg_x, msg_y, GREEN, MESSAGE_FONT_SIZE2);
  noLoop();
}

function CheckMurphyEatBase() {
  for (let i = bases.length - 1; i >= 0; i--) {
    if (murphy.Collide(bases[i])) {
      let base = bases.splice(i, 1)[0];
    }
  }
}

function CheckMurphyEatInfotron() {
  for (let i = infotrons.length - 1; i >= 0; i--) {
    if (murphy.Collide(infotrons[i])) {
      let infotron = infotrons.splice(i, 1)[0];
      stats.DecrementInfotrons();
    }
  }
}

function CheckMurphyCollidesBug() {
  for (let i = bugs.length - 1; i >= 0; i--) {
    if (murphy.Collide(bugs[i])) {
      if (bugs[i].Activated) {
        Busted();
      } else {
        let bug = bugs.splice(i, 1)[0];
      }
    }
  }
}

// function SetGhostsVulnerable() {
//   for (let ghost of ghosts) {
//     ghost.SetVulnerable(true);
//   }
// }

// async function EatGhost(ghost) {
//   ConsoleLog(GHOST_POINTS[eatenGhostNum]);
//   ghost.SetVisible(false);

//   let gx = ghost.pos.x;
//   let gy = ghost.pos.y;
//   stats.increaseScore(GHOST_POINTS[eatenGhostNum]);
//   ghost.SetOriginalPosition();
//   ghost.Stop();
//   ghost.SetVulnerable(false);
//   ghost.SetRandomDirection();

//   DisplayMessage(GHOST_POINTS[eatenGhostNum], gx, gy, WHITE, POINTS_FONT_SIZE);
//   eatenGhostNum++;
//   if (eatenGhostNum == ghosts.length) {
//     eatenGhostNum = 0;
//   }

//   noLoop();
//   await Sleep(DELAY_AFTER_EATING_GHOST);
//   loop();
//   ghost.SetVisible(true);
// }

// async function CheckMurphyGhostCollision() {
//   for (let ghost of ghosts) {
//     if (murphy.Collide(ghost)) {
//       if (ghost.Vulnerable) {
//         EatGhost(ghost);
//       } else {
//         Busted();
//         return;
//       }
//     }
//   }
// }

function MurphyCollectTile(direction) {
  let location = murphy.Collect(direction);
  if (location != null) {
    for (let i = bases.length - 1; i >= 0; i--) {
      let base = bases[i];
      if (base.Row == location[0] && base.Col == location[1]) {
        bases.splice(i, 1);
      }
    }
    for (let i = infotrons.length - 1; i >= 0; i--) {
      let infotron = infotrons[i];
      if (infotron.Row == location[0] && infotron.Col == location[1]) {
        infotrons.splice(i, 1);
        stats.DecrementInfotrons();
      }
    }
  }
}

//#region Keyboard Events
function CheckKeyIsDown() {
  if (gameStatus == GAME_PLAY) {
    if (keyIsDown(SPACE_KEY)) {
      spaceKeyIsHold = true;
    }
    if (spaceKeyIsHold) {
      if (keyIsDown(RIGHT_ARROW)) {
        MurphyCollectTile('R');
      } else if (keyIsDown(LEFT_ARROW)) {
        MurphyCollectTile('L');
      } else if (keyIsDown(UP_ARROW)) {
        MurphyCollectTile('U');
      } else if (keyIsDown(DOWN_ARROW)) {
        MurphyCollectTile('D');
      }
    } else {
      if (keyIsDown(RIGHT_ARROW)) {
        murphy.GoRight();
      } else if (keyIsDown(LEFT_ARROW)) {
        murphy.GoLeft();
      } else if (keyIsDown(UP_ARROW)) {
        murphy.GoUp();
      } else if (keyIsDown(DOWN_ARROW)) {
        murphy.GoDown();
      }
    }
  }
}

function keyReleased() {
  spaceKeyIsHold = false;
}

function keyPressed() {
  if (gameStatus == GAME_READY && key == ' ') {
    ResumeGame();
  }
  if (gameStatus == GAME_BUSTED && key == ' ') {
    ResetRound();
  }
  if (gameStatus == GAME_LEVEL_COMPLETED && keyCode == ENTER) {
    SetNextLevel();
  }
  if (gameStatus == GAME_PLAY && key === 'p') {
    PauseGame();
    return;
  }
  if (gameStatus == GAME_PLAY && keyCode == ESCAPE) {
    murphy.Destroy();
    Busted();
  }
  if (gameStatus == GAME_PAUSED && key === 'p') {
    ResumeGame();
  }
  if (gameStatus == GAME_PLAY && !spaceKeyIsHold) {
    if (keyCode === RIGHT_ARROW) {
      murphy.GoRight();
    } else if (keyCode === LEFT_ARROW) {
      murphy.GoLeft();
    } else if (keyCode === UP_ARROW) {
      murphy.GoUp();
    } else if (keyCode === DOWN_ARROW) {
      murphy.GoDown();
    }
  }
}
//#endregion
