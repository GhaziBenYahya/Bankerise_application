import axios from "axios";
import { SwiftAddress } from "views/admin/SwiftAddressList/components/table";

const API_URL = `http://localhost:8080/swiftaddressList`;

class SwiftAdressService {
  static getSwiftAddresses() {
    return axios.get(API_URL);
  }

  static getSwiftAddressById(swiftAddressId: string) {
    const url = `${API_URL}/${swiftAddressId}`;
    return axios.get(url);
  }

  static createSwiftAddress(swiftAddress: SwiftAddress) {
    return axios.post(API_URL, swiftAddress);
  }

  static updateSwiftAddress(swiftAddress: SwiftAddress) {
    const url = `${API_URL}/${swiftAddress.id}`;
    return axios.put(url, swiftAddress);
  }

  static deleteSwiftAddress(swiftAddressId: string) {
    const url = `${API_URL}/${swiftAddressId}`;
    return axios.delete(url);
  }
}

export default SwiftAdressService;
