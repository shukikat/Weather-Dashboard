import dotenv from 'dotenv';
import axios from 'axios'; //not sure i need to add this or not
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
   humidity: number

   constructor (temp: number, wind: number, humidity: number) {
    this.temp=temp, 
    this.wind=wind, 
    this.humidity=humidity
   }

}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string

 constructor(cityName: string){
  this.cityName=cityName; 
  this.baseURL='https://api.openweathermap.org'
  this.apiKey=process.env.API_KEY
 }

 //skeleton code to get coordinates not sure this is right yet?
 async getWeatherbyCoordinates (coords: Coordinates): Promise <Weather>{
  const response=await axios.get(`${this.baseURL}?lat=${coords.latitude}&lon${coords.longitude}&appId=${this.apiKey}`);
  const data=response.data; 
 

 const temp=data.list[0].main.temp;
 const wind=data.list[0].wind.speed;
 const humidity=data.list[0].main.humidity;
  
 return new Weather (temp, wind, humidity); 

  }

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string)
  private async fetchLocationData(lat: number, long: number) {
    const apiBaseUrl=process.env.API_BASE_URL
    const apiKey=process.env.API_KEY
    const url = `${apiBaseUrl}/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`
   try{
    const response =await fetch(url); 

    if (!response.ok) {
      throw new Error (`HTTP error! status: ${response.status}`); 
    }

    const data=await response.json (); 
    return data;
   }

   catch (error) {
    console.error ("Error fetching location data:", error); 
    throw error; 
   }

   

    }
  }
  
  
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any) {
    const {latitude, longitude, city}=locationData

     //extract coordinates from location
    return {
      latitude, longitude, city
     };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string, limit:number=1): string {
    const apiKey=process.env.API_KEY
    const geoCode=`http://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=${limit}&appid=${apiKey}`
    return geoCode

  }

  // TODO: Create buildWeatherQuery method
  //private buildWeatherQuery(coordinates: Coordinates): string {
  private buildWeatherQuery(latitude:number, longitude: number): string {
    
    const apiKey=process.env.API_KEY
    const buildWeather=`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    return buildWeather

  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
