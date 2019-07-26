
var Div = cc.Node.extend({
    isTouchEnabled: false,
    isTouchMoveEnabled: false,
    fillLeft: 0.0,
    fillRight: 0.0,
    fillTop: 0.0,
    fillBottom: 0.0,
    targetUri: null,
    ctor: function (height, width) {
        //////////////////////////////
        // 1. super init first
        this._super();
        if(height > 0 && width > 0)
        {
            this.setContentSize(height, width);
        }

        this.setAnchorPoint(new cc.Point(0.5, 0.5));
        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();	
                if(!target.isTouchEnabled)
                {
                    return false;
                }

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());	
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
    
                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {		
                    //target.setColor(new cc.Color(0, 0, 0));
                    target.setScale(0.9);
                    return true;
                }
                return false;
            },

            onTouchMoved: function(touch, event)
            {
                var target = event.getCurrentTarget();
                if(target.isTouchMoveEnabled)
                {
                    var delta = touch.getDelta();
                    target.x += delta.x;
                    target.y += delta.y;
                }
            },

            onTouchEnded : function(touch, event)
            {
                var target = event.getCurrentTarget();
                target.setScale(1.0);
                target.navigetToTargetUri();
            }
        });

        cc.eventManager.addListener(touchListener, this);
        return true;
    },
    
    addChildInCenter : function(child){
        child.setAnchorPoint(new cc.Point(0.5, 0.5));
        var anchorPoint = child.getAnchorPoint();
        var selfSize = this.getContentSize();
        var selfPosition = new cc.Point(0, 0);
        var posX = selfPosition.x + selfSize.width / 2;
        var posY = selfPosition.y + selfSize.height / 2;
        child.setPosition(new cc.Point(posX, posY));
        this.addChild(child);
    },

    addChildToLeft : function(child){
        child.setAnchorPoint(new cc.Point(0.5, 0.5));
        var selfSize = this.getContentSize();
        var selfPosition = new cc.Point(0, 0);
        var childSize = child.getContentSize();
        var offsetLeft = this.fillLeft;
        var posX = selfPosition.x + offsetLeft + childSize.width / 2;
        var posY = selfPosition.y + selfSize.height / 2;
        child.setPosition(new cc.Point(posX, posY));
        this.fillLeft += childSize.width;
        this.addChild(child);        
    },

    addChildToRight : function(child){
        child.setAnchorPoint(new cc.Point(0.5, 0.5));
        var selfSize = this.getContentSize();
        var selfPosition = new cc.Point(0, 0);
        var childSize = child.getContentSize();
        var offsetRight = this.fillRight;
        var posX = selfPosition.x - offsetRight + selfSize.width - childSize.width / 2;
        var posY = selfPosition.y + selfSize.height / 2;
        child.setPosition(new cc.Point(posX, posY));
        this.fillRight += childSize.width;
        this.addChild(child);   
    },

    addChildToTop : function(child){
        child.setAnchorPoint(new cc.Point(0.5, 0.5));
        var selfSize = this.getContentSize();
        var selfPosition = new cc.Point(0, 0);
        var childPosition = child.getPosition();
        var childSize = child.getContentSize();
        var offsetY = this.fillTop;
        var posX = selfPosition.x + selfSize.width / 2;
        var posY = selfPosition.y + selfSize.height - childSize.height / 2 - offsetY;
        child.setPosition(new cc.Point(posX, posY));
        this.fillTop += childSize.height;
        this.addChild(child);
    },

    setTouchEnable : function(value)
    {
        this.isTouchEnabled = value;
    },

    setTouchMoveEnabled : function(value)
    {
        if(!this.isTouchEnabled)
        {
            this.setTouchEnable(true);
        }

        this.isTouchMoveEnabled = value;
    },

    setTargetUri : function(uri){
        this.targetUri = uri;
    },

    navigetToTargetUri : function(){
        if(this.targetUri == "HomePage")
        {
            cc.director.runScene(new HelloWorldScene());
        }
        else if(this.targetUri.includes("ActivityLayer"))
        {
            cc.director.runScene(new ActivityBaseScene(this.targetUri));
        }
        else if(this.targetUri == "Exit")
        {
            var rootNode = cc.director.getRunningScene();
            var children = rootNode.getChildren();
            var layer = children[0];
            if (typeof layer.dust === "function") { 
                // safe to use the function
                layer.dust();
            }
            
            cc.director.runScene(new HelloWorldScene());
        }
        else if(this.targetUri == "NavigateBack")
        {
            window.history.back();
        }
        else
        {
            cc.director.runScene(new QuizBaseScene(this.targetUri));
        }
    },

    setColor : function(color){
        var size = this.getContentSize();
        var bgLayer = new cc.LayerColor();
        bgLayer.setContentSize(size.width, size.height);
        bgLayer.setColor(color);
        this.addChild(bgLayer);
    }
});