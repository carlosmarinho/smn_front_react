import { ERROR_CREATE_USER } from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case ERROR_CREATE_USER:
            console.log("Retorno do payload no error create userrrr: ", action.payload)
            return action.payload;
        default: return state;
    }
}