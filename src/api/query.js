import axios from 'axios';
import {API_TOKEN, API_URL} from './apiServer';

const query = axios.create({
    baseURL: API_URL,
    timeout:30000,
    headers:{
        Authorization: 'Bearer ' + API_TOKEN
    }
})
export default query;