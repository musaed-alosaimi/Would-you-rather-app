import React, {connect} from 'react'
import { SHOW_LOADING } from '../actions/action_constants'
import { userLogin } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { showLoading } from '../actions/shared'
import { MyContext } from '../AppContext'


class LoginComponent extends React.Component {

    storeState = this.props.state;

    dispatch = this.props.dispatch;

    onLoginSubmitted(e) {

        e.preventDefault();

        this.dispatch(showLoading());

        this.dispatch(userLogin(this.state.selectedUser))

    }

    onUserSelectionChanged(e) {

        let value = e.target.value;

        this.setState({ selectedUser: value });

    }

    state = { selectedUser: "" }


    render() {


        return <MyContext.Consumer>

            {(store) => {

                let storeState = store.getState();
                let users = storeState.users;


                return <div id="Login">

                    {this.storeState.loading === SHOW_LOADING &&
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

                        <input type="submit" value="Login" className="primary-button" disabled={this.state.selectedUser === ""} />

                    </form>

                    {this.storeState.auth.status &&

                        <Redirect
                            to={{
                                pathname: "/Home",
                                search: "",
                                state: {}
                            }}
                        />


                    }

                </div>

            }}


        </MyContext.Consumer>




    }



}

export default LoginComponent