import axios from "axios";

function getProducts() {
  return axios.get("/api/products");
}

export default { getProducts };
