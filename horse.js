function Horse(start_left, start_bottom) {
    this.image = new Image();
    this.image.src = this.file;
    this.current_frame = 0;
    this.jumping = false;
    this.jump_height = 0;
    this.jump_ascending;
    this.pos_x = start_left;
    this.initial_pos_y = start_bottom - this.height;
}

Horse.prototype = {
    file: 'assets/horse.png',
    width: 98,
    height: 64,
    frames: [
        { top: 1692, left: 15 },
        { top: 1692, left: 143 },
        { top: 1692, left: 271 },
        { top: 1692, left: 399 },
        { top: 1820, left: 15 },
        { top: 1820, left: 143 },
        { top: 1820, left: 271 },
        { top: 1820, left: 399 },
        { top: 1948, left: 15},
        { top: 1948, left: 143 },
        { top: 1948, left: 271 }
    ],
    jump_freeze_frame: 7,
    jump_step: function() {
        return (this.jump_max_height * 1.5 - this.jump_height) * 0.15;
    },
    gravity: 8,
    jump_max_height: 110,
    startJump: function() {
        if (!this.jumping) {
            this.jumping = true;
            this.jump_ascending = true;
        }
    },
    endJump: function() {
        if (this.jumping) {
            this.jump_ascending = false;
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
        this.pos_y = this.initial_pos_y - this.jump_height;
    },
    drawOn: function(ctx) {
        let frame = this.frames[this.current_frame];
        ctx.drawImage(this.image, frame.left, frame.top, this.width, this.height, this.pos_x, this.pos_y, this.width, this.height);
    }
}
