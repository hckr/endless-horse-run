function Horse() {
    this.image = new Image();
    this.image.src = this.file;
    this.current_frame = 0;
    this.jumping = false;
    this.jump_height = 0;
    this.jump_ascending;
}

Horse.prototype = {
    file: 'assets/horse.png',
    width: 128,
    height: 64,
    frames: [
        { top: 1692, left: 0 },
        { top: 1692, left: 128 },
        { top: 1692, left: 256 },
        { top: 1692, left: 384 },
        { top: 1820, left: 0 },
        { top: 1820, left: 128 },
        { top: 1820, left: 256 },
        { top: 1820, left: 384 },
        { top: 1948, left: 0 },
        { top: 1948, left: 128 },
        { top: 1948, left: 256 }
    ],
    jump_freeze_frame: 7,
    jump_step: function() {
        return (this.jump_max_height * 1.5 - this.jump_height) * 0.5;
    },
    gravity: 20,
    jump_max_height: 100,
    jump: function() {
        if (!this.jumping) {
            this.last_jump = Date.now();
            horse.jumping = true;
            horse.jump_ascending = true;
        }
    },
    update: function() {
        if (this.jumping) {
            this.current_frame = this.jump_freeze_frame;
            if (this.jump_ascending) {
                if (this.jump_height < this.jump_max_height) {
                    this.jump_height += this.jump_step();
                } else {
                    this.jump_ascending = false;
                }
            }
        } else {
            this.current_frame = (this.current_frame + 1) % this.frames.length;
        }
        this.jump_height -= this.gravity;
        if (this.jump_height < 0) {
            this.jumping = false;
            this.jump_height = 0;
        }
    }
}
