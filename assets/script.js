const searchButton = document.getElementById('searchButton')

searchButton.addEventListener('click', getUserCity)


onOpenBrowser()


$('.city-btn').on("click", function () {

    let userCity = $(this).text()

    getLongLat(userCity)
})



function getUserCity() {
    let searchInput = document.getElementById('cityInput')
    let userCity = searchInput.value
    const yourCities = document.getElementById('stored-cities')

    userCity = userCity.trim()
    let firstLetter = userCity.charAt(0).toUpperCase()
    let remainder = userCity.slice(1).toLowerCase()
    userCity = firstLetter+remainder

    console.log(userCity)

    let storedCity = JSON.parse(localStorage.getItem('city'));

    if (!storedCity) {

        storedCity = [] // storedCity without this line would equal still nnull
    }

    if (userCity !== "") {

        //1 get the current localstorage cities
        //2parse if exists and then assign to value
        //else write new value 
        //if it does exist + parsed
        //storedCities.includes(userCity)
        // if true then ignore
        //else store city

        storedCity.push(userCity) //pushes to local storage's stored cities

        localStorage.setItem('city', JSON.stringify(storedCity))

        let addCityName = document.createElement("button")

        newestCity = storedCity.length
        addCityName.classList = ("city-btn");
        addCityName.textContent = storedCity[newestCity - 1]
        yourCities.appendChild(addCityName)

        getLongLat(userCity)

    }

}

function onOpenBrowser() {
    let storedCity = JSON.parse(localStorage.getItem('city'));
    const yourCities = document.getElementById('stored-cities')


    if (storedCity != null) {
        for (let index = 0; index < storedCity.length; index++) {

            if (storedCity[index] != "") {

                let addCityName = document.createElement("button")

                addCityName.classList = ("city-btn");
                addCityName.textContent = storedCity[index]
                yourCities.appendChild(addCityName)
                yourCities.appendChild(document.createElement("br"))
            }
        }
    }
}


function getLongLat(userCity) {
    const key = '4fc5e45323347f1d5354c5c46d038f4a'
    fetch('https://api.openweathermap.org/data/2.5/find?q=' + userCity + '&units=imperial&appid=' + key)
        .then(response => response.json())
        .then(data => {

            let lat = data.list[0].coord.lat
            let lon = data.list[0].coord.lon


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

function populateCityWeather(userCity, cityWeather) {

    const todaysDate = moment().format('M/D/YY')
    const todaysWeatherDiv = document.getElementById('todaysWeather')
    const forecastParent = document.getElementById('forecast')
    const icon = cityWeather.current.weather[0].icon;


    const cityNameP = document.createElement("h4")
    const tempP = document.createElement("p")
    const humidityP = document.createElement("p")
    const windSpeedp = document.createElement("p")
    const uvIndex = document.createElement("p")
    // const uvSpanEl = document.createElement("span")

    //$(todaysWeatherDiv).empty();
    todaysWeatherDiv.innerHTML = "";

    cityNameP.innerHTML = (userCity + ': (' + todaysDate + ')') + `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Image">`;
    tempP.innerHTML = ("Temperature: " + cityWeather.current.temp + "°F")
    humidityP.innerHTML = ("Humidity: " + cityWeather.current.humidity)
    windSpeedp.innerHTML = ("Wind Speed: " + cityWeather.current.wind_speed)
    uvIndex.innerHTML = ("UV Index: " + cityWeather.current.uvi)
    // uvSpanEl.innerHTML = (cityWeather.current.uvi)

    cityNameP.classList.add('text-light')

    if(cityWeather.current.uvi <= 2){
        uvIndex.classList.add('.bg-success', 'text-success')
    }
    else if (cityWeather.current.uvi >2 && cityWeather.current.uvi <=7) {
        uvIndex.classList.add('.bg-warning', 'text-warning')
    } else {
        uvIndex.classList.add('.bg-danger', 'text-danger')
    }
    
    todaysWeatherDiv.append(cityNameP)
    todaysWeatherDiv.append(tempP)
    todaysWeatherDiv.append(humidityP)
    todaysWeatherDiv.append(windSpeedp)
    todaysWeatherDiv.append(uvIndex)
    // todaysWeatherDiv.append(uvSpanEl)
}

function displayFiveDay(userCity, data) {
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
            .addClass('col');

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


