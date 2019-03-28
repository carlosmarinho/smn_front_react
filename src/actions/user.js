import {ERROR_CREATE_USER, SUCCESS_CREATE_USER, LOGIN_USER} from './types';

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

export const loginProvider = async(token) => {
    let request;
    try{
        request = await axios.get(`${process.env.REACT_APP_URL_API}auth/facebook/callback?access_token=${token}`)    
        console.log("guardando o user no storage", request.data);
        localStorage.setItem("user", JSON.stringify(request.data));
    }
    catch( error ){
        console.log("\n\n\nError ao logar ao buscar o user");
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