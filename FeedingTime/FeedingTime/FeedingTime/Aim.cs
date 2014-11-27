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
    class Aim : FlxSprite
    {

        public Aim(int xPos, int yPos)
            : base(xPos, yPos)
        {
            loadGraphic("gameIcons", true, false, 10, 10);
            
            
        }

        override public void update()
        {

            x = FlxG.mouse.x - (this.width/2);
            y = FlxG.mouse.y - (this.height/2);


            base.update();

        }


    }
}
