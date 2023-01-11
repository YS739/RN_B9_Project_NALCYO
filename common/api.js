const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "4fd038a04c718c64d1c7f8089aa6adb9";

export const getNowWeather = (params) => {
  const [_, WeatherId] = params.queryKey;
  console.log(WeatherId);
<<<<<<< HEAD
  return fetch(`${BASE_URL}id=${WeatherId}&appid=${API_KEY}&units=Metric`).then((res) => res.json());
=======
  return fetch(`${BASE_URL}id=${WeatherId}&appid=${API_KEY}&units=Metric`).then(
    (res) => res.json()
  );
>>>>>>> 0f15aa573184eff0db60404e178d5da766d2ec0b
};
