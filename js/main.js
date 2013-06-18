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
    
    //if video play
    $("#video")[0].play();
    triggerVideoEvents();
    
    //if 24/7

}