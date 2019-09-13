import { FETCH_ME, FETCH_USER, FETCH_USERS, CREATE_USER, EDIT_USER, LOGIN_USER } from "../actions/types";

export default function(state = [], action) {

    switch (action.type) {
        case CREATE_USER:
            console.log("Retorno do payload: ", action.payload)
            return action.payload;
        case EDIT_USER:
            return action.payload;
        case FETCH_ME:
            return (action.payload.data)? action.payload.data : action.payload;  
            case FETCH_USER:
                return [...state, action.payload.data];
        case FETCH_USERS:
                console.log("action.payload data", action.payload.data);
                return {...state, fromUser: action.payload.data};
        case LOGIN_USER:
            console.log("\n\nno reducer: ", action.payload)
            return action.payload
        default: return state;
    }
}