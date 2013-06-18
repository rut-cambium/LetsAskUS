var video;
var time = 10;
var total = 0;
var value;
$(document).ready(function() {
    init();
});

function init() {
    video = document.getElementById("video");

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

    //init the click ctns animation
    $(".firstAns").addClass("btn");
    $(".result").addClass("btn");
    
    //init the right answer event
    $("body").delegate(".rightAns","touchend",function(){
        rightAnsClicked(this);
    })
}


function showAnswers(id){
     console.log("showAnswers " + id);
     //show skype banner
     $(".banner").show();
     $("#Q" + id).hide();

     //init the value, time, total by Q1
     initHeaderQuestionValue(id);

     //show the cover answers - prevent click until question display
     $(".coverAnswer").show();

     //show answers
      $("#ans" + id).show();
      $("#ans" + id).show();
}

function showQuestion(id){
     console.log("showQuestion " + id);
     
     //show Question
     $("#Q"+id).show();
     //start timer
     startTimer(id);
      //hide the cover answers - prevent click until question display
     $(".coverAnswer").hide();
}

function showPrecents(id){
     console.log("showPrecents " + id);
     $("#waitingScreen").hide();
     //hide answers, show answers with perctenge
     $("#ans" + id).hide();
     $("#ans" + id).show();
    
     //show the correct answer

     //set total value
      $(".questionSubHeader .total .val").text("$"+total);
}

function hideAnswer(id){
     console.log("hideAnswer " + id);

     //hide the answers
     $("#ans" + id).hide();
     $("#Q" + id).hide();
}

function startTimer(id){
    time = 10;
    var timeInterval = setInterval(function() {
        if(time > 0) {
            var timeDisplay = timer();
            console.log(timeDisplay);
            $(".questionSubHeader .time .val").text(timeDisplay);
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
    var valueTemp = getValue(id);
    value = valueTemp;
    $(".questionSubHeader .value .val").text("$"+valueTemp);
    $(".questionSubHeader .time .val").text("00:10");
    $(".questionSubHeader .total .val").text("$"+total);
    
}


function getValue(numOfQ){
    var currentData = data["question" + numOfQ];
    return currentData.value;
}

function rightAnsClicked(){
    total += parseInt(value);
}