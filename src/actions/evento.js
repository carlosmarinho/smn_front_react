import axios from 'axios';
import { FETCH_EVENTO, FETCH_EVENTOS, FETCH_EVENTOS_RECENTES } from "./types";


export const fetchEventoBySlug = async (slug) => {

    let jwt = localStorage.getItem('jwt');
    

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}evento/?slug=${slug}`, config);

    return {
        type: FETCH_EVENTO,
        payload: request
    }
}


export const fetchEventos = async(id, limit=200) => {

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}evento/?populateAssociation=false&_sort=-_id&_limit=${limit}`, config);

    return {
        type: FETCH_EVENTOS,
        payload: request
    }
}

export const fetchEventosByTag = async(tag='', limit='', sort=null) => {
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

    let tags = '';
    let req;
    if(tag){
        req = await axios.get(`${process.env.REACT_APP_URL_API}tag/?slug=${tag}`, config);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            tags=`tags=${req.data[0]._id}&`
        }
        
    }

    if(tags !== '')
    {
        const request = await axios.get(`${process.env.REACT_APP_URL_API}evento/?${tags}&_sort=${sort}${limit}`, config);
        request.tag = req.data[0];
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

export const fetchEventosBySearch = async(search='', limit='', sort=null) => {
    if(!sort)
        sort = '-_id';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    console.log("no busca evento: ", search)
    let bairros = '';
    let req;
    if(search.bairro){
        req = await axios.get(`${process.env.REACT_APP_URL_API}bairro/?slug=${search.bairro}`, config);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            bairros=`bairros=${req.data[0]._id}&`
        }
        
    }

    let keyword = '';
    if(search.keyword){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categoria/?slug=${search.keyword}&tipo=evento`, config);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            keyword=`&categoria=${req.data[0]._id}&`
        }
        
        keyword=`titulo_contains=${search.keyword}&`
    }


    const request = await axios.get(`${process.env.REACT_APP_URL_API}evento/?${bairros}${keyword}&_sort=${sort}${limit}`, config);
    
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
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    let categoria = ''
    let req;
    if(category){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categoria/?populateAssociation=false&slug=eventos/${category}`, config);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }
    }

    if(categoria !== '')
    {
        const request = await axios.get(`${process.env.REACT_APP_URL_API}evento/?${categoria}&_sort=${sort}${limit}`, config);
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
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}evento/?_sort=-_id&_limit=${limit}`, config);

    return {
        type: FETCH_EVENTOS_RECENTES,
        payload: request
    }
}