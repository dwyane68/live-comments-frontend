import axios from 'axios';
import { apiBaseURL } from './config';

axios.defaults.baseURL =  apiBaseURL;

axios.interceptors.request.use(
  (config) => {
    if(localStorage.getItem('token')){
      config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    console.error("Interceptor : Error occured due to : ", error);
    return Promise.reject(error);
  }
);

//Interceptor To be used to intercept all the responses and if 401, and session
axios.interceptors.response.use((response) => {
    return response;
  }, (error) =>{
  if(error.response.status === 401){
    localStorage.clear();
    window.location.href = '/';

  }
  else return Promise.reject(error);
});