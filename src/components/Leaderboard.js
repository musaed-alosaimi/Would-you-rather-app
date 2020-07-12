import React from 'react'

export default class Leaderboard extends React.Component {

    store = this.props.store;

    sortedUsers() {

        let storeState = this.store.getState();
        let users = storeState.users;
        let sortedUsers = [];

        Object.keys(users).map((key) => {

            let user = users[key];
            let userQuestions = user.questions;
            let userAnswersLength = Object.keys(user.answers).length;
            let score1 = userAnswersLength + userQuestions.length;

            if (sortedUsers.length === 0) {
                sortedUsers.push(user);
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

                    sortedUsers.push(user);

                }

            })

        })

        return sortedUsers;

    }

    render() {

        let storeState = this.store.getState();
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
                                <h3>Answered Questions : {userQuestions.length}</h3>
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