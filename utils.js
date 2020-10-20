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

// elad
function LoadLevelsDataFile(binFile) {
  let data = loadBytes(binFile);
  return data;
}

// elad
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

//elad
function LoadLevel(data) {
  let levelIndex = LEVEL_NUMBER - 1;
  let lines = [];
  let offset = levelIndex * 1536;
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
    lines.push(line);
  }
  return lines;
}
