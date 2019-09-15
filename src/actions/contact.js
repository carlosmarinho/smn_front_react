import {ERROR_CREATE_CONTACT, SUCCESS_CREATE_CONTACT} from './types';

import axios from 'axios';
 
export const createContact = async(contact) =>  {
    
    console.log("vai criar o CONTATO");
    let request;
    try{
        request = await axios.post(`${process.env.REACT_APP_URL_API}contatos`, contact);
        console.log("vai enviar o request para criar: ", request);
        if(request.statusText === 'OK'){
            return({
                type: SUCCESS_CREATE_CONTACT,
                payload: request
            })
        }
        else{
            return({
                type: ERROR_CREATE_CONTACT,
                payload: {msg: "Houve um erro ao efetuar o contato!" }
            })
        }
    }
    catch(e){
        console.log("Exception: ", e.response);

        return({
            type: ERROR_CREATE_CONTACT,
            payload: {msg: e.response.data.message}
        })
    }


};