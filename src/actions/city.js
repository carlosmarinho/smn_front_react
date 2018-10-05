import _ from 'lodash';
import axios from 'axios';
import { FETCH_CITY } from "./types";



export const fetchCity = (id) => {

    const request = axios.get(`http://localhost:1337/cidade/${id}`);

    return {
        type: FETCH_CITY,
        payload: request
    }
}

export const fetchCityBySlug = async (slug) => {

    let jwt = localStorage.getItem('jwt');
    console.log("No fetch bairros: ", jwt);

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }
    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`http://localhost:1337/cidade/?slug=${slug}`, config);

    return {
        type: FETCH_CITY,
        payload: request
    }
}