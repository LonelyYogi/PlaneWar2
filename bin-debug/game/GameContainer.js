/**
 *
 * @author
 *
 */
var GameContainer = (function (_super) {
    __extends(GameContainer, _super);
    function GameContainer() {
        _super.call(this);
        this.label = new egret.TextField();
        /**敌人的飞机*/
        this.enemyFighters = [];
        /**陨石*/
        this.stones = [];
        /**爆炸*/
        this.explos = [];
        /**能量*/
        this.powers = [];
        /**我的子弹*/
        this.myBullets = [];
        /**敌人的子弹*/
        this.enemyBullets = [];
        /**触发创建敌机的间隔*/
        this.enemyFightersTimer = new egret.Timer(1500);
        /**触发创建陨石的间隔*/
        this.stonesTimer = new egret.Timer(5000);
        /**进入boss的计时器*/
        this.bosscomingTimer = new egret.Timer(25000, 3);
        this.delExplo = [];
        /**成绩显示*/
        //  private scorePanel:ScorePanel;
        /**我的成绩*/
        this.myScore = 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=GameContainer,p=c.prototype;
    p.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createGameScene();
    };
    p.createGameScene = function () {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.bg = new BgMap(); //创建可滚动的背景
        this.addChild(this.bg);
        this.bgmusic2 = RES.getRes("bgmusic2_mp3");
        this.channel = this.bgmusic2.play(0, 0);
        this.mainbg = new egret.Bitmap();
        this.mainbg.texture = RES.getRes("mainbg_jpg");
        this.mainbg.name = "mainbg";
        this.label.name = "sroce";
        this.endbitmap = new egret.Bitmap();
        this.endbitmap.name = "endbitmap";
        this.addChild(this.mainbg);
        var texture = RES.getRes("startbutton_png");
        this.btnStart = new Button(texture, 1);
        this.btnStart.x = (this.stageW - this.btnStart.width) / 2; //居中定位
        this.btnStart.y = (this.stageH - this.btnStart.height) / 2 + 200; //居中定位
        this.btnStart.touchEnabled = true; //开启触碰
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this); //点击按钮开始游戏
        this.addChild(this.btnStart);
    };
    p.gameStart = function () {
        if (this.getChildByName("mainbg") != null)
            this.removeChild(this.mainbg);
        if (this.getChildByName("endbitmap") != null)
            this.removeChild(this.endbitmap);
        if (this.getChildByName("sroce") != null)
            this.removeChild(this.label);
        this.removeChild(this.btnStart);
        this.channel.stop();
        this.bgmusic = RES.getRes("bgmusic_mp3");
        this.Bulletmusic = RES.getRes("bullet_mp3");
        this.Bullet2music = RES.getRes("bullet2_mp3");
        this.explomusic = RES.getRes("explo_mp3");
        this.getpowermusic = RES.getRes("getpower_mp3");
        this.channel = this.bgmusic.play(0, 0);
        this.channel.volume = 0.5;
        this.bg.start();
        this.myScore = 0;
        this.myFighter = new Airplane(RES.getRes("myplane"), 300, 0);
        this.myFighter.y = this.stageH - this.myFighter.height - 50;
        this.myFighter.x = (this.stageW - this.myFighter.width) / 2;
        this.myFighter.anchorOffsetX = this.myFighter.width / 2;
        this.myFighter.anchorOffsetY = this.myFighter.height / 2;
        this.addChild(this.myFighter);
        this.bhFighter1 = new Airplane(RES.getRes("myplane_add"), 500, 0);
        this.bhFighter2 = new Airplane(RES.getRes("myplane_add"), 500, 0);
        this.bhFighter1.name = "bh1";
        this.bhFighter2.name = "bh2";
        this.BOSS = new Airplane(RES.getRes("BOSS"), 1500, 5);
        this.BOSS.name = "BOSS";
        this.BOSS.x = -1000;
        this.touchEnabled = true;
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.myFighter.fire();
        this.myFighter.blood = 10;
        this.myFighter.addEventListener("createBullet", this.createBulletHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
        this.stonesTimer.addEventListener(egret.TimerEvent.TIMER, this.createStone, this);
        this.bosscomingTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.bossComing, this);
        this.enemyFightersTimer.start();
        this.stonesTimer.start();
        this.bosscomingTimer.start();
    };
    p.touchHandler = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
            var tx = evt.localX;
            var ty = evt.localY;
            tx = Math.max(0, tx);
            ty = Math.max(0, ty);
            tx = Math.min(this.stageW - this.myFighter.width, tx);
            ty = Math.min(this.stageH - this.myFighter.height, ty);
            this.myFighter.x = tx;
            this.myFighter.y = ty;
            if (this.getChildByName("bh1") != null) {
                this.bhFighter1.x = this.myFighter.x - 48;
                this.bhFighter2.x = this.myFighter.x + 48;
                this.bhFighter1.y = this.myFighter.y;
                this.bhFighter2.y = this.myFighter.y;
            }
        }
    };
    //创建护卫机
    p.createbhplane = function () {
        this.bhFighter1.scaleX = 0.7;
        this.bhFighter1.scaleY = 0.7;
        this.bhFighter1.anchorOffsetX = this.bhFighter1.width / 2;
        this.bhFighter1.anchorOffsetY = this.bhFighter1.height / 2;
        this.bhFighter1.x = 0;
        this.bhFighter1.y = this.height / 3;
        this.addChild(this.bhFighter1);
        egret.Tween.get(this.bhFighter1).to({ x: this.myFighter.x - 48, y: this.myFighter.y }, 1500, egret.Ease.circIn);
        this.bhFighter2.scaleX = 0.7;
        this.bhFighter2.scaleY = 0.7;
        this.bhFighter2.anchorOffsetX = this.bhFighter2.width / 2;
        this.bhFighter2.anchorOffsetY = this.bhFighter2.height / 2;
        this.bhFighter2.x = this.width;
        this.bhFighter2.y = this.height / 3;
        this.addChild(this.bhFighter2);
        egret.Tween.get(this.bhFighter2).to({ x: this.myFighter.x + 48, y: this.myFighter.y }, 1500, egret.Ease.circIn);
        this.bhFighter1.fire();
        this.bhFighter2.fire();
        this.bhFighter1.addEventListener("createBullet", this.createBulletHandler, this);
        this.bhFighter2.addEventListener("createBullet", this.createBulletHandler, this);
    };
    //创建子弹
    p.createBulletHandler = function (evt) {
        var bullet;
        //我的子弹
        if (evt.target == this.myFighter) {
            switch (this.myFighter.mybullettype) {
                case 0: {
                    for (var i = 0; i < 2; i++) {
                        bullet = Bullet.produce("mybullet_norm");
                        bullet.anchorOffsetX = bullet.width / 2;
                        bullet.anchorOffsetY = bullet.height / 2;
                        bullet.x = i == 0 ? (this.myFighter.x - 16) : (this.myFighter.x + 16);
                        bullet.y = this.myFighter.y + 30;
                        this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
                        this.myBullets.push(bullet);
                    }
                    this.Bulletmusic.play(0, 1);
                    break;
                }
                case 1: {
                    for (var i = 0; i < 5; i++) {
                        bullet = Bullet.produce("mybullet2");
                        bullet.anchorOffsetX = bullet.width / 2;
                        bullet.anchorOffsetY = bullet.height / 2;
                        bullet.x = this.myFighter.x + (i - 2) * 16;
                        bullet.rotation = (i - 2) * 10;
                        //   bullet.x = i == 0 ? (this.myFighter.x + 25) : (this.myFighter.x + this.myFighter.width - 37);
                        bullet.y = this.myFighter.y;
                        this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
                        this.myBullets.push(bullet);
                    }
                    this.Bulletmusic.play(0, 1);
                    break;
                }
                case 2: {
                    for (var i = 1; i < 14; i++) {
                        bullet = Bullet.produce("bullet-self3-" + i);
                        bullet.anchorOffsetX = bullet.width / 2;
                        bullet.anchorOffsetY = bullet.height / 2;
                        bullet.x = this.myFighter.x;
                        bullet.y = this.myFighter.y - 50 * (i - 1);
                        this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
                        this.myBullets.push(bullet);
                    }
                    break;
                }
            }
        }
        else if (evt.target == this.bhFighter1 || evt.target == this.bhFighter2) {
            var bhFighter = evt.target;
            bullet = Bullet.produce("mybullet_norm");
            bullet.anchorOffsetX = bullet.width / 2;
            bullet.anchorOffsetY = bullet.height / 2;
            bullet.x = bhFighter.x;
            bullet.y = bhFighter.y;
            this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
            this.myBullets.push(bullet);
        }
        else if (evt.target == this.BOSS) {
            var theFighter = evt.target;
            for (var i = 0; i < 7; i++) {
                bullet = Bullet.produce("enemybullet4");
                bullet.anchorOffsetX = bullet.width / 2;
                bullet.anchorOffsetY = bullet.height / 2;
                bullet.x = this.BOSS.x + (i - 3) * 30;
                bullet.rotation = -(i - 3) * 10;
                //   bullet.x = i == 0 ? (this.myFighter.x + 25) : (this.myFighter.x + this.myFighter.width - 37);
                bullet.y = this.BOSS.y;
                this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
                this.enemyBullets.push(bullet);
            }
        }
        else {
            console.log("createEnemybullet");
            console.log(evt.data);
            var theFighter = evt.target;
            switch (evt.data) {
                case 1:
                case 4:
                    bullet = Bullet.produce("enemybullet1");
                    bullet.x = theFighter.x;
                    break;
                case 2:
                case 3:
                    bullet = Bullet.produce("enemybullet2");
                    bullet.x = theFighter.x;
                    break;
            }
            bullet.y = theFighter.y + 10;
            bullet.anchorOffsetX = bullet.width / 2;
            bullet.anchorOffsetY = bullet.height / 2;
            this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
            this.enemyBullets.push(bullet);
        }
    };
    /**创建敌机*/
    p.createEnemyFighter = function (evt) {
        console.log("createEnemyFighter");
        var num = (Math.floor(Math.random() * 4 + 1));
        var texture;
        var planetype;
        switch (num) {
            case 1:
                texture = "enemyplane1";
                planetype = 1;
                break;
            case 2:
                texture = "enemyplane2";
                planetype = 2;
                break;
            case 3:
                texture = "enemyplane3";
                planetype = 3;
                break;
            case 4:
                texture = "enemyplane4";
                planetype = 4;
                break;
        }
        var enemyFighter = Airplane.produce(texture, 800, planetype);
        enemyFighter.x = Math.random() * (this.stageW - enemyFighter.width);
        enemyFighter.y = -enemyFighter.height - Math.random() * 300;
        enemyFighter.anchorOffsetX = enemyFighter.width / 2;
        enemyFighter.anchorOffsetY = enemyFighter.height / 2;
        enemyFighter.addEventListener("createBullet", this.createBulletHandler, this);
        enemyFighter.fire();
        this.addChild(enemyFighter);
        this.enemyFighters.push(enemyFighter);
    };
    //创建陨石
    p.createStone = function (evt) {
        var stone = Stone.produce("store");
        console.log("createstore");
        stone.x = Math.random() * (this.stageW - stone.width);
        stone.y = -stone.height - Math.random() * 300;
        stone.anchorOffsetX = stone.width / 2;
        stone.anchorOffsetY = stone.height / 2;
        this.addChild(stone);
        this.stones.push(stone);
    };
    p.gameViewUpdate = function (evt) {
        //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
        var nowTime = egret.getTimer();
        var fps = 1000 / (nowTime - this._lastTime);
        this._lastTime = nowTime;
        var speedOffset = 60 / fps;
        //我的子弹运动
        var i = 0;
        var bullet;
        var myBulletsCount = this.myBullets.length;
        var delArr = [];
        for (i = 0; i < myBulletsCount; i++) {
            bullet = this.myBullets[i];
            if (this.myFighter.mybullettype == 1) {
                bullet.y -= 10 * speedOffset;
                bullet.x += bullet.rotation / 4;
            }
            else if (this.myFighter.mybullettype == 2) {
                bullet.y -= 30 * speedOffset;
            }
            else {
                bullet.y -= 10 * speedOffset;
            }
            if (bullet.y < -bullet.height)
                delArr.push(bullet);
        }
        for (i = 0; i < delArr.length; i++) {
            bullet = delArr[i];
            this.removeChild(bullet);
            Bullet.reclaim(bullet, bullet.textureName);
            this.myBullets.splice(this.myBullets.indexOf(bullet), 1);
        }
        delArr = [];
        //敌人飞机运动
        var theFighter;
        var enemyFighterCount = this.enemyFighters.length;
        var enemybullet;
        for (i = 0; i < enemyFighterCount; i++) {
            theFighter = this.enemyFighters[i];
            theFighter.y += 4 * speedOffset;
            if (theFighter.y > this.stageH)
                delArr.push(theFighter);
        }
        for (i = 0; i < delArr.length; i++) {
            theFighter = delArr[i];
            this.removeChild(theFighter);
            Airplane.reclaim(theFighter, theFighter.textureName);
            theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
            theFighter.stopFire();
            this.enemyFighters.splice(this.enemyFighters.indexOf(theFighter), 1);
        }
        delArr = [];
        //敌人子弹运动
        var enemyBulletsCount = this.enemyBullets.length;
        for (i = 0; i < enemyBulletsCount; i++) {
            bullet = this.enemyBullets[i];
            if (bullet.textureName == "enemybullet4") {
                bullet.y += 10 * speedOffset;
                bullet.x -= bullet.rotation / 2.5;
            }
            else {
                bullet = this.enemyBullets[i];
                bullet.y += 8 * speedOffset;
            }
            if (bullet.y > this.stageH)
                delArr.push(bullet);
        }
        for (i = 0; i < delArr.length; i++) {
            bullet = delArr[i];
            this.removeChild(bullet);
            Bullet.reclaim(bullet, bullet.textureName);
            this.enemyBullets.splice(this.enemyBullets.indexOf(bullet), 1);
        }
        delArr = [];
        //BOSS运动
        if (this.getChildByName("BOSS") != null) {
            if (this.BOSS.isright % 2 == 0) {
                this.BOSS.x += 1 * speedOffset;
            }
            else {
                this.BOSS.x -= 1 * speedOffset;
            }
            if (this.BOSS.x <= this.BOSS.width / 2 || this.BOSS.x >= this.stageW - this.BOSS.width / 2) {
                this.BOSS.isright++;
            }
        }
        //    陨石运动    
        var thestone;
        var stonesCount = this.stones.length;
        for (i = 0; i < stonesCount; i++) {
            thestone = this.stones[i];
            thestone.y += 2 * speedOffset;
            thestone.rotation += 2 * speedOffset;
            if (thestone.y > this.stageH) {
                delArr.push(thestone);
            }
            for (i = 0; i < delArr.length; i++) {
                thestone = delArr[i];
                this.removeChild(thestone);
                Stone.reclaim(thestone, thestone.textureName);
                this.stones.splice(this.stones.indexOf(thestone), 1);
            }
        }
        delArr = [];
        //  能量运动   
        var thePower;
        var powersCount = this.powers.length;
        var center = this.stageW / 2;
        for (i = 0; i < powersCount; i++) {
            thePower = this.powers[i];
            thePower.y += 2 * speedOffset;
            if (thePower.isright % 2 == 0) {
                thePower.x += 3 * speedOffset;
            }
            else {
                thePower.x -= 3 * speedOffset;
            }
            if (thePower.x <= 0 || thePower.x >= this.stageW) {
                thePower.isright++;
            }
            if (thePower.y > this.stageH) {
                delArr.push(thePower);
            }
            for (i = 0; i < delArr.length; i++) {
                thePower = delArr[i];
                this.removeChild(thePower);
                this.powers.splice(this.powers.indexOf(thePower), 1);
            }
        }
        delArr = [];
        this.gameHitTest();
    };
    p.gameHitTest = function () {
        var i, j;
        var bullet;
        var theFighter;
        var theExplo;
        var theStone;
        var thePower;
        var myBulletsCount = this.myBullets.length;
        var enemyFighterCount = this.enemyFighters.length;
        var enemyBulletsCount = this.enemyBullets.length;
        var stonesCount = this.stones.length;
        var powerCount = this.powers.length;
        //将需消失的子弹和飞机和爆炸和陨石记录
        var delBullets = [];
        var delFighters = [];
        var delStone = [];
        var delPowers = [];
        //我的子弹碰撞
        for (i = 0; i < myBulletsCount; i++) {
            bullet = this.myBullets[i];
            //子弹与敌机的碰撞
            for (j = 0; j < enemyFighterCount; j++) {
                theFighter = this.enemyFighters[j];
                if (GameUtil.hitTest(theFighter, bullet)) {
                    if (this.myFighter.mybullettype == 1) {
                        theFighter.blood -= 1.5;
                    }
                    else if (this.myFighter.mybullettype == 2) {
                        theFighter.blood -= 0.5;
                    }
                    else {
                        theFighter.blood -= 2;
                    }
                    if (delBullets.indexOf(bullet) == -1)
                        delBullets.push(bullet);
                    if (theFighter.blood <= 0 && delFighters.indexOf(theFighter) == -1) {
                        var explo = new Explo();
                        explo.x = theFighter.x;
                        explo.y = theFighter.y;
                        explo.anchorOffsetX = explo.width / 2;
                        explo.anchorOffsetY = explo.height / 2;
                        this.addChild(explo);
                        this.explos.push(explo);
                        this.delExplo.push(explo);
                        console.log("delexplo.push(explo)  delexplo.length=;" + this.delExplo.length);
                        delFighters.push(theFighter);
                        this.explomusic.play(0, 1);
                    }
                }
            }
            //子弹与陨石的碰撞
            for (j = 0; j < stonesCount; j++) {
                theStone = this.stones[j];
                if (GameUtil.hitTest(theStone, bullet)) {
                    if (this.myFighter.mybullettype == 1) {
                        theStone.blood -= 1;
                    }
                    else if (this.myFighter.mybullettype == 2) {
                        theStone.blood -= 0.5;
                    }
                    else {
                        theStone.blood -= 1;
                    }
                    if (delBullets.indexOf(bullet) == -1)
                        delBullets.push(bullet);
                    if (theStone.blood <= 0 && delStone.indexOf(theStone) == -1) {
                        var explo = new Explo();
                        var power = new Power();
                        explo.x = theStone.x;
                        explo.y = theStone.y;
                        explo.anchorOffsetX = explo.width / 2;
                        explo.anchorOffsetY = explo.height / 2;
                        this.addChild(explo);
                        this.explos.push(explo);
                        power.x = theStone.x;
                        power.y = theStone.y + 20;
                        power.anchorOffsetX = power.width / 2;
                        power.anchorOffsetY = power.height / 2;
                        this.addChild(power);
                        this.powers.push(power);
                        this.delExplo.push(explo);
                        delStone.push(theStone);
                        this.explomusic.play(0, 1);
                    }
                }
            }
            //子弹与BOSS碰撞
            if (GameUtil.hitTestP(this.BOSS, bullet)) {
                if (this.myFighter.mybullettype == 1) {
                    this.BOSS.blood -= 1;
                }
                else if (this.myFighter.mybullettype == 2) {
                    this.BOSS.blood -= 0.5;
                }
                else {
                    this.BOSS.blood -= 2;
                }
                this.myScore += 10;
                if (delBullets.indexOf(bullet) == -1)
                    delBullets.push(bullet);
            }
        }
        //敌人的子弹可以减我血
        for (i = 0; i < enemyBulletsCount; i++) {
            bullet = this.enemyBullets[i];
            if (GameUtil.hitTestP(this.myFighter, bullet)) {
                this.myFighter.blood -= 1;
                if (delBullets.indexOf(bullet) == -1)
                    delBullets.push(bullet);
            }
        }
        //敌机的撞击可以消灭我
        for (i = 0; i < enemyFighterCount; i++) {
            theFighter = this.enemyFighters[i];
            if (GameUtil.hitTestP(this.myFighter, theFighter)) {
                this.myFighter.blood -= 10;
            }
        }
        //加能量
        for (i = 0; i < powerCount; i++) {
            thePower = this.powers[i];
            if (GameUtil.hitTest(this.myFighter, thePower)) {
                this.getpowermusic.play(0, 1);
                if (thePower.powertype <= 2)
                    this.myFighter.mybullettype = thePower.powertype;
                else {
                    if (this.getChildByName("bh1") == null)
                        this.createbhplane();
                }
                if (delPowers.indexOf(thePower) == -1)
                    delPowers.push(thePower);
            }
        }
        if (this.myFighter.blood <= 0) {
            this.channel.stop();
            this.diemusic = RES.getRes("die_mp3");
            this.diemusic.play(0, 1);
            this.gameStop();
            this.restart(0);
        }
        else if (this.BOSS.blood <= 0) {
            this.myScore += 100;
            this.gameStop();
            this.restart(1);
        }
        else {
            while (delBullets.length > 0) {
                bullet = delBullets.pop();
                this.removeChild(bullet);
                if (bullet.textureName == "mybullet_norm" || bullet.textureName == "mybullet2" || bullet.textureName.indexOf("self") > 0)
                    this.myBullets.splice(this.myBullets.indexOf(bullet), 1);
                else
                    this.enemyBullets.splice(this.enemyBullets.indexOf(bullet), 1);
                Bullet.reclaim(bullet, bullet.textureName);
            }
            this.myScore += delFighters.length * 10;
            while (delFighters.length > 0) {
                theFighter = delFighters.pop();
                theFighter.stopFire();
                theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
                this.removeChild(theFighter);
                this.enemyFighters.splice(this.enemyFighters.indexOf(theFighter), 1);
                Airplane.reclaim(theFighter, theFighter.textureName);
            }
            while (this.delExplo.length > 5) {
                console.log("delexplo.length=" + this.delExplo.length);
                theExplo = this.delExplo.shift();
                this.removeChild(theExplo);
                this.explos.splice(this.explos.indexOf(theExplo), 1);
            }
            this.myScore += delPowers.length * 20;
            while (delStone.length > 0) {
                theStone = delStone.pop();
                this.removeChild(theStone);
                this.stones.splice(this.stones.indexOf(theStone), 1);
                Stone.reclaim(theStone, theStone.textureName);
            }
            this.myScore += delPowers.length * 30;
            while (delPowers.length > 0) {
                thePower = delPowers.pop();
                this.removeChild(thePower);
                this.powers.splice(this.powers.indexOf(thePower), 1);
            }
        }
    };
    p.bossComing = function () {
        this.waringmusic = RES.getRes("warning_mp3");
        this.waringmusic.play(0, 1);
        this.enemyFightersTimer.removeEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
        this.stonesTimer.removeEventListener(egret.TimerEvent.TIMER, this.createStone, this);
        this.enemyFightersTimer.stop();
        this.stonesTimer.stop();
        this.BOSS.anchorOffsetX = this.BOSS.width / 2;
        this.BOSS.anchorOffsetY = this.BOSS.height / 2;
        this.BOSS.x = this.stageW / 2;
        this.BOSS.y = -this.BOSS.height / 2;
        this.addChild(this.BOSS);
        egret.Tween.get(this.BOSS).to({ y: this.BOSS.height / 2 }, 3000, egret.Ease.circIn);
        this.BOSS.addEventListener("createBullet", this.createBulletHandler, this);
        this.BOSS.fire();
        //this.enemyFighters.push(this.BOSS);
    };
    /**游戏结束*/
    p.gameStop = function () {
        this.bg.pause();
        this.channel.stop();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.myFighter.stopFire();
        this.myFighter.removeEventListener("createBullet", this.createBulletHandler, this);
        this.removeChild(this.myFighter);
        if (this.getChildByName("BOSS") != null) {
            this.BOSS.stopFire();
            this.BOSS.removeEventListener("createBullet", this.createBulletHandler, this);
            this.removeChild(this.BOSS);
        }
        if (this.getChildByName("bh1") != null) {
            this.bhFighter1.stopFire();
            this.bhFighter1.removeEventListener("createBullet", this.createBulletHandler, this);
            this.removeChild(this.bhFighter1);
            this.bhFighter2.stopFire();
            this.bhFighter2.removeEventListener("createBullet", this.createBulletHandler, this);
            this.removeChild(this.bhFighter2);
        }
        this.enemyFightersTimer.removeEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
        this.stonesTimer.removeEventListener(egret.TimerEvent.TIMER, this.createStone, this);
        this.bosscomingTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.bossComing, this);
        this.enemyFightersTimer.stop();
        this.stonesTimer.stop();
        this.bosscomingTimer.reset();
        this.bosscomingTimer.stop();
        //清理子弹
        var i = 0;
        var bullet;
        while (this.myBullets.length > 0) {
            bullet = this.myBullets.pop();
            this.removeChild(bullet);
            Bullet.reclaim(bullet, bullet.textureName);
        }
        while (this.enemyBullets.length > 0) {
            bullet = this.enemyBullets.pop();
            this.removeChild(bullet);
            Bullet.reclaim(bullet, bullet.textureName);
        }
        //清理飞机
        var theFighter;
        while (this.enemyFighters.length > 0) {
            theFighter = this.enemyFighters.pop();
            theFighter.stopFire();
            theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
            this.removeChild(theFighter);
            Airplane.reclaim(theFighter, theFighter.textureName);
        }
        //清理陨石
        var theStone;
        while (this.stones.length > 0) {
            theStone = this.stones.pop();
            this.removeChild(theStone);
            Stone.reclaim(theStone, theStone.textureName);
        }
        //清理爆炸
        var theExplo;
        while (this.explos.length > 0) {
            theExplo = this.explos.pop();
            this.removeChild(theExplo);
        }
        this.delExplo = [];
        //清理能量
        var thePower;
        while (this.powers.length > 0) {
            thePower = this.powers.pop();
            this.removeChild(thePower);
        }
    };
    p.restart = function (iswin) {
        //   var bitmap: egret.Bitmap = new egret.Bitmap();
        //     var btn:Button;
        if (iswin) {
            this.endbitmap.texture = RES.getRes("win");
            var texture = RES.getRes("startbutton_png");
            this.btnStart = new Button(texture, 3);
            this.endbitmap.x = (this.stageW - this.endbitmap.width) / 2; //居中定位
        }
        else {
            this.endbitmap.texture = RES.getRes("fail");
            var texture = RES.getRes("startbutton_png");
            this.endbitmap.scaleX = 2.5;
            this.endbitmap.scaleY = 2.5;
            this.btnStart = new Button(texture, 2);
            this.endbitmap.x = (this.stageW - this.endbitmap.width * 2.5) / 2; //居中定位
        }
        this.endbitmap.y = (this.stageW - this.endbitmap.height) / 2; //居中定位
        this.addChild(this.endbitmap);
        this.label.text = "你的分数：" + this.myScore;
        this.label.x = this.endbitmap.x;
        this.label.y = this.endbitmap.y + 200;
        this.addChild(this.label);
        this.btnStart.x = (this.stageW - this.btnStart.width) / 2; //居中定位
        this.btnStart.y = (this.stageH - this.btnStart.height) / 2 + 200; //居中定位
        this.btnStart.touchEnabled = true; //开启触碰
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this); //点击按钮开始游戏
        this.addChild(this.btnStart);
    };
    return GameContainer;
}(egret.DisplayObjectContainer));
egret.registerClass(GameContainer,'GameContainer');
//# sourceMappingURL=GameContainer.js.map