import { FETCH_CATEGORIES, FETCH_CATEGORIES_GUIA_TOP, FETCH_CATEGORIES_EVENTO_TOP} from "../actions/types";

export default function(state = null, action) {

    let category =  {recentes: null, list: null};
    switch (action.type) {
        case FETCH_CATEGORIES:
            if(state){
                if(state.guia)
                    category.guia = state.guia;
                if(state.evento)
                    category.evento = state.evento;
            }
            
            category.list = action.payload.data;
            return category;
        case FETCH_CATEGORIES_GUIA_TOP:
            if(state){
                if(state.list)
                    category.list = state.list;
                if(state.evento)
                    category.evento = state.evento;
            }

            category.guia = action.payload.data
            return category;
        case FETCH_CATEGORIES_EVENTO_TOP:
            if(state){
                if(state.guia)
                    category.guia = state.guia;
                if(state.list)
                    category.list = state.list;
            }

            category.evento = action.payload.data
            return category;
        default: return state;
    }
}