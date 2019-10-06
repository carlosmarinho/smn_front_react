import { FETCH_BAIRRO, FETCH_BAIRROS } from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case FETCH_BAIRRO:
            return {...state, bairro: action.payload.data[0]};
        case FETCH_BAIRROS:
            return {...state, list: action.payload.data};
        default: return state;
    }
}