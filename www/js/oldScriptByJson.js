
function getValue(numOfQ){
    var currentData = data["question" + numOfQ];
    return currentData.value;
}

function getQuestion(numOfQ){
    var currentData = data["question" + numOfQ];
    return currentData.question;
}
function getNumOfAnswers(numOfQ){
    var currentData = data["question" + numOfQ];
    return currentData.numOfAnswers;
}
function getAnswer(numOfQ, numOfAns){
    var currentData = data["question" + numOfQ];
    return currentData["ans"+numOfAns];
}

function getRightAnswer(numOfQ){
    var currentData = data["question" + numOfQ];
    return currentData.rightAns;
}

function getPercentsAnswer(numOfQ, numOfAns){
    var currentData = data["question" + numOfQ];
    return currentData["percentAns"+numOfAns];
}
