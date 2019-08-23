import _ from 'lodash';
import axios from 'axios';
import { 
    DELETE_NOTICIA
    SUCCESS_CREATE_NOTICIA, 
    ERROR_CREATE_NOTICIA, 
    SUCCESS_EDIT_NOTICIA, 
    ERROR_EDIT_NOTICIA,
    FETCH_NOTICIA, 
    FETCH_NOTICIAS, 
    FETCH_NOTICIAS_RECENTES, 
    FETCH_NOTICIAS_FEATURED, 
    FETCH_NOTICIAS_USER,
    REMOVE_IMAGE_NOTICIA
 } from "./types";

export const createNoticia = async (noticia) => {

    let user = JSON.parse(localStorage.getItem('user'));
    console.log("noticia post: ", noticia);
    let request;
    if(user){
        try
        {
            //correção para salvar uma relação no strapi
            let noticiatosave = _.clone(noticia);
            noticiatosave.cidade = [noticia.cidade];
            noticiatosave.galeria_img = '';
            
            noticiatosave.imagem_principal = '';
            noticiatosave.slug = _.kebabCase(noticia.titulo);


            let jwt = user.jwt    
            let config = { headers: { 'Authorization': `Bearer ${jwt}` } };            

            request = await axios.post(`${process.env.REACT_APP_URL_API}noticias/`, noticiatosave, config);

            if(request.statusText == 'OK'){
                new FormData(noticia)
    
                if(noticia.imagem_principal){
                    let imagem_destacada = {    
                        "files": noticia.imagem_principal[0], // Buffer or stream of file(s)
                        "path": "noticia/destacada", // Uploading folder of file(s).
                        "refId": request.data._id, // Noticia's Id.
                        "ref": "noticia", // Model name.
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
                    type: SUCCESS_CREATE_NOTICIA,
                    payload: request
                })
            }
            else{
                console.log("cadastrando a noticia ver o erro: ", request);
                return({
                    type: ERROR_CREATE_NOTICIA,
                    payload: {msg: "Houve um erro ao cadastrar a noticia!" }
                })
            }
        }
        catch(error){
            console.log("ERROR DO CREATE NOTICIA: ", error)
            return({
                type: ERROR_CREATE_NOTICIA,
                payload: {msg: "Houve um erro ao efetuar o cadastro da sua noticia!" }
            })
        } 
    
    }
    else{
        return(
            {
                type: ERROR_CREATE_NOTICIA,
                payload: {msg: "Usuário não logado"}
            }
        )
    }

    
}


export const editNoticia = async (noticia, id) => {

    let user = JSON.parse(localStorage.getItem('user'));
    console.log("noticia post editar: ", noticia);
    let request;
    if(user){
        try
        {
            //correção para salvar uma relação no strapi
            let noticiatosave = _.clone(noticia);
            noticiatosave.cidade = [noticia.cidade];
            noticiatosave.imagem_principal = '';
            noticiatosave.bairros = [noticia.bairros];
            if(noticia.slug == '')
                noticiatosave.slug = _.kebabCase(noticia.titulo);

            let jwt = user.jwt    
            let config = { headers: { 'Authorization': `Bearer ${jwt}` } };
          
            request = await axios.put(`${process.env.REACT_APP_URL_API}noticias/${id}`, noticiatosave, config);

            if(request.statusText == 'OK'){
                //new FormData(noticia)
    
                if(noticia.imagem_principal){
                    console.log("imagem destacada: ", noticia.imagem_principal[0])
                    let imagem_destacada = {    
                        "files": noticia.imagem_principal[0], // Buffer or stream of file(s)
                        "path": "noticia/destacada", // Uploading folder of file(s).
                        "refId": request.data._id, // Noticia's Id.
                        "ref": "noticia", // Model name.
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

                if(noticia.galeria_img){
                    console.log("noticia galeria_img: ", noticia.galeria_img);    
                    
                    let form1 = new FormData();
                    form1.append('path', 'noticia/galeria');
                    form1.append('refId', request.data._id);
                    form1.append('ref', 'noticia');
                    form1.append('field', 'galeria_imagens');
        
                    noticia.galeria_img.map( (value, key) => {
                        //return value[0];
                        form1.append(`files`, value[0])
                    })
    
                    let request_gal = await axios.post(`${process.env.REACT_APP_URL_API}upload/`, form1, config);
                }


                return({
                    type: SUCCESS_EDIT_NOTICIA,
                    payload: request
                })
            }
            else{
                console.log("Editando o noticia ver o erro: ", request);
                return({
                    type: ERROR_EDIT_NOTICIA,
                    payload: {msg: "Houve um erro ao editar o seu noticia!" }
                })
            }
        }
        catch(error){
            console.log("ERROR DO EDIT NOTICIA: ", error)
            return({
                type: ERROR_EDIT_NOTICIA,
                payload: {msg: "Houve um erro ao editar o seu noticia!" }
            })
        } 
    
    }
    else{
        return(
            {
                type: ERROR_EDIT_NOTICIA,
                payload: {msg: "Usuário não logado"}
            }
        )
    }

    
}

export const deleteNoticia = async (id) => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if(user){
        let config = { headers: { 'Authorization': `Bearer ${user.jwt}` } };
        const request = await axios.delete(`${process.env.REACT_APP_URL_API}noticias/${id}`, config);
        if(request.statusText == 'OK'){
            return {
                type: DELETE_NOTICIA,
                payload: id
            }
        }

        return {
            type: DELETE_NOTICIA,
            payload: false
        }
    }
    else{
        return({
            type: ERROR_EDIT_NOTICIA,
            payload: {msg: "Usuário não logado"}
        })
    }
}

export const removeImageAssociation = async (id, id_evento) => {
    let related = {related: []}
    const request = await axios.put(`${process.env.REACT_APP_URL_API}uploadfile/${id}`, related);
    console.log("request: ", request)
    if(request.statusText == 'OK'){
        console.log("conseguiu atualizar a imagem.....");
        return {
            type: REMOVE_IMAGE_NOTICIA,
            payload: []
        }
    }

    return {
        type: REMOVE_IMAGE_NOTICIA,
        payload: false
    }
    
}

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

    const request = axios.get(`${process.env.REACT_APP_URL_API}noticias/?user=${user_id}&_sort=${sort}:desc&${limit}`);

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

    const request = await axios.get(`${process.env.REACT_APP_URL_API}noticias/?_sort=${sort}:desc&${limit}`);
    const count = await axios.get(`${process.env.REACT_APP_URL_API}noticias/count`);
    const newRequest = {data:request.data, count: count.data};


    return {
        type: FETCH_NOTICIAS_USER,
        payload: newRequest
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

export const fetchNoticia = (id) => {
    const request = axios.get(`${process.env.REACT_APP_URL_API}noticias/${id}`);
    return {
        type: FETCH_NOTICIA,
        payload: request
    }
}

export const removeImageAssociation = async (id, id_evento) => {
    let related = {related: []}
    const request = await axios.put(`${process.env.REACT_APP_URL_API}uploadfile/${id}`, related);
    console.log("request: ", request)
    if(request.statusText == 'OK'){
        console.log("conseguiu atualizar a imagem.....");
        return {
            type: REMOVE_IMAGE_NOTICIA,
            payload: []
        }
    }

    return {
        type: REMOVE_IMAGE_NOTICIA,
        payload: false
    }
    
}