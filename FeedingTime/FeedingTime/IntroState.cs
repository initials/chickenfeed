using System;
using System.Collections.Generic;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using org.flixel;

using System.Linq;
using System.Xml.Linq;

namespace FeedingTime
{
    public class IntroState : FlxState
    {
        private Girl girl;
        private BG bg;
        private FlxGroup chickens;
        private Chicken chicken;

        override public void create()
        {
            FlxG.backColor = FlxColor.ToColor("#E56C60");
            base.create();

            bg = new BG(0, 0);
            add(bg);

            girl = new Girl(10,10);
            girl.x = FlxG.width - girl.width - 10;
            girl.centerAtY();
            add(girl);

            chickens = new FlxGroup();
            
            int maxChickens = 30;

            for (int i = 0; i < maxChickens; i++)
            {
                chicken = new Chicken(10, 10);
                //chicken.floorLevel = i / (maxChickens/5);
                chicken.visible = false;
                chicken.dead = true;
                chickens.add(chicken);
            }

            add(chickens);

        }

        override public void update()
        {
            if (FlxG.keys.justPressed(Keys.B))
            {
                FlxG.showBounds = !FlxG.showBounds;
            }

            if (elapsedInState > 1.0f)
            {
                FlxSprite c = (FlxSprite)chickens.getFirstDead();

                if (c != null)
                {
                    c.facing = Flx2DFacing.Right;

                    c.dead = false;
                    c.visible = true;
                    elapsedInState = 0;
                    c.x = 0;
                    c.velocity.X = 43;
                    c.y = 0;
                    
                }
            }

            foreach (Chicken chicken in chickens.members)
            {
                chicken.collide(bg.grounds.members[chicken.floorLevel]);
            }
            foreach (Pellet p in girl.pellets.members)
            {
                p.collide(bg.grounds.members[p.floorLevel]);
            }

            FlxU.overlap(chickens, girl.pellets, eatPellet);

            base.update();
        }
        protected bool eatPellet(object Sender, FlxSpriteCollisionEvent e)
        {
            if (((Chicken)(e.Object1)).isPecking == true && ((Chicken)(e.Object1)).floorLevel==((Pellet)(e.Object2)).floorLevel)
            {
                e.Object2.dead = true;
                e.Object2.visible = false;
                ((FlxSprite)(e.Object1)).facing = Flx2DFacing.Left;


            }
            return true;

        }


    }
}
