class Box {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.up = true;
        this.right = true;
        this.down = true;
        this.left = true;
        this.used = false;
    }

    show() {
        if (this.used) {
            fill(127, 0, 255);
        } else {
            fill(204, 153, 0);
        }
        rect(this.x, this.y, this.w, this.w);
        this.showWalls();
    }

    showWalls() {
        stroke(0);
        strokeWeight(2);
        if (this.up) {
            line(this.x, this.y, this.x + this.w, this.y);
        }
        if (this.right) {
            line(this.x + this.w, this.y, this.x + this.w, this.y + this.w);
        }
        if (this.down) {
            line(this.x, this.y + this.w, this.x + this.w, this.y + this.w);
        }
        if (this.left) {
            line(this.x, this.y, this.x, this.y + this.w);
        }
        noStroke();
    }

    use() {
        this.used = true;
    }

    current() {
        fill(155, 255, 155);
        rect(this.x, this.y, this.w, this.w);
    }

    isUsed() {
        return this.used;
    }

    breakWall(direction) {
        switch (direction) {
            case 0:
                this.up = false;
                break;
            case 1:
                this.right = false;
                break;
            case 2:
                this.down = false;
                break;
            case 3:
                this.left = false;
                break;

            default:
                break;
        }
    }
}