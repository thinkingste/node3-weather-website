const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidGhpbmtpbmdzdGUiLCJhIjoiY2wzcXlrbjl6MGJpNDNjbXVpMTFhN3MyYyJ9.AJ4wwlN4T2YvUlXJLdf-vQ`;
  // console.log(response.body.features);
  request({ url: url }, (error, response) => {
    if (error) {
      callback("Unable to connect to geocoding service!", undefined);
      return;
    }
    const data = JSON.parse(response.body);
    if (data.features.length === 0) {
      callback("Unable to find the coordinate!", undefined);
    } else {
      callback(undefined, {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name
      });
    }
  });
};

module.exports = {
  geocode: geocode,
}