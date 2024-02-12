import { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function App() {
  const [aq, setAq] = useState('')
  const [temp, settemp] = useState('')
  const [humi, sethumi] = useState('')
  const [wp, setwp] = useState('')
  const [l, setl] = useState('')
  const [wpp, setwpp] = useState('')
  const [update, setUpdate] = useState(false)
  const [id, setId] = useState('')

  const handleAQ = (e) => {
    e.preventDefault()
    const air_quality = e.target.value
    console.log(air_quality)
    setAq(air_quality)
  }

  const handletemp = (e) => {
    e.preventDefault()
    const Temprature = e.target.value
    console.log(Temprature)
    settemp(Temprature)
  }

  const handlehumi = (e) => {
    e.preventDefault()
    const Humidity = e.target.value
    console.log(Humidity)
    sethumi(Humidity)
  }

  const handlewp = (e) => {
    e.preventDefault()
    const Water_ph = e.target.value
    console.log(Water_ph)
    setwp(Water_ph)
  }
  const handlel = (e) => {
    e.preventDefault()
    const Sound_level = e.target.value
    console.log(Sound_level)
    setl(Sound_level)
  }
  const handlewpp = (e) => {
    e.preventDefault()
    const Wind_speed = e.target.value
    console.log(Wind_speed)
    setwpp(Wind_speed)
  }

  const {
    data,
    isFetching,
    error: err,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['sensor'],
    queryFn: () => fetchSensorData(),
    enabled: false,
  })

  const fetchSensorData = async () => {
    return await axios.get('http://localhost:4000/sensor/')
  }

  const handleSubmit = () => {
    refetch()
  }

  const submitData = () => {
    if (update == false) {
      axios
        .post('http://localhost:4000/sensor/add', {
          air_quality: aq,
          temperature: temp,
          humidity: humi,
          sound_level: l,
          water_ph: wp,
          wind_speed: wpp,
        })
        .then((res) => {
          console.log(res)
          refetch()
          setAq('')
          settemp('')
          setwp('')
          setwpp('')
          setl('')
          sethumi('')
          setId('')
          setUpdate(false)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios
        .post(`http://localhost:4000/sensor/update/${id}`, {
          air_quality: aq,
          temperature: temp,
          humidity: humi,
          sound_level: l,
          water_ph: wp,
          wind_speed: wpp,
        })
        .then((res) => {
          console.log(res)
          refetch()
          setAq('')
          settemp('')
          setwp('')
          setwpp('')
          setl('')
          sethumi('')
          setId('')
          setUpdate(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const updateData = (sd) => {
    setAq(sd.air_quality)
    settemp(sd.temperature)
    setwp(sd.water_ph)
    setwpp(sd.wind_speed)
    setl(sd.sound_level)
    sethumi(sd.humidity)
    setId(sd._id)
    setUpdate(true)
  }

  const deleteData = (id) => {
    axios
      .delete(`http://localhost:4000/sensor/${id}`)
      .then((res) => {
        console.log(res)
        refetch()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="container">
      <h1>Sensor Data</h1>
      <label htmlFor="air_quality">Air Quality</label>
      <input min={1} type="number" name="air_quality" id="air_quality" value={aq} onChange={handleAQ} />

      <label htmlFor="temperature">Temprature</label>
      <input min={1} type="number" name="temperatures" id="temperatures" value={temp} onChange={handletemp} />

      <label htmlFor="humidity">Humidity</label>
      <input min={1} type="number" name="humidity" id="humidity" value={humi} onChange={handlehumi} />

      <label htmlFor="water_ph">Water_ph</label>
      <input min={1} type="number" name="Water_ph" id="Water_ph" value={wp} onChange={handlewp} />

      <label htmlFor="sound_level">Sound_level</label>
      <input min={1} type="number" name="sound_level" id="sound_level" value={l} onChange={handlel} />

      <label htmlFor="wind_speed">Wind_speed</label>
      <input min={1} type="number" name="wind_speed" id="wind_speed" value={wpp} onChange={handlewpp} />
      <br />
      <div className="btns">
        <button onClick={submitData}>Submit</button>
        <button onClick={handleSubmit}>Fetch All Data</button>
      </div>

      <br />
      {isError && <p>{err}</p>}
      {isFetching && <p>Loading...</p>}
      {data?.data?.length > 0 && <h3>Sensor Log</h3>}
      {data?.data?.length > 0 &&
        data?.data?.map((sd) => {
          return (
            <div key={sd._id}>
              <div>
                <span style={sd.air_quality > 30 ? { background: 'red' } : { background: 'white' }}>{sd.air_quality} </span>,
                <span style={sd.temperature > 30 ? { background: 'red' } : { background: 'white' }}>{sd.temperature} </span>,
                <span style={sd.humidity > 30 ? { background: 'red' } : { background: 'white' }}>{sd.humidity} </span>,
                <span style={sd.water_ph > 30 ? { background: 'red' } : { background: 'white' }}>{sd.water_ph} </span>,
                <span style={sd.sound_level > 30 ? { background: 'red' } : { background: 'white' }}>{sd.sound_level} </span>
                <span style={sd.wind_speed > 30 ? { background: 'red' } : { background: 'white' }}>{sd.wind_speed} </span>,<button onClick={() => updateData(sd)}>Update</button>
                <button onClick={() => deleteData(sd._id)}>Delete</button>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default App
