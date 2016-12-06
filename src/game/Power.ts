
class Power extends egret.Sprite {
   
    private timer:egret.Timer = new egret.Timer(1000 / 10);
    private list:egret.Bitmap[] = [];
    private currentframe:number = 0;
    public powertype: number;
    public isright: number=1;
    public constructor() {
        super();
        var powertype=(Math.floor(Math.random()*4+1));
                    console.log("createpower  powertype="+powertype);
        for (var i:number = 1; i <=4; i++) {
            var bitmap:egret.Bitmap = new egret.Bitmap();
            switch(powertype)
                {
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
        
    private onExploTimer(e:egret.TimerEvent) {
        this.list[this.currentframe].visible = false;
        this.currentframe < this.list.length - 1 ? this.currentframe += 1 : this.currentframe = 0;
        this.list[this.currentframe].visible = true;
    }
 
}