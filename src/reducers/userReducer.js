import { FETCH_ME, DELETE_USER, FETCH_USER, FETCH_USERS, CONFIRM_USER, BLOCK_USER, CREATE_USER, EDIT_USER, LOGIN_USER } from "../actions/types";

export default function(state = [], action) {

    switch (action.type) {
        case CREATE_USER:
            console.log("Retorno do payload: ", action.payload)
            return action.payload;
        case CONFIRM_USER:
            if(action.payload !== false ){
            
                let fromUser = state.fromUser.map(user => {
                    if(user._id == action.payload.id)
                        return { ...user, confirmed: action.payload.confirmed }
                    else 
                        return user;
                })

                console.log("no frommm user: ", fromUser)
                
                return { ...state, fromUser: fromUser };
            }
            
            return state;
        case BLOCK_USER:
                    if(action.payload !== false ){
                    
                        let fromUser = state.fromUser.map(user => {
                            if(user._id == action.payload.id)
                                return { ...user, blocked: action.payload.blocked }
                            else 
                                return user;
                        })
        
                        console.log("no frommm user block: ", fromUser)
                        
                        return { ...state, fromUser: fromUser };
                    }
                    
                    return state;
        case DELETE_USER:
            if(action.payload !== false ){

                let fromUser = state.fromUser.filter( fromUser => {
                    return fromUser._id != action.payload
                }); 
                
                let guia = {...state, fromUser}
                return guia;
            }
            return state;
        case EDIT_USER:
            return action.payload;
        case FETCH_ME:
            return (action.payload.data)? action.payload.data : action.payload;  
        case FETCH_USER:
            return  action.payload.data;
        case FETCH_USERS:
            console.log("action.payload data", action.payload.data);
            return {...state, fromUser: action.payload.data};
        case LOGIN_USER:
            console.log("\n\nno reducer: ", action.payload)
            return action.payload
        default: return state;
    }
}