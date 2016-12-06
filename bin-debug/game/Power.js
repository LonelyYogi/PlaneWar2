var Power = (function (_super) {
    __extends(Power, _super);
    function Power() {
        _super.call(this);
        this.timer = new egret.Timer(1000 / 10);
        this.list = [];
        this.currentframe = 0;
        this.isright = 1;
        var powertype = (Math.floor(Math.random() * 4 + 1));
        console.log("createpower  powertype=" + powertype);
        for (var i = 1; i <= 4; i++) {
            var bitmap = new egret.Bitmap();
            switch (powertype) {
                case 1:
                    bitmap.texture = RES.getRes("power-bullet1-" + i.toString());
                    break;
                case 2:
                    bitmap.texture = RES.getRes("power-mis" + i.toString());
                    break;
                case 3:
                    bitmap.texture = RES.getRes("power-b" + i.toString());
                    break;
                case 4:
                    bitmap.texture = RES.getRes("bulletplane" + i.toString());
                    break;
            }
            this.powertype = powertype;
            this.list.push(bitmap);
            this.addChild(bitmap);
            bitmap.visible = false;
        }
        this.list[0].visible = true;
        this.currentframe = 0;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onExploTimer, this);
        this.timer.start();
    }
    var d = __define,c=Power,p=c.prototype;
    p.onExploTimer = function (e) {
        this.list[this.currentframe].visible = false;
        this.currentframe < this.list.length - 1 ? this.currentframe += 1 : this.currentframe = 0;
        this.list[this.currentframe].visible = true;
    };
    return Power;
}(egret.Sprite));
egret.registerClass(Power,'Power');
//# sourceMappingURL=Power.js.map