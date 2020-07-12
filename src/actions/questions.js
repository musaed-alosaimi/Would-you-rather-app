import {GET_QUESTIONS, ADD_QUESTION} from './action_constants'
import { saveQuestion } from '../utils/API'

export function getQuestions(questions){

    return {
        type: GET_QUESTIONS,
        questions
    }

}


function addQuestion(formattedQuestion){

    return {
        type: ADD_QUESTION,
        formattedQuestion
    }

}


export function handle_add_question({ optionOneText, optionTwoText, author }){


    return (dispatch) => {

        saveQuestion({ optionOneText, optionTwoText, author }).then((formattedQuestion) => {

            dispatch(addQuestion(formattedQuestion));

        })


    }



}
