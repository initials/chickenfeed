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

            for (int i = 0; i < 100; i++)
            {
                chicken = new Chicken(0, 0);
                chicken.floorLevel = i / 20;
                chickens.add(chicken);
            }

            add(chickens);

        }

        override public void update()
        {

            foreach (Chicken chicken in chickens.members)
            {
                chicken.collide(bg.grounds.members[chicken.floorLevel]);
            }
            foreach (Pellet p in girl.pellets.members)
            {
                p.collide(bg.grounds.members[p.floorLevel]);
            }

            base.update();
        }


    }
}
