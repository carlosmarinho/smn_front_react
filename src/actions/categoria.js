import axios from 'axios';
import { FETCH_CATEGORY, FETCH_CATEGORIES, FETCH_CATEGORIES_GUIA_TOP } from "./types";



export const fetchCategory = (id) => {

    const request = axios.get(`http://localhost:1337/categoria/${id}`);

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


    let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })

    let config = { headers: { 'Authorization': `Bearer ${ret.data.jwt}` } };

    const request = axios.get(`http://localhost:1337/categoria/?_sort=${sort}${limit}&tipo=guia&parent_id=`, config);

    return {
        type: FETCH_CATEGORIES_GUIA_TOP,
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
