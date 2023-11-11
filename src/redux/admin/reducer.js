import {
    START_FETCHING_ADMIN,
    SUCCESS_FETCHING_ADMIN,
    ERROR_FETCHING_ADMIN
} from './constans'

const statuslist = {
    idle: 'idle',
    procces: 'procces',
    success: 'succcess',
    error: 'error'
}

const initialState = {
    data: [],
    status: statuslist.idle
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_ADMIN:
            return { ...state, status: statuslist.procces }

        case SUCCESS_FETCHING_ADMIN:
            return {
                ...state,
                status: statuslist.success,
                data: action.admin
            }

        case ERROR_FETCHING_ADMIN:
            return { ...state, status: statuslist.error }

        default:
            return state
    }
}