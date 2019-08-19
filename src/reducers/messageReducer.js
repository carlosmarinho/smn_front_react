import { ERROR_CREATE_USER, 
    SUCCESS_CREATE_USER, 
    SUCCESS_CREATE_GUIA,  
    ERROR_CREATE_GUIA, 
    SUCCESS_EDIT_GUIA,  
    ERROR_EDIT_GUIA,
    SUCCESS_CREATE_EVENTO,  
    ERROR_CREATE_EVENTO, 
    SUCCESS_EDIT_EVENTO,  
    ERROR_EDIT_EVENTO,
    SUCCESS_CREATE_NOTICIA,  
    ERROR_CREATE_NOTICIA, 
    SUCCESS_EDIT_NOTICIA,  
    ERROR_EDIT_NOTICIA
} from "../actions/types";

export default function(state = null, action) {

    let message = {success: {
            user: null, 
            guia: null,
            evento: null,
            noticia: null,
        },
        error: {
            user:null,
            guia: null,
            evento: null,
            noticia: null,
        }
    }
    switch (action.type) {
        case ERROR_CREATE_USER:
            message.success.user = null
            
            message.error.user = action.payload;
            return message;
        case SUCCESS_CREATE_USER:
            message.error.user = null;
            
            message.success.user = action.payload;
            return message;

        case ERROR_CREATE_GUIA:
            message.success.user = null
            
            message.error.guia = action.payload;
            return message;
        case SUCCESS_CREATE_GUIA:
            message.error.user = null;
            
            message.success.guia = action.payload;
            message.success.guia.msg = "Guia cadastrado com sucesso!"
            return message;
        case ERROR_EDIT_GUIA:
                message.success.user = null
                
                message.error.guia = action.payload;
                return message;
        case SUCCESS_EDIT_GUIA:
                message.error.user = null;
                
                message.success.guia = action.payload;
                message.success.guia.msg = "Guia editado com sucesso!"
                return message;
        case ERROR_CREATE_EVENTO:
            message.success.user = null
            
            console.log("Retorno do payload no error create EVENTO: ", action.payload)
            message.error.evento = action.payload;
            return message;
        case SUCCESS_CREATE_EVENTO:
            message.error.user = null;
            
            console.log("Retorno do payload no succcesssss create EVENTO: ", action.payload)
            message.success.evento = action.payload;
            message.success.evento.msg = "Evento cadastrado com sucesso!"
            return message;
        case ERROR_EDIT_EVENTO:
                message.success.user = null
                
                console.log("Retorno do payload no error create EVENTO: ", action.payload)
                message.error.evento = action.payload;
                return message;
        case SUCCESS_EDIT_EVENTO:
                message.error.user = null;
                
                console.log("Retorno do payload no succcesssss create EVENTO: ", action.payload)
                message.success.evento = action.payload;
                message.success.evento.msg = "Evento editado com sucesso!"
                return message;
        case ERROR_CREATE_NOTICIA:
            message.success.user = null
            
            console.log("Retorno do payload no error create NOTICIA: ", action.payload)
            message.error.noticia = action.payload;
            return message;
        case SUCCESS_CREATE_NOTICIA:
            message.error.user = null;
            
            console.log("Retorno do payload no succcesssss create NOTICIA: ", action.payload)
            message.success.noticia = action.payload;
            message.success.noticia.msg = "Notícia cadastrada com sucesso!"
            return message;
        case ERROR_EDIT_NOTICIA:
                message.success.user = null
                
                console.log("Retorno do payload no error create NOTICIA: ", action.payload)
                message.error.noticia = action.payload;
                return message;
        case SUCCESS_EDIT_NOTICIA:
                message.error.user = null;
                
                console.log("Retorno do payload no succcesssss create guiiiaaaaa: ", action.payload)
                message.success.noticia = action.payload;
                message.success.noticia.msg = "Notícia editada com sucesso!"
                return message;
        default: return state;
    }
}