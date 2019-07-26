var QuizBaseScene = cc.Scene.extend({
    uri: null,
    ctor:function (uri) {
        //////////////////////////////
        // 1. super init first
        this._super();        
        this.uri = uri;
        var gameArea = QuizController.create(uri);
        this.addChild(gameArea);
    },

    create:function(uri)
    {
        return new QuizBaseScene(uri);
    }
});