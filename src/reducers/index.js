import { combineReducers } from 'redux';

import Users from './userReducer';
import Guias from './guiaReducer';
import Eventos from './eventoReducer';
import Noticias from './noticiaReducer'
import City from './cityReducer';

export default combineReducers({
    users: Users,
    guias: Guias,
    eventos: Eventos,
    noticias: Noticias,
    city: City
})