let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 300;

let container = document.getElementById('game-container');
container.insertBefore(canvas, container.firstChild);

function newGame() {
    let gameOver = false,
        gamePaused = false,
        showControlsHint = true;

    const groundPosY = canvas.height - groundHeight;

    let horse = new Horse(100, groundPosY),
        skeletons = [],
        last_skeleton_added = 0,
        difficulty = 0;

    function restartGame() {
        skeletons = [];
        horse.restart();
        last_skeleton_added = Date.now();
        gameOver = false;
        difficulty = 0;
    }

    let pressedKeys = {};

    function keyDownListener(e) {
        if (pressedKeys[e.keyCode]) {
            return; // disable automatic key repetition
        }
        pressedKeys[e.keyCode] = true;

        if (!gameOver) {
            switch (e.keyCode) {
                case 32: // spacebar
                    horse.startJump();
                    showControlsHint = false;
                    break;
                case 80: // P
                    gamePaused = !gamePaused;
                    break;
            }
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

    window.onblur = function() {
        gamePaused = true;
    }

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
        if (!gamePaused) {
            horse.update();
            skeletons = skeletons.filter(s => s.pos_x > -100);
            if (!gameOver) {
                if (Date.now() - last_skeleton_added > 1200) {
                    if (Math.random() > 0.6) {
                        skeletons.push(new Skeleton(canvas.width, groundPosY));
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
        }
        setTimeout(update, 50);
    })();

    (function updateBackground() {
        if (!gameOver && !gamePaused) {
            updateGroundAndBackTrees(difficulty);
            updateForeTrees(difficulty);
            if (difficulty < 1) {
                difficulty += 0.0001;
            }
        }
        setTimeout(updateBackground, 20);
    })();

    (function draw() {
        ctx.fillStyle = '#81738e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawGroundAndBackTrees(ctx);

        for (let x of [horse, ...skeletons]) {
            x.drawOn(ctx);
        }

        drawForeTrees(ctx);

        ctx.fillStyle = 'white';
        ctx.font = '16px monospace';
        ctx.fillText(`Difficulty: ${Math.round(difficulty * 100)}%`, 10, 20);

        if (showControlsHint && !gameOver && !gamePaused) {
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '28px "Open Sans"';
            let text = "Hold spacebar to jump, release to land.",
                text2 = "Press P to toggle pause.";
            ctx.fillText(text, canvas.width / 2, 100);
            ctx.fillText(text2, canvas.width / 2, 140);
            ctx.restore();
        }

        if (gamePaused) {
            ctx.save();
            ctx.fillStyle = 'rgba(237, 116, 13, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgb(237, 116, 13)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '64px "Open Sans"';
            ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.strokeText('PAUSED', canvas.width / 2, canvas.height / 2);
            ctx.fillStyle = 'white';
            ctx.font = '24px "Open Sans"';
            ctx.fillText("Press P to continue.", canvas.width / 2, canvas.height - 80);
            ctx.restore();
        }

        if (gameOver) {
            ctx.save();
            ctx.fillStyle = 'rgba(138, 7, 7, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgb(138, 7, 7)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '64px "Open Sans"';
            ctx.fillText('YOU LOST', canvas.width / 2, canvas.height / 2);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.strokeText('YOU LOST', canvas.width / 2, canvas.height / 2);
            ctx.restore();
        }

        requestAnimationFrame(draw);
    })();
}

newGame();
