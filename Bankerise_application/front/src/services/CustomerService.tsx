import axios from "axios";
import { Customer} from "views/admin/Customer/components/table";

const API_URL = `http://localhost:8080/customer`;

class CustomerService {
  static getCustomer() {
    return axios.get(API_URL);
  }

  static getCustomerById(customerId: number) {
    const url = `${API_URL}/${customerId}`;
    return axios.get(url);
  }

  static createCustomer(customer: Customer) {
    return axios.post(API_URL, customer);
  }

  static updateCustomer(customer: Customer) {
    const url = `${API_URL}/${customer.id}`;
    return axios.put(url, customer);
  }

  static deleteCustomer(customerId: number) {
    const url = `${API_URL}/${customerId}`;
    return axios.delete(url);
  }
}

export default CustomerService;