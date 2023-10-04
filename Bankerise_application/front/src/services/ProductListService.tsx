import axios from "axios";
import { ProductList } from "views/admin/ProductList/components/table";

const API_URL = `http://localhost:8080/products`;

class ProductService {
  static getProductLists() {
    return axios.get(API_URL);
  }

  static getProductListById(productId: string) {
    const url = `${API_URL}/${productId}`;
    return axios.get(url);
  }

  static createProductList(productList: ProductList) {
    return axios.post(API_URL, productList);
  }

  static updateProductList(productList: ProductList) {
    const url = `${API_URL}/${productList.id}`;
    return axios.put(url, productList);
  }

  static deleteProductList(productId: string) {
    const url = `${API_URL}/${productId}`;
    return axios.delete(url);
  }
}

export default ProductService;
