
var game = new Phaser.Game(148*4, 91*4, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create }, false, false);

function preload() {
    //game.load.atlasJSONHash('bot', 'assets/sprites/running_bot.png', 'assets/sprites/running_bot.json');
	game.load.spritesheet('chicken', 'chickens_148x91.png', 148, 91);
	
}
var chickenFeed;

var t = 0;
var s;
var index = 0;
var line = '';

var timesFed = 0;

function create() {

    //  This sprite is using a texture atlas for all of its animation data
    chickenFeed = game.add.sprite(0, 0, 'chicken');

    //  Here we add a new animation called 'run'
    //  We haven't specified any frames because it's using every frame in the texture atlas
    chickenFeed.animations.add('feed', [8,9,10,11,12,13,14,15,16,17,18,8], 12, false );
	chickenFeed.animations.add('idle', [8], 10, false );
	//alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);

    //  And this starts the animation playing by using its key ("run")
    //  15 is the frame rate (15fps)
    //  true means it will loop when it finishes
    chickenFeed.animations.play('idle', 20, true);
	
	chickenFeed.inputEnabled=true;

    chickenFeed.events.onInputDown.add(listener,this);
	chickenFeed.scale.x = 4;
	chickenFeed.scale.y = 4;
	
	var style = { font: "12pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 1 };

    s = game.add.text(10, 340, '', style);
	
	
	

}

function listener () {

	if (!chickenFeed.animations.getAnimation("feed").isPlaying) {
		timesFed += 1;
	}
	chickenFeed.animations.play('feed', 12, false);
	
	if (timesFed==2) s.setText("Achievement Earned: Fed chickens twice");
	else if (timesFed==5) s.setText("Achievement Earned: Farmer In Training - Fed chickens five times");
	else if (timesFed==10) s.setText("Achievement Earned: Semi-pro farmer - Fed chickens ten times");
	else if (timesFed==50) s.setText("Achievement Earned: Pro Farmer - Fed chickens fifty times");	
	else if (timesFed==100) s.setText("Achievement Earned: Serious Business - Fed chickens one hundred times");
	else s.setText("");	
	
}