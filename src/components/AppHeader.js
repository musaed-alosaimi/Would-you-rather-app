import React from 'react'
import { Link } from 'react-router-dom'
import {userLogout} from '../actions/authedUser'

export default class AppHeader extends React.Component {

    store = this.props.store;
    storeState = this.store.getState();

    SignOut(){

        this.store.dispatch(userLogout());

    }


    render() {

        this.store = this.props.store;
        this.storeState = this.store.getState();

        let authedUser = this.storeState.auth.authedUser;
        let users = this.storeState.users;
        let user = users[authedUser] !== undefined ? users[authedUser] : { name: "" };

        return <header>
            <nav>

                <ul>
                    <Link to="/Home"><li>Home</li></Link>
                    <Link to="/add"><li>Add question</li></Link>
                    <Link to="/leaderboard"><li>Leaderboard</li></Link>
                </ul>

            </nav>

            {this.storeState.auth.status ?

                <div id="userInfo">

                    <img src={user.avatarURL} id="userImage" />

                    <div id="rightSide">
                        <h4>Hello {user.name}</h4>

                        <Link to="/Login" onClick={() => this.SignOut()}><span className="primary-button">SignOut</span></Link>
                    </div>

                </div>

                :

                <div id="userInfo">

                    <Link to="/Login"><span className="primary-button signInButton">SignIn</span></Link>

                </div>


            }

        </header>


    }

}