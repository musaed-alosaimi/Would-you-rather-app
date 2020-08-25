import React from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { SHOW_LOADING } from '../actions/action_constants'

class QuestionsComponent extends React.Component {

    render() {

        let {storeState} = this.props;

        let { questions, users, auth } =storeState;

        let authedUser = auth.authedUser;

        return <div>

            <div id="questions">

                <ul className="answeredUnAnsweredNav">
                    <Link to="/Home/answeredQuestions"><li>Answered Questions</li></Link>
                    <Link to="/Home/unAnsweredQuestions"><li>Unanswered Questions</li></Link>
                </ul>

                {storeState.loading === SHOW_LOADING && <h2 className="loadingText">Loading ..</h2>}

                <Route path={['/', '/Home', '/Home/answeredQuestions']} exact>

                    <ul className="quesitonsList">

                        {Object.keys(questions).reverse().map((key) => {

                            let currentQuestion = questions[key];
                            let questionAuthor = users[currentQuestion.author];

                            let isAnswered = Object.keys(users[authedUser].answers).includes(currentQuestion.id);

                            if (isAnswered) {

                                return <Link key={key} to={`/questions/${key}`}><li>

                                    {/* TODO: Change the avatar_placeholder to the avatar image url from _DATA.js */}
                                    <div className="userInfo"><h4>{questionAuthor.name}</h4><img src={`${questionAuthor.avatarURL}`} className="userImage" alt="" /></div>
                                    <div className="questionInfo">

                                        <h3>Would you rather ?</h3>

                                        <h5>.. {currentQuestion.optionOne.text} ..</h5>

                                    </div>

                                </li></Link>

                            }

                            return ""


                        })}

                    </ul>

                </Route>

                <Route path={['/home/unAnsweredQuestions']}>

                    <ul className="quesitonsList">

                        {Object.keys(questions).reverse().map((key) => {

                            let currentQuestion = questions[key];
                            let questionAuthor = users[currentQuestion.author];

                            let authedUser = auth.authedUser;

                            let isAnswered = Object.keys(users[authedUser].answers).includes(currentQuestion.id);

                            if (!isAnswered) {

                                return <Link key={key} to={`/questions/${key}`}><li>

                                    {/* TODO: Change the avatar_placeholder to the avatar image url from _DATA.js */}
                                    <div className="userInfo"><h4>{questionAuthor.name}</h4><img src={`${questionAuthor.avatarURL}`} className="userImage" alt="" /></div>
                                    <div className="questionInfo">

                                        <h3>Would you rather ?</h3>

                                        <h5>.. {currentQuestion.optionOne.text} ..</h5>

                                    </div>

                                </li></Link>

                            }

                            return ""

                        })}

                    </ul>

                </Route>

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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsComponent)