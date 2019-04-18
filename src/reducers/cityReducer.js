import { FETCH_CITY, FETCH_CITIES } from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case FETCH_CITY:
            return action.payload.data;
        case FETCH_CITIES:
            return action.payload.data;    
        default: return state;
    }
}