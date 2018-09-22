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
