import _ from 'lodash';
import { 
    FEATURED_EVENTO,
    DELETE_EVENTO,
    APPROVE_EVENTO,
    FETCH_EVENTO, 
    FETCH_EVENTOS, 
    FETCH_EVENTOS_RECENTES, 
    FETCH_EVENTOS_USER,
    REMOVE_IMAGE_EVENTO, 
    CREATE_COMENTARIO_EVENTO
} from "../actions/types";

export default function(state = null, action) {

    let evento =  {recentes: null, list: null, featured: null, fromUser: null, count: null, evento: null};
    switch (action.type) {
        case CREATE_COMENTARIO_EVENTO: 
            if(action.payload !== false ){
                let comentarios = [];
                if(_.isArray(state.evento)){
                    comentarios = [...state.evento[0].comentarioeventos, action.payload.comentarios];
                }
                else {
                    console.log("comentarios no reducer: ", ' ---- ' , {...state.evento, comentarioeventos: comentarios, revieweventos: action.payload.reviews});
                    comentarios = [...state.evento.comentarioeventos, action.payload.comentarios];
                }
                return {
                    ...state, 
                    evento: {...state.evento, comentarioeventos: comentarios, reviewevento: action.payload.reviews},
                    successCreateComentario: 'Seu comentário foi cadastrado com sucesso e enviado para aprovação!'
                }
            }

            return {...state, errorCreateComentario: 'Houve um erro ao cadastrar seu comentário!' };

        case FEATURED_EVENTO:
            if(action.payload !== false ){
                
                //let new = {...state.fromUser.find(evento => evento._id == action.payload.id ), approved: action.payload.approved}
                let fromUser = state.fromUser.map(evento => {
                    if(evento._id == action.payload.id)
                        return { ...evento, featured: action.payload.featured }
                    else 
                        return evento;
                })
                
                return { ...state, fromUser: fromUser };
            }
            
            return evento;


        case APPROVE_EVENTO:
            if(action.payload !== false ){
                let fromUser = state.fromUser.map(evento => {
                    if(evento._id == action.payload.id)
                        return { ...evento, approved: action.payload.approved }
                    else 
                        return evento;
                })
                
                return { ...state, fromUser: fromUser };
            }
            return state;

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
            
            return state;

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
            if(action.payload.data1)
                evento.list = [...action.payload.data, ...action.payload.data1];    
            else
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