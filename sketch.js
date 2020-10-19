var game;
var tileMap;
var spaceKeyIsHold;

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

function draw() {
  background(BLACK);
  game.Update();

  if (game.State == GAME_READY) {
    DisplayReady();
  }
  if (game.State == GAME_PAUSED) {
    DisplayPause();
  }
  if (game.State == GAME_BUSTED) {
    DisplayBusted();
  }
  // game.CheckMurphyEatElement();
  if (game.CheckMurphyCollidesBug()) {
    Busted();
  }

  if (game.CheckMurphyCollidesEnemy()) {
    Busted();
  }

  DisplayMessage(
    `CAM: ${Math.round(game.cam.pos.x / TILE_SIZE)},${Math.round(
      game.cam.pos.y / TILE_SIZE
    )}`,
    50,
    50,
    WHITE,
    24
  );

  DisplayMessage(
    `MURPHY: ${Math.round(game.murphy.pos.x / TILE_SIZE)},${Math.round(
      game.murphy.pos.y / TILE_SIZE
    )}`,
    200,
    50,
    WHITE,
    24
  );

  // CheckTileFallOnMurphy();

  CheckKeyIsDown();

  // DrawGameSignature();
}
//#endregion

function DrawGameSignature() {
  DisplayMessage(
    'Deveolped by Elad Kapuza 2020',
    MAP_POS_X,
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

function DrawMap() {
  strokeWeight(1);
  stroke(NAVY);
  noFill();
  rect(MAP_POS_X, MAP_POS_Y, map.Width, map.Height);
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
  let msg_x = (MAP_POS_X + SCREEN_WIDTH) * 0.32;
  let msg_y = SCREEN_HEIGHT * 0.58;
  let msg = 'Busted!';
  DisplayMessage(msg, msg_x, msg_y, RED, MESSAGE_FONT_SIZE1);
  msg_x = (MAP_POS_X + SCREEN_WIDTH) * 0.3;
  msg_y = SCREEN_HEIGHT * 0.71;
  msg = 'Press SPACE to restart.';
  DisplayMessage(msg, msg_x, msg_y, WHITE, MESSAGE_FONT_SIZE2);
}

function DisplayGameOver() {
  let msg_x = (MAP_POS_X + SCREEN_WIDTH) * 0.3;
  let msg_y = SCREEN_HEIGHT * 0.58;
  let msg = 'GAME OVER';
  DisplayMessage(msg, msg_x, msg_y, RED, MESSAGE_FONT_SIZE);
}

function DisplayPause() {
  let msg_x = (MAP_POS_X + SCREEN_WIDTH) * 0.28;
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

function FinishGame() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = 'Game Finished';
  game.SetState(GAME_FINISHED);
  DisplayMessage(msg, msg_x, msg_y, GREEN, MESSAGE_FONT_SIZE2);
  noLoop();
}

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
