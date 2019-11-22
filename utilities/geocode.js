const request = require('request')
const geocode = (adress, callback) => {
  const url = ` https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?access_token=pk.eyJ1Ijoic3RlcGFueiIsImEiOiJjazM5MWZtZ2UwZWJnM2JveW5naHQ0bjZxIn0.11Rjik-1J3TYmcpFjHzt5g&limit=1`
  request({ url, json: true }, (error, response, {features}) => {
    if (error) {
      callback('Unable to connect to location services!')
    } else if (features.length === 0) {
      callback('Unable to find location. Try another search.')
    } else {
      callback(undefined, {
        longitude: features[0].center[0],
        latitude: features[0].center[1],
        location: features[0].place_name
      })
    }
  })
}

module.exports = geocode
