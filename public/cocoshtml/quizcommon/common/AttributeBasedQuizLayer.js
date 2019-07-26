var AttributeBasedQuizLayer = QuizBaseLayer.extend({
    isQuizProcessingComplete: false,
    byPassQuizProcessingComplete: false,
    PeerUri : "",
    PegHoleKey : "",
    SequenceHoleKey : "",
    SequenceHoleOverlapKey : "",
    VmPegHoleKey : "",
    DarkHoleKey : "",
    PegHoleOverlapKey : "",
    totalObjectsSet : [],
    solutionObjectsSet : [],
    pendingSolutionObjectSet : [],
    referenceObjectSet : [],
    attemptedSolutionObjectSet : [], 
    positionsAfterSuccessfulMatch : []
});