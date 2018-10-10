import { FETCH_NOTICIAS, FETCH_NOTICIAS_RECENTES } from "../actions/types";

export default function(state = null, action) {

    let noticia =  {recentes: null, list: null};
    switch (action.type) {
        case FETCH_NOTICIAS:
            if(state && state.recentes)
                noticia.recentes = state.recentes;
            
            noticia.list = action.payload.data;
            console.log("state no fetch noticias", noticia);
            return noticia;
        case FETCH_NOTICIAS_RECENTES:
            if(state && state.list)
                noticia.list = state.list;

            noticia.recentes = action.payload.data
            return noticia;
        default: return state;
    }
}