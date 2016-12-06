var Explo = (function (_super) {
    __extends(Explo, _super);
    function Explo() {
        _super.call(this);
        this.timer = new egret.Timer(1000 / 24, 24);
        this.list = [];
        this.currentframe = 0;
        for (var i = 1; i <= 26; i++) {
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes("explo_m" + i.toString());
            this.list.push(bitmap);
            this.addChild(bitmap);
            bitmap.visible = false;
        }
        this.list[0].visible = true;
        this.currentframe = 0;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onExploTimer, this);
        this.timer.addEventListener(egret.TimerEvent.COMPLETE, this.onExploTimerEnd, this);
        this.timer.start();
    }
    var d = __define,c=Explo,p=c.prototype;
    p.onExploTimer = function (e) {
        this.list[this.currentframe].visible = false;
        this.currentframe < this.list.length - 1 ? this.currentframe += 1 : this.currentframe = 26;
        this.list[this.currentframe].visible = true;
    };
    p.onExploTimerEnd = function (e) {
        for (var i = 0; i <= 26; i++) {
            this.list[i].visible = false;
        }
    };
    return Explo;
}(egret.Sprite));
egret.registerClass(Explo,'Explo');
//# sourceMappingURL=Explo.js.map