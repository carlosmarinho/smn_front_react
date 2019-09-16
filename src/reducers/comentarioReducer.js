import { 
    FETCH_ALL_COMENTARIOS,
    FETCH_COMENTARIO_GUIAS_USER,  
    APPROVE_COMENTARIO_GUIA, 
    DELETE_COMENTARIO_GUIA, 
    FETCH_COMENTARIO,
    FETCH_COMENTARIO_EVENTOS_USER,
    APPROVE_COMENTARIO_EVENTO, 
    DELETE_COMENTARIO_EVENTO,
    FETCH_COMENTARIO_NOTICIAS_USER,
    APPROVE_COMENTARIO_NOTICIA, 
    DELETE_COMENTARIO_NOTICIA,   
} from '../actions/types';

export default function (state = [], action) {
    switch(action.type) {
        case FETCH_ALL_COMENTARIOS:
        return action.payload;
        
        case FETCH_COMENTARIO:
            return action.payload.data;

        case FETCH_COMENTARIO_GUIAS_USER:
            return action.payload;
            
        case APPROVE_COMENTARIO_GUIA:
            if(action.payload !== false ){ 
                console.log("state no comentreducer: ", state)               
                return state.map(comentario => {
                        if(comentario._id == action.payload.id)
                        return { ...comentario, aprovado: action.payload.approved }
                    else 
                        return comentario;
                })
            }
            return state;
        case DELETE_COMENTARIO_GUIA:
            if(action.payload !== false) {
                console.log('state ')
                return state.filter(comentario => comentario._id !== action.payload)
            }

            return state;
        
        case FETCH_COMENTARIO_EVENTOS_USER:
            return action.payload;
        
        case APPROVE_COMENTARIO_EVENTO:
            if(action.payload !== false ){ 
                console.log("state no comentreducer: ", state)               
                return state.map(comentario => {
                        if(comentario._id == action.payload.id)
                        return { ...comentario, aprovado: action.payload.approved }
                    else 
                        return comentario;
                })
            }
            return state;
        case DELETE_COMENTARIO_EVENTO:
            if(action.payload !== false) {
                console.log('state ')
                return state.filter(comentario => comentario._id !== action.payload)
            }

            return state;
        
        case FETCH_COMENTARIO_NOTICIAS_USER:
            return action.payload;
        
        case APPROVE_COMENTARIO_NOTICIA:
            if(action.payload !== false ){ 
                console.log("state no comentreducer: ", state)               
                return state.map(comentario => {
                        if(comentario._id == action.payload.id)
                        return { ...comentario, aprovado: action.payload.approved }
                    else 
                        return comentario;
                })
            }
            return state;
        case DELETE_COMENTARIO_NOTICIA:
            if(action.payload !== false) {
                console.log('state ')
                return state.filter(comentario => comentario._id !== action.payload)
            }

            return state;
        default:     
            return state;
    }
}