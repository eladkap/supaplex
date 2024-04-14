var game;
var tileMap;
var spaceKeyIsHold;
var lerpSpeed = LERP_UNIT_NORMAL;

var levelDataObj;
var demoLevel;

//#region Images
var tileImages = {};
//#endregion

//#region Main Functions
function LoadTileMap() {
  tileMap = Utils.readTextFile(LEVEL_FILE_PATH);
}

function LoadImages() {
  for (let key of Object.keys(TILE_IMAGE_DICT)) {
    tileImages[key] = loadImage(TILE_IMAGE_DICT[key]);
  }
}

function preload() {
  demoLevel = Utils.loadLevelFromTileMap(DEMO_LEVEL_FILE);
  levelDataObj = Utils.loadLevelsDataFile(LEVELS_DATA_FILE_PATH);
  if (GFX_MODE == GFX_TILE_IMAGE_MODE) {
    LoadImages();
  }
  console.log('Game was loaded.');
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  frameRate(FPS);
  imageMode(CENTER);
  let level = null;
  if (LOAD_DEMO_LEVEL) {
    level = demoLevel;
  } else {
    let chosenLevelIndex = int(window.location.href.split('#')[1]);
    level = Utils.loadLevel(levelDataObj, chosenLevelIndex);
  }

  game = new Game(level);
  game.Setup();
  noLoop();
}

/**
 * Handles user's input via keyboard
 */
function processInput() {
  CheckKeyIsDown();
}

/**
 * Update game elements
 */
function update() {
  // AI

  // Physics
  // Murphy interacts with static objects (ram-chip/hardward, ports, exit) - interactWithTile()

  // Check Murphy completed level
  if (game.isCompleted) {
    levelCompleted();
  }

  // check murphy eats elements (infotron, base, bug, red disk)
  if (!game.collectTile()) {
    Busted();
  }

  // check murphy pushes elements (zonk, orange disk, yellow disk)
  // check murphy collides enemies/explosion

  game.MoveFallingElements();
  // game.MoveEnemies();

  if (game.collideEnemy()) {
    Busted();
  }

  // update destroyed tiles
  game.updateDestroyedTiles();
}

/**
 * Draws game elements
 */
function render() {
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

  // Play sound
}

/**
 * Game loop:
 * - process input
 * - update
 * - render
 */
function draw() {
  processInput();
  update();
  render();
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
  console.log('Reset round');
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
  console.log('Busted');
  game.SetWallsColor(DARK_BLUE);
  game.SetState(GAME_BUSTED);
  DisplayBusted();
  noLoop();
}

function displayLevelCompleted() {
  let msg_x = SCREEN_WIDTH * 0.3;
  let msg_y = SCREEN_HEIGHT * 0.71;
  let msg = 'Level completed';
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
    MESSAGE_FONT_SIZE3
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
  DisplayMessage(msg, msg_x, msg_y, RED, MESSAGE_FONT_SIZE2);
}

function DisplayPause() {
  let msg_x = (MAP_POS_X + SCREEN_WIDTH) * 0.32;
  let msg_y = SCREEN_HEIGHT * 0.55;
  let msg = 'Game Paused';
  DisplayMessage(msg, msg_x, msg_y, WHITE, MESSAGE_FONT_SIZE1);
}

function PauseGame() {
  console.log('Game paused.');
  game.SetState(GAME_PAUSED);
  game.SetWallsColor(DARK_BLUE);
  DisplayPause();
  noLoop();
}

function ResumeGame() {
  console.log('Game resumed');
  game.Resume();
  loop();
}

function levelCompleted() {
  console.log('Level completed.');
  game.SetState(GAME_LEVEL_COMPLETED);
  game.SetWallsColor(DARK_BLUE);
  displayLevelCompleted();
  noLoop();
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

//#region Keyboard Events
function CheckKeyIsDown() {
  if (game.State == GAME_PLAY) {
    if (keyIsDown(SPACE_KEY)) {
      spaceKeyIsHold = true;
    }
    if (spaceKeyIsHold) {
      if (keyIsDown(RIGHT_ARROW)) {
        game.murphyCollectTileWithoutEntering('R');
      } else if (keyIsDown(LEFT_ARROW)) {
        game.murphyCollectTileWithoutEntering('L');
      } else if (keyIsDown(UP_ARROW)) {
        game.murphyCollectTileWithoutEntering('U');
      } else if (keyIsDown(DOWN_ARROW)) {
        game.murphyCollectTileWithoutEntering('D');
      }
    } else {
      if (keyIsDown(RIGHT_ARROW)) {
        game.moveMurphyToDirection('R')
      } else if (keyIsDown(LEFT_ARROW)) {
        game.moveMurphyToDirection('L');
      } else if (keyIsDown(UP_ARROW)) {
        game.moveMurphyToDirection('U');
      } else if (keyIsDown(DOWN_ARROW)) {
        game.moveMurphyToDirection('D');
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
      game.moveMurphyToDirection('R');
    } else if (keyCode === LEFT_ARROW) {
      game.moveMurphyToDirection('L');
    } else if (keyCode === UP_ARROW) {
      game.moveMurphyToDirection('U');
    } else if (keyCode === DOWN_ARROW) {
      game.moveMurphyToDirection('D');
    }
    // if (key == '1') {
    //   lerpSpeed = LERP_UNIT_SLOW;
    //   console.log('Changed speed to slow');
    // }
    // if (key == '2') {
    //   lerpSpeed = LERP_UNIT_NORMAL;
    //   console.log('Changed speed to normal');
    // }
    // if (key == '3') {
    //   lerpSpeed = LERP_UNIT_FAST;
    //   console.log('Changed speed to fast');
    // }
  }
}
//#endregion
