import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { getInitialDataAction, hideLoading } from '../actions/shared'
import { Route, Switch } from 'react-router-dom'
import QuestionsComponent from './QuestionsComponent'
import ShowQuestion from './ShowQuestion';
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard';
import AppHeader from './AppHeader';
import LoginComponent from './LoginComponent'
import { connect } from 'react-redux'
import { userLogin } from '../actions/authedUser';
import { getIdFromURL } from '../utils/helper';


class App extends React.Component {

  componentDidMount() {

    this.props.dispatch(getInitialDataAction());

    let authedUser = localStorage.getItem('authedUser')

    if (authedUser !== "null") {

      this.props.dispatch(userLogin(authedUser))

    }

    let url = window.location.href;

    if (!url.includes('showQuestion')) {

      localStorage.setItem('routeAfterLogin', 'null')

    }


  }

  render() {

    let { storeState } = this.props;

    let question_id = getIdFromURL();
    
    return (
      <div>

        <AppHeader />

        <div id="container">

          {storeState.auth.status ?

            <div>
              <Switch>
                <Route path={['/', '/home', '/home/AnsweredQuestions', '/home/unAnsweredQuestions']} exact>

                  <QuestionsComponent />

                </Route>

                <Route path="/add" exact>

                  <AddQuestion />

                </Route>

                <Route path="/leaderboard" exact>

                  <Leaderboard />

                </Route>


                <Route path="/showQuestion/">

                  <ShowQuestion />

                </Route>

                <Route path={'/Login'} exact>

                  <LoginComponent />

                </Route>

              </Switch>

            </div>

            :

            <div>

              <Switch>

                <Route path={'/Login'} exact>

                  <LoginComponent />

                </Route>

                <Route path="/">

                  <div id="Login">

                    {storeState.auth === {} || !storeState.auth.status && <h3>You aren't Signed In, so you have to Sign In to use the app</h3>}

                  </div>

                </Route>

              </Switch>

              <Route path='/showQuestion/' render={() => (localStorage.setItem('routeAfterLogin', '/showQuestion/' + question_id))} />


            </div>

          }

        </div>


      </div >

    );

  }

}

function mapDispatchToProps(dispatch) {

  return {
    dispatch,
  }
}

function mapStateToProps(storeState) {

  return {
    storeState,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)