class Explosion extends Tile {
    constructor(row, col, width, image, symbol) {
        super(row, col, width, image, symbol);
        this.duration = EXPLOSION_DURATION;
        this.count = 0;
    }

    Update() {
        if (frameCount % FPS == 0) {
            if (this.count < this.duration) {
                this.visible = true
            }
            else {
                this.visible = false;
            }
            this.count++;
        }
    }
}