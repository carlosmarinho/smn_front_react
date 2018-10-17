import { combineReducers } from 'redux';

import Users from './userReducer';
import Guias from './guiaReducer';
import Bairros from './bairroReducer';
import Categorias from './categoriaReducer';
import GuiasFeatured from './guiaFeaturedReducer';
import Eventos from './eventoReducer';
import Noticias from './noticiaReducer';
import Paginas from './paginaReducer';
import City from './cityReducer';

export default combineReducers({
    users: Users,
    guias: Guias,
    bairros: Bairros,
    categorias: Categorias,
    guiasFeatured: GuiasFeatured,
    eventos: Eventos,
    noticias: Noticias,
    paginas: Paginas,
    city: City
})