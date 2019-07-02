let apiKey = "9b41700e7dcfb48ddf3be545946f91cc";
let city = "Lisbon";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

function showCurrentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector(".currentTemperature").innerHTML = `${temperature} °C`;
}

axios.get(url).then(showCurrentTemperature);
