import { Router } from 'express';
import weatherService from '../../service/weatherService';
const router = Router();

import HistoryService from '../../service/historyService.js';

// import WeatherService from '../../service/weatherService.js';


// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  const cityName=req.body.name

  if (cityName) {
    try {
    const weatherData=await weatherService.getWeatherForCity(cityName);
    

  // TODO: save city to search history
  const newCity=await HistoryService.addCity(cityName);
  res.json({weatherData, newCity});
}

  catch (error) {
    res.status(500).send('Error in retrieving weather data or saving city')
  }

}
  else {

    res.status(400).send('Error in getting the city')
  }



});

// TODO: GET search history
router.get('/history', async (req, res) => {

  try {
  const readHistory=await HistoryService.getCities();
  res.json({readHistory});
  }

  catch(error) {
    res.status(400).send('Error in retrieving cities')
  }

});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
