import React from 'react'
import { Link } from 'react-router-dom'
import {userLogout} from '../actions/authedUser'
import { connect } from 'react-redux';

class AppHeader extends React.Component {

    SignOut(){

        localStorage.setItem('authedUser', null)
        this.props.dispatch(userLogout());
        
    }


    render() {

        let {storeState, dispatch} = this.props

        let authedUser = storeState.auth.authedUser;
        let users = storeState.users;
        let user = users[authedUser] !== undefined ? users[authedUser] : { name: "" };

        return <header>
            <nav>

                <ul>
                    <Link to="/Home"><li>Home</li></Link>
                    <Link to="/add"><li>Add question</li></Link>
                    <Link to="/leaderboard"><li>Leaderboard</li></Link>
                </ul>

            </nav>

            {storeState.auth.status ?

            

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

function mapStateToProps(storeState){

    return {
        storeState,
    }
}

function mapDispatchToState(dispatch){

    return {
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToState)(AppHeader)