import axios from "axios";
import { Bank } from "views/admin/BankList/components/table";

const API_URL = `http://localhost:8080/banks`;

class BankService {
  static getBanks() {
    return axios.get(API_URL);
  }

  static getBankById(bankId: string) {
    const url = `${API_URL}/${bankId}`;
    return axios.get(url);
  }

  static createBank(bank: Bank) {
    return axios.post(API_URL, bank);
  }

  static updateBank(bank: Bank) {
    const url = `${API_URL}/${bank.id}`;
    return axios.put(url, bank);
  }

  static deleteBank(bankId: string) {
    const url = `${API_URL}/${bankId}`;
    return axios.delete(url);
  }
}

export default BankService;
