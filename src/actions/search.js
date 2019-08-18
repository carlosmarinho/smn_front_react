import axios from 'axios';
import { SEARCH_HOME } from "./types";



export const searchHome = async(values) => {

    let sort = '_id:desc';
    let limit = `&_limit=200`;

    /* let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };
 
    const request = axios.get(`${process.env.REACT_APP_URL_API}bairro/?populateAssociation=false&_sort=${sort}${limit}`, config);*/
    const request = axios.get(`${process.env.REACT_APP_URL_API}bairro/?populateAssociation=false&_sort=${sort}${limit}`);

    return {
        type: SEARCH_HOME,
        payload: request
    }
}
