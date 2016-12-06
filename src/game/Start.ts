/**
 *
 * @author 
 *
 */
class Start extends egret.DisplayObjectContainer{
    private bitmap: egret.Bitmap;
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage(event: egret.Event){
	}
}
