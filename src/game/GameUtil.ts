 class GameUtil
    {
        //两物品重叠的碰撞判断方式
        public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
        {
            var rect1: egret.Rectangle = obj1.getBounds();
            var rect2: egret.Rectangle = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }
        //点和物品的碰撞判断方式，较为精确及可控
        public static hitTestP(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
        {
            var rect2x: number;
            var rect2y: number;
            rect2x = obj2.x + obj2.width/2;
            rect2y = obj2.y + obj2.height-obj2.width/2;
            if(obj1.hitTestPoint(rect2x,rect2y))
            {
                return true;
            }
            else
                return false;
            
        }
    }



