let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

let horse = new Horse();
let skeleton = new Skeleton();

let pressedKeys = {};

document.addEventListener('keydown', e => {
    if (pressedKeys[e.keyCode]) {
        return; // disable automatic key repetition
    }
    pressedKeys[e.keyCode] = true;
    if (e.keyCode == 32) {
        horse.jump();
    }
});

document.addEventListener('keyup', e => {
    pressedKeys[e.keyCode] = false;
});

(function update() {
    horse.update();
    skeleton.update();
    setTimeout(update, 50);
})();

(function draw() {
    ctx.fillStyle = 'magenta';
    ctx.strokeStyle = 'cyan';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let h_frame = horse.frames[horse.current_frame];
    ctx.drawImage(horse.image, h_frame.left, h_frame.top, horse.width, horse.height, 100, 200 - horse.jump_height, horse.width, horse.height);
    ctx.strokeRect(100, 200, horse.width, horse.height);

    let s_frame = skeleton.frames[skeleton.current_frame];
    ctx.drawImage(skeleton.image, s_frame.left, s_frame.top, skeleton.width, skeleton.height, 300, 200 + 11, skeleton.width * skeleton.scale_factor, skeleton.height * skeleton.scale_factor);
    ctx.strokeRect(300, 200 + 11, skeleton.width * skeleton.scale_factor, skeleton.height * skeleton.scale_factor);

    requestAnimationFrame(draw);
})();
