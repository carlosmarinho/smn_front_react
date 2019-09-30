import { FETCH_PAGINA, FETCH_PAGINAS } from "../actions/types";

export default function(state = null, action) {

    let pagina =  {pagina: null, recentes: null, list: null};
    switch (action.type) {
        case FETCH_PAGINA:
            if(state){
                if(state.list)
                    pagina.list = state.list;
            }
            
            console.log('pagina reducer: ', action.payload );
            
            pagina.pagina = action.payload.data[0];
            return pagina;
        case FETCH_PAGINAS:
            if(state){
                if(state.pagina)
                    pagina.pagina = state.pagina;
            }
            
            
            pagina.list = action.payload.data;
            return pagina;
        default: return state;
    }
}