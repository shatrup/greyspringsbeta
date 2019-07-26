var CarPartsAssemblingActivityLayer = cc.LayerColor.extend({

    PegMatchedEvent: "PegMatchedEvent",
    domUtils:  DomUtils,
    
    vehicleSetQuizData: VehiclePartsSchema,
    pegPositions: [],
    remainingPegsSelector: [],
    pegsToProcess: 0,
    timeouts: [],
    
    CarActivity : (function () {

        CarActivity = function(){};

        CarActivity.prototype.currentSetIndex = 0;
        
    })(),
    
    
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();        
        var size = cc.winSize;
        this.pageConitaner = new Div(size.width, size.height);
        this.pageConitaner.attr({
            x: size.width / 2,
            y: size.height / 2
        });   

        // make sure that the arrays are empty in the begenning
        this.pegPositions.splice(0,this.pegPositions.length);
        this.timeouts.splice(0,this.timeouts.length);
        this.remainingPegsSelector.splice(0,this.remainingPegsSelector.length);

        this.domUtils = new DomUtils();
        this.setStartIndex = 8;
        this.totalSets = 18;
        this.pegsToProcess = 0;
        
        this.addChild(this.pageConitaner, 10000);
        var backButtonSp = new cc.Sprite(carActivityAssets.Back_Button);
        var backButtonSize = backButtonSp.getContentSize();
        this.backButton = new Div(backButtonSize.width, backButtonSize.height);
        this.backButton.addChildInCenter(backButtonSp);
        this.header = new Div(size.width, backButtonSize.height);
        this.header.addChildToLeft(this.backButton);
        this.backButton.setTouchEnable(true);
        this.backButton.setTargetUri("NavigateBack");
        this.pageConitaner.addChildToTop(this.header);
        
        if (CarActivity.prototype.setsPlayedIndex === 0)
        {
            CarActivity.prototype.score = 0;
        }

        var vehicleJsonFormat = "res/Resources/json/activities/vehicle_parts/vehicle_parts_set{0}.json";
        var setNumber = ((CarActivity.prototype.currentSetIndex++) + this.setStartIndex) % this.totalSets + 1;
        var vehicleJson = format(vehicleJsonFormat, setNumber.toString());
        var jsonData = jsonToString(vehicleJson);

        this.vehicleSetQuizData = this.loadVehicleSetJson(jsonData);
        this.loadView();
        CarActivity.prototype.currentSetIndex = CarActivity.prototype.currentSetIndex % this.totalSets;

        /*var dispatcher = cc.director.getEventDispatcher();
        var listener = new cc.EventListener(this.PegMatchedEvent, this.pegMatched);
        dispatcher.addEventListenerWithSceneGraphPriority(listener, this);*/

        function callPegMatched() {
            this.pegMatched();
        }
        var funcUser = callPegMatched.bind(this);

        var _listener1 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: this.PegMatchedEvent,
            callback: function(event){
                  funcUser(this);
            }
        });    
        cc.eventManager.addListener(_listener1, 1);

        //var bgSoundUri = "res/Resources/audio_mid/homepage_music.mp3";
        //cc.audioEngine.playMusic(bgSoundUri);
    },

    // acting as a destructor
    dust: function()
    {
        cc.audioEngine.stopAllEffects();
        this.stopAllActions();
        this.unscheduleAllCallbacks();
        cc.eventManager.removeCustomListeners(this.PegMatchedEvent);
        var nTimeouts = this.timeouts.length;
        for (ii in this.timeouts)
        {
            window.clearTimeout(this.timeouts[ii]);
        }
    },

    loadView: function()
    {
        this.visOrigin = getVisibleOrigin();
        this.winSize = getVisibleSize();
        this.loadBackGround();
        //this.pegPositions.push(cc.p(102.6*2.4, 165.0*2.4));
        //this.pegPositions.push(cc.p(466.0*2.4, 165.0*2.4));
        this.pegPositions.push(cc.p(187.6*2.4, 232.5*2.4));
        this.pegPositions.push(cc.p(381.0*2.4, 232.5*2.4));
        this.loadVehicleParts();
    },

    loadBackGround: function()
    {
        var Bg = new cc.Sprite("res/Resources/ipad/" + this.vehicleSetQuizData.background);
        Bg.attr({
            x: this.winSize.width / 2,
            y: this.winSize.height / 2
        });
        this.addChild(Bg, 0);

        var cFlag = new cc.Sprite(carActivityAssets.chrome_c_panel);
        var cFlagSize = cFlag.getContentSize();
        cFlag.setPosition(cc.p(this.visOrigin.x + cFlagSize.width/2, this.visOrigin.y + cFlagSize.height/2 + this.winSize.height*0.2));
        this.domUtils.setSelector(cFlag, "cFlag");
        this.addChild(cFlag, 2);
        
        if (this.vehicleSetQuizData.flag != "")
        {
            var flag = new cc.Sprite("res/Resources/ipad/" + this.vehicleSetQuizData.flag);
            flag.setPosition(cc.p(this.vehicleSetQuizData.flagX, this.vehicleSetQuizData.flagY - 140.0));
            flag.setOpacity(0);
            this.domUtils.setSelector(flag, "flag");
            this.addChild(flag, 1);
        }

    },

    navigateCallback: function()
    {
        //cc.director.runScene(new HelloWorldScene());
        cc.director.runScene(new ActivityBaseScene("appprotocol://page?id=CarPartsAssemblingActivityLayer"));
    },

    replayActivity: function()
    {
        this.dust();
        if (CarActivity.prototype.currentSetIndex === 0)
        {
            this.navigateCallback();
        }
        else
        {
            //Navigator.reloadCurrentPage();
            cc.director.runScene(new ActivityBaseScene("appprotocol://page?id=CarPartsAssemblingActivityLayer"));
        }
    },

    showCompleteEffect: function()
    {
        var flag = this.domUtils.querySelector(this, "flag");
        var delayTime = 0.0;
        if (flag != null)
        {
            delayTime = 1.0;
            flag.setOpacity(255);
            var moveBy = cc.MoveBy.create(delayTime, cc.p(0.0, 140.0));
            flag.runAction(moveBy);
        }

        var delay = cc.DelayTime.create(delayTime);
        var duration = delayTime + 3.0;
        var vehicleParent = this.domUtils.querySelector(this, "vehicleParent");
        var moveOut = cc.MoveBy.create(duration, cc.p(-this.winSize.width, 0.0));
        var audioEffect = this.vehicleSetQuizData.finishSoundEffect;
        audioEffect = audioEffect === "" ? carResAudio.effect_car : carResAudio[audioEffect];

        var audioCallback = cc.callFunc(playAudioEffect, this, audioEffect);
        var audioAction = cc.sequence(delay, audioCallback, moveOut);
        //this.runAction(audioAction);
        //var moveAction = cc.sequence(delay, moveOut);

        //playAudioEffect(audioEffect);
        vehicleParent.runAction(audioAction);
    },

    loadVehicleSetJson: function(vehicleJson)
    {
        var vehicleParts = new VehiclePartsSchema();
        var json = JSON.parse(vehicleJson);
        vehicleParts.name = json.name || "";
        vehicleParts.type = json.type || "";
        vehicleParts.suffix = json.suffix || "";
        vehicleParts.background = json.background || "";
        vehicleParts.finishSoundEffect = json.finishSoundEffect || "";
        vehicleParts.flag = json.flag || "";
        vehicleParts.flagX = json.flagX*2.4 || 0.0;
        vehicleParts.flagY = json.flagY*2.4 || 0.0;

        var allParts = json.partsList || null;
        for (i in allParts)
        {
            var partsList = allParts[i];
            var partsListData = new PartsList();
            partsListData.objectId = partsList.objectId || "";
            partsListData.imageUri = partsList.imageUri || "";
            partsListData.name = partsList.name || "";
            partsListData.type = partsList.type || "";
            partsListData.w = partsList.w || 0.0;
            partsListData.h = partsList.h || 0.0;
            partsListData.x = partsList.x*2.4 || 0.0;
            partsListData.y = partsList.y*2.4 || 0.0;
            partsListData.zorder = partsList.zorder || 1;
            partsListData.isShadow = partsList.isShadow || false;
            partsListData.flipX = partsList.flipX || false;
            partsListData.flipY = partsList.flipY || false;
            partsListData.rotateBy = partsList.rotateBy || 0.0;
            partsListData.frameInterval = partsList.frameInterval || 0.2;
            partsListData.rotationAngle = partsList.rotationAngle || 0.0;
            partsListData.bounceX = partsList.bounceX || 0.0;
            partsListData.bounceY = partsList.bounceY || 0.0;
            partsListData.frames = partsList.frames;
            partsListData.animationType = partsList.animationType;

            vehicleParts.partsList.push(partsListData);
            delete partsList;
        }

        return vehicleParts;
    },

    loadVehicleParts: function()
    {
        var vehicleParent = new cc.Node();
        var references = [];
        vehicleParent.setContentSize(this.winSize);
        this.domUtils.setSelector(vehicleParent, "vehicleParent");
        this.addChild(vehicleParent, 10);
        shuffleArray(this.pegPositions, this.pegPositions.length);
        var noOfPositions = this.pegPositions.length;
        var ii = 0;
        var partsList = this.vehicleSetQuizData.partsList;
        for (var itr in partsList)
        {
            var part = partsList[itr];
            var partSprite = new cc.Sprite();
            partSprite.setPosition(cc.p(part.x, part.y));
            this.domUtils.setSelector(partSprite, part.objectId);
            var imageSrc = "res/Resources/ipad/" + part.imageUri;
            if (part.isShadow)
            {
                //var texture = this.getShadowTexture(imageSrc);
                //partSprite.initWithTexture(texture);
                partSprite.setTexture(imageSrc);
                partSprite.setColor(cc.color.BLACK);
                partSprite.setOpacity(70);
                //texture.release();
                //partSprite.setName("res/Resources/ipad/" + part.imageUri);
                var partUserData = {};
                partUserData["name"] = imageSrc;
                partSprite.setUserData(partUserData);
                //this.domUtils.setData(partSprite, "referenceData", "res/Resources/ipad/" + part.imageUri);
                references.push(partSprite);
            }
            else
            {
                partSprite.setTexture(imageSrc);
            }

            partSprite.setRotation(part.rotateBy);
            partSprite.setFlippedX(part.flipX);
            partSprite.setFlippedY(part.flipY);
            vehicleParent.addChild(partSprite, part.zorder);
            partSprite.zIndex = part.zorder;
            partSprite.setLocalZOrder(part.zorder);
        }

        for (var itr in partsList)
        {
            var part = partsList[itr];
            if (part.isShadow)
            {
                var peg = new DraggableSprite();
                peg.hasDraggableBehavior = true;
                peg.imgSrc = "res/Resources/ipad/" + part.imageUri;
                peg.setTexture("res/Resources/ipad/" + part.imageUri);
                var pegSelector = format("peg_{0}", part.objectId);
                peg.partsList = part;
                this.domUtils.setSelector(peg, pegSelector);
                if (ii < noOfPositions)
                {
                    peg.setPosition(this.pegPositions[ii++]);
                    this.pegsToProcess++;
                }
                else
                {
                    peg.setPosition(cc.p(4000.0, 4000.0));
                    this.remainingPegsSelector.push(pegSelector);
                }

                peg.setRotation(part.rotateBy);
                peg.setFlippedX(part.flipX);
                peg.setFlippedY(part.flipY);
                peg.references = references;
                peg.setLocalZOrder(part.zorder);
                peg.zIndex = part.zorder;
                vehicleParent.addChild(peg, part.zorder);
            }
        }
    },

    getShadowTexture: function(imgUri)
    {
        var shadow = new cc.Sprite(imgUri);
        shadow.setColor("000000");
        shadow.setOpacity(0.3);
        var texture = shadow.getTexture();
        return texture;
    },

    pegMatched: function()
    {
        this.pegsToProcess--;
        if (this.pegsToProcess === 0)
        {
            function callShowMorePegs() {
                this.showMorePegs();
            }
            var funcUser = callShowMorePegs.bind(this);

            funcUser();
        }
    },

    showMorePegs: function()
    {
        var remainingPegs = this.remainingPegsSelector.length;
        if (remainingPegs > 0)
        {
            var maxPegsToShow = this.pegPositions.length;
            var pegsToShow = remainingPegs <= maxPegsToShow ? remainingPegs : maxPegsToShow;
            shuffleArray(this.pegPositions, this.pegPositions.length);
            while (pegsToShow > 0)
            {
                var pegSelector = this.remainingPegsSelector.pop();
                var peg = this.domUtils.querySelector(this, pegSelector);
                peg.setPosition(this.pegPositions[--pegsToShow]);
                this.pegsToProcess++;
            }
        }
        else
        {
            //var effectCallback = cc.CallFunc.create(this.showCompleteEffect.bind(this), this);
            //var backCallback = cc.CallFunc.create(this.replayActivity.bind(this), this);
            var delayInterval1 = 2.5;
            var delayInterval2 = 5.5;
            var flag = this.domUtils.querySelector(this, "flag");
            if (flag != null)
            {
                delayInterval1 = 1.5;
                delayInterval2 = 6.5;
            }

            /*var delay1 = cc.DelayTime.create(delayInterval1);
            var delay2 = cc.DelayTime.create(delayInterval2);
            var action = cc.Sequence.create(delay1, effectCallback, delay2, backCallback);
            this.runAction(action);*/

            function callShowCompleteEffect() {
                this.showCompleteEffect();
            }
            var bindShowCompleteEffect = callShowCompleteEffect.bind(this);

            function callReplayActivity() {
                this.replayActivity();
            }
            var bindReplayActivity = callReplayActivity.bind(this);

            //work around for callbacks as cocos callFunc doesn't seem to work as intended
            this.timeouts.push(window.setTimeout(bindShowCompleteEffect, delayInterval1*1000));
            this.timeouts.push(window.setTimeout(bindReplayActivity, delayInterval2*1000));
        }
    }
});

var DraggableSprite = cc.Sprite.extend({

    image: null,
    hasTouchableBehavior: false,
    hasDraggableBehavior: false,
    isGrabbed: false,
    dragOffset: null,
    touchActive: false,
    imgSrc: "",
    partsList: PartsList,
    references: [],
    domUtils: DomUtils,

    ctor: function() {
        this._super();
        this.touchActive = false;
        this.hasTouchableBehavior = true;
        this.hasDraggableBehavior = false;
        this.isGrabbed = false;
        this.image = null;
        this.domUtils = new DomUtils();

        var touchListener = new cc._EventListenerTouchAllAtOnce();
        touchListener.onTouchesBegan = this.onTouchesBegan;
        touchListener.onTouchesMoved = this.onTouchesMoved;
        touchListener.onTouchesEnded = this.onTouchesEnded;
        cc.eventManager.addListener(touchListener, this);        
    },
    

    detectOverlapping: function(node)
    {
        var peg = node;
        var references = peg.references;
        var pegImg = peg.imgSrc;
        for(var itr in references)
        {
            var hole = references[itr];
            var partUserData = hole.getUserData();
            var holeName = partUserData["name"];
            if (pegImg === holeName)
            {
                var overlapPercentage = this.spriteOverlapUsingWorldCoordinates(hole, node);
                if (overlapPercentage > 50)
                {
                    
                    //log("shadow matched");
                    if (peg.partsList.type === "tyre")
                    {
                        playAudioEffect(this, carResAudio.effect_tyre_fitting);
                    }
                    else
                    {
                        playAudioEffect(this, carResAudio.puzzle_piece_drop);
                    }
                    
                    peg.hasTouchableBehavior = false;
                    peg.hasDraggableBehavior = false;
                    peg.setPosition(hole.getPosition());
                    var holeUserData = {};
                    holeUserData["name"] = "";
                    hole.setUserData(holeUserData);
                    hole.setOpacity(0.0);
                    this.animateDraggableSprite(peg);
                    cc.eventManager.dispatchCustomEvent("PegMatchedEvent");
                }
            }
        }
        
    },

    animateDraggableSprite: function(draggableSprite)
    {
        var partData = draggableSprite.partsList;
        var animations = partData.animationType;
        for (var itr in animations)
        {
            var animation = animations[itr];

            if (animation === "frameAnimation")
            {
                var frameSet = partData.frames;
                var frameCount = frameSet.length;
                if (frameCount > 0)
                {
                    //this.stopAllRunningActions();
                    var frameAnimation = cc.Animation.create();
                    for (var ii = 0; ii < frameCount; ii++)
                    {
                        var imgFrameSrc = frameSet[ii];
                        frameAnimation.addSpriteFrameWithFile("res/Resources/ipad/" + imgFrameSrc);
                    }

                    frameAnimation.setDelayPerUnit(partData.frameInterval);
                    frameAnimation.setLoops(Math.pow(2, 30));
                    var frameAction = cc.Animate.create(frameAnimation);
                    draggableSprite.runAction(frameAction);
                }
            }

            if (animation === "rotate")
            {
                var duration = 0.1;
                var angle = partData.rotationAngle;
                var rotate = cc.RotateBy.create(duration, angle);
                draggableSprite.runAction(cc.RepeatForever.create(rotate));
            }

            if (animation === "blink")
            {
                var duration = 0.6;
                var fadeOut = cc.FadeOut.create(duration);
                var fadeIn = cc.FadeIn.create(duration);
                var action = cc.Sequence.create(fadeOut, fadeIn);
                draggableSprite.runAction(cc.RepeatForever.create(action));
            }

            if (animation === "bouncing")
            {
                var duration = 0.5;
                var deltaPosUp = cc.p(partData.bounceX, partData.bounceY);
                var deltaPosDown = cc.p(-partData.bounceX, -partData.bounceY);
                var moveUp = cc.MoveBy.create(duration, deltaPosUp);
                var moveDown = cc.MoveBy.create(duration, deltaPosDown);
                var action = cc.Sequence.create(moveUp, moveDown);
                draggableSprite.runAction(cc.RepeatForever.create(action));
            }
        }
    },
    
    isTouchInsideNode: function(touch, event)
    {
        var locationInNode = this.convertToNodeSpace(touch.getLocation());
        var s = this.getContentSize();
        var rect = new cc.Rect(0, 0, s.width, s.height);
        if (!cc.rectContainsPoint(this.getBoundingBox(), locationInNode))
        {
            return false;
        }

        if (this.image == null)
        {
            this.image = new Image();
            this.image.initWithImageFile(this.imgSrc);
        }

        if (!this.image.hasAlpha())
        {
            return true;
        }

        // this implies we are supposed to distinguish transparent touch/non-transparent touch
        var rawData = image.getData();
        // convert to touch locations to real x,y inside image
        // see if we need bounding box
        var contentSize = this.getContentSize();
        var imgW = image.getWidth();
        var imgH = image.getHeight();
        var scaleF = imgW / contentSize.width;
        var imgX = locationInNode.x * scaleF;
        var imgY = imgH - locationInNode.y * scaleF;
        var nBytesPerPixel = 4;//image.hasAlpha() ? 4 : 3;
        var pixelOffset = nBytesPerPixel * (imgY*imgW + imgX);
        var rgbaPixel = (rawData + pixelOffset);
        var alpha = rgbaPixel[3];
        var transparencyThreshold = 50;
        if (alpha < transparencyThreshold)
        {
            return false;
        }

        return true;
    },

    spriteOverlapUsingWorldCoordinates: function(node1, node2)
    {
        var node1Anchor = node1.getAnchorPoint();
        var node2Anchor = node2.getAnchorPoint();
        node1.setAnchorPoint(cc.p(0, 0));
        node2.setAnchorPoint(cc.p(0, 0));
        var node1Pos = node1.getParent().convertToWorldSpace(cc.p(node1.getBoundingBox().x, node1.getBoundingBox().y));
        var node2Pos = node2.getParent().convertToWorldSpace(cc.p(node2.getBoundingBox().x, node2.getBoundingBox().y));
        var node1BoundingBox = node1.getBoundingBox();
        var node2BoundingBox = node2.getBoundingBox();
        var node1Rec = new cc.Rect(node1Pos.x, node1Pos.y, node1BoundingBox.width, node1BoundingBox.height);
        var node2Rec = new cc.Rect(node2Pos.x, node2Pos.y, node2BoundingBox.width, node2BoundingBox.height);
        var result = this.domUtils.rectSrcOverlapPercentage(node1Rec, node2Rec);
        node1.setAnchorPoint(node1Anchor);
        node2.setAnchorPoint(node2Anchor);
        return result;
    },
    
    onTouchesBegan: function(touches, event)
    {
        var target = event.getCurrentTarget();
        var isInside = target.domUtils.isTouchInsideNode(target, touches[0], event);
        if (!isInside)
        {
            return;
        }

        target.touchActive = true;
        target.isGrabbed = true;
        target.setLocalZOrder(Math.pow(2, 30) - 100);

        var touchPosition = target.domUtils.getLocationFromTouches(touches);
        var spritePosition = target.getPosition();
        target.dragOffset = cc.p(touchPosition.x - spritePosition.x, touchPosition.y - spritePosition.y);
    },

    onTouchesMoved: function(touches, event)
    {
        var target = event.getCurrentTarget();
        if (target.hasTouchableBehavior && target.touchActive)
        {
            var touchPosition = target.domUtils.getLocationFromTouches(touches);
            var isInside = target.domUtils.isTouchInsideNode(target, touches[0], event);
            if (target.hasDraggableBehavior && target.isGrabbed)
            {
                touchPosition.x -= (target.dragOffset).x;
                touchPosition.y -= (target.dragOffset).y;
                target.setPosition(touchPosition);
                target.detectOverlapping(target);
            }
        }
    },
    
    onTouchesEnded: function(touches, event)
    {
        var target = event.getCurrentTarget();
        if (target.zIndex > 0 && target.getLocalZOrder() != target.zIndex)
        {
            target.setLocalZOrder(target.zIndex);
        }

        target.touchActive = false;
        target.isGrabbed = false;
    },

    onTouchesCancelled: function(touches, event)
    {
        var target = event.getCurrentTarget();
        if (target.zIndex > 0 && target.getLocalZOrder() != target.zIndex)
        {
            target.setLocalZOrder(target.zIndex);
        }
    }
});