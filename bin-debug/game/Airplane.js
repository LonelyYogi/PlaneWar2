var Airplane = (function (_super) {
    __extends(Airplane, _super);
    function Airplane(texture, fireDelay, planetype) {
        _super.call(this);
        /**飞机生命值*/
        this.blood = 15;
        this.mybullettype = 0;
        this.isright = 1;
        this.fireDelay = fireDelay;
        this.planetype = planetype;
        if (planetype == 5) {
            this.blood = 300;
        }
        this.bmp = new egret.Bitmap(texture);
        this.addChild(this.bmp);
        this.fireTimer = new egret.Timer(fireDelay);
        this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
    }
    var d = __define,c=Airplane,p=c.prototype;
    /**生产*/
    Airplane.produce = function (textureName, fireDelay, planetype) {
        console.log(textureName);
        switch (textureName) {
            case 'enemyplane1':
                if (Airplane.cacheplane1[textureName] == null) {
                    Airplane.cacheplane1[textureName] = [];
                }
                var dict = Airplane.cacheplane1[textureName];
                break;
            case 'enemyplane2':
                if (Airplane.cacheplane2[textureName] == null) {
                    Airplane.cacheplane2[textureName] = [];
                }
                var dict = Airplane.cacheplane2[textureName];
                break;
            case 'enemyplane3':
                if (Airplane.cacheplane3[textureName] == null) {
                    Airplane.cacheplane3[textureName] = [];
                }
                var dict = Airplane.cacheplane3[textureName];
                break;
            case 'enemyplane4':
                if (Airplane.cacheplane4[textureName] == null) {
                    Airplane.cacheplane4[textureName] = [];
                }
                var dict = Airplane.cacheplane4[textureName];
                break;
        }
        var theFighter;
        if (dict.length > 0) {
            theFighter = dict.pop();
        }
        else {
            theFighter = new Airplane(RES.getRes(textureName), fireDelay, planetype);
        }
        theFighter.blood = 15;
        if (planetype == 5) {
            theFighter.blood = 50;
        }
        return theFighter;
    };
    /**回收*/
    Airplane.reclaim = function (theFighter, textureName) {
        switch (textureName) {
            case 'enemyplane1':
                var dict = Airplane.cacheplane1[textureName];
                if (Airplane.cacheplane1[textureName] == null) {
                    Airplane.cacheplane1[textureName] = [];
                    var dict = Airplane.cacheplane1[textureName];
                    if (-1 == dict.indexOf(theFighter))
                        dict.push(theFighter);
                }
                else {
                    Airplane.cacheplane1[textureName].push(theFighter);
                }
                break;
            case 'enemyplane2':
                var dict = Airplane.cacheplane2[textureName];
                if (Airplane.cacheplane2[textureName] == null) {
                    Airplane.cacheplane2[textureName] = [];
                    var dict = Airplane.cacheplane2[textureName];
                    if (-1 == dict.indexOf(theFighter))
                        dict.push(theFighter);
                }
                else {
                    Airplane.cacheplane2[textureName].push(theFighter);
                }
                break;
            case 'enemyplane3':
                var dict = Airplane.cacheplane3[textureName];
                if (Airplane.cacheplane3[textureName] == null) {
                    Airplane.cacheplane3[textureName] = [];
                    var dict = Airplane.cacheplane3[textureName];
                    if (-1 == dict.indexOf(theFighter))
                        dict.push(theFighter);
                }
                else {
                    Airplane.cacheplane3[textureName].push(theFighter);
                }
                break;
            case 'enemyplane4':
                var dict = Airplane.cacheplane4[textureName];
                if (Airplane.cacheplane4[textureName] == null) {
                    Airplane.cacheplane4[textureName] = [];
                    var dict = Airplane.cacheplane4[textureName];
                    if (-1 == dict.indexOf(theFighter))
                        dict.push(theFighter);
                }
                else {
                    Airplane.cacheplane4[textureName].push(theFighter);
                }
                break;
        }
    };
    /**开火*/
    p.fire = function () {
        this.fireTimer.start();
    };
    /**停火*/
    p.stopFire = function () {
        this.fireTimer.stop();
    };
    /**创建子弹*/
    p.createBullet = function (evt) {
        this.dispatchEventWith("createBullet", false, this.planetype);
    };
    Airplane.cacheplane1 = {};
    Airplane.cacheplane2 = {};
    Airplane.cacheplane3 = {};
    Airplane.cacheplane4 = {};
    return Airplane;
}(egret.DisplayObjectContainer));
egret.registerClass(Airplane,'Airplane');
//# sourceMappingURL=Airplane.js.map