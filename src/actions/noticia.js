import axios from 'axios';
import { FETCH_NOTICIA, FETCH_NOTICIAS, FETCH_NOTICIAS_RECENTES, FETCH_NOTICIAS_FEATURED, FETCH_NOTICIAS_USER } from "./types";


export const fetchNoticiaBySlug = async(slug='', limit=1) => {
    
    if(slug){
        slug = `slug=${slug}&`
    }

    const request = axios.get(`${process.env.REACT_APP_URL_API}noticias/?${slug}_sort=_id:desc&_limit=${limit}`);
    return {
        type: FETCH_NOTICIA,
        payload: request
    }
}

export const fetchNoticiasByCategory = async(category='', limit=1000) => {
  
    let categoria = ''
    let req;
    if(category){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=noticias/${category}`);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }
    }

    
    if(categoria !== '')
    {
        let request = await axios.get(`${process.env.REACT_APP_URL_API}noticias/?${categoria}_sort=_id:desc&_limit=${limit}`);
        request.categoria = req.data[0];
        return {
            type: FETCH_NOTICIAS,
            payload: request
        }
    }
    else{
        let request = {data:[], categoria:null}
        return {
            type: FETCH_NOTICIAS,
            payload: {data:[], categoria:null}
        }
    }

}

export const fetchNoticiasByTag = async(tag='', limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=150`;
  
    let tags = '';
    let req;
    if(tag){
        req = await axios.get(`${process.env.REACT_APP_URL_API}tag/?slug=${tag}`);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            tags=`tags=${req.data[0]._id}&`
        }
        
    }

    if(tags !== '')
    {
        const request = await axios.get(`${process.env.REACT_APP_URL_API}noticias/?${tags}&_sort=${sort}${limit}`);
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

export const fetchNoticiasBySearch = async(search='', limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=150`;
  
    let bairros = '';
    let req;
    if(search.bairro){
        req = await axios.get(`${process.env.REACT_APP_URL_API}bairro/?slug=${search.bairro}`);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            bairros=`bairros=${req.data[0]._id}&`
        }
        
    }

    let keyword = '';
    if(search.keyword){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=${search.keyword}&tipo=notícia`);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            keyword=`&categoria=${req.data[0]._id}&`
        }
        
        keyword = `titulo_contains=${search.keyword}&`
    }

    const request = await axios.get(`${process.env.REACT_APP_URL_API}noticias/?${bairros}${keyword}_sort=${sort}${limit}`);
    
    return {
        type: FETCH_NOTICIAS,
        payload: request
    }
    
}

export const fetchNoticiasByCategoryOrSlug = async(slugOrCategory='', limit=150) => {
   
    let category = '';
    let slug = '';
    if(slugOrCategory){
        const req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=noticias/${slugOrCategory}`);

        if(req.data.length > 0)
            category=`categorias=${req.data[0]._id}&`
        else
            slug = `slug=${slugOrCategory}&`;
    }

    const request = axios.get(`${process.env.REACT_APP_URL_API}noticias/?${category}${slug}_sort=_id:desc&_limit=${limit}`);

    if(slug !== ''){
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

export const fetchNoticias = async(id, category='', limit=150) => {
    

    if(category){
        const req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?nome=${category}`);

        if(req.data.length > 0)
            category=`categorias=${req.data[0]._id}&`
    }

    const request = axios.get(`${process.env.REACT_APP_URL_API}noticias/?${category}_sort=_id:desc&_limit=${limit}`);

    return {
        type: FETCH_NOTICIAS,
        payload: request
    }
}

export const fetchNoticiasByUser = async(user_id, limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`

    const request = axios.get(`${process.env.REACT_APP_URL_API}noticias/?user=${user_id}&_sort=-${sort}&${limit}`);

    return {
        type: FETCH_NOTICIAS_USER,
        payload: request
    }
}

export const fetchNoticiasByAdm = async(limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`

    const request = axios.get(`${process.env.REACT_APP_URL_API}noticias/?_sort=-${sort}&${limit}`);

    return {
        type: FETCH_NOTICIAS_USER,
        payload: request
    }
}

export const fetchNoticiasRecentes = async(city_id, limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`

   
    //const request = axios.get(`${process.env.REACT_APP_URL_API}noticias/?_sort=${sort}${limit}&cidade=${city_id}`, config);
    const request = axios.get(`${process.env.REACT_APP_URL_API}noticias/?_sort=${sort}${limit}`);

    return {
        type: FETCH_NOTICIAS_RECENTES,
        payload: request
    }

}


export const fetchNoticiasFeatured = async(city_id, limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`


    //const request = axios.get(`${process.env.REACT_APP_URL_API}noticias/?_sort=${sort}${limit}&cidade=${city_id}`, config);
    const request = axios.get(`${process.env.REACT_APP_URL_API}noticias/?featured=true&_sort=${sort}${limit}`);

    return {
        type: FETCH_NOTICIAS_FEATURED,
        payload: request
    }

}