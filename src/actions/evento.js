import _ from 'lodash';
import axios from 'axios';
import { FETCH_EVENTOS, FETCH_EVENTOS_RECENTES } from "./types";




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