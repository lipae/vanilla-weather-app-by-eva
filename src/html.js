function showCurrentWeather(response) {
  document.querySelector(".city-name").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#windElement").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidityElement").innerHTML =
    response.data.main.humidity;
}
city = "San Diego";
apiKey = "2ef21ee4568e04db5d3af37dfef78d7b";
apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", showSearchCityWeather);
