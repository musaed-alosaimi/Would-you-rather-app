import {SHOW_LOADING, HIDE_LOADING} from '../actions/action_constants'

export function loading_reducer(state = [], action){

    if(action.type === SHOW_LOADING){

        return action.type
    }else if(action.type === HIDE_LOADING){

        return action.type
    }else{
        return state
    }

}