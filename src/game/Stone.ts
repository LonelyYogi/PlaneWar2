
class Stone extends egret.Bitmap
{
    private static cacheDict:Object = {};
    /**生产*/
    public static produce(textureName:string):Stone
    {
        if(Stone.cacheDict[textureName]==null)
            Stone.cacheDict[textureName] = [];
            var dict:Stone[] = Stone.cacheDict[textureName];
            var stone:Stone;
            if(dict.length>0) {
                stone = dict.pop();
            } else {
                stone = new Stone(RES.getRes(textureName));
            }
        stone.blood = 10;
            stone.textureName = textureName;
            return stone;
        }
        /**回收*/
    public static reclaim(bullet:Stone,textureName:string):void
    {
        if(Stone.cacheDict[textureName]==null)
            Stone.cacheDict[textureName] = [];
            var dict:Stone[] = Stone.cacheDict[textureName];
            if(dict.indexOf(bullet)==-1)
                dict.push(bullet);
    }
    public blood:number = 20;        
         public textureName:string;
                
                public constructor(texture:egret.Texture) {
                    super(texture);
                }
            }