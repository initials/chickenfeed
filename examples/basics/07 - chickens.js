
var game = new Phaser.Game(148*4, 91*4, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update  }, false, false);

function preload() {
    //game.load.atlasJSONHash('bot', 'assets/sprites/running_bot.png', 'assets/sprites/running_bot.json');
	game.load.spritesheet('chicken', 'chickens_148x91.png', 148, 91);
	game.load.spritesheet('note', 'squareNote.png', 4, 4);
	game.load.audio('sfxLazer', [ 'shot.wav']);




	game.load.spritesheet('bg', 'bg_148x91.png', 148, 91);
	game.load.spritesheet('chickens', 'chickens_22x22.png', 22, 22);
	game.load.spritesheet('girl', 'girl_49x91.png', 49, 91);
	game.load.spritesheet('pellet', 'pellet_4x4.png', 4, 4);
	
}
var chickenFeed;
var note;
var t = 0;
var s;
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


function create() {
	
    sfxLazer = game.add.audio('sfxLazer', 0.1, false);
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

	spriteBg = game.add.sprite(0, 0, 'bg');
	spriteBg.scale.x = 4;
	spriteBg.scale.y = 4;


	pellets = game.add.group();
    for (var i = 0; i < 10; i++)
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
    spriteGirl.events.onInputOver.add(overGirl, this);
    spriteGirl.events.onInputOut.add(outGirl, this);

	spriteGirl.scale.x = 4;
	spriteGirl.scale.y = 4;
	spriteGirl.alpha = 0.9;


    chicken1 = game.add.sprite(13*4, 60*4, 'chickens');
	//chicken1.inputEnabled=true;
    //chickenFeed.events.onInputDown.add(listener,this);
    chicken1.animations.add('idle', [0,1,1,1,1,1,1,1,1,2,3], 12, false );
	chicken1.animations.play('idle', 12, true);
	chicken1.scale.x = 4;
	chicken1.scale.y = 4;


    chicken2 = game.add.sprite(40*4, 56*4, 'chickens');
    chicken2.animations.add('idle', [5,6,7,7,7,7,7,7,7,7,8,9], 14, false );
	chicken2.animations.play('idle', 14, true);

	chicken2.scale.x = 4;
	chicken2.scale.y = 4;


    chicken3 = game.add.sprite(82*4, 60*4, 'chickens');
    chicken3.animations.add('idle', [10,10,10,10,10,11,12,13,14], 16, false );
	chicken3.animations.play('idle', 16, true);

	chicken3.scale.x = -4;
	chicken3.scale.y = 4;




	
	var style = { font: "12pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 1 };

    s = game.add.text(10, 340, '', style);
	

	notes = game.add.group();
    for (var i = 0; i < 17; i++)
    {
        notes.create((10 + (i*6)+5), 5, 'note');
		//notes.add(note);
    }




	

}

function update() 
{

	if (spriteGirl.animations.getAnimation("feed").isPlaying && spriteGirl.animations.getAnimation("feed").currentFrame["index"] == 10) {
		
		pellets.forEach(function(item) {
			item.body.velocity.x =  game.rnd.integerInRange(-400, -100);
			item.body.velocity.y =  game.rnd.integerInRange(-300, -100);
			item.x = 390;
			item.y = 150;
			item.body.acceleration.y = 980;
		});


	}

	//game.physics.collide(pellets, pellets);



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
	
}

function overGirl () {
	spriteGirl.alpha = 1.0;
	spriteGirl.play("blink");
}
function outGirl () {
	spriteGirl.alpha = 0.7;
}
function clickGirl () {
	if (!spriteGirl.animations.getAnimation("feed").isPlaying) {
		timesFed += 1;
	}
	spriteGirl.animations.play('feed', 12, false);



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