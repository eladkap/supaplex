var murphy;
var walls;
var infotrons;
var zonks;
var bases;
var enemies;
var exit;

var gameStatus;
var spaceKeyIsHold = false;
var gravity = true;

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
  murphy.Draw();
  murphy.Update();
  MoveInfotrons();
  MoveZonks();
  DrawBases();
  DrawBugs();
  DrawExit();

  // if (gravity) {
  //   murphy.GoDown();
  // }

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
  CheckTileFallOnMurphy();

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

  for (let zonk of zonks) {
    zonk.Stop();
  }

  for (let infotron of infotrons) {
    infotron.Stop();
  }

  for (let enemy of enemies) {
    enemy.SetOriginalPosition();
    enemy.Reset();
    enemy.Stop();
  }
  loop();
}

//#region Draw Functions
function DrawWalls() {
  for (let wall of walls) {
    wall.Draw();
  }
}

function MoveInfotrons() {
  for (let infotron of infotrons) {
    infotron.Draw();
    infotron.Update();
    infotron.GoDown();
  }
}

function MoveZonks() {
  for (let zonk of zonks) {
    zonk.GoDown();
    zonk.Draw();
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

function MoveEnemies() {
  for (let enemy of enemies) {
    enemy.Draw();
    enemy.Update();
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

// todo: fix this function
function CheckTileFallOnMurphy() {
  for (let zonk of zonks) {
    if (zonk.Collide(murphy) && zonk.isLerping) {
      Busted();
    }
    // if (zonk.col == murphy.col && zonk.Row == murphy.Row) {
    //   Busted();
    // }
  }
}

async function CheckMurphyEnemyCollision() {
  for (let enemy of enemies) {
    if (murphy.Collide(enemy)) {
      Busted();
      return;
    }
  }
}

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

function MurphyPushRight() {
  for (let zonk of zonks) {
    if (zonk.pos.y == murphy.pos.y && zonk.pos.x - murphy.pos.x <= TILE_SIZE) {
      zonk.GoRight();
      murphy.GoRight();
    }
  }
}

function MurphyPushLeft() {
  for (let zonk of zonks) {
    if (zonk.pos.y == murphy.pos.y && murphy.pos.x - zonk.pos.x <= TILE_SIZE) {
      zonk.GoLeft();
      murphy.GoLeft();
    }
  }
}

function MoveMurphyRight() {
  if (murphy.CanPushRight()) {
    MurphyPushRight();
  } else {
    murphy.GoRight();
  }
}

function MoveMurphyLeft() {
  if (murphy.CanPushLeft()) {
    MurphyPushLeft();
  } else {
    murphy.GoLeft();
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
        MoveMurphyRight();
      } else if (keyIsDown(LEFT_ARROW)) {
        MoveMurphyLeft();
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
      MoveMurphyRight();
    } else if (keyCode === LEFT_ARROW) {
      MoveMurphyLeft();
    } else if (keyCode === UP_ARROW) {
      murphy.GoUp();
    } else if (keyCode === DOWN_ARROW) {
      murphy.GoDown();
    }
  }
}
//#endregion
