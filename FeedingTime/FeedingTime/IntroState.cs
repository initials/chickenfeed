﻿using System;
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

        private FlxText score;
        private FlxEmitter exploder;

        private Aim aim;
        
        private Feather feather;
        private FlxGroup feathers;
        private int featherCounter;

        private bool canKillChickenThisTick;

        override public void create()
        {
            //FlxG.backColor = FlxColor.ToColor("#E56C60");

            base.create();

            bg = new BG(0, 0);
            add(bg);


            girl = new Girl(10, 10);
            girl.x = FlxG.width - girl.width - 10;
            girl.centerAtY();
            add(girl);

            chickens = new FlxGroup();
            
            int maxChickens = 5;

            for (int i = 0; i < maxChickens; i++)
            {
                chicken = new Chicken(10, 10);
                chicken.floorLevel = i;
                chicken.visible = false;
                chicken.dead = true;
                chickens.add(chicken);
            }

            add(chickens);

            score = new FlxText(1, 1, 100);
            score.setFormat(FlxG.Content.Load<SpriteFont>("font"), 1, Color.White, FlxJustification.Left, Color.Black);
            add(score);

            exploder = new FlxEmitter();
            exploder.createSprites("plus1", 100, false, 0.0f, 0.0f);
            exploder.setXSpeed(0, 0);
            exploder.setYSpeed(-50, -40);
            exploder.minRotation = 0;
            exploder.maxRotation = 0;
            exploder.gravity = 0;
            exploder.delay = 0;

            add(exploder);

            FlxG.playMp3("music/chickens", 0.2f);

            aim = new Aim(0, 0);
            add(aim);
            girl.aim = aim;
            

            feathers = new FlxGroup();
            feathers.health = 0;

            for (int i = 0; i < 25; i++)
            {
                feather = new Feather(-100, -100);
                feathers.add(feather);    
            }

            add(feathers);

            canKillChickenThisTick = true;
            featherCounter = 0;
        }

        override public void update()
        {
            canKillChickenThisTick = true;

            if (FlxG.keys.justPressed(Keys.B))
            {
                FlxG.showBounds = !FlxG.showBounds;
            }
            if (FlxG.keys.justPressed(Keys.Escape))
            {
                FlxG.Game.Exit();
            }

            if (elapsedInState > 1.10f)
            {
                FlxSprite c = (FlxSprite)chickens.getFirstDead();

                if (c != null)
                {

                    Console.WriteLine("Releasing a chicken");
                    c.facing = Flx2DFacing.Right;

                    c.exists = true;
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
            aim.frame = 0;
            FlxU.overlap(aim, girl, setAimIcon);



            score.text = FlxG.score.ToString();

            if (FlxG.debug)
            {
                if (FlxG.keys.PLUS)
                    FlxG.score++;
            }

            if (FlxG.mouse.justPressed())
            {
                FlxU.overlap(aim, chickens, killChicken);
            }


            base.update();


        }

        protected bool killChicken(object Sender, FlxSpriteCollisionEvent e)
        {
            //Console.WriteLine("Kill chicken {0}", e.Object1);

            if (canKillChickenThisTick)
            {

                for (int i = 0; i < 10; i++)
                {
                    Feather c = (Feather)feathers.members[featherCounter];

                    c.at(e.Object2);
                    c.velocity.Y = FlxU.random(-50, -20);

                    featherCounter++;

                    if (featherCounter >= feathers.members.Count) featherCounter = 1;
                }
                //foreach (Feather c in feathers.members)
                //{

                //}

                e.Object2.kill();
            }

            canKillChickenThisTick = false;

            return true;
        }

        protected bool setAimIcon(object Sender, FlxSpriteCollisionEvent e)
        {
            aim.frame = 1;
            return true;
        }


        protected bool eatPellet(object Sender, FlxSpriteCollisionEvent e)
        {
            if (((Chicken)(e.Object1)).isPecking == true && ((Chicken)(e.Object1)).floorLevel==((Pellet)(e.Object2)).floorLevel)
            {
                exploder.at(e.Object2);
                exploder.start(false, 0.0001f, 1);

                e.Object2.dead = true;
                e.Object2.visible = false;
                e.Object2.x = -100;
                e.Object2.y = -100;
                
                FlxG.score++;

            }
            return true;

        }


    }
}
