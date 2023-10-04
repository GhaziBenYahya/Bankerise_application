import axios from "axios";
import { Country } from "views/admin/CountryList/components/table";

const API_URL = `http://localhost:8080/countries`;

class CountryService {
  static getCountries() {
    return axios.get(API_URL);
  }

  static getCountryById(countryId: string) {
    const url = `${API_URL}/${countryId}`;
    return axios.get(url);
  }

  static createCountry(country: Country) {
    return axios.post(API_URL, country);
  }

  static updateCountry(country: Country) {
    const url = `${API_URL}/${country.id}`;
    return axios.put(url, country);
  }

  static deleteCountry(countryId: string) {
    const url = `${API_URL}/${countryId}`;
    return axios.delete(url);
  }
}

export default CountryService;
