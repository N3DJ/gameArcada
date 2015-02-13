Resources.load([
    'images/char-cat-girl.png',
    'images/Rock.png'
]);

var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
}


Enemy.prototype.update = function(dt) {
    if(this.x >= 505){
        this.x = -100;
    }else{
        this.x += this.speed * dt;
    }
    ctx.clearRect(0,0,505 , 606);

}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 350;
    this.score = 0;
}


var Level = function(){
    this.allEnemies;
}

Level.prototype.levelOne = function(){
    var enemy1 = new Enemy(-100,140,100);
    var enemy2 = new Enemy(-100,220,50);
    var enemy3 = new Enemy(-100,300,150);
    this.allEnemies = [enemy1,enemy2,enemy3];
}
Level.prototype.levelTwo = function(){
    var enemy1 = new Enemy(-100,140,200);
    var enemy2 = new Enemy(-100,220,100);
    var enemy3 = new Enemy(-100,300,300);
    this.allEnemies = [enemy1,enemy2,enemy3];
}
Level.prototype.levelThree = function(){
    var enemy1 = new Enemy(-100,140,250);
    var enemy2 = new Enemy(-100,220,200);
    var enemy3 = new Enemy(-100,300,300);
    this.allEnemies = [enemy1,enemy2,enemy3];
}
Level.prototype.levelFour = function(){
    var enemy1 = new Enemy(-100,140,250);
    var enemy2 = new Enemy(-100,220,200);
    var enemy3 = new Enemy(-100,300,300);
    var enemy4 = new Enemy(-300,300,300);
    this.allEnemies = [enemy1,enemy2,enemy3,enemy4];
}
Level.prototype.levelFive = function(){
    var enemy1 = new Enemy(-100,140,250);
    var enemy2 = new Enemy(-100,220,200);
    var enemy3 = new Enemy(-100,300,300);
    var enemy4 = new Enemy(-200,300,300);
    this.allEnemies = [enemy1,enemy2,enemy3,enemy4];
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
                switch (player.score){
                    case 1 :
                        levels.levelTwo();
                        break;
                    case 2 :
                        levels.levelThree();
                        break;
                    case 3 :
                        levels.levelFour();
                        break;
                    case 4 :
                        levels.levelFive();
                        break;
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

var player = new Player();
var levels = new Level();
levels.levelOne();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
   player.handleInput(allowedKeys[e.keyCode]);
});
