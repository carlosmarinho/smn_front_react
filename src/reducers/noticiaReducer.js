import { FETCH_NOTICIA, FETCH_NOTICIAS, FETCH_NOTICIAS_RECENTES } from "../actions/types";

export default function(state = null, action) {

    let noticia =  {noticia: null, recentes: null, list: null, categoria: null};
    switch (action.type) {
        case FETCH_NOTICIA:
            if(state){
                if(state.recentes)
                    noticia.recentes = state.recentes;
                if(state.list)
                    noticia.list = state.list;
            }
            
            
            noticia.noticia = action.payload.data[0];
            return noticia;
        case FETCH_NOTICIAS:
            if(state){
                if(state.recentes)
                    noticia.recentes = state.recentes;
                if(state.noticia)
                    noticia.noticia = state.noticia;
            }
            
            
            noticia.categoria = action.payload.categoria;
            console.log('No reducer de noticias payload: ', action.payload)
            noticia.list = action.payload.data;
            return noticia;
        case FETCH_NOTICIAS_RECENTES:
            if(state){
                if(state.list)
                    noticia.list = state.list;
                if(state.noticia)
                    noticia.noticia = state.noticia;
            }

            noticia.recentes = action.payload.data
            return noticia;
        default: return state;
    }
}