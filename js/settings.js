/* Screen settings */
const SCREEN_WIDTH = window.innerWidth; // 1024;
const SCREEN_HEIGHT =  768;

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
const LERP_UNIT_SLOW = 0.1;
const LERP_UNIT_NORMAL = 0.2;
const LERP_UNIT_FAST = 0.25;

const LERP_MODE_NORMAL = 1;
const LERP_MODE_SLOW = 2;

/* Mechanics */
const COLLISION_GAP = 0.9;

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

const INFOTRONS = 10;

/* Fonts */
const POINTS_FONT_SIZE = 20;
const FONT_FAMILY = 'College';
const MESSAGE_FONT_SIZE1 = 64;
const MESSAGE_FONT_SIZE2 = 32;
const MESSAGE_FONT_SIZE3 = 28;

/* Tile codes */
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
const TILE_RIGHT_PORT = 'r';
const TILE_LEFT_PORT = 'l';
const TILE_DOWN_PORT = 'd';
const TILE_UP_PORT = 'u';
const TILE_VER_PORT = 'V';
const TILE_HOR_PORT = 'H';
const TILE_CROSS_PORT = 'C';
const TILE_BOMB_ORANGE = 'O';
const TILE_BOMB_YELLOW = 'Y';
const TILE_BOMB_RED = 'R';
const TILE_TERMINAL = 'T';


const TILE_CODE_DICTIONARY = {
  0: TILE_EMPTY,
  1: TILE_ZONK,
  2: TILE_BASE,
  3: TILE_MURPHY,
  4: TILE_INFOTRON,
  5: TILE_WALL,
  6: TILE_FRAME,
  7: TILE_EXIT,
  8: TILE_BOMB_ORANGE,
  9: TILE_RIGHT_PORT,
  10: TILE_DOWN_PORT,
  11: TILE_LEFT_PORT,
  12: TILE_UP_PORT,
  17: TILE_SNIKSNAK,
  18: TILE_BOMB_YELLOW,
  19: TILE_TERMINAL,
  20: TILE_BOMB_RED,
  21: TILE_VER_PORT,
  22: TILE_HOR_PORT,
  23: TILE_CROSS_PORT,
  24: TILE_ELECTRON,
  25: TILE_BUG,
};

/* Scoreboard settings */
const SCORE_BOARD_POS_X = SCREEN_WIDTH * 0.05;
const SCORE_BOARD_POS_Y = SCREEN_HEIGHT * 0.1;
const SCORE_BOARD_WIDTH = 100;
const SCORE_BOARD_HEIGHT = 200;

/* Game States */
const GameStates = Object.freeze({
  GAME_READY: 0,
  GAME_PLAY: 1,
  GAME_LEVEL_COMPLETED: 2,
  GAME_BUSTED: 3,
  GAME_PAUSED: 4,
  GAME_FINISHED: 5
})


const READY_DELAY_MS = 2000;
const BUG_DURATION_SEC = 3;
const EXPLOSION_DURATION = 3;

/* Image files */
const TILE_IMAGE_DICT = {
  base: 'images/modern/base.png',
  bug: 'images/modern/bug.png',
  infotron: 'images/modern/infotron.png',
  zonk: 'images/modern/zonk.png',
  terminal: 'images/modern/terminal.png',
  left_port: 'images/modern/left_port.png',
  right_port: 'images/modern/right_port.png',
  up_port: 'images/modern/up_port.png',
  down_port: 'images/modern/down_port.png',
  vertical_port: 'images/modern/vertical_port.png',
  horizontal_port: 'images/modern/horizontal_port.png',
  cross_port: 'images/modern/cross_port.png',
  wall: 'images/modern/wall.png',
  ram_chip: 'images/modern/ram_chip.png',
  exit: 'images/modern/exit.png',
  exit_green: 'images/modern/exit-green.png',
  yellow_bomb: 'images/modern/yellow_disk.png',
  orange_bomb: 'images/modern/orange_disk.png',
  red_bomb: 'images/modern/red_disk.png',
};

const TILE_EMOJI_DICT = {
  murphy: '🙂',
  frame: '🔲',
  base: '🟩',
  bug: '🟥',
  infotron: '💎',
  zonk: '🌑',
  terminal: '📟',
  left_port: '⬅️',
  right_port: '➡️',
  up_port: '⬆️',
  down_port: '⬇️',
  vertical_port: '⏬',
  horizontal_port: '⏩',
  cross_port: '🔄',
  wall: '🟫',
  ram_chip: '🟪',
  exit: '🔚',
  yellow_bomb: '📒',
  orange_bomb: '📙',
  red_bomb: '📕',
  sniksnak: '☀️',
  electron: '💫',
  explosion: '💥'
};

const DEMO_LEVEL_FILE = 'data/level_demo.txt';
const LEVELS_DATA_FILE_PATH = 'data/LEVELS.DAT';
const DEMO_REQUIRED_INFORTRONS = 1;

const BYTES_PER_LEVEL = 1536;

const SPACE_KEY = 32;

const DEBUG_FLAG = true;

const GFX_TILE_EMOJI_MODE = 'gfx_emoji';
const GFX_TILE_IMAGE_MODE = 'gfx_image';

const GFX_MODE = GFX_TILE_IMAGE_MODE;

const LOAD_DEMO_LEVEL = true;
