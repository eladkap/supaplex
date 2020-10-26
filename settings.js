/* Screen settings */
const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

const FPS = 30;

const TILE_SIZE = 50;

/* Map settings */
const MAP_POS_X = 0;
const MAP_POS_Y = 100;

const MAP_ROWS = 24;
const MAP_COLS = 60;

const MAP_WIDTH = MAP_COLS * TILE_SIZE;
const MAP_HEIGHT = MAP_ROWS * TILE_SIZE;

// LERP settings - Linear Interpolation - Animation movement unit
const LERP_UNIT_NORMAL = 0.2;
const LERP_UNIT_SLOW = 0.1;

const LERP_MODE_NORMAL = 1;
const LERP_MODE_SLOW = 2;

/* COLORS */
const BLACK = [0, 0, 0];
const BLACK1 = [20, 20, 20];
const WHITE = [255, 255, 255];
const GRAY0 = [50, 50, 50];
const GRAY1 = [100, 100, 100];
const GRAY2 = [150, 150, 150];
const GRAY3 = [200, 200, 200];
const RED = [220, 0, 0];
const ORANGE = [250, 150, 50];
const PINK = [250, 100, 150];
const BROWN = [200, 200, 0];
const YELLOW = [255, 255, 0];
const GREEN = [0, 100, 0];
const AQUA = [100, 255, 255];
const BLUE = [0, 0, 250];
const PURPLE = [200, 0, 250];
const NAVY = [0, 0, 128];
const DARK_BLUE = [0, 0, 64];

/* Murphy settings */
const MURPHY_RADIUS = TILE_SIZE / 2;
const MURPHY_SPEED = 1 * TILE_SIZE;

const MURHPY_ROW = 15; // todo: should be defined in level txt file
const MURHPY_COL = 9; // todo: should be defined in level txt file

const MAX_LIVES = 5;

const INFOTRONS = 10;

/* Fonts */
const POINTS_FONT_SIZE = 20;
const FONT_FAMILY = 'College';
const MESSAGE_FONT_SIZE1 = 64;
const MESSAGE_FONT_SIZE2 = 32;
const MESSAGE_FONT_SIZE3 = 28;

/* Tile Symbols */
const MURPHY_SYMBOL = '🙂';
const FRAME_SYMBOL = '🔲';
const WALL_SYMBOL = '🟫';
const INFOTRON_SYMBOL = '💎';
const ZONK_SYMBOL = '🌑';
const BUG_SYMBOL = '⚡️';
const BASE_SYMBOL = '🟩';
const ELECTRON_SYMBOL = '💫'; // '⭐️'
const SNIKSNAK_SYMBOL = '☀️'; //'☀️✂️'
const EXIT_SYMBOL = 'E';
const EXPLOSION_SYMBOL = '💥';

const TILE_MURPHY = 'M';
const TILE_FRAME = 'F';
const TILE_EMPTY = '_';
const TILE_BASE = 'B';
const TILE_WALL = 'W';
const TILE_ZONK = 'Z';
const TILE_INFOTRON = 'I';
const TILE_ELECTRON = 'e';
const TILE_SNIKSNAK = 'S';
const TILE_EXIT = 'E';
const TILE_BUG = 'b';
const TILE_RIGHT_PORT = 'RP';
const TILE_LEFT_PORT = 'LP';
const TILE_DOWN_PORT = 'DP';
const TILE_UP_PORT = 'UP';
const TILE_VER_PORT = 'VP';
const TILE_HOR_PORT = 'HP';
const TILE_CROSS_PORT = 'CP';

const TILE_DICTIONARY = {
  0: TILE_EMPTY,
  1: TILE_ZONK,
  2: TILE_BASE,
  3: TILE_MURPHY,
  4: TILE_INFOTRON,
  5: TILE_WALL,
  6: TILE_FRAME,
  7: TILE_EXIT,
  9: TILE_RIGHT_PORT,
  10: TILE_DOWN_PORT,
  11: TILE_LEFT_PORT,
  12: TILE_UP_PORT,
  17: TILE_SNIKSNAK,
  21: TILE_VER_PORT,
  22: TILE_HOR_PORT,
  23: TILE_CROSS_PORT,
  24: TILE_ELECTRON,
  25: TILE_BUG,
};

/* Stats settings */
const STATS_POS_X = SCREEN_WIDTH * 0.05;
const STATS_POS_Y = SCREEN_HEIGHT * 0.1;
const STATS_WIDTH = 100;
const STATS_HEIGHT = 200;

/* Game States */
const GAME_READY = 0;
const GAME_PLAY = 1;
const GAME_LEVEL_COMPLETED = 2;
const GAME_BUSTED = 3;
const GAME_PAUSED = 4;
const GAME_FINISHED = 5;
const GAME_OVER = 6;

const READY_DELAY_MS = 2000;
const BUG_DURATION_SEC = 2;

/* Image files */
const IMAGE_ZONK = 'images/zonk.png';
const IMAGE_LEFT_PORT = 'images/left_port.png';
const IMAGE_RIGHT_PORT = 'images/right_port.png';
const IMAGE_UP_PORT = 'images/up_port.png';
const IMAGE_DOWN_PORT = 'images/down_port.png';
const IMAGE_CROSS_PORT = 'images/cross_port.png';
const IMAGE_DUAL_HORIZONTAL_PORT = 'images/dual_port_horizontal.png';
const IMAGE_DUAL_VERTICAL_PORT = 'images/dual_port_vertical.png';

const LEVEL_FILE_PATH = 'data/levels.txt';
const LEVELS_DATA_FILE_PATH = 'data/LEVELS.DAT';

const BYTES_PER_LEVEL = 1536;

const SPACE_KEY = 32;

const DEBUG_FLAG = true;
