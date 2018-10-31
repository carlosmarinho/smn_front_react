import _ from 'lodash';
import axios from 'axios';
import { FETCH_BAIRRO, FETCH_BAIRROS } from "./types";



export const fetchBairro = (id) => {

    const request = axios.get(`http://localhost:1337/bairro/${id}`);

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
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`http://localhost:1337/bairro/?populateAssociation=false&_sort=${sort}${limit}&cidade=${city_id}`, config);

    return {
        type: FETCH_BAIRROS,
        payload: request
    }
}
