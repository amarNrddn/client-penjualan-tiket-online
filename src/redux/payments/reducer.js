import {
    START_FETCHING_PAYMENTS,
    SUCCESS_FETCHING_PAYMENTS,
    ERROR_FETCHING_PAYMENTS
} from './constans'

const statuslist = {
    idle: 'idle',
    proccess: 'proccess',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    status: statuslist.idle
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_PAYMENTS:
            return { ...state, status: statuslist.proccess }

        case SUCCESS_FETCHING_PAYMENTS:
            return {
                ...state,
                status: statuslist.success,
                data: action.payments
            }
            
        case ERROR_FETCHING_PAYMENTS:
            return { ...state, status: statuslist.error }

        default:
            return state
    }
}