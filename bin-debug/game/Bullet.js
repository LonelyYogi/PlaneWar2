var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(texture) {
        _super.call(this, texture);
    }
    var d = __define,c=Bullet,p=c.prototype;
    /**生产*/
    Bullet.produce = function (textureName) {
        if (Bullet.cacheDict[textureName] == null)
            Bullet.cacheDict[textureName] = [];
        var dict = Bullet.cacheDict[textureName];
        var bullet;
        if (dict.length > 0) {
            bullet = dict.pop();
        }
        else {
            bullet = new Bullet(RES.getRes(textureName));
        }
        bullet.textureName = textureName;
        return bullet;
    };
    /**回收*/
    Bullet.reclaim = function (bullet, textureName) {
        if (Bullet.cacheDict[textureName] == null)
            Bullet.cacheDict[textureName] = [];
        var dict = Bullet.cacheDict[textureName];
        if (dict.indexOf(bullet) == -1)
            dict.push(bullet);
    };
    Bullet.cacheDict = {};
    return Bullet;
}(egret.Bitmap));
egret.registerClass(Bullet,'Bullet');
//# sourceMappingURL=Bullet.js.map