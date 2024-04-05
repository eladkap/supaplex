class Utils {
  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static readTextFile(txtFile) {
    var allText = loadStrings(txtFile);
    return allText;
  }

  static consoleLog(msg) {
    if (DEBUG_FLAG) {
      console.log(msg);
    }
  }

  static loadLevelFromTileMap(tileMapFile) {
    let tileMapText = Utils.readTextFile(tileMapFile);
    return new Level(0, '---DEMO LEVEL---', tileMapText, 0, false);
  }

  static loadLevelsDataFile(binFile) {
    let data = loadBytes(binFile);
    return data;
  }

  static convertHexTile(hexTile) {
    if (hexTile >= 26) {
      return TILE_FRAME;
    }
    let tileType = TILE_CODE_DICTIONARY[hexTile];
    if (tileType == undefined) {
      return TILE_EMPTY;
    }
    return tileType;
  }

  static loadLevel(data, levelIndex) {
    let tileMap = [];
    let offset = levelIndex * BYTES_PER_LEVEL;
    let index = offset;
    for (let row = 0; row < MAP_ROWS; row++) {
      let rowTiles = [];
      for (let col = 0; col < MAP_COLS; col++) {
        let hexTile = data.bytes[index];
        let tileType = Utils.convertHexTile(hexTile);
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

    let infotronsNeeded = int(data.bytes[offset + 1470]);
    let gravity = false;

    let level = new Level(
      levelIndex + 1,
      title,
      tileMap,
      infotronsNeeded,
      gravity
    );
    return level;
  }

  /**
   * Load all levels
   * 
   * @param {*} levelsDataObj 
   * @returns levels
   */
  static loadLevels(levelsDataObj) {
    let levels = [];
    let levelsNum = levelsDataObj.bytes.length / BYTES_PER_LEVEL;
    for (let i = 0; i < levelsNum; i++) {
      levels.push(Utils.loadLevel(levelsDataObj, i));
    }
    return levels;
  }
}










