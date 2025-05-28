import axios from 'axios';

// ATENÇÃO: Troque pelo seu IP local caso use em dispositivo físico
const api = axios.create({
  baseURL: 'http://192.168.0.100:8080/api' // ex: http://192.168.1.10:8080/api
});

export default api;
