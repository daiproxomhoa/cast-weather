export const API_KEY = "1c5da32bd6a0d1c4c017b21b49833c7f";
export const API = {
  getLocation: (city_name: string) =>
    `/api/geo/1.0/direct?q=${city_name},VNM&limit=10&appid=${API_KEY}`,
  getWeatherData: (location: { lat: number; lon: number }) =>
    `/api/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=hourly,minutely&appid=${API_KEY}`,
  getAirPollution: (location: { lat: number; lon: number }) =>
    `/api/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`,
  getIconUrl: (icon: string) => `/api2/img/wn/${icon}@2x.png`,
};
