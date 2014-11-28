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
        private BG bg;

        override public void create()
        {
            //FlxG.backColor = FlxColor.ToColor("#E56C60");

            base.create();

            bg = new BG(0, 0);
            add(bg);

            FlxText title = new FlxText(0, 0, FlxG.width);
            title.center();
            title.y -= 20;

            title.setFormat(FlxG.Content.Load<SpriteFont>("font"), 2, Color.White, FlxJustification.Center, Globals.grass);
            
            add(title);
            
            Dictionary<string, string> x = FlxXMLReader.readXML("title", "Script/script.xml");
            title.text = x[FlxG.language];

        }

        override public void update()
        {

            if (FlxG.mouse.justPressed() && elapsedInState > 0.2f)
            {
                FlxG.state = new PlayState();
                return;
            }


            base.update();


        }


    }
}
