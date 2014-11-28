using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using org.flixel;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

using XNATweener;

namespace FeedingTime
{
    class Feather : FlxSprite
    {

        private Tweener t;
        private bool reverse;

        public Feather(int xPos, int yPos)
            : base(xPos, yPos)
        {
            reverse = false;
            loadGraphic("feather", true, false, 10, 10);

            t = new Tweener(-23, 23, FlxU.random(2,4), XNATweener.Sinusoidal.EaseInOut);
            t.PingPong = true;
            acceleration.Y = 23;

            angle = FlxU.random(0, 359);
            angularVelocity = FlxU.random(15, 140);

            if (FlxU.random() > 0.5f)
            {
                reverse = true;
            }


        }

        override public void update()
        {
            int m = 1;
            if (reverse)
            {
                m = -1;
            }

            velocity.X = t.Position * m;


            t.Update(FlxG.elapsedAsGameTime);
            base.update();

        }


    }
}
