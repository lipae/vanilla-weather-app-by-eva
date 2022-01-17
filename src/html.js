let timeElapsed = Date.now();
let today = new Date(timeElapsed);

document.querySelector("#date").innerHTML = today.toUTCString();

function showForecast(response) {
  console.log(response);
  let forecastSection = document.querySelector("#forecast-section");
  let forecastIcon = response.data.daily[0].weather[0].icon;
  let weekday = response.data.daily[0];

  //empty string of forecastHTML ist notwendig,
  //um später die wochentage zu loopen,
  //und die folgenden wochentage der reihe nach zu zeigen,
  //ohne sich gegenseitig zu überschreiben

  let forecastHTML = "";
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
      <p id="weekday">${weekday}</p>
        <div id="weather-icon-forecast">
        <img
        src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png"
        alt="weather-description"
        />
        </div>
      <span id="max-min">
      <span id="max">35</span>|<span id="min">5</span>
      </span>
    </div>
  `;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
    <p id="weekday">${weekday}</p>
    <div id="weather-icon-forecast">
      <img
        src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png"
        alt="weather-description"
      />
    </div>
    <span id="max-min">
      <span id="max">35</span>|<span id="min">5</span>
    </span>
    </div>
  `;

  forecastSection.innerHTML = forecastHTML;
}

function showCurrentWeather(response) {
  document.querySelector(".city-name").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  document.querySelector("#degrees").innerHTML = Math.round(celsiusTemperature);

  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#windElement").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidityElement").innerHTML =
    response.data.main.humidity;
  let icon = response.data.weather[0].icon;
  document
    .querySelector("#weather-icon")
    .setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.weather[0].description);
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;

  apiKey = "2ef21ee4568e04db5d3af37dfef78d7b";
  apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(showForecast);
}

city = "San Diego";
apiKey = "2ef21ee4568e04db5d3af37dfef78d7b";
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showCurrentWeather);

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  apiKey = "2ef21ee4568e04db5d3af37dfef78d7b";
  apiUrlLatLon = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlLatLon).then(showCurrentWeather);
}

function fetchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", fetchLocation);

function showSearchCityWeather(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-searchfield").value;
  apiKey = "2ef21ee4568e04db5d3af37dfef78d7b";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", showSearchCityWeather);

// function changeToFahrenheit(event) {
//   event.preventDefault();
//   let fahrenheit = celsiusTemperature * 1.8 + 32;
//   document.querySelector("#degrees").innerHTML = Math.round(fahrenheit);
//   fahrenheitLink.classList.add("active");
//   celsiusLink.classList.remove("active");
// }

// function changeToCelsius(event) {
//   event.preventDefault();
//   document.querySelector("#degrees").innerHTML = Math.round(celsiusTemperature);
//   fahrenheitLink.classList.remove("active");
//   celsiusLink.classList.add("active");
// }

// let celsiusTemperature = null;

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", changeToFahrenheit);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", changeToCelsius);
