
var game = new Phaser.Game(148*4, 91*4, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render  }, false, false);

function preload() {

	game.load.spritesheet('bg', 'bg_148x91.png', 148, 91);
	game.load.spritesheet('bgGrass', 'bgGrass_148x91.png', 148, 91);
	game.load.spritesheet('chickens', 'chickens_22x22.png', 22, 22);
	game.load.spritesheet('girl', 'girl_49x91.png', 49, 91);
	game.load.spritesheet('pellet', 'pellet_4x4.png', 4, 4);
	game.load.spritesheet('pelletBurst', 'pellet_1x1.png', 2, 2);
	game.load.spritesheet('ground', 'ground.png', 592, 40);
	game.load.spritesheet('powerBar', 'powerBar.png', 300, 10);
	game.load.spritesheet('powerBarBg', 'powerBarBg.png', 300, 10);
	game.load.spritesheet('powerBarBig', 'powerBarBig.png', 592, 20);
	game.load.spritesheet('button', 'button.png', 80, 10);
	
}



var chickenFeed;
var note;
var t = 0;
var emitter;
var index = 0;
var line = '';

var timesFed = 0;

var notes;
var time = 0;

var spriteGirl;
var spriteBg;
var chicken1;
var chicken2;
var chicken3;

var spritePellet;
var pellets;
var spriteGround;
var c = 0;
var canFeed = true;
var score = 0;
var scoreDisplayed = 0;
var scoreTimeOffset = 0;
var scoreString = '';
var scoreText;
var multiplierText;
var currentMultiplier;

var powerBar;
var powerBarBg;

var time;
var timeText;

var direction=false;

var tweet;
var TWEET_PREAMBLE = 'https://twitter.com/intent/tweet?text=It\'s feeding time and I scored ';
var TWEET_PROLOGUE = ' feeding the chickens! http://www.initialsgames.com/feedingtime/ &hashtags=feedingtime ';


function create() {

	tweet = document.getElementById('tweet');
	//alert(tweet.href);
	tweet.href = TWEET_PREAMBLE + score + TWEET_PROLOGUE;

	//this.tweetElement.href = this.TWEET_PREAMBLE + this.score + this.TWEET_PROLOGUE;


	score = 0;

	//add pointer for mobile touching.
	game.input.addPointer();

	//background
	spriteBg = game.add.sprite(0, 0, 'bg');
	spriteBg.scale.x = 4;
	spriteBg.scale.y = 4;
	
	// the power bar is the bg that slides
	powerBar = game.add.sprite(0, 0, 'powerBarBig');
	powerBar.scale.x = 0;
	powerBar.scale.y = 500;
	
	// the bg grass is a stencil to cut out the power bar
	spriteBgp = game.add.sprite(0, 0, 'bgGrass');
	spriteBgp.scale.x = 4;
	spriteBgp.scale.y = 4;	
	
	
	//collide object for pellets.
	spriteGround = game.add.sprite(0,  91*4 - 40, 'ground');
	spriteGround.body.immovable = true;
	spriteGround.body.bounce.setTo(0.1, 0.1);


	// add 100 pellets for feeding.
	pellets = game.add.group();
    for (var i = 0; i < 100; i++)
    {
        pellets.create(-50,-50, 'pellet');
		//notes.add(note);
    }

    // add the girl in the hoodie.
    spriteGirl = game.add.sprite(92*4, 0, 'girl');
    spriteGirl.animations.add('feed', [8,9,10,11,12,13,14,15,16,17,18,8], 12, false );
	spriteGirl.animations.add('blink', [18,8], 12, false );
	spriteGirl.animations.add('idle', [8], 10, false );
    spriteGirl.animations.play('idle', 20, true);
	spriteGirl.inputEnabled=true;
    spriteGirl.events.onInputDown.add(clickGirl,this);
	spriteGirl.events.onInputUp.add(clickUpGirl,this);
    spriteGirl.events.onInputOver.add(overGirl, this);
    spriteGirl.events.onInputOut.add(outGirl, this);
	spriteGirl.scale.x = 4;
	spriteGirl.scale.y = 4;
	spriteGirl.alpha = 0.9;
	spriteGirl.body.setSize(30, 70, 65, 50);

	// add chickens 1, 2, 3
    chicken1 = game.add.sprite(13*4, 60*4, 'chickens');
    chicken1.animations.add('idle', [0,1,1,1,1,1,1,1,1,2,3], 12, false );
	chicken1.animations.play('idle', 12, true);
	chicken1.scale.x = 4;
	chicken1.scale.y = 4;
	chicken1.body.setSize(4, 4, 55, 70);
	chicken1.body.drag.setTo(100,100);
	chicken1.inputEnabled=true;
	chicken1.events.onInputDown.add(clickChicken1,this);

    chicken2 = game.add.sprite(40*4, 60*4, 'chickens');
    chicken2.animations.add('idle', [5,6,7,7,7,7,7,7,7,7,7,7,1,2,3,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,9], 14, false );
	chicken2.animations.play('idle', 14, true);
	chicken2.scale.x = 4;
	chicken2.scale.y = 4;
	chicken2.body.setSize(4, 4, 55, 70);
	chicken2.body.drag.setTo(100,100);
	chicken2.inputEnabled=true;
	chicken2.events.onInputDown.add(clickChicken2,this);
	
    chicken3 = game.add.sprite(82*4, 60*4, 'chickens');
    chicken3.animations.add('idle', [10,10,10,10,10,11,12,13,14], 16, false );
	chicken3.animations.play('idle', 16, true);
	chicken3.scale.x = -4;
	chicken3.scale.y = 4;
	chicken3.body.setSize(4, 4, -70, 70);
	chicken3.body.drag.setTo(100,100);
	chicken3.inputEnabled=true;
	chicken3.events.onInputDown.add(clickChicken3,this);	

	//add the emitter for the pellets	
	emitter = game.add.emitter(0, 0, 200);
    emitter.makeParticles('pelletBurst');
    emitter.gravity = 10;
    emitter.minParticleSpeed.setTo(-70, -150);
    emitter.maxParticleSpeed.setTo(70, -100);

	// add the score text and multipler text
	var text = "+0";
    var style = { font: "22px Arial", fill: "#ffffff", align: "center" };
    scoreText = game.add.text(10,10, text, style);

	var style2 = { font: "16px Arial", fill: "#ffffff", align: "center" };
    multiplierText = game.add.text(10,-510, "Multipler x1", style2);
    //multiplierText.velocity.y = -20;
    currentMultiplier = 1;


}

// render used for debug only.
function render() {

    //game.debug.renderRectangle(spriteGirl.body);
    //game.debug.renderRectangle(chicken1.body);
	//game.debug.renderRectangle(chicken2.body);
	//game.debug.renderRectangle(chicken3.body);

}


function update() 
{
	// make text move up screen
	multiplierText.y -= 1;

	//Check that you can run a feed.
	if (canFeed && spriteGirl.animations.getAnimation("feed").isPlaying && spriteGirl.animations.getAnimation("feed").currentFrame["index"] == 10) {
		
		if (powerBar.scale.x>=0.98)
		{
			powerBar.scale.x = 1;
			currentMultiplier+=currentMultiplier;		
			multiplierText.setText("Perfect throw! Multiplier " + currentMultiplier + "x");
			multiplierText.y = 50;
		}
		else if (powerBar.scale.x>=0.94)
		{
						
			multiplierText.setText("Very close. +5 points.");
			multiplierText.y = 50;
			score+=5;
			currentMultiplier=1;
		}

		else
		{
			currentMultiplier=1;
		}

		// launch a set of pellets
		pellets.forEach(function(item) {
			if (game.rnd.integerInRange(0, 100) < 15) {
				//item.x = 390;
				//item.y = 150;
				item.reset(390,150);
				
				item.body.velocity.x =  game.rnd.integerInRange(-280 * powerBar.scale.x, -150 * powerBar.scale.x);
				item.body.velocity.y =  game.rnd.integerInRange(-330 * powerBar.scale.x, -130 * powerBar.scale.x);

				item.body.acceleration.y = 980;
				item.body.bounce.setTo(0.2, 0.2);
				item.body.drag.setTo(100,100);
			}

		});
		
		canFeed = false;




	}
	
	if (game.input.mousePointer.isDown || game.input.touch.isDown || game.input.isDown || game.input.pointer1.isDown)
	{
		if (direction == true) 
		{
			if(powerBar.scale.x<0.92) powerBar.scale.x += 0.02;
			else powerBar.scale.x += 0.02;
			
		}
		else if (direction == false) powerBar.scale.x -= 0.02;
		
		if (powerBar.scale.x >= 1) direction = false;
		else if (powerBar.scale.x <= 0) direction = true;
		
		
	}

	//if (chicken1.y > 500) chicken1.reset(chicken1.x, 51*4);
	//if (chicken2.y > 500) chicken2.reset(chicken2.x, 51*4);
	//if (chicken3.y > 500) chicken3.reset(chicken3.x, 51*4);


	game.physics.collide(pellets, spriteGround);
	game.physics.collide(emitter, spriteGround);
	game.physics.collide(chicken1, spriteGround);
	game.physics.collide(chicken2, spriteGround);
	game.physics.collide(chicken3, spriteGround);
	
	game.physics.overlap(pellets, chicken1, destroyPellet1, null, this);
	game.physics.overlap(pellets, chicken2, destroyPellet2, null, this);
	game.physics.overlap(pellets, chicken3, destroyPellet3, null, this);
	


	//console.log(spriteGirl.animations.getAnimation("feed").currentFrame);



	scoreTimeOffset ++;
	
	if (scoreDisplayed<score) {
		if (scoreTimeOffset > 3) {
			var diff =  score - scoreDisplayed ;
			if (diff > 11) scoreDisplayed += 10;
			else if (diff > 6) scoreDisplayed += 5;
			else scoreDisplayed++;
			
			scoreTimeOffset = 0;
		}
		tweet = document.getElementById('tweet');
		tweet.href = TWEET_PREAMBLE + score + TWEET_PROLOGUE;

		// To change the text in the tweet link:
		//document.getElementById('tweet').textContent = "Your new text here, such as Tweet Your Score";
	}

	scoreText.setText("+"+scoreDisplayed);
}


function destroyPellet1 (chicken, pellet) {
	if (chicken1.animations.getAnimation("idle").currentFrame["index"] == 2) {
		emitter.x = pellet.x;
		emitter.y = pellet.y;
		emitter.start(true, 900, null, 6);
		pellet.x=-1000;
		score+=currentMultiplier;
	}
}
function destroyPellet2 (chicken, pellet) {
	if (chicken2.animations.getAnimation("idle").currentFrame["index"] == 2) {
		emitter.x = pellet.x;
		emitter.y = pellet.y;
		emitter.start(true, 900, null, 6);
		pellet.x=-1000;
		score+=currentMultiplier;
		
	}
}
function destroyPellet3 (chicken, pellet) {
	if (chicken3.animations.getAnimation("idle").currentFrame["index"] == 13||chicken3.animations.getAnimation("idle").currentFrame["index"] == 12) {
		emitter.x = pellet.x;
		emitter.y = pellet.y;
		emitter.start(true, 900, null, 6);
		pellet.x=-1000;
		score+=currentMultiplier;
	}
}


function overGirl () {
	spriteGirl.alpha = 1.0;
	spriteGirl.play("blink");
	powerBar.visible = true;
	powerBar.scale.x = 0;
}

function outGirl () {
	spriteGirl.alpha = 0.7;
	powerBar.visible = false;
}

function clickUpGirl () {
	canFeed = true;

	if (!spriteGirl.animations.getAnimation("feed").isPlaying) {
		timesFed += 1;
	}
	spriteGirl.animations.play('feed', 12, false);
	
	if (powerBar.scale.x>=0.98)
	{
		powerBar.scale.x = 1;
	}
}
function clickGirl () {
	powerBar.scale.x = 0;
}

function clickUpGirlT () {
	canFeed = true;

	if (!spriteGirl.animations.getAnimation("feed").isPlaying) {
		timesFed += 1;
	}
	spriteGirl.animations.play('feed', 12, false);
	
	
}
function clickGirlT () {
	powerBar.scale.x = 0;
}

function clickChicken1 () {
	// chicken1.body.velocity.x = game.rnd.integerInRange(-80,80);
	// chicken1.body.velocity.y = -300;
	// if (chicken1.x < 30)
	// {
	// 	chicken1.body.velocity.x = game.rnd.integerInRange(50,180);
	// }

}
function clickChicken2 () {
	// chicken2.body.velocity.x = game.rnd.integerInRange(-80,80);
	// chicken2.body.velocity.y = -300;
	// if (chicken2.x < 30)
	// {
	// 	chicken2.body.velocity.x = game.rnd.integerInRange(50,180);
	// }
}
function clickChicken3 () {
	// chicken3.body.velocity.x = game.rnd.integerInRange(-80,80);
	// chicken3.body.velocity.y = -300;
	// if (chicken3.x < 30)
	// {
	// 	chicken3.body.velocity.x = game.rnd.integerInRange(50,180);
	// }
}



function submitHighScore () {


}

function listener () {
	// if (!chickenFeed.animations.getAnimation("feed").isPlaying) {
	// 	timesFed += 1;
	// }
	// chickenFeed.animations.play('feed', 12, false);
	// if (timesFed==2) s.setText("Achievement Earned: Fed chickens twice");
	// else if (timesFed==5) s.setText("Achievement Earned: Farmer In Training - Fed chickens five times");
	// else if (timesFed==10) s.setText("Achievement Earned: Semi-pro farmer - Fed chickens ten times");
	// else if (timesFed==50) s.setText("Achievement Earned: Pro Farmer - Fed chickens fifty times");	
	// else if (timesFed==100) s.setText("Achievement Earned: Serious Business - Fed chickens one hundred times");
	// else s.setText("");	
}

	
function httpGet(theUrl)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}