import _ from 'lodash';
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';

import Home from './components/home';
import HomeBairro from './components/home-bairro';
import Header from './components/header';
import Footer from './components/footer';
import PageItem from './components/modules/page-item';
import CategoryOrItem from './components/modules/category-or-item';
import NewsItem from './components/modules/news-item';
import BlogList from './components/modules/blog-list';
import ListingItem from './components/modules/listing-item'
import EventItem from './components/modules/event-item';
import ListingList from './components/modules/listing-list';
import TagList from './components/modules/tag-list';
import SearchList from './components/modules/search-list';

import ListingGrid from './components/modules/listing-grid';
//import Gallery from './components/modules/gallery';
import Contact from './components/modules/contact';
import Login from './components/modules/login';
import Connect from './components/modules/connect';
import Register from './components/modules/register';

import Dashboard from './components/dashboard/dashboard';
import Profile from './components/dashboard/profile';
import DashboardUser from './components/dashboard/user';
import DashboardUserEdit from './components/dashboard/user/edit';


import DashboardGuia from './components/dashboard/guia/guia';
import DashboardGuiaNew from './components/dashboard/guia/new';
import DashboardGuiaEdit from './components/dashboard/guia/edit';

import DashboardEvento from './components/dashboard/evento/evento';
import DashboardEventoNew from './components/dashboard/evento/new';
import DashboardEventoEdit from './components/dashboard/evento/edit';

import DashboardNoticia from './components/dashboard/noticia/noticia';
import DashboardNoticiaNew from './components/dashboard/noticia/new';
import DashboardNoticiaEdit from './components/dashboard/noticia/edit';

import DashboardComentario from './components/dashboard/comentario/';
import DashboardComentarioEdit from './components/dashboard/comentario/edit';

import DashboardComentarioGuia from './components/dashboard/comentarioguia/comentario';
import DashboardComentarioEvento from './components/dashboard/comentarioevento/comentario';
import DashboardComentarioNoticia from './components/dashboard/comentarionoticia/comentario';

import BairroGrid from './components/modules/bairro-grid';
import NotFound from './components/not-found';


/* Importing css */
import './assets/styles/css/materialize.css';
import './assets/styles/css/style.css';
import './assets/styles/css/bootstrap.css';
import './assets/styles/css/responsive.css';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-17728772-17');
ReactGA.pageview(window.location.pathname + window.location.search);

let host = window.location.host;
let protocol = window.location.protocol;
let parts = host.split(".");
let subdomain = "";
// If we get more than 3 parts, then we have a subdomain
// INFO: This could be 4, if you have a co.uk TLD or something like that.
if (parts.length > 3) {
  subdomain = parts[0];
  // Remove the subdomain from the parts list
  console.log("subdominio: ", subdomain);
}

subdomain = 'fonseca';

let city_or_neighbor = 'city/niteroi';
if(subdomain != "")
    city_or_neighbor = `district/${subdomain}`;    


//let city_or_neighbor = 'district/engenhoca';
import (`./assets/styles/css/${city_or_neighbor}.css`);


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

let HeaderProps = (props) => {
    return(
        <Header
            match={props.match}
            subdomain={subdomain}
        />
    )
}

let HomeProps = (props) => {
    return(
        <Home
            match={props.match}
        />
    )
}
if(subdomain != ""){
    HomeProps = (props) => {
        return(
            <HomeBairro
            subdomain={subdomain}
            props={props}
            />
        )
    }
}

const CategoryOrItemProps = (props) => {
    return (
        <CategoryOrItem 
            props={props}
            subdomain={subdomain}
        />
    )
}

const NewsItemView = (props) => {
    return (
        <NewsItem 
            dashboardView={true} 
            match={props.match}
            location={props.location}
        />        
    )
}

const NewsItemProps = (props) => {
    return (
        <NewsItem 
            dashboardView={true} 
            match={props.match}
            location={props.location}
            subdomain={subdomain}
        />        
    )
}

const ListingItemView = (props) => {
    return (
        <ListingItem
            dashboardView={true} 
            match={props.match}
            location={props.location}
        />        
    )
}

const EventItemView = (props) => {
    return (
        <EventItem 
            dashboardView={true} 
            match={props.match}
            location={props.location}
            subdomain={subdomain}
        />        
    )
}

const ListingListProps = (props) => {
    return (
        <ListingList 
            match={props.match}
            location={props.location}
            subdomain={subdomain}
        />
    )
}

const ListingListComercios = (props) => {
    return (
        <ListingList 
            type="guia comercial" 
            match={props.match}
            location={props.location}
            subdomain={subdomain}
        />
    )
}

const ListingListServicos = (props) => {
    return (
        <ListingList 
            type="guia de serviços" 
            match={props.match}
            location={props.location}
            subdomain={subdomain}
        />
    )
}

const BlogListNews = (props) => { 
    let title = "Noticías da Cidade de Niterói e do Brasil";
    let subtitle = "Noticías atualizadas diariamente de tudo o que acontece em Niterói";

    if(subdomain){
        title = `Notícias do Bairro ${_.startCase(subdomain)}`;
        subtitle = `Noticías atualizadas diariamente de tudo o que acontece no ${_.startCase(subdomain)}`;
    }

    return (
        <BlogList 
                title = {title} 
                subtitle = {subtitle}
                item="noticias"
                columnRight={true}
                match={props.match}
                location={props.location}
                subdomain={subdomain}
        />
    )
}

const BlogListCity = (props) => { 
    return (
        <BlogList 
                title="A Cidade de Niterói"
                subtitle="Tudo da cidade de Niterói: História, fotos, população e outros!" 
                item="noticias"
                columnRight={false}
                category="Bairro"
                match={props.match}
                location={props.location}
        />
    )
}            

const BairrosGrid = (props) => {
    return(
        <BairroGrid
            title="Bairros da cidade de Niterói"
            columnLeft={false}
            location={props.location}
            match={props.match}
        />
    )
}                 

/*@todo Implementar a pagina de fotos */
/*const Photos = () => {
    return(
        <Gallery
            title="Fotos da cidade de Niterói"
            columnRight={true}
        />
    )
}*/               
                    
const GridEvents = (props) => {
    return(
        <ListingGrid 
            listName="Eventos em Niterói"
            columnLeft={true}
            match={props.match}
            location={props.location}
            subdomain={subdomain}
         />
    )
}                    

class App extends Component {

    
    render() {
        return (
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
                <Route>
                    <div>
                        <Header subdomain={subdomain} />
                            <Switch>
                                <Redirect from="/home.html" to="/" state={ { status: 301 } } />
                                <Redirect from="/guia_comercial/:slug/" to="/guia/:slug/" state={ { status: 301 } } />
                                <Redirect from="/guia_comercial_category/:slug/" to="/guia/comercial/:slug/" state={ { status: 301 } } />
                                
                                <Route exact path="/dashboard" component={Dashboard} />
                                <Route exact path="/dashboard/profile" component={Profile} />
                                <Route exact path="/dashboard/users" component={DashboardUser} />
                                <Route exact path="/dashboard/users/edit/:id" component={DashboardUserEdit} />


                                <Route exact path="/dashboard/guias" component={DashboardGuia} />
                                <Route exact path="/dashboard/guias/novo" component={DashboardGuiaNew} />
                                <Route exact path="/dashboard/guias/edit/:id" component={DashboardGuiaEdit} />
                                <Route exact path="/dashboard/guias/view/:slug" component={ListingItemView} />

                                
                                <Route exact path="/dashboard/eventos" component={DashboardEvento} />
                                <Route exact path="/dashboard/eventos/novo" component={DashboardEventoNew} />
                                <Route exact path="/dashboard/eventos/edit/:id" component={DashboardEventoEdit} />
                                <Route exact path="/dashboard/eventos/view/:slug" component={EventItemView} />

                                
                                <Route exact path="/dashboard/noticias" component={DashboardNoticia} />
                                <Route exact path="/dashboard/noticias/novo" component={DashboardNoticiaNew} />
                                <Route exact path="/dashboard/noticias/edit/:id" component={DashboardNoticiaEdit} />
                                <Route exact path="/dashboard/noticias/view/:slug" component={NewsItemView} />

                                <Route exact path="/dashboard/comentarios" component={DashboardComentario} />
                                <Route exact path="/dashboard/comentarios/edit/:id/:type" component={DashboardComentarioEdit} />

                                <Route exact path="/dashboard/comentarioguia" component={DashboardComentarioGuia} />
                                <Route exact path="/dashboard/comentarioevento" component={DashboardComentarioEvento} />
                                <Route exact path="/dashboard/comentarionoticia" component={DashboardComentarioNoticia} />


                                <Route exact path="/connect/facebook/" component={Connect} />
                                <Route exact path="/" component={HomeProps} />
                                <Route exact path="/auth/:provider/callback/" component={Login} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/cadastro" component={Register} />

                                <Route exact path="/cidade" component={BlogListCity} />
                                <Route exact path="/cidade/bairros-de-niteroi" component={BairrosGrid} />
                                <Route exact path="/cidade/:slug" component={PageItem} />
                                <Route exact path="/cidade/:slug/page/:page" component={PageItem} />

                                <Route exact path={`/bairro/fotos-bairro-${subdomain}`} component={PageItem} />
                                <Route exact path={`/bairro/historia-do-bairro-${subdomain}`} component={PageItem} />
                                <Route exact path={`/bairro/populacao-do-bairro-${subdomain}`} component={PageItem} />
                                <Route exact path={`/bairro/ocupacao-do-bairro-${subdomain}`} component={PageItem} />
                                
                                <Route exact path="/guia" component={ListingListProps} />
                                <Route exact path="/guia/page/:page" component={ListingListProps} />
                                <Route exact path="/guia/comercial/page/:page" component={ListingListComercios} />
                                <Route exact path="/guia/servicos/page/:page" component={ListingListServicos} />
                                <Route exact path="/guia/comercial/:slug" component={ListingListComercios} />
                                <Route exact path="/guia/comercial/:slug/page/:page" component={ListingListComercios} />
                                <Route exact path="/guia/servicos/:slug" component={ListingListServicos} />
                                <Route exact path="/guia/servicos/:slug/page/:page" component={ListingListServicos} />
                                <Route exact path="/guia/servicos/" component={ListingListServicos} />
                                <Route exact path="/guia/comercial/" component={ListingListComercios} />
                                <Route exact path="/guia/categoria/:slug" component={ListingList} />
                                <Route exact path="/guia/:slug" component={CategoryOrItemProps} />

                                <Route exact path="/eventos" component={GridEvents} />
                                <Route exact path="/eventos/categoria/:slug/page/:page" component={GridEvents} />
                                <Route exact path="/eventos/categoria/:slug" component={GridEvents} />
                                <Route exact path="/eventos/page/:page" component={GridEvents} />
                                <Route exact path="/eventos/:slug" component={EventItem} />

                                <Route exact path="/noticias/categoria/:slug/page/:page" component={BlogList} />
                                <Route exact path="/noticias/categoria/:slug" component={BlogList} />
                                <Route exact path="/noticias/:slug" component={NewsItemProps} />
                                <Route exact path="/noticias/page/:page" component={BlogListNews} />
                                <Route exact path="/noticias" component={BlogListNews} />

                                <Route exact path="/tags/:slug/" component={TagList} />

                                <Route exact path="/busca/bairro/:bairro/keyword/:keyword/" component={SearchList} />
                                <Route exact path="/busca/bairro/:bairro/" component={SearchList} />
                                <Route exact path="/busca/keyword/:keyword/" component={SearchList} />

                                <Route exact path="/contato" component={Contact} />

                                <Route exact path="/:slug" component={NotFound} />
                                {/*@todo <Route exact path="/fotos-da-cidade-de-niteroi" component={Photos} />*/}
                            </Switch>
                        <Footer subdomain={subdomain}/>
                    </div>
                </Route>
            </BrowserRouter>
        </Provider>
        )
    }
}

export default App;
