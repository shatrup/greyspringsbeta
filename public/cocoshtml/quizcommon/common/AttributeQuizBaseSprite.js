
var AttributeQuizBaseSprite = cc.Sprite.extend({
    name : "",
    fileUri : "",
    audioSrc : "",    
    touchActive : false,
    hasTouchableBehavior: true,
    hasDraggableBehavior :  false,
    hasShakableBehavior : false,
    hasFloatingBehavior : false,
    bumpZIndexOnTouch: true,
    IsDoneProcessingOnce: false,
    IsInActiveAttributeProcessing : false,
    dragOffset : null,
    isGrabbed: false,
    zOrder : 1,
    onEnter: function () {
        //////////////////////////////
        // 1. super init first
        this._super();       
        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();	   
                target.touchActive = true;             
                //Get the position of the current point relative to the button
                if(target.hasTouchableBehavior)
                {
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());	
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
        
                    //Check the click area
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        target.isGrabbed = true;		
                        if(target.bumpZIndexOnTouch)
                        {
                            target.zOrder = target.getLocalZOrder();
                            target.setLocalZOrder(Number.MAX_SAFE_INTEGER - 100);
                        }
                      
                        return true;
                    }
                }
                return false;
            },

            onTouchMoved: function(touch, event)
            {
                var target = event.getCurrentTarget();
                if(target.hasTouchableBehavior && target.touchActive)
                {
                    if(target.hasDraggableBehavior && target.isGrabbed) 
                    {
                        var delta = touch.getDelta();
                        target.x += delta.x;
                        target.y += delta.y;
                    }                    
                }
            },

            onTouchEnded : function(touch, event)
            {
                var target = event.getCurrentTarget();
                if(target.bumpZIndexOnTouch) 
                {
                    target.setLocalZOrder(this.zOrder);
                }

                target.touchActive = false;
                target.isGrabbed = false;
            }
        });

        cc.eventManager.addListener(touchListener, this);        
    },
   
    skakeIt : function()
    {
        if(this.hasShakableBehavior)
        {
            if(this.getRotation() < 0)
            {
                this.setRotation(10);
            }
            else
            {
                this.setRotation(-10);
            }
        }
    },


    floatIt : function()
    {
        
    }
});