import {USER_LOGIN, USER_LOGOUT} from '../actions/action_constants'

export function auth_reducer(state = [], action){

    if(action.type === USER_LOGIN){

        return {...state, status: true, authedUser: action.user_id}

    }else if(action.type === USER_LOGOUT){

        return {...state, status: false, authedUser: ""}
    }

    return state;

}