var playType = "";
function showPlayPage(type){
    
    if (type == "video"){
        $(".movPlace").show();
        playType = video;
    }
    else{
        $(".movPlace").hide();
        playType = "noVideo";
    }

     $("#home").hide();
    $("#play").show();

    startPlay(type);

}

function startPlay(){
    total = 0;
    time = 10;

    //if video play
    if(playType == "video"){
          video.play();
          setTimeout(function(){
              video.play();
          },500);
          //init the value, time, total by Q1
          initHeaderQuestionValue(1);
          triggerVideoEvents();
    }
  
    
    //if 24/7
    else{
        initHeaderQuestionValue(1);
        triggerNoVideoEvents();
    }
}

function goToHome(){
    $("section").hide();
    $("#home").show();
    video.pause();
    video.currentTime = 0;
    $(".movPlace").hide();

}