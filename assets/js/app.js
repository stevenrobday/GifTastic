var animals = ["puppy", "kitten", "baby owl", "baby octopus"];
var $input = $("input");
var $animalsView = $("#animalsView");

function generateButtons() {
    $("#animalBtns").empty();
    animals.forEach(function (animal) {
        var btn = $("<button>");
        btn.addClass("animalBtn");
        btn.attr("data-animal", animal);
        btn.text(animal);
        $("#animalBtns").append(btn);
    });
}

function displayAnimal() {
    var $animal = $(this).attr("data-animal");

    var url = "https://api.giphy.com/v1/gifs/search?q=" +
        $animal + "&api_key=b8PPK1KYvpwSpG4rWKdgYP1fmEZTc46V&limit=10&rating=pg";

    $.ajax({
        url: url,
        method: "GET"
    })
        .then(function (res) {
            console.log(res.data);
            $animalsView.empty();
            res.data.forEach(function(animal){
                var $div = $("<div>");
                $div.addClass("animalDiv");
                var $img = $("<img>");
                $img.addClass("animalImg");
                $img.attr("src", animal.images.fixed_height.url);
                $div.append($img);
                var $p = $("<p>");
                $p.append("Rated: " + animal.rating);
                $div.append($p);
                $animalsView.append($div);
                console.log(animal.images.fixed_height.url);
            });
        });
}


$("form").on("submit", function (e) {
    e.preventDefault();
    if ($input.val() === "") {
        return;
    }
    animals.push($input.val());
    $input.val("");
    generateButtons();
});

$(document).on("click", ".animalBtn", displayAnimal);

generateButtons();