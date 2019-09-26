import axios from 'axios';
import { FETCH_BAIRRO, FETCH_BAIRROS } from "./types";



export const fetchBairro = (id) => {

    const request = axios.get(`${process.env.REACT_APP_URL_API}bairros/${id}`);

    return {
        type: FETCH_BAIRRO,
        payload: request
    }
}

export const fetchBairros = async(city_id, limit='', sort=null) => {

    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=200`;

    let jwt = localStorage.getItem('jwt');

    /* if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}bairros/?_sort=${sort}${limit}&cidade=${city_id}`, config); */

    const request = axios.get(`${process.env.REACT_APP_URL_API}bairros/?_sort=${sort}${limit}&cidade=${city_id}`);

    return {
        type: FETCH_BAIRROS,
        payload: request
    }
}


export const fetchBairroBySlug = async (slug) => {
/* 
    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }
    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}cidades/?slug=${slug}`, config); */

    const request = axios.get(`${process.env.REACT_APP_URL_API}bairros/?slug=${slug}`);

    return {
        type: FETCH_BAIRRO,
        payload: request
    }
}