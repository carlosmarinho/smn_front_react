import { FETCH_EVENTOS, FETCH_EVENTOS_RECENTES } from "../actions/types";

export default function(state = null, action) {

    let evento =  {recentes: null, list: null};
    switch (action.type) {

        case FETCH_EVENTOS:
            if(state && state.recentes)
                evento.recentes = state.recentes;
            
            evento.list = action.payload.data;
            return evento;
            case FETCH_EVENTOS_RECENTES:
            if(state && state.list)
            evento.list = state.list;
            
            evento.recentes = action.payload.data
            console.log("state no fetch eventos", evento);
            return evento;
        default: return state;
    }
}