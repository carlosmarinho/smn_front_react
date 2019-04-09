import { ERROR_CREATE_USER, SUCCESS_CREATE_USER, SUCCESS_CREATE_GUIA, ERROR_CREATE_GUIA,  } from "../actions/types";

export default function(state = null, action) {

    let message = {success: {
            user: null, 
            guia: null
        },
        error: {
            user:null,
            guia: null
        }
    }
    switch (action.type) {
        case ERROR_CREATE_USER:
            message.success.user = null
            
            console.log("Retorno do payload no error create userrrr: ", action.payload)
            message.error.user = action.payload;
            return message;
        case SUCCESS_CREATE_USER:
            message.error.user = null;
            
            console.log("Retorno do payload no succcesssss create userrrr: ", action.payload)
            message.success.user = action.payload;
            return message;

        case ERROR_CREATE_GUIA:
            message.success.user = null
            
            console.log("Retorno do payload no error create GUAIIIIIAAAAA: ", action.payload)
            message.error.guia = action.payload;
            return message;
        case SUCCESS_CREATE_GUIA:
            message.error.user = null;
            
            console.log("Retorno do payload no succcesssss create guiiiaaaaa: ", action.payload)
            message.success.guia = action.payload;
            return message;
        default: return state;
    }
}