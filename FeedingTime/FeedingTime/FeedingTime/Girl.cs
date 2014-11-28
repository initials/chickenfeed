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
    class Girl : FlxSprite
    {
        private bool canFeed;
        public FlxGroup pellets;
        /// <summary>
        /// A place to put the mouse incase you want to limit feeding only to mouse over.
        /// </summary>
        public Aim aim;

        public Girl(int xPos, int yPos)
            : base(xPos, yPos)
        {
            
            loadGraphic(FlxG.Content.Load<Texture2D>("girl_49x91"), true, false, 49, 91);

            addAnimation("feed", new int[] { 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 8 }, 12, false);
            addAnimation("blink", new int[] { 18, 8 }, 12, true);
            addAnimation("idle", new int[] { 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,18 }, 10, true);
            play("idle");

            addAnimationCallback(pulse);
            canFeed = true;

            pellets = new FlxGroup();

            for (int i = 0; i < 100; i++)
            {
                Pellet p = new Pellet(-10, -10);
                p.dead = true;
                pellets.add(p);
            }

            width = 15;
            //height = 60;
            setOffset(17, 0);


        }

        public void throwPellets(int Count)
        {
            for (int i = 0; i < Count; i++)
            {
                if (pellets.getFirstDead() == null) return;
                FlxObject p = pellets.getFirstDead();
                p.reset(0, 0);

                p.x = this.x - 15;
                p.y = this.y + 40;
                
                p.setVelocity(FlxU.random(-80, -25), FlxU.random(-150, -125));
                p.dead = false;
                p.visible = true;
            }
        }

        public void pulse(string Name, uint Frame, int FrameIndex)
        {
            if (Name == "feed" && FrameIndex == 10)
            {
                //Emit pellets here;
                throwPellets(8);

            }
            if (Name == "feed" && FrameIndex == 14)
            {
                canFeed = true;
            }
        }

        override public void update()
        {
            if (FlxG.mouse.justPressed() && canFeed==true)
            {
                if (aim != null)
                {
                    if (aim.frame == 1)
                    {
                        play("feed", true);
                        canFeed = false;
                    }
                }

            }

            pellets.update();

            base.update();

        }
        public override void render(SpriteBatch spriteBatch)
        {
            base.render(spriteBatch);
            pellets.render(spriteBatch);
        }


    }
}
