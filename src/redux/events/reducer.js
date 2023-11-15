import {
    START_FETCHING_EVENTS,
    SUCCESS_FETCHING_EVENTS,
    ERROR_FETCHING_EVENTS,
    SET_KEYWORD,
    SET_CATEGORY,
    SET_TALENT,
    SET_PAGE
} from './constans'

const statuslist = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    keyword: '',
    talent: '',
    category: '',
    page: 1,
    limit: 10,
    pages: 1,
    status: statuslist.idle
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_EVENTS:
            return { ...state, status: statuslist.process }

        case SUCCESS_FETCHING_EVENTS:
            return {
                ...state,
                status: statuslist.success,
                data: action.events,
                pages: action.pages
            }

        case SET_KEYWORD:
            return { ...state, keyword: action.keyword }

        case SET_CATEGORY:
            return { ...state, category: action.category }

        case SET_TALENT:
            return { ...state, talent: action.talent }

        case SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }

        case ERROR_FETCHING_EVENTS:
            return { ...state, status: statuslist.error }

        default:
            return state
    }
}