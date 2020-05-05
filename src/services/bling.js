import axios from "axios";

//Required in Bling API
const api = axios.create({
  baseURL: `https://bling.com.br/Api/v2/`,
});

export default api;
