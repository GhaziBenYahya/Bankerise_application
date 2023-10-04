import axios from "axios";
import { Industry } from "views/admin/IndustryList/components/table";

const API_URL = `http://localhost:8080/industries`;

class IndustryService {
  static getIndustries() {
    return axios.get(API_URL);
  }

  static getIndustryById(industryId: string) {
    const url = `${API_URL}/${industryId}`;
    return axios.get(url);
  }

  static createIndustry(industry: Industry) {
    return axios.post(API_URL, industry);
  }

  static updateIndustry(industry: Industry) {
    const url = `${API_URL}/${industry.id}`;
    return axios.put(url, industry);
  }

  static deleteIndustry(industryId: string) {
    const url = `${API_URL}/${industryId}`;
    return axios.delete(url);
  }
}

export default IndustryService;
