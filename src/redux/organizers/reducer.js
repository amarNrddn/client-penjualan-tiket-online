import {
    START_FETCHING_ORGANIZER,
    SUCCESS_FETCHING_ORGANIZERS,
    ERROR_FETCHING_ORGANIZERS,
    SET_PAGE
} from './constans'

const statuslist = {
    idle: 'idle',
    procces: 'procces',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    page: 1,
    limit: 2,
    pages: 1,
    status: statuslist.idle
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_ORGANIZER:
            return { ...state, status: statuslist.procces }

        case SUCCESS_FETCHING_ORGANIZERS:
            return {
                ...state,
                data: action.users,
                pages: action.pages,
                status: statuslist.success,
            }

        case SET_PAGE: 
            return {
                ...state,
                page: action.page
            }

        case ERROR_FETCHING_ORGANIZERS:
            return { ...state, status: statuslist.error }

        default:
            return state
    }
}