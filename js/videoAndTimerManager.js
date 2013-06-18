var video;
var time = 10;
var total = 0;
$(document).ready(function() {
    init();
});

function init(){
   video  = document.getElementById("video");

   $("body").bind("showAnswers", function(e, id) {
      showAnswers(id)
   });

   $("body").bind("showQuestion", function(e, id) {
      showQuestion(id)
   });

    $("body").bind("showPrecents", function(e, id) {
      showPrecents(id)
   });

   $("body").bind("hideAnswer", function(e, id) {
      hideAnswer(id)
   });

   $("body").bind("timerEnd", function(e, id) {
       timerEnd(id);
   });
}

function showAnswers(id){
     console.log("showAnswers " + id);
     //show skype banner
     $("#Q" + id + " .banner").show();
     $("#Q" + id + " .question").hide();

     //init the value, time, total by Q1
     initHeaderQuestionValue(id);

     //show answers
      $("#Q" + id + " .answers").show();
}

function showQuestion(id){
     console.log("showQuestion " + id);
     
     //show Question
     $("#Q" + id + " .question").show();
     //start timer
     startTimer(id);
}

function showPrecents(id){
     console.log("showPrecents " + id);
     $("#waitingScreen").hide();
     //hide answers, show answers with perctenge

     //show the coorect answer

     //set total value
}

function hideAnswer(id){
     console.log("hideAnswer " + id);

     //hide the answers
     $("#Q" + id + " .answers").hide();
     $("#Q" + id + " .question").hide();
}

function startTimer(id){
    time = 10;
    var timeInterval = setInterval(function() {
        if(time > 0) {
            var timeDisplay = timer();
            console.log(timeDisplay);
            $("#Q" + id + " .time .val").text(timeDisplay);
        }
        else {
            window.clearInterval(timeInterval);
            //
            $("body").trigger("timerEnd", [1]);
        }

    }, 1000);
}


function timer(){
    if(time> 0){
        time--; 
    }
  
    if(time == 10){
        
        return "00:10";
    }
    else{
        return "00:0" + time;  
    }
   
}

function timerEnd(){
    
    //show the waiting screen
    console.log("show waiting screen");
    $("#waitingScreen").show();
}

function triggerVideoEvents(){
    setInterval(function() {
        var curTimeTemp = video.currentTime.toString();
        curTime = curTimeTemp.split(".")[0];
        //console.log("curTime" + curTime);
        switch(curTime) {
            case "13":
                console.log("00:13" + curTime);
                $("body").trigger("showAnswers",[1]);
                break;

            case "17":
                console.log("00:17" + curTime);
                $("body").trigger("showQuestion",[1]); break;
            case "106":
                console.log("01:46" + curTime); 
                $("body").trigger("showPrecents",[1]);
                break;
            case "109":
                console.log("01:49" + curTime); 
                $("body").trigger("hideAnswer",[1]);
                break;
            case "126":
                console.log("00:14" + curTime);
                $("body").trigger("showAnswers",[2]);
                break;
            case "133":
                console.log("00:18" + curTime);
                $("body").trigger("showQuestion",[2]); break;
            case "187":
                console.log("01:46" + curTime); 
                $("body").trigger("showPrecents",[2]);
                break;
           case "192":
                console.log("01:49" + curTime); 
                $("body").trigger("hideAnswer",[2]);
                break;
           case "225":
                console.log("00:14" + curTime);
                $("body").trigger("showAnswers",[3]);
                break;
            case "233":
                console.log("00:18" + curTime);
                $("body").trigger("showQuestion",[3]); break;
            case "303":
                console.log("01:46" + curTime); 
                $("body").trigger("showPrecents",[3]);
                break;
           case "308":
                console.log("01:49" + curTime); 
                $("body").trigger("hideAnswer",[3]);
                break;
           case "324":
                console.log("00:14" + curTime);
                $("body").trigger("showAnswers",[4]);
                break;
            case "338":
                console.log("00:18" + curTime);
                $("body").trigger("showQuestion",[4]); break;
            case "403":
                console.log("01:46" + curTime); 
                $("body").trigger("showPrecents",[4]);
                break;
           case "408":
                console.log("01:49" + curTime); 
                $("body").trigger("hideAnswer",[4]);
                break;
           case "510":
                console.log("00:14" + curTime);
                $("body").trigger("showAnswers",[5]);
                break;
            case "516":
                console.log("00:18" + curTime);
                $("body").trigger("showQuestion",[5]); break;
            case "588":
                console.log("01:46" + curTime); 
                $("body").trigger("showPrecents",[5]);
                break;
           case "593":
                console.log("01:49" + curTime); 
                $("body").trigger("hideAnswer",[5]);
                break;
        }
    }, 1000);
}

function initHeaderQuestionValue(id){
    var value = getValue(id);
    $("#Q" + id + " .value .val").text("$"+value);
    $("#Q" + id + " .time .val").text("00:10");
    $("#Q" + id + " .total .val").text("$"+total);
    
}


function getValue(numOfQ){
    var currentData = data["question" + numOfQ];
    return currentData.value;
}

