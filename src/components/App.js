import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { getInitialDataAction } from '../actions/shared'
import { Route, Link, Switch } from 'react-router-dom'
import QuestionsComponent from './QuestionsComponent'
import ShowQuestion from './ShowQuestion';
import { Context } from '../AppContext'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard';
import AppHeader from './AppHeader';
import LoginComponent from './LoginComponent'


class App extends React.Component {

  static contextTypes = Context;

  componentDidMount() {

    console.log(this.context.store.getState());

    
    // store.subscribe(() => { this.forceUpdate() })
    // store.dispatch(getInitialDataAction());


  }

  render() {

    return ;


    // return (<Context.Consumer>

    //   {(store) => {


    //     let storeState = store.getState();
    //     let users = storeState.users;

    //     return <div>

    //       <AppHeader store={store} />

    //       <div id="container">

    //         <Switch>

    //           <Route path={'/Login'} >

    //             <LoginComponent />

    //           </Route>

    //           {store.getState().auth.status ?

    //             <div>

    //               <Route path={['/', '/home', '/home/AnsweredQuestions', '/home/unAnsweredQuestions']} exact>

    //                 <QuestionsComponent store={store} />

    //               </Route>

    //               <Route path="/add" exact>

    //                 <AddQuestion store={store} />

    //               </Route>

    //               <Route path="/leaderboard" exact>

    //                 <Leaderboard store={store} />

    //               </Route>

    //               <Route path="/showQuestion/">

    //                 <ShowQuestion />

    //               </Route>

    //             </div>

    //             :

    //             <Route path="/">

    //               <div id="Login">

    //                 <h3>You aren't Signed In, so you have to Sign In to use the app</h3>

    //               </div>

    //             </Route>

    //           }}


    //       </Switch>

    //       </div>


    //     </div>

    //   }}

    // </Context.Consumer>


    // );

  }

}



export default App