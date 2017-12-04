let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 300;

document.body.appendChild(canvas);

function newGame() {
    let gameOver = false;

    let horse = new Horse(200, 300);
    let skeletons = [];

    let pressedKeys = {};

    function keyDownListener(e) {
        if (pressedKeys[e.keyCode]) {
            return; // disable automatic key repetition
        }
        pressedKeys[e.keyCode] = true;

        if (e.keyCode == 32) {
            horse.startJump();
        }
    }
    document.addEventListener('keydown', keyDownListener);

    function keyUpListener(e) {
        pressedKeys[e.keyCode] = false;

        if (e.keyCode == 32) {
            horse.endJump();
        }
    }
    document.addEventListener('keyup', keyUpListener);

    function restartGame() {
        skeletons = [];
        horse.restart();
        gameOver = false;
    }

    let last_skeleton_added = 0;

    function checkCollision(first, second) {
        let rect1 = first.collisionRect(),
            rect2 = second.collisionRect();

        // https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.height + rect1.y > rect2.y;
    }

    (function update() {
        horse.update();
        skeletons = skeletons.filter(s => s.pos_x > -100);
        if (!gameOver) {
            if (Date.now() - last_skeleton_added > 1200) {
                if (Math.random() > 0.6) {
                    skeletons.push(new Skeleton(canvas.width, 300));
                }
                last_skeleton_added = Date.now();
            }
        }
        skeletons.forEach(s => {
            s.update();
            if (checkCollision(horse, s)) {
                gameOver = true;
                s.attack();
                horse.stop();
            }
        });
        if (gameOver) {
            skeletons.forEach(s => s.stop());
            setTimeout(restartGame, 3000);
        }
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
}

newGame();
