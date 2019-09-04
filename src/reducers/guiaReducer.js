import { CREATE_COMENTARIO_GUIA, DELETE_GUIA, APPROVE_GUIA, FETCH_GUIA, REMOVE_IMAGE_GUIA, FETCH_GUIAS, FETCH_GUIAS_RECENTES, FETCH_GUIAS_FEATURED, FETCH_GUIAS_USER} from "../actions/types";

export default function(state = null, action) {

    let guia =  { guia: null, 
        recentes: null, 
        list: null, 
        featured: null, 
        categoria: null, 
        fromUser: null,
        count: null
    };
    switch (action.type) {
        case CREATE_COMENTARIO_GUIA: 
            if(action.payload !== false ){
                    let comentarios = [...state.guia.comentarioguias, action.payload];
                    console.log("comentarios no reducer: ", ' ---- ' , state.guia);
                    return {...state, 
                        guia: {...state.guia, comentarioguias: comentarios},
                        successCreateComentario: 'Seu comentário foi cadastrado com sucesso e enviado para aprovação!'                    }
            }
            

            return {...state, errorCreateComentario: 'Houve um erro ao cadastrar seu comentário!' };
        case APPROVE_GUIA:
            if(action.payload !== false ){                
                let fromUser = state.fromUser.map(guia => {
                    if(guia._id == action.payload.id)
                        return { ...guia, approved: action.payload.approved }
                    else 
                        return guia;
                })

                console.log("no frommm user: ", fromUser)
                
                return { ...state, fromUser: fromUser };
            }
            return state;

        case DELETE_GUIA:
            if(action.payload !== false ){
                console.log("no delete guiiaaaaaa: ", state);

                let fromUser = state.fromUser.filter( fromUser => {
                    return fromUser._id != action.payload
                }); 
                
                guia = {...state.guia, fromUser, count: (state.count-1)}
                return guia;
            }
            return state;
        case REMOVE_IMAGE_GUIA:
            if(action.payload !== false){
                guia.guia = state.guia;
                guia.guia.imagem_destacada = [];
            }

            return guia;
        case FETCH_GUIA:
            if(state){
                if(state.recentes)
                    guia.recentes = state.recentes;
                if(state.featured)
                    guia.featured = state.featured;
                if(state.list)
                    guia.list = state.list;
                if(state.categoria)
                    guia.categoria = state.categoria;
                if(state.fromUser){
                    guia.fromUser = state.fromUser;
                    guia.count = state.count;
                }
            }
                        
            if(action.payload.data && action.payload.data[0])
                guia.guia = action.payload.data[0];
            else
                guia.guia = action.payload.data;
            return guia;

        case FETCH_GUIAS:
            if(state){
                if(state.recentes)
                    guia.recentes = state.recentes;
                if(state.featured)
                    guia.featured = state.featured;
                if(state.guia)
                    guia.guia = state.guia;
                if(state.categoria)
                    guia.categoria = state.categoria;
                if(state.fromUser) {
                    guia.fromUser = state.fromUser;
                    guia.count = state.count;
                }
            }
            
            guia.categoria = action.payload.categoria;

            if(action.payload.data1)
                guia.list = [...action.payload.data, ...action.payload.data1];    
            else
                guia.list = action.payload.data;
            return guia;

        case FETCH_GUIAS_RECENTES:
            if(state){
                if(state.list)
                    guia.list = state.list;
                if(state.featured)
                    guia.featured = state.featured;
                if(state.categoria)
                    guia.categoria = state.categoria;
                if(state.guia)
                    guia.guia = state.guia;
                if(state.fromUser) {
                    guia.fromUser = state.fromUser;
                    guia.count = state.count;
                }
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
                    guia.guia = state.guia;
                if(state.categoria)
                    guia.categoria = state.categoria;
                if(state.fromUser) {
                    guia.fromUser = state.fromUser;
                    guia.count = state.count;
                }
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
                    guia.guia = state.guia;
                if(state.categoria)
                    guia.categoria = state.categoria;
                if(state.featured)
                    guia.featured = state.featured;
            }

            console.log("FROM USER O PAYLOAD: ", action.payload);

            guia.fromUser = action.payload.data;
            guia.count = action.payload.count;
            return guia;

        default: return state;
    }
}