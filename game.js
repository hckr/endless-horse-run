let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

let horse = new Horse(200, 300);
let skeletons = [];

let pressedKeys = {};

document.addEventListener('keydown', e => {
    if (pressedKeys[e.keyCode]) {
        return; // disable automatic key repetition
    }
    pressedKeys[e.keyCode] = true;

    if (e.keyCode == 32) {
        horse.startJump();
    }
});

document.addEventListener('keyup', e => {
    pressedKeys[e.keyCode] = false;

    if (e.keyCode == 32) {
        horse.endJump();
    }
});

let last_skeleton_added = 0;

(function update() {
    horse.update();
    skeletons = skeletons.filter(s => s.pos_x > -100);
    if (Date.now() - last_skeleton_added > 1200) {
        if (Math.random() > 0.6) {
            skeletons.push(new Skeleton(canvas.width, 300));
        }
        last_skeleton_added = Date.now();
    }
    skeletons.forEach(s => s.update());
    setTimeout(update, 50);
})();

(function draw() {
    ctx.fillStyle = 'magenta';
    ctx.strokeStyle = 'cyan';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x of [horse, ...skeletons]) {
        x.drawOn(ctx);
    }

    requestAnimationFrame(draw);
})();
