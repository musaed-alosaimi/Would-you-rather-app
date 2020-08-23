import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom"
import { auth_reducer } from './reducers/authedUser'
import { questions_reducer } from './reducers/questions'
import { users_reducer } from './reducers/users'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { loading_reducer } from './reducers/shared'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

document.title = 'Would your rather app'

let store = createStore(combineReducers({ questions: questions_reducer, users: users_reducer, auth: auth_reducer, loading: loading_reducer }), applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
