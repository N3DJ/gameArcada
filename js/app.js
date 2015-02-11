// load the pictures of the app
    Resources.load([
        'images/char-cat-girl.png',
        'images/Rock.png'
    ]);

// Enemies our player must avoid
var Enemy = function(y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    ctx.clearRect(0,0,505 , 606);

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var enemy1 = new Enemy(130,100);
var enemy2 = new Enemy(210,50);
var enemy3 = new Enemy(50,150);
var enemy4 = new Enemy(210,25);

var allEnemies = [enemy1,enemy2,enemy3,enemy4];


var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 350;
}


Player.prototype.update = function() {
   ctx.clearRect(0,0,505,606);
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y );
}

Player.prototype.handleInput = function(keyPressed) {
    switch (keyPressed){
        case "left":
            player.x -= 100;
            break;
        case "up":
            player.y -= 50;
            break;
        case "right":
            player.x += 100;
            break;
        case "down":
            player.y += 50;
            break;
    }
}

var player = new Player();


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
