import { FETCH_USER, CREATE_USER, EDIT_USER, FETCH_GUIAS, FETCH_GUIAS_RECENTES, FETCH_GUIAS_FEATURED} from "../actions/types";

export default function(state = null, action) {

    let guia =  {recentes: null, list: null, featured: null};
    switch (action.type) {
        case FETCH_GUIAS:
            if(state && state.recentes)
                guia.recentes = state.recenes;
            if(state && state.featured)
                guia.featured = state.featured;
            
            guia.list = action.payload.data;
            return guia;
        case FETCH_GUIAS_RECENTES:
            if(state && state.list)
                guia.list = state.list;
            if(state && state.featured)
                guia.featured = state.featured;

            guia.recentes = action.payload.data
            return guia;
        case FETCH_GUIAS_FEATURED:
            if(state && state.list)
                guia.list = state.list;
            if(state && state.recentes)
                guia.recentes = state.recentes;

            guia.featured = action.payload.data
            console.log("no featured guia: ", guia);
            return guia;
        default: return state;
    }
}