//array of initial buttons
var animals = ["puppy", "kitten", "baby owl", "baby octopus"];

//get elements that we'll be using a lot
var $input = $("input");
var $animalsView = $("#animalsView");
var $animalBtns = $("#animalBtns");

//function to generate buttons
function generateButtons() {
    //empty buttons div
    $animalBtns.empty();

    //loop thru each element in animal array
    animals.forEach(function (animal) {
        //create button for each element
        var btn = $("<button>");

        //add a class to it, and data attribute of its name. append name to button.
        btn.addClass("animalBtn");
        btn.attr("data-animal", animal);
        btn.text(animal);

        //place btn in container
        $animalBtns.append(btn);
    });
}

//function to show the gifs of the animal
function displayAnimal() {
    //get name of animal
    var animalAttr = $(this).attr("data-animal");

    //url for ajax req. append animal name to query.  limit query to 10 results and rating to pg
    var url = "https://api.giphy.com/v1/gifs/search?q=" +
        animalAttr + "&api_key=b8PPK1KYvpwSpG4rWKdgYP1fmEZTc46V&limit=10&rating=pg";

    //make req
    $.ajax({
        url: url,
        method: "GET"
    })
        //on response
        .then(function (res) {
            //empty #animalsView
            $animalsView.empty();

            //loop thru each object
            res.data.forEach(function (animal) {
                //create div, add appropriate class.  same for img
                var $div = $("<div>");
                $div.addClass("animalDiv");
                var $img = $("<img>");
                $img.addClass("animalImg");

                //get the still image
                var stillImg = animal.images.fixed_height_still.url;

                //set img src to stillImg, and state to still
                $img.attr("src", stillImg);
                $img.attr("data-state", "still");

                //set sources to switch between still and animated images
                $img.attr("data-still", stillImg);
                $img.attr("data-animate", animal.images.fixed_height.url);

                //append created image to created div
                $div.append($img);

                //make p element for rating and append to div
                var $p = $("<p>");
                $p.append("Rated: " + animal.rating);
                $div.append($p);

                //now append div to #animalsView
                $animalsView.append($div);
            });
        });
}

//will switch between still and animated gifs
function animateAnimal() {
    //get state of img clicked on
    var state = $(this).attr("data-state");

    //if still, animate.  and vice versa
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

//when user clicks button or hits enter
$("form").on("submit", function (e) {
    //prevent form from actually submitting
    e.preventDefault();

    //get trimmed input val and empty input
    val = $input.val().trim();
    $input.val("");

    //prevents generating empty buttons
    if (val === "") {
        return;
    }

    //push user input into array. generate buttons.
    animals.push(val);
    generateButtons();
});

//dynamic event listeners for when user clicks on either button or gif
$(document).on("click", ".animalBtn", displayAnimal);
$(document).on("click", ".animalImg", animateAnimal);

//generate buttons in array on init
generateButtons();