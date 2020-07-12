import React from 'react'
import { handle_answer_question } from '../actions/shared'
import { Context } from '../AppContext'
import { getOptionNumber } from '../utils/helper.js'

export default class QuestionResult extends React.Component {

    store = this.props.store;

    storeState = this.store.getState();


    componentWillMount() {

        let { currentQuestion } = this.props;

        let haveAnswered = currentQuestion.optionOne.votes.includes(this.storeState.authedUser) || currentQuestion.optionTwo.votes.includes(this.storeState.authedUser);

        let authedUser = this.store.getState().auth.authedUser;

        if (!haveAnswered) {

            let answerText = "";
            if (getOptionNumber() === 1) {
                answerText = "optionOne";
            } else {
                answerText = "optionTwo";
            }
            
            console.log(answerText + " " + getOptionNumber());

            this.store.dispatch(handle_answer_question(authedUser, currentQuestion.id, answerText))

        }

    }

    render() {

        let { currentQuestion} = this.props;

        let option_1 = currentQuestion.optionOne;
        let option_2 = currentQuestion.optionTwo;

        console.log(currentQuestion);

        let userDefaultObj = {
            id: '',
            name: '',
            avatarURL: "",
            answers: {}
        };

        let currentUser = this.storeState.users[currentQuestion.author] === undefined ? userDefaultObj : this.storeState.users[currentQuestion.author];

        let haveAnswered = currentQuestion.optionOne.votes.includes(this.storeState.auth.authedUser) || currentQuestion.optionTwo.votes.includes(this.storeState.auth.authedUser);

        let totalAnswers = option_1.votes.length + option_2.votes.length;

        return <div>

            <div id="questionResult">

                {(haveAnswered &&

                    <h3 id="answeredQuestionText">You have already answered the question</h3>

                )}

                <div id="userInfo">
                    <h3>{currentUser.name}</h3>
                    <img src={`${currentUser.avatarURL}`} id="userImage" />
                </div>

                <div id="result">

                    <div id="option_1"><h3>Would you rather to be {option_1.text} {getOptionNumber() === 1 && '(Your Vote)'}</h3><h4>{option_1.votes.length} out of {totalAnswers} votes</h4></div>
                    <div id="option_2"><h3>Would you rather to be {option_2.text} {getOptionNumber() === 2 && '(Your Vote)'}</h3><h4>{option_2.votes.length} out of {totalAnswers} votes</h4></div>


                </div>

            </div>

        </div>


    }


}