import axios from "axios";
import { Profession } from "views/admin/ProfessionList/components/table";

const API_URL = `http://localhost:8080/professions`;

class ProfessionService {
  static getProfessions() {
    return axios.get(API_URL);
  }

  static getProfessionById(ProfessionId: string) {
    const url = `${API_URL}/${ProfessionId}`;
    return axios.get(url);
  }

  static createProfession(profession: Profession) {
    return axios.post(API_URL, profession);
  }

  static updateProfession(profession: Profession) {
    const url = `${API_URL}/${profession.id}`;
    return axios.put(url, profession);
  }

  static deleteProfession(ProfessionId: string) {
    const url = `${API_URL}/${ProfessionId}`;
    return axios.delete(url);
  }
}

export default ProfessionService;
