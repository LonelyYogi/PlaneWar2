
class Explo extends egret.Sprite {
    private timer:egret.Timer = new egret.Timer(1000 / 24,24);
    private list:egret.Bitmap[] = [];
    private currentframe:number = 0;
    
    public constructor() {
        super();
        for (var i:number = 1; i <=26; i++) {
            var bitmap:egret.Bitmap = new egret.Bitmap();
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
    
    private onExploTimer(e:egret.TimerEvent) {
        this.list[this.currentframe].visible = false;
        this.currentframe < this.list.length - 1 ? this.currentframe += 1 : this.currentframe = 26;
        this.list[this.currentframe].visible = true;
    }
    private onExploTimerEnd(e:egret.TimerEvent) {
        for(var i: number = 0;i <= 26;i++) {
            this.list[i].visible = false;
        }
    }
}