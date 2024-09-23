import dotenv from 'dotenv';
//import axios from 'axios'; //not sure i need to add this or not
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  longitude: number;
  latitude: number
}

// TODO: Define a class for the Weather object

class Weather {
  temp: number;
  wind: number;
  humidity: number;

  constructor(temp: number, wind: number, humidity: number) {
    this.temp = temp;
      this.wind = wind;
      this.humidity = humidity;
  }

}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private cityName: string;
  private baseURL: string;
  private apiKey: string | undefined;
  

  constructor(cityName: string) {
    this.cityName = cityName;
    this.baseURL = 'https://api.openweathermap.org'; 
    this.apiKey = process.env.API_KEY;
  

  if(!this.apiKey) {
    throw new Error ('API Key is not defined'); 
  }

}

  //skeleton code to get coordinates not sure this is right yet?
  async getWeatherByCoordinates(coords: Coordinates): Promise<Weather> {
    //const response = await axios.get(`${this.baseURL}?lat=${coords.latitude}&lon=${coords.longitude}&appId=${this.apiKey}`);
    const url=`${this.baseURL}/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appId=${this.apiKey}`;
     
    try{
      const response=await fetch(url); 

      if (!response.ok) {
        throw new Error (`HTTP error! Status: ${response.status}`); 
      }
    
    
    const data = await response.json();
    const temp = data.main.temp;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;

    return new Weather(temp, wind, humidity);

  }

  catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
  }
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string)
  private async fetchLocationData(lat: number, long: number) {
    //const apiBaseUrl = process.env.API_BASE_URL
    const url=`${this.baseURL}/data/2.5/weather?lat=${lat}&lon=${long}&appId=${this.apiKey}`; 
    //const apiKey = process.env.API_KEY
    //const url = `${apiBaseUrl}/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
    
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
      
    }

    catch (error) {
      console.error("Error fetching location data:", error);
      throw error;
    }



  }
//}


  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any) {
  const { lat: latitude, lon: longitude, name: city } = locationData;  

  //extract coordinates from location
  return {
    latitude, longitude, city
  };
}
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string, limit: number = 1): string {
  //const apiKey = process.env.API_KEY
  return `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${this.apiKey}`
  //return geoCode

}

  // TODO: Create buildWeatherQuery method
  //private buildWeatherQuery(coordinates: Coordinates): string {
  private buildWeatherQuery(latitude: number, longitude: number): string {

  //const apiKey = process.env.API_KEY
  const buildWeather = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`
  return buildWeather

}
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string) {
  const geoCodeQuery = this.buildGeocodeQuery(city); 
  const response = await fetch(geoCodeQuery); 
    //method: 'GET',
    //headers: {
      //'Content-Type': 'application/json',
    

    if (!response.ok) {
    throw new Error(`Response was not okay:${response.statusText}`);
  }

  const locationData = await response.json(); 
  return this.destructureLocationData(locationData[0]); 

//    catch (error) {
//   console.error(`Error Received`, error);
//   throw error
// }

}
    
 
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
  const weatherQuery = this.buildWeatherQuery(coordinates.latitude, coordinates.longitude);
  const response = await fetch(weatherQuery); 
   

    if (!response.ok) {
      throw new Error ('Error was received');
    }

    //const weatherForCity=await response.json(); 
    //const {latitude, longitude}=weatherForCity
    //return weatherForCity

    return await response.json(); 

  }



  
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) 
  private parseCurrentWeather (data: any ){
    //get the weather
    const currentWeather=data.list[0];//first forecast entry
    return {
      
        cityName:data.city.name,
        temprature:currentWeather.main.feels_like, 
        humidity:currentWeather.list.humidity, 
        windSpeed:currentWeather.wind.speed

      

    };
  }

   

  //}
  // TODO: Complete buildForecastArray method
  private buildForecastArray(_currentWeather: Weather, weatherData: any[]) {
    //const weatherData=[]

    return weatherData.map(forecast=>({
       

        temp: forecast.main.feels_like,
        humidity: forecast.list.humidity,
        windSpeed: forecast.wind.speed
        

        
        })); 

        //weatherData.push(dailyForeCast);

       
    

    //return weatherData; 

    }

    
  
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    //const apiKey=process.env.API_KEY
    //const cityUrl=`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit={1}&appid=${apiKey}`
    
    try {
   const {latitude, longitude}=await this.fetchAndDestructureLocationData(city); 
   const weatherData=await this.fetchWeatherData({latitude, longitude}); 
   return this.parseCurrentWeather(weatherData);

    }

    catch (error) {
      console.error ('there was a problem with the fetch operation:', error); 
      throw error;
    }
    // fetch(cityUrl)
    // .then(response=> response.json())
    // .then(data=> {
    //   const lat=data[0].lat;
    //   const lon=data[0].lon; 

    //   return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    // })

    // .then (response=>response.json())
    // .then(weatherData=> {
    //   const temp=weatherData.list[0].main.temp;
    //   const windSpeed=weatherData.list[0].wind.speed;
    //   const humidity=weatherData[0].main.humidity; 
    // })
    

    // .catch(error=>{
    //   console.error('There was a problem with the fetch operation:', error)
    // })
  }
}




export default new WeatherService();
