
var QuizController = cc.Node.extend({
    uri : null,
    quizLayer: null,
    ctor: function (uri) {
        this._super(); 
        this.uri = uri;
    },

    onEnter:function () {
        this._super();
        var url = new Url(this.uri);
        var quizId = url.getParam("type");
        var quizLayer = this.loadQuizLayer(quizId);
        this.addChild(quizLayer);
    },

    loadQuizLayer:function(quizId){
        return QuizFactory.createQuizLayer(quizId);        
    }
});

QuizController.create = function(uri){
    return new QuizController(uri);
}