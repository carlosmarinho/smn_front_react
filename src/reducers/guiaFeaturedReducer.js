import {FETCH_FEATURED_GUIAS} from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_FEATURED_GUIAS:
            return action.payload.data;
        default: return state;
    }
}