import {GET_USERS, ANSWER_QUESTION} from '../actions/action_constants'

export function users_reducer(state = [], action){

    if(action.type === GET_USERS){
        return {...state, ...action.users};
    }else if(action.type === ANSWER_QUESTION){

        let newState = {...state}

        newState = {...newState, 
            [action.authedUser]: {...newState[action.authedUser], 
                answers: {...newState[action.authedUser].answers, [action.qid]: action.answer}}}

        return newState
    }


    return state;


}