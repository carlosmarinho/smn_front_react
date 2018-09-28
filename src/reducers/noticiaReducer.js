import { FETCH_NOTICIAS } from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case FETCH_NOTICIAS:
            return action.payload;
        default: return state;
    }
}