
//a function to a
function searchWeatherInfo(weather) {//Quering api for the weather information with full url of the open weather map app
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + weather + "&appid=d4913978d5c3e24d361b4f331107b32b&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        //assigning weather info into a variable.
        var temp = $("#temperature").text(response.main.temp);
        var humid = $("#humidity").text(response.main.humidity);
        var windS = $("#wind-speed").text(response.wind.speed);

        //another ajax function to call the api for uvindex information 
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=d4913978d5c3e24d361b4f331107b32b"
        }).then(function(UVIndexRes){
            console.log(UVIndexRes)
            var uvI = $("#uv-index").text(UVIndexRes.value);
            
        })
    });
    //five days forecast query url 
    var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + weather + "&appid=d4913978d5c3e24d361b4f331107b32b&units=imperial";
    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(fiveDayRes){
        console.log(fiveDayRes)
        var elementArr = ["#boxOne", "#boxTwo", "#boxThree", "#boxFour", "#boxFive"];
        var i = 0;
        for(j=0; j<fiveDayRes.list.length; j+=8){
            $(elementArr[i]).text(fiveDayRes.list[j].main.temp)// jquery of the element array at the index i. text will be the five day response.
            i++;
        }
    })
}
// Event handler for user's choice of city input  
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var inputWeather = $(".city-input").val().trim();
    //inputWeather.val(localStorage);

    searchWeatherInfo(inputWeather);
});