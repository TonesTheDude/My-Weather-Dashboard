import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

router.post('/', async (req: Request, res: Response) => {
  const {cityName} = req.body
  const weatherData = await WeatherService.getWeatherForCity(cityName)

  HistoryService.addCity(cityName)
  res.json(weatherData)
});

router.get('/history', async (_req: Request, res: Response) => {
  const existingCities = await HistoryService.getCities()
  res.json(existingCities)
});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
