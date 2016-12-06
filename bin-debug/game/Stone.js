var Stone = (function (_super) {
    __extends(Stone, _super);
    function Stone(texture) {
        _super.call(this, texture);
        this.blood = 20;
    }
    var d = __define,c=Stone,p=c.prototype;
    /**生产*/
    Stone.produce = function (textureName) {
        if (Stone.cacheDict[textureName] == null)
            Stone.cacheDict[textureName] = [];
        var dict = Stone.cacheDict[textureName];
        var stone;
        if (dict.length > 0) {
            stone = dict.pop();
        }
        else {
            stone = new Stone(RES.getRes(textureName));
        }
        stone.blood = 10;
        stone.textureName = textureName;
        return stone;
    };
    /**回收*/
    Stone.reclaim = function (bullet, textureName) {
        if (Stone.cacheDict[textureName] == null)
            Stone.cacheDict[textureName] = [];
        var dict = Stone.cacheDict[textureName];
        if (dict.indexOf(bullet) == -1)
            dict.push(bullet);
    };
    Stone.cacheDict = {};
    return Stone;
}(egret.Bitmap));
egret.registerClass(Stone,'Stone');
//# sourceMappingURL=Stone.js.map