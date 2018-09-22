import { FETCH_USER, FETCH_USERS, CREATE, CREATE_USER, EDIT_USER, REMOVE_USER } from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case CREATE_USER:
            return action.payload;
        case EDIT_USER:
            return action.payload;
        case REMOVE_USER:
            return action.payload;
        case FETCH_USER:
            return action.payload.data;
        case FETCH_USERS:
            console.log("payload do fetch users: ", action.payload)
            return action.payload.data;
        case CREATE:
            return action.payload;
        default: return state;
    }
}