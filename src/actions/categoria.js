import axios from 'axios';
import { FETCH_CATEGORY, FETCH_CATEGORIES, FETCH_CATEGORIES_GUIA_TOP, FETCH_CATEGORIES_EVENTO_TOP } from "./types";



export const fetchCategory = async (id) => {

    /* let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };


    const request = axios.get(`${process.env.REACT_APP_URL_API}categorias/${id}`, config); */

    const request = axios.get(`${process.env.REACT_APP_URL_API}categorias/${id}`);

    return {
        type: FETCH_CATEGORY,
        payload: request
    }
}

export const fetchCategoryBySlug = async(slug='', limit=1) => {
    let slug1 = '';
    if(slug){
        slug1 = `slug=guia/comercial/${slug}`
    }
    else{
        return {
            type: FETCH_CATEGORY,
            payload: null
        }
    }


    let request = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?${slug1}`);

    if(request.data.length === 0){
        slug1 = `slug=noticias/${slug}`

        request = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?${slug1}`);

        if(request.data.length === 0){
            slug1 = `slug=guia/servicos/${slug}`
    
            request = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?${slug1}`);


            if(request.data.length === 0){
                slug1 = `slug=eventos/${slug}`
        
                request = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?${slug1}`);
            }

        }
    }


    return {
        type: FETCH_CATEGORY,
        payload: request
    }
}


export const fetchCategoriesGuiaTop = async(limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`

    

    const request = axios.get(`${process.env.REACT_APP_URL_API}categorias/?_sort=${sort}${limit}&tipo=guia comercial&parent_id=` );

    return {
        type: FETCH_CATEGORIES_GUIA_TOP,
        payload: request
    }

}

export const fetchCategoriesGuiaComercialTop = async(limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`

    const request = axios.get(`${process.env.REACT_APP_URL_API}categorias/?_sort=${sort}${limit}&tipo=guia comercial&parent_id=`);

    return {
        type: FETCH_CATEGORIES_GUIA_TOP,
        payload: request
    }

}

export const fetchCategoriesGuiaServicosTop = async(limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`

    const request = axios.get(`${process.env.REACT_APP_URL_API}categorias/?_sort=${sort}${limit}&tipo=guia servicos&parent_id=`);

    return {
        type: FETCH_CATEGORIES_GUIA_TOP,
        payload: request
    }

}


export const fetchCategoriesEventoTop = async(limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`

    const request = axios.get(`${process.env.REACT_APP_URL_API}categorias/?_sort=${sort}${limit}&tipo=evento&parent_id=`);

    return {
        type: FETCH_CATEGORIES_EVENTO_TOP,
        payload: request
    }

}

export const fetchCategories = async(tipo='', limit='', sort=null) => {
    if(tipo)
        tipo = `tipo=${tipo}&`
    if(!sort)
        sort = '_sort=_id:desc&';
    else
        sort = `_sort=${sort}&`;
    if(limit)
        limit = `_limit=${limit}`;
    else
        limit = `_limit=200`;


    const request = axios.get(`${process.env.REACT_APP_URL_API}categorias/?${tipo}${sort}${limit}`);

    return {
        type: FETCH_CATEGORIES,
        payload: request
    }
}
