const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "4fd038a04c718c64d1c7f8089aa6adb9";

export const getNowWeather = () =>
  fetch(`${BASE_URL}id=1845457&appid=${API_KEY}&units=Metric`).then((res) =>
    res.json()
  );
