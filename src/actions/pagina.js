import _ from 'lodash';
import axios from 'axios';
import { FETCH_PAGINA, FETCH_PAGINAS } from "./types";


export const fetchPaginaBySlug = async(slug='', limit=1) => {
    
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

    const request = axios.get(`http://localhost:1337/pagina/?${slug}_sort=-_id&_limit=${limit}`, config);

    return {
        type: FETCH_PAGINA,
        payload: request
    }
}

export const fetchPaginas = async(id, category='', limit=500) => {
    
    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    if(category){
        let config = { headers: { 'Authorization': `Bearer ${jwt}` } };
        const req = await axios.get(`http://localhost:1337/categoria/?nome=${category}`, config);

        console.log("request no fetchPaginas: ", req.data);

        if(req.data.lenght > 0)
            category=`categorias=${req.data[0]._id}&`
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`http://localhost:1337/pagina/?${category}_sort=-_id&_limit=${limit}`, config);

    return {
        type: FETCH_PAGINAS,
        payload: request
    }
}


