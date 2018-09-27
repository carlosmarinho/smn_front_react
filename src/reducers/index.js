import { combineReducers } from 'redux';

import Users from './userReducer';
import Guias from './guiaReducer';
import City from './cityReducer';

export default combineReducers({
    users: Users,
    guias: Guias,
    city: City
})