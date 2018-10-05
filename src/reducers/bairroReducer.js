import { FETCH_BAIRRO, FETCH_BAIRROS } from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case FETCH_BAIRRO:
            return action.payload.data;
        case FETCH_BAIRROS:
            return action.payload.data;
        default: return state;
    }
}