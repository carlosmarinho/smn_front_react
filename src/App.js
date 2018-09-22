import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';

import logo from './logo.svg';
import './App.css';

const Dashboard = () => {return <div>Minha Dashboard</div>}
const Header = () => {return <div>Cabeçalho</div>}
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
          <BrowserRouter>
              <Route>
                  <div>
                      <Header />
                      <div className="container-fluid">
                          <Route exact path="/" component={Dashboard} />
                      </div>
                  </div>
              </Route>
          </BrowserRouter>
      </Provider>
  )
  }
}

export default App;
