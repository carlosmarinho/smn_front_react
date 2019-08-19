import { FETCH_EVENTO, FETCH_EVENTOS, FETCH_EVENTOS_RECENTES, FETCH_EVENTOS_USER } from "../actions/types";

export default function(state = null, action) {

    let evento =  {erecentes: null, list: null, featured: null, fromUser: null, count: null};
    switch (action.type) {
        case FETCH_EVENTO:
            if(state){
                if(state.recentes)
                    evento.recentes = state.recentes;
                if(state.featured)
                    evento.featured = state.featured;
                if(state.list)
                    evento.list = state.list;
                if(state.fromUser){
                    evento.fromUser = state.fromUser;
                    evento.count = state.count;
                }
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
                if(state.fromUser){
                    evento.fromUser = state.fromUser;
                    evento.count = state.count;
                }
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
                if(state.fromUser){
                    evento.fromUser = state.fromUser
                    evento.count = state.count;
                }
            }
            
            evento.recentes = action.payload.data;
            return evento;

        case FETCH_EVENTOS_USER:
            if(state){
                if(state.evento)
                    evento.evento = state.evento;
                if(state.featured)
                    evento.featured = state.featured;
                if(state.list)
                    evento.list = state.list
                if(state.recentes)
                    evento.recentes = state.recentes;
            }
            
            evento.fromUser = action.payload.data;
            evento.count = action.payload.count;
            return evento;
        default: return state;
    }
}