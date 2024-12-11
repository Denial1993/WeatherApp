import { useState, useEffect, useCallback } from "react";

// CWA-DE6B03EC-9B1B-4114-A6DB-8E461055FAA6
const fetchCurrentWeather = (locationName) => {
  return fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWA-DE6B03EC-9B1B-4114-A6DB-8E461055FAA6&limit=5&StationName=${locationName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const stations = data.records.Station;
      const locationData = stations.find((station) => station.StationName === locationName);
      console.log("locationData: ",locationData)

      return {
        StationName: locationData.StationName,
        ObsTime: locationData.ObsTime.DateTime,
        temperature: locationData.WeatherElement.AirTemperature,
        windSpeed: locationData.WeatherElement.WindSpeed,
        humid: locationData.WeatherElement.RelativeHumidity,
        description: locationData.WeatherElement.Weather,
      };
    });
};

const fetchWeatherForecast = (cityName) => {
  return fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-DE6B03EC-9B1B-4114-A6DB-8E461055FAA6&limit=5&locationName=${cityName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const stations =  data.records.location;
      const locationData =  stations.find((station) => station.locationName === cityName);

      return {
        weatherCodeName: locationData.weatherElement[0].time[0].parameter.parameterName,
        weatherCode: locationData.weatherElement[0].time[0].parameter.parameterValue,
        rainPossibility: locationData.weatherElement[1].time[0].parameter.parameterName,
        comfortably: locationData.weatherElement[3].time[0].parameter.parameterName,
      };
    });
};

const useWeatherApi = (currentLocation) => {
  const { locationName, cityName } = currentLocation;
console.log("currentLocation: ",currentLocation)
console.log("locationName: ",locationName)
console.log("cityName: ",cityName)
  const [weatherElement, setWeatherElement] = useState({
    ObsTime: new Date(),
    StationName: "",
    description: "",
    temperature: 0,
    windSpeed: 0,
    humid: 0,
    weatherCodeName: "default",
    weatherCode: 0, //代碼
    rainPossibility: 0, //降雨機率
    comfortably: "", //舒適度
    isLoading: true,
  });

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherElement] = await Promise.all([fetchCurrentWeather("水湳洞"), fetchWeatherForecast(cityName)]);
      setWeatherElement({
        ...currentWeather,
        ...weatherElement,
        isLoading: false,
      });
    };

    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    fetchingData();
  }, [locationName, cityName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [weatherElement, fetchData];
};

export default useWeatherApi;
