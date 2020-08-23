import React from 'react'
import { getIdFromURL } from '../utils/helper.js'
import { Context } from '../AppContext'
import { Route, Link } from 'react-router-dom'
import { answerQuestion } from '../actions/shared'
import {connect} from 'react-redux'
import QuestionResult from './QuestionResult'

class ShowQuestion extends React.Component {

    componentDidMount() {

    }


    onQuestionAnswered = () => {

        


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

        let userDefaultObj = {
            id: '',
            name: '',
            avatarURL: "",
            answers: {}
        };

        let { storeState, dispatch } = this.props;

        
        let authedUser = storeState.auth.authedUser;

        let question_id = getIdFromURL();

        if(!Object.keys(storeState.questions).includes(question_id))
        return <div className='Error404Text'><h2>404</h2><h2>The question you are looking for doesn't exist.</h2></div>

        let currentQuestion = storeState.questions[question_id] === undefined ? questionDefaultObj : storeState.questions[question_id];
        let option_1 = currentQuestion.optionOne;
        let option_2 = currentQuestion.optionTwo;

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
                
                <QuestionResult questionId={question_id} />

            </Route>

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
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShowQuestion)