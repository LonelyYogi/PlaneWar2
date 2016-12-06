var GameUtil = (function () {
    function GameUtil() {
    }
    var d = __define,c=GameUtil,p=c.prototype;
    //两物品重叠的碰撞判断方式
    GameUtil.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    //点和物品的碰撞判断方式，较为精确及可控
    GameUtil.hitTestP = function (obj1, obj2) {
        var rect2x;
        var rect2y;
        rect2x = obj2.x + obj2.width / 2;
        rect2y = obj2.y + obj2.height - obj2.width / 2;
        if (obj1.hitTestPoint(rect2x, rect2y)) {
            return true;
        }
        else
            return false;
    };
    return GameUtil;
}());
egret.registerClass(GameUtil,'GameUtil');
//# sourceMappingURL=GameUtil.js.map