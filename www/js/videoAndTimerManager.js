var video;
var audio;
var btnMusic;
var time = 10;
var total = 0;
var value;
var answersClickedArray = new Array(6);
var indexSnswersClicked = 0;
var riskWasTaken = false;
$(document).ready(function() {
    init();
});

function init() {
    video = document.getElementById("video");
    audio = $("#bgMusic")[0];
    btnMusic = $("#btnMusic")[0];
   // btnMusic.volume = 0;
    //btnMusic.load();
    //btnMusic.play();
    //btnMusic.volume= 1;
    ///load audio
    $("#bgMusic")[0].load();
    $("#btnMusic")[0].load();
    $("#cameraMusic")[0].load();
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

    
    //init the clicked answer event
    $("body").delegate(".firstAns", "touchend", function() {
        $(this).addClass('active disabel');
        answerClicked($(this));

        //if the btn is not camera btn
        if(!($(this) == $("#share .takePhoto"))){
         //   btnMusic.load();
            btnMusic.play();
        }
    });
    //init the risk slider
    $('input[type="range"]').change(function(e, i) {
        console.log($(this).val());

        inputChange($(this));
       

    });

    //continue clicked
    $(".riskPage .continue").bind("touchend",function(){
        //btnMusic.load();
         btnMusic.play();
                                  
        riskContClicked();
    });


    $("#share .takePhoto").click(function() {
        //camera clicked sound 
        if(!$(this).hasClass("shareScore")) {
           
            $("#cameraMusic")[0].play();
        }


        //change the btn to share
        $(this).addClass("shareScore");

        // freeze the camera
        var str = "stop";
        cordova.exec(function(succ) { console.log("success handle camera"); }, function(err) {
            console.log("failure handle camera");
        }, "StopCamera", "stop", [str]);
    });

    //video ended -go to share
    $("#video").bind("ended", function() {
       goToShare();
    });
}


function jump(){
   var curTimeTemp = video.currentTime.toString();
    currentTime = parseInt(curTimeTemp.split(".")[0]);
    if(currentTime < 28){
        currentTime =28;

        showAnswerByJump(1);
        showQuestionByJump(1);
         $("#waitingScreen").show();
    }
    else if(currentTime < 96){
        currentTime =96;
        showAnswerByJump(1);
        showQuestionByJump(1);
    }
    else if(currentTime < 123){
        currentTime =123;
         showAnswerByJump(2);
        //showQuestionByJump(2);
    }
    else if(currentTime < 177){
        currentTime =177;
        $("#waitingScreen").show();
        showAnswerByJump(2);
        showQuestionByJump(2);
    }
    else if(currentTime < 223){
        currentTime =223;
        showAnswerByJump(3);

       // showQuestionByJump(3);
    }
    else if(currentTime < 293){
        $("#waitingScreen").show();
        currentTime =293;
         showAnswerByJump(3);
        showQuestionByJump(3);
    }
    else if(currentTime < 328){
        currentTime =328;
         showAnswerByJump(4);
       // showQuestionByJump(4);
    }
    else if(currentTime < 393){

        currentTime =393;
        $("#waitingScreen").show();
         showAnswerByJump(4);
        showQuestionByJump(4);
    }
     else if(currentTime < 415){

        currentTime =415;
        $("#waitingScreen").show();
        hideAnswer(4);
       // showAndInitRiskPage();
    }
    else if(currentTime < 443){

        currentTime =443;
        
        $("#waitingScreen").hide();
            showAndInitRiskPage();
       
        
    }

    else if(currentTime < 506){
        currentTime =506;
        $(".riskPage").hide();
         showAnswerByJump(5);
         //show skype banner
      $(".filper").show();
     $("#card").removeClass("flop");
       // showQuestionByJump(5);
    }
    else if(currentTime < 578){
        currentTime =578;
         showAnswerByJump(5);
        showQuestionByJump(5);
    }
    video.currentTime = currentTime;
}


function showAnswers(id){
     console.log("showAnswers " + id);
     //show skype banner
     $("#card").removeClass("flop");
     $("#Q" + id).hide();
     $(".banner").show();
    $(".riskPage").hide();

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
    $(".filper").show();
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

function showQuestionByJump(id){
    //show Question with flop
     $(".question").hide();
     $("#Q"+id).show();
     $("#card").addClass("flop");

      //set total value
      $(".questionSubHeader .total .val").text("$"+total);
}

function showAnswerByJump(id){
    $(".question").hide();
    $(".filper").show();
     //show answers
     $(".answers").show();
     $(".answer").hide();
     $("#ans" + id).show();
        //display the animate
      $("#ans" + id + " .answerFilp").show();
      $("#ans" + id + " .answerFilp").removeClass("openP");
      $("#ans" + id + " .answerFilp").addClass("openA");

       //set total value
      $(".questionSubHeader .total .val").text("$"+total);
}
function showPrecents(id){
     console.log("showPrecents " + id);
     //show the waiting screen only in video play
     if(playType =="video"){
         $("#waitingScreen").hide();
     }
     
     //hide answers, show answers with perctenge
      $("#ans" + id + " .result").show();
      $("#ans" + id + " .answerFilp").removeClass("openA");
      $("#ans" + id + " .answerFilp").addClass("openP");

     //set total value
      $(".questionSubHeader .total .val").text("$"+total);

}

function showPrecentsByJump(id){
    //hide answers, show answers with perctenge
      $("#ans" + id + " .answerFilp").removeClass("openA");
      $("#ans" + id + " .answerFilp").addClass("openP");

     //set total value
      $(".questionSubHeader .total .val").text("$"+total);
}

function goToShare(){
    $("#play").hide();
    $("#share").show();
    $("#waitingScreen").hide();

    //set the total time in share page
    $("#share .score").text("$" + total);

    
    $(".movPlace").hide();
    if(playType =="noVideo"){
        audio.pause();
    }
    else{
        //hide the video
        video.pause();
    }
     
}

function hideAnswer(id){
     console.log("hideAnswer " + id);

     //hide the answers
     $("#ans" + id).hide();
     $("#Q" + id).hide();

     //if the current question is 5 - go to share page
     if(id == 5){
         if(playType =="noVideo"){
             goToShare();
         }
       
     }
     //if q4 dont show the banner - the slider shown
    if(id != 4){
     //show skype banner
     $("#card").removeClass("flop");
    }
    

}
var timeInterval;
function startTimer(id){
    time = 10;
     timeInterval = setInterval(function() {
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
                $("body").trigger("showQuestion",[2]); break;
            case "187":
                $("body").trigger("showPrecents",[2]);
                break;
           case "192":
                $("body").trigger("hideAnswer",[2]);
                break;
           case "225":
                $("body").trigger("showAnswers",[3]);
                break;
            case "233":
                $("body").trigger("showQuestion",[3]); break;
            case "303":
                $("body").trigger("showPrecents",[3]);
                break;
           case "308": 
                $("body").trigger("hideAnswer",[3]);
                break;
           case "324":
                $("body").trigger("showAnswers",[4]);
                break;
            case "338":
                $("body").trigger("showQuestion",[4]); break;
            case "403":
                console.log("01:46" + curTime); 
                $("body").trigger("showPrecents",[4]);
                break;
           case "408":
                $("body").trigger("hideAnswer",[4]);
                break;
           case "460": 
                $("body").trigger("showRisk",[4]);
                break;
           case "510":
                $("body").trigger("showAnswers",[5]);
                break;
            case "516":
                $("body").trigger("showQuestion",[5]); break;
            case "588": 
                $("body").trigger("showPrecents",[5]);
                break;
           case "593":
                $("body").trigger("hideAnswer",[5]);
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
            case 1:
                $("body").trigger("showAnswers", [1]);
                break;

            case 3:
                $("body").trigger("showQuestion", [1]); break;
            case 13:
                $("body").trigger("showPrecents", [1]);
                break;
            case 16:
                $("body").trigger("hideAnswer", [1]);
                break;
            case 18:
                 $("body").trigger("showAnswers", [2]);
                break;
            case 20:
                $("body").trigger("showQuestion", [2]); break;
            case 30:
                $("body").trigger("showPrecents", [2]);
                break;
            case 34:
                $("body").trigger("hideAnswer", [2]);
                break;
            case 35:
                $("body").trigger("showAnswers", [3]);
                break;
            case 38:
                $("body").trigger("showQuestion", [3]); break;
            case 48:
                $("body").trigger("showPrecents", [3]);
                break;
            case 52:
                $("body").trigger("hideAnswer", [3]);
                break;
            case 53:
                $("body").trigger("showAnswers", [4]);
                break;
            case 56:
                 $("body").trigger("showQuestion", [4]); break;
            case 66:
                $("body").trigger("showPrecents", [4]);
                break;
            case 70:
                 $("body").trigger("hideAnswer", [4]);
                break;
            case 71:
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
      //show skype banner
      $(".filper").show();
     $("#card").removeClass("flop");
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
    //show risk page only if not taken it yet
    if(riskWasTaken == false){
        $(".answers").hide();
        $(".filper").hide();
        $(".riskPage").show();
        $(".coverAnswer").hide();
        $(".riskPage .riskVal").text("$"+total);
        $("#riskSlide").attr("max", total);
        $("#waitingScreen").hide();

    }
    else{
        $("#waitingScreen").show();
    }
    }

function riskContClicked(){
    riskWasTaken = true;
    $(".answers").show();
    $(".riskPage").hide();
    $(".coverAnswer").show();
    //risk = $('input[type="range"]').val();
    //if play type is with video -
    if(playType =="video"){
        $("#waitingScreen").show();
    }
    else{
        //if play type is no video
        //continue the time listener
        noVideoQ5Event();
    }
   
}

function inputChange(pointer){
    if(pointer.val() == pointer.attr("max")){
        pointer.addClass("hideLeftSide");
    }
    else{
        pointer.removeClass("hideLeftSide");
    }
    console.log("pointer.val: "+ pointer.val());
    console.log("total: "+ pointer.attr("max"));
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