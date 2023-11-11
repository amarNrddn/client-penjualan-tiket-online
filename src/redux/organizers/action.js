import {
    START_FETCHING_ORGANIZER,
    SUCCESS_FETCHING_ORGANIZERS,
    ERROR_FETCHING_ORGANIZERS
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

export const successFetchingOrganizres = ({ users }) => {
    return {
        type: SUCCESS_FETCHING_ORGANIZERS,
        users
    }
}

export const errorFetchingOrganizers = () => {
    return {
        type: ERROR_FETCHING_ORGANIZERS
    }
}

export const fetchingOrganizers = () => {
    return async (dispatch) => {
        dispatch(startFetchingOrganizers())

        try {
            setTimeout(() => {
                dispatch(
                    clearNotif()
                )
            }, 5000)

            let res = await debounceFtechingOrganizers('/cms/users')

            const organizer = res.data.data
                .filter((item) => item.role === 'organizer')
                .map(({ _id, name, email, role }) => ({ _id, name, email, role }))

            dispatch(
                successFetchingOrganizres({
                    users: organizer
                })
            )
        } catch (error) {
            dispatch(errorFetchingOrganizers())
        }
    }
}