
var GameSprite = cc.Sprite.extend({
    isMoveAble : false,
    onEnter: function () {
        //////////////////////////////
        // 1. super init first
        this._super();       
        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();	                
                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());	
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
    
                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {		
                    //target.setColor(new cc.Color(0, 0, 0));
                    var scale = target.getScale() - 0.1;
                    target.setScale(scale);
                    return true;
                }
                return false;
            },

            onTouchMoved: function(touch, event)
            {
                var target = event.getCurrentTarget();
                if(target.isMoveAble)
                {
                    var delta = touch.getDelta();
                    target.x += delta.x;
                    target.y += delta.y;
                }
            },

            onTouchEnded : function(touch, event)
            {
                var target = event.getCurrentTarget();
                var scale = target.getScale() + 0.1;
                target.setScale(scale);
            }
        });

        cc.eventManager.addListener(touchListener, this);        
    },

    setMoveAble : function(value)
    {
        this.isMoveAble = value;
    }
});