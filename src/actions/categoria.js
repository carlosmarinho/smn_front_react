import axios from 'axios';
import { FETCH_CATEGORIES_TOP } from "./types";



export const fetchCategory = (id) => {

    const request = axios.get(`http://localhost:1337/categoria/${id}`);

    return {
        type: FETCH_CATEGORY,
        payload: request
    }
}

export const fetchCategoriesTop = async(limit='', sort=null) => {
    if(!sort)
        sort = '-_id';
    if(limit)
        limit = `&_limit=${limit}`


    let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })

    let config = { headers: { 'Authorization': `Bearer ${ret.data.jwt}` } };

    const request = axios.get(`http://localhost:1337/categoria/?_sort=${sort}${limit}&cidade=${city_id}`, config);

    return {
        type: FETCH_CATEGORYS_RECENTES,
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


    let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })

    let config = { headers: { 'Authorization': `Bearer ${ret.data.jwt}` } };

    console.log(`http://localhost:1337/categoria/?_sort=${sort}${limit}&cidade=${city_id}`);
    const request = axios.get(`http://localhost:1337/categoria/?_sort=${sort}${limit}`, config);

    return {
        type: FETCH_CATEGORYS,
        payload: request
    }
}
