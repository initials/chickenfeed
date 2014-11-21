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
        public bool isPecking;

        public Chicken(int xPos, int yPos)
            : base(xPos, yPos)
        {

            loadGraphic(FlxG.Content.Load<Texture2D>("chickens_22x22"), true, false, 22, 22);
            int maxSpeed = 14;
            int minSpeed = 10;
            addAnimation("idle1", new int[] { 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3 }, (int)FlxU.random(minSpeed,maxSpeed), true);
            addAnimation("idle2", new int[] { 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 2, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9 }, (int)FlxU.random(minSpeed, maxSpeed), true);
            addAnimation("idle3", new int[] { 10, 10, 10, 10, 10, 11, 12, 13, 14 }, (int)FlxU.random(minSpeed, maxSpeed), true);

            play("idle" + ((int)FlxU.random(1,4)).ToString());

            setDrags(120, 120);
            acceleration.Y = 980;

            floorLevel = (int)FlxU.random(0, 5);
            isPecking = false;

            addAnimationCallback(pulse);

            width = 8;
            height = 8;

            setOffset(11, 14);
            this.facing = Flx2DFacing.Right;

        }


        public void pulse(string Name, uint Frame, int FrameIndex)
        {
            if (FrameIndex == 3 || FrameIndex == 12)
            {
                //color = Color.Red;
                isPecking = true;
            }
            else
            {
                //color = Color.White;
                isPecking = false;
            }

        }

        override public void update()
        {
            if (visible)
            {
                // 0.99672222f
                if (FlxU.random() > 0.982f && onFloor)
                {
                    if (this.facing == Flx2DFacing.Right)
                    {
                        velocity.X = 50;
                        velocity.Y = -125;
                    }
                    else if (this.facing == Flx2DFacing.Left)
                    {
                        velocity.X = -70;
                        velocity.Y = -125;
                    }



                }
            }
            if (y > FlxG.height + 20)
            {
                dead = true;
            }

            base.update();

        }


    }
}
