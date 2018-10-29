import _ from 'lodash';
import axios from 'axios';
import { FETCH_EVENTO, FETCH_EVENTOS, FETCH_EVENTOS_RECENTES } from "./types";


export const fetchEventoBySlug = async (slug) => {

    let jwt = localStorage.getItem('jwt');
    

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`http://localhost:1337/evento/?slug=${slug}`, config);

    return {
        type: FETCH_EVENTO,
        payload: request
    }
}


export const fetchEventos = async(id, limit) => {

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`http://localhost:1337/evento/?_sort=-_id&_limit=${limit}`, config);
    console.log("------ vai chamar o fetchEventos -------")

    return {
        type: FETCH_EVENTOS,
        payload: request
    }
}


export const fetchEventosByCategory = async(category='', limit='', sort=null) => {
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

    let categoria = ''
    let req;
    if(category){
        req = await axios.get(`http://localhost:1337/categoria/?slug=eventos/${category}`, config);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }
    }

    if(categoria != '')
    {
        const request = await axios.get(`http://localhost:1337/evento/?${categoria}&_sort=${sort}${limit}`, config);
        request.categoria = req.data[0];
        return {
            type: FETCH_EVENTOS,
            payload: request
        }
    }
    else{
        return {
            type: FETCH_EVENTOS,
            payload: []
        }
    }
}

export const fetchEventosRecentes = async(id, limit=5) => {

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`http://localhost:1337/evento/?_sort=-_id&_limit=${limit}`, config);
    console.log("------ vai chamar o fetchEventos -------")

    return {
        type: FETCH_EVENTOS_RECENTES,
        payload: request
    }
}