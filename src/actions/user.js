import {CREATE_USER} from './types';
import axios from 'axios';

export const createUser = (user) => {
    
    let request = axios.post(`${process.env.REACT_APP_URL_API}user/`, user);

    return({
        type: CREATE_USER,
        payload: request
    })
};