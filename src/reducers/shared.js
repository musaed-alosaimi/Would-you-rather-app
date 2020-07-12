import {showLoading} from '../actions/shared'
import {} from '../actions/action_constants'
import {SHOW_LOADING} from '../actions/action_constants'

export function loading_reducer(state = [], action){

    if(action.type === SHOW_LOADING){

        return SHOW_LOADING
    }

    return state;

}