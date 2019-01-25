import { ERROR_CREATE_USER, SUCCESS_CREATE_USER } from "../actions/types";

export default function(state = null, action) {

    let message = {success: null, error: null}
    switch (action.type) {
        case ERROR_CREATE_USER:
            message.success = null
            
            console.log("Retorno do payload no error create userrrr: ", action.payload)
            message.error = action.payload;
            return message;
        case SUCCESS_CREATE_USER:
            message.error = null;
            
            console.log("Retorno do payload no succcesssss create userrrr: ", action.payload)
            message.success = action.payload;
            return message;
        default: return state;
    }
}