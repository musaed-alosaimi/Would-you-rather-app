import React from 'react'
import { connect } from 'react-redux'

class Leaderboard extends React.Component {


    sortedUsers() {


        let {storeState} = this.props

        let users = storeState.users;
        let sortedUsers = [];

        Object.keys(users).map((key) => {

            if(Object.keys(storeState.users).length === sortedUsers.le)
            return

            let user = users[key];
            let userQuestions = user.questions;
            let userAnswersLength = Object.keys(user.answers).length;
            let score1 = userAnswersLength + userQuestions.length;

            if (sortedUsers.length === 0) {
                sortedUsers = [user];
                return;
            }

            sortedUsers.map((user2, index) => {

                let lastIndex = sortedUsers.length - 1;

                let userQuestions = user2.questions;
                let userAnswersLength = Object.keys(user2.answers).length;
                let score2 = userAnswersLength + userQuestions.length;

                if (score1 > score2) {

                    sortedUsers.splice(index, 0, user);

                } else if (index === lastIndex) {

                    sortedUsers[lastIndex+1] = user;

                }

            })

        })

        return sortedUsers;

    }

    render() {

        let {storeState, dispatch} = this.props;
        let users = storeState.users;
        let sortedUsers = this.sortedUsers();

        return <div>

            <div id="leaderboard">

                <h2>Leaderboard page</h2>

                <ul id="leaderboardList">

                    {sortedUsers.map((user, id) => {

                        let currentUser = users[user.id];
                        let userQuestions = currentUser.questions;
                        let userAnswers = currentUser.answers;

                        let userAnswersLength = Object.keys(userAnswers).length;

                        let score = userQuestions.length + userAnswersLength;

                        return <li key={id}>

                            <div className="userInfo"><span className="name">{currentUser.name}</span><img src={`${currentUser.avatarURL}`} className="userImage" /></div>
                            <div className="records">
                                <h3>Number of Questions : {userQuestions.length}</h3>
                                <h3>Answered Questions : {userAnswersLength}</h3>
                            </div>
                            <div className="totalScore">

                                <div className="totalScoreNumber">{score}</div>

                            </div>

                        </li>


                    })}

                </ul>

            </div>


        </div>



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

export default connect(mapStateToProps, mapDispatchToState)(Leaderboard)