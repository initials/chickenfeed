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
    class Duck : FlxSprite
    {
        public int floorLevel;
        public bool isPecking;
        private int ChickenType;

        public Duck(int xPos, int yPos)
            : base(xPos, yPos)
        {

            loadGraphic(FlxG.Content.Load<Texture2D>("ducks_22x22"), true, false, 22, 22);
            int maxSpeed = 14;
            int minSpeed = 10;
            addAnimation("idle1", new int[] { 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3 }, (int)FlxU.random(minSpeed, maxSpeed), true);
            addAnimation("idle2", new int[] { 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 2, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9 }, (int)FlxU.random(minSpeed, maxSpeed), true);
            addAnimation("idle3", new int[] { 10, 10, 10, 10, 10, 11, 12, 13, 14 }, (int)FlxU.random(minSpeed, maxSpeed), true);
            addAnimation("fly", new int[] { 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2 }, (int)FlxU.random(minSpeed, maxSpeed), true);

            ChickenType = ((int)FlxU.random(1, 4));
            play("idle" + ChickenType.ToString());

            setDrags(120, 120);
            acceleration.Y = 980;

            //floorLevel = (int)FlxU.random(0, 5);
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
                color = Color.White;
                isPecking = false;
            }

        }

        override public void update()
        {
            if (velocity.X <= 0)
            {
                play("idle" + ChickenType.ToString(), false);
            }
            else
            {
                play("fly", true);
            }

            if (visible)
            {
                // 0.99672222f
                if (FlxU.random() > 0.9891f && onFloor)
                {
                    if (this.facing == Flx2DFacing.Right)
                    {
                        velocity.X = 35;
                        velocity.Y = -125;
                    }
                    else if (this.facing == Flx2DFacing.Left)
                    {
                        velocity.X = -35;
                        velocity.Y = -125;
                    }



                }
            }
            if (y > FlxG.height + 20)
            {
                dead = true;
            }

            if (x < 30)
            {
                facing = Flx2DFacing.Right;
            }
            if (x > FlxG.width - 70)
            {
                facing = Flx2DFacing.Left;
            }

            base.update();

        }


    }
}
