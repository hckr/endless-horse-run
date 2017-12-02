function Skeleton() {
    this.image = new Image();
    this.image.src = this.file;
    this.current_frame = this.frames.length - 1;
}

Skeleton.prototype = {
    file: 'assets/skeleton_walk_mirror.png',
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
    update: function() {
        this.current_frame = this.current_frame - 1;
        if (this.current_frame < 0) {
            this.current_frame += this.frames.length;
        }
    }
}
