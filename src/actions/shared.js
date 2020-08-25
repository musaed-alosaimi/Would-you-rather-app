import { ANSWER_QUESTION, SHOW_LOADING, HIDE_LOADING } from './action_constants'
import { getUsers } from './users'
import { getQuestions } from './questions'
import { getInitialData, saveAnswer } from '../utils/API'

export function getInitialDataAction() {

    return (dispatch, state) => {

        dispatch(showLoading());

        getInitialData().then(({ users, questions }) => {

            dispatch(getUsers(users));
            dispatch(getQuestions(questions));

            dispatch(hideLoading());

        })


    }

}


function answerQuestion(authedUser, qid, answer) {

    return {
        type: ANSWER_QUESTION,
        authedUser, qid, answer
    }

}

export function handle_answer_question(authedUser, qid, answer) {

    return (dispatch, getState) => {

        saveAnswer({ authedUser, qid, answer }).then(() => {

            dispatch(answerQuestion(authedUser, qid, answer));


        })


    }


}


export function showLoading() {

    return {
        type: SHOW_LOADING,
    }

}

export function hideLoading() {

    return {
        type: HIDE_LOADING,
    }

}