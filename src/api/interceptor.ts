import axios from "axios";

const axiosDefault = axios.create({
    baseURL:  "https://api.thecatapi.com/v1",
})  

export default axiosDefault