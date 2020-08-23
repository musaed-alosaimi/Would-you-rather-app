import React from 'react'
import { handle_answer_question } from '../actions/shared'
import { Context } from '../AppContext'
import { connect } from 'react-redux'
import { getOptionNumber } from '../utils/helper.js'

class QuestionResult extends React.Component {

    state = {
        answeredForFirstTime: false,
    }


    componentWillMount() {

        let {storeState, dispatch, questionId } = this.props

        let choiceNum = getOptionNumber()

        let currentQuestion = storeState.questions[questionId]

        let authedUser = storeState.auth.authedUser;

        let haveAnswered = currentQuestion.optionOne.votes.includes(authedUser) || currentQuestion.optionTwo.votes.includes(authedUser);

        if (!haveAnswered) {

            let answerText = "";
            if (choiceNum === '1') {
                answerText = "optionOne";
            } else {
                answerText = "optionTwo";
            }

            dispatch(handle_answer_question(authedUser, currentQuestion.id, answerText))
            
            this.setState({answeredForFirstTime: true})

        }else{

            this.setState({answeredForFirstTime: false})

        }

    }

    render() {

        let {storeState, dispatch, questionId } = this.props

        let choiceNum = getOptionNumber()

        let currentQuestion = storeState.questions[questionId]

        let option_1 = currentQuestion.optionOne;
        let option_2 = currentQuestion.optionTwo;

        let userDefaultObj = {
            id: '',
            name: '',
            avatarURL: "",
            answers: {}
        };

        let currentUser = storeState.users[currentQuestion.author] === undefined ? userDefaultObj :  storeState.users[currentQuestion.author];

        let haveAnswered = currentQuestion.optionOne.votes.includes(storeState.auth.authedUser) || currentQuestion.optionTwo.votes.includes(storeState.auth.authedUser);

        let totalAnswers = option_1.votes.length + option_2.votes.length;

        return <div>

            <div id="questionResult">

                {(haveAnswered && !this.state.answeredForFirstTime ?

                    <h3 id="answeredQuestionText">You have already answered the question</h3>

                    :

                    <h2 id="answeredFirstTimeText" style={{color: '#FFF',}}>Great ! You voted for the question</h2>

                )}

                <div id="userInfo">
                    <h3>{currentUser.name}</h3>
                    <img src={`${currentUser.avatarURL}`} id="userImage" />
                </div>

                <div id="result">

                    <div id="option_1"><h3>Would you rather to be {option_1.text} {choiceNum === 1 && '(Your Vote)'}</h3>
                    <h4>{option_1.votes.length} out of {totalAnswers} votes</h4></div>
                    <div id="option_2"><h3>Would you rather to be {option_2.text} {choiceNum === 2 && '(Your Vote)'}</h3>
                    <h4>{option_2.votes.length} out of {totalAnswers} votes</h4></div>


                </div>

            </div>

        </div>


    }


}

function mapDispatchToProps(dispatch){

    return {
        dispatch,
    }
}

function mapStateToProps(storeState){

    return {
        storeState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionResult)