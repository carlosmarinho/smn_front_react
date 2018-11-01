import _ from 'lodash';
import axios from 'axios';
import { AUTHENTICATE } from "./types";



export const authenticate = (id) => {

    let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
    console.log("Ret no authenticate: ", ret);
    //localStorage.setItem('user', res.data.token);

    return {
        type: AUTHENTICATE,
        payload: request
    }
}
