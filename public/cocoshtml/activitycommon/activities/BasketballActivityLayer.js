
var BasketballActivityLayer = cc.LayerColor.extend({
    bgSprite:null,
    pageConitaner: null,
    header: null,
    backButton: null,
    layout: null,
    asset_basketball: "res/Resources/ipad/common/chrome/quiz/basketball_ball.png",
    asset_background: "res/Resources/ipad/common/backgrounds/background_fullbleed/background_basketball_2.png",
    collisionCheckKey: "basket_collision_check",

    domUtils:  DomUtils,
    ballsLeft: 0,
    score: 0,
    isShooted: false,
    basketSpeed: 0,
    nBasketCols: 0,
    highScore: 0,
    
    Basketball : (function () {

        Basketball = function(){};

        Basketball.prototype.currentSetIndex = 0;
        Basketball.prototype.maxSetsAvailable = 9;
        Basketball.prototype.setsPlayedIndex = 0;
        Basketball.prototype.score = 0;
        
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

        this.domUtils = new DomUtils();
        this.ballsLeft = 7;
        this.score = 0;
        this.isShooted = false;
        this.basketSpeed = 70.0;
        this.nBasketCols = 6;
        var currentSetIndex = Basketball.prototype.currentSetIndex;
        if (currentSetIndex === 2)
        {
            this.basketSpeed *= 1.25;
            this.nBasketCols--;
        }
        else if (currentSetIndex === 3)
        {
            this.basketSpeed *= 1.5;
            this.nBasketCols -= 2;
        }
        
        this.addChild(this.pageConitaner, 10000);
        var backButtonSp = new cc.Sprite(basketballRes.Back_Button);
        var backButtonSize = backButtonSp.getContentSize();
        this.backButton = new Div(backButtonSize.width, backButtonSize.height);
        this.backButton.addChildInCenter(backButtonSp);
        this.header = new Div(size.width, backButtonSize.height);
        this.header.addChildToLeft(this.backButton);
        this.backButton.setTouchEnable(true);
        this.backButton.setTargetUri("NavigateBack");
        this.pageConitaner.addChildToTop(this.header);

        this.loadView();
        
        var touchListener = new cc._EventListenerTouchAllAtOnce();
        touchListener.onTouchesBegan = this.onTouchesBegan;
        touchListener.onTouchesMoved = this.onTouchesMoved;
        touchListener.onTouchesEnded = this.onTouchesEnded;
		cc.eventManager.addListener(touchListener, this);
    },

    // acting as a destructor
    dust: function()
    {
        this.stopAllActions();
        this.unscheduleAllCallbacks();
        cc.audioEngine.stopMusic(true);
        cc.audioEngine.stopAllEffects();
    },

    loadView: function()
    {
        this.visOrigin = getVisibleOrigin();
        this.winSize = getVisibleSize();

        this.loadBackGround(this.asset_background);
        this.addBaskets();
        this.loadBasketBalls();
        this.addChromeElements();
    },

    scheduleBasketCheck: function()
    {
        if (cc.director.getScheduler().isScheduled(this.collisionCheckKey, this))
        {
            return;
        }

        cc.director.getScheduler().schedule(this.updateTick, this,  0.05, cc.REPEAT_FOREVER, 0, false, this.collisionCheckKey);

    },

    unscheduleBasketCheck: function()
    {
        cc.director.getScheduler().unschedule(this.collisionCheckKey, this);
        // if (cc.director.getScheduler().isScheduled(this.collisionCheckKey, this))
        // {
        //     cc.director.getScheduler().unschedule(this.collisionCheckKey, this);
        // }

    },
    
    updateTick: function()
    {
        this.detectBasketHit();
    },

    ballOverlapUsingWorldCoordinates: function(node1, node2)
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
    
    detectBasketHit: function()
    {
        var targets = this.domUtils.querySelectorAll(this, "basket");
        for (var target in targets)
        {
            var overlapPercentage = this.ballOverlapUsingWorldCoordinates(this.ball, targets[target]);
            if (overlapPercentage < 100)
            {
                continue;
            }
            else
            {
                this.isHit = true;
                playAudioEffect(this, basketballRes.effect_coin_sound);
                this.particalExplosion(this.ball);
                var pointsLabelParent = this.domUtils.querySelector(this, "pointsLabel");
                var pointsLabel = this.domUtils.querySelector(pointsLabelParent, "pLabel");
                this.updatePointsLabel(pointsLabel, ++this.score);
            }
        }
    },

    particalExplosion(node)
    {
        var imagePath = this.asset_basketball;
        var m_emitter = new cc.ParticleFlower();
        m_emitter.setDuration(0.3);
        m_emitter.setEmissionRate(50.0);
        m_emitter.setSpeed(200.0);
        m_emitter.setScale(0.5);
        m_emitter.setLife(1.0);
        var tex = cc.textureCache.addImage(imagePath);
        m_emitter.setTexture(tex);
        m_emitter.setPosition(node.getPosition());
        this.addChild(m_emitter, Number.MAX_VALUE);
    },
    
    loadBackGround: function(bgUri)
    {
        var winSize = getVisibleSize();
        var Bg = new cc.Sprite(bgUri);
        Bg.attr({
            x: winSize.width / 2,
            y: winSize.height / 2
        });
        this.addChild(Bg, 0);
    },
    
    addBaskets: function()
    {
        var contentAreaRectPosX = this.visOrigin.x - this.winSize.width * 0.25;
        var contentAreaRectPosY = this.visOrigin.y + this.winSize.height * 0.5;
        var contentAreaRectWidth = this.winSize.width * 1.5;
        var contentAreaRectHeight = this.winSize.height * 0.3;
        var nRows = 1;
        var nCols = this.nBasketCols;
        var contentAreaRect = new cc.Rect(contentAreaRectPosX, contentAreaRectPosY, contentAreaRectWidth, contentAreaRectHeight);
        this.basketLayout = getLocationsFromRectInGrid(contentAreaRect, LayoutGrid.LayoutGrid_Symmetric_MxN, nRows, nCols);
        //showLayoutDebugGrid(layout, ColorPicker.EMARALD);

        for (var ii = 0; ii < (nRows*nCols) - 1; ii++)
        {
            var obj = new cc.Sprite(basketballRes.asset_basket);
            obj.setPosition(this.basketLayout.locations[ii + 1]);
            this.domUtils.setSelector(obj, "basket");
            obj.setTag(501);
            //this.domUtils.wrapNodeWithRectangle(obj, "ffff00", 255);
            this.addChild(obj, 500);
            this.moveBasket(obj);
        }
    },

    loadBasketBalls: function()
    {
        this.ball = this.drawBall();
        //this.domUtils.wrapNodeWithRectangle(this.ball, "ffff00", 255);
        this.addChild(this.ball, 504);
        --this.ballsLeft;
        var gapMargin = this.winSize.width*0.044;

        for (var ii = 0; ii < this.ballsLeft; ii++)
        {
            var ball = new cc.Sprite(this.asset_basketball);
            ball.setScale(0.4);
            ball.setPosition(cc.p(this.visOrigin.x + this.winSize.width*0.4 + gapMargin * ii, 12));
            var arrowSetSelector = format("ballSet_{0}", (ii + 1).toString());
            this.domUtils.setSelector(ball, arrowSetSelector);
            this.addChild(ball, 504);
        }
    },

    drawBall: function()
    {
        var scoreboardUri = basketballRes.asset_basketball_scoreboard;
        var scoreboardSpriteWidth = getSpriteDimensions(scoreboardUri).width;
        var maxX = this.winSize.width - scoreboardSpriteWidth*0.8;
        var randomXPosFactor = getRandomNumberWithinRange(20, 70);
        var posX = this.visOrigin.x + (this.winSize.width*randomXPosFactor / 100);
        this.ballX = posX > maxX ? maxX : posX;
        this.ballY = this.visOrigin.y + (this.winSize.height*0.15);
        var ball = new cc.Sprite(this.asset_basketball);
        ball.setPosition(cc.p(this.ballX, this.ballY));
        return ball;
    },

    moveBasket: function(basket)
    {
        var noOfLocations = this.basketLayout.locations.length;
        var initialPos = basket.getPosition();
        var leftPos = this.basketLayout.locations[0];
        var rightPos = this.basketLayout.locations[noOfLocations - 1];
        var time1 = cc.pDistance(rightPos, initialPos) / this.basketSpeed;
        var time2 = 0;
        var time3 = cc.pDistance(leftPos, rightPos) / this.basketSpeed;

        var moveRight1 = cc.MoveTo.create(time1, rightPos);
        var moveLeft = cc.MoveTo.create(time2, leftPos);
        var moveRight2 = cc.MoveTo.create(time3, rightPos);

        var moveAction = cc.Sequence.create(moveLeft, moveRight2);
        var repeatMove = cc.Repeat.create(moveAction, 10000);
        var moveRepeatAction = cc.Sequence.create(moveRight1, repeatMove);
        //moveRepeatAction.setTag(1024);

        basket.runAction(moveRepeatAction);
    },
    
    addChromeElements: function()
    {
        var scoreboard = new cc.Sprite(basketballRes.asset_basketball_scoreboard);
        var scoreboardSize = scoreboard.getContentSize();
        var scoreboardPos = cc.p(this.visOrigin.x + this.winSize.width - (scoreboardSize.width / 2), this.visOrigin.y + (scoreboardSize.height / 2));
        scoreboard.setPosition(scoreboardPos);
        this.domUtils.setSelector(scoreboard, "basketballScoreboard");
        this.addChild(scoreboard, 5000);

        var labelFontSize = 70;
        var backgroundOpacity = 0;
        var labelBGColor = "ffffff";
        var fontColor = "c6ff00";
        var labelText = this.score.toString();
        var labelSprite = this.createScoreLabel(labelText, labelBGColor, backgroundOpacity, labelFontSize, fontColor);
        var labelSpriteSize = labelSprite.getContentSize();
        var labelPos = cc.p((scoreboardSize.width - labelSpriteSize.width) / 2, scoreboardSize.height*0.58);
        labelSprite.setPosition(labelPos);
        this.domUtils.setSelector(labelSprite, "pointsLabel");
        scoreboard.addChild(labelSprite);
    },
    
    createScoreLabel: function(text, color, bgOpacity, fontSize, fontColor)
    {
        var mixedSprite = new cc.Sprite();
        if (fontColor == "")
        {
            fontColor = "000000";
        }

        // label opacity, label color, label text color
        var scoreLabel = cc.LabelTTF.create(text, "Arial", fontSize.toString(), cc.TEXT_ALIGNMENT_CENTER);
        scoreLabel.setColor(parseHexColor(fontColor));
        this.domUtils.setSelector(scoreLabel, "pLabel");
        var pLabelSize = scoreLabel.getContentSize();
        var labelWidthMargin  = 20;
        var pLabelAreaRect = new cc.Rect(0, 0, pLabelSize.width + labelWidthMargin, pLabelSize.height);
        mixedSprite.setTextureRect(pLabelAreaRect);
		var size = mixedSprite.getContentSize();
        scoreLabel.setPosition(cc.p(size.width / 2, size.height * 0.7));
        mixedSprite.addChild(scoreLabel);
        mixedSprite.setOpacity(bgOpacity);
        mixedSprite.setAnchorPoint(cc.p(0.0, 0.0));
        return mixedSprite;
    },
    
    updatePointsLabel: function(pointsLabel, points)
    {
        pointsLabel.setString(points.toString());
    },

    navigateCallback: function()
    {
        Basketball.prototype.currentSetIndex = Basketball.prototype.maxSetsAvailable - 1;
        Basketball.prototype.setsPlayedIndex = 0;
        //cc.director.runScene(new HelloWorldScene());

        
		cc.director.runScene(new ActivityBaseScene("appprotocol://page?id=BasketballActivityLayer"));
    },

    replayActivity: function()
    {
        this.dust();
        
        Basketball.prototype.currentSetIndex = (Basketball.prototype.currentSetIndex + 1) % 4;
        if (Basketball.prototype.currentSetIndex === 0)
        {
            this.navigateCallback();
        }
        else
        {
            //Navigator.reloadCurrentPage();
			cc.director.runScene(new ActivityBaseScene("appprotocol://page?id=BasketballActivityLayer"));
        }
    },

    shootBall: function()
    {
        if (this.isShooted)
        {
            return;
        }

        this.ball.stopAllActions();
        this.unscheduleBasketCheck();
        var initialPos = cc.p(this.ball.getPosition().x, this.ballY);
        var finalPos = cc.p(initialPos.x, this.visOrigin.y + this.winSize.height*0.9);
        var speed = 550;
        var finalScale = 0.75;
        var initialScale = 1.0;
        var time = cc.pDistance(initialPos, finalPos) / speed;
        var moveUp = new cc.MoveTo(time, finalPos);
        var scaleDown = new cc.ScaleTo(time, finalScale);
        var moveDown =  new cc.MoveTo(time, initialPos);
        var scaleUp = new cc.ScaleTo(time, initialScale);

        var moveUpSpawn = new cc.Spawn(moveUp, scaleDown);
        var moveDownSpawn = new cc.Spawn(moveDown, scaleUp);

        var schedulerCallback = cc.CallFunc.create(this.scheduleBasketCheck, this);
        var unschedulerCallback = cc.CallFunc.create(this.unscheduleBasketCheck, this);
        var decreaseBallZindex = cc.CallFunc.create(this.changeBallZindex, this, this.ball, 400);
        var increaseBallZindex = cc.CallFunc.create(this.changeBallZindex, this, this.ball, 504);
        var processBallShootCallback = cc.CallFunc.create(this.processBallShoot, this);
        var action = new cc.Sequence(moveUpSpawn, schedulerCallback, decreaseBallZindex, moveDownSpawn, unschedulerCallback, increaseBallZindex, processBallShootCallback);

        this.isShooted = true;
        this.playAudioEffect(basketballRes.effect_object_moving);
        this.ball.runAction(action);
    },

    changeBallZindex: function(ref, ball, zindex)
    {
        ball.setLocalZOrder(zindex);
    },

    processBallShoot: function()
    {
        if (!this.isHit)
        {
            if (this.ballsLeft > 0)
            {
                this.isShooted = false;
                var ballSetSelector = format("ballSet_{0}", (this.ballsLeft--).toString());
                var dummyBall = this.domUtils.querySelector(this, ballSetSelector);
                dummyBall.setOpacity(0);
            }
            else
            {
                var effectCallback = cc.CallFunc.create(this.showCompleteEffect, this);
                var backCallback = cc.CallFunc.create(this.replayActivity, this);

                var audioEffect1Callback = cc.callFunc(playAudioEffect, this, basketballRes.alphabet_b);
                var audioEffect2Callback = cc.callFunc(playAudioEffect, this, basketballRes.alphabet_phonic_b);
                var audioEffect3Callback = cc.callFunc(playAudioEffect, this, basketballRes.word_ball);

                var audioDelayInterval = 0.7;
                var audioDelay = cc.DelayTime.create(audioDelayInterval);
                var delayInterval = 2.0;
                var delay = cc.DelayTime.create(delayInterval);
                var action = new cc.Sequence(effectCallback, audioDelay, audioEffect1Callback, audioDelay, audioEffect2Callback, audioDelay, audioEffect3Callback, delay, backCallback);
                this.runAction(action);
            }

            return;
        }

        this.isHit = false;
        this.isShooted = false;
    },

    onTouchesBegan: function(touches, event)
    {
        //cc.log("BasketballActivityLayer::onTouchesBegan");
    },

    onTouchesEnded: function(touches, event)
    {
        //log("BasketballActivityLayer::onTouchesEnded");
        var target = event.getCurrentTarget();
        target.shootBall();
    },

    onTouchesMoved: function(touches, event)
    {
        //log("BasketballActivityLayer::onTouchesMoved");
    },

    reloadBall: function()
    {
        if (this.ballsLeft > 0)
        {
            this.ball.stopAllActions();
            var randomXPosFactor = getRandomNumberWithinRange(20, 80);
            var ballXPos = this.visOrigin.x + (this.winSize.width*randomXPosFactor / 100);
            this.ball.setPosition(cc.p(ballXPos, this.ballY));

            var ballSetSelector = format("ballSet_{0}", (this.ballsLeft--).toString());
            var dummyBall = this.domUtils.querySelector(this, ballSetSelector);
            dummyBall.setOpacity(0);
        }
        else
        {
            var effectCallback = cc.CallFunc.create(this.showCompleteEffect, this);
            var backCallback = cc.CallFunc.create(this.replayActivity, this);

            var delayInterval = 4.0;
            var delay = cc.DelayTime.create(delayInterval);
            var action = new cc.Sequence(effectCallback, delay, backCallback, NULL);
            this.runAction(action);
        }			
    },

    showCompleteEffect: function()
    {
        var snowEmitter = cc.ParticleSnow.create();
        snowEmitter.retain();
        this.addChild(snowEmitter, Number.MAX_VALUE);

        snowEmitter.setLife(4);
        snowEmitter.setLifeVar(1);
        snowEmitter.setTotalParticles(200);
        snowEmitter.setOpacity(255);
        snowEmitter.setLocalZOrder(1);
        snowEmitter.setStartSize(40.0);

        // gravity
        snowEmitter.setGravity(cc.p(0, -50));

        // speed of particles
        snowEmitter.setSpeed(200);
        snowEmitter.setSpeedVar(20);
        snowEmitter.setEmissionRate(snowEmitter.getTotalParticles() / snowEmitter.getLife());

        var emitterImgUri = this.asset_basketball;
        var tex = cc.textureCache.addImage(emitterImgUri);
        snowEmitter.setTexture(tex);

        var s = this.winSize;
        if (snowEmitter != null)
        {
            snowEmitter.setPosition(cc.p(s.width / 2, s.height));
        }
    },

    playAudioEffect: function(audioEffectId)
    {
        playAudioEffect(this, audioEffectId);
    }
});
