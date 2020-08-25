import React from 'react'
import { getIdFromURL } from '../utils/helper.js'
import { Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import QuestionResult from './QuestionResult'
import QuestionNotFoundComponent from './QuestionNotFoundComponent'

class ShowQuestion extends React.Component {

    state = {
        haveAnswered: false,
        directToHome: false,
    }

    componentDidMount() {

        let { storeState } = this.props;
        let { users, auth } = storeState;
        let question_id = getIdFromURL();

        let SignedUser = users[auth.authedUser]

        if (users.length !== 0) {

            if (Object.keys(SignedUser.answers).includes(question_id))
                this.setState({ haveAnswered: true, })

        }


    }

    render() {

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

        let { storeState } = this.props;

        let question_id = getIdFromURL();

        if (!Object.keys(storeState.questions).includes(question_id))
            return <QuestionNotFoundComponent />


        let currentQuestion = storeState.questions[question_id] === undefined ? questionDefaultObj : storeState.questions[question_id];
        let option_1 = currentQuestion.optionOne;
        let option_2 = currentQuestion.optionTwo;

        let users = storeState.users

        let author = users[currentQuestion.author]

        let answer = storeState.users[storeState.auth.authedUser].answers[question_id]

        return <div>

            {this.state.haveAnswered &&
                <Redirect to={'/questions/' + question_id + '/' + (answer === 'optionOne' ? 'option_1' : 'option_2')} />
            }

            <Route path={`/questions/:question_id`} exact >
                <div id="showQuestion">

                    <img src={author.avatarURL} id="authorImage" alt="" />

                    <h3>{author.name} asks : </h3>

                    <div>

                        <h2>Would you rather ?</h2>

                        <div id="options">
                            <Link to={`${question_id}/option_1`}><div className="option">{option_1.text}</div></Link>
                            <Link to={`${question_id}/option_2`}><div className="option">{option_2.text}</div></Link>
                        </div>

                    </div>

                </div>

            </Route>

            <Route path={[`/questions/:question_id/option_1`, `/questions/:question_id/option_2`]}>

                <QuestionResult questionId={question_id} />

            </Route>

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

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuestion)