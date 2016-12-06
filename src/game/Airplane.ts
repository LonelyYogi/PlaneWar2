 class Airplane extends egret.DisplayObjectContainer
    {
        private static cacheplane1:Object = {};
        private static cacheplane2:Object = {};
        private static cacheplane3:Object = {};
        private static cacheplane4:Object = {};
    public textureName:string;
        /**生产*/
        public static produce(textureName:string,fireDelay:number,planetype:number):Airplane
        {
        console.log (textureName);

                switch(textureName)
                {
                    case 'enemyplane1':
                    if(Airplane.cacheplane1[textureName] == null)
                    {
                        Airplane.cacheplane1[textureName] = [];
                    }
                    var dict: Airplane[] = Airplane.cacheplane1[textureName];
                    break;
                    case 'enemyplane2':
                    if(Airplane.cacheplane2[textureName] == null)
                    {
                        Airplane.cacheplane2[textureName] = [];
                    }
                    var dict: Airplane[] = Airplane.cacheplane2[textureName];
                       break;
                    case 'enemyplane3':
                        if(Airplane.cacheplane3[textureName] == null) {
                            Airplane.cacheplane3[textureName] = [];
                        }
                        var dict: Airplane[] = Airplane.cacheplane3[textureName];
                        break;
                    case 'enemyplane4':
                        if(Airplane.cacheplane4[textureName] == null) {
                            Airplane.cacheplane4[textureName] = [];
                        }
                        var dict: Airplane[] = Airplane.cacheplane4[textureName];
                        break;


                }
                var theFighter:Airplane;
                    if(dict.length>0) {
                        theFighter = dict.pop();
                    } else {
                        theFighter = new Airplane(RES.getRes(textureName),fireDelay,planetype);
                    }
                    theFighter.blood = 15;
                    if(planetype==5)
                    {
            theFighter.blood = 50;
                    }
                    return theFighter;
  
        }
        /**回收*/
        public static reclaim(theFighter:Airplane,textureName:string):void
        {
        
            switch(textureName) {
                case 'enemyplane1':
                    var dict: Airplane[] = Airplane.cacheplane1[textureName];
                    if(Airplane.cacheplane1[textureName] == null) {
                        Airplane.cacheplane1[textureName] = [];
                        var dict: Airplane[] = Airplane.cacheplane1[textureName];
                        if(-1 == dict.indexOf(theFighter))
                            dict.push(theFighter);
                    }
                    else {
                        Airplane.cacheplane1[textureName].push(theFighter);
                    }
                    break;
                case 'enemyplane2':
                    var dict: Airplane[] = Airplane.cacheplane2[textureName];
                    if(Airplane.cacheplane2[textureName] == null) {
                        Airplane.cacheplane2[textureName] = [];
                        var dict: Airplane[] = Airplane.cacheplane2[textureName];
                        if(-1 == dict.indexOf(theFighter))
                            dict.push(theFighter);
                    }
                    else {
                        Airplane.cacheplane2[textureName].push(theFighter);
                    }
                    break;
                case 'enemyplane3':

                    var dict: Airplane[] = Airplane.cacheplane3[textureName];
                    if(Airplane.cacheplane3[textureName] == null) {
                        Airplane.cacheplane3[textureName] = [];
                        var dict: Airplane[] = Airplane.cacheplane3[textureName];
                        if(-1 == dict.indexOf(theFighter))
                            dict.push(theFighter);
                    }
                    else {
                        Airplane.cacheplane3[textureName].push(theFighter);
                    }
                    break;
                case 'enemyplane4':

                    var dict: Airplane[] = Airplane.cacheplane4[textureName];
                    if(Airplane.cacheplane4[textureName] == null) {
                        Airplane.cacheplane4[textureName] = [];
                        var dict: Airplane[] = Airplane.cacheplane4[textureName];
                        if(-1 == dict.indexOf(theFighter))
                            dict.push(theFighter);
                    }
                    else {
                        Airplane.cacheplane4[textureName].push(theFighter);
                    }
                    break;

            }
        }

        /**飞机位图*/
        private bmp:egret.Bitmap;
        /**创建子弹的时间间隔*/
        private fireDelay:number;
        /**定时射*/
        private fireTimer:egret.Timer;
        /**飞机生命值*/
        public blood:number = 15;
        public planetype: number;
        public mybullettype: number = 0;
        public isright: number=1;
        public constructor(texture:egret.Texture,fireDelay:number,planetype:number) {
            super();
            this.fireDelay = fireDelay;
            this.planetype = planetype;
            if(planetype==5)
            {
                this.blood = 300;
            }
            this.bmp = new egret.Bitmap(texture);
            this.addChild(this.bmp);
            this.fireTimer = new egret.Timer(fireDelay);
            this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
        }
        /**开火*/
        public fire():void {
            this.fireTimer.start();
        }
        /**停火*/
        public stopFire():void {
            this.fireTimer.stop();
        }
        /**创建子弹*/
        private createBullet(evt:egret.TimerEvent):void {
            this.dispatchEventWith("createBullet",false,this.planetype);
        }
    }
