import axios from 'axios';
import { FETCH_FEATURED_GUIAS, FETCH_GUIA, FETCH_GUIAS, FETCH_GUIAS_RECENTES, FETCH_GUIAS_FEATURED } from "./types";



export const fetchGuia = (id) => {

    const request = axios.get(`${process.env.REACT_APP_URL_API}guia/${id}`);

    return {
        type: FETCH_GUIA,
        payload: request
    }
}

export const fetchGuiaBySlug = async (slug) => {

    let jwt = localStorage.getItem('jwt');
    

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}guia/?slug=${slug}`, config);

    return {
        type: FETCH_GUIA,
        payload: request
    }
}

export const fetchGuiasRecentes = async(city_id, limit='', sort=null) => {
    if(!sort)
        sort = '-_id';
    if(limit)
        limit = `&_limit=${limit}`


    let jwt = localStorage.getItem('jwt');
    

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}guia/?_sort=${sort}${limit}&cidade=${city_id}`, config);

    return {
        type: FETCH_GUIAS_RECENTES,
        payload: request
    }

}

export const fetchGuiasByCategoryBoth = async(category='', limit='', sort=null) => {
    if(!sort)
        sort = '-_id';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=150`;
  

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    let categoria = ''
    let categoriaServico = ''
    let req;
    if(category){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categoria/?populateAssociation=false&slug=guia/comercial/${category}`, config);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }

        req = await axios.get(`${process.env.REACT_APP_URL_API}categoria/?populateAssociation=false&slug=guia/servicos/${category}`, config);
    
        if(req.data.length > 0){
            categoriaServico=`categorias=${req.data[0]._id}&`
        }
    }



    if(categoria !== '')
    {
        let request = await axios.get(`${process.env.REACT_APP_URL_API}guia/?${categoria}&_sort=${sort}${limit}`, config);
        const request1 = await axios.get(`${process.env.REACT_APP_URL_API}guia/?populateAssociation=false&${categoriaServico}&_sort=${sort}${limit}`, config);
        console.log("O request: ", request);
        request.categoria = req.data[0];
        request.data = [...request.data, ...request1.data];
        return {
            type: FETCH_GUIAS,
            payload: request
        }
    }
    else{
        return {
            type: FETCH_GUIAS,
            payload: []
        }
    }
}

export const fetchGuiasByCategoryComercial = async(category='', limit='', sort=null) => {
    if(!sort)
        sort = '-_id';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    let categoria = ''
    let req;
    if(category){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categoria/?populateAssociation=false&slug=guia/comercial/${category}`, config);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }
       
    }

    if(categoria !== '')
    {
        const request = await axios.get(`${process.env.REACT_APP_URL_API}guia/?populateAssociation=false&${categoria}&_sort=${sort}${limit}`, config);
        request.categoria = req.data[0];
        return {
            type: FETCH_GUIAS,
            payload: request
        }
    }
    else{
        return {
            type: FETCH_GUIAS,
            payload: []
        }
    }
}

export const fetchGuiasByCategoryServico = async(category='', limit='', sort=null) => {
    if(!sort)
        sort = '-_id';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    let categoria = ''
    let req;
    if(category){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categoria/?populateAssociation=false&slug=guia/servicos/${category}`, config);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }
       
    }

    if(categoria !== '')
    {
        const request = await axios.get(`${process.env.REACT_APP_URL_API}guia/?populateAssociation=false&${categoria}&_sort=${sort}${limit}`, config);
        request.categoria = req.data[0];
        return {
            type: FETCH_GUIAS,
            payload: request
        }
    }
    else{
        return {
            type: FETCH_GUIAS,
            payload: []
        }
    }
}

export const fetchGuiasByCategory = async(category='', limit='', sort=null) => {
    if(!sort)
        sort = '-_id';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    let categoria = ''
    let req;
    if(category){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categoria/?populateAssociation=false&slug=guia/comercial/${category}`, config);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }
        else{
            req = await axios.get(`${process.env.REACT_APP_URL_API}categoria/?populateAssociation=false&slug=guia/servicos/${category}`, config);

            if(req.data.length > 0){
                categoria=`categorias=${req.data[0]._id}&`
            }
        }
    }

    if(categoria !== '')
    {
        const request = await axios.get(`${process.env.REACT_APP_URL_API}guia/?${categoria}&_sort=${sort}${limit}`, config);
        request.categoria = req.data[0];
        return {
            type: FETCH_GUIAS,
            payload: request
        }
    }
    else{
        return {
            type: FETCH_GUIAS,
            payload: []
        }
    }
}


export const fetchGuiasByTag = async(tag='', limit='', sort=null) => {
    if(!sort)
        sort = '-_id';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    let tags = '';
    let req;
    if(tag){
        req = await axios.get(`${process.env.REACT_APP_URL_API}tag/?slug=${tag}`, config);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            tags=`tags=${req.data[0]._id}&`
        }
        
    }

    if(tags !== '')
    {
        const request = await axios.get(`${process.env.REACT_APP_URL_API}guia/?${tags}&_sort=${sort}${limit}`, config);
        request.tag = req.data[0];
        return {
            type: FETCH_GUIAS,
            payload: request
        }
    }
    else{
        return {
            type: FETCH_GUIAS,
            payload: []
        }
    }
}


export const fetchGuiasBySearch = async(search='', limit='', sort=null) => {
    if(!sort)
        sort = '-_id';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    console.log("no busca guia: ", search)
    let bairros = '';
    let req;
    if(search.bairro){
        req = await axios.get(`${process.env.REACT_APP_URL_API}bairro/?slug=${search.bairro}`, config);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            bairros=`bairros=${req.data[0]._id}&`
        }
        
    }

    let keyword = '';
    if(search.keyword){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categoria/?slug=${search.keyword}&tipo=guia comercial`, config);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            keyword=`&categoria=${req.data[0]._id}&`
        }
        else{
            req = await axios.get(`${process.env.REACT_APP_URL_API}categoria/?slug=${search.keyword}&tipo=guia serviço`, config);

            if(req.data.length > 0){
                console.log("request do tag: ", req.data);
                keyword=`&categoria=${req.data[0]._id}&`
            }
        }
        
        keyword=`titulo_contains=${search.keyword}&`
    }

    const request = await axios.get(`${process.env.REACT_APP_URL_API}guia/?${bairros}${keyword}_sort=${sort}${limit}`, config);
    
    return {
        type: FETCH_GUIAS,
        payload: request
    }
    
}

export const fetchGuias = async(city_id, search='', limit='', sort=null) => {
    if(!sort)
        sort = '-_id';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}guia/?populateAssociation=false&${search}&_sort=${sort}${limit}&cidade=${city_id}`, config);

    return {
        type: FETCH_GUIAS,
        payload: request
    }
}

export const fetchFeaturedGuias = async(city_id) => {

    let jwt = localStorage.getItem('jwt');
    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };
    let request;
    try{
        request = await axios.get(`${process.env.REACT_APP_URL_API}guia/?cidade_destaque=${city_id}`, config);
    }
    catch(e){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
        return {
            type: FETCH_FEATURED_GUIAS,
            payload: []
        }
    }


    return {
        type: FETCH_FEATURED_GUIAS,
        payload: request
    }
}

export const fetchGuiasFeatured = async(city_id) => {

    let jwt = localStorage.getItem('jwt');

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }
    
    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}guia/?cidade_destaque=${city_id}`, config);

    return {
        type: FETCH_GUIAS_FEATURED,
        payload: request
    }
}
