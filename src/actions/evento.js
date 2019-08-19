import _ from 'lodash';
import axios from 'axios';
import { 
    SUCCESS_CREATE_EVENTO, 
    ERROR_CREATE_EVENTO, 
    FETCH_EVENTO, 
    FETCH_EVENTOS, 
    FETCH_EVENTOS_RECENTES, 
    FETCH_EVENTOS_USER 
} from "./types";

export const createEvento = async (evento) => {

    let user = JSON.parse(localStorage.getItem('user'));
    console.log("evento post: ", evento);
    let request;
    if(user){
        try
        {
            //correção para salvar uma relação no strapi
            let eventotosave = _.clone(evento);
            eventotosave.cidade = [evento.cidade];
            eventotosave.galeria_img = '';
            eventotosave.imagem_principal = '';
            eventotosave.bairros = [evento.bairros];

            let jwt = user.jwt    
            let config = { headers: { 'Authorization': `Bearer ${jwt}` } };            

            request = await axios.post(`${process.env.REACT_APP_URL_API}eventos/`, eventotosave, config);

            if(request.statusText == 'OK'){
                new FormData(evento)
    
                if(evento.imagem_principal){
                    let imagem_destacada = {    
                        "files": evento.imagem_principal[0], // Buffer or stream of file(s)
                        "path": "evento/destacada", // Uploading folder of file(s).
                        "refId": request.data._id, // Evento's Id.
                        "ref": "evento", // Model name.
                        //"source": "users-permissions", // Plugin name.
                        "field": "imagem_destacada" // Field name in the User model.
                    }    
                    
                    let form = new FormData();
    
                    _.map(imagem_destacada, (value, key) => {
                        if(key == 'imagem_destacada'){
                            console.log("key: ", key, " --- value é FIELD: ", value);
                        }
                        
                        form.append(key, value);
                    })
                    
                    console.log("imagem destacada: ", imagem_destacada, '----', form);
    
                    //let config1 = { headers: { 'Authorization': `Bearer ${jwt}`, 'Content-Type': 'multipart/form-data' } };
                    let request_img = await axios.post(`${process.env.REACT_APP_URL_API}upload/`, form, config);
                }

                return({
                    type: SUCCESS_CREATE_EVENTO,
                    payload: request
                })
            }
            else{
                console.log("cadastrando o evento ver o erro: ", request);
                return({
                    type: ERROR_CREATE_EVENTO,
                    payload: {msg: "Houve um erro ao cadastrar o seu evento!" }
                })
            }
        }
        catch(error){
            console.log("ERROR DO CREATE EVENTO: ", error)
            return({
                type: ERROR_CREATE_EVENTO,
                payload: {msg: "Houve um erro ao efetuar o cadastro do seu evento!" }
            })
        } 
    
    }
    else{
        return(
            {
                type: ERROR_CREATE_EVENTO,
                payload: {msg: "Usuário não logado"}
            }
        )
    }

    
}

export const fetchEventoBySlug = async (slug) => {

   /*  let jwt = localStorage.getItem('jwt');
    

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}eventos/?slug=${slug}`, config); */

    const request = axios.get(`${process.env.REACT_APP_URL_API}eventos/?slug=${slug}`);

    return {
        type: FETCH_EVENTO,
        payload: request
    }
}


export const fetchEventos = async(id, limit=200) => {

    const request = axios.get(`${process.env.REACT_APP_URL_API}eventos/?_sort=_id:desc&_limit=${limit}`);

    return {
        type: FETCH_EVENTOS,
        payload: request
    }
}

export const fetchEventosByUser = async(user_id, limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`

    const request = axios.get(`${process.env.REACT_APP_URL_API}eventos/?user=${user_id}&_sort=${sort}${limit}`);

    return {
        type: FETCH_EVENTOS_USER,
        payload: request
    }
}

export const fetchEventosByAdm = async(limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`

    const request = await axios.get(`${process.env.REACT_APP_URL_API}eventos/?_sort=${sort}${limit}`);
    const count = await axios.get(`${process.env.REACT_APP_URL_API}eventos/count`);
    const newRequest = {data:request.data, count: count.data};

    console.log("request de evnetos: ", newRequest);

    return {
        type: FETCH_EVENTOS_USER,
        payload: newRequest
    }
}

export const fetchEventosByTag = async(tag='', limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=200`;
  

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
        const request = await axios.get(`${process.env.REACT_APP_URL_API}eventos/?${tags}&_sort=${sort}${limit}`);
        request.tag = req.data[0];
        return {
            type: FETCH_EVENTOS,
            payload: request
        }
    }
    else{
        return {
            type: FETCH_EVENTOS,
            payload: []
        }
    }
}

export const fetchEventosBySearch = async(search='', limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  

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
        req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=${search.keyword}&tipo=evento`);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            keyword=`&categoria=${req.data[0]._id}&`
        }
        
        keyword=`titulo_contains=${search.keyword}&`
    }


    const request = await axios.get(`${process.env.REACT_APP_URL_API}eventos/?${bairros}${keyword}&_sort=${sort}${limit}`);
    
    return {
        type: FETCH_EVENTOS,
        payload: request
    }
    
}


export const fetchEventosByCategory = async(category='', limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=200`;
  
    let categoria = ''
    let req;
    if(category){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=eventos/${category}`);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }
    }

    if(categoria !== '')
    {
        const request = await axios.get(`${process.env.REACT_APP_URL_API}eventos/?${categoria}&_sort=${sort}${limit}`);
        request.categoria = req.data[0];
        return {
            type: FETCH_EVENTOS,
            payload: request
        }
    }
    else{
        return {
            type: FETCH_EVENTOS,
            payload: []
        }
    }
}

export const fetchEventosRecentes = async(id, limit=5) => {

    const request = axios.get(`${process.env.REACT_APP_URL_API}eventos/?_sort=_id:desc&_limit=${limit}`);

    return {
        type: FETCH_EVENTOS_RECENTES,
        payload: request
    }
}