import React from 'react'
import { getIdFromURL, getOptionNumber } from '../utils/helper.js'
import { Context } from '../AppContext'
import { Route, Link } from 'react-router-dom'
import { answerQuestion } from '../actions/shared'
import QuestionResult from './QuestionResult'

export default class ShowQuestion extends React.Component {

    componentDidMount() {


    }


    render() {
        return <Context.Consumer>

            {(store) => {

                let questionDefaultObj = {
                    optionOne: {
                        votes: [],
                        text: '',
                    },
                    optionTwo: {
                        votes: ['', ''],
                        text: ''
                    }
                };

                let userDefaultObj = {
                    id: '',
                    name: '',
                    avatarURL: "",
                    answers: {}
                };

                let storeState = store.getState();

                let authedUser = storeState.auth.authedUser;

                let question_id = getIdFromURL();

                let currentQuestion = storeState.questions[question_id] === undefined ? questionDefaultObj : storeState.questions[question_id];
                let option_1 = currentQuestion.optionOne;
                let option_2 = currentQuestion.optionTwo;

                let currentUser = storeState.users[authedUser] === undefined ? userDefaultObj : storeState.users[authedUser];

                return <div>

                    <Route path={`/showQuestion/:question_id`} exact >
                        <div id="showQuestion">

                            <h3>Show Question</h3>

                            <div>

                                <h4>Would you rather ?</h4>

                                <div id="options">
                                    <Link to={`${question_id}/option_1`}><div className="option" id="firstOption"><h4>{option_1.text}</h4></div></Link>
                                    <Link to={`${question_id}/option_2`}><div className="option" id="secondOption"><h4>{option_2.text}</h4></div></Link>
                                </div>

                            </div>

                        </div>

                    </Route>

                    <Route path={[`/showQuestion/:question_id/option_1`, `/showQuestion/:question_id/option_2`]}>

                        <QuestionResult store={store} currentQuestion={currentQuestion} option_1={option_1} option_2={option_2} />


                    </Route>

                </div>


            }
            }

        </Context.Consumer>


    }


}