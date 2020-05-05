import axios from "axios";

//Token pipedrive
const token = process.env.PIPEDRIVE;

//Required in Pipedrive API
const api = axios.create({
  baseURL: `https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=${token}`,
});

export default api;
