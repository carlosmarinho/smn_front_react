import { FETCH_NOTICIA, FETCH_NOTICIAS, FETCH_NOTICIAS_RECENTES, FETCH_NOTICIAS_FEATURED, FETCH_NOTICIAS_USER } from "../actions/types";

export default function(state = null, action) {

    let noticia =  {noticia: null, featured: null, recentes: null, list: null, categoria: null, fromUser: null};
    switch (action.type) {
        case FETCH_NOTICIA:
            if(state){
                if(state.recentes)
                    noticia.recentes = state.recentes;
                if(state.list)
                    noticia.list = state.list;
                if(state.featured)
                    noticia.featured = state.featured;
            }
                        
            noticia.noticia = action.payload.data[0];
            return noticia;
        case FETCH_NOTICIAS:
            if(state){
                if(state.recentes)
                    noticia.recentes = state.recentes;
                if(state.noticia)
                    noticia.noticia = state.noticia;
                if(state.featured)
                    noticia.featured = state.featured;
            }
            
            noticia.categoria = action.payload.categoria;
            noticia.list = action.payload.data;
            return noticia;
        case FETCH_NOTICIAS_RECENTES:
            if(state){
                if(state.list)
                    noticia.list = state.list;
                if(state.noticia)
                    noticia.noticia = state.noticia;
                if(state.featured)
                    noticia.featured = state.featured;
                if(state.fromUser)
                    noticia.fromUser = state.fromUser;
            }

            noticia.recentes = action.payload.data
            return noticia;

        case FETCH_NOTICIAS_FEATURED:
            if(state){
                if(state.list)
                    noticia.list = state.list;
                if(state.noticia)
                    noticia.noticia = state.noticia;
                if(state.recentes)
                    noticia.recentes = state.recentes;
            }

            noticia.featured = action.payload.data
            return noticia;

        case FETCH_NOTICIAS_USER:
            if(state){
                if(state.list)
                    noticia.list = state.list;
                if(state.noticia)
                    noticia.noticia = state.noticia;
                if(state.recentes)
                    noticia.recentes = state.recentes;
            }
            console.log("na noticia reducia vai setar o from user\n\n\n");
            noticia.fromUser = action.payload.data
            return noticia;
        default: return state;
    }
}