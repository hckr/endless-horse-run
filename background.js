let backgroundImage = new Image();
backgroundImage.src = 'assets/forest.png';

const groundHeight = 30;


let firstForeTree = {
    spriteX: 6,
    spriteY: 144,
    spriteWidth: 85,
    spriteHeight: 126,
    width: 85 * 2.5,
    height: 126 * 2.7
};

let secondForeTree = {
    spriteX: 6,
    spriteY: 4,
    spriteWidth: 52,
    spriteHeight: 127,
    width: 52 * 2.5,
    height: 127 * 2.7
};

let foreTrees = [
    { left: 30, bottom: -50, front: true, sprite: firstForeTree },
    { left: 260, bottom: -50, front: false, sprite: secondForeTree },
    { left: 480, bottom: -50, front: true, sprite: firstForeTree },
    { left: 730, bottom: -50, front: false, sprite: secondForeTree },
    { left: 900, bottom: -50, front: true, sprite: firstForeTree }
];

function updateForeTrees(difficulty) {
    for (let tree of foreTrees) {
        tree.left -= 2.5;
    }
    foreTrees.filter(t => t.left > -t.sprite.width);
    let lastTree = foreTrees[foreTrees.length - 1];
    if ((lastTree.left + lastTree.sprite.width) < (750 + 200 * difficulty) && Math.random() < 0.15) {
        foreTrees.push({ left: 800, bottom: -50, front: Math.random() < 0.5, sprite: Math.random() < 0.5 ? firstForeTree : secondForeTree });
    }
}

function drawTrees(ctx, trees) {
    let canvasWidth = ctx.canvas.width,
        canvasHeight = ctx.canvas.height;

    for (let batch of [trees.filter(t => !t.front), trees.filter(t => t.front)]) {
        for (let tree of batch) {
            ctx.drawImage(backgroundImage, tree.sprite.spriteX, tree.sprite.spriteY, tree.sprite.spriteWidth, tree.sprite.spriteHeight, tree.left, canvasHeight - tree.bottom - tree.sprite.height, tree.sprite.width, tree.sprite.height);
        }
    }
}

function drawForeTrees(ctx) {
    drawTrees(ctx, foreTrees);
}

let firstBackTree = {
    spriteX: 96,
    spriteY: 144,
    spriteWidth: 85,
    spriteHeight: 126,
    width: 85 * 1.8,
    height: 126 * 2
};

let secondBackTree = {
    spriteX: 70,
    spriteY: 4,
    spriteWidth: 52,
    spriteHeight: 127,
    width: 52 * 1.8,
    height: 127 * 2
};

let backTrees = [
    { left: 30, bottom: 30, front: true, sprite: secondBackTree },
    { left: 260, bottom: 30, front: false, sprite: firstBackTree },
    { left: 480, bottom: 30, front: true, sprite: secondBackTree },
    { left: 730, bottom: 30, front: false, sprite: firstBackTree },
    { left: 900, bottom: 30, front: true, sprite: secondBackTree }
];

let groundOffsetX = 0;

function updateGroundAndBackTrees(difficulty  ) {
    groundOffsetX = (groundOffsetX - 2) % 1920; // least common multiple of 128 and 30

    for (let tree of backTrees) {
        tree.left -= 1.8;
    }
    backTrees.filter(t => t.left > -t.sprite.width);
    let lastTree = backTrees[backTrees.length - 1];
    if ((lastTree.left + lastTree.sprite.width) < (750 + 200 * difficulty) && Math.random() < 0.15) {
        backTrees.push({ left: 800, bottom: 30, front: Math.random() < 0.5, sprite: Math.random() < 0.5 ? firstBackTree : secondBackTree });
    }
}

function drawGroundAndBackTrees(ctx) {
    let canvasWidth = ctx.canvas.width,
        canvasHeight = ctx.canvas.height;

    {
        let spriteX = 301,
            spriteY = 4 ,
            spriteWidth = 128,
            spriteHeight = 85,
            width = 128,
            height = 95;

        for (let offsetX = Math.ceil((groundOffsetX * 0.2) % width); offsetX < canvasWidth; offsetX += width) {
            ctx.drawImage(backgroundImage, spriteX, spriteY, spriteWidth, spriteHeight, offsetX, canvasHeight - groundHeight - 70 - height, width, height);
        }
    }
    {
        let spriteX = 301,
            spriteY = 94 ,
            spriteWidth = 128,
            spriteHeight = 85,
            width = 128,
            height = 85;

        for (let offsetX = Math.ceil((groundOffsetX * 0.6) % width); offsetX < canvasWidth; offsetX += width) {
            ctx.drawImage(backgroundImage, spriteX, spriteY, spriteWidth, spriteHeight, offsetX, canvasHeight - groundHeight - height + 10, width, height);
        }
    }
    drawTrees(ctx, backTrees);
    {
        let spriteX = 230,
            spriteY = 54,
            spriteWidth = 30,
            spriteHeight = 30,
            width = 30,
            height = groundHeight;

        for (let offsetX = groundOffsetX % width; offsetX < canvasWidth; offsetX += width) {
            ctx.drawImage(backgroundImage, spriteX, spriteY, spriteWidth, spriteHeight, offsetX, canvasHeight - height, width, height);
        }
    }
}
