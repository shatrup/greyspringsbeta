
var MatchTheShadow = AttributeBasedQuizLayer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();     
        var size = cc.winSize;
        this.bgSprite = new cc.Sprite(res.BackGround_Match_The_Shadow);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });

        this.addChild(this.bgSprite, 0);           
        var gameLayout = new Div(1200, 600);
        //gameLayout.setColor(new cc.Color(0, 255, 255));
        this.pageConitaner.addChildInCenter(gameLayout);


        /*var containerTop = new Div(1200, 300);
        containerTop.setColor(new cc.Color(255, 255, 0));
        gameLayout.addChildToTop(containerTop);

        var containerBottom = new Div(1200, 300);
        containerBottom.setColor(new cc.Color(255, 0, 255));
        gameLayout.addChildToTop(containerBottom);*/
        var origin = new cc.Point(83, 84);
        var locations = getLocationInGrid(origin, 600, 1200, 2, 3);
        var spritePath = "res/Resources/ipad/common/numbers/number_set14/number_set14_x_large/"
        var rn = getRandomInt(1, 6);
        var i = rn;
        var j = 0;
        var n = i + 3;
        for(; i < n; i++)
        {
            var spUri = spritePath + "number_set14_x_large_" + i + ".png"
            var sp = new AttributeQuizBaseSprite(spUri);
            var spSchema = new AttributeSpriteSchema();
            sp.setScale(0.6);
            sp.hasDraggableBehavior = true;
            sp.attr({
                x: locations[j].x,
                y: locations[j].y,
            });
            this.addChild(sp, 101);
            j++;
        }

        i = rn;
        for(; i < n; i++)
        {
            var spUri = spritePath + "number_set14_x_large_" + i + ".png"
            var sp = new GameSprite(spUri);
            sp.setColor(new cc.Color(0, 0, 0));
            sp.setScale(0.6);
            sp.attr({
                x: locations[j].x,
                y: locations[j].y,
            });
            this.addChild(sp, 100);
            j++;
        }        
    }
});