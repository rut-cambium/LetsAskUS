function showPlayPage(type){
    
    if (type == "video"){
        $(".movPlace").show();
    }
    else{
        $(".movPlace").hide();
    }

     $("#home").hide();
    $("#question").show();

    startPlay(type);

}

function startPlay(type){
    total = 0;
    time = 10;

    //if video play
    if(type == "video"){
          $("#video")[0].play();
          //init the value, time, total by Q1
          initHeaderQuestionValue(1);
          triggerVideoEvents();
    }
  
    
    //if 24/7

}