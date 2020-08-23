import {showLoading} from '../actions/shared'
import {SHOW_LOADING, HIDE_LOADING} from '../actions/action_constants'

export function loading_reducer(state = [], action){

    if(action.type === SHOW_LOADING){

        return SHOW_LOADING
    }else{
        return HIDE_LOADING
    }

}