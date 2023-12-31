import {
    START_FETCHING_EVENTS,
    SUCCESS_FETCHING_EVENTS,
    ERROR_FETCHING_EVENTS,
    SET_KEYWORD,
    SET_CATEGORY,
    SET_TALENT, 
    SET_PAGE
} from './constans'
import { clearNotif } from '../notif/action'
import { getData } from '../../utils/fetch'
import debounce from 'debounce-promise'

let debounceFetchEvents = debounce(getData, 1000)

export const startFetchingEvents = () => {
    return {
        type: START_FETCHING_EVENTS
    }
}

export const successFetchingEvents = ({ events, pages }) => {
    return {
        type: SUCCESS_FETCHING_EVENTS,
        events,
        pages
    }
}

export const errorFetchingEvents = () => {
    return {
        type: ERROR_FETCHING_EVENTS
    }
}

export const fetchEvents = () => {
    return async (dispatch, getState) => {
        dispatch(startFetchingEvents())

        try {
            setTimeout(() => {
                dispatch(clearNotif())
            }, 5000)

            let params = {
                page: getState().events.page || 1,
                limit: getState().events.limit || 10,
                keyword: getState().events.keyword,
                category: getState().events?.category?.value || '',
                talent: getState().events?.talent?.value || ''
            }

            let res = await debounceFetchEvents('/cms/events', params)

            res.data.data.event.forEach((res) => {
                res.categoryName = res?.category?.name ?? ''
                res.talentName = res?.talent?.name ?? '_'
            })

            dispatch(
                successFetchingEvents({
                    events: res.data.data.event,
                    pages: res.data.data.pages
                })
            )
        } catch (error) {
            dispatch(errorFetchingEvents())
        }
    }
}

export const setKeyword = (keyword) => {
    return {
        type: SET_KEYWORD,
        keyword
    }
}

export const setCategory = (category) => {
    return {
        type: SET_CATEGORY,
        category
    }
}

export const setTalent = (talent) => {
    return {
        type: SET_TALENT,
        talent
    }
}

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        page
    }
}