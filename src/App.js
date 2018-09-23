import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';


import Header from './components/header'
import Footer from './components/footer'
/* import Content from './components/content'
import Blog from './components/modules/blog'
import Lista from './components/modules/lista'
import Grid from './components/modules/grid'
 */

 const Content = () => {return "Meu conteudo"}
 const Blog = () => {return "Meu conteudo blog blog blog"}
 const Lista = () => {return "Meu conteudo lista lista lista"}
 const Grid = () => {return "Meu conteudo grid grid grid"}

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
                          <Route exact path="/a-cidade" component={Blog} />
                          <Route exact path="/guias" component={Lista} />
                          <Route exact path="/eventos" component={Grid} />
                          
                      </div>
                      <Footer />
                  </div>
              </Route>
          </BrowserRouter>
      </Provider>
  )
}

export default App;
