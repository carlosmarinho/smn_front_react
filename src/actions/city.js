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

    let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })

    let config = { headers: { 'Authorization': `Bearer ${ret.data.jwt}` } };

    const request = axios.get(`http://localhost:1337/cidade/?slug=${slug}`, config);

    return {
        type: FETCH_CITY,
        payload: request
    }
}