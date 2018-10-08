import { FETCH_CATEGORIES, FETCH_CATEGORIES_GUIA_TOP} from "../actions/types";

export default function(state = null, action) {

    let category =  {recentes: null, list: null};
    switch (action.type) {
        case FETCH_CATEGORIES:
            console.log("state no fetch category", state);
            if(state && state.guia)
                category.guia = state.guia;
            
            category.list = action.payload.data;
            return category;
        case FETCH_CATEGORIES_GUIA_TOP:
            if(state && state.list)
                category.list = state.list;

            category.guia = action.payload.data
            return category;
        default: return state;
    }
}