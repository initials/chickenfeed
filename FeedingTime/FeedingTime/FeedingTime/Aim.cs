using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using org.flixel;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;


namespace FeedingTime.FeedingTime
{
    class Aim : FlxSprite
    {

        public Aim(int xPos, int yPos)
            : base(xPos, yPos)
        {
            loadGraphic(FlxG.Content.Load<Texture2D>("Lemonade/"), true, false, 50, 80);

            
        }

        override public void update()
        {


            base.update();

        }


    }
}
