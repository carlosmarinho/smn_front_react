import { combineReducers } from 'redux';

import Users from './userReducer';
import Guias from './guiaReducer';

export default combineReducers({
    users: Users,
    guias: Guias
})