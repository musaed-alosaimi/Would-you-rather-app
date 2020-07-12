import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { getInitialDataAction, showLoading } from '../actions/shared'
import { loading_reducer } from '../reducers/shared'
import { SHOW_LOADING } from '../actions/action_constants'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import QuestionsComponent from './QuestionsComponent'
import { auth_reducer } from '../reducers/authedUser'
import { questions_reducer } from '../reducers/questions'
import { users_reducer } from '../reducers/users'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import ShowQuestion from './ShowQuestion';
import { Context } from '../AppContext'
import { userLogin } from '../actions/authedUser'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard';
import AppHeader from './AppHeader';

let store = createStore(combineReducers({ questions: questions_reducer, users: users_reducer, auth: auth_reducer, loading: loading_reducer }), applyMiddleware(thunk))

class App extends React.Component {


  componentDidMount() {

    store.subscribe(() => { this.forceUpdate() })
    store.dispatch(getInitialDataAction());

  }

  onLoginSubmitted(e) {

    e.preventDefault();

    store.dispatch(showLoading());

    store.dispatch(userLogin(this.state.selectedUser))

    console.log(this.state.selectedUser);

  }

  onUserSelectionChanged(e) {

    let value = e.target.value;

    this.setState({ selectedUser: value });

  }

  state = { selectedUser: "" }

  render() {

    let storeState = store.getState();
    let users = storeState.users;

    return (<Context.Provider value={store}>
      <div>

        <AppHeader store={store} />

        <div id="container">

          <Switch>

            <Route path={'/Login'} >

              <div id="Login">

                {storeState.loading === SHOW_LOADING &&
                  <h3>Loading ...</h3>
                }
                <h3>Login To Your Account</h3>

                <form onSubmit={(e) => this.onLoginSubmitted(e)}>

                  <select value={this.state.selectedUser} onChange={(e) => this.onUserSelectionChanged(e)}>

                    <option>Select a user</option>

                    {Object.keys(users).map((key) => {

                      let user = users[key];
                      return <option value={key}>{user.name}</option>

                    })}
                  </select>

                  {console.log(this.state.selectedUser)}

                  <input type="submit" value="Login" className="primary-button" disabled={this.state.selectedUser === ""} />

                </form>

                {storeState.auth.status &&

                  <Redirect
                    to={{
                      pathname: "/Home",
                      search: "",
                      state: {}
                    }}
                  />


                }

              </div>

            </Route>

            {storeState.auth.status ?

              <div>

                <Route path={['/', '/home', '/home/AnsweredQuestions', '/home/unAnsweredQuestions']} exact>

                  <Context.Consumer>

                    {(store) => {
                      
                      return <QuestionsComponent store={store} />

                    }}

                  </Context.Consumer>

                </Route>

                <Route path="/add" exact>

                  <AddQuestion store={store} />

                </Route>

                <Route path="/leaderboard" exact>

                  <Leaderboard store={store} />

                </Route>


                <Route path="/showQuestion/">

                  <ShowQuestion />

                </Route>

              </div>

              :

              <Route path="/">

                <div id="Login">

                  <h3>You aren't Signed In, so you have to Sign In to use the app</h3>

                </div>

              </Route>

            }

          </Switch>

        </div>


      </div>

    </Context.Provider>

    );

  }

}

export default App;