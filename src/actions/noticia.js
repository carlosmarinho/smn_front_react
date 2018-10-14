import _ from 'lodash';
import axios from 'axios';
import { FETCH_NOTICIA, FETCH_NOTICIAS, FETCH_NOTICIAS_RECENTES } from "./types";


export const fetchNoticiaBySlug = async(slug='', limit=1) => {
    
    if(slug){
        slug = `slug=${slug}&`
    }

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }



    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`http://localhost:1337/noticia/?${slug}_sort=-_id&_limit=${limit}`, config);

    return {
        type: FETCH_NOTICIA,
        payload: request
    }
}

export const fetchNoticias = async(id, category='', limit=500) => {
    
    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    if(category){
        let config = { headers: { 'Authorization': `Bearer ${jwt}` } };
        const req = await axios.get(`http://localhost:1337/categoria/?nome=${category}`, config);

        console.log("request no fetchNoticias: ", req.data);

        category=`categorias=${req.data[0]._id}&`
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`http://localhost:1337/noticia/?${category}_sort=-_id&_limit=${limit}`, config);

    return {
        type: FETCH_NOTICIAS,
        payload: request
    }
}


export const fetchNoticiasRecentes = async(city_id, limit='', sort=null) => {
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

    
    //const request = axios.get(`http://localhost:1337/noticia/?_sort=${sort}${limit}&cidade=${city_id}`, config);
    const request = axios.get(`http://localhost:1337/noticia/?_sort=${sort}${limit}`, config);

    return {
        type: FETCH_NOTICIAS_RECENTES,
        payload: request
    }

}