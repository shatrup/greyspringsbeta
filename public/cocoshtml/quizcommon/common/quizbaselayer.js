
var QuizBaseLayer = cc.Layer.extend({
    bgSprite:null,
    solutionSprites : [],
    pageConitaner: null,
    header: null,
    backButton: null,
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
        
        this.addChild(this.pageConitaner, 1);
        var backButtonSp = new cc.Sprite(res.Back_Button);
        var backButtonSize = backButtonSp.getContentSize();
        this.backButton = new Div(backButtonSize.width, backButtonSize.height);
        this.backButton.addChildInCenter(backButtonSp);
        this.header = new Div(size.width, backButtonSize.height);
        this.header.addChildToLeft(this.backButton);
        this.backButton.setTouchEnable(true);
        this.backButton.setTargetUri("HomePage");
        this.pageConitaner.addChildToTop(this.header);
    }
});