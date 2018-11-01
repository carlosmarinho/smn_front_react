import axios from 'axios';
import { FETCH_BAIRRO, FETCH_BAIRROS } from "./types";



export const fetchBairro = (id) => {

    const request = axios.get(`${process.env.REACT_APP_URL_API}bairro/${id}`);

    return {
        type: FETCH_BAIRRO,
        payload: request
    }
}

export const fetchBairros = async(city_id, limit='', sort=null) => {

    if(!sort)
        sort = '-_id';
    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=200`;

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}bairro/?populateAssociation=false&_sort=${sort}${limit}&cidade=${city_id}`, config);

    return {
        type: FETCH_BAIRROS,
        payload: request
    }
}
