
function QuizFactory()
{

}

QuizFactory.createQuizLayer = function(quizId)
{
    var quizLayer = eval("new " + quizId + "()");
    return quizLayer;
}
