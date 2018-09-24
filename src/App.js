import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';


import Header from './components/header'
import Footer from './components/footer'
import Content from './components/content'
import BlogList from './components/modules/blog-list'
import ListingItem from './components/modules/listing-item'
import ListingGrid from './components/modules/listing-grid'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

//class App extends Component {
const App = () => {

    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
          <BrowserRouter>
              <Route>
                  <div>
                      <Header />
                      <div>
                          <Route exact path="/" component={Content} />
                          <Route exact path="/a-cidade" component={BlogList} />
                          <Route exact path="/guia" component={ListingItem} />
                          <Route exact path="/eventos" component={ListingGrid} />
                      </div>
                      <Footer />
                  </div>
              </Route>
          </BrowserRouter>
      </Provider>
  )
}

export default App;
