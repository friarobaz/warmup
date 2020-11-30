
function unique(array) {
    return $.grep(array, function(el, index) {
        return index === $.inArray(el, array);
    });
}

var categories = unique(exos.map(({ category }) => category));


for (i = 0; i < categories.length; i++){
    var relevant_exos = exos.filter(exo => exo.category === categories[i]);
    $("#home_page").append("<b>"+categories[i] + "</b><br>"); 
    for (let i = 0; i < relevant_exos.length; i++) {
        $("#home_page").append(relevant_exos[i].name + "<br>"); 
    }
    $("#home_page").append("<br>"); 
};

//map(({ nom }) => nom)