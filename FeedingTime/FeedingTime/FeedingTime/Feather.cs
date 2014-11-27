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

        Tweener t;

        public Feather(int xPos, int yPos)
            : base(xPos, yPos)
        {
            loadGraphic("feather", true, false, 10, 10);

            t = new Tweener(-23, 23, 3, XNATweener.Sinusoidal.EaseInOut);
            t.Loop = true;
            acceleration.Y = 23;

            angularVelocity = 30;
        }

        override public void update()
        {

            acceleration.X = t.Position;


            t.Update(FlxG.elapsedAsGameTime);
            base.update();

        }


    }
}
