import debounce from 'debounce-promise'
import {
    START_FETCHING_PAYMENTS,
    SUCCESS_FETCHING_PAYMENTS,
    ERROR_FETCHING_PAYMENTS
} from './constans'
import { getData } from '../../utils/fetch'
import { clearNotif } from '../notif/action'

let debounceFetchPayments = debounce(getData, 1000)

// START
export const startFetchingPayment = () => {
    return {
        type: START_FETCHING_PAYMENTS
    }
}

// SUCCESS
export const successFetchingPayment = ({ payments }) => {
    return {
        type: SUCCESS_FETCHING_PAYMENTS,
        payments
    }
}

export const errorFetchingPayment = () => {
    return {
        type: ERROR_FETCHING_PAYMENTS
    }
}

export const fetchPayments = () => {
    return async (dispatch) => {
        dispatch(startFetchingPayment())

        try {
            setTimeout(() => {
                dispatch(clearNotif())
            }, 3000)

            let res = await debounceFetchPayments('/cms/payment')

            res.data.data.forEach((res) => {
                res.avatar = res.image.name;
            });
            
            dispatch(
                successFetchingPayment({
                    payments: res.data.data,
                })
            )
        } catch (error) {
            dispatch(errorFetchingPayment())
        }
    }
}