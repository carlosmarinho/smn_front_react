import { DELETE_NOTICIA, APPROVE_NOTICIA, REMOVE_IMAGE_NOTICIA, FETCH_NOTICIA, FETCH_NOTICIAS, FETCH_NOTICIAS_RECENTES, FETCH_NOTICIAS_FEATURED, FETCH_NOTICIAS_USER } from "../actions/types";

export default function(state = null, action) {

    let noticia =  {noticia: null, 
        featured: null, 
        recentes: null, 
        list: null, 
        categoria: null, 
        fromUser: null,
        count: null
    };
    switch (action.type) {
        case APPROVE_NOTICIA:
            if(action.payload !== false ){
                
                //let new = {...state.fromUser.find(noticia => noticia._id == action.payload.id ), approved: action.payload.approved}
                let fromUser = state.fromUser.map(noticia => {
                    if(noticia._id == action.payload.id)
                        return { ...noticia, approved: action.payload.approved }
                    else 
                        return noticia;
                })

                console.log("no frommm user: ", fromUser)
                
                return { ...state, fromUser: fromUser };
            }
            
            return noticia;
        case DELETE_NOTICIA:
            if(action.payload !== false ){
                console.log("state noticias: ", state)
                let fromUser = state.fromUser.filter( fromUser => {
                    return fromUser._id != action.payload
                }); 
                
                noticia = {...state.noticia, fromUser, count: (state.count-1)}
                console.log("state depois    noticias: ", state)
                return noticia;
            }
            
            return noticia;
        case REMOVE_IMAGE_NOTICIA:
            if(action.payload !== false){
                noticia.noticia = state.noticia;
                noticia.noticia.imagem_destacada = [];
            }

            return noticia;
        case FETCH_NOTICIA:
            if(state){
                if(state.recentes)
                    noticia.recentes = state.recentes;
                if(state.list)
                    noticia.list = state.list;
                if(state.featured)
                    noticia.featured = state.featured;
            }
            
            if(action.payload && action.payload.data && action.payload.data[0]) 
                noticia.noticia = action.payload.data[0];  
            else
                noticia.noticia = action.payload.data
            return noticia;
        case FETCH_NOTICIAS:
            if(state){
                if(state.recentes)
                    noticia.recentes = state.recentes;
                if(state.noticia)
                    noticia.noticia = state.noticia;
                if(state.featured)
                    noticia.featured = state.featured;
                if(state.fromUser){
                    noticia.fromUser = state.fromUser;
                    noticia.count = state.count;
                }
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
                if(state.fromUser){
                    noticia.fromUser = state.fromUser;
                    noticia.count = state.count;
                }
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
                if(state.fromUser){
                    noticia.fromUser = state.fromUser;
                    noticia.count = state.count;
                }
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
            
            noticia.fromUser = action.payload.data
            noticia.count = action.payload.count
            return noticia;
        default: return state;
    }
}