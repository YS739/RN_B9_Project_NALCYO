const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"; // url
const API_KEY = "4fd038a04c718c64d1c7f8089aa6adb9"; // api key

export const getNowWeather = () => {
  fetch(`${BASE_URL}id=1845457&appid=${API_KEY}&units=Metric&lang=kr`)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
  // console.log(JSON.stringify(nowWeather.weather[0].main));
  setIsLoading(false);
};
