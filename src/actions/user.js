import {ERROR_CREATE_USER, CREATE_USER} from './types';

import axios from 'axios';

export const createUser = async(user) =>  {
    
    console.log("vai criar o usuario");
    let request;
    try{
        request = await axios.post(`${process.env.REACT_APP_URL_API}user/`, user);
        console.log("vai enviar o request para criar: ", request);

        return({
            type: CREATE_USER,
            payload: request
        })
    }
    catch(e){
        console.log("Exception: ", e);

        return({
            type: ERROR_CREATE_USER,
            payload: {msg: 'Houve um erro ao se cadastrar! Favor tentar novamente.'}
        })
    }


};