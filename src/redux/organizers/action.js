import {
    START_FETCHING_ORGANIZER,
    SUCCESS_FETCHING_ORGANIZERS,
    ERROR_FETCHING_ORGANIZERS,
    SET_PAGE
} from './constans'

import debounce from 'debounce-promise'
import { getData } from '../../utils/fetch'
import { clearNotif } from '../notif/action'

let debounceFtechingOrganizers = debounce(getData, 1000)

export const startFetchingOrganizers = () => {
    return {
        type: START_FETCHING_ORGANIZER
    }
}

export const successFetchingOrganizres = ({ users, pages }) => {
    return {
        type: SUCCESS_FETCHING_ORGANIZERS,
        users,
        pages
    }
}

export const errorFetchingOrganizers = () => {
    return {
        type: ERROR_FETCHING_ORGANIZERS
    }
}

export const fetchingOrganizers = () => {
    return async (dispatch, getState) => {
        dispatch(startFetchingOrganizers())

        try {
            setTimeout(() => {
                dispatch(
                    clearNotif()
                )
            }, 5000)

            const payload = {
                page: getState().users?.page || 1,
                limit: getState().users?.limit || 10
            }

            let res = await debounceFtechingOrganizers(`/cms/users`, payload)
           
            const organizer = res.data.data.user
                .filter((item) => item.role === 'organizer')
                .map(({ _id, name, email, role }) => ({
                    _id,
                    name,
                    email,
                    role
                }))

            dispatch(
                successFetchingOrganizres({
                    users: organizer,
                    pages: res.data.data.pages
                })
            )
        } catch (error) {
            dispatch(errorFetchingOrganizers())
        }
    }
}

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        page
    }
}