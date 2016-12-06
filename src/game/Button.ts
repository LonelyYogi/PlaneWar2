/**
 *
 * @author 
 *
 */
class Button extends egret.DisplayObjectContainer{
    private bmp:egret.Bitmap;
    private label:egret.TextField ;
    public constructor(texture:egret.Texture,labelvalue:number) {
        super();
       // this.fireDelay = fireDelay;
        this.bmp = new egret.Bitmap(texture);
        this.bmp.width *=0.5;
        this.bmp.height *=0.5;
        this.addChild(this.bmp);
        this.label = new egret.TextField ();
        if(labelvalue==1)
        {
            this.label.text = "开始游戏";   
        }
        else
        if(labelvalue==2)
        {
            this.label.text = "重新开始";   
        }
        else{
            this.label.text = "再来一局";   
        }
        
        this.addChild(this.label);
        this.label.size=20;
        this.label.width =this.bmp.width;
        this.label.height =this.bmp.height;
        this.label.textAlign = egret.HorizontalAlign.CENTER;
        this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
        
    }
  
}
