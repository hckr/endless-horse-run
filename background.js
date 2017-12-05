let backgroundImage = new Image();
backgroundImage.src = 'assets/forest.png';

const groundHeight = 30;

function prepareTreeDraw(spriteInfo) {
    let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = spriteInfo.width | 0;
    canvas.height = spriteInfo.height | 0;

    ctx.drawImage(backgroundImage, spriteInfo.spriteX, spriteInfo.spriteY, spriteInfo.spriteWidth, spriteInfo.spriteHeight, 0, 0, canvas.width, canvas.height);

    spriteInfo['draw'] = function(mainCtx, treeInfo) {
        mainCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, treeInfo.left, mainCtx.canvas.height - treeInfo.bottom - canvas.height, canvas.width, canvas.height);
    };
}

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
    foreTrees = foreTrees.filter(t => (t.left -= 2.5) > -t.sprite.width);
    let lastTree = foreTrees[foreTrees.length - 1];
    if (Math.random() < 0.15 && (lastTree.left + lastTree.sprite.width) < (750 + 200 * difficulty)) {
        foreTrees.push({ left: 800, bottom: -50, front: Math.random() < 0.5, sprite: Math.random() < 0.5 ? firstForeTree : secondForeTree });
    }
}

function drawTrees(ctx, trees) {
    let canvasWidth = ctx.canvas.width,
        canvasHeight = ctx.canvas.height;
    for (let val of [false, true]) {
        for (let tree of trees) {
            if (tree.front == val) {
                tree.sprite.draw(ctx, tree);
            }
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

function updateGroundAndBackTrees(difficulty) {
    groundOffsetX = (groundOffsetX - 2) % 1920; // least common multiple of 128 and 30

    backTrees = backTrees.filter(t => (t.left -= 1.8) > -t.sprite.width);
    let lastTree = backTrees[backTrees.length - 1];
    if (Math.random() < 0.15 && (lastTree.left + lastTree.sprite.width) < (750 + 200 * difficulty)) {
        backTrees.push({ left: 800, bottom: 30, front: Math.random() < 0.5, sprite: Math.random() < 0.5 ? firstBackTree : secondBackTree });
    }
}

function prepareTrees() {
    prepareTreeDraw(firstForeTree);
    prepareTreeDraw(secondForeTree);
    prepareTreeDraw(firstBackTree);
    prepareTreeDraw(secondBackTree);
}

function prepareBackgroundDraw(spriteInfo, canvasWidth, canvasHeight, posY) {
    let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    canvas.width = canvasWidth + spriteInfo.width;
    canvas.height = spriteInfo.height;

    for (let offsetX = 0; offsetX < canvas.width; offsetX += spriteInfo.width) {
        ctx.drawImage(backgroundImage, spriteInfo.spriteX, spriteInfo.spriteY, spriteInfo.spriteWidth, spriteInfo.spriteHeight, offsetX, 0, spriteInfo.width, spriteInfo.height);
    }

    return function(mainCtx, offsetX) {
        mainCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, offsetX % spriteInfo.width, posY, canvas.width, canvas.height);
    }
}

let drawBackGround, drawMiddleGround, drawFrontGround;
function prepareBackground(canvasWidth, canvasHeight) {
    let back = {
            spriteX: 301,
            spriteY: 4 ,
            spriteWidth: 128,
            spriteHeight: 85,
            width: 128,
            height: 95
        };
    drawBackGround = prepareBackgroundDraw(back, canvasWidth, canvasHeight,
                            canvasHeight - groundHeight - 70 - back.height);

    let middle = {
            spriteX: 301,
            spriteY: 94 ,
            spriteWidth: 128,
            spriteHeight: 85,
            width: 128,
            height: 85
        };
    drawMiddleGround = prepareBackgroundDraw(middle, canvasWidth, canvasHeight,
                            canvasHeight - groundHeight - middle.height + 10);

    let front = {
            spriteX: 230,
            spriteY: 54,
            spriteWidth: 30,
            spriteHeight: 30,
            width: 30,
            height: groundHeight
        };
    drawFrontGround = prepareBackgroundDraw(front, canvasWidth, canvasHeight,
                                                canvasHeight - front.height);
}

function drawGroundAndBackTrees(ctx) {
    let canvasWidth = ctx.canvas.width,
        canvasHeight = ctx.canvas.height;

    drawBackGround(ctx, Math.ceil(groundOffsetX * 0.2));
    drawMiddleGround(ctx, Math.ceil(groundOffsetX * 0.6));

    drawTrees(ctx, backTrees);

    drawFrontGround(ctx, groundOffsetX);
}
