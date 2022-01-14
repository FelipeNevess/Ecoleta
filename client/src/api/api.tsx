import axios from "axios";


const api = axios.create({
  baseURL: 'https://ecoletan.herokuapp.com/'
});

export { api }
