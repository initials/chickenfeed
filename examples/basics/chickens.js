
var game = new Phaser.Game(148*4, 91*4, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render  }, false, false);

function preload() {
    //game.load.atlasJSONHash('bot', 'assets/sprites/running_bot.png', 'assets/sprites/running_bot.json');
	game.load.spritesheet('chicken', 'chickens_148x91.png', 148, 91);
	game.load.spritesheet('note', 'squareNote.png', 4, 4);
	//game.load.audio('sfxLazer', [ 'shot.wav']);




	game.load.spritesheet('bg', 'bg_148x91.png', 148, 91);
	game.load.spritesheet('chickens', 'chickens_22x22.png', 22, 22);
	game.load.spritesheet('girl', 'girl_49x91.png', 49, 91);
	game.load.spritesheet('pellet', 'pellet_4x4.png', 4, 4);
	game.load.spritesheet('pelletBurst', 'pellet_1x1.png', 2, 2);
	game.load.spritesheet('ground', 'ground.png', 592, 40);
	game.load.spritesheet('powerBar', 'powerBar.png', 300, 10);
	game.load.spritesheet('powerBarBg', 'powerBarBg.png', 300, 10);
	
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
var scoreString = '';
var scoreText;
var multiplierText;
var currentMultiplier;

var powerBar;
var powerBarBg;

var time;
var timeText;

var direction=false;

function create() {


	//game.input.multiInputOverride = 2;

	score = 0;
    //sfxLazer = game.add.audio('sfxLazer', 0.1, false);
	//  This sprite is using a texture atlas for all of its animation data
 //    chickenFeed = game.add.sprite(0, 0, 'chicken');

 //    //  Here we add a new animation called 'run'
 //    //  We haven't specified any frames because it's using every frame in the texture atlas
 //    chickenFeed.animations.add('feed', [8,9,10,11,12,13,14,15,16,17,18,8], 12, false );
	// chickenFeed.animations.add('idle', [8], 10, false );
	// //alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);

 //    //  And this starts the animation playing by using its key ("run")
 //    //  15 is the frame rate (15fps)
 //    //  true means it will loop when it finishes
 //    chickenFeed.animations.play('idle', 20, true);
	
	// chickenFeed.inputEnabled=true;

 //    chickenFeed.events.onInputDown.add(listener,this);
	// chickenFeed.scale.x = 4;
	// chickenFeed.scale.y = 4;

	game.input.addPointer();

	spriteBg = game.add.sprite(0, 0, 'bg');
	spriteBg.scale.x = 4;
	spriteBg.scale.y = 4;
	
	spriteGround = game.add.sprite(0,  91*4 - 40, 'ground');
	spriteGround.body.immovable = true;
	spriteGround.body.bounce.setTo(0.1, 0.1);


	pellets = game.add.group();
    for (var i = 0; i < 100; i++)
    {
        pellets.create(-50,-50, 'pellet');
		//notes.add(note);
    }


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

    //spriteGirl.events.onTouchStart.add(clickGirlT,this);
	//spriteGirl.events.onTouchEnd.add(clickUpGirlT,this);



	spriteGirl.scale.x = 4;
	spriteGirl.scale.y = 4;
	spriteGirl.alpha = 0.9;
	spriteGirl.body.setSize(30, 70, 65, 50);

    chicken1 = game.add.sprite(13*4, 60*4, 'chickens');
	//chicken1.inputEnabled=true;
    //chickenFeed.events.onInputDown.add(listener,this);
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

	
	emitter = game.add.emitter(0, 0, 200);

    emitter.makeParticles('pelletBurst');
    emitter.gravity = 10;
    emitter.minParticleSpeed.setTo(-70, -150);
    emitter.maxParticleSpeed.setTo(70, -100);


	//scoreString = 'Score : ';
	
	var text = "+0";
    var style = { font: "22px Arial", fill: "#ffffff", align: "center" };

    scoreText = game.add.text(10,10, text, style);


	var style2 = { font: "16px Arial", fill: "#ffffff", align: "center" };
    multiplierText = game.add.text(10,-510, "Multipler x1", style2);
    //multiplierText.velocity.y = -20;
    currentMultiplier = 1;
	


	//notes = game.add.group();
    //for (var i = 0; i < 17; i++)
    //{
       // notes.create((10 + (i*6)+5), 5, 'note');
		//notes.add(note);
    //}
	
	powerBarBg = game.add.sprite(70, 20, 'powerBarBg');
	

	powerBar = game.add.sprite(70, 20, 'powerBar');
	powerBar.scale.x = 0;

	

}

function render() {

    //game.debug.renderRectangle(spriteGirl.body);
    //game.debug.renderRectangle(chicken1.body);
	//game.debug.renderRectangle(chicken2.body);
	//game.debug.renderRectangle(chicken3.body);

}

function update() 
{
	multiplierText.y -= 1;

	if (canFeed && spriteGirl.animations.getAnimation("feed").isPlaying && spriteGirl.animations.getAnimation("feed").currentFrame["index"] == 10) {
		
		//console.log(powerBar.scale.x);

		// == 1.0
		if (powerBar.scale.x>=0.999)
		{
			currentMultiplier++;	
			currentMultiplier*=currentMultiplier;		
			multiplierText.setText("Perfect throw! Multiplier " + currentMultiplier + "x");
			multiplierText.y = 50;
			currentMultiplier*=currentMultiplier;	
		}
		else if (powerBar.scale.x>=0.94)
		{
			currentMultiplier++;			
			multiplierText.setText("Very close. +5 points.");
			multiplierText.y = 50;
			score+=5;
			currentMultiplier=1;
		}

		else
		{
			currentMultiplier=1;
		}

		
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
		if (direction == true) powerBar.scale.x += 0.02;
		else if (direction == false) powerBar.scale.x -= 0.02;
		
		if (powerBar.scale.x >= 1) direction = false;
		else if (powerBar.scale.x <= 0) direction = true;
		
		
	}

	game.physics.collide(pellets, spriteGround);
	game.physics.collide(emitter, spriteGround);
	
	
	game.physics.overlap(pellets, chicken1, destroyPellet1, null, this);
	game.physics.overlap(pellets, chicken2, destroyPellet2, null, this);
	game.physics.overlap(pellets, chicken3, destroyPellet3, null, this);
	


	//console.log(spriteGirl.animations.getAnimation("feed").currentFrame);


	// time++;
	// var c = 0;
	// //console.log(c);
	// notes.forEach(function(item) {
	// 	if (time%16==c)
	// 	{
	// 		item.scale.x = 3;
	// 		item.scale.y = 3;
	// 	}
	// 	else
	// 	{
	// 		item.scale.x -=0.25;
	// 		item.scale.y -=0.25;
	// 	}
		
	// 	//console.log(c);
	// 	c++;
	// });
	
	// if (time%16==0) sfxLazer.play('', 0, 0.1);
	
	scoreText.setText("+"+score);
	
}


function destroyPellet1 (chicken, pellet) {
	if (chicken1.animations.getAnimation("idle").currentFrame["index"] == 2) {

		
		emitter.x = pellet.x;
		emitter.y = pellet.y;

		//  The first parameter sets the effect to "explode" which means all particles are emitted at once
		//  The second gives each particle a 2000ms lifespan
		//  The third is ignored when using burst/explode mode
		//  The final parameter (10) is how many particles will be emitted in this single burst
		emitter.start(true, 900, null, 6);
	
		pellet.x=-1000;
		score+=currentMultiplier;

		
		//httpGet("http://initialsgames.com/highscores/commands.php?f=addData&score=1&gamename=feedingtime");
		
		
	
	
	}
}
function destroyPellet2 (chicken, pellet) {
	if (chicken2.animations.getAnimation("idle").currentFrame["index"] == 2) {

		
		emitter.x = pellet.x;
		emitter.y = pellet.y;
		emitter.start(true, 900, null, 6);
		pellet.x=-1000;
		score+=currentMultiplier;
		//httpGet("http://initialsgames.com/highscores/commands.php?f=addData&score=1&gamename=feedingtime");
		
	}
}
function destroyPellet3 (chicken, pellet) {
	if (chicken3.animations.getAnimation("idle").currentFrame["index"] == 13||chicken3.animations.getAnimation("idle").currentFrame["index"] == 12) {

		
		emitter.x = pellet.x;
		emitter.y = pellet.y;
		emitter.start(true, 900, null, 6);
		
		pellet.x=-1000;
		score+=currentMultiplier;
		//httpGet("http://initialsgames.com/highscores/commands.php?f=addData&score=1&gamename=feedingtime");
		
	}
}


function overGirl () {
	spriteGirl.alpha = 1.0;
	spriteGirl.play("blink");
	
	powerBar.visible = true;
	powerBarBg.visible = true;
	powerBar.scale.x = 0;
	
}
function outGirl () {
	spriteGirl.alpha = 0.7;
	
	powerBar.visible = false;
	powerBarBg.visible = false;
}
function clickUpGirl () {
	canFeed = true;

	if (!spriteGirl.animations.getAnimation("feed").isPlaying) {
		timesFed += 1;
	}
	spriteGirl.animations.play('feed', 12, false);
	
	
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
	//chicken1.body.velocity.x = game.rnd.integerInRange(-40,40);

}
function clickChicken2 () {
	//chicken2.body.velocity.x = game.rnd.integerInRange(-40,40);

}
function clickChicken3 () {
	//chicken3.body.velocity.x = game.rnd.integerInRange(-40,40);

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