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
    public class PlayState : FlxState
    {
        private Girl girl;
        private BG bg;

        private FlxGroup birds;

        private FlxGroup chickens;
        private Chicken chicken;

        private FlxGroup ducks;
        private Duck duck;

        private FlxText score;

        private FlxEmitter plusOnes;
        private FlxEmitter minusOnes;

        private Aim aim;

        private Feather feather;
        private FlxGroup feathers;
        private int featherCounter;

        private Feather duckFeather;
        private FlxGroup duckFeathers;
        private int duckFeatherCounter;

        private bool canKillChickenThisTick;

        override public void create()
        {
            //FlxG.backColor = FlxColor.ToColor("#E56C60");

            base.create();

            bg = new BG(0, 0);
            add(bg);


            girl = new Girl(10, 10);
            girl.x = FlxG.width - girl.width - 50;
            girl.centerAtY();
            girl.y += 25;
            add(girl);

            birds = new FlxGroup();

            chickens = new FlxGroup();
            ducks = new FlxGroup();

            int maxChickens = 5;

            for (int i = 0; i < maxChickens; i++)
            {
                chicken = new Chicken((int)FlxU.randomInt(10,150), 10);
                chicken.floorLevel = i;
                //chicken.visible = false;
                //chicken.dead = true;
                chickens.add(chicken);
                birds.add(chicken);

                duck = new Duck(-10, -10);
                duck.floorLevel = i;
                duck.visible = false;
                duck.dead = true;
                ducks.add(duck);
                birds.add(duck);

            }
            
            add(birds);

            score = new FlxText(1, 1, 100);
            score.setFormat(FlxG.Content.Load<SpriteFont>("font"), 1, Color.White, FlxJustification.Left, Color.Black);
            add(score);

            plusOnes = new FlxEmitter();
            plusOnes.createSprites("plus1", 100, false, 0.0f, 0.0f);
            plusOnes.setXSpeed(0, 0);
            plusOnes.setYSpeed(-50, -40);
            plusOnes.minRotation = 0;
            plusOnes.maxRotation = 0;
            plusOnes.gravity = 0;
            plusOnes.delay = 0;

            add(plusOnes);

            minusOnes = new FlxEmitter();
            minusOnes.createSprites("minus1", 100, false, 0.0f, 0.0f);
            minusOnes.setXSpeed(0, 0);
            minusOnes.setYSpeed(-50, -40);
            minusOnes.minRotation = 0;
            minusOnes.maxRotation = 0;
            minusOnes.gravity = 0;
            minusOnes.delay = 0;

            add(minusOnes);



            FlxG.playMp3("music/chickens", 0.2f);

            aim = new Aim(0, 0);
            add(aim);
            girl.aim = aim;


            feathers = new FlxGroup();
            feathers.health = 0;

            for (int i = 0; i < 25; i++)
            {
                feather = new Feather(-100, -100, "chicken");
                feathers.add(feather);
            }

            add(feathers);

            duckFeathers = new FlxGroup();

            for (int i = 0; i < 25; i++)
            {
                duckFeather = new Feather(-100, -100, "duck");
                duckFeathers.add(duckFeather);
            }

            add(duckFeathers);



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

            if (elapsedInState > 4.10f)
            {
                //FlxSprite c = (FlxSprite)chickens.getFirstDead();
                //if (c != null)
                //{
                //    c.facing = Flx2DFacing.Right;
                //    c.exists = true;
                //    c.dead = false;
                //    c.visible = true;
                //    elapsedInState = 0;
                //    c.x = 0;
                //    c.velocity.X = 43;
                //    c.y = 0;
                //}

                FlxSprite d = (FlxSprite)ducks.getFirstDead();
                if (d != null)
                {
                    d.facing = Flx2DFacing.Right;
                    d.exists = true;
                    d.dead = false;
                    d.visible = true;
                    d.x = 0;
                    d.velocity.X = 43;
                    d.y = 0;
                    elapsedInState = 0;
                }


            }

            foreach (Bird bb in birds.members)
            {
                bb.collide(bg.grounds.members[bb.floorLevel]);
            }

            foreach (Pellet p in girl.pellets.members)
            {
                p.collide(bg.grounds.members[p.floorLevel]);
            }

            FlxU.overlap(birds, girl.pellets, eatPellet);
            aim.frame = 0;
            FlxU.overlap(aim, girl, setAimIcon);


            if (FlxG.score < 0) FlxG.score = 0;

            score.text = FlxG.score.ToString();

            if (FlxG.debug)
            {
                if (FlxG.keys.PLUS)
                    FlxG.score++;
            }

            if (FlxG.mouse.justPressed())
            {
                FlxU.overlap(aim, birds, killChicken);
            }


            base.update();

            if (chickens.countLiving() == 0)
            {
                FlxG.state = new GameOverState();
                return;
            }

        }

        protected bool killChicken(object Sender, FlxSpriteCollisionEvent e)
        {
            if (canKillChickenThisTick)
            {
                if (e.Object2.GetType().ToString() == "FeedingTime.Chicken")
                {
                    for (int i = 0; i < 10; i++)
                    {
                        Feather c = (Feather)feathers.members[featherCounter];
                        c.at(e.Object2);
                        c.velocity.Y = FlxU.random(-50, -20);
                        featherCounter++;
                        if (featherCounter >= feathers.members.Count) featherCounter = 1;
                    }
                    e.Object2.kill();
                }
                if (e.Object2.GetType().ToString() == "FeedingTime.Duck")
                {
                    for (int i = 0; i < 10; i++)
                    {
                        Feather c = (Feather)duckFeathers.members[duckFeatherCounter];
                        c.at(e.Object2);
                        c.velocity.Y = FlxU.random(-50, -20);
                        duckFeatherCounter++;
                        if (duckFeatherCounter >= duckFeathers.members.Count) duckFeatherCounter = 1;
                    }
                    e.Object2.kill();
                }



            }

            canKillChickenThisTick = false;

            return true;
        }

        public override void render(SpriteBatch spriteBatch)
        {
            base.render(spriteBatch);
        }

        protected bool setAimIcon(object Sender, FlxSpriteCollisionEvent e)
        {
            aim.frame = 1;
            return true;
        }


        protected bool eatPellet(object Sender, FlxSpriteCollisionEvent e)
        {
            if (e.Object1.GetType().ToString()=="FeedingTime.Chicken")
            {
                if (((Bird)(e.Object1)).isPecking == true && ((Bird)(e.Object1)).floorLevel == ((Pellet)(e.Object2)).floorLevel)
                {
                    plusOnes.at(e.Object2);
                    plusOnes.start(false, 0.0001f, 1);

                    e.Object2.dead = true;
                    e.Object2.visible = false;
                    e.Object2.x = -100;
                    e.Object2.y = -100;

                    FlxG.score++;

                }
            }
            else if (e.Object1.GetType().ToString() == "FeedingTime.Duck")
            {
                if (((Bird)(e.Object1)).floorLevel == ((Pellet)(e.Object2)).floorLevel)
                {
                    minusOnes.at(e.Object2);
                    minusOnes.start(false, 0.0001f, 1);

                    e.Object2.dead = true;
                    e.Object2.visible = false;
                    e.Object2.x = -100;
                    e.Object2.y = -100;

                    FlxG.score--;

                }
            }

            return true;

        }


    }
}
