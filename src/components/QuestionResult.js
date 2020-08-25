import React from 'react'
import { handle_answer_question } from '../actions/shared'
import { connect } from 'react-redux'
import { getOptionNumber } from '../utils/helper.js'

class QuestionResult extends React.Component {

    state = {
        answeredForFirstTime: false,
    }


    componentDidMount() {

        let { storeState, dispatch, questionId } = this.props

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

            this.setState({ answeredForFirstTime: true })

        } else {

            this.setState({ answeredForFirstTime: false })

        }

    }

    render() {

        let { storeState, questionId } = this.props

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

        let currentUser = storeState.users[currentQuestion.author] === undefined ? userDefaultObj : storeState.users[currentQuestion.author];

        let haveAnswered = currentQuestion.optionOne.votes.includes(storeState.auth.authedUser) || currentQuestion.optionTwo.votes.includes(storeState.auth.authedUser);

        let totalAnswers = option_1.votes.length + option_2.votes.length;

        return <div>

            <div id="questionResult">


                <div id="userInfo">
                    <h3>Asked By : <span style={{color: 'rgb(52, 119, 72)', }}>{currentUser.name}</span></h3>
                    <img src={`${currentUser.avatarURL}`} id="userImage" alt="" />
                </div>

                <div id="result">

                    <h2>Result: </h2>

                    <h2>Would you rather</h2>

                    <div id={choiceNum === '1' ? 'ChosenAnswer' : null} className={'optionBox'} ><h3>{option_1.text} {(choiceNum === '1') && console.log('(Your Vote)')}</h3>
                        <h4>{option_1.votes.length} out of {totalAnswers} votes</h4></div>
                    <div id={choiceNum === '2' ? 'ChosenAnswer' : null} className={'optionBox'} ><h3>{option_2.text} {(choiceNum === '2') && '(Your Vote)'}</h3>
                        <h4>{option_2.votes.length} out of {totalAnswers} votes</h4></div>


                </div>

                {(haveAnswered && !this.state.answeredForFirstTime ?

                    <h3 id="answeredQuestionText">You have already answered the question</h3>

                    :

                    <h2 id="answeredFirstTimeText" style={{ color: '#FFF', }}>Great ! You voted for the question</h2>

                )}

            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionResult)