import _ from 'lodash';
import {
    FETCH_ME, 
    FETCH_USER,
    DELETE_USER,
    CONFIRM_USER,
    FETCH_USERS,
    ERROR_EDIT_USER, 
    SUCCESS_EDIT_USER, 
    ERROR_CREATE_USER, 
    SUCCESS_CREATE_USER, 
    LOGIN_USER
} from './types';

import axios from 'axios';

/* export const createUser = async(user) =>  {
    
    let request;
    axios.post(`${process.env.REACT_APP_URL_API}auth/local/register/`, user)
    .then(response => {
        console.log("vai enviar o request para criar: ", response);
        if(response.statusText == 'OK'){
            return({
                type: SUCCESS_CREATE_USER,
                payload: {msg: "sucesso"}
            })
        }
        else{
            console.log("status text não é igual a OK: ", response);
            return({
                type: ERROR_CREATE_USER,
                payload: {msg: "Houve um erro ao cadastrar o usuário!"}
            })
        }
    })
    .catch(error => {
        console.log("error: ", error);
        return({
            type: ERROR_CREATE_USER,
            payload: {msg: "errrooooorrrr"}
        })        
    })


}; */

export const editUser = async (user, id) => {

    let u = JSON.parse(localStorage.getItem('user'));
    let request;
    if(u){
        try
        {
            //correção para salvar uma relação no strapi
            let usertosave = _.clone(user);
            usertosave.imagem_principal = '';
            
            if(user.cidade)
                usertosave.cidade = [user.cidade];
            else
                delete usertosave.cidade;

            if(user.bairro)
                usertosave.bairro = [user.bairro];
            

            console.log("user to save: ", usertosave);

            delete usertosave.email
            
            let jwt = u.jwt    
            let config = { headers: { 'Authorization': `Bearer ${jwt}` } };
          
            request = await axios.put(`${process.env.REACT_APP_URL_API}users/${id}`, usertosave, config);

            if(request.statusText == 'OK'){
                //new FormData(user)
    
                if(user.imagem_principal){
                    console.log("imagem principal: ", user.imagem_principal[0])
                    let imagem_perfil = {    
                        "files": user.imagem_principal[0], // Buffer or stream of file(s)
                        "path": "user/destacada", // Uploading folder of file(s).
                        "refId": request.data._id, // User's Id.
                        "ref": "user", // Model name.
                        "source": "users-permissions", // Plugin name.
                        "field": "imagem_perfil" // Field name in the User model.
                    }  
    
                    console.log("imagem perfil", imagem_perfil);                
                    let form = new FormData();
    
                    _.map(imagem_perfil, (value, key) => {
                        if(key == 'imagem_perfil'){
                            console.log("key: ", key, " --- value é FIELD: ", value);
                        }
                        form.append(key, value);
                        console.log(key, ' ===== ', value, '---->', form );
                    })

                    console.log("imageeeemmmmm form: ", form)
                    
                    //let config1 = { headers: { 'Authorization': `Bearer ${jwt}`, 'Content-Type': 'multipart/form-data' } };
                    let request_img = await axios.post(`${process.env.REACT_APP_URL_API}upload/`, form, config);
                }

                return({
                    type: SUCCESS_EDIT_USER,
                    payload: request
                })
            }
            else{
                console.log("Editando o user ver o erro: ", request);
                return({
                    type: ERROR_EDIT_USER,
                    payload: {msg: "Houve um erro ao editar o seu user!" }
                })
            }
        }
        catch(error){
            console.log("ERROR DO EDIT USER: ", error)
            return({
                type: ERROR_EDIT_USER,
                payload: {msg: "Houve um erro ao editar o seu user!" }
            })
        } 
    
    }
    else{
        return(
            {
                type: ERROR_EDIT_USER,
                payload: {msg: "Usuário não logado"}
            }
        )
    }   
}

export const fetchMe = async () => {
    let user = JSON.parse(localStorage.getItem('user'));

    let request;
    if(user){
        let jwt = user.jwt    
        let config = { headers: { 'Authorization': `Bearer ${jwt}` } };
        
        try{
            request = await axios.get(`${process.env.REACT_APP_URL_API}users/me`, config);
            return {
                type: FETCH_ME,
                payload: request
            }
        }
        catch(e){
            console.log('era p er removidooooooooooooooooooooooooooooooo');
            return {
                type: FETCH_ME,
                payload: {token: 'invalid'}
            }
        
        }

        
    }

    return {
        type: FETCH_ME,
        payload: false
    }
}

export const fetchUser = (id) => {
    const request = axios.get(`${process.env.REACT_APP_URL_API}users/${id}`);
    return {
        type: FETCH_USER,
        payload: request
    }
}


export const login = async(values) => {
    let request;
    try{
        request = await axios.post(`${process.env.REACT_APP_URL_API}auth/local/`, values)    
        //request.data.expires = params['raw[expires_in]'];
        localStorage.setItem("user", JSON.stringify(request.data));
    }
    catch( error ){
        request = { data: {loginError: "Houve um erro ao fazer o seu login"}};
        console.log("\n\n\nError ao logar ao buscar o user", error);
    }

    return({
        type: LOGIN_USER,
        payload: request.data
    })
    
}

export const loginProvider = async(provider, params) => {
    let request;
    console.log("guardando o user no storage", params);
    try{
        request = await axios.get(`${process.env.REACT_APP_URL_API}auth/${provider}/callback?access_token=${params.access_token}`)    
        request.data.expires = params['raw[expires_in]'];
        localStorage.setItem("user", JSON.stringify(request.data));
    }
    catch( error ){
        request = { data: {loginError: "Houve um erro ao fazer o seu login"}};
        console.log("\n\n\nError ao logar ao buscar o user", error);
    }

    return({
        type: LOGIN_USER,
        payload: request.data
    })
    
}
 
export const createUser = async(user) =>  {
    
    console.log("vai criar o usuario");
    let request;
    try{
        request = await axios.post(`${process.env.REACT_APP_URL_API}auth/local/register/`, user);
        console.log("vai enviar o request para criar: ", request);
        if(request.statusText == 'OK'){
            return({
                type: SUCCESS_CREATE_USER,
                payload: request
            })
        }
        else{
            return({
                type: ERROR_CREATE_USER,
                payload: {msg: "Houve um erro ao efetuar o cadastro!" }
            })
        }
    }
    catch(e){
        console.log("Exception: ", e.response);

        return({
            type: ERROR_CREATE_USER,
            payload: {msg: e.response.data.message}
        })
    }


};

export const fetchUsersByAdm = async(limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`

    const request = await axios.get(`${process.env.REACT_APP_URL_API}users/?_sort=${sort}${limit}`);
    //const count = await axios.get(`${process.env.REACT_APP_URL_API}users/count`);
    //const newRequest = {data:request.data, count: count.data};

    return {
        type: FETCH_USERS,
        payload: request
    }
}

export const confirmUnconfirmUser = async (id, approve) => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if(user){
        let config = { headers: { 'Authorization': `Bearer ${user.jwt}` } };
        const request = await axios.put(`${process.env.REACT_APP_URL_API}users/${id}`, {approved: approve}, config);
        if(request.statusText == 'OK'){
            return {
                type: CONFIRM_USER,
                payload: {id, approved: approve}
            }
        }

        return {
            type: CONFIRM_USER,
            payload: false
        }
    }
    else{
        return({
            type: ERROR_EDIT_USER,
            payload: {msg: "Usuário não logado"}
        })
    }
}


export const deleteUser = async (id) => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if(user){
        let config = { headers: { 'Authorization': `Bearer ${user.jwt}` } };
        const request = await axios.delete(`${process.env.REACT_APP_URL_API}users/${id}`, config);
        if(request.statusText == 'OK'){
            return {
                type: DELETE_USER,
                payload: id
            }
        }

        return {
            type: DELETE_USER,
            payload: false
        }
    }
    else{
        return({
            type: ERROR_EDIT_USER,
            payload: {msg: "Usuário não logado"}
        })
    }
}