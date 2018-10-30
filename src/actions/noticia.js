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

export const fetchNoticiasByCategory = async(category='', limit=500) => {
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
        req = await axios.get(`http://localhost:1337/categoria/?slug=noticias/${category}`, config);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }
    }

    
    if(categoria != '')
    {
        const request = await axios.get(`http://localhost:1337/noticia/?${categoria}_sort=-_id&_limit=${limit}`, config);
        request.categoria = req.data[0];
        console.log("request na noticias by category: ", request);
        return {
            type: FETCH_NOTICIAS,
            payload: request
        }
    }
    else{
        return {
            type: FETCH_NOTICIAS,
            payload: []
        }
    }

}

export const fetchNoticiasByTag = async(tag='', limit='', sort=null) => {
    if(!sort)
        sort = '-_id';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    let tags = '';
    let req;
    if(tag){
        req = await axios.get(`http://localhost:1337/tag/?slug=${tag}`, config);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            tags=`tags=${req.data[0]._id}&`
        }
        
    }

    if(tags != '')
    {
        const request = await axios.get(`http://localhost:1337/noticia/?${tags}&_sort=${sort}${limit}`, config);
        request.tag = req.data[0];
        console.log("request no noticias action: ", request);
        return {
            type: FETCH_NOTICIAS,
            payload: request
        }
    }
    else{
        return {
            type: FETCH_NOTICIAS,
            payload: []
        }
    }
}

export const fetchNoticiasByCategoryOrSlug = async(slugOrCategory='', limit=500) => {
    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let category = '';
    let slug = '';
    if(slugOrCategory){
        let config = { headers: { 'Authorization': `Bearer ${jwt}` } };
        const req = await axios.get(`http://localhost:1337/categoria/?slug=noticias/${slugOrCategory}`, config);

        console.log("request no fetchNoticias: ", req.data);

        if(req.data.length > 0)
            category=`categorias=${req.data[0]._id}&`
        else
            slug = `slug=${slugOrCategory}&`;
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`http://localhost:1337/noticia/?${category}${slug}_sort=-_id&_limit=${limit}`, config);

    if(slug != ''){
        return {
            type: FETCH_NOTICIA,
            payload: request
        }
    }
    else{
        return {
            type: FETCH_NOTICIAS,
            payload: request
        }
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


        if(req.data.length > 0)
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