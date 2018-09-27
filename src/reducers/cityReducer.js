import { FETCH_CITY } from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case FETCH_CITY:
            return action.payload;
        default: return state;
    }
}