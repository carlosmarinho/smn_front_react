import _ from 'lodash';
import axios from 'axios';
import { AUTHENTICATE } from "./types";



export const authenticate = (id) => {

    let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
    console.log("Ret no authenticate: ", ret);
    //localStorage.setItem('user', res.data.token);

    return {
        type: AUTHENTICATE,
        payload: request
    }
}
