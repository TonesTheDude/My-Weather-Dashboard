import fs from 'node:fs/promises'
class City {
  name: string;
  id: string

  constructor(name:string, id:string){
    this.name = name; 
    this.id = id
  }
}
class HistoryService {
  private async read() {
    return await fs.readFile('db/db.json', {
      flag:'a+',
      encoding:'utf-8'
    })
  }
 private async write(cities: City[]) {
    return await fs.writeFile("db/db.json", JSON.stringify(cities))
  }
  async getCities():Promise<City[]> {
    return await this.read().then(data => {
      return [].concat(JSON.parse(data as string))
    })
  }
  async addCity(city: string) {
    const newCity = {
      name: city,
      id: Math.random()
    }
    return await this.getCities().then(existingCities => {
      console.log(existingCities)
      if (existingCities.find(currentCity => 
        currentCity.name === city
      )){
        return existingCities
      }
      else {
        return [...existingCities, newCity]
      }
    }).then(updatedCities => {
      console.log(updatedCities)
      return this.write(updatedCities as City[])}).then(() => newCity)
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
