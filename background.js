let backgroundImage = new Image();
backgroundImage.src = 'assets/forest.png';

const groundHeight = 30;

let groundOffsetX = 0;

function updateGround() {
    groundOffsetX = (groundOffsetX - 2) % 1920; // least common multiple of 128 and 30
}

function drawGround(ctx) {
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
    {
        let spriteX = 230,
            spriteY = 54,
            spriteWidth = 30,
            spriteHeight = 30,
            width = 30,
            height = 30;

        for (let offsetX = groundOffsetX % width; offsetX < canvasWidth; offsetX += width) {
            ctx.drawImage(backgroundImage, spriteX, spriteY, spriteWidth, spriteHeight, offsetX, canvasHeight - height, width, height);
        }
    }
}

let firstTree = {
    spriteX: 6,
    spriteY: 144,
    spriteWidth: 85,
    spriteHeight: 126,
    width: 85 * 2.5,
    height: 126 * 2.7
};

let secondTree = {
    spriteX: 6,
    spriteY: 4,
    spriteWidth: 52,
    spriteHeight: 127,
    width: 52 * 2.5,
    height: 127 * 2.7
};

let trees = [
    { left: 30, bottom: -50, front: true, sprite: firstTree },
    { left: 260, bottom: -50, front: false, sprite: secondTree },
    { left: 480, bottom: -50, front: true, sprite: firstTree },
    { left: 730, bottom: -50, front: false, sprite: secondTree },
    { left: 900, bottom: -50, front: true, sprite: firstTree }
];

function updateTrees(difficulty) {
    for (let tree of trees) {
        tree.left -= 2.5;
    }
    trees.filter(t => t.left > -firstTree.width);
    let lastTree = trees[trees.length - 1];
    if ((lastTree.left + lastTree.sprite.width) < (750 + 200 * difficulty) && Math.random() < 0.15) {
        trees.push({ left: 800, bottom: -50, front: Math.random() < 0.5, sprite: Math.random() < 0.5 ? firstTree : secondTree });
    }
}

function drawTrees(ctx) {
    let canvasWidth = ctx.canvas.width,
        canvasHeight = ctx.canvas.height;

    let treesCopy = trees.slice(0);
    for (let tree of trees.filter(t => !t.front)) {
        ctx.drawImage(backgroundImage, tree.sprite.spriteX, tree.sprite.spriteY, tree.sprite.spriteWidth, tree.sprite.spriteHeight, tree.left, canvasHeight - tree.bottom - tree.sprite.height, tree.sprite.width, tree.sprite.height);
    }
    for (let tree of trees.filter(t => t.front)) {
        ctx.drawImage(backgroundImage, tree.sprite.spriteX, tree.sprite.spriteY, tree.sprite.spriteWidth, tree.sprite.spriteHeight, tree.left, canvasHeight - tree.bottom - tree.sprite.height, tree.sprite.width, tree.sprite.height);
    }
}