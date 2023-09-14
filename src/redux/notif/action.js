import { CLEAR_NOTIF, SET_NOTIF } from "./constans";

export const setNotif = ({ status, typeNotif, message }) => {
    return {
        type: SET_NOTIF,
        status,
        typeNotif,
        message,
    }
}

export const clearNotif = () => {
    return {
        type: CLEAR_NOTIF
    }
}