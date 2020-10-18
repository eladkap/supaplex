/* Screen settings */
const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

const FPS = 30;

const TILE_SIZE = 50;

/* Maze settings */
const MAZE_POS_X = 0;
const MAZE_POS_Y = 100;

const MAZE_ROWS = 24;
const MAZE_COLS = 60;

const MAZE_WIDTH = MAZE_COLS * TILE_SIZE;
const MAZE_HEIGHT = MAZE_ROWS * TILE_SIZE;

// LERP settings - Linear Interpolation - Animation movement unit
const LERP_UNIT_NORMAL = 0.2;
const LERP_UNIT_SLOW = 0.1;

const LERP_MODE_NORMAL = 1;
const LERP_MODE_SLOW = 2;

/* COLORS */
const BLACK = [0, 0, 0];
const BLACK1 = [20, 20, 20];
const WHITE = [255, 255, 255];
const GRAY1 = [100, 100, 100];
const GRAY2 = [150, 150, 150];
const GRAY3 = [200, 200, 200];
const RED = [220, 0, 0];
const ORANGE = [250, 150, 50];
const PINK = [250, 100, 150];
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
const MESSAGE_FONT_SIZE3 = 24;

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

/* Stats settings */
const STATS_POS_X = SCREEN_WIDTH * 0.1;
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

const LEVEL_FILE_PATH = 'levels/levels.txt';

const SPACE_KEY = 32;

const DEBUG_FLAG = true;
