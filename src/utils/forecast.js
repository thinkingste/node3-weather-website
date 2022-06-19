const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    `http://api.weatherstack.com/current?access_key=abf107ad53557bc083cc0e7e35d8dc0c&query=${latitude},${longitude}`;
  request({ url: url }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
      return;
    }
    const data = JSON.parse(response.body);
    if (data.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${data.current.weather_descriptions[0]}. It's currently ${data.current.temperature} degress out. It feels like ${data.current.feelslike} degress out.`
      );
    }
  });
};

module.exports = {
  forecast:forecast,
}