import axios from 'axios';
import { FETCH_CITY, FETCH_CITIES } from "./types";



export const fetchCity = (id) => {

    const request = axios.get(`${process.env.REACT_APP_URL_API}cidades/${id}`);

    return {
        type: FETCH_CITY,
        payload: request
    }
}

export const fetchCities = async(state='', limit='', sort=null) => {

    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=200`;

    if(state)
        state = `&estado=${state}`

    let jwt = localStorage.getItem('jwt');

    /*@todo colocar o populateAssotion p funcionar no city*/
    //const request = axios.get(`${process.env.REACT_APP_URL_API}cidades/?populateAssociation=false&_sort=${sort}${limit}${state}`);
    const request = axios.get(`${process.env.REACT_APP_URL_API}cidades/?_sort=${sort}${limit}${state}`);

    return {
        type: FETCH_CITIES,
        payload: request
    }
}

export const fetchCityBySlug = async (slug) => {
/* 
    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }
    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}cidades/?slug=${slug}`, config); */

    const request = axios.get(`${process.env.REACT_APP_URL_API}cidades/?slug=${slug}`);

    return {
        type: FETCH_CITY,
        payload: request
    }
}