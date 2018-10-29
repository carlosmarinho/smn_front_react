import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';

//import HomeTeste from './components/home-html'
import Home from './components/home'
import Header from './components/header'
import Footer from './components/footer'
import PageItem from './components/modules/page-item'
import NewsItem from './components/modules/news-item'
import BlogList from './components/modules/blog-list'
import ListingItem from './components/modules/listing-item'
import EventItem from './components/modules/event-item'
import ListingList from './components/modules/listing-list'
import ListingGrid from './components/modules/listing-grid'
import Gallery from './components/modules/gallery'
import Contact from './components/modules/contact'
import Login from './components/modules/login'
import Register from './components/modules/register'

import BairroGrid from './components/modules/bairro-grid'
import NotFound from './components/not-found'

/* Importing css */
import './assets/styles/css/materialize.css';
import './assets/styles/css/style.css';
import './assets/styles/css/bootstrap.css';
import './assets/styles/css/responsive.css';
let city_or_neighbor = 'city/niteroi';
//let city_or_neighbor = 'district/engenhoca';
import (`./assets/styles/css/${city_or_neighbor}.css`);


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);



const ListingListComercios = (props) => {
    return (
        <ListingList 
            type="guia comercial" 
            match={props.match}
            location={props.location}
        />
    )
}

const ListingListServicos = (props) => {
    return (
        <ListingList 
            type="guia de serviços" 
            match={props.match}
            location={props.location}
        />
    )
}

const BlogListNews = (props) => { return (<BlogList 
                                        title="Noticías da Cidade de Niterói e do Brasil" 
                                        subtitle="Noticías atualizadas diariamente de tudo o que acontece em Niterói" 
                                        item="noticias"
                                        columnRight={true}
                                        match={props.match}
                                        location={props.location}

                                    />
                                    )
                            }

const BlogListCity = (props) => { return (<BlogList 
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

/*Implementar a pagina de fotos */
const Photos = () => {
    return(
        <Gallery
            title="Fotos da cidade de Niterói"
            columnRight={true}
        />
    )
}               
                    
const GridEvents = (props) => {
    console.log("meu prop aqui: ", props)
    return(
        <ListingGrid 
            listName="Eventos em Niterói"
            columnLeft={true}
            match={props.match}
            location={props.location}
            match={props.match}
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
                        <Header />
                        
                            <Switch>
                            <Redirect from="/guia_comercial_category/:slug/" to="/guia/comercial/categoria/:slug/" state={ { status: 301 } } />
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/cadastro" component={Register} />

                            <Route exact path="/a-cidade" component={BlogListCity} />
                            <Route exact path="/a-cidade/bairros-de-niteroi" component={BairrosGrid} />
                            <Route exact path="/a-cidade/:slug" component={PageItem} />
                            
                            <Route exact path="/guia" component={ListingList} />
                            <Route exact path="/guia/page/:page" component={ListingList} />
                            <Route exact path="/guia/comercial/page/:page" component={ListingListComercios} />
                            <Route exact path="/guia/servicos/page/:page" component={ListingListServicos} />
                            <Route exact path="/guia/comercial/categoria/:slug" component={ListingList} />
                            <Route exact path="/guia/comercial/categoria/:slug/page/:page" component={ListingList} />
                            <Route exact path="/guia/servicos/categoria/:slug" component={ListingList} />
                            <Route exact path="/guia/servicos/categoria/:slug/page/:page" component={ListingList} />
                            <Route exact path="/guia/servicos/" component={ListingListServicos} />
                            <Route exact path="/guia/comercial/" component={ListingListComercios} />
                            <Route exact path="/guia/categoria/:slug" component={ListingList} />
                            <Route exact path="/guia/:slug" component={ListingItem} />

                            <Route exact path="/eventos" component={GridEvents} />
                            <Route exact path="/eventos/categoria/:slug/page/:page" component={GridEvents} />
                            <Route exact path="/eventos/categoria/:slug" component={GridEvents} />
                            <Route exact path="/eventos/page/:page" component={GridEvents} />
                            <Route exact path="/eventos/:slug" component={EventItem} />

                            <Route exact path="/noticias/categoria/:slug/page/:page" component={BlogList} />
                            <Route exact path="/noticias/categoria/:slug" component={BlogList} />
                            <Route exact path="/noticias/:slug" component={NewsItem} />
                            <Route exact path="/noticias/page/:page" component={BlogListNews} />
                            <Route exact path="/noticias" component={BlogListNews} />

                            <Route exact path="/contato" component={Contact} />

                            <Route exact path="/:slug" component={NotFound} />
                            {/*@todo <Route exact path="/fotos-da-cidade-de-niteroi" component={Photos} />*/}
                            </Switch>
                        
                        <Footer />
                    </div>
                </Route>
            </BrowserRouter>
        </Provider>
        )
    }
}

export default App;
