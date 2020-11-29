var input = "";
var talking = false;
var name_list = [];
var scores = [];
var total_time = 0;
var current_time = 0;
var start_time;
var selected_start_time;
var selected_name = "";

function print_name_list (){
    $("#name_list").text(""); //reset
    for (i = 0; i < name_list.length; i++){
        $("#name_list").append(name_list[i]);
        $("#name_list").append("<br>");
    };
    $("#nb_of_pax").text(name_list.length); //print nb_of_pax
};

function del_last_name(){
    name_list.splice(-1,1);
    print_name_list();
};

function start_talking(){
    for (i = 0; i < name_list.length; i++) { //reset scores
        scores[i] = 0;
    };
    talking = true;
    $("#start_page").hide();
    print_name_buttons();
    $("#talking_page").show();
    start_time = new Date;
};

function secondsToHMS(s) {
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}

function print_name_buttons(){
    for (i = 0; i < name_list.length; i++){
        $("#name_buttons").append('<div id='+name_list[i]+' class="name_button" onclick="select(this.id)">' + name_list[i] +'</div>');
    };
};

function select(name){
    $(".name_button").removeClass("selected"); // reset
    $("#"+name).addClass("selected"); //set CSS
    selected_name = name;
    current_time = 0;
    selected_start_time = total_time;
};

function sec_to_percent (sec){
    var sum = scores.reduce(function(a, b){return a + b;}, 0); //find sum of all scores
    var percent = sec/sum*100;
    return percent;
};

function print_scores (){
    $("#scores").text(""); //reset
    for (i = 0; i < name_list.length; i++){
        $("#scores").append(name_list[i] + " : " + Math.floor(sec_to_percent(scores[i])) + " % <br>");
    };
};

function print_graphs (){
    $("#graphs").text(""); //reset
    for (i = 0; i < name_list.length; i++){
        $("#graphs").append('<div class="graph" style="width: '+sec_to_percent(scores[i])+'%;">'+name_list[i]+'</div>');
    };
};

setInterval( //update timer every second
    function() {
        total_time = Math.floor((new Date - start_time) / 1000)
        if (!isNaN(total_time)){
            $('#total_timer').text(secondsToHMS(total_time)); //update timer
            $('#current_timer').text(secondsToHMS(current_time)); //update timer
            if (selected_name){
                
                var pos = name_list.indexOf(selected_name);
                current_time = total_time - selected_start_time;
                scores[pos] += 1;
                print_scores();
                print_graphs();
            };
            
        };
    }, 1 //refresh total_time
);


//listen to keyboard input
if (!talking){ //if not talking
    $(document).keydown(function(event){
    var letter_pressed = String.fromCharCode(event.which); //get letter
    var key_pressed = event.which; //get key

     if (key_pressed == 8 && input.length > 0){ //if backspace and input not empty
            input = input.slice(0, -1); //remove last letter
    } else if ((key_pressed > 64 && key_pressed < 91) || key_pressed == 32){  //if key is letter or space
            input += letter_pressed; //add letter to input
    } else if (key_pressed ==13 && input){ // if enter and input not empty
            name_list.push(input) //add name to list
            print_name_list();
            input = "" //clear input
    };
    $("#name").text(input); //update name
    })
}; //end listen to keyboard