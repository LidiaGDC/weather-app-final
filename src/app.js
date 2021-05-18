function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp_max);
  console.log(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  let city = document.querySelector("#city");
  let tempMax = document.querySelector("#tempMax");
  let tempMin = document.querySelector("#tempMin");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let date = document.querySelector("#date");

  temperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  date.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "aabb459045170c682b91ab6157b00f6a";
let city = "paris";
let apiURl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiURl).then(showTemperature);
