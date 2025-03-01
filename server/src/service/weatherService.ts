import dotenv from 'dotenv';
dotenv.config();

class WeatherObject {
  city: string;
  date: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  iconDescription: string

  constructor(city: string, date: string, tempF: number, windSpeed: number, humidity: number, icon: string, iconDescription: string){
    this.city = city
    this.date = date
    this.tempF = tempF
    this.windSpeed = windSpeed
    this.humidity = humidity
    this.icon = icon
    this.iconDescription = iconDescription
  }
}

class WeatherService {
  private buildForecastArray(weatherData: any[], currentCity: string) {
    const weatherArray = [] as any
    for (let index = 0; index < weatherData.length; index++) {
      if (index % 8 === 0){
        const element = weatherData[index];
        const formattedDate = new Date(element.dt_txt)
        const currentWeather = new WeatherObject(
          currentCity,
         formattedDate.toLocaleDateString("en-US", {month : "numeric", day : "numeric", year : "numeric"}),
          element.main.temp,
          element.wind.speed,
          element.main.humidity,
          element.weather[0].icon,
          element.weather[0].description
        )
        weatherArray.push(currentWeather)
      }
    }
    return weatherArray;
  }
  async getWeatherForCity(city: string) {
   try{
    const coordinates = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=51c30855e21a762767133c7011602457`).then(
      data => data.json()
    )
    const {lat, lon} = coordinates[0]
    const weatherData = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=51c30855e21a762767133c7011602457`).then(
      data => data.json()
    )
    const formattedWeatherData = this.buildForecastArray(weatherData.list, city)
    return formattedWeatherData
   }
   catch (e){
    console.log(e)
   }
  
  } 
}

export default new WeatherService();
