const selected_exos = [];
const categories = unique(exos.map(({ category }) => category));

function unique(array) {
    return $.grep(array, function(el, index) {
        return index === $.inArray(el, array);
    });
}

function display_menu(){
    for (i = 0; i < categories.length; i++){
        var relevant_exos = exos.filter(exo => exo.category === categories[i]);
        $("#home_page").append("<div class='category' id='"+categories[i]+"'></div>"); //make div for category
        $("#"+categories[i]).append(categories[i]); //print category name in div
        for (let j = 0; j < relevant_exos.length; j++) { //print exos in div
            $("#"+categories[i]).append('<div class="exo" id="'+relevant_exos[j].name+'" onclick="select_exo(\''+relevant_exos[j].name +'\')">'+relevant_exos[j].name+'</div>'); 
        }
    };
};

function select_exo(name){
    var selected_exo = exos.find(exo => exo.name === name)
    $("#"+selected_exo.category).hide();
    selected_exos.push(selected_exo);
    if (selected_exos.length == categories.length) { //if all exos selected
        play();
    }
};

function play(){
    $("#home_page").hide();
    $("#player").show();
    var selected_videos = [];
    for (let i = 0; i < selected_exos.length; i++) { // fill selected_videos with urls from selected_exos
        selected_videos.push(selected_exos[i].url)
    }

    var myvid = document.getElementById('video');
    var activeVideo = 0;
    myvid.src = selected_videos[0]; // prepare 1st video and wait for user to play

    myvid.addEventListener('ended', function(e) { // when 1st video is done
        if (activeVideo < selected_videos.length-1) { // if not the last video
            activeVideo++; //get next video
            myvid.src = selected_videos[activeVideo];
            myvid.play();
        } else{ // if last video
            $("#player").hide();
            $("#end_page").show();
        };   
    });
};


display_menu();



//map(({ nom }) => nom)