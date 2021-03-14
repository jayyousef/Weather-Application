const searchButton = document.getElementById('searchButton')

searchButton.addEventListener('click', getUserCity)

onOpenBrowser()


$('.city-btn').on("click", function(){
    console.log("I hope this works");
    let userCity = $(this).text()

    getLongLat(userCity)
})



function getUserCity() {
    let searchInput = document.getElementById('cityInput')
    let userCity = searchInput.value

    console.log(userCity)

    userCity = userCity.trim()

    //add user validation? 
    // if(userInput.length < 3 || userInput.length > 4 || !isNAN)
    // alert error
    // else if (userInput != listofAllUSCities?)
    //alert error
    // else {}

    //take this later have a whole function for this

    let storedCity = JSON.parse(localStorage.getItem('city'));

    if(!storedCity){

        storedCity = [] // storedCity without this line would equal still nnull
    }

    if(userCity !== ""){
        storedCity.push(userCity) //pushes to local storage's stored cities
        console.log(storedCity);
        localStorage.setItem('city', JSON.stringify(storedCity))

        getLongLat(userCity)

    }

}

function onOpenBrowser() {
    let storedCity = JSON.parse(localStorage.getItem('city'));
    const yourCities = document.getElementById('stored-cities')


    for (let index = 0; index < storedCity.length; index++) {
        console.log(storedCity[index])
        
        if(storedCity[index] != ""){
      
            let addCityName = document.createElement("button")
            
            addCityName.classList = ("city-btn");
            addCityName.textContent = storedCity[index]
            yourCities.appendChild(addCityName)
            
    
        }
      


    }
}


function getLongLat(userCity) {
    const key = '4fc5e45323347f1d5354c5c46d038f4a'
    fetch('https://api.openweathermap.org/data/2.5/find?q=' + userCity + '&units=imperial&appid=' + key)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let lat = data.list[0].coord.lat
            let lon = data.list[0].coord.lon

            console.log(lat + " and " + lon)

            fetchWeatherInfo(userCity, lon, lat)
        })
}


function fetchWeatherInfo(userCity, lon, lat) {
    const key = '4fc5e45323347f1d5354c5c46d038f4a'
    let oneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=' + key

    fetch(oneCallURL)
        .then(response => response.json())
        .then(cityWeather => {
            populateCityWeather(userCity, cityWeather)
            displayFiveDay(userCity, cityWeather)
            // addCityToLocalStorage(userCity)
        })

        .catch(error => {
            console.log('Error:', error);
        })
}

function populateCityWeather(userCity, cityWeather){
    console.log(cityWeather.current.temp)
    const todaysDate = moment().format('M/D/YY')
    const todaysWeatherDiv = document.getElementById('todaysWeather')
    const forecastParent = document.getElementById('forecast')
    const icon = cityWeather.current.weather[0].icon;


    const cityNameP = document.createElement("h4")
    const tempP = document.createElement("p")
    const humidityP = document.createElement("p")
    const windSpeedp = document.createElement("p")
    const uvIndex = document.createElement("p")
    const uvSpanEl = document.createElement("span")

    // const breakEl = document.createElement("br")
  
    //$(todaysWeatherDiv).empty();
    todaysWeatherDiv.innerHTML = "";

    cityNameP.innerHTML = (userCity+': ('+todaysDate+')') + `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Image">`;
    tempP.innerHTML = ("Temperature: "+cityWeather.current.temp+"°F")
    humidityP.innerHTML = ("Humidity: "+cityWeather.current.humidity)
    windSpeedp.innerHTML = ("Wind Speed: "+cityWeather.current.wind_speed)
    uvIndex.innerHTML = ("UV Index: ")
    uvSpanEl.innerHTML = (cityWeather.current.uvi)


    todaysWeatherDiv.append(cityNameP)
    todaysWeatherDiv.append(tempP)
    todaysWeatherDiv.append(humidityP)
    todaysWeatherDiv.append(windSpeedp)
    todaysWeatherDiv.append(uvIndex)
    todaysWeatherDiv.append(uvSpanEl)
}

function displayFiveDay (userCity, data) {
    const fiveDayRow = $('.five-day-cards');
  
    $(fiveDayRow).empty();

    for (let i = 1; i < 6; i++) {
    let unixDate = data.daily[i].dt
    let date = moment.unix(unixDate).format('M/D/YY');
    let temp = data.daily[i].temp.max + '°';
    let humidity = data.daily[i].humidity + '%';
    let icon = data.daily[i].weather[0].icon

    

    let fiveDayBody = $('<div>')
        .addClass('card-body')
        .addClass('rounded')
        .html(`<h5 class="card-title">${date}</h5>
        <h6><img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Image"></h6>
        <h6 class="card-subtitle">${temp}</h6>
        <p>Humidity: ${humidity}</p>`)

    let fiveDayCard = $('<div>')
        .addClass('card');

    let fiveDayCol = $('<div>')
        .addClass('col removeMe');

    fiveDayCard.append(fiveDayBody);
    fiveDayCol.append(fiveDayCard);
    fiveDayRow.append(fiveDayCol)

    }
}

// populateBox functions
    //
    //grab API info from the JSON object
        //put in 

    //add a box that says clear all cities

//create event delegation which will identify which box has been called to call that API once agains

// function eventHandler(event) {
//     if (event.type == 'fullscreenchange') {
//       /* handle a full screen toggle */
//     } else /* fullscreenerror */ {
//       /* handle a full screen toggle error */
//     }
//   }