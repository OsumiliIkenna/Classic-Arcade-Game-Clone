// Define required variables for the game
let level = 0,
    score = 0,
    count = 0,
    canvas = document.querySelector('.canvas'),
    startGameBtn = document.querySelector('.myBtn1'),
    restartGameBtn = document.querySelector('.restart__game'),
    newGameBtn = document.querySelector('.myBtn3'),
    retryGameBtn = document.querySelector('.myBtn4'),
    startGame = document.querySelector('.startGame'),
    canvasDeck = document.querySelector('.canvas__deck'),
    playerImage = document.getElementsByName('playerImage'),
    tryAgain = document.querySelector('.try__again'),
    message = document.querySelector('.congrat__message'),
    allEnemies = [],
    allLives = [],
    allStars = [],
    imageChange = [
        'images/char-cat-girl.png',
        'images/char-pink-girl.png',
        'images/char-boy.png',
        'images/char-horn-girl.png',
        'images/char-princess-girl.png'
    ];    

// Enemies our player must avoid
let Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.initialValueX = x;
    this.initialValueY = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //Check if enemy is going off game board
    if (this.x > 505) {
        this.x = -100;
        //Setting new random speed for the enemy
        this.speed = 100 + Math.abs(Math.random() * 225);
    }
    //Check for collision btw enemy and player
    this.collisionCheck();
};

//Check for collision btw enemy and player
Enemy.prototype.collisionCheck = function() {
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        player.y + 60 > this.y) {
        player.x = 202;
        player.y = 405;

        // Dynamically change player on collision
        player.sprite = imageChange[count];
        count++;
        if(count===5){
            count = 0;
        }

        // Remove star on collision and deduct some marks as a penalty
        allStars.pop();
        if(score>5){
            score-=5;
        }

        // End game if allStars array is empty
        if(allStars.length === 0){
            GameBoard.prototype.playAgain();
            
        }              
    }
};

// Draw the enemy on the screen, required method for game 
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    let gradient = ctx.createLinearGradient(10, 420, 170, 0);
    gradient.addColorStop(1, "yellow");
    gradient.addColorStop(0, "white");
    
    ctx.font = "bolder 20px Georgia";
    ctx.fillStyle = gradient;
    
    ctx.fillText("Score: ", 10, 100);
    ctx.fillText(score, 80, 100);

};

// Life a player must have to get points
let Life = function(x,y,sprite) {
    
    this.sprite = sprite;

    this.x = x;
    this.y = y;
    this.initialValueX = x;
    this.initialValueY = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Life.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Check for collision btw enemy and player
    this.lifeCollisionCheck();
};

//Check for collision btw life and player
Life.prototype.lifeCollisionCheck = function() {
    if (player.x < this.x + 60 &&
        player.x + 60 > this.x &&
        player.y < this.y &&
        player.y + 83 > this.y) {

        // Take additional life for the game and earn more score
        for (let i = 0; i < allLives.length; i++) {
            if (this.y === allLives[i].y) {
              allLives.splice(i, 1)
              if(this.sprite === 'images/Gem-Blue.png') {
                score+=5;
              } else if(this.sprite === 'images/Gem-Green.png') {
                score+=10;
              } else if(this.sprite === 'images/Gem-Orange.png') {
                score+=15;
              }
            }
        }
        
    }
};

// Draw the enemy on the screen, required method for game
Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 60,60);
};

// Instantiate life and push it to allLives array
Life.prototype.moreLives = () => {
    const life1 = new Life(25, 305, 'images/Gem-Blue.png');
    const life2 = new Life(225, 220, 'images/Gem-Green.png');
    const life3 = new Life(325, 140, 'images/Gem-Orange.png');
    allLives.push(life1, life2, life3);
};

// Define Star for our game
let Star = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/Star.png';

    this.x = x;
    this.y = y;
    this.initialValueX = x;
    this.initialValueY = y;
};

// Draw the enemy on the screen, required method for game
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 50);
};

// Instances of Star and add it to allStars array
Star.prototype.defineStars = function() {
    let star1 = new Star(400, 65);
    let star2 = new Star(430, 65);
    let star3 = new Star(460, 65);
    allStars.push(star1, star2, star3);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/char-princess-girl.png'; 

    this.x = x;
    this.y = y;
    this.initialValueX = x;
    this.initialValueY = y; 

};

//Reset the Player and start again 
Player.prototype.reset = function() {
    this.x = this.initialValueX;
    this.y = this.initialValueY;
};

//changes, handles and displays the level
Player.prototype.update = function(dt) {
    this.isWaterCheck();
    if( this.y < -15 ) {
        player.reset();
       
    }
        
};

// select (change) the image of the player
Player.prototype.choosePlayer = function() {
    for (let i = 0; i < playerImage.length; i++) {
        if (playerImage[i].checked) {
            this.sprite = `images/${playerImage[i].id}.png`;
        }
    } 
};

// Render Player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// check the row for water 
Player.prototype.isWaterCheck = function() {
    if (this.y <= 0) {
        this.sprite = 'images/char-princess-girl.png';
        document.querySelector('.score').innerHTML = score;
        document.querySelector('.congrat__message').style.display = 'block';
        allEnemies = [];
        allLives = [];
        allStars = [];
        document.querySelector('.canvas__deck').style.display = 'none';

    } else {
        document.querySelector('.congrat__message').style.display = 'none';
    }
};

// Check for key press
Player.prototype.handleInput = function(keyPress) {
    if (keyPress === 'left' && this.x > 0) {
        this.x -= 102;
    }

    if (keyPress === 'right' && this.x < 405) {
        this.x += 102;
    }

    if (keyPress === 'up' && this.y > 0) {
        this.y -= 83;
    }

    if (keyPress === 'down' && this.y < 405) {
        this.y += 83;
    }
  
    if (this.y < 0) {      
        setTimeout(function() {
            this.x = 202;
            this.y = 415;
        }, 600);

    }
};

// Create an Instance of Player
let player = new Player(202,415);


// Create GameBoard class
const GameBoard = function() {
    
};

// Instantiate GameBoard object
const game = new GameBoard(); 

// Now instantiate Enemy objects.
GameBoard.prototype.createEnemies = function() {
    let enemy1 = new Enemy(-10,65,20);
    let enemy2 = new Enemy(0,150,30);
    let enemy3 = new Enemy(5,230,40);
    let enemy4 = new Enemy(-50,65,50);
    let enemy5 = new Enemy(-20,150,60);
    allEnemies.push(enemy1,enemy2,enemy3,enemy4,enemy5);

};

//Call necessary functions for game play
GameBoard.prototype.handleEvent = function() {
    startGame.style.display = 'none';
    canvasDeck.style.display = 'block';    
    GameBoard.prototype.createEnemies();
    Life.prototype.moreLives();
    Star.prototype.defineStars();
    player.choosePlayer();
               
};

// Reset the game
GameBoard.prototype.gameReset = function() {
    player.x = 202;
    player.y = 415;
    player.initialValueY = player.y;
    player.initialValueX = player.y;
    allEnemies = [];
    allLives = [];
    allStars = [];
    score = 0;
    
};

// Hide and call classes and take defined action
GameBoard.prototype.restartGame = function() {
        startGame.style.display = 'block';
        canvasDeck.style.display = 'none';
        player.choosePlayer();
        GameBoard.prototype.gameReset();       
};

// Hide and call classes and take defined action
GameBoard.prototype.restartGame2 = function() {       
        message.classList.remove('hidden');
        canvasDeck.classList.add('hidden');
        player.choosePlayer();
        GameBoard.prototype.gameReset();       
};

// Hide and call classes and take defined action
GameBoard.prototype.newGame = function() {      
        startGame.classList.remove('hidden');
        message.classList.add('hidden');
        startGame.style.display = 'block';
        message.style.display = 'none';
        player.choosePlayer();
        GameBoard.prototype.gameReset();
      
};

// Game over: display the final messages and prepare for a new game
GameBoard.prototype.playAgain = function() {
    tryAgain.style.display = 'block';
    canvasDeck.style.display = 'none';
    player.choosePlayer();
    GameBoard.prototype.restartGame2(); 
    
};

// Listens for key press and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Events listener's for the game
startGameBtn.addEventListener("click", GameBoard.prototype.handleEvent);

restartGameBtn.addEventListener("click", GameBoard.prototype.restartGame);

newGameBtn.addEventListener("click", GameBoard.prototype.newGame);

retryGameBtn.addEventListener("click", (e) => {

    if(e){
        GameBoard.prototype.newGame();
        tryAgain.style.display = 'none';
    }
});








