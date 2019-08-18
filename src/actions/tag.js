import axios from 'axios';
import {FETCH_TAGS} from './types';


export const fetchTags = function (tipo='', limit='', sort=null){
    if(tipo)
        tipo = `tipo=${tipo}&`
    if(!sort)
        sort = '_sort=-_id&';
    else
        sort = `_sort=${sort}&`;
    if(limit)
        limit = `_limit=${limit}`;
    else
        limit = `_limit=200`;



    let request = axios.get(`${process.env.REACT_APP_URL_API}tags/?${tipo}${sort}${limit}`);

    return(
        {
            type: FETCH_TAGS,
            payload: request
        }
    )
}