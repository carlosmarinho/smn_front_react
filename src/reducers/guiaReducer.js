import { FETCH_USER, CREATE_USER, EDIT_USER, FETCH_GUIAS, FETCH_GUIAS_RECENTES} from "../actions/types";

export default function(state = null, action) {

    let guia =  {recentes: null, list: null};
    switch (action.type) {
        case FETCH_GUIAS:
            console.log("state no fetch guias", state);
            if(state && state.recentes)
                guia.recentes = state.recentes;
            
            guia.list = action.payload.data;
            return guia;
        case FETCH_GUIAS_RECENTES:
            if(state && state.list)
                guia.list = state.list;

            guia.recentes = action.payload.data
            return guia;
        default: return state;
    }
}