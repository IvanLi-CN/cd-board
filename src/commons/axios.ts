import Axios from "axios-observable";

export const axios = Axios.create({
  baseURL: '/api',
});

// axios.interceptors.response.use(response => {
//   return response.data
// })
