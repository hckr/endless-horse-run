function Skeleton(start_left, start_bottom) {
    this.image = new Image();
    this.image.src = this.file;
    this.image_attack = new Image();
    this.image_attack.src = this.file_attack;
    this.inner_counter = 0;
    this.current_frame = this.frames.length - 1;
    this.effective_width = (this.width * this.scale_factor) | 0;
    this.effective_height = (this.height * this.scale_factor) | 0;
    this.pos_x = start_left;
    this.pos_y = start_bottom - this.effective_height;
    this.speed = Math.random() * 2 + 8;
    this.stopped = false;
    this.attacking = false;
}

Skeleton.prototype = {
    file: 'assets/skeleton_walk_mirror.png',
    file_attack: 'assets/skeleton_attack_mirror.png',
    width: 22,
    height: 33,
    scale_factor: 1.6,
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
    frames_attack: [
        { top: 0, left: 0 },
        { top: 0, left: 43 },
        { top: 0, left: 86 },
        { top: 0, left: 129 },
        { top: 0, left: 172 },
        { top: 0, left: 215 },
        { top: 0, left: 258 },
        { top: 0, left: 301 },
        { top: 0, left: 344 },
        { top: 0, left: 387 },
        { top: 0, left: 430 },
        // { top: 0, left: 473 },
        // { top: 0, left: 516 },
        // { top: 0, left: 559 },
        // { top: 0, left: 602 },
        // { top: 0, left: 645 },
        // { top: 0, left: 688 },
        // { top: 0, left: 731 },
    ],
    update: function() {
        if (!this.stopped || this.attacking) {
            this.inner_counter += 1;
            if (this.inner_counter % 2 == 0) {
                this.inner_counter = 0;
                this.current_frame = this.current_frame - 1;
                if (this.current_frame < 0) {
                    this.current_frame += this.frames.length;
                }
            }
            if (!this.attacking) {
                this.pos_x -= this.speed;
            }
        }
    },
    drawOn: function(ctx) {
        let frame = this.frames[this.current_frame];
        ctx.drawImage(this.image, frame.left, frame.top, this.width, this.height, this.pos_x | 0, this.pos_y | 0, this.effective_width, this.effective_height);
    },
    collisionRect: function() {
        return {
            x: this.pos_x | 0,
            y: this.pos_y | 0,
            width: this.effective_width,
            height: this.effective_height
        };
    },
    attack: function() {
        if(!this.attacking) {
            this.attacking = true;
            this.image = this.image_attack;
            this.width = 43;
            this.pos_x -= 21;
            this.height = 37;
            this.pos_y -= 3;
            this.effective_width = (this.width * this.scale_factor) | 0;
            this.effective_height = (this.height * this.scale_factor) | 0;
            this.frames = this.frames_attack;
            this.inner_counter = 0;
            this.current_frame = 0;
        }
    },
    stop: function() {
        this.stopped = true;
    }
}
