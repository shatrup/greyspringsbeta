
var FillTheColor = AttributeBasedQuizLayer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();     
        var size = cc.winSize;
        this.bgSprite = new cc.Sprite(res.BackGround_Fill_The_Color);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });

        this.addChild(this.bgSprite, 0);         
    },

    navigateToHome : function()
    {

    }
});