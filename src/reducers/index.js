import { combineReducers } from 'redux';

import Users from './userReducer';

export default combineReducers({
    users: Users  
})