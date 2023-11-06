import {
    START_FETCHING_LISTS_CATEGORIES,
    SUCCESS_FETCHING_LISTS_CATEGORIES,
    ERROR_FETCHING_LISTS_CATEGORIES,
    START_FETCHING_LISTS_TALENTS,
    SUCCESS_FETCHING_LISTS_TALENTS,
    ERROR_FETCHING_LISTS_TALENTS,
    START_FETCHING_LISTS_EVENTS,
    SUCCESS_FETCHING_LISTS_EVENTS,
    ERROR_FETCHING_LISTS_EVENTS,
} from './constans'

const statuslist = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error',
}

const initialState = {
    categories: [],
    statusCategories: statuslist.idle,
    talents: [],
    statusTalents: statuslist.idle,
    events: [],
    statusEvents: statuslist.idle,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_LISTS_CATEGORIES:
            return { ...state, statusCategories: statuslist.process }

        case SUCCESS_FETCHING_LISTS_CATEGORIES:
            return {
                ...state,
                statusCategories: statuslist.success,
                categories: action.categories
            }

        case ERROR_FETCHING_LISTS_CATEGORIES:
            return { ...state, statusCategories: statuslist.error }

        case START_FETCHING_LISTS_TALENTS:
            return { ...state, statusTalents: statuslist.process }

        case SUCCESS_FETCHING_LISTS_TALENTS:
            return {
                ...state,
                statusTalents: statuslist.success,
                talents: action.talents
            }

        case ERROR_FETCHING_LISTS_TALENTS:
            return { ...state, statusTalents: statuslist.error }

        case START_FETCHING_LISTS_EVENTS:
            return { ...state, statusEvents: statuslist.process }

        case SUCCESS_FETCHING_LISTS_EVENTS:
            return {
                ...state,
                statusEvents: statuslist.success,
                talents: action.talents
            }

        case ERROR_FETCHING_LISTS_EVENTS:
            return { ...state, statusTalents: statuslist.error }

        default:
            return state
    }
}