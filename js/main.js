function showPlayPage(type){
    
    if (type == "video"){
        $("#video").show();
    }
    else{
        $("#video").hide();
    }

     $("#home").hide();
    $("#question").show();

}