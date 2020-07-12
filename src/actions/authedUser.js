import {USER_LOGIN, USER_LOGOUT} from './action_constants'

export function userLogin(user_id){

    return {
        type: USER_LOGIN,
        user_id
    }

}

export function userLogout(){

    return {
        type: USER_LOGOUT
    }

}