import { FETCH_USER, CREATE_USER, EDIT_USER} from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case CREATE_USER:
            console.log("Retorno do payload: ", action.payload)
            return action.payload;
        case EDIT_USER:
            return action.payload;
        case FETCH_USER:
            return action.payload.data;
        default: return state;
    }
}