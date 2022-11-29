import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import WeatherDisplay from "./WeatherDisplay";

const WeatherInfo = ({ api_key, currentLat, currentLong }) => {
  const [currentCity, setCurrentCity] = useState();
  const [weatherData, setWeatherData] = useState({
    temp: null,
    weather: null,
  });

  const getCurrentWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${api_key}&units=metric`
    )
      .then((res) => res.json())
      .then((body) => {
        setCurrentCity(body.name);
        setWeatherData({
          temp: body.main.temp,
          weather: body.weather[0].description,
        });
      })
      .catch((e) => console.log(e));
  };

  //checking if currentLat and CurrentLong has a value before calling GetCurrentWeather
  useEffect(() => {
    if (currentLat && currentLong) {
      getCurrentWeather();
    }
  }, [currentLat, currentLong]);

  return (
    <View style={styles.currentLocationStyle}>
      <WeatherDisplay currentCity={currentCity} weatherData={weatherData} />
    </View>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  currentLocationStyle: {
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
