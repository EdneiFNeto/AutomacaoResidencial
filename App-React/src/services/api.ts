import axios from 'axios';
import {IP} from '@env';

const api = axios.create({
  baseURL: `http://${IP}:3000`,
});

export default api;
