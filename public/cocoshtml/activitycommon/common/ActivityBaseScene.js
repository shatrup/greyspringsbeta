var ActivityBaseScene = cc.Scene.extend({
    uri: null,
    ctor:function (uri) {
        //////////////////////////////
        // 1. super init first
        this._super();        
        this.uri = uri;
        var url = new Url(this.uri);
        var activityId = url.getParam("type");
        var activityLayer = eval("new " + activityId + "()");
        this.addChild(activityLayer);
    },

    create:function(uri)
    {
        return new ActivityBaseScene(uri);
    }
});