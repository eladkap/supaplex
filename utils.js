function Sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ReadTextFile(txtFile) {
  var allText = loadStrings(txtFile);
  return allText;
}

function ConsoleLog(msg) {
  if (DEBUG_FLAG) {
    console.log(msg);
  }
}

function LoadLevelsDataFile(binFile) {
  let data = loadBytes(binFile);
  return data;
}

function ConvertHexTile(hexTile) {
  if (hexTile >= 26) {
    return TILE_FRAME;
  }
  tileType = TILE_DICTIONARY[hexTile];
  if (tileType == undefined) {
    return TILE_EMPTY;
  }
  return tileType;
}

// Return level object
function LoadLevel(data, levelIndex) {
  let tileMap = [];
  let offset = levelIndex * BYTES_PER_LEVEL;
  let index = offset;
  for (let row = 0; row < MAP_ROWS; row++) {
    let rowTiles = [];
    for (let col = 0; col < MAP_COLS; col++) {
      let hexTile = data.bytes[index].toString(16);
      let tileType = ConvertHexTile(hexTile);
      rowTiles.push(tileType);
      index++;
    }
    let line = join(rowTiles, ' ');
    tileMap.push(line);
  }

  // Get level title
  let i = offset + 1446;
  let title = '';
  while (i < offset + 1446 + 23) {
    title += String.fromCharCode(data.bytes[i]);
    i++;
  }

  infotronsNeeded = int(data.bytes[offset + 1470]);
  console.log(infotronsNeeded);
  gravity = false;

  let level = new Level(
    levelIndex + 1,
    title,
    tileMap,
    infotronsNeeded,
    gravity
  );
  return level;
}

// Load all levels
function LoadLevels(levelsDataObj) {
  let levels = [];
  let levelsNum = levelsDataObj.bytes.length / BYTES_PER_LEVEL;
  for (let i = 0; i < levelsNum; i++) {
    levels.push(LoadLevel(levelsDataObj, i));
  }
  return levels;
}
