import {GET_USERS} from '../actions/action_constants'

export function users_reducer(state = [], action){

    if(action.type === GET_USERS){
        return {...state, ...action.users};
    }


    return state;


}