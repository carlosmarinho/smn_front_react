import { FETCH_EVENTO, FETCH_EVENTOS, FETCH_EVENTOS_RECENTES } from "../actions/types";

export default function(state = null, action) {

    let evento =  {recentes: null, list: null};
    switch (action.type) {
        case FETCH_EVENTO:
            if(state){
                if(state.recentes)
                    evento.recentes = state.recentes;
                if(state.featured)
                    evento.featured = state.featured;
                if(state.list)
                    evento.list = state.list
            }
            
            evento.evento = action.payload.data[0];
            return evento;
        case FETCH_EVENTOS:
            if(state){
                if(state.recentes)
                    evento.recentes = state.recentes;
                if(state.featured)
                    evento.featured = state.featured;
                if(state.list)
                    evento.evento = state.evento;
            }
            
            evento.list = action.payload.data;
            return evento;
        
        case FETCH_EVENTOS_RECENTES:
            if(state){
                if(state.evento)
                    evento.evento = state.evento;
                if(state.featured)
                    evento.featured = state.featured;
                if(state.list)
                    evento.list = state.list
            }
            
            evento.recentes = action.payload.data
            return evento;
        default: return state;
    }
}