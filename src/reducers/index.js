import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import Users from './userReducer';
import Guias from './guiaReducer';
import Bairros from './bairroReducer';
import Categorias from './categoriaReducer';
import Tags from './tagReducer';
import GuiasFeatured from './guiaFeaturedReducer';
import Eventos from './eventoReducer';
import Noticias from './noticiaReducer';
import Paginas from './paginaReducer';
import City from './cityReducer';
import Messages from './messageReducer';

export default combineReducers({
    users: Users,
    guias: Guias,
    bairros: Bairros,
    categorias: Categorias,
    tags: Tags,
    guiasFeatured: GuiasFeatured,
    eventos: Eventos,
    noticias: Noticias,
    paginas: Paginas,
    city: City,
    message: Messages,
    form: formReducer
})