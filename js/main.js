function showPlayPage(type){
    
    if (type == "video"){
        $(".movPlace").show();
    }
    else{
        $(".movPlace").hide();
    }

     $("#home").hide();
    $("#play").show();

    startPlay(type);

}

function startPlay(type){
    total = 0;
    time = 10;

    //if video play
    if(type == "video"){
          video.play();
          setTimeout(function(){
              video.play();
          },500);
          //init the value, time, total by Q1
          initHeaderQuestionValue(1);
          triggerVideoEvents();
    }
  
    
    //if 24/7

}

function goToHome(){
    $("section").hide();
    $("#home").show();
    video.pause();
    video.currentTime = 0;
    $(".movPlace").hide();
}