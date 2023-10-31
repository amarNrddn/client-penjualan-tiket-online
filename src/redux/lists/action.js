import {
    START_FETCHING_LISTS_CATEGORIES,
    SUCCESS_FETCHING_LISTS_CATEGORIES,
    ERROR_FETCHING_LISTS_CATEGORIES,
    START_FETCHING_LISTS_TALENTS,
    SUCCESS_FETCHING_LISTS_TALENTS,
    ERROR_FETCHING_LISTS_TALENTS,
    START_FETCHING_LISTS_EVENTS,
    SUCCESS_FETCHING_LISTS_EVENTS,
    ERROR_FETCHING_LISTS_EVENTS
} from './constans'
import debounce from 'debounce-promise'
import { getData } from '../../utils/fetch'

let debouncedFetchListsCategories = debounce(getData, 1000)
let debounceFetchListsTalents = debounce(getData, 1000)
let debounceFetchListsEvents = debounce(getData, 1000)

// Categories
export const startFetchingListsCategories = () => {
    return {
        type: START_FETCHING_LISTS_CATEGORIES
    }
}

export const successFetchingListsCategories = ({ categories }) => {
    return {
        type: SUCCESS_FETCHING_LISTS_CATEGORIES,
        categories
    }
}

export const errorFetchingListsCategories = () => {
    return {
        type: ERROR_FETCHING_LISTS_CATEGORIES
    }
}

export const fetchListCategories = () => {
    return async (dispatch) => {
        dispatch(startFetchingListsCategories())

        try {
            let res = debouncedFetchListsCategories('/cms/categories')

            let _temp = []

            res.data.data.forEach((res) => {
                _temp.push({
                    value: res._id,
                    label: res.name,
                    target: { value: res._id, name: 'category' }
                })
            })

            dispatch(
                startFetchingListsCategories({
                    categories: _temp
                })
            )

        } catch (error) {
            dispatch(errorFetchingListsCategories())
        }
    }
}

// Talents
export const startFetchingListsTalents = () => {
    return {
        type: START_FETCHING_LISTS_TALENTS
    }
}

export const successFetchingListsTalents = ({ talents }) => {
    return {
        type: SUCCESS_FETCHING_LISTS_TALENTS,
        talents
    }
}

export const errorFetchingListsTalents = () => {
    return {
        type: ERROR_FETCHING_LISTS_TALENTS
    }
}

export const fetchListTalents = () => {
    return async (dispatch) => {
        dispatch(startFetchingListsTalents())

        try {
            const res = debounceFetchListsTalents('/cms/talents')
            let _temp = []

            res.data.data.forEach((res) => {
                _temp.push({
                    value: res._id,
                    label: res.name,
                    target: { value: res._id, name: 'talent' }
                })
            })

            dispatch(
                successFetchingListsTalents({
                    talents: _temp
                })
            )
            
        } catch (error) {
            dispatch(errorFetchingListsTalents())
        }
    }
}

// Events 
export const startFetchingListsEvents = () => {
    return {
        type: START_FETCHING_LISTS_EVENTS
    }
}

export const successFetchingListsEvents = ({ events }) => {
    return {
        type: SUCCESS_FETCHING_LISTS_EVENTS,
        events
    }
}

export const errorFetchingListsEvents = () => {
    return {
        type: ERROR_FETCHING_LISTS_EVENTS
    }
}

export const fetchListsEvents = () => {
    return async (dispatch) => {
        dispatch(startFetchingListsEvents())

        try {
            const res = debounceFetchListsEvents('/cms/events')

            let _temp = []

            res.data.data.forEach((res) => {
                _temp.push({
                    value: res._id,
                    label: res.title,
                    target: { value: res._id, name: 'event' }
                })
            })

            dispatch(
                successFetchingListsEvents({
                    events: _temp
                })
            )

        } catch (error) {
            dispatch(errorFetchingListsEvents())
        }
    }
}