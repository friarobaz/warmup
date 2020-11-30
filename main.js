const selected_exos = [];
const categories = unique(exos.map(({ category }) => category));

function unique(array) {
    return $.grep(array, function(el, index) {
        return index === $.inArray(el, array);
    });
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

function get_random_color(i){
    var randHigh = Math.random() * 200 + 55;
    var randLow2 = 255;
    var randLow = Math.random() * 30;
    var randArray = [randHigh, randLow, randLow2];
    var shuffled = shuffle(randArray);
    console.log(shuffled);

    return "rgb("+shuffled[0]+","+shuffled[1]+","+shuffled[2]+")";
};

function display_menu(){
    for (i = 0; i < categories.length; i++){
        var relevant_exos = exos.filter(exo => exo.category === categories[i]);
        $("#home_page").append('<div class="category" style="background-color: '+get_random_color(i)+'" id="'+categories[i]+'"></div>'); //make div for category
        $("#"+categories[i]).append(categories[i]); //print category name in div
        for (let j = 0; j < relevant_exos.length; j++) { //print exos in div
            $("#"+categories[i]).append('<div class="exo" style="background-color: '+get_random_color(i)+'" id="'+relevant_exos[j].name+'" onclick="select_exo(\''+relevant_exos[j].name +'\')">'+relevant_exos[j].name+'</div>'); 
        }
    };
    //$("#raise").css('background-color', get_random_color());
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