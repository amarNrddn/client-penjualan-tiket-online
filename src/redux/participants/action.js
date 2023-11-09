import {
    START_FETCHING_PARTICIPANTS,
    SUCCESS_FETCHING_PARTICIPANTS,
    ERROR_FETCHING_PARTICIPANTS
} from './constans'
import debounce from 'debounce-promise'
import { getData } from '../../utils/fetch'

const debounceFetchParticipans = debounce(getData, 1000)

export const startFetchingParticipants = () => {
    return {
        type: START_FETCHING_PARTICIPANTS
    }
}

export const successFetchingParticipant = ({participants}) => {
    return {
        type: SUCCESS_FETCHING_PARTICIPANTS,
        participants
    }
}

export const errorFetchingParticipants = () => {
    return {
        type: ERROR_FETCHING_PARTICIPANTS,
    }
}

export const fetchParticipan = () => {
    return async (dispatch) => {
        dispatch(startFetchingParticipants())

        try {
            
        } catch (error) {
            dispatch(errorFetchingParticipants())
        }
    }
}
