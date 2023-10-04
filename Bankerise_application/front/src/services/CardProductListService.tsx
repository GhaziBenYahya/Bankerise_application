import axios from "axios";
import { CardProductList } from "views/admin/CardProductList/components/table";

const API_URL = `http://localhost:8080/cardproducts`;

class CardProductListService {
  static getCardProductLists() {
    return axios.get(API_URL);
  }

  static getCardProductListById(cardProductListId: string) {
    const url = `${API_URL}/${cardProductListId}`;
    return axios.get(url);
  }

  static createCardProductList(cardProductList: CardProductList) {
    return axios.post(API_URL, cardProductList);
  }

  static updateCardProductList(cardProductList: CardProductList) {
    const url = `${API_URL}/${cardProductList.id}`;
    return axios.put(url, cardProductList);
  }

  static deleteCardProductList(cardProductListId: string) {
    const url = `${API_URL}/${cardProductListId}`;
    return axios.delete(url);
  }
}

export default CardProductListService;
