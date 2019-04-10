import { FETCH_TAG, FETCH_TAGS} from "../actions/types";

export default function(state = null, action) {

    let tag =  { list: null, tag: null};
    switch (action.type) {
        
        case FETCH_TAG:
            if(state){
                if(state.list)
                    tag.list = state.list;
            }
            
            tag.tag = action.payload.data[0];
            
            return tag;
        case FETCH_TAGS:
            if(state){
                if(state.tag)
                    tag.tag = state.tag;
            }
            
            tag.list = action.payload.data;
            return tag;
       
        default: return state;
    }
}