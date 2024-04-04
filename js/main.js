var levels;
var levelSelector;
var startButton;
var chosenLevelIndex = 0;
var levelsDataObj;

function preload() {
  levelsDataObj = Utils.loadLevelsDataFile(LEVELS_DATA_FILE_PATH);
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  levels = Utils.loadLevels(levelsDataObj);
  let levelTitles = [];
  levels.forEach((level) =>
    levelTitles.push(level.Number + ': ' + level.Title)
  );
  levelSelector = CreateSelector(
    SCREEN_WIDTH * 0.4,
    SCREEN_HEIGHT * 0.2,
    levelTitles,
    LevelChanged
  );
  startButton = CreateButton(
    'START',
    SCREEN_WIDTH * 0.4,
    SCREEN_HEIGHT * 0.1,
    StartLevel
  );
}

function draw() {
  background(BLACK);
}

function CreateSelector(x, y, options, action) {
  sel = createSelect();
  sel.position(x, y);
  for (let opt of options) {
    sel.option(opt);
  }
  sel.changed(action);
  return sel;
}

function CreateButton(caption, x, y, action) {
  let button = createButton(caption);
  button.position(x, y);
  button.mousePressed(action);
  return button;
}

function LevelChanged() {
  chosenLevelIndex = levelSelector.value().split(':')[0] - 1;
}

function StartLevel() {
  window.location.href = 'game.html' + '#' + chosenLevelIndex.toString();
}
