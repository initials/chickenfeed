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
    class BG : FlxGroup
    {

        public FlxGroup grounds;

        public BG(int xPos, int yPos)
        {
            FlxSprite grass = new FlxSprite(0, 0);
            grass.loadGraphic(FlxG.Content.Load<Texture2D>("bgGrass_148x91"), true, false, 148, 91);
            add(grass);

            grounds = new FlxGroup();
            for (int i = 0; i < 10; i++)
			{
			    FlxSprite ground = new FlxSprite(0, (FlxG.height-20) + i*4);
                ground.loadGraphic("ground");
                ground.color = Color.Red;
                ground.alpha = 0.0f;
                ground.@fixed = true;
                grounds.add(ground);
			}
            add(grounds);


        }

        override public void update()
        {


            base.update();

        }


    }
}
