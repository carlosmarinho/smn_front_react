import _ from 'lodash';
import axios from 'axios';
import { 
    FEATURED_GUIA,
    APPROVE_GUIA,
    SUCCESS_CREATE_GUIA, 
    REMOVE_IMAGE_GUIA, 
    ERROR_CREATE_GUIA, 
    SUCCESS_EDIT_GUIA, 
    ERROR_EDIT_GUIA,
    DELETE_GUIA,
    FETCH_FEATURED_GUIAS, 
    FETCH_GUIA, 
    FETCH_GUIAS, 
    FETCH_GUIAS_RECENTES, 
    FETCH_GUIAS_FEATURED, 
    FETCH_GUIAS_USER 
} from "./types";


export const createGuia = async (guia) => {

    let user = JSON.parse(localStorage.getItem('user'));
    console.log("user ao criar post: ", user);
    let request;
    if(user){
        try
        {
            //correção para salvar uma relação no strapi
            let guiatosave = _.clone(guia);
            guiatosave.cidade = [guia.cidade];
            guiatosave.galeria_img = '';
            guiatosave.imagem_principal = '';
            guiatosave.bairros = [guia.bairros];
            guiatosave.slug = _.kebabCase(guia.titulo);
            guiatosave.user = [user.user._id];

            let jwt = user.jwt    
            let config = { headers: { 'Authorization': `Bearer ${jwt}` } };            

            request = await axios.post(`${process.env.REACT_APP_URL_API}guias/`, guiatosave, config);

            if(request.statusText == 'OK'){
                new FormData(guia)
    
                if(guia.imagem_principal){
                    let imagem_destacada = {    
                        "files": guia.imagem_principal[0], // Buffer or stream of file(s)
                        "path": "guia/destacada", // Uploading folder of file(s).
                        "refId": request.data._id, // Guia's Id.
                        "ref": "guia", // Model name.
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
                    
    
                    //let config1 = { headers: { 'Authorization': `Bearer ${jwt}`, 'Content-Type': 'multipart/form-data' } };
                    let request_img = await axios.post(`${process.env.REACT_APP_URL_API}upload/`, form, config);
                }

                if(guia.galeria_img){
                    
                    let form1 = new FormData();
                    form1.append('path', 'guia/galeria');
                    form1.append('refId', request.data._id);
                    form1.append('ref', 'guia');
                    form1.append('field', 'galeria_imagens');
    
    
                    guia.galeria_img.map( (value, key) => {
                        //return value[0];
                        form1.append(`files`, value[0])
                    })
    
                    let request_gal = await axios.post(`${process.env.REACT_APP_URL_API}upload/`, form1, config);
                }

                const htmlToSend = `Faça <a href="${process.env.REACT_APP_URL_FRONTEND}login">login</a>
                    e veja o novo guia cadastrado veja os dados abaixo: <br><br> ${JSON.stringify(guiatosave)}`;

                const email = {
                    to: 'carluizfla@hotmail.com',
                    subject: `Novo guia '${guia.titulo}' cadastrado`,
                    html: htmlToSend,
                }

                console.log("vai enviar o email: ", email);

                axios.post(`${process.env.REACT_APP_URL_API}email/`, email, config)

                return({
                    type: SUCCESS_CREATE_GUIA,
                    payload: request
                })
            }
            else{
                console.log("cadastrando o guia ver o erro: ", request);
                return({
                    type: ERROR_CREATE_GUIA,
                    payload: {msg: "Houve um erro ao cadastrar o seu guia!" }
                })
            }
        }
        catch(error){
            console.log("ERROR DO CREATE GUIA: ", error)
            return({
                type: ERROR_CREATE_GUIA,
                payload: {msg: "Houve um erro ao efetuar o cadastro do seu guia!" }
            })
        } 
    
    }
    else{
        return(
            {
                type: ERROR_CREATE_GUIA,
                payload: {msg: "Usuário não logado"}
            }
        )
    }

    
}

export const editGuia = async (guia, id) => {

    let user = JSON.parse(localStorage.getItem('user'));
    console.log("guia post editar: ", guia);
    let request;
    if(user){
        try
        {
            //correção para salvar uma relação no strapi
            let guiatosave = _.clone(guia);
            guiatosave.cidade = [guia.cidade];
            guiatosave.galeria_img = '';
            guiatosave.imagem_principal = '';
            guiatosave.bairros = [guia.bairros];
            if(guia.slug == '')
                guiatosave.slug = _.kebabCase(guia.titulo);

            let jwt = user.jwt    
            let config = { headers: { 'Authorization': `Bearer ${jwt}` } };
          
            request = await axios.put(`${process.env.REACT_APP_URL_API}guias/${id}`, guiatosave, config);

            if(request.statusText == 'OK'){
                //new FormData(guia)
    
                if(guia.imagem_principal){
                    let imagem_destacada = {    
                        "files": guia.imagem_principal[0], // Buffer or stream of file(s)
                        "path": "guia/destacada", // Uploading folder of file(s).
                        "refId": request.data._id, // Guia's Id.
                        "ref": "guia", // Model name.
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
                    
                    console.log("formmmmmmmmm userrr: ", form);

    
                    //let config1 = { headers: { 'Authorization': `Bearer ${jwt}`, 'Content-Type': 'multipart/form-data' } };
                    let request_img = await axios.post(`${process.env.REACT_APP_URL_API}upload/`, form, config);
                }

                if(guia.galeria_img){
                    console.log("guia galeria_img: ", guia.galeria_img);    
                    
                    let form1 = new FormData();
                    form1.append('path', 'guia/galeria');
                    form1.append('refId', request.data._id);
                    form1.append('ref', 'guia');
                    form1.append('field', 'galeria_imagens');
        
                    guia.galeria_img.map( (value, key) => {
                        //return value[0];
                        form1.append(`files`, value[0])
                    })
    
                    let request_gal = await axios.post(`${process.env.REACT_APP_URL_API}upload/`, form1, config);
                }


                return({
                    type: SUCCESS_EDIT_GUIA,
                    payload: request
                })
            }
            else{
                console.log("Editando o guia ver o erro: ", request);
                return({
                    type: ERROR_EDIT_GUIA,
                    payload: {msg: "Houve um erro ao editar o seu guia!" }
                })
            }
        }
        catch(error){
            console.log("ERROR DO EDIT GUIA: ", error)
            return({
                type: ERROR_EDIT_GUIA,
                payload: {msg: "Houve um erro ao editar o seu guia!" }
            })
        } 
    
    }
    else{
        return(
            {
                type: ERROR_EDIT_GUIA,
                payload: {msg: "Usuário não logado"}
            }
        )
    }

    
}



export const createGuiabkp = async (guia) => {

    let user = JSON.parse(localStorage.getItem('user'));

    let request;
    if(user){
        try{
            let jwt = user.jwt    
            let config = { headers: { 'Authorization': `Bearer ${jwt}` } };
            request = await axios.post(`${process.env.REACT_APP_URL_API}guias/`, guia, config);

            if(request.statusText == 'OK'){
                return({
                    type: SUCCESS_CREATE_GUIA,
                    payload: request
                })
            }
            else{
                console.log("cadastrando o user ver o erro: ", request);
                return({
                    type: ERROR_CREATE_GUIA,
                    payload: {msg: "Houve um erro ao efetuar o cadastro!" }
                })
            }
        }
        catch(error){
            console.log("ERROR DO CREATE GUIA: ", request)
        }
    
    }
    else{
        return(
            {
                type: ERROR_CREATE_GUIA,
                payload: {msg: "Usuário não logado"}
            }
        )
    }    
}

export const fetchGuia = (id) => {
    const request = axios.get(`${process.env.REACT_APP_URL_API}guias/${id}`);
    return {
        type: FETCH_GUIA,
        payload: request
    }
}

export const approveReproveGuia = async (id, approve) => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if(user){
        let config = { headers: { 'Authorization': `Bearer ${user.jwt}` } };
        const request = await axios.put(`${process.env.REACT_APP_URL_API}guias/${id}`, {approved: approve}, config);
        if(request.statusText == 'OK'){
            return {
                type: APPROVE_GUIA,
                payload: {id, approved: approve}
            }
        }

        return {
            type: APPROVE_GUIA,
            payload: false
        }
    }
    else{
        return({
            type: ERROR_EDIT_GUIA,
            payload: {msg: "Usuário não logado"}
        })
    }
}

export const deleteGuia = async (id) => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if(user){
        let config = { headers: { 'Authorization': `Bearer ${user.jwt}` } };
        const request = await axios.delete(`${process.env.REACT_APP_URL_API}guias/${id}`, config);
        if(request.statusText == 'OK'){
            return {
                type: DELETE_GUIA,
                payload: id
            }
        }

        return {
            type: DELETE_GUIA,
            payload: false
        }
    }
    else{
        return({
            type: ERROR_EDIT_GUIA,
            payload: {msg: "Usuário não logado"}
        })
    }
}

export const removeImageAssociation = async (id, id_guia) => {
    let related = {related: []}
    const request = await axios.put(`${process.env.REACT_APP_URL_API}uploadfile/${id}`, related);
    console.log("request: ", request)
    if(request.statusText == 'OK'){
        console.log("conseguiu atualizar a imagem.....");
        return {
            type: REMOVE_IMAGE_GUIA,
            payload: []
        }
    }

    return {
        type: REMOVE_IMAGE_GUIA,
        payload: false
    }
    
}

export const fetchGuiaBySlug = async (slug, view = false) => {

    /* let jwt = localStorage.getItem('jwt');
    

    if(!jwt){
        let ret = await axios.post(`${process.env.REACT_APP_URL_API}auth/local`, { identifier: process.env.REACT_APP_USER_API, password: process.env.REACT_APP_PASSWORD_API })
        jwt = ret.data.jwt;
        localStorage.setItem('jwt', jwt);
    }

    let config = { headers: { 'Authorization': `Bearer ${jwt}` } };

    const request = axios.get(`${process.env.REACT_APP_URL_API}guias/?slug=${slug}`, config); */

    let request = {};
    if(view)
        request = axios.get(`${process.env.REACT_APP_URL_API}guias/?slug=${slug}`);
    else
        request = axios.get(`${process.env.REACT_APP_URL_API}guias/?approved=true&slug=${slug}`);
    

    return {
        type: FETCH_GUIA,
        payload: request
    }
}

export const fetchGuiasByAdm = async(limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`


    const request = await axios.get(`${process.env.REACT_APP_URL_API}guias/?_sort=${sort}${limit}`);
    const count = await axios.get(`${process.env.REACT_APP_URL_API}guias/count`);
    const newRequest = {data:request.data, count: count.data};

    console.log("aqui no fetch guias by user", newRequest );

    return {
        type: FETCH_GUIAS_USER,
        payload: newRequest
    }

}

export const fetchGuiasByUser = async(user_id, limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`


    const request = axios.get(`${process.env.REACT_APP_URL_API}guias/?user=${user_id}&_sort=${sort}${limit}`);

    console.log("aqui no fetch guias by user")
    return {
        type: FETCH_GUIAS_USER,
        payload: request
    }

}


export const fetchGuiasRecentes = async(city_id, limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`


    const request = axios.get(`${process.env.REACT_APP_URL_API}guias/?_sort=${sort}&approved=true&nao_existe_mais=false&${limit}&cidade=${city_id}`);

    return {
        type: FETCH_GUIAS_RECENTES,
        payload: request
    }

}

export const fetchGuiasByCategoryBoth = async(category='', limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=150`;
  
    let categoria = ''
    let categoriaServico = ''
    let req;
    if(category){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=guia/comercial/${category}`);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }

        req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=guia/servicos/${category}`);
    
        if(req.data.length > 0){
            categoriaServico=`categorias=${req.data[0]._id}&`
        }
    }



    if(categoria !== '')
    {
        let request = await axios.get(`${process.env.REACT_APP_URL_API}guias/?approved=true&nao_existe_mais=false&${categoria}_sort=${sort}${limit}`);
        const request1 = await axios.get(`${process.env.REACT_APP_URL_API}guias/?approved=true&nao_existe_mais=false&${categoriaServico}&_sort=${sort}${limit}`);
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
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  

    let categoria = ''
    let req;
    if(category){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=guia/comercial/${category}`);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }
       
    }

    if(categoria !== '')
    {
        const request = await axios.get(`${process.env.REACT_APP_URL_API}guias/?${categoria}&approved=true&nao_existe_mais=false&_sort=${sort}${limit}`);
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
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  
    let categoria = ''
    let req;
    if(category){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=guia/servicos/${category}`);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }
    }

    if(categoria !== '')
    {
        const request = await axios.get(`${process.env.REACT_APP_URL_API}guias/?${categoria}&approved=true&nao_existe_mais=false&_sort=${sort}${limit}`);
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

export const fetchGuiasByBairroId = async(bairro='', limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;

    
    const request = await axios.get(`${process.env.REACT_APP_URL_API}guias/?bairros=${bairro}&approved=true&nao_existe_mais=false&_sort=${sort}${limit}`);
    console.log("request do novo fetch eventos by id", request.data)
    return {
        type: FETCH_GUIAS,
        payload: request
    }

}

export const fetchGuiasByCategoryId = async(category='', guias=[], limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;

    let request = {data:[]};
    if(category !== 0)
        request = await axios.get(`${process.env.REACT_APP_URL_API}guias/?categorias=${category}&approved=true&nao_existe_mais=false&_sort=${sort}${limit}`);

    const newRequest = {data: request.data, data1: guias}

    return {
        type: FETCH_GUIAS,
        payload: newRequest
    }
}


export const fetchGuiasByCategory = async(category='', limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  

    let categoria = ''
    let req;
    if(category){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=guia/comercial/${category}`);

        if(req.data.length > 0){
            categoria=`categorias=${req.data[0]._id}&`
        }
        else{
            req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=guia/servicos/${category}`);

            if(req.data.length > 0){
                categoria=`categorias=${req.data[0]._id}&`
            }
        }
    }

    if(categoria !== '')
    {
        const request = await axios.get(`${process.env.REACT_APP_URL_API}guias/?${categoria}&approved=true&nao_existe_mais=false&_sort=${sort}${limit}`);
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
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  

    let tags = '';
    let req;
    if(tag){
        req = await axios.get(`${process.env.REACT_APP_URL_API}tags/?slug=${tag}`);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            tags=`tags=${req.data[0]._id}&`
        }
        
    }

    if(tags !== '')
    {
        const request = await axios.get(`${process.env.REACT_APP_URL_API}guias/?${tags}&_sort=${sort}&approved=true&${limit}`);
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

export const featureUnfeatureGuia = async (id, featured) => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if(user){
        let config = { headers: { 'Authorization': `Bearer ${user.jwt}` } };
        const request = await axios.put(`${process.env.REACT_APP_URL_API}guias/${id}`, {featured: featured}, config);
        if(request.statusText == 'OK'){
            return {
                type: FEATURED_GUIA,
                payload: {id, featured}
            }
        }

        return {
            type: FEATURED_GUIA,
            payload: false
        }
    }
    else{
        return({
            type: ERROR_EDIT_GUIA,
            payload: {msg: "Usuário não logado"}
        })
    }
}



export const fetchGuiasBySearch = async(search='', limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  
    let bairros = '';
    let req;
    if(search.bairro){
        req = await axios.get(`${process.env.REACT_APP_URL_API}bairros/?slug=${search.bairro}`);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            bairros=`bairros=${req.data[0]._id}&`
        }
        
    }

    let keyword = '';
    if(search.keyword){
        req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=${search.keyword}&tipo=guia comercial`);

        if(req.data.length > 0){
            console.log("request do tag: ", req.data);
            keyword=`&categoria=${req.data[0]._id}&`
        }
        else{
            req = await axios.get(`${process.env.REACT_APP_URL_API}categorias/?slug=${search.keyword}&tipo=guia serviço`);

            if(req.data.length > 0){
                console.log("request do tag: ", req.data);
                keyword=`&categoria=${req.data[0]._id}&`
            }
        }
        
        keyword=`titulo_contains=${search.keyword}&`
    }

    const request = await axios.get(`${process.env.REACT_APP_URL_API}guias/?approved=true&${bairros}${keyword}_sort=${sort}${limit}`);
    
    return {
        type: FETCH_GUIAS,
        payload: request
    }
    
}

export const fetchGuias = async(city_id, search='', limit='', sort=null) => {
    if(!sort)
        sort = '_id:desc';

    if(limit)
        limit = `&_limit=${limit}`;
    else
        limit = `&_limit=500`;
  
    const request = axios.get(`${process.env.REACT_APP_URL_API}guias/?${search}&approved=true&nao_existe_mais=false&_sort=${sort}${limit}&cidade=${city_id}`);

    return {
        type: FETCH_GUIAS,
        payload: request
    }
}

export const fetchFeaturedGuias = async(city_id, bairro_id = null) => {

    let query = `cidade_destaque=${city_id}`;
    if(bairro_id != null)
        query = `bairros=${bairro_id}`;

    let request = await axios.get(`${process.env.REACT_APP_URL_API}guias/?approved=true&nao_existe_mais=false&${query}`);
    

    return {
        type: FETCH_FEATURED_GUIAS,
        payload: request
    }
}

export const fetchGuiasFeatured = async(city_id) => {

    const request = axios.get(`${process.env.REACT_APP_URL_API}guias/?approved=true&cidade_destaque=${city_id}`);

    return {
        type: FETCH_GUIAS_FEATURED,
        payload: request
    }
}
