let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let day = now.getDay();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let weekDay = weekDays[day];
let month = now.getMonth();
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let monthName = monthNames[month];

function handleSubmit(event) {
  event.preventDefault();
  let keyword = document.querySelector("#keyword");
  search(keyword.value);
}
function showCurrentWeather(response) {
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let place = document.querySelector("#place");
  place.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;

  let displayCurrentDate = document.querySelector("#currentDate");
  displayCurrentDate.innerHTML = `${weekDay}, ${monthName} ${date}, ${year}`;

  let iconCurrentWeather = document.querySelector("#iconCurrentWeather");
  iconCurrentWeather.setAttribute(
    "src",
    "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
  );

  document.getElementById("musicPlayer").style.display = "block";
}

let tomorrow = weekDays[now.getDay() + 1];
let dayAfterTomorrow = weekDays[now.getDay() + 2];
let twoDaysAfterTomorrow = weekDays[now.getDay() + 3];

function showForecast(response) {
  console.log(response.data);
  let displayTomorrow = document.querySelector("#tomorrow");
  displayTomorrow.innerHTML = `${tomorrow}`;
  let iconTomorrowWeather = document.querySelector("#iconTomorrowWeather");
  iconTomorrowWeather.setAttribute(
    "src",
    "http://openweathermap.org/img/w/" +
      response.data.list[7].weather[0].icon +
      ".png"
  );
  let tomorrowTemperature = document.querySelector("#tomorrowTemperature");
  tomorrowTemperature.innerHTML = `${Math.round(
    response.data.list[7].main.temp
  )}°C`;

  let displayDayAfterTomorrow = document.querySelector("#dayAfterTomorrow");
  displayDayAfterTomorrow.innerHTML = `${dayAfterTomorrow}`;
  let iconDayAfterTomorrowWeather = document.querySelector(
    "#iconDayAfterTomorrowWeather"
  );
  iconDayAfterTomorrowWeather.setAttribute(
    "src",
    "http://openweathermap.org/img/w/" +
      response.data.list[15].weather[0].icon +
      ".png"
  );
  let dayAfterTomorrowTemperature = document.querySelector(
    "#dayAfterTomorrowTemperature"
  );
  dayAfterTomorrowTemperature.innerHTML = `${Math.round(
    response.data.list[15].main.temp
  )}°C`;

  let displayTwoDaysAfterTomorrow = document.querySelector(
    "#twoDaysAfterTomorrow"
  );
  displayTwoDaysAfterTomorrow.innerHTML = `${twoDaysAfterTomorrow}`;
  let iconTwoDaysAfterTomorrowWeather = document.querySelector(
    "#iconTwoDaysAfterTomorrowWeather"
  );
  iconTwoDaysAfterTomorrowWeather.setAttribute(
    "src",
    "http://openweathermap.org/img/w/" +
      response.data.list[23].weather[0].icon +
      ".png"
  );
  let twoDaysAfterTomorrowTemperature = document.querySelector(
    "#twoDaysAfterTomorrowTemperature"
  );
  twoDaysAfterTomorrowTemperature.innerHTML = `${Math.round(
    response.data.list[23].main.temp
  )}°C`;
}

function search(city) {
  let apiKey = "9b41700e7dcfb48ddf3be545946f91cc";
  let urlCurrentCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(urlCurrentCity).then(showCurrentWeather);
  let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(urlForecast).then(showForecast);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function displayCurrentWeatherCurrentLocation() {
  function showWeatherCurrentLocation(response) {
    let place = document.querySelector("#place");
    place.innerHTML = response.data.name;

    let currentTemperature = document.querySelector("#currentTemperature");
    currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;

    let weatherDescription = document.querySelector("#weatherDescription");
    weatherDescription.innerHTML = response.data.weather[0].description;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;

    let displayCurrentDate = document.querySelector("#currentDate");
    displayCurrentDate.innerHTML = `${weekDay}, ${monthName} ${date}, ${year}`;
  }

  function newPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "9b41700e7dcfb48ddf3be545946f91cc";
    let urlCurrentGPS = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(urlCurrentGPS).then(showCurrentWeather);
    let urlForecastGPS = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(urlForecastGPS).then(showForecast);
  }
  navigator.geolocation.getCurrentPosition(newPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", displayCurrentWeatherCurrentLocation);
