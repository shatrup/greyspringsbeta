

var HelloWorldLayer = cc.Layer.extend({
    bgSprite:null,
    pageContainer: null,
    tilesContainer: null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        this.bgSprite = new cc.Sprite(res.BackGround_HomePage);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });

        this.addChild(this.bgSprite, 0);
        this.pageContainer = new Div(size.width, size.height);
        this.pageContainer.attr({
            x: size.width / 2,
            y: size.height / 2
        });

        this.addChild(this.pageContainer, 1);

        this.tilesContainer = new Div(size.width*0.75, size.height*0.75);
        //this.tilesContainer.setColor(new cc.Color(0, 255, 0));
        this.pageContainer.addChildInCenter(this.tilesContainer);
        this.addTiles(5);
    },

    addTiles: function(nTiles)
    {
        var nRows = 2;
        var nCols = Math.ceil(nTiles/nRows);
        var tilesContainerSize = this.tilesContainer.getContentSize();
        var rectWidth = tilesContainerSize.width;
        var rectHeight = tilesContainerSize.height;
        var rectPosX = 0;
        var rectPosY = 0;
        var rect = new cc.Rect(rectPosX, rectPosY, rectWidth, rectHeight);
        var livesLayout = getLocationsFromRectInGrid(rect, LayoutGrid.LayoutGrid_Symmetric_MxN, nRows, nCols);

        var i = 0;
        for(; i < nTiles; i++)
        {
            if(i == 0)
            {
                var bg = new cc.Sprite(res.Tile_Archery_Activity);
                var tileSize = bg.getContentSize();
                var tile = new Div(tileSize.width, tileSize.height);
                tile.addChildInCenter(bg);
                tile.setTouchEnable(true);
                tile.setPosition(livesLayout.locations[3]);
                this.tilesContainer.addChild(tile);
                tile.setTargetUri("appprotocol://page?id=ArcheryActivityLayer");
            }
            else if(i == 1)
            {
                var bg = new cc.Sprite(res.Tile_Basketball_Activity);
                var tileSize = bg.getContentSize();
                var tile = new Div(tileSize.width, tileSize.height);
                tile.addChildInCenter(bg);
                tile.setTouchEnable(true);
                tile.setPosition(livesLayout.locations[4]);
                this.tilesContainer.addChild(tile);
                tile.setTargetUri("appprotocol://page?id=BasketballActivityLayer");
            }
            else if(i == 2)
            {
                var bg = new cc.Sprite(res.Tile_Car_Assembly_Activity);
                var tileSize = bg.getContentSize();
                var tile = new Div(tileSize.width, tileSize.height);
                tile.addChildInCenter(bg);
                tile.setTouchEnable(true);
                tile.setPosition(livesLayout.locations[5]);
                this.tilesContainer.addChild(tile);
                tile.setTargetUri("appprotocol://page?id=CarPartsAssemblingActivityLayer");
            }
            else if(i == 3)
            {
                var bg = new cc.Sprite(res.Tile_HurdleJump_Activity);
                var tileSize = bg.getContentSize();
                var tile = new Div(tileSize.width, tileSize.height);
                tile.addChildInCenter(bg);
                tile.setTouchEnable(true);
                tile.setPosition(livesLayout.locations[0]);
                this.tilesContainer.addChild(tile);
                tile.setTargetUri("appprotocol://page?id=HurdleJumpActivityLayer");
            }
            else if(i == 4)
            {
                var bg = new cc.Sprite(res.Tile_RushLanes_Activity);
                var tileSize = bg.getContentSize();
                var tile = new Div(tileSize.width, tileSize.height);
                tile.addChildInCenter(bg);
                tile.setTouchEnable(true);
                tile.setPosition(livesLayout.locations[1]);
                this.tilesContainer.addChild(tile);
                tile.setTargetUri("appprotocol://page?id=RushLanesActivityLayer");
            }
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

