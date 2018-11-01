import _ from 'lodash';
import axios from 'axios';
import { FETCH_CITY } from "./types";



export const fetchCity = (id) => {

    const request = axios.get(`${process.env.REACT_APP_URL_API}cidade/${id}`);

    return {
        type: FETCH_CITY,
        payload: request
    }
}

export const fetchCityBySlug = async (slug) => {

    let jwt = localStorage.getItem('jwt');
    console.log("No fetch bairros: ", jwt);

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }
    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}cidade/?slug=${slug}`, config);

    return {
        type: FETCH_CITY,
        payload: request
    }
}