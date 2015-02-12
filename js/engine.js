var Engine = (function (global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
        checkCollisions();
        lastTime = now;
        win.requestAnimationFrame(main);
    };

    function init() {
        reset("newGame");
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
    }

    function updateEntities(dt) {
        levels.allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function checkCollisions() {
        levels.allEnemies.forEach(function (enemy) {
            if (checkXAyes(enemy) && checkYAxes(enemy)) {
                reset("gameOver");
            }
        });
    }

    function checkXAyes(enemy){
        return player.x < enemy.x + 80 && player.x > enemy.x;
    }

    function checkYAxes(enemy) {
        return player.y < enemy.y + 70 && 90 + player.y > enemy.y;
    }

    function render() {
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }

    function renderEntities() {
        levels.allEnemies.forEach(function (enemy) {
            enemy.render();
        });
        player.render();
    }

    function reset(action) {
        if(action == "newGame"){
            alert("Welcome to the game dude !");
        }else{
            alert("Game over :( ! Your score is : " + player.score)
            player = new Player();
            levels = new Level();
            levels.levelOne();
        }
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);

