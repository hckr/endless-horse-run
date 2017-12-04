function Skeleton(start_left, start_bottom) {
    this.image = new Image();
    this.image.src = this.file;
    this.inner_counter = 0;
    this.current_frame = this.frames.length - 1;
    this.effective_width = this.width * this.scale_factor;
    this.effective_height = this.height * this.scale_factor;
    this.pos_x = start_left;
    this.pos_y = start_bottom - this.effective_height;
    this.speed = Math.random() * 2 + 9;
}

Skeleton.prototype = {
    file: 'assets/skeleton_walk_mirror.png',
    width: 22,
    height: 33,
    scale_factor: 1.4,
    frames: [
        { top: 0, left: 0 },
        { top: 0, left: 22 },
        { top: 0, left: 44 },
        { top: 0, left: 66 },
        { top: 0, left: 88 },
        { top: 0, left: 110 },
        { top: 0, left: 132 },
        { top: 0, left: 154 },
        { top: 0, left: 176 },
        { top: 0, left: 198 },
        { top: 0, left: 220 },
        { top: 0, left: 242 },
        { top: 0, left: 264 }
    ],
    update: function() {
        this.inner_counter += 1;
        if (this.inner_counter % 2 == 0) {
            this.inner_counter = 0;
            this.current_frame = this.current_frame - 1;
            if (this.current_frame < 0) {
                this.current_frame += this.frames.length;
            }
        }
        this.pos_x -= this.speed;
    },
    drawOn: function(ctx) {
        let frame = this.frames[this.current_frame];
        ctx.drawImage(this.image, frame.left, frame.top, this.width, this.height, this.pos_x, this.pos_y, this.effective_width, this.effective_height);
    }
}
