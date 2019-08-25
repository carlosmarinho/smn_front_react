import { FETCH_ME, FETCH_USER, CREATE_USER, EDIT_USER, LOGIN_USER } from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case CREATE_USER:
            console.log("Retorno do payload: ", action.payload)
            return action.payload;
        case EDIT_USER:
            return action.payload;
        case FETCH_ME:
            console.log("action.payload data", state);
            return (action.payload.data)? action.payload.data : action.payload;  
        case FETCH_USER:
            return action.payload.data;
        case LOGIN_USER:
            console.log("\n\nno reducer: ", action.payload)
            return action.payload
        default: return state;
    }
}