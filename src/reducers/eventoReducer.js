import { 
    DELETE_EVENTO,
    FETCH_EVENTO, 
    FETCH_EVENTOS, 
    FETCH_EVENTOS_RECENTES, 
    FETCH_EVENTOS_USER,
    REMOVE_IMAGE_EVENTO, 
} from "../actions/types";

export default function(state = null, action) {

    let evento =  {recentes: null, list: null, featured: null, fromUser: null, count: null, evento: null};
    switch (action.type) {
        case DELETE_EVENTO:
        if(action.payload !== false ){
            console.log("state eventos: ", state)
            let fromUser = state.fromUser.filter( fromUser => {
                return fromUser._id != action.payload
            }); 
            
            evento = {...state.evento, fromUser, count: (state.count-1)}
            console.log("state depois    eventos: ", state)
            return evento;
        }
        
        return evento;

        case REMOVE_IMAGE_EVENTO:
            if(action.payload !== false){
                evento.evento = state.evento;
                evento.evento.imagem_destacada = [];
            }

            return evento;
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
            
            evento.evento = action.payload.data;
            console.log("evento no reducer", action.payload);
            return evento;
        case FETCH_EVENTOS:
            if(state){
                if(state.recentes)
                    evento.recentes = state.recentes;
                if(state.featured)
                    evento.featured = state.featured;
                if(state.evento)
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