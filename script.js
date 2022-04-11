let now = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(now);

function formatDate(date) {
  let dayIndex = date.getDate();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  return `${day} - ${month}, ${dayIndex}`;
}

let actualHour = document.querySelector("#time");
actualHour.innerHTML = formatTime(now);

function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "f334bb9d485705f6febc3f97f9a7e57c";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(function (response) {
    console.log(response);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#feelsLike").innerHTML = Math.round(
      response.data.main.feels_like
    );
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#temp_max").innerHTML = Math.round(
      response.data.main.temp_max
    );
    document.querySelector("#temp_min").innerHTML = Math.round(
      response.data.main.temp_min
    );
  });
}

let searchForm = document.querySelector("#search-button");
searchForm.addEventListener("click", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "f334bb9d485705f6febc3f97f9a7e57c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(function (response) {
    let temperature = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#temperature");
    currentTemp.innerHTML = `${temperature}`;
    let h1 = document.querySelector("h1");
    h1.innerHTML = response.data.name;
  });
}

let currentButton = document.querySelector("#current-button");

currentButton.addEventListener("click", function (event) {
  navigator.geolocation.getCurrentPosition(showPosition);
});

search("Ottawa");
