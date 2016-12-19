import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import './styles.scss';
import rootReducer from './reducers';
import MainView from './components/main.view.js';

function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk))
}

const store = configureStore()

var routes = (
  <Provider store={store}>
    <MainView />
  </Provider>
);

ReactDOM.render(routes, document.getElementById('root'))