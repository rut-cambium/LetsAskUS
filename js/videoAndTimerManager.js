var video;

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

     //show answers
      $("#Q" + id + " .answers").show();
}

function showQuestion(id){
     console.log("showQuestion " + id);
     
     //show Question


     //start timer
     startTimer();
}

function showPrecents(id){
     console.log("showPrecents " + id);

     //hide answers, show answers with perctenge

     //show the coorect answer

     //set total value
}



function hideAnswer(id){
     console.log("hideAnswer " + id);

     //hide the answers
}

function startTimer(){
    time = 10;
    var timeInterval = setInterval(function() {
        if(time >= 0 ) {
            timer();
        }
        else {
            window.clearInterval(timeInterval);
            //
            $("body").trigger("timerEnd",[1]);
        }
    }, 1000);
}

function timerEnd(){
    
    //show the waiting screen
    console.log("show waiting screen");
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
time = 10;


function timer(){
   
    if(time == 10){
        console.log("00:10");
    }
    else{
        console.log("00:0" + time);  
    }
   
    time--;
}