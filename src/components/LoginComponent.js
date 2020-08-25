import React from 'react';
import { connect } from 'react-redux'
import { SHOW_LOADING } from '../actions/action_constants'
import { Redirect } from 'react-router-dom'
import { userLogin } from '../actions/authedUser'

class LoginComponent extends React.Component {

  state = { selectedUser: "", }

  onUserSelectionChanged(e) {

    let value = e.target.value;

    this.setState((previusState) => ({ ...previusState, selectedUser: value, }));

  }

  onLoginSubmitted(e) {

    e.preventDefault();

    localStorage.setItem('authedUser', this.state.selectedUser)

    this.props.dispatch(userLogin(this.state.selectedUser))

  }

  componentDidMount() {



  }


  render() {

    let { storeState } = this.props
    
    let { loading, users } = storeState

    let routeAfterLogin = localStorage.getItem('routeAfterLogin')

    return <div id="Login">

      {loading === SHOW_LOADING &&
        <h3>Loading ...</h3>
      }
      <h3>Login To Your Account</h3>

      <form onSubmit={(e) => this.onLoginSubmitted(e)}>

        <select value={this.state.selectedUser} onChange={(e) => this.onUserSelectionChanged(e)}>

          <option>Select a user</option>

          {Object.keys(users).map((key) => {

            let user = users[key];
            return <option key={key} value={key}>{user.name}</option>

          })}
        </select>

        <input type="submit" value="Login" className="primary-button" disabled={this.state.selectedUser === ""} />

      </form>


      {storeState.auth.status &&

        (routeAfterLogin !== 'null' ?

          <Redirect
            to={{
              pathname: routeAfterLogin,
              search: "",
              state: {}
            }}
          />


          :

          <Redirect
            to={{
              pathname: "/Home",
              search: "",
              state: {}
            }}
          />

        )

      }

    </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)