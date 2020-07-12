import React from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Context } from '../AppContext'
import {showLoading} from '../actions/shared'

const MyContext = React.createContext({});

class QuestionsComponent extends React.Component {

    store = this.props.store;

    componentWillMount() {

        this.store.dispatch(showLoading());

    }

    render() {

        let state = this.store.getState();

        let { questions, users, auth } = state;

        return <div>

            <div id="questions">

                <ul className="answeredUnAnsweredNav">
                    <Link to="/Home/answeredQuestions"><li>Answered Questions</li></Link>
                    <Link to="/Home/unAnsweredQuestions"><li>Unanswered Questions</li></Link>
                </ul>

                <Route path={['/', '/Home', '/answeredQuestions']}>

                    <ul className="quesitonsList">

                        {Object.keys(questions).reverse().map((key) => {

                            let currentQuestion = questions[key];
                            let questionAuthor = users[currentQuestion.author];

                            let authedUser = auth.authedUser;

                            let isAnswered = Object.keys(users[authedUser].answers).includes(currentQuestion.id);

                            if (isAnswered) {

                                return <Link key={key} to={`/showQuestion/${key}`}><li>

                                    {/* TODO: Change the avatar_placeholder to the avatar image url from _DATA.js */}
                                    <div className="userInfo"><h4>{questionAuthor.name}</h4><img src={`${questionAuthor.avatarURL}`} className="userImage" /></div>
                                    <div className="questionInfo">

                                        <h3>Would you rather ?</h3>

                                        <h5>.. {currentQuestion.optionOne.text} ..</h5>

                                    </div>

                                </li></Link>

                            }


                        })}

                    </ul>

                </Route>

                <Route path={['/home/unAnsweredQuestions']}>

                    {console.log("unAnsweredQuestions")}

                    <ul className="quesitonsList">

                        {Object.keys(questions).reverse().map((key) => {

                            let currentQuestion = questions[key];
                            let questionAuthor = users[currentQuestion.author];

                            let authedUser = auth.authedUser;

                            let isAnswered = Object.keys(users[authedUser].answers).includes(currentQuestion.id);

                            if (!isAnswered) {

                                return <Link key={key} to={`/showQuestion/${key}`}><li>

                                    {/* TODO: Change the avatar_placeholder to the avatar image url from _DATA.js */}
                                    <div className="userInfo"><h4>{questionAuthor.name}</h4><img src={`${questionAuthor.avatarURL}`} className="userImage" /></div>
                                    <div className="questionInfo">

                                        <h3>Would you rather ?</h3>

                                        <h5>.. {currentQuestion.optionOne.text} ..</h5>

                                    </div>

                                </li></Link>

                            }


                        })}

                    </ul>

                </Route>

            </div>

        </div>


    }


}


export default QuestionsComponent