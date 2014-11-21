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
    class Pellet : FlxSprite
    {
        public int floorLevel;

        public Pellet(int xPos, int yPos)
            : base(xPos, yPos)
        {
            loadGraphic(FlxG.Content.Load<Texture2D>("pellet_4x4"), true, false, 2, 2);

            floorLevel = (int)FlxU.random(0, 5);

            setDrags(44, 44);
            acceleration.Y = 340;


        }

        override public void update()
        {


            base.update();

        }


    }
}
