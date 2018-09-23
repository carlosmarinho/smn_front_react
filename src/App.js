import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';

import logo from './logo.svg';
import './App.css';

import Header from './components/header'
import Footer from './components/footer'
import Content from './components/content'
import Blog from './components/modules/blog'
import ListaGuia from './components/modules/lista_guia'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
          <BrowserRouter>
              <Route>
                  <div>
                      <Header />
                      <div>
                          <Route exact path="/" component={Content} />
                          <Route exact path="/a-cidade" component={Blog} />
                          <Route exact path="/guias" component={ListaGuia} />
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
