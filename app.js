// Setup
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const geocode = require('./utilities/geocode')
const forecast = require('./utilities/forecast')
const app = express()
const port = process.env.PORT || 3000
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/templates/views'))
app.use(express.static('public'))
hbs.registerPartials(path.join(__dirname, '/templates/partials'))
// Code
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Štěpán'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is some text',
    name: 'Štěpán'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Štěpán'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found'
  })
})
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      err: 'You must provide an address!'
    })
  }
  geocode(req.query.address, (err, { longitude, latitude, location } = {}) => {
    if (err) {
      return res.send({ err })
    }
    forecast(longitude, latitude, (err, { data }) => {
      if (err) {
        return res.send({ err })
      }
      res.send({ forecast: data, location: location })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is running on port 3000')
})
