var playType = "";
function showPlayPage(type){
    btnMusic.play();
     
    //init intervals;
    window.clearInterval(videoInterval);
    window.clearInterval(noVideoInterval);
    window.clearInterval(timeInterval);

    videoInterval ="";
    noVideoInterval ="";
    timeInterval="";
    
    $(".question").hide();
    $(".answer").hide();
    
    if (type == "video"){
        $(".movPlace").show();
        playType = "video";
        
    }
    else{
        $(".movPlace").hide();
        playType = "noVideo";

        //audio play
        setTimeout(function(){
            audio.load();
             audio.play();
        },500);
       
    }

     $("#home").hide();
    $("#play").show();

    startPlay(type);

}

function startPlay() {
    total = 0;
    time = 10;

    //if video play
    if(playType == "video") {
        video.play();
        setTimeout(function() {
            video.play();
        }, 500);
        //init the value, time, total by Q1
        initHeaderQuestionValue(1);
        triggerVideoEvents();
    }


    //if 24/7
    else {
        initHeaderQuestionValue(1);
        triggerNoVideoEvents();
    }

    //show and hide divs
    $("#question").show();
    $(".riskPage").hide();
}

function goToHome(){
    btnMusic.play();

    $("section").hide();
    $("#home").show();
    if(playType == "video") {
        video.pause();
        video.currentTime = 0;
    }
   
    $(".movPlace").hide();
	$('.firstAns').removeClass('active');
    $(".firstAns").removeClass("disabel");
    $(".result").hide();
    $(".btn").css("opacity",1);
    $("#share .continue").removeClass("shareScore");
    //init slider background
    $("#riskSlide").css("background-position-x", "99.45%");
     //init intervals;
     window.clearInterval(videoInterval);
     window.clearInterval(noVideoInterval);
    window.clearInterval(timeInterval);
    
    //init audio volume
    audio.volume = 1;

    //risk taken init
    riskWasTaken = false;
    
    var str="start";
    setTimeout(function(){
        try{
            cordova.exec(function(succ){console.log("success handle camera");}, function(err) {
                            console.log("failure handle camera");
                            }, "StopCamera", "stop", [str]);

        }
        catch(ex){
            
        }
               
               },1000);
    
   


    //stop music
    audio.pause();
}

function goToRisk(){
    $("#home").hide();
    $("#play").show();
    $(".riskPage").show();
    $(".answers").hide();
    $(".filper").hide();
    $(".coverAnswer").hide();
}

function goToSharePage(){
    $("#home").hide();
    $("#share").show();
}