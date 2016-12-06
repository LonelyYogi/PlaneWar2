/**
 *
 * @author 
 *
 */
class GameApp extends egret.DisplayObjectContainer{
	public constructor() {

        super();
 
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
    private loadingView:LoadingUI;
    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
    }
    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.addEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadErr, this );
        RES.loadGroup("gameres");
    }
    /** preload资源组加载完成*/
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        console.log ("onResourceLoadComplete");
        if(event.groupName=="gameres"){
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            //游戏的主类开始实例化
     
            var gameContainer:GameContainer = new GameContainer();
            this.addChild(gameContainer);

        }
    }
    /**preload资源组加载进度*/
    private onResourceProgress(event:RES.ResourceEvent):void {
        console.log ("onResourceProgress");
        if(event.groupName=="gameres"){
            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }
    private onResourceLoadErr( event:RES.ResourceEvent ):void {
        console.log ("onResourceLoadErr");
    }
    
    
    
}
