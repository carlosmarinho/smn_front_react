import _ from 'lodash';
import axios from 'axios';
import { FETCH_FEATURED_GUIAS, FETCH_GUIA, FETCH_GUIAS, FETCH_GUIAS_RECENTES, FETCH_GUIAS_FEATURED } from "./types";



export const fetchGuia = (id) => {

    const request = axios.get(`http://localhost:1337/guia/${id}`);

    return {
        type: FETCH_GUIA,
        payload: request
    }
}

export const fetchGuiaBySlug = async (slug) => {

    let jwt = localStorage.getItem('jwt');
    

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`http://localhost:1337/guia/?slug=${slug}`, config);

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


    let jwt = localStorage.getItem('jwt');
    

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

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
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=200`;


    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    console.log(`http://localhost:1337/guia/?_sort=${sort}${limit}&cidade=${city_id}`);
    const request = axios.get(`http://localhost:1337/guia/?_sort=${sort}${limit}&cidade=${city_id}`, config);

    return {
        type: FETCH_GUIAS,
        payload: request
    }
}

export const fetchFeaturedGuias = async(city_id) => {

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`http://localhost:1337/guia/?cidade_destaque=${city_id}`, config);
    console.log("------ vai chamar o fetchUsers -------")

    return {
        type: FETCH_FEATURED_GUIAS,
        payload: request
    }
}

export const fetchGuiasFeatured = async(city_id) => {

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }
    
    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`http://localhost:1337/guia/?cidade_destaque=${city_id}`, config);
    console.log("------ vai chamar o fetchUsers -------")

    return {
        type: FETCH_GUIAS_FEATURED,
        payload: request
    }
}
