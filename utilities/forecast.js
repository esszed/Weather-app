const request = require('request')
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/b359a7a8f10159258f5eedab5fe29905/${longitude},${latitude}?units=si`
  request({ url, json: true }, (err, res, body) => {
    if (err) {
      callback('Something went wrong. Unable to connect to weather service.')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      callback(undefined, {
        data: `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees. There is a ${body
          .currently.precipProbability * 100}% chance of rain`
      })
    }
  })
}

module.exports = forecast
