Resources.load([
    'images/char-cat-girl.png',
    'images/Rock.png'
]);

function contains(value, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return true;
        }
    }
    return false;
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= 505){
        this.x = -100;
    }else{
        this.x += this.speed * dt;
    }
    ctx.clearRect(0,0,505 , 606);

}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 350;
    this.score = 1;
}


var Level = function(nbOfEnemys, nbOfLvls){
    var posX = -100;
    var posY = [140,220,300];
    var speeds = [120,80,150];
    var randomIndex;
    var randomIndexWithoutDuplicate = [Math.floor(Math.random() * 3)];
    var allEnemies = [];
    for (var i = 0 ; i < nbOfEnemys ; i++ ){
        if (i > 2){
            do{
                randomIndex = Math.floor(Math.random() * 3);
            } while (!contains(randomIndex,randomIndexWithoutDuplicate));

            randomIndexWithoutDuplicate.push(randomIndex);

            if (randomIndexWithoutDuplicate.length == 3) {
                randomIndexWithoutDuplicate = [];
            }
            allEnemies.push(new Enemy((posX - 160 * randomIndex), posY[randomIndex], (speeds[randomIndex] * nbOfLvls)));
        }else{
            allEnemies.push(new Enemy(posX, posY[i], (speeds[i] * nbOfLvls)));
        }
    }
    this.allEnemies = allEnemies;

}

Player.prototype.update = function() {
   ctx.clearRect(0,0,505,606);
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y );
}

Player.prototype.handleInput = function(keyPressed) {
    switch (keyPressed){
        case "left":
            if(player.x > 0) {
                if(player.x == 420){
                    player.x -= 20;
                }else{
                    player.x -= 50;
                }
            }
            break;
        case "up":
            if (player.y <= 0){
                player.x = 200;
                player.y = 350;
                player.score += 1;
                if(player.score <= 3){
                    levels = new Level(3,player.score);
                }else{
                    levels = new Level(player.score, player.score);
                }

            }else{
                player.y -= 50;
            }
            break;
        case "right":
            if(player.x >= 400){
                if(player.x == 400){
                    player.x += 20;
                }
            }else {
                player.x += 50;
            }
            break;
        case "down":
            if(player.y < 450) {
                player.y += 50;
            }
            break;
    }
}
// Now instantiate your objects.
var player = new Player();
var levels = new Level(3,1);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
   player.handleInput(allowedKeys[e.keyCode]);
});
