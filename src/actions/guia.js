import _ from 'lodash';
import axios from 'axios';
import { FETCH_FEATURED_GUIAS, FETCH_GUIA, FETCH_GUIAS, FETCH_GUIAS_RECENTES } from "./types";



export const fetchGuia = (id) => {

    const request = axios.get(`http://localhost:1337/guia/${id}`);

    return {
        type: FETCH_GUIA,
        payload: request
    }
}

export const fetchGuiasRecentes = async(city_id, limit='', sort=null) => {
    if(!sort)
        sort = '-_id';
    if(limit)
        limit = `&_limit=${limit}`


    let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })

    let config = { headers: { 'Authorization': `Bearer ${ret.data.jwt}` } };

    console.log(`http://localhost:1337/guia/?_sort=${sort}${limit}&cidade=${city_id}`);
    const request = axios.get(`http://localhost:1337/guia/?_sort=${sort}${limit}&cidade=${city_id}`, config);

    return {
        type: FETCH_GUIAS_RECENTES,
        payload: request
    }

}

export const fetchGuias = async(city_id, limit='', sort=null) => {
    if(!sort)
        sort = '-_id';
    if(limit)
        limit = `&_limit=${limit}`


    let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })

    let config = { headers: { 'Authorization': `Bearer ${ret.data.jwt}` } };

    console.log(`http://localhost:1337/guia/?_sort=${sort}${limit}&cidade=${city_id}`);
    const request = axios.get(`http://localhost:1337/guia/?_sort=${sort}${limit}&cidade=${city_id}`, config);

    return {
        type: FETCH_GUIAS,
        payload: request
    }
}

export const fetchFeaturedGuias = async(city_id) => {

    let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })

    let config = { headers: { 'Authorization': `Bearer ${ret.data.jwt}` } };

    const request = axios.get(`http://localhost:1337/guia/?cidade_destaque=${city_id}`, config);
    console.log("------ vai chamar o fetchUsers -------")

    return {
        type: FETCH_FEATURED_GUIAS,
        payload: request
    }
}
