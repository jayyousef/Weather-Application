const searchButton = document.getElementById('searchButton')

searchButton.addEventListener('click', getUserCity)

function getUserCity() {
    let searchInput = document.getElementById('cityInput')
    let userCity = searchInput.value

    console.log(userCity)

    userCity = userCity.trim()

    //add user validation? 
    // if(userInput.length < 3 || userInput.length > 4)
    // alert error
    // else if (userInput != listofAllTickers)
    //alert error
    // else {}

    //take this later have a whole function for this
    localStorage.setItem('city', userCity)

    getLongLat(userCity)

}

function getLongLat(userCity) {
    const key = '4fc5e45323347f1d5354c5c46d038f4a'
    fetch('https://api.openweathermap.org/data/2.5/find?q='+userCity+'&units=imperial&appid='+key)
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
    //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    
    const key = '4fc5e45323347f1d5354c5c46d038f4a'
    let oneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon=' + lon + '&exclude=hourly,daily&appid='+key

    fetch(oneCallURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // let userCity = data['Global Quote']
        })

        .catch(error => {
            console.log('Error:', error);
        })
}

        //catch if(an error happens)
        //Populate box "an error occured! Please try again or refresh the page"
        //return
        //if no errors
        //set sity to local storage
        //add that button under the search bar in the ".cities-box" DIV
        //call populateBox function
    //



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