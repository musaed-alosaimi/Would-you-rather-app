import {GET_USERS} from './action_constants'

export function getUsers(users){
    return {
        type: GET_USERS,
        users
    }
}

