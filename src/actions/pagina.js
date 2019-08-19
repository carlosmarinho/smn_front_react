import axios from 'axios';
import { FETCH_PAGINA, FETCH_PAGINAS } from "./types";


export const fetchPaginaBySlug = async(slug='', limit=1) => {
    
    if(slug){
        slug = `slug=${slug}&`
    }

    const request = axios.get(`${process.env.REACT_APP_URL_API}pagina/?${slug}_sort=_id:desc&_limit=${limit}`);

    return {
        type: FETCH_PAGINA,
        payload: request
    }
}

export const fetchPaginas = async(id, category='', limit=500) => {
   

    if(category){
        const req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?nome=${category}`);

        if(req.data.lenght > 0)
            category=`categorias=${req.data[0]._id}&`
    }
    const request = axios.get(`${process.env.REACT_APP_URL_API}paginas/?${category}_sort=_id:desc&_limit=${limit}`);

    return {
        type: FETCH_PAGINAS,
        payload: request
    }
}


