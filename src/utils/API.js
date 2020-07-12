import {_getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer} from './_DATA'

export function getInitialData(){

    return Promise.all([_getUsers(), _getQuestions()]).then((values) => ({users: values[0], questions: values[1]}));

}

export function saveQuestion(question){


    return _saveQuestion(question).then((question) => (question))

}

export function saveAnswer({ authedUser, qid, answer }){

    return _saveQuestionAnswer({ authedUser, qid, answer })

}