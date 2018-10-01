import { FETCH_USER, CREATE_USER, EDIT_USER, FETCH_FEATURED_GUIAS, FETCH_GUIA} from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case FETCH_GUIA:
            return action.payload.data;
        case FETCH_FEATURED_GUIAS:
            return action.payload.data;
        default: return state;
    }
}