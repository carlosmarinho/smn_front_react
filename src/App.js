import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';

import HomeTeste from './components/home-html'
import Home from './components/home'
import Header from './components/header'
import Footer from './components/footer'
import BlogList from './components/modules/blog-list'
import ListingItem from './components/modules/listing-item'
import ListingList from './components/modules/listing-list'
import ListingGrid from './components/modules/listing-grid'
import Contact from './components/modules/contact'

/* Importing css */
import './assets/styles/css/materialize.css';
import './assets/styles/css/style.css';
import './assets/styles/css/bootstrap.css';
import './assets/styles/css/responsive.css';
//let city_or_neighbor = 'city/niteroi';
let city_or_neighbor = 'district/engenhoca';
import (`./assets/styles/css/${city_or_neighbor}.css`);


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const BlogListNew = () => { return (<BlogList item="noticias"/>)}

class App extends Component {
    render() {
        return (
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                <Route>
                    <div>
                        <Header />
                        <div>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/a-cidade" component={BlogList} />
                            <Route exact path="/guia" component={ListingList} />
                            <Route exact path="/eventos" component={ListingGrid} />
                            <Route exact path="/guia/:slug" component={ListingItem} />
                            <Route exact path="/contato" component={Contact} />
                            <Route exact path="/noticias" component={BlogListNew} />
                            <Route exact path="/home-teste" component={HomeTeste} />
                        </div>
                        <Footer />
                    </div>
                </Route>
            </BrowserRouter>
        </Provider>
        )
    }
}

export default App;
