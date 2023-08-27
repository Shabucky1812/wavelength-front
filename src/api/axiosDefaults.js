import axios from "axios";

axios.defaults.baseURL = "https://wavelength-api-37226842e140.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
