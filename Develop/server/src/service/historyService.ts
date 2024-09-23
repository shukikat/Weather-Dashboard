import fs from 'node:fs/promises';

// TODO: Define a City class with name and id properties--SK In progress
class City {
  name: string;
  id: string;

  constructor(

    name: string,
    id: string
  ) {
    this.name = name;
    this.id = id;

  }



}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file--in PROGRESS
  private async read() {

    try {
      const data = await fs.readFile('searchHistory.json', 'utf8');
      return JSON.parse(data); //returns data in JSON format 
    }





    catch (err) {
      console.log("Error reading the file", err);
      return []; //note the error

    }


    // }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file-SK DONe-but need to check
  private async write(cities: City[]) {

    const cityArray = cities.map(city => ({
      name: city.name,
      id: city.id
    }));

    try {
      await fs.writeFile('searchHistory.json', JSON.stringify(cityArray, null, 2));
      console.log('Cities added!');

    }

    catch (error) {
      console.error('Error writing to file', error);
    }

  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {

    const cities = await this.read();

    return cities.map((city: { name: string; id: string; }) => new City(city.name, city.id)); // convert city object to instances




  }





  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {

  if (!city) {
    throw new Error('Please add a city'); //not sure this is correct
  }

  const newCity: City = {
    name: city.trim(), 
    id: generateUniqueId()

  };

  const existingCities = await this.getCities();
  const updatedCities = [...existingCities, newCity];
  await this.write(updatedCities);
  return newCity;



}

}


// * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
// async removeCity(id: string) {}


export default new HistoryService();
function generateUniqueId(): string {
  throw new Error('Function not implemented.');
}


function addCity(_city: any, _string: any) {
  throw new Error('Function not implemented.');
}
