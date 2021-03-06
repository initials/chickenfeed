﻿using System;
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
        private FlxSprite bg;
        private FlxSprite grass;


        public BG(int xPos, int yPos)
        {
            bg = new FlxSprite(0, 0);
            bg.loadGraphic("pellet_4x4");
            bg.scale = 200;
            add(bg);
            bg.color = FlxColor.ToColor("#E56C60");


            grass = new FlxSprite(0, 0);
            grass.loadGraphic(FlxG.Content.Load<Texture2D>("bgGrass_320x180"), true, false, 320, 180);
            add(grass);

            grounds = new FlxGroup();
            for (int i = 0; i < 10; i++)
			{
			    FlxSprite ground = new FlxSprite(0, (FlxG.height-40) + i*4);
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

            if (FlxG.score > 100000)
            {
                bg.color = FlxColor.ToColor("#E56D40");
                grass.color = FlxColor.ToColor("#E56D40");
            }
            else if (FlxG.score > 5000)
            {
                bg.color = FlxColor.ToColor("#E56D30");
                grass.color = FlxColor.ToColor("#E56D30");
            }
            else if (FlxG.score > 3000)
            {
                bg.color = FlxColor.ToColor("#E56D20");
                grass.color = FlxColor.ToColor("#E56D20");
            }
            else if (FlxG.score > 2000)
            {
                bg.color = FlxColor.ToColor("#E56D10");
                grass.color = FlxColor.ToColor("#E56D10");
            }
            else if (FlxG.score > 1000)
            {
                bg.color = FlxColor.ToColor("#E56D00");
                grass.color = FlxColor.ToColor("#E56D00");
            }
            else if (FlxG.score > 500)
            {
                bg.color = FlxColor.ToColor("#E56C90");
                grass.color = FlxColor.ToColor("#E56C90");
            }
            else if (FlxG.score > 200)
            {
                bg.color = FlxColor.ToColor("#E56C80");
                grass.color = FlxColor.ToColor("#E56C80");
            }
            else if (FlxG.score > 100)
            {
                bg.color = FlxColor.ToColor("#E56C70");
                grass.color = FlxColor.ToColor("#E56C70");
            }

            base.update();

        }


    }
}
