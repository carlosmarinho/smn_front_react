import axios from 'axios';
import { FETCH_CATEGORY, FETCH_CATEGORIES, FETCH_CATEGORIES_GUIA_TOP, FETCH_CATEGORIES_EVENTO_TOP } from "./types";



export const fetchCategory = async (id) => {

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };


    const request = axios.get(`http://localhost:1337/categoria/${id}`, config);

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

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    let request = await axios.get(`http://localhost:1337/categoria/?${slug1}`, config);

    console.log("request catgoria: ", request)

    if(request.data.length == 0){
        slug1 = `slug=noticias/${slug}`

        request = await axios.get(`http://localhost:1337/categoria/?${slug1}`, config);

        if(request.data.length == 0){
            slug1 = `slug=guia/servicos/${slug}`
    
            request = await axios.get(`http://localhost:1337/categoria/?${slug1}`, config);


            if(request.data.length == 0){
                slug1 = `slug=eventos/${slug}`
        
                request = await axios.get(`http://localhost:1337/categoria/?${slug1}`, config);
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
    

    const request = axios.get(`http://localhost:1337/categoria/?_sort=${sort}${limit}&tipo=guia comercial&parent_id=`, config);

    return {
        type: FETCH_CATEGORIES_GUIA_TOP,
        payload: request
    }

}

export const fetchCategoriesGuiaComercialTop = async(limit='', sort=null) => {
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
    

    const request = axios.get(`http://localhost:1337/categoria/?_sort=${sort}${limit}&tipo=guia comercial&parent_id=`, config);

    return {
        type: FETCH_CATEGORIES_GUIA_TOP,
        payload: request
    }

}

export const fetchCategoriesGuiaServicosTop = async(limit='', sort=null) => {
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
    

    const request = axios.get(`http://localhost:1337/categoria/?_sort=${sort}${limit}&tipo=guia servicos&parent_id=`, config);

    return {
        type: FETCH_CATEGORIES_GUIA_TOP,
        payload: request
    }

}


export const fetchCategoriesEventoTop = async(limit='', sort=null) => {
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
    

    const request = axios.get(`http://localhost:1337/categoria/?_sort=${sort}${limit}&tipo=evento&parent_id=`, config);

    return {
        type: FETCH_CATEGORIES_EVENTO_TOP,
        payload: request
    }

}

export const fetchCategories = async(limit='', sort=null) => {
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

    console.log(`http://localhost:1337/categoria/?_sort=${sort}${limit}`);
    const request = axios.get(`http://localhost:1337/categoria/?_sort=${sort}${limit}`, config);

    return {
        type: FETCH_CATEGORIES,
        payload: request
    }
}
