import { FETCH_USER, CREATE_USER, EDIT_USER, FETCH_GUIAS, FETCH_GUIAS_RECENTES} from "../actions/types";

export default function(state = null, action) {

    console.log("guiareducer: ", action);
    switch (action.type) {
        case FETCH_GUIAS:
            return action.payload.data;
        case FETCH_GUIAS_RECENTES:
            return action.payload.data;
        default: return state;
    }
}