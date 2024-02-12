const router = require('express').Router()
let SensorData = require('../models/sensor.model')

router.route('/').get((req, res) => {
  SensorData.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const air_quality = Number(req.body.air_quality)
  const temperature = Number(req.body.temperature)
  const humidity = Number(req.body.humidity)
  const sound_level = Number(req.body.sound_level)
  const water_ph = Number(req.body.water_ph)
  const wind_speed = Number(req.body.wind_speed)

  const newSensorData = new SensorData({
    air_quality,
    temperature,
    humidity,
    sound_level,
    water_ph,
    wind_speed,
  })

  newSensorData
    .save()
    .then(() => res.json('Sensor Data added!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
  SensorData.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
  SensorData.findByIdAndDelete(req.params.id)
    .then(() => res.json('Sensor Data deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
  SensorData.findById(req.params.id)
    .then((data) => {
      data.air_quality = Number(req.body.air_quality)
      data.temperature = Number(req.body.temperature)
      data.humidity = Number(req.body.humidity)
      data.water_ph = Number(req.body.water_ph)
      data.sound_level = Number(req.body.sound_level)
      data.wind_speed = Number(req.body.wind_speed)

      data
        .save()
        .then(() => res.json('Sensor Data updated!'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router
