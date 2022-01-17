import axios from "axios";


const api = axios.create({
  baseURL: 'https://ecoletan.herokuapp.com/' || 'http://localhost:3333'
});

export { api }
