import axios from "axios";
import Constants from 'expo-constants';

export const api = axios.create({
    baseURL:"https://adonis-2hv5.onrender.com",
    headers: {
        Accept: 'application/json'
    }
})
