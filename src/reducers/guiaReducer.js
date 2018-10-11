import { FETCH_USER, CREATE_USER, EDIT_USER, FETCH_GUIA, FETCH_GUIAS, FETCH_GUIAS_RECENTES, FETCH_GUIAS_FEATURED} from "../actions/types";

export default function(state = null, action) {

    let guia =  {guia: null, recentes: null, list: null, featured: null};
    switch (action.type) {
        case FETCH_GUIA:
            if(state){
                if(state.recentes)
                    guia.recentes = state.recenes;
                if(state.featured)
                    guia.featured = state.featured;
                if(state.list)
                    guia.list = state.list
            }
            
            guia.guia = action.payload.data[0];
            return guia;

        case FETCH_GUIAS:
            if(state){
                if(state.recentes)
                    guia.recentes = state.recenes;
                if(state.featured)
                    guia.featured = state.featured;
                if(state.guia)
                    guia.guia = state.guia
            }
            
            guia.list = action.payload.data;
            return guia;

        case FETCH_GUIAS_RECENTES:
            if(state){
                if(state.list)
                    guia.list = state.list;
                if(state.featured)
                    guia.featured = state.featured;
                if(state.guia)
                    guia.guia = state.guia
            }

            guia.recentes = action.payload.data
            return guia;

        case FETCH_GUIAS_FEATURED:
            if(state){
                if(state.recentes)
                    guia.recentes = state.recenes;
                if(state.list)
                    guia.list = state.list;
                if(state.guia)
                    guia.guia = state.guia
            }

            guia.featured = action.payload.data
            return guia;

        default: return state;
    }
}