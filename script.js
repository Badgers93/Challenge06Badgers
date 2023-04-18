let weatherApiRootUrl = 'https://api.openweathermap.org';
let weatherApiKey = 'dbc5e5ea63789d0ac694594a00a92cbe';
let textInput = document.querySelector("#inputText");
let searchButton = document.querySelector("#searchButton");
let searchHistory = document.querySelector(".searchHistory");
let weatherBox = document.querySelector(".weatherBox");
let searchHistoryArray = [];

function citySearch(event){
    let desiredCity = textInput.value.trim();
    // fetchCoordinates(desiredCity);
    saveCityHistory(desiredCity);
}

searchButton.addEventListener("click", citySearch);

function saveCityHistory(city){
    if (searchHistoryArray.indexOf(city) !== -1){
        return;
    }
    searchHistoryArray.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray));
    getSearchHistory();
    
}

function getSearchHistory(){
    let localSearchHistory = localStorage.getItem("searchHistory");
    if (localSearchHistory){
        searchHistoryArray = JSON.parse(localSearchHistory);
    }
    renderSearchHistory();
}

function renderSearchHistory(){
    searchHistory.innerHTML = "";
    for (let i = 0; i < searchHistoryArray.length; i++){
        let btn = document.createElement("button");
        btn.textContent = searchHistoryArray[i];
        btn.setAttribute("data-search", searchHistoryArray[i]);
        // to get this value btn.getAttribute(data-search)
        searchHistory.append(btn);
    }
}

function fetchCoordinates(city){
    var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${weatherApiKey}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
     console.log("cityData", data);
    })
    .catch(function (err) {
      console.error(err);
    });

}

// obtain latitude, city, and longitude, pass it to the next
// render the weather
// var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

function fiveDayForecast(dailyForecast){
    // Create unix timestamps for start and end of 5 day forecast
    var startDt = dayjs().add(1, 'day').startOf('day').unix();
    var endDt = dayjs().add(6, 'day').startOf('day').unix();

    // add more code for creating elements, setting atribute, emptying previous container

    for (var i = 0; i < dailyForecast.length; i++) {

        // First filters through all of the data and returns only data that falls between one day after the current data and up to 5 days later.
        if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
    
          // Then filters through the data and returns only data captured at noon for each day.
          if (dailyForecast[i].dt_txt.slice(11, 13) == "12") {
            renderForecastCard(dailyForecast[i]);
          }
        }
      }
    

}