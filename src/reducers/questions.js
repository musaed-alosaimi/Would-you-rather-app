import {GET_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION} from '../actions/action_constants'

export function questions_reducer(state = [], action){

    if(action.type === GET_QUESTIONS){

        return {...state, ...action.questions};

    }else if(action.type === ADD_QUESTION){

        return {...state, [action.formattedQuestion.id]: action.formattedQuestion};
    }else if(action.type === ANSWER_QUESTION){

        let newState = {...state};

        newState[action.qid][action.answer].votes.push(action.authedUser);

        return newState;

    }

    return state;

}