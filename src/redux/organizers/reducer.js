import {
    START_FETCHING_ORGANIZER,
    SUCCESS_FETCHING_ORGANIZERS,
    ERROR_FETCHING_ORGANIZERS
} from './constans'

const statuslist = {
    idle: 'idle',
    procces: 'procces',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    status: statuslist.idle
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_ORGANIZER:
            return { ...state, status: statuslist.procces }

        case SUCCESS_FETCHING_ORGANIZERS:
            return {
                ...state,
                status: statuslist.success,
                data: action.users
            }

        case ERROR_FETCHING_ORGANIZERS:
            return { ...state, status: statuslist.error }

        default:
            return state
    }
}