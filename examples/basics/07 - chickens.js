
var game = new Phaser.Game(148*4, 91*4, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update  }, false, false);

function preload() {
    //game.load.atlasJSONHash('bot', 'assets/sprites/running_bot.png', 'assets/sprites/running_bot.json');
	game.load.spritesheet('chicken', 'chickens_148x91.png', 148, 91);
	game.load.spritesheet('note', 'squareNote.png', 4, 4);
	game.load.audio('sfxLazer', [ 'shot.wav']);
	
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

function create() {
	
    sfxLazer = game.add.audio('sfxLazer', 0.1, false);
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
	notes = game.add.group();
    for (var i = 0; i < 17; i++)
    {
        notes.create((10 + (i*6)+5), 5, 'note');
		//notes.add(note);
    }
	

}

function update() 
{
	time++;
	var c = 0;
	//console.log(c);
	notes.forEach(function(item) {
		if (time%16==c)
		{
			item.scale.x = 3;
			item.scale.y = 3;
		}
		else
		{
			item.scale.x = 1;
			item.scale.y = 1;
		}
		
		//console.log(c);
		c++;
	});
	
	if (time%16==0) sfxLazer.play('', 0, 0.1);
	
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