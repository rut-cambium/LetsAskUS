var video;
var time = 10;
var total = 0;
var value;
var answersClickedArray = new Array(6);
var indexSnswersClicked = 0;
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

    $("body").bind("showRisk", function(e, id) {
        showAndInitRiskPage();
    });

    //init the click ctns animation
    $(".firstAns").addClass("btn");
    $(".result").addClass("btn");
    
    //init the clicked answer event
    $("body").delegate(".firstAns", "touchend", function() {
        
        answerClicked($(this));
    });
    //init the risk slider
    $('input[type="range"]').change(function(e, i) {
        console.log($(this).val());

        inputChange($(this));
       

    });

    //continue clicked
    $(".riskPage .continue").bind("touchend",function(){
        riskContClicked();
    });




    //secret div - to share page
    $(".secretGoToShare").bind("dblclick",function() {
        goToSharePage();
    });
}


function showAnswers(id){
     console.log("showAnswers " + id);
     //show skype banner
     $("#card").removeClass("flop");
     $("#Q" + id).hide();
     $(".banner").show();
     

     //init the value, time, total by Q1
     initHeaderQuestionValue(id);

     //show the cover answers - prevent click until question display
     $(".coverAnswer").show();
    
     
     //show answers
     $(".answer").hide();
     $("#ans" + id).show();
        //display the animate
      $("#ans" + id + " .answerFilp").show();
      $("#ans" + id + " .answerFilp").removeClass("openP");
      $("#ans" + id + " .answerFilp").addClass("openA");

      //remove waiting screen
      $("#waitingScreen").hide();
}

function showAnswerByDrag(id){
     //show skype banner
     $("#card").removeClass("flop");
     $("#Q" + id).hide();
     $(".banner").show();
     

     //init the value, time, total by Q1
     initHeaderQuestionValue(id);

     //show the cover answers - prevent click until question display
     $(".coverAnswer").show();
    
     
     //show answers
     $(".answer").hide();
     $("#ans" + id).show();
        //display the animate
      $("#ans" + id + " .answerFilp").show();
      $("#ans" + id + " .answerFilp").removeClass("openP");
      $("#ans" + id + " .answerFilp").addClass("openA");

      //remove waiting screen
      $("#waitingScreen").hide();
}

function showQuestion(id){
     console.log("showQuestion " + id);
     
     //show Question with flop
     $(".question").hide();
     $("#Q"+id).show();
     $("#card").addClass("flop");
     
     //start timer
     startTimer(id);
      //hide the cover answers - prevent click until question display
     $(".coverAnswer").hide();

     //remove waiting screen
      $("#waitingScreen").hide();


  
}

function showQuestionByDrag(id){
     //show Question with flop
     $(".question").hide();
     $("#Q"+id).show();
     $("#card").addClass("flop");
       //hide the cover answers - prevent click until question display
     $(".coverAnswer").hide();
      //remove waiting screen
      $("#waitingScreen").hide();
}

function showPrecents(id){
     console.log("showPrecents " + id);
     //show the waiting screen only in video play
     if(playType =="video"){
         $("#waitingScreen").hide();
     }
     
     //hide answers, show answers with perctenge
      $("#ans" + id + " .answerFilp").removeClass("openA");
      $("#ans" + id + " .answerFilp").addClass("openP");

     //set total value
      $(".questionSubHeader .total .val").text("$"+total);

      

}

function showPrecentsByDrag(id){
    $("#waitingScreen").hide();

      $("#ans" + id + " .answerFilp").removeClass("openA");
      $("#ans" + id + " .answerFilp").addClass("openP");

     //set total value
      $(".questionSubHeader .total .val").text("$"+total);
}

function hideAnswer(id){
     console.log("hideAnswer " + id);

     //hide the answers
     $("#ans" + id).hide();
     $("#Q" + id).hide();

     //if the current question is 5 - go to share page
     if(id == 5){
        $("#play").hide();
        $("#share").show();

        //set the total time in share page
        $("#share .score").text("$" + total);
       
        //remove waiting screen
        $("#waitingScreen").hide();
     }
    

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
     //show the waiting screen only in video play
     if(playType =="video"){
         $("#waitingScreen").show();
     }
    
}
var videoInterval;
function triggerVideoEvents(){
    videoInterval = setInterval(function() {
        var curTimeTemp = video.currentTime.toString();
        curTime = curTimeTemp.split(".")[0];
        curTime = parseInt(curTime);
        //console.log("curTime" + curTime);
        switch(curTime) {
            case 13:
                console.log("00:13" + curTime);
                $("body").trigger("showAnswers", [1]);
                break;
            case curTime > 13 && curTime < 17:
                showAnswersByDrag(1);
                break;
            case 17:
                console.log("00:17" + curTime);
                $("body").trigger("showQuestion", [1]); break;
            case curTime > 17 && curTime < 106:
                showQuestionByDrag(1);
                break;
            case 106:
                console.log("01:46" + curTime);
                $("body").trigger("showPrecents", [1]);
                break;
            case curTime > 106 && curTime < 109:
                showPrecentsByDrag(1);
                break;
            case 109:
                console.log("01:49" + curTime);
                $("body").trigger("hideAnswer", [1]);
                break;
            case curTime > 109 && curTime < 126:
                hideAnswerByDrag(1);
                break;
            case 126:
                console.log("00:14" + curTime);
                $("body").trigger("showAnswers", [2]);
                break;
            case curTime > 126 && curTime < 133:
                showAnswersByDrag(2);
                break;
            case 133:
                $("body").trigger("showQuestion", [2]); break;
            case curTime > 133 && curTime < 187:
                showQuestionByDrag(2);
                break;
            case 187:
                $("body").trigger("showPrecents", [2]);
                break;
            case curTime > 187 && curTime < 192:
                showPrecentsByDrag(2);
                break;
            case 192:
                $("body").trigger("hideAnswer", [2]);
                break;
            case curTime > 192 && curTime < 225:
                hideAnswerByDrag(2);
                break;
            case 225:
                $("body").trigger("showAnswers", [3]);
                break;
            case curTime > 225 && curTime < 233:
                showAnswersByDrag(3);
                break;
            case 233:
                $("body").trigger("showQuestion", [3]); break;
            case curTime > 233 && curTime < 303:
                showQuestionByDrag(3);
                break;
            case 303:
                $("body").trigger("showPrecents", [3]);
                break;
           case curTime >303 && curTime < 308:
                showPrecentsByDrag(3);
                break;
            case 308:
                $("body").trigger("hideAnswer", [3]);
                break;
            case curTime >308 && curTime < 324:
                hideAnswerByDrag(3);
                break;
            case 324:
                $("body").trigger("showAnswers", [4]);
                break;
            case curTime >324 && curTime < 338:
                showAnswersByDrag(4);
                break;
            case 338:
                $("body").trigger("showQuestion", [4]); break;
            case curTime >403 && curTime < 408:
                showQuestionByDrag(4);
                break;
            case 403:
                console.log("01:46" + curTime);
                $("body").trigger("showPrecents", [4]);
                break;
            case curTime >403 && curTime < 408:
                showPrecentsByDrag(4);
                break;
            case 408:
                $("body").trigger("hideAnswer", [4]);
                break;
            case curTime >408 && curTime < 460:
                hideAnswerByDrag(4);
                break;
            case 460:
                $("body").trigger("showRisk", [4]);
                break;
            case curTime >460 && curTime < 510:
                showRiskByDrag(4);
                break;
            case 510:
                $("body").trigger("showAnswers", [5]);
                break;
            case curTime >510 && curTime < 516:
                showAnswersByDrag(5);
                break;
            case 516:
                $("body").trigger("showQuestion", [5]); break;
            case curTime >516 && curTime < 588:
                showQuestionByDrag(5);
                break;
            case 588:
                $("body").trigger("showPrecents", [5]);
                break;
            case curTime >588 && curTime < 593:
                showPrecentsByDrag(5);
                break;
            case 593:
                $("body").trigger("hideAnswer", [5]);
                break;
        }
    }, 1000);
}

var noVideoInterval;
function triggerNoVideoEvents(){
    var curTimeNoVideo = 0;
  noVideoInterval =  setInterval(function() {
        curTimeNoVideo++;
         switch(curTimeNoVideo) {
            case 5:
                console.log("00:13" + curTimeNoVideo);
                $("body").trigger("showAnswers", [1]);
                break;

            case 7:
                console.log("00:17" + curTimeNoVideo);
                $("body").trigger("showQuestion", [1]); break;
            case 17:
                console.log("01:46" + curTimeNoVideo);
                $("body").trigger("showPrecents", [1]);
                break;
            case 21:
                console.log("01:49" + curTimeNoVideo);
                $("body").trigger("hideAnswer", [1]);
                break;
            case 22:
                console.log("00:14" + curTimeNoVideo);
                $("body").trigger("showAnswers", [2]);
                break;
            case 25:
                console.log("00:18" + curTimeNoVideo);
                $("body").trigger("showQuestion", [2]); break;
            case 35:
                console.log("01:46" + curTimeNoVideo);
                $("body").trigger("showPrecents", [2]);
                break;
            case 39:
                console.log("01:49" + curTimeNoVideo);
                $("body").trigger("hideAnswer", [2]);
                break;
            case 40:
                console.log("00:14" + curTimeNoVideo);
                $("body").trigger("showAnswers", [3]);
                break;
            case 43:
                console.log("00:18" + curTimeNoVideo);
                $("body").trigger("showQuestion", [3]); break;
            case 53:
                console.log("01:46" + curTimeNoVideo);
                $("body").trigger("showPrecents", [3]);
                break;
            case 57:
                console.log("01:49" + curTimeNoVideo);
                $("body").trigger("hideAnswer", [3]);
                break;
            case 58:
                console.log("00:14" + curTimeNoVideo);
                $("body").trigger("showAnswers", [4]);
                break;
            case 61:
                console.log("00:18" + curTimeNoVideo);
                $("body").trigger("showQuestion", [4]); break;
            case 71:
                console.log("01:46" + curTimeNoVideo);
                $("body").trigger("showPrecents", [4]);
                break;
            case 75:
                 $("body").trigger("hideAnswer", [4]);
                break;
            case 76:
                 $("body").trigger("showRisk", [4]);
                break;
            //case 76:
            //    console.log("00:14" + curTimeNoVideo);
            //    $("body").trigger("showAnswers", [5]);
            //    break;
            //case 79:
            //    console.log("00:18" + curTimeNoVideo);
            //    $("body").trigger("showQuestion", [5]); break;
            //case 89:
            //    console.log("01:46" + curTimeNoVideo);
            //    $("body").trigger("showPrecents", [5]);
            //    break;
            //case 93:
            //    console.log("01:49" + curTimeNoVideo);
            //    $("body").trigger("hideAnswer", [5]);
            //    break;
        }
    }, 1000);
}

function noVideoQ5Event(){
     curTimeNoVideo = 75;
    noVideoInterval =  setInterval(function() {
       
        curTimeNoVideo++;
         switch(curTimeNoVideo) {
             case 76:
                console.log("00:14" + curTimeNoVideo);
                $("body").trigger("showAnswers", [5]);
                break;
            case 80:
                console.log("00:18" + curTimeNoVideo);
                $("body").trigger("showQuestion", [5]); break;
            case 90:
                console.log("01:46" + curTimeNoVideo);
                $("body").trigger("showPrecents", [5]);
                break;
            case 94:
                console.log("01:49" + curTimeNoVideo);
                $("body").trigger("hideAnswer", [5]);
                break;

             }
       },1000 );
}

function initHeaderQuestionValue(id){
    //if this is not the 5 ques - take the const value
    //else - the value was set by the user
    if(id < 5){
         var valueTemp = getValue(id);
         value = valueTemp;
    }
   
    $(".questionSubHeader .value .val").text("$"+value);
    $(".questionSubHeader .time .val").text("00:10");
    $(".questionSubHeader .total .val").text("$"+total);
    
}


function getValue(numOfQ){
    var currentData = data["question" + numOfQ];
    return currentData.value;
}

function answerClicked(answer){
    //answersClickedArray[indexSnswersClicked] = 1;
    //show the cover answers - prevent click after one click
    $(".coverAnswer").show();

    //if the user click on the right answer
    if(answer.hasClass("rightAns")){
        rightAnsClicked();
    }
}

function rightAnsClicked(){
    total += parseInt(value);
}

function showAndInitRiskPage(){
    $(".answers").hide();
    $(".riskPage").show();
    $(".coverAnswer").hide();
    $(".riskPage .riskVal").text("$"+total);
    $("#riskSlide").attr("max", total);
}

function riskContClicked(){
    $(".answers").show();
    $(".riskPage").hide();
    $(".coverAnswer").show();
    //risk = $('input[type="range"]').val();
    //if play type is with video -


    //if play type is no video
        //continue the time listener
        noVideoQ5Event();
}

function inputChange(pointer){
     //set value number
        value = pointer.val();
        $(".questionSubHeader .value .val").text("$" + value);

        //set the slider background

        var val = pointer.val();
        var maxVal = pointer.attr("max");
        var precent = val / maxVal;

        //the background position move from 99.45 - 1.45
        //so 32 is the 100%
        var precentByBackground = 98 * precent;
        //decrease the pixels from the left pos - 99%
        var xPos = 99.45 - precentByBackground;
        //set the background position 
        pointer.css("background-position-x",xPos+"%");


}