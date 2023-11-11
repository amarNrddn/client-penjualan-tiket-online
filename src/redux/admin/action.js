import {
    START_FETCHING_ADMIN,
    SUCCESS_FETCHING_ADMIN,
    ERROR_FETCHING_ADMIN
} from './constans'
import debounce from 'debounce-promise'
import { getData } from '../../utils/fetch'
import { clearNotif } from '../notif/action'

let debounceFtechAdmin = debounce(getData, 1000)

export const startFetchingAdmin = () => {
    return {
        type: START_FETCHING_ADMIN
    }
}

export const successFetchingAdmin = ({ admin }) => {
    return {
        type: SUCCESS_FETCHING_ADMIN,
        admin
    }
}

export const errorFetchingAdmin = () => {
    return {
        type: ERROR_FETCHING_ADMIN
    }
}

export const fetchAdmin = () => {
    return async (dispatch) => {
        dispatch(startFetchingAdmin())

        try {
            setTimeout(() => {
                dispatch(clearNotif())
            }, 3000)

            let res = await debounceFtechAdmin('/cms/users')

            const admin = res.data.data
                .filter((item) => item.role === 'admin')
                .map(({ _id, name, email, role }) => ({
                    _id,
                    name,
                    email,
                    role
                }))

            dispatch(
                successFetchingAdmin({
                    admin: admin
                })
            )
        } catch (error) {
            dispatch(errorFetchingAdmin())
        }
    }
}