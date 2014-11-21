using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using org.flixel;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;


namespace FeedingTime
{
    class Chicken : FlxSprite
    {
        public int floorLevel;

        public Chicken(int xPos, int yPos)
            : base(xPos, yPos)
        {


            /*
                chicken1 = game.add.sprite(13*4, 60*4, 'chickens');
                chicken1.animations.add('idle', [0,1,1,1,1,1,1,1,1,2,3], 12, false );

                chicken2 = game.add.sprite(40*4, 60*4, 'chickens');
                chicken2.animations.add('idle', [5,6,7,7,7,7,7,7,7,7,7,7,1,2,3,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,9], 14, false );
	            chicken2.animations.play('idle', 14, true);
    
             *  chicken3.animations.add('idle', [10,10,10,10,10,11,12,13,14], 16, false );
	            chicken3.animations.play('idle', 16, true);
             * 
             */

            loadGraphic(FlxG.Content.Load<Texture2D>("chickens_22x22"), true, false, 22, 22);

            addAnimation("idle1", new int[] { 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3 }, (int)FlxU.random(10,14), true);
            addAnimation("idle2", new int[] { 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 2, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9 }, (int)FlxU.random(10, 14), true);
            addAnimation("idle3", new int[] { 10, 10, 10, 10, 10, 11, 12, 13, 14 }, (int)FlxU.random(10, 14), true);

            play("idle" + ((int)FlxU.random(1,4)).ToString());

            setDrags(120, 120);
            acceleration.Y = 980;

            floorLevel = (int)FlxU.random(0, 5);

        }

        override public void update()
        {
            if (FlxU.random() > 0.99672222f && onFloor)
            {
                velocity.X = 50;
                velocity.Y = -125;

            }

            base.update();

        }


    }
}
