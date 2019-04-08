import { SUCCESS_CREATE_GUIA, ERROR_CREATE_GUIA, FETCH_GUIA, FETCH_GUIAS, FETCH_GUIAS_RECENTES, FETCH_GUIAS_FEATURED, FETCH_GUIAS_USER} from "../actions/types";

export default function(state = null, action) {
    
    let guia =  {guia: null, recentes: null, list: null, featured: null, categoria: null, fromUser: null};
    switch (action.type) {
        case FETCH_GUIA:
            if(state){
                if(state.recentes)
                    guia.recentes = state.recentes;
                if(state.featured)
                    guia.featured = state.featured;
                if(state.list)
                    guia.list = state.list
                if(state.categoria)
                    guia.categoria = state.categoria
                if(state.fromUser)
                    guia.fromUser = state.fromUser
            }
            
            guia.guia = action.payload.data[0];
            return guia;

        case FETCH_GUIAS:
            if(state){
                if(state.recentes)
                    guia.recentes = state.recentes;
                if(state.featured)
                    guia.featured = state.featured;
                if(state.guia)
                    guia.guia = state.guia
                if(state.categoria)
                    guia.categoria = state.categoria
                if(state.fromUser)
                    guia.fromUser = state.fromUser
            }
            
            guia.categoria = action.payload.categoria;
            guia.list = action.payload.data;
            return guia;

        case FETCH_GUIAS_RECENTES:
            if(state){
                if(state.list)
                    guia.list = state.list;
                if(state.featured)
                    guia.featured = state.featured;
                if(state.categoria)
                    guia.categoria = state.categoria
                if(state.guia)
                    guia.guia = state.guia
                if(state.fromUser)
                    guia.fromUser = state.fromUser
            }

            guia.recentes = action.payload.data
            return guia;

        case FETCH_GUIAS_FEATURED:
            if(state){
                if(state.recentes)
                    guia.recentes = state.recentes;
                if(state.list)
                    guia.list = state.list;
                if(state.guia)
                    guia.guia = state.guia
                if(state.categoria)
                    guia.categoria = state.categoria
                if(state.fromUser)
                    guia.fromUser = state.fromUser
            }

            guia.featured = action.payload.data
            return guia;

        case FETCH_GUIAS_USER:
            if(state){
                if(state.recentes)
                    guia.recentes = state.recentes;
                if(state.list)
                    guia.list = state.list;
                if(state.guia)
                    guia.guia = state.guia
                if(state.categoria)
                    guia.categoria = state.categoria
                if(state.featured)
                    guia.featured = state.featured
            }

            console.log("caiu no guias user no reducer", action.payload);

            guia.fromUser = action.payload.data
            return guia;

        default: return state;
    }
}