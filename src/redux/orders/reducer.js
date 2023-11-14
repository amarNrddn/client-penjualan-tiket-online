import {
    START_FETCHING_ORDERS,
    SUCCESS_FETCHING_ORDERS,
    ERROR_FETCHING_ORDERS,
    SET_DATE,
    SET_PAGE
} from './constants'

const statuslist = {
    idle: 'idle',
    process: 'procces',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    page: 1,
    limit: 4,
    pages: 1,
    date: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    },
    status: statuslist.idle
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_ORDERS:
            return { ...state, status: statuslist.process }

        case SUCCESS_FETCHING_ORDERS:
            return {
                ...state,
                data: action.orders,
                pages: action.pages,
                status: statuslist.success
            }

        case ERROR_FETCHING_ORDERS:
            return { ...state, status: statuslist.error }

        case SET_DATE:
            return {
                ...state,
                date: action.ranges
            }

        case SET_PAGE:
            return {
                ...state,
                page: action.page
            }

        default:
            return state
    }
}