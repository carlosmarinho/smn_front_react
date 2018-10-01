import { FETCH_EVENTOS } from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case FETCH_EVENTOS:
            return action.payload.data;
        default: return state;
    }
}